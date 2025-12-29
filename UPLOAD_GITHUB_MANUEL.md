# 📤 Upload Manuel vers GitHub - CMA Education

## 🎯 Problème Rencontré
Le projet est trop volumineux pour un upload direct. Voici la solution manuelle.

## 🚀 Solution Recommandée: GitHub Desktop

### 1. Télécharger GitHub Desktop
- Aller sur [desktop.github.com](https://desktop.github.com)
- Télécharger et installer

### 2. Cloner le repository
1. Ouvrir GitHub Desktop
2. File > Clone repository
3. URL: `https://github.com/charefeddinehoggas85-bot/CMA2026.git`
4. Choisir un dossier temporaire

### 3. Copier les fichiers
1. Copier TOUS les fichiers de votre projet CMA2026
2. Les coller dans le dossier cloné
3. Remplacer les fichiers existants

### 4. Commit et Push
1. Dans GitHub Desktop, vous verrez tous les changements
2. Écrire un message de commit: "🚀 Upload complet CMA Education"
3. Cliquer "Commit to master"
4. Cliquer "Push origin"

## 🔧 Alternative: Upload par parties

### Étape 1: Fichiers essentiels
```bash
# Créer un commit avec les fichiers principaux
git add package.json next.config.js tailwind.config.ts tsconfig.json
git add src/app src/components src/lib
git commit -m "✨ Frontend principal"
git push origin master
```

### Étape 2: CMS Strapi
```bash
# Ajouter Strapi
git add cms-cma/
git commit -m "🎯 CMS Strapi"
git push origin master
```

### Étape 3: Scripts et documentation
```bash
# Ajouter le reste
git add scripts/ *.md
git commit -m "📚 Scripts et documentation"
git push origin master
```

## 🌐 Alternative: Créer un nouveau repository

### 1. Créer un nouveau repo sur GitHub
1. Aller sur github.com
2. Cliquer "New repository"
3. Nom: `CMA-Education-2024`
4. Public ou Private selon votre choix

### 2. Upload via interface web
1. Compresser votre projet en ZIP
2. Aller sur le nouveau repository
3. "uploading an existing file"
4. Glisser-déposer le ZIP

## 🎉 Après l'upload réussi

### 1. Vérifier le repository
- Tous les fichiers sont présents
- Le README.md s'affiche correctement

### 2. Déployer sur Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. "New Project"
3. Importer depuis GitHub
4. Sélectionner votre repository
5. Déployer automatiquement

### 3. Configuration Vercel
Variables d'environnement à ajouter :
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
BROCHURE_NOTIFICATION_EMAIL=contact@votre-domaine.com
```

## 📋 Checklist Post-Upload
- [ ] Repository visible sur GitHub
- [ ] README.md affiché correctement
- [ ] Tous les dossiers présents (src/, cms-cma/, scripts/)
- [ ] Déploiement Vercel configuré
- [ ] Variables d'environnement ajoutées
- [ ] Site accessible en ligne

## 🆘 En cas de problème
1. **Repository trop volumineux**: Utiliser GitHub Desktop
2. **Erreur d'authentification**: Vérifier le token GitHub
3. **Fichiers manquants**: Vérifier le .gitignore
4. **Build échoue**: Corriger les erreurs TypeScript d'abord

## 📞 Support
Si vous rencontrez des difficultés, voici les étapes prioritaires :
1. Utiliser GitHub Desktop (plus simple)
2. Créer un nouveau repository si nécessaire
3. Déployer sur Vercel dès que possible