import { Link } from 'react-router-dom';
import { Home, FileQuestion } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="card p-12 text-center max-w-md mx-auto animate-fade-in">
      <div className="inline-flex p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4">
        <FileQuestion className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-extrabold text-white">404</h1>
      <p className="mt-2 text-slate-400">Aradiginiz sayfa bulunamadi.</p>
      <Link to="/" className="btn-primary mt-6">
        <Home className="w-4 h-4" />
        Ana sayfaya don
      </Link>
    </section>
  );
}
