import type { AffiliateOffer } from '../types/affiliate';

/**
 * Oferta de Namecheap para dominios y SSL
 * TODO: Reemplazar affiliateUrl cuando Impact.com apruebe el enlace
 */
export const NAMECHEAP_OFFER: AffiliateOffer = {
  id: 'namecheap-domains',
  provider: 'Namecheap',
  title: 'Registra tu Dominio y Certificado SSL',
  description: 'Consigue tu dominio profesional .com o .dev con protección WHOIS gratuita de por vida y configuración DNS instantánea.',
  badge: 'Dominios desde $0.99/año',
  buttonText: 'Buscar Dominio en Namecheap',
  affiliateUrl: 'https://www.namecheap.com/', // Placeholder - Actualizar con enlace de Impact.com
  isPlaceholder: true,
};

/**
 * Oferta de DigitalOcean para hosting cloud
 * TODO: Reemplazar affiliateUrl cuando se apruebe
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
 * Oferta de Udemy para cursos de Linux
 * TODO: Reemplazar affiliateUrl cuando se apruebe
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
 * Mapa de ofertas por categoría/contexto
 * Útil para seleccionar dinámicamente según el contenido
 */
export const AFFILIATE_OFFERS = {
  namecheap: NAMECHEAP_OFFER,
  digitalocean: DIGITALOCEAN_OFFER,
  udemy_linux: UDEMY_LINUX_OFFER,
} as const;

/**
 * Helper para obtener una oferta por ID
 */
export function getOfferById(id: string): AffiliateOffer | undefined {
  return Object.values(AFFILIATE_OFFERS).find(offer => offer.id === id);
}
