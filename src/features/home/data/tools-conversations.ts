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
          text: 'Salut Cortex ! On perd vraiment trop de temps sur nos inventaires...', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Salut ! Je te comprends, c\'est souvent la corvée de la semaine 😅\n\nAvec la prise d\'inventaire en équipe, vous pouvez diviser le temps par 3 ! Chacun compte sur son appareil et tout se synchronise automatiquement.',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Ah ouais ? Donc plusieurs personnes peuvent compter en même temps ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Exactement ! Pendant qu\'un employé fait le bar, un autre s\'occupe de la cuisine, et un troisième du garde-manger 📱\n\nTout se consolide en temps réel. Plus besoin d\'attendre que quelqu\'un finisse pour commencer !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et on peut voir les écarts directement ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Oui ! Dès que l\'inventaire est terminé, tu compares physique vs théorique instantanément 📊\n\nTu vois exactement où sont les pertes, ce qui manque, et ce qu\'il faut commander. Historique complet inclus !',
          delay: 11000,
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
          text: 'Cortex, mes prix d\'ingrédients changent souvent, c\'est compliqué à suivre...', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Je te comprends ! C\'est frustrant de devoir tout recalculer manuellement 😓\n\nAvec Food Cost, dès qu\'un prix change, toutes tes recettes se mettent à jour automatiquement. Coûts, marges, prix de vente... tout est recalculé en temps réel !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Ah oui ? Donc si le prix du bœuf augmente par exemple ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Exactement ! Tu vois instantanément l\'impact sur TOUTES tes recettes qui contiennent du bœuf 🔄\n\nTu peux même voir quels plats restent rentables et lesquels ont besoin d\'un ajustement de prix.',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Génial ! Et pour créer mes fiches techniques ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Super simple ! Tu crées tes recettes avec les ingrédients et quantités, et le système calcule tout automatiquement 👨‍🍳\n\nPlus besoin d\'Excel ou de calculatrice. Tout est centralisé et toujours à jour !',
          delay: 11000,
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
          text: 'Hey Cortex ! J\'en ai marre de noter les températures à la main tous les jours...', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Je te comprends ! C\'est répétitif et on peut facilement oublier 😅\n\nAvec les capteurs de température, tout est automatisé. Tes frigos, congélos et zones chaudes sont surveillés 24/7 sans que tu aies à y penser !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Et si une température déraille pendant la nuit ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Tu reçois une alerte immédiate ! Notification, SMS ou email selon tes préférences 📡\n\nTu peux agir rapidement avant que la nourriture soit compromise. Plus de mauvaises surprises le matin !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et pour le MAPAQ, j\'ai toujours les données ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Oui ! Historique complet automatique avec date et heure 📋\n\nEn cas d\'inspection, tu exportes le rapport en un clic. Fini les feuilles papier perdues ou incomplètes. Tu es toujours prêt !',
          delay: 11000,
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
          text: 'Salut ! J\'ai 15 employés et je galère avec mes fichiers Excel pour les RH...', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Ah oui, Excel pour les RH c\'est l\'enfer ! Versions multiples, fichiers perdus... 😅\n\nAvec le module RH, toutes tes fiches employés sont centralisées. Infos perso, contrats, horaires, tout au même endroit !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Et pour les conventions collectives ? C\'est compliqué à gérer...', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Je sais ! Au lieu de chercher dans des PDF de 200 pages, tout est structuré dans le système 📄\n\nSalaires, congés, avantages... Tu sais instantanément ce qui s\'applique à chaque employé selon sa convention.',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Génial ! Et les documents comme les contrats, évaluations ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Tout est attaché à la fiche de l\'employé ! Contrats, évaluations, formations, certifications 🔒\n\nPlus de fichiers perdus ou de versions multiples. Tout est sécurisé, centralisé et accessible en un clic !',
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
