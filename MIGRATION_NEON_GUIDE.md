# 🚀 Guide de Migration vers Neon Database

## Vue d'ensemble
Ce guide vous accompagne pour migrer votre base de données Strapi locale (remplie) vers Neon (vide).

## 📋 Prérequis

### 1. Compte Neon
- Créez un compte sur [neon.tech](https://neon.tech)
- Créez une nouvelle base de données
- Récupérez l'URL de connexion

### 2. Outils nécessaires
```bash
# Vérifiez que vous avez PostgreSQL client tools
pg_dump --version
psql --version
```

Si pas installé :
- **Windows**: Téléchargez PostgreSQL depuis postgresql.org
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql-client`

## 🔧 Configuration

### 1. Récupérer l'URL Neon
Dans votre dashboard Neon, copiez l'URL de connexion qui ressemble à :
```
postgresql://username:password@ep-xxx-xxx.neon.tech/dbname?sslmode=require
```

### 2. Configurer les variables d'environnement
Ajoutez à votre fichier `cms-cma/.env` :
```env
# URL Neon pour la migration
NEON_DATABASE_URL=postgresql://username:password@ep-xxx-xxx.neon.tech/dbname?sslmode=require
```

## 🚀 Exécution de la migration

### 1. Lancer le script de migration
```bash
node scripts/migrate-to-neon.js
```

### 2. Que fait le script ?
1. ✅ Vérifie les prérequis (pg_dump, connexions)
2. 📤 Exporte la base locale avec `pg_dump`
3. 📥 Importe vers Neon avec `psql`
4. 🔍 Vérifie que les données sont bien transférées
5. 🧹 Nettoie les fichiers temporaires

## 📊 Vérification des données

Le script vérifie automatiquement ces tables :
- `formations` - Vos formations
- `articles_blog` - Articles de blog
- `formateurs` - Formateurs
- `partners` - Partenaires

## 🔄 Basculer Strapi vers Neon

### 1. Mettre à jour la configuration
Dans `cms-cma/.env`, remplacez les variables locales par :
```env
# Commentez ou supprimez les variables locales
# DATABASE_HOST=127.0.0.1
# DATABASE_PORT=5432
# DATABASE_NAME=cma_cms
# DATABASE_USERNAME=postgres
# DATABASE_PASSWORD=root

# Ajoutez l'URL Neon
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.neon.tech/dbname?sslmode=require
```

### 2. Redémarrer Strapi
```bash
cd cms-cma
npm run develop
```

### 3. Vérifier l'admin
- Ouvrez `http://localhost:1337/admin`
- Vérifiez que toutes vos données sont présentes
- Testez la création/modification de contenu

## 🛠️ Dépannage

### Erreur de connexion Neon
```bash
# Testez manuellement la connexion
psql "postgresql://username:password@ep-xxx-xxx.neon.tech/dbname?sslmode=require" -c "SELECT version();"
```

### Erreur pg_dump non trouvé
- Installez PostgreSQL client tools
- Ajoutez PostgreSQL au PATH système

### Erreur d'import
- Vérifiez que la base Neon est vide
- Certaines erreurs sont normales (tables existantes)

### Données manquantes
```bash
# Vérifiez les tables dans Neon
psql "VOTRE_URL_NEON" -c "\dt"

# Comptez les enregistrements
psql "VOTRE_URL_NEON" -c "SELECT COUNT(*) FROM formations;"
```

## 📝 Checklist post-migration

- [ ] Strapi démarre avec Neon
- [ ] Admin accessible
- [ ] Formations visibles
- [ ] Blog articles présents
- [ ] Formateurs affichés
- [ ] Médias/images fonctionnels
- [ ] Frontend connecté à Strapi

## 🔒 Sécurité

### Variables sensibles
- Ne commitez jamais l'URL Neon dans Git
- Utilisez des variables d'environnement
- Configurez les IP autorisées dans Neon

### Sauvegarde
```bash
# Créez une sauvegarde avant migration
pg_dump "postgresql://postgres:root@127.0.0.1:5432/cma_cms" > backup-avant-migration.sql
```

## 🚨 Rollback

Si problème, revenez à la base locale :
```env
# Dans cms-cma/.env, commentez Neon et décommentez local
DATABASE_URL=
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=cma_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=root
```

## 📞 Support

En cas de problème :
1. Vérifiez les logs Strapi
2. Testez les connexions manuellement
3. Consultez la documentation Neon
4. Vérifiez les permissions de la base

---

**Temps estimé** : 10-15 minutes
**Difficulté** : Intermédiaire
**Prérequis** : PostgreSQL client tools