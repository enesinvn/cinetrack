import MovieList from '../components/MovieList';
import StatsDashboard from '../components/StatsDashboard';

export default function HomePage({
  movies,
  onDelete,
  onToggleStatus,
  onNextEpisode,
  onRestore,
  stats,
}) {
  return (
    <section className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-pink-200 bg-clip-text text-transparent">
          Tüm Filmlerim & Dizilerim
        </h1>
        <p className="mt-2 text-slate-400">
          Toplam <span className="text-white font-semibold">{stats.total}</span> kayıt —{' '}
          <span className="text-emerald-400">{stats.watched} izlendi</span>,{' '}
          <span className="text-amber-400">{stats.toWatch} izlenecek</span>.
        </p>
      </div>

      <StatsDashboard movies={movies} />

      <MovieList
        movies={movies}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
        onNextEpisode={onNextEpisode}
        onRestore={onRestore}
        emptyTitle="Koleksiyonun boş"
        emptyMessage="İlk filmini veya dizini ekleyerek listeni oluşturmaya başla."
      />
    </section>
  );
}
