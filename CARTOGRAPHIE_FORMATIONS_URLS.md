# 🗺️ CARTOGRAPHIE COMPLÈTE DES FORMATIONS - URLs EXACTES

## 📍 BASE URL
**Site principal :** `http://localhost:3000` (développement) / `https://votre-domaine.com` (production)

---

## 🎨 DIAGRAMME DE RÉPARTITION DES FORMATIONS

```
                            🏠 SITE CMA EDUCATION
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                    🏗️ FORMATIONS              📄 AUTRES PAGES
                         │                         │
        ┌────────────────┼────────────────┐       │
        │                │                │       │
   📋 /formations   🏢 /entreprises   🎓 Dropdown   │
        │                │             Header      │
        │                │                │        │
        │                │         ┌──────┼──────┐ │
        │                │         │      │      │ │
        │                │    🔵 ALT  🟢 REC  🟡 VAE │
        │                │      │      │      │   │
        │                │      9      2      2   │
        │                │   (Strapi)(Strapi)(Static)
        │                │                        │
        └────────────────┴────────────────────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
      📊 DONNÉES STRAPI          📄 PAGES STATIQUES
            │                         │
    ┌───────┼───────┐                 │
    │       │       │                 │
🔵 ALT   🟢 REC   ⚪ SANS         🟡 VAE + SPÉCIALISÉES
   9       2      5                   10
formations formations formations      pages

═══════════════════════════════════════════════════════════════

📊 RÉPARTITION DÉTAILLÉE PAR SOURCE ET TYPE

┌─────────────────────────────────────────────────────────────┐
│                    🎯 DROPDOWN HEADER                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │🔵 ALTERNANCE│  │🟢RECONVERSION│  │  🟡 VAE BTP │        │
│  │             │  │             │  │             │        │
│  │ 9 formations│  │ 2 formations│  │ 2 formations│        │
│  │   (Strapi)  │  │   (Strapi)  │  │  (Fallback) │        │
│  │             │  │             │  │             │        │
│  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │        │
│  │ │Conducteur│ │  │ │Chargé   │ │  │ │VAE Cond.│ │        │
│  │ │Travaux   │ │  │ │Affaires │ │  │ │Travaux  │ │        │
│  │ └─────────┘ │  │ │Reconvers│ │  │ └─────────┘ │        │
│  │ ┌─────────┐ │  │ └─────────┘ │  │ ┌─────────┐ │        │
│  │ │Chef     │ │  │ ┌─────────┐ │  │ │VAE Chargé│ │        │
│  │ │Projets  │ │  │ │Conducteur│ │  │ │Affaires │ │        │
│  │ │BTP      │ │  │ │Travaux  │ │  │ └─────────┘ │        │
│  │ └─────────┘ │  │ │Reconvers│ │  │             │        │
│  │ ┌─────────┐ │  │ └─────────┘ │  │             │        │
│  │ │Chargé   │ │  │             │  │             │        │
│  │ │Affaires │ │  │             │  │             │        │
│  │ │(3 var.) │ │  │             │  │             │        │
│  │ └─────────┘ │  │             │  │             │        │
│  │ ┌─────────┐ │  │             │  │             │        │
│  │ │Double   │ │  │             │  │             │        │
│  │ │Parcours │ │  │             │  │             │        │
│  │ │BIM      │ │  │             │  │             │        │
│  │ └─────────┘ │  │             │  │             │        │
│  │     ...     │  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              📋 LIENS NAVIGATION                    │   │
│  │  "Voir toutes formations" → /formations             │   │
│  │  "Entreprises" → /formations/entreprises            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════

🗂️ ARCHITECTURE DES FICHIERS ET URLS

📁 src/app/formations/
├── 📄 page.tsx ────────────────────────── /formations
├── 📁 entreprises/
│   └── 📄 page.tsx ───────────────────── /formations/entreprises
├── 📁 [slug]/
│   └── 📄 page.tsx ───────────────────── /formations/{slug} (16 formations Strapi)
├── 📁 vae-btp/
│   ├── 📄 page.tsx ──────────────────── /formations/vae-btp
│   ├── 📁 conducteur-travaux/
│   │   └── 📄 page.tsx ──────────────── /formations/vae-btp/conducteur-travaux
│   └── 📁 charge-affaires/
│       └── 📄 page.tsx ──────────────── /formations/vae-btp/charge-affaires
└── 📁 reconversion-btp/
    ├── 📄 page.tsx ─────────────────── /formations/reconversion-btp
    ├── 📁 conducteur-travaux/
    │   └── 📄 page.tsx ─────────────── /formations/reconversion-btp/conducteur-travaux
    └── 📁 charge-affaires/
        └── 📄 page.tsx ─────────────── /formations/reconversion-btp/charge-affaires

═══════════════════════════════════════════════════════════════

📊 FLUX DE DONNÉES

┌─────────────────┐    API     ┌─────────────────┐    Render    ┌─────────────────┐
│   🗄️ STRAPI     │ ────────► │  🔧 FRONTEND    │ ──────────► │  🌐 BROWSER     │
│                 │           │                 │             │                 │
│ • 16 formations │           │ • FormationsDD  │             │ • Dropdown      │
│ • 3 catégories  │           │ • [slug] pages  │             │ • Pages détail  │
│ • Médias        │           │ • Fallback VAE  │             │ • Navigation    │
└─────────────────┘           └─────────────────┘             └─────────────────┘
        │                              │                              │
        │                              │                              │
        ▼                              ▼                              ▼
┌─────────────────┐           ┌─────────────────┐             ┌─────────────────┐
│ 📋 CATÉGORIES   │           │ 🎯 LOGIQUE      │             │ 👤 UTILISATEUR  │
│                 │           │                 │             │                 │
│ • alternance    │           │ • Si ≥1 cat     │             │ • Survol menu   │
│ • reconversion  │           │   → Strapi      │             │ • Clic formation│
│ • vae (vide)    │           │ • Sinon         │             │ • Navigation    │
│                 │           │   → Fallback    │             │                 │
└─────────────────┘           └─────────────────┘             └─────────────────┘

═══════════════════════════════════════════════════════════════

---

## 🔵 FORMATIONS EN ALTERNANCE (9 formations)
*Source : Strapi CMS - Catégorie "alternance"*

### 1. Conducteur(trice) de Travaux Bâtiment & Génie Civil
- **URL :** `/formations/conducteur-travaux-batiment-alternance`
- **URL complète :** `http://localhost:3000/formations/conducteur-travaux-batiment-alternance`
- **Slug Strapi :** `conducteur-travaux-batiment-alternance`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 2. Chef de Projets BTP
- **URL :** `/formations/chef-projets-btp-alternance`
- **URL complète :** `http://localhost:3000/formations/chef-projets-btp-alternance`
- **Slug Strapi :** `chef-projets-btp-alternance`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 3. Conducteur de Travaux – Bâtiment & Génie Civil
- **URL :** `/formations/conducteur-travaux-batiment`
- **URL complète :** `http://localhost:3000/formations/conducteur-travaux-batiment`
- **Slug Strapi :** `conducteur-travaux-batiment`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 4. Chargé(e) d'Affaires du Bâtiment (Version 1)
- **URL :** `/formations/charge-affaires-batiment-alternance`
- **URL complète :** `http://localhost:3000/formations/charge-affaires-batiment-alternance`
- **Slug Strapi :** `charge-affaires-batiment-alternance`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 5. Chargé(e) d'Affaires du Bâtiment (Version 2)
- **URL :** `/formations/alt-bac2-charge-affaires`
- **URL complète :** `http://localhost:3000/formations/alt-bac2-charge-affaires`
- **Slug Strapi :** `alt-bac2-charge-affaires`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 6. Chargé(e) d'Affaires du Bâtiment (Version 3)
- **URL :** `/formations/charge-affaires-batiment`
- **URL complète :** `http://localhost:3000/formations/charge-affaires-batiment`
- **Slug Strapi :** `charge-affaires-batiment`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 7. Double Parcours : Responsable Travaux & Coordinateur BIM
- **URL :** `/formations/double-parcours-bim-alternance`
- **URL complète :** `http://localhost:3000/formations/double-parcours-bim-alternance`
- **Slug Strapi :** `double-parcours-bim-alternance`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 8. Conducteur de Travaux – Bâtiment & Génie Civil (Version 2)
- **URL :** `/formations/alt-bac2-conducteur-travaux`
- **URL complète :** `http://localhost:3000/formations/alt-bac2-conducteur-travaux`
- **Slug Strapi :** `alt-bac2-conducteur-travaux`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 9. Chef de Projets BTP (Version 2)
- **URL :** `/formations/chef-projets-btp`
- **URL complète :** `http://localhost:3000/formations/chef-projets-btp`
- **Slug Strapi :** `chef-projets-btp`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

