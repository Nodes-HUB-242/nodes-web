"use client";

import BackButton from "@/components/BackButton";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const initialFormData = {
  prenom: "",
  nom: "",
  phone: "",
  email: "",
  parcours: "",
};

type FieldErrors = Record<string, string>;

function validateForm(data: typeof initialFormData): FieldErrors {
  const errors: FieldErrors = {};
  const prenom = data.prenom.trim();
  const nom = data.nom.trim();
  const phone = data.phone.replace(/\s/g, "");
  const email = data.email.trim();
  const parcours = data.parcours.trim();

  if (!prenom) {
    errors.prenom = "Le prénom est requis.";
  }
  if (!nom) {
    errors.nom = "Le nom est requis.";
  }
  if (!phone) {
    errors.phone = "Le numéro de téléphone est requis.";
  } else if (phone.length < 8) {
    errors.phone = "Le numéro doit contenir au moins 8 caractères.";
  }
  if (!email) {
    errors.email = "L'adresse e-mail est requise.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Adresse e-mail invalide.";
  }
  if (!parcours) {
    errors.parcours = "Le parcours est requis.";
  }

  return errors;
}

export default function InscriptionForm() {
  const searchParams = useSearchParams();
  const parcoursFromQuery = searchParams.get("parcours") ?? "";
  const [formData, setFormData] = useState(() => ({
    ...initialFormData,
    parcours: parcoursFromQuery,
  }));
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const errors = validateForm({ ...formData, [name]: e.target.value });
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
          type: "inscription" as const,
          prenom: formData.prenom.trim(),
          nom: formData.nom.trim(),
          phone: formData.phone.replace(/\s/g, ""),
          email: formData.email.trim(),
          parcours: formData.parcours.trim(),
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
      setMessage("Demande d'inscription envoyée. Nous vous recontactons rapidement.");
      setFormData({ ...initialFormData, parcours: parcoursFromQuery });
      setFieldErrors({});
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion. Veuillez réessayer.");
      setFieldErrors({});
    }
  };

  const inputClass = (name: keyof typeof initialFormData) =>
    `w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75 ${
      fieldErrors[name] ? "border-red-500" : "border-gray-200"
    }`;

  return (
    <div
      className="min-h-screen min-h-[100dvh] py-8 min-[360px]:py-10 sm:py-12 px-3 min-[280px]:px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-section-muted)" }}
    >
      <div className="mx-auto max-w-xl">
        <BackButton
          fallbackHref="/formations"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-link-text)] hover:text-[var(--color-brand-primary)] transition-colors"
          style={{ fontFamily: "var(--font-family-sans)" }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </BackButton>

        <div
          className="rounded-xl min-[360px]:rounded-2xl bg-white p-4 min-[280px]:p-5 min-[360px]:p-6 sm:p-8 shadow-sm"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
        >
          <h1
            className="text-lg min-[280px]:text-xl sm:text-2xl font-[var(--font-weight-extrabold)] text-[var(--color-text-heading)] mb-2"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            Inscription et paiement
          </h1>
          <p
            className="text-[var(--color-text-body)] text-sm sm:text-base mb-6"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            Renseignez vos coordonnées. Le parcours est prérempli selon votre choix ; vous pouvez le modifier si besoin.
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label
                  htmlFor="prenom"
                  className="block text-sm font-[var(--font-weight-medium)] text-[var(--color-text-heading)] mb-1.5"
                  style={{ fontFamily: "var(--font-family-sans)" }}
                >
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  disabled={status === "loading"}
                  autoComplete="given-name"
                  aria-invalid={!!fieldErrors.prenom}
                  aria-describedby={fieldErrors.prenom ? "prenom-error" : undefined}
                  className={inputClass("prenom")}
                  style={{ fontFamily: "var(--font-family-sans)" }}
                />
                {fieldErrors.prenom && (
                  <p id="prenom-error" className="mt-1.5 text-sm text-red-600" role="alert">
                    {fieldErrors.prenom}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="nom"
                  className="block text-sm font-[var(--font-weight-medium)] text-[var(--color-text-heading)] mb-1.5"
                  style={{ fontFamily: "var(--font-family-sans)" }}
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  disabled={status === "loading"}
                  autoComplete="family-name"
                  aria-invalid={!!fieldErrors.nom}
                  aria-describedby={fieldErrors.nom ? "nom-error" : undefined}
                  className={inputClass("nom")}
                  style={{ fontFamily: "var(--font-family-sans)" }}
                />
                {fieldErrors.nom && (
                  <p id="nom-error" className="mt-1.5 text-sm text-red-600" role="alert">
                    {fieldErrors.nom}
                  </p>
                )}
              </div>
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
                className={inputClass("phone")}
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
                htmlFor="email"
                className="block text-sm font-[var(--font-weight-medium)] text-[var(--color-text-heading)] mb-1.5"
                style={{ fontFamily: "var(--font-family-sans)" }}
              >
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={status === "loading"}
                autoComplete="email"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className={inputClass("email")}
                style={{ fontFamily: "var(--font-family-sans)" }}
                placeholder="vous@exemple.com"
              />
              {fieldErrors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-red-600" role="alert">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="parcours"
                className="block text-sm font-[var(--font-weight-medium)] text-[var(--color-text-heading)] mb-1.5"
                style={{ fontFamily: "var(--font-family-sans)" }}
              >
                Parcours choisi
              </label>
              <input
                type="text"
                id="parcours"
                name="parcours"
                value={formData.parcours}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={status === "loading"}
                aria-invalid={!!fieldErrors.parcours}
                aria-describedby={fieldErrors.parcours ? "parcours-error" : undefined}
                className={inputClass("parcours")}
                style={{ fontFamily: "var(--font-family-sans)" }}
                placeholder="Ex. IA MASTER — …"
              />
              {fieldErrors.parcours && (
                <p id="parcours-error" className="mt-1.5 text-sm text-red-600" role="alert">
                  {fieldErrors.parcours}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-medium text-base transition-all duration-200 hover:opacity-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none"
              style={{
                backgroundColor: "var(--color-button-primary-bg)",
                fontFamily: "var(--font-family-sans)",
                boxShadow: "0 4px 14px rgba(26, 0, 93, 0.25)",
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
                "Envoyer ma demande"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
