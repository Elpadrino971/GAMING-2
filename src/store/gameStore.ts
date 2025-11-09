import { create } from 'zustand';
import { Question, DebateArgument, User, GameScreen, LeaderboardEntry } from '../types';
import {
  saveUser,
  loadUser,
  addDebateToHistory,
  loadDebateHistory,
  updateGameStats
} from '../utils/storage';

interface GameState {
  // Game state
  currentScreen: GameScreen;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  score: number;
  debateScore: number;
  isDebateMode: boolean;
  combo: number;
  bestCombo: number;
  correctAnswers: number;

  // User state
  user: User | null;

  // Debate state
  currentDebate: DebateArgument | null;
  debateHistory: DebateArgument[];

  // Leaderboard
  leaderboard: LeaderboardEntry[];

  // Actions
  setCurrentScreen: (screen: GameScreen) => void;
  setCurrentQuestion: (question: Question) => void;
  selectAnswer: (answerIndex: number) => void;
  startDebate: () => void;
  submitDebate: (argument: DebateArgument) => void;
  nextQuestion: () => void;
  addScore: (points: number) => void;
  resetGame: () => void;
  setUser: (user: User) => void;
  updateCombo: (isCorrect: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Initial state - load from localStorage if available
  currentScreen: 'home',
  currentQuestion: null,
  currentQuestionIndex: 0,
  selectedAnswer: null,
  score: 0,
  debateScore: 0,
  isDebateMode: false,
  combo: 0,
  bestCombo: 0,
  correctAnswers: 0,
  user: loadUser(),
  currentDebate: null,
  debateHistory: loadDebateHistory(),
  leaderboard: [],

  // Actions
  setCurrentScreen: (screen) => set({ currentScreen: screen }),

  setCurrentQuestion: (question) => set({
    currentQuestion: question,
    selectedAnswer: null,
    isDebateMode: false,
  }),

  selectAnswer: (answerIndex) => set({ selectedAnswer: answerIndex }),

  startDebate: () => set({ isDebateMode: true }),

  submitDebate: (argument) => set((state) => {
    // Save to localStorage
    addDebateToHistory(argument);

    // Update user stats
    if (state.user) {
      const updatedUser = {
        ...state.user,
        stats: {
          ...state.user.stats,
          debatesParticipated: state.user.stats.debatesParticipated + 1,
          debatesWon: argument.score >= 70
            ? state.user.stats.debatesWon + 1
            : state.user.stats.debatesWon,
          averageDebateScore: (
            (state.user.stats.averageDebateScore * state.user.stats.debatesParticipated + argument.score / 10) /
            (state.user.stats.debatesParticipated + 1)
          ),
        },
      };
      saveUser(updatedUser);

      return {
        currentDebate: argument,
        debateHistory: [...state.debateHistory, argument],
        debateScore: state.debateScore + argument.score,
        user: updatedUser,
      };
    }

    return {
      currentDebate: argument,
      debateHistory: [...state.debateHistory, argument],
      debateScore: state.debateScore + argument.score,
    };
  }),

  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1,
    currentQuestion: null,
    selectedAnswer: null,
    isDebateMode: false,
    currentDebate: null,
  })),

  addScore: (points) => set((state) => ({ score: state.score + points })),

  updateCombo: (isCorrect) => set((state) => {
    const newCombo = isCorrect ? state.combo + 1 : 0;
    const newCorrectAnswers = isCorrect ? state.correctAnswers + 1 : state.correctAnswers;
    return {
      combo: newCombo,
      bestCombo: Math.max(state.bestCombo, newCombo),
      correctAnswers: newCorrectAnswers,
    };
  }),

  resetGame: () => set((state) => {
    // Save game stats before resetting
    if (state.score > 0 || state.debateScore > 0) {
      updateGameStats(state.score, state.debateScore);

      // Update user XP and level
      if (state.user) {
        const totalPoints = state.score + state.debateScore;
        const newXP = state.user.xp + totalPoints;
        const xpPerLevel = 500;
        const newLevel = Math.floor(newXP / xpPerLevel) + 1;

        const updatedUser = {
          ...state.user,
          xp: newXP,
          level: Math.max(state.user.level, newLevel),
          stats: {
            ...state.user.stats,
            totalQuestions: state.user.stats.totalQuestions + (state.currentQuestionIndex + 1),
            correctAnswers: state.user.stats.correctAnswers + state.correctAnswers,
          },
        };
        saveUser(updatedUser);

        return {
          currentQuestionIndex: 0,
          currentQuestion: null,
          selectedAnswer: null,
          score: 0,
          debateScore: 0,
          isDebateMode: false,
          currentDebate: null,
          debateHistory: loadDebateHistory(),
          combo: 0,
          bestCombo: 0,
          correctAnswers: 0,
          user: updatedUser,
        };
      }
    }

    return {
      currentQuestionIndex: 0,
      currentQuestion: null,
      selectedAnswer: null,
      score: 0,
      debateScore: 0,
      isDebateMode: false,
      currentDebate: null,
      debateHistory: loadDebateHistory(),
      combo: 0,
      bestCombo: 0,
      correctAnswers: 0,
    };
  }),

  setUser: (user) => {
    saveUser(user);
    set({ user });
  },
}));
