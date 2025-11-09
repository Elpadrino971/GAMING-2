import { BookOpen, Target, MessageSquare, Trophy, Zap, Award, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

const HelpScreen = () => {
  const { setCurrentScreen } = useGameStore();

  const sections = [
    {
      icon: Target,
      title: 'Comment Jouer',
      color: 'from-blue-500 to-cyan-500',
      content: [
        '1. Choisis le nombre de questions (5, 10, 15 ou 20)',
        '2. Réponds aux questions en sélectionnant une option',
        '3. Obtiens des points selon la difficulté (Facile: 10pts, Moyen: 20pts, Difficile: 30pts)',
        '4. Lance un débat pour défendre ta réponse et gagner des points bonus',
      ],
    },
    {
      icon: MessageSquare,
      title: 'Système de Débat',
      color: 'from-purple-500 to-pink-500',
      content: [
        'Après chaque question, tu peux débattre avec l\'IA',
        'Écris un argument structuré avec des exemples et des faits',
        'L\'IA évalue 4 critères: Logique, Pertinence, Preuves, Clarté',
        'Chaque critère est noté de 0 à 10',
        'Le score total va de 0 à 100 points',
        'Un score de 70+ compte comme une victoire de débat',
      ],
    },
    {
      icon: Zap,
      title: 'Système de Combos',
      color: 'from-orange-500 to-red-500',
      content: [
        'Enchaîne les bonnes réponses pour construire un combo',
        'Chaque niveau de combo ajoute +2 points bonus',
        'Combo x5 = +10 points, Combo x10 = +20 points !',
        'Le combo se réinitialise si tu te trompes',
        'Ton meilleur combo est enregistré',
      ],
    },
    {
      icon: Award,
      title: 'Badges & Achievements',
      color: 'from-yellow-500 to-amber-500',
      content: [
        '25+ badges à débloquer en jouant',
        'Badges de débutant, de maîtrise, de séries',
        'Badges de performance (score parfait, combos)',
        'Badges d\'expertise par catégorie',
        'Badges spéciaux (night owl, early bird)',
      ],
    },
    {
      icon: Trophy,
      title: 'Progression & XP',
      color: 'from-green-500 to-emerald-500',
      content: [
        'Gagne de l\'XP avec chaque partie jouée',
        'Monte de niveau tous les 500 XP',
        'Les niveaux débloquent de nouveaux badges',
        'Maintiens une série quotidienne pour des bonus',
        'Compare ton score au classement mondial',
      ],
    },
  ];

  const tips = [
    {
      emoji: '💡',
      title: 'Prends ton temps',
      text: 'Lis bien chaque question et toutes les options avant de répondre',
    },
    {
      emoji: '📚',
      title: 'Argumente avec des faits',
      text: 'Dans les débats, utilise des exemples concrets et des données',
    },
    {
      emoji: '🎯',
      title: 'Vise le combo',
      text: 'Enchaîne les bonnes réponses pour maximiser tes points',
    },
    {
      emoji: '🔥',
      title: 'Série quotidienne',
      text: 'Joue chaque jour pour maintenir ta série et débloquer des badges',
    },
    {
      emoji: '💎',
      title: 'Questions premium',
      text: 'Passe en Premium pour accéder à plus de questions et tournois exclusifs',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </button>

        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className="text-primary-400" size={40} />
          <h1 className="text-4xl font-bold">Comment Jouer</h1>
        </div>
        <p className="text-gray-400">
          Tout ce que tu dois savoir pour devenir un maître de Truth Battle
        </p>
      </motion.div>

      {/* Main Sections */}
      <div className="space-y-6 mb-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2 text-gray-300">
                    <span className="text-primary-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-2 border-primary-500/30 mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">💡 Astuces Pro</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{tip.emoji}</span>
                <h3 className="font-bold">{tip.title}</h3>
              </div>
              <p className="text-sm text-gray-400">{tip.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">📚 Catégories de Questions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Culture', icon: '🎨' },
            { name: 'Science', icon: '🔬' },
            { name: 'Histoire', icon: '📜' },
            { name: 'Technologie', icon: '💻' },
            { name: 'Environnement', icon: '🌍' },
            { name: 'Sports', icon: '⚽' },
            { name: 'Politique', icon: '🏛️' },
            { name: 'Société', icon: '👥' },
          ].map((cat, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-sm font-medium">{cat.name}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scoring Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card"
      >
        <h2 className="text-2xl font-bold mb-4">📊 Tableau des Scores</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
            <span className="font-medium">Questions Faciles</span>
            <span className="text-green-400 font-bold">10 points</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
            <span className="font-medium">Questions Moyennes</span>
            <span className="text-yellow-400 font-bold">20 points</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
            <span className="font-medium">Questions Difficiles</span>
            <span className="text-red-400 font-bold">30 points</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
            <span className="font-medium">Débat (max)</span>
            <span className="text-purple-400 font-bold">100 points</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg">
            <span className="font-medium">Bonus Combo (par niveau)</span>
            <span className="text-orange-400 font-bold">+2 points</span>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center mt-8"
      >
        <button
          onClick={() => setCurrentScreen('home')}
          className="btn-primary"
        >
          Commencer à Jouer ! 🚀
        </button>
      </motion.div>
    </div>
  );
};

export default HelpScreen;
