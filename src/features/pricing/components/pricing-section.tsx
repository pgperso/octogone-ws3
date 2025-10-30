'use client';

import React from 'react';
import { ResponsiveSection } from '@/components/ui/responsive-section';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { Check, Sparkles, Building2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PricingSectionProps {
  locale: 'fr' | 'en';
}

export const PricingSection: React.FC<PricingSectionProps> = ({ locale }) => {
  const isEnglish = locale === 'en';

  const plans = [
    {
      id: 'starter',
      name: isEnglish ? 'Starter' : 'Démarrage',
      icon: Sparkles,
      price: isEnglish ? 'Contact us' : 'Nous contacter',
      description: isEnglish 
        ? 'Perfect for single-location restaurants starting their digital transformation'
        : 'Parfait pour les restaurants mono-établissement qui démarrent leur transformation numérique',
      features: [
        isEnglish ? 'Real-time inventory management' : 'Gestion d\'inventaire en temps réel',
        isEnglish ? 'Recipe costing' : 'Calcul des coûts de recettes',
        isEnglish ? 'Basic dashboard' : 'Tableau de bord de base',
        isEnglish ? 'POS integration' : 'Intégration POS',
        isEnglish ? 'Email support' : 'Support par email',
        isEnglish ? '1 location' : '1 établissement'
      ],
      highlighted: false
    },
    {
      id: 'professional',
      name: isEnglish ? 'Professional' : 'Professionnel',
      icon: Building2,
      price: isEnglish ? 'Contact us' : 'Nous contacter',
      description: isEnglish
        ? 'For growing restaurants needing advanced features and analytics'
        : 'Pour les restaurants en croissance nécessitant des fonctionnalités avancées',
      features: [
        isEnglish ? 'Everything in Starter' : 'Tout ce qui est dans Démarrage',
        isEnglish ? 'Octogone 360 Dashboard' : 'Tableau de bord Octogone 360',
        isEnglish ? 'Advanced analytics & reports' : 'Analyses et rapports avancés',
        isEnglish ? 'Multi-supplier integration' : 'Intégration multi-fournisseurs',
        isEnglish ? 'Priority support' : 'Support prioritaire',
        isEnglish ? 'Up to 3 locations' : 'Jusqu\'à 3 établissements'
      ],
      highlighted: true
    },
    {
      id: 'enterprise',
      name: isEnglish ? 'Enterprise' : 'Entreprise',
      icon: Users,
      price: isEnglish ? 'Custom pricing' : 'Tarification personnalisée',
      description: isEnglish
        ? 'For restaurant groups and franchises requiring full customization'
        : 'Pour les groupes de restaurants et franchises nécessitant une personnalisation complète',
      features: [
        isEnglish ? 'Everything in Professional' : 'Tout ce qui est dans Professionnel',
        isEnglish ? 'Cortex AI assistant' : 'Assistant IA Cortex',
        isEnglish ? 'Custom integrations' : 'Intégrations personnalisées',
        isEnglish ? 'Dedicated account manager' : 'Gestionnaire de compte dédié',
        isEnglish ? 'Concierge service' : 'Service de conciergerie',
        isEnglish ? 'Unlimited locations' : 'Établissements illimités'
      ],
      highlighted: false
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <ResponsiveSection spacing="xl" bgColor="">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--on-surface)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isEnglish ? 'Simple, transparent pricing' : 'Tarification simple et transparente'}
          </motion.h1>
          <motion.p 
            className="text-xl"
            style={{ color: 'var(--on-surface-variant)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isEnglish 
              ? 'Choose the plan that fits your restaurant\'s needs. All plans include core features with no hidden fees.'
              : 'Choisissez le forfait qui correspond aux besoins de votre restaurant. Tous les forfaits incluent les fonctionnalités de base sans frais cachés.'
            }
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-8 relative ${plan.highlighted ? 'shadow-2xl' : 'shadow-lg'}`}
                style={{
                  backgroundColor: plan.highlighted ? 'var(--primary-container)' : 'var(--surface)',
                  border: plan.highlighted ? '3px solid var(--primary)' : '1px solid var(--outline)',
                  transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {plan.highlighted && (
                  <div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold"
                    style={{ 
                      backgroundColor: 'var(--primary)',
                      color: 'var(--on-primary)'
                    }}
                  >
                    {isEnglish ? 'Most Popular' : 'Plus populaire'}
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--secondary-container)' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: 'var(--on-secondary-container)' }} />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 
                  className="text-2xl font-bold text-center mb-2"
                  style={{ color: plan.highlighted ? 'var(--on-primary-container)' : 'var(--on-surface)' }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="text-center mb-4">
                  <div 
                    className="text-3xl font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    {plan.price}
                  </div>
                </div>

                {/* Description */}
                <p 
                  className="text-center mb-6 min-h-[60px]"
                  style={{ color: plan.highlighted ? 'var(--on-primary-container)' : 'var(--on-surface-variant)' }}
                >
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check 
                        className="w-5 h-5 flex-shrink-0 mt-0.5" 
                        style={{ color: 'var(--success)' }}
                      />
                      <span 
                        className="text-sm"
                        style={{ color: plan.highlighted ? 'var(--on-primary-container)' : 'var(--on-surface)' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={`/${locale}/contact`}>
                  <OctogoneButton
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                  >
                    {isEnglish ? 'Contact us' : 'Nous contacter'}
                  </OctogoneButton>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </ResponsiveSection>

      {/* FAQ or Additional Info Section */}
      <ResponsiveSection spacing="lg" bgColor="var(--surface-variant)">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--on-surface)' }}>
            {isEnglish ? 'Need a custom solution?' : 'Besoin d\'une solution personnalisée ?'}
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--on-surface-variant)' }}>
            {isEnglish
              ? 'Every restaurant is unique. Contact us to discuss a tailored plan that perfectly fits your specific needs and budget.'
              : 'Chaque restaurant est unique. Contactez-nous pour discuter d\'un forfait sur mesure qui correspond parfaitement à vos besoins spécifiques et à votre budget.'
            }
          </p>
          <Link href={`/${locale}/contact`}>
            <OctogoneButton variant="primary" size="lg">
              {isEnglish ? 'Schedule a demo' : 'Planifier une démo'}
            </OctogoneButton>
          </Link>
        </div>
      </ResponsiveSection>
    </>
  );
};
