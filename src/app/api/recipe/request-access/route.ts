import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestAccessSchema = z.object({
  email: z.string().email('Email invalide'),
  locale: z.enum(['fr', 'en']).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale } = requestAccessSchema.parse(body);

    // Log l'email pour tracking
    console.log('=== DEMANDE D\'ACCÈS RECETTE ===');
    console.log(`Email: ${email}`);
    console.log(`Locale: ${locale || 'fr'}`);
    console.log(`Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'America/Toronto' })}`);
    console.log('================================');

    // NOTE: Le tracking HubSpot est déjà fait côté client dans RecipeHeroSection
    // avec trackRecipeAccessRequest(email, locale)
    
    // TODO: Sauvegarder dans une base de données si nécessaire
    // Par exemple avec Prisma, Supabase, MongoDB, etc.
    
    // TODO: Envoyer un email avec le code si nécessaire
    // Utiliser Resend, SendGrid, ou Mailgun
    
    // TODO: Si besoin de tracking serveur HubSpot, utiliser l'API HubSpot
    // https://developers.hubspot.com/docs/api/events/send-custom-behavioral-event

    return NextResponse.json(
      { 
        success: true,
        message: 'Code envoyé avec succès'
      },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Données invalides',
          details: error.errors
        },
        { status: 400 }
      );
    }
    
    console.error('Erreur lors de la demande d\'accès:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
