"use client";

import BackButton from "@/components/BackButton";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const initialFormData = {
  name: "",
  phone: "",
  objet: "",
};

type FieldErrors = Record<string, string>;

function validateForm(data: typeof initialFormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = data.name.trim();
  const phone = data.phone.replace(/\s/g, "");
  const objet = data.objet.trim();

  if (!name) {
    errors.name = "Le nom de l'entreprise est requis.";
  } else if (name.length < 2) {
    errors.name = "Le nom doit contenir au moins 2 caractères.";
  }

  if (!phone) {
    errors.phone = "Le numéro de téléphone est requis.";
  } else if (phone.length < 8) {
    errors.phone = "Le numéro doit contenir au moins 8 caractères.";
  }

  if (!objet) {
    errors.objet = "L'objet est requis.";
  }

  return errors;
}

export default function FormulaireForm() {
  const searchParams = useSearchParams();
  const objetFromQuery = searchParams.get("objet") ?? "";
  const [formData, setFormData] = useState(() => ({
    ...initialFormData,
    objet: objetFromQuery,
  }));
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    const errors = validateForm({ ...formData, [name]: (e.target as HTMLInputElement).value });
    if (errors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: errors[name]! }));
    } else {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setMessage("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.replace(/\s/g, ""),
          objet: formData.objet.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || data.message || "Erreur lors de l'envoi");
        if (data.fieldErrors) {
          const apiErrors: FieldErrors = {};
          for (const [key, vals] of Object.entries(data.fieldErrors)) {
            apiErrors[key] = Array.isArray(vals) ? vals[0] : String(vals);
          }
          setFieldErrors((prev) => ({ ...prev, ...apiErrors }));
        }
        return;
      }

      setStatus("success");
      setMessage("Message envoyé avec succès.");
      setFormData({ ...initialFormData, objet: objetFromQuery });
      setFieldErrors({});
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion. Veuillez réessayer.");
      setFieldErrors({});
    }
  };

  return (
    <div
      className="min-h-screen min-h-[100dvh] py-8 min-[360px]:py-10 sm:py-12 px-3 min-[280px]:px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background-soft)" }}
    >
      <div className="mx-auto max-w-xl">
        <BackButton
          fallbackHref="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-link-text)] hover:text-[var(--color-brand-primary)] transition-colors"
          style={{ fontFamily: "var(--font-family-sans)" }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </BackButton>

        <div
          className="surface-card rounded-[var(--radius-card)] p-4 min-[280px]:p-5 min-[360px]:p-6 sm:p-8"
        >
          <h1
            className="text-lg min-[280px]:text-xl sm:text-2xl font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)] mb-2"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Formulaire de contact
          </h1>
          <p
            className="text-[var(--color-text-body)] text-sm sm:text-base mb-6"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            Décrivez votre besoin et notre équipe vous recontactera pour qualifier la demande.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {status === "success" && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
              >
                <svg className="h-5 w-5 shrink-0 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}
            {status === "error" && (
              <div
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
              >
                <svg className="h-5 w-5 shrink-0 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-[var(--font-weight-medium)] text-[var(--color-text-heading)] mb-1.5"
                style={{ fontFamily: "var(--font-family-sans)" }}
              >
                Nom de l&apos;entreprise
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={status === "loading"}
                autoComplete="name"
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75 ${fieldErrors.name ? "border-red-500" : "border-gray-200"}`}
                style={{ fontFamily: "var(--font-family-sans)" }}
                placeholder="Ex: Ma Société SARL"
              />
              {fieldErrors.name && (
                <p id="name-error" className="mt-1.5 text-sm text-red-600" role="alert">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-[var(--font-weight-medium)] text-[var(--color-text-heading)] mb-1.5"
                style={{ fontFamily: "var(--font-family-sans)" }}
              >
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={status === "loading"}
                autoComplete="tel"
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75 ${fieldErrors.phone ? "border-red-500" : "border-gray-200"}`}
                style={{ fontFamily: "var(--font-family-sans)" }}
                placeholder="+242 XX XXX XX XX"
              />
              {fieldErrors.phone && (
                <p id="phone-error" className="mt-1.5 text-sm text-red-600" role="alert">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="objet"
                className="block text-sm font-[var(--font-weight-medium)] text-[var(--color-text-heading)] mb-1.5"
                style={{ fontFamily: "var(--font-family-sans)" }}
              >
                Objet
              </label>
              <textarea
                id="objet"
                name="objet"
                value={formData.objet}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={status === "loading"}
                rows={4}
                aria-invalid={!!fieldErrors.objet}
                aria-describedby={fieldErrors.objet ? "objet-error" : undefined}
                className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all resize-y min-h-[100px] disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75 ${fieldErrors.objet ? "border-red-500" : "border-gray-200"}`}
                style={{ fontFamily: "var(--font-family-sans)" }}
                placeholder="Décrivez votre demande"
              />
              {fieldErrors.objet && (
                <p id="objet-error" className="mt-1.5 text-sm text-red-600" role="alert">
                  {fieldErrors.objet}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="brand-button flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:shadow-none"
              style={{
                fontFamily: "var(--font-family-sans)",
              }}
            >
              {status === "loading" ? (
                <>
                  <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                "Envoyer"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
