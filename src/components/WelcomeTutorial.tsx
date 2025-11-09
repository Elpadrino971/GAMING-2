import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: 'Bienvenue sur Truth Battle! 🎯',
    description: 'Le quiz interactif où tu débats avec l\'IA et prouves tes arguments. Prêt à montrer ce que tu vaux?',
    icon: '👋',
  },
  {
    title: 'Réponds aux Questions 📝',
    description: 'Choisis parmi 38 questions de culture générale. Plus la question est difficile, plus tu gagnes de points!',
    icon: '🧠',
  },
  {
    title: 'Débats avec l\'IA 💬',
    description: 'Après chaque question, défends ta réponse avec des arguments solides. L\'IA évalue ta logique, pertinence et clarté!',
    icon: '🤖',
  },
  {
    title: 'Gagne des Points 🏆',
    description: 'Accumule des points quiz et débat. Monte de niveau, débloque des badges et grimpe au classement mondial!',
    icon: '⭐',
  },
  {
    title: 'Prêt à Commencer? 🚀',
    description: 'Choisis le nombre de questions et lance ton premier quiz. Bonne chance!',
    icon: '🎮',
  },
];

const WelcomeTutorial = () => {
  const [show, setShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen tutorial
    const hasSeenTutorial = localStorage.getItem('truthbattle_tutorial_seen');
    if (!hasSeenTutorial) {
      setShow(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    localStorage.setItem('truthbattle_tutorial_seen', 'true');
    setShow(false);
  };

  const handleSkip = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={handleSkip}
          />

          {/* Tutorial Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="card max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-1 rounded-full transition-all ${
                        index <= currentStep
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-2 text-center">
                  Étape {currentStep + 1} sur {steps.length}
                </div>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center mb-8"
                >
                  <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
                  <h2 className="text-2xl font-bold mb-3">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-gray-300 text-lg">
                    {steps[currentStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex space-x-3">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-bold transition-all"
                  >
                    Précédent
                  </button>
                )}

                <button
                  onClick={handleSkip}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-bold transition-all"
                >
                  Passer
                </button>

                <button
                  onClick={handleNext}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <span>
                    {currentStep === steps.length - 1 ? 'Commencer' : 'Suivant'}
                  </span>
                  {currentStep === steps.length - 1 ? (
                    <CheckCircle size={20} />
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomeTutorial;
