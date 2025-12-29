# Guide Complet: Blog 100% Modifiable via Strapi

## 📋 Vue d'ensemble

Le blog est entièrement géré via Strapi. Vous pouvez créer, modifier et supprimer des articles et des catégories directement depuis l'interface d'administration Strapi.

## 🚀 Configuration Initiale

### Étape 1: Créer les Content Types

Exécutez le script de configuration:

```bash
node scripts/setup-blog-strapi.js
```

Ce script crée deux content types:
- **Catégorie Blog**: Pour organiser les articles par thème
- **Article Blog**: Pour les articles eux-mêmes

### Étape 2: Importer les Données d'Exemple

```bash
node scripts/import-blog-articles-strapi.js
```

Cela crée:
- 4 catégories de blog
- 4 articles d'exemple

### Étape 3: Configurer les Permissions

```bash
node scripts/configure-blog-permissions.js
```

Ou configurez manuellement:
1. Allez à http://localhost:1337/admin/settings/roles
2. Cliquez sur le rôle "Public"
3. Allez dans l'onglet "Permissions"
4. Cherchez "Article Blog" et "Catégorie Blog"
5. Cochez "find" et "findOne" pour les deux
6. Sauvegardez

## 📝 Gestion des Articles

### Créer un Article

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur "Create new entry"
3. Remplissez les champs:
   - **Titre**: Le titre de l'article
   - **Slug**: URL-friendly (généré automatiquement)
   - **Résumé**: Courte description (visible dans la liste)
   - **Contenu**: Le texte complet (supporte HTML/Markdown)
   - **Image Principale**: Téléchargez une image
   - **Date de Publication**: Quand l'article doit être publié
   - **Auteur**: Nom de l'auteur
   - **Catégorie**: Sélectionnez une catégorie
   - **Featured**: Cochez pour mettre en vedette
   - **Ordre**: Numéro pour le tri

4. Cliquez sur "Save"

### Modifier un Article

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur l'article à modifier
3. Modifiez les champs
4. Cliquez sur "Save"

### Supprimer un Article

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
2. Cliquez sur l'article à supprimer
3. Cliquez sur "Delete"
4. Confirmez

## 🏷️ Gestion des Catégories

### Créer une Catégorie

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::categorie-blog.categorie-blog
2. Cliquez sur "Create new entry"
3. Remplissez les champs:
   - **Nom**: Le nom de la catégorie
   - **Slug**: URL-friendly (généré automatiquement)
   - **Description**: Description de la catégorie
   - **Couleur**: Couleur hexadécimale (ex: #FF6B35)
   - **Ordre**: Numéro pour le tri

4. Cliquez sur "Save"

### Modifier une Catégorie

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::categorie-blog.categorie-blog
2. Cliquez sur la catégorie à modifier
3. Modifiez les champs
4. Cliquez sur "Save"

### Supprimer une Catégorie

1. Allez à http://localhost:1337/admin/content-manager/collection-types/api::categorie-blog.categorie-blog
2. Cliquez sur la catégorie à supprimer
3. Cliquez sur "Delete"
4. Confirmez

## 🖼️ Gestion des Images

### Télécharger une Image pour un Article

1. Dans le formulaire d'article, allez au champ "Image Principale"
2. Cliquez sur "Add an asset"
3. Téléchargez une image (JPG, PNG, WebP recommandé)
4. Cliquez sur "Save"

### Formats Recommandés

- **Format**: JPG, PNG, WebP
- **Taille**: 1200x600px minimum
- **Poids**: Moins de 500KB

## 🔍 Affichage du Blog

### Page Principale du Blog

URL: http://localhost:3000/blog

Affiche:
- Barre de recherche
- Filtres par catégorie
- Articles en vedette (3 premiers)
- Tous les autres articles en grille

### Page Détail d'un Article

URL: http://localhost:3000/blog/[slug]

Affiche:
- Titre et métadonnées
- Image principale
- Contenu complet
- Articles connexes
- Temps de lecture estimé

## 🎨 Personnalisation du Design

### Modifier les Couleurs

Éditez `src/app/blog/page.tsx` et `src/app/blog/[slug]/page.tsx`:

```tsx
// Couleur primaire
className="bg-primary-yellow"

// Couleur secondaire
className="bg-slate-900"
```

### Modifier les Textes par Défaut

Dans `src/app/blog/page.tsx`:

```tsx
const defaultPageData: PageData = {
  heroTitle: 'Blog',
  heroSubtitle: 'Découvrez nos derniers articles...',
  heroImage: '/images/hero/blog-hero.jpg',
  sectionTitle: 'Nos derniers articles',
  sectionSubtitle: 'Restez informé...'
}
```

### Modifier le Nombre d'Articles Affichés

Dans `src/app/blog/page.tsx`:

```tsx
// Articles en vedette (actuellement 3)
const featuredArticles = filteredArticles.filter(a => a.featured).slice(0, 3)

// Modifier le nombre:
const featuredArticles = filteredArticles.filter(a => a.featured).slice(0, 5)
```

## 🔗 Intégration avec le Site

### Ajouter un Lien vers le Blog

Dans `src/components/layout/Navigation.tsx`:

```tsx
{ id: 6, label: 'Blog', url: '/blog', ordre: 6, featured: true, external: false }
```

### Ajouter un Lien dans le Footer

Dans `src/components/layout/Footer.tsx`:

```tsx
{ label: 'Blog', url: '/blog' }
```

## 📊 Statistiques et Métriques

### Nombre d'Articles

Visible dans le Content Manager de Strapi.

### Temps de Lecture

Calculé automatiquement: nombre de mots / 200 mots par minute

### Taux de Lecture

À implémenter avec Google Analytics ou Matomo.

## 🐛 Dépannage

### Les articles ne s'affichent pas

1. Vérifiez que les permissions sont configurées
2. Vérifiez que les articles sont publiés (status: Published)
3. Vérifiez la console du navigateur pour les erreurs

### Les images ne s'affichent pas

1. Vérifiez que l'image est téléchargée dans Strapi
2. Vérifiez que le chemin de l'image est correct
3. Vérifiez les permissions d'accès aux médias

### La recherche ne fonctionne pas

1. Vérifiez que les articles ont un titre et un résumé
2. Vérifiez que les articles sont publiés

## 📱 Responsive Design

Le blog est entièrement responsive:
- Mobile: 1 colonne
- Tablette: 2 colonnes
- Desktop: 3 colonnes

## ♿ Accessibilité

- Tous les textes ont un contraste suffisant
- Les images ont des alt texts
- La navigation au clavier est supportée
- Les lecteurs d'écran sont supportés

## 🚀 Performance

- Images optimisées avec Next.js Image
- Lazy loading des images
- Pagination (à implémenter si nécessaire)
- Cache Strapi configuré

## 📚 Ressources

- [Documentation Strapi](https://docs.strapi.io)
- [Documentation Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## 💡 Conseils

1. **Utilisez des slugs descriptifs**: `tendances-btp-2024` au lieu de `article-1`
2. **Catégorisez vos articles**: Facilitez la navigation
3. **Mettez en vedette les meilleurs articles**: Augmentez la visibilité
4. **Publiez régulièrement**: Maintenez l'engagement
5. **Optimisez les images**: Réduisez le temps de chargement
6. **Utilisez des titres accrocheurs**: Augmentez les clics
7. **Écrivez des résumés clairs**: Aidez les lecteurs à décider

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.
