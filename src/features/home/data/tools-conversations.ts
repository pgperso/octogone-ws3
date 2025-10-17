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
  userName: string;
  userAvatar: string;
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
      userName: 'Sophie',
      userAvatar: '/images/avatars/lisa.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Salut Cortex ! Je m\'appelle Sophie, je découvre Octogone. Comment ça fonctionne ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Salut Sophie ! Bienvenue 👋\n\nOctogone, c\'est une plateforme complète pour gérer ton restaurant. Tout est construit autour de 4 piliers : Opérer, Automatiser, Analyser et Prédire !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'C\'est quoi "Opérer" exactement ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Opérer, c\'est gérer ton quotidien Sophie ! 📦\n\nInventaires en équipe, suivi des stocks en temps réel, gestion des produits... Tout ce qui touche à l\'exécution de tes opérations au jour le jour.',
          delay: 6000,
          cta: {
            label: 'Découvrir Opérer',
            link: '/features/operate'
          }
        },
        { 
          type: 'user', 
          text: 'Et "Automatiser" ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Automatiser, c\'est laisser le système faire le travail ! ⚡\n\nCalculs automatiques, mises à jour en temps réel, recettes qui se recalculent... Zéro erreur, zéro effort manuel.',
          delay: 11000,
          cta: {
            label: 'Découvrir Automatiser',
            link: '/features/automate'
          }
        },
        { 
          type: 'user', 
          text: 'Intéressant ! Et "Analyser" ?', 
          delay: 14500 
        },
        {
          type: 'cortex',
          text: 'Analyser, c\'est comprendre tes performances ! 📊\n\nFood cost, rentabilité par plat, écarts d\'inventaire... Tu transformes tes données en décisions éclairées.',
          delay: 16000,
          cta: {
            label: 'Découvrir Analyser',
            link: '/features/analyze'
          }
        },
        { 
          type: 'user', 
          text: 'Et le dernier, "Prédire" ?', 
          delay: 19500 
        },
        {
          type: 'cortex',
          text: 'Prédire, c\'est l\'avenir Sophie ! 🤖\n\nL\'intelligence artificielle qui anticipe tes besoins, détecte les anomalies, et te recommande les meilleures décisions. C\'est notre vision !',
          delay: 21000,
          cta: {
            label: 'Découvrir Prédire',
            link: '/features/predict'
          }
        }
      ]
    },
    {
      id: 1,
      userName: 'Marc',
      userAvatar: '/images/avatars/marc.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, j\'ai remarqué un écart de 12% sur les spiritueux ce mois-ci. C\'est anormal non ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Oui Marc, 12% c\'est effectivement anormal. J\'ai analysé tes données 🔍\n\n8 bouteilles de Whisky Premium manquantes (340 $), 5 bouteilles de Gin (125 $). L\'écart est concentré sur les vendredis et samedis soirs.',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Intéressant ! Et quelle était la valeur exacte de mon inventaire en janvier ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'En janvier : 45 230 $, soit +8% vs décembre (41 850 $) 📊\n\nTon ratio de rotation a augmenté de 2,3 à 2,8. Tes produits se vendent plus vite, c\'est excellent pour ta trésorerie !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et je peux voir l\'impact en temps réel quand je vends un plat ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Absolument ! Chaque vente met à jour ton inventaire théorique instantanément ✨\n\nPar exemple, tu viens de vendre 3 Burgers : -450g bœuf, -6 pains, -300g fromage. Ton stock théorique s\'ajuste automatiquement !',
          delay: 11000,
          cta: {
            label: 'Découvrir Inventaire',
            link: '/fonctionnalites/inventaire'
          }
        }
      ]
    },
    {
      id: 2,
      userName: 'Julie',
      userAvatar: '/images/avatars/julie.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, mon food cost a grimpé à 31% cette semaine. Qu\'est-ce qui a changé ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'J\'ai identifié le problème Julie ! Le bœuf AAA est passé de 18,50 $/kg à 19,75 $/kg (+6,8%) 📈\n\nÇa impacte 12 de tes recettes. Ton Burger Premium passe de 4,20 $ à 4,45 $ de coût. Avec ton prix actuel de 14 $, ta marge tombe de 70% à 68,2%.',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Ah ! Et quels plats sont les moins rentables maintenant ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Voici ton top 3 des plats à optimiser 🔍\n\n1. Bavette grillée : 35,2% (coût 8,80 $, vente 25 $)\n2. Tartare de bœuf : 33,8% (coût 6,75 $, vente 20 $)\n3. Burger Premium : 31,8% (coût 4,45 $, vente 14 $)',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et si j\'augmente le Burger à 14,50 $ ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Excellente idée ! Avec 14,50 $, ton food cost redescend à 30,7% sur le Burger 👨‍🍳\n\nTu retrouves une marge de 69,3%. Basé sur tes 180 ventes/semaine, ça représente +90 $ de profit hebdomadaire, soit +4 680 $/an !',
          delay: 11000,
          cta: {
            label: 'Découvrir Food Cost',
            link: '/fonctionnalites/food-cost'
          }
        }
      ]
    },
    {
      id: 3,
      userName: 'Vincent',
      userAvatar: '/images/avatars/vincent.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, j\'ai reçu 3 alertes cette semaine. C\'est normal ou j\'ai un problème ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'J\'ai analysé tes alertes Vincent 🔍\n\nFrigo #2 : 3 dépassements (2°C → 6°C). Problème récurrent les mardis matin. Ça coïncide avec les livraisons. La porte reste ouverte trop longtemps (12-15 min vs 5 min recommandé).',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Ah ! Et combien ça m\'a coûté en pertes ce mois-ci ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Grâce aux alertes, zéro perte ! Tu as réagi en moyenne en 18 minutes 📡\n\nSans le système, avec 3 incidents, tu aurais perdu environ 2 800 $ de produits (viandes, produits laitiers). Le ROI du système est déjà atteint !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et pour l\'inspection MAPAQ de jeudi prochain ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Tu es 100% prêt Vincent ! J\'ai 90 jours d\'historique complet 📋\n\n2 847 relevés de température, conformité à 99,8%. Les 3 alertes sont documentées avec tes actions correctives. J\'ai généré ton rapport pré-inspection !',
          delay: 11000,
          cta: {
            label: 'Découvrir Températures',
            link: '/fonctionnalites/temperatures'
          }
        }
      ]
    },
    {
      id: 4,
      userName: 'Marie',
      userAvatar: '/images/avatars/marie.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, j\'ai 3 employés dont les certifications MAPAQ expirent bientôt. Lesquels ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Voici les 3 employés Marie 📋\n\n• Thomas : Hygiène alimentaire expire le 15 mars (dans 12 jours)\n• Sarah : Manipulation sécuritaire expire le 22 mars (dans 19 jours)\n• Kevin : Allergènes expire le 8 avril (dans 35 jours)',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Merci ! Et combien d\'heures sup j\'ai payées ce mois-ci ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'En février : 127 heures sup pour tes 15 employés 💰\n\nCoût total : 3 245 $. C\'est +18% vs janvier (2 748 $). Les pics sont les vendredis et samedis. Julie a fait 32h sup à elle seule.',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Ah ! Et pour la convention collective, qui a droit aux congés fériés payés ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: '11 de tes 15 employés sont éligibles 📄\n\nThomas, Sarah, Julie et Marc (+ 7 autres) ont plus de 3 mois d\'ancienneté. Kevin, Lisa, Alex et Emma ne sont pas encore éligibles. Budget estimé pour Pâques : 1 840 $.',
          delay: 11000,
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
      userName: 'Sophie',
      userAvatar: '/images/avatars/lisa.avif',
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
      userName: 'Marc',
      userAvatar: '/images/avatars/marc.avif',
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
      userName: 'Julie',
      userAvatar: '/images/avatars/julie.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Hi! I use technical sheets for all my recipes, it\'s really practical!', 
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
      userName: 'Vincent',
      userAvatar: '/images/avatars/vincent.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Hey Cortex! Temperature sensors are really peace of mind!', 
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
