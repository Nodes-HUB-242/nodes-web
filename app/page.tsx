import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import AnimateOnScroll from "@/components/home/AnimateOnScroll";
import SiteHeader from "@/components/home/SiteHeader";
import {
  buildMetadata,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Nodes Technology | IA, automatisation, transformation digitale et formation",
  description:
    "Solutions d'intelligence artificielle, automatisation, transformation digitale et formations certifiantes à Brazzaville. Nodes Technology accompagne entreprises, administrations et professionnels.",
  path: "/",
  keywords: [
    "solutions IA",
    "automatisation des processus",
    "transformation digitale Congo",
    "formation certifiante IA",
  ],
});

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Formations", href: "/formations" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: "gear",
    eyebrow: "Solutions sur mesure",
    title: "IA, automatisation et solutions digitales",
    desc: "Nous concevons des outils concrets pour simplifier le travail, améliorer le service et faire gagner du temps.",
  },
  {
    icon: "chart",
    eyebrow: "Transformation digitale",
    title: "Moderniser les processus et les services",
    desc: "Nous aidons entreprises, administrations et professionnels à mieux travailler grâce au digital.",
  },
  {
    icon: "search",
    eyebrow: "Campagnes & conversion",
    title: "Marketing et relation client assistés par l'IA",
    desc: "Nous mettons en place des solutions qui engagent, convertissent et améliorent l'expérience client.",
  },
  {
    icon: "handshake",
    eyebrow: "Formation",
    title: "Former aux compétences numériques",
    desc: "Nous formons étudiants, professionnels, agents publics et équipes aux outils les plus utiles aujourd'hui.",
  },
];

const TRUST_METRICS = [
  {
    value: "Duo",
    label: "Notre plateforme conçue pour démocratiser l'IA et laisser exprimer la créativité des entrepreneurs",
  },
  {
    value: "+4",
    label: "Solutions phares déjà déployées au service des grandes entreprises",
  },
  {
    value: "Ancrage Local",
    label: "Solutions adaptées aux réalités du terrain et africaines",
  },
];

const TEAM_FEATURES = [
  { label: "Startup congolaise spécialisée en IA et transformation digitale" },
  { label: "Interventions sur assurance, télécoms, médias et secteur public" },
  { label: "Solutions conçues pour les réalités locales" },
  { label: "Formation des jeunes, professionnels et administrations" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Cadrer les enjeux métier",
    desc: "Nous analysons vos objectifs, vos flux existants et vos points de friction pour identifier les opportunités réellement prioritaires.",
  },
  {
    num: "02",
    title: "Concevoir une solution applicable",
    desc: "Nous définissons l'architecture fonctionnelle, les parcours utilisateurs et les intégrations nécessaires avant livraison.",
  },
  {
    num: "03",
    title: "Déployer, mesurer, améliorer",
    desc: "Nous accompagnons la mise en production, l'adoption par les équipes et l'amélioration continue des usages et performances.",
  },
];

const PROGRAMS = [
  {
    tag: "DATA",
    title: "DATA MASTER",
    desc: "DATA MASTER est la formation de référence pour toute personne souhaitant maîtriser la donnée de bout en bout : collecte, analyse, visualisation, modélisation prédictive et ingénierie des pipelines.",
    points: [
      "Parcours certifiant",
      "Durée : 15 semaines",
      "Approche orientée cas concrets",
    ],
    href: "/formations/data-master",
    image: "/DATA.jpg",
  },
  {
    tag: "IA",
    title: "IA MASTER",
    desc: "AI MASTER est la formation de référence pour toute personne souhaitant maîtriser et exploiter l'IA dans toute sa dimension moderne. Elle couvre : l'IA multimodale, les agents, le protocole MCP...",
    points: [
      "Parcours certifiant",
      "Durée : 10 semaines",
      "Usages pratiques et projets appliqués",
    ],
    href: "/formations/ia-master",
    image: "/IA3.jpg",
  },
];

const FLAGSHIP_SOLUTIONS = [
  {
    name: "AYA",
    detail: "Conseillère digitale IA pour NSIA Assurances Congo, avec souscription, paiement Mobile Money et tableau de bord de pilotage.",
  },
  {
    name: "Solution marketing Airtel Congo",
    detail: "Campagnes marketing avec agent IA pour engager et convertir les clients.",
  },
  {
    name: "Yanola AI",
    detail: "Plateforme unifiée pour créer des agents intelligents et générer du contenu texte, image et vidéo.",
  },
  {
    name: "MIKANDA",
    detail: "Solution d'archivage et de gestion documentaire déployable en local, hybride ou cloud.",
  },
];

