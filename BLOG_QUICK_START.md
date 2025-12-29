# ⚡ Blog - Démarrage Rapide (5 minutes)

## 🎯 Objectif

Avoir un blog entièrement fonctionnel avec 9 articles en 5 minutes.

## 📋 Prérequis

- ✅ Strapi en cours d'exécution (http://localhost:1337)
- ✅ Frontend en cours d'exécution (http://localhost:3000)
- ✅ Node.js installé

## 🚀 Étape 1: Exécuter le Script (2 minutes)

Ouvrez un terminal et exécutez:

```bash
node scripts/setup-blog-complete-with-old-articles.js
```

Ce script va:
1. ✅ Créer les content types Strapi
2. ✅ Importer les 9 anciens articles
3. ✅ Configurer les permissions
4. ✅ Télécharger les images

**Attendez que le script se termine** (vous verrez "✅ Configuration Complète Terminée!")

## 🌐 Étape 2: Vérifier le Blog (1 minute)

Ouvrez votre navigateur et allez à:

```
http://localhost:3000/blog
```

Vous devriez voir:
- ✅ Titre "Blog"
- ✅ Barre de recherche
- ✅ Filtres par catégorie
- ✅ 3 articles en vedette
- ✅ 9 articles au total
- ✅ Images affichées

## 🔍 Étape 3: Tester les Fonctionnalités (2 minutes)

### Tester la Recherche
1. Tapez "BTP" dans la barre de recherche
2. Vous devriez voir tous les articles contenant "BTP"

### Tester les Filtres
1. Cliquez sur "Formations"
2. Vous devriez voir 5 articles
3. Cliquez sur "Conseils Carrière"
4. Vous devriez voir 3 articles

### Tester un Article
1. Cliquez sur un article
2. Vous devriez voir le contenu complet
3. Vous devriez voir les articles connexes

## ✅ Vérification

Si vous voyez tout cela, le blog est correctement configuré! 🎉

## 📊 Articles Disponibles

### En Vedette (3)
1. Les Métiers du BTP en 2025
2. Guide Complet de la Formation BTP
3. Reconversion Professionnelle à 40 ans

### Autres (6)
4. L'Alternance en BTP
5. Formation BIM
6. Conducteur de Travaux
7. Financement de Votre Formation
8. Choisir le Bon Centre
9. Économiste de la Construction

## 🛠️ Gestion via Strapi

### Créer un Nouvel Article

1. Allez à http://localhost:1337/admin
2. Content Manager > Articles Blog > Create new entry
3. Remplissez:
   - Titre: "Mon Article"
   - Slug: "mon-article" (auto-généré)
   - Résumé: "Résumé court"
   - Contenu: "Contenu de l'article"
   - Image: Téléchargez une image
   - Date: Aujourd'hui
   - Auteur: Votre nom
   - Catégorie: Sélectionnez une
4. Cliquez Save
5. Allez à http://localhost:3000/blog pour voir votre article!

### Modifier un Article

1. Allez à http://localhost:1337/admin
2. Content Manager > Articles Blog
3. Cliquez sur l'article à modifier
4. Modifiez les champs
5. Cliquez Save

### Supprimer un Article

1. Allez à http://localhost:1337/admin
2. Content Manager > Articles Blog
3. Cliquez sur l'article à supprimer
4. Cliquez Delete
5. Confirmez

## 🎨 Personnalisation

### Modifier le Titre du Blog

Éditez `src/app/blog/page.tsx`:

```tsx
heroTitle: 'Mon Blog'
```

### Modifier les Couleurs

Éditez `src/app/blog/page.tsx`:

```tsx
className="bg-slate-900"      // Couleur primaire
className="bg-primary-yellow"  // Couleur accent
```

### Ajouter à la Navigation

Éditez `src/components/layout/Navigation.tsx`:

```tsx
{ label: 'Blog', url: '/blog', ordre: 6, featured: true }
```

## 🔗 URLs Principales

- Blog: http://localhost:3000/blog
- Article: http://localhost:3000/blog/[slug]
- Admin: http://localhost:1337/admin
- API: http://localhost:1337/api/articles-blog

## 📱 Responsive

Le blog s'affiche correctement sur:
- ✅ Mobile (1 colonne)
- ✅ Tablette (2 colonnes)
- ✅ Desktop (3 colonnes)

## 🐛 Dépannage Rapide

### Les articles ne s'affichent pas?
```bash
# Vérifiez que Strapi est en cours d'exécution
curl http://localhost:1337/api/health
```

### Les images ne s'affichent pas?
1. Allez à http://localhost:1337/admin
2. Content Manager > Articles Blog
3. Vérifiez que "Image Principale" est remplie

### La recherche ne fonctionne pas?
1. Vérifiez que les articles ont un titre et un résumé

## 📚 Documentation Complète

Pour plus de détails, consultez:

- [START_HERE_BLOG.md](./START_HERE_BLOG.md) - Point de départ
- [BLOG_SETUP_INSTRUCTIONS.md](./BLOG_SETUP_INSTRUCTIONS.md) - Instructions détaillées
- [GUIDE_BLOG_STRAPI_COMPLET.md](./GUIDE_BLOG_STRAPI_COMPLET.md) - Guide complet
- [BLOG_OLD_ARTICLES_IMPORT.md](./BLOG_OLD_ARTICLES_IMPORT.md) - Import anciens articles
- [BLOG_FINAL_SUMMARY.md](./BLOG_FINAL_SUMMARY.md) - Résumé final

## 🎉 Vous Êtes Prêt!

Votre blog est maintenant configuré et prêt à être utilisé. Vous pouvez:

1. ✅ Créer des articles via Strapi
2. ✅ Modifier des articles via Strapi
3. ✅ Supprimer des articles via Strapi
4. ✅ Organiser les articles par catégorie
5. ✅ Mettre en vedette les articles importants
6. ✅ Rechercher et filtrer les articles

---

**Bon blogging! 🚀**

Prochaine étape: Exécutez `node scripts/setup-blog-complete-with-old-articles.js`
