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
  expandChat?: boolean; // Déclenche l'expansion du chat (optionnel)
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
      userName: 'Alexandre',
      userAvatar: '/images/avatars/helene.avif',
      messages: [
        {
          type: 'cortex',
          text: 'Bonjour Alexandre ! 👋',
          delay: 2000
        },
        { 
          type: 'user', 
          text: 'Salut Cortex !', 
          delay: 5000 
        },
        {
          type: 'cortex',
          text: 'Comment vas-tu aujourd\'hui ? Ton restaurant tourne bien ?',
          delay: 7500
        },
        { 
          type: 'user', 
          text: 'Oui ! Je veux une vue d\'ensemble de mon resto.', 
          delay: 12000,
          expandChat: true
        },
        {
          type: 'cortex',
          text: 'Absolument ! Octogone 360 te donne une vision complète en temps réel 🎯\n\nVoici ton tableau de bord : ventes, inventaire, food cost, alertes... Tout au même endroit !',
          delay: 17500
        },
        { 
          type: 'user', 
          text: 'Génial ! Et je peux voir l\'évolution de mes ventes cette semaine ?', 
          delay: 23000 
        },
        {
          type: 'cortex',
          text: 'Voici tes ventes des 7 derniers jours 📊\n\n💰 Total : 8 450 $\n📈 Moyenne/jour : 1 207 $\n🔥 Meilleur jour : Samedi (1 650 $)\n📉 Plus faible : Mardi (850 $)',
          delay: 25500,
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
          delay: 33000 
        },
        {
          type: 'cortex',
          text: 'Ton food cost est à 28,5% cette semaine 👨‍🍳\n\n🎯 Objectif : 30% → Tu es en avance !\n📊 Évolution : -1,2% vs semaine dernière\n💡 Tes 3 plats les plus rentables : Carpaccio (78%), Salade César (72%), Burger (69%)',
          delay: 35500,
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
          delay: 43000 
        },
        {
          type: 'cortex',
          text: 'Tu as 2 alertes actives Alexandre 🔔\n\n⚠️ Stock faible : Bœuf AAA (3 kg restants)\n⚠️ Température : Frigo #2 à 5°C (seuil : 4°C)\n\n✅ Tout le reste est sous contrôle !',
          delay: 45500
        },
        { 
          type: 'user', 
          text: 'Merci Cortex ! Où je peux voir tout ça en détail ?', 
          delay: 50500 
        },
        {
          type: 'cortex',
          text: 'Tout est dans Octogone 360 ! 🎯\n\nTon tableau de bord centralisé avec toutes tes métriques en temps réel. Ventes, stocks, food cost, alertes, performances... Une seule page pour tout piloter !',
          delay: 53000,
          cta: {
            label: 'Découvrir Octogone 360',
            link: '/octogone360'
          }
        }
      ]
    }
  ],
  en: [
    {
      id: 0,
      userName: 'Alexandre',
      userAvatar: '/images/avatars/helene.avif',
      messages: [
        {
          type: 'cortex',
          text: 'Hello Alexandre! 👋',
          delay: 2000
        },
        { 
          type: 'user', 
          text: 'Hi Cortex!', 
          delay: 5000 
        },
        {
          type: 'cortex',
          text: 'How are you today? Is your restaurant doing well?',
          delay: 7500
        },
        { 
          type: 'user', 
          text: 'Yes! I want an overview of my restaurant.', 
          delay: 12000,
          expandChat: true
        },
        {
          type: 'cortex',
          text: 'Absolutely! Octogone 360 gives you a complete real-time view 🎯\n\nHere\'s your dashboard: sales, inventory, food cost, alerts... Everything in one place!',
          delay: 17500
        },
        { 
          type: 'user', 
          text: 'Great! Can I see my sales evolution this week?', 
          delay: 23000 
        },
        {
          type: 'cortex',
          text: 'Here are your sales for the last 7 days 📊\n\n💰 Total: $8,450\n📈 Daily avg: $1,207\n🔥 Best day: Saturday ($1,650)\n📉 Lowest: Tuesday ($850)',
          delay: 25500,
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
          delay: 33000 
        },
        {
          type: 'cortex',
          text: 'Your food cost is 28.5% this week 👨‍🍳\n\n🎯 Target: 30% → You\'re ahead!\n📊 Evolution: -1.2% vs last week\n💡 Your 3 most profitable dishes: Carpaccio (78%), Caesar Salad (72%), Burger (69%)',
          delay: 35500,
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
          delay: 43000 
        },
        {
          type: 'cortex',
          text: 'You have 2 active alerts Alexandre 🔔\n\n⚠️ Low stock: AAA Beef (3 kg remaining)\n⚠️ Temperature: Fridge #2 at 5°C (threshold: 4°C)\n\n✅ Everything else is under control!',
          delay: 45500
        },
        { 
          type: 'user', 
          text: 'Thanks Cortex! Where can I see all this in detail?', 
          delay: 50500 
        },
        {
          type: 'cortex',
          text: 'Everything is in Octogone 360! 🎯\n\nYour centralized dashboard with all your real-time metrics. Sales, inventory, food cost, alerts, performance... One page to manage everything!',
          delay: 53000,
          cta: {
            label: 'Discover Octogone 360',
            link: '/octogone360'
          }
        }
      ]
    }
  ]
};
