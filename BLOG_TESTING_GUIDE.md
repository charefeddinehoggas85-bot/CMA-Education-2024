# 🧪 Guide de Test - Blog Strapi

## ✅ Checklist de Test Complète

### 1. Configuration Initiale

- [ ] Strapi est en cours d'exécution (http://localhost:1337/admin)
- [ ] Frontend est en cours d'exécution (http://localhost:3000)
- [ ] Scripts exécutés avec succès:
  - [ ] `node scripts/setup-blog-strapi.js`
  - [ ] `node scripts/import-blog-articles-strapi.js`
  - [ ] `node scripts/configure-blog-permissions.js`

### 2. Page Blog

#### Affichage
- [ ] Page accessible: http://localhost:3000/blog
- [ ] Titre "Blog" s'affiche
- [ ] Sous-titre s'affiche
- [ ] Image de fond s'affiche

#### Barre de Recherche
- [ ] Barre de recherche visible
- [ ] Placeholder "Rechercher un article..." visible
- [ ] Recherche fonctionne (tapez "tendances")
- [ ] Résultats filtrés correctement
- [ ] Recherche vide affiche tous les articles

#### Filtres par Catégorie
- [ ] Bouton "Tous les articles" visible
- [ ] Boutons de catégories visibles
- [ ] Cliquer sur une catégorie filtre les articles
- [ ] Cliquer sur "Tous les articles" réinitialise

#### Articles en Vedette
- [ ] Section "Articles en vedette" visible
- [ ] 3 articles affichés
- [ ] Badge "En vedette" visible
- [ ] Images s'affichent
- [ ] Titres s'affichent
- [ ] Résumés s'affichent

#### Grille d'Articles
- [ ] Section "Nos derniers articles" visible
- [ ] Articles affichés en grille
- [ ] Responsive: 1 colonne (mobile), 2 (tablette), 3 (desktop)
- [ ] Images s'affichent
- [ ] Titres s'affichent
- [ ] Résumés s'affichent
- [ ] Métadonnées s'affichent (date, auteur)

#### Interactions
- [ ] Hover sur article change le style
- [ ] Clic sur article ouvre la page détail
- [ ] Animations fluides

### 3. Page Article

#### Affichage
- [ ] Page accessible: http://localhost:3000/blog/tendances-btp-2024
- [ ] Breadcrumb "Retour au blog" visible
- [ ] Titre s'affiche
- [ ] Catégorie s'affiche
- [ ] Date s'affiche
- [ ] Auteur s'affiche
- [ ] Temps de lecture s'affiche

#### Image Principale
- [ ] Image s'affiche
- [ ] Image responsive
- [ ] Image a une ombre

#### Contenu
- [ ] Contenu HTML s'affiche correctement
- [ ] Titres (h2, h3) s'affichent
- [ ] Paragraphes s'affichent
- [ ] Listes s'affichent
- [ ] Texte est lisible

#### Articles Connexes
- [ ] Section "Articles connexes" visible
- [ ] 3 articles affichés
- [ ] Images s'affichent
- [ ] Titres s'affichent
- [ ] Clic ouvre l'article

#### Navigation
- [ ] Bouton "Retour au blog" fonctionne
- [ ] Lien breadcrumb fonctionne
- [ ] Lien article connexe fonctionne

### 4. Strapi Admin

#### Content Manager - Catégories
- [ ] Accès: http://localhost:1337/admin/content-manager/collection-types/api::categorie-blog.categorie-blog
- [ ] 4 catégories visibles
- [ ] Créer une nouvelle catégorie fonctionne
- [ ] Modifier une catégorie fonctionne
- [ ] Supprimer une catégorie fonctionne

#### Content Manager - Articles
- [ ] Accès: http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
- [ ] 4 articles visibles
- [ ] Créer un nouvel article fonctionne
- [ ] Modifier un article fonctionne
- [ ] Supprimer un article fonctionne
- [ ] Publier/Dépublier fonctionne

#### Permissions
- [ ] Accès: http://localhost:1337/admin/settings/roles
- [ ] Rôle "Public" a accès à "Article Blog"
- [ ] Rôle "Public" a accès à "Catégorie Blog"

### 5. API Strapi

#### Récupérer les Catégories
```bash
curl http://localhost:1337/api/categories-blog?populate=*
```
- [ ] Réponse 200 OK
- [ ] 4 catégories retournées
- [ ] Champs corrects (nom, slug, description, couleur, ordre)

#### Récupérer les Articles
```bash
curl http://localhost:1337/api/articles-blog?populate=*&sort=datePublication:desc
```
- [ ] Réponse 200 OK
- [ ] 4 articles retournés
- [ ] Champs corrects (titre, slug, resume, contenu, etc.)
- [ ] Triés par date décroissante

#### Récupérer un Article
```bash
curl "http://localhost:1337/api/articles-blog?filters[slug][\$eq]=tendances-btp-2024&populate=*"
```
- [ ] Réponse 200 OK
- [ ] 1 article retourné
- [ ] Slug correct

#### Accès Public
```bash
curl http://localhost:1337/api/articles-blog?populate=*
```
- [ ] Réponse 200 OK (sans token)
- [ ] Articles retournés

### 6. Responsive Design

