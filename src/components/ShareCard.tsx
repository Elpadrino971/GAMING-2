import { Share2, Download, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface ShareCardProps {
  score: number;
  debateScore: number;
  totalQuestions: number;
  correctAnswers: number;
  username: string;
  level: number;
  onClose: () => void;
}

const ShareCard = ({
  score,
  debateScore,
  totalQuestions,
  correctAnswers,
  username,
  level,
  onClose,
}: ShareCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const totalScore = score + debateScore;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const handleShare = async () => {
    const text = `🎯 Truth Battle Score!\n\n` +
      `👤 ${username} (Niveau ${level})\n` +
      `📊 Score Total: ${totalScore}\n` +
      `✅ Précision: ${accuracy}%\n` +
      `💬 Score Débat: ${debateScore}\n\n` +
      `Essaie de me battre! 🔥`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Truth Battle - Mes Résultats',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Résultats copiés dans le presse-papier!');
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate an image
    // For now, we'll just copy text
    handleShare();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-md w-full"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X size={32} />
        </button>

        <div
          ref={cardRef}
          className="card bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-700 p-8 text-white"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🎯</div>
            <h2 className="text-3xl font-bold mb-1">Truth Battle</h2>
            <p className="text-white/80 text-sm">Mes Résultats</p>
          </div>

          {/* User Info */}
          <div className="bg-white/10 rounded-lg p-4 mb-6 text-center">
            <div className="text-2xl font-bold mb-1">{username}</div>
            <div className="text-white/80 text-sm">Niveau {level}</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{totalScore}</div>
              <div className="text-xs text-white/70 mt-1">Score Total</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{accuracy}%</div>
              <div className="text-xs text-white/70 mt-1">Précision</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-xs text-white/70 mt-1">Quiz</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{debateScore}</div>
              <div className="text-xs text-white/70 mt-1">Débat</div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-white/60">
            truthbattle.com
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4">
          <button
            onClick={handleShare}
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <Share2 size={20} />
            <span>Partager</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn-secondary flex-1 flex items-center justify-center space-x-2"
          >
            <Download size={20} />
            <span>Télécharger</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ShareCard;
