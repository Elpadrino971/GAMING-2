import { Question } from '../types';
import { loadGameStats } from './storage';

export const getDailyChallenge = (): {
  questions: Question[];
  date: string;
  bonus: number;
} => {
  const today = new Date().toISOString().split('T')[0];

  // Use date as seed for consistent daily questions
  const seed = today.split('-').reduce((acc, val) => acc + parseInt(val), 0);

  return {
    questions: [], // Would be populated from questions array
    date: today,
    bonus: 50, // Bonus points for completing daily challenge
  };
};

export const checkDailyChallengeCompleted = (): boolean => {
  const stats = loadGameStats();
  const today = new Date().toISOString().split('T')[0];
  const lastPlayedDate = new Date(stats.lastPlayedDate).toISOString().split('T')[0];

  return lastPlayedDate === today;
};

export const getDailyChallengeStreak = (): number => {
  const stats = loadGameStats();
  return stats.currentStreak;
};
