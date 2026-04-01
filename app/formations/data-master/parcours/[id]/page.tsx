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

type PageProps = {
  params: Promise<{ id: string }>;
};

const DATA_MASTER_PRICE = "25 000 FCFA";

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
    .map((moduleId) =>
      DATA_MASTER_MODULES.find((module) => module.id === moduleId)
    )
    .filter(Boolean);

  return (
    <main
      className="min-h-[100dvh] px-[var(--padding-section-x)] py-10 min-[360px]:py-12 sm:py-20"
      style={{ background: "var(--color-background-white)" }}
    >
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

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-[var(--color-brand-primary)]/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] h-[30%] w-[30%] rounded-full bg-[var(--color-brand-primary)]/3 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px]">
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

        <section className="group mt-8 sm:mt-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--color-border-light)] bg-white/40 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-[var(--color-brand-primary)]/10 sm:p-12">
            <div className="pointer-events-none absolute right-0 top-0 p-10 opacity-[0.03] transition-opacity group-hover:opacity-[0.06] sm:p-12">
              <span
                className="text-[6rem] font-[var(--font-weight-extrabold)] leading-none sm:text-[12rem]"
                style={{ fontFamily: "var(--font-family-sans)" }}
              >
                {parcours.id}
              </span>
            </div>

            <div className="relative z-10">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-[var(--color-brand-primary)] px-3 py-1 text-[10px] font-[var(--font-weight-bold)] uppercase tracking-wider text-white">
                  Parcours {parcours.id.padStart(2, "0")}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border-light)]" />
                <span className="text-[11px] font-[var(--font-weight-bold)] uppercase tracking-widest text-[var(--color-link-text)]">
                  Data Master Series
                </span>
              </div>

              <div className="mb-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <h1
                  className="max-w-4xl text-[clamp(2.6rem,7vw,5rem)] font-[var(--font-weight-extrabold)] leading-[1.1] text-[var(--color-text-heading)]"
                  style={{ fontFamily: "var(--font-family-sans)" }}
                >
                  {parcours.title}
                </h1>

                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  <div className="flex flex-col items-start sm:items-end">
                    <span className="mb-1 text-[10px] font-[var(--font-weight-bold)] uppercase text-[var(--color-link-text)] opacity-70">
                      Durée Totale
                    </span>
                    <span className="inline-flex items-center rounded-xl border border-[var(--color-border-light)] bg-white px-4 py-2 text-sm font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)] shadow-sm">
                      {parcours.duration}
                    </span>
                  </div>
                  <div className="flex flex-col items-start sm:items-end">
                    <span className="mb-1 text-[10px] font-[var(--font-weight-bold)] uppercase text-[var(--color-link-text)] opacity-70">
                      Investissement
                    </span>
                    <span className="inline-flex items-center rounded-xl border border-transparent bg-[var(--color-brand-primary)] px-4 py-2 text-sm font-[var(--font-weight-extrabold)] text-white shadow-sm">
                      {DATA_MASTER_PRICE}
                    </span>
                  </div>
                </div>
              </div>

              <p className="max-w-3xl text-base leading-relaxed text-[var(--color-text-body)] opacity-90 sm:text-lg">
                {parcours.who}
              </p>
            </div>
          </div>
        </section>

        <div className="relative mt-12 grid items-start gap-12 sm:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2
                className="font-[var(--font-weight-extrabold)] tracking-tight text-[var(--color-text-heading)]"
                style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-2)" }}
              >
                Programme du <span className="text-[var(--color-brand-primary)]">Parcours</span>
              </h2>
              <span className="w-fit rounded-full bg-[var(--color-section-muted)] px-3 py-1 text-sm font-[var(--font-weight-bold)] text-[var(--color-link-text)]">
                {orderedModules.length} Modules
              </span>
            </div>

            <div className="relative ml-2 space-y-8 border-l-2 border-[var(--color-border-light)] pl-4 sm:ml-6 sm:space-y-12 sm:pl-8">
              {orderedModules.map((module, idx) => (
                <div key={module!.id} className="group relative">
                  <div className="absolute -left-[calc(1rem+3px)] top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--color-border-light)] bg-white shadow-sm transition-all group-hover:scale-110 group-hover:border-[var(--color-brand-primary)] sm:-left-[calc(2rem+3px)] sm:h-10 sm:w-10">
                    <span className="text-xs font-[var(--font-weight-extrabold)] text-[var(--color-brand-primary)]">
                      {idx + 1}
                    </span>
                  </div>

                  <div className="relative rounded-3xl border border-[var(--color-border-light)] bg-white p-6 transition-all hover:border-[var(--color-brand-primary)]/10 hover:shadow-xl sm:p-8">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="rounded-md bg-[var(--color-section-muted)] px-2.5 py-1 text-[10px] font-[var(--font-weight-extrabold)] uppercase tracking-widest text-[var(--color-link-text)]">
                          Module {module!.id}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-[var(--font-weight-bold)] text-[var(--color-brand-primary)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]" />
                          {module!.level}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="mb-4 text-[var(--color-text-heading)] transition-colors group-hover:text-[var(--color-brand-primary)]"
                      style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-3)" }}
                    >
                      {module!.title}
                    </h3>

                    <p className="mb-8 text-sm leading-relaxed text-[var(--color-text-body)] opacity-80 sm:text-base">
                      {module!.summary}
                    </p>

                    <div className="grid gap-6">
                      <div className="rounded-2xl border border-[var(--color-brand-primary)]/5 bg-[var(--color-brand-primary)]/[0.02] p-5 transition-all hover:bg-white">
                        <h4 className="mb-4 flex items-center gap-2 text-[10px] font-[var(--font-weight-bold)] uppercase tracking-wider text-[var(--color-brand-primary)]">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                          Projet Pratique
                        </h4>
                        <p className="text-[13px] font-[var(--font-weight-medium)] italic leading-relaxed text-[var(--color-text-heading)]">
                          &quot;{module!.project}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-32">
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border-light)] bg-[var(--color-section-tint)]/30 p-8 shadow-lg backdrop-blur-md">
              <div className="pointer-events-none absolute right-0 top-0 p-6 opacity-5">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>

              <h3
                className="mb-4 leading-tight text-[var(--color-text-heading)]"
                style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-3)" }}
              >
                Objectif du <span className="text-[var(--color-brand-primary)]">Parcours</span>
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-[var(--color-text-body)] opacity-90 sm:text-base">
                {parcours.outcome}
              </p>

              <div className="space-y-4 border-t border-[var(--color-border-light)] pt-6">
                <Link
                  href={{ pathname: "/formulaire/inscription", query: { parcours: `DATA MASTER — ${parcours.title}` } }}
                  className="inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm font-[var(--font-weight-bold)] text-white transition-all hover:opacity-95 hover:shadow-2xl active:scale-[0.98]"
                  style={{ backgroundColor: "var(--color-button-primary-bg)" }}
                >
                  S&apos;inscrire et payer • {DATA_MASTER_PRICE}
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--color-border-light)] bg-white p-6 shadow-sm">
              <h4 className="mb-4 text-[10px] font-[var(--font-weight-bold)] uppercase tracking-widest text-[var(--color-link-text)]">
                Informations Clé
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-section-muted)] text-[var(--color-brand-primary)]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-[var(--font-weight-bold)] uppercase text-[var(--color-link-text)] opacity-60">
                      Durée
                    </span>
                    <span className="text-xs font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]">
                      {parcours.duration}
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-section-muted)] text-[var(--color-brand-primary)]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 20V10" />
                      <path d="m18 20-6-6-6 6" />
                      <path d="M6 4h12" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-[var(--font-weight-bold)] uppercase text-[var(--color-link-text)] opacity-60">
                      Modules
                    </span>
                    <span className="text-xs font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]">
                      {orderedModules.length} modules
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
