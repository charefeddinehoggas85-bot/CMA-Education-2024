# PLAN DE MIGRATION 100% VERS STRAPI

## 🎯 OBJECTIF
Migrer 100% des contenus statiques vers Strapi pour une gestion complète via l'interface d'administration.

## 📊 ÉTAT ACTUEL
- **30% migré** : Formations principales, partenaires, témoignages
- **70% restant** : VAE, entreprises, blog, pages, composants, statistiques

## 🚀 PLAN D'ACTION DÉTAILLÉ

### PHASE 1 : CRÉATION DES CONTENT TYPES MANQUANTS (Jour 1)

#### 1.1 Content Types à créer dans Strapi Admin

##### A. VAE Formule
```json
{
  "displayName": "VAE Formule",
  "singularName": "vae-formule",
  "pluralName": "vae-formules",
  "attributes": {
    "type": { "type": "string", "required": true },
    "services": { "type": "json" },
    "duree": { "type": "string" },
    "tarif": { "type": "string", "required": true },
    "modalites": { "type": "text" },
    "ordre": { "type": "integer", "default": 1 }
  }
}
```

##### B. Entreprise Service
```json
{
  "displayName": "Entreprise Service",
  "singularName": "entreprise-service",
  "pluralName": "entreprise-services",
  "attributes": {
    "titre": { "type": "string", "required": true },
    "description": { "type": "text", "required": true },
    "icone": { "type": "string" },
    "ordre": { "type": "integer", "default": 1 }
  }
}
```

##### C. Formation Thematique
```json
{
  "displayName": "Formation Thematique",
  "singularName": "formation-thematique",
  "pluralName": "formation-thematiques",
  "attributes": {
    "nom": { "type": "string", "required": true },
    "description": { "type": "text" },
    "duree": { "type": "string" },
    "niveau": { "type": "string" },
    "prix": { "type": "string" },
    "ordre": { "type": "integer", "default": 1 }
  }
}
```

##### D. Valeur École
```json
{
  "displayName": "Valeur École",
  "singularName": "valeur-ecole",
  "pluralName": "valeurs-ecole",
  "attributes": {
    "titre": { "type": "string", "required": true },
    "points": { "type": "json" },
    "icone": { "type": "string" },
    "ordre": { "type": "integer", "default": 1 }
  }
}
```

##### E. Statistique Site
```json
{
  "displayName": "Statistique Site",
  "singularName": "statistique-site",
  "pluralName": "statistiques-site",
  "attributes": {
    "cle": { "type": "string", "required": true, "unique": true },
    "nombre": { "type": "integer", "required": true },
    "label": { "type": "string", "required": true },
    "suffixe": { "type": "string" },
    "ordre": { "type": "integer", "default": 1 }
  }
}
```

##### F. Processus Admission
```json
{
  "displayName": "Processus Admission",
  "singularName": "processus-admission",
  "pluralName": "processus-admissions",
  "attributes": {
    "etape": { "type": "integer", "required": true },
    "titre": { "type": "string", "required": true },
    "description": { "type": "text", "required": true },
    "detail": { "type": "text" },
    "icone": { "type": "string" }
  }
}
```

##### G. Catégorie Blog
```json
{
  "displayName": "Catégorie Blog",
  "singularName": "categorie-blog",
  "pluralName": "categories-blog",
  "attributes": {
    "nom": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "nom" },
    "description": { "type": "text" },
    "couleur": { "type": "string" }
  }
}
```

##### H. Article Blog
```json
{
  "displayName": "Article Blog",
  "singularName": "article-blog",
  "pluralName": "articles-blog",
  "attributes": {
    "titre": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "titre" },
    "extrait": { "type": "text", "required": true },
    "contenu": { "type": "richtext" },
    "categorie": { "type": "relation", "relation": "manyToOne", "target": "api::categorie-blog.categorie-blog" },
    "auteur": { "type": "string", "required": true },
    "datePublication": { "type": "date", "required": true },
    "tempsLecture": { "type": "string" },
    "image": { "type": "media", "multiple": false },
    "featured": { "type": "boolean", "default": false },
    "tags": { "type": "json" },
    "formationsLiees": { "type": "relation", "relation": "manyToMany", "target": "api::formation.formation" }
  }
}
```

##### I. Formateur
```json
{
  "displayName": "Formateur",
  "singularName": "formateur",
  "pluralName": "formateurs",
  "attributes": {
    "nom": { "type": "string", "required": true },
    "prenom": { "type": "string", "required": true },
    "poste": { "type": "string", "required": true },
    "specialites": { "type": "json" },
    "experience": { "type": "text" },
    "photo": { "type": "media", "multiple": false },
    "biographie": { "type": "richtext" },
    "linkedin": { "type": "string" },
    "formations": { "type": "relation", "relation": "manyToMany", "target": "api::formation.formation" }
  }
}
```

### PHASE 2 : SCRIPTS D'IMPORT DES DONNÉES (Jour 2)

#### 2.1 Script import VAE
```bash
node scripts/import-vae-data.js
```

#### 2.2 Script import Entreprises
```bash
node scripts/import-entreprises-data.js
```

#### 2.3 Script import Formations VRD
```bash
node scripts/import-formations-vrd.js
```

#### 2.4 Script import Blog
```bash
node scripts/import-blog-data.js
```

#### 2.5 Script import Site Settings
```bash
node scripts/import-site-settings.js
```

### PHASE 3 : EXTENSION API STRAPI (Jour 3)

#### 3.1 Mise à jour `src/lib/strapi.ts`
```typescript
// Nouvelles fonctions à ajouter

// VAE
export async function getVAEFormules() {
  const data = await fetchAPI('/api/vae-formules?sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

// Entreprises
export async function getEntrepriseServices() {
  const data = await fetchAPI('/api/entreprise-services?sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

export async function getFormationThematiques() {
  const data = await fetchAPI('/api/formation-thematiques?sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

// Site
export async function getValeursEcole() {
  const data = await fetchAPI('/api/valeurs-ecole?sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

export async function getStatistiquesSite() {
  const data = await fetchAPI('/api/statistiques-site?sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

export async function getProcessusAdmission() {
  const data = await fetchAPI('/api/processus-admissions?sort=etape:asc')
  return transformStrapiArray(data.data || [])
}

// Blog
export async function getCategoriesBlog() {
  const data = await fetchAPI('/api/categories-blog')
  return transformStrapiArray(data.data || [])
}

export async function getArticlesBlog() {
  const data = await fetchAPI('/api/articles-blog?populate=*&sort=datePublication:desc')
  return transformStrapiArray(data.data || [])
}

export async function getArticleBlog(slug: string) {
  const data = await fetchAPI(`/api/articles-blog?filters[slug][$eq]=${slug}&populate=*`)
  return transformStrapiData(data.data?.[0])
}

// Formateurs
export async function getFormateurs() {
  const data = await fetchAPI('/api/formateurs?populate=*')
  return transformStrapiArray(data.data || [])
}

// Formations VRD
export async function getFormationsVRD() {
  const data = await fetchAPI('/api/formations?filters[category][slug][$eq]=vrd&populate=*')
  return transformStrapiArray(data.data || [])
}
```

### PHASE 4 : MIGRATION DES PAGES (Jours 4-6)

#### 4.1 Page d'accueil (`src/app/page.tsx`)
```typescript
// Remplacer les imports statiques par :
import { 
  getFormations, 
  getPartners, 
  getTestimonials, 
  getStatistiquesSite 
} from '@/lib/strapi'

// Dans le composant :
const [stats, setStats] = useState([])
const [formations, setFormations] = useState([])

useEffect(() => {
  async function loadData() {
    const [statsData, formationsData] = await Promise.all([
      getStatistiquesSite(),
      getFormations()
    ])
    setStats(statsData)
    setFormations(formationsData)
  }
  loadData()
}, [])
```

#### 4.2 Page à propos (`src/app/about/page.tsx`)
```typescript
import { getValeursEcole, getStatistiquesSite, getFormateurs } from '@/lib/strapi'

const [valeurs, setValeurs] = useState([])
const [stats, setStats] = useState([])
const [formateurs, setFormateurs] = useState([])

useEffect(() => {
  async function loadData() {
    const [valeursData, statsData, formateursData] = await Promise.all([
      getValeursEcole(),
      getStatistiquesSite(),
      getFormateurs()
    ])
    setValeurs(valeursData)
    setStats(statsData)
    setFormateurs(formateursData)
  }
  loadData()
}, [])
```

#### 4.3 Page contact (`src/app/contact/page.tsx`)
```typescript
import { getProcessusAdmission, getSiteSettings } from '@/lib/strapi'

const [processus, setProcessus] = useState([])
const [contact, setContact] = useState(null)

useEffect(() => {
  async function loadData() {
    const [processusData, contactData] = await Promise.all([
      getProcessusAdmission(),
      getSiteSettings()
    ])
    setProcessus(processusData)
    setContact(contactData)
  }
  loadData()
}, [])
```

#### 4.4 Pages formations
```typescript
// Mise à jour de toutes les pages formations individuelles
// pour utiliser getFormation(slug) au lieu des données statiques

// src/app/formations/vae-btp/page.tsx
import { getVAEFormules } from '@/lib/strapi'

// src/app/formations/entreprises/page.tsx  
import { getEntrepriseServices, getFormationThematiques } from '@/lib/strapi'
```

#### 4.5 Pages blog
```typescript
// src/app/blog/page.tsx
import { getArticlesBlog, getCategoriesBlog } from '@/lib/strapi'

// src/app/blog/[id]/page.tsx
import { getArticleBlog } from '@/lib/strapi'
```

### PHASE 5 : MIGRATION DES COMPOSANTS (Jours 7-8)

#### 5.1 Footer (`src/components/layout/Footer.tsx`)
```typescript
// Remplacer :
import { contact, stats } from '@/lib/data'

// Par :
import { getSiteSettings, getStatistiquesSite } from '@/lib/strapi'

const [contact, setContact] = useState(null)
const [stats, setStats] = useState([])

useEffect(() => {
  async function loadData() {
    const [contactData, statsData] = await Promise.all([
      getSiteSettings(),
      getStatistiquesSite()
    ])
    setContact(contactData)
    setStats(statsData)
  }
  loadData()
}, [])
```

#### 5.2 Composants sections
```typescript
// src/components/sections/BlogGrid.tsx
import { getArticlesBlog } from '@/lib/strapi'

// src/components/sections/FormationsSection.tsx
import { getFormations } from '@/lib/strapi'

// src/components/sections/ValuesSection.tsx
import { getValeursEcole } from '@/lib/strapi'

// src/components/sections/StatsSection.tsx
import { getStatistiquesSite } from '@/lib/strapi'
```

#### 5.3 Composants UI
```typescript
// src/components/ui/FormationsDropdown.tsx
import { getFormations } from '@/lib/strapi'

// src/components/ui/PartnersLogos.tsx
import { getPartners } from '@/lib/strapi'
```

### PHASE 6 : NETTOYAGE ET OPTIMISATION (Jour 9)

#### 6.1 Suppression des fichiers statiques
```bash
# Nettoyer ou supprimer :
# src/lib/data.ts (garder seulement ce qui n'est pas migré)
# src/lib/formations-vrd.ts (supprimer complètement)
# src/lib/blog-data.ts (supprimer complètement)
```

#### 6.2 Suppression des imports inutilisés
```bash
# Rechercher et supprimer tous les imports de :
# '@/lib/data'
# '@/lib/formations-vrd'  
# '@/lib/blog-data'
```

#### 6.3 Tests de validation
```bash
# Tester toutes les pages
npm run build
npm run start

# Vérifier :
# - Toutes les pages se chargent
# - Toutes les données s'affichent
# - Pas d'erreurs console
# - Performance maintenue
```

## 📋 CHECKLIST DE VALIDATION

### ✅ Content Types créés
- [ ] VAE Formule
- [ ] Entreprise Service
- [ ] Formation Thematique
- [ ] Valeur École
- [ ] Statistique Site
- [ ] Processus Admission
- [ ] Catégorie Blog
- [ ] Article Blog
- [ ] Formateur

### ✅ Données importées
- [ ] Formules VAE (2 formules)
- [ ] Services entreprises (4 services)
- [ ] Thématiques formations (5 thématiques)
- [ ] Valeurs école (3 valeurs)
- [ ] Statistiques site (4 stats)
- [ ] Processus admission (4 étapes)
- [ ] Articles blog (4+ articles)
- [ ] Catégories blog (5 catégories)
- [ ] Formations VRD (2 formations)

### ✅ Pages migrées
- [ ] Page d'accueil (`/`)
- [ ] Page à propos (`/about`)
- [ ] Page contact (`/contact`)
- [ ] Page partenaires (`/partenaires`)
- [ ] Page pédagogie (`/pedagogie`)
- [ ] Page vie étudiante (`/vie-etudiante`)
- [ ] Page formateurs (`/formateurs`)
- [ ] Pages blog (`/blog/*`)
- [ ] Toutes les pages formations

### ✅ Composants migrés
- [ ] Footer.tsx
- [ ] Header.tsx (navigation)
- [ ] Tous les composants sections/
- [ ] Tous les composants ui/

### ✅ Tests finaux
- [ ] Build sans erreurs
- [ ] Toutes les pages fonctionnelles
- [ ] Données correctement affichées
- [ ] Performance maintenue
- [ ] SEO préservé

## 🎯 RÉSULTAT ATTENDU

### 100% des contenus dans Strapi
- **0 import statique** restant
- **Gestion complète** via interface admin
- **Flexibilité totale** pour les modifications
- **Performance optimisée** avec cache Strapi
- **SEO dynamique** depuis Strapi

### Interface admin complète
- Gestion des formations
- Gestion du blog
- Gestion des partenaires
- Gestion des témoignages
- Gestion des pages
- Gestion des paramètres du site

---

**DURÉE TOTALE ESTIMÉE : 9 jours**
**COMPLEXITÉ : Élevée mais réalisable**
**IMPACT : Migration 100% réussie**

*Plan créé le 23/12/2024*