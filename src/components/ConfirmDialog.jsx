import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({
  open,
  title = 'Emin misiniz?',
  message,
  confirmLabel = 'Sil',
  cancelLabel = 'Vazgeç',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="card max-w-md w-full p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-rose-500/15 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            {message && <p className="mt-1 text-sm text-slate-400">{message}</p>}
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button type="button" onClick={onCancel} className="btn-ghost">
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className="btn-danger" autoFocus>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
