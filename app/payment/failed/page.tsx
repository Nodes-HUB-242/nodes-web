import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PaymentStatusShell from "../../payment/payment-status-shell";

export const metadata: Metadata = buildMetadata({
  title: "Paiement non finalisé",
  description:
    "Le paiement Nodes Technology n’a pas été finalisé. Revenez à votre formation ou contactez notre équipe pour assistance.",
  path: "/payment/failed",
  keywords: ["paiement échoué", "paiement annulé", "Nodes Technology"],
});

type FailedPageProps = {
  searchParams?: Promise<{
    retry?: string;
  }>;
};

export default async function PaymentFailedPage({ searchParams }: FailedPageProps) {
  const params = (await searchParams) ?? {};
  const primaryHref = params.retry || "/formations";

  return (
    <PaymentStatusShell
      eyebrow="Paiement"
      badge="Transaction non finalisée"
      title="Paiement non abouti"
      description="Le paiement n’a pas pu être finalisé ou a été interrompu. Vous pouvez revenir à votre programme pour réessayer, ou contacter notre équipe pour être accompagné."
      tone="failed"
      primaryLabel="Voir les formations"
      primaryHref={primaryHref}
      helperText="Si votre prestataire de paiement vous renvoie ici, vérifiez simplement le programme concerné puis relancez le paiement depuis sa page."
    />
  );
}
