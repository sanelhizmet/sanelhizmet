"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ImageSliderProps = {
  images: readonly string[];
  visible?: number;
  autoPlayMs?: number;
  showDots?: boolean;
  showCounter?: boolean;
  altPrefix?: string;
  imageClassName?: string;
  roundedClassName?: string;
  objectFit?: "cover" | "contain";
};

export default function ImageSlider({
  images,
  visible = 1,
  autoPlayMs = 0,
  showDots = true,
  showCounter = false,
  altPrefix = "Görsel",
  imageClassName = "aspect-[16/10] md:aspect-[16/9]",
  roundedClassName = "rounded-2xl",
  objectFit = "cover",
}: ImageSliderProps) {
  const maxIndex = Math.max(0, images.length - visible);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (nextIndex: number) => {
    if (maxIndex <= 0) return;
    const wrapped =
      ((nextIndex % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
    setIndex(wrapped);
  };

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!autoPlayMs || paused || maxIndex <= 0) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, autoPlayMs);
    return () => window.clearInterval(timer);
  }, [autoPlayMs, paused, maxIndex]);

  if (images.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="min-w-0 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(index * 100) / visible}%)`,
            }}
          >
            {images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="box-border shrink-0 grow-0 md:px-2"
                style={{ width: `${100 / visible}%` }}
              >
                <div
                  className={`relative overflow-hidden border border-surface-light bg-surface ${imageClassName} ${roundedClassName}`}
                >
                  <Image
                    src={src}
                    alt={`${altPrefix} ${i + 1}`}
                    fill
                    className={
                      objectFit === "contain"
                        ? "object-contain"
                        : "object-cover"
                    }
                    sizes={
                      visible > 1
                        ? "(max-width: 768px) 90vw, 33vw"
                        : "(max-width: 768px) 100vw, 900px"
                    }
                    priority={i < visible}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
      </div>

      {(showDots || showCounter) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {showCounter && (
            <span className="text-sm font-medium text-muted">
              {index + 1} / {images.length}
            </span>
          )}
          {showDots && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Slayt ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 cursor-pointer rounded-full transition-all ${
                    i === index
                      ? "w-7 bg-accent"
                      : "w-2.5 bg-surface-light hover:bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
