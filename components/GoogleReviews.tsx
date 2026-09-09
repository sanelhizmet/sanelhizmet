import { ExternalLink, MapPin, Star } from "lucide-react";
import ReviewsSlider from "@/components/ReviewsSlider";
import { googleBusiness, siteConfig } from "@/lib/content";
import type { GoogleReviewsData } from "@/lib/google-reviews";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} üzerinden 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating)
              ? "fill-accent text-accent"
              : "text-surface-light"
          }`}
        />
      ))}
    </div>
  );
}

type Props = {
  data: GoogleReviewsData;
};

export default function GoogleReviews({ data }: Props) {
  return (
    <div>
      <div className="mb-10 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <GoogleIcon className="h-7 w-7" />
          <h3 className="text-2xl font-bold text-foreground md:text-3xl">
            Müşteri Yorumları
          </h3>
        </div>
        <p className="mx-auto max-w-xl text-muted">
          Müşterilerimizin Google İşletme hesabımızdaki gerçek yorumları.
        </p>
      </div>

      <div className="mb-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-surface-light bg-surface px-6 py-5 sm:flex-row sm:gap-6">
        <div className="flex items-center gap-3">
          <GoogleIcon className="h-8 w-8" />
          <div>
            <p className="font-semibold text-foreground">{siteConfig.name}</p>
            <p className="text-sm text-muted">Google İşletme Puanı</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-foreground">
            {data.rating.toFixed(1)}
          </span>
          <div>
            <Stars rating={data.rating} />
            <p className="mt-0.5 text-xs text-muted">{data.total} yorum</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <ReviewsSlider reviews={data.reviews} autoPlayMs={4500} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-light bg-background shadow-lg">
        <div className="grid lg:grid-cols-5">
          <div className="flex flex-col justify-center gap-4 p-6 md:p-8 lg:col-span-2">
            <p className="text-sm leading-relaxed text-muted">
              Tüm yorumları Google&apos;da inceleyebilir, kendi yorumunuzu
              bırakabilirsiniz.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={googleBusiness.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4285F4] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <GoogleIcon className="h-5 w-5 rounded-full bg-white p-0.5" />
                Google&apos;da Tüm Yorumları Gör
                <ExternalLink className="h-4 w-4 opacity-80" />
              </a>
              <a
                href={googleBusiness.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-surface-light bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/30 hover:bg-background"
              >
                <Star className="h-4 w-4 text-accent" />
                Google&apos;da Yorum Yaz
                <ExternalLink className="h-4 w-4 text-muted" />
              </a>
              <a
                href={googleBusiness.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-surface-light px-5 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                <MapPin className="h-4 w-4" />
                Google Haritalar&apos;da Aç
              </a>
            </div>
          </div>

          <div className="relative min-h-[280px] lg:col-span-3 lg:min-h-[400px]">
            <iframe
              src={googleBusiness.mapsEmbedUrl}
              title={`${siteConfig.name} Google Haritalar`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
