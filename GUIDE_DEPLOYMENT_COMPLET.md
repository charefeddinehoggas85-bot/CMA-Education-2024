# Guide de Déploiement Complet - CMA Education

## 🎯 Objectif
Déployer le frontend Next.js et le panel admin Strapi de manière fonctionnelle.

## 📋 Étapes de Déploiement

### **Phase 1: Préparation du Frontend**

#### 1.1 Vérification des dépendances
```bash
npm install
npm run build
```

#### 1.2 Configuration des variables d'environnement
Créer/vérifier `.env.local` avec :
```env
# Strapi CMS (à adapter selon votre hébergement Strapi)
NEXT_PUBLIC_STRAPI_URL=https://votre-strapi.herokuapp.com
STRAPI_API_TOKEN=votre-token-api

# Configuration Email
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-application
BROCHURE_NOTIFICATION_EMAIL=contact.academy@cma-education.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app
```

### **Phase 2: Déploiement Strapi (Panel Admin)**

#### 2.1 Options d'hébergement Strapi
**Option A: Heroku (Recommandé)**
- Gratuit avec limitations
- Base de données PostgreSQL incluse
- Déploiement simple

**Option B: Railway**
- Alternative moderne à Heroku
- Configuration simple

**Option C: DigitalOcean App Platform**
- Plus de contrôle
- Tarification transparente

#### 2.2 Préparation Strapi pour production
```bash
cd cms-cma
npm install
npm run build
```

### **Phase 3: Déploiement Frontend (Vercel)**

#### 3.1 Via Vercel Dashboard
1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement

#### 3.2 Via CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### **Phase 4: Configuration Post-Déploiement**

#### 4.1 Configuration CORS Strapi
Autoriser le domaine frontend dans Strapi

#### 4.2 Upload des médias
Configurer le stockage des images (Cloudinary recommandé)

#### 4.3 Tests de fonctionnement
- Vérifier l'API Strapi
- Tester les formulaires
- Valider les téléchargements de brochures

## 🔧 Commandes Utiles

### Frontend
```bash
npm run dev          # Développement local
npm run build        # Build production
npm run start        # Serveur production local
```

### Strapi
```bash
npm run develop      # Mode développement
npm run build        # Build admin panel
npm run start        # Production
```

## 📊 Monitoring
- Vercel Analytics pour le frontend
- Logs Strapi via l'hébergeur choisi
- Monitoring des emails via les logs

## 🚨 Points d'Attention
1. **Variables d'environnement** : Bien configurer sur chaque plateforme
2. **CORS** : Autoriser les domaines de production
3. **Base de données** : Sauvegarder avant migration
4. **Médias** : Configurer le stockage externe
5. **SSL** : Vérifier les certificats HTTPS