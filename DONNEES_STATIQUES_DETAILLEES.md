# 📊 INVENTAIRE DÉTAILLÉ DES DONNÉES STATIQUES

## Fichiers Source

### 1. src/lib/data.ts (~3000 lignes)
**Contient:**
- formationsAlternance (5 formations)
- formationsReconversion (2 formations)
- formationsVAE (structure complète)
- formationsEntreprises (structure complète)
- partners (45+ partenaires)
- stats (4 statistiques clés)
- values (valeurs de l'école)
- contact (infos de contact)
- admissionSteps (4 étapes)

### 2. src/lib/formations-vrd.ts (~500 lignes)
**Contient:**
- formationsVRD (2 formations VRD)
- voiesAccesVRD (2 voies d'accès)

### 3. src/lib/blog-data.ts (~1000 lignes)
**Contient:**
- blogArticles (4 articles complets avec HTML)
- BlogArticle interface

## Utilisation par Fichier

### Pages
- src/app/page.tsx - Composants (données indirectes)
- src/app/about/page.tsx - stats
- src/app/contact/page.tsx - contact, admissionSteps, partners
- src/app/formations/page.tsx - formationsReconversion, formationsVAE, formationsEntreprises
- src/app/formations/[slug]/page.tsx - formationsAlternance, formationsReconversion
- src/app/partenaires/page.tsx - partners, stats

### Composants
- src/components/sections/FormationsSection.tsx - formations par catégorie
- src/components/sections/StatsSection.tsx - stats
- src/components/sections/ValuesSection.tsx - values
- src/components/ui/PartnersLogos.tsx - partners
- src/components/ui/FormationsDropdown.tsx - formations
- src/components/layout/Footer.tsx - contact, stats

## Champs à Migrer par Entité

### Formation
```
- id (slug)
- title
- level
- rncp
- shortDesc
- fullDesc
- objectifs[]
- programme[]
- debouches[]
- duree
- volumeHoraire
- rythme
- modalite
- effectif
- prerequis[]
- cout
- certificateur
- tauxReussite
- tauxInsertion
- conception
- entreprisesPartenaires[]
- dateEnregistrement
- category (alternance|reconversion|vae|entreprise)
```

### Article Blog
```
- id
- title
- excerpt
- content (HTML)
- category
- author
- date
- readTime
- image
- featured
- tags[]
- relatedFormations[]
```

### Partenaire
```
- name
- sector
- type
- logo
- effectifs
- projets
- website
```

### Statistique
```
- number
- label
- suffix
```

### Valeur
```
- title
- points[]
```

### Contact
```
- address
- phone
- email
- emailInscription
- whatsapp
```

### Étape Admission
```
- step
- title
- description
- detail
```
