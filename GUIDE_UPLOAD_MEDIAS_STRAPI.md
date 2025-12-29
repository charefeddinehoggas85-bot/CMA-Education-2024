# 📤 GUIDE UPLOAD MÉDIAS DANS STRAPI

## 🎯 PROBLÈME IDENTIFIÉ
Les médias sont dans votre dossier `public/` mais **pas encore uploadés dans Strapi Media Library**.

## 📁 MÉDIAS À UPLOADER (6 fichiers)

### 🎬 Vidéo (1 fichier)
- **`public/videos/hero-background.mp4`** (44 MB)

### 🖼️ Images (5 fichiers)
- **`public/images/hero/hero-bg.jpg`** (0 KB)
- **`public/images/hero/construction-hero.svg`** (3 KB)
- **`public/images/blog-hero.jpg`** (270 KB)
- **`public/images/contact-hero.jpg`** (238 KB)
- **`public/images/rejoignez-hero.jpg`** (275 KB)

---

## 🔧 ÉTAPES D'UPLOAD DÉTAILLÉES

### ÉTAPE 1: OUVRIR STRAPI ADMIN (1 min)

#### 1.1 Accéder à l'Admin
```
🌐 Ouvrir: http://localhost:1337/admin
```

#### 1.2 Se Connecter
- Entrer vos identifiants admin Strapi
- Cliquer "Sign in"

### ÉTAPE 2: ACCÉDER À MEDIA LIBRARY (1 min)

#### 2.1 Menu Media Library
```
📍 Dans le menu de gauche, cliquer sur:
📸 Media Library
```

#### 2.2 Vérifier l'État Actuel
- Vous devriez voir une bibliothèque vide ou avec peu de fichiers
- C'est normal, nous allons les ajouter maintenant

### ÉTAPE 3: UPLOADER LES FICHIERS (5 min)

#### 3.1 Bouton Upload
```
📤 Cliquer sur "Upload assets" (bouton bleu en haut à droite)
```

#### 3.2 Sélectionner les Fichiers
```
📂 Méthode 1: Drag & Drop
- Ouvrir l'explorateur Windows
- Naviguer vers votre projet CMA2026
- Faire glisser les fichiers un par un dans Strapi

📂 Méthode 2: Sélection Manuelle
- Cliquer "Browse files"
- Naviguer vers les dossiers et sélectionner
```

#### 3.3 Upload Fichier par Fichier

**1. Vidéo Hero Background**
```
📁 Aller dans: D:\GITHUB\CMA2026\public\videos\
📹 Sélectionner: hero-background.mp4 (44 MB)
⏳ Attendre upload (peut prendre 1-2 minutes)
✅ Vérifier que la vidéo apparaît dans Media Library
```

**2. Image Hero Background**
```
📁 Aller dans: D:\GITHUB\CMA2026\public\images\hero\
🖼️ Sélectionner: hero-bg.jpg
⏳ Upload rapide
✅ Vérifier aperçu image
```

**3. Icône Construction**
```
📁 Même dossier: D:\GITHUB\CMA2026\public\images\hero\
🎨 Sélectionner: construction-hero.svg
⏳ Upload rapide
✅ Vérifier icône SVG
```

**4. Image Blog Hero**
```
📁 Aller dans: D:\GITHUB\CMA2026\public\images\
🖼️ Sélectionner: blog-hero.jpg
⏳ Upload rapide
✅ Vérifier aperçu
```

**5. Image Contact Hero**
```
📁 Même dossier: D:\GITHUB\CMA2026\public\images\
🖼️ Sélectionner: contact-hero.jpg
⏳ Upload rapide
✅ Vérifier aperçu
```

**6. Image Rejoignez Hero**
```
📁 Même dossier: D:\GITHUB\CMA2026\public\images\
🖼️ Sélectionner: rejoignez-hero.jpg
⏳ Upload rapide
✅ Vérifier aperçu
```

### ÉTAPE 4: ORGANISER LES MÉDIAS (2 min)

#### 4.1 Créer des Dossiers (Optionnel)
```
📁 Cliquer "Create folder"
📁 Créer dossier "Hero"
📁 Créer dossier "Pages"
```

#### 4.2 Organiser les Fichiers
```
📹 hero-background.mp4 → Dossier "Hero"
🖼️ hero-bg.jpg → Dossier "Hero"
🎨 construction-hero.svg → Dossier "Hero"
🖼️ blog-hero.jpg → Dossier "Pages"
🖼️ contact-hero.jpg → Dossier "Pages"
🖼️ rejoignez-hero.jpg → Dossier "Pages"
```

