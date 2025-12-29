# CMS CMA Education

Panel d'administration pour le site CMA Education basé sur Strapi.

## 🚀 Installation

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run develop

# Build pour production
npm run build

# Démarrage en production
npm start
```

## 📋 Accès Admin

- **URL Admin** : http://localhost:1337/admin
- **API** : http://localhost:1337/api

## 🗂️ Content Types

### Configuration
- **Site Settings** : Configuration générale du site

### Contenu
- **Pages** : Pages dynamiques avec sections
- **Articles** : Articles de blog
- **Formations** : Formations BTP
- **Témoignages** : Témoignages clients
- **Partenaires** : Entreprises partenaires

### Taxonomies
- **Formation Categories** : Catégories de formations
- **Blog Categories** : Catégories d'articles

## 🔧 Configuration

### Variables d'environnement
Copier `.env.example` vers `.env` et configurer :

```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
```

### Base de données
Par défaut : SQLite (`.tmp/data.db`)
Production : PostgreSQL recommandé

## 📡 API Endpoints

### Formations
- `GET /api/formations` - Liste des formations
- `GET /api/formations/:id` - Détail d'une formation

### Articles
- `GET /api/articles` - Liste des articles
- `GET /api/articles/:id` - Détail d'un article

### Pages
- `GET /api/pages` - Liste des pages
- `GET /api/pages/:id` - Détail d'une page

### Configuration
- `GET /api/site-setting` - Configuration du site

## 🔐 Authentification

API Token requis pour les requêtes depuis Next.js :
1. Aller dans Settings > API Tokens
2. Créer un nouveau token
3. Ajouter le token dans Next.js : `STRAPI_API_TOKEN`

## 🚀 Déploiement

### Vercel (Recommandé)
1. Push le code sur GitHub
2. Connecter le repo à Vercel
3. Configurer les variables d'environnement
4. Déployer

### Variables d'environnement Vercel
```bash
DATABASE_URL=postgresql://...
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=salt
ADMIN_JWT_SECRET=secret
JWT_SECRET=secret
```

## 📚 Documentation

- [Strapi Documentation](https://docs.strapi.io)
- [Content Types](https://docs.strapi.io/dev-docs/backend-customization/models)
- [API Reference](https://docs.strapi.io/dev-docs/api/rest)