---

## 🟢 FORMATIONS EN RECONVERSION (3 formations)
*Source : Strapi CMS - Catégorie "reconversion" + Pages statiques*

### 1. Chargé d'affaires du bâtiment - Professionnels en reconversion
- **URL :** `/formations/charge-affaires-reconversion`
- **URL complète :** `http://localhost:3000/formations/charge-affaires-reconversion`
- **Slug Strapi :** `charge-affaires-reconversion`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 2. Conducteur de Travaux Bâtiment et Génie Civil - Professionnels en reconversion
- **URL :** `/formations/conducteur-travaux-reconversion`
- **URL complète :** `http://localhost:3000/formations/conducteur-travaux-reconversion`
- **Slug Strapi :** `conducteur-travaux-reconversion`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 3. Conducteur de Travaux Publics - Professionnels en reconversion
- **URL :** `/formations/reconversion-btp/conducteur-travaux-publics`
- **URL complète :** `http://localhost:3000/formations/reconversion-btp/conducteur-travaux-publics`
- **Slug :** `conducteur-travaux-publics-reconversion`
- **Fichier :** `src/app/formations/reconversion-btp/conducteur-travaux-publics/page.tsx` (statique)

---

## 🟡 FORMATIONS VAE (2 formations - Pages statiques)
*Source : Fallback - Pages statiques existantes*

