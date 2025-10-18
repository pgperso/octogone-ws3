// Types pour les CTA (Call-to-Action)
export type MessageCTA = {
  label: string;
  link: string;
};

// Types pour les graphiques inline
export type InlineChart = {
  type: 'line' | 'bar' | 'pie';
  title: string;
  data: Array<{ label: string; value: number; color?: string }>;
};

// Types pour les messages
export type ToolMessage = {
  type: 'user' | 'cortex';
  text: string;
  delay: number; // délai avant d'apparaître (en ms)
  cta?: MessageCTA; // Bouton CTA (optionnel)
  chart?: InlineChart; // Graphique inline (optionnel)
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
      userName: 'Alexandre',
      userAvatar: '/images/avatars/helene.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, je veux une vue d\'ensemble de mon restaurant. C\'est possible ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Absolument Alexandre ! Octogone 360 te donne une vision complète en temps réel 🎯\n\nVoici ton tableau de bord : ventes, inventaire, food cost, alertes... Tout au même endroit !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Génial ! Et je peux voir l\'évolution de mes ventes cette semaine ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Voici tes ventes des 7 derniers jours 📊\n\n💰 Total : 8 450 $\n📈 Moyenne/jour : 1 207 $\n🔥 Meilleur jour : Samedi (1 650 $)\n📉 Plus faible : Mardi (850 $)',
          delay: 6000,
          chart: {
            type: 'bar',
            title: 'Ventes quotidiennes - 7 derniers jours ($)',
            data: [
              { label: 'Lun', value: 950 },
              { label: 'Mar', value: 850 },
              { label: 'Mer', value: 1100 },
              { label: 'Jeu', value: 1200 },
              { label: 'Ven', value: 1400 },
              { label: 'Sam', value: 1650 },
              { label: 'Dim', value: 1300 }
            ]
          }
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et mon food cost, il est où ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Ton food cost est à 28,5% cette semaine 👨‍🍳\n\n🎯 Objectif : 30% → Tu es en avance !\n📊 Évolution : -1,2% vs semaine dernière\n💡 Tes 3 plats les plus rentables : Carpaccio (78%), Salade César (72%), Burger (69%)',
          delay: 11000,
          chart: {
            type: 'pie',
            title: 'Répartition des coûts (%)',
            data: [
              { label: 'Nourriture', value: 28.5, color: '#E2CDED' },
              { label: 'Main d\'œuvre', value: 32, color: '#BADFF6' },
              { label: 'Autres', value: 39.5, color: '#DCB26B' }
            ]
          }
        },
        { 
          type: 'user', 
          text: 'Excellent ! Et les alertes, j\'en ai combien en ce moment ?', 
          delay: 14500 
        },
        {
          type: 'cortex',
          text: 'Tu as 2 alertes actives Alexandre 🔔\n\n⚠️ Stock faible : Bœuf AAA (3 kg restants)\n⚠️ Température : Frigo #2 à 5°C (seuil : 4°C)\n\n✅ Tout le reste est sous contrôle !',
          delay: 16000
        },
        { 
          type: 'user', 
          text: 'Merci Cortex ! Où je peux voir tout ça en détail ?', 
          delay: 19000 
        },
        {
          type: 'cortex',
          text: 'Tout est dans Octogone 360 ! 🎯\n\nTon tableau de bord centralisé avec toutes tes métriques en temps réel. Ventes, stocks, food cost, alertes, performances... Une seule page pour tout piloter !',
          delay: 20500,
          cta: {
            label: 'Découvrir Octogone 360',
            link: '/octogone360'
          }
        }
      ]
    },
    {
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
      userName: 'Marie',
      userAvatar: '/images/avatars/marie.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, combien de pourboires on a reçus cette semaine et comment je les répartis ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Cette semaine : 4 285 $ de pourboires Marie 💰\n\nSelon ta convention (70% service, 30% cuisine) :\n• Service (8 employés) : 2 999,50 $ → 375 $/personne\n• Cuisine (4 employés) : 1 285,50 $ → 321 $/personne',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et je peux voir l\'historique des pourboires par employé ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Bien sûr ! Voici le top 3 de février 📊\n\n1. Julie (serveuse) : 1 840 $ sur 4 semaines\n2. Thomas (serveur) : 1 625 $\n3. Sarah (serveuse) : 1 580 $\n\nTout est tracé automatiquement dans leurs fiches !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Génial ! Et pour les fiches employés, tout est centralisé ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Oui ! Tes 15 fiches sont complètes 👥\n\nInfos perso, contrats, horaires, historique des pourboires, documents... Tout au même endroit. Plus besoin de chercher dans des fichiers Excel !',
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
          text: 'Hi Cortex! I\'m Sophie, I\'m discovering Octogone. How does it work?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Hi Sophie! Welcome 👋\n\nOctogone is a complete platform to manage your restaurant. Everything is built around 4 pillars: Operate, Automate, Analyze and Predict!',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'What exactly is "Operate"?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Operate is managing your daily operations Sophie! 📦\n\nTeam inventory, real-time stock tracking, product management... Everything related to executing your day-to-day operations.',
          delay: 6000,
          cta: {
            label: 'Discover Operate',
            link: '/features/operate'
          }
        },
        { 
          type: 'user', 
          text: 'And "Automate"?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Automate is letting the system do the work! ⚡\n\nAutomatic calculations, real-time updates, recipes that recalculate... Zero errors, zero manual effort.',
          delay: 11000,
          cta: {
            label: 'Discover Automate',
            link: '/features/automate'
          }
        },
        { 
          type: 'user', 
          text: 'Interesting! And "Analyze"?', 
          delay: 14500 
        },
        {
          type: 'cortex',
          text: 'Analyze is understanding your performance! 📊\n\nFood cost, profitability per dish, inventory variances... You transform your data into informed decisions.',
          delay: 16000,
          cta: {
            label: 'Discover Analyze',
            link: '/features/analyze'
          }
        },
        { 
          type: 'user', 
          text: 'And the last one, "Predict"?', 
          delay: 19500 
        },
        {
          type: 'cortex',
          text: 'Predict is the future Sophie! 🤖\n\nArtificial intelligence that anticipates your needs, detects anomalies, and recommends the best decisions. That\'s our vision!',
          delay: 21000,
          cta: {
            label: 'Discover Predict',
            link: '/features/predict'
          }
        }
      ]
    },
    {
      id: 1,
      userName: 'Alexandre',
      userAvatar: '/images/avatars/helene.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, I want an overview of my restaurant. Is that possible?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Absolutely Alexandre! Octogone 360 gives you a complete real-time view 🎯\n\nHere\'s your dashboard: sales, inventory, food cost, alerts... Everything in one place!',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Great! Can I see my sales evolution this week?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Here are your sales for the last 7 days 📊\n\n💰 Total: $8,450\n📈 Daily avg: $1,207\n🔥 Best day: Saturday ($1,650)\n📉 Lowest: Tuesday ($850)',
          delay: 6000,
          chart: {
            type: 'bar',
            title: 'Daily Sales - Last 7 Days ($)',
            data: [
              { label: 'Mon', value: 950 },
              { label: 'Tue', value: 850 },
              { label: 'Wed', value: 1100 },
              { label: 'Thu', value: 1200 },
              { label: 'Fri', value: 1400 },
              { label: 'Sat', value: 1650 },
              { label: 'Sun', value: 1300 }
            ]
          }
        },
        { 
          type: 'user', 
          text: 'Perfect! And where\'s my food cost?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Your food cost is 28.5% this week 👨‍🍳\n\n🎯 Target: 30% → You\'re ahead!\n📊 Evolution: -1.2% vs last week\n💡 Your 3 most profitable dishes: Carpaccio (78%), Caesar Salad (72%), Burger (69%)',
          delay: 11000,
          chart: {
            type: 'pie',
            title: 'Cost Breakdown (%)',
            data: [
              { label: 'Food', value: 28.5, color: '#E2CDED' },
              { label: 'Labor', value: 32, color: '#BADFF6' },
              { label: 'Other', value: 39.5, color: '#DCB26B' }
            ]
          }
        },
        { 
          type: 'user', 
          text: 'Excellent! And how many alerts do I have right now?', 
          delay: 14500 
        },
        {
          type: 'cortex',
          text: 'You have 2 active alerts Alexandre 🔔\n\n⚠️ Low stock: AAA Beef (3 kg remaining)\n⚠️ Temperature: Fridge #2 at 5°C (threshold: 4°C)\n\n✅ Everything else is under control!',
          delay: 16000
        },
        { 
          type: 'user', 
          text: 'Thanks Cortex! Where can I see all this in detail?', 
          delay: 19000 
        },
        {
          type: 'cortex',
          text: 'Everything is in Octogone 360! 🎯\n\nYour centralized dashboard with all your real-time metrics. Sales, inventory, food cost, alerts, performance... One page to manage everything!',
          delay: 20500,
          cta: {
            label: 'Discover Octogone 360',
            link: '/octogone360'
          }
        }
      ]
    },
    {
      id: 2,
      userName: 'Marc',
      userAvatar: '/images/avatars/marc.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, I noticed a 12% variance on spirits this month. Is that abnormal?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Yes Marc, 12% is definitely abnormal. I analyzed your data 🔍\n\n8 bottles of Premium Whisky missing ($340), 5 bottles of Gin ($125). The variance is concentrated on Friday and Saturday nights.',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Interesting! And what was the exact value of my inventory in January?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'In January: $45,230, up 8% vs December ($41,850) 📊\n\nYour turnover ratio increased from 2.3 to 2.8. Your products are selling faster, excellent for your cash flow!',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Perfect! And can I see the real-time impact when I sell a dish?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Absolutely! Every sale updates your theoretical inventory instantly ✨\n\nFor example, you just sold 3 Burgers: -450g beef, -6 buns, -300g cheese. Your theoretical stock adjusts automatically!',
          delay: 11000,
          cta: {
            label: 'Discover Inventory',
            link: '/fonctionnalites/inventaire'
          }
        }
      ]
    },
    {
      id: 3,
      userName: 'Julie',
      userAvatar: '/images/avatars/julie.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, my food cost jumped to 31% this week. What changed?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'I identified the problem Julie! AAA beef went from $18.50/kg to $19.75/kg (+6.8%) 📈\n\nThis impacts 12 of your recipes. Your Premium Burger goes from $4.20 to $4.45 cost. With your current $14 price, your margin drops from 70% to 68.2%.',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Ah! And which dishes are the least profitable now?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Here\'s your top 3 dishes to optimize 🔍\n\n1. Grilled Bavette: 35.2% (cost $8.80, sell $25)\n2. Beef Tartare: 33.8% (cost $6.75, sell $20)\n3. Premium Burger: 31.8% (cost $4.45, sell $14)',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Perfect! What if I increase the Burger to $14.50?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Excellent idea! At $14.50, your food cost drops to 30.7% on the Burger 👨‍🍳\n\nYou get back to 69.3% margin. Based on your 180 sales/week, that\'s +$90 weekly profit, or +$4,680/year!',
          delay: 11000,
          cta: {
            label: 'Discover Food Cost',
            link: '/fonctionnalites/food-cost'
          }
        }
      ]
    },
    {
      id: 4,
      userName: 'Vincent',
      userAvatar: '/images/avatars/vincent.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, I received 3 alerts this week. Is that normal or do I have a problem?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'I analyzed your alerts Vincent 🔍\n\nFridge #2: 3 exceedances (2°C → 6°C). Recurring problem on Tuesday mornings. It coincides with deliveries. The door stays open too long (12-15 min vs 5 min recommended).',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Ah! And how much did it cost me in losses this month?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Thanks to the alerts, zero loss! You reacted in an average of 18 minutes 📡\n\nWithout the system, with 3 incidents, you would have lost about $2,800 in products (meats, dairy). The ROI of the system is already achieved!',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Perfect! And for the health inspection next Thursday?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'You\'re 100% ready Vincent! I have 90 days of complete history 📋\n\n2,847 temperature readings, 99.8% compliance. The 3 alerts are documented with your corrective actions. I generated your pre-inspection report!',
          delay: 11000,
          cta: {
            label: 'Discover Temperatures',
            link: '/fonctionnalites/temperatures'
          }
        }
      ]
    },
    {
      id: 5,
      userName: 'Marie',
      userAvatar: '/images/avatars/marie.avif',
      messages: [
        { 
          type: 'user', 
          text: 'Cortex, how much tips did we receive this week and how do I distribute them?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'This week: $4,285 in tips Marie 💰\n\nAccording to your agreement (70% service, 30% kitchen):\n• Service (8 employees): $2,999.50 → $375/person\n• Kitchen (4 employees): $1,285.50 → $321/person',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Perfect! And can I see the tip history per employee?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Of course! Here\'s the top 3 for February 📊\n\n1. Julie (server): $1,840 over 4 weeks\n2. Thomas (server): $1,625\n3. Sarah (server): $1,580\n\nEverything is automatically tracked in their files!',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Great! And for employee files, everything is centralized?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Yes! Your 15 files are complete 👥\n\nPersonal info, contracts, schedules, tip history, documents... All in one place. No more searching through Excel files!',
          delay: 11000,
          cta: {
            label: 'Discover HR',
            link: '/fonctionnalites/ressources-humaines'
          }
        }
      ]
    }
  ]
};
