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
          text: 'Bonjour Emma, que puis-je faire pour toi aujourd\'hui ?',
          delay: 2000,
          keyConcept: 'Posez-lui des questions'
        },
        { 
          type: 'user', 
          text: 'C\'est trop gentil, Cortex.', 
          delay: 5000
        },
        {
          type: 'cortex',
          text: 'J\'adore discuter avec toi. Tu veux connaître tes ventes de la semaine ?',
          delay: 8000
        },
        { 
          type: 'user', 
          text: 'Tu lis dans mes pensées.', 
          delay: 11000,
          expandChat: true
        },
        {
          type: 'cortex',
          text: 'Voici les ventes de la semaine dernière 📊',
          delay: 16000,
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
          delay: 22000 
        },
        {
          type: 'cortex',
          text: 'Bien sûr ! 💡\n\n✨ Tes mardis sont plus faibles → Propose une promo "Mardi gourmand"\n📈 Tes samedis cartonnent → Augmente ton staff ce jour-là\n🎯 Ton plat vedette : Carpaccio (78% de marge)',
          delay: 25000,
          keyConcept: 'Demandez des conseils'
        },
        { 
          type: 'user', 
          text: 'Génial ! Tu peux me générer un rapport PDF ?', 
          delay: 31000 
        },
        {
          type: 'cortex',
          text: 'Voilà ton rapport hebdomadaire ! 📄',
          delay: 34000,
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
          delay: 40000 
        },
        {
          type: 'cortex',
          text: 'Voici le tutoriel parfait pour toi ! 🎬',
          delay: 43000,
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
          delay: 46000,
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
          text: 'Hello Emma, what can I do for you today?',
          delay: 2000,
          keyConcept: 'Ask it questions'
        },
        { 
          type: 'user', 
          text: 'That\'s so nice, Cortex.', 
          delay: 5000
        },
        {
          type: 'cortex',
          text: 'I love chatting with you. Want to see your sales for the week?',
          delay: 8000
        },
        { 
          type: 'user', 
          text: 'You read my mind.', 
          delay: 11000,
          expandChat: true
        },
        {
          type: 'cortex',
          text: 'Here are last week\'s sales 📊',
          delay: 16000,
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
          delay: 22000 
        },
        {
          type: 'cortex',
          text: 'Of course! 💡\n\n✨ Your Tuesdays are slower → Try a "Tuesday Special" promo\n📈 Your Saturdays are booming → Increase staff that day\n🎯 Your star dish: Carpaccio (78% margin)',
          delay: 25000,
          keyConcept: 'Ask for advice'
        },
        { 
          type: 'user', 
          text: 'Awesome! Can you generate a PDF report?', 
          delay: 31000 
        },
        {
          type: 'cortex',
          text: 'Here\'s your weekly report! 📄',
          delay: 34000,
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
          delay: 40000 
        },
        {
          type: 'cortex',
          text: 'Here\'s the perfect tutorial for you! 🎬',
          delay: 43000,
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
          delay: 46000,
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
