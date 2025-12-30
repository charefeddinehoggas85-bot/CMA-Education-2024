# 🚨 SOLUTION IMMÉDIATE - Configuration Railway

## 🎯 PROBLÈME IDENTIFIÉ

Votre frontend essaie encore de se connecter à `localhost:1337` au lieu de Railway.

**Erreurs visibles :**
```
localhost:1337/api/formation-categories - 503 Error
localhost:1337/api/formations - 503 Error
localhost:1337/api/site-setting - 503 Error
```

## ✅ SOLUTION IMMÉDIATE

### **Étape 1 : Vérifier .env.local (FAIT ✅)**
```bash
STRAPI_URL=https://cma-education-strapi-production.up.railway.app
STRAPI_API_TOKEN=62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e
```

### **Étape 2 : Redémarrer le serveur de développement**
```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer
npm run dev
```

### **Étape 3 : Vérifier Vercel (si déployé)**
1. **Aller sur Vercel Dashboard**
2. **Projet CMA Education 2024**
3. **Settings → Environment Variables**
4. **Ajouter/Modifier :**
   - `STRAPI_URL` = `https://cma-education-strapi-production.up.railway.app`
   - `STRAPI_API_TOKEN` = `62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e`
5. **Redéployer**

## 🔧 ACTIONS MANUELLES NÉCESSAIRES

### **1. Configuration Railway Admin (URGENT)**

**Accédez à :** `https://cma-education-strapi-production.up.railway.app/admin`

#### **A. Créer les Content Types manquants**
1. **Content-Type Builder** → **Create new collection type**
2. **Créer :**
   - `formation` (Collection Type)
   - `formation-category` (Collection Type)  
   - `site-setting` (Single Type)
   - `statistique-site` (Collection Type)
   - `etape-admission` (Collection Type)
   - `page-admission` (Single Type)
   - `formateur` (Collection Type)

#### **B. Configurer les Permissions**
1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. **Cocher "find" et "findOne" pour TOUS les Content Types**
3. **Save**

#### **C. Uploader les Médias**
1. **Media Library** → **Upload assets**
2. **Uploader :**
   - `public/videos/hero-background.mp4`
   - `public/images/hero/hero-bg.jpg`
   - `public/images/hero/construction-hero.svg`
   - Toutes les images du dossier `public/images/`

### **2. Import du Contenu depuis le Strapi Cloné**

**Chemin du Strapi cloné :** `D:\GITHUB\CMA2026\cms-cma\CMA-Education-Strapi`

#### **Option A : Export/Import Manuel**
1. **Dans le Strapi cloné** → **Content Manager**
2. **Exporter** chaque Content Type en JSON
3. **Dans Railway Admin** → **Importer** les données

#### **Option B : Migration Automatique (Recommandé)**
```bash
# Exécuter le script de migration
node scripts/migrate-local-to-railway-complete.js
```

## 🧪 TESTS DE VÉRIFICATION

### **Test 1 : API Railway**
```bash
curl https://cma-education-strapi-production.up.railway.app/api/formations
```
**Résultat attendu :** `{"data":[],"meta":{"pagination":{...}}}`

### **Test 2 : Frontend Local**
1. **Redémarrer** `npm run dev`
2. **Ouvrir** `http://localhost:3000`
3. **Vérifier** que les erreurs 503 ont disparu

### **Test 3 : Console Browser**
- **F12** → **Console**
- **Plus d'erreurs** `localhost:1337`
- **Nouvelles requêtes** vers `cma-education-strapi-production.up.railway.app`

## 📋 CHECKLIST RAPIDE

### **Configuration (5 min)**
- [ ] ✅ `.env.local` mis à jour avec Railway URL
- [ ] ✅ Serveur dev redémarré
- [ ] ✅ Variables Vercel configurées (si applicable)

### **Railway Admin (15 min)**
- [ ] 📋 Content Types créés
- [ ] 📋 Permissions configurées
- [ ] 📋 Médias uploadés
- [ ] 📋 Contenu importé

### **Tests (5 min)**
- [ ] 📋 API Railway répond
- [ ] 📋 Frontend se connecte à Railway
- [ ] 📋 Plus d'erreurs 503

## 🎯 RÉSULTAT ATTENDU

**Après ces étapes :**
- ✅ Frontend connecté à Railway
- ✅ Plus d'erreurs 503
- ✅ Contenu visible depuis Railway
- ✅ Médias accessibles

## 🆘 SI PROBLÈME PERSISTE

1. **Vérifier** que Railway Strapi est bien démarré
2. **Tester** l'URL Railway dans le navigateur
3. **Vérifier** les permissions API dans Railway Admin
4. **Redémarrer** le serveur de développement

---

**PRIORITÉ 1 :** Redémarrer le serveur dev après avoir modifié `.env.local`
**PRIORITÉ 2 :** Créer les Content Types dans Railway Admin
**PRIORITÉ 3 :** Configurer les permissions Public