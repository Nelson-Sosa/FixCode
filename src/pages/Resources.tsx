import { Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';
import { CategoryIcon } from '../components/CategoryIcon';
import { SEO } from '../components/SEO';
import type { AffiliateOffer } from '../types/affiliate';
import {
  NAMECHEAP_OFFER,
  VULTR_DEVOPS_OFFER,
  VULTR_TERMINAL_OFFER,
  SUPABASE_BACKEND_OFFER,
} from '../config/affiliates';

interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  icon: 'frontend' | 'devops' | 'terminal' | 'backend';
  offers: AffiliateOffer[];
}

const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Dominios, hosting y herramientas para desarrollo web',
    icon: 'frontend',
    offers: [NAMECHEAP_OFFER],
  },
  {
    id: 'devops',
    name: 'DevOps',
    description: 'Infraestructura cloud, contenedores y despliegues',
    icon: 'devops',
    offers: [VULTR_DEVOPS_OFFER],
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Servidores VPS, Linux y administración de sistemas',
    icon: 'terminal',
    offers: [VULTR_TERMINAL_OFFER],
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Bases de datos, APIs y servicios backend',
    icon: 'backend',
    offers: [SUPABASE_BACKEND_OFFER],
  },
];

function ResourceCard({ offer }: { offer: AffiliateOffer }) {
  return (
    <div className="card group hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      {/* Header con provider y badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {offer.provider}
            </h3>
            {offer.isPlaceholder && (
              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                Próximamente
              </span>
            )}
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {offer.badge}
        </span>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h4 className="font-semibold text-base text-slate-900 dark:text-white mb-2">
          {offer.title}
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {offer.description}
        </p>
      </div>

      {/* CTA Button */}
      <a
        href={offer.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`btn-gradient w-full flex items-center justify-center gap-2 ${
          offer.isPlaceholder ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
        }`}
        aria-label={`Ir a ${offer.provider}`}
      >
        {offer.buttonText}
        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </a>

      {/* FTC Disclosure */}
      {!offer.isPlaceholder && (
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-500 text-center italic">
          Enlace de afiliado - Ganamos comisión sin costo extra para ti
        </p>
      )}
    </div>
  );
}

function CategorySection({ category }: { category: ResourceCategory }) {
  return (
    <section className="mb-16 last:mb-0">
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg">
          <CategoryIcon categoryId={category.icon} className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {category.name}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {category.description}
          </p>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.offers.map(offer => (
          <ResourceCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}

export default function Resources() {
  return (
    <>
      <SEO
        title="Recursos y Proveedores"
        description="Descubre las mejores herramientas y proveedores recomendados para desarrollo web, DevOps, servidores y backend. Recursos verificados por FixCode."
        keywords={['recursos desarrollo', 'proveedores web', 'herramientas devops', 'hosting', 'dominios', 'vps', 'cloud']}
        canonicalUrl="https://fixcode.page/recursos"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Recomendaciones Verificadas
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Recursos y <span className="text-gradient">Proveedores</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Las mejores herramientas y servicios que utilizamos y recomendamos para desarrollo web,
            infraestructura cloud, servidores y backend. Todos los recursos han sido probados y verificados
            por nuestro equipo.
          </p>
        </div>

        {/* Categories */}
        <div>
          {RESOURCE_CATEGORIES.map(category => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="mt-16 p-6 rounded-2xl bg-slate-50 dark:bg-surface-800 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Transparencia en Enlaces de Afiliados
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            FixCode participa en programas de afiliados. Esto significa que cuando realizas una compra
            a través de nuestros enlaces, recibimos una comisión sin costo adicional para ti. Solo
            recomendamos productos y servicios que nosotros mismos usamos y confiamos. Tu apoyo nos
            ayuda a mantener este sitio y crear más contenido de calidad.
          </p>
        </div>
      </div>
    </>
  );
}
