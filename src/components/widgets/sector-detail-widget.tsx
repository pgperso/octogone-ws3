"use client";

import React from "react";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { OctogoneButton } from "@/components/ui/octogone-button";
import { TargetSector } from "@/data/sectors-data";
import { getSectorContentV2 } from "@/data/sector-content";
import { getTestimonialForSector, getTestimonialById } from "@/data/testimonials-data";
import TestimonialWidget from "@/components/widgets/testimonial-widget";
import { 
  Package, 
  BarChart3, 
  Calculator, 
  FileText, 
  Users, 
  Thermometer,
  DollarSign,
  TrendingUp,
  ArrowRight
} from "lucide-react";

interface SectorDetailWidgetProps {
  sector: TargetSector;
  locale: string;
  isRestaurantStyle?: boolean;
}

// Modules disponibles avec leurs données
const availableModules = {
  products: {
    icon: Package,
    titleFr: "Base de données produits",
    titleEn: "Product database",
    descFr: "Centralisez vos produits et coûts pour une transparence totale et une traçabilité exacte.",
    descEn: "Centralize your products and costs for total transparency and exact traceability."
  },
  inventory: {
    icon: BarChart3,
    titleFr: "Inventaires intelligents",
    titleEn: "Smart inventory",
    descFr: "Suivez vos stocks en temps réel pour réduire les pertes et optimiser votre planification.",
    descEn: "Track your inventory in real-time to reduce waste and optimize your planning."
  },
  recipes: {
    icon: Calculator,
    titleFr: "Calculs de recettes",
    titleEn: "Recipe calculations",
    descFr: "Calculez automatiquement vos coûts matière et standardisez vos recettes pour maîtriser votre FoodCost.",
    descEn: "Automatically calculate your material costs and standardize your recipes to master your FoodCost."
  },
  invoicing: {
    icon: FileText,
    titleFr: "Facturation automatisée",
    titleEn: "Automated invoicing",
    descFr: "Gérez et automatisez vos factures pour économiser un temps administratif précieux.",
    descEn: "Manage and automate your invoices to save valuable administrative time."
  },
  analytics: {
    icon: TrendingUp,
    titleFr: "Analyses & Dashboard",
    titleEn: "Analytics & Dashboard",
    descFr: "Comparez vos performances avec des indicateurs clés pour des décisions basées sur la donnée.",
    descEn: "Compare your performance with key indicators for data-driven decisions."
  },
  hr: {
    icon: Users,
    titleFr: "Ressources humaines",
    titleEn: "Human resources",
    descFr: "Gérez vos dossiers employés et la conformité de manière simple et centralisée.",
    descEn: "Manage your employee files and compliance in a simple and centralized way."
  },
  temperature: {
    icon: Thermometer,
    titleFr: "Thermomètres connectés",
    titleEn: "Connected thermometers",
    descFr: "Surveillez les températures pour garantir la sécurité alimentaire et prévenir les pertes.",
    descEn: "Monitor temperatures to ensure food safety and prevent losses."
  },
  tips: {
    icon: DollarSign,
    titleFr: "Gestion des pourboires",
    titleEn: "Tips management",
    descFr: "Automatisez la gestion des conventions de pourboires avec précision et conformité légale.",
    descEn: "Automate tip management with precision and legal compliance."
  }
};

// Logique de sélection des modules selon le secteur
const getRelevantModules = (sectorId: string) => {
  const baseModules = ['products', 'inventory', 'recipes', 'analytics'];
  
  const sectorSpecificModules: Record<string, string[]> = {
    // Types d'entreprises
    'chains-groups': ['products', 'inventory', 'recipes', 'analytics', 'hr', 'invoicing'],
    'independent-restaurants': ['products', 'inventory', 'recipes', 'analytics', 'temperature'],
    'caterers': ['products', 'recipes', 'inventory', 'analytics', 'invoicing'],
    'brewers-distillers': ['products', 'recipes', 'inventory', 'analytics', 'temperature'],
    'purchasing-groups': ['products', 'inventory', 'analytics', 'invoicing'],
    'retail-commerce': ['products', 'inventory', 'recipes', 'analytics', 'invoicing'],
    
    // Styles de restaurants
    'gastronomic': ['products', 'recipes', 'inventory', 'analytics', 'temperature', 'tips'],
    'bistro-brasserie': ['products', 'recipes', 'inventory', 'analytics'],
    'fast-food': ['products', 'inventory', 'recipes', 'analytics', 'hr'],
    'casse-croute': ['products', 'inventory', 'recipes', 'analytics'],
    'family-restaurant': ['products', 'inventory', 'recipes', 'analytics'],
    'cafe': ['products', 'inventory', 'recipes', 'analytics'],
    'pub-microbrewery': ['products', 'recipes', 'inventory', 'analytics', 'temperature'],
    'catering-corporate': ['products', 'recipes', 'inventory', 'analytics', 'invoicing'],
    'tourism-industrial': ['products', 'inventory', 'recipes', 'analytics', 'hr', 'temperature']
  };
  
  return sectorSpecificModules[sectorId] || baseModules;
};

