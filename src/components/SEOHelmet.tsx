import { Helmet } from "react-helmet-async";

interface SEOHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: object;
}

export default function SEOHelmet({
  title = "Malric Pharma - Kenya's Leading Online Pharmacy | Quality Medicines Delivered",
  description = "Buy prescription medicines, over-the-counter drugs & health products online in Kenya. Free same-day delivery in Nairobi. Licensed pharmacy with 24/7 support.",
  keywords = "pharmacy Kenya, online pharmacy Nairobi, buy medicines online, prescription drugs Kenya, medical supplies, health products",
  image = "https://malricpharma.co.ke/og-image.jpg",
  url = "https://malricpharma.co.ke",
  type = "website",
  schema,
}: SEOHelmetProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Malric Pharma" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Schema.org structured data */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
