import { Link } from 'react-router-dom';
import { Code2, ExternalLink, Rss, Heart } from 'lucide-react';

const FOOTER_LINKS = {
  Secciones: [
    { to: '/categoria/devops', label: 'DevOps & Deploy' },
    { to: '/categoria/frontend', label: 'Frontend' },
    { to: '/categoria/backend', label: 'Backend' },
    { to: '/categoria/terminal', label: 'Terminal / Linux' },
  ],
  Legal: [
    { to: '/sobre-nosotros', label: 'Sobre Nosotros' },
    { to: '/contacto', label: 'Contacto' },
    { to: '/politica-de-privacidad', label: 'Política de Privacidad' },
    { to: '/terminos-y-condiciones', label: 'Términos y Condiciones' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-surface-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                Fix<span className="text-gradient">Code</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Tutoriales técnicos, guías de errores, comandos de consola y despliegues.
              Contenido práctico para desarrolladores de todos los niveles.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-surface-800 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-surface-800 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="/rss.xml"
                aria-label="RSS Feed"
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-surface-800 transition-all"
              >
                <Rss className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">{section}</h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {year} FixCode. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-red-400 fill-red-400" /> para la comunidad dev
          </p>
        </div>
      </div>
    </footer>
  );
}
