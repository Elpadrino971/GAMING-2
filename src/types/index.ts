export interface Question {
  id: string;
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  debatePrompt: string;
  isPremium?: boolean;
}

export type QuestionCategory =
  | 'culture'
  | 'science'
  | 'history'
  | 'society'
  | 'technology'
  | 'sports'
  | 'politics'
  | 'environment';

export interface DebateArgument {
  id: string;
  questionId: string;
  userArgument: string;
  aiResponse: string;
  score: number;
  evaluation: ArgumentEvaluation;
  timestamp: number;
}

export interface ArgumentEvaluation {
  logic: number; // 0-10
  relevance: number; // 0-10
  evidence: number; // 0-10
  clarity: number; // 0-10
  totalScore: number; // 0-100
  feedback: string;
}

export interface User {
  id: string;
  username: string;
  level: number;
  xp: number;
  isPremium: boolean;
  stats: UserStats;
  badges: Badge[];
}

export interface UserStats {
  totalQuestions: number;
  correctAnswers: number;
  debatesWon: number;
  debatesParticipated: number;
  averageDebateScore: number;
  streak: number;
  bestStreak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: number;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: number;
  endDate: number;
  prize: string;
  participants: number;
  isPremium: boolean;
  status: 'upcoming' | 'active' | 'completed';
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  debateScore: number;
}

export type GameScreen =
  | 'home'
  | 'quiz'
  | 'debate'
  | 'results'
  | 'leaderboard'
  | 'profile'
  | 'tournaments'
  | 'help'
  | 'stats'
  | 'history';
