# 📝 FICHIERS À MODIFIER - PLAN DÉTAILLÉ

## Phase 1: FORMATIONS

### Fichiers à Modifier

#### 1. src/app/formations/page.tsx
**Changement:** Utiliser Strapi pour formations alternance

**Avant:**
```typescript
import { formationsReconversion, formationsVAE, formationsEntreprises } from '@/lib/data'
import { getFormations } from '@/lib/strapi'

// Mélange Strapi + statique
const formations = await getFormations() // Strapi
const reconversion = formationsReconversion // Statique
```

**Après:**
```typescript
import { getFormations, getFormationsByCategory } from '@/lib/strapi'

// Tout depuis Strapi
const alternance = await getFormationsByCategory('alternance')
const reconversion = await getFormationsByCategory('reconversion')
const vae = await getFormationsByCategory('vae')
const entreprise = await getFormationsByCategory('entreprise')
```

---

#### 2. src/app/formations/[slug]/page.tsx
**Changement:** Supprimer fallback statique

**Avant:**
```typescript
const strapiFormation = await getFormation(slug)
if (strapiFormation) {
  // Utiliser Strapi
} else {
  // Fallback sur statique
  const allFormations = [...formationsAlternance, ...formationsReconversion]
  const staticFormation = allFormations.find(f => f.id === slug)
}
```

**Après:**
```typescript
const formation = await getFormation(slug)
if (!formation) {
  notFound()
}
```

---

#### 3. src/components/sections/FormationsSection.tsx
**Changement:** Utiliser Strapi pour formations

**Avant:**
```typescript
const formationsData = {
  alternance: [...],
  reconversion: [...],
  vae: [...]
}
```

**Après:**
```typescript
const [formations, setFormations] = useState([])

useEffect(() => {
  const data = await getFormationsByCategory(activeCategory)
  setFormations(data)
}, [activeCategory])
```

---

#### 4. src/components/sections/LazyFormationsSection.tsx
**Changement:** Utiliser Strapi

**Avant:**
```typescript
import { formations } from '@/lib/data'
```

**Après:**
```typescript
const formations = await getFormations()
```

---

#### 5. src/components/ui/FormationsDropdown.tsx
**Changement:** Utiliser Strapi

**Avant:**
```typescript
import { formations, formationsReconversion, formationsVAE } from '@/lib/data'
```

**Après:**
```typescript
const formations = await getFormations()
```

---

### Pages Statiques à Supprimer

```
src/app/formations/alt-bac2-charge-affaires/page.tsx
src/app/formations/alt-bac2-conducteur-travaux/page.tsx
src/app/formations/alt-bac3-double-parcours/page.tsx
src/app/formations/alt-bac5-chef-projets/page.tsx
src/app/formations/alt-bac2-chef-chantier-vrd/page.tsx
src/app/formations/alt-bac3-conducteur-vrd-1an/page.tsx
src/app/formations/alt-bac3-conducteur-vrd-2ans/page.tsx
src/app/formations/reconversion-btp/page.tsx
src/app/formations/vae-btp/page.tsx
src/app/formations/entreprises/page.tsx
```

**Action:** Rediriger vers `/formations/[slug]`

---

## Phase 2: CONTENU

### Fichiers à Modifier

#### 1. src/app/about/page.tsx
**Changement:** Utiliser Strapi pour stats

**Avant:**
```typescript
import { stats } from '@/lib/data'
```

**Après:**
```typescript
const settings = await getSiteSettings()
const stats = settings.stats
```

---

#### 2. src/app/contact/page.tsx
**Changement:** Utiliser Strapi pour contact et admission steps

**Avant:**
```typescript
import { contact, admissionSteps, partners } from '@/lib/data'
```

**Après:**
```typescript
const settings = await getSiteSettings()
const contact = settings.contact
const admissionSteps = settings.admissionSteps
const partners = await getPartners()
```

---

#### 3. src/app/partenaires/page.tsx
**Changement:** Utiliser Strapi pour stats

**Avant:**
```typescript
import { partners, stats } from '@/lib/data'
```

**Après:**
```typescript
const partners = await getPartners()
const settings = await getSiteSettings()
const stats = settings.stats
```

---

#### 4. src/components/sections/StatsSection.tsx
**Changement:** Utiliser Strapi

**Avant:**
```typescript
const stats = [
  { number: '15', label: 'Années d\'expertise BTP', suffix: '+' },
  // ...
]
```

**Après:**
```typescript
const settings = await getSiteSettings()
const stats = settings.stats
```

---

#### 5. src/components/sections/ValuesSection.tsx
**Changement:** Utiliser Strapi

**Avant:**
```typescript
import { values } from '@/lib/data'
```

**Après:**
```typescript
const settings = await getSiteSettings()
const values = settings.values
```

---

#### 6. src/components/sections/ContactSection.tsx
**Changement:** Utiliser Strapi

