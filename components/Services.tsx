import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="hizmetler" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Hizmetlerimiz
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/hizmetler/${service.slug}`}
              className="group relative block min-h-[260px] overflow-hidden rounded-2xl border border-surface-light shadow-sm transition-all hover:border-accent/40 hover:shadow-lg"
            >
              <Image
                src={service.cardImage}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="mb-1 text-xl font-semibold">{service.title}</h3>
                <p className="mb-3 text-sm text-white/85">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Detaylı incele
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
