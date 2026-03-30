"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type NavLink = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navLinks: NavLink[];
};

export default function SiteHeader({ navLinks }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 px-3 sm:px-5 lg:px-6 xl:px-8"
      style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top))" }}
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/70 px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "var(--shadow-nav-elevated)",
        }}
      >
        <a href="#hero" className="flex shrink-0 items-center gap-3">
          <Image
            src="/nodes png.png"
            alt="Nodes Technology"
            width={40}
            height={40}
            className="h-9 w-9 rounded-xl object-contain"
          />
          <div className="flex flex-col leading-none">
            <span
              className="text-base font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Nodes
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-link-text)]">
              Technology
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link text-sm font-[var(--font-weight-medium)] tracking-wide hover:text-[var(--color-brand-primary)] ${
                index === 0
                  ? "text-[var(--color-brand-primary)]"
                  : "text-[var(--color-text-body)]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="brand-button hidden items-center justify-center rounded-xl px-5 py-2.5 text-sm font-[var(--font-weight-bold)] text-white sm:inline-flex"
          >
            Consultation stratégique
          </a>
          <button
            type="button"
            className="touch-target inline-flex items-center justify-center rounded-xl p-3 md:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[4.5rem] bg-black/20 md:hidden"
            aria-hidden
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="mobile-navigation"
            className="absolute left-4 right-4 mt-3 flex flex-col gap-2 rounded-2xl border border-[var(--color-border-light)] p-4 md:hidden"
            style={{
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(16px)",
              boxShadow: "var(--shadow-nav-elevated)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-xl px-3 py-3 text-sm font-[var(--font-weight-medium)] text-[var(--color-text-body)] hover:bg-[var(--color-section-tint)] hover:text-[var(--color-brand-primary)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="brand-button mt-1 inline-flex justify-center rounded-xl px-4 py-3 text-sm font-[var(--font-weight-bold)] text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Consultation stratégique
            </a>
          </div>
        </>
      )}
    </header>
  );
}
