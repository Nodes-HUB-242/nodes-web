import type { Metadata } from "next";
import { Suspense } from "react";
import FormPageSkeleton from "@/components/form-page-skeleton";
import FormulaireForm from "./formulaire-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Formulaire de contact",
  description:
    "Décrivez votre besoin en IA, automatisation, transformation digitale ou formation. L'équipe Nodes Technology vous recontacte rapidement.",
  path: "/formulaire",
  keywords: ["contact Nodes Technology", "demande de projet IA", "consultation digitale"],
});

export default function FormulairePage() {
  return (
    <Suspense fallback={<FormPageSkeleton fieldRows={3} />}>
      <FormulaireForm />
    </Suspense>
  );
}
