import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import MovieForm from '../components/MovieForm';
import { createEmptyMovie } from '../interfaces/Movie';

export default function AddEditPage({ getById, onAdd, onUpdate }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const existing = isEdit ? getById(id) : null;

  if (isEdit && !existing) {
    return (
      <section className="card p-12 text-center animate-fade-in">
        <h2 className="text-xl font-bold text-white">Kayit bulunamadi</h2>
        <p className="mt-2 text-sm text-slate-400">
          Aradiginiz film silinmis veya hic eklenmemis olabilir.
        </p>
        <Link to="/" className="btn-primary mt-6">
          <ArrowLeft className="w-4 h-4" />
          Ana sayfaya don
        </Link>
      </section>
    );
  }

  const initialValue = existing || createEmptyMovie();

  const handleSubmit = (data) => {
    if (isEdit) {
      onUpdate(id, data);
      toast.success('Guncellendi', {
        description: `"${data.title}" bilgileri kaydedildi.`,
      });
    } else {
      onAdd(data);
      toast.success('Eklendi', {
        description: `"${data.title}" koleksiyonuna katildi.`,
      });
    }
    navigate('/');
  };

  return (
    <section className="max-w-3xl mx-auto animate-fade-in">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Geri don
      </Link>

      <div className="card p-6 sm:p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? 'Filmi Duzenle' : 'Yeni Film/Dizi Ekle'}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {isEdit
              ? 'Bilgileri guncelleyip kaydet.'
              : 'Koleksiyonuna eklemek istedigin yapim bilgilerini doldur.'}
          </p>
        </header>

        <MovieForm
          initialValue={initialValue}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          submitLabel={isEdit ? 'Degisiklikleri Kaydet' : 'Ekle'}
        />
      </div>
    </section>
  );
}
