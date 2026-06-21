import { Clock } from 'lucide-react';
import MovieList from '../components/MovieList';
import { MOVIE_STATUS } from '../interfaces/Movie';

export default function ToWatchPage({ movies, onDelete, onToggleStatus, onNextEpisode, onRestore }) {
  const toWatch = movies.filter((m) => m.status === MOVIE_STATUS.TO_WATCH);

  return (
    <section className="animate-fade-in">
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">İzleyeceklerim</h1>
          <p className="text-sm text-slate-400">
            {toWatch.length} yapım sırada seni bekliyor.
          </p>
        </div>
      </div>

      <MovieList
        movies={toWatch}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
        onNextEpisode={onNextEpisode}
        onRestore={onRestore}
        emptyTitle="İzleme listen boş"
        emptyMessage="Sonra izlemek istediklerini buraya ekleyebilirsin."
        emptyIcon={Clock}
      />
    </section>
  );
}
