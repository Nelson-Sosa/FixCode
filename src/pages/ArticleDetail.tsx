import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Tag, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { getArticleBySlug, ARTICLES } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import { CategoryBadge } from '../components/CategoryIcon';

// Simple markdown-like renderer for our content
function renderContent(content: string): React.ReactNode {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;
  const key = () => `el-${keyCounter++}`;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.trim().startsWith('```')) {
      const lang = line.trim().replace('```', '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <CodeBlock key={key()} code={codeLines.join('\n')} lang={lang} />
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key()} className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 scroll-mt-20">
          {line.replace('## ', '')}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key()} className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // List items
    if (line.trim().startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().replace('- ', ''));
        i++;
      }
      elements.push(
        <ul key={key()} className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300 my-4 ml-2">
          {items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      );
      continue;
    }

    // Paragraph with inline code
    elements.push(
      <p key={key()} className="text-slate-700 dark:text-slate-300 leading-relaxed my-4">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={idx} className="font-mono text-sm bg-slate-100 dark:bg-surface-800 text-brand-700 dark:text-brand-300 px-1.5 py-0.5 rounded-md">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-700/50 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-850 dark:bg-surface-950 border-b border-slate-700/50">
        <span className="text-xs font-mono text-slate-400">{lang || 'code'}</span>
        <button
          onClick={handleCopy}
          aria-label="Copiar código"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
        >
          {copied ? (
            <><Check className="w-3.5 h-3.5 text-green-400" /> <span className="text-green-400">Copiado</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" /> Copiar</>
          )}
        </button>
      </div>
      {/* Code */}
      <pre className="bg-surface-900 dark:bg-surface-950 text-slate-100 overflow-x-auto p-5 text-sm leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/" replace />;

  const { category } = article;
  const related = ARTICLES
    .filter(a => a.id !== article.id && a.category.id === category.id)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: article.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        canonical={`/articulo/${article.slug}`}
        ogType="article"
        publishedAt={article.publishedAt}
        tags={article.tags}
      />

      {/* Article header */}
      <div className="bg-gradient-to-b from-surface-900 to-white dark:to-surface-900 text-white pb-8 pt-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to={article.category ? `/categoria/${article.category.id}` : '/'}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a {category.label}
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <CategoryBadge categoryId={category.id} label={category.label} size="md" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5 text-white">
            {article.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readingTime} min de lectura
            </span>
            <span className="text-slate-500">Por {article.author}</span>
            <button
              onClick={handleShare}
              aria-label="Compartir artículo"
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              Compartir
            </button>
          </div>
        </div>
      </div>

      {/* Article content + sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10 justify-center">
          {/* Main content */}
          <article className="max-w-3xl w-full">
            <div className="prose-custom">
              {renderContent(article.content)}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700/50">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-surface-800 text-slate-600 dark:text-slate-300 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* AdSense placeholder */}
            <div className="mt-10 p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-center text-slate-400 dark:text-slate-500 text-sm">
              {/* Google AdSense unit will go here */}
              Espacio publicitario
            </div>
          </article>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Artículos relacionados en {category.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(a => (
                <ArticleCard key={a.id} article={a} featured />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
