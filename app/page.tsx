"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";

function AnimateOnScroll({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`animate-on-scroll ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const LINKEDIN_URL = "https://cg.linkedin.com/company/nodes-technology";

const SERVICES = [
  { icon: "gear", title: "Intelligence Artificielle", desc: "Solutions IA sur mesure pour automatiser et optimiser vos processus métier." },
  { icon: "chart", title: "Assistant Virtuel", desc: "Assistants conversationnels et agents IA pour accompagner vos clients 24/7." },
  { icon: "lightbulb", title: "Chatbot Intelligent", desc: "Chatbots et agents IA dédiés (ex. AYA pour l'assurance) sur WhatsApp et autres canaux." },
  { icon: "search", title: "Marketing Ciblée", desc: "Campagnes marketing et commerciales pilotées par l'IA pour une meilleure conversion." },
];

const TEAM_FEATURES = [
  { icon: "check", label: "Projet" },
  { icon: "handshake", label: "Travail d'équipe" },
  { icon: "lightbulb", label: "Solutions" },
  { icon: "plant", label: "Réalisations" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Émergence d'une idée.", desc: "Nous brainstormons et définissons ensemble le concept central." },
  { num: "02", title: "Réalisation du projet.", desc: "Exécution avec qualité et livraison dans les délais." },
  { num: "03", title: "Échanges et amélioration.", desc: "Revue, retours et amélioration continue." },
];

const PROJECT_SLIDES = [
  { src: "https://placehold.co/320x220/ebe8f5/1a005d?text=AYA+Assurance", title: "AYA Assurance", desc: "Agent IA conversationnel" },
  { src: "https://placehold.co/320x220/ebe8f5/1a005d?text=YANOLA", title: "YANOLA", desc: "Assistant virtuel intelligent" },
  { src: "https://placehold.co/320x220/ebe8f5/1a005d?text=AGRISEARCH", title: "AGRISEARCH", desc: "IA pour l'agriculture" },
  { src: "https://placehold.co/320x220/ebe8f5/1a005d?text=BASE64", title: "BASE64", desc: "Formation IA & low-code" },
  { src: "https://placehold.co/320x220/ebe8f5/1a005d?text=Projet+5", title: "Projet client", desc: "Solution sur mesure" },
];

const CLIENT_LOGOS = ["NSIA Assurances", "AIRTEL Congo", "BCI Congo", "CARIA", "BASE64cg"];

const FOOTER_SERVICES = ["Intelligence Artificielle", "Assistant Virtuel", "Chatbot Intelligent", "Marketing Ciblée", "Formation BASE64", "Transformation Digitale"];
const FOOTER_LINKS = ["À propos", "Notre équipe", "Tarifs", "Actualités", "Nous contacter"];

const CARD_WIDTH_DESKTOP = 320;
const CARD_WIDTH_MOBILE = 280;
const CARD_WIDTH_XS = 260;
const CARD_GAP_DESKTOP = 24;
const CARD_GAP_MOBILE = 16;
const CARD_GAP_XS = 12;

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [projectIndex, setProjectIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isXSmall, setIsXSmall] = useState(true);
  const projectsRef = useRef<HTMLDivElement>(null);

  const cardWidth = !isMobile ? CARD_WIDTH_DESKTOP : isXSmall ? CARD_WIDTH_XS : CARD_WIDTH_MOBILE;
  const cardGap = !isMobile ? CARD_GAP_DESKTOP : isXSmall ? CARD_GAP_XS : CARD_GAP_MOBILE;

  const scrollProjects = useCallback((direction: "prev" | "next") => {
    const el = projectsRef.current;
    if (!el) return;
    const step = (cardWidth + cardGap) * (direction === "next" ? 1 : -1);
    el.scrollBy({ left: step, behavior: "smooth" });
  }, [cardWidth, cardGap]);

  const handleProjectsScroll = useCallback(() => {
    const el = projectsRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / (cardWidth + cardGap));
    setProjectIndex(Math.min(index, PROJECT_SLIDES.length - 1));
  }, [cardWidth, cardGap]);

  const goToProject = useCallback((i: number) => {
    projectsRef.current?.scrollTo({
      left: i * (cardWidth + cardGap),
      behavior: "smooth",
    });
    setProjectIndex(i);
  }, [cardWidth, cardGap]);

  useEffect(() => {
    const mqMobile = window.matchMedia("(min-width: 640px)");
    const mqXSmall = window.matchMedia("(max-width: 359px)");
    const update = () => {
      setIsMobile(!mqMobile.matches);
      setIsXSmall(mqXSmall.matches);
    };
    update();
    mqMobile.addEventListener("change", update);
    mqXSmall.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqXSmall.removeEventListener("change", update);
    };
  }, []);

  return (
    <>
      {/* Navbar professionnelle – glassmorphism, barre flottante */}
      <header className="fixed top-0 left-0 right-0 z-50 px-2 min-[360px]:px-3 sm:px-4 lg:px-6" style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top))" }}>
        <div
          className="max-w-6xl mx-auto flex items-center justify-between rounded-lg min-[360px]:rounded-xl sm:rounded-2xl px-3 py-2.5 min-[360px]:px-4 min-[360px]:py-3 sm:px-5 sm:py-3.5 lg:px-8 lg:py-4 border border-white/60 transition-all duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "var(--shadow-nav-elevated)",
          }}
        >
          <a href="#hero" className="flex items-center gap-2 shrink-0">
            <Image
              src="/nodes png.png"
              alt="Nodes Technologie"
              width={36}
              height={36}
              className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-9 sm:h-9 rounded-lg object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm min-[360px]:text-base sm:text-lg font-[var(--font-weight-extrabold)] tracking-tight text-[var(--color-text-heading)]" style={{ fontFamily: "var(--font-family-sans)" }}>Nodes</span>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-xs font-[var(--font-weight-medium)] text-[var(--color-link-text)] -mt-0.5" style={{ fontFamily: "var(--font-family-sans)" }}>Technologie</span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link text-sm font-[var(--font-weight-medium)] tracking-wide hover:text-[var(--color-brand-primary)] ${i === 0 ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-body)]"}`}
                style={{ fontFamily: "var(--font-family-sans)" }}
                data-active={i === 0 ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <button type="button" className="hidden sm:flex p-2.5 text-[var(--color-text-body)] hover:text-[var(--color-brand-primary)] rounded-xl hover:bg-[var(--color-section-tint)] transition-colors" aria-label="Rechercher">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-white text-sm font-[var(--font-weight-medium)] tracking-wide transition-all duration-200 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-button-primary-bg)]"
              style={{ backgroundColor: "var(--color-button-primary-bg)", fontFamily: "var(--font-family-sans)", boxShadow: "0 2px 12px rgba(26, 0, 93, 0.25)" }}
            >
              Consultation gratuite
            </a>
            <button
              type="button"
              className="md:hidden p-2.5 rounded-xl hover:bg-[var(--color-section-tint)] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <>
            <div className="md:hidden fixed inset-0 top-[3.75rem] min-[360px]:top-[4.5rem] sm:top-[5.5rem] bg-black/20 backdrop-blur-sm z-40" aria-hidden onClick={() => setMobileMenuOpen(false)} />
            <div
              className="md:hidden absolute left-4 right-4 mt-3 rounded-2xl border border-[var(--color-border-light)] p-5 z-50 flex flex-col gap-1"
              style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", boxShadow: "var(--shadow-nav-elevated)" }}
            >
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="py-3 px-3 rounded-xl font-[var(--font-weight-medium)] text-[var(--color-text-body)] hover:bg-[var(--color-section-tint)] hover:text-[var(--color-brand-primary)] transition-colors" style={{ fontFamily: "var(--font-family-sans)" }} onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="mt-2 inline-flex justify-center rounded-xl px-4 py-3 text-white font-[var(--font-weight-medium)] text-sm" style={{ backgroundColor: "var(--color-button-primary-bg)" }} onClick={() => setMobileMenuOpen(false)}>
                Consultation gratuite
              </a>
            </div>
          </>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="relative min-h-[100svh] min-h-screen flex items-center pt-20 min-[360px]:pt-24 pb-10 min-[360px]:pb-12 sm:pt-28 sm:pb-16 lg:pt-0 lg:pb-0">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=85"
            alt="Équipe en collaboration"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(15,15,25,0.82) 0%, rgba(20,10,35,0.78) 50%, rgba(10,5,20,0.85) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-[var(--padding-section-x)] py-6 min-[360px]:py-8 sm:py-12 lg:py-[var(--padding-section-y)]">
          <AnimateOnScroll className="max-w-2xl">
            <p className="uppercase tracking-[var(--letter-spacing-expanded)] font-[var(--font-weight-medium)] text-[10px] min-[360px]:text-xs sm:text-[var(--font-size-tagline)] mb-2 min-[360px]:mb-3 sm:mb-4 text-white/90" style={{ fontFamily: "var(--font-family-sans)" }}>
              Nous sommes une équipe d&apos;experts
            </p>
            <h1
              className="font-[var(--font-weight-extrabold)] leading-[1.12] text-white text-xl min-[360px]:text-2xl sm:text-3xl lg:text-[length:var(--font-size-heading-1)]"
              style={{ fontFamily: "var(--font-family-sans)" }}
            >
              Nous créons des produits qui rendent la{" "}
              <span className="relative inline-block">
                <span>vie</span>
                <span className="absolute left-0 right-0 bottom-0.5 h-1 rounded-full bg-[var(--color-brand-primary)]" aria-hidden />
              </span>{" "}
              des gens plus simple et meilleure.
            </h1>
            <div className="w-10 min-[360px]:w-12 sm:w-16 h-0.5 mt-3 mb-3 min-[360px]:mt-4 min-[360px]:mb-4 sm:mt-5 sm:mb-5 rounded-full bg-[var(--color-brand-primary)]" aria-hidden />
            <p className="text-white/85 mb-4 min-[360px]:mb-6 sm:mb-8 max-w-lg leading-relaxed text-xs min-[360px]:text-sm sm:text-base" style={{ fontFamily: "var(--font-family-sans)" }}>
              Spécialistes en intelligence artificielle et automatisation, nous aidons les leaders à construire des équipes à fort impact. Notre mission : repousser les frontières de l&apos;innovation technologique.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 min-[360px]:gap-3 sm:gap-5">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--border-radius-button)] px-4 py-2.5 min-[360px]:px-5 min-[360px]:py-3 sm:px-6 sm:py-3.5 text-white text-xs min-[360px]:text-sm sm:text-base font-[var(--font-weight-medium)] transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-button-primary-bg)]"
                style={{ backgroundColor: "var(--color-button-primary-bg)", fontFamily: "var(--font-family-sans)", boxShadow: "0 4px 14px rgba(26, 0, 93, 0.35)" }}
              >
                Travailler avec Nodes
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a
                href="#story"
                className="text-[var(--font-size-link)] font-[var(--font-weight-normal)] text-white/80 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                style={{ fontFamily: "var(--font-family-sans)" }}
              >
                Lire notre histoire
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-[var(--padding-section-y)] px-[var(--padding-section-x)]" style={{ background: "var(--color-section-muted)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <AnimateOnScroll>
          <div>
            <a href="#get-started" className="inline-block uppercase tracking-[var(--letter-spacing-expanded)] text-[var(--color-brand-primary)] font-[var(--font-weight-medium)] text-[var(--font-size-tagline)] mb-4" style={{ fontFamily: "var(--font-family-sans)" }}>
              COMMENCER
            </a>
            <h2 className="font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)] mb-4" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-2)" }}>
              Nous repoussons les frontières de l&apos;innovation technologique
            </h2>
            <p className="text-[var(--color-text-body)] mb-6 max-w-md" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-body)" }}>
              Nous croyons que la technologie peut transformer les entreprises et améliorer la vie des gens. Notre équipe conçoit des solutions IA sur mesure : assistants virtuels, chatbots intelligents, marketing ciblée et formation (BASE64).
            </p>
            <a
              href="#process"
              className="inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-5 py-2.5 text-white font-[var(--font-weight-medium)] transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--color-button-primary-bg)", fontFamily: "var(--font-family-sans)" }}
            >
              EN SAVOIR PLUS
            </a>
          </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={150}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-[360px]:gap-4 sm:gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="p-3 min-[360px]:p-4 sm:p-6 rounded-lg min-[360px]:rounded-xl bg-white shadow-sm border border-[var(--color-border-light)]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "var(--color-section-tint)", color: "var(--color-brand-primary)" }}>
                  {s.icon === "gear" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>}
                  {s.icon === "chart" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m7 16 4-4 4 2 4-6" /></svg>}
                  {s.icon === "lightbulb" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6M10 22h4M15 8a3 3 0 1 0-6 0c0 2 3 3 3 5M12 2v1" /><path d="M12 2a6 6 0 0 1 4.5 9.8A4 4 0 0 0 14 18h-4a4 4 0 0 0-2.5-6.2A6 6 0 0 1 12 2Z" /></svg>}
                  {s.icon === "search" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>}
                </div>
                <h3 className="font-[var(--font-weight-bold)] text-[var(--color-text-heading)] mb-2" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-3)" }}>{s.title}</h3>
                <p className="text-[var(--color-text-body)] text-[var(--font-size-small)]" style={{ fontFamily: "var(--font-family-sans)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Team */}
      <section id="story" className="py-[var(--padding-section-y)] px-[var(--padding-section-x)]" style={{ background: "var(--color-section-tint)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <AnimateOnScroll delay={100} className="relative aspect-[4/5] max-h-[260px] min-[360px]:max-h-[320px] sm:max-h-[400px] lg:max-h-[500px] rounded-lg min-[360px]:rounded-xl sm:rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" alt="Membre de l'équipe" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
          </AnimateOnScroll>
          <AnimateOnScroll className="order-1 lg:order-2">
          <div>
            <h2 className="font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)] mb-4" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-2)" }}>
              Une équipe d&apos;experts au service de l&apos;IA
            </h2>
            <p className="text-[var(--color-text-body)] mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontFamily: "var(--font-family-sans)" }}>
              Nodes Technology est une entreprise congolaise basée à Brazzaville. Nous développons des solutions d&apos;intelligence artificielle et d&apos;automatisation pour les entreprises (télécoms, assurance, finance) et formons la nouvelle génération via BASE64.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {TEAM_FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--color-brand-primary)", color: "white" }}>
                    <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span className="font-[var(--font-weight-medium)] text-[var(--color-text-heading)] text-sm sm:text-base" style={{ fontFamily: "var(--font-family-sans)" }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-[var(--padding-section-y)] px-[var(--padding-section-x)]" style={{ background: "var(--color-background-white)" }}>
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
          <h2 className="font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)] mb-8 sm:mb-12 text-center" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-2)" }}>
            Notre processus métier
          </h2>
          </AnimateOnScroll>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <AnimateOnScroll delay={100} className="space-y-6 sm:space-y-8 order-1 lg:order-none">
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} className="flex gap-4 sm:gap-6">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-weight-extrabold)] shrink-0" style={{ color: "var(--color-section-tint)", fontFamily: "var(--font-family-sans)" }}>{step.num}</span>
                  <div>
                    <h3 className="font-[var(--font-weight-bold)] text-[var(--color-text-heading)] mb-2" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-3)" }}>{step.title}</h3>
                    <p className="text-[var(--color-text-body)] text-[var(--font-size-small)]" style={{ fontFamily: "var(--font-family-sans)" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </AnimateOnScroll>
            <AnimateOnScroll delay={200} className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Collaboration" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Projects – slider UI/UX amélioré */}
      <section id="projects" className="py-[var(--padding-section-y)] px-[var(--padding-section-x)]" style={{ background: "var(--color-section-tint)" }}>
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block uppercase tracking-[var(--letter-spacing-expanded)] text-[var(--color-brand-primary)] font-[var(--font-weight-medium)] text-[var(--font-size-tagline)] mb-3" style={{ fontFamily: "var(--font-family-sans)" }}>
              Portfolio
            </span>
            <h2 className="font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)] mb-4" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-2)" }}>
              Nos projets créatifs récents
            </h2>
            <p className="text-[var(--color-text-body)] max-w-2xl mx-auto text-sm sm:text-base" style={{ fontFamily: "var(--font-family-sans)" }}>
              Une sélection de réalisations livrées pour nos clients : branding, digital et stratégie.
            </p>
          </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
          <div className="relative group/slider">
            <div className="absolute left-0 top-0 bottom-4 z-10 w-6 sm:w-12 md:w-16 bg-gradient-to-r from-[var(--color-section-tint)] to-transparent pointer-events-none" aria-hidden />
            <div className="absolute right-0 top-0 bottom-4 z-10 w-6 sm:w-12 md:w-16 bg-gradient-to-l from-[var(--color-section-tint)] to-transparent pointer-events-none" aria-hidden />

            <button
              type="button"
              onClick={() => scrollProjects("prev")}
              className="absolute left-0.5 min-[360px]:left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-[var(--color-border-light)] flex items-center justify-center text-[var(--color-brand-primary)] transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2"
              aria-label="Projet précédent"
            >
              <svg className="w-5 h-5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              type="button"
              onClick={() => scrollProjects("next")}
              className="absolute right-0.5 min-[360px]:right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-[var(--color-border-light)] flex items-center justify-center text-[var(--color-brand-primary)] transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2"
              aria-label="Projet suivant"
            >
              <svg className="w-5 h-5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>

            <div
              ref={projectsRef}
              onScroll={handleProjectsScroll}
              className="flex gap-3 min-[360px]:gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 pb-6 -mx-1 sm:-mx-2 px-2"
              style={{ scrollbarWidth: "none" }}
              role="region"
              aria-label="Carrousel de projets"
            >
              {PROJECT_SLIDES.map((slide, i) => (
                <article
                  key={i}
                  className="shrink-0 snap-center rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[var(--color-border-light)] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[var(--color-brand-primary)]/20 focus-within:ring-2 focus-within:ring-[var(--color-brand-primary)] focus-within:ring-offset-2"
                  style={{ width: cardWidth }}
                >
                  <div className="relative aspect-[320/220] overflow-hidden">
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      width={320}
                      height={220}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover/card:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-text-heading)]/90 via-[var(--color-text-heading)]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="font-[var(--font-weight-bold)] text-white text-lg" style={{ fontFamily: "var(--font-family-sans)" }}>{slide.title}</h3>
                      <p className="text-white/90 text-sm mt-0.5" style={{ fontFamily: "var(--font-family-sans)" }}>{slide.desc}</p>
                    </div>
                  </div>
                  <div className="p-3 min-[360px]:p-4">
                    <h3 className="font-[var(--font-weight-bold)] text-[var(--color-text-heading)]" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-3)" }}>{slide.title}</h3>
                    <p className="text-[var(--color-link-text)] text-[var(--font-size-small)] mt-1" style={{ fontFamily: "var(--font-family-sans)" }}>{slide.desc}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Position dans le carrousel">
              {PROJECT_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === projectIndex}
                  aria-label={`Aller au projet ${i + 1}`}
                  onClick={() => goToProject(i)}
                  className="h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2"
                  style={{ width: i === projectIndex ? 24 : 8, backgroundColor: i === projectIndex ? "var(--color-brand-primary)" : "var(--color-border-light)" }}
                />
              ))}
            </div>
          </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
          <div className="text-center mt-8 sm:mt-10">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-5 py-3 sm:px-6 sm:py-3.5 text-white text-sm sm:text-base font-[var(--font-weight-medium)] transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-button-primary-bg)]"
              style={{ backgroundColor: "var(--color-button-primary-bg)", fontFamily: "var(--font-family-sans)", boxShadow: "0 4px 14px rgba(26, 0, 93, 0.25)" }}
            >
              VOIR TOUS LES PROJETS
            </a>
          </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[var(--padding-section-y)] px-[var(--padding-section-x)]" style={{ background: "var(--color-background-white)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <AnimateOnScroll>
          <div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "var(--color-section-tint)", color: "var(--color-brand-primary)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            </div>
            <h2 className="font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)] mb-4" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-2)" }}>
              Nos clients satisfaits
            </h2>
            <p className="text-[var(--color-text-body)]" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-body)" }}>
              Ne nous croyez pas sur parole — découvrez les retours des équipes avec lesquelles nous avons travaillé.
            </p>
          </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={150}>
          <div className="relative pl-4 sm:pl-8">
            <span className="absolute left-0 top-0 text-6xl sm:text-8xl font-serif opacity-20" style={{ color: "var(--color-brand-primary)" }}>&ldquo;</span>
            <blockquote className="text-[var(--color-text-body)] italic mb-4 sm:mb-6 text-sm sm:text-base" style={{ fontFamily: "var(--font-family-sans)" }}>
              Travailler avec Nodes Technologie a été un tournant. Leur IA conversationnelle (AYA, assistants virtuels) a transformé notre relation client et nos campagnes commerciales. Une équipe de pointe en IA au Congo.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0">
                <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Jessica Brown" fill className="object-cover" />
              </div>
              <div>
                <p className="font-[var(--font-weight-bold)] text-[var(--color-text-heading)]" style={{ fontFamily: "var(--font-family-sans)" }}>Jessica Brown</p>
                <p className="text-[var(--color-link-text)] text-[var(--font-size-small)]" style={{ fontFamily: "var(--font-family-sans)" }}>Designer web</p>
              </div>
            </div>
          </div>
          </AnimateOnScroll>
        </div>
        <AnimateOnScroll delay={200}>
        <div className="max-w-4xl mx-auto mt-10 sm:mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-12">
          {CLIENT_LOGOS.map((name) => (
            <span key={name} className="text-[var(--color-link-text)] font-[var(--font-weight-medium)] text-sm sm:text-base lg:text-lg" style={{ fontFamily: "var(--font-family-sans)" }}>{name}</span>
          ))}
        </div>
        </AnimateOnScroll>
      </section>

      {/* CTA */}
      <section className="py-10 min-[360px]:py-12 sm:py-16 lg:py-20 px-[var(--padding-section-x)] text-center" style={{ background: "var(--color-section-tint)" }}>
        <AnimateOnScroll>
        <h2 className="font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)] mb-4 sm:mb-6" style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-heading-2)" }}>
          Prêt ? Lancez votre activité
        </h2>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-6 py-3 sm:px-8 sm:py-4 text-white font-[var(--font-weight-medium)] text-base sm:text-lg transition-colors hover:opacity-90"
          style={{ backgroundColor: "var(--color-button-primary-bg)", fontFamily: "var(--font-family-sans)" }}
        >
          COMMENCER
        </a>
        </AnimateOnScroll>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-10 min-[360px]:py-12 sm:py-16 px-[var(--padding-section-x)] text-white pb-[max(2.5rem,env(safe-area-inset-bottom))]" style={{ background: "var(--color-footer-bg)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 min-[360px]:gap-8 sm:gap-10 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#hero" className="text-lg sm:text-xl font-[var(--font-weight-bold)] text-white" style={{ fontFamily: "var(--font-family-sans)" }}>Nodes Technologie</a>
            <p className="mt-3 sm:mt-4 text-white/90 text-xs sm:text-[var(--font-size-small)] leading-relaxed" style={{ fontFamily: "var(--font-family-sans)" }}>
              Entreprise congolaise spécialisée en intelligence artificielle et automatisation. Notre mission : repousser les frontières de l&apos;innovation technologique et créer des solutions IA de pointe. Brazzaville, Congo. Fondée en 2023.
            </p>
            <div className="flex gap-4 mt-6">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors" aria-label="LinkedIn Nodes Technology">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="uppercase tracking-[var(--letter-spacing-expanded)] font-[var(--font-weight-bold)] text-xs sm:text-[var(--font-size-tagline)] mb-3 sm:mb-4" style={{ fontFamily: "var(--font-family-sans)" }}>NOS SERVICES</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-white/90 text-xs sm:text-[var(--font-size-small)]" style={{ fontFamily: "var(--font-family-sans)" }}>
              {FOOTER_SERVICES.map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="uppercase tracking-[var(--letter-spacing-expanded)] font-[var(--font-weight-bold)] text-xs sm:text-[var(--font-size-tagline)] mb-3 sm:mb-4" style={{ fontFamily: "var(--font-family-sans)" }}>LIENS UTILES</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-white/90 text-xs sm:text-[var(--font-size-small)]" style={{ fontFamily: "var(--font-family-sans)" }}>
              {FOOTER_LINKS.map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="uppercase tracking-[var(--letter-spacing-expanded)] font-[var(--font-weight-bold)] text-xs sm:text-[var(--font-size-tagline)] mb-3 sm:mb-4" style={{ fontFamily: "var(--font-family-sans)" }}>Nous contacter</h3>
            <p className="text-white/90 text-xs sm:text-[var(--font-size-small)] leading-relaxed" style={{ fontFamily: "var(--font-family-sans)" }}>
              Brazzaville, Brazzaville<br />Congo<br />+242 06 529 05 97<br />+242 05 659 11 59<br /><a href="mailto:hello@nodestechnologie.com" className="hover:text-white transition-colors break-all sm:break-normal">hello@nodestechnologie.com</a>
            </p>
          </div>
          <div>
            <h3 className="uppercase tracking-[var(--letter-spacing-expanded)] font-[var(--font-weight-bold)] text-xs sm:text-[var(--font-size-tagline)] mb-3 sm:mb-4" style={{ fontFamily: "var(--font-family-sans)" }}>NEWSLETTER</h3>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="flex-1 min-w-0 px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-[var(--border-radius-button)] text-[var(--color-text-heading)] placeholder:text-[var(--color-link-text)] focus:outline-none focus:ring-2 focus:ring-white"
                style={{ fontFamily: "var(--font-family-sans)" }}
              />
              <button type="submit" className="shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-[var(--border-radius-button)] bg-white text-[var(--color-footer-bg)] font-[var(--font-weight-medium)] hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-footer-bg)]" style={{ fontFamily: "var(--font-family-sans)" }}>
                S&apos;INSCRIRE
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[var(--font-size-small)] text-white/80 text-center sm:text-left" style={{ fontFamily: "var(--font-family-sans)" }}>
          <p>© 2023 Nodes Technologie. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </footer>
    </>
  );
}
