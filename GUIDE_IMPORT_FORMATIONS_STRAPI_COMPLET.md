# 📚 Guide Complet d'Import des Formations via Strapi

## 🎯 Vue d'ensemble

Ce guide explique comment importer des exemples de formations avec images et catégories via Strapi pour alimenter le carousel artistique moderne des formations.

## 📋 Prérequis

### 1. Configuration Strapi
- Strapi démarré et accessible
- Token d'authentification configuré
- Content types créés (formations, categories)

### 2. Variables d'environnement
```bash
STRAPI_URL=https://cma-education-strapi-production.up.railway.app
STRAPI_TOKEN=your-strapi-token
```

## 🚀 Utilisation du Script d'Import

### Lancement du script
```bash
cd CMA-Education-2024
node scripts/import-formations-examples-with-images.js
```

### Fonctionnalités du script
- ✅ Création automatique des catégories si inexistantes
- 📸 Génération d'images placeholder SVG artistiques
- 📚 Import de 8 formations d'exemple (2 par catégorie)
- 🏷️ Attribution automatique des catégories
- 📊 Rapport détaillé des résultats

## 📂 Structure des Données Importées

### Catégories créées
1. **Alternance** (`alternance`)
2. **Reconversion Professionnelle** (`reconversion`)
3. **VAE** (`vae`)
4. **Formations Entreprises** (`entreprise`)

### Formations par catégorie

#### 🎓 Alternance (2 formations)
- **Chargé d'Affaires Bâtiment - Alternance**
  - Niveau 5 (BAC+2)
  - RNCP35503
  - 1 an, 3 semaines entreprise / 1 semaine formation
  - Prise en charge OPCO

- **Conducteur de Travaux Bâtiment - Alternance**
  - Niveau 5 (BAC+2)
  - RNCP40217
  - 1 an, 2 semaines entreprise / 1 semaine formation
  - Prise en charge OPCO

#### 🔄 Reconversion (2 formations)
- **Chargé d'Affaires Bâtiment - Reconversion**
  - Niveau 5 (BAC+2)
  - RNCP35503
  - 7 mois intensif
  - CPF / Pôle Emploi

- **Conducteur de Travaux - Reconversion**
  - Niveau 5 (BAC+2)
  - RNCP40217
  - 7 mois (5 mois formation + 2 mois stage)
  - 15€/heure

#### 🏆 VAE (2 formations)
- **VAE Chargé d'Affaires Bâtiment**
  - Niveau 5 (BAC+2)
  - RNCP35503
  - 6 à 12 mois d'accompagnement
  - 4500€ TTC

- **VAE Conducteur de Travaux**
  - Niveau 5 (BAC+2)
  - RNCP40217
  - 8 à 15 mois d'accompagnement
  - 4500€ TTC

#### 🏢 Entreprise (2 formations)
- **Formation Lean Construction**
  - Formation continue
  - 3 jours intensifs
  - 700€ HT/participant

- **BIM Collaboratif - Formation Entreprise**
  - Formation continue
  - 5 jours
  - 850€ HT/participant

## 🎨 Images Générées

### Caractéristiques des images placeholder
- **Format**: SVG vectoriel
- **Dimensions**: 800x600 pixels
- **Design**: Moderne avec gradients bleus
- **Contenu**: Titre de la formation + logo CMA
- **Éléments décoratifs**: Cercles colorés artistiques

### Exemple de génération d'image
```javascript
function createPlaceholderImage(width = 800, height = 600, text = 'Formation BTP') {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#3B82F6"/>
      <rect x="50" y="50" width="${width-100}" height="${height-100}" fill="#1E40AF" opacity="0.8"/>
      <text x="50%" y="45%" text-anchor="middle" fill="white" font-size="32" font-family="Arial, sans-serif">
        ${text}
      </text>
      <text x="50%" y="55%" text-anchor="middle" fill="#E5E7EB" font-size="18" font-family="Arial, sans-serif">
        Construction Management Academy
      </text>
      <circle cx="100" cy="100" r="30" fill="#FBBF24" opacity="0.7"/>
      <circle cx="${width-100}" cy="${height-100}" r="40" fill="#10B981" opacity="0.5"/>
    </svg>
  `;
  return Buffer.from(svg);
}
```

## 🔧 Processus d'Import Détaillé

### 1. Vérification de la connexion
```javascript
await axios.get(`${STRAPI_URL}/api/formations`, {
  headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
});
```

### 2. Création des catégories
```javascript
const categories = {
  alternance: { name: 'Alternance', slug: 'alternance' },
  reconversion: { name: 'Reconversion Professionnelle', slug: 'reconversion' },
  vae: { name: 'VAE', slug: 'vae' },
  entreprise: { name: 'Formations Entreprises', slug: 'entreprise' }
};
```

### 3. Upload des images
```javascript
const formData = new FormData();
formData.append('files', imageBuffer, imageName);

