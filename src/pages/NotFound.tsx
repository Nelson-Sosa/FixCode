import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="404 — Página no encontrada"
        description="La página que buscas no existe en FixCode."
        noindex
      />
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="text-8xl font-extrabold text-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Página no encontrada
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
          La ruta que buscas no existe o fue movida. Vuelve al inicio para encontrar lo que necesitas.
        </p>
        <div className="flex gap-3">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" /> Ir al inicio
          </Link>
          <button onClick={() => history.back()} className="btn-secondary">
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>
      </div>
    </>
  );
}
