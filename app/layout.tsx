import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nodes Technologie | L'intelligence artificielle à votre service",
  description: "Nodes Technology est une entreprise congolaise spécialisée en intelligence artificielle et automatisation. Notre mission : repousser les frontières de l'innovation technologique et créer des solutions IA de pointe pour nos clients. Brazzaville, Congo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
