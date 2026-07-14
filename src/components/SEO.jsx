import { Helmet } from "react-helmet-async";
import { SITE } from "../config/siteConfig";

export default function SEO({
  title,
  description,
  path = "/",
  image,
  noindex = false,
  jsonLd,
}) {
  const pageTitle = title ? `${title} | ${SITE.name}` : SITE.defaultTitle;
  const pageDescription = description || SITE.defaultDescription;
  const canonical = `${SITE.url}${path}`;
  const ogImage = image || SITE.defaultImage;

  // jsonLd can be a single object or an array of objects (e.g. Organization + Event)
  const jsonLdBlocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={SITE.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
