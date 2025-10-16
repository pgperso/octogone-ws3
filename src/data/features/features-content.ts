/**
 * Données des 4 concepts fondamentaux d'Octogone
 * SOURCE DE VÉRITÉ - Utilisée par toutes les pages et composants
 */

export interface ConceptFeature {
  id: 'operate' | 'automate' | 'analyze' | 'predict' | 'cortex';
  
  // Identité du concept
  nameFr: string;
  nameEn: string;
  
  // Couleurs du thème (couleur pastel du hero)
  pastelColor: string; // Hex pour le hero background
  
  // Hero section
  heroTitleFr: string;
  heroTitleEn: string;
  heroDescriptionFr: string;
  heroDescriptionEn: string;
  heroImage: string;
  
  // Contenu explicatif du concept
  contentFr: string;
  contentEn: string;
  
  // CTA optionnel
  ctaLabelFr?: string;
  ctaLabelEn?: string;
  ctaLink?: string;
}

// Données des 4 concepts
export const concepts: ConceptFeature[] = [
  {
    id: 'operate',
    nameFr: 'Opérer',
    nameEn: 'Operate',
    pastelColor: '#B8E0D2', // Vert menthe pastel
    
    heroTitleFr: 'Boostez vos performances opérationnelles',
    heroTitleEn: 'Boost your operational performance',
    heroDescriptionFr: 'Opérer, c\'est exécuter. Prendre vos inventaires, gérer vos stocks, contrôler vos ressources. Avec Octogone, chaque opération devient plus rapide et plus efficace. Gagnez du temps, économisez de l\'argent, performez mieux.',
    heroDescriptionEn: 'Operating means executing. Taking inventory, managing stock, controlling resources. With Octogone, every operation becomes faster and more efficient. Save time, save money, perform better.',
    heroImage: '/operate.jpg',
    
    contentFr: `Opérer, c'est le cœur de votre activité quotidienne. C'est faire les choses concrètement : compter vos inventaires, gérer vos stocks, contrôler vos ressources, exécuter vos opérations.

Dans un restaurant, chaque minute compte. Chaque heure passée sur des tâches administratives est une heure de moins pour servir vos clients, former votre équipe ou développer votre entreprise. C'est pourquoi la performance opérationnelle est cruciale.

Avec Octogone, opérer devient plus rapide, plus simple et plus efficace. Nos outils sont conçus pour éliminer les frictions, accélérer les processus et vous faire gagner un temps précieux. Prenez vos inventaires en équipe et divisez le temps par trois. Suivez vos stocks en temps réel sans effort. Contrôlez vos coûts automatiquement.

Le résultat ? Vous gagnez 10 à 15 heures par semaine. Vous réduisez vos pertes de 2 à 5%. Vous libérez votre équipe des tâches répétitives pour qu'elle se concentre sur ce qui compte vraiment : vos clients et votre croissance.

Opérer efficacement, c'est la base de tout. C'est ce qui vous permet d'automatiser, d'analyser et de prédire. Sans opérations solides et performantes, rien d'autre n'est possible. Octogone vous donne les outils pour opérer au meilleur de vos capacités.`,
    
    contentEn: `Operating is the heart of your daily activity. It's getting things done concretely: counting inventory, managing stock, controlling resources, executing operations.

In a restaurant, every minute counts. Every hour spent on administrative tasks is an hour less to serve your customers, train your team or grow your business. That's why operational performance is crucial.

With Octogone, operating becomes faster, simpler and more efficient. Our tools are designed to eliminate friction, accelerate processes and save you precious time. Take inventory as a team and divide time by three. Track your stock in real-time effortlessly. Control your costs automatically.

The result? You save 10 to 15 hours per week. You reduce your losses by 2 to 5%. You free your team from repetitive tasks so they can focus on what really matters: your customers and your growth.

Operating efficiently is the foundation of everything. It's what allows you to automate, analyze and predict. Without solid and efficient operations, nothing else is possible. Octogone gives you the tools to operate at your best.`
  },
  {
    id: 'automate',
    nameFr: 'Automatiser',
    nameEn: 'Automate',
    pastelColor: '#B4D4FF', // Bleu ciel pastel
    
    heroTitleFr: 'Automatisez et éliminez les erreurs',
    heroTitleEn: 'Automate and eliminate errors',
    heroDescriptionFr: 'Laissez le système faire le travail. Calculs automatiques, mises à jour instantanées, zéro erreur humaine. Concentrez-vous sur ce qui compte vraiment.',
    heroDescriptionEn: 'Let the system do the work. Automatic calculations, instant updates, zero human error. Focus on what really matters.',
    heroImage: '/resto.jpg',
    
    contentFr: `Automatiser, c'est libérer votre équipe des tâches répétitives et chronophages. C'est laisser le système faire ce qu'il fait le mieux : calculer, mettre à jour, synchroniser, sans erreur et sans effort.

Dans la gestion d'un restaurant, il y a des dizaines de calculs à faire chaque jour. Coûts de recettes, food cost, marges, prix de vente, inventaires théoriques. Faire tout ça manuellement, c'est perdre du temps et risquer des erreurs. Une erreur de calcul peut vous coûter des milliers de dollars sans que vous le sachiez.

Avec Octogone, l'automatisation fait tout le travail pour vous. Changez le prix d'un ingrédient ? Toutes vos recettes se mettent à jour instantanément. Vendez un plat ? Votre inventaire théorique se déduit automatiquement.

Le résultat ? Zéro erreur de calcul. Zéro temps perdu sur des tâches répétitives. Des données toujours à jour, en temps réel. Votre équipe peut se concentrer sur ce qui a vraiment de la valeur : servir vos clients, créer de nouveaux plats, améliorer votre service.

Automatiser, c'est travailler plus intelligemment. C'est avoir confiance dans vos chiffres. C'est la précision et la rapidité que seul un système peut offrir. Octogone automatise pour que vous puissiez vous concentrer sur l'essentiel.`,
    
    contentEn: `Automating means freeing your team from repetitive and time-consuming tasks. It's letting the system do what it does best: calculate, update, synchronize, without error and without effort.

In restaurant management, there are dozens of calculations to do every day. Recipe costs, food cost, margins, selling prices, theoretical inventory. Doing all this manually means wasting time and risking errors. A calculation error can cost you thousands of dollars without you knowing it.

With Octogone, automation does all the work for you. Change an ingredient price? All your recipes update instantly. Sell a dish? Your theoretical inventory deducts automatically.

The result? Zero calculation errors. Zero time wasted on repetitive tasks. Data always up to date, in real-time. Your team can focus on what truly adds value: serving your customers, creating new dishes, improving your service.

Automating means working smarter. It's having confidence in your numbers. It's the precision and speed that only a system can offer. Octogone automates so you can focus on what matters.`
  },
  {
    id: 'analyze',
    nameFr: 'Analyser',
    nameEn: 'Analyze',
    pastelColor: '#FFE5B4',
    
    heroTitleFr: 'Analysez et prenez les bonnes décisions',
    heroTitleEn: 'Analyze and make the right decisions',
    heroDescriptionFr: 'Transformez vos données en décisions éclairées. Comprenez vos performances, identifiez les problèmes et optimisez votre rentabilité.',
    heroDescriptionEn: 'Transform your data into informed decisions. Understand your performance, identify issues and optimize your profitability.',
    heroImage: '/resto.jpg',
    
    contentFr: `Analyser, c'est comprendre ce qui se passe vraiment dans votre restaurant. C'est transformer des chiffres bruts en insights actionnables qui vous permettent de prendre les bonnes décisions.

Sans analyse, vous pilotez à l'aveugle. Vous ne savez pas où vous perdez de l'argent, quels plats sont rentables, où se situent vos problèmes. Vous réagissez aux crises au lieu de les anticiper. Vous prenez des décisions basées sur l'intuition plutôt que sur des faits.

Avec Octogone, l'analyse devient simple et puissante. Visualisez vos performances en temps réel avec des rapports clairs et détaillés. Comparez votre inventaire physique avec votre inventaire théorique pour identifier précisément vos écarts. Analysez la rentabilité de chaque plat avec l'ingénierie de menu. Détectez les tendances et les anomalies avant qu'elles ne deviennent des problèmes.

Le résultat ? Vous savez exactement où vous en êtes. Vous identifiez rapidement les sources de pertes et vous pouvez agir. Vous optimisez votre menu pour maximiser vos marges. Vous prenez des décisions basées sur des données réelles, pas sur des suppositions.

Analyser, c'est avoir le contrôle. C'est savoir plutôt que deviner. C'est la différence entre gérer et subir. Octogone vous donne les outils d'analyse pour piloter votre restaurant avec précision et confiance.`,
    
    contentEn: `Analyzing means understanding what's really happening in your restaurant. It's transforming raw numbers into actionable insights that allow you to make the right decisions.

Without analysis, you're flying blind. You don't know where you're losing money, which dishes are profitable, where your problems are. You react to crises instead of anticipating them. You make decisions based on intuition rather than facts.

With Octogone, analysis becomes simple and powerful. Visualize your performance in real-time with clear and detailed reports. Compare your physical inventory with your theoretical inventory to precisely identify your variances. Analyze the profitability of each dish with menu engineering. Detect trends and anomalies before they become problems.

The result? You know exactly where you stand. You quickly identify sources of loss and can act. You optimize your menu to maximize your margins. You make decisions based on real data, not assumptions.

Analyzing means having control. It's knowing rather than guessing. It's the difference between managing and enduring. Octogone gives you the analytical tools to run your restaurant with precision and confidence.`
  },
  {
    id: 'predict',
    nameFr: 'Prédire',
    nameEn: 'Predict',
    pastelColor: '#C8B6FF',
    
    heroTitleFr: 'L\'avenir de la gestion : l\'intelligence artificielle',
    heroTitleEn: 'The future of management: artificial intelligence',
    heroDescriptionFr: 'Prédire, c\'est notre vision. Anticiper plutôt que réagir. Octogone évolue constamment pour intégrer l\'IA et vous donner une longueur d\'avance.',
    heroDescriptionEn: 'Predicting is our vision. Anticipating rather than reacting. Octogone constantly evolves to integrate AI and give you an edge.',
    heroImage: '/predict.jpg',
    
    contentFr: `Prédire, c'est la prochaine frontière de la gestion de restaurant. C'est notre vision et notre direction. C'est anticiper plutôt que réagir, voir les problèmes avant qu'ils n'arrivent, saisir les opportunités avant la concurrence.

Dans un restaurant, tout change constamment. La demande fluctue, les tendances évoluent, les imprévus surgissent. Aujourd'hui, vous opérez, vous automatisez, vous analysez. Demain, vous prédisez. C'est l'évolution naturelle de la gestion moderne, et c'est exactement ce sur quoi nous travaillons.

L'intelligence artificielle transforme déjà de nombreuses industries. Dans la restauration, elle permettra d'anticiper la demande, de détecter les anomalies avant qu'elles ne coûtent cher, de recommander les meilleures décisions basées sur vos données historiques. C'est passer du mode réaction au mode anticipation.

Octogone évolue constamment dans cette direction. Chaque mise à jour nous rapproche de cette vision. Nous développons les capacités prédictives qui transformeront votre façon de gérer. L'IA ne remplacera jamais votre expertise, mais elle l'amplifiera, vous donnant des insights que vous ne pourriez pas voir seul.

Prédire, c'est l'avenir. Et cet avenir, nous le construisons ensemble. Avec Octogone, vous n'adoptez pas juste un logiciel, vous rejoignez une plateforme qui évolue, qui s'améliore, qui intègre les technologies de demain pour vous garder toujours un pas devant.`,
    
    contentEn: `Predicting is the next frontier of restaurant management. It's our vision and our direction. It's anticipating rather than reacting, seeing problems before they happen, seizing opportunities before the competition.

In a restaurant, everything is constantly changing. Demand fluctuates, trends evolve, the unexpected happens. Today, you operate, you automate, you analyze. Tomorrow, you predict. It's the natural evolution of modern management, and it's exactly what we're working on.

Artificial intelligence is already transforming many industries. In restaurants, it will enable anticipating demand, detecting anomalies before they cost money, recommending the best decisions based on your historical data. It's moving from reaction mode to anticipation mode.

Octogone constantly evolves in this direction. Each update brings us closer to this vision. We're developing the predictive capabilities that will transform how you manage. AI will never replace your expertise, but it will amplify it, giving you insights you couldn't see alone.

Predicting is the future. And this future, we're building it together. With Octogone, you're not just adopting software, you're joining a platform that evolves, that improves, that integrates tomorrow's technologies to keep you always one step ahead.`,
    
    ctaLabelFr: 'Découvrez Cortex, notre agent IA',
    ctaLabelEn: 'Discover Cortex, our AI agent',
    ctaLink: '/cortex'
  },
  {
    id: 'cortex',
    nameFr: 'Assistant IA',
    nameEn: 'AI Assistant',
    pastelColor: '#BADFF6', // Bleu Cortex pastel
    
    heroTitleFr: 'Voici Cortex',
    heroTitleEn: 'Meet Cortex',
    heroDescriptionFr: 'Votre assistant IA qui transforme vos données en décisions. Posez des questions, obtenez des réponses instantanées et optimisez vos opérations sans effort.',
    heroDescriptionEn: 'Your AI assistant that transforms data into decisions. Ask questions, get instant answers, and optimize your restaurant operations effortlessly.',
    heroImage: 'https://player.vimeo.com/video/1126878170?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1&controls=0&background=1',
    
    contentFr: `Cortex est votre assistant IA qui révolutionne la façon dont vous interagissez avec vos données. Plus besoin de chercher dans des rapports complexes ou de faire des calculs manuels. Posez simplement vos questions en langage naturel et obtenez des réponses instantanées.

Avec Cortex, vous pouvez demander "Quel est mon food cost cette semaine ?" ou "Quels sont mes plats les plus rentables ?" et recevoir des réponses précises en quelques secondes. Cortex analyse vos données en temps réel et vous donne des insights actionnables pour optimiser vos opérations.

L'intelligence artificielle de Cortex apprend continuellement de vos habitudes et de votre établissement. Plus vous l'utilisez, plus il comprend vos besoins spécifiques et peut vous proposer des recommandations personnalisées.

Cortex est disponible 24/7, toujours prêt à vous aider dans vos décisions. Que ce soit pour analyser vos ventes, optimiser vos stocks ou prédire vos besoins futurs, Cortex transforme la complexité de vos données en simplicité d'utilisation.`,
    
    contentEn: `Cortex is your AI assistant that revolutionizes how you interact with your data. No more searching through complex reports or doing manual calculations. Simply ask your questions in natural language and get instant answers.

With Cortex, you can ask "What's my food cost this week?" or "What are my most profitable dishes?" and receive accurate answers in seconds. Cortex analyzes your data in real-time and gives you actionable insights to optimize your operations.

Cortex's artificial intelligence continuously learns from your habits and your establishment. The more you use it, the better it understands your specific needs and can offer personalized recommendations.

Cortex is available 24/7, always ready to help with your decisions. Whether it's analyzing your sales, optimizing your inventory, or predicting your future needs, Cortex transforms the complexity of your data into simplicity of use.`,
    
    ctaLabelFr: 'Voir la plateforme en action',
    ctaLabelEn: 'See the platform in action',
    ctaLink: '/demo'
  }
];

// Fonctions helper
export function getConceptById(id: string): ConceptFeature | undefined {
  return concepts.find(concept => concept.id === id);
}

export function getAllConcepts(): ConceptFeature[] {
  return concepts;
}

// Fonctions de navigation entre concepts (boucle circulaire)
export function getNextConcept(currentId: string): ConceptFeature | null {
  const currentIndex = concepts.findIndex(c => c.id === currentId);
  if (currentIndex === -1) return null;
  
  // Boucle : si on est à la fin, retourner au début
  const nextIndex = (currentIndex + 1) % concepts.length;
  return concepts[nextIndex];
}

export function getPreviousConcept(currentId: string): ConceptFeature | null {
  const currentIndex = concepts.findIndex(c => c.id === currentId);
  if (currentIndex === -1) return null;
  
  // Boucle : si on est au début, aller à la fin
  const previousIndex = currentIndex === 0 ? concepts.length - 1 : currentIndex - 1;
  return concepts[previousIndex];
}
