import { Metadata } from "next";
import { notFound } from "next/navigation";
import FeatureDetailWidget from "@/components/widgets/feature-detail-widget";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  ArrowUpDown, 
  Tag, 
  Briefcase, 
  UtensilsCrossed,
  Grid3x3,
  Receipt,
  PieChart
} from "lucide-react";

const locales = ["fr", "en"] as const;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const isEnglish = locale === "en";

  return {
    title: isEnglish
      ? "Octogone 360 - Intelligent Dashboard | Octogone"
      : "Octogone 360 - Tableau de bord intelligent | Octogone",
    description: isEnglish
      ? "Centralize all your KPIs in one place. Sales, traffic, profits, labor costs, food cost and more. Real-time data for informed decisions."
      : "Centralisez tous vos KPIs en un seul endroit. Ventes, achalandage, bénéfices, coûts main d'œuvre, food cost et plus. Données en temps réel pour des décisions éclairées.",
  };
}

export default function Octogone360Page({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const isEnglish = locale === "en";

  const kpis = [
    {
      icon: TrendingUp,
      titleFr: "Ventes",
      titleEn: "Sales",
      descriptionFr: "Suivez vos ventes en temps réel avec comparaisons historiques et tendances.",
      descriptionEn: "Track your sales in real-time with historical comparisons and trends."
    },
    {
      icon: Users,
      titleFr: "Achalandage",
      titleEn: "Traffic",
      descriptionFr: "Analysez le nombre de clients et identifiez vos périodes de pointe.",
      descriptionEn: "Analyze customer count and identify your peak periods."
    },
    {
      icon: DollarSign,
      titleFr: "Bénéfices",
      titleEn: "Profits",
      descriptionFr: "Visualisez votre rentabilité avec des comparaisons période par période.",
      descriptionEn: "Visualize your profitability with period-over-period comparisons."
    },
    {
      icon: ShoppingCart,
      titleFr: "Achats",
      titleEn: "Purchases",
      descriptionFr: "Contrôlez vos dépenses d'approvisionnement et optimisez vos coûts.",
      descriptionEn: "Control your supply expenses and optimize your costs."
    },
    {
      icon: ArrowUpDown,
      titleFr: "Gains et pertes",
      titleEn: "Gains and Losses",
      descriptionFr: "Identifiez rapidement les écarts d'inventaire et les pertes.",
      descriptionEn: "Quickly identify inventory variances and losses."
    },
    {
      icon: Tag,
      titleFr: "Surveillance des prix",
      titleEn: "Price Monitoring",
      descriptionFr: "Détectez les changements de prix de vos fournisseurs instantanément.",
      descriptionEn: "Detect supplier price changes instantly."
    },
    {
      icon: Briefcase,
      titleFr: "Coûts main d'œuvre",
      titleEn: "Labor Costs",
      descriptionFr: "Suivez vos coûts de personnel en pourcentage des ventes.",
      descriptionEn: "Track your labor costs as a percentage of sales."
    },
    {
      icon: UtensilsCrossed,
      titleFr: "Food cost",
      titleEn: "Food Cost",
      descriptionFr: "Surveillez votre ratio food cost et maintenez votre rentabilité.",
      descriptionEn: "Monitor your food cost ratio and maintain profitability."
    },
    {
      icon: Grid3x3,
      titleFr: "Ingénierie de menu",
      titleEn: "Menu Engineering",
      descriptionFr: "Analysez la performance de chaque plat (popularité et rentabilité).",
      descriptionEn: "Analyze each dish's performance (popularity and profitability)."
    },
    {
      icon: PieChart,
      titleFr: "Coûts fixes",
      titleEn: "Fixed Costs",
      descriptionFr: "Suivez vos dépenses fixes (loyer, assurances, etc.).",
      descriptionEn: "Track your fixed expenses (rent, insurance, etc.)."
    },
    {
      icon: Receipt,
      titleFr: "Facture moyenne client",
      titleEn: "Average Customer Bill",
      descriptionFr: "Mesurez le panier moyen et identifiez les opportunités d'upselling.",
      descriptionEn: "Measure average basket and identify upselling opportunities."
    }
  ];

  const benefits = [
    {
      titleFr: "Vision 360° de votre restaurant",
      titleEn: "360° View of Your Restaurant",
      descriptionFr: "Tous vos KPIs critiques réunis sur un seul écran. Prenez des décisions éclairées en un coup d'œil.",
      descriptionEn: "All your critical KPIs on one screen. Make informed decisions at a glance."
    },
    {
      titleFr: "Données en temps réel",
      titleEn: "Real-Time Data",
      descriptionFr: "Vos chiffres se mettent à jour automatiquement. Réagissez rapidement aux changements.",
      descriptionEn: "Your numbers update automatically. React quickly to changes."
    },
    {
      titleFr: "Comparaisons intelligentes",
      titleEn: "Smart Comparisons",
      descriptionFr: "Comparez vos performances jour/jour, semaine/semaine, mois/mois. Identifiez les tendances.",
      descriptionEn: "Compare your performance day/day, week/week, month/month. Identify trends."
    },
    {
      titleFr: "Alertes proactives",
      titleEn: "Proactive Alerts",
      descriptionFr: "Recevez des notifications quand un KPI sort de la normale. Anticipez les problèmes.",
      descriptionEn: "Receive notifications when a KPI goes out of range. Anticipate problems."
    },
    {
      titleFr: "Multi-établissements",
      titleEn: "Multi-Location",
      descriptionFr: "Gérez plusieurs restaurants depuis un seul tableau de bord. Comparez les performances.",
      descriptionEn: "Manage multiple restaurants from one dashboard. Compare performances."
    },
    {
      titleFr: "Accessible partout",
      titleEn: "Accessible Anywhere",
      descriptionFr: "Consultez vos KPIs depuis n'importe quel appareil, où que vous soyez.",
      descriptionEn: "Check your KPIs from any device, wherever you are."
    }
  ];

  return (
    <FeatureDetailWidget
      locale={locale}
      heroTitle={isEnglish ? "Octogone 360" : "Octogone 360"}
      heroSubtitle={
        isEnglish
          ? "Your Intelligent Dashboard"
          : "Votre tableau de bord intelligent"
      }
      heroDescription={
        isEnglish
          ? "Centralize all your restaurant's KPIs in one place. Sales, traffic, profits, costs... Everything you need to make the right decisions, in real-time."
          : "Centralisez tous les KPIs de votre restaurant en un seul endroit. Ventes, achalandage, bénéfices, coûts... Tout ce dont vous avez besoin pour prendre les bonnes décisions, en temps réel."
      }
      heroImage="/dashboard_fr.avif"
      sections={[
        {
          title: isEnglish ? "Your Essential KPIs" : "Vos KPIs essentiels",
          subtitle: isEnglish
            ? "All the metrics that matter for your restaurant"
            : "Toutes les métriques qui comptent pour votre restaurant",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpis.map((kpi, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "var(--surface-container)",
                    border: "1px solid var(--outline-variant)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: "var(--primary-container)" }}
                  >
                    <kpi.icon
                      className="w-6 h-6"
                      style={{ color: "var(--on-primary-container)" }}
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--on-surface)" }}
                  >
                    {isEnglish ? kpi.titleEn : kpi.titleFr}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--on-surface-variant)" }}
                  >
                    {isEnglish ? kpi.descriptionEn : kpi.descriptionFr}
                  </p>
                </div>
              ))}
            </div>
          ),
        },
        {
          title: isEnglish ? "Why Octogone 360?" : "Pourquoi Octogone 360 ?",
          subtitle: isEnglish
            ? "The advantages of a centralized dashboard"
            : "Les avantages d'un tableau de bord centralisé",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--on-primary)" }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--on-surface)" }}
                    >
                      {isEnglish ? benefit.titleEn : benefit.titleFr}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--on-surface-variant)" }}
                    >
                      {isEnglish ? benefit.descriptionEn : benefit.descriptionFr}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ]}
      ctaText={isEnglish ? "Try Octogone 360" : "Essayer Octogone 360"}
      ctaLink={`/${locale}/demo`}
    />
  );
}
