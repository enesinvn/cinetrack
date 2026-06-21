import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import FilterBar from './FilterBar';
import MovieCard from './MovieCard';
import ConfirmDialog from './ConfirmDialog';
import EmptyState from './EmptyState';

export default function MovieList({
  movies,
  onDelete,
  onToggleStatus,
  onNextEpisode,
  onRestore,
  emptyTitle,
  emptyMessage,
  emptyIcon,
}) {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('newest');
  const [confirmTarget, setConfirmTarget] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = movies.filter((m) => {
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        (m.director && m.director.toLowerCase().includes(q));
      const matchesGenre = genre === 'all' || m.genre === genre;
      const matchesType = type === 'all' || (m.type || 'movie') === type;
      return matchesSearch && matchesGenre && matchesType;
    });

    switch (sort) {
      case 'oldest':
        list = list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'rating':
        list = list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'year':
        list = list.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case 'title':
        list = list.sort((a, b) => a.title.localeCompare(b.title, 'tr'));
        break;
      case 'newest':
      default:
        list = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
  }, [movies, search, genre, type, sort]);

  const handleDeleteRequest = (movie) => setConfirmTarget(movie);

  const handleConfirmDelete = () => {
    if (!confirmTarget) return;
    const snapshot = confirmTarget;
    onDelete(snapshot.id);
    setConfirmTarget(null);
    toast.success('Silindi', {
      description: `"${snapshot.title}" listenden çıkarıldı.`,
      action: onRestore
        ? {
            label: 'Geri al',
            onClick: () => {
              onRestore(snapshot);
              toast.info('Geri yüklendi', { description: `"${snapshot.title}" eski haline geldi.` });
            },
          }
        : undefined,
    });
  };

  if (movies.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} icon={emptyIcon} />;
  }

  return (
    <>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        genre={genre}
        onGenreChange={setGenre}
        type={type}
        onTypeChange={setType}
        sort={sort}
        onSortChange={setSort}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="Eşleşen sonuç bulunamadı"
          message="Arama veya filtre kriterlerini değiştirmeyi deneyin."
          actionLabel="Filtreleri temizle"
          actionHref={null}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDelete={handleDeleteRequest}
              onToggleStatus={onToggleStatus}
              onNextEpisode={onNextEpisode}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmTarget}
        title="Bu kayıt silinsin mi?"
        message={
          confirmTarget
            ? `"${confirmTarget.title}" kalıcı olarak silinecek. Bu işlem geri alınamaz.`
            : ''
        }
        confirmLabel="Evet, sil"
        cancelLabel="Vazgeç"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </>
  );
}
