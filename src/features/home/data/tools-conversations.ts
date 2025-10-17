// Types pour les CTA (Call-to-Action)
export type MessageCTA = {
  label: string;
  link: string;
};

// Types pour les messages
export type ToolMessage = {
  type: 'user' | 'cortex';
  text: string;
  delay: number; // délai avant d'apparaître (en ms)
  cta?: MessageCTA; // Bouton CTA (optionnel)
};

export type ToolConversation = {
  id: number;
  messages: ToolMessage[];
};

// Timing configuration
export const TOOLS_TIMING = {
  messageDisplay: 4000, // Temps d'affichage d'un message
  conversationPause: 3000, // Pause entre conversations
};

// Configuration des conversations par langue
export const toolsConversations: Record<string, ToolConversation[]> = {
  fr: [
    {
      id: 0,
      messages: [
        { 
          type: 'user', 
          text: 'Comment optimiser la prise d\'inventaire dans mon restaurant ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Excellente question ! Avec Inventaire, transformez une corvée en processus efficace 📦\n\n✅ Prenez vos inventaires en équipe et divisez le temps par 3\n✅ Suivez vos stocks en temps réel\n✅ Détectez les écarts instantanément\n✅ Réduisez vos pertes de 2 à 5%\n\nChaque membre de l\'équipe peut compter simultanément sur son appareil. Les données se synchronisent automatiquement !',
          delay: 1500,
          cta: {
            label: 'Découvrir Inventaire',
            link: '/fonctionnalites/inventaire'
          }
        }
      ]
    },
    {
      id: 1,
      messages: [
        { 
          type: 'user', 
          text: 'J\'aimerais mieux contrôler mon food cost et créer des recettes standardisées', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Parfait ! Le Food Cost est la clé de votre rentabilité 👨‍🍳\n\n✅ Créez vos fiches techniques détaillées\n✅ Calculez automatiquement vos coûts et marges\n✅ Un prix change ? Toutes vos recettes se mettent à jour instantanément\n✅ Analysez la rentabilité de chaque plat\n\nZéro erreur de calcul, zéro Excel. Tout est automatique et toujours à jour !',
          delay: 1500,
          cta: {
            label: 'Découvrir Food Cost',
            link: '/fonctionnalites/food-cost'
          }
        }
      ]
    },
    {
      id: 2,
      messages: [
        { 
          type: 'user', 
          text: 'Comment surveiller les températures de mes zones tempérées pour la sécurité alimentaire ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'La sécurité alimentaire, c\'est critique ! Avec Températures, simplifiez votre conformité 🌡️\n\n✅ Surveillance automatique 24/7 de vos zones tempérées\n✅ Alertes instantanées si température hors norme\n✅ Fini les saisies manuelles et les oublis\n✅ Historique complet pour inspections MAPAQ\n\nVos frigos, congélateurs et zones chaudes sont surveillés en continu. Vous êtes alerté avant que ça devienne un problème !',
          delay: 1500,
          cta: {
            label: 'Découvrir Températures',
            link: '/fonctionnalites/temperatures'
          }
        }
      ]
    },
    {
      id: 3,
      messages: [
        { 
          type: 'user', 
          text: 'Je veux gérer mes fiches employés et conventions collectives sans Excel !', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'On vous comprend ! Excel, c\'est fini 👥\n\n✅ Fiches employés complètes et centralisées\n✅ Gestion des conventions collectives simplifiée\n✅ Suivi des heures et disponibilités\n✅ Documents RH accessibles en un clic\n\nToutes vos informations RH au même endroit, sécurisées et toujours à jour. Plus de fichiers Excel perdus ou versions multiples !',
          delay: 1500,
          cta: {
            label: 'Découvrir RH',
            link: '/fonctionnalites/ressources-humaines'
          }
        }
      ]
    }
  ],
  en: [
    {
      id: 0,
      messages: [
        { 
          type: 'user', 
          text: 'How can I optimize inventory taking in my restaurant?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Great question! With Inventory, transform a chore into an efficient process 📦\n\n✅ Take inventory as a team and divide time by 3\n✅ Track your stock in real-time\n✅ Detect discrepancies instantly\n✅ Reduce losses by 2 to 5%\n\nEach team member can count simultaneously on their device. Data syncs automatically!',
          delay: 1500,
          cta: {
            label: 'Discover Inventory',
            link: '/fonctionnalites/inventaire'
          }
        }
      ]
    },
    {
      id: 1,
      messages: [
        { 
          type: 'user', 
          text: 'I want to better control my food cost and create standardized recipes', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Perfect! Food Cost is the key to your profitability 👨‍🍳\n\n✅ Create detailed technical sheets\n✅ Automatically calculate costs and margins\n✅ Price changes? All recipes update instantly\n✅ Analyze profitability of each dish\n\nZero calculation errors, zero Excel. Everything is automatic and always up to date!',
          delay: 1500,
          cta: {
            label: 'Discover Food Cost',
            link: '/fonctionnalites/food-cost'
          }
        }
      ]
    },
    {
      id: 2,
      messages: [
        { 
          type: 'user', 
          text: 'How can I monitor temperatures in my cold zones for food safety?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Food safety is critical! With Temperatures, simplify your compliance 🌡️\n\n✅ Automatic 24/7 monitoring of cold zones\n✅ Instant alerts if temperature out of range\n✅ No more manual entries and forgotten logs\n✅ Complete history for health inspections\n\nYour fridges, freezers and hot zones are monitored continuously. You\'re alerted before it becomes a problem!',
          delay: 1500,
          cta: {
            label: 'Discover Temperatures',
            link: '/fonctionnalites/temperatures'
          }
        }
      ]
    },
    {
      id: 3,
      messages: [
        { 
          type: 'user', 
          text: 'I want to manage employee files and collective agreements without Excel!', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'We understand! Excel is over 👥\n\n✅ Complete and centralized employee files\n✅ Simplified collective agreement management\n✅ Hours and availability tracking\n✅ HR documents accessible in one click\n\nAll your HR information in one place, secure and always up to date. No more lost Excel files or multiple versions!',
          delay: 1500,
          cta: {
            label: 'Discover HR',
            link: '/fonctionnalites/ressources-humaines'
          }
        }
      ]
    }
  ]
};
