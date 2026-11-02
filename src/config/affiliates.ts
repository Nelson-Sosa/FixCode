import type { AffiliateOffer } from '../types/affiliate';

/**
 * Oferta de Namecheap para dominios y SSL
 * ✅ Enlace real de afiliado aprobado desde Impact.com
 */
export const NAMECHEAP_OFFER: AffiliateOffer = {
  id: 'namecheap-domains',
  provider: 'Namecheap',
  title: 'Registra tu Dominio y Certificado SSL',
  description: 'Consigue tu dominio profesional .com o .dev con protección WHOIS gratuita de por vida y configuración DNS instantánea.',
  badge: 'Dominios desde $0.99/año',
  buttonText: 'Buscar Dominio en Namecheap',
  affiliateUrl: 'https://namecheap.pxf.io/c/8096314/1632743/5618',
  isPlaceholder: false,
};

/**
 * Oferta de Vultr para DevOps (Docker, hosting cloud)
 * ✅ Enlace real de afiliado aprobado
 */
export const VULTR_DEVOPS_OFFER: AffiliateOffer = {
  id: 'vultr-devops',
  provider: 'Vultr Cloud',
  title: 'Despliega tus Contenedores y VPS Cloud',
  description: 'Prueba tus configuraciones docker-compose y servidores en la nube de alta velocidad con $300 USD de regalo.',
  badge: '$300 Crédito Gratis',
  buttonText: 'Probar Vultr Cloud',
  affiliateUrl: 'https://www.vultr.com/?ref=9932898',
  isPlaceholder: false,
};

/**
 * Oferta de Vultr para Terminal/Linux (VPS dedicados)
 * ✅ Enlace real de afiliado aprobado
 */
export const VULTR_TERMINAL_OFFER: AffiliateOffer = {
  id: 'vultr-terminal',
  provider: 'Vultr Cloud',
  title: 'Servidores Linux VPS Dedicados',
  description: 'Ejecuta scripts de terminal, permisos chmod y entornos bash en servidores reales. VPS de alto rendimiento desde $2.50/mes.',
  badge: 'VPS desde $2.50/mes',
  buttonText: 'Crear Server en Vultr',
  affiliateUrl: 'https://www.vultr.com/?ref=9932898',
  isPlaceholder: false,
};

/**
 * Oferta de DigitalOcean para hosting cloud (Deprecated - Usar Vultr)
 * @deprecated Usar VULTR_DEVOPS_OFFER en su lugar
 */
export const DIGITALOCEAN_OFFER: AffiliateOffer = {
  id: 'digitalocean-cloud',
  provider: 'DigitalOcean',
  title: '¿Necesitas un servidor para tus contenedores?',
  description: 'DigitalOcean ofrece droplets optimizados para Docker con SSD ultrarrápido y snapshots automáticos. Ideal para desplegar tus stacks en producción.',
  badge: '$200 de Crédito Gratis',
  buttonText: 'Obtener $200 de Crédito Gratis',
  affiliateUrl: 'https://m.do.co/c/your-referral-code', // Placeholder
  isPlaceholder: true,
};

/**
 * Oferta de Udemy para cursos de Linux (Deprecated - Usar Vultr)
 * @deprecated Usar VULTR_TERMINAL_OFFER en su lugar
 */
export const UDEMY_LINUX_OFFER: AffiliateOffer = {
  id: 'udemy-linux-courses',
  provider: 'Udemy',
  title: '¿Quieres dominar Linux como un profesional?',
  description: 'Udemy ofrece cursos completos de Linux y administración de servidores con certificación. Aprende desde comandos básicos hasta administración avanzada.',
  badge: 'Hasta 90% de Descuento',
  buttonText: 'Ver Cursos de Linux',
  affiliateUrl: 'https://udemy.com/your-affiliate-link', // Placeholder
  isPlaceholder: true,
};

/**
 * Oferta de Supabase para Backend (PostgreSQL, Auth, APIs)
 * ⏳ Pendiente: Agregar enlace de PartnerStack
 */
export const SUPABASE_BACKEND_OFFER: AffiliateOffer = {
  id: 'supabase-backend',
  provider: 'Supabase',
  title: 'Bases de Datos Postgres y Autenticación',
  description: 'Crea tu backend completo con bases de datos PostgreSQL en tiempo real, autenticación y APIs instantáneas.',
  badge: 'Tier Gratuito Disponible',
  buttonText: 'Crear Proyecto en Supabase',
  affiliateUrl: 'https://supabase.com', // TODO: Reemplazar con enlace de PartnerStack
  isPlaceholder: true,
};

/**
 * Mapa de ofertas por categoría/contexto
 * Útil para seleccionar dinámicamente según el contenido
 */
export const AFFILIATE_OFFERS = {
  // Frontend
  frontend: NAMECHEAP_OFFER,
  namecheap: NAMECHEAP_OFFER,
  
  // DevOps
  devops: VULTR_DEVOPS_OFFER,
  vultr_devops: VULTR_DEVOPS_OFFER,
  digitalocean: DIGITALOCEAN_OFFER, // Deprecated
  
  // Backend
  backend: SUPABASE_BACKEND_OFFER,
  supabase: SUPABASE_BACKEND_OFFER,
  
  // Terminal / Linux
  terminal: VULTR_TERMINAL_OFFER,
  vultr_terminal: VULTR_TERMINAL_OFFER,
  udemy_linux: UDEMY_LINUX_OFFER, // Deprecated
} as const;

/**
 * Helper para obtener una oferta por ID
 */
export function getOfferById(id: string): AffiliateOffer | undefined {
  return Object.values(AFFILIATE_OFFERS).find(offer => offer.id === id);
}
