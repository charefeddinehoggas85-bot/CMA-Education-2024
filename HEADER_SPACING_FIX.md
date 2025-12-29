# Correction de l'espacement du header

## Problème résolu
Le contenu de la page `/formateurs` (et d'autres pages) était caché par le header fixe.

## Solution implémentée

### 1. Classes utilitaires Tailwind ajoutées
Dans `tailwind.config.ts`, ajout de classes personnalisées :
```typescript
spacing: {
  'header-offset': '9rem', // 144px - espacement pour compenser le header fixe
  'header-offset-mobile': '8rem', // 128px - espacement mobile
}
```

### 2. Pages corrigées
- `src/app/formateurs/page.tsx` : `pt-header-offset md:pt-header-offset-mobile`
- `src/components/layout/PageLayout.tsx` : Correction du layout général
- `src/app/formations/entreprises/page.tsx` : Correction de la section hero
- `src/components/sections/HeroSection.tsx` : Correction du hero principal

### 3. Utilisation
Pour toute nouvelle page avec header fixe, utiliser :
```tsx
<div className="pt-header-offset md:pt-header-offset-mobile">
  {/* Contenu de la page */}
</div>
```

## Calcul de l'espacement
- Header : `h-24` (96px)
- Logo : `h-32` (128px) 
- Marge de sécurité : 16px
- **Total desktop** : 144px (`header-offset`)
- **Total mobile** : 128px (`header-offset-mobile`)

## Test
Vérifier sur http://localhost:3000/formateurs que le contenu n'est plus caché par le header.