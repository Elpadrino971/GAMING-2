# ⚡ Quick Start - Truth Battle

Lancez Truth Battle en **2 minutes** !

## 🚀 Super Rapide (1 commande)

```bash
chmod +x setup.sh && ./setup.sh
```

Le script vous guide à travers tout le processus!

---

## 📝 Manuel (5 minutes)

### 1. Installation

```bash
# Cloner le repo
git clone https://github.com/yourname/truth-battle.git
cd truth-battle

# Installer les dépendances
npm install
```

### 2. Développement

```bash
# Lancer le serveur de dev
npm run dev
```

Ouvrez http://localhost:5173 🎉

### 3. Production

```bash
# Build
npm run build

# Preview
npm run preview
```

---

## 🎮 Premiers Pas

1. **Créez votre profil**: L'app crée automatiquement un utilisateur par défaut
2. **Choisissez le nombre de questions**: 5, 10, 15 ou 20
3. **Répondez aux questions**: Sélectionnez votre réponse
4. **Débattez!**: Défendez votre choix avec des arguments solides
5. **Montez au classement**: Plus vos arguments sont bons, plus vous gagnez de points!

---

## 🔧 Configuration (Optionnel)

Créez un fichier `.env`:

```env
# API Keys (optionnel pour démarrer)
VITE_AI_API_KEY=your_api_key
VITE_API_URL=http://localhost:3000

# Firebase (optionnel)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
```

---

## 📱 Installation PWA (Mobile)

1. Ouvrez Truth Battle sur votre mobile
2. Menu navigateur > "Ajouter à l'écran d'accueil"
3. Profitez de l'app native! 📱

---

## 🎯 Fonctionnalités Clés

- ✅ **38 questions** variées (culture, science, histoire, etc.)
- ✅ **Débat IA** après chaque question
- ✅ **Évaluation multi-critères** (logique, pertinence, preuves, clarté)
- ✅ **Système de points** quiz + débat
- ✅ **Classement mondial**
- ✅ **Tournois** avec prix
- ✅ **Mode Premium** avec questions exclusives
- ✅ **PWA** - Installable sur mobile
- ✅ **Sauvegarde automatique** avec localStorage

---

## 🐛 Problèmes?

### Le serveur ne démarre pas

```bash
# Nettoyer et réinstaller
rm -rf node_modules
npm install
```

### Erreur de build

```bash
# Vérifier Node.js version (min 18)
node -v

# Mettre à jour si nécessaire
nvm install 18
nvm use 18
```

### Questions ne s'affichent pas

Vérifiez que `src/data/questions.ts` existe et contient des questions.

---

## 📚 Documentation

- [README.md](README.md) - Documentation complète
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guide de déploiement
- [CONTRIBUTING.md](CONTRIBUTING.md) - Comment contribuer

---

## 🤝 Support

- GitHub Issues: [github.com/yourrepo/issues]
- Email: support@truthbattle.com
- Discord: [Truth Battle Community]

---

**Prêt à débattre?** 🎯

```bash
npm run dev
```

Ouvrez http://localhost:5173 et amusez-vous! 🚀
