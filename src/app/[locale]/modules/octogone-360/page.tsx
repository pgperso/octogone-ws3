"use client";

import React from "react";
import { useParams } from "next/navigation";
import PageTemplate from "@/components/ui/page-template";
import PageTransition from "@/components/ui/page-transition";

export default function Octogone360Page() {
  // Récupérer la locale actuelle des paramètres d'URL
  const params = useParams();
  // Utiliser une vérification sécurisée pour obtenir la locale
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";

  // Définir les titres et descriptions en fonction de la langue
  const content = {
    fr: {
      title: "Octogone 360 – Analyse des KPIs",
      description: "Suivez vos performances en temps réel et améliorez vos décisions grâce à notre module d'analyse avancée. Tableaux de bord personnalisables, indicateurs clés de performance et visualisations interactives pour optimiser votre gestion."
    },
    en: {
      title: "Octogone 360 – KPI Analysis",
      description: "Track your performance in real-time and improve your decisions with our advanced analytics module. Customizable dashboards, key performance indicators, and interactive visualizations to optimize your management."
    }
  };

  // Sélectionner le contenu en fonction de la langue actuelle
  const { title, description } = content[locale as keyof typeof content] || content.fr;

  return (
    <PageTransition>
      <PageTemplate
        title={title}
        description={description}
      >
        {/* Le contenu supplémentaire sera ajouté ultérieurement */}
      </PageTemplate>
    </PageTransition>
  );
}
