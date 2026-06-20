import { Library, Eye, Clock, Star, Sparkles, Trophy, Film, Tv } from 'lucide-react';
import { useStats } from '../hooks/useStats';

function StatCard({ icon: Icon, label, value, subtitle, gradient, iconBg }) {
  return (
    <div
      className={`card p-4 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-2xl ${gradient}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            {label}
          </p>
          <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-white truncate" title={String(value)}>
            {value}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-400 truncate" title={subtitle}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-xl ${iconBg} shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default function StatsDashboard({ movies }) {
  const stats = useStats(movies);

  if (stats.total === 0) return null;

  const avgRatingDisplay = stats.avgRating > 0 ? stats.avgRating.toFixed(1) : '-';

  return (
    <section className="mb-6 animate-fade-in" aria-label="Istatistikler">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          icon={Library}
          label="Toplam Kayit"
          value={stats.total}
          subtitle={`${stats.movieCount} film + ${stats.seriesCount} dizi`}
          gradient="bg-gradient-to-br from-indigo-500/10 to-transparent"
          iconBg="bg-indigo-500/20 text-indigo-300"
        />
        <StatCard
          icon={Eye}
          label="Izlendi"
          value={stats.watched}
          subtitle={stats.total > 0 ? `%${Math.round((stats.watched / stats.total) * 100)} tamamlandi` : ''}
          gradient="bg-gradient-to-br from-emerald-500/10 to-transparent"
          iconBg="bg-emerald-500/20 text-emerald-300"
        />
        <StatCard
          icon={Clock}
          label="Izlenecek"
          value={stats.toWatch}
          subtitle={stats.toWatch > 0 ? 'Sirada bekliyor' : 'Liste bos'}
          gradient="bg-gradient-to-br from-amber-500/10 to-transparent"
          iconBg="bg-amber-500/20 text-amber-300"
        />
        <StatCard
          icon={Star}
          label="Ortalama Puan"
          value={avgRatingDisplay}
          subtitle={stats.avgRating > 0 ? '10 uzerinden' : 'Henuz puan verilmedi'}
          gradient="bg-gradient-to-br from-pink-500/10 to-transparent"
          iconBg="bg-pink-500/20 text-pink-300"
        />
      </div>

      <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {stats.favoriteGenre && (
          <div className="card p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                En Cok Sevdigin Tur
              </p>
              <p className="text-sm font-semibold text-white truncate">{stats.favoriteGenre}</p>
            </div>
          </div>
        )}

        {stats.topRated && (
          <div className="card p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                En Yuksek Puanli
              </p>
              <p className="text-sm font-semibold text-white truncate" title={stats.topRated.title}>
                {stats.topRated.title}{' '}
                <span className="text-amber-300">({stats.topRated.rating}/10)</span>
              </p>
            </div>
          </div>
        )}

        {stats.seriesCount > 0 && (
          <div className="card p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300">
              <Tv className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Toplam Izlenen Bolum
              </p>
              <p className="text-sm font-semibold text-white">
                {stats.totalEpisodesWatched}{' '}
                <span className="text-slate-400 text-xs">tahmini</span>
              </p>
            </div>
          </div>
        )}

        {!stats.seriesCount && stats.thisYearCount > 0 && (
          <div className="card p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300">
              <Film className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Bu Yil Yapilan
              </p>
              <p className="text-sm font-semibold text-white">{stats.thisYearCount} yapim</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