const TRAINING_INITIATIVES = [
  {
    title: "Programme STEM pour les jeunes filles",
    detail: "Formation menée avec la Fondation Burotop Iris, juillet 2025.",
    src: "https://f005.backblazeb2.com/file/nodes600/1.png",
    alt: "Formation STEM avec la Fondation Burotop Iris en juillet 2025",
  },
  {
    title: "Formation des cadres et agents du Ministère de la Fonction publique",
    detail: "Session de formation réalisée en août 2025.",
    src: "https://f005.backblazeb2.com/file/nodes600/2.png",
    alt: "Formation des cadres et agents du Ministère de la Fonction publique en août 2025",
  },
  {
    title: "Programme BASE64 avec l'Agence Universitaire de la Francophonie",
    detail: "Formation des jeunes et professionnels, avril 2025.",
    src: "https://f005.backblazeb2.com/file/nodes600/3.png",
    alt: "Programme BASE64 avec l'Agence Universitaire de la Francophonie en avril 2025",
  },
];

const EVENTS_AND_REPRESENTATION = [
  {
    title: "Forum de l'IA au Caire",
    detail: "Représentation de Nodes en février 2025.",
    src: "https://f005.backblazeb2.com/file/nodes600/WhatsApp+Image+2026-03-30+at+02.30.30+(1).jpeg",
    alt: "Représentation de Nodes au forum de l'IA au Caire en février 2025",
  },
  {
    title: "Lancement de la solution AYA pour NSIA Assurances Congo",
    detail: "Décembre 2025.",
    src: "https://f005.backblazeb2.com/file/nodes600/WhatsApp+Image+2026-03-30+at+02.30.30+(3).jpeg",
    alt: "Lancement de la solution AYA pour NSIA Assurances Congo en décembre 2025",
  },
  {
    title: "Programme Seeds for the Future en Chine",
    detail: "Représentation de Nodes en juillet 2025.",
    src: "https://f005.backblazeb2.com/file/nodes600/WhatsApp+Image+2026-03-30+at+02.30.30.jpeg",
    alt: "Représentation de Nodes en Chine dans le cadre du programme Seeds for the Future en juillet 2025",
  },
];

const PARTNER_IMAGES = [
  { src: "/nsia.png", alt: "NSIA Assurances" },
  { src: "/Airtel_RDC.png", alt: "Airtel RDC" },
  { src: "/canal.png", alt: "Canal+" },
  { src: "/caria.png", alt: "CARIA" },
  { src: "/base.png", alt: "BASE64" },
  { src: "/mtn.jpg", alt: "MTN" },
];

const FOOTER_SERVICES = [
  "Solutions d'intelligence artificielle",
  "Automatisation des processus",
  "Marketing conversationnel",
  "Formations certifiantes",
  "Transformation digitale",
];

