import { googleBusiness, siteConfig, type Service } from "@/lib/content";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://sanelhizmet.com";

export const seoConfig = {
  title: `${siteConfig.name} | ${siteConfig.tagline} | İstanbul`,
  description:
    "İstanbul'da duşakabin, sıhhi tesisat, klozet, musluk-batarya, fayans ve dolap kurulum / tamir hizmeti. Uygun fiyat, kaliteli işçilik. Ücretsiz keşif.",
  keywords: [
    "Sanel Hizmet",
    "İstanbul duşakabin tamir",
    "İstanbul sıhhi tesisat",
    "İstanbul klozet montaj",
    "İstanbul musluk batarya",
    "İstanbul fayans seramik",
    "İstanbul dolap montaj",
    "duşakabin yenileme İstanbul",
    "rezervuar tamir İstanbul",
    "IKEA dolap kurulum İstanbul",
    "ev tadilat İstanbul",
    "usta İstanbul",
  ],
};

/** Hizmet sayfası SEO (Google arama başlığı + açıklama) */
export const serviceSeo: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  dusakabin: {
    title: "Duşakabin Tamir, Montaj ve Yenileme | İstanbul",
    description:
      "İstanbul'da duşakabin söküm, montaj, tamir ve yenileme. Ölçüye özel kabin, mermer kenar, silikon ve garantili işçilik. Ücretsiz keşif için arayın.",
    keywords: [
      "duşakabin tamir İstanbul",
      "duşakabin montaj",
      "duşakabin yenileme",
      "duş kabini değişimi",
    ],
  },
  "sihhi-tesisat": {
    title: "Sıhhi Tesisat Tamir ve Montaj | İstanbul",
    description:
      "İstanbul'da su tesisatı, mutfak-banyo hattı, gömme klozet tesisatı, su saati ve makine hattı. Kaçak ve arıza için hızlı müdahale.",
    keywords: [
      "sıhhi tesisat İstanbul",
      "su tesisatı tamir",
      "tesisat ustası İstanbul",
      "su kaçağı tamir",
    ],
  },
  "rezervuar-klozet": {
    title: "Klozet ve Rezervuar Tamir Montaj | İstanbul",
    description:
      "İstanbul'da klozet montajı, rezervuar iç takım, sifon, taharet musluğu ve asma klozet değişimi. Su kaçırma arızalarına hızlı çözüm.",
    keywords: [
      "klozet tamir İstanbul",
      "rezervuar tamir",
      "gömme rezervuar",
      "klozet montaj",
    ],
  },
  "musluk-batarya": {
    title: "Musluk ve Batarya Montaj Tamir | İstanbul",
    description:
      "İstanbul'da banyo-mutfak bataryası, duş seti, bahçe musluğu ve vana değişimi. Franke, Blanco, Geberit ve benzeri markalarla montaj.",
    keywords: [
      "musluk değişimi İstanbul",
      "batarya montaj",
      "duş seti montaj",
      "mutfak bataryası",
    ],
  },
  fayans: {
    title: "Fayans ve Seramik Döşeme Tamir | İstanbul",
    description:
      "İstanbul'da banyo-mutfak fayansı, hol ve teras seramik, derz yenileme, kırık fayans onarımı. Profesyonel döşeme ve ücretsiz keşif.",
    keywords: [
      "fayans döşeme İstanbul",
      "seramik ustası",
      "banyo fayansı",
      "teras fayans",
    ],
  },
  mutfak: {
    title: "Dolap Kurulum ve Tamir | İstanbul",
    description:
      "İstanbul'da IKEA, Koçtaş, Bauhaus demonte dolap kurulumu; banyo, mutfak, vestiyer ve ayakkabılık montaj-tamir. Profesyonel montaj hizmeti.",
    keywords: [
      "dolap montaj İstanbul",
      "IKEA kurulum",
      "mobilya montaj",
      "mutfak dolabı kurulum",
    ],
  },
};

export function getServiceSeo(slug: string, fallbackTitle: string, fallbackDescription: string) {
  return (
    serviceSeo[slug] ?? {
      title: `${fallbackTitle} | İstanbul`,
      description: fallbackDescription,
      keywords: [fallbackTitle, "İstanbul"],
    }
  );
}

export function buildLocalBusinessJsonLd(rating?: {
  value: number;
  count: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    description: seoConfig.description,
    url: siteUrl,
    telephone: siteConfig.phone,
    areaServed: {
      "@type": "City",
      name: "İstanbul",
    },
    image: `${siteUrl}/logo.png`,
    sameAs: [googleBusiness.mapsUrl, googleBusiness.reviewsUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fevzi Çakmak Mahallesi, Altın Sk. No:6",
      addressLocality: "Küçükçekmece",
      addressRegion: "İstanbul",
      postalCode: "34290",
      addressCountry: "TR",
    },
    priceRange: "$$",
    ...(rating && rating.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            reviewCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export function buildServiceJsonLd(service: Service) {
  const seo = getServiceSeo(
    service.slug,
    service.title,
    service.shortDescription
  );
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: seo.description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteUrl,
    },
    areaServed: {
      "@type": "City",
      name: "İstanbul",
    },
    url: `${siteUrl}/hizmetler/${service.slug}`,
    image: `${siteUrl}${service.image}`,
  };
}
