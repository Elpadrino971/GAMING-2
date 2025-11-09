import { User, DebateArgument } from '../types';

const STORAGE_KEYS = {
  USER: 'truthbattle_user',
  DEBATE_HISTORY: 'truthbattle_debates',
  GAME_STATS: 'truthbattle_stats',
  GAME_HISTORY: 'truthbattle_game_history',
  SETTINGS: 'truthbattle_settings',
  DAILY_CHALLENGE: 'truthbattle_daily',
};

// User Storage
export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const loadUser = (): User | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user:', error);
    return null;
  }
};

export const updateUser = (updates: Partial<User>): void => {
  const user = loadUser();
  if (user) {
    saveUser({ ...user, ...updates });
  }
};

// Debate History Storage
export const saveDebateHistory = (debates: DebateArgument[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DEBATE_HISTORY, JSON.stringify(debates));
  } catch (error) {
    console.error('Error saving debate history:', error);
  }
};

export const loadDebateHistory = (): DebateArgument[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DEBATE_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading debate history:', error);
    return [];
  }
};

export const addDebateToHistory = (debate: DebateArgument): void => {
  const history = loadDebateHistory();
  history.push(debate);
  // Keep only last 100 debates
  if (history.length > 100) {
    history.shift();
  }
  saveDebateHistory(history);
};

// Game Stats Storage
export interface GameStats {
  totalGamesPlayed: number;
  totalScore: number;
  totalDebateScore: number;
  totalQuestions: number;
  correctAnswers: number;
  lastPlayedDate: number;
  longestStreak: number;
  currentStreak: number;
}

// Game History Storage
export interface GameHistory {
  id: string;
  timestamp: number;
  score: number;
  debateScore: number;
  maxCombo: number;
  questions: Array<{
    question: string;
    category: string;
    difficulty: string;
    correct: boolean;
    points: number;
  }>;
  categories: string[];
}

export const saveGameStats = (stats: GameStats): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATS, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving game stats:', error);
  }
};

export const loadGameStats = (): GameStats => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GAME_STATS);
    return data ? JSON.parse(data) : {
      totalGamesPlayed: 0,
      totalScore: 0,
      totalDebateScore: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      lastPlayedDate: 0,
      longestStreak: 0,
      currentStreak: 0,
    };
  } catch (error) {
    console.error('Error loading game stats:', error);
    return {
      totalGamesPlayed: 0,
      totalScore: 0,
      totalDebateScore: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      lastPlayedDate: 0,
      longestStreak: 0,
      currentStreak: 0,
    };
  }
};

export const updateGameStats = (score: number, debateScore: number, questionsAnswered: number, correctAnswers: number): void => {
  const stats = loadGameStats();
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  // Update streak
  const daysSinceLastPlay = Math.floor((now - stats.lastPlayedDate) / oneDayMs);
  if (daysSinceLastPlay === 1) {
    // Consecutive day
    stats.currentStreak += 1;
  } else if (daysSinceLastPlay > 1) {
    // Streak broken
    stats.currentStreak = 1;
  }

  stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
  stats.totalGamesPlayed += 1;
  stats.totalScore += score;
  stats.totalDebateScore += debateScore;
  stats.totalQuestions += questionsAnswered;
  stats.correctAnswers += correctAnswers;
  stats.lastPlayedDate = now;

  saveGameStats(stats);
};

// Game History Storage Functions
export const saveGameHistory = (history: GameHistory[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving game history:', error);
  }
};

export const loadGameHistory = (): GameHistory[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GAME_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading game history:', error);
    return [];
  }
};

export const addGameToHistory = (game: GameHistory): void => {
  const history = loadGameHistory();
  history.push(game);
  // Keep only last 100 games
  if (history.length > 100) {
    history.shift();
  }
  saveGameHistory(history);
};

// Settings Storage
interface Settings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  notifications: boolean;
  theme: 'dark' | 'light' | 'auto';
  language: 'fr' | 'en';
}

export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const loadSettings = (): Settings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      soundEnabled: true,
      musicEnabled: false,
      notifications: true,
      theme: 'dark',
      language: 'fr',
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      soundEnabled: true,
      musicEnabled: false,
      notifications: true,
      theme: 'dark',
      language: 'fr',
    };
  }
};

// Daily Challenge Storage
interface DailyChallenge {
  date: string;
  questionIds: string[];
  completed: boolean;
  score: number;
}

export const saveDailyChallenge = (challenge: DailyChallenge): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE, JSON.stringify(challenge));
  } catch (error) {
    console.error('Error saving daily challenge:', error);
  }
};

export const loadDailyChallenge = (): DailyChallenge | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGE);
    if (!data) return null;

    const challenge: DailyChallenge = JSON.parse(data);
    const today = new Date().toISOString().split('T')[0];

    // Return null if challenge is from a different day
    if (challenge.date !== today) {
      return null;
    }

    return challenge;
  } catch (error) {
    console.error('Error loading daily challenge:', error);
    return null;
  }
};

// Clear all data
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Export data as JSON (for backup)
export const exportUserData = (): string => {
  const data = {
    user: loadUser(),
    debates: loadDebateHistory(),
    stats: loadGameStats(),
    history: loadGameHistory(),
    settings: loadSettings(),
    exportDate: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
};

// Import data from JSON (for restore)
export const importUserData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);

    if (data.user) saveUser(data.user);
    if (data.debates) saveDebateHistory(data.debates);
    if (data.stats) saveGameStats(data.stats);
    if (data.history) saveGameHistory(data.history);
    if (data.settings) saveSettings(data.settings);

    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};
