# Déploiement sur Vercel - CMA Education

## 🚀 Déploiement automatique

### 1. Prérequis
- Compte GitHub
- Compte Vercel (gratuit)
- Repository GitHub du projet

### 2. Déploiement via Vercel Dashboard
1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer sur "New Project"
4. Importer le repository `CMA2026`
5. Vercel détecte automatiquement Next.js
6. Cliquer sur "Deploy"

### 3. Déploiement via CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer en production
npm run deploy

# Déployer en preview
npm run deploy-preview
```

### 4. Configuration automatique
- ✅ Framework: Next.js (détecté automatiquement)
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

### 5. Variables d'environnement (optionnel)
Dans le dashboard Vercel > Settings > Environment Variables :
```
NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app
NEXT_PUBLIC_CONTACT_EMAIL=contact.academy@cma-education.com
```

### 6. Domaine personnalisé (optionnel)
1. Dashboard Vercel > Settings > Domains
2. Ajouter votre domaine
3. Configurer les DNS selon les instructions

## 📊 Monitoring
- Performance: Vercel Analytics automatique
- Logs: Dashboard Vercel > Functions
- Erreurs: Dashboard Vercel > Overview

## 🔄 Déploiement continu
Chaque push sur `main` déclenche automatiquement un déploiement.