const response = await axios.post(`${STRAPI_URL}/api/upload`, formData, {
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    ...formData.getHeaders()
  }
});
```

### 4. Création des formations
```javascript
const formationData = {
  title: formation.title,
  slug: formation.slug,
  level: formation.level,
  rncp: formation.rncp,
  rncpUrl: formation.rncpUrl,
  shortDescription: formation.shortDescription,
  fullDescription: formation.fullDescription,
  duration: formation.duration,
  rhythm: formation.rhythm,
  mode: formation.mode,
  price: formation.price,
  objectives: formation.objectives,
  opportunities: formation.opportunities,
  prerequisites: formation.prerequisites,
  successRate: formation.successRate,
  insertionRate: formation.insertionRate,
  category: categoryId,
  image: imageId,
  publishedAt: new Date().toISOString()
};
```

## 📊 Résultats Attendus

### Rapport de succès
```
📊 RÉSUMÉ DE L'IMPORT
============================================================

🏷️  Catégories:
   ✅ alternance: ID 1
   ✅ reconversion: ID 2
   ✅ vae: ID 3
   ✅ entreprise: ID 4

📚 Formations importées:
   📂 alternance: 2 formations
   📂 reconversion: 2 formations
   📂 vae: 2 formations
   📂 entreprise: 2 formations

📈 Total: 8 formations importées

🎉 Import terminé !
```

## 🎨 Affichage Frontend

### Carousel artistique moderne
Les formations importées s'affichent dans des carousels horizontaux avec :

- **Design artistique** : Gradients spécifiques par catégorie
- **Cartes compactes** : 288px de largeur, 384px de hauteur
- **Animations fluides** : Spring animations avec Framer Motion
- **Navigation moderne** : Boutons et indicateurs minimalistes
- **Responsive** : Adaptation mobile/desktop

### Gradients par catégorie
```typescript
const getCategoryGradient = (cat: string) => {
  switch(cat) {
    case 'alternance': return 'from-blue-500 via-indigo-500 to-purple-600'
    case 'reconversion': return 'from-emerald-500 via-teal-500 to-cyan-600'
    case 'vae': return 'from-purple-500 via-violet-500 to-fuchsia-600'
    case 'entreprise': return 'from-orange-500 via-red-500 to-pink-600'
    default: return 'from-blue-500 to-indigo-600'
  }
}
```

### Icônes par catégorie
- 🎓 Alternance
- 🔄 Reconversion
- 🏆 VAE
- 🏢 Entreprise

## 🛠️ Démarches pour l'Administrateur

### 1. Préparation
```bash
# 1. Vérifier que Strapi est démarré
curl https://cma-education-strapi-production.up.railway.app/api/formations

# 2. Configurer les variables d'environnement
export STRAPI_URL="https://cma-education-strapi-production.up.railway.app"
export STRAPI_TOKEN="your-token-here"
```

### 2. Exécution
```bash
# Lancer l'import
cd CMA-Education-2024
node scripts/import-formations-examples-with-images.js
```

### 3. Vérification
1. **Admin Strapi** : Vérifier les formations dans l'interface admin
2. **Frontend** : Tester l'affichage sur `/` (homepage)
3. **Images** : Vérifier que les images s'affichent correctement
4. **Liens** : Tester les liens vers les pages de formation

### 4. Personnalisation
- **Images réelles** : Remplacer les placeholders par de vraies photos
- **Contenu** : Ajuster les descriptions et objectifs
- **Catégories** : Ajouter d'autres catégories si nécessaire
- **Permissions** : Configurer l'accès public aux APIs

## 🔍 Dépannage

### Erreurs courantes

#### 1. Erreur de connexion Strapi
```
❌ Erreur de connexion Strapi: Request failed with status code 401
```
**Solution** : Vérifier le token d'authentification

#### 2. Erreur de création de catégorie
```
❌ Erreur lors de la création de la catégorie: Content type not found
```
**Solution** : Vérifier que le content type `categories` existe

#### 3. Erreur d'upload d'image
```
❌ Erreur upload image: Request failed with status code 413
```
**Solution** : Réduire la taille des images ou augmenter la limite Strapi

### Commandes de diagnostic
```bash
# Tester la connexion Strapi
curl -H "Authorization: Bearer $STRAPI_TOKEN" $STRAPI_URL/api/formations

# Vérifier les content types
curl -H "Authorization: Bearer $STRAPI_TOKEN" $STRAPI_URL/api/content-type-builder/content-types

# Lister les formations existantes
curl -H "Authorization: Bearer $STRAPI_TOKEN" $STRAPI_URL/api/formations?populate=*
```

## 📈 Prochaines Étapes

### 1. Amélioration des images
- Créer de vraies photos de formations
- Optimiser les formats (WebP, AVIF)
- Ajouter des images responsives

### 2. Enrichissement du contenu
- Ajouter plus de formations par catégorie
- Inclure des témoignages d'étudiants
- Ajouter des statistiques de réussite

### 3. Fonctionnalités avancées
- Système de filtres par niveau/durée
- Recherche dans les formations
- Comparateur de formations
- Système de favoris

### 4. SEO et performance
- Optimiser les métadonnées
- Ajouter un sitemap des formations
- Implémenter le lazy loading
- Optimiser les Core Web Vitals

## 🎯 Objectifs Atteints

✅ **Import automatisé** : Script complet et fonctionnel  
✅ **Images artistiques** : Placeholders SVG modernes  
✅ **Catégorisation** : 4 catégories principales  
✅ **Données complètes** : Toutes les informations nécessaires  
✅ **Affichage moderne** : Carousel artistique et responsive  
✅ **Documentation** : Guide complet pour les administrateurs  

Le système d'import est maintenant opérationnel et permet d'alimenter facilement le carousel artistique des formations avec du contenu riche et structuré.
