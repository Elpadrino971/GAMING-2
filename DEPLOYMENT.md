# 🚀 Guide de Déploiement - Truth Battle

Ce guide vous explique comment déployer Truth Battle sur différentes plateformes.

## 📋 Prérequis

- Node.js 18+ installé
- Compte sur une plateforme de déploiement (Vercel, Netlify, etc.)
- Git installé

## ⚡ Déploiement Rapide

### Option 1: Vercel (Recommandé - 2 minutes)

Vercel offre le déploiement le plus rapide et optimisé pour React/Vite.

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# Suivez les instructions:
# - Set up and deploy? Yes
# - Which scope? [Votre compte]
# - Link to existing project? No
# - Project name? truth-battle
# - Directory? ./
# - Override settings? No
```

Votre app sera en ligne en 30 secondes! 🎉

**URL de production**: https://truth-battle-xxxx.vercel.app

#### Variables d'environnement Vercel

Dans le dashboard Vercel, ajoutez:
- `VITE_AI_API_KEY` (pour l'IA en production)
- `VITE_API_URL` (votre backend si nécessaire)

---

### Option 2: Netlify (3 minutes)

```bash
# 1. Construire le projet
npm install
npm run build

# 2. Installer Netlify CLI
npm i -g netlify-cli

# 3. Se connecter
netlify login

# 4. Déployer
netlify deploy

# Puis pour la production:
netlify deploy --prod
```

**Configuration Netlify** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages (Gratuit)

1. Modifier `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/truth-battle/', // Nom de votre repo
})
```

2. Installer gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Ajouter dans `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Déployer:
```bash
npm run deploy
```

**URL**: https://votre-username.github.io/truth-battle/

---

### Option 4: Cloudflare Pages

1. Connectez votre repo GitHub à Cloudflare Pages
2. Configuration de build:
   - Build command: `npm run build`
   - Build output: `dist`
   - Node version: `18`

3. Variables d'environnement (optionnel):
   - `NODE_VERSION=18`

---

## 🐳 Docker Deployment

Pour un déploiement containerisé:

```bash
# 1. Build l'image
docker build -t truth-battle .

# 2. Run le container
docker run -p 8080:80 truth-battle
```

**Dockerfile**:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

---

## 🔧 Configuration de Production

### Variables d'Environnement

Créez un fichier `.env.production`:

```env
VITE_AI_API_KEY=your_production_api_key
VITE_API_URL=https://api.truthbattle.com
VITE_GA_TRACKING_ID=UA-XXXXX-X
```

### Optimisations de Build

Votre `vite.config.ts` est déjà optimisé, mais vous pouvez ajouter:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation': ['framer-motion', 'react-confetti'],
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
      }
    }
  }
})
```

---

## 📊 Analytics & Monitoring

### Google Analytics

Dans `index.html`, ajoutez avant `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Plausible Analytics (Privacy-friendly)

```html
<script defer data-domain="truthbattle.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🌍 Domaine Personnalisé

### Sur Vercel

1. Allez dans Project Settings > Domains
2. Ajoutez votre domaine
3. Configurez vos DNS:
   - Type: `CNAME`
   - Name: `www` (ou `@` pour root)
   - Value: `cname.vercel-dns.com`

### Sur Netlify

1. Site settings > Domain management
2. Add custom domain
3. Configurez DNS selon instructions

---

## 🔒 HTTPS & SSL

Toutes les plateformes (Vercel, Netlify, Cloudflare) fournissent SSL gratuit automatiquement via Let's Encrypt.

---

## 📱 Test PWA

Après déploiement, testez votre PWA:

1. **Lighthouse Audit**:
   - Ouvrez DevTools > Lighthouse
   - Cochez "Progressive Web App"
   - Run audit

2. **PWA Install Test**:
   - Sur mobile, visitez votre site
   - Cherchez "Ajouter à l'écran d'accueil"
   - Testez l'app installée

---

## 🚨 Troubleshooting

### Erreur 404 sur les routes

Ajoutez un fichier `public/_redirects`:
```
/*    /index.html   200
```

### Build échoue

```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

### App ne charge pas

Vérifiez:
- Base URL dans vite.config.ts
- Variables d'environnement configurées
- Console browser pour erreurs

---

## 🎯 Checklist de Déploiement

- [ ] Build fonctionne localement (`npm run build && npm run preview`)
- [ ] Variables d'environnement configurées
- [ ] PWA manifest configuré
- [ ] Service Worker fonctionne
- [ ] Analytics installé
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] SSL/HTTPS actif
- [ ] Tests Lighthouse > 90
- [ ] Test sur mobile
- [ ] Performance optimisée

---

## 📈 Après le Déploiement

1. **Monitoring**:
   - Configurez Sentry pour error tracking
   - Activez analytics

2. **SEO**:
   - Soumettez sitemap à Google Search Console
   - Configurez Open Graph tags

3. **Marketing**:
   - Partagez sur Product Hunt
   - Posts sur Reddit /r/webdev
   - Tweet le lancement

4. **Scaling**:
   - Ajoutez un CDN pour assets statiques
   - Implémentez backend pour features avancées
   - Configurez database (Supabase, Firebase)

---

## 🆘 Besoin d'Aide?

- Discord: [Truth Battle Community]
- GitHub Issues: [github.com/yourrepo/issues]
- Email: support@truthbattle.com

**Bon déploiement!** 🚀
