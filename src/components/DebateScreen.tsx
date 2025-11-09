import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { evaluateArgument } from '../utils/aiDebate';
import { Send, Loader, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const DebateScreen = () => {
  const {
    currentQuestion,
    selectedAnswer,
    submitDebate,
    currentDebate,
    setCurrentScreen,
  } = useGameStore();

  const [userArgument, setUserArgument] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  if (!currentQuestion) {
    setCurrentScreen('home');
    return null;
  }

  const handleSubmitArgument = async () => {
    if (!userArgument.trim()) return;

    setIsEvaluating(true);

    // Simulate AI evaluation (in production, this would call a real AI API)
    const debate = await evaluateArgument(
      currentQuestion,
      selectedAnswer || 0,
      userArgument
    );

    submitDebate(debate);
    setIsEvaluating(false);
  };

  const handleContinue = () => {
    setCurrentScreen('quiz');
  };

  const isCorrectAnswer = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          Débat avec l'IA
        </h1>
        <p className="text-gray-400 mb-6">
          Défends ta réponse avec des arguments solides. L'IA va évaluer ta logique, pertinence et clarté.
        </p>

        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-400 mb-2">Question</div>
          <div className="font-bold mb-4">{currentQuestion.question}</div>
          <div className="text-sm text-gray-400 mb-2">Ta réponse</div>
          <div className={`font-medium ${
            isCorrectAnswer ? 'text-green-400' : 'text-red-400'
          }`}>
            {currentQuestion.options[selectedAnswer || 0]}
          </div>
        </div>

        <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4 mb-6">
          <div className="font-bold mb-2">Sujet de débat:</div>
          <p className="text-gray-300">{currentQuestion.debatePrompt}</p>
        </div>
      </motion.div>

      {!currentDebate ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <label className="block text-sm font-medium mb-2">
            Ton argument
          </label>
          <textarea
            value={userArgument}
            onChange={(e) => setUserArgument(e.target.value)}
            placeholder="Explique ton raisonnement, donne des exemples, des faits... Sois convaincant!"
            className="input-field min-h-[200px] resize-none mb-4"
            disabled={isEvaluating}
          />

          <div className="text-sm text-gray-400 mb-4">
            {userArgument.length} caractères • Plus ton argument est développé et pertinent, plus tu gagnes de points!
          </div>

          <button
            onClick={handleSubmitArgument}
            disabled={!userArgument.trim() || isEvaluating}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            {isEvaluating ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>L'IA analyse ton argument...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Soumettre mon argument</span>
              </>
            )}
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* AI Response */}
          <div className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                🤖
              </div>
              <div>
                <div className="font-bold">Réponse de l'IA</div>
                <div className="text-xs text-gray-400">Coach de débat</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">{currentDebate.aiResponse}</p>
          </div>

          {/* Evaluation */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="text-primary-400" size={24} />
              <h3 className="text-xl font-bold">Évaluation de ton argument</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Logique', score: currentDebate.evaluation.logic, color: 'blue' },
                { label: 'Pertinence', score: currentDebate.evaluation.relevance, color: 'purple' },
                { label: 'Preuves', score: currentDebate.evaluation.evidence, color: 'green' },
                { label: 'Clarté', score: currentDebate.evaluation.clarity, color: 'orange' },
              ].map((metric) => (
                <div key={metric.label} className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.score * 10}%` }}
                        className={`h-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600`}
                      />
                    </div>
                    <span className="text-lg font-bold">{metric.score}/10</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg p-6 text-center mb-6">
              <div className="text-sm text-gray-400 mb-2">Score Total</div>
              <div className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {currentDebate.evaluation.totalScore}
              </div>
              <div className="text-sm text-gray-400">points</div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="text-sm font-bold text-gray-400 mb-2">Feedback</div>
              <p className="text-gray-300">{currentDebate.evaluation.feedback}</p>
            </div>

            <button
              onClick={handleContinue}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <span>Continuer</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DebateScreen;
