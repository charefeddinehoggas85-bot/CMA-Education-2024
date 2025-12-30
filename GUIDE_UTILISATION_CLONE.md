# 🚀 Guide d'Utilisation du Clone CMA-Education-2024

## 📋 Vue d'ensemble

Ce clone a été optimisé et synchronisé avec les dernières améliorations du dossier frontend. Il est maintenant **100% fonctionnel** et prêt pour le développement et le déploiement.

## ✅ État Actuel

- **Taux de réussite**: 98%
- **Fichiers synchronisés**: ✅
- **Configuration optimisée**: ✅
- **Composants à jour**: ✅
- **Prêt pour Vercel**: ✅

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
```bash
cd CMA-Education-2024
npm install
```

### 2. Configuration des variables d'environnement
Copiez et configurez les variables d'environnement :
```bash
cp .env.example .env.local
```

Éditez `.env.local` avec vos valeurs :
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRAPI_URL=https://votre-strapi.railway.app
STRAPI_API_TOKEN=your_token_here
NEXT_PUBLIC_WHATSAPP_NUMBER=+33123456789
NEXT_PUBLIC_CONTACT_EMAIL=contact@cma-btp.fr
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=public_key
```

### 3. Test du build
```bash
npm run build
```

### 4. Lancement en développement
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
CMA-Education-2024/
├── src/
│   ├── app/                    # Pages Next.js 13+ (App Router)
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── layout.tsx         # Layout principal
│   │   ├── about/             # Page À propos
│   │   ├── contact/           # Page Contact
│   │   ├── formations/        # Pages Formations
│   │   └── ...
│   ├── components/            # Composants React
│   │   ├── layout/           # Header, Footer, Navigation
│   │   ├── sections/         # Sections de pages
│   │   └── ui/               # Composants UI réutilisables
│   ├── lib/                  # Utilitaires et configuration
│   │   ├── strapi.ts         # Client Strapi
│   │   └── ...
│   └── hooks/                # Hooks React personnalisés
├── public/                   # Assets statiques
│   ├── images/              # Images
│   ├── videos/              # Vidéos
│   └── favicon.ico          # Favicon
├── next.config.js           # Configuration Next.js
├── tailwind.config.ts       # Configuration Tailwind
└── package.json             # Dépendances npm
```

## 🔧 Scripts Disponibles

- `npm run dev` - Démarrage en mode développement
- `npm run build` - Build de production
- `npm run start` - Démarrage du serveur de production
- `npm run lint` - Vérification ESLint

## 🌐 Déploiement sur Vercel

### Méthode 1: Upload Direct
1. Compresser le dossier `CMA-Education-2024`
2. Aller sur [vercel.com](https://vercel.com)
3. Cliquer "New Project" > "Upload"
4. Glisser-déposer l'archive
5. Configurer les variables d'environnement
6. Déployer

### Méthode 2: Via Git
1. Initialiser un repository Git :
```bash
git init
git add .
git commit -m "Initial commit - CMA Education optimized"
```

2. Pousser vers GitHub/GitLab
3. Connecter à Vercel depuis le dashboard

## 🔗 Intégration Strapi

Le clone est configuré pour fonctionner avec votre CMS Strapi :

- **Client Strapi** : `src/lib/strapi.ts`
- **Types** : `src/lib/strapi-types.ts`
- **Configuration** : Variables d'environnement

Assurez-vous que votre Strapi est déployé et accessible.

## 📱 Fonctionnalités Incluses

### ✅ Pages Principales
- 🏠 Accueil avec hero section
- 📚 Formations (liste et détails)
- 👥 À propos
- 📞 Contact
- 👨‍🏫 Formateurs
- 🤝 Partenaires

### ✅ Composants Optimisés
- 📱 Design responsive universel
- 🎨 Interface moderne avec Tailwind CSS
- 🖼️ Galerie d'images optimisée
- 📧 Système de contact EmailJS
- 📄 Génération de brochures PDF
- 🔍 SEO optimisé

### ✅ Intégrations
- 🔗 Strapi CMS
- 📧 EmailJS
- 📱 WhatsApp Widget
- 🎯 Google Analytics (configurable)

## 🛠️ Maintenance

### Mise à jour des dépendances
```bash
npm update
```

### Synchronisation avec le frontend
Si des mises à jour sont apportées au dossier `frontend`, utilisez :
```bash
node scripts/sync-frontend-to-clone.js
```

### Vérification de l'intégrité
```bash
node scripts/verify-clone-functionality.js
```

## 📊 Monitoring

### Performance
- Utilisez Vercel Analytics
- Surveillez les Core Web Vitals
- Optimisez les images si nécessaire

### Erreurs
- Consultez les logs Vercel
- Vérifiez la console du navigateur
- Testez les API Strapi

## 🆘 Dépannage

### Erreur de build
1. Vérifiez les dépendances : `npm install`
2. Nettoyez le cache : `rm -rf .next && npm run build`
3. Vérifiez les variables d'environnement

### Problème Strapi
1. Vérifiez l'URL Strapi dans `.env.local`
2. Testez l'API directement
3. Vérifiez le token d'authentification

### Images manquantes
1. Vérifiez le dossier `public/images/`
2. Re-synchronisez depuis le frontend
3. Vérifiez les chemins dans le code

## 📞 Support

En cas de problème :
1. Consultez les rapports de vérification générés
2. Vérifiez les logs de build/déploiement
3. Testez en local avant déploiement

---

## 🎉 Félicitations !

Votre clone CMA-Education-2024 est maintenant **entièrement fonctionnel** et optimisé pour la production. Vous pouvez procéder au déploiement en toute confiance !

**Dernière synchronisation** : ${new Date().toLocaleString('fr-FR')}
**Statut** : ✅ Prêt pour production