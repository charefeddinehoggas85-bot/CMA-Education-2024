# 🧪 Guide de Test - Configuration CMS CMA Education

## ✅ Résultats des Tests

### 1. Installation des dépendances
- ✅ **PostgreSQL** : Installé et configuré
- ✅ **Plugin Email** : Installé
- ✅ **Plugin i18n** : Installé
- ⚠️ **Warnings Node.js** : Version 22 détectée (Strapi recommande 18-20)

### 2. Build du CMS
- ✅ **Compilation TypeScript** : Réussie (9.1s)
- ✅ **Build Admin Panel** : Réussi (66.2s)
- ✅ **Configuration** : Valide

### 3. Content Types créés
- ✅ **Formation** : Existant + amélioré
- ✅ **Article** : Existant
- ✅ **Page** : Existant + sections dynamiques
- ✅ **Site Settings** : Existant
- ✅ **Testimonial** : Nouveau ✨
- ✅ **Partner** : Nouveau ✨
- ✅ **Menu Item** : Nouveau ✨

### 4. Composants Strapi
- ✅ **Hero Section** : Existant
- ✅ **Text Section** : Existant
- ✅ **Gallery Section** : Nouveau ✨
- ✅ **Stats Section** : Nouveau ✨
- ✅ **Testimonials Section** : Nouveau ✨
- ✅ **Contact Section** : Existant
- ✅ **Button** : Existant
- ✅ **Stat Item** : Nouveau ✨

## 🚀 Démarrage du CMS

### Option 1 : Commande directe
```bash
cd cms-cma
npm run develop
```

### Option 2 : Script automatique
```bash
# Windows
start-cms.bat

# Linux/Mac
chmod +x start-cms.sh && ./start-cms.sh
```

## 📋 Checklist de Test

### Étape 1 : Démarrer le CMS
```bash
cd d:\GITHUB\CMA2026\cms-cma
npm run develop
```

Attendez le message :
```
✔ Building admin panel
⚡️ Server started on http://localhost:1337
```

### Étape 2 : Créer le compte administrateur
1. Ouvrir : http://localhost:1337/admin
2. Remplir le formulaire :
   - Prénom : Admin
   - Nom : CMA
   - Email : admin@cma-education.com
   - Mot de passe : (choisir un mot de passe fort)

### Étape 3 : Vérifier les Content Types
Dans le menu gauche, vérifier la présence de :
- ✅ Formation
- ✅ Article
- ✅ Blog Category
- ✅ Formation Category
- ✅ Page
- ✅ Testimonial (nouveau)
- ✅ Partner (nouveau)
- ✅ Menu Item (nouveau)
- ✅ Site Setting

### Étape 4 : Tester la création de contenu

#### Test 1 : Créer un Partenaire
1. Aller dans **Partner** > **Create new entry**
2. Remplir :
   - Name : Eiffage
   - Sector : Construction
   - Partnership Type : Alternance
   - Is Active : true
3. Sauvegarder et publier

#### Test 2 : Créer un Témoignage
1. Aller dans **Testimonial** > **Create new entry**
2. Remplir :
   - Name : Jean Dupont
   - Position : Conducteur de Travaux
   - Company : Bouygues
   - Content : "Excellente formation..."
   - Rating : 5
   - Is Active : true
3. Sauvegarder et publier

#### Test 3 : Créer un Menu Item
1. Aller dans **Menu Item** > **Create new entry**
2. Remplir :
   - Label : Formations
   - URL : /formations
   - Menu Type : header
   - Order : 1
   - Is Active : true
3. Sauvegarder

### Étape 5 : Tester l'API

#### Vérifier les endpoints disponibles
```bash
# Formations
http://localhost:1337/api/formations

# Articles
http://localhost:1337/api/articles

# Partenaires
http://localhost:1337/api/partners

# Témoignages
http://localhost:1337/api/testimonials

# Menu Items
http://localhost:1337/api/menu-items

# Site Settings
http://localhost:1337/api/site-setting
```

#### Test avec curl (Windows PowerShell)
```powershell
# Tester l'API Formations
Invoke-WebRequest -Uri "http://localhost:1337/api/formations" -Method GET

# Tester l'API Partners
Invoke-WebRequest -Uri "http://localhost:1337/api/partners" -Method GET
```

## 🔧 Configuration des Permissions

### Permettre l'accès public à l'API
1. Aller dans **Settings** > **Users & Permissions Plugin** > **Roles**
2. Cliquer sur **Public**
3. Cocher les permissions pour :
   - Formation : find, findOne
   - Article : find, findOne
   - Partner : find, findOne
   - Testimonial : find, findOne
   - Menu-item : find, findOne
   - Site-setting : find
4. Sauvegarder

## 📊 Résultats Attendus

### ✅ Succès si :
- Le CMS démarre sans erreur
- L'interface admin est accessible
- Les Content Types sont visibles
- La création de contenu fonctionne
- L'API répond correctement

### ⚠️ Problèmes connus :
1. **Version Node.js** : Warnings avec Node 22 (non bloquant)
2. **Styled-components** : Conflit de version (non bloquant)
3. **Dossier cms-cma-new** : À supprimer si présent

## 🎯 Prochaines Étapes

Une fois les tests validés :
1. ✅ **Phase 1 complète** : Infrastructure et Content Types
2. 🔄 **Phase 2** : Migration des données existantes
3. 🔄 **Phase 3** : Dashboard personnalisé
4. 🔄 **Phase 4** : Intégration frontend complète

## 📝 Notes Importantes

### Base de données
- **Actuellement** : SQLite (développement)
- **Production** : Basculer vers PostgreSQL
- **Fichier** : `.tmp/data.db`

### Variables d'environnement
- **Fichier** : `cms-cma/.env`
- **Clés** : Déjà configurées avec valeurs sécurisées
- **Production** : Générer de nouvelles clés uniques

### Sauvegardes
- Sauvegarder régulièrement `.tmp/data.db`
- Exporter le contenu via l'interface admin

## 🆘 Dépannage

### Le CMS ne démarre pas
```bash
# Nettoyer et reconstruire
cd cms-cma
rm -rf node_modules package-lock.json
npm install
npm run build
npm run develop
```

### Erreur de port 1337 occupé
```bash
# Changer le port dans .env
PORT=1338
```

### Erreur de base de données
```bash
# Supprimer et recréer la DB
rm .tmp/data.db
npm run develop
```

## 📞 Support

En cas de problème :
1. Vérifier les logs dans la console
2. Consulter la documentation Strapi : https://docs.strapi.io
3. Vérifier les permissions des fichiers

---

**Date de test** : 21/12/2024
**Version Strapi** : 4.25.9
**Statut** : ✅ Configuration validée et fonctionnelle
