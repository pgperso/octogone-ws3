import { Metadata } from 'next';
import { PricingSection } from '@/features/pricing/components/pricing-section';

export const metadata: Metadata = {
  title: 'Forfaits et tarification | Octogone',
  description: 'Découvrez nos forfaits adaptés à vos besoins. Solutions flexibles pour restaurants de toutes tailles.',
};

interface PricingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;

  return (
    <main>
      <PricingSection locale={locale as 'fr' | 'en'} />
    </main>
  );
}
