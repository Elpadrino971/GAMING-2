import { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Download, Upload, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadSettings, saveSettings, exportUserData, importUserData, clearAllData } from '../utils/storage';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    if (isOpen) {
      setSettings(loadSettings());
    }
  }, [isOpen]);

  const handleToggle = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleExport = () => {
    const data = exportUserData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `truth-battle-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target?.result as string;
          if (importUserData(data)) {
            alert('Données importées avec succès!');
            window.location.reload();
          } else {
            alert('Erreur lors de l\'importation des données');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (confirm('⚠️ Êtes-vous sûr de vouloir effacer toutes vos données? Cette action est irréversible!')) {
      clearAllData();
      alert('Toutes les données ont été effacées');
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 shadow-2xl z-[101] overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Paramètres</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Audio Settings */}
              <div className="card mb-6">
                <h3 className="text-lg font-bold mb-4">Audio</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                      <div>
                        <div className="font-medium">Effets Sonores</div>
                        <div className="text-xs text-gray-400">Sons des actions</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('soundEnabled')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.soundEnabled ? 'bg-primary-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.soundEnabled ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {settings.musicEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                      <div>
                        <div className="font-medium">Musique</div>
                        <div className="text-xs text-gray-400">Musique de fond</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('musicEnabled')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.musicEnabled ? 'bg-primary-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.musicEnabled ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="card mb-6">
                <h3 className="text-lg font-bold mb-4">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifications</div>
                    <div className="text-xs text-gray-400">Alertes et rappels</div>
                  </div>
                  <button
                    onClick={() => handleToggle('notifications')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.notifications ? 'bg-primary-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.notifications ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Data Management */}
              <div className="card mb-6">
                <h3 className="text-lg font-bold mb-4">Gestion des Données</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleExport}
                    className="w-full bg-white/5 hover:bg-white/10 py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Download size={20} />
                      <div className="text-left">
                        <div className="font-medium">Exporter</div>
                        <div className="text-xs text-gray-400">Sauvegarder vos données</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={handleImport}
                    className="w-full bg-white/5 hover:bg-white/10 py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Upload size={20} />
                      <div className="text-left">
                        <div className="font-medium">Importer</div>
                        <div className="text-xs text-gray-400">Restaurer une sauvegarde</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={handleClearData}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Trash2 size={20} />
                      <div className="text-left">
                        <div className="font-medium">Effacer tout</div>
                        <div className="text-xs text-red-400/70">Supprimer toutes vos données</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* About */}
              <div className="card">
                <h3 className="text-lg font-bold mb-4">À propos</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>Version: 2.0.0</div>
                  <div>© 2024 Truth Battle</div>
                  <div className="pt-2">
                    <a href="#" className="text-primary-400 hover:text-primary-300">
                      Politique de confidentialité
                    </a>
                  </div>
                  <div>
                    <a href="#" className="text-primary-400 hover:text-primary-300">
                      Conditions d'utilisation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
