import { NavLink, Link, useLocation } from 'react-router-dom';
import { Film, Plus, Eye, Clock, LayoutGrid } from 'lucide-react';

const links = [
  { to: '/', label: 'Tümü', icon: LayoutGrid, end: true },
  { to: '/watched', label: 'İzlenenler', icon: Eye },
  { to: '/to-watch', label: 'İzlenecekler', icon: Clock },
];

export default function Navbar({ stats }) {
  const location = useLocation();
  const onAddPage = location.pathname.startsWith('/add') || location.pathname.startsWith('/edit');

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">CineTrack</h1>
              <p className="text-[10px] text-slate-400 -mt-0.5">Film & Dizi Takibi</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {stats && (
                  <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-black/30">
                    {to === '/' ? stats.total : to === '/watched' ? stats.watched : stats.toWatch}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {!onAddPage && (
            <Link to="/add" className="btn-primary text-sm">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Yeni Ekle</span>
            </Link>
          )}
        </div>

        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
