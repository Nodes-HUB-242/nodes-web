# 🚀 Nodes Technologie

**Site vitrine moderne pour une startup congolaise spécialisée en intelligence artificielle et automatisation.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

> Application one-page performante, responsive et animée — conçue pour présenter les services, projets et l'identité de Nodes Technologie (Brazzaville, Congo).

🔗 **Dépôt** : [github.com/bokokoromel-create/nodes-web](https://github.com/bokokoromel-create/nodes-web)

---

## 📋 Sommaire

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Architecture](#-architecture)
- [Ce que j'ai appris](#-ce-que-jai-appris)
- [Améliorations futures](#-améliorations-futures)
- [Auteur / Contact](#-auteur--contact)

---

## 🎯 Aperçu

### Problème résolu

Les entreprises tech africaines manquent souvent d'une vitrine web professionnelle qui reflète leur expertise. Ce projet offre à Nodes Technologie une présence digitale moderne, crédible et optimisée pour convertir les visiteurs en clients.

### Public cible

- Entreprises congolaises (télécoms, assurance, finance) recherchant des solutions IA
- Partenaires potentiels et investisseurs
- Candidats souhaitant rejoindre l'équipe

### Points clés

| Métrique | Détail |
|----------|--------|
| Type | Site vitrine one-page |
| Langue | Français |
| Responsive | Mobile, tablette, desktop |
| Performance | SSR Next.js, images optimisées |
| Accessibilité | Navigation clavier, ARIA labels |

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| 🧭 **Navbar glassmorphism** | Barre flottante avec effet de flou, menu burger mobile, navigation par ancres |
| 🖼️ **Hero immersif** | Image plein écran avec overlay, titre animé, CTA |
| 🤖 **Section services** | 4 cartes interactives (IA, Assistant Virtuel, Chatbot, Marketing) |
| 👥 **Présentation équipe** | Photo + mission + points forts de l'entreprise |
| 📊 **Processus métier** | 3 étapes numérotées avec layout image/texte |
| 🎠 **Slider projets** | Carrousel horizontal avec snap, dots de pagination, navigation clavier |
| 💬 **Témoignages** | Citation client + logos partenaires |
| 📩 **Newsletter** | Formulaire d'inscription email dans le footer |
| 🎬 **Animations au scroll** | Apparition progressive (fade-up) via IntersectionObserver |
| 📱 **Responsive complet** | Adapté de 320px à 2560px+ (5 breakpoints) |

---

## 🛠️ Technologies

| Technologie | Version | Rôle |
|-------------|---------|------|
| **Next.js** | 16.1 | Framework React (App Router, SSR, optimisation images) |
| **React** | 19.2 | Composants UI, hooks (useState, useRef, useCallback, useEffect) |
| **TypeScript** | 5 | Typage statique et sécurité du code |
| **Tailwind CSS** | 4 | Utility-first CSS, responsive design |
| **CSS Variables** | — | Design system centralisé (couleurs, typo, espacements) |
| **IntersectionObserver** | API native | Animations déclenchées au scroll |
| **ESLint** | 9 | Qualité et cohérence du code |

---

## 📦 Installation

### Prérequis

- **Node.js** 18+ 
- **npm** 9+ (ou yarn / pnpm)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/bokokoromel-create/nodes-web.git

# 2. Accéder au dossier
cd nodes-web

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
```

L'application est accessible sur **http://localhost:3000**

---

## 🚀 Utilisation

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (port 3000, hot reload) |
| `npm run build` | Build de production optimisé |
| `npm run start` | Serveur de production |
| `npm run lint` | Vérification ESLint |

### Personnalisation rapide

- **Couleur principale** : modifier `--color-brand-primary` dans `app/globals.css`
- **Contenu** : modifier les constantes (`SERVICES`, `PROJECT_SLIDES`, etc.) dans `app/page.tsx`
- **Logo** : remplacer `public/nodes png.png`

---

## 🏗️ Architecture

```
nodes-web/
├── app/
│   ├── globals.css          ← Design system (variables CSS, animations)
│   ├── layout.tsx           ← Layout racine, metadata SEO, <html lang="fr">
│   └── page.tsx             ← Page unique : composants + données
├── public/
│   └── nodes png.png        ← Logo de l'entreprise
├── next.config.ts           ← Config Next.js (domaines images)
├── postcss.config.mjs       ← PostCSS + Tailwind
├── tsconfig.json            ← Configuration TypeScript
├── package.json
└── README.md
```

### Design system

Le projet utilise un **système de tokens CSS** centralisé dans `:root` pour garantir la cohérence visuelle :

- **Couleurs** : palette complète (brand, texte, fonds, bordures, boutons)
- **Typographie** : tailles fluides avec `clamp()` pour un rendu adaptatif
- **Espacements** : padding responsive via `clamp()`
- **Ombres** : ombres portées pour navbar, boutons, cartes

### Responsive design

| Breakpoint | Largeur | Cible |
|------------|---------|-------|
| xs | < 360px | Petits mobiles (iPhone SE, Galaxy A01) |
| mobile | 360 – 639px | Mobiles standard |
| sm | 640 – 767px | Grands mobiles, petites tablettes |
| md | 768 – 1023px | Tablettes (iPad, Galaxy Tab) |
| lg+ | 1024px+ | Desktop |

---

## 📚 Ce que j'ai appris

Ce projet m'a permis de consolider et d'approfondir plusieurs compétences :

- **Next.js App Router** : structure de projet moderne avec le nouveau système de routing et les Server Components
- **Design system avec CSS Variables** : créer un système de tokens maintenable et cohérent sans librairie externe
- **Responsive avancé** : gérer 5 breakpoints avec Tailwind CSS, y compris les breakpoints arbitraires (`min-[360px]`) pour les edge cases mobiles
- **Animations performantes** : utiliser l'API IntersectionObserver pour déclencher des animations CSS uniquement lorsque les éléments sont visibles (performance optimisée)
- **Accessibilité (a11y)** : intégrer les attributs ARIA, la navigation clavier et le support des encoches (`safe-area-inset`)
- **Slider custom sans librairie** : construire un carrousel horizontal avec snap CSS, calcul dynamique des dimensions et gestion des événements scroll
- **Tailwind CSS 4** : exploiter les nouvelles fonctionnalités de la dernière version majeure

---

## 🔮 Améliorations futures

- [ ] Ajouter un **backend** (API routes Next.js) pour la newsletter et le formulaire de contact
- [ ] Intégrer un **CMS headless** (Sanity / Strapi) pour gérer le contenu dynamiquement
- [ ] Ajouter le **mode sombre** (dark mode) avec basculement automatique
- [ ] Implémenter le **multi-langue** (français / anglais) avec next-intl
- [ ] Ajouter des **tests** (Jest + Testing Library) pour les composants critiques
- [ ] Mettre en place le **déploiement continu** (Vercel / GitHub Actions)
- [ ] Remplacer les images placeholder par de **vraies captures** des projets (AYA, YANOLA, etc.)
- [ ] Ajouter des **pages dédiées** pour chaque projet (routing dynamique)

---

## 👤 Auteur / Contact

**Nodes Technologie** — Brazzaville, Congo

| Canal | Lien |
|-------|------|
| 📧 Email | [hello@nodestechnologie.com](mailto:hello@nodestechnologie.com) |
| 💼 LinkedIn | [Nodes Technology](https://cg.linkedin.com/company/nodes-technology) |
| 🐙 GitHub | [bokokoromel-create](https://github.com/bokokoromel-create) |
| 📞 Téléphone | +242 06 529 05 97 / +242 05 659 11 59 |

---

<p align="center">
  <sub>Fait avec ❤️ à Tunis — © 2023 Nodes Technologie. Tous droits réservés.</sub>
</p>
