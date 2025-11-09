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

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const setUser = useGameStore((state) => state.setUser);

  useEffect(() => {
    // Initialize default user (in production, this would be from auth)
    setUser({
      id: 'user-1',
      username: 'TruthSeeker',
      level: 5,
      xp: 1250,
      isPremium: false,
      stats: {
        totalQuestions: 45,
        correctAnswers: 32,
        debatesWon: 12,
        debatesParticipated: 18,
        averageDebateScore: 7.5,
        streak: 3,
        bestStreak: 7,
      },
      badges: [
        {
          id: 'badge-1',
          name: 'First Steps',
          description: 'Answer your first question',
          icon: '🎯',
          earnedAt: Date.now() - 1000000,
        },
        {
          id: 'badge-2',
          name: 'Debate Master',
          description: 'Win 10 debates',
          icon: '🏆',
          earnedAt: Date.now() - 500000,
        },
      ],
    });
  }, [setUser]);

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
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;
