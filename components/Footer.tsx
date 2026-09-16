import Logo from "@/components/Logo";
import HomeHashLink from "@/components/HomeHashLink";
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
            <HomeHashLink
              href="/#biz-kimiz"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Biz kimiz?
            </HomeHashLink>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              {aboutContent.aboutUs.title}
            </p>
            <HomeHashLink
              href="/#hakkimizda"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Hakkımızda
            </HomeHashLink>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              {aboutContent.contact.title}
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <HomeHashLink href="/#iletisim" className="hover:text-accent">
                İletişim bilgileri
              </HomeHashLink>
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
            <HomeHashLink
              key={link.href}
              href={link.href}
              className="text-xs text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </HomeHashLink>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-5">
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
