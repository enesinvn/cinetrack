import { useCallback, useEffect, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './useLocalStorage';
import { MEDIA_TYPE, MOVIE_STATUS, normalizeMovie } from '../interfaces/Movie';

const STORAGE_KEY = 'cinetrack_movies';

const SEED_DATA = [
  {
    id: uuidv4(),
    title: 'Inception',
    director: 'Christopher Nolan',
    genre: 'Bilim Kurgu',
    year: 2010,
    rating: 9,
    status: MOVIE_STATUS.WATCHED,
    type: MEDIA_TYPE.MOVIE,
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 0,
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    notes: 'Ruyalar icinde ruyalar. Mukemmel kurgu.',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Dune: Part Two',
    director: 'Denis Villeneuve',
    genre: 'Bilim Kurgu',
    year: 2024,
    rating: 0,
    status: MOVIE_STATUS.TO_WATCH,
    type: MEDIA_TYPE.MOVIE,
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 0,
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    notes: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Breaking Bad',
    director: 'Vince Gilligan',
    genre: 'Dram',
    year: 2008,
    rating: 10,
    status: MOVIE_STATUS.WATCHED,
    type: MEDIA_TYPE.SERIES,
    currentSeason: 5,
    currentEpisode: 16,
    totalSeasons: 5,
    poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    notes: 'Tum zamanlarin en iyi dizisi.',
    createdAt: new Date().toISOString(),
  },
];

/**
 * Tum film CRUD islemlerini saglayan ust seviye hook.
 */
export function useMovies() {
  const [movies, setMovies] = useLocalStorage(STORAGE_KEY, SEED_DATA);
  const migratedRef = useRef(false);

  // Geriye donuk uyumluluk: eski LocalStorage verilerine eksik alanlari ekle (type, episode vs).
  useEffect(() => {
    if (migratedRef.current) return;
    migratedRef.current = true;
    setMovies((prev) => {
      const needsMigration = prev.some(
        (m) => m.type === undefined || m.currentEpisode === undefined,
      );
      return needsMigration ? prev.map(normalizeMovie) : prev;
    });
    // setMovies useCallback referansi stabil, dependency'e gerek yok.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMovie = useCallback(
    (data) => {
      const newMovie = normalizeMovie({
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      });
      setMovies((prev) => [newMovie, ...prev]);
      return newMovie;
    },
    [setMovies],
  );

  const updateMovie = useCallback(
    (id, patch) => {
      setMovies((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch, id } : m)));
    },
    [setMovies],
  );

  const deleteMovie = useCallback(
    (id) => {
      setMovies((prev) => prev.filter((m) => m.id !== id));
    },
    [setMovies],
  );

  /**
   * Silinen bir filmi orijinal id ve siralamasiyla geri yukler (Undo destegi).
   */
  const restoreMovie = useCallback(
    (movie) => {
      if (!movie || !movie.id) return;
      setMovies((prev) => (prev.some((m) => m.id === movie.id) ? prev : [movie, ...prev]));
    },
    [setMovies],
  );

  const toggleStatus = useCallback(
    (id) => {
      setMovies((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                status:
                  m.status === MOVIE_STATUS.WATCHED ? MOVIE_STATUS.TO_WATCH : MOVIE_STATUS.WATCHED,
              }
            : m,
        ),
      );
    },
    [setMovies],
  );

  /**
   * Dizi icin bir sonraki bolume gecer. Otomatik sezon yukseltme yapilmaz;
   * kullanici manuel olarak sezon degistirebilir.
   */
  const nextEpisode = useCallback(
    (id) => {
      setMovies((prev) =>
        prev.map((m) =>
          m.id === id && m.type === MEDIA_TYPE.SERIES
            ? { ...m, currentEpisode: Number(m.currentEpisode || 0) + 1 }
            : m,
        ),
      );
    },
    [setMovies],
  );

  const getById = useCallback((id) => movies.find((m) => m.id === id), [movies]);

  const stats = useMemo(
    () => ({
      total: movies.length,
      watched: movies.filter((m) => m.status === MOVIE_STATUS.WATCHED).length,
      toWatch: movies.filter((m) => m.status === MOVIE_STATUS.TO_WATCH).length,
    }),
    [movies],
  );

  return {
    movies,
    addMovie,
    updateMovie,
    deleteMovie,
    restoreMovie,
    toggleStatus,
    nextEpisode,
    getById,
    stats,
  };
}
