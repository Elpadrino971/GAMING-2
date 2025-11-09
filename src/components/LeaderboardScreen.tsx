import { useState } from 'react';
import { Trophy, Medal, TrendingUp, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock leaderboard data (in production, this would come from a backend)
const mockLeaderboard = [
  {
    rank: 1,
    user: { id: '1', username: 'DebateMaster', level: 15, isPremium: true },
    score: 12450,
    debateScore: 8750,
  },
  {
    rank: 2,
    user: { id: '2', username: 'LogicKing', level: 14, isPremium: true },
    score: 11890,
    debateScore: 8320,
  },
  {
    rank: 3,
    user: { id: '3', username: 'QuizHero', level: 13, isPremium: false },
    score: 10560,
    debateScore: 7890,
  },
  {
    rank: 4,
    user: { id: '4', username: 'TruthSeeker', level: 12, isPremium: true },
    score: 9870,
    debateScore: 7234,
  },
  {
    rank: 5,
    user: { id: '5', username: 'BrainPower', level: 11, isPremium: false },
    score: 8950,
    debateScore: 6543,
  },
  {
    rank: 6,
    user: { id: '6', username: 'PhiloQuest', level: 10, isPremium: true },
    score: 8234,
    debateScore: 6123,
  },
  {
    rank: 7,
    user: { id: '7', username: 'SmartTalker', level: 9, isPremium: false },
    score: 7654,
    debateScore: 5678,
  },
  {
    rank: 8,
    user: { id: '8', username: 'FactChecker', level: 9, isPremium: false },
    score: 7123,
    debateScore: 5234,
  },
];

type TimeFrame = 'today' | 'week' | 'month' | 'alltime';

const LeaderboardScreen = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('alltime');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Trophy className="text-yellow-400" size={32} />
            <h1 className="text-3xl font-bold">Classement</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm"
            >
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="alltime">Tous temps</option>
            </select>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {mockLeaderboard.slice(0, 3).map((entry, index) => {
            const positions = [1, 0, 2]; // Center the #1
            const actualIndex = positions.indexOf(index);
            const heights = ['h-32', 'h-40', 'h-24'];

            return (
              <motion.div
                key={entry.user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: actualIndex * 0.1 }}
                className={`order-${positions[index]}`}
              >
                <div className="text-center mb-2">
                  <div className="text-4xl mb-2">{getRankIcon(entry.rank)}</div>
                  <div className="font-bold">{entry.user.username}</div>
                  {entry.user.isPremium && (
                    <div className="text-xs text-yellow-400">⭐ PREMIUM</div>
                  )}
                </div>
                <div
                  className={`${heights[index]} bg-gradient-to-t ${getRankColor(
                    entry.rank
                  )} rounded-t-lg flex flex-col items-center justify-center`}
                >
                  <div className="text-2xl font-bold">{entry.score}</div>
                  <div className="text-xs opacity-80">points</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rest of leaderboard */}
        <div className="space-y-2">
          {mockLeaderboard.slice(3).map((entry, index) => (
            <motion.div
              key={entry.user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 3) * 0.05 }}
              className="bg-white/5 hover:bg-white/10 rounded-lg p-4 flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center font-bold">
                  #{entry.rank}
                </div>
                <div>
                  <div className="font-bold flex items-center space-x-2">
                    <span>{entry.user.username}</span>
                    {entry.user.isPremium && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                        PRO
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">Niveau {entry.user.level}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-400">{entry.score}</div>
                <div className="text-xs text-gray-400 flex items-center space-x-1">
                  <TrendingUp size={12} />
                  <span>Débat: {entry.debateScore}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-2 border-primary-500/30"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Medal className="text-primary-400" size={24} />
          <h3 className="text-xl font-bold">Ta Position</h3>
        </div>
        <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center font-bold text-xl">
              #47
            </div>
            <div>
              <div className="font-bold text-lg">TruthSeeker</div>
              <div className="text-sm text-gray-400">Continue pour monter!</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-400">1250</div>
            <div className="text-xs text-gray-400">points</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardScreen;
