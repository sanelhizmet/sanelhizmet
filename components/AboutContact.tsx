import { MapPin, Phone } from "lucide-react";
import { aboutContent, siteConfig } from "@/lib/content";

export default function AboutContact() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div id="biz-kimiz" className="scroll-mt-24 rounded-2xl border border-surface-light bg-background p-6 md:p-8">
            <h2 className="mb-3 text-xl font-bold text-foreground">
              {aboutContent.whoWeAre.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {aboutContent.whoWeAre.text}
            </p>
          </div>

          <div id="hakkimizda" className="scroll-mt-24 rounded-2xl border border-surface-light bg-background p-6 md:p-8">
            <h2 className="mb-3 text-xl font-bold text-foreground">
              {aboutContent.aboutUs.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {aboutContent.aboutUs.text}
            </p>
          </div>

          <div id="iletisim" className="scroll-mt-24 rounded-2xl border border-surface-light bg-background p-6 md:p-8">
            <h2 className="mb-3 text-xl font-bold text-foreground">
              {aboutContent.contact.title}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              {aboutContent.contact.text}
            </p>
            <div className="space-y-2 text-sm text-foreground">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" />
                {siteConfig.phone}
              </a>
              <p className="flex items-start gap-2 text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{siteConfig.address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
