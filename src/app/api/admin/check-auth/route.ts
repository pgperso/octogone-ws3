import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin/security';

export async function GET(request: NextRequest) {
  try {
    const authResult = validateAdminAuth(request);
    
    if (!authResult.valid) {
      return NextResponse.json(
        { error: authResult.error },
        { status: 401 }
      );
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
