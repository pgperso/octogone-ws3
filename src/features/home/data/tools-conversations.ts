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
          text: 'Salut Cortex ! Je veux utiliser la fonction inventaire en équipe, comment ça marche ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Salut ! Super idée, c\'est une des fonctions les plus puissantes d\'Octogone ! 🚀\n\nChaque membre de ton équipe compte sur son appareil, et tout se synchronise automatiquement en temps réel. Tu divises le temps par 3 !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Génial ! Donc je peux assigner différentes zones à chacun ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Exactement ! Un employé fait le bar, un autre la cuisine, un troisième le garde-manger 📱\n\nTout se consolide automatiquement. C\'est ultra-rapide et super efficace !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et je peux analyser les écarts après ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Oui ! Dès que c\'est terminé, tu as la comparaison physique vs théorique instantanément 📊\n\nTu vois exactement où optimiser, ce qui manque, et ce qu\'il faut commander. Historique complet inclus !',
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
          text: 'Hey Cortex ! Montre-moi comment utiliser la mise à jour automatique des recettes', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Avec plaisir ! C\'est une des fonctions magiques d\'Octogone ✨\n\nDès qu\'un prix d\'ingrédient change, toutes tes recettes se mettent à jour automatiquement. Coûts, marges, prix de vente... tout est recalculé en temps réel !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Donc si le prix du bœuf augmente, je vois l\'impact partout ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Exactement ! Tu vois instantanément l\'impact sur TOUTES tes recettes avec du bœuf 🔄\n\nTu peux analyser quels plats restent rentables et optimiser tes prix en conséquence. C\'est super puissant !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et pour créer mes fiches techniques ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'C\'est ultra-simple dans Octogone ! Tu ajoutes tes ingrédients et quantités, et le système calcule tout automatiquement 👨‍🍳\n\nTout est centralisé, toujours à jour, et accessible en un clic !',
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
          text: 'Salut ! Je veux activer les alertes automatiques pour mes zones tempérées', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Excellente idée ! C\'est une sécurité en plus pour ton restaurant 🔒\n\nAvec les capteurs Octogone, tes frigos, congélos et zones chaudes sont surveillés 24/7. Tout est automatisé, zéro saisie manuelle !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Et je reçois une alerte si une température sort de la norme ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Oui ! Alerte instantanée par notification, SMS ou email selon tes préférences 📡\n\nTu peux réagir rapidement et éviter les problèmes. C\'est la tranquillité d\'esprit 24/7 !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et pour les inspections MAPAQ ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Octogone garde l\'historique complet automatiquement ! Date, heure, températures 📋\n\nEn cas d\'inspection, tu exportes le rapport en un clic. Tu es toujours conforme et prêt !',
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
          text: 'Hey Cortex ! Je veux centraliser mes données RH dans Octogone, par où je commence ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Super choix ! Le module RH d\'Octogone est vraiment puissant 💪\n\nToutes tes fiches employés sont centralisées : infos perso, contrats, horaires, disponibilités... Tout au même endroit, toujours à jour !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Et pour gérer les conventions collectives ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Octogone structure tout pour toi ! Salaires, congés, avantages sociaux 📄\n\nTu vois instantanément ce qui s\'applique à chaque employé selon sa convention. C\'est clair et simple !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et je peux attacher les documents directement ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Oui ! Contrats, évaluations, formations, certifications... tout est attaché à la fiche employé 🔒\n\nTout est sécurisé, centralisé et accessible en un clic. C\'est la gestion RH simplifiée !',
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
