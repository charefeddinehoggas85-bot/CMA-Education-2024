# 🗺️ MAPPING PAGES & COMPOSANTS

## Pages Principales

### 1. Page d'Accueil (/)
**Fichier:** src/app/page.tsx
**Composants:**
- Navigation
- HeroSection (statique)
- ModalitesSection (statique)
- LazyProcessSection (statique)
- LazyFormationsSection (statique)
- StatsSection (statique)
- InstitutionalSection (statique)
- SocialProofSection (statique)
- ContactSection (statique)
- TestimonialsSection (Strapi ✓)
- PartnersSection (Strapi ✓)
- AccessibilityBanner
- Footer
- OptimizedFloatingActions

**Données à migrer:** 70%

---

### 2. Formations (/formations)
**Fichier:** src/app/formations/page.tsx
**Composants:**
- Hero section
- Navigation catégories
- FormationCard (réutilisable)
- CategorySection (réutilisable)

**Sections:**
- Formations en alternance (Strapi partiellement)
- Formations reconversion (statique)
- Formations VAE (statique)
- Formations entreprises (statique)

**Données à migrer:** 80%

---

### 3. Détail Formation (/formations/[slug])
**Fichier:** src/app/formations/[slug]/page.tsx
**Logique:**
1. Essayer Strapi
2. Fallback statique

**Affiche:**
- Titre, niveau, RNCP
- Description complète
- Objectifs
- Programme
- Débouchés
- Prérequis
- Tarif
- Taux réussite/insertion
- Bouton candidater
- Télécharger brochure

**Données à migrer:** 100%

---

### 4. À Propos (/about)
**Fichier:** src/app/about/page.tsx
**Composants:**
- AboutSection (statique)
- StatsGrid (statique)
- ValuesSection (statique)

**Données à migrer:** 90%

---

### 5. Contact (/contact)
**Fichier:** src/app/contact/page.tsx
**Composants:**
- Hero image
- Parcours admission (statique)
- Partenaires (Strapi ✓)
- Formulaire contact (statique)
- Infos contact (statique)

**Données à migrer:** 60%

---

### 6. Partenaires (/partenaires)
**Fichier:** src/app/partenaires/page.tsx
**Composants:**
- Hero
- Partners Grid (Strapi ✓)
- Stats (statique)
- Formations entreprises (statique)

**Données à migrer:** 40%

---

### 7. Blog (/blog)
**Fichier:** src/app/blog/page.tsx
**Composants:**
- BlogHero
- BlogCategories
- BlogGrid (Strapi ✓)

**Données à migrer:** 10%

---

### 8. Détail Article (/blog/[id])
**Fichier:** src/app/blog/[id]/page.tsx
**Composants:**
- BlogArticle (Strapi ✓)
- RelatedArticles (Strapi ✓)

**Données à migrer:** 0% (déjà Strapi)

---

### 9. Pages Statiques
- /pedagogie
- /vie-etudiante
- /formateurs
- /confidentialite

**Données à migrer:** À analyser

---

## Composants Sections

### Composants avec Données Statiques

#### HeroSection
**Fichier:** src/components/sections/HeroSection.tsx
**Données:** Titre, description, CTA
**Migration:** Créer collection "HeroSection" ou intégrer à SiteSettings

#### ModalitesSection
**Fichier:** src/components/sections/ModalitesSection.tsx
**Données:** Modalités de formation
**Migration:** Créer collection "Modalites"

#### FormationsSection
**Fichier:** src/components/sections/FormationsSection.tsx
**Données:** Formations par catégorie
**Migration:** Utiliser collection Formations avec filtres

#### LazyFormationsSection
**Fichier:** src/components/sections/LazyFormationsSection.tsx
**Données:** Formations (lazy loading)
**Migration:** Utiliser collection Formations

#### StatsSection
**Fichier:** src/components/sections/StatsSection.tsx
**Données:** Stats (experience, formations, partners, insertion)
**Migration:** Créer collection "SiteSettings"

