import BackButton from "@/components/BackButton";
import Image from "next/image";
import Link from "next/link";
import { IA_MASTER_PARCOURS } from "./ia-master-data";

const AVAILABLE_PARCOURS = {
  "1": {
    paymentUrl: "https://pay.yabetoo.com/p/4aP9LNW8N4QL",
  },
  "2": {
    paymentUrl: "https://pay.yabetoo.com/p/5T0IS1mOmTDF",
  },
} as const;

export default function IaMasterPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--color-background-soft)]">
      <section className="px-[var(--padding-section-x)] pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="mx-auto max-w-7xl">
          <BackButton
            fallbackHref="/formations"
            className="inline-flex items-center gap-2 text-sm font-[var(--font-weight-medium)] text-[var(--color-link-text)] hover:text-[var(--color-brand-primary)] transition-all hover:-translate-x-1"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </BackButton>

          <section className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_420px] lg:items-end">
            <div className="max-w-3xl">
              <span className="eyebrow">Formations certifiantes</span>
              <h1
                className="mt-5 text-[44px] font-[var(--font-weight-extrabold)] leading-[var(--line-height-heading)] text-[var(--color-text-heading)]"
                style={{ fontFamily: "var(--font-family-display)", letterSpacing: "-0.04em" }}
              >
                IA <span className="text-[var(--color-brand-primary)]">MASTER</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-body)] sm:text-lg">
                Apprenez à utiliser l&apos;IA pour créer, automatiser et produire plus vite. Une formation concrète pour transformer l&apos;IA en résultats utiles.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#parcours"
                  className="secondary-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-6 py-3.5 text-sm font-[var(--font-weight-bold)] text-[var(--color-text-heading)] sm:text-base"
                >
                  Explorer les 6 parcours
                </a>
              </div>

              <div className="mt-8 grid gap-4 border-t border-[var(--color-border-light)] pt-6 sm:grid-cols-2 sm:gap-6 sm:pt-8">
                <div className="surface-card rounded-2xl p-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-section-tint)] text-[var(--color-brand-primary)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-[var(--font-weight-medium)] text-[var(--color-text-heading)]">IA pratique et accessible</p>
                </div>
                <div className="surface-card rounded-2xl p-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-section-tint)] text-[var(--color-brand-primary)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-[var(--font-weight-medium)] text-[var(--color-text-heading)]">Création, agents et automatisation</p>
                </div>
              </div>
            </div>

            <div className="surface-card overflow-hidden rounded-[calc(var(--radius-card)+0.2rem)] p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius-card)-0.15rem)]">
                <Image src="/IA3.jpg" alt="IA MASTER" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 420px" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,15,43,0.2)] to-transparent" />
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="parcours" className="px-[var(--padding-section-x)] py-[var(--padding-section-y)]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <span className="eyebrow justify-center before:hidden">Parcours</span>
            <h2
              className="mt-4 text-[length:var(--font-size-heading-2)] font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Trouvez votre <span className="text-[var(--color-brand-primary)]">voie d&apos;expertise</span>
            </h2>
            <p className="mt-3 text-base text-[var(--color-text-body)] sm:text-lg">
              Choisissez le parcours qui correspond le mieux à votre niveau et à vos objectifs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {IA_MASTER_PARCOURS.map((p, idx) => {
              const isAvailable = p.id in AVAILABLE_PARCOURS;

              return (
                <article
                  key={p.id}
                  className={`surface-card flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] ${
                    isAvailable ? "lift-card" : "opacity-75"
                  }`}
                >
                  <div className="h-1 w-full bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-primary)]/55 to-transparent" />

                  <div className="border-b border-[var(--color-border-light)]/90 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.18em] text-[var(--color-link-text)]">
                          Parcours {String(idx + 1).padStart(2, "0")}
                        </span>
                        <h3
                          className="mt-3 max-w-[15ch] text-[1.45rem] font-[var(--font-weight-extrabold)] leading-[1.08] text-[var(--color-text-heading)]"
                          style={{ fontFamily: "var(--font-family-display)" }}
                        >
                          {p.title}
                        </h3>
                      </div>

                      {isAvailable ? (
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-[var(--font-weight-extrabold)] uppercase tracking-[0.14em] text-emerald-700">
                          Disponible
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-[var(--font-weight-extrabold)] uppercase tracking-[0.14em] text-slate-600">
                          Indisponible
                        </span>
                      )}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl border border-[var(--color-border-light)]/90 bg-white px-4 py-3">
                        <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-link-text)]">Tarif</p>
                        <p className="mt-1 text-[1rem] font-[var(--font-weight-extrabold)] text-[var(--color-brand-primary)]">25 000 FCFA</p>
                      </div>
                      <div className="rounded-2xl border border-[var(--color-border-light)]/90 bg-white px-4 py-3">
                        <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-link-text)]">Durée</p>
                        <p className="mt-1 text-[1rem] font-[var(--font-weight-bold)] text-[var(--color-text-heading)]">{p.duration}</p>
                      </div>
                    </div>

                    <p className="mt-4 flex items-center gap-1.5 text-[11px] font-[var(--font-weight-bold)] uppercase tracking-[0.12em] text-[var(--color-link-text)]">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      2 sessions par semaine
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
                    <p className="line-clamp-3 min-h-[5.1rem] text-sm leading-7 text-[var(--color-text-body)]">{p.who}</p>

                    <div>
                      <h4 className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-link-text)]">
                        Modules clés
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.modules.map((m) => (
                          <span
                            key={m}
                            className="inline-flex items-center rounded-full border border-[var(--color-border-light)] bg-white px-3 py-1.5 text-[11px] font-[var(--font-weight-bold)] text-[var(--color-text-heading)] shadow-[0_6px_16px_rgba(17,15,43,0.04)]"
                          >
                            M{m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto rounded-[1.35rem] border border-[var(--color-border-light)]/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,242,249,0.85))] p-4">
                      <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-brand-primary)]">Impact final</p>
                      <p className="mt-2 text-[13px] font-[var(--font-weight-medium)] leading-6 text-[var(--color-text-heading)]">
                        {p.outcome}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <Link
                        href={`/formations/ia-master/parcours/${p.id}`}
                        className="secondary-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-5 py-3 text-sm font-[var(--font-weight-bold)] text-[var(--color-text-heading)]"
                      >
                        Détails du programme
                      </Link>
                      {isAvailable ? (
                        <a
                          href={AVAILABLE_PARCOURS[p.id as keyof typeof AVAILABLE_PARCOURS].paymentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="brand-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-5 py-3 text-sm font-[var(--font-weight-bold)] text-white"
                        >
                          S&apos;inscrire et payer
                        </a>
                      ) : (
                        <div className="inline-flex items-center justify-center rounded-[var(--border-radius-button)] border border-dashed border-[var(--color-border-light)] bg-white/70 px-5 py-3 text-sm font-[var(--font-weight-bold)] text-[var(--color-link-text)]">
                          Bientôt disponible
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-[var(--padding-section-x)] pb-[var(--padding-section-y)]">
        <div className="mx-auto max-w-7xl">
          <section className="surface-card relative overflow-hidden rounded-[calc(var(--radius-card)+0.2rem)] p-6 text-center sm:p-12">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[var(--color-brand-primary)]/5 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[var(--color-brand-primary)]/5 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow justify-center before:hidden">Pourquoi cette formation</span>
              <h2
                className="mt-4 text-[length:var(--font-size-heading-2)] font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                Une formation pensée pour <span className="text-[var(--color-brand-primary)]">votre succès</span>
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--color-text-body)] sm:text-lg">
                Nous vous apprenons à utiliser l&apos;IA pour gagner du temps, produire mieux et créer de la valeur dans votre activité.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-[var(--font-weight-extrabold)] text-[var(--color-brand-primary)]">100%</span>
                  <span className="mt-1 text-xs font-[var(--font-weight-bold)] uppercase text-[var(--color-link-text)]">Pratique</span>
                </div>
                <div className="hidden h-12 w-px bg-[var(--color-border-light)] sm:block" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-[var(--font-weight-extrabold)] text-[var(--color-brand-primary)]">Pro</span>
                  <span className="mt-1 text-xs font-[var(--font-weight-bold)] uppercase text-[var(--color-link-text)]">Mentorat</span>
                </div>
                <div className="hidden h-12 w-px bg-[var(--color-border-light)] sm:block" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-[var(--font-weight-extrabold)] text-[var(--color-brand-primary)]">H24</span>
                  <span className="mt-1 text-xs font-[var(--font-weight-bold)] uppercase text-[var(--color-link-text)]">Accès</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