export default function SectorDetailWidget({ sector, locale, isRestaurantStyle = false }: SectorDetailWidgetProps) {
  const relevantModules = getRelevantModules(sector.id, isRestaurantStyle);
  
  // FORCER l'utilisation de la V2 UNIQUEMENT
  const contentV2 = getSectorContentV2(sector.id, isRestaurantStyle);
  
  // Debug
  console.log('🔍 SECTOR:', sector.id, 'isRestaurantStyle:', isRestaurantStyle, 'contentV2:', !!contentV2);
  
  // Si pas de V2, on utilise un contenu minimal par défaut
  if (!contentV2) {
    console.warn('⚠️ Pas de contenu V2 pour', sector.id, '- Utilisation du fallback');
  }

  return (
    <div>
      {/* 1. Résultats mesurables */}
      <ResponsiveSection spacing="lg" className="bg-marine-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-marine-900 mb-4">
            {locale === "fr" ? "Des résultats clairs et immédiats" : "Clear and immediate results"}
          </h2>
          <p className="text-lg text-marine-700 max-w-3xl mx-auto">
            {locale === "fr" ? 
              (contentV2?.introResultats.fr || "Optimisez votre gestion avec Octogone") : 
              (contentV2?.introResultats.en || "Optimize your management with Octogone")
            }
          </p>
        </div>

        {/* Métriques chiffrées en évidence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {(locale === "fr" ? 
            (contentV2?.metriques?.fr || ["-25% de gaspillage", "+10% de marge brute", "+15h/sem économisées", ">98% précision des coûts"]) :
            (contentV2?.metriques?.en || ["-25% waste", "+10% gross margin", "+15h/week saved", ">98% cost accuracy"])
          ).map((metric: string, index: number) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg border-2" style={{ borderColor: '#E5E5E5' }}>
              <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-gold-600" />
              </div>
              <p className="text-xl font-bold text-marine-900 mb-2">
                {metric}
              </p>
            </div>
          ))}
        </div>

        {/* Témoignage client associé au secteur - Widget réutilisable */}
        {(() => {
          // Utiliser le testimonial du V2 si disponible, sinon fallback
          const testimonialId = contentV2?.testimonial?.id;
          const testimonial = testimonialId ? 
            getTestimonialById(testimonialId) : 
            getTestimonialForSector(sector.id, isRestaurantStyle);
          
          if (testimonial) {
            return (
              <TestimonialWidget
                testimonial={testimonial}
                locale={locale}
                className=""
                showTitle={true}
                title={{
                  fr: "Témoignage client",
                  en: "Client testimonial"
                }}
              />
            );
          }
          
          // Fallback si pas de témoignage
          return (
            <div className="bg-marine-900 rounded-2xl p-8 text-center border-2 max-w-4xl mx-auto" style={{ borderColor: '#E5E5E5' }}>
              <div className="text-white">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-sm font-medium opacity-90">
                  {locale === "fr" ? "Graphique des performances en temps réel" : "Real-time performance chart"}
                </p>
              </div>
            </div>
          );
        })()}
      </ResponsiveSection>

      {/* 2. Outils qui font la différence */}
      <ResponsiveSection spacing="lg">
        <div className="text-center mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-marine-900 mb-4">
            {locale === "fr" ? "Les outils qui transforment votre gestion" : "The tools that transform your management"}
          </h2>
          <p className="text-lg text-marine-700 max-w-3xl mx-auto">
            {locale === "fr" ? 
              (contentV2?.sousTexteSolutions.fr || "Modules sélectionnés pour votre secteur") : 
              (contentV2?.sousTexteSolutions.en || "Modules selected for your sector")
            }
          </p>
        </div>

        {/* Modules en format alternés gauche/droite */}
        <div className="space-y-16">
          {relevantModules.slice(0, 4).map((moduleKey, index) => {
            const moduleData = availableModules[moduleKey as keyof typeof availableModules];
            if (!moduleData) return null;
            
            const isEven = index % 2 === 0;
            const IconComponent = moduleData.icon;
            
            return (
              <div key={moduleKey} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                {/* Image/Mockup */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="bg-gradient-to-br from-marine-100 to-gold-100 rounded-2xl p-8 aspect-video flex items-center justify-center border-2" style={{ borderColor: '#E5E5E5' }}>
                    <div className="text-center">
                      <IconComponent className="w-16 h-16 mx-auto mb-4" style={{ color: '#dcb26b' }} />
                      <p className="text-sm font-medium text-marine-600">
                        {locale === "fr" ? `Interface ${moduleData.titleFr}` : `${moduleData.titleEn} Interface`}
                      </p>
                      <p className="text-xs mt-1 opacity-70 text-marine-500">(placeholder)</p>
                    </div>
                  </div>
                </div>
                
                {/* Contenu */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="mb-6">
                    <h3 className="text-3xl lg:text-4xl font-bold text-marine-900 mb-2">
                      {locale === "fr" ? module.titleFr : module.titleEn}
                    </h3>
                    <p className="text-marine-600 text-lg">
                      {locale === "fr" ? "Module Octogone" : "Octogone Module"}
                    </p>
                  </div>
                  
                  <p className="text-marine-700 mb-6 text-lg leading-relaxed">
                    {locale === "fr" ? 
                      `Module ${module.titleFr} adapté spécifiquement pour les ${sector.titleFr.toLowerCase()}` :
                      `${module.titleEn} module specifically adapted for ${sector.titleEn.toLowerCase()}`
                    }
                  </p>
                  
                  {/* Points de bénéfices spécifiques au module */}
                  <ul className="space-y-3 mb-6">
                    {(() => {
                      const benefits = {
                        products: {
                          fr: ["Centralisation des fiches produits", "Suivi des prix fournisseurs", "Gestion des allergènes"],
                          en: ["Product sheet centralization", "Supplier price tracking", "Allergen management"]
                        },
                        inventory: {
                          fr: ["Suivi temps réel des stocks", "Alertes de rupture automatiques", "Optimisation des commandes"],
                          en: ["Real-time stock tracking", "Automatic stock-out alerts", "Order optimization"]
                        },
                        recipes: {
                          fr: ["Calcul automatique des coûts", "Standardisation des portions", "Contrôle de la rentabilité"],
                          en: ["Automatic cost calculation", "Portion standardization", "Profitability control"]
                        },
                        invoicing: {
                          fr: ["Facturation automatisée", "Suivi des paiements", "Rapports financiers"],
                          en: ["Automated invoicing", "Payment tracking", "Financial reports"]
                        },
                        analytics: {
                          fr: ["Tableaux de bord temps réel", "Analyses prédictives", "Rapports personnalisés"],
                          en: ["Real-time dashboards", "Predictive analytics", "Custom reports"]
                        },
                        hr: {
                          fr: ["Planification des équipes", "Suivi des heures", "Gestion des congés"],
                          en: ["Team scheduling", "Time tracking", "Leave management"]
                        },
                        temperature: {
                          fr: ["Surveillance continue", "Alertes automatiques", "Conformité HACCP"],
                          en: ["Continuous monitoring", "Automatic alerts", "HACCP compliance"]
                        },
                        tips: {
                          fr: ["Répartition équitable", "Calculs automatiques", "Transparence totale"],
                          en: ["Fair distribution", "Automatic calculations", "Full transparency"]
                        }
                      };
                      
                      const moduleBenefits = benefits[moduleKey as keyof typeof benefits];
                      const benefitList = locale === "fr" ? moduleBenefits?.fr : moduleBenefits?.en;
                      
                      return (benefitList || [
                        locale === "fr" ? "Optimisation des processus" : "Process optimization",
                        locale === "fr" ? "Gain de temps significatif" : "Significant time savings",
                        locale === "fr" ? "Amélioration de la précision" : "Improved accuracy"
                      ]).map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div 
                            className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                            style={{ backgroundColor: '#dcb26b' }}
                          ></div>
                          <span className="text-marine-700">
                            {benefit}
                          </span>
                        </li>
                      ));
                    })()}
                  </ul>
                  
                  <OctogoneButton
                    href={`/${locale}/demo`}
                    variant="secondary"
                    size="sm"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {locale === "fr" ? "Voir en détail" : "See details"}
                  </OctogoneButton>
                </div>
              </div>
            );
          })}
        </div>
      </ResponsiveSection>

      {/* 3. Appel à l'action */}
      <ResponsiveSection spacing="lg" className="bg-marine-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {locale === "fr" ? "Passez à la performance mesurable" : "Move to measurable performance"}
          </h2>
          
          <p className="text-xl opacity-90">
            {locale === "fr" ? 
              (contentV2?.ctaTexte.fr || "Transformez votre gestion avec Octogone") : 
              (contentV2?.ctaTexte.en || "Transform your management with Octogone")
            }
          </p>
        </div>
      </ResponsiveSection>
    </div>
  );
}
