import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { getRandomQuestions } from '../data/questions';
import { CheckCircle, XCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizScreen = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    selectAnswer,
    startDebate,
    nextQuestion,
    setCurrentQuestion,
    addScore,
    setCurrentScreen,
    user,
  } = useGameStore();

  const [showAnswer, setShowAnswer] = useState(false);
  const [totalQuestions] = useState(10);

  useEffect(() => {
    if (!currentQuestion) {
      const questions = getRandomQuestions(totalQuestions, user?.isPremium || false);
      if (questions[currentQuestionIndex]) {
        setCurrentQuestion(questions[currentQuestionIndex]);
      }
    }
  }, [currentQuestion, currentQuestionIndex, setCurrentQuestion, user, totalQuestions]);

  if (!currentQuestion) {
    return <div>Chargement...</div>;
  }

  const handleAnswerSelect = (index: number) => {
    if (showAnswer) return;
    selectAnswer(index);
    setShowAnswer(true);

    // Add score if correct
    if (index === currentQuestion.correctAnswer) {
      const points = currentQuestion.difficulty === 'easy' ? 10 :
                    currentQuestion.difficulty === 'medium' ? 20 : 30;
      addScore(points);
    }
  };

  const handleDebate = () => {
    startDebate();
    setCurrentScreen('debate');
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 >= totalQuestions) {
      setCurrentScreen('results');
    } else {
      const questions = getRandomQuestions(totalQuestions, user?.isPremium || false);
      setShowAnswer(false);
      nextQuestion();
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
    }
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentQuestionIndex + 1} sur {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm font-bold">
            {currentQuestion.category.toUpperCase()}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
            currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {currentQuestion.difficulty === 'easy' ? 'Facile' :
             currentQuestion.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctAnswer;
            const showCorrect = showAnswer && isCorrectOption;
            const showIncorrect = showAnswer && isSelected && !isCorrect;

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showAnswer}
                whileHover={!showAnswer ? { scale: 1.02 } : {}}
                whileTap={!showAnswer ? { scale: 0.98 } : {}}
                className={`w-full text-left p-4 rounded-lg font-medium transition-all border-2 ${
                  showCorrect
                    ? 'bg-green-500/20 border-green-500 text-green-300'
                    : showIncorrect
                    ? 'bg-red-500/20 border-red-500 text-red-300'
                    : isSelected
                    ? 'bg-primary-500/20 border-primary-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && <CheckCircle className="text-green-500" />}
                  {showIncorrect && <XCircle className="text-red-500" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Answer Explanation */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`card mb-6 ${
              isCorrect ? 'border-2 border-green-500' : 'border-2 border-red-500'
            }`}
          >
            <div className="flex items-center space-x-2 mb-4">
              {isCorrect ? (
                <>
                  <CheckCircle className="text-green-500" size={24} />
                  <span className="text-xl font-bold text-green-500">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="text-red-500" size={24} />
                  <span className="text-xl font-bold text-red-500">Incorrect</span>
                </>
              )}
            </div>
            <p className="text-gray-300 mb-4">{currentQuestion.explanation}</p>

            <div className="flex space-x-3">
              <button
                onClick={handleDebate}
                className="btn-secondary flex-1 flex items-center justify-center space-x-2"
              >
                <MessageSquare size={20} />
                <span>Débattre avec l'IA</span>
              </button>
              <button
                onClick={handleNext}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                <span>{currentQuestionIndex + 1 >= totalQuestions ? 'Voir Résultats' : 'Question Suivante'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizScreen;
