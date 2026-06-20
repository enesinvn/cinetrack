import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Pencil,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Calendar,
  User,
  Film as FilmIcon,
  Tv,
  SkipForward,
} from 'lucide-react';
import { MOVIE_STATUS, STATUS_LABELS } from '../interfaces/Movie';

export default function MovieCard({ movie, onDelete, onToggleStatus, onNextEpisode }) {
  const isWatched = movie.status === MOVIE_STATUS.WATCHED;
  const isSeries = movie.type === 'series';

  const handleToggleStatus = () => {
    onToggleStatus(movie.id);
    toast.info(
      isWatched ? 'Tekrar izlenecekler listesine eklendi' : 'Izlendi olarak isaretlendi',
      {
        description: movie.title,
        duration: 2500,
      },
    );
  };

  const handleNextEpisode = () => {
    if (!onNextEpisode) return;
    onNextEpisode(movie.id);
    const next = Number(movie.currentEpisode || 0) + 1;
    toast.info(`Sonraki bolume gecildi`, {
      description: `${movie.title} - S${String(movie.currentSeason || 1).padStart(2, '0')}E${String(next).padStart(2, '0')}`,
      duration: 2500,
    });
  };

  return (
    <article className="card group overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/30 transition-all duration-300 flex flex-col animate-fade-in">
      <div className="relative aspect-[2/3] bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
            {isSeries ? <Tv className="w-16 h-16 mb-2" /> : <FilmIcon className="w-16 h-16 mb-2" />}
            <span className="text-xs">Poster yok</span>
          </div>
        )}

        <div className="absolute top-2 right-2">
          <span
            className={`chip ${
              isWatched
                ? 'bg-emerald-500/90 text-white'
                : 'bg-amber-500/90 text-white'
            } backdrop-blur-sm shadow-lg`}
          >
            {isWatched ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            {STATUS_LABELS[movie.status]}
          </span>
        </div>

        {isWatched && movie.rating > 0 && (
          <div className="absolute top-2 left-2 chip bg-black/70 backdrop-blur-sm text-amber-300">
            <Star className="w-3 h-3 fill-amber-300" />
            {movie.rating}/10
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-white line-clamp-1" title={movie.title}>
          {movie.title}
        </h3>

        <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {movie.year}
          </span>
          {movie.director && (
            <span className="flex items-center gap-1 line-clamp-1" title={movie.director}>
              <User className="w-3 h-3" />
              {movie.director}
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="chip bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {isSeries ? <Tv className="w-3 h-3" /> : <FilmIcon className="w-3 h-3" />}
            {movie.genre}
          </span>
          {isSeries && (
            <span
              className="chip bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono"
              title={`Sezon ${movie.currentSeason}, Bolum ${movie.currentEpisode}`}
            >
              S{String(movie.currentSeason || 1).padStart(2, '0')}E
              {String(movie.currentEpisode || 1).padStart(2, '0')}
            </span>
          )}
        </div>

        {movie.notes && (
          <p className="mt-3 text-xs text-slate-400 line-clamp-2 italic">
            "{movie.notes}"
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center gap-2">
          {isSeries && onNextEpisode ? (
            <button
              type="button"
              onClick={handleNextEpisode}
              className="flex-1 btn-secondary text-xs py-1.5"
              title="Sonraki bolume gec"
            >
              <SkipForward className="w-3.5 h-3.5" />
              Sonraki Bolum
            </button>
          ) : (
            <button
              type="button"
              onClick={handleToggleStatus}
              className="flex-1 btn-secondary text-xs py-1.5"
              title={isWatched ? 'Izlenmedi olarak isaretle' : 'Izlendi olarak isaretle'}
            >
              {isWatched ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {isWatched ? 'Izlenmedi' : 'Izledim'}
            </button>
          )}
          <Link
            to={`/edit/${movie.id}`}
            className="btn-secondary p-2"
            title="Duzenle"
            aria-label="Duzenle"
          >
            <Pencil className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => onDelete(movie)}
            className="btn-danger p-2"
            title="Sil"
            aria-label="Sil"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
