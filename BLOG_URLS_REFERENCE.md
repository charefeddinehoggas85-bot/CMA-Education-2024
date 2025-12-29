# 🔗 Référence des URLs - Blog

## 📍 URLs Frontend

### Page Blog
```
http://localhost:3000/blog
```
Affiche:
- Barre de recherche
- Filtres par catégorie
- Articles en vedette
- Grille d'articles

### Page Article (Exemple)
```
http://localhost:3000/blog/tendances-btp-2024
http://localhost:3000/blog/reussir-alternance-btp
http://localhost:3000/blog/formation-conducteur-travaux-vrd
http://localhost:3000/blog/cma-academy-label-qualite
```

Affiche:
- Titre et métadonnées
- Image principale
- Contenu complet
- Articles connexes

## 🛠️ URLs Admin Strapi

### Dashboard Admin
```
http://localhost:1337/admin
```

### Gestion des Catégories
```
http://localhost:1337/admin/content-manager/collection-types/api::categorie-blog.categorie-blog
```

### Gestion des Articles
```
http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
```

### Paramètres de Rôles
```
http://localhost:1337/admin/settings/roles
```

### Paramètres de Permissions
```
http://localhost:1337/admin/settings/permissions
```

## 🔌 URLs API Strapi

### Récupérer Toutes les Catégories
```
GET http://localhost:1337/api/categories-blog?populate=*
```

### Récupérer Tous les Articles
```
GET http://localhost:1337/api/articles-blog?populate=*&sort=datePublication:desc
```

### Récupérer un Article par Slug
```
GET http://localhost:1337/api/articles-blog?filters[slug][$eq]=tendances-btp-2024&populate=*
```

### Récupérer les Articles d'une Catégorie
```
GET http://localhost:1337/api/articles-blog?filters[categorie][slug][$eq]=tendances-btp&populate=*
```

### Récupérer les Articles en Vedette
```
GET http://localhost:1337/api/articles-blog?filters[featured][$eq]=true&populate=*
```

## 📝 Exemples de Slugs

### Catégories
- `tendances-btp`
- `conseils-carriere`
- `formations`
- `actualites`

### Articles
- `tendances-btp-2024`
- `reussir-alternance-btp`
- `formation-conducteur-travaux-vrd`
- `cma-academy-label-qualite`

## 🔐 Authentification API

Pour les requêtes authentifiées, ajoutez le header:

```
Authorization: Bearer YOUR_API_TOKEN
```

Exemple avec curl:
```bash
curl -H "Authorization: Bearer your-token" \
  http://localhost:1337/api/articles-blog?populate=*
```

## 📊 Paramètres de Requête

### Pagination
```
?pagination[page]=1&pagination[pageSize]=10
```

### Tri
```
?sort=datePublication:desc
?sort=titre:asc
?sort=ordre:asc
```

### Filtres
```
?filters[featured][$eq]=true
?filters[slug][$eq]=mon-article
?filters[categorie][slug][$eq]=ma-categorie
```

### Population (Relations)
```
?populate=*
?populate=categorie
?populate=imagePrincipale
```

## 🧪 Tester les URLs

### Avec curl
```bash
# Récupérer tous les articles
curl http://localhost:1337/api/articles-blog?populate=*

# Récupérer un article spécifique
curl "http://localhost:1337/api/articles-blog?filters[slug][\$eq]=tendances-btp-2024&populate=*"
```

### Avec Postman
1. Ouvrez Postman
2. Créez une nouvelle requête GET
3. Collez l'URL
4. Cliquez sur "Send"

### Avec le navigateur
1. Ouvrez le navigateur
2. Collez l'URL dans la barre d'adresse
3. Appuyez sur Entrée

## 📱 URLs Mobiles

Les URLs sont les mêmes sur mobile:
```
http://localhost:3000/blog
http://localhost:3000/blog/tendances-btp-2024
```

Le design s'adapte automatiquement.

## 🔄 Redirection

### Ancien Blog (si existant)
```
/ancien-blog → /blog
/ancien-blog/article → /blog/article
```

À configurer dans `next.config.js`:
```js
async redirects() {
  return [
    {
      source: '/ancien-blog',
      destination: '/blog',
      permanent: true,
    },
  ]
}
```

## 📚 Documentation

- [BLOG_SETUP_INSTRUCTIONS.md](./BLOG_SETUP_INSTRUCTIONS.md)
- [GUIDE_BLOG_STRAPI_COMPLET.md](./GUIDE_BLOG_STRAPI_COMPLET.md)
- [BLOG_IMPLEMENTATION_COMPLETE.md](./BLOG_IMPLEMENTATION_COMPLETE.md)

## 🎯 Checklist de Vérification

- [ ] http://localhost:3000/blog affiche la page blog
- [ ] http://localhost:3000/blog/tendances-btp-2024 affiche un article
- [ ] http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog affiche les articles
- [ ] La recherche fonctionne
- [ ] Les filtres fonctionnent
- [ ] Les articles en vedette s'affichent
- [ ] Les images s'affichent
- [ ] Le design est responsive

---

**Toutes les URLs sont maintenant documentées! 🚀**
