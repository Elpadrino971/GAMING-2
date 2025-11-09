import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import DebateScreen from './components/DebateScreen';
import ResultsScreen from './components/ResultsScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import ProfileScreen from './components/ProfileScreen';
import TournamentsScreen from './components/TournamentsScreen';
import Navigation from './components/Navigation';
import WelcomeTutorial from './components/WelcomeTutorial';
import StreakNotification from './components/StreakNotification';

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const user = useGameStore((state) => state.user);
  const setUser = useGameStore((state) => state.setUser);

  useEffect(() => {
    // Initialize default user if none exists (in production, this would be from auth)
    if (!user) {
      setUser({
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        username: 'TruthSeeker',
        level: 1,
        xp: 0,
        isPremium: false,
        stats: {
          totalQuestions: 0,
          correctAnswers: 0,
          debatesWon: 0,
          debatesParticipated: 0,
          averageDebateScore: 0,
          streak: 0,
          bestStreak: 0,
        },
        badges: [],
      });
    }
  }, [user, setUser]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'debate':
        return <DebateScreen />;
      case 'results':
        return <ResultsScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'tournaments':
        return <TournamentsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <WelcomeTutorial />
      <StreakNotification />
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;
