import { Metadata } from 'next';
import { PricingSection } from '@/features/pricing/components/pricing-section';

export const metadata: Metadata = {
  title: 'Forfaits et tarification | Octogone',
  description: 'Découvrez nos forfaits adaptés à vos besoins. Solutions flexibles pour restaurants de toutes tailles.',
};

interface PricingPageProps {
  params: {
    locale: string;
  };
}

export default function PricingPage({ params }: PricingPageProps) {
  const locale = params.locale as 'fr' | 'en';

  return (
    <main>
      <PricingSection locale={locale} />
    </main>
  );
}
