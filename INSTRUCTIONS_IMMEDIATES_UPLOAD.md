# 🚀 INSTRUCTIONS IMMÉDIATES - UPLOAD MÉDIAS

## ⚠️ IMPORTANT: CONFIGURATION MISE À JOUR
J'ai automatiquement mis à jour votre configuration Strapi pour accepter les gros fichiers (vidéo 44 MB).

## 🔧 ÉTAPE 1: REDÉMARRER STRAPI (2 min)

### 1.1 Arrêter Strapi Actuel
```
Dans le terminal où Strapi tourne:
Ctrl + C (pour arrêter)
```

### 1.2 Relancer Strapi
```bash
cd cms-cma
npm run develop
```

### 1.3 Attendre Démarrage Complet
```
Attendre le message:
"Welcome back! To manage your project 🚀, go to the administration panel at: http://localhost:1337/admin"
```

---

## 📤 ÉTAPE 2: UPLOAD MÉDIAS (5 min)

### 2.1 Ouvrir Admin Strapi
```
🌐 http://localhost:1337/admin
```

### 2.2 Accéder Media Library
```
📍 Menu gauche > Media Library
```

### 2.3 Upload Fichiers Un Par Un

#### Fichier 1: Vidéo Hero (CRITIQUE - 44 MB)
```
📤 Cliquer "Upload assets"
📁 Naviguer vers: D:\GITHUB\CMA2026\public\videos\
📹 Sélectionner: hero-background.mp4
⏳ Attendre upload (1-2 minutes)
✅ Vérifier aperçu vidéo
```

#### Fichier 2: Image Hero Background
```
📤 Cliquer "Upload assets" 
📁 Naviguer vers: D:\GITHUB\CMA2026\public\images\hero\
🖼️ Sélectionner: hero-bg.jpg
⏳ Upload rapide
✅ Vérifier aperçu
```

#### Fichier 3: Icône Construction
```
📁 Même dossier: D:\GITHUB\CMA2026\public\images\hero\
🎨 Sélectionner: construction-hero.svg
⏳ Upload rapide
✅ Vérifier icône SVG
```

#### Fichier 4: Image Blog Hero
```
📁 Naviguer vers: D:\GITHUB\CMA2026\public\images\
🖼️ Sélectionner: blog-hero.jpg
⏳ Upload rapide
✅ Vérifier aperçu
```

#### Fichier 5: Image Contact Hero
```
📁 Même dossier: D:\GITHUB\CMA2026\public\images\
🖼️ Sélectionner: contact-hero.jpg
⏳ Upload rapide
✅ Vérifier aperçu
```

#### Fichier 6: Image Rejoignez Hero
```
📁 Même dossier: D:\GITHUB\CMA2026\public\images\
🖼️ Sélectionner: rejoignez-hero.jpg
⏳ Upload rapide
✅ Vérifier aperçu
```

---

## ✅ ÉTAPE 3: VALIDATION (1 min)

### 3.1 Vérifier Media Library
```
📊 Compter: 6 fichiers uploadés
📹 Vidéo: hero-background.mp4 (44 MB) avec aperçu
🖼️ Images: 5 fichiers avec miniatures
❌ Aucune erreur d'upload
```

### 3.2 Test Rapide
```
🎬 Cliquer sur hero-background.mp4
✅ Vérifier que la vidéo se lit
🖼️ Cliquer sur chaque image
✅ Vérifier aperçus corrects
```

---

## 🎯 APRÈS L'UPLOAD RÉUSSI

### Prochaines Étapes (15 min restantes)
1. **Configurer Site Settings** avec les médias uploadés (5 min)
2. **Configurer permissions APIs** (10 min)
3. **Test final 100%** (2 min)

### Résultat Attendu
```
📸 Media Library: 6 fichiers (45 MB total)
🎬 Vidéo hero fonctionnelle
🖼️ Images hero disponibles
🔗 Prêt pour configuration content types
```

---

## 🆘 EN CAS DE PROBLÈME

### Vidéo Trop Lourde (44 MB)
```
Si l'upload de la vidéo échoue:
1. Vérifier que Strapi a bien redémarré
2. Attendre 2-3 minutes pour l'upload
3. Vérifier connexion internet stable
4. Si échec: compresser la vidéo ou utiliser image fallback
```

### Erreur de Configuration
```
Si erreurs après redémarrage:
1. Vérifier logs Strapi dans terminal
2. Corriger erreurs de syntaxe si nécessaire
3. Relancer npm run develop
```

### Upload Bloqué
```
Si uploads ne fonctionnent pas:
1. Rafraîchir page admin Strapi
2. Vider cache navigateur
3. Réessayer fichier par fichier
4. Vérifier permissions dossier uploads
```

---

## 🎉 OBJECTIF

**Après ces étapes, vous aurez :**
- ✅ **6 médias hero** uploadés dans Strapi
- ✅ **Vidéo 44 MB** fonctionnelle
- ✅ **Configuration optimisée** pour gros fichiers
- ✅ **Prêt pour la configuration finale** vers 100%

**Temps total estimé : 8 minutes**

---

*Instructions créées le 23/12/2024 - Upload médias immédiat*