import BackButton from "@/components/BackButton";
import Link from "next/link";

type PaymentStatusShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  tone: "success" | "failed";
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  helperText: string;
};

export default function PaymentStatusShell({
  eyebrow,
  title,
  description,
  badge,
  tone,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  helperText,
}: PaymentStatusShellProps) {
  const isSuccess = tone === "success";

  return (
    <main className="min-h-[100dvh] bg-[var(--color-background-soft)] px-[var(--padding-section-x)] py-10 min-[360px]:py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <BackButton
          fallbackHref="/formations"
          className="inline-flex items-center gap-2 text-sm font-[var(--font-weight-medium)] text-[var(--color-link-text)] transition-all hover:-translate-x-1 hover:text-[var(--color-brand-primary)]"
          style={{ fontFamily: "var(--font-family-sans)" }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </BackButton>

        <section className="mt-8">
          <div className="surface-card overflow-hidden rounded-[calc(var(--radius-card)+0.25rem)]">
            <div
              className={`h-1 w-full ${
                isSuccess
                  ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent"
                  : "bg-gradient-to-r from-amber-500 via-orange-400 to-transparent"
              }`}
            />

            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
              <div className="max-w-3xl">
                <span className="eyebrow">{eyebrow}</span>
                <div className="mt-6 flex items-center gap-4">
                  <div
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-[1.35rem] border ${
                      isSuccess
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    {isSuccess ? (
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v5" />
                        <circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none" />
                      </svg>
                    )}
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] ${
                        isSuccess
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {badge}
                    </span>
                  </div>
                </div>

                <h1
                  className="mt-6 text-[44px] font-[var(--font-weight-extrabold)] leading-[1.04] text-[var(--color-text-heading)]"
                  style={{ fontFamily: "var(--font-family-display)", letterSpacing: "-0.04em" }}
                >
                  {title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-body)] sm:text-lg">
                  {description}
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-[var(--color-border-light)] bg-white p-5">
                <p className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-link-text)]">
                  Suite recommandée
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-body)]">
                  {helperText}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="surface-card rounded-[var(--radius-card)] p-6 sm:p-8">
            <h2
              className="text-[1.45rem] font-[var(--font-weight-extrabold)] leading-[1.08] text-[var(--color-text-heading)]"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Prochaine action
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-body)] sm:text-base">
              {isSuccess
                ? "Votre paiement a bien été pris en compte. Vous pouvez maintenant revenir aux formations ou contacter l’équipe pour le suivi de votre inscription."
                : "Le paiement n’a pas été finalisé. Vous pouvez revenir au programme concerné pour relancer le paiement, ou parler directement avec notre équipe."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className="brand-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-6 py-3.5 text-sm font-[var(--font-weight-bold)] text-white"
              >
                {primaryLabel}
              </Link>
              {secondaryLabel && secondaryHref ? (
                <Link
                  href={secondaryHref}
                  className="secondary-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-6 py-3.5 text-sm font-[var(--font-weight-bold)] text-[var(--color-text-heading)]"
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="surface-card rounded-[var(--radius-card)] p-6">
            <h3 className="text-[10px] font-[var(--font-weight-bold)] uppercase tracking-[0.14em] text-[var(--color-link-text)]">
              Assistance
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-body)]">
              Si vous avez besoin d’aide, notre équipe peut vous orienter rapidement sur WhatsApp ou par email.
            </p>
            <div className="mt-5 grid gap-3">
              <a
                href="https://wa.me/242056590857"
                target="_blank"
                rel="noreferrer"
                className="secondary-button inline-flex items-center justify-center rounded-[var(--border-radius-button)] px-5 py-3 text-sm font-[var(--font-weight-bold)] text-[var(--color-text-heading)]"
              >
                WhatsApp
              </a>
              <a
                href="mailto:support@nodes-hub.com"
                className="inline-flex items-center justify-center rounded-[var(--border-radius-button)] border border-[var(--color-border-light)] bg-white px-5 py-3 text-sm font-[var(--font-weight-bold)] text-[var(--color-text-heading)]"
              >
                support@nodes-hub.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
