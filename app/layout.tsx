import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { buildLocalBusinessJsonLd, seoConfig, siteUrl } from "@/lib/seo";
import { getGoogleReviews } from "@/lib/google-reviews";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoConfig.title,
    template: `%s | Sanel Hizmet`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: "Sanel Hizmet" }],
  creator: "Sanel Hizmet",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png" }],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Sanel Hizmet",
    title: seoConfig.title,
    description: seoConfig.description,
    images: [{ url: "/logo.png", alt: "Sanel Hizmet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.title,
    description: seoConfig.description,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Search Console > Ayarlar > Sahiplik doğrulama > HTML etiketi
    // .env içine GOOGLE_SITE_VERIFICATION=xxxxx yazın
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reviews = await getGoogleReviews();
  const jsonLd = buildLocalBusinessJsonLd({
    value: reviews.rating,
    count: reviews.total,
  });

  return (
    <html lang="tr" className={`${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
