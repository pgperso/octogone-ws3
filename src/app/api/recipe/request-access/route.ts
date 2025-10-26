import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { RECIPE_ACCESS_CONFIG } from '@/config/recipe-access';

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
    
    // Envoyer le code par email avec Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
        from: 'Octogone <onboarding@resend.dev>',
        to: email,
        subject: locale === 'en' 
          ? 'Your access code for the recipe calculator'
          : 'Votre code d\'accès pour le calculateur de recette',
        html: locale === 'en'
          ? `
            <h2>Your access code</h2>
            <p>Here is your code to access the recipe calculator:</p>
            <h1 style="font-size: 32px; font-weight: bold; color: #DCB26B;">${RECIPE_ACCESS_CONFIG.ACCESS_CODE}</h1>
            <p>Enter this code on the website to unlock access.</p>
            <p style="color: #666; font-size: 12px;">This code is valid for ${RECIPE_ACCESS_CONFIG.CODE_VALIDITY_MINUTES} minutes.</p>
          `
          : `
            <h2>Votre code d'accès</h2>
            <p>Voici votre code pour accéder au calculateur de recette :</p>
            <h1 style="font-size: 32px; font-weight: bold; color: #DCB26B;">${RECIPE_ACCESS_CONFIG.ACCESS_CODE}</h1>
            <p>Entrez ce code sur le site pour débloquer l'accès.</p>
            <p style="color: #666; font-size: 12px;">Ce code est valide pendant ${RECIPE_ACCESS_CONFIG.CODE_VALIDITY_MINUTES} minutes.</p>
          `
        });
        console.log(`Email envoyé avec succès à ${email}`);
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      }
    } else {
      console.warn('RESEND_API_KEY non configurée - Email non envoyé');
      console.log(`Code d'accès pour ${email}: ${RECIPE_ACCESS_CONFIG.ACCESS_CODE}`);
    }

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
