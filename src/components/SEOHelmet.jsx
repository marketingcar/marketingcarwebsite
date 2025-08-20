import React from "react";
import { Helmet } from "react-helmet-async";
import config from "@/seo/ogConfig";
// NEW: route-based overrides that both your app and the injector can read
import overrides from "@/seo/overrides.json";

function toAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return null;
  try {
    const url = new URL(pathOrUrl, config.siteUrl);
    return url.href;
  } catch {
    return pathOrUrl;
  }
}

/**
 * Props:
 * - title
 * - description
 * - path (e.g., "/about") used to build canonical + og:url
 * - image (absolute or relative to site origin)
 * - type (default "website")
 * - noIndex (boolean) if true sets robots noindex
 * - locale (default "en_US")
 */
export default function SEOHelmet({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
  locale = "en_US",
}) {
  // Resolve effective route key for overrides
  const runtimePath =
    path ||
    (typeof window !== "undefined" ? window.location.pathname || "/" : "/");

  const o = overrides?.[runtimePath] || {};

  // Apply precedence: overrides.json > explicit props > config defaults
  const finalTitle =
    o.title || title || config.defaultTitle || config.siteName;
  const finalDescription =
    o.description || description || config.defaultDescription;
  const canonicalUrl = toAbsoluteUrl(runtimePath);
  const ogUrl = canonicalUrl;

  const chosenImage = o.image || image || config.defaultImage;
  const ogImage = toAbsoluteUrl(chosenImage);

  const finalType = o.type || type || "website";
  const finalNoIndex = typeof o.noIndex === "boolean" ? o.noIndex : noIndex;
  const finalLocale = o.locale || locale || "en_US";

  const tags = [
    { name: "description", content: finalDescription },
    { property: "og:title", content: finalTitle },
    { property: "og:description", content: finalDescription },
    { property: "og:type", content: finalType },
    { property: "og:site_name", content: config.siteName },
    { property: "og:url", content: ogUrl },
    { property: "og:locale", content: finalLocale },
  ];

  if (ogImage) {
    tags.push({ property: "og:image", content: ogImage });
    tags.push({ property: "og:image:secure_url", content: ogImage });
    tags.push({ property: "og:image:width", content: "1200" });
    tags.push({ property: "og:image:height", content: "630" });
    tags.push({ property: "og:image:alt", content: finalTitle });
  }

  // Twitter
  tags.push({ name: "twitter:card", content: "summary_large_image" });
  if (config.twitterHandle) {
    tags.push({ name: "twitter:site", content: config.twitterHandle });
    tags.push({ name: "twitter:creator", content: config.twitterHandle });
  }
  tags.push({ name: "twitter:title", content: finalTitle });
  tags.push({ name: "twitter:description", content: finalDescription });
  if (ogImage) tags.push({ name: "twitter:image", content: ogImage });

  if (finalNoIndex) {
    tags.push({ name: "robots", content: "noindex,nofollow" });
  } else {
    tags.push({ name: "robots", content: "index,follow" });
  }

  return (
    <Helmet>
      <title>{finalTitle}</title>
      {config.favicon ? <link rel="icon" href={config.favicon} /> : null}
      <link rel="canonical" href={canonicalUrl} />
      {tags.map((t, i) =>
        t.name ? (
          <meta key={i} name={t.name} content={t.content} />
        ) : (
          <meta key={i} property={t.property} content={t.content} />
        )
      )}
    </Helmet>
  );
}
