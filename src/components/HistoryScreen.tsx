import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { loadGameHistory } from '../utils/storage';
import { History, Filter, Search, Download, ArrowLeft, CheckCircle, XCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick } from '../utils/sounds';

type FilterType = 'all' | 'today' | 'week' | 'month';

const HistoryScreen = () => {
  const { setCurrentScreen } = useGameStore();
  const history = loadGameHistory();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGame, setExpandedGame] = useState<string | null>(null);

  // Filter games by date
  const filteredGames = useMemo(() => {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    let filtered = history;

    switch (filter) {
      case 'today':
        filtered = history.filter(game => now - game.timestamp < dayMs);
        break;
      case 'week':
        filtered = history.filter(game => now - game.timestamp < dayMs * 7);
        break;
      case 'month':
        filtered = history.filter(game => now - game.timestamp < dayMs * 30);
        break;
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(game =>
        game.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered.reverse(); // Most recent first
  }, [history, filter, searchTerm]);

  const exportToCSV = () => {
    playClick();
    const headers = ['Date', 'Score Quiz', 'Score Débat', 'Score Total', 'Combo Max', 'Catégories', 'Questions'];
    const rows = history.map(game => [
      new Date(game.timestamp).toISOString(),
      game.score,
      game.debateScore,
      game.score + game.debateScore,
      game.maxCombo,
      game.categories.join(';'),
      game.questions.length
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `truth-battle-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

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

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <History className="text-primary-400" size={40} />
              <h1 className="text-4xl font-bold">Historique des Parties</h1>
            </div>
            <p className="text-gray-400">
              {filteredGames.length} partie{filteredGames.length > 1 ? 's' : ''} trouvée{filteredGames.length > 1 ? 's' : ''}
            </p>
          </div>

          <button
            onClick={exportToCSV}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download size={20} />
            <span className="hidden md:inline">Exporter CSV</span>
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Date filters */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <div className="flex space-x-2">
              {(['all', 'today', 'week', 'month'] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    playClick();
                    setFilter(f);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === f
                      ? 'bg-primary-500 text-white'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {f === 'all' ? 'Tout' : f === 'today' ? 'Aujourd\'hui' : f === 'week' ? 'Semaine' : 'Mois'}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
        </div>
      </motion.div>

      {/* Games List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredGames.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card text-center py-12"
            >
              <div className="text-gray-500 mb-2">Aucune partie trouvée</div>
              <div className="text-sm text-gray-600">
                {filter !== 'all' ? 'Essaie de changer le filtre' : 'Joue ta première partie!'}
              </div>
            </motion.div>
          ) : (
            filteredGames.map((game, index) => {
              const isExpanded = expandedGame === game.id;
              const totalScore = game.score + game.debateScore;

              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="card hover:border-primary-500/50 transition-colors cursor-pointer"
                  onClick={() => {
                    playClick();
                    setExpandedGame(isExpanded ? null : game.id);
                  }}
                >
                  {/* Summary */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        totalScore >= 200 ? 'bg-green-500/20' :
                        totalScore >= 100 ? 'bg-yellow-500/20' :
                        'bg-red-500/20'
                      }`}>
                        {totalScore >= 200 ? '🏆' :
                         totalScore >= 100 ? '⭐' : '📝'}
                      </div>

                      <div>
                        <div className="font-bold text-lg">
                          {new Date(game.timestamp).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="text-sm text-gray-400">
                          {game.questions.length} questions • {game.categories.slice(0, 3).join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-400">{totalScore}</div>
                        <div className="text-xs text-gray-400">
                          Quiz: {game.score} • Débat: {game.debateScore}
                        </div>
                      </div>

                      {game.maxCombo > 0 && (
                        <div className="flex items-center space-x-1 text-orange-400">
                          <Zap size={16} />
                          <span className="font-bold">x{game.maxCombo}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                        <h3 className="font-bold mb-3">Détails des Questions</h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {game.questions.map((q, i) => (
                            <div
                              key={i}
                              className={`p-3 rounded-lg ${
                                q.correct ? 'bg-green-500/10' : 'bg-red-500/10'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-2 flex-1">
                                  {q.correct ? (
                                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                                  ) : (
                                    <XCircle className="text-red-400 mt-1 flex-shrink-0" size={16} />
                                  )}
                                  <div className="flex-1">
                                    <div className="text-sm">{q.question}</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                      Catégorie: {q.category} • Difficulté: {
                                        q.difficulty === 'easy' ? 'Facile' :
                                        q.difficulty === 'medium' ? 'Moyen' : 'Difficile'
                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className={`text-sm font-bold ${q.correct ? 'text-green-400' : 'text-red-400'}`}>
                                  {q.correct ? '+' : ''}{q.points} pts
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Stats summary */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                          <div className="bg-white/5 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold text-green-400">
                              {game.questions.filter(q => q.correct).length}
                            </div>
                            <div className="text-xs text-gray-400">Correctes</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold text-red-400">
                              {game.questions.filter(q => !q.correct).length}
                            </div>
                            <div className="text-xs text-gray-400">Incorrectes</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold text-primary-400">
                              {Math.round((game.questions.filter(q => q.correct).length / game.questions.length) * 100)}%
                            </div>
                            <div className="text-xs text-gray-400">Précision</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HistoryScreen;
