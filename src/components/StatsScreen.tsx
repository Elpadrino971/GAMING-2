import { useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { loadGameStats, loadGameHistory } from '../utils/storage';
import { BarChart3, TrendingUp, Target, Zap, Calendar, Award, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { playClick } from '../utils/sounds';

const StatsScreen = () => {
  const { setCurrentScreen, user } = useGameStore();
  const stats = loadGameStats();
  const history = loadGameHistory();

  // Calculate statistics
  const totalGames = history.length;
  const avgScore = totalGames > 0
    ? Math.round(history.reduce((sum, game) => sum + game.score, 0) / totalGames)
    : 0;
  const avgDebateScore = totalGames > 0
    ? Math.round(history.reduce((sum, game) => sum + game.debateScore, 0) / totalGames)
    : 0;
  const bestGame = history.length > 0
    ? history.reduce((best, game) => (game.score + game.debateScore) > (best.score + best.debateScore) ? game : best)
    : null;

  // Calculate category distribution
  const categoryStats = useMemo(() => {
    const categories: Record<string, number> = {};
    history.forEach(game => {
      game.categories.forEach(cat => {
        categories[cat] = (categories[cat] || 0) + 1;
      });
    });
    return Object.entries(categories).map(([name, count]) => ({
      name,
      count,
      percentage: (count / (totalGames || 1)) * 100
    }));
  }, [history, totalGames]);

  // Calculate difficulty distribution
  const difficultyStats = useMemo(() => {
    const difficulties: Record<string, { correct: number; total: number }> = {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 }
    };

    history.forEach(game => {
      game.questions.forEach(q => {
        difficulties[q.difficulty].total++;
        if (q.correct) difficulties[q.difficulty].correct++;
      });
    });

    return Object.entries(difficulties).map(([name, data]) => ({
      name,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      total: data.total
    }));
  }, [history]);

  // Last 10 games for chart
  const recentGames = history.slice(-10).reverse();

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button
          onClick={() => {
            playClick();
            setCurrentScreen('profile');
          }}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Retour au Profil</span>
        </button>

        <div className="flex items-center space-x-3 mb-2">
          <BarChart3 className="text-primary-400" size={40} />
          <h1 className="text-4xl font-bold">Statistiques Détaillées</h1>
        </div>
        <p className="text-gray-400">
          Analyse complète de tes performances
        </p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-blue-400" size={24} />
            <span className="text-3xl font-bold text-blue-400">{totalGames}</span>
          </div>
          <div className="text-sm text-gray-300">Parties Jouées</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30"
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="text-green-400" size={24} />
            <span className="text-3xl font-bold text-green-400">{avgScore}</span>
          </div>
          <div className="text-sm text-gray-300">Score Moyen Quiz</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30"
        >
          <div className="flex items-center justify-between mb-2">
            <Zap className="text-purple-400" size={24} />
            <span className="text-3xl font-bold text-purple-400">{avgDebateScore}</span>
          </div>
          <div className="text-sm text-gray-300">Score Moyen Débat</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="card bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30"
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="text-orange-400" size={24} />
            <span className="text-3xl font-bold text-orange-400">{stats.currentStreak}</span>
          </div>
          <div className="text-sm text-gray-300">Série Actuelle</div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <TrendingUp className="text-primary-400" size={24} />
            <span>Évolution des Scores (10 dernières parties)</span>
          </h2>

          {recentGames.length > 0 ? (
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={200 - (y * 2)}
                    x2="400"
                    y2={200 - (y * 2)}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                ))}

                {/* Score line */}
                <polyline
                  points={recentGames
                    .map((game, i) => {
                      const x = (i / (recentGames.length - 1 || 1)) * 400;
                      const y = 200 - ((game.score / 300) * 200);
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                />

                {/* Debate score line */}
                <polyline
                  points={recentGames
                    .map((game, i) => {
                      const x = (i / (recentGames.length - 1 || 1)) * 400;
                      const y = 200 - ((game.debateScore / 300) * 200);
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="rgb(168, 85, 247)"
                  strokeWidth="2"
                />

                {/* Data points */}
                {recentGames.map((game, i) => {
                  const x = (i / (recentGames.length - 1 || 1)) * 400;
                  const yQuiz = 200 - ((game.score / 300) * 200);
                  const yDebate = 200 - ((game.debateScore / 300) * 200);
                  return (
                    <g key={i}>
                      <circle cx={x} cy={yQuiz} r="4" fill="rgb(59, 130, 246)" />
                      <circle cx={x} cy={yDebate} r="4" fill="rgb(168, 85, 247)" />
                    </g>
                  );
                })}
              </svg>

              <div className="flex justify-center space-x-4 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-400">Score Quiz</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-400">Score Débat</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              Aucune partie jouée
            </div>
          )}
        </motion.div>

        {/* Difficulty Accuracy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Target className="text-primary-400" size={24} />
            <span>Précision par Difficulté</span>
          </h2>

          <div className="space-y-4">
            {difficultyStats.map((stat, index) => {
              const colors = {
                easy: 'from-green-500 to-emerald-500',
                medium: 'from-yellow-500 to-orange-500',
                hard: 'from-red-500 to-pink-500'
              };

              return (
                <div key={stat.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="capitalize font-medium">
                      {stat.name === 'easy' ? 'Facile' : stat.name === 'medium' ? 'Moyen' : 'Difficile'}
                    </span>
                    <span className="text-gray-400">
                      {stat.accuracy}% ({stat.total} questions)
                    </span>
                  </div>
                  <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.accuracy}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${colors[stat.name as keyof typeof colors]} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overall accuracy */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400">
                {stats.totalQuestions > 0
                  ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
                  : 0}%
              </div>
              <div className="text-sm text-gray-400">Précision Globale</div>
            </div>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <h2 className="text-xl font-bold mb-4">📚 Répartition des Catégories</h2>

          {categoryStats.length > 0 ? (
            <div className="space-y-3">
              {categoryStats.slice(0, 8).map((cat, index) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{cat.name}</span>
                    <span className="text-gray-400">{cat.count} parties</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ delay: 0.7 + index * 0.05, duration: 0.6 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Aucune donnée disponible
            </div>
          )}
        </motion.div>

        {/* Best Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/30"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Award className="text-yellow-400" size={24} />
            <span>Meilleure Performance</span>
          </h2>

          {bestGame ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-400">{bestGame.score}</div>
                  <div className="text-xs text-gray-400">Score Quiz</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-400">{bestGame.debateScore}</div>
                  <div className="text-xs text-gray-400">Score Débat</div>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Score Total</span>
                  <span className="text-2xl font-bold text-yellow-400">
                    {bestGame.score + bestGame.debateScore}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Combo Max</span>
                  <span className="font-bold text-orange-400">x{bestGame.maxCombo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Date</span>
                  <span className="text-sm">{new Date(bestGame.timestamp).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="text-xs text-gray-400 text-center">
                Continue à t'améliorer pour battre ce record! 🏆
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Joue ta première partie pour voir tes stats
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsScreen;
