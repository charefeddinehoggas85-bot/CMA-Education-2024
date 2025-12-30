# 🚨 Solutions aux Problèmes de Production

## Problèmes Identifiés

### 1. Mixed Content Error
```
Mixed Content: The page at 'https://cma-education-2024.vercel.app/' was loaded over HTTPS, 
but requested an insecure element 'http://localhost:1337/uploads/Design_sans_titre_4_d438e047b5.mp4'
```

### 2. API Partners 404 Error
```
GET https://cma-education-strapi-production.up.railway.app/api/partners?populate=*&sort=ordre:asc 404 (Not Found)
```

### 3. Video 503 Error
```
GET http://localhost:1337/uploads/Design_sans_titre_4_d438e047b5.mp4 503 (Service Unavailable)
```

## 🔧 Solutions Immédiates

### Étape 1: Créer le Content Type Partners sur Railway Strapi

1. **Accéder à l'admin Strapi:**
   ```
   https://cma-education-strapi-production.up.railway.app/admin
   ```

2. **Créer le content type "Partner":**
   - Aller dans `Content-Type Builder`
   - Cliquer sur `Create new collection type`
   - Nom: `partner` (singulier)
   - Ajouter les champs suivants:

   ```json
   {
     "nom": { "type": "string", "required": true },
     "description": { "type": "text" },
     "logo": { "type": "media", "multiple": false, "allowedTypes": ["images"] },
     "url": { "type": "string" },
     "featured": { "type": "boolean", "default": false },
     "ordre": { "type": "integer", "default": 1 }
   }
   ```

3. **Configurer les permissions:**
   - Aller dans `Settings > Users & Permissions Plugin > Roles > Public`
   - Activer `find` et `findOne` pour `Partner`
   - Sauvegarder

4. **Importer les données:**
   ```bash
   node scripts/fix-all-production-issues.js
   ```

### Étape 2: Configurer les Variables d'Environnement Vercel

1. **Supprimer les anciennes variables (si elles existent):**
   ```bash
   vercel env rm NEXT_PUBLIC_STRAPI_URL production
   vercel env rm STRAPI_API_TOKEN production
   ```

2. **Ajouter les nouvelles variables:**
   ```bash
   vercel env add NEXT_PUBLIC_STRAPI_URL production
   # Entrer: https://cma-education-strapi-production.up.railway.app
   
   vercel env add STRAPI_API_TOKEN production
   # Entrer le token Strapi complet
   ```

3. **Redéployer:**
   ```bash
   vercel --prod
   ```

### Étape 3: Corriger la Vidéo Hero

La vidéo hero avec URL localhost a été temporairement désactivée pour éviter l'erreur Mixed Content.

**Options pour la réactiver:**

1. **Option A: Uploader une nouvelle vidéo**
   - Aller dans Railway Strapi Admin > Media Library
   - Uploader la vidéo `Design_sans_titre_4.mp4`
   - Associer à `Site Setting > Hero Video`

2. **Option B: Utiliser une vidéo externe**
   - Héberger la vidéo sur YouTube/Vimeo
   - Utiliser un embed ou URL directe

3. **Option C: Garder désactivée temporairement**
   - La section hero fonctionne sans vidéo
   - Peut être réactivée plus tard

## 📋 Vérifications Post-Déploiement

### Tests à effectuer:

1. **API Partners accessible:**
   ```
   https://cma-education-strapi-production.up.railway.app/api/partners
   ```
   ✅ Doit retourner 200 avec les données des partenaires

2. **Plus d'erreur Mixed Content:**
   - Ouvrir la console du navigateur sur le site
   - Vérifier qu'il n'y a plus d'erreurs localhost

3. **Site fonctionnel:**
   ```
   https://cma-education-2024.vercel.app
   ```
   ✅ Toutes les sections doivent s'afficher correctement

## 🔗 Liens Utiles

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Railway Strapi Admin:** https://cma-education-strapi-production.up.railway.app/admin
- **Site de Production:** https://cma-education-2024.vercel.app

## 📊 Scripts de Diagnostic

### Test rapide des APIs:
```javascript
// À exécuter dans la console du navigateur
const testAPIs = async () => {
  const baseURL = 'https://cma-education-strapi-production.up.railway.app'
  const endpoints = ['/api/formations', '/api/partners', '/api/site-setting']
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(baseURL + endpoint)
      console.log(`${endpoint}: ${response.status}`)
    } catch (error) {
      console.log(`${endpoint}: ERROR`)
    }
  }
}

testAPIs()
```

### Scripts disponibles:
```bash
# Diagnostic complet
node scripts/fix-production-issues.js

# Correction des variables d'environnement
node scripts/fix-vercel-environment-variables.js

# Correction complète (après création du content type)
node scripts/fix-all-production-issues.js
```

## ⚡ Actions Prioritaires

1. **IMMÉDIAT:** Créer le content type Partners sur Railway Strapi
2. **IMMÉDIAT:** Configurer les variables d'environnement Vercel
3. **IMMÉDIAT:** Redéployer sur Vercel
4. **OPTIONNEL:** Réactiver la vidéo hero avec une URL correcte

## ✅ Résultat Attendu

Après application de ces solutions:
- ✅ Plus d'erreur 404 sur `/api/partners`
- ✅ Plus d'erreur Mixed Content (localhost URLs)
- ✅ Plus d'erreur 503 sur la vidéo
- ✅ Site entièrement fonctionnel en production

---

**Temps estimé:** 15-30 minutes
**Complexité:** Faible (configuration principalement)
**Impact:** Critique (résout tous les problèmes de production)