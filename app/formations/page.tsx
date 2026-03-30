import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Formations certifiantes en data et IA",
  description:
    "Découvrez les formations certifiantes Nodes Technology en data, IA et automatisation, pensées pour des compétences directement applicables.",
  path: "/formations",
  keywords: ["formations data", "formations IA", "formations certifiantes Brazzaville"],
});

const FORMATIONS = [
  {
    slug: "/formations/data-master",
    title: "DATA MASTER",
    tag: "DATA",
    meta1: "Parcours certifiant",
    meta2: "Durée : 15 semaines",
    desc: "DATA MASTER est la formation de référence pour maîtriser la donnée de bout en bout : collecte, analyse, visualisation, modélisation prédictive et pipelines.",
    image: "/DATA.jpg",
  },
  {
    slug: "/formations/ia-master",
    title: "IA MASTER",
    tag: "IA",
    meta1: "Parcours certifiant",
    meta2: "Durée : 10 semaines",
    desc: "IA MASTER est la formation de référence pour comprendre, maîtriser et exploiter l'IA moderne : multimodal, agents, protocole MCP et cas concrets.",
    image: "/IA3.jpg",
  },
] as const;

const UPCOMING = ["Bootcamp Agents IA", "Marketing IA", "Automatisation avancée"];

export default function FormationsIndexPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--color-background-soft)]">
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/formations" },
        ])}
      />
      <section className="px-[var(--padding-section-x)] pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="mx-auto max-w-7xl">
          <BackButton
            fallbackHref="/"
            className="inline-flex items-center gap-2 text-sm font-[var(--font-weight-medium)] text-[var(--color-link-text)] hover:text-[var(--color-brand-primary)] transition-colors"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </BackButton>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_320px] lg:items-end">
            <div className="max-w-3xl">
              <span className="eyebrow">Formations</span>
              <h1
                className="mt-5 text-[44px] font-[var(--font-weight-extrabold)] leading-[var(--line-height-heading)] text-[var(--color-text-heading)]"
                style={{ fontFamily: "var(--font-family-display)", letterSpacing: "-0.04em" }}
              >
                Des parcours conçus pour rendre la data, l&apos;IA et l&apos;automatisation directement utiles.
              </h1>
              <p className="mt-5 max-w-2xl text-[length:var(--font-size-body)] leading-8 text-[var(--color-text-body)]">
                Découvrez nos formations disponibles et les prochains parcours en préparation. Chaque programme est pensé pour développer des compétences concrètes, applicables et professionnalisantes.
              </p>
            </div>

            <div className="surface-card rounded-[var(--radius-card)] p-6">
              <p className="text-xs font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">Accès rapide</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-body)]">
                Explorez les programmes disponibles et choisissez le parcours le plus adapté à votre objectif.
              </p>
              <a
                href="https://wa.me/242056590857"
                target="_blank"
                rel="noopener noreferrer"
                className="brand-button mt-5 inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-5 py-3 text-sm font-[var(--font-weight-bold)] text-white"
              >
                Demander une formation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[var(--padding-section-x)] pb-[var(--padding-section-y)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-[length:var(--font-size-heading-2)] font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]">
                Formations disponibles
              </h2>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-[var(--color-text-body)]">
                Deux parcours de référence pour développer des compétences recherchées en data et en intelligence artificielle.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {FORMATIONS.map((formation) => (
              <article key={formation.slug} className="surface-card lift-card overflow-hidden rounded-[var(--radius-card)]">
                <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_240px]">
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-[var(--color-section-tint)] px-3 py-1 text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                        {formation.tag}
                      </span>
                      <span className="text-xs font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-link-text)]">Disponible</span>
                    </div>

                    <h3
                      className="mt-5 text-[length:var(--font-size-heading-3)] font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]"
                      style={{ fontFamily: "var(--font-family-display)" }}
                    >
                      {formation.title}
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-body)]">
                      <li className="flex items-center gap-2">
                        <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5Z" />
                          <path d="M6 12v6c3 2 9 2 12 0v-6" />
                        </svg>
                        {formation.meta1}
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4" />
                          <path d="M8 2v4" />
                          <path d="M3 10h18" />
                        </svg>
                        {formation.meta2}
                      </li>
                    </ul>

                    <p className="mt-4 text-sm leading-7 text-[var(--color-text-body)] sm:text-base">{formation.desc}</p>

                    <div className="mt-6">
                      <Link
                        href={formation.slug}
                        className="brand-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-5 py-3 text-sm font-[var(--font-weight-bold)] text-white"
                      >
                        Découvrir le programme
                      </Link>
                    </div>
                  </div>

                  <div className="relative min-h-[240px]">
                    <Image src={formation.image} alt={formation.title} fill sizes="(max-width: 1024px) 100vw, 240px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,15,43,0.18)] to-transparent" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="surface-card mt-10 rounded-[var(--radius-card)] p-6 sm:mt-14 sm:p-8">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="max-w-3xl">
                <span className="eyebrow before:hidden">À venir</span>
                <h2
                  className="mt-3 text-[length:var(--font-size-heading-3)] font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]"
                  style={{ fontFamily: "var(--font-family-display)" }}
                >
                  D&apos;autres parcours sont en préparation
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[var(--color-text-body)]">
                  Nous préparons de nouveaux formats pour répondre aux besoins émergents en IA, marketing et automatisation.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 lg:grid-cols-3">
              {UPCOMING.map((title) => (
                <div key={title} className="rounded-2xl border border-[var(--color-border-light)] bg-white p-5">
                  <p className="text-xs font-[var(--font-weight-medium)] text-[var(--color-link-text)]">À venir</p>
                  <p className="mt-2 font-[var(--font-weight-bold)] text-[var(--color-text-heading)]">{title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
