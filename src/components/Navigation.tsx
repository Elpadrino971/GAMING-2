import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Home, Trophy, User, Swords, Settings } from 'lucide-react';
import SettingsPanel from './SettingsPanel';

const Navigation = () => {
  const { currentScreen, setCurrentScreen, user } = useGameStore();
  const [showSettings, setShowSettings] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'leaderboard', label: 'Classement', icon: Trophy },
    { id: 'tournaments', label: 'Tournois', icon: Swords },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Truth Battle
            </div>
            {user?.isPremium && (
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-xs px-2 py-1 rounded-full font-bold">
                PREMIUM
              </span>
            )}
          </div>

          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          {user && (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSettings(true)}
                className="text-gray-300 hover:text-white transition-colors p-2"
              >
                <Settings size={20} />
              </button>
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold">{user.username}</div>
                <div className="text-xs text-gray-400">Niveau {user.level}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center font-bold">
                {user.username[0]}
              </div>
            </div>
          )}
          <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
