# 🚀 Instructions de Configuration du Blog

## ⚡ Configuration Rapide (5 minutes)

### Étape 1: Créer les Content Types Strapi

```bash
node scripts/setup-blog-strapi.js
```

**Résultat**: Crée 2 content types dans Strapi:
- `Catégorie Blog`
- `Article Blog`

### Étape 2: Importer les Données d'Exemple

```bash
node scripts/import-blog-articles-strapi.js
```

**Résultat**: Crée 4 catégories et 4 articles d'exemple

### Étape 3: Configurer les Permissions

```bash
node scripts/configure-blog-permissions.js
```

**Résultat**: Configure l'accès public aux articles

### Étape 4: Tester

```bash
node scripts/test-blog-complete.js
```

**Résultat**: Vérifie que tout fonctionne

## 🌐 Accès aux Pages

Une fois configuré, accédez à:

- **Blog**: http://localhost:3000/blog
- **Article**: http://localhost:3000/blog/tendances-btp-2024
- **Admin Strapi**: http://localhost:1337/admin

## 📝 Créer Votre Premier Article

1. Allez à http://localhost:1337/admin
2. **Content Manager** → **Catégories Blog** → **Create new entry**
3. Remplissez:
   - Nom: "Ma Catégorie"
   - Slug: "ma-categorie" (auto-généré)
   - Description: "Description de ma catégorie"
   - Couleur: "#FF6B35"
4. **Save**

5. **Content Manager** → **Articles Blog** → **Create new entry**
6. Remplissez:
   - Titre: "Mon Premier Article"
   - Slug: "mon-premier-article" (auto-généré)
   - Résumé: "Résumé court de l'article"
   - Contenu: "Contenu complet de l'article"
   - Image Principale: Téléchargez une image
   - Date de Publication: Aujourd'hui
   - Auteur: "Votre Nom"
   - Catégorie: Sélectionnez "Ma Catégorie"
   - Featured: Cochez si vous voulez le mettre en vedette
7. **Save**

8. Visitez http://localhost:3000/blog pour voir votre article!

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

Éditez `src/app/blog/page.tsx` et `src/app/blog/[slug]/page.tsx`:

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

## 🔗 Ajouter le Blog à la Navigation

Éditez `src/components/layout/Navigation.tsx`:

Trouvez le tableau `navigationItems` et ajoutez:

```tsx
{
  id: 6,
  label: 'Blog',
  url: '/blog',
  ordre: 6,
  featured: true,
  external: false
}
```

## 📊 Fonctionnalités Disponibles

### ✅ Recherche
- Recherche en temps réel par titre et résumé
- Barre de recherche en haut de la page

### ✅ Filtres
- Filtrer par catégorie
- Bouton "Tous les articles" pour réinitialiser

### ✅ Articles en Vedette
- Affichage spécial pour les articles importants
- Cochez "Featured" dans Strapi

### ✅ Métadonnées
- Date de publication
- Auteur
- Temps de lecture estimé
- Catégorie

### ✅ Articles Connexes
- Affichage automatique sur la page détail
- 3 articles connexes

## 🖼️ Gestion des Images

### Télécharger une Image

1. Dans le formulaire d'article, allez au champ "Image Principale"
2. Cliquez sur "Add an asset"
3. Téléchargez une image (JPG, PNG, WebP)
4. Cliquez sur "Save"

### Formats Recommandés

- **Format**: JPG, PNG, WebP
- **Taille**: 1200x600px minimum
- **Poids**: Moins de 500KB

## 🐛 Dépannage

### Les articles ne s'affichent pas

**Solution 1**: Vérifiez que Strapi est en cours d'exécution
```bash
# Vérifiez que Strapi est lancé
# http://localhost:1337/admin doit être accessible
```

**Solution 2**: Vérifiez les permissions
```bash
# Allez à http://localhost:1337/admin/settings/roles
# Cliquez sur "Public"
# Vérifiez que "Article Blog" et "Catégorie Blog" sont cochés
```

**Solution 3**: Vérifiez que les articles sont publiés
```bash
# Dans Content Manager > Articles Blog
# Vérifiez que le status est "Published"
```

### Les images ne s'affichent pas

**Solution 1**: Vérifiez que l'image est téléchargée
```bash
# Dans Content Manager > Articles Blog
# Vérifiez que "Image Principale" est remplie
```

**Solution 2**: Vérifiez les permissions des médias
```bash
# Allez à http://localhost:1337/admin/settings/roles
# Cliquez sur "Public"
# Vérifiez que "Upload" est coché
```

### La recherche ne fonctionne pas

**Solution**: Vérifiez que les articles ont un titre et un résumé
```bash
# Dans Content Manager > Articles Blog
# Vérifiez que "Titre" et "Résumé" sont remplis
```

## 📱 Responsive Design

Le blog s'adapte automatiquement à tous les appareils:

- **Mobile**: 1 colonne
- **Tablette**: 2 colonnes
- **Desktop**: 3 colonnes

## ♿ Accessibilité

Le blog est conforme aux normes d'accessibilité:

- ✅ Contraste suffisant
- ✅ Alt text sur les images
- ✅ Navigation au clavier
- ✅ Support lecteur d'écran

## 📚 Documentation Complète

Pour plus de détails, consultez:

- [GUIDE_BLOG_STRAPI_COMPLET.md](./GUIDE_BLOG_STRAPI_COMPLET.md)
- [BLOG_IMPLEMENTATION_COMPLETE.md](./BLOG_IMPLEMENTATION_COMPLETE.md)

## 🎉 Vous Êtes Prêt!

Votre blog est maintenant configuré et prêt à être utilisé. Vous pouvez:

1. ✅ Créer des articles via Strapi
2. ✅ Modifier des articles via Strapi
3. ✅ Supprimer des articles via Strapi
4. ✅ Organiser les articles par catégorie
5. ✅ Mettre en vedette les articles importants
6. ✅ Rechercher et filtrer les articles

**Bon blogging! 🚀**

---

**Questions?** Consultez la documentation complète ou contactez l'équipe de développement.
