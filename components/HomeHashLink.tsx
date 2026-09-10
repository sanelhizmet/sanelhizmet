"use client";

import type { MouseEvent, ReactNode } from "react";

type HomeHashLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

/**
 * Ana sayfa hash linklerini tek ve temiz tutar.
 * Örn. /#hizmetler → /#anasayfa (çift hash oluşmaz).
 */
export default function HomeHashLink({
  href,
  className,
  children,
  onNavigate,
}: HomeHashLinkProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const url = new URL(href, window.location.origin);
    const isHomePath = url.pathname === "/" || url.pathname === "";
    if (!isHomePath) return;

    event.preventDefault();
    onNavigate?.();

    const hash = url.hash.replace(/^#/, "");
    const cleanUrl = hash ? `/#${hash}` : "/";

    // Her zaman path'i / yapıp tek hash bırak
    window.history.pushState(null, "", cleanUrl);

    if (hash) {
      // Layout/paint sonrası scroll
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
