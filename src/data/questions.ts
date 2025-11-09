import { Question } from '../types';

export const questions: Question[] = [
  // Culture & Society
  {
    id: 'q1',
    category: 'culture',
    difficulty: 'medium',
    question: 'Quelle œuvre a révolutionné l\'art moderne au début du 20ème siècle?',
    options: [
      'La Joconde de Léonard de Vinci',
      'Les Demoiselles d\'Avignon de Picasso',
      'La Nuit étoilée de Van Gogh',
      'Le Cri de Munch'
    ],
    correctAnswer: 1,
    explanation: 'Les Demoiselles d\'Avignon (1907) de Picasso est considérée comme l\'œuvre fondatrice du cubisme et a révolutionné l\'art moderne.',
    debatePrompt: 'Pourquoi pensez-vous que cette œuvre a été si révolutionnaire pour son époque? Quels éléments la rendent unique?'
  },
  {
    id: 'q2',
    category: 'society',
    difficulty: 'hard',
    question: 'Quel pourcentage de la population mondiale a accès à Internet en 2024?',
    options: [
      'Environ 45%',
      'Environ 60%',
      'Environ 67%',
      'Environ 80%'
    ],
    correctAnswer: 2,
    explanation: 'En 2024, environ 67% de la population mondiale a accès à Internet, mais avec de grandes disparités selon les régions.',
    debatePrompt: 'Selon vous, quelles sont les principales conséquences de cette fracture numérique sur les pays en développement?'
  },

  // Science & Technology
  {
    id: 'q3',
    category: 'science',
    difficulty: 'medium',
    question: 'Quel élément chimique est le plus abondant dans l\'univers observable?',
    options: [
      'L\'oxygène',
      'Le carbone',
      'L\'hydrogène',
      'L\'hélium'
    ],
    correctAnswer: 2,
    explanation: 'L\'hydrogène représente environ 75% de la matière baryonique de l\'univers observable.',
    debatePrompt: 'Expliquez comment cet élément joue un rôle crucial dans la formation des étoiles et l\'évolution de l\'univers.'
  },
  {
    id: 'q4',
    category: 'technology',
    difficulty: 'hard',
    question: 'Qu\'est-ce que le "quantum computing" vise principalement à améliorer?',
    options: [
      'La vitesse des processeurs classiques',
      'La résolution de problèmes complexes impossibles pour les ordinateurs classiques',
      'La capacité de stockage des données',
      'La consommation énergétique des data centers'
    ],
    correctAnswer: 1,
    explanation: 'Les ordinateurs quantiques exploitent les propriétés de la mécanique quantique pour résoudre certains problèmes exponentiellement plus rapidement que les ordinateurs classiques.',
    debatePrompt: 'Quelles industries pensez-vous qui seront les plus transformées par l\'informatique quantique et pourquoi?',
    isPremium: true
  },

  // History
  {
    id: 'q5',
    category: 'history',
    difficulty: 'easy',
    question: 'En quelle année le mur de Berlin est-il tombé?',
    options: [
      '1987',
      '1989',
      '1991',
      '1993'
    ],
    correctAnswer: 1,
    explanation: 'Le mur de Berlin est tombé le 9 novembre 1989, marquant la fin symbolique de la Guerre froide.',
    debatePrompt: 'Quel impact la chute du mur de Berlin a-t-elle eu sur la politique mondiale actuelle?'
  },
  {
    id: 'q6',
    category: 'history',
    difficulty: 'hard',
    question: 'Qui a été le premier empereur de Chine à unifier le pays?',
    options: [
      'Confucius',
      'Qin Shi Huang',
      'Sun Tzu',
      'Liu Bang'
    ],
    correctAnswer: 1,
    explanation: 'Qin Shi Huang (259-210 av. J.-C.) fut le premier empereur de Chine unifiée et est connu pour avoir construit la Grande Muraille.',
    debatePrompt: 'Comparez les méthodes d\'unification de Qin Shi Huang avec celles d\'autres grands empereurs de l\'histoire.'
  },

  // Environment
  {
    id: 'q7',
    category: 'environment',
    difficulty: 'medium',
    question: 'Quel pays produit actuellement le plus d\'énergie solaire au monde?',
    options: [
      'Les États-Unis',
      'L\'Allemagne',
      'La Chine',
      'Le Japon'
    ],
    correctAnswer: 2,
    explanation: 'La Chine est de loin le plus grand producteur d\'énergie solaire au monde, avec plus de 30% de la capacité mondiale.',
    debatePrompt: 'Quels sont les avantages et inconvénients d\'une transition rapide vers l\'énergie solaire pour un pays?'
  },
  {
    id: 'q8',
    category: 'environment',
    difficulty: 'hard',
    question: 'Quel pourcentage des émissions mondiales de CO2 provient du transport maritime?',
    options: [
      'Environ 1%',
      'Environ 3%',
      'Environ 10%',
      'Environ 20%'
    ],
    correctAnswer: 1,
    explanation: 'Le transport maritime représente environ 3% des émissions mondiales de CO2, mais il transporte 90% du commerce mondial.',
    debatePrompt: 'Comment peut-on équilibrer la nécessité du commerce international avec la réduction des émissions du transport maritime?',
    isPremium: true
  },

  // Politics & Economics
  {
    id: 'q9',
    category: 'politics',
    difficulty: 'medium',
    question: 'Combien de pays sont membres permanents du Conseil de sécurité de l\'ONU?',
    options: [
      '3',
      '5',
      '7',
      '10'
    ],
    correctAnswer: 1,
    explanation: 'Les 5 membres permanents sont : États-Unis, Russie, Chine, Royaume-Uni et France. Ils possèdent tous un droit de veto.',
    debatePrompt: 'Pensez-vous que la composition actuelle du Conseil de sécurité reflète bien la géopolitique moderne? Pourquoi?'
  },

  // Sports
  {
    id: 'q10',
    category: 'sports',
    difficulty: 'easy',
    question: 'Quel pays a remporté le plus de Coupes du Monde de football?',
    options: [
      'L\'Argentine',
      'L\'Allemagne',
      'Le Brésil',
      'L\'Italie'
    ],
    correctAnswer: 2,
    explanation: 'Le Brésil a remporté 5 Coupes du Monde (1958, 1962, 1970, 1994, 2002), plus que tout autre pays.',
    debatePrompt: 'Quels facteurs expliquent la domination historique du Brésil dans le football mondial?'
  },

  // More questions for variety
  {
    id: 'q11',
    category: 'technology',
    difficulty: 'medium',
    question: 'Quelle entreprise a développé ChatGPT?',
    options: [
      'Google',
      'Meta',
      'OpenAI',
      'Microsoft'
    ],
    correctAnswer: 2,
    explanation: 'ChatGPT a été développé par OpenAI, une entreprise de recherche en intelligence artificielle.',
    debatePrompt: 'Quels sont les risques et opportunités de l\'intelligence artificielle générative pour la société?'
  },
  {
    id: 'q12',
    category: 'science',
    difficulty: 'hard',
    question: 'Quelle est la vitesse approximative de la lumière dans le vide?',
    options: [
      '300 000 km/s',
      '150 000 km/s',
      '450 000 km/s',
      '600 000 km/s'
    ],
    correctAnswer: 0,
    explanation: 'La vitesse de la lumière dans le vide est d\'environ 299 792 458 m/s, soit approximativement 300 000 km/s.',
    debatePrompt: 'Expliquez pourquoi la vitesse de la lumière est considérée comme une limite fondamentale de l\'univers.'
  },
  {
    id: 'q13',
    category: 'culture',
    difficulty: 'easy',
    question: 'Qui a écrit "1984"?',
    options: [
      'Aldous Huxley',
      'George Orwell',
      'Ray Bradbury',
      'Philip K. Dick'
    ],
    correctAnswer: 1,
    explanation: '"1984" a été écrit par George Orwell et publié en 1949. C\'est une dystopie totalitaire devenue un classique.',
    debatePrompt: 'En quoi les thèmes de "1984" sont-ils toujours pertinents dans notre société moderne?'
  },
  {
    id: 'q14',
    category: 'society',
    difficulty: 'medium',
    question: 'Quelle est approximativement la population mondiale en 2024?',
    options: [
      '6 milliards',
      '7 milliards',
      '8 milliards',
      '9 milliards'
    ],
    correctAnswer: 2,
    explanation: 'La population mondiale a dépassé les 8 milliards d\'habitants en 2024.',
    debatePrompt: 'Quels sont les principaux défis liés à la croissance démographique mondiale?',
    isPremium: true
  },
  {
    id: 'q15',
    category: 'environment',
    difficulty: 'medium',
    question: 'Quel accord international sur le climat a été signé en 2015?',
    options: [
      'Le Protocole de Kyoto',
      'L\'Accord de Paris',
      'Le Sommet de Rio',
      'Le Pacte de Copenhague'
    ],
    correctAnswer: 1,
    explanation: 'L\'Accord de Paris a été adopté en 2015 lors de la COP21, visant à limiter le réchauffement climatique.',
    debatePrompt: 'Les engagements de l\'Accord de Paris sont-ils suffisants pour lutter contre le changement climatique?'
  },

  // More Culture
  {
    id: 'q16',
    category: 'culture',
    difficulty: 'hard',
    question: 'Quel compositeur est connu pour avoir été sourd pendant une partie de sa carrière?',
    options: [
      'Wolfgang Amadeus Mozart',
      'Ludwig van Beethoven',
      'Johann Sebastian Bach',
      'Frédéric Chopin'
    ],
    correctAnswer: 1,
    explanation: 'Beethoven a commencé à perdre l\'audition vers l\'âge de 26 ans et a composé certaines de ses plus grandes œuvres alors qu\'il était complètement sourd.',
    debatePrompt: 'Comment la surdité de Beethoven a-t-elle pu influencer son style musical et sa créativité?'
  },
  {
    id: 'q17',
    category: 'culture',
    difficulty: 'easy',
    question: 'Quelle est la langue la plus parlée au monde en nombre de locuteurs natifs?',
    options: [
      'L\'anglais',
      'L\'espagnol',
      'Le mandarin',
      'L\'hindi'
    ],
    correctAnswer: 2,
    explanation: 'Le mandarin chinois compte environ 920 millions de locuteurs natifs, plus que toute autre langue.',
    debatePrompt: 'Pourquoi l\'anglais reste-t-il la langue internationale dominante malgré moins de locuteurs natifs?'
  },
  {
    id: 'q18',
    category: 'culture',
    difficulty: 'medium',
    question: 'Qui a peint le plafond de la Chapelle Sixtine?',
    options: [
      'Léonard de Vinci',
      'Raphaël',
      'Michel-Ange',
      'Le Caravage'
    ],
    correctAnswer: 2,
    explanation: 'Michel-Ange a peint les fresques du plafond de la Chapelle Sixtine entre 1508 et 1512, incluant la célèbre Création d\'Adam.',
    debatePrompt: 'Pourquoi cette œuvre est-elle considérée comme l\'une des plus grandes réalisations artistiques de l\'humanité?',
    isPremium: true
  },

  // More Science
  {
    id: 'q19',
    category: 'science',
    difficulty: 'easy',
    question: 'Combien de planètes compte notre système solaire?',
    options: [
      '7',
      '8',
      '9',
      '10'
    ],
    correctAnswer: 1,
    explanation: 'Depuis 2006, notre système solaire compte officiellement 8 planètes, Pluton ayant été reclassée comme planète naine.',
    debatePrompt: 'Pensez-vous que Pluton devrait être reconsidérée comme une planète? Quels critères définissent une planète?'
  },
  {
    id: 'q20',
    category: 'science',
    difficulty: 'hard',
    question: 'Quelle est la particule élémentaire découverte au CERN en 2012?',
    options: [
      'Le quark top',
      'Le neutrino',
      'Le boson de Higgs',
      'Le graviton'
    ],
    correctAnswer: 2,
    explanation: 'Le boson de Higgs a été découvert en 2012 au CERN, confirmant le mécanisme par lequel les particules acquièrent leur masse.',
    debatePrompt: 'Expliquez l\'importance du boson de Higgs pour notre compréhension de l\'univers.',
    isPremium: true
  },
  {
    id: 'q21',
    category: 'science',
    difficulty: 'medium',
    question: 'Quel est le plus grand organe du corps humain?',
    options: [
      'Le foie',
      'Le cerveau',
      'La peau',
      'Les poumons'
    ],
    correctAnswer: 2,
    explanation: 'La peau est le plus grand organe du corps humain, représentant environ 16% du poids corporel total.',
    debatePrompt: 'Quelles sont les fonctions essentielles de la peau au-delà de la simple protection?'
  },

  // More Technology
  {
    id: 'q22',
    category: 'technology',
    difficulty: 'easy',
    question: 'Qui est considéré comme le fondateur de Microsoft?',
    options: [
      'Steve Jobs',
      'Mark Zuckerberg',
      'Bill Gates',
      'Elon Musk'
    ],
    correctAnswer: 2,
    explanation: 'Bill Gates a co-fondé Microsoft avec Paul Allen en 1975.',
    debatePrompt: 'Quel impact Microsoft a-t-il eu sur la démocratisation de l\'informatique personnelle?'
  },
  {
    id: 'q23',
    category: 'technology',
    difficulty: 'medium',
    question: 'Quelle technologie permet aux voitures de se conduire de manière autonome?',
    options: [
      'Le GPS uniquement',
      'L\'intelligence artificielle et les capteurs',
      'La 5G',
      'La blockchain'
    ],
    correctAnswer: 1,
    explanation: 'Les voitures autonomes utilisent l\'IA, le machine learning, des caméras, des lidars et des capteurs pour naviguer.',
    debatePrompt: 'Quels sont les principaux obstacles éthiques et techniques à l\'adoption massive des voitures autonomes?'
  },
  {
    id: 'q24',
    category: 'technology',
    difficulty: 'hard',
    question: 'Qu\'est-ce que la blockchain?',
    options: [
      'Un type de cryptomonnaie',
      'Un registre distribué et décentralisé',
      'Un langage de programmation',
      'Un protocole de sécurité web'
    ],
    correctAnswer: 1,
    explanation: 'La blockchain est une technologie de registre distribué qui permet de stocker et transmettre des informations de manière transparente et sécurisée.',
    debatePrompt: 'Au-delà des cryptomonnaies, quelles sont les applications les plus prometteuses de la blockchain?',
    isPremium: true
  },

  // More History
  {
    id: 'q25',
    category: 'history',
    difficulty: 'medium',
    question: 'En quelle année a eu lieu la Révolution française?',
    options: [
      '1776',
      '1789',
      '1804',
      '1815'
    ],
    correctAnswer: 1,
    explanation: 'La Révolution française a commencé en 1789 avec la prise de la Bastille le 14 juillet.',
    debatePrompt: 'Quels principes de la Révolution française influencent encore les démocraties modernes?'
  },
  {
    id: 'q26',
    category: 'history',
    difficulty: 'hard',
    question: 'Qui était le pharaon égyptien lorsque les pyramides de Gizeh ont été construites?',
    options: [
      'Toutânkhamon',
      'Ramsès II',
      'Khéops',
      'Cléopâtre'
    ],
    correctAnswer: 2,
    explanation: 'La Grande Pyramide de Gizeh a été construite sous le règne du pharaon Khéops (Khufu) vers 2560 av. J.-C.',
    debatePrompt: 'Comment les anciens Égyptiens ont-ils pu construire de telles structures sans technologie moderne?',
    isPremium: true
  },
  {
    id: 'q27',
    category: 'history',
    difficulty: 'easy',
    question: 'Quel événement a marqué le début de la Seconde Guerre mondiale?',
    options: [
      'L\'attaque de Pearl Harbor',
      'L\'invasion de la Pologne',
      'Le débarquement en Normandie',
      'La bataille de Stalingrad'
    ],
    correctAnswer: 1,
    explanation: 'La Seconde Guerre mondiale a commencé le 1er septembre 1939 avec l\'invasion de la Pologne par l\'Allemagne nazie.',
    debatePrompt: 'Quelles leçons de la Seconde Guerre mondiale sont les plus importantes à retenir aujourd\'hui?'
  },

  // More Sports
  {
    id: 'q28',
    category: 'sports',
    difficulty: 'medium',
    question: 'Combien de joueurs composent une équipe de basketball sur le terrain?',
    options: [
      '5',
      '6',
      '7',
      '11'
    ],
    correctAnswer: 0,
    explanation: 'Une équipe de basketball compte 5 joueurs sur le terrain, bien que l\'effectif total soit plus large.',
    debatePrompt: 'Pourquoi le basketball est-il devenu un sport mondial si populaire?'
  },
  {
    id: 'q29',
    category: 'sports',
    difficulty: 'hard',
    question: 'Quel athlète détient le record du monde du 100 mètres?',
    options: [
      'Carl Lewis',
      'Usain Bolt',
      'Tyson Gay',
      'Asafa Powell'
    ],
    correctAnswer: 1,
    explanation: 'Usain Bolt détient le record du monde du 100 mètres avec un temps de 9,58 secondes, établi en 2009.',
    debatePrompt: 'Ce record de Bolt peut-il être battu? Quelles sont les limites physiologiques humaines?',
    isPremium: true
  },
  {
    id: 'q30',
    category: 'sports',
    difficulty: 'easy',
    question: 'Dans quel sport utilise-t-on une raquette et un volant?',
    options: [
      'Le tennis',
      'Le squash',
      'Le badminton',
      'Le ping-pong'
    ],
    correctAnswer: 2,
    explanation: 'Le badminton se joue avec une raquette et un volant (shuttlecock).',
    debatePrompt: 'Pourquoi le badminton est-il moins médiatisé que le tennis malgré sa popularité mondiale?'
  },

  // More Politics
  {
    id: 'q31',
    category: 'politics',
    difficulty: 'medium',
    question: 'Quel est le siège des Nations Unies?',
    options: [
      'Genève',
      'Bruxelles',
      'New York',
      'Paris'
    ],
    correctAnswer: 2,
    explanation: 'Le siège principal des Nations Unies est situé à New York, bien qu\'il existe d\'autres bureaux importants à Genève, Vienne et Nairobi.',
    debatePrompt: 'L\'ONU est-elle encore efficace pour maintenir la paix mondiale au 21ème siècle?'
  },
  {
    id: 'q32',
    category: 'politics',
    difficulty: 'hard',
    question: 'Combien de pays composent l\'Union Européenne en 2024?',
    options: [
      '25',
      '27',
      '28',
      '30'
    ],
    correctAnswer: 1,
    explanation: 'L\'Union Européenne compte 27 États membres depuis le départ du Royaume-Uni en 2020.',
    debatePrompt: 'Quels sont les avantages et inconvénients d\'une union politique et économique comme l\'UE?',
    isPremium: true
  },

  // More Environment
  {
    id: 'q33',
    category: 'environment',
    difficulty: 'easy',
    question: 'Quel gaz est principalement responsable de l\'effet de serre?',
    options: [
      'L\'oxygène',
      'L\'azote',
      'Le dioxyde de carbone',
      'L\'hélium'
    ],
    correctAnswer: 2,
    explanation: 'Le dioxyde de carbone (CO2) est le principal gaz à effet de serre d\'origine anthropique.',
    debatePrompt: 'Quelles actions individuelles ont le plus d\'impact sur la réduction des émissions de CO2?'
  },
  {
    id: 'q34',
    category: 'environment',
    difficulty: 'medium',
    question: 'Quelle est la principale cause de la déforestation en Amazonie?',
    options: [
      'Les incendies naturels',
      'L\'agriculture et l\'élevage',
      'L\'urbanisation',
      'L\'exploitation minière'
    ],
    correctAnswer: 1,
    explanation: 'L\'agriculture et l\'élevage, notamment pour le soja et le bétail, sont responsables d\'environ 80% de la déforestation amazonienne.',
    debatePrompt: 'Comment concilier développement économique et préservation de la forêt amazonienne?'
  },
  {
    id: 'q35',
    category: 'environment',
    difficulty: 'hard',
    question: 'Quel pourcentage de l\'eau douce mondiale est contenu dans les calottes glaciaires?',
    options: [
      'Environ 30%',
      'Environ 50%',
      'Environ 70%',
      'Environ 90%'
    ],
    correctAnswer: 2,
    explanation: 'Environ 68-70% de l\'eau douce de la planète est stockée dans les calottes glaciaires et les glaciers.',
    debatePrompt: 'Quelles seraient les conséquences de la fonte complète des calottes glaciaires?',
    isPremium: true
  },

  // More Society
  {
    id: 'q36',
    category: 'society',
    difficulty: 'medium',
    question: 'Quel réseau social a été lancé en premier?',
    options: [
      'Facebook',
      'Twitter',
      'MySpace',
      'Instagram'
    ],
    correctAnswer: 2,
    explanation: 'MySpace a été lancé en 2003, avant Facebook (2004), Twitter (2006) et Instagram (2010).',
    debatePrompt: 'Comment les réseaux sociaux ont-ils transformé la communication et les relations humaines?'
  },
  {
    id: 'q37',
    category: 'society',
    difficulty: 'hard',
    question: 'Quel est le pays le plus peuplé d\'Afrique?',
    options: [
      'L\'Égypte',
      'L\'Éthiopie',
      'Le Nigeria',
      'L\'Afrique du Sud'
    ],
    correctAnswer: 2,
    explanation: 'Le Nigeria est le pays le plus peuplé d\'Afrique avec plus de 220 millions d\'habitants.',
    debatePrompt: 'Quels défis et opportunités la croissance démographique de l\'Afrique présente-t-elle?',
    isPremium: true
  },
  {
    id: 'q38',
    category: 'society',
    difficulty: 'easy',
    question: 'Quelle est la monnaie utilisée au Japon?',
    options: [
      'Le yuan',
      'Le won',
      'Le yen',
      'Le baht'
    ],
    correctAnswer: 2,
    explanation: 'Le yen (¥) est la monnaie officielle du Japon depuis 1871.',
    debatePrompt: 'Pourquoi le yen est-il considéré comme une valeur refuge dans l\'économie mondiale?'
  },

  // Additional Culture Questions
  {
    id: 'q39',
    category: 'culture',
    difficulty: 'medium',
    question: 'Quel film a remporté le plus d\'Oscars dans l\'histoire du cinéma?',
    options: [
      'Titanic',
      'Ben-Hur',
      'Le Seigneur des Anneaux: Le Retour du Roi',
      'West Side Story'
    ],
    correctAnswer: 2,
    explanation: 'Le Seigneur des Anneaux: Le Retour du Roi, Ben-Hur et Titanic sont à égalité avec 11 Oscars chacun.',
    debatePrompt: 'Pourquoi les trilogies épiques comme Le Seigneur des Anneaux ont-elles autant de succès au cinéma?'
  },
  {
    id: 'q40',
    category: 'culture',
    difficulty: 'hard',
    question: 'Quel mouvement artistique était Pablo Picasso principalement associé?',
    options: [
      'L\'impressionnisme',
      'Le surréalisme',
      'Le cubisme',
      'L\'expressionnisme'
    ],
    correctAnswer: 2,
    explanation: 'Picasso est considéré comme le co-fondateur du cubisme avec Georges Braque au début du 20ème siècle.',
    debatePrompt: 'Comment le cubisme a-t-il changé notre façon de représenter la réalité dans l\'art?',
    isPremium: true
  },
  {
    id: 'q41',
    category: 'culture',
    difficulty: 'easy',
    question: 'Quelle pyramide antique fait partie des Sept Merveilles du monde antique?',
    options: [
      'Les pyramides de Teotihuacan',
      'Les pyramides de Gizeh',
      'Les pyramides mayas',
      'Les pyramides nubienne s'
    ],
    correctAnswer: 1,
    explanation: 'La Grande Pyramide de Gizeh est la seule des Sept Merveilles du monde antique encore debout.',
    debatePrompt: 'Pourquoi les pyramides continuent-elles de fasciner l\'humanité des millénaires après leur construction?'
  },
  {
    id: 'q42',
    category: 'culture',
    difficulty: 'medium',
    question: 'Quelle est la plus ancienne université encore en activité?',
    options: [
      'L\'Université d\'Oxford',
      'L\'Université de Bologne',
      'L\'Université Al-Azhar',
      'L\'Université de la Sorbonne'
    ],
    correctAnswer: 2,
    explanation: 'L\'Université Al-Azhar au Caire, fondée en 970, est considérée comme la plus ancienne université encore en activité.',
    debatePrompt: 'Quel rôle les universités anciennes jouent-elles dans la préservation du savoir?'
  },
  {
    id: 'q43',
    category: 'culture',
    difficulty: 'hard',
    question: 'Qui a écrit "Les Misérables"?',
    options: [
      'Alexandre Dumas',
      'Victor Hugo',
      'Émile Zola',
      'Honoré de Balzac'
    ],
    correctAnswer: 1,
    explanation: 'Victor Hugo a écrit Les Misérables, publié en 1862, l\'un des romans les plus célèbres de la littérature française.',
    debatePrompt: 'Pourquoi les thèmes des Misérables restent-ils pertinents dans la société actuelle?',
    isPremium: true
  },

  // Additional Science Questions
  {
    id: 'q44',
    category: 'science',
    difficulty: 'medium',
    question: 'Combien de chromosomes possède un être humain?',
    options: [
      '23',
      '46',
      '48',
      '92'
    ],
    correctAnswer: 1,
    explanation: 'Un être humain possède 46 chromosomes (23 paires), dont 44 autosomes et 2 chromosomes sexuels.',
    debatePrompt: 'Comment la compréhension de la génétique transforme-t-elle la médecine moderne?'
  },
  {
    id: 'q45',
    category: 'science',
    difficulty: 'hard',
    question: 'Quelle est la théorie qui explique l\'origine de l\'univers?',
    options: [
      'La théorie de l\'évolution',
      'La théorie du Big Bang',
      'La théorie de la relativité',
      'La théorie des cordes'
    ],
    correctAnswer: 1,
    explanation: 'La théorie du Big Bang explique que l\'univers s\'est formé à partir d\'un état extrêmement dense et chaud il y a environ 13,8 milliards d\'années.',
    debatePrompt: 'Quelles preuves scientifiques soutiennent la théorie du Big Bang?',
    isPremium: true
  },
  {
    id: 'q46',
    category: 'science',
    difficulty: 'easy',
    question: 'Quel est le symbole chimique de l\'or?',
    options: [
      'Or',
      'Au',
      'Ag',
      'Go'
    ],
    correctAnswer: 1,
    explanation: 'Le symbole chimique de l\'or est Au, dérivé du latin "aurum".',
    debatePrompt: 'Pourquoi l\'or a-t-il été si précieux tout au long de l\'histoire humaine?'
  },
  {
    id: 'q47',
    category: 'science',
    difficulty: 'medium',
    question: 'Quelle planète est surnommée la "planète rouge"?',
    options: [
      'Vénus',
      'Mars',
      'Jupiter',
      'Saturne'
    ],
    correctAnswer: 1,
    explanation: 'Mars est surnommée la planète rouge en raison de l\'oxyde de fer (rouille) présent sur sa surface.',
    debatePrompt: 'Mars pourrait-elle devenir habitable pour l\'humanité? Quels sont les défis?'
  },

  // Additional History Questions
  {
    id: 'q48',
    category: 'history',
    difficulty: 'medium',
    question: 'Qui a découvert l\'Amérique en 1492?',
    options: [
      'Amerigo Vespucci',
      'Christophe Colomb',
      'Vasco de Gama',
      'Ferdinand Magellan'
    ],
    correctAnswer: 1,
    explanation: 'Christophe Colomb a atteint les Amériques en 1492, bien que les Vikings et les peuples autochtones y étaient déjà présents.',
    debatePrompt: 'Comment la "découverte" de l\'Amérique a-t-elle changé le cours de l\'histoire mondiale?'
  },
  {
    id: 'q49',
    category: 'history',
    difficulty: 'hard',
    question: 'Quelle civilisation a construit Machu Picchu?',
    options: [
      'Les Aztèques',
      'Les Mayas',
      'Les Incas',
      'Les Olmèques'
    ],
    correctAnswer: 2,
    explanation: 'Machu Picchu a été construit par les Incas au 15ème siècle au Pérou.',
    debatePrompt: 'Pourquoi Machu Picchu était-il si important pour la civilisation inca?',
    isPremium: true
  },
  {
    id: 'q50',
    category: 'history',
    difficulty: 'easy',
    question: 'En quelle année a eu lieu le premier alunissage?',
    options: [
      '1965',
      '1969',
      '1971',
      '1975'
    ],
    correctAnswer: 1,
    explanation: 'Le premier alunissage a eu lieu le 20 juillet 1969 avec la mission Apollo 11 de la NASA.',
    debatePrompt: 'Quel impact les missions spatiales ont-elles eu sur la technologie et la société?'
  },
  {
    id: 'q51',
    category: 'history',
    difficulty: 'medium',
    question: 'Qui était le premier président des États-Unis?',
    options: [
      'Thomas Jefferson',
      'John Adams',
      'George Washington',
      'Benjamin Franklin'
    ],
    correctAnswer: 2,
    explanation: 'George Washington a été le premier président des États-Unis de 1789 à 1797.',
    debatePrompt: 'Comment les principes fondateurs des États-Unis influencent-ils encore la politique moderne?'
  },

  // Additional Technology Questions
  {
    id: 'q52',
    category: 'technology',
    difficulty: 'medium',
    question: 'Qu\'est-ce que le "cloud computing"?',
    options: [
      'Un type de météo',
      'Le stockage et traitement de données sur Internet',
      'Un système d\'exploitation',
      'Une nouvelle forme d\'énergie'
    ],
    correctAnswer: 1,
    explanation: 'Le cloud computing permet d\'accéder à des ressources informatiques via Internet plutôt que sur des serveurs locaux.',
    debatePrompt: 'Quels sont les avantages et risques du stockage de données dans le cloud?'
  },
  {
    id: 'q53',
    category: 'technology',
    difficulty: 'hard',
    question: 'Quelle est la différence principale entre l\'IA faible et l\'IA forte?',
    options: [
      'La vitesse de calcul',
      'La capacité de conscience et de compréhension générale',
      'Le coût de développement',
      'La consommation énergétique'
    ],
    correctAnswer: 1,
    explanation: 'L\'IA forte aurait une conscience et une intelligence générale comparable à l\'humain, contrairement à l\'IA faible spécialisée dans des tâches spécifiques.',
    debatePrompt: 'L\'IA forte est-elle réellement possible? Quels seraient les implications éthiques?',
    isPremium: true
  },
  {
    id: 'q54',
    category: 'technology',
    difficulty: 'easy',
    question: 'Quelle entreprise a créé l\'iPhone?',
    options: [
      'Samsung',
      'Google',
      'Apple',
      'Microsoft'
    ],
    correctAnswer: 2,
    explanation: 'Apple a lancé le premier iPhone en 2007, révolutionnant l\'industrie des smartphones.',
    debatePrompt: 'Comment les smartphones ont-ils transformé notre vie quotidienne?'
  },

  // Additional Environment Questions
  {
    id: 'q55',
    category: 'environment',
    difficulty: 'medium',
    question: 'Quelle est la principale source d\'énergie renouvelable dans le monde?',
    options: [
      'L\'éolien',
      'Le solaire',
      'L\'hydroélectricité',
      'La géothermie'
    ],
    correctAnswer: 2,
    explanation: 'L\'hydroélectricité est la source d\'énergie renouvelable la plus utilisée, représentant environ 16% de la production électrique mondiale.',
    debatePrompt: 'Quelles énergies renouvelables ont le plus de potentiel pour l\'avenir?'
  },
  {
    id: 'q56',
    category: 'environment',
    difficulty: 'hard',
    question: 'Combien d\'espèces animales disparaissent chaque jour selon les estimations?',
    options: [
      'Environ 10',
      'Environ 50',
      'Environ 150',
      'Environ 500'
    ],
    correctAnswer: 2,
    explanation: 'On estime qu\'environ 150 espèces disparaissent chaque jour, principalement à cause de l\'activité humaine.',
    debatePrompt: 'Comment peut-on ralentir l\'extinction massive actuelle des espèces?',
    isPremium: true
  },

  // Additional Sports Questions
  {
    id: 'q57',
    category: 'sports',
    difficulty: 'medium',
    question: 'Combien de disciplines olympiques y avait-il aux Jeux Olympiques d\'été de Paris 2024?',
    options: [
      '28',
      '32',
      '36',
      '40'
    ],
    correctAnswer: 1,
    explanation: 'Les Jeux Olympiques de Paris 2024 comprenaient 32 disciplines sportives.',
    debatePrompt: 'Les Jeux Olympiques devraient-ils continuer à ajouter de nouvelles disciplines?'
  },
  {
    id: 'q58',
    category: 'sports',
    difficulty: 'hard',
    question: 'Quel pays a le plus de médailles d\'or olympiques dans l\'histoire?',
    options: [
      'La Chine',
      'La Russie',
      'Les États-Unis',
      'Le Royaume-Uni'
    ],
    correctAnswer: 2,
    explanation: 'Les États-Unis ont remporté le plus grand nombre de médailles d\'or olympiques dans l\'histoire des Jeux.',
    debatePrompt: 'Le nombre de médailles reflète-t-il vraiment la puissance sportive d\'un pays?',
    isPremium: true
  },

  // Additional Politics Questions
  {
    id: 'q59',
    category: 'politics',
    difficulty: 'medium',
    question: 'Quelle organisation économique regroupe les pays les plus industrialisés?',
    options: [
      'L\'OPEP',
      'Le G7',
      'L\'OTAN',
      'L\'ASEAN'
    ],
    correctAnswer: 1,
    explanation: 'Le G7 (Groupe des Sept) regroupe les sept principales économies avancées du monde.',
    debatePrompt: 'Le G7 est-il encore pertinent face à l\'émergence de nouvelles puissances économiques?'
  },
  {
    id: 'q60',
    category: 'politics',
    difficulty: 'hard',
    question: 'Quelle est la durée du mandat présidentiel en France?',
    options: [
      '4 ans',
      '5 ans',
      '6 ans',
      '7 ans'
    ],
    correctAnswer: 1,
    explanation: 'Depuis 2000, le mandat présidentiel en France est de 5 ans (quinquennat), contre 7 ans auparavant.',
    debatePrompt: 'Un mandat de 5 ans est-il optimal pour permettre à un président de réaliser son programme?',
    isPremium: true
  },

  // Additional Society Questions
  {
    id: 'q61',
    category: 'society',
    difficulty: 'medium',
    question: 'Quelle ville est considérée comme le centre financier mondial?',
    options: [
      'Londres',
      'Tokyo',
      'New York',
      'Hong Kong'
    ],
    correctAnswer: 2,
    explanation: 'New York, avec Wall Street, est généralement considérée comme le principal centre financier mondial.',
    debatePrompt: 'Comment les centres financiers influencent-ils l\'économie mondiale?'
  },
  {
    id: 'q62',
    category: 'society',
    difficulty: 'easy',
    question: 'Quel est le réseau social le plus utilisé au monde?',
    options: [
      'Twitter/X',
      'Instagram',
      'Facebook',
      'TikTok'
    ],
    correctAnswer: 2,
    explanation: 'Facebook reste le réseau social le plus utilisé avec plus de 3 milliards d\'utilisateurs actifs mensuels.',
    debatePrompt: 'Les réseaux sociaux ont-ils un impact global positif ou négatif sur la société?'
  }
];

export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};

export const getFreeQuestions = (): Question[] => {
  return questions.filter(q => !q.isPremium);
};

export const getPremiumQuestions = (): Question[] => {
  return questions.filter(q => q.isPremium);
};

export const getRandomQuestions = (count: number, includePremium: boolean = false): Question[] => {
  const availableQuestions = includePremium ? questions : getFreeQuestions();
  const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
