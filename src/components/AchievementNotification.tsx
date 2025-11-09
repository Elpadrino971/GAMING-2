import { useState, useEffect } from 'react';
import { Badge } from '../types';
import { X, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AchievementNotificationProps {
  badge: Badge | null;
  onClose: () => void;
}

const AchievementNotification = ({ badge, onClose }: AchievementNotificationProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (badge) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="card bg-gradient-to-r from-yellow-500 to-orange-500 p-6 min-w-[350px] shadow-2xl border-4 border-yellow-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Award className="text-white" size={24} />
                <span className="font-bold text-white text-lg">
                  Badge Débloqué!
                </span>
              </div>
              <button
                onClick={() => {
                  setShow(false);
                  setTimeout(onClose, 300);
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center space-x-4 bg-white/20 rounded-lg p-4">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="text-6xl"
              >
                {badge.icon}
              </motion.div>
              <div>
                <div className="font-bold text-white text-xl mb-1">
                  {badge.name}
                </div>
                <div className="text-white/90 text-sm">
                  {badge.description}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 5 }}
              className="h-1 bg-white/40 rounded-full mt-4"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementNotification;
