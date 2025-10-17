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
          text: 'Comment optimiser la prise d\'inventaire dans mon restaurant ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Excellente question ! Avec Inventaire, transformez une corvée en processus efficace 📦\n\n✅ Prenez vos inventaires en équipe et divisez le temps par 3\n✅ Suivez vos stocks en temps réel\n✅ Détectez les écarts instantanément',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Et pour la prise en équipe, comment ça fonctionne exactement ?', 
          delay: 4000 
        },
        {
          type: 'cortex',
          text: 'Chaque membre de l\'équipe peut compter simultanément sur son appareil (téléphone, tablette). Les données se synchronisent automatiquement en temps réel !\n\nPar exemple : pendant qu\'un employé compte le bar, un autre fait la cuisine, et un troisième le garde-manger. Tout se consolide automatiquement.',
          delay: 5500
        },
        { 
          type: 'user', 
          text: 'Ça m\'intéresse ! Quels sont les autres avantages ?', 
          delay: 9000 
        },
        {
          type: 'cortex',
          text: '✅ Réduisez vos pertes de 2 à 5%\n✅ Comparez physique vs théorique instantanément\n✅ Identifiez les produits à commander\n✅ Historique complet de tous vos inventaires\n\nVous gagnez 10-15 heures par semaine et vous avez enfin le contrôle total sur vos stocks !',
          delay: 10500,
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
          text: 'J\'aimerais mieux contrôler mon food cost et créer des recettes standardisées', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'Parfait ! Le Food Cost est la clé de votre rentabilité 👨‍🍳\n\n✅ Créez vos fiches techniques détaillées\n✅ Calculez automatiquement vos coûts et marges\n✅ Analysez la rentabilité de chaque plat',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Et si un prix d\'ingrédient change ?', 
          delay: 4000 
        },
        {
          type: 'cortex',
          text: 'Excellente question ! Toutes vos recettes se mettent à jour instantanément 🔄\n\nPar exemple : le prix du bœuf augmente ? En un clic, vous voyez l\'impact sur TOUTES vos recettes qui contiennent du bœuf. Coûts, marges, prix de vente suggérés... tout est recalculé automatiquement.',
          delay: 5500
        },
        { 
          type: 'user', 
          text: 'Plus besoin d\'Excel alors !', 
          delay: 9000 
        },
        {
          type: 'cortex',
          text: 'Exactement ! Zéro erreur de calcul, zéro formule Excel à maintenir 🎉\n\nVous avez des rapports en temps réel : food cost global, par catégorie, par plat. Vous savez exactement où vous êtes rentable et où vous perdez de l\'argent.',
          delay: 10500,
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
          text: 'Comment surveiller les températures de mes zones tempérées pour la sécurité alimentaire ?', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'La sécurité alimentaire, c\'est critique ! Avec Températures, simplifiez votre conformité 🌡️\n\n✅ Surveillance automatique 24/7\n✅ Alertes instantanées si hors norme\n✅ Fini les saisies manuelles',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'Comment ça fonctionne concrètement ?', 
          delay: 4000 
        },
        {
          type: 'cortex',
          text: 'Des capteurs IoT dans vos frigos, congélateurs et zones chaudes envoient les températures en temps réel 📡\n\nSi une température sort de la plage acceptable, vous recevez une alerte immédiate (notification, SMS, email). Vous pouvez agir AVANT que la nourriture soit compromise.',
          delay: 5500
        },
        { 
          type: 'user', 
          text: 'Et pour les inspections MAPAQ ?', 
          delay: 9000 
        },
        {
          type: 'cortex',
          text: 'Historique complet automatique ! 📋\n\nToutes les températures sont enregistrées avec date et heure. En cas d\'inspection, vous exportez le rapport en un clic. Fini les feuilles papier perdues ou les données manquantes !',
          delay: 10500,
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
          text: 'Je veux gérer mes fiches employés et conventions collectives sans Excel !', 
          delay: 0 
        },
        {
          type: 'cortex',
          text: 'On vous comprend ! Excel, c\'est fini 👥\n\n✅ Fiches employés complètes et centralisées\n✅ Gestion des conventions collectives simplifiée\n✅ Suivi des heures et disponibilités',
          delay: 1500
        },
        { 
          type: 'user', 
          text: 'C\'est quoi exactement les conventions collectives dans votre système ?', 
          delay: 4000 
        },
        {
          type: 'cortex',
          text: 'Les conventions collectives, c\'est toutes les règles de travail : salaires, heures, congés, avantages sociaux, etc. 📄\n\nAu lieu de chercher dans des PDF de 200 pages ou des fichiers Excel, tout est structuré et accessible. Vous savez instantanément ce qui s\'applique à chaque employé.',
          delay: 5500
        },
        { 
          type: 'user', 
          text: 'Parfait ! Et pour les documents RH ?', 
          delay: 9000 
        },
        {
          type: 'cortex',
          text: 'Tous vos documents RH au même endroit, sécurisés 🔒\n\nContrats, évaluations, formations, certifications... Tout est lié à la fiche employé. Plus de fichiers Excel perdus, plus de versions multiples. Tout est centralisé et toujours à jour !',
          delay: 10500,
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
