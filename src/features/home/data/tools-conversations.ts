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
          text: 'Hey Cortex ! C\'est Marc. J\'adore faire mes inventaires en équipe, ça nous fait gagner tellement de temps !', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Salut Marc ! C\'est vrai, la prise en équipe c\'est vraiment un game changer 🚀\n\nChacun compte sur son appareil et tout se synchronise en temps réel. Vous divisez le temps par 3 !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Oui ! Et j\'aimerais savoir la valeur totale de mon inventaire du mois passé', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Aucun problème ! Tu as l\'historique complet de tous tes inventaires 📊\n\nTu peux comparer les valeurs d\'un mois à l\'autre, voir l\'évolution, et analyser les tendances. C\'est super pratique pour le suivi !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et pour voir mon inventaire théorique en temps réel ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Là c\'est magique ! Grâce à la connexion avec ton POS, l\'inventaire théorique se met à jour automatiquement à chaque vente ✨\n\nTu sais toujours exactement ce que tu as en stock, en temps réel !',
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
          text: 'Salut Cortex ! C\'est Julie. J\'utilise les fiches techniques pour toutes mes recettes, c\'est vraiment pratique !', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Salut Julie ! Oui, et le meilleur c\'est que tout se met à jour automatiquement quand un prix change ✨\n\nDès qu\'un ingrédient augmente ou baisse, toutes tes recettes sont recalculées en temps réel !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Exactement ! Hier le bœuf a augmenté, j\'ai vu l\'impact direct sur mes plats', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'C\'est ça la puissance du système ! Tu vois instantanément quels plats sont affectés 🔄\n\nTu peux ajuster tes prix de vente en conséquence et maintenir ta rentabilité. Tout est transparent !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Super ! Et je peux voir mon food cost global en temps réel ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Absolument ! Food cost global, par catégorie, par plat... tout est calculé automatiquement 👨‍🍳\n\nTu as une vision complète de ta rentabilité, toujours à jour !',
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
          text: 'Hey Cortex ! C\'est Vincent. Les capteurs de température, c\'est vraiment une tranquillité d\'esprit !', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Salut Vincent ! Oui, plus besoin de noter à la main, tout est automatisé 24/7 🔒\n\nTes frigos, congélos et zones chaudes sont surveillés en continu. Tu reçois une alerte si quelque chose déraille !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Exactement ! La semaine dernière, j\'ai reçu une alerte à 3h du matin pour un frigo', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Et tu as pu réagir rapidement ! C\'est exactement ça l\'intérêt 📡\n\nTu évites les pertes de nourriture et tu protèges ton inventaire. C\'est une sécurité essentielle !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Oui ! Et pour le MAPAQ, j\'ai toutes les données automatiquement ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Tout est enregistré automatiquement ! Date, heure, températures 📋\n\nEn cas d\'inspection, tu exportes le rapport en un clic. Tu es toujours conforme et prêt !',
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
          text: 'Salut Cortex ! C\'est Marie. J\'ai toutes mes fiches employés dans Octogone, c\'est tellement mieux organisé !', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Salut Marie ! C\'est vrai, tout est centralisé au même endroit 💪\n\nInfos perso, contrats, horaires, disponibilités... Tu retrouves tout en un clic. Plus besoin de chercher dans des fichiers !',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Oui ! Et pour les conventions collectives, je peux voir ce qui s\'applique à chacun ?', 
          delay: 4500 
        },
        {
          type: 'cortex',
          text: 'Exactement ! Tout est structuré dans le système 📄\n\nSalaires, congés, avantages... Tu vois instantanément ce qui s\'applique selon la convention de chaque employé. C\'est super clair !',
          delay: 6000
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et je peux garder tous les documents attachés aux fiches ?', 
          delay: 9500 
        },
        {
          type: 'cortex',
          text: 'Oui ! Contrats, évaluations, formations, certifications... tout est lié à la fiche 🔒\n\nTout est sécurisé et accessible en un clic. C\'est la gestion RH simplifiée !',
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
