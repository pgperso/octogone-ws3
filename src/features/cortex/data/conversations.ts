// Types pour les documents générés
export type GeneratedDocument = {
  id: string; // Ex: "BC-2024-1234"
  type: 'purchase_order' | 'production_order' | 'report' | 'chart'; // Type de document
  name: string; // Nom affiché
  icon?: string; // Format du fichier: 'pdf', 'excel', 'csv', 'image', 'chart', etc.
};

// Types pour les graphiques inline
export type InlineChart = {
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
};

// Types pour les messages
export type Message = {
  type: 'user' | 'cortex';
  text: string;
  delay: number; // délai avant d'apparaître (en ms)
  document?: GeneratedDocument; // Document généré (optionnel)
  removeDocument?: string; // ID du document à retirer (optionnel)
  chart?: InlineChart; // Graphique inline (optionnel)
};

export type Conversation = {
  id: number;
  messages: Message[];
};

// Configuration des conversations par langue
export const conversations: Record<string, Conversation[]> = {
  fr: [
    {
      id: 0,
      messages: [
        { type: 'user', text: 'Cortex, montre-moi l\'évolution de mes ventes ce mois', delay: 0 },
        {
          type: 'cortex',
          text: 'Voici l\'évolution de vos ventes pour novembre :\n\n📈 Tendance générale : +12% vs octobre\n💰 CA actuel : 28 450 $ (15 premiers jours)\n🎯 Objectif mensuel : 35 000 $ (81% atteint)\n\n📊 Ventes quotidiennes :\n• Pics week-end : 2 650 $ (sam 9) et 2 450 $ (dim 3)\n• Moyenne semaine : ~1 900 $ par jour\n• Plus faible : 1 450 $ (dim 7)',
          delay: 1500,
          chart: {
            type: 'line',
            title: 'Ventes quotidiennes - 1-15 novembre 2024 ($)',
            data: [
              { name: '1', value: 1850 },
              { name: '2', value: 2100 },
              { name: '3', value: 2450 },
              { name: '4', value: 1680 },
              { name: '5', value: 1900 },
              { name: '6', value: 1590 },
              { name: '7', value: 1450 },
              { name: '8', value: 2200 },
              { name: '9', value: 2650 },
              { name: '10', value: 2380 },
              { name: '11', value: 1800 },
              { name: '12', value: 2050 },
              { name: '13', value: 1700 },
              { name: '14', value: 1600 },
              { name: '15', value: 2040 }
            ]
          }
        },
        { type: 'user', text: 'Excellent ! Et mes plats les plus rentables ?', delay: 8500 },
        {
          type: 'cortex',
          text: '💰 Voici vos plats les plus rentables :\n\n🥇 Le Carpaccio de bœuf domine avec 78% de marge\n📊 Excellent équilibre entre vos entrées et plats principaux',
          delay: 10000,
          chart: {
            type: 'bar',
            title: 'Top 8 - Rentabilité par plat (%)',
            data: [
              { name: 'Carpaccio de bœuf', value: 78, color: '#10B981' },
              { name: 'Salade César', value: 72, color: '#3B82F6' },
              { name: 'Risotto champignons', value: 68, color: '#8B5CF6' },
              { name: 'Soupe à l\'oignon', value: 65, color: '#F59E0B' },
              { name: 'Tartare de saumon', value: 62, color: '#EF4444' },
              { name: 'Pâtes carbonara', value: 58, color: '#06B6D4' },
              { name: 'Burger signature', value: 55, color: '#84CC16' },
              { name: 'Côte de bœuf', value: 45, color: '#F97316' }
            ]
          }
        },
        { type: 'user', text: 'Parfait ! Ces données m\'aident beaucoup', delay: 14500 },
        { type: 'cortex', text: 'Avec plaisir Vincent ! 😊 Les graphiques sont mis à jour en temps réel. Je peux créer d\'autres analyses quand vous voulez.', delay: 15500 }
      ]
    },
    {
      id: 1,
      messages: [
        { type: 'user', text: 'Je cherche à ajouter de la bergamote à mes produits', delay: 0 },
        { type: 'cortex', text: 'Excellent choix Vincent ! 🍋\n\nDans le catalogue Octogone, j’ai une option pertinente :\n\n🍋 Bergamote fraîche (agrumes aromatiques)\n• Format courant : 500 g\n• Prix indicatif : ~45 $ / unité\n\nVoulez-vous que je l’ajoute à votre liste de produits ?', delay: 1500 },
        { type: 'user', text: 'Oui, ajoute-la !', delay: 6000 },
        {
          type: 'cortex',
          text: '✅ Produit ajouté\n\n📋 FP-BERGAMOT-001\n🍋 Bergamote fraîche\n\nLe produit est maintenant disponible dans votre inventaire et utilisable dans vos recettes.\n\nJe vous génère le lien vers la fiche produit.',
          delay: 7200,
          document: {
            id: 'FP-BERGAMOT-001',
            type: 'report',
            name: 'Fiche produit FP-BERGAMOT-001',
            icon: 'pdf'
          }
        },
        { type: 'user', text: 'Parfait, merci Cortex !', delay: 11500 },
        { type: 'cortex', text: 'Avec plaisir Vincent 😊 La bergamote donnera une touche signature.', delay: 12200 }
      ]
    },
    {
      id: 2,
      messages: [
        { type: 'user', text: 'Cortex, comment vont mes ventes cette semaine ?', delay: 0 },
        { 
          type: 'cortex', 
          text: 'Très bonne tendance, Vincent 👏\n\nChiffre d\'affaires : 7 000 $ • 230 commandes\nMoyenne/jour : 1 000 $\nAvancement : 25% de l\'objectif mensuel\n\n📊 Détail par jour :\n• Pic vendredi : 1 400 $\n• Plus faible mardi : 800 $', 
          delay: 1500,
          chart: {
            type: 'bar',
            title: 'Ventes de la semaine ($)',
            data: [
              { name: 'Lun', value: 950, color: '#3B82F6' },
              { name: 'Mar', value: 800, color: '#EF4444' },
              { name: 'Mer', value: 1100, color: '#10B981' },
              { name: 'Jeu', value: 1200, color: '#F59E0B' },
              { name: 'Ven', value: 1400, color: '#8B5CF6' },
              { name: 'Sam', value: 1300, color: '#06B6D4' },
              { name: 'Dim', value: 1250, color: '#84CC16' }
            ]
          }
        },
        { type: 'user', text: 'Quels sont mes meilleurs vendeurs ?', delay: 5000 },
        { 
          type: 'cortex', 
          text: 'Top 5 de la semaine :\n\n🥇 Carpaccio de bœuf : 32% des ventes\n🥈 Escargots à l\'ail : 18% des ventes\n🥉 Salade César : 15% des ventes\n\n📊 Le Carpaccio domine clairement vos ventes !', 
          delay: 6200,
          chart: {
            type: 'pie',
            title: 'Répartition des ventes par plat (%)',
            data: [
              { name: 'Carpaccio de bœuf', value: 32, color: '#10B981' },
              { name: 'Escargots à l\'ail', value: 18, color: '#3B82F6' },
              { name: 'Salade César', value: 15, color: '#F59E0B' },
              { name: 'Burger signature', value: 12, color: '#8B5CF6' },
              { name: 'Risotto champignons', value: 10, color: '#EF4444' },
              { name: 'Autres plats', value: 13, color: '#6B7280' }
            ]
          }
        },
        { type: 'user', text: 'Parfait, merci Cortex !', delay: 10500 },
        { type: 'cortex', text: 'Avec plaisir 😄 On continue sur cette lancée.', delay: 11200 }
      ]
    },
    {
      id: 3,
      messages: [
        { type: 'user', text: 'Montre-moi mes recettes avec du bœuf', delay: 0 },
        { type: 'cortex', text: '8 recettes trouvées 🥩\n\n**Plats principaux :**\n• Bavette à l’échalote\n• Tartare de bœuf\n• Burger signature\n• Bœuf bourguignon\n\n**Entrées :**\n• Carpaccio de bœuf ⭐\n• Salade de bœuf thaï\n• Tacos de bœuf\n• Pho au bœuf', delay: 1200 },
        { type: 'user', text: 'Quel est le food cost du Carpaccio ?', delay: 5500 },
        { type: 'cortex', text: 'Carpaccio de bœuf 🧾\n\n💰 Prix vente : ~18,50 $\n📈 Food cost autour de 25 %\n💵 Marge cible ~75 %\n\nValeurs affinées selon vos derniers prix d’achats.', delay: 6500 },
        { type: 'user', text: 'Excellent, merci !', delay: 11000 },
        { type: 'cortex', text: 'Avec plaisir 😎 C’est un pilier de votre menu.', delay: 11600 }
      ]
    },
    {
      id: 4,
      messages: [
        { type: 'user', text: 'J’ai assez de bœuf pour le week-end ?', delay: 0 },
        { type: 'cortex', text: '🔔 Stock à surveiller\n\nLa demande prévue est élevée sur les plats au bœuf.\n➡️ Risque de rupture samedi soir\n\n💡 Recommandation : commande d’appoint ~18 kg avant vendredi midi.', delay: 1000 },
        { type: 'user', text: 'Génère deux bons : un pour la bavette et un pour les légumes', delay: 5200 },
        {
          type: 'cortex',
          text: '✅ Bon de commande créé\n\n📋 BC-2024-1234\n🥩 Bavette AAA : 18 kg\n💰 Estimé : ~340 $\n\nPrêt à être envoyé.',
          delay: 6400,
          document: {
            id: 'BC-2024-1234',
            type: 'purchase_order',
            name: 'Bon de commande BC-2024-1234',
            icon: 'pdf'
          }
        },
        {
          type: 'cortex',
          text: '✅ Bon de commande créé\n\n📋 BC-2024-1235\n🥬 Légumes frais (roquette, oignons, carottes)\n💰 Estimé : <100 $\n\nPrêt à être envoyé.',
          delay: 7600,
          document: {
            id: 'BC-2024-1235',
            type: 'purchase_order',
            name: 'Bon de commande BC-2024-1235',
            icon: 'pdf'
          }
        },
        { type: 'user', text: 'Finalement, annule le bon des légumes', delay: 12000 },
        {
          type: 'cortex',
          text: '✅ Bon BC-2024-1235 annulé\n\nLe bon de légumes a été retiré. Seul le bon de bavette reste actif.',
          delay: 13200,
          removeDocument: 'BC-2024-1235'
        },
        { type: 'user', text: 'Parfait, merci Cortex !', delay: 17500 },
        { type: 'cortex', text: 'Avec plaisir 😉 Le bon de bavette est prêt à envoyer.', delay: 18200 }
      ]
    },
    {
      id: 5,
      messages: [
        { type: 'user', text: 'Demain on fait 12 L de bolognaise et 8 kg de pâte à pizza', delay: 0 },
        { type: 'cortex', text: 'Noté 👌\n\nProduction prévue :\n🍝 Bolognaise 12 L\n🍕 Pâte à pizza 8 kg\n\nJe peux créer un bon de production.', delay: 1500 },
        { type: 'user', text: 'Oui, génère-le', delay: 5500 },
        {
          type: 'cortex',
          text: '✅ Bon de production créé\n\n📋 BP-2024-0856\n📅 Préparation : aujourd’hui\n\nIngrédients principaux listés et quantités ajustées automatiquement selon vos gabarits.\n\nTout est prêt pour la cuisine.',
          delay: 6700,
          document: {
            id: 'BP-2024-0856',
            type: 'production_order',
            name: 'Bon de production BP-2024-0856',
            icon: 'excel'
          }
        },
        { type: 'user', text: 'Parfait, envoie-le !', delay: 11500 },
        { type: 'cortex', text: '✅ Envoyé en cuisine. Production planifiée 👨‍🍳', delay: 12200 }
      ]
    },
    {
      id: 6,
      messages: [
        { type: 'user', text: 'Cortex, tout est correct avec les températures ?', delay: 0 },
        { type: 'cortex', text: 'Contrôles en cours… 🌡️\n\n✅ Toutes les zones sont conformes\n🥗 Vitrine salades : proche de la limite, à recontrôler plus tard\n\nDernier relevé récent.', delay: 1400 },
        { type: 'user', text: 'Génère le rapport pour l’inspection', delay: 6000 },
        {
          type: 'cortex',
          text: '✅ Rapport généré\n\n📋 RT-2024-1013\n📅 Période : 7 derniers jours\n🌡️ Relevés automatiques consolidés\n✅ Conformité élevée\n⚠️ 1 alerte mineure documentée\n\nPrêt à télécharger (PDF).',
          delay: 7300,
          document: {
            id: 'RT-2024-1013',
            type: 'report',
            name: 'Rapport de température RT-2024-1013',
            icon: 'pdf'
          }
        },
        { type: 'user', text: 'Impeccable, merci Cortex', delay: 12000 },
        { type: 'cortex', text: 'Avec plaisir 😌 Je continue la surveillance 24/7.', delay: 12700 }
      ]
    }
  ],
  en: [
    {
      id: 0,
      messages: [
        { type: 'user', text: 'Cortex, show me my sales evolution this month', delay: 0 },
        {
          type: 'cortex',
          text: 'Here\'s your sales evolution for November:\n\n📈 Overall trend: +12% vs October\n💰 Current revenue: $28,450 (first 15 days)\n🎯 Monthly target: $35,000 (81% achieved)\n\n📊 Daily sales breakdown:\n• Weekend peaks: $2,650 (Sat 9) and $2,450 (Sun 3)\n• Weekday average: ~$1,900 per day\n• Lowest day: $1,450 (Sun 7)',
          delay: 4000,
          chart: {
            type: 'line',
            title: 'Daily Sales - November 1-15, 2024 ($)',
            data: [
              { name: '1', value: 1850 },
              { name: '2', value: 2100 },
              { name: '3', value: 2450 },
              { name: '4', value: 1680 },
              { name: '5', value: 1900 },
              { name: '6', value: 1590 },
              { name: '7', value: 1450 },
              { name: '8', value: 2200 },
              { name: '9', value: 2650 },
              { name: '10', value: 2380 },
              { name: '11', value: 1800 },
              { name: '12', value: 2050 },
              { name: '13', value: 1700 },
              { name: '14', value: 1600 },
              { name: '15', value: 2040 }
            ]
          }
        },
        { type: 'user', text: 'Excellent! What about my most profitable dishes?', delay: 8500 },
        {
          type: 'cortex',
          text: '💰 Here are your most profitable dishes:\n\n🥇 Beef Carpaccio dominates with 78% margin\n📊 Great balance between appetizers and main courses',
          delay: 10000,
          chart: {
            type: 'bar',
            title: 'Top 8 - Dish Profitability (%)',
            data: [
              { name: 'Beef Carpaccio', value: 78, color: '#10B981' },
              { name: 'Caesar Salad', value: 72, color: '#3B82F6' },
              { name: 'Mushroom Risotto', value: 68, color: '#8B5CF6' },
              { name: 'French Onion Soup', value: 65, color: '#F59E0B' },
              { name: 'Salmon Tartare', value: 62, color: '#EF4444' },
              { name: 'Carbonara Pasta', value: 58, color: '#06B6D4' },
              { name: 'Signature Burger', value: 55, color: '#84CC16' },
              { name: 'Beef Ribeye', value: 45, color: '#F97316' }
            ]
          }
        },
        { type: 'user', text: 'Perfect! This data really helps me', delay: 14500 },
        { type: 'cortex', text: 'My pleasure Vincent! 😊 Charts update in real-time. I can create more analyses whenever you need.', delay: 15500 }
      ]
    },
    {
      id: 1,
      messages: [
        { type: 'user', text: 'I’m looking to add bergamot to my products', delay: 0 },
        { type: 'cortex', text: 'Great pick, Vincent! 🍋\n\nFrom the Octogone catalog I have a relevant option:\n\n🍋 Fresh bergamot (aromatic citrus)\n• Common format: 500 g\n• Indicative price: ~$45 / unit\n\nWant me to add it to your product list?', delay: 1500 },
        { type: 'user', text: 'Yes, add it!', delay: 6000 },
        {
          type: 'cortex',
          text: '✅ Product added\n\n📋 FP-BERGAMOT-001\n🍋 Fresh bergamot\n\nIt’s now available in your inventory and ready to use in recipes.\n\nGenerating the product sheet link.',
          delay: 7200,
          document: {
            id: 'FP-BERGAMOT-001',
            type: 'report',
            name: 'Product Sheet FP-BERGAMOT-001',
            icon: 'pdf'
          }
        },
        { type: 'user', text: 'Perfect, thanks Cortex!', delay: 11500 },
        { type: 'cortex', text: 'My pleasure 😊 It will add a signature note to your dishes.', delay: 12200 }
      ]
    },
    {
      id: 2,
      messages: [
        { type: 'user', text: 'Cortex, how are my sales this week?', delay: 0 },
        { 
          type: 'cortex', 
          text: 'Looking strong, Vincent 💪\n\nRevenue: $7,000 • 230 orders\nDaily avg: $1,000\n25% toward monthly goal\n\n📊 Daily breakdown:\n• Friday peak: $1,400\n• Lowest Tuesday: $800', 
          delay: 1500,
          chart: {
            type: 'bar',
            title: 'Weekly Sales ($)',
            data: [
              { name: 'Mon', value: 950, color: '#3B82F6' },
              { name: 'Tue', value: 800, color: '#EF4444' },
              { name: 'Wed', value: 1100, color: '#10B981' },
              { name: 'Thu', value: 1200, color: '#F59E0B' },
              { name: 'Fri', value: 1400, color: '#8B5CF6' },
              { name: 'Sat', value: 1300, color: '#06B6D4' },
              { name: 'Sun', value: 1250, color: '#84CC16' }
            ]
          }
        },
        { type: 'user', text: 'What are my best sellers?', delay: 5000 },
        { 
          type: 'cortex', 
          text: 'This week’s top 5:\n\n🥇 Beef Carpaccio: 32% of sales\n🥈 Garlic Escargots: 18% of sales\n🥉 Caesar Salad: 15% of sales\n\n📊 Carpaccio clearly dominates your sales!', 
          delay: 6200,
          chart: {
            type: 'pie',
            title: 'Sales Distribution by Dish (%)',
            data: [
              { name: 'Beef Carpaccio', value: 32, color: '#10B981' },
              { name: 'Garlic Escargots', value: 18, color: '#3B82F6' },
              { name: 'Caesar Salad', value: 15, color: '#F59E0B' },
              { name: 'Signature Burger', value: 12, color: '#8B5CF6' },
              { name: 'Mushroom Risotto', value: 10, color: '#EF4444' },
              { name: 'Other dishes', value: 13, color: '#6B7280' }
            ]
          }
        },
        { type: 'user', text: 'Perfect, thanks Cortex!', delay: 10500 },
        { type: 'cortex', text: 'Anytime 😄 Let’s keep it rolling.', delay: 11200 }
      ]
    },
    {
      id: 3,
      messages: [
        { type: 'user', text: 'Show me my recipes with beef', delay: 0 },
        { type: 'cortex', text: 'Found 8 recipes 🥩\n\n**Mains:**\n• Bavette with shallots\n• Beef tartare\n• Signature burger\n• Beef bourguignon\n\n**Starters:**\n• Beef carpaccio ⭐\n• Thai beef salad\n• Beef tacos\n• Beef pho', delay: 1200 },
        { type: 'user', text: 'What’s the food cost of the Carpaccio?', delay: 5500 },
        { type: 'cortex', text: 'Beef Carpaccio 🧾\n\n💰 Sale price ~$18.50\n📈 Food cost around 25%\n💵 Margin target ~75%\n\nNumbers refine as your purchase prices update.', delay: 6500 },
        { type: 'user', text: 'Excellent, thanks!', delay: 11000 },
        { type: 'cortex', text: 'Glad to help 😎 It’s a menu cornerstone.', delay: 11600 }
      ]
    },
    {
      id: 4,
      messages: [
        { type: 'user', text: 'Do I have enough beef for the weekend?', delay: 0 },
        { type: 'cortex', text: '⚠️ Inventory to watch\n\nDemand for beef dishes is trending high.\n➡️ Risk of shortage by Saturday night\n\n💡 Suggest ordering ~18 kg before Friday noon.', delay: 1000 },
        { type: 'user', text: 'Generate two orders: one for beef and one for vegetables', delay: 5200 },
        {
          type: 'cortex',
          text: '✅ Purchase order created\n\n📋 PO-2024-1234\n🥩 AAA Bavette: 18 kg\n💰 Estimated: ~$340\n\nReady to send.',
          delay: 6400,
          document: {
            id: 'PO-2024-1234',
            type: 'purchase_order',
            name: 'Purchase Order PO-2024-1234',
            icon: 'pdf'
          }
        },
        {
          type: 'cortex',
          text: '✅ Purchase order created\n\n📋 PO-2024-1235\n🥬 Fresh vegetables (arugula, onions, carrots)\n💰 Estimated: < $100\n\nReady to send.',
          delay: 7600,
          document: {
            id: 'PO-2024-1235',
            type: 'purchase_order',
            name: 'Purchase Order PO-2024-1235',
            icon: 'pdf'
          }
        },
        { type: 'user', text: 'Actually, cancel the vegetables order', delay: 12000 },
        {
          type: 'cortex',
          text: '✅ Order PO-2024-1235 canceled\n\nOnly the beef order remains active.',
          delay: 13200,
          removeDocument: 'PO-2024-1235'
        },
        { type: 'user', text: 'Perfect, thanks Cortex!', delay: 17500 },
        { type: 'cortex', text: 'You’re welcome 😉 The beef order is ready to send.', delay: 18200 }
      ]
    },
    {
      id: 5,
      messages: [
        { type: 'user', text: 'Tomorrow we’re making 12 L of bolognese and 8 kg of pizza dough', delay: 0 },
        { type: 'cortex', text: 'Noted 👌\n\nPlanned production:\n🍝 Bolognese 12 L\n🍕 Pizza dough 8 kg\n\nI can create a production order.', delay: 1500 },
        { type: 'user', text: 'Yes, generate it', delay: 5500 },
        {
          type: 'cortex',
          text: '✅ Production order created\n\n📋 WO-2024-0856\n📅 Prep: Today\n\nMain ingredients listed. Quantities auto-adjusted from your templates.\n\nOrder ready for the kitchen.',
          delay: 6700,
          document: {
            id: 'WO-2024-0856',
            type: 'production_order',
            name: 'Production Order WO-2024-0856',
            icon: 'excel'
          }
        },
        { type: 'user', text: 'Perfect, send it!', delay: 11500 },
        { type: 'cortex', text: '✅ Sent to kitchen. Production scheduled 👨‍🍳', delay: 12200 }
      ]
    },
    {
      id: 6,
      messages: [
        { type: 'user', text: 'Cortex, are all temperatures OK?', delay: 0 },
        { type: 'cortex', text: 'Running checks… 🌡️\n\n✅ All zones compliant\n🥗 Salad display: near limit — recheck later\n\nRecent reading confirmed.', delay: 1400 },
        { type: 'user', text: 'Generate inspection report', delay: 6000 },
        {
          type: 'cortex',
          text: '✅ Temperature report ready\n\n📋 TR-2024-1013\n📅 Period: last 7 days\n🌡️ Automatic readings consolidated\n✅ High compliance\n⚠️ 1 minor alert documented\n\nReady to download (PDF).',
          delay: 7300,
          document: {
            id: 'TR-2024-1013',
            type: 'report',
            name: 'Temperature Report TR-2024-1013',
            icon: 'pdf'
          }
        },
        { type: 'user', text: 'Perfect, thanks Cortex', delay: 12000 },
        { type: 'cortex', text: 'My pleasure 😌 Monitoring continues 24/7.', delay: 12700 }
      ]
    }
  ]
};

// Configuration des timings
export const TIMING = {
  conversationPause: 3000, // Pause entre les conversations (3s)
  messageDisplay: 4000, // Temps d'affichage d'un message complet (4s)
};
