import { NextResponse } from "next/server";
import { staticPartnerLogos } from "@/utils/partner-logos";

// API Route pour obtenir tous les logos partenaires
export async function GET() {
  try {
    // Utiliser la liste statique des logos
    return NextResponse.json(staticPartnerLogos);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des logos partenaires:",
      error,
    );
    return NextResponse.json(
      { error: "Erreur lors de la récupération des logos partenaires" },
      { status: 500 },
    );
  }
}
