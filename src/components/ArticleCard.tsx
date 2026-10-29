import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { CategoryBadge, CategoryIcon, getCategoryTheme } from './CategoryIcon';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const { category } = article;
  const theme = getCategoryTheme(category.id);

  if (featured) {
    return (
      <article className="card group overflow-hidden flex flex-col justify-between">
        <Link to={`/articulo/${article.slug}`} className="block p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <CategoryBadge categoryId={category.id} label={category.label} size="sm" />
            <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 shrink-0 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTime} min</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-5">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-wrap gap-1.5">
              {article.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-md bg-slate-100 dark:bg-surface-800 text-slate-500 dark:text-slate-400 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
              Leer <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="card group flex gap-4 p-4">
      <Link to={`/articulo/${article.slug}`} className="flex gap-4 w-full items-center">
        {/* Contenedor del ícono estilizado con borde sutil y tono de categoría */}
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${theme.cardContainerClass}`}
        >
          <CategoryIcon categoryId={category.id} className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <CategoryBadge categoryId={category.id} label={category.label} size="sm" />
            <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readingTime} min
            </span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
