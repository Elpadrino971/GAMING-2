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
