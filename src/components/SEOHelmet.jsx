import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_DEFAULTS } from '@/seo/ogConfig';

function absoluteUrl(pathOrUrl, base = SEO_DEFAULTS.SITE_URL) {
  if (!pathOrUrl) return base;
  try { return new URL(pathOrUrl, base).href; } catch { return `${base}${pathOrUrl}`; }
}

export default function SEOHelmet({
  title,
  description,
  image,
  url,
  type = 'website',
  twitterCard = 'summary_large_image',
}) {
  const finalTitle = title || SEO_DEFAULTS.TITLE;
  const finalDesc  = description || SEO_DEFAULTS.DESCRIPTION;
  const finalUrl   = absoluteUrl(url || (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const finalImg   = absoluteUrl(image || SEO_DEFAULTS.IMAGE);

  return (
    <Helmet>
      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />

      {/* Basic */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImg} />
      <meta property="og:site_name" content={SEO_DEFAULTS.SITE_NAME} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImg} />
    </Helmet>
  );
}
