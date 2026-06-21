/**
 * Movie / Dizi veri sablonu
 *
 * @typedef {Object} Movie
 * @property {string}              id              - Benzersiz uuid
 * @property {string}              title           - Film veya dizi adi
 * @property {string}              director        - Yonetmen
 * @property {string}              genre           - Tur (Aksiyon, Drama, vb.)
 * @property {number}              year            - Yapim yili
 * @property {number}              rating          - 1-10 arasi kisisel puan
 * @property {'watched'|'toWatch'} status          - Izlenme durumu
 * @property {'movie'|'series'}    type            - Yapim tipi
 * @property {number}              currentSeason   - Diziler icin su anki sezon (1+)
 * @property {number}              currentEpisode  - Diziler icin su anki bolum (1+)
 * @property {number}              totalSeasons    - Diziler icin toplam sezon (0 = bilinmiyor)
 * @property {string}              poster          - Poster gorseli URL'i (opsiyonel)
 * @property {string}              notes           - Kisisel notlar
 * @property {string}              createdAt       - ISO formatinda olusturulma tarihi
 */

export const MOVIE_STATUS = Object.freeze({
  WATCHED: 'watched',
  TO_WATCH: 'toWatch',
});

export const STATUS_LABELS = {
  [MOVIE_STATUS.WATCHED]: 'İzlendi',
  [MOVIE_STATUS.TO_WATCH]: 'İzlenecek',
};

export const MEDIA_TYPE = Object.freeze({
  MOVIE: 'movie',
  SERIES: 'series',
});

export const TYPE_LABELS = {
  [MEDIA_TYPE.MOVIE]: 'Film',
  [MEDIA_TYPE.SERIES]: 'Dizi',
};

export const GENRES = [
  'Aksiyon',
  'Macera',
  'Animasyon',
  'Belgesel',
  'Bilim Kurgu',
  'Biyografi',
  'Dram',
  'Fantastik',
  'Gerilim',
  'Komedi',
  'Korku',
  'Polisiye',
  'Romantik',
  'Savaş',
  'Suç',
  'Tarihi',
  'Western',
];

/**
 * Yeni bir film/dizi nesnesi icin varsayilan degerleri uretir.
 * @returns {Movie}
 */
export const createEmptyMovie = () => ({
  id: '',
  title: '',
  director: '',
  genre: GENRES[0],
  year: new Date().getFullYear(),
  rating: 0,
  status: MOVIE_STATUS.TO_WATCH,
  type: MEDIA_TYPE.MOVIE,
  currentSeason: 1,
  currentEpisode: 1,
  totalSeasons: 0,
  poster: '',
  notes: '',
  createdAt: new Date().toISOString(),
});

/**
 * Eski LocalStorage verilerini yeni alanlarla doldurur (geriye donuk uyumluluk).
 * @param {Partial<Movie>} movie
 * @returns {Movie}
 */
export const normalizeMovie = (movie) => ({
  type: MEDIA_TYPE.MOVIE,
  currentSeason: 1,
  currentEpisode: 1,
  totalSeasons: 0,
  ...movie,
});

/**
 * Bir film nesnesinin gecerli olup olmadigini kontrol eder.
 * @param {Partial<Movie>} movie
 * @returns {{ valid: boolean, errors: Record<string, string> }}
 */
export const validateMovie = (movie) => {
  const errors = {};
  if (!movie.title || movie.title.trim().length < 1) {
    errors.title = 'Başlık zorunludur';
  }
  if (!movie.genre) {
    errors.genre = 'Tür seçiniz';
  }
  const yearNum = Number(movie.year);
  if (!Number.isFinite(yearNum) || yearNum < 1888 || yearNum > new Date().getFullYear() + 5) {
    errors.year = 'Geçerli bir yıl giriniz';
  }
  const ratingNum = Number(movie.rating);
  if (!Number.isFinite(ratingNum) || ratingNum < 0 || ratingNum > 10) {
    errors.rating = 'Puan 0-10 arasında olmalıdır';
  }
  if (movie.type === MEDIA_TYPE.SERIES) {
    const season = Number(movie.currentSeason);
    const episode = Number(movie.currentEpisode);
    if (!Number.isFinite(season) || season < 1) {
      errors.currentSeason = 'Sezon 1 veya daha büyük olmalıdır';
    }
    if (!Number.isFinite(episode) || episode < 1) {
      errors.currentEpisode = 'Bölüm 1 veya daha büyük olmalıdır';
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
};
