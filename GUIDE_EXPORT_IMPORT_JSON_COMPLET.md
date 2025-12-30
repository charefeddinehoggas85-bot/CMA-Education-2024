# 📊 GUIDE COMPLET : Export/Import JSON Clone → Railway

## 🎯 **OBJECTIF**
Transférer toutes les données depuis votre Strapi cloné vers Railway via export/import JSON.

## 📋 **PRÉREQUIS**
- ✅ Clone Strapi : `D:\GITHUB\CMA2026\cms-cma\CMA-Education-Strapi`
- ✅ Railway Strapi : `https://cma-education-strapi-production.up.railway.app`
- ✅ Structure déjà synchronisée (Content Types créés)

---

## 🚀 **ÉTAPE 1 : Démarrer le Clone Strapi**

### **1.1 Ouvrir un terminal dans le clone**
```bash
cd "D:\GITHUB\CMA2026\cms-cma\CMA-Education-Strapi"
```

### **1.2 Installer les dépendances (si nécessaire)**
```bash
npm install
```

### **1.3 Démarrer le clone**
```bash
npm run develop
```

### **1.4 Vérifier l'accès**
- **URL :** `http://localhost:1337/admin`
- **Créer un compte admin** si demandé
- **Vérifier** que toutes les données sont visibles

---

## 📤 **ÉTAPE 2 : Export depuis le Clone**

### **2.1 Ordre d'export (IMPORTANT)**
Respecter cet ordre pour éviter les erreurs de relations :

1. **Formation Categories** (d'abord - pas de dépendances)
2. **Formateurs** 
3. **Formations** (dépend des catégories)
4. **Articles Blog** et **Catégories Blog**
5. **Autres Content Types**

### **2.2 Export Formation Categories**
1. **Aller à :** `http://localhost:1337/admin/content-manager/collectionType/api::formation-category.formation-category`
2. **Sélectionner tout :** Cocher la case en haut à gauche
3. **Export :** Bouton "Export" → **JSON**
4. **Sauvegarder :** `formation-categories-export.json`

### **2.3 Export Formateurs**
1. **Aller à :** `http://localhost:1337/admin/content-manager/collectionType/api::formateur.formateur`
2. **Sélectionner tout** → **Export JSON**
3. **Sauvegarder :** `formateurs-export.json`

### **2.4 Export Formations**
1. **Aller à :** `http://localhost:1337/admin/content-manager/collectionType/api::formation.formation`
2. **Sélectionner tout** → **Export JSON**
3. **Sauvegarder :** `formations-export.json`

### **2.5 Export Articles Blog**
1. **Catégories Blog :**
   - URL : `http://localhost:1337/admin/content-manager/collectionType/api::categorie-blog.categorie-blog`
   - Export : `categories-blog-export.json`

2. **Articles Blog :**
   - URL : `http://localhost:1337/admin/content-manager/collectionType/api::article-blog.article-blog`
   - Export : `articles-blog-export.json`

### **2.6 Export Autres Content Types**
Pour chaque Content Type restant :
- **Statistiques Site**
- **Étapes Admission**
- **Pages** (VAE, Entreprises, Partenaires, etc.)
- **Témoignages**
- **Partenaires**

**Répéter :** Sélectionner tout → Export JSON → Sauvegarder

---

## 📥 **ÉTAPE 3 : Import dans Railway**

### **3.1 Accéder à Railway Admin**
- **URL :** `https://cma-education-strapi-production.up.railway.app/admin`
- **Se connecter** avec vos identifiants

### **3.2 Import Formation Categories (EN PREMIER)**
1. **Aller à :** Content Manager → Formation Categories
2. **Import :** Bouton "Import" en haut à droite
3. **Sélectionner :** `formation-categories-export.json`
4. **Confirmer** l'import
5. **Vérifier :** Les catégories apparaissent dans la liste

### **3.3 Import Formateurs**
1. **Content Manager → Formateurs**
2. **Import :** `formateurs-export.json`
3. **Vérifier** l'import

### **3.4 Import Formations**
1. **Content Manager → Formations**
2. **Import :** `formations-export.json`
3. **Vérifier** que les relations avec les catégories fonctionnent

### **3.5 Import Blog**
1. **Catégories Blog :** Import `categories-blog-export.json`
2. **Articles Blog :** Import `articles-blog-export.json`

### **3.6 Import Autres Content Types**
Continuer avec tous les autres fichiers JSON exportés.

---

## 📸 **ÉTAPE 4 : Upload des Médias**

### **4.1 Localiser les médias du clone**
```
D:\GITHUB\CMA2026\cms-cma\CMA-Education-Strapi\public\uploads\
```

### **4.2 Upload dans Railway**
1. **Railway Admin → Media Library**
2. **Upload assets**
3. **Sélectionner** les fichiers par lots (max 50 à la fois)
4. **Répéter** jusqu'à avoir uploadé tous les médias

### **4.3 Réassocier les médias (si nécessaire)**
Si les médias ne s'associent pas automatiquement :
1. **Éditer** chaque contenu avec des médias
2. **Réassocier** les images depuis la Media Library
3. **Sauvegarder**

---

## ✅ **ÉTAPE 5 : Vérification**

### **5.1 Test des APIs**
```bash
# Tester depuis votre projet
node scripts/test-frontend-railway-connection.js
```

### **5.2 Vérifications manuelles**
1. **Formations :** Vérifier que toutes les formations sont visibles
2. **Relations :** Formations → Catégories fonctionnent
3. **Médias :** Images s'affichent correctement
4. **Blog :** Articles avec images

### **5.3 Test Frontend**
```bash
# Redémarrer le frontend
npm run dev
```
- **Vérifier :** Plus d'erreurs 503
- **Tester :** Navigation, formations, blog

---

## 🚨 **DÉPANNAGE**

### **Erreur : Relations manquantes**
- **Cause :** Ordre d'import incorrect
- **Solution :** Importer d'abord les Content Types sans dépendances

### **Erreur : Médias non trouvés**
- **Cause :** Médias pas encore uploadés
- **Solution :** Upload médias puis réassocier

### **Erreur : Permissions**
- **Cause :** Permissions Public non configurées
- **Solution :** Settings → Roles → Public → Cocher "find" et "findOne"

---

## 📊 **RÉSULTAT ATTENDU**

Après completion :
- ✅ **Toutes les données** transférées
- ✅ **Relations** préservées
- ✅ **Médias** accessibles
- ✅ **Frontend** entièrement fonctionnel
- ✅ **APIs** répondent correctement

---

## 🔗 **LIENS UTILES**

- **Clone Admin :** `http://localhost:1337/admin`
- **Railway Admin :** `https://cma-education-strapi-production.up.railway.app/admin`
- **Frontend :** `http://localhost:3000`
- **Test APIs :** `node scripts/test-frontend-railway-connection.js`

---

## ⏱️ **TEMPS ESTIMÉ**
- **Export :** 30-45 minutes
- **Import :** 30-45 minutes  
- **Upload médias :** 45-60 minutes
- **Vérifications :** 15 minutes
- **TOTAL :** 2-3 heures

---

**🎯 CONSEIL :** Procédez étape par étape et vérifiez chaque import avant de passer au suivant.