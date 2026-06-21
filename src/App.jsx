import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import WatchedPage from './pages/WatchedPage';
import ToWatchPage from './pages/ToWatchPage';
import AddEditPage from './pages/AddEditPage';
import NotFoundPage from './pages/NotFoundPage';
import { useMovies } from './hooks/useMovies';

export default function App() {
  const {
    movies,
    addMovie,
    updateMovie,
    deleteMovie,
    toggleStatus,
    nextEpisode,
    restoreMovie,
    getById,
    stats,
  } = useMovies();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar stats={stats} />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  movies={movies}
                  onDelete={deleteMovie}
                  onToggleStatus={toggleStatus}
                  onNextEpisode={nextEpisode}
                  onRestore={restoreMovie}
                  stats={stats}
                />
              }
            />
            <Route
              path="/watched"
              element={
                <WatchedPage
                  movies={movies}
                  onDelete={deleteMovie}
                  onToggleStatus={toggleStatus}
                  onNextEpisode={nextEpisode}
                  onRestore={restoreMovie}
                />
              }
            />
            <Route
              path="/to-watch"
              element={
                <ToWatchPage
                  movies={movies}
                  onDelete={deleteMovie}
                  onToggleStatus={toggleStatus}
                  onNextEpisode={nextEpisode}
                  onRestore={restoreMovie}
                />
              }
            />
            <Route
              path="/add"
              element={<AddEditPage getById={getById} onAdd={addMovie} onUpdate={updateMovie} />}
            />
            <Route
              path="/edit/:id"
              element={<AddEditPage getById={getById} onAdd={addMovie} onUpdate={updateMovie} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-800/50 py-6 text-center text-xs text-slate-500">
          <p>
            CineTrack &copy; {new Date().getFullYear()} — React + Vite + Tailwind CSS ile geliştirildi.
          </p>
        </footer>
        <Toaster
          richColors
          closeButton
          position="top-right"
          theme="dark"
          toastOptions={{
            classNames: {
              toast: 'border border-slate-700/50',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}
