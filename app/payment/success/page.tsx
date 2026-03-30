import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PaymentStatusShell from "../../payment/payment-status-shell";

export const metadata: Metadata = buildMetadata({
  title: "Paiement validé",
  description:
    "Confirmation de paiement Nodes Technology. Votre transaction a été validée et votre inscription peut être poursuivie.",
  path: "/payment/success",
  keywords: ["paiement validé", "confirmation paiement", "Nodes Technology"],
});

type SuccessPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const params = (await searchParams) ?? {};
  const primaryHref = params.next || "/formations";

  return (
    <PaymentStatusShell
      eyebrow="Paiement"
      badge="Transaction validée"
      title="Paiement confirmé"
      description="Votre paiement a bien été validé. Votre demande est enregistrée et notre équipe peut maintenant poursuivre le traitement de votre inscription."
      tone="success"
      primaryLabel="Continuer"
      primaryHref={primaryHref}
      secondaryLabel="Voir les formations"
      secondaryHref="/formations"
      helperText="Conservez cette page comme point de confirmation, puis poursuivez vers la formation ou contactez l’équipe si vous avez une question."
    />
  );
}
