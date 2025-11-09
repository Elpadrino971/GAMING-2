# 🎯 Truth Battle - Quiz Social avec IA

> Le quiz interactif où tu débats avec l'IA et prouves tes arguments!

Truth Battle est un jeu de quiz révolutionnaire qui combine questions de culture générale et débats interactifs alimentés par l'IA. Après chaque question, défends ta réponse face à une IA contradictrice et gagne des points selon la qualité de tes arguments.

![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-success.svg)

## 🌟 Caractéristiques Principales

### 🧠 Quiz Intelligent
- **62 questions** variées sur **culture, science, société, technologie, histoire, environnement, sports, politique**
- Trois niveaux de difficulté : Facile, Moyen, Difficile
- Base de données extensible avec questions gratuites et premium
- Questions constamment mises à jour

### 💬 Système de Débat IA
- Après chaque question, **défends ta réponse** face à l'IA
- L'IA joue le rôle d'un **coach de débat intelligent**
- Évaluation multicritère de tes arguments :
  - **Logique** : Cohérence du raisonnement
  - **Pertinence** : Lien avec la question
  - **Preuves** : Utilisation de faits et données
  - **Clarté** : Qualité de l'expression

### 📊 Système de Points Avancé
- Points quiz basés sur la difficulté (10/20/30 pts)
- Points débat basés sur la qualité de l'argumentation (0-100 pts)
- Système XP et niveaux
- Badges et achievements

### 🏆 Compétition Sociale
- **Classements mondiaux** (jour/semaine/mois/tous temps)
- **Tournois réguliers** avec prix réels (€, crypto, badges)
- Partage de performances sur réseaux sociaux
- Création de tournois personnalisés (Premium)

### 💎 Modèle Premium
- Questions exclusives et thématiques
- IA plus sophistiquée pour les débats
- Accès aux tournois premium
- Création de tournois personnalisés
- Statistiques avancées

### 🔥 Nouvelles Fonctionnalités v2.2
- **PWA (Progressive Web App)** : Installable sur mobile comme une vraie app!
- **Sauvegarde Automatique** : Tous tes progrès sont sauvegardés avec localStorage
- **Système de Séries** : Gagne des séries en jouant chaque jour
- **Tutorial Interactif** : Guide animé pour les nouveaux utilisateurs
- **Notification de Séries** : Sois notifié de tes séries actives
- **Export/Import** : Sauvegarde et restaure tes données
- **Optimisation Mobile** : Interface parfaitement adaptée aux smartphones
- **🔊 Effets Sonores** : Sons générés par Web Audio API (click, succès, erreur, combo)
- **🎨 Modes de Thème** : Clair, Sombre, et Auto (suit le système)
- **📖 Écran d'Aide** : Guide complet pour apprendre à jouer
- **62 Questions** : 24 nouvelles questions ajoutées!

## 🚀 Installation

### ⚡ Quick Start (Recommandé)

Le moyen le plus rapide de démarrer:

```bash
chmod +x setup.sh && ./setup.sh
```

Le script interactif vous guide à travers tout le processus!

### 📝 Installation Manuelle

#### Prérequis
- Node.js 18+
- npm ou yarn

#### Installation des dépendances

```bash
npm install
```

#### Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

#### Build pour production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

#### Preview du build

```bash
npm run preview
```

### 📱 Installation PWA

Sur mobile:
1. Ouvrez Truth Battle dans votre navigateur
2. Appuyez sur "Menu" > "Ajouter à l'écran d'accueil"
3. Profitez de l'expérience app native!

Sur desktop (Chrome/Edge):
1. Cliquez sur l'icône d'installation dans la barre d'adresse
2. Confirmez l'installation
3. Lancez depuis votre bureau ou menu démarrer!

## 🏗️ Architecture Technique

### Stack Technologique

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Effects**: React Confetti

### Structure du Projet

