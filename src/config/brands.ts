export type BrandKey = "malric" | "angelic";

export interface BrandConfig {
  key: BrandKey;
  name: string;
  className: string; // CSS class applied to body (e.g., brand-malric)
  domainPatterns: string[]; // optional subdomain/domain detection
  logo: string; // path to logo asset
  socials: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  seo: {
    siteTitle: string;
    defaultTitle: string;
    description: string;
    keywords: string;
    siteUrl: string;
    ogImage?: string;
    author?: string;
  };
}

// Import assets (use existing malric logo; for angelic you can add later)
import malricLogo from "../assets/malric.png";

export const BRANDS: Record<BrandKey, BrandConfig> = {
  malric: {
    key: "malric",
    name: "Malric Pharma",
    className: "brand-malric",
    domainPatterns: ["malricpharma.co.ke", "localhost"],
    logo: malricLogo,
    socials: {
      facebook: "https://facebook.com/malricpharma",
      twitter: "https://twitter.com/malricpharma",
      instagram: "https://instagram.com/malricpharma",
      linkedin: "https://linkedin.com/company/malricpharma",
    },
    seo: {
      siteTitle: "Malric Pharma",
      defaultTitle:
        "Malric Pharma - Kenya's Leading Online Pharmacy | Quality Medicines Delivered",
      description:
        "Buy prescription medicines, over-the-counter drugs & health products online in Kenya. Free same-day delivery in Nairobi. Licensed pharmacy with 24/7 support.",
      keywords:
        "pharmacy Kenya, online pharmacy Nairobi, buy medicines online, prescription drugs Kenya, medical supplies, health products",
      siteUrl: "https://malricpharma.co.ke",
      ogImage: "https://malricpharma.co.ke/og-image.jpg",
      author: "Malric Pharma",
    },
  },
  angelic: {
    key: "angelic",
    name: "Angelic Star Pharmacy",
    className: "brand-angelic",
    domainPatterns: ["angelicstar.co.ke", "angelic.localhost"],
    logo: malricLogo, // TODO: replace with angelic logo when available
    socials: {
      facebook: "https://facebook.com/angelicstar",
      instagram: "https://instagram.com/angelicstar",
    },
    seo: {
      siteTitle: "Angelic Star Pharmacy",
      defaultTitle:
        "Angelic Star Pharmacy - Trusted Online Pharmacy | Fast Delivery in Kenya",
      description:
        "Shop prescription and over-the-counter medicines online. Fast delivery, licensed pharmacists, and top-rated service across Kenya.",
      keywords:
        "online pharmacy Kenya, angelic star pharmacy, buy medicines online, OTC drugs Kenya",
      siteUrl: "https://angelicstar.co.ke",
      ogImage: "https://angelicstar.co.ke/og-image.jpg",
      author: "Angelic Star Pharmacy",
    },
  },
};

export function detectBrandByLocation(): BrandKey {
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  const match = (key: BrandKey) =>
    BRANDS[key].domainPatterns.some((pattern) => host.includes(pattern));
  if (match("angelic")) {
    return "angelic";
  }
  return "malric";
}

// Get active brand with optional overrides (query param > env var > hostname)
export function getActiveBrand(): BrandKey {
  if (typeof window !== "undefined") {
    const qp = new URLSearchParams(window.location.search);
    const urlBrand = qp.get("brand") as BrandKey | null;
    if (urlBrand && BRANDS[urlBrand]) {
      return urlBrand;
    }
  }
  // Vite env override (set VITE_BRAND to 'malric' or 'angelic')
  const env = (import.meta as ImportMeta).env as unknown as {
    VITE_BRAND?: string;
  };
  const envBrand = (env?.VITE_BRAND as BrandKey | undefined) || undefined;
  if (envBrand && BRANDS[envBrand]) {
    return envBrand;
  }
  return detectBrandByLocation();
}
