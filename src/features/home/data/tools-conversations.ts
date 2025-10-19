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
  type: 'pdf' | 'excel' | 'report' | 'product';
  size?: string;
  downloadUrl?: string;
  image?: string; // Chemin vers une image (optionnel)
};

// Types pour les vidéos inline
export type InlineVideo = {
  title: string;
  thumbnail?: string;
  duration?: string;
  videoUrl?: string;
};

// Types pour la barre de progression
export type InlineProgress = {
  title: string;
  duration?: number; // durée en ms
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
  progress?: InlineProgress; // Barre de progression (optionnel)
  expandChat?: boolean; // Déclenche l'expansion du chat (optionnel)
  keyConcept?: string; // Concept clé à afficher en haut (optionnel)
  loading?: boolean; // Affiche une animation de chargement (optionnel) - DEPRECATED, utiliser progress
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
          keyConcept: 'Discutez naturellement'
        },
        { 
          type: 'user', 
          text: 'C\'est trop gentil, Cortex.', 
          delay: 5000
        },
        {
          type: 'cortex',
          text: 'J\'adore discuter avec toi. Tu veux voir tes ventes de la semaine ?',
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
          text: 'Voici tes ventes de la semaine dernière 📊',
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
          type: 'cortex',
          text: '💰 Total : 8 450 $\n📈 Moyenne/jour : 1 207 $\n🔥 Meilleur jour : Samedi (1 650 $)\n📉 Plus faible : Mardi (850 $)',
          delay: 19000
        },
        { 
          type: 'user', 
          text: 'Super ! Compare avec la semaine d\'avant.', 
          delay: 22000 
        },
        {
          type: 'cortex',
          text: 'Parfait ! 📈\n\n🔼 Semaine actuelle : 8 450 $\n🔽 Semaine précédente : 7 890 $\n🚀 Augmentation : +7,1% (+560 $)\n\n🎯 Ton meilleur jour : Samedi (+15%)',
          delay: 25000,
          keyConcept: 'Comparez vos performances'
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
            downloadUrl: '/fr/modules/octogone-360'
          }
        },
        { 
          type: 'user', 
          text: 'Parfait Cortex ! J\'aurais besoin du tutoriel pour la prise d\'inventaires, nous avons de nouveaux employés.', 
          delay: 40000 
        },
        {
          type: 'cortex',
          text: 'Pas de problème Emma, je t\'envoie ça à l\'instant. 🎬',
          delay: 43000,
          keyConcept: 'Commandez des tutoriels',
          video: {
            title: 'Tutoriel : Prise d\'inventaire',
            duration: '4:12',
            videoUrl: '/fr/fonctionnalites/inventaire'
          }
        },
        {
          type: 'cortex',
          text: 'Veux-tu que je génère une fiche pour tes nouveaux employés ?',
          delay: 49000
        },
        { 
          type: 'user', 
          text: 'Non merci. Par contre, j\'aimerais créer une recette avec du kiwano. C\'est la première fois qu\'on utilise ce produit.', 
          delay: 52000 
        },
        {
          type: 'cortex',
          text: 'Pas de problème ! J\'ai trouvé le Kiwano dans le catalogue Octogone 🍈\n\n📦 Kiwano (Melon à cornes)\n🌍 Origine : Afrique\n🎨 Peau orange épineuse, pulpe verte gélatineuse\n👅 Saveur : Mélange de concombre et kiwi\n\nC\'est bien ce produit que tu veux ajouter à ton catalogue ?',
          delay: 55000
        },
        { 
          type: 'user', 
          text: 'Oui, c\'est ça ! Tu peux installer la fiche.', 
          delay: 58000 
        },
        {
          type: 'cortex',
          text: '',
          delay: 60000,
          progress: {
            title: 'Installation de la fiche produit en cours...',
            duration: 2000
          }
        },
        {
          type: 'cortex',
          text: '✅ Fiche produit installée avec succès !',
          delay: 63000,
          document: {
            title: 'Fiche produit : Kiwano (Melon à cornes)',
            type: 'product',
            size: '1.2 MB',
            downloadUrl: '/fr/modules/octogone-360',
            image: '/images/kiwano.avif'
          }
        },
        { 
          type: 'user', 
          text: 'Merci Cortex, tu es génial !', 
          delay: 66000 
        },
        {
          type: 'cortex',
          text: 'Avec plaisir Emma ! Besoin d\'autre chose ? Je suis là pour t\'aider ! 🎯',
          delay: 68000,
          keyConcept: 'Posez des actions',
          cta: {
            label: 'Réserver une démo',
            link: '/fr/contact'
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
          keyConcept: 'Chat naturally'
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
          text: 'Here are your sales from last week 📊',
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
          type: 'cortex',
          text: '💰 Total: $8,450\n📈 Daily avg: $1,207\n🔥 Best day: Saturday ($1,650)\n📉 Lowest: Tuesday ($850)',
          delay: 19000
        },
        { 
          type: 'user', 
          text: 'Great! Compare with the week before.', 
          delay: 22000 
        },
        {
          type: 'cortex',
          text: 'Perfect! 📈\n\n🔼 Current week: $8,450\n🔽 Previous week: $7,890\n🚀 Increase: +7.1% (+$560)\n\n🎯 Your best day: Saturday (+15%)',
          delay: 25000,
          keyConcept: 'Compare your performance'
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
            downloadUrl: '/en/modules/octogone-360'
          }
        },
        { 
          type: 'user', 
          text: 'Perfect Cortex! I need the inventory tutorial, we have new employees.', 
          delay: 40000 
        },
        {
          type: 'cortex',
          text: 'No problem Emma, I\'m sending it right now. 🎬',
          delay: 43000,
          keyConcept: 'Request tutorials',
          video: {
            title: 'Tutorial: Inventory Management',
            duration: '4:12',
            videoUrl: '/en/fonctionnalites/inventaire'
          }
        },
        {
          type: 'cortex',
          text: 'Would you like me to generate a fact sheet for your new employees?',
          delay: 49000
        },
        { 
          type: 'user', 
          text: 'No thanks. But I\'d like to create a recipe with kiwano. It\'s the first time we\'re using this product.', 
          delay: 52000 
        },
        {
          type: 'cortex',
          text: 'No problem! I found Kiwano in the Octogone catalog 🍈\n\n📦 Kiwano (Horned Melon)\n🌍 Origin: Africa\n🎨 Orange spiny skin, green gelatinous pulp\n👅 Flavor: Mix of cucumber and kiwi\n\nIs this the product you want to add to your catalog?',
          delay: 55000
        },
        { 
          type: 'user', 
          text: 'Yes, that\'s it! You can install the sheet.', 
          delay: 58000 
        },
        {
          type: 'cortex',
          text: '',
          delay: 60000,
          progress: {
            title: 'Installing product sheet...',
            duration: 2000
          }
        },
        {
          type: 'cortex',
          text: '✅ Product sheet installed successfully!',
          delay: 63000,
          document: {
            title: 'Product Sheet: Kiwano (Horned Melon)',
            type: 'product',
            size: '1.2 MB',
            downloadUrl: '/en/modules/octogone-360',
            image: '/images/kiwano.avif'
          }
        },
        { 
          type: 'user', 
          text: 'Thanks Cortex, you\'re amazing!', 
          delay: 66000 
        },
        {
          type: 'cortex',
          text: 'My pleasure Emma! Need anything else? I\'m here to help! 🎯',
          delay: 68000,
          keyConcept: 'Take actions',
          cta: {
            label: 'Book a demo',
            link: '/en/contact'
          }
        }
      ]
    }
  ]
};
