import { useEffect, useState } from 'react';
import { Flame, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadGameStats } from '../utils/storage';

const StreakNotification = () => {
  const [show, setShow] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isNewStreak, setIsNewStreak] = useState(false);

  useEffect(() => {
    const checkStreak = () => {
      const stats = loadGameStats();
      const now = Date.now();
      const oneDayMs = 24 * 60 * 60 * 1000;
      const daysSinceLastPlay = Math.floor((now - stats.lastPlayedDate) / oneDayMs);

      // Show notification if it's been exactly 1 day (consecutive)
      if (daysSinceLastPlay === 1 && stats.currentStreak > 1) {
        setStreak(stats.currentStreak);
        setIsNewStreak(false);
        setShow(true);
        setTimeout(() => setShow(false), 5000);
      }
      // Show if first play of the day
      else if (daysSinceLastPlay === 0 && stats.currentStreak >= 1) {
        setStreak(stats.currentStreak);
        setIsNewStreak(true);
        setShow(true);
        setTimeout(() => setShow(false), 5000);
      }
    };

    checkStreak();
    // Check every minute
    const interval = setInterval(checkStreak, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStreakMessage = () => {
    if (streak === 1) return "Première connexion aujourd'hui!";
    if (streak < 7) return `${streak} jours de suite!`;
    if (streak < 30) return `${streak} jours consécutifs! 🔥`;
    if (streak < 100) return `${streak} jours! Tu es une légende!`;
    return `${streak} jours! INCROYABLE! 🌟`;
  };

  const getStreakColor = () => {
    if (streak < 7) return 'from-orange-500 to-red-500';
    if (streak < 30) return 'from-red-500 to-pink-500';
    if (streak < 100) return 'from-purple-500 to-pink-500';
    return 'from-yellow-400 to-orange-500';
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={`card bg-gradient-to-r ${getStreakColor()} p-4 min-w-[300px] shadow-2xl border-2 border-white/30`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <Flame size={32} className="text-white" />
                </motion.div>
                <div>
                  <div className="font-bold text-white text-lg">
                    {isNewStreak ? "Série Active!" : "Nouvelle Série!"}
                  </div>
                  <div className="text-white/90 text-sm">
                    {getStreakMessage()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShow(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {streak >= 7 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-xs text-white/80 text-center"
              >
                Continue comme ça pour débloquer des badges exclusifs!
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StreakNotification;
