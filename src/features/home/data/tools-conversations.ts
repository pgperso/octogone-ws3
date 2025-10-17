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
          text: 'Comment optimiser mes inventaires ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Avec Inventaire, prenez vos inventaires en équipe et divisez le temps par 3 ! 📦\n\nSuivez vos stocks en temps réel, détectez les écarts instantanément et réduisez vos pertes de 2 à 5%.',
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
          text: 'Comment calculer mes coûts de recettes ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Avec Recettes, créez vos fiches techniques et calculez automatiquement vos coûts et marges ! 👨‍🍳\n\nUn prix change ? Toutes vos recettes se mettent à jour instantanément. Zéro erreur, zéro calcul manuel.',
          delay: 1500,
          cta: {
            label: 'Découvrir Recettes',
            link: '/fonctionnalites/recettes'
          }
        }
      ]
    },
    {
      id: 2,
      messages: [
        { 
          type: 'user', 
          text: 'Comment gérer mes commandes fournisseurs ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Avec Commandes, générez vos bons de commande automatiquement selon vos besoins réels ! 📋\n\nFini les commandes à la main. Le système calcule ce qu\'il vous faut et crée les documents en un clic.',
          delay: 1500,
          cta: {
            label: 'Découvrir Commandes',
            link: '/fonctionnalites/commandes'
          }
        }
      ]
    },
    {
      id: 3,
      messages: [
        { 
          type: 'user', 
          text: 'Comment analyser mes performances ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Avec Rapports, visualisez vos performances en temps réel avec des tableaux de bord clairs ! 📊\n\nFood cost, rentabilité par plat, écarts d\'inventaire... Tout est là, en un coup d\'œil.',
          delay: 1500,
          cta: {
            label: 'Découvrir Rapports',
            link: '/fonctionnalites/rapports'
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
          text: 'How can I optimize my inventory?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'With Inventory, take your inventory as a team and divide time by 3! 📦\n\nTrack your stock in real-time, detect discrepancies instantly and reduce your losses by 2 to 5%.',
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
          text: 'How do I calculate my recipe costs?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'With Recipes, create your technical sheets and automatically calculate your costs and margins! 👨‍🍳\n\nA price changes? All your recipes update instantly. Zero errors, zero manual calculations.',
          delay: 1500,
          cta: {
            label: 'Discover Recipes',
            link: '/fonctionnalites/recettes'
          }
        }
      ]
    },
    {
      id: 2,
      messages: [
        { 
          type: 'user', 
          text: 'How do I manage supplier orders?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'With Orders, automatically generate your purchase orders based on your real needs! 📋\n\nNo more manual ordering. The system calculates what you need and creates documents in one click.',
          delay: 1500,
          cta: {
            label: 'Discover Orders',
            link: '/fonctionnalites/commandes'
          }
        }
      ]
    },
    {
      id: 3,
      messages: [
        { 
          type: 'user', 
          text: 'How can I analyze my performance?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'With Reports, visualize your performance in real-time with clear dashboards! 📊\n\nFood cost, profitability per dish, inventory variances... Everything at a glance.',
          delay: 1500,
          cta: {
            label: 'Discover Reports',
            link: '/fonctionnalites/rapports'
          }
        }
      ]
    }
  ]
};
