// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
  },

  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    STATS: '/user/stats',
    BADGES: '/user/badges',
    SETTINGS: '/user/settings',
  },

  // Questions
  QUESTIONS: {
    LIST: '/questions',
    RANDOM: '/questions/random',
    BY_CATEGORY: '/questions/category/:category',
    BY_DIFFICULTY: '/questions/difficulty/:difficulty',
    PREMIUM: '/questions/premium',
  },

  // Debates
  DEBATES: {
    EVALUATE: '/debates/evaluate',
    HISTORY: '/debates/history',
    SUBMIT: '/debates/submit',
  },

  // Games
  GAMES: {
    START: '/games/start',
    SUBMIT: '/games/submit',
    HISTORY: '/games/history',
    STATS: '/games/stats',
  },

  // Leaderboard
  LEADERBOARD: {
    GLOBAL: '/leaderboard/global',
    DAILY: '/leaderboard/daily',
    WEEKLY: '/leaderboard/weekly',
    MONTHLY: '/leaderboard/monthly',
    BY_CATEGORY: '/leaderboard/category/:category',
  },

  // Tournaments
  TOURNAMENTS: {
    LIST: '/tournaments',
    ACTIVE: '/tournaments/active',
    JOIN: '/tournaments/:id/join',
    LEADERBOARD: '/tournaments/:id/leaderboard',
    SUBMIT: '/tournaments/:id/submit',
  },

  // Social
  SOCIAL: {
    SHARE: '/social/share',
    FRIENDS: '/social/friends',
    CHALLENGES: '/social/challenges',
  },

  // Premium
  PREMIUM: {
    SUBSCRIBE: '/premium/subscribe',
    CANCEL: '/premium/cancel',
    STATUS: '/premium/status',
  },

  // Daily Challenge
  DAILY: {
    TODAY: '/daily/today',
    SUBMIT: '/daily/submit',
    STREAK: '/daily/streak',
  },
};

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: number;
    requestId: string;
  };
}

// API Error Codes
export const API_ERRORS = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  RATE_LIMIT: 'RATE_LIMIT',
};
