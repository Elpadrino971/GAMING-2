import { useState } from 'react';
import { Swords, Trophy, Calendar, Users, Crown, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tournament } from '../types';

// Mock tournament data
const mockTournaments: Tournament[] = [
  {
    id: 't1',
    name: 'Championship Hebdomadaire',
    description: 'Le tournoi principal de la semaine avec les meilleurs joueurs',
    startDate: Date.now() + 86400000, // Tomorrow
    endDate: Date.now() + 604800000, // 7 days
    prize: '1000€ + Badge Exclusif',
    participants: 1247,
    isPremium: false,
    status: 'upcoming',
  },
  {
    id: 't2',
    name: 'Débat Masters',
    description: 'Tournoi axé sur la qualité des débats et arguments',
    startDate: Date.now() - 86400000,
    endDate: Date.now() + 172800000,
    prize: '500€ en crypto',
    participants: 892,
    isPremium: true,
    status: 'active',
  },
  {
    id: 't3',
    name: 'Speed Quiz Challenge',
    description: 'Quiz rapide - le plus rapide et précis gagne',
    startDate: Date.now() - 172800000,
    endDate: Date.now() - 86400000,
    prize: 'Badge Légende',
    participants: 2341,
    isPremium: false,
    status: 'completed',
  },
  {
    id: 't4',
    name: 'Premium Elite League',
    description: 'Réservé aux membres premium uniquement',
    startDate: Date.now() + 259200000,
    endDate: Date.now() + 864000000,
    prize: '2000€ + Voyage',
    participants: 456,
    isPremium: true,
    status: 'upcoming',
  },
];

const TournamentsScreen = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  const filteredTournaments = mockTournaments.filter((t) =>
    filter === 'all' ? true : t.status === filter
  );

  const getStatusBadge = (status: Tournament['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-bold flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>EN COURS</span>
          </span>
        );
      case 'upcoming':
        return (
          <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full font-bold">
            À VENIR
          </span>
        );
      case 'completed':
        return (
          <span className="bg-gray-500/20 text-gray-400 text-xs px-2 py-1 rounded-full font-bold">
            TERMINÉ
          </span>
        );
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Swords className="text-primary-400" size={32} />
            <h1 className="text-3xl font-bold">Tournois</h1>
          </div>
          <div className="flex space-x-2">
            {(['all', 'active', 'upcoming', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {f === 'all' && 'Tous'}
                {f === 'active' && 'En cours'}
                {f === 'upcoming' && 'À venir'}
                {f === 'completed' && 'Terminés'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold mb-1">Gagne des prix réels!</h3>
              <p className="text-sm text-gray-400">
                Participe aux tournois et monte dans le classement pour gagner de l'argent, crypto et badges exclusifs
              </p>
            </div>
            <Trophy className="text-yellow-400" size={48} />
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredTournaments.map((tournament, index) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card hover:scale-105 transition-transform cursor-pointer ${
              tournament.status === 'active'
                ? 'border-2 border-green-500/50'
                : tournament.isPremium
                ? 'border-2 border-yellow-500/50'
                : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-bold">{tournament.name}</h3>
                  {tournament.isPremium && (
                    <Crown className="text-yellow-400" size={20} />
                  )}
                </div>
                {getStatusBadge(tournament.status)}
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">{tournament.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <Trophy className="text-yellow-400" size={16} />
                <span className="text-gray-400">Prix:</span>
                <span className="font-bold text-yellow-400">{tournament.prize}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Users className="text-blue-400" size={16} />
                <span className="text-gray-400">Participants:</span>
                <span className="font-bold">{tournament.participants.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="text-purple-400" size={16} />
                <span className="text-gray-400">Début:</span>
                <span className="font-bold">{formatDate(tournament.startDate)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="text-orange-400" size={16} />
                <span className="text-gray-400">Fin:</span>
                <span className="font-bold">{formatDate(tournament.endDate)}</span>
              </div>
            </div>

            {tournament.isPremium ? (
              <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                <Crown size={16} />
                <span>Premium uniquement</span>
              </button>
            ) : tournament.status === 'active' ? (
              <button className="btn-primary w-full">Rejoindre maintenant</button>
            ) : tournament.status === 'upcoming' ? (
              <button className="btn-primary w-full">S'inscrire</button>
            ) : (
              <button className="bg-white/5 text-gray-400 w-full py-3 rounded-lg font-bold cursor-not-allowed">
                Tournoi terminé
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30"
      >
        <div className="text-center">
          <Swords className="mx-auto text-purple-400 mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-2">Crée ton propre tournoi</h3>
          <p className="text-gray-400 mb-6">
            Les membres Premium peuvent créer des tournois personnalisés avec leurs propres règles et prix
          </p>
          <button className="btn-secondary">
            Créer un tournoi
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TournamentsScreen;
