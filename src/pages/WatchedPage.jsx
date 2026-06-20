import { Eye } from 'lucide-react';
import MovieList from '../components/MovieList';
import { MOVIE_STATUS } from '../interfaces/Movie';

export default function WatchedPage({ movies, onDelete, onToggleStatus, onNextEpisode, onRestore }) {
  const watched = movies.filter((m) => m.status === MOVIE_STATUS.WATCHED);

  return (
    <section className="animate-fade-in">
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
          <Eye className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Izlediklerim</h1>
          <p className="text-sm text-slate-400">
            Bugune kadar tamamladigin {watched.length} yapim.
          </p>
        </div>
      </div>

      <MovieList
        movies={watched}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
        onNextEpisode={onNextEpisode}
        onRestore={onRestore}
        emptyTitle="Henuz izlenmis bir kayit yok"
        emptyMessage="Bir filmi 'Izledim' olarak isaretleyince burada gorunecek."
        emptyIcon={Eye}
      />
    </section>
  );
}
