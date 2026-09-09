import Link from "next/link";
import Logo from "@/components/Logo";
import { aboutContent, navLinks, siteConfig } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-light bg-background py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo showIcon={false} showWordmark className="mb-3" />
            <p className="text-sm leading-relaxed text-muted">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              {aboutContent.whoWeAre.title}
            </p>
            <a
              href="/#biz-kimiz"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Biz kimiz?
            </a>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              {aboutContent.aboutUs.title}
            </p>
            <a
              href="/#hakkimizda"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Hakkımızda
            </a>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              {aboutContent.contact.title}
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <a href="/#iletisim" className="hover:text-accent">
                İletişim bilgileri
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="hover:text-accent"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-surface-light pt-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted">
            © {year} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p className="text-sm text-muted">
            Powered by{" "}
            <a
              href="https://akiyom.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-accent"
            >
              akiyom.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