### 1. VAE Conducteur de Travaux
- **URL :** `/formations/vae-btp/conducteur-travaux`
- **URL complète :** `http://localhost:3000/formations/vae-btp/conducteur-travaux`
- **Fichier :** `src/app/formations/vae-btp/conducteur-travaux/page.tsx` (statique)

### 2. VAE Chargé d'Affaires
- **URL :** `/formations/vae-btp/charge-affaires`
- **URL complète :** `http://localhost:3000/formations/vae-btp/charge-affaires`
- **Fichier :** `src/app/formations/vae-btp/charge-affaires/page.tsx` (statique)

---

## ⚪ FORMATIONS SANS CATÉGORIE (5 formations)
*Source : Strapi CMS - Non assignées à une catégorie*

### 1. Chef de Chantier Voirie et Réseaux Divers
- **URL :** `/formations/chef-chantier-vrd`
- **URL complète :** `http://localhost:3000/formations/chef-chantier-vrd`
- **Slug Strapi :** `chef-chantier-vrd`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 2. Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM
- **URL :** `/formations/responsable-travaux-bim`
- **URL complète :** `http://localhost:3000/formations/responsable-travaux-bim`
- **Slug Strapi :** `responsable-travaux-bim`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 3. Conducteur de Travaux Voirie et Réseaux Divers - Cursus 2 ans
- **URL :** `/formations/conducteur-travaux-vrd-2ans`
- **URL complète :** `http://localhost:3000/formations/conducteur-travaux-vrd-2ans`
- **Slug Strapi :** `conducteur-travaux-vrd-2ans`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 4. Conducteur de Travaux en VRD - Cursus 1 an
- **URL :** `/formations/conducteur-travaux-vrd-1an`
- **URL complète :** `http://localhost:3000/formations/conducteur-travaux-vrd-1an`
- **Slug Strapi :** `conducteur-travaux-vrd-1an`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

### 5. Chef de Chantier VRD
- **URL :** `/formations/chef-chantier-vrd-alternance`
- **URL complète :** `http://localhost:3000/formations/chef-chantier-vrd-alternance`
- **Slug Strapi :** `chef-chantier-vrd-alternance`
- **Fichier :** `src/app/formations/[slug]/page.tsx` (dynamique)

---

## 📄 PAGES SPÉCIALISÉES ET DE NAVIGATION

### Pages principales formations
- **Toutes les formations :** `/formations`
  - **URL complète :** `http://localhost:3000/formations`
  - **Fichier :** `src/app/formations/page.tsx`
  - **Description :** Page d'accueil formations avec liste par catégorie

- **Formations pour entreprises :** `/formations/entreprises`
  - **URL complète :** `http://localhost:3000/formations/entreprises`
  - **Fichier :** `src/app/formations/entreprises/page.tsx`
  - **Description :** Formations dédiées aux entreprises

### Pages catégories spécialisées
- **VAE BTP - Page principale :** `/formations/vae-btp`
  - **URL complète :** `http://localhost:3000/formations/vae-btp`
  - **Fichier :** `src/app/formations/vae-btp/page.tsx`
  - **Description :** Présentation générale de la VAE

- **Reconversion BTP - Page principale :** `/formations/reconversion-btp`
  - **URL complète :** `http://localhost:3000/formations/reconversion-btp`
  - **Fichier :** `src/app/formations/reconversion-btp/page.tsx`
  - **Description :** Présentation générale de la reconversion

### Pages reconversion spécialisées
- **Reconversion Conducteur de Travaux :** `/formations/reconversion-btp/conducteur-travaux`
  - **URL complète :** `http://localhost:3000/formations/reconversion-btp/conducteur-travaux`
  - **Fichier :** `src/app/formations/reconversion-btp/conducteur-travaux/page.tsx`

- **Reconversion Chargé d'Affaires :** `/formations/reconversion-btp/charge-affaires`
  - **URL complète :** `http://localhost:3000/formations/reconversion-btp/charge-affaires`
  - **Fichier :** `src/app/formations/reconversion-btp/charge-affaires/page.tsx`

