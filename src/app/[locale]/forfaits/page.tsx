'use client';

import { PricingSection } from '@/features/pricing/components/pricing-section';
import { useParams } from 'next/navigation';

export default function PricingPage() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <main>
      <PricingSection locale={locale as 'fr' | 'en'} />
    </main>
  );
}
