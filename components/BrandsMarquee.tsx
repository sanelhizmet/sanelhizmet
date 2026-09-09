import type { Brand } from "@/lib/brands";
import { brandSvgs } from "@/lib/brand-svgs";

function BrandLogo({ id, name }: { id: string; name: string }) {
  const svg = brandSvgs[id];
  return (
    <div
      className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-surface-light bg-white px-4 shadow-sm"
      title={name}
    >
      {svg ? (
        <span
          className="flex h-12 w-full items-center justify-center [&_svg]:h-11 [&_svg]:w-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <span className="text-sm font-bold text-foreground">{name}</span>
      )}
    </div>
  );
}

type BrandsMarqueeProps = {
  brands: Brand[];
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

export default function BrandsMarquee({
  brands,
  title = "Çalıştığımız Markalar",
  subtitle,
  compact = false,
}: BrandsMarqueeProps) {
  if (brands.length === 0) return null;

  const loop = [...brands, ...brands];

  return (
    <section
      className={
        compact
          ? "overflow-hidden py-2"
          : "overflow-hidden bg-surface py-16 md:py-20"
      }
    >
      {(title || subtitle) && (
        <div
          className={
            compact
              ? "mb-5"
              : "mx-auto mb-10 max-w-6xl px-4 text-center md:px-6"
          }
        >
          {title && (
            <h2
              className={
                compact
                  ? "mb-2 text-2xl font-bold text-foreground"
                  : "mb-3 text-3xl font-bold text-foreground md:text-4xl"
              }
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={
                compact ? "text-muted" : "mx-auto max-w-xl text-muted"
              }
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="brands-marquee relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent md:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent md:w-16" />

        <div className="flex w-max gap-5 animate-brands-marquee py-2">
          {loop.map((brand, i) => (
            <BrandLogo
              key={`${brand.id}-${i}`}
              id={brand.id}
              name={brand.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
