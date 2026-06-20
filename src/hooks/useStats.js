import { useMemo } from 'react';
import { MOVIE_STATUS } from '../interfaces/Movie';

/**
 * Film/dizi listesinden agregat istatistikleri hesaplar.
 * Tum sonuclar useMemo ile cache'lenir; movies referansi degismedikce yeniden hesaplanmaz.
 *
 * @param {Array<import('../interfaces/Movie').Movie>} movies
 */
export function useStats(movies) {
  return useMemo(() => {
    const total = movies.length;
    const watched = movies.filter((m) => m.status === MOVIE_STATUS.WATCHED);
    const toWatch = movies.filter((m) => m.status === MOVIE_STATUS.TO_WATCH);

    const rated = watched.filter((m) => Number(m.rating) > 0);
    const avgRating =
      rated.length > 0
        ? rated.reduce((sum, m) => sum + Number(m.rating), 0) / rated.length
        : 0;

    const genreCount = movies.reduce((acc, m) => {
      if (m.genre) acc[m.genre] = (acc[m.genre] || 0) + 1;
      return acc;
    }, {});
    const favoriteGenre =
      Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    const currentYear = new Date().getFullYear();
    const thisYearCount = movies.filter((m) => Number(m.year) === currentYear).length;

    const topRated = [...watched]
      .filter((m) => Number(m.rating) > 0)
      .sort((a, b) => Number(b.rating) - Number(a.rating))[0] || null;

    // Dizi episode takibi ozelliginden sonra dolacak alanlar.
    // type alani yoksa film kabul edilir (geriye donuk uyumluluk).
    const movieCount = movies.filter((m) => (m.type || 'movie') === 'movie').length;
    const seriesList = movies.filter((m) => m.type === 'series');
    const seriesCount = seriesList.length;
    const totalEpisodesWatched = seriesList.reduce(
      (sum, s) =>
        sum + Math.max(0, (Number(s.currentSeason) - 1) * 10 + Number(s.currentEpisode || 0)),
      0,
    );

    return {
      total,
      watched: watched.length,
      toWatch: toWatch.length,
      avgRating,
      favoriteGenre,
      thisYearCount,
      topRated,
      movieCount,
      seriesCount,
      totalEpisodesWatched,
    };
  }, [movies]);
}
