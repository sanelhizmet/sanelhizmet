import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import QuoteForm from "@/components/QuoteForm";
import ImageSlider from "@/components/ImageSlider";
import BrandsMarquee from "@/components/BrandsMarquee";
import {
  getServiceBySlug,
  services,
  siteConfig,
} from "@/lib/content";
import { brandsByServiceSlug } from "@/lib/brands";
import { buildServiceJsonLd, getServiceSeo } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Hizmet bulunamadı" };

  const seo = getServiceSeo(
    service.slug,
    service.title,
    service.shortDescription
  );

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/hizmetler/${service.slug}`,
    },
    openGraph: {
      title: `${seo.title} | ${siteConfig.name}`,
      description: seo.description,
      type: "website",
      locale: "tr_TR",
      url: `/hizmetler/${service.slug}`,
      images: [{ url: service.image, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Üstte tek görsel: ana sayfa kategori kartı (slayt yok)
  const pageHeroImage = service.image;
  const serviceBrands = brandsByServiceSlug[service.slug] ?? [];
  const serviceJsonLd = buildServiceJsonLd(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="relative min-h-[40vh] overflow-hidden md:min-h-[48vh]">
          <Image
            src={pageHeroImage}
            alt={service.title}
            fill
            className="object-cover object-center"
            priority
            unoptimized={process.env.NODE_ENV === "development"}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
          <div className="relative z-10 mx-auto flex min-h-[40vh] max-w-6xl flex-col justify-end px-4 py-12 md:min-h-[48vh] md:px-6">
            <Link
              href="/#hizmetler"
              className="mb-4 inline-flex w-fit items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Hizmetlere dön
            </Link>
            <h1 className="max-w-3xl text-3xl font-bold text-white md:text-5xl">
              {service.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/85">
              {service.shortDescription}
            </p>
          </div>
        </section>

        <section className="bg-background py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            {service.description.trim() && (
              <div className="mb-10 space-y-4">
                {service.description.split("\n\n").map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-lg leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Yazının altında vitrin / ürün slaytı */}
            {service.topImages.length > 0 && (
              <div className="mb-14">
                <ImageSlider
                  images={service.topImages}
                  visible={1}
                  autoPlayMs={4000}
                  altPrefix={`${service.title} görsel`}
                  imageClassName="mx-auto aspect-[3/4] w-full max-w-none bg-[#f4f4f5] md:aspect-[4/5] md:max-w-xl"
                  roundedClassName="rounded-2xl"
                  objectFit="contain"
                />
              </div>
            )}

            <div className="mb-14">
              <h2 className="mb-5 text-2xl font-bold text-foreground">
                Neler yapıyoruz?
              </h2>
              <ul className="space-y-3">
                {service.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {serviceBrands.length > 0 && (
              <div className="mb-14">
                <BrandsMarquee
                  brands={serviceBrands}
                  title="Çalıştığımız Markalar"
                  compact
                />
              </div>
            )}

            <div className="mb-14">
              <h2 className="mb-5 text-2xl font-bold text-foreground">
                Nasıl çalışıyoruz?
              </h2>
              <ol className="space-y-6">
                {service.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {service.beforeAfterImages.length > 0 && (
              <div className="mb-14">
                <ImageSlider
                  images={service.beforeAfterImages}
                  visible={1}
                  autoPlayMs={4500}
                  altPrefix={service.title}
                  imageClassName="mx-auto aspect-[3/4] w-full max-w-none bg-[#f4f4f5] md:aspect-[4/5] md:max-w-xl"
                  roundedClassName="rounded-2xl"
                  objectFit="contain"
                />
              </div>
            )}

            <div className="mb-14">
              <h2 className="mb-5 text-2xl font-bold text-foreground">
                Sıkça Sorulan Sorular
              </h2>
              <div className="space-y-5">
                {service.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="mt-1.5 text-muted">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <QuoteForm serviceTitle={service.title} />
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Diğer hizmetler
              </h3>
              <div className="flex flex-wrap gap-2">
                {services
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      href={`/hizmetler/${s.slug}`}
                      className="rounded-full border border-surface-light bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      {s.title}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
