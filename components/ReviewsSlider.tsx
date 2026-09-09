"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { GoogleReview } from "@/lib/google-reviews";

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
    <div className="flex gap-0.5">
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

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className="flex h-full min-h-[220px] flex-col rounded-2xl border border-surface-light bg-background p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">
            {review.author}
          </p>
          <p className="text-xs text-muted">{review.relativeTime}</p>
        </div>
        <GoogleIcon className="h-5 w-5 shrink-0" />
      </div>
      <Stars rating={review.rating} />
      <p className="mt-3 line-clamp-6 flex-1 text-sm leading-relaxed text-muted">
        &ldquo;{review.text}&rdquo;
      </p>
    </article>
  );
}

type Props = {
  reviews: GoogleReview[];
  autoPlayMs?: number;
};

export default function ReviewsSlider({
  reviews,
  autoPlayMs = 4500,
}: Props) {
  const [visible, setVisible] = useState(1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const maxIndex = Math.max(0, reviews.length - visible);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisible(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goTo = (nextIndex: number) => {
    if (maxIndex <= 0) return;
    const wrapped =
      ((nextIndex % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
    setIndex(wrapped);
  };

  useEffect(() => {
    if (!autoPlayMs || paused || maxIndex <= 0) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, autoPlayMs);
    return () => window.clearInterval(timer);
  }, [autoPlayMs, paused, maxIndex]);

  if (reviews.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Önceki yorumlar"
          className="relative z-20 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-surface-light bg-background text-foreground shadow-sm transition hover:border-accent hover:text-accent md:h-12 md:w-12"
        >
          <ChevronLeft className="pointer-events-none h-5 w-5 md:h-6 md:w-6" />
        </button>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(index * 100) / visible}%)`,
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="box-border shrink-0 grow-0 px-1.5 md:px-2"
                style={{ width: `${100 / visible}%` }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Sonraki yorumlar"
          className="relative z-20 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-surface-light bg-background text-foreground shadow-sm transition hover:border-accent hover:text-accent md:h-12 md:w-12"
        >
          <ChevronRight className="pointer-events-none h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Yorum grubu ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 cursor-pointer rounded-full transition-all ${
              i === index
                ? "w-7 bg-accent"
                : "w-2.5 bg-surface-light hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
