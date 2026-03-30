export function getBaseUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    "http://localhost:3000",
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;

    try {
      return new URL(candidate);
    } catch {
      continue;
    }
  }

  return new URL("http://localhost:3000");
}

export const siteConfig = {
  name: "Nodes Technology",
  shortName: "Nodes",
  description:
    "Nodes Technology est une startup congolaise spécialisée en intelligence artificielle, automatisation, transformation digitale et formation. Nous créons des solutions utiles et développons les compétences numériques.",
  locale: "fr_FR",
  email: "support@nodes-hub.com",
  phone: "+242056590857",
  whatsappUrl: "https://wa.me/242056590857",
  linkedinUrl: "https://cg.linkedin.com/company/nodes-technology",
  instagramUrl: "https://www.instagram.com/nodes.technology?igsh=emZ5Zm5kZHEwdGpp",
  facebookUrl: "https://www.facebook.com/share/18KURY3nja/?mibextid=wwXIfr",
  location: "Brazzaville, Congo",
  keywords: [
    "Nodes Technology",
    "startup congolaise",
    "intelligence artificielle",
    "automatisation",
    "transformation digitale",
    "formation IA",
    "formation data",
    "Brazzaville",
    "Congo",
  ],
} as const;
