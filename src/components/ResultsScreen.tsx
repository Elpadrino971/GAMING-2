import { useGameStore } from '../store/gameStore';
import { Trophy, Target, MessageSquare, TrendingUp, Share2, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useState, useEffect, useRef } from 'react';
import ShareCard from './ShareCard';
import { addGameToHistory, updateGameStats } from '../utils/storage';
import type { GameHistory } from '../utils/storage';

const ResultsScreen = () => {
  const { score, debateScore, debateHistory, setCurrentScreen, resetGame, user, correctAnswers, bestCombo, currentQuestionIndex } = useGameStore();
  const [showConfetti, setShowConfetti] = useState(true);
  const [showShareCard, setShowShareCard] = useState(false);
  const gameSaved = useRef(false);

  // Save game to history (only once)
  useEffect(() => {
    if (!gameSaved.current && user) {
      const gameHistory: GameHistory = {
        id: 'game-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        score,
        debateScore,
        maxCombo: bestCombo || 0,
        questions: [], // We'll add this when gameStore tracks questions
        categories: [], // Extract from questions
      };

      addGameToHistory(gameHistory);
      updateGameStats(score, debateScore, currentQuestionIndex + 1, correctAnswers);
      gameSaved.current = true;
    }
  }, [score, debateScore, bestCombo, correctAnswers, currentQuestionIndex, user]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const totalScore = score + debateScore;
  const questionsAnswered = 10; // This should come from game state
  const debatesParticipated = debateHistory.length;
  const averageDebateScore = debatesParticipated > 0
    ? Math.round(debateHistory.reduce((acc, d) => acc + d.score, 0) / debatesParticipated)
    : 0;

  const getPerformanceMessage = () => {
    if (totalScore >= 800) return { text: 'Performance Légendaire! 🌟', color: 'text-yellow-400' };
    if (totalScore >= 600) return { text: 'Excellente Performance! 🏆', color: 'text-green-400' };
    if (totalScore >= 400) return { text: 'Bonne Performance! 👏', color: 'text-blue-400' };
    return { text: 'Continue à pratiquer! 💪', color: 'text-purple-400' };
  };

  const performance = getPerformanceMessage();

  const handleShare = () => {
    setShowShareCard(true);
  };

  const handlePlayAgain = () => {
    resetGame();
    setCurrentScreen('home');
  };

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      {showShareCard && user && (
        <ShareCard
          score={score}
          debateScore={debateScore}
          totalQuestions={questionsAnswered}
          correctAnswers={correctAnswers}
          username={user.username}
          level={user.level}
          onClose={() => setShowShareCard(false)}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card text-center mb-6"
        >
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold mb-2">Partie Terminée!</h1>
          <p className={`text-2xl font-bold mb-6 ${performance.color}`}>
            {performance.text}
          </p>

          <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl p-8 mb-6">
            <div className="text-sm text-gray-400 mb-2">Score Total</div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-7xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent"
            >
              {totalScore}
            </motion.div>
            <div className="text-sm text-gray-400 mt-2">points</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4">
              <Target className="mx-auto mb-2 text-primary-400" size={32} />
              <div className="text-2xl font-bold text-primary-400">{score}</div>
              <div className="text-sm text-gray-400">Points Quiz</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <MessageSquare className="mx-auto mb-2 text-secondary-400" size={32} />
              <div className="text-2xl font-bold text-secondary-400">{debateScore}</div>
              <div className="text-sm text-gray-400">Points Débats</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="text-primary-400" size={24} />
            <h2 className="text-xl font-bold">Statistiques de la partie</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{questionsAnswered}</div>
              <div className="text-sm text-gray-400">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{debatesParticipated}</div>
              <div className="text-sm text-gray-400">Débats</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{averageDebateScore}</div>
              <div className="text-sm text-gray-400">Moy. Débat</div>
            </div>
          </div>
        </motion.div>

        {debateHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card mb-6"
          >
            <h3 className="text-xl font-bold mb-4">Tes Meilleurs Débats</h3>
            <div className="space-y-3">
              {debateHistory
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map((debate, index) => (
                  <div key={debate.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">Débat #{index + 1}</span>
                      <span className="text-2xl font-bold text-primary-400">
                        {debate.score}pts
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {debate.userArgument}
                    </p>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-4"
        >
          <button
            onClick={handleShare}
            className="btn-secondary flex-1 flex items-center justify-center space-x-2"
          >
            <Share2 size={20} />
            <span>Partager</span>
          </button>
          <button
            onClick={handlePlayAgain}
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <Home size={20} />
            <span>Rejouer</span>
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default ResultsScreen;
