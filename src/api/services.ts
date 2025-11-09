import { apiClient } from './client';
import { API_ENDPOINTS, type ApiResponse } from './config';
import type { User, Question, DebateArgument } from '../types';

// Authentication Service
export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
    }
    return response;
  },

  async register(userData: { username: string; email: string; password: string }): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
    }
    return response;
  },

  async logout(): Promise<ApiResponse> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    apiClient.clearToken();
    return response;
  },

  async verifyToken(): Promise<ApiResponse<User>> {
    return apiClient.get(API_ENDPOINTS.AUTH.VERIFY);
  },
};

// User Service
export const userService = {
  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get(API_ENDPOINTS.USER.PROFILE);
  },

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put(API_ENDPOINTS.USER.PROFILE, data);
  },

  async getStats(): Promise<ApiResponse<any>> {
    return apiClient.get(API_ENDPOINTS.USER.STATS);
  },

  async getBadges(): Promise<ApiResponse<any>> {
    return apiClient.get(API_ENDPOINTS.USER.BADGES);
  },
};

// Questions Service
export const questionsService = {
  async getRandomQuestions(count: number, includePremium: boolean = false): Promise<ApiResponse<Question[]>> {
    return apiClient.get(`${API_ENDPOINTS.QUESTIONS.RANDOM}?count=${count}&premium=${includePremium}`);
  },

  async getQuestionsByCategory(category: string): Promise<ApiResponse<Question[]>> {
    return apiClient.get(API_ENDPOINTS.QUESTIONS.BY_CATEGORY.replace(':category', category));
  },

  async getQuestionsByDifficulty(difficulty: string): Promise<ApiResponse<Question[]>> {
    return apiClient.get(API_ENDPOINTS.QUESTIONS.BY_DIFFICULTY.replace(':difficulty', difficulty));
  },

  async getPremiumQuestions(): Promise<ApiResponse<Question[]>> {
    return apiClient.get(API_ENDPOINTS.QUESTIONS.PREMIUM);
  },
};

// Debates Service
export const debatesService = {
  async evaluateArgument(data: {
    questionId: string;
    selectedAnswer: number;
    argument: string;
  }): Promise<ApiResponse<DebateArgument>> {
    return apiClient.post(API_ENDPOINTS.DEBATES.EVALUATE, data);
  },

  async getHistory(): Promise<ApiResponse<DebateArgument[]>> {
    return apiClient.get(API_ENDPOINTS.DEBATES.HISTORY);
  },

  async submitDebate(data: DebateArgument): Promise<ApiResponse> {
    return apiClient.post(API_ENDPOINTS.DEBATES.SUBMIT, data);
  },
};

// Games Service
export const gamesService = {
  async startGame(questionCount: number): Promise<ApiResponse<{ gameId: string; questions: Question[] }>> {
    return apiClient.post(API_ENDPOINTS.GAMES.START, { questionCount });
  },

  async submitGame(data: {
    gameId: string;
    score: number;
    debateScore: number;
    answers: any[];
  }): Promise<ApiResponse> {
    return apiClient.post(API_ENDPOINTS.GAMES.SUBMIT, data);
  },

  async getHistory(): Promise<ApiResponse<any[]>> {
    return apiClient.get(API_ENDPOINTS.GAMES.HISTORY);
  },

  async getStats(): Promise<ApiResponse<any>> {
    return apiClient.get(API_ENDPOINTS.GAMES.STATS);
  },
};

// Leaderboard Service
export const leaderboardService = {
  async getGlobalLeaderboard(): Promise<ApiResponse<any[]>> {
    return apiClient.get(API_ENDPOINTS.LEADERBOARD.GLOBAL);
  },

  async getDailyLeaderboard(): Promise<ApiResponse<any[]>> {
    return apiClient.get(API_ENDPOINTS.LEADERBOARD.DAILY);
  },

  async getWeeklyLeaderboard(): Promise<ApiResponse<any[]>> {
    return apiClient.get(API_ENDPOINTS.LEADERBOARD.WEEKLY);
  },

  async getMonthlyLeaderboard(): Promise<ApiResponse<any[]>> {
    return apiClient.get(API_ENDPOINTS.LEADERBOARD.MONTHLY);
  },
};

// Tournaments Service
export const tournamentsService = {
  async getActiveTournaments(): Promise<ApiResponse<any[]>> {
    return apiClient.get(API_ENDPOINTS.TOURNAMENTS.ACTIVE);
  },

  async joinTournament(tournamentId: string): Promise<ApiResponse> {
    return apiClient.post(API_ENDPOINTS.TOURNAMENTS.JOIN.replace(':id', tournamentId));
  },

  async getTournamentLeaderboard(tournamentId: string): Promise<ApiResponse<any[]>> {
    return apiClient.get(API_ENDPOINTS.TOURNAMENTS.LEADERBOARD.replace(':id', tournamentId));
  },
};

// Daily Challenge Service
export const dailyChallengeService = {
  async getTodayChallenge(): Promise<ApiResponse<any>> {
    return apiClient.get(API_ENDPOINTS.DAILY.TODAY);
  },

  async submitChallenge(data: any): Promise<ApiResponse> {
    return apiClient.post(API_ENDPOINTS.DAILY.SUBMIT, data);
  },

  async getStreak(): Promise<ApiResponse<{ current: number; longest: number }>> {
    return apiClient.get(API_ENDPOINTS.DAILY.STREAK);
  },
};

// Premium Service
export const premiumService = {
  async subscribe(plan: string): Promise<ApiResponse> {
    return apiClient.post(API_ENDPOINTS.PREMIUM.SUBSCRIBE, { plan });
  },

  async cancelSubscription(): Promise<ApiResponse> {
    return apiClient.post(API_ENDPOINTS.PREMIUM.CANCEL);
  },

  async getStatus(): Promise<ApiResponse<{ isPremium: boolean; expiresAt?: number }>> {
    return apiClient.get(API_ENDPOINTS.PREMIUM.STATUS);
  },
};
