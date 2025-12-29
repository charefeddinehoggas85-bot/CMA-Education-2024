# 🚀 Étapes avec GitHub Desktop - CMA Education

## 📋 Ce que vous allez faire
1. Créer un nouveau repository sur GitHub.com
2. Cloner ce repository avec GitHub Desktop
3. Copier vos fichiers CMA2026
4. Uploader vers GitHub

## 🌐 Étape 1: Créer un nouveau repository

### 1.1 Aller sur GitHub.com
- Ouvrir votre navigateur
- Aller sur [github.com](https://github.com)
- Se connecter avec votre compte

### 1.2 Créer le repository
1. Cliquer sur le bouton vert **"New"** (en haut à droite)
2. Remplir les informations :
   - **Repository name**: `CMA-Education-2024`
   - **Description**: `Site web CMA Education - Next.js + Strapi CMS`
   - **Public** ou **Private** (votre choix)
   - ✅ Cocher **"Add a README file"**
   - ✅ Cocher **"Add .gitignore"** → Choisir **"Node"**
3. Cliquer **"Create repository"**

## 💻 Étape 2: Cloner avec GitHub Desktop

### 2.1 Ouvrir GitHub Desktop
- Lancer l'application GitHub Desktop

### 2.2 Se connecter à GitHub
1. Si pas encore fait : **File** → **Options** → **Accounts** → **Sign in to GitHub.com**
2. Entrer vos identifiants GitHub

### 2.3 Cloner le repository
1. Cliquer **"Clone a repository from the Internet"**
2. Onglet **"GitHub.com"**
3. Chercher et sélectionner **"CMA-Education-2024"**
4. **Local path**: Choisir un dossier (ex: `C:\Users\VotreNom\Documents\GitHub\CMA-Education-2024`)
5. Cliquer **"Clone"**

## 📁 Étape 3: Copier vos fichiers

### 3.1 Ouvrir l'Explorateur Windows
- Ouvrir deux fenêtres de l'Explorateur :
  1. **Source**: Votre dossier actuel `D:\GITHUB\CMA2026`
  2. **Destination**: Le nouveau dossier cloné (ex: `C:\Users\VotreNom\Documents\GitHub\CMA-Education-2024`)

### 3.2 Copier TOUS les fichiers
1. Dans le dossier **source** (`D:\GITHUB\CMA2026`) :
   - Sélectionner TOUT (Ctrl+A)
   - **SAUF** le dossier `.git` (ne pas le copier)
2. Copier (Ctrl+C)
3. Dans le dossier **destination** :
   - Coller (Ctrl+V)
   - Remplacer les fichiers existants si demandé

### 3.3 Fichiers à copier (vérification)
✅ Dossiers importants :
- `src/` (code frontend)
- `cms-cma/` (Strapi CMS)
- `scripts/` (scripts de déploiement)
- `public/` (images et assets)
- `Formations/` (contenu)

✅ Fichiers importants :
- `package.json`
- `next.config.js`
- `tailwind.config.ts`
- `README.md`
- Tous les fichiers `.md` de documentation

❌ Ne PAS copier :
- `.git/` (dossier Git)
- `node_modules/` (dépendances)
- `.next/` (build)

## 📤 Étape 4: Upload vers GitHub

### 4.1 Retourner dans GitHub Desktop
- GitHub Desktop détecte automatiquement les changements
- Vous verrez tous vos fichiers dans la liste des changements

### 4.2 Faire le commit
1. En bas à gauche, dans **"Summary"** :
   - Écrire : `🚀 CMA Education - Version complète`
2. Dans **"Description"** (optionnel) :
   ```
   - Frontend Next.js avec TypeScript
   - CMS Strapi complet
   - Scripts de déploiement
   - Documentation complète
   ```
3. Cliquer **"Commit to main"**

### 4.3 Push vers GitHub
1. Cliquer **"Push origin"** (bouton bleu en haut)
2. Attendre que l'upload se termine (peut prendre quelques minutes)

## ✅ Étape 5: Vérification

### 5.1 Vérifier sur GitHub.com
1. Aller sur votre repository : `https://github.com/VOTRE-USERNAME/CMA-Education-2024`
2. Vérifier que tous les dossiers sont présents :
   - ✅ `src/`
   - ✅ `cms-cma/`
   - ✅ `scripts/`
   - ✅ `README.md`

### 5.2 Si tout est OK
🎉 **Félicitations !** Votre projet est maintenant sur GitHub !

## 🚀 Prochaines étapes

### Déployer sur Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. **"New Project"**
3. **"Import Git Repository"**
4. Sélectionner votre repository `CMA-Education-2024`
5. Cliquer **"Deploy"**

### Variables d'environnement Vercel
Ajouter dans Vercel → Settings → Environment Variables :
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
BROCHURE_NOTIFICATION_EMAIL=contact@votre-domaine.com
```

## 🆘 En cas de problème

### GitHub Desktop ne voit pas les changements
- Vérifier que vous êtes dans le bon dossier
- Rafraîchir : **Repository** → **Refresh**

### Upload trop lent
- Normal pour un gros projet
- Laisser tourner, ça peut prendre 10-15 minutes

### Erreur d'authentification
- **File** → **Options** → **Accounts** → Se reconnecter

## 📞 Vous êtes prêt !
Une fois l'upload terminé, votre site CMA Education sera prêt pour le déploiement ! 🌍