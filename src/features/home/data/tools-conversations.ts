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

// Types pour les documents inline
export type InlineDocument = {
  title: string;
  type: 'pdf' | 'excel' | 'report';
  size?: string;
  downloadUrl?: string;
};

// Types pour les vidéos inline
export type InlineVideo = {
  title: string;
  thumbnail?: string;
  duration?: string;
  videoUrl?: string;
};

// Types pour les messages
export type ToolMessage = {
  type: 'user' | 'cortex';
  text: string;
  delay: number; // délai avant d'apparaître (en ms)
  cta?: MessageCTA; // Bouton CTA (optionnel)
  chart?: InlineChart; // Graphique inline (optionnel)
  document?: InlineDocument; // Document inline (optionnel)
  video?: InlineVideo; // Vidéo inline (optionnel)
  expandChat?: boolean; // Déclenche l'expansion du chat (optionnel)
  keyConcept?: string; // Concept clé à afficher en haut (optionnel)
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
      userName: 'Emma',
      userAvatar: '/images/avatars/helene.avif',
      messages: [
        {
          type: 'cortex',
          text: 'Bonjour Emma ! 👋 Comment puis-je t\'aider aujourd\'hui ?',
          delay: 2000,
          keyConcept: 'Posez-lui des questions'
        },
        { 
          type: 'user', 
          text: 'Salut Cortex ! Je veux voir mes ventes de la semaine.', 
          delay: 5000,
          expandChat: true
        },
        {
          type: 'cortex',
          text: 'Parfait ! Voici tes ventes des 7 derniers jours 📊',
          delay: 8000,
          keyConcept: 'Visualisez vos résultats',
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
          text: 'Super ! Tu as des conseils pour améliorer mes ventes ?', 
          delay: 14000 
        },
        {
          type: 'cortex',
          text: 'Bien sûr ! 💡\n\n✨ Tes mardis sont plus faibles → Propose une promo "Mardi gourmand"\n📈 Tes samedis cartonnent → Augmente ton staff ce jour-là\n🎯 Ton plat vedette : Carpaccio (78% de marge)',
          delay: 17000,
          keyConcept: 'Demandez des conseils'
        },
        { 
          type: 'user', 
          text: 'Génial ! Tu peux me générer un rapport PDF ?', 
          delay: 23000 
        },
        {
          type: 'cortex',
          text: 'Voilà ton rapport hebdomadaire ! 📄',
          delay: 26000,
          keyConcept: 'Générez des documents',
          document: {
            title: 'Rapport hebdomadaire - Ventes & Performance',
            type: 'pdf',
            size: '2.4 MB',
            downloadUrl: '#'
          }
        },
        { 
          type: 'user', 
          text: 'Parfait ! Montre-moi un tutoriel pour optimiser mes stocks.', 
          delay: 32000 
        },
        {
          type: 'cortex',
          text: 'Voici le tutoriel parfait pour toi ! 🎬',
          delay: 35000,
          keyConcept: 'Commandez des tutoriels',
          video: {
            title: 'Comment optimiser vos stocks avec Octogone 360',
            duration: '3:45',
            videoUrl: '#'
          }
        },
        {
          type: 'cortex',
          text: 'Besoin d\'autre chose Emma ? Je suis là pour t\'aider ! 🎯',
          delay: 38000,
          keyConcept: 'Posez des actions',
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
      userName: 'Emma',
      userAvatar: '/images/avatars/helene.avif',
      messages: [
        {
          type: 'cortex',
          text: 'Hello Emma! 👋 How can I help you today?',
          delay: 2000,
          keyConcept: 'Ask it questions'
        },
        { 
          type: 'user', 
          text: 'Hi Cortex! I want to see my sales for the week.', 
          delay: 5000,
          expandChat: true
        },
        {
          type: 'cortex',
          text: 'Perfect! Here are your sales for the last 7 days 📊',
          delay: 8000,
          keyConcept: 'Visualize your results',
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
          text: 'Great! Do you have tips to improve my sales?', 
          delay: 14000 
        },
        {
          type: 'cortex',
          text: 'Of course! 💡\n\n✨ Your Tuesdays are slower → Try a "Tuesday Special" promo\n📈 Your Saturdays are booming → Increase staff that day\n🎯 Your star dish: Carpaccio (78% margin)',
          delay: 17000,
          keyConcept: 'Ask for advice'
        },
        { 
          type: 'user', 
          text: 'Awesome! Can you generate a PDF report?', 
          delay: 23000 
        },
        {
          type: 'cortex',
          text: 'Here\'s your weekly report! 📄',
          delay: 26000,
          keyConcept: 'Generate documents',
          document: {
            title: 'Weekly Report - Sales & Performance',
            type: 'pdf',
            size: '2.4 MB',
            downloadUrl: '#'
          }
        },
        { 
          type: 'user', 
          text: 'Perfect! Show me a tutorial to optimize my inventory.', 
          delay: 32000 
        },
        {
          type: 'cortex',
          text: 'Here\'s the perfect tutorial for you! 🎬',
          delay: 35000,
          keyConcept: 'Request tutorials',
          video: {
            title: 'How to optimize your inventory with Octogone 360',
            duration: '3:45',
            videoUrl: '#'
          }
        },
        {
          type: 'cortex',
          text: 'Need anything else Emma? I\'m here to help! 🎯',
          delay: 38000,
          keyConcept: 'Take actions',
          cta: {
            label: 'Discover Octogone 360',
            link: '/octogone360'
          }
        }
      ]
    }
  ]
};
