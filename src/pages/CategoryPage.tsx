import { useParams, Navigate } from 'react-router-dom';
import { FileCode2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ArticleCard from '../components/ArticleCard';
import { CategoryIcon, getCategoryTheme } from '../components/CategoryIcon';
import { CATEGORIES, getArticlesByCategory } from '../data/articles';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? CATEGORIES[categoryId] : undefined;

  if (!category) return <Navigate to="/" replace />;

  const articles = getArticlesByCategory(category.id);
  const theme = getCategoryTheme(category.id);

  return (
    <>
      <SEOHead
        title={`${category.label} — Tutoriales y Guías`}
        description={`${category.description} Aprende con tutoriales prácticos, ejemplos de código y guías paso a paso.`}
        canonical={`/categoria/${category.id}`}
        tags={[category.id, category.label.toLowerCase(), 'tutoriales', 'desarrollo']}
      />

      {/* Rediseño SaaS de la cabecera de categoría */}
      <div className="relative border-b border-slate-800/80 bg-slate-900 py-16 px-4 overflow-hidden">
        {/* Glow sutil en el fondo matching category */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 ${theme.glowBg}`}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Contenedor del ícono grande estilo SaaS */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center backdrop-blur-sm ${theme.heroContainerClass}`}
            >
              <CategoryIcon categoryId={category.id} className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
            {category.label}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-5 leading-relaxed">
            {category.description}
          </p>

          {/* Insignia de conteo elegante tipo pastilla */}
          <div className="inline-flex">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700/80 shadow-sm">
              {articles.length} artículo{articles.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400">
              <FileCode2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Próximamente
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Estamos preparando artículos y guías prácticas para esta categoría.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
