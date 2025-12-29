# Migration VAE et Entreprises - 100% Strapi

## ✅ Travail effectué

### Nouveaux Content-Types Strapi créés

#### Pour la page VAE (`/formations/vae-btp`)
| Content-Type | Type | Description |
|--------------|------|-------------|
| `vae-avantage` | Collection | Avantages de la VAE (6 items) |
| `vae-faq` | Collection | Questions/réponses FAQ (4 items) |
| `page-vae` | Single Type | Textes hero, stats, CTA, image |

#### Pour la page Entreprises (`/formations/entreprises`)
| Content-Type | Type | Description |
|--------------|------|-------------|
| `entreprise-modalite` | Collection | Modalités de formation (3 items) |
| `page-entreprise` | Single Type | Textes hero, tarifs, financements, CTA |

### Fichiers modifiés

1. **`src/lib/strapi.ts`** - Nouvelles fonctions API:
   - `getVAEAvantages()`
   - `getVAEFaqs()`
   - `getPageVAE()`
   - `getPageEntreprise()`
   - `getEntrepriseModalites()`

2. **`src/app/formations/vae-btp/page.tsx`** - Page VAE 100% Strapi:
   - Charge formules, certifications, avantages, FAQs depuis Strapi
   - Image hero depuis Strapi avec fallback
   - Textes hero, stats, CTA depuis Strapi
   - Plus de données hardcodées

3. **`src/app/formations/entreprises/page.tsx`** - Page Entreprises 100% Strapi:
   - Charge services, thématiques, modalités depuis Strapi
   - Image hero depuis Strapi avec fallback
   - Textes hero, tarifs, financements depuis Strapi
   - Plus de données hardcodées

### Scripts créés

- `scripts/import-vae-entreprises-data.js` - Import des données statiques dans Strapi
- `scripts/configure-vae-entreprises-permissions.js` - Vérification des permissions

---

## 🔧 Actions à effectuer

### 1. Redémarrer Strapi
```bash
cd cms-cma
npm run develop
```

### 2. Configurer les permissions
Dans Strapi Admin (`http://localhost:1337/admin`):
1. Settings > Users & Permissions > Roles > Public
2. Activer "find" et "findOne" pour:
   - `vae-avantage`
   - `vae-faq`
   - `page-vae`
   - `page-entreprise`
   - `entreprise-modalite`
3. Sauvegarder

### 3. Importer les données
```bash
node scripts/import-vae-entreprises-data.js
```

### 4. Publier les entrées
Dans Strapi Admin > Content Manager:
- Publier toutes les entrées créées

### 5. Uploader les images hero (optionnel)
Dans Strapi Admin:
- Page VAE > heroImage > Upload image
- Page Entreprises > heroImage > Upload image

---

## 📊 Récapitulatif des données migrées

### Page VAE
| Donnée | Avant | Après |
|--------|-------|-------|
| Avantages VAE | Hardcodé (6) | Strapi `vae-avantages` |
| FAQ | Hardcodé (4) | Strapi `vae-faqs` |
| Certifications | Hardcodé (5) | Strapi `vae-certifications` |
| Formules | Strapi | Strapi `vae-formules` |
| Textes hero | Hardcodé | Strapi `page-vae` |
| Stats | Hardcodé | Strapi `page-vae` |
| Image hero | Hardcodé | Strapi `page-vae.heroImage` |

### Page Entreprises
| Donnée | Avant | Après |
|--------|-------|-------|
| Services/Avantages | Strapi + fallback | Strapi `entreprise-services` |
| Thématiques | Strapi + fallback | Strapi `formation-thematiques` |
| Modalités | Hardcodé (3) | Strapi `entreprise-modalites` |
| Financements | Hardcodé (3) | Strapi `page-entreprise.financements` |
| Textes hero | Hardcodé | Strapi `page-entreprise` |
| Tarifs | Hardcodé | Strapi `page-entreprise` |
| Image hero | Hardcodé | Strapi `page-entreprise.heroImage` |

---

## ✅ Comportement attendu

- **Si une donnée est supprimée/dépubliée dans Strapi** → Elle disparaît automatiquement du site
- **Si aucune donnée n'existe** → La section correspondante ne s'affiche pas
- **Pas de fallback statique** → 100% géré par Strapi
