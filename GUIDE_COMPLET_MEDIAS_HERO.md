# 🎬 GUIDE COMPLET - MÉDIAS HERO STRAPI

## 📊 MÉDIAS HERO DISPONIBLES

### 🎬 Vidéo Principal
- **hero-background.mp4** (44 MB)
  - Usage: Vidéo de fond page d'accueil
  - Format: MP4 optimisé web
  - Lecture: Automatique, boucle, sans son

### 🖼️ Images Hero (5 fichiers)
1. **hero-bg.jpg** (0 KB) - Image de fond principale
2. **blog-hero.jpg** (270 KB) - Page blog
3. **contact-hero.jpg** (238 KB) - Page contact
4. **rejoignez-hero.jpg** (275 KB) - Section CTA
5. **construction-hero.svg** (3 KB) - Icône décorative

**Total: 6 médias (786 KB + 44 MB vidéo)**

---

## 🔧 CONFIGURATION ÉTAPE PAR ÉTAPE

### ÉTAPE 1: ACCÉDER À STRAPI ADMIN (2 min)

#### 1.1 Ouvrir l'Admin
```
🌐 URL: http://localhost:1337/admin
```

#### 1.2 Se Connecter
- Utiliser vos identifiants admin
- Vérifier que vous êtes bien connecté

---

### ÉTAPE 2: UPLOADER LES MÉDIAS (5 min)

#### 2.1 Accéder à Media Library
```
📍 Menu de gauche > Media Library
```

#### 2.2 Créer l'Organisation (Optionnel)
```
📁 Créer dossier "hero" pour organiser
📁 Créer dossier "pages" pour les images spécifiques
```

#### 2.3 Upload des Fichiers
```
📤 Cliquer "Upload assets"
📂 Sélectionner les fichiers depuis:
```

**Fichiers à uploader :**
1. `public/videos/hero-background.mp4` → Dossier "hero"
2. `public/images/hero/hero-bg.jpg` → Dossier "hero"
3. `public/images/blog-hero.jpg` → Dossier "pages"
4. `public/images/contact-hero.jpg` → Dossier "pages"
5. `public/images/rejoignez-hero.jpg` → Dossier "pages"
6. `public/images/hero/construction-hero.svg` → Dossier "hero"

#### 2.4 Vérification Upload
- ✅ 6 fichiers uploadés avec succès
- ✅ Vidéo 44 MB visible
- ✅ Images avec aperçu correct

---

### ÉTAPE 3: CONFIGURER SITE SETTINGS (5 min)

#### 3.1 Accéder à Site Settings
```
📍 Content Manager > Collection Types > Site-settings
```

#### 3.2 Créer/Modifier l'Entrée
```
📝 Cliquer "Create new entry" ou modifier existant
```

#### 3.3 Remplir les Champs Hero
```
📋 CHAMPS À CONFIGURER:

🏷️ Site Name: CMA Education

🎯 Hero Title: 
L'Academy - Devenez l'acteur du BTP d'aujourd'hui et de demain

🏷️ Hero Subtitle:
Centre de Formation BTP d'Excellence

📝 Hero Description:
Formations BTP en alternance, reconversion et VAE. Du Bac+2 au Bac+5 avec nos partenaires entreprises d'excellence.

📞 Contact Phone: 01 89 70 60 52
📧 Contact Email: contact.academy@cma-education.com
🌐 Site URL: https://cma-education.com
```

#### 3.4 Lier les Médias Hero
```
🎬 Hero Background Video:
   - Cliquer "Select files"
   - Choisir "hero-background.mp4"
   - Confirmer la sélection

🖼️ Hero Background Image:
   - Cliquer "Select files" 
   - Choisir "hero-bg.jpg"
   - Confirmer la sélection

🎨 Hero Icon:
   - Cliquer "Select files"
   - Choisir "construction-hero.svg"
   - Confirmer la sélection
```

#### 3.5 Sauvegarder
```
💾 Cliquer "Save" en haut à droite
✅ Attendre confirmation de sauvegarde
```

---

### ÉTAPE 4: CONFIGURER PAGES HERO (5 min)

#### 4.1 Accéder aux Pages
```
📍 Content Manager > Collection Types > Pages
```

