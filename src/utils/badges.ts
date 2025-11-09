import { Badge } from '../types';

export const availableBadges: Badge[] = [
  // Beginner Badges
  {
    id: 'first-question',
    name: 'Premier Pas',
    description: 'Répondre à ta première question',
    icon: '🎯',
    earnedAt: 0,
  },
  {
    id: 'first-debate',
    name: 'Débatteur Novice',
    description: 'Participer à ton premier débat',
    icon: '💬',
    earnedAt: 0,
  },
  {
    id: 'first-win',
    name: 'Première Victoire',
    description: 'Gagner ton premier débat (score ≥ 70)',
    icon: '🏆',
    earnedAt: 0,
  },

  // Question Milestones
  {
    id: 'questions-10',
    name: 'Curieux',
    description: 'Répondre à 10 questions',
    icon: '🤔',
    earnedAt: 0,
  },
  {
    id: 'questions-50',
    name: 'Érudit',
    description: 'Répondre à 50 questions',
    icon: '📚',
    earnedAt: 0,
  },
  {
    id: 'questions-100',
    name: 'Expert',
    description: 'Répondre à 100 questions',
    icon: '🎓',
    earnedAt: 0,
  },
  {
    id: 'questions-500',
    name: 'Maître du Savoir',
    description: 'Répondre à 500 questions',
    icon: '🧙',
    earnedAt: 0,
  },

  // Debate Milestones
  {
    id: 'debates-10',
    name: 'Orateur',
    description: 'Participer à 10 débats',
    icon: '🗣️',
    earnedAt: 0,
  },
  {
    id: 'debates-50',
    name: 'Rhétoricien',
    description: 'Participer à 50 débats',
    icon: '💭',
    earnedAt: 0,
  },
  {
    id: 'debates-won-10',
    name: 'Débatteur Accompli',
    description: 'Gagner 10 débats',
    icon: '🏅',
    earnedAt: 0,
  },
  {
    id: 'debates-won-50',
    name: 'Maître du Débat',
    description: 'Gagner 50 débats',
    icon: '👑',
    earnedAt: 0,
  },

  // Streak Badges
  {
    id: 'streak-3',
    name: 'Régulier',
    description: 'Série de 3 jours',
    icon: '🔥',
    earnedAt: 0,
  },
  {
    id: 'streak-7',
    name: 'Assidu',
    description: 'Série de 7 jours',
    icon: '⚡',
    earnedAt: 0,
  },
  {
    id: 'streak-30',
    name: 'Dévoué',
    description: 'Série de 30 jours',
    icon: '💎',
    earnedAt: 0,
  },
  {
    id: 'streak-100',
    name: 'Légende',
    description: 'Série de 100 jours',
    icon: '🌟',
    earnedAt: 0,
  },

  // Performance Badges
  {
    id: 'perfect-score',
    name: 'Score Parfait',
    description: 'Obtenir 100/100 dans un débat',
    icon: '💯',
    earnedAt: 0,
  },
  {
    id: 'combo-5',
    name: 'En Série',
    description: '5 bonnes réponses d\'affilée',
    icon: '🎯',
    earnedAt: 0,
  },
  {
    id: 'combo-10',
    name: 'Sans Faute',
    description: '10 bonnes réponses d\'affilée',
    icon: '🔥',
    earnedAt: 0,
  },
  {
    id: 'high-scorer',
    name: 'Grand Scoreur',
    description: 'Atteindre 1000 points totaux',
    icon: '💰',
    earnedAt: 0,
  },

  // Category Expertise
  {
    id: 'science-expert',
    name: 'Expert Science',
    description: '20 bonnes réponses en Science',
    icon: '🔬',
    earnedAt: 0,
  },
  {
    id: 'culture-expert',
    name: 'Expert Culture',
    description: '20 bonnes réponses en Culture',
    icon: '🎨',
    earnedAt: 0,
  },
  {
    id: 'history-expert',
    name: 'Expert Histoire',
    description: '20 bonnes réponses en Histoire',
    icon: '📜',
    earnedAt: 0,
  },

  // Special Badges
  {
    id: 'speed-demon',
    name: 'Éclair',
    description: 'Finir un quiz en moins de 2 minutes',
    icon: '⚡',
    earnedAt: 0,
  },
  {
    id: 'night-owl',
    name: 'Oiseau de Nuit',
    description: 'Jouer après minuit',
    icon: '🦉',
    earnedAt: 0,
  },
  {
    id: 'early-bird',
    name: 'Lève-tôt',
    description: 'Jouer avant 6h du matin',
    icon: '🐦',
    earnedAt: 0,
  },
];

export const checkBadgeUnlock = (
  badgeId: string,
  userStats: {
    totalQuestions: number;
    correctAnswers: number;
    debatesWon: number;
    debatesParticipated: number;
    streak: number;
    bestStreak: number;
  },
  currentScore?: number,
  debateScore?: number,
  combo?: number
): boolean => {
  switch (badgeId) {
    case 'first-question':
      return userStats.totalQuestions >= 1;
    case 'first-debate':
      return userStats.debatesParticipated >= 1;
    case 'first-win':
      return userStats.debatesWon >= 1;
    case 'questions-10':
      return userStats.totalQuestions >= 10;
    case 'questions-50':
      return userStats.totalQuestions >= 50;
    case 'questions-100':
      return userStats.totalQuestions >= 100;
    case 'questions-500':
      return userStats.totalQuestions >= 500;
    case 'debates-10':
      return userStats.debatesParticipated >= 10;
    case 'debates-50':
      return userStats.debatesParticipated >= 50;
    case 'debates-won-10':
      return userStats.debatesWon >= 10;
    case 'debates-won-50':
      return userStats.debatesWon >= 50;
    case 'streak-3':
      return userStats.bestStreak >= 3;
    case 'streak-7':
      return userStats.bestStreak >= 7;
    case 'streak-30':
      return userStats.bestStreak >= 30;
    case 'streak-100':
      return userStats.bestStreak >= 100;
    case 'perfect-score':
      return debateScore === 100;
    case 'combo-5':
      return (combo || 0) >= 5;
    case 'combo-10':
      return (combo || 0) >= 10;
    case 'high-scorer':
      return (currentScore || 0) >= 1000;
    default:
      return false;
  }
};

export const getNewlyUnlockedBadges = (
  currentBadges: Badge[],
  userStats: any,
  currentScore?: number,
  debateScore?: number,
  combo?: number
): Badge[] => {
  const unlockedBadgeIds = currentBadges.map(b => b.id);
  const newBadges: Badge[] = [];

  availableBadges.forEach(badge => {
    if (!unlockedBadgeIds.includes(badge.id)) {
      if (checkBadgeUnlock(badge.id, userStats, currentScore, debateScore, combo)) {
        newBadges.push({
          ...badge,
          earnedAt: Date.now(),
        });
      }
    }
  });

  return newBadges;
};
