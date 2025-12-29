# 📝 Guide de Gestion du Blog via Strapi

## 🎯 Objectif

Gérer complètement votre blog via l'interface d'administration Strapi sans toucher au code.

## 🌐 Accès

### Admin Strapi
```
http://localhost:1337/admin
```

### Blog Frontend
```
http://localhost:3000/blog
```

## 📋 Gestion des Articles

### 1. Voir Tous les Articles

1. Allez à http://localhost:1337/admin
2. Cliquez sur **Content Manager** (menu gauche)
3. Cliquez sur **Articles Blog**
4. Vous verrez la liste de tous les articles

### 2. Créer un Nouvel Article

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur **Create new entry** (bouton bleu en haut à droite)
3. Remplissez les champs:

#### Champs Obligatoires
- **Titre**: Le titre de l'article (ex: "Mon Article")
- **Extrait**: Résumé court (ex: "Découvrez...")
- **Auteur**: Nom de l'auteur (ex: "Équipe CMA")
- **Date de Publication**: Date de publication

#### Champs Optionnels
- **Slug**: URL-friendly (auto-généré à partir du titre)
- **Contenu**: Texte complet (supporte HTML/Markdown)
- **Image**: Image de couverture
- **Catégorie**: Sélectionnez une catégorie
- **Featured**: Cochez pour mettre en vedette
- **SEO Title**: Titre pour le SEO
- **SEO Description**: Description pour le SEO
- **SEO Keywords**: Mots-clés pour le SEO

4. Cliquez **Save** (bouton en haut à droite)
5. Cliquez **Publish** pour publier l'article

### 3. Modifier un Article

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur l'article à modifier
3. Modifiez les champs
4. Cliquez **Save**

### 4. Supprimer un Article

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur l'article à supprimer
3. Cliquez sur le menu **...** (trois points)
4. Cliquez **Delete**
5. Confirmez

### 5. Publier/Dépublier un Article

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur l'article
3. En haut à droite, vous verrez le status:
   - **Draft**: Article en brouillon (non visible publiquement)
   - **Published**: Article publié (visible publiquement)
4. Cliquez sur **Publish** ou **Unpublish** pour changer le status

## 🏷️ Gestion des Catégories

### 1. Voir Toutes les Catégories

1. Allez à http://localhost:1337/admin
2. Cliquez sur **Content Manager**
3. Cliquez sur **Catégories Blog**
4. Vous verrez la liste de toutes les catégories

### 2. Créer une Nouvelle Catégorie

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::categorie-blog.categorie-blog
2. Cliquez sur **Create new entry**
3. Remplissez les champs:
   - **Nom**: Nom de la catégorie (ex: "Formations")
   - **Slug**: URL-friendly (auto-généré)
   - **Description**: Description de la catégorie
   - **Couleur**: Couleur hexadécimale (ex: #FF6B35)
4. Cliquez **Save**

### 3. Modifier une Catégorie

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::categorie-blog.categorie-blog
2. Cliquez sur la catégorie à modifier
3. Modifiez les champs
4. Cliquez **Save**

### 4. Supprimer une Catégorie

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::categorie-blog.categorie-blog
2. Cliquez sur la catégorie à supprimer
3. Cliquez sur le menu **...** (trois points)
4. Cliquez **Delete**
5. Confirmez

## 🖼️ Gestion des Images

### Télécharger une Image pour un Article

1. Dans le formulaire d'article, allez au champ **Image**
2. Cliquez sur **Add an asset**
3. Vous avez deux options:
   - **Upload**: Téléchargez une nouvelle image
   - **From library**: Sélectionnez une image existante
4. Téléchargez une image (JPG, PNG, WebP recommandé)
5. Cliquez **Save**

### Formats Recommandés

- **Format**: JPG, PNG, WebP
- **Taille**: 1200x600px minimum
- **Poids**: Moins de 500KB

### Remplacer une Image

1. Dans le formulaire d'article, allez au champ **Image**
2. Cliquez sur l'image existante
3. Cliquez sur **Replace**
4. Téléchargez la nouvelle image
5. Cliquez **Save**

### Supprimer une Image

1. Dans le formulaire d'article, allez au champ **Image**
2. Cliquez sur l'image
3. Cliquez sur **Remove**
4. Confirmez

## 🔍 Recherche et Filtres

### Rechercher un Article

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Utilisez la barre de recherche en haut
3. Tapez le titre ou le slug de l'article
4. Les résultats s'affichent automatiquement

### Filtrer par Catégorie

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur **Filters** (icône entonnoir)
3. Sélectionnez une catégorie
4. Les articles de cette catégorie s'affichent

### Filtrer par Status

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur **Filters**
3. Sélectionnez **Draft** ou **Published**
4. Les articles avec ce status s'affichent

## 📊 Affichage du Blog

### Page Blog

Après avoir créé et publié des articles, ils s'affichent automatiquement sur:

```
http://localhost:3000/blog
```

### Page Article

Chaque article a sa propre page:

```
http://localhost:3000/blog/[slug]
```

Exemple:
```
http://localhost:3000/blog/metiers-btp-2025
http://localhost:3000/blog/guide-formation-btp
```

## 🎨 Personnalisation

### Modifier le Titre du Blog

Éditez `src/app/blog/page.tsx`:

```tsx
const defaultPageData: PageData = {
  heroTitle: 'Mon Blog',  // ← Changez ici
  heroSubtitle: 'Découvrez nos derniers articles...',
  // ...
}
```

### Modifier les Couleurs

Éditez `src/app/blog/page.tsx`:

```tsx
// Couleur primaire (actuellement noir)
className="bg-slate-900"

// Couleur accent (actuellement jaune)
className="bg-primary-yellow"
```

### Modifier le Nombre d'Articles en Vedette

Éditez `src/app/blog/page.tsx`:

```tsx
// Actuellement 3 articles en vedette
const featuredArticles = filteredArticles.filter(a => a.featured).slice(0, 3)

// Changez 3 par le nombre que vous voulez
const featuredArticles = filteredArticles.filter(a => a.featured).slice(0, 5)
```

## 🐛 Dépannage

### Les articles ne s'affichent pas sur le blog

**Solution 1**: Vérifiez que l'article est publié
1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur l'article
3. Vérifiez que le status est **Published**

**Solution 2**: Vérifiez que la catégorie est assignée
1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur l'article
3. Vérifiez que une catégorie est sélectionnée

**Solution 3**: Rafraîchissez la page
1. Allez à http://localhost:3000/blog
2. Appuyez sur F5 ou Ctrl+R pour rafraîchir

### L'image ne s'affiche pas

**Solution 1**: Vérifiez que l'image est téléchargée
1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur l'article
3. Vérifiez que le champ **Image** est rempli

**Solution 2**: Vérifiez le format de l'image
1. L'image doit être en JPG, PNG ou WebP
2. La taille doit être au moins 1200x600px
3. Le poids doit être moins de 500KB

### La recherche ne fonctionne pas

**Solution**: Vérifiez que les articles ont un titre et un extrait
1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur l'article
3. Vérifiez que **Titre** et **Extrait** sont remplis

## 📞 Support

Pour toute question, consultez:
- [BLOG_QUICK_START.md](./BLOG_QUICK_START.md) - Démarrage rapide
- [GUIDE_BLOG_STRAPI_COMPLET.md](./GUIDE_BLOG_STRAPI_COMPLET.md) - Guide complet
- [BLOG_INSTALLATION_SUCCESS.md](./BLOG_INSTALLATION_SUCCESS.md) - Installation réussie

---

**Bon management! 🚀**
