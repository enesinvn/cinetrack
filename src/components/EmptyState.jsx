import { Link } from 'react-router-dom';
import { Film, Plus } from 'lucide-react';

export default function EmptyState({
  title = 'Henüz kayıt yok',
  message = 'Listene bir film veya dizi ekleyerek başlayabilirsin.',
  actionLabel = 'İlk Filmini Ekle',
  actionHref = '/add',
  icon: Icon = Film,
}) {
  return (
    <div className="card p-12 text-center animate-fade-in">
      <div className="inline-flex p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">{message}</p>
      {actionHref && (
        <Link to={actionHref} className="btn-primary mt-6">
          <Plus className="w-4 h-4" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
