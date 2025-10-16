import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Mot de passe admin (à définir dans les variables d'environnement)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '160200';

// Rate limiting simple (en mémoire)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Vérifier le rate limiting
    const attempts = loginAttempts.get(clientIP);
    if (attempts && attempts.count >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
      if (timeSinceLastAttempt < LOCKOUT_TIME) {
        return NextResponse.json(
          { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
          { status: 429 }
        );
      } else {
        // Reset après expiration
        loginAttempts.delete(clientIP);
      }
    }

    // Vérifier le mot de passe
    if (password !== ADMIN_PASSWORD) {
      // Enregistrer la tentative échouée
      const currentAttempts = loginAttempts.get(clientIP) || { count: 0, lastAttempt: 0 };
      loginAttempts.set(clientIP, {
        count: currentAttempts.count + 1,
        lastAttempt: Date.now()
      });

      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Réinitialiser les tentatives en cas de succès
    loginAttempts.delete(clientIP);

    // Créer une session (cookie sécurisé)
    const sessionToken = generateSessionToken();
    
    const response = NextResponse.json({ success: true });
    
    // Cookie qui expire dans 24 heures
    response.cookies.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 heures
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Générer un token de session cryptographiquement sécurisé
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex') + '-' + Date.now();
}
