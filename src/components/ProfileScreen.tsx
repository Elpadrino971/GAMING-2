import { useGameStore } from '../store/gameStore';
import { User, TrendingUp, Award, Target, Crown, Edit, BarChart3, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { playClick } from '../utils/sounds';

const ProfileScreen = () => {
  const { user, setCurrentScreen } = useGameStore();

  if (!user) {
    return <div>Loading...</div>;
  }

  const xpToNextLevel = user.level * 500;
  const xpProgress = (user.xp / xpToNextLevel) * 100;
  const accuracy = user.stats.totalQuestions > 0
    ? Math.round((user.stats.correctAnswers / user.stats.totalQuestions) * 100)
    : 0;

  const stats = [
    {
      icon: Target,
      label: 'Questions répondues',
      value: user.stats.totalQuestions,
      color: 'text-blue-400',
    },
    {
      icon: TrendingUp,
      label: 'Taux de réussite',
      value: `${accuracy}%`,
      color: 'text-green-400',
    },
    {
      icon: Award,
      label: 'Débats gagnés',
      value: user.stats.debatesWon,
      color: 'text-purple-400',
    },
    {
      icon: Award,
      label: 'Série actuelle',
      value: `${user.stats.streak} 🔥`,
      color: 'text-orange-400',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-3xl font-bold">
              {user.username[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-gray-400">Niveau {user.level}</span>
                {user.isPremium && (
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-xs px-2 py-1 rounded-full font-bold flex items-center space-x-1">
                    <Crown size={12} />
                    <span>PREMIUM</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Edit size={16} />
            <span>Modifier</span>
          </button>
        </div>

        {/* XP Progress */}
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progression vers niveau {user.level + 1}</span>
            <span>{user.xp} / {xpToNextLevel} XP</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-4 text-center"
              >
                <Icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              playClick();
              setCurrentScreen('stats');
            }}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <BarChart3 size={20} />
            <span>Statistiques Détaillées</span>
          </button>
          <button
            onClick={() => {
              playClick();
              setCurrentScreen('history');
            }}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <History size={20} />
            <span>Historique des Parties</span>
          </button>
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card mb-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Award className="text-yellow-400" size={24} />
          <h2 className="text-xl font-bold">Badges débloqués</h2>
          <span className="text-sm text-gray-400">({user.badges.length})</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-white/5 hover:bg-white/10 rounded-lg p-4 text-center transition-all cursor-pointer"
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <div className="font-bold mb-1">{badge.name}</div>
              <div className="text-xs text-gray-400">{badge.description}</div>
            </div>
          ))}
          {/* Locked badges */}
          {[1, 2, 3].map((i) => (
            <div
              key={`locked-${i}`}
              className="bg-white/5 rounded-lg p-4 text-center opacity-40"
            >
              <div className="text-4xl mb-2">🔒</div>
              <div className="font-bold mb-1 text-sm">Badge verrouillé</div>
              <div className="text-xs text-gray-400">À débloquer</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Debate Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-xl font-bold mb-4">Performance en Débat</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Débats participés</span>
              <span className="font-bold">{user.stats.debatesParticipated}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Débats gagnés</span>
              <span className="font-bold text-green-400">{user.stats.debatesWon}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Score moyen</span>
              <span className="font-bold text-primary-400">
                {user.stats.averageDebateScore}/10
              </span>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Taux de victoire</div>
            <div className="flex items-center space-x-4">
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600"
                  style={{
                    width: `${
                      user.stats.debatesParticipated > 0
                        ? (user.stats.debatesWon / user.stats.debatesParticipated) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="text-lg font-bold">
                {user.stats.debatesParticipated > 0
                  ? Math.round((user.stats.debatesWon / user.stats.debatesParticipated) * 100)
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {!user.isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mt-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="text-yellow-400" size={24} />
                <h3 className="text-xl font-bold">Passe en Premium</h3>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✨ Questions exclusives</li>
                <li>🏆 Accès aux tournois premium</li>
                <li>🎯 IA plus sophistiquée</li>
                <li>📊 Statistiques avancées</li>
              </ul>
            </div>
            <button className="btn-secondary">
              S'abonner
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileScreen;