function ServiceIcon({ icon }: { icon: string }) {
  if (icon === "gear") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
      </svg>
    );
  }

  if (icon === "chart") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="m7 15 4-4 3 2 5-7" />
      </svg>
    );
  }

  if (icon === "search") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData data={[buildOrganizationJsonLd(), buildWebsiteJsonLd()]} />
      <SiteHeader navLinks={NAV_LINKS} />

      <main>
        <section
          id="hero"
          className="relative flex min-h-screen items-center overflow-hidden pt-24 sm:pt-28 lg:pt-0"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=85"
              alt="Equipe en réunion de travail"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,199,255,0.22),transparent_30%),linear-gradient(115deg,rgba(9,9,18,0.9),rgba(17,8,42,0.8)_55%,rgba(10,4,20,0.92))]" />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-[var(--padding-section-x)] py-14 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,420px)] lg:items-end">
            <AnimateOnScroll className="max-w-3xl">
              <span className="eyebrow text-white before:bg-white/35">
                IA, automatisation et transformation digitale
              </span>
              <h1
                className="hero-title mt-6 max-w-4xl text-[clamp(2.4rem,7vw,4.75rem)] font-[var(--font-weight-extrabold)] leading-[var(--line-height-heading)] text-white"
                style={{
                  color: "#ffffff",
                  fontFamily: "var(--font-family-display)",
                  letterSpacing: "-0.045em",
                }}
              >
                Nous créons des solutions digitales utiles et formons aux compétences qui comptent aujourd&apos;hui.
              </h1>
              <p className="hero-copy mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
                Nodes Technology accompagne entreprises, administrations, professionnels et jeunes avec des solutions sur mesure en IA, automatisation, digitalisation et formation.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#contact"
                  className="secondary-button inline-flex items-center justify-center gap-2 rounded-[var(--border-radius-button)] px-5 py-3.5 text-sm font-[var(--font-weight-bold)] text-[var(--color-text-heading)] sm:text-base"
                >
                  Parler de votre projet
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
                <Link
                  href="/formations"
                  className="brand-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-6 py-3.5 text-sm font-[var(--font-weight-bold)] text-white sm:text-base"
                >
                  Voir nos formations
                </Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={120}>
              <div className="surface-card-strong rounded-[1.8rem] p-5 text-white sm:p-7">
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">Pourquoi Nodes</p>
                <div className="mt-5 space-y-4">
                  {TRUST_METRICS.map((item) => (
                    <div
                      key={item.value}
                      className="rounded-2xl border border-white/10 bg-white/6 p-4 transition-colors duration-200 hover:bg-white/9"
                    >
                      <p
                        className="text-lg font-[var(--font-weight-extrabold)] text-white"
                        style={{ fontFamily: "var(--font-family-display)" }}
                      >
                        {item.value}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-white/72">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        <section id="services" className="px-[var(--padding-section-x)] py-[var(--padding-section-y)]">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <AnimateOnScroll>
              <div className="max-w-xl">
                <span className="eyebrow">Services</span>
                <h2 className="mt-5 text-[length:var(--font-size-heading-2)] font-[var(--font-weight-extrabold)]">
                  Ce que Nodes fait, de façon simple.
                </h2>
                <p className="mt-5 text-[length:var(--font-size-body)] leading-8 text-[var(--color-text-body)]">
                  Nous aidons à digitaliser, automatiser, mieux servir les clients et développer des compétences numériques vraiment utiles.
                </p>
                <div className="surface-card lift-card mt-8 rounded-[var(--radius-card)] p-6">
                  <p className="text-sm font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                    Notre position
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-body)]">
                    Nodes Technology conçoit des solutions innovantes adaptées aux réalités locales et forme les talents capables de les utiliser.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={120}>
              <div className="grid gap-5 md:grid-cols-2">
                {SERVICES.map((service) => (
                  <article key={service.title} className="surface-card lift-card rounded-[var(--radius-card)] p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-section-tint),#f4f0ff)] text-[var(--color-brand-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        <ServiceIcon icon={service.icon} />
                      </div>
                      <span className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-link-text)]">
                        {service.eyebrow}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[length:var(--font-size-heading-3)] font-[var(--font-weight-extrabold)]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-body)]">{service.desc}</p>
                  </article>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        <section
          id="formation"
          className="bg-[var(--color-background-soft)] px-[var(--padding-section-x)] py-[var(--padding-section-y)]"
        >
          <div className="mx-auto max-w-7xl">
            <AnimateOnScroll className="max-w-2xl">
              <span className="eyebrow">Formations</span>
              <h2 className="mt-5 text-[length:var(--font-size-heading-2)] font-[var(--font-weight-extrabold)]">
                Des formations claires, pratiques et directement utiles.
              </h2>
              <p className="mt-5 text-[length:var(--font-size-body)] leading-8 text-[var(--color-text-body)]">
                Nous formons les jeunes, les professionnels et les équipes qui souhaitent progresser en data, IA, automatisation et outils numériques. Nos programmes de formation sont structurés en parcours, chacun adapté à un profil spécifique, afin que vous puissiez apprendre réellement ce qui compte pour vous.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={120} className="mt-12 grid gap-6 lg:grid-cols-2">
              {PROGRAMS.map((program) => (
                <article
                  key={program.title}
                  className="surface-card lift-card overflow-hidden rounded-[var(--radius-card)]"
                >
                  <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_220px]">
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <span className="rounded-full bg-[var(--color-section-tint)] px-3 py-1 text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                          {program.tag}
                        </span>
                        <span className="text-xs font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-link-text)]">
                          Disponible
                        </span>
                      </div>
                      <h3 className="mt-5 text-[length:var(--font-size-heading-3)] font-[var(--font-weight-extrabold)]">
                        {program.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--color-text-body)]">{program.desc}</p>
                      <ul className="mt-5 space-y-2">
                        {program.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-3 text-sm text-[var(--color-text-body)]"
                          >
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-section-tint)] text-[var(--color-brand-primary)]">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <Link
                          href={program.href}
                          className="brand-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-5 py-3 text-sm font-[var(--font-weight-bold)] text-white"
                        >
                          Découvrir le programme
                        </Link>
                      </div>
                    </div>
                    <div className="relative min-h-[220px]">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 220px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,15,43,0.24)] to-transparent" />
                    </div>
                  </div>
                </article>
              ))}
            </AnimateOnScroll>

            <div className="mt-8 flex justify-start sm:justify-end">
              <Link
                href="/formations"
                className="brand-button inline-flex items-center gap-2 rounded-[var(--border-radius-button)] px-6 py-3.5 text-sm font-[var(--font-weight-bold)] text-white sm:text-base"
              >
                Voir toutes les formations
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section id="story" className="px-[var(--padding-section-x)] py-[var(--padding-section-y)]">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[460px_minmax(0,1fr)] lg:items-center">
            <AnimateOnScroll delay={80} className="relative overflow-hidden rounded-[calc(var(--radius-card)+0.4rem)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/ia.jpg"
                  alt="Equipe Nodes Technology"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,15,43,0.2)] to-transparent" />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="max-w-2xl">
                <span className="eyebrow">Qui nous sommes</span>
                <h2 className="mt-5 text-[length:var(--font-size-heading-2)] font-[var(--font-weight-extrabold)]">
                  Une startup congolaise qui construit et déploie des solutions concrètes.
                </h2>
                <p className="mt-5 text-[length:var(--font-size-body)] leading-8 text-[var(--color-text-body)]">
                  Fondée en novembre 2023, Nodes Technology est spécialisée dans l&apos;intelligence artificielle, l&apos;automatisation et la transformation digitale. Nous concevons des solutions sur mesure pour optimiser les processus, améliorer la performance et accélérer la création de valeur.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {TEAM_FEATURES.map((feature) => (
                    <div key={feature.label} className="surface-card lift-card rounded-2xl p-4">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-brand-primary)] text-white">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p className="mt-4 text-sm font-[var(--font-weight-medium)] leading-7 text-[var(--color-text-heading)]">
                        {feature.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        <section
          id="process"
          className="bg-[var(--color-background-soft)] px-[var(--padding-section-x)] py-[var(--padding-section-y)]"
        >
          <div className="mx-auto max-w-7xl">
            <AnimateOnScroll className="max-w-2xl">
              <span className="eyebrow">Méthode</span>
              <h2 className="mt-5 text-[length:var(--font-size-heading-2)] font-[var(--font-weight-extrabold)]">
                Un processus sobre, lisible et orienté résultat.
              </h2>
            </AnimateOnScroll>

            <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
              <AnimateOnScroll delay={100} className="space-y-5">
                {PROCESS_STEPS.map((step) => (
                  <article key={step.num} className="surface-card lift-card rounded-[var(--radius-card)] p-6 sm:p-7">
                    <div className="flex gap-5">
                      <span
                        className="text-3xl font-[var(--font-weight-extrabold)] text-[var(--color-brand-accent)] sm:text-4xl"
                        style={{ fontFamily: "var(--font-family-display)" }}
                      >
                        {step.num}
                      </span>
                      <div>
                        <h3 className="text-[length:var(--font-size-heading-3)] font-[var(--font-weight-extrabold)]">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[var(--color-text-body)]">{step.desc}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </AnimateOnScroll>

              <AnimateOnScroll delay={180} className="relative overflow-hidden rounded-[calc(var(--radius-card)+0.25rem)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/pr2.jpg"
                    alt="Illustration du processus Nodes Technology"
                    fill
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,15,43,0.22)] to-transparent" />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="px-[var(--padding-section-x)] py-[var(--padding-section-y)]">
          <div className="mx-auto max-w-7xl">
            <AnimateOnScroll className="max-w-3xl">
              <span className="eyebrow">Solutions phares</span>
              <h2 className="mt-5 text-[length:var(--font-size-heading-2)] font-[var(--font-weight-extrabold)]">
                Quelques solutions qui montrent ce que nous savons faire.
              </h2>
              <p className="mt-5 text-[length:var(--font-size-body)] leading-8 text-[var(--color-text-body)]">
                Nous concevons et déployons des outils utiles, pensés pour le terrain, avec un vrai usage métier derrière chaque solution.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={120} className="mt-10 grid gap-5 md:grid-cols-2">
              {FLAGSHIP_SOLUTIONS.map((solution) => (
                <article key={solution.name} className="surface-card lift-card rounded-[var(--radius-card)] p-6">
                  <p className="text-xs font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                    {solution.name}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-body)]">{solution.detail}</p>
                </article>
              ))}
            </AnimateOnScroll>

            <AnimateOnScroll delay={160} className="mt-12">
              <div className="surface-card rounded-[calc(var(--radius-card)+0.2rem)] p-5 sm:p-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                  {PARTNER_IMAGES.map((partner) => (
                    <div
                      key={partner.src}
                      className="flex min-h-[104px] items-center justify-center rounded-2xl border border-[var(--color-border-light)] bg-white/96 px-5 py-4 transition-colors duration-200 hover:bg-white"
                    >
                      <Image
                        src={partner.src}
                        alt={partner.alt}
                        width={140}
                        height={60}
                        className="trust-logo h-11 w-auto object-contain sm:h-12"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        <section className="bg-[var(--color-section-tint)] px-[var(--padding-section-x)] py-[var(--padding-section-y)] text-center">
          <AnimateOnScroll className="mx-auto max-w-3xl">
            <span className="eyebrow justify-center before:hidden">Formation & impact</span>
            <h2 className="mt-5 text-[length:var(--font-size-heading-2)] font-[var(--font-weight-extrabold)]">
              Nous ne faisons pas que créer des solutions, nous transmettons aussi les compétences.
            </h2>
            <p className="mt-5 text-[length:var(--font-size-body)] leading-8 text-[var(--color-text-body)]">
              STEM en juillet 2025, Ministère de la Fonction publique en août 2025, BASE64 en avril 2025 : Nodes Technology est aussi engagée dans la formation des jeunes, des professionnels et des agents publics.
            </p>
            <div className="mt-10 grid gap-5 text-left lg:grid-cols-3">
              {TRAINING_INITIATIVES.map((item) => (
                <article key={item.title} className="surface-card lift-card overflow-hidden rounded-[var(--radius-card)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                      Formation
                    </p>
                    <h3 className="mt-3 text-lg font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-body)]">{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-3xl">
              <h3 className="text-[length:var(--font-size-heading-3)] font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]">
                Représentation et rayonnement de Nodes
              </h3>
              <p className="mt-3 text-[length:var(--font-size-body)] leading-8 text-[var(--color-text-body)]">
                Nodes Technology porte aussi ses solutions et sa vision dans des événements, programmes internationaux et temps forts liés à l&apos;innovation.
              </p>
            </div>

            <div className="mt-8 grid gap-5 text-left lg:grid-cols-3">
              {EVENTS_AND_REPRESENTATION.map((item) => (
                <article key={item.title} className="surface-card lift-card overflow-hidden rounded-[var(--radius-card)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                      Événement
                    </p>
                    <h3 className="mt-3 text-lg font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-body)]">{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-button mt-8 inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-7 py-3.5 text-sm font-[var(--font-weight-bold)] text-white sm:text-base"
            >
              Démarrer la conversation
            </a>
          </AnimateOnScroll>
        </section>
      </main>

      <footer id="contact" className="bg-[var(--color-footer-bg)] px-[var(--padding-section-x)] py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_0.8fr_0.9fr]">
          <div>
            <a
              href="#hero"
              className="text-xl font-[var(--font-weight-extrabold)] text-white"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Nodes Technology
            </a>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/82">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14 hover:bg-white/22"
                aria-label="LinkedIn Nodes Technology"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14 hover:bg-white/22"
                aria-label="Instagram Nodes Technology"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14 hover:bg-white/22"
                aria-label="Facebook Nodes Technology"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-white">
              Nos services
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/84">
              {FOOTER_SERVICES.map((item) => (
                <li key={item}>
                  <a href="#services" className="hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-[var(--font-weight-bold)] uppercase tracking-[0.16em] text-white">
              Contact
            </h3>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm leading-7 text-white/84">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.15 1.6 5.95L0 24l6.32-1.66a11.86 11.86 0 0 0 5.75 1.47h.01c6.56 0 11.9-5.34 11.91-11.91a11.82 11.82 0 0 0-3.47-8.42ZM12.08 21.8h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.75.98 1-3.65-.24-.37a9.84 9.84 0 0 1-1.52-5.27c0-5.43 4.42-9.85 9.87-9.85a9.8 9.8 0 0 1 6.97 2.89 9.79 9.79 0 0 1 2.88 6.97c0 5.44-4.42 9.88-9.83 9.88Zm5.4-7.37c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.48-1.74-1.66-2.03-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.49 1.08 2.92 1.23 3.12.15.2 2.13 3.25 5.15 4.56.72.31 1.28.5 1.72.65.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                </svg>
                WhatsApp
              </a>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-3 hover:text-white">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/14 pt-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Nodes Technology. Tous droits réservés.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