**Avant:**
```typescript
import { contact } from '@/lib/data'
```

**Après:**
```typescript
const settings = await getSiteSettings()
const contact = settings.contact
```

---

#### 7. src/components/layout/Footer.tsx
**Changement:** Utiliser Strapi

**Avant:**
```typescript
import { contact, stats } from '@/lib/data'
```

**Après:**
```typescript
const settings = await getSiteSettings()
const contact = settings.contact
const stats = settings.stats
```

---

#### 8. src/components/ui/PartnersLogos.tsx
**Changement:** Utiliser Strapi

**Avant:**
```typescript
import { partners } from '@/lib/data'
```

**Après:**
```typescript
const partners = await getPartners()
```

---

#### 9. src/components/sections/SocialProofSection.tsx
**Changement:** Utiliser Strapi

**Avant:**
```typescript
import { partners } from '@/lib/data'
```

**Après:**
```typescript
const partners = await getPartners()
```

---

### Fichiers à Créer

#### 1. src/lib/strapi-helpers.ts
**Contenu:**
```typescript
// Helpers pour récupérer données Strapi
export async function getSiteSettings() { ... }
export async function getFormationsByCategory(category) { ... }
export async function getPages() { ... }
// etc.
```

---

#### 2. scripts/import-formations-to-strapi.js
**Contenu:**
```javascript
// Script pour importer formations depuis data.ts vers Strapi
// - Lire data.ts
// - Transformer données
// - Envoyer à Strapi API
```

---

#### 3. scripts/import-settings-to-strapi.js
**Contenu:**
```javascript
// Script pour importer settings (stats, contact, values, etc.)
```

---

#### 4. docs/STRAPI_COLLECTIONS.md
**Contenu:**
```markdown
# Collections Strapi

## Formations
- Champs: ...
- Relations: ...

## SiteSettings
- Champs: ...

# etc.
```

---

#### 5. docs/ADMIN_GUIDE.md
**Contenu:**
```markdown
# Guide Administrateur

## Gestion Formations
- Créer formation
- Modifier formation
- Supprimer formation

# etc.
```

---

## Phase 3: NETTOYAGE

### Fichiers à Supprimer

```
src/lib/data.ts (ou vider)
src/lib/formations-vrd.ts (ou vider)
src/lib/blog-data.ts (ou vider)
```

### Fichiers à Archiver

```
archive/data.ts.backup
archive/formations-vrd.ts.backup
archive/blog-data.ts.backup
```

---

## Résumé des Modifications

### Fichiers à Modifier: 15+
- Pages: 5
- Composants: 10+

### Fichiers à Créer: 5+
- Scripts: 2
- Documentation: 3

### Fichiers à Supprimer: 3
- data.ts
- formations-vrd.ts
- blog-data.ts

### Fichiers à Archiver: 3
- Backups

---

## Ordre de Modification Recommandé

### Jour 1-2: Formations
1. Créer collection Strapi
2. Importer données
3. Modifier src/app/formations/page.tsx
4. Modifier src/app/formations/[slug]/page.tsx
5. Modifier src/components/sections/FormationsSection.tsx
6. Tester

### Jour 3: Contenu
1. Créer collection SiteSettings
2. Importer données
3. Modifier src/app/about/page.tsx
4. Modifier src/app/contact/page.tsx
5. Modifier src/components/sections/StatsSection.tsx
6. Modifier src/components/sections/ValuesSection.tsx
7. Tester

### Jour 4: Nettoyage
1. Supprimer imports data.ts
2. Supprimer fichiers statiques
3. Tester
4. Documenter

---

## Checklist de Modification

### Phase 1
- [ ] Créer collection Formations
- [ ] Importer formations
- [ ] Modifier formations/page.tsx
- [ ] Modifier formations/[slug]/page.tsx
- [ ] Modifier FormationsSection.tsx
- [ ] Modifier LazyFormationsSection.tsx
- [ ] Modifier FormationsDropdown.tsx
- [ ] Tester

### Phase 2
- [ ] Créer collection SiteSettings
- [ ] Importer settings
- [ ] Modifier about/page.tsx
- [ ] Modifier contact/page.tsx
- [ ] Modifier partenaires/page.tsx
- [ ] Modifier StatsSection.tsx
- [ ] Modifier ValuesSection.tsx
- [ ] Modifier ContactSection.tsx
- [ ] Modifier Footer.tsx
- [ ] Modifier PartnersLogos.tsx
- [ ] Modifier SocialProofSection.tsx
- [ ] Tester

### Phase 3
- [ ] Supprimer imports data.ts
- [ ] Supprimer fichiers statiques
- [ ] Archiver backups
- [ ] Tester
- [ ] Documenter

---

**Document préparé pour:** Construction Management Academy  
**Version:** 1.0  
**Dernière mise à jour:** 2025
