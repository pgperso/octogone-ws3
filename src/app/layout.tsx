import "@/styles/globals.css";
import "@/styles/motion-optimization.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: {
    template: '%s | Octogone',
    default: 'Octogone - Opérer, analyser, prédire | Plateforme IA pour restaurants',
  },
  description: 'Octogone - Opérer, analyser, prédire. Plateforme IA qui automatise la gestion restaurant : maîtrisez inventaires et food cost, transformez données en insights stratégiques et laissez Cortex, notre agent IA, vous guider vers une rentabilité optimale. Clients : 25% réduction coûts, 3h économisées/jour, 18% marges.',
  keywords: ['opérer analyser prédire', 'plateforme IA restaurant', 'automatise gestion restaurant', 'Cortex agent IA', 'agent IA restaurant', 'maîtriser inventaires', 'food cost automatique', 'insights stratégiques', 'rentabilité optimale', 'restaurant', 'gestion', 'inventaire', 'POS', 'recettes', 'facturation', 'prédictions', 'multi-établissements', 'gastronomique', 'restauration rapide', 'traiteurs', 'hôtels', 'Mario Rossi', 'Laurent Dubois', 'Yuki Tanaka', 'Sophie Martin'],
  authors: [{ name: 'Octogone' }],
  creator: 'Octogone',
  publisher: 'Octogone',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://octogone.ca'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-CA': '/fr',
      'en-CA': '/en',
    },
  },
  openGraph: {
    title: 'Octogone - Opérer, analyser, prédire | Plateforme IA restaurants',
    description: 'Automatisez votre gestion restaurant : maîtrisez inventaires et food cost, transformez données en insights stratégiques et laissez Cortex, notre agent IA, vous guider vers une rentabilité optimale. 25% réduction coûts, 3h économisées/jour, 18% marges.',
    url: 'https://octogone.ca',
    siteName: 'Octogone',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Octogone - Gestion intelligente pour restaurants',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Octogone - Opérer, analyser, prédire | Plateforme IA restaurants',
    description: 'Automatisez votre gestion restaurant : maîtrisez inventaires et food cost, laissez Cortex, notre agent IA, vous guider vers une rentabilité optimale. 25% réduction coûts.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <html lang="fr" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#002236" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        </head>
        <body className="antialiased" style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(186, 223, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(220, 178, 107, 0.06) 0%, transparent 50%), var(--background)',
          color: 'var(--on-background)'
        }}>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
