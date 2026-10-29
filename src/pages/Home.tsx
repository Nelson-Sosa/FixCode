import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Terminal, ArrowRight, TrendingUp, Zap, Shield } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';
import { ARTICLES, CATEGORIES, FEATURED_ARTICLES, searchArticles } from '../data/articles';
import { CategoryIcon, getCategoryTheme } from '../components/CategoryIcon';
import type { Article } from '../types';

const CATEGORY_LIST = Object.values(CATEGORIES);

const FEATURES = [
  { icon: Zap, title: 'Ultra rápido', desc: 'Contenido optimizado para Lighthouse 100' },
  { icon: Terminal, title: 'Ejemplos reales', desc: 'Código copiable y probado en producción' },
  { icon: Shield, title: 'Siempre actualizado', desc: 'Guías con las últimas versiones y mejores prácticas' },
];

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query) {
      setIsSearching(true);
      setSearchResults(searchArticles(query));
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [query]);

  return (
    <>
      <SEOHead
        title="FixCode — Tutoriales de Desarrollo, DevOps y Terminal"
        description="Guías técnicas sobre Docker, React, Node.js, Git, Linux y despliegues en Firebase, Vercel y más. Código limpio, ejemplos prácticos y tutoriales actualizados."
        canonical="/"
        tags={['devops', 'docker', 'react', 'nodejs', 'linux', 'git', 'tutoriales', 'programación']}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-surface-900 to-surface-900 dark:from-brand-950 dark:via-surface-950 dark:to-surface-950 text-white py-20 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-medium mb-6 animate-fade-in">
            <TrendingUp className="w-4 h-4" />
            Tutoriales técnicos para desarrolladores
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-slide-up">
            Código que{' '}
            <span className="text-gradient">funciona</span>{' '}
            en producción
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Guías de Docker, Firebase, React, Node.js, Git y Terminal.
            Sin relleno, directo al punto, con código real.
          </p>

          <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <SearchBar large initialQuery={query} />
          </div>

          {/* Features row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                <Icon className="w-5 h-5 text-brand-400 shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search results */}
        {isSearching ? (
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="section-title">
                  Resultados para "{query}"
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  {searchResults.length} artículo{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                </p>
              </div>
              <Link to="/" className="btn-secondary text-sm">
                Ver todo
              </Link>
            </div>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {searchResults.map(article => (
                  <ArticleCard key={article.id} article={article} featured />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Sin resultados
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Intenta con otras palabras clave como "docker", "react", "git" o "bash"
                </p>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Featured articles */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="section-title">Artículos destacados</h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">{FEATURED_ARTICLES.length} artículos</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {FEATURED_ARTICLES.map(article => (
                  <ArticleCard key={article.id} article={article} featured />
                ))}
              </div>
            </section>

            {/* Categories grid */}
            <section className="mb-16">
              <h2 className="section-title mb-8">Explorar por categoría</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORY_LIST.map(cat => {
                  const count = ARTICLES.filter(a => a.category.id === cat.id).length;
                  const theme = getCategoryTheme(cat.id);
                  return (
                    <Link
                      key={cat.id}
                      to={`/categoria/${cat.id}`}
                      className="card p-5 group flex flex-col justify-between"
                    >
                      <div>
                        {/* Contenedor del ícono moderno SaaS */}
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 ${theme.cardContainerClass}`}
                        >
                          <CategoryIcon categoryId={cat.id} className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {cat.label}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-surface-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                          {count} artículo{count !== 1 ? 's' : ''}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* All articles */}
            <section>
              <h2 className="section-title mb-8">Todos los artículos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ARTICLES.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
