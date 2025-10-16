import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Langues supportées
const locales = ['fr', 'en']
const defaultLocale = 'fr'

// Middleware pour gérer la redirection des langues
export function middleware(request: NextRequest) {
  // Obtenir le chemin de la requête
  const { pathname } = request.nextUrl

  // Ignorer les fichiers statiques et les API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Vérifier si le chemin commence déjà par une locale valide
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Si le chemin a déjà une locale, ne rien faire
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Sinon, rediriger vers la locale par défaut
  // Créer une nouvelle URL avec la locale par défaut
  const newUrl = new URL(
    `/${defaultLocale}${pathname === '/' ? '' : pathname}`,
    request.url
  )

  // Conserver les paramètres de recherche
  newUrl.search = request.nextUrl.search

  // Rediriger vers la nouvelle URL
  return NextResponse.redirect(newUrl)
}

// Configuration du middleware pour qu'il s'exécute sur tous les chemins
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
