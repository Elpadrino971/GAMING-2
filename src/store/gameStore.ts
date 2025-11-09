import { create } from 'zustand';
import { Question, DebateArgument, User, GameScreen, LeaderboardEntry } from '../types';

interface GameState {
  // Game state
  currentScreen: GameScreen;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  score: number;
  debateScore: number;
  isDebateMode: boolean;

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
}

export const useGameStore = create<GameState>((set) => ({
  // Initial state
  currentScreen: 'home',
  currentQuestion: null,
  currentQuestionIndex: 0,
  selectedAnswer: null,
  score: 0,
  debateScore: 0,
  isDebateMode: false,
  user: null,
  currentDebate: null,
  debateHistory: [],
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

  submitDebate: (argument) => set((state) => ({
    currentDebate: argument,
    debateHistory: [...state.debateHistory, argument],
    debateScore: state.debateScore + argument.score,
  })),

  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1,
    currentQuestion: null,
    selectedAnswer: null,
    isDebateMode: false,
    currentDebate: null,
  })),

  addScore: (points) => set((state) => ({ score: state.score + points })),

  resetGame: () => set({
    currentQuestionIndex: 0,
    currentQuestion: null,
    selectedAnswer: null,
    score: 0,
    debateScore: 0,
    isDebateMode: false,
    currentDebate: null,
    debateHistory: [],
  }),

  setUser: (user) => set({ user }),
}));
