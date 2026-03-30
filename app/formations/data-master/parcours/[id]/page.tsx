import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import StructuredData from "@/components/StructuredData";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buildBreadcrumbJsonLd,
  buildCourseJsonLd,
  buildMetadata,
} from "@/lib/seo";
import { DATA_MASTER_MODULES, DATA_MASTER_PARCOURS } from "../../data-master-data";

const AVAILABLE_PARCOURS = {
  "1": {
    date: "9 mai",
    location: "Immeubles Perspectives d'Avenirs, Plateau, Brazzaville",
    paymentUrl: "https://pay.yabetoo.com/p/p1TCYRaOTCZd",
  },
  "2": {
    date: "8 mai",
    location: "Immeubles Perspectives d'Avenirs, Plateau, Brazzaville",
    paymentUrl: "https://pay.yabetoo.com/p/vr5Y8UgXuaeD",
  },
} as const;

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return DATA_MASTER_PARCOURS.map((parcours) => ({ id: parcours.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const parcours = DATA_MASTER_PARCOURS.find((item) => item.id === id);

  if (!parcours) {
    return buildMetadata({
      title: "Parcours introuvable",
      description: "Le parcours demandé est introuvable.",
      path: "/formations/data-master",
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `DATA MASTER - ${parcours.title}`,
    description: `${parcours.title} dans DATA MASTER : ${parcours.who}`,
    path: `/formations/data-master/parcours/${parcours.id}`,
    keywords: ["DATA MASTER", parcours.title, "parcours data"],
    image: "/DATA.jpg",
  });
}

export default async function DataMasterParcoursPage({ params }: PageProps) {
  const { id } = await params;
  const parcours = DATA_MASTER_PARCOURS.find((item) => item.id === id);
  if (!parcours) notFound();

  const orderedModules = parcours.modules
    .map((moduleId) => DATA_MASTER_MODULES.find((module) => module.id === moduleId))
    .filter(Boolean);
  const session =
    parcours.id in AVAILABLE_PARCOURS
      ? AVAILABLE_PARCOURS[parcours.id as keyof typeof AVAILABLE_PARCOURS]
      : null;

  return (
    <main className="min-h-[100dvh] bg-[var(--color-background-soft)] px-[var(--padding-section-x)] py-10 min-[360px]:py-12 sm:py-16">
      <StructuredData
        data={[
          buildBreadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Formations", path: "/formations" },
            { name: "DATA MASTER", path: "/formations/data-master" },
            {
              name: parcours.title,
              path: `/formations/data-master/parcours/${parcours.id}`,
            },
          ]),
          buildCourseJsonLd({
            name: `DATA MASTER - ${parcours.title}`,
            description: parcours.who,
            path: `/formations/data-master/parcours/${parcours.id}`,
          }),
        ]}
      />

      <div className="mx-auto max-w-7xl">
        <BackButton
          fallbackHref="/formations/data-master"
          className="inline-flex items-center gap-2 text-sm font-[var(--font-weight-medium)] text-[var(--color-link-text)] transition-all hover:-translate-x-1 hover:text-[var(--color-brand-primary)]"
          style={{ fontFamily: "var(--font-family-sans)" }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </BackButton>

        <section className="mt-8 sm:mt-10">
          <div className="surface-card overflow-hidden rounded-[calc(var(--radius-card)+0.2rem)]">
            <div className="h-1 w-full bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-primary)]/55 to-transparent" />
            <div className="p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-[var(--color-brand-primary)] px-3 py-1 text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-white">
                  Parcours {parcours.id.padStart(2, "0")}
                </span>
                <span className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-link-text)]">
                  Data Master
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-4xl">
                  <h1
                    className="text-[clamp(2.5rem,6vw,44px)] font-[var(--font-weight-extrabold)] leading-[1.04] text-[var(--color-text-heading)]"
                    style={{ fontFamily: "var(--font-family-display)", letterSpacing: "-0.04em" }}
                  >
                    {parcours.title}
                  </h1>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-text-body)] sm:text-lg">
                    {parcours.who}
                  </p>
                </div>

                <div className="grid w-full max-w-sm gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[var(--color-border-light)] bg-white px-4 py-3.5">
                    <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-link-text)]">
                      Durée
                    </p>
                    <p className="mt-1 text-sm font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]">
                      {parcours.duration}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-border-light)] bg-white px-4 py-3.5">
                    <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-link-text)]">
                      Rythme
                    </p>
                    <p className="mt-1 text-sm font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]">
                      {parcours.rhythm}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <div className="mb-2">
              <h2
                className="text-[length:var(--font-size-heading-2)] font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                Programme du <span className="text-[var(--color-brand-primary)]">parcours</span>
              </h2>
              <p className="mt-3 text-base text-[var(--color-text-body)] sm:text-lg">
                Un parcours structuré pour construire des compétences utiles, directement applicables dans un contexte professionnel.
              </p>
            </div>

            {orderedModules.map((module, idx) => (
              <article
                key={module!.id}
                className="surface-card lift-card rounded-[calc(var(--radius-card)-0.05rem)] p-6 sm:p-7"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center rounded-full border border-[var(--color-border-light)] bg-white px-3 py-1 text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-link-text)]">
                        Module {module!.id}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-[var(--color-section-tint)] px-3 py-1 text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.12em] text-[var(--color-brand-primary)]">
                        {module!.level}
                      </span>
                    </div>

                    <h3
                      className="mt-4 text-[1.45rem] font-[var(--font-weight-extrabold)] leading-[1.08] text-[var(--color-text-heading)]"
                      style={{ fontFamily: "var(--font-family-display)" }}
                    >
                      {module!.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[var(--color-text-body)] sm:text-base">
                      {module!.summary}
                    </p>
                  </div>

                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border-light)] bg-white text-sm font-[var(--font-weight-extrabold)] text-[var(--color-brand-primary)]">
                    {idx + 1}
                  </div>
                </div>

                <div className="mt-6 rounded-[1.35rem] border border-[var(--color-border-light)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,242,249,0.85))] p-4">
                  <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-brand-primary)]">
                    Projet pratique
                  </p>
                  <p className="mt-2 text-[13px] font-[var(--font-weight-medium)] leading-6 text-[var(--color-text-heading)]">
                    {module!.project}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="surface-card rounded-[calc(var(--radius-card)-0.05rem)] p-6 sm:p-7">
              <h3
                className="text-[1.45rem] font-[var(--font-weight-extrabold)] leading-[1.08] text-[var(--color-text-heading)]"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                Objectif du parcours
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-body)] sm:text-base">
                {parcours.outcome}
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-[var(--color-border-light)] bg-white px-4 py-3.5">
                  <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-link-text)]">
                    Tarif
                  </p>
                  <p className="mt-1 text-sm font-[var(--font-weight-extrabold)] text-[var(--color-brand-primary)]">
                    25 000 FCFA
                  </p>
                </div>
                {session && (
                  <div className="rounded-[1.35rem] border border-[var(--color-brand-primary)]/10 bg-[linear-gradient(180deg,rgba(236,232,248,0.55),rgba(255,255,255,0.92))] p-4">
                    <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-brand-primary)]">
                      Session ouverte
                    </p>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-heading)]">
                      <p>
                        <span className="font-[var(--font-weight-bold)]">Date :</span> {session.date}
                      </p>
                      <p>
                        <span className="font-[var(--font-weight-bold)]">Lieu :</span> {session.location}
                      </p>
                      <p>
                        <span className="font-[var(--font-weight-bold)]">Format :</span> Disponible en ligne
                      </p>
                      <p>
                        <span className="font-[var(--font-weight-bold)]">Places :</span> Limitées
                      </p>
                    </div>
                  </div>
                )}
                {session ? (
                  <a
                    href={session.paymentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="brand-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-6 py-3.5 text-sm font-[var(--font-weight-bold)] text-white"
                  >
                    S&apos;inscrire et payer
                  </a>
                ) : (
                  <Link
                    href={{ pathname: "/formulaire/inscription", query: { parcours: `DATA MASTER — ${parcours.title}` } }}
                    className="brand-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-6 py-3.5 text-sm font-[var(--font-weight-bold)] text-white"
                  >
                    S&apos;inscrire et payer
                  </Link>
                )}
              </div>
            </div>

            <div className="surface-card rounded-[calc(var(--radius-card)-0.05rem)] p-6">
              <h4 className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-link-text)]">
                Informations clés
              </h4>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-[var(--color-border-light)] bg-white px-4 py-3">
                  <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.12em] text-[var(--color-link-text)]">
                    Modules
                  </p>
                  <p className="mt-1 text-sm font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]">
                    {orderedModules.length} modules
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--color-border-light)] bg-white px-4 py-3">
                  <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.12em] text-[var(--color-link-text)]">
                    Rythme
                  </p>
                  <p className="mt-1 text-sm font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]">
                    {parcours.rhythm}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