#### Mobile (< 768px)
- [ ] Page blog: 1 colonne
- [ ] Texte lisible
- [ ] Images responsive
- [ ] Boutons cliquables
- [ ] Barre de recherche fonctionne

#### Tablette (768px - 1024px)
- [ ] Page blog: 2 colonnes
- [ ] Texte lisible
- [ ] Images responsive
- [ ] Boutons cliquables

#### Desktop (> 1024px)
- [ ] Page blog: 3 colonnes
- [ ] Texte lisible
- [ ] Images responsive
- [ ] Boutons cliquables

### 7. Accessibilité

- [ ] Navigation au clavier fonctionne
- [ ] Alt text sur les images
- [ ] Contraste suffisant
- [ ] Lecteur d'écran compatible

### 8. Performance

- [ ] Page blog charge rapidement (< 3s)
- [ ] Page article charge rapidement (< 3s)
- [ ] Images optimisées
- [ ] Pas d'erreurs console

### 9. Intégration

- [ ] Lien "Blog" dans la navigation (si ajouté)
- [ ] Lien "Blog" dans le footer (si ajouté)
- [ ] Design cohérent avec le site
- [ ] Couleurs cohérentes

## 🧪 Tests Manuels

### Test 1: Créer un Article

1. Allez à http://localhost:1337/admin
2. Content Manager > Articles Blog > Create new entry
3. Remplissez:
   - Titre: "Test Article"
   - Slug: "test-article"
   - Résumé: "Ceci est un test"
   - Contenu: "Contenu de test"
   - Date: Aujourd'hui
   - Auteur: "Test"
   - Catégorie: Sélectionnez une
4. Cliquez Save
5. Vérifiez que l'article apparaît sur http://localhost:3000/blog

### Test 2: Modifier un Article

1. Allez à http://localhost:1337/admin
2. Content Manager > Articles Blog > Sélectionnez un article
3. Modifiez le titre
4. Cliquez Save
5. Vérifiez que le changement apparaît sur http://localhost:3000/blog

### Test 3: Supprimer un Article

1. Allez à http://localhost:1337/admin
2. Content Manager > Articles Blog > Sélectionnez un article
3. Cliquez Delete
4. Confirmez
5. Vérifiez que l'article disparaît de http://localhost:3000/blog

### Test 4: Recherche

1. Allez à http://localhost:3000/blog
2. Tapez "tendances" dans la barre de recherche
3. Vérifiez que seuls les articles contenant "tendances" s'affichent
4. Effacez la recherche
5. Vérifiez que tous les articles réapparaissent

### Test 5: Filtres

1. Allez à http://localhost:3000/blog
2. Cliquez sur "Tendances BTP"
3. Vérifiez que seuls les articles de cette catégorie s'affichent
4. Cliquez sur "Tous les articles"
5. Vérifiez que tous les articles réapparaissent

### Test 6: Articles en Vedette

1. Allez à http://localhost:1337/admin
2. Content Manager > Articles Blog > Sélectionnez un article
3. Cochez "Featured"
4. Cliquez Save
5. Allez à http://localhost:3000/blog
6. Vérifiez que l'article apparaît dans "Articles en vedette"

### Test 7: Image

1. Allez à http://localhost:1337/admin
2. Content Manager > Articles Blog > Créez un nouvel article
3. Allez au champ "Image Principale"
4. Cliquez "Add an asset"
5. Téléchargez une image
6. Cliquez Save
7. Allez à http://localhost:3000/blog
8. Vérifiez que l'image s'affiche

## 🐛 Dépannage

### Les articles ne s'affichent pas

**Vérification 1**: Strapi est-il en cours d'exécution?
```bash
curl http://localhost:1337/api/health
```

**Vérification 2**: Les permissions sont-elles configurées?
```bash
# Allez à http://localhost:1337/admin/settings/roles
# Vérifiez que "Public" a accès à "Article Blog"
```

**Vérification 3**: Les articles sont-ils publiés?
```bash
# Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
# Vérifiez que le status est "Published"
```

### Les images ne s'affichent pas

**Vérification 1**: L'image est-elle téléchargée?
```bash
# Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
# Vérifiez que "Image Principale" est remplie
```

**Vérification 2**: Les permissions des médias sont-elles configurées?
```bash
# Allez à http://localhost:1337/admin/settings/roles
# Vérifiez que "Public" a accès aux médias
```

### La recherche ne fonctionne pas

**Vérification**: Les articles ont-ils un titre et un résumé?
```bash
# Allez à http://localhost:1337/admin/content-manager/collection-types/api::article-blog.article-blog
# Vérifiez que "Titre" et "Résumé" sont remplis
```

## 📊 Résultats Attendus

### Page Blog
- Titre: "Blog"
- Sous-titre: "Découvrez nos derniers articles..."
- Barre de recherche
- Filtres par catégorie
- 3 articles en vedette
- Grille d'articles

### Page Article
- Titre de l'article
- Catégorie
- Date
- Auteur
- Temps de lecture
- Image principale
- Contenu
- Articles connexes

### Admin Strapi
- 4 catégories
- 4 articles
- Permissions configurées

## ✅ Validation Finale

Tous les tests passent? Alors le blog est prêt! 🎉

---

**Bon testing! 🚀**
