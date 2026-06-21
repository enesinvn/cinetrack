import { useState } from 'react';
import { Save, X, Star, Film, Tv } from 'lucide-react';
import {
  GENRES,
  MEDIA_TYPE,
  MOVIE_STATUS,
  STATUS_LABELS,
  TYPE_LABELS,
  validateMovie,
} from '../interfaces/Movie';

export default function MovieForm({ initialValue, onSubmit, onCancel, submitLabel = 'Kaydet' }) {
  const [form, setForm] = useState(initialValue);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === 'number'
        ? e.target.value === ''
          ? ''
          : Number(e.target.value)
        : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: validationErrors } = validateMovie(form);
    if (!valid) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      ...form,
      title: form.title.trim(),
      director: form.director.trim(),
      poster: form.poster.trim(),
      notes: form.notes.trim(),
      year: Number(form.year),
      rating: Number(form.rating) || 0,
      currentSeason: Number(form.currentSeason) || 1,
      currentEpisode: Number(form.currentEpisode) || 1,
      totalSeasons: Number(form.totalSeasons) || 0,
    });
  };

  const isSeries = form.type === MEDIA_TYPE.SERIES;

  const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5';
  const errorClass = 'mt-1 text-xs text-rose-400';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Yapım Tipi</label>
          <div className="flex gap-2">
            {Object.values(MEDIA_TYPE).map((type) => {
              const Icon = type === MEDIA_TYPE.SERIES ? Tv : Film;
              const active = form.type === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, type }))}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                    active
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {TYPE_LABELS[type]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="title" className={labelClass}>
            {isSeries ? 'Dizi' : 'Film'} Adı <span className="text-rose-400">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={handleChange('title')}
            placeholder={isSeries ? 'Örnek: Breaking Bad' : 'Örnek: Inception'}
            className="input"
            autoFocus
          />
          {errors.title && <p className={errorClass}>{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="director" className={labelClass}>
            Yönetmen
          </label>
          <input
            id="director"
            type="text"
            value={form.director}
            onChange={handleChange('director')}
            placeholder="Örnek: Christopher Nolan"
            className="input"
          />
        </div>

        <div>
          <label htmlFor="genre" className={labelClass}>
            Tür <span className="text-rose-400">*</span>
          </label>
          <select id="genre" value={form.genre} onChange={handleChange('genre')} className="input">
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && <p className={errorClass}>{errors.genre}</p>}
        </div>

        <div>
          <label htmlFor="year" className={labelClass}>
            Yapım Yılı <span className="text-rose-400">*</span>
          </label>
          <input
            id="year"
            type="number"
            min="1888"
            max={new Date().getFullYear() + 5}
            value={form.year}
            onChange={handleChange('year')}
            className="input"
          />
          {errors.year && <p className={errorClass}>{errors.year}</p>}
        </div>

        <div>
          <label htmlFor="rating" className={labelClass}>
            Puan (0-10)
          </label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              id="rating"
              type="number"
              min="0"
              max="10"
              step="0.5"
              value={form.rating}
              onChange={handleChange('rating')}
              className="input pl-9"
            />
          </div>
          {errors.rating && <p className={errorClass}>{errors.rating}</p>}
        </div>

        {isSeries && (
          <div className="md:col-span-2 p-4 rounded-xl bg-sky-500/5 border border-sky-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Tv className="w-4 h-4 text-sky-300" />
              <h3 className="text-sm font-semibold text-sky-200">Dizi Takip Bilgileri</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="currentSeason" className={labelClass}>
                  Şu Anki Sezon
                </label>
                <input
                  id="currentSeason"
                  type="number"
                  min="1"
                  value={form.currentSeason}
                  onChange={handleChange('currentSeason')}
                  className="input"
                />
                {errors.currentSeason && <p className={errorClass}>{errors.currentSeason}</p>}
              </div>
              <div>
                <label htmlFor="currentEpisode" className={labelClass}>
                  Şu Anki Bölüm
                </label>
                <input
                  id="currentEpisode"
                  type="number"
                  min="1"
                  value={form.currentEpisode}
                  onChange={handleChange('currentEpisode')}
                  className="input"
                />
                {errors.currentEpisode && <p className={errorClass}>{errors.currentEpisode}</p>}
              </div>
              <div>
                <label htmlFor="totalSeasons" className={labelClass}>
                  Toplam Sezon
                  <span className="text-slate-500 text-xs ml-1">(opsiyonel)</span>
                </label>
                <input
                  id="totalSeasons"
                  type="number"
                  min="0"
                  value={form.totalSeasons}
                  onChange={handleChange('totalSeasons')}
                  placeholder="0 = bilinmiyor"
                  className="input"
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Önizleme:{' '}
              <span className="font-mono text-sky-300">
                S{String(form.currentSeason || 1).padStart(2, '0')}E
                {String(form.currentEpisode || 1).padStart(2, '0')}
              </span>
            </p>
          </div>
        )}

        <div className="md:col-span-2">
          <label htmlFor="poster" className={labelClass}>
            Poster URL (opsiyonel)
          </label>
          <input
            id="poster"
            type="url"
            value={form.poster}
            onChange={handleChange('poster')}
            placeholder="https://..."
            className="input"
          />
          {form.poster && (
            <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
              <img
                src={form.poster}
                alt="Önizleme"
                className="w-12 h-16 object-cover rounded-md border border-slate-700"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span>Poster önizlemesi</span>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Durum</label>
          <div className="flex gap-2">
            {Object.values(MOVIE_STATUS).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, status }))}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  form.status === status
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="notes" className={labelClass}>
            Kişisel Notlar
          </label>
          <textarea
            id="notes"
            rows={3}
            value={form.notes}
            onChange={handleChange('notes')}
            placeholder="Hakkında düşüncelerin, kısa yorum..."
            className="input resize-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
        <button type="button" onClick={onCancel} className="btn-ghost">
          <X className="w-4 h-4" />
          İptal
        </button>
        <button type="submit" className="btn-primary">
          <Save className="w-4 h-4" />
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
