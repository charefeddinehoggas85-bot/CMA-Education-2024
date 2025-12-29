# Instructions pour la brochure

## Fichier à ajouter
Placez votre fichier PDF de brochure dans ce dossier avec le nom :
`brochure-cma-academy.pdf`

## Alternative
Si vous n'avez pas encore de brochure PDF, vous pouvez :
1. Créer un PDF avec Canva, Adobe InDesign, ou Figma
2. Le placer dans `/public/brochure-cma-academy.pdf`
3. Le modal téléchargera automatiquement ce fichier

## Modification du chemin
Si votre fichier a un nom différent, modifiez la ligne 73 dans :
`src/components/ui/BrochureModal.tsx`

```typescript
link.href = '/votre-nom-de-fichier.pdf'
```
