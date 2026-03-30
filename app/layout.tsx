import type { Metadata, Viewport } from "next";
import "./globals.css";
import MetaMaskErrorSuppress from "@/components/MetaMaskErrorSuppress";
import { buildMetadata } from "@/lib/seo";
import { getBaseUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Nodes Technology | IA, automatisation, transformation digitale et formation",
    description: `${siteConfig.description} ${siteConfig.location}.`,
    path: "/",
  }),
  metadataBase: getBaseUrl(),
  applicationName: siteConfig.name,
  title: {
    default: "Nodes Technology | IA, automatisation, transformation digitale et formation",
    template: "%s | Nodes Technology",
  },
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1a005d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <MetaMaskErrorSuppress />
        {children}
      </body>
    </html>
  );
}
