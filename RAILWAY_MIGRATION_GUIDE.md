# 🚀 Guide Migration Complète : Localhost → Railway

## 🎯 Objectif

Migrer **TOUT** votre contenu Strapi local vers Railway en **30 minutes**.

## ✅ Prérequis

- ✅ Railway Strapi déployé et fonctionnel
- ✅ Compte admin créé sur Railway
- ✅ API Token généré
- ✅ Variables Vercel configurées

## 📋 Plan de Migration

### **Phase 1 : Préparation (5 minutes)**
1. **Vérifier l'URL Railway**
2. **Configurer les variables d'environnement**
3. **Tester la connexion**

### **Phase 2 : Migration Automatique (15 minutes)**
1. **Exécuter le script de migration**
2. **Vérifier l'import des données**
3. **Configurer les permissions**

### **Phase 3 : Upload Médias (10 minutes)**
1. **Uploader les images manuellement**
2. **Configurer les médias hero**
3. **Tester l'affichage**

## 🚀 Exécution

### **Étape 1 : Configuration Variables**

**Ajoutez dans `.env.local`** :
```bash
# URL Railway (remplacez par la vraie)
STRAPI_URL=https://votre-railway-url.up.railway.app

# API Token (généré dans Railway admin)
STRAPI_API_TOKEN=votre-token-ici
```

### **Étape 2 : Génération API Token**

1. **Allez sur** : `https://votre-railway-url.up.railway.app/admin`
2. **Connectez-vous** avec votre compte admin
3. **Settings** → **API Tokens** → **Create new token**
4. **Name** : `Migration Token`
5. **Token type** : `Full access`
6. **Copiez le token** et ajoutez-le dans `.env.local`

### **Étape 3 : Exécution Migration**

```bash
# Lancer la migration automatique
node scripts/migrate-to-railway-complete.js
```

**Résultat attendu** :
```
🚀 MIGRATION COMPLÈTE LOCALHOST → RAILWAY
==========================================

✅ Connexion Railway réussie !

📦 ÉTAPE 1: Création des Content Types
   ✅ formation existe
   ✅ formateur existe
   ✅ blog-article existe

🎓 ÉTAPE 2: Import des Formations
   ✅ Chef de Projets BTP - 1 an importée
   ✅ Conducteur de Travaux - Reconversion importée

👨‍🏫 ÉTAPE 3: Import des Formateurs
   ✅ Jean Dupont importé
   ✅ Marie Martin importée

🎉 MIGRATION TERMINÉE !
```

### **Étape 4 : Configuration Permissions**

**Dans Railway Admin** :
1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. **Cochez "find" et "findOne"** pour :
   - Formation
   - Formateur
   - Blog-article
   - Site-setting
   - Testimonial
   - Partner
3. **Save**

### **Étape 5 : Upload Médias**

**Manuellement dans Railway Admin** :
1. **Media Library** → **Upload**
2. **Uploadez vos images** :
   - Images formations
   - Photos formateurs
   - Logos partenaires
   - Images hero

## 🧪 Tests de Vérification

### **Test 1 : API Formations**
```bash
curl https://votre-railway-url.up.railway.app/api/formations
```
**Résultat attendu** : Liste des formations

### **Test 2 : Frontend Integration**
1. **Redéployez Vercel** (pour prendre les nouvelles variables)
2. **Testez** : `https://cma-education-2024.vercel.app`
3. **Vérifiez** que les formations s'affichent

### **Test 3 : Images**
```bash
curl https://votre-railway-url.up.railway.app/api/formations?populate=*
```
**Résultat attendu** : Formations avec images

## 🔧 Dépannage

### **Erreur : API Token invalide**
```
❌ HTTP 401: Unauthorized
```
**Solution** : Régénérez le token dans Railway admin

### **Erreur : Content Type manquant**
```
❌ HTTP 404: Not Found
```
**Solution** : Créez les Content Types manuellement dans Railway admin

### **Erreur : Connexion échouée**
```
❌ Échec connexion Railway
```
**Solution** : Vérifiez l'URL Railway dans `.env.local`

## 📊 Checklist Final

### **Backend Railway**
- [ ] ✅ Strapi démarré
- [ ] ✅ Admin accessible
- [ ] ✅ API Token généré
- [ ] ✅ Content Types créés
- [ ] ✅ Données importées
- [ ] ✅ Permissions configurées
- [ ] ✅ Médias uploadés

### **Frontend Vercel**
- [ ] ✅ Variables d'environnement ajoutées
- [ ] ✅ Redéploiement effectué
- [ ] ✅ Site accessible
- [ ] ✅ Formations affichées
- [ ] ✅ Images visibles

### **Intégration Complète**
- [ ] ✅ API répond correctement
- [ ] ✅ Frontend consomme Railway
- [ ] ✅ Images s'affichent
- [ ] ✅ Navigation fonctionne

## 🎉 Résultat Final

**Une fois terminé, vous aurez** :

- 🏗️ **CMS Strapi** sur Railway avec tout votre contenu
- 🌐 **Frontend Next.js** sur Vercel connecté à Railway
- 📊 **Base de données** PostgreSQL sur Neon
- 🔗 **Intégration complète** fonctionnelle

## 📞 Support

**Si problème** :
1. **Vérifiez les logs** Railway
2. **Testez l'API** manuellement
3. **Vérifiez les variables** Vercel
4. **Redéployez** si nécessaire

---

**Prêt pour la migration ? Exécutez le script !** 🚀

```bash
node scripts/migrate-to-railway-complete.js
```