import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(8, "Le numéro doit contenir au moins 8 caractères"),
  objet: z.string(),
});

/**
 * API route - runs SERVER-SIDE ONLY.
 * FLOW_API_KEY is read from process.env and never sent to the client.
 * Env vars without NEXT_PUBLIC_ prefix are never exposed to the frontend.
 */
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const { allowed, remaining, resetIn } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        {
          error: "Trop de requêtes. Réessayez dans quelques minutes.",
          retryAfter: Math.ceil(resetIn / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(resetIn / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten();
      return NextResponse.json(
        {
          error: "Validation échouée",
          fieldErrors: errors.fieldErrors,
          formErrors: errors.formErrors,
        },
        { status: 400 }
      );
    }

    const { name, phone } = result.data;
    const orderId = `NODES-${Date.now()}`;

    // Server-side only: never exposed to client
    const apiKey = process.env.FLOW_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "FLOW_API_KEY non configurée" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://flowapi.nodes-hub.com/v1/whatsapp/broadcasts/personalized",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({
          template_name: "order_confirmation",
          language_code: "fr",
          campaign_name: "Site Vitrine",
          recipients: [
            {
              phone,
              components: [
                {
                  type: "body",
                  parameters: [
                    { type: "text", text: name },
                    { type: "text", text: orderId },
                  ],
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Return safe error - exclude any data that might contain API key
      const safeDetails = typeof data === "object" && data !== null
        ? Object.fromEntries(
            Object.entries(data).filter(([k]) => !/key|token|secret|authorization/i.test(k))
          )
        : data;
      return NextResponse.json(
        { error: "Erreur lors de l'envoi", details: safeDetails },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    // Log message only - avoid exposing any sensitive data
    console.error("Contact API error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Erreur serveur", message: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
}
