import { ExternalLink, Sparkles } from 'lucide-react';
import type { AffiliateOffer } from '../../types/affiliate';

interface AffiliateCardProps {
  offer: AffiliateOffer;
}

export function AffiliateCard({ offer }: AffiliateCardProps) {
  const {
    provider,
    title,
    description,
    badge,
    buttonText,
    affiliateUrl,
    isPlaceholder,
  } = offer;

  return (
    <div className="my-6 p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          {badge}
        </div>
      )}

      {/* Provider Label */}
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
        {provider}
      </p>

      {/* Content */}
      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        {description}
      </p>

      {/* CTA Button */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md"
      >
        <span>{buttonText}</span>
        <ExternalLink className="w-4 h-4" />
      </a>

      {/* Disclosure */}
      <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-3 italic">
        * Este es un enlace de afiliado. Apoyamos contenido gratuito usando estas recomendaciones.
        {isPlaceholder && ' (Enlace temporal en aprobación)'}
      </p>
    </div>
  );
}
