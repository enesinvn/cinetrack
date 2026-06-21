import { Search, X, ArrowDownUp, Film, Tv, LayoutGrid } from 'lucide-react';
import { GENRES, MEDIA_TYPE } from '../interfaces/Movie';

export const SORT_OPTIONS = [
  { value: 'newest', label: 'En Yeni Eklenen' },
  { value: 'oldest', label: 'En Eski Eklenen' },
  { value: 'rating', label: 'Puan (Yüksek → Düşük)' },
  { value: 'year', label: 'Yapım Yılı (Yeni → Eski)' },
  { value: 'title', label: 'Ada Göre (A-Z)' },
];

const TYPE_OPTIONS = [
  { value: 'all', label: 'Tümü', icon: LayoutGrid },
  { value: MEDIA_TYPE.MOVIE, label: 'Filmler', icon: Film },
  { value: MEDIA_TYPE.SERIES, label: 'Diziler', icon: Tv },
];

export default function FilterBar({
  search,
  onSearchChange,
  genre,
  onGenreChange,
  type,
  onTypeChange,
  sort,
  onSortChange,
  resultCount,
}) {
  const hasActiveFilters = search || genre !== 'all' || type !== 'all';

  return (
    <div className="card p-4 mb-6">
      <div className="flex items-center gap-1 mb-3 p-1 bg-slate-900/60 rounded-xl border border-slate-800 w-fit">
        {TYPE_OPTIONS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => onTypeChange(value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              type === value
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Başlık veya yönetmen ara..."
            className="input pl-9 pr-9"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              aria-label="Aramayı temizle"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="lg:col-span-3">
          <select
            value={genre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="input"
            aria-label="Tür filtresi"
          >
            <option value="all">Tüm Türler</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-3 relative">
          <ArrowDownUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="input pl-9"
            aria-label="Sıralama"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>
          {resultCount} sonuç
          {hasActiveFilters && <span className="text-indigo-400"> (filtreli)</span>}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onGenreChange('all');
              onTypeChange('all');
            }}
            className="text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            Filtreleri temizle
          </button>
        )}
      </div>
    </div>
  );
}