```
src/
├── components/         # Composants React
│   ├── HomeScreen.tsx
│   ├── QuizScreen.tsx
│   ├── DebateScreen.tsx
│   ├── ResultsScreen.tsx
│   ├── LeaderboardScreen.tsx
│   ├── WelcomeTutorial.tsx
│   ├── StreakNotification.tsx
│   ├── ProfileScreen.tsx
│   ├── TournamentsScreen.tsx
│   └── Navigation.tsx
├── data/              # Données statiques
│   └── questions.ts   # Base de questions
├── store/             # State management
│   └── gameStore.ts   # Zustand store
├── types/             # TypeScript types
│   └── index.ts
├── utils/             # Utilitaires
│   ├── aiDebate.ts    # Logique d'évaluation IA
│   └── storage.ts     # localStorage persistence
├── App.tsx            # Composant racine
├── main.tsx           # Point d'entrée
└── index.css          # Styles globaux
```

## 🎮 Comment Jouer

1. **Choisis le nombre de questions** (5, 10, 15 ou 20)
2. **Réponds aux questions** en sélectionnant une option
3. **Lance un débat** pour défendre ta réponse
4. **Écris ton argument** de façon structurée avec exemples et faits
5. **Reçois l'évaluation** de l'IA avec feedback détaillé
6. **Accumule des points** et monte dans le classement
7. **Participe aux tournois** pour gagner des prix!

## 💡 Stratégies pour Maximiser tes Points

### Pour le Quiz
- Lis attentivement chaque question
- Prends ton temps sur les questions difficiles (30 pts)
- Maintiens une série de bonnes réponses

### Pour les Débats
1. **Structure ton argument** en plusieurs points
2. **Donne des exemples concrets** pour illustrer
3. **Cite des faits et données** quand possible
4. **Explique ton raisonnement** étape par étape
5. **Sois clair et précis** dans ton expression
6. **Développe suffisamment** (minimum 100-150 caractères)

Exemple d'argument de qualité :
```
Je pense que cette réponse est correcte car historiquement,
cet événement a eu lieu en 1989, comme le confirment les archives
officielles. Par exemple, les témoignages d'époque montrent que...
De plus, l'impact de cet événement sur la politique mondiale a été
considérable, notamment parce que...
```

## 🔮 Roadmap

### Version 1.1 (Q2 2024)
- [ ] Intégration API IA réelle (Claude, GPT-4)
- [ ] Système d'authentification (OAuth, email)
- [ ] Backend Node.js + base de données
- [ ] Mode multijoueur en temps réel
- [ ] Salons de débat publics

### Version 1.2 (Q3 2024)
- [ ] Application mobile (React Native)
- [ ] Génération automatique de vidéos TikTok
- [ ] Streaming Twitch des tournois
- [ ] Système de parrainages
- [ ] Intégration crypto pour les prix

### Version 2.0 (Q4 2024)
- [ ] IA vocale pour débats oraux
- [ ] VR/AR experience
- [ ] Marketplace de questions communautaires
- [ ] API publique pour intégrations
- [ ] Programme d'affiliation

## 🤝 Contribution

Les contributions sont les bienvenues! Pour contribuer :

1. Fork le projet
2. Crée une branche (`git checkout -b feature/AmazingFeature`)
3. Commit tes changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvre une Pull Request

### Ajouter des Questions

Pour ajouter de nouvelles questions, édite `src/data/questions.ts` :

```typescript
{
  id: 'q99',
  category: 'science',
  difficulty: 'medium',
  question: 'Ta question ici?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0, // Index de la bonne réponse
  explanation: 'Explication de la réponse',
  debatePrompt: 'Sujet de débat à proposer',
  isPremium: false
}
```

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- Questions inspirées de sources libres et éducatives
- Design inspiré par les meilleures pratiques UX/UI
- Communauté React et TypeScript

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/truth-battle/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/truth-battle/discussions)
- **Email**: support@truthbattle.com
- **Twitter**: [@TruthBattle](https://twitter.com/truthbattle)

## 🌐 Déploiement

### Vercel (Recommandé)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🎯 Monétisation

### Modèle Freemium
- **Gratuit**: 70% des questions, classements, tournois basiques
- **Premium** (9.99€/mois):
  - Toutes les questions
  - IA avancée
  - Tournois premium
  - Statistiques détaillées
  - Création de tournois

### Sources de Revenus
1. Abonnements Premium
2. Sponsors de tournois
3. Marques thématiques (médias, ONG)
4. Publicités ciblées (version gratuite)
5. Vente de badges exclusifs

---

**Fait avec ❤️ pour les passionnés de débat et de culture générale**

*Truth Battle - Prouve que tu as raison!* 🎯
