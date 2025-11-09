import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { getRandomQuestions } from '../data/questions';
import { Sparkles, Brain, TrendingUp, Crown, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { playClick } from '../utils/sounds';

const HomeScreen = () => {
  const { setCurrentScreen, setCurrentQuestion, resetGame, user } = useGameStore();
  const [questionCount, setQuestionCount] = useState(5);

  const startGame = () => {
    playClick();
    resetGame();
    const questions = getRandomQuestions(questionCount, user?.isPremium || false);
    if (questions.length > 0) {
      setCurrentQuestion(questions[0]);
      setCurrentScreen('quiz');
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'Quiz Intelligent',
      description: 'Questions variées sur culture, science, société',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Sparkles,
      title: 'Débat avec l\'IA',
      description: 'Défends tes réponses face à une IA contradictoire',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Système de Points',
      description: 'Gagne des points selon la qualité de tes arguments',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Crown,
      title: 'Classements & Tournois',
      description: 'Compétition mondiale avec récompenses',
      color: 'from-yellow-500 to-amber-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent">
          Truth Battle
        </h1>
        <p className="text-xl text-gray-300 mb-2">
          Le quiz où tu débats avec l'IA et prouves tes arguments
        </p>
        <p className="text-sm text-gray-400">
          Réponds aux questions, défends tes choix, monte au classement!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:scale-105 transition-transform cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="card max-w-2xl mx-auto text-center"
      >
        <h2 className="text-2xl font-bold mb-6">Commencer une partie</h2>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">
            Nombre de questions
          </label>
          <div className="flex justify-center space-x-4">
            {[5, 10, 15, 20].map((count) => (
              <button
                key={count}
                onClick={() => {
                  playClick();
                  setQuestionCount(count);
                }}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  questionCount === count
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white scale-110'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {!user?.isPremium && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-yellow-400 mb-2">
              <Crown size={20} />
              <span className="font-bold">Version Gratuite</span>
            </div>
            <p className="text-sm text-gray-300">
              Passez en Premium pour accéder à plus de questions, des sujets exclusifs et des tournois avec prix!
            </p>
          </div>
        )}

        <button
          onClick={startGame}
          className="btn-primary w-full text-xl py-4"
        >
          Lancer le Quiz 🚀
        </button>

        <button
          onClick={() => {
            playClick();
            setCurrentScreen('help');
          }}
          className="mt-4 w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors py-2"
        >
          <HelpCircle size={20} />
          <span>Comment Jouer ?</span>
        </button>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          {user && (
            <>
              <div>
                <div className="text-2xl font-bold text-primary-400">
                  {user.stats.totalQuestions}
                </div>
                <div className="text-xs text-gray-400">Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-400">
                  {user.stats.debatesWon}
                </div>
                <div className="text-xs text-gray-400">Débats gagnés</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {user.stats.streak} 🔥
                </div>
                <div className="text-xs text-gray-400">Série actuelle</div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HomeScreen;