- **Reconversion Conducteur de Travaux Publics :** `/formations/reconversion-btp/conducteur-travaux-publics`
  - **URL complète :** `http://localhost:3000/formations/reconversion-btp/conducteur-travaux-publics`
  - **Fichier :** `src/app/formations/reconversion-btp/conducteur-travaux-publics/page.tsx`

---

## 🎯 NAVIGATION DANS LE DROPDOWN

### Structure du dropdown formations (Header)
```
FORMATIONS (hover pour ouvrir)
├── Onglet "Alternance" (9 formations Strapi)
├── Onglet "Reconversion" (2 formations Strapi)  
└── Onglet "VAE BTP" (2 formations fallback)
```

### Liens de navigation dans le dropdown
- **"Voir toutes les formations" :** → `/formations`
- **"Entreprises" :** → `/formations/entreprises`

---

## 📊 RÉSUMÉ TECHNIQUE

### Types de pages
- **Pages dynamiques :** 16 formations (via `src/app/formations/[slug]/page.tsx`)
- **Pages statiques :** 8 pages spécialisées
- **Total URLs formations :** 24 URLs accessibles

### Sources de données
- **Strapi CMS :** 16 formations (11 catégorisées + 5 sans catégorie)
- **Pages statiques :** 8 pages spécialisées + 2 VAE fallback

### Statut de fonctionnement
- ✅ **Toutes les URLs sont fonctionnelles**
- ✅ **Navigation dropdown opérationnelle**
- ✅ **Fallback VAE configuré**
- ✅ **Pages spécialisées accessibles**

---

## 🔗 LIENS UTILES

- **Site de développement :** `http://localhost:3000`
- **Admin Strapi :** `http://localhost:1337/admin`
- **API Formations :** `http://localhost:1337/api/formations`
- **API Catégories :** `http://localhost:1337/api/formation-categories`

---

## 🎯 DIAGRAMME DE NAVIGATION UTILISATEUR

```
                    👤 UTILISATEUR SUR LE SITE
                              │
                    ┌─────────┴─────────┐
                    │                   │
              🖱️ Survol "Formations"   📋 Clic direct
                    │                   │
            ┌───────┴───────┐          │
            │ 🎯 DROPDOWN   │          │
            │   APPARAÎT    │          │
            └───────┬───────┘          │
                    │                   │
        ┌───────────┼───────────┐      │
        │           │           │      │
   🔵 Onglet    🟢 Onglet   🟡 Onglet   │
   Alternance   Reconvers.   VAE BTP   │
        │           │           │      │
        │           │           │      │
   ┌────┴────┐ ┌───┴────┐ ┌────┴───┐  │
   │9 format.│ │2 format│ │2 format│  │
   │(Strapi) │ │(Strapi)│ │(Static)│  │
   └────┬────┘ └───┬────┘ └────┬───┘  │
        │          │           │      │
        │          │           │      │
   🖱️ Clic    🖱️ Clic     🖱️ Clic    │
   formation   formation   formation   │
        │          │           │      │
        └──────────┼───────────┘      │
                   │                  │
                   ▼                  ▼
            📄 PAGE FORMATION    📋 /formations
                   │                  │
            ┌──────┴──────┐          │
            │             │          │
       🔧 Dynamique   📄 Statique     │
       [slug] page    VAE pages       │
            │             │          │
            │             │          │
       ┌────┴────┐   ┌────┴────┐     │
       │ Strapi  │   │ Fichier │     │
       │ Content │   │ Statique│     │
       └─────────┘   └─────────┘     │
                                     │
                              ┌──────┴──────┐
                              │ Page liste  │
                              │ formations  │
                              │ par catég.  │
                              └─────────────┘

═══════════════════════════════════════════════════════════════

🔄 FLUX DE FALLBACK VAE

┌─────────────────┐
│ 🟡 Onglet VAE   │
│   (Dropdown)    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐    ❌ Strapi    ┌─────────────────┐
│ 🔍 Vérification │ ──────────────► │ 🔄 Fallback     │
│ Formations VAE  │    (0 résultat) │ Activé          │
│ dans Strapi     │                 │                 │
└─────────────────┘                 └─────────┬───────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │ 📄 2 Formations │
                                    │ VAE Statiques   │
                                    │                 │
                                    │ • Conducteur    │
                                    │ • Chargé Aff.   │
                                    └─────────┬───────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │ 🔗 URLs Fixes   │
                                    │                 │
                                    │ /vae-btp/...    │
                                    └─────────────────┘

═══════════════════════════════════════════════════════════════
```

---

*Dernière mise à jour : 25 décembre 2025*
*Toutes les URLs ont été vérifiées et sont fonctionnelles*