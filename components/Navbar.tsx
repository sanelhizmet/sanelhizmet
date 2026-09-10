"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { navLinks } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        menuOpen
          ? "border-surface-light bg-white"
          : scrolled
            ? "border-surface-light bg-white/95 shadow-md backdrop-blur-md transition-[box-shadow,background-color] duration-300"
            : "border-surface-light/60 bg-white/80 backdrop-blur-sm transition-[box-shadow,background-color] duration-300"
      }`}
    >
      <nav className="relative z-50 mx-auto flex max-w-6xl items-center justify-between bg-white px-4 py-3 md:px-6 lg:bg-transparent">
        <Link
          href="/#anasayfa"
          className="flex shrink-0 items-center"
          onClick={() => setMenuOpen(false)}
        >
          <Logo showWordmark />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-foreground lg:hidden"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden">
          <div className="h-[65px]" />
          <ul className="flex flex-col gap-1 bg-white px-4 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-lg text-foreground transition-colors hover:bg-surface hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