### ÉTAPE 5: VALIDATION UPLOAD (1 min)

#### 5.1 Vérifier Tous les Fichiers
```
✅ 6 fichiers uploadés avec succès
✅ Vidéo 44 MB visible avec aperçu
✅ 5 images avec miniatures correctes
✅ Pas d'erreurs d'upload
```

#### 5.2 Tester les Aperçus
- Cliquer sur chaque fichier
- Vérifier que l'aperçu s'affiche
- Noter les URLs générées par Strapi

---

## 🔗 APRÈS L'UPLOAD: CONFIGURATION

### ÉTAPE 6: CONFIGURER SITE SETTINGS (3 min)

#### 6.1 Accéder à Site Settings
```
📍 Content Manager > Collection Types > Site-settings
```

#### 6.2 Créer/Modifier l'Entrée
```
📝 Cliquer "Create new entry" ou modifier existant
```

#### 6.3 Lier les Médias Hero
```
🎬 Hero Background Video:
   - Cliquer champ "Hero Background Video"
   - Sélectionner "hero-background.mp4" uploadé
   - Confirmer

🖼️ Hero Background Image:
   - Cliquer champ "Hero Background Image"
   - Sélectionner "hero-bg.jpg" uploadé
   - Confirmer

🎨 Hero Icon:
   - Cliquer champ "Hero Icon"
   - Sélectionner "construction-hero.svg" uploadé
   - Confirmer
```

#### 6.4 Remplir les Textes Hero
```
🏷️ Hero Title: L'Academy - Devenez l'acteur du BTP d'aujourd'hui et de demain
🏷️ Hero Subtitle: Centre de Formation BTP d'Excellence
📝 Hero Description: Formations BTP en alternance, reconversion et VAE. Du Bac+2 au Bac+5 avec nos partenaires entreprises d'excellence.
```

#### 6.5 Sauvegarder
```
💾 Cliquer "Save"
✅ Attendre confirmation
```

---

## 🧪 TEST FINAL

### ÉTAPE 7: VALIDATION VISUELLE (2 min)

#### 7.1 Tester le Site
```
🌐 Ouvrir: http://localhost:3000
```

#### 7.2 Vérifications Hero
```
✅ Vidéo hero-background.mp4 se lance automatiquement
✅ Texte "L'Academy - Devenez l'acteur..." affiché
✅ Sous-titre "Centre de Formation BTP d'Excellence"
✅ Description complète visible
✅ Overlay gradient sur la vidéo
✅ Animations fluides
```

#### 7.3 Test Final Automatique
```bash
node scripts/test-migration-100-complete.js
```

---

## 🆘 DÉPANNAGE

### Problème: Fichiers Trop Volumineux
```
⚠️ Si hero-background.mp4 (44 MB) ne s'upload pas:
1. Vérifier la limite upload Strapi
2. Augmenter la limite dans strapi config
3. Ou compresser la vidéo
```

### Problème: Erreur d'Upload
```
⚠️ Si erreurs d'upload:
1. Vérifier connexion internet
2. Redémarrer Strapi
3. Vider cache navigateur
4. Réessayer fichier par fichier
```

### Problème: Médias Non Visibles
```
⚠️ Si médias uploadés mais non visibles:
1. Rafraîchir Media Library
2. Vérifier permissions fichiers
3. Redémarrer Strapi
```

---

## 🎯 RÉSULTAT ATTENDU

### Après Upload Réussi
```
📸 Media Library: 6 fichiers uploadés
🎬 Vidéo: hero-background.mp4 (44 MB)
🖼️ Images: 5 fichiers hero
📁 Organisation: Dossiers Hero/Pages
```

### Après Configuration
```
🏠 Site Settings: Hero configuré avec médias
🌐 Site Web: Vidéo background fonctionnelle
📱 Responsive: Adaptation mobile/desktop
✅ Migration: Proche de 100%
```

---

## 🎉 PROCHAINE ÉTAPE

**Après avoir uploadé les médias, il ne restera que :**
1. ✅ Configurer les permissions APIs (10 min)
2. ✅ Lier les médias aux content types (5 min)
3. ✅ Test final 100% (2 min)

**Total restant : 17 minutes pour la perfection absolue !**

---

*Guide créé le 23/12/2024 - Upload médias Strapi*