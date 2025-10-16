import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données
    const { firstName, lastName, email, phone, company, message, requestedVersion } = body;
    
    if (!firstName || !lastName || !email || !company) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Préparer le contenu de l'email
    const emailContent = `
Nouvelle demande de démo Octogone

Version demandée: ${requestedVersion === 'octogone-ai' ? 'Octogone.ai (IA)' : 'Octogone'}

Informations du contact:
- Prénom: ${firstName}
- Nom: ${lastName}
- Email: ${email}
- Téléphone: ${phone || 'Non fourni'}
- Entreprise: ${company}

Message:
${message || 'Aucun message'}

---
Soumis le: ${new Date().toLocaleString('fr-FR', { timeZone: 'America/Toronto' })}
    `.trim();

    // Option 1: Utiliser Resend (vous devrez installer: npm install resend)
    // Décommentez et configurez avec votre clé API Resend
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Octogone Demo <demo@votredomaine.com>',
      to: ['votre-email@octogone.com'],
      subject: `Nouvelle demande de démo - ${firstName} ${lastName}`,
      text: emailContent,
    });
    */

    // Option 2: Utiliser nodemailer (vous devrez installer: npm install nodemailer)
    // Décommentez et configurez avec vos credentials SMTP
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `Nouvelle demande de démo - ${firstName} ${lastName}`,
      text: emailContent,
    });
    */

    // Pour l'instant, on log les données (à remplacer par l'envoi d'email)
    console.log('=== NOUVELLE DEMANDE DE DÉMO ===');
    console.log(emailContent);
    console.log('================================');

    // Vous pouvez aussi sauvegarder dans une base de données ici
    // Par exemple avec Prisma, Supabase, MongoDB, etc.

    return NextResponse.json(
      { 
        success: true,
        message: 'Demande de démo envoyée avec succès'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors du traitement de la demande:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors du traitement de la demande' },
      { status: 500 }
    );
  }
}
