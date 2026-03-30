import type { Metadata } from "next";
import { Suspense } from "react";
import FormPageSkeleton from "@/components/form-page-skeleton";
import InscriptionForm from "./inscription-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Inscription à une formation",
  description:
    "Inscrivez-vous à une formation Nodes Technology en data ou intelligence artificielle et transmettez vos informations pour le suivi de votre dossier.",
  path: "/formulaire/inscription",
  keywords: ["inscription formation", "inscription IA MASTER", "inscription DATA MASTER"],
});

export default function InscriptionPage() {
  return (
    <Suspense fallback={<FormPageSkeleton fieldRows={5} />}>
      <InscriptionForm />
    </Suspense>
  );
}
