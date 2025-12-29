# 📋 AUDIT COMPLET DE MIGRATION VERS STRAPI
## Construction Management Academy - Site Next.js

**Date:** 2025  
**Objectif:** Identifier tous les contenus codés en dur et créer un plan de migration vers Strapi pour une gestion complète via l'interface admin.

---

## 📊 RÉSUMÉ EXÉCUTIF

### État Actuel
- ✅ **Strapi partiellement intégré** : Testimonials, Partners, Articles, Pages
- ⚠️ **Données statiques massives** : Formations, Blog, Contact, Stats
- 🔴 **Codage en dur** : ~70% du contenu reste en dur dans `src/lib/data.ts`

### Chiffres Clés
- **8 pages principales** (+ 15+ pages de formations)
- **20+ composants** utilisant des données
- **1 fichier data.ts** avec ~3000+ lignes de contenu statique
- **4 catégories de formations** (Alternance, Reconversion, VAE, Entreprises)
- **Taux de migration nécessaire** : 85% du contenu

---

## 🗂️ STRUCTURE DU PROJET

### Pages Principales (src/app)
```
src/app/
├── page.tsx                          ✅ Utilise composants (données Strapi + statiques)
├── about/page.tsx                    ⚠️ Utilise stats statiques
├── contact/page.tsx                  ⚠️ Formulaire + données statiques
├── formations/page.tsx               ⚠️ Mélange Strapi + statiques
├── formations/[slug]/page.tsx        ⚠️ Mélange Strapi + statiques
├── blog/page.tsx                     ✅ Utilise Strapi (articles)
├── partenaires/page.tsx              ⚠️ Mélange Strapi + statiques
├── pedagogie/page.tsx                ❓ À analyser
├── vie-etudiante/page.tsx            ❓ À analyser
├── formateurs/page.tsx               ❓ À analyser
├── confidentialite/page.tsx          ❓ À analyser
└── api/                              ✅ Routes API (contact, brochure)
```

### Composants Sections (src/components/sections)
```
src/components/sections/
├── HeroSection.tsx                   ⚠️ Données statiques
├── ModalitesSection.tsx              ⚠️ Données statiques
├── FormationsSection.tsx             ⚠️ Données statiques (formations par catégorie)
├── LazyFormationsSection.tsx         ⚠️ Données statiques
├── StatsSection.tsx                  ⚠️ Données statiques (stats)
├── TestimonialsSection.tsx           ✅ Strapi (getTestimonials)
├── PartnersSection.tsx               ✅ Strapi (getPartners)
├── SocialProofSection.tsx            ⚠️ Données statiques (partners)
├── ValuesSection.tsx                 ⚠️ Données statiques
├── AboutSection.tsx                  ⚠️ Données statiques
├── ContactSection.tsx                ⚠️ Données statiques
├── ProcessSection.tsx                ⚠️ Données statiques
├── InstitutionalSection.tsx          ⚠️ Données statiques
├── BlogGrid.tsx                      ✅ Strapi (articles)
├── BlogArticle.tsx                   ✅ Strapi
└── RelatedArticles.tsx               ✅ Strapi
```

---

## 📦 DONNÉES STATIQUES À MIGRER

### 1. **FORMATIONS** (Priorité CRITIQUE)
**Fichier source:** `src/lib/data.ts`  
**Lignes:** ~1500  
**Utilisation:** 8+ pages et composants

#### Formations en Alternance
```typescript
formationsAlternance = [
  - alt-bac2-charge-affaires (RNCP35503)
  - alt-bac2-conducteur-travaux (RNCP40217)
  - alt-bac2-chef-chantier-vrd (RNCP41368)
  - alt-bac3-double-parcours (RNCP39408)
  - alt-bac5-chef-projets (En cours d'enregistrement)
]
```

