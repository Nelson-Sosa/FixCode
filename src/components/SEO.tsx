import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string[];
  ogImage?: string;
  type?: 'website' | 'article';
}

export const SEO = ({
  title,
  description,
  canonicalUrl,
  keywords = [],
  ogImage = 'https://fixcode.page/og-default.png',
  type = 'website',
}: SEOProps) => {
  const siteName = 'FixCode';
  const fullTitle = `${title} | ${siteName}`;
  const currentUrl =
    canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://fixcode.page');

  return (
    <Helmet>
      {/* Metadatos Estándar */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="es" />
      <meta name="author" content="FixCode" />
    </Helmet>
  );
};
