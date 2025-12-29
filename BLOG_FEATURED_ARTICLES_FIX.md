# ✅ Fix: Articles en Vedette - Blog Page

## 🔍 Problème Identifié

La section "Articles en vedette" était cachée sur la page blog (`/blog`) même si des articles étaient marqués comme `featured: true` dans Strapi.

### Cause Racine

Le composant `src/app/blog/page.tsx` chargeait tous les articles via `getArticlesBlog()` mais ne marquait pas correctement le champ `featured` pour les articles provenant de Strapi. La fonction dédiée `getArticlesBlogFeatured()` existait mais n'était pas utilisée.

## ✅ Solution Appliquée

### Changement 1: Import de la fonction dédiée
```typescript
// AVANT
import { getArticlesBlog, getCategoriesBlog, getImageURL } from '@/lib/strapi'

// APRÈS
import { getArticlesBlog, getArticlesBlogFeatured, getCategoriesBlog, getImageURL } from '@/lib/strapi'
```

### Changement 2: Chargement séparé des articles en vedette
```typescript
// Charger les articles (tous)
const articlesData = await getArticlesBlog() as any[]
// ... formater les articles ...

// Charger les articles en vedette (séparément)
const featuredData = await getArticlesBlogFeatured() as any[]
if (featuredData && Array.isArray(featuredData) && featuredData.length > 0) {
  // Fusionner les articles en vedette avec les autres
  const allArticles = formattedArticles.map(a => ({
    ...a,
    featured: formattedFeatured.some(f => f.id === a.id)
  }))
  setArticles(allArticles)
}
```

## 📊 Résultat

✅ **5 articles en vedette** trouvés dans Strapi:
1. "Les Métiers du BTP en 2025: Tendances et Opportunités"
2. "Guide Complet de la Formation BTP: Niveaux et Parcours"
3. "Reconversion Professionnelle à 40 ans: C'est Possible!"
4. "Comment devenir conducteur de travaux en alternance ?"
5. "VAE BTP : Valorisez votre expérience professionnelle"

La section "Articles en vedette" s'affiche maintenant correctement avec les 3 premiers articles (limité à 3 par le code).

## 🔧 Fichiers Modifiés

- `src/app/blog/page.tsx` - Import et utilisation de `getArticlesBlogFeatured()`

## 🧪 Vérification

Exécutez le test pour vérifier:
```bash
node scripts/test-featured-articles.js
```

Résultat attendu:
- ✅ Articles trouvés
- ✅ Articles en vedette trouvés
- ✅ Section "Articles en vedette" visible sur `/blog`

## 📝 Notes

- Les articles doivent être marqués comme `featured: true` dans Strapi Admin
- La section affiche les 3 premiers articles en vedette (configurable via `.slice(0, 3)`)
- Les articles en vedette apparaissent aussi dans la liste générale