#### InstitutionalSection
**Fichier:** src/components/sections/InstitutionalSection.tsx
**Données:** Contenu institutionnel
**Migration:** Créer collection "Pages" ou "Sections"

#### ProcessSection
**Fichier:** src/components/sections/ProcessSection.tsx
**Données:** Processus admission
**Migration:** Créer collection "AdmissionProcess"

#### ValuesSection
**Fichier:** src/components/sections/ValuesSection.tsx
**Données:** Valeurs de l'école
**Migration:** Créer collection "Values" ou intégrer à SiteSettings

#### AboutSection
**Fichier:** src/components/sections/AboutSection.tsx
**Données:** À propos
**Migration:** Créer collection "Pages"

#### ContactSection
**Fichier:** src/components/sections/ContactSection.tsx
**Données:** Infos contact
**Migration:** Utiliser SiteSettings

#### SocialProofSection
**Fichier:** src/components/sections/SocialProofSection.tsx
**Données:** Partners (statique)
**Migration:** Utiliser collection Partners (Strapi)

---

### Composants avec Strapi ✓

#### TestimonialsSection
**Fichier:** src/components/sections/TestimonialsSection.tsx
**Strapi:** getTestimonials()
**Status:** ✅ Fonctionnel

#### PartnersSection
**Fichier:** src/components/sections/PartnersSection.tsx
**Strapi:** getPartners()
**Status:** ✅ Fonctionnel

#### BlogGrid
**Fichier:** src/components/sections/BlogGrid.tsx
**Strapi:** Articles
**Status:** ✅ Fonctionnel

#### BlogArticle
**Fichier:** src/components/sections/BlogArticle.tsx
**Strapi:** Article détail
**Status:** ✅ Fonctionnel

#### RelatedArticles
**Fichier:** src/components/sections/RelatedArticles.tsx
**Strapi:** Articles liés
**Status:** ✅ Fonctionnel

---

## Composants UI

### PartnersLogos
**Fichier:** src/components/ui/PartnersLogos.tsx
**Données:** Partners (statique)
**Migration:** Utiliser collection Partners (Strapi)

### FormationsDropdown
**Fichier:** src/components/ui/FormationsDropdown.tsx
**Données:** Formations (statique)
**Migration:** Utiliser collection Formations (Strapi)

---

## Layout Components

### Footer
**Fichier:** src/components/layout/Footer.tsx
**Données:** contact, stats
**Migration:** Utiliser SiteSettings (Strapi)

### Header
**Fichier:** src/components/layout/Header.tsx
**Données:** Navigation
**Migration:** Créer collection "Navigation" ou intégrer à SiteSettings

---

## Résumé des Migrations

### Priorité CRITIQUE
- [ ] Formations (alternance, reconversion, VRD, VAE, entreprises)
- [ ] Articles Blog (complétion)

### Priorité HAUTE
- [ ] Stats
- [ ] Valeurs
- [ ] Contact Info
- [ ] Admission Steps

### Priorité MOYENNE
- [ ] Pages statiques (about, pedagogie, etc.)
- [ ] Sections (hero, modalites, process, etc.)
- [ ] Partners (complétion)

### Priorité BASSE
- [ ] Navigation
- [ ] Footer (une fois SiteSettings créé)

---

## Dépendances Entre Collections

```
Formations
├── Partners (relation)
└── Articles (relation)

Articles
├── Formations (relation)
└── Categories

SiteSettings
├── Stats
├── Contact
├── Values
└── AdmissionSteps

Pages
├── Sections
└── Content

Partners
└── Formations (relation)
```

---

## Fichiers à Supprimer Après Migration

- [ ] src/lib/data.ts (ou vider)
- [ ] src/lib/formations-vrd.ts (ou vider)
- [ ] src/lib/blog-data.ts (ou vider)

## Fichiers à Créer

- [ ] scripts/import-formations-to-strapi.js
- [ ] scripts/import-blog-to-strapi.js
- [ ] scripts/import-settings-to-strapi.js
- [ ] docs/STRAPI_COLLECTIONS.md
- [ ] docs/ADMIN_GUIDE.md
