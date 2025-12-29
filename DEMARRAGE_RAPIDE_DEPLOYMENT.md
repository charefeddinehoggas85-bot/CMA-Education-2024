# 🚀 Démarrage Rapide - Déploiement CMA Education

## ⚡ Déploiement Express (5 minutes)

### 1. Déploiement Frontend (Next.js)
```bash
# Méthode automatique
npm run deploy

# Ou méthode manuelle
npm run build
npm run deploy:frontend
```

### 2. Déploiement Strapi (Panel Admin)
```bash
# Configuration automatique
npm run deploy:strapi
```

## 🎯 Étapes Détaillées

### **Étape 1: Préparer le Frontend**
1. **Vérifier le build**
   ```bash
   npm install
   npm run build
   ```

2. **Configurer les variables d'environnement**
   - Copier `.env.example` vers `.env.local`
   - Remplir les valeurs nécessaires

### **Étape 2: Déployer sur Vercel**
1. **Via le script automatique**
   ```bash
   npm run deploy
   ```

2. **Via Vercel Dashboard**
   - Aller sur [vercel.com](https://vercel.com)
   - Connecter votre repository GitHub
   - Cliquer "Deploy"

### **Étape 3: Déployer Strapi**

#### Option A: Heroku (Recommandé)
```bash
# 1. Installer Heroku CLI
# 2. Se connecter
heroku login

# 3. Créer l'application
heroku create cms-cma-production

# 4. Ajouter PostgreSQL
heroku addons:create heroku-postgresql:mini

# 5. Déployer
git subtree push --prefix cms-cma heroku main
```

#### Option B: Railway
1. Créer un compte sur [railway.app](https://railway.app)
2. Connecter votre repository
3. Sélectionner le dossier `cms-cma`
4. Railway déploie automatiquement

### **Étape 4: Configuration Post-Déploiement**

1. **Accéder au panel admin Strapi**
   - URL: `https://votre-strapi-url.com/admin`
   - Créer votre compte administrateur

2. **Configurer les permissions**
   - Settings > Users & Permissions Plugin > Roles
   - Autoriser "Public" pour les APIs

3. **Connecter Frontend et Strapi**
   - Dans Vercel: Settings > Environment Variables
   - Ajouter `NEXT_PUBLIC_STRAPI_URL=https://votre-strapi-url.com`

4. **Tester la connexion**
   - Visiter votre site frontend
   - Vérifier que les données s'affichent

## 🔧 Variables d'Environnement

### Frontend (Vercel)
```env
NEXT_PUBLIC_STRAPI_URL=https://votre-strapi-url.com
STRAPI_API_TOKEN=votre-token-api
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
BROCHURE_NOTIFICATION_EMAIL=contact@votre-domaine.com
```

### Strapi (Heroku/Railway)
```env
DATABASE_URL=postgresql://...
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
```

## 🎉 Résultat Final

Après déploiement, vous aurez :
- ✅ **Frontend fonctionnel** sur Vercel
- ✅ **Panel admin Strapi** sur Heroku/Railway
- ✅ **Base de données PostgreSQL** configurée
- ✅ **APIs connectées** entre frontend et Strapi
- ✅ **Système d'emails** pour les brochures

## 🆘 Dépannage Rapide

### Erreur de build
```bash
npm run build
# Vérifier les erreurs TypeScript
```

### Problème de connexion Strapi
1. Vérifier `NEXT_PUBLIC_STRAPI_URL`
2. Vérifier les permissions dans Strapi
3. Vérifier CORS dans Strapi

### Emails ne fonctionnent pas
1. Vérifier `EMAIL_USER` et `EMAIL_PASSWORD`
2. Activer l'authentification à 2 facteurs Gmail
3. Générer un mot de passe d'application

## 📚 Guides Complets
- `GUIDE_DEPLOYMENT_COMPLET.md` - Guide détaillé
- `DEPLOYMENT.md` - Instructions Vercel
- Scripts dans `scripts/` - Automatisation

## 🚀 Commandes Utiles
```bash
npm run deploy              # Déploiement complet
npm run deploy:frontend     # Frontend seulement
npm run deploy:strapi       # Configuration Strapi
npm run build              # Test de build
npm run dev                # Développement local
```