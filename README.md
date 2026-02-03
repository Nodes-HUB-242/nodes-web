# Nodes Web (Nodes Technologie)

Site vitrine one-page basé sur un design Figma, construit avec **Next.js 16**, **React 19**, **TypeScript** et **Tailwind CSS 4**.

---

## Démarrage

### Prérequis

- Node.js 18+
- npm (ou yarn / pnpm)

### Installation

```bash
npm install
```

### Lancer en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Build de production

```bash
npm run build
npm run start
```

### Linter

```bash
npm run lint
```

---

## Structure du projet

```
nodes-web/
├── app/
│   ├── globals.css    # Variables CSS (design tokens) + styles globaux
│   ├── layout.tsx     # Layout racine (metadata, html, body)
│   └── page.tsx       # Page d'accueil (toutes les sections)
├── public/            # Fichiers statiques (images, etc.)
├── next.config.ts     # Configuration Next.js (images externes, etc.)
├── postcss.config.mjs # PostCSS / Tailwind
├── tsconfig.json      # TypeScript
├── package.json
└── README.md          # Cette documentation
```

- **`app/page.tsx`** : composant principal ; contient le header, le hero et toutes les sections (Services, Team, Process, Projects, Testimonials, CTA, Footer).
- **`app/globals.css`** : design system via variables CSS (`:root`). Toutes les couleurs, espacements et typographies y sont centralisés.
- **`app/layout.tsx`** : enveloppe HTML, langue `fr`, chargement de `globals.css` et métadonnées (title « Nodes Web »).

---

## Design system (variables CSS)

Les variables sont définies dans **`app/globals.css`** sous `:root`. Utilisez-les pour garder le design cohérent.

### Couleurs

| Variable | Usage | Valeur par défaut |
|----------|--------|-------------------|
| `--color-brand-primary` | Accent, liens, soulignés | `#00bcd4` |
| `--color-text-heading` | Titres | `#1a1a1a` |
| `--color-text-body` | Texte courant | `#333333` |
| `--color-button-text` | Texte boutons secondaires | `#666666` |
| `--color-link-text` | Liens, texte secondaire | `#888888` |
| `--color-border-light` | Bordures, séparateurs | `#e0e0e0` |
| `--color-background-white` | Fond principal | `#ffffff` |
| `--color-section-muted` | Fond sections grises | `#f5f5f5` |
| `--color-section-tint` | Fond sections bleu-vert clair | `#e8f5f2` |
| `--color-footer-bg` | Fond footer | `#0d9488` |
| `--color-button-primary-bg` | Boutons CTA verts | `#14b8a6` |
| `--color-button-primary-hover` | Hover boutons CTA | `#0d9488` |

### Typographie

| Variable | Usage |
|----------|--------|
| `--font-family-sans` | Police principale |
| `--font-size-tagline` | Sous-titres / labels (0.875rem) |
| `--font-size-heading-1` | Titre hero (clamp 2rem → 3rem) |
| `--font-size-heading-2` | Titres de section |
| `--font-size-heading-3` | Sous-titres de blocs |
| `--font-size-body` | Corps de texte |
| `--font-size-small` | Texte secondaire / footer |
| `--font-size-button`, `--font-size-link` | Boutons et liens |
| `--font-weight-normal` à `--font-weight-extrabold` | Poids |
| `--line-height-heading` | Interligne titres |
| `--letter-spacing-expanded` | Letter-spacing labels (GET STARTED, etc.) |

### Espacements et composants

| Variable | Usage |
|----------|--------|
| `--padding-section-x`, `--padding-section-y` | Padding des sections |
| `--gap-button-link` | Espace entre bouton et lien (hero, etc.) |
| `--padding-button-x`, `--padding-button-y` | Padding des boutons |
| `--border-radius-button` | Rayon des boutons / champs |
| `--shadow-button`, `--shadow-button-hover` | Ombres boutons |
| `--shadow-wave` | Ombre légère de la vague hero |

**Exemple d’utilisation dans un composant :**

```tsx
<p style={{ color: "var(--color-brand-primary)", fontFamily: "var(--font-family-sans)" }}>
  WE ARE EXPERT TEAM
</p>
```

Avec Tailwind (valeurs arbitraires) :

```tsx
<p className="text-[var(--color-brand-primary)]" style={{ fontFamily: "var(--font-family-sans)" }}>
  WE ARE EXPERT TEAM
</p>
```

---

## Sections de la page

| Section | Id / repère | Contenu principal |
|---------|-------------|-------------------|
| **Header** | Fixe en haut | Logo Nodes Technologie, nav (Home, Pages, Blog, Shop, Contact), recherche, bouton Appointment, menu mobile |
| **Hero** | Premier écran | Tagline, titre avec « lives » souligné, paragraphe, Get Started + lien « Read the full story line », image avec vague |
| **Services** | `#services` | GET STARTED, titre « We provide best quality… », grille 4 cartes (SEO, Business Ideas, Development, Design), READ MORE |
| **Team** | — | Photo, « We are team of expert people… », 4 points (Project, Teamwork, Solutions, Achievements) |
| **Process** | — | « Our business process road », 3 étapes (01, 02, 03), image collaboration |
| **Projects** | — | « Our recent creative projects », carrousel horizontal, VIEW ALL PROJECTS |
| **Testimonials** | — | « Our happy customers », citation, Jessica Brown – Web Designer, logos clients |
| **CTA** | — | « Ready? Start your own business », GET STARTED |
| **Footer** | — | Logo Nodes Technologie, texte, réseaux, SERVICES, USEFUL LINKS, Contact Us, NEWSLETTER, copyright, Terms & Privacy |

---

## Données et personnalisation

- **Liens de navigation** : tableau `NAV_LINKS` en haut de `page.tsx`.
- **Services** : tableau `SERVICES` (icône, titre, description).
- **Étapes du process** : tableau `PROCESS_STEPS`.
- **Images projets** : tableau `PROJECT_IMAGES` (URLs placehold ou chemins vers `public/`).
- **Logos clients** : tableau `CLIENT_LOGOS`.
- **Footer** : `FOOTER_SERVICES`, `FOOTER_LINKS` et texte de contact dans le JSX.

Pour changer couleurs ou espacements, modifier **`app/globals.css`** (variables `:root`) sans toucher au reste du code si tout utilise ces variables.

---

## Images

- **Next.js Image** : utilisé pour les photos (hero, team, process, témoignage). Les domaines autorisés sont dans `next.config.ts` (`images.remotePatterns`) : `images.unsplash.com`, `placehold.co`.
- Images locales : à placer dans **`public/`** et référencer par `/nom-fichier.jpg`.

---

## Figma

- Design source : [Figma – Sans-titre](https://www.figma.com/design/2m4fR22RYZYyMPmBO5zHNG/Sans-titre?node-id=3-2&m=dev).
- La page correspond au frame **node-id=3-2** (maquette complète one-page).

---

## Technologies

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **ESLint** (config Next.js)

---

## Licence

Projet privé.
