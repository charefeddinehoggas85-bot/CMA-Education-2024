# 🏗️ CMA Education - Site Web Officiel

## 🎯 À Propos
Site web moderne pour CMA Education, spécialisé dans les formations BTP avec Next.js et Strapi CMS.

## 🚀 Démarrage Rapide

### Frontend (Next.js)
```bash
npm install
npm run dev
```

### CMS Strapi
```bash
cd cms-cma
npm install
npm run develop
```

## 📋 Fonctionnalités
- ✅ Site web responsive moderne
- ✅ CMS Strapi pour la gestion de contenu
- ✅ Système de brochures par email
- ✅ Blog intégré
- ✅ Galerie de formations
- ✅ Panel d'administration complet

## 🛠️ Technologies
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **CMS**: Strapi 4.25
- **Base de données**: PostgreSQL (production), SQLite (dev)
- **Déploiement**: Vercel (frontend), Heroku/Railway (Strapi)

## 📚 Documentation
- [Guide de Déploiement Complet](GUIDE_DEPLOYMENT_COMPLET.md)
- [Démarrage Rapide](DEMARRAGE_RAPIDE_DEPLOYMENT.md)
- [Configuration Strapi](GUIDE_VISUEL_CONFIGURATION_STRAPI.md)

## 🚀 Déploiement

### Déploiement automatique
```bash
npm run deploy
```

### Déploiement manuel
1. **Frontend sur Vercel**
   ```bash
   npm run build
   npm run deploy:frontend
   ```

2. **Strapi sur Heroku/Railway**
   ```bash
   npm run deploy:strapi
   ```

## 📧 Contact
- Email: contact.academy@cma-education.com
- Site: [CMA Education](https://cma-education.vercel.app)

## 📄 Licence
Projet privé - CMA Education © 2024