#### 4.2 Créer Page Blog
```
📝 Cliquer "Create new entry"

📋 CHAMPS:
- Title: Blog - Actualités BTP
- Slug: blog
- Hero Title: Actualités & Conseils BTP
- Hero Subtitle: Restez informé des dernières tendances
- Hero Description: Découvrez nos articles, conseils et actualités du secteur BTP pour enrichir vos connaissances.
- Hero Image: Lier "blog-hero.jpg"
- SEO Title: Blog BTP - Actualités et Conseils | CMA Education

💾 Sauvegarder
```

#### 4.3 Créer Page Contact
```
📝 Cliquer "Create new entry"

📋 CHAMPS:
- Title: Contact - Candidater
- Slug: contact
- Hero Title: Candidater à nos Formations
- Hero Subtitle: Votre projet professionnel commence ici
- Hero Description: Contactez-nous pour candidater à nos formations BTP d'excellence. Accompagnement personnalisé garanti.
- Hero Image: Lier "contact-hero.jpg"
- SEO Title: Contact - Candidater aux Formations BTP | CMA Education

💾 Sauvegarder
```

#### 4.4 Créer Page Rejoignez
```
📝 Cliquer "Create new entry"

📋 CHAMPS:
- Title: Rejoignez-nous
- Slug: rejoignez
- Hero Title: Rejoignez l'Excellence BTP
- Hero Subtitle: Votre avenir commence maintenant
- Hero Description: Intégrez une école d'excellence et construisez votre carrière dans le BTP avec nos formations reconnues.
- Hero Image: Lier "rejoignez-hero.jpg"
- SEO Title: Rejoignez CMA Education - École BTP d'Excellence

💾 Sauvegarder
```

---

### ÉTAPE 5: VALIDATION ET TEST (3 min)

#### 5.1 Test Visuel Site
```
🌐 Ouvrir: http://localhost:3000
```

**Points à vérifier :**
- ✅ Vidéo hero se charge automatiquement
- ✅ Texte "L'Academy - Devenez l'acteur..." visible
- ✅ Sous-titre "Centre de Formation BTP d'Excellence"
- ✅ Description complète affichée
- ✅ Bouton "CANDIDATER MAINTENANT" fonctionnel
- ✅ Overlay gradient sur la vidéo
- ✅ Animation smooth des éléments

#### 5.2 Test Pages Spécifiques
```
🌐 Tester:
- http://localhost:3000/blog (image blog-hero.jpg)
- http://localhost:3000/contact (image contact-hero.jpg)
```

#### 5.3 Test Final Automatique
```bash
node scripts/test-migration-100-complete.js
```

**Résultat attendu :**
```
🎉 SCORE GLOBAL: 100% (64/64)
🏆 EXCELLENT ! Migration 100% parfaite !
```

---

## 🎯 RÉSULTAT FINAL

### ✅ Hero Section Dynamique
- **Vidéo background** : Lecture automatique 44 MB
- **Textes dynamiques** : Modifiables via Strapi
- **Images par page** : Spécifiques selon contexte
- **Performance** : Optimisée avec fallbacks

### ✅ Administration Complète
- **Site Settings** : Hero principal configurable
- **Pages individuelles** : Hero spécifique par page
- **Médias organisés** : Bibliothèque structurée
- **SEO optimisé** : Métadonnées dynamiques

### ✅ Fonctionnalités Avancées
- **Responsive design** : Mobile et desktop
- **Animations fluides** : Framer Motion
- **Fallbacks intelligents** : Si Strapi indisponible
- **Performance** : Lazy loading et optimisations

---

## 🆘 DÉPANNAGE

### Vidéo ne se charge pas
```
🔍 Vérifications:
- Fichier hero-background.mp4 bien uploadé
- Taille 44 MB acceptable
- Format MP4 compatible
- Lien correct dans Site Settings
```

### Textes non dynamiques
```
🔍 Vérifications:
- Site Settings bien configuré
- Champs Hero Title/Subtitle remplis
- Permissions API activées
- Cache navigateur vidé
```

### Images pages manquantes
```
🔍 Vérifications:
- Images uploadées dans Media Library
- Pages créées avec bon slug
- Liens médias corrects
- URLs relatives correctes
```

---

## 🎉 FÉLICITATIONS !

**Après cette configuration, vous avez :**

✅ **Hero section 100% administrable**  
✅ **Vidéo background professionnelle**  
✅ **Textes modifiables en temps réel**  
✅ **Images spécifiques par page**  
✅ **Performance optimisée**  
✅ **Migration hero complète !**

**Le hero de votre site CMA Education est maintenant parfaitement configuré et administrable via Strapi !**

---

*Guide créé le 23/12/2024 - Configuration médias hero complète*