**Champs à migrer:**
- `id`, `title`, `level`, `rncp`, `shortDesc`, `fullDesc`
- `objectifs[]`, `programme[]`, `debouches[]`
- `duree`, `volumeHoraire`, `rythme`, `modalite`
- `effectif`, `prerequis[]`, `cout`, `certificateur`
- `tauxReussite`, `tauxInsertion`, `conception`
- `entreprisesPartenaires[]`, `dateEnregistrement`

**Pages affectées:**
- `/formations` - Affichage liste
- `/formations/[slug]` - Détail formation
- `/formations/alt-bac2-charge-affaires/page.tsx` - Page statique
- `/formations/alt-bac2-conducteur-travaux/page.tsx` - Page statique
- `/formations/alt-bac3-double-parcours/page.tsx` - Page statique
- `/formations/alt-bac5-chef-projets/page.tsx` - Page statique
- `/formations/alt-bac2-chef-chantier-vrd/page.tsx` - Page statique

#### Formations Reconversion
```typescript
formationsReconversion = [
  - rec-bac2-charge-affaires (RNCP35503)
  - rec-bac2-conducteur-travaux (RNCP40217)
]
```

**Champs identiques aux formations alternance**

**Pages affectées:**
- `/formations` - Section reconversion
- `/formations/[slug]` - Détail

#### Formations VRD (Voiries et Réseaux Divers)
**Fichier source:** `src/lib/formations-vrd.ts`  
**Formations:**
- `alt-bac3-conducteur-vrd-1an` (RNCP 41369)
- `alt-bac3-conducteur-vrd-2ans` (RNCP39469)

**Champs spécifiques VRD:**
- `metierDesc`, `competences2eAnnee[]`, `modalitesEvaluation[]`
- `poursuiteEtudes[]`, `voiesAccesVRD`

#### Formations VAE
```typescript
formationsVAE = {
  principe: { definition, objectif },
  conditions: { accessibilite, experience, diplome },
  certifications: { niveau5[], niveau6[] },
  formules: [
    { type, services[], duree, tarif, modalites }
  ]
}
```

**Pages affectées:**
- `/formations` - Section VAE

#### Formations Entreprises
```typescript
formationsEntreprises = {
  avantages: [],
  thematiques: [],
  modalites: [],
  tarification: {},
  financement: []
}
```

**Pages affectées:**
- `/formations` - Section entreprises
- `/partenaires` - Détails formations entreprises

---

### 2. **BLOG & ARTICLES** (Priorité HAUTE)
**Fichier source:** `src/lib/blog-data.ts`  
**Lignes:** ~1000+  
**Utilisation:** `/blog`, `/blog/[id]`

**Articles actuels:**
1. "Formation BTP Alternance 2025 : Guide Complet pour Réussir"
2. "Formation Conducteur de Travaux Bâtiment 2025"
3. "Formation BTP Reconversion 2025"
4. "Formation Chargé d'Affaires Bâtiment 2025"

**Champs à migrer:**
- `id`, `title`, `excerpt`, `content` (HTML riche)
- `category`, `author`, `date`, `readTime`
- `image`, `featured`, `tags[]`
- `relatedFormations[]` (relations)

**Status:** ⚠️ Partiellement intégré à Strapi  
**Action:** Importer les articles existants + créer structure complète

---

### 3. **STATISTIQUES & CHIFFRES CLÉS** (Priorité MOYENNE)
**Fichier source:** `src/lib/data.ts`  
**Utilisation:** 5+ pages et composants

```typescript
stats = {
  experience: { number: 15, label: "années d'expertise BTP", suffix: "+" },
  formations: { number: 8, label: "formations certifiantes RNCP", suffix: "" },
  partners: { number: 45, label: "Entreprises partenaires actives", suffix: "+" },
  insertion: { number: 89, label: "de nos diplômés en poste en moins de 4 mois", suffix: "%" }
}
```

**Pages affectées:**
- `/` - StatsSection
- `/about` - StatsGrid
- `/partenaires` - Stats

**Composants affectés:**
- `StatsSection.tsx`
- `AnimatedStats.tsx`

---

### 4. **VALEURS & MISSION** (Priorité MOYENNE)
**Fichier source:** `src/lib/data.ts`  
**Utilisation:** `/about`, ValuesSection

```typescript
values = [
  {
    title: "Professionnalisme",
    points: [...]
  },
  {
    title: "Proximité",
    points: [...]
  },
  // ... autres valeurs
]
```

**Pages affectées:**
- `/about` - ValuesSection

---

### 5. **PARTENAIRES** (Priorité MOYENNE)
**Fichier source:** `src/lib/data.ts`  
**Utilisation:** 3+ pages et composants

```typescript
partners = [
  { name: "Eiffage", sector: "Construction & Concessions", ... },
  { name: "Bouygues Construction", sector: "Bâtiment & Travaux Publics", ... },
  // ... 45+ partenaires
]
```

**Status:** ✅ Partiellement intégré à Strapi  
**Action:** Compléter avec logos et descriptions

**Pages affectées:**
- `/` - SocialProofSection
- `/partenaires` - Grille complète
- `/contact` - Liste partenaires

---

### 6. **CONTACT & INFORMATIONS** (Priorité MOYENNE)
**Fichier source:** `src/lib/data.ts`  
**Utilisation:** `/contact`, Footer

```typescript
contact = {
  address: "...",
  phone: "...",
  email: "...",
  emailInscription: "...",
  whatsapp: "..."
}

admissionSteps = [
  { step: 1, title: "...", description: "...", detail: "..." },
  // ... 4 étapes
]
```

**Pages affectées:**
- `/contact` - Formulaire + infos
- Footer - Infos de contact

---

### 7. **CONTENU PÉDAGOGIQUE** (Priorité BASSE)
**Fichier source:** `src/lib/data.ts`  
**Utilisation:** Pages pédagogie, vie-étudiante

```typescript
// À identifier dans les pages non analysées
```

---

## 🔍 ANALYSE DÉTAILLÉE PAR PAGE

### Page d'Accueil (`/`)
**Composants:**
- ✅ HeroSection - Données statiques (titre, description)
- ⚠️ ModalitesSection - Données statiques
- ⚠️ LazyProcessSection - Données statiques
- ⚠️ LazyFormationsSection - Données statiques (formations)
- ⚠️ StatsSection - Données statiques (stats)
- ⚠️ InstitutionalSection - Données statiques
- ✅ SocialProofSection - Données statiques (partners)
- ⚠️ ContactSection - Données statiques
- ✅ TestimonialsSection - **Strapi** ✓
- ✅ PartnersSection - **Strapi** ✓

**Migration nécessaire:** 70%

---

### Page Formations (`/formations`)
**Composants:**
- ⚠️ FormationsSection - Données statiques (formations par catégorie)
- ⚠️ Affichage formations alternance - **Strapi** (partiellement)
- ⚠️ Affichage formations reconversion - Données statiques
- ⚠️ Affichage formations VAE - Données statiques
- ⚠️ Affichage formations entreprises - Données statiques

**Données utilisées:**
```typescript
import { formationsReconversion, formationsVAE, formationsEntreprises } from '@/lib/data'
import { getFormations } from '@/lib/strapi'
```

**Migration nécessaire:** 80%

---

### Page Détail Formation (`/formations/[slug]`)
**Logique:**
1. Essayer de charger depuis Strapi
2. Fallback sur données statiques

```typescript
const strapiFormation = await getFormation(slug)
if (strapiFormation) {
  // Utiliser Strapi
} else {
  // Fallback sur formationsAlternance + formationsReconversion
}
```

**Migration nécessaire:** 100% (pour supprimer fallback)

---

### Page À Propos (`/about`)
**Composants:**
- ⚠️ AboutSection - Données statiques
- ⚠️ ValuesSection - Données statiques
- ⚠️ StatsGrid - Données statiques

**Migration nécessaire:** 90%

---

### Page Contact (`/contact`)
**Composants:**
- ⚠️ Formulaire - Données statiques (contact info)
- ⚠️ AdmissionSteps - Données statiques
- ✅ PartnersSection - **Strapi** ✓

**Migration nécessaire:** 60%

---

### Page Partenaires (`/partenaires`)
**Composants:**
- ✅ Partners Grid - **Strapi** ✓
- ⚠️ Benefits - Données statiques
- ⚠️ Formations entreprises - Données statiques

**Migration nécessaire:** 40%

---

### Page Blog (`/blog`)
**Status:** ✅ Partiellement intégré à Strapi

**Composants:**
- ✅ BlogGrid - **Strapi** ✓
- ✅ BlogArticle - **Strapi** ✓
- ✅ RelatedArticles - **Strapi** ✓

**Migration nécessaire:** 10% (complétion)

---

## 📋 COMPOSANTS UTILISANT DES DONNÉES STATIQUES

### Composants Sections
| Composant | Données | Statut | Migration |
|-----------|---------|--------|-----------|
| HeroSection.tsx | Titre, description | Statique | 100% |
| ModalitesSection.tsx | Modalités formation | Statique | 100% |
| FormationsSection.tsx | Formations par catégorie | Statique | 100% |
| LazyFormationsSection.tsx | Formations | Statique | 100% |
| StatsSection.tsx | Stats | Statique | 100% |
| InstitutionalSection.tsx | Contenu institutionnel | Statique | 100% |
| ProcessSection.tsx | Processus admission | Statique | 100% |
| ValuesSection.tsx | Valeurs | Statique | 100% |
| AboutSection.tsx | À propos | Statique | 100% |
| ContactSection.tsx | Contact | Statique | 100% |
| TestimonialsSection.tsx | Témoignages | **Strapi** | ✅ |
| PartnersSection.tsx | Partenaires | **Strapi** | ✅ |
| SocialProofSection.tsx | Partenaires | Statique | 100% |
| BlogGrid.tsx | Articles | **Strapi** | ✅ |
| BlogArticle.tsx | Article détail | **Strapi** | ✅ |

### Composants UI
| Composant | Données | Statut |
|-----------|---------|--------|
| PartnersLogos.tsx | Partners | Statique |
| FormationsDropdown.tsx | Formations | Statique |

### Layout
| Composant | Données | Statut |
|-----------|---------|--------|
| Footer.tsx | Contact, stats | Statique |

---

## 🎯 PLAN DE MIGRATION STRAPI

### Phase 1 : FORMATIONS (Semaine 1-2)
**Priorité:** CRITIQUE

#### Étapes:
1. **Créer collection Strapi "Formations"**
   - Champs: title, slug, level, rncp, shortDescription, fullDescription
   - Champs: duration, volumeHoraire, rhythm, modalite, effectif
   - Champs: objectives[], program[], opportunities[], prerequisites[]
   - Champs: price, successRate, insertionRate, certificateur
   - Champs: category (alternance, reconversion, vae, entreprise)
   - Relations: partners[], relatedArticles[]

2. **Importer données existantes**
   - Script: `scripts/import-formations-to-strapi.js`
   - Source: `src/lib/data.ts` + `src/lib/formations-vrd.ts`
   - Cible: Collection Strapi

3. **Mettre à jour pages**
   - `/formations` - Utiliser `getFormations()` Strapi
   - `/formations/[slug]` - Supprimer fallback statique
   - Pages statiques `/formations/alt-bac2-*` - Rediriger vers `/formations/[slug]`

4. **Tester**
   - Vérifier affichage formations
   - Vérifier liens et navigation
   - Vérifier SEO metadata

---

### Phase 2 : CONTENU STATIQUE (Semaine 2-3)
**Priorité:** HAUTE

#### Collections à créer:
1. **SiteSettings**
   - stats (experience, formations, partners, insertion)
   - contact (address, phone, email, etc.)
   - values[]
   - admissionSteps[]

2. **Pages**
   - about, pedagogie, vie-etudiante, formateurs, confidentialite
   - Champs: title, slug, content, seo

3. **Sections**
   - hero, modalites, process, institutional
   - Champs: title, description, content

#### Étapes:
1. Créer collections dans Strapi
2. Importer données existantes
3. Mettre à jour composants pour utiliser Strapi
4. Supprimer imports de `src/lib/data.ts`

---

### Phase 3 : OPTIMISATION (Semaine 3-4)
**Priorité:** MOYENNE

#### Actions:
1. **Nettoyer code**
   - Supprimer `src/lib/data.ts` (si vide)
   - Supprimer `src/lib/formations-vrd.ts` (si vide)
   - Supprimer `src/lib/blog-data.ts` (si vide)

2. **Optimiser requêtes Strapi**
   - Ajouter cache (revalidate)
   - Ajouter pagination
   - Ajouter filtres

3. **Ajouter fonctionnalités admin**
   - Drag & drop pour ordonner formations
   - Aperçu avant publication
   - Historique versions

---

## 📊 TABLEAU DE MIGRATION

### Formations
| Élément | Statut Actuel | Cible Strapi | Priorité | Effort |
|---------|---------------|--------------|----------|--------|
| Formations Alternance | Statique | Collection | CRITIQUE | 2j |
| Formations Reconversion | Statique | Collection | CRITIQUE | 1j |
| Formations VRD | Statique | Collection | CRITIQUE | 1j |
| Formations VAE | Statique | Collection | HAUTE | 1j |
| Formations Entreprises | Statique | Collection | HAUTE | 1j |

### Contenu
| Élément | Statut Actuel | Cible Strapi | Priorité | Effort |
|---------|---------------|--------------|----------|--------|
| Articles Blog | Strapi (partiel) | Collection | HAUTE | 1j |
| Témoignages | Strapi | Collection | ✅ | 0j |
| Partenaires | Strapi | Collection | ✅ | 0j |
| Stats | Statique | SiteSettings | MOYENNE | 0.5j |
| Valeurs | Statique | SiteSettings | MOYENNE | 0.5j |
| Contact Info | Statique | SiteSettings | MOYENNE | 0.5j |
| Pages | Statique | Collection | MOYENNE | 2j |

---

## 🔧 SCRIPTS DE MIGRATION

### Script 1: Import Formations
**Fichier:** `scripts/import-formations-to-strapi.js`

```javascript
// Importer formations depuis data.ts vers Strapi
// - formationsAlternance
// - formationsReconversion
// - formationsVRD
// - formationsVAE
// - formationsEntreprises
```

### Script 2: Import Blog
**Fichier:** `scripts/import-blog-to-strapi.js`

```javascript
// Importer articles depuis blog-data.ts vers Strapi
```

### Script 3: Import Settings
**Fichier:** `scripts/import-settings-to-strapi.js`

```javascript
// Importer stats, contact, values, etc.
```

---

## 📝 CHECKLIST DE MIGRATION

### Avant Migration
- [ ] Backup base de données Strapi
- [ ] Backup fichiers statiques
- [ ] Créer branches Git pour chaque phase
- [ ] Documenter structure Strapi

### Phase 1: Formations
- [ ] Créer collection "Formations" dans Strapi
- [ ] Définir tous les champs
- [ ] Créer relations (partners, articles)
- [ ] Importer données
- [ ] Mettre à jour `/formations`
- [ ] Mettre à jour `/formations/[slug]`
- [ ] Tester affichage
- [ ] Tester SEO
- [ ] Déployer

### Phase 2: Contenu
- [ ] Créer collection "SiteSettings"
- [ ] Créer collection "Pages"
- [ ] Créer collection "Sections"
- [ ] Importer données
- [ ] Mettre à jour composants
- [ ] Tester affichage
- [ ] Déployer

### Phase 3: Optimisation
- [ ] Nettoyer code
- [ ] Optimiser requêtes
- [ ] Ajouter cache
- [ ] Tester performance
- [ ] Documenter pour admin

### Après Migration
- [ ] Former utilisateurs admin
- [ ] Créer guide d'utilisation
- [ ] Mettre en place monitoring
- [ ] Archiver fichiers statiques

---

## 🎓 GUIDE D'UTILISATION ADMIN

### Pour l'Administrateur
Une fois la migration complète, l'admin pourra:

1. **Gérer les formations**
   - Créer/modifier/supprimer formations
   - Organiser par catégorie
   - Ajouter/modifier objectifs, programme, débouchés
   - Gérer les relations avec partenaires

2. **Gérer le contenu**
   - Modifier stats et chiffres clés
   - Mettre à jour valeurs et mission
   - Gérer pages statiques
   - Modifier infos de contact

3. **Gérer les articles**
   - Créer/modifier articles blog
   - Ajouter images et contenu riche
   - Lier articles aux formations
   - Gérer catégories et tags

4. **Gérer les partenaires**
   - Ajouter/modifier partenaires
   - Uploader logos
   - Gérer descriptions

---

## 📈 BÉNÉFICES DE LA MIGRATION

### Pour l'Utilisateur Admin
✅ Interface intuitive pour gérer tout le contenu  
✅ Pas besoin de coder pour mettre à jour  
✅ Historique des modifications  
✅ Gestion des versions  
✅ Aperçu avant publication  

### Pour le Site
✅ Contenu centralisé et cohérent  
✅ Meilleure performance (cache Strapi)  
✅ SEO optimisé  
✅ Scalabilité améliorée  
✅ Maintenance simplifiée  

### Pour les Développeurs
✅ Code plus propre (pas de data.ts géant)  
✅ Séparation contenu/code  
✅ Réutilisabilité des composants  
✅ Facilité de maintenance  

---

## ⚠️ RISQUES & MITIGATION

| Risque | Impact | Mitigation |
|--------|--------|-----------|
| Perte de données | CRITIQUE | Backup avant migration |
| Downtime site | HAUTE | Migration en parallèle |
| Erreurs import | MOYENNE | Validation données |
| Performance | MOYENNE | Optimiser requêtes |
| Utilisateurs perdus | BASSE | Redirects 301 |

---

## 📞 SUPPORT & DOCUMENTATION

### Ressources
- Documentation Strapi: https://docs.strapi.io
- Guide Next.js + Strapi: [À créer]
- Scripts de migration: `scripts/`
- Exemples: `cms-cma/`

### Contact
- Support technique: [À définir]
- Questions admin: [À définir]

---

## 🚀 TIMELINE ESTIMÉE

| Phase | Durée | Dates |
|-------|-------|-------|
| Phase 1: Formations | 4 jours | Semaine 1-2 |
| Phase 2: Contenu | 3 jours | Semaine 2-3 |
| Phase 3: Optimisation | 2 jours | Semaine 3-4 |
| **Total** | **9 jours** | **~2 semaines** |

---

## 📌 CONCLUSION

Ce projet de migration vers Strapi permettra à Construction Management Academy de:

1. **Centraliser la gestion du contenu** - Un seul endroit pour tout gérer
2. **Autonomiser l'équipe admin** - Pas besoin de développeur pour les mises à jour
3. **Améliorer la maintenabilité** - Code plus propre et organisé
4. **Scalabiliser le site** - Prêt pour la croissance future
5. **Optimiser les performances** - Meilleur cache et requêtes

**Recommandation:** Commencer par la Phase 1 (Formations) qui est la plus critique et apportera le plus de valeur immédiate.

---

**Document préparé pour:** Construction Management Academy  
**Version:** 1.0  
**Dernière mise à jour:** 2025
