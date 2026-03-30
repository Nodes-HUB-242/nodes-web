"use client";

import { useRouter } from "next/navigation";

export type BackButtonProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fallbackHref?: string;
  "aria-label"?: string;
};

/**
 * Retourne à la page précédente dans l’historique du navigateur (comme le bouton Précédent).
 */
export default function BackButton({
  children,
  className,
  style,
  fallbackHref = "/",
  "aria-label": ariaLabel,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window === "undefined") {
      router.push(fallbackHref);
      return;
    }

    const referrer = document.referrer;
    const currentUrl = window.location.href;
    const sameOriginReferrer =
      referrer && referrer.startsWith(window.location.origin) && referrer !== currentUrl;

    if (sameOriginReferrer) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={[className, "cursor-pointer"].filter(Boolean).join(" ")}
      style={style}
      aria-label={ariaLabel ?? "Retour à la page précédente"}
    >
      {children}
    </button>
  );
}
