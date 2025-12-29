# Configuration des Adresses Email - CMA Academy

## Résumé des Modifications

### Adresses Email Configurées

1. **Formulaires de candidature** → `inscription.academy@cma-education.com`
   - Formulaire de contact principal (`/contact`)
   - Formulaires d'inscription aux formations
   - Candidatures en ligne

2. **Demandes de brochure** → `contact.academy@cma-education.com`
   - Modal de téléchargement de brochure
   - API `/api/brochure`

3. **Demandes de devis** → `contact.academy@cma-education.com`
   - Demandes de devis entreprises
   - Programmes personnalisés
   - Formations sur mesure

4. **Contact général** → `contact.academy@cma-education.com`
   - Informations de contact affichées sur le site
   - Demandes d'informations générales

## Fichiers Modifiés

### 1. `src/lib/data.ts`
- ✅ Configuration des adresses email de contact
- ✅ Distinction entre email général et email d'inscription

### 2. `src/app/contact/page.tsx`
- ✅ Formulaire de candidature → `inscription.academy@cma-education.com`
- ✅ Champ caché `to_email` mis à jour

### 3. `src/app/api/brochure/route.ts`
- ✅ Commentaire ajouté pour indiquer l'envoi vers `contact.academy@cma-education.com`

### 4. `src/components/sections/ContactSection.tsx`
- ✅ Commentaire ajouté pour le formulaire de candidature

### 5. `src/components/ui/BrochureModal.tsx`
- ✅ Commentaire ajouté pour indiquer la destination des demandes de brochure

### 6. `src/lib/email-config.ts` (nouveau fichier)
- ✅ Configuration centralisée des adresses email
- ✅ Types TypeScript pour la sécurité

### 7. `src/app/formations/entreprises/page.tsx`
- ✅ Commentaires ajoutés pour les demandes de devis

## Fonctionnalités par Email

### `inscription.academy@cma-education.com`
- Formulaires de candidature
- Inscriptions aux formations
- Demandes d'admission
- Dossiers d'alternance

### `contact.academy@cma-education.com`
- Demandes de brochure
- Demandes de devis entreprises
- Programmes personnalisés
- Informations générales
- Questions sur les formations
- Support client

## Prochaines Étapes

1. **Configuration EmailJS** : Mettre à jour les templates EmailJS avec les nouvelles adresses
2. **Tests** : Vérifier que tous les formulaires envoient vers les bonnes adresses
3. **Documentation** : Informer l'équipe des nouvelles adresses email
4. **Monitoring** : Surveiller la réception des emails sur les nouvelles adresses

## Notes Techniques

- Tous les formulaires utilisent EmailJS pour l'envoi
- Les adresses sont configurées de manière centralisée
- Les commentaires dans le code indiquent clairement les destinations
- La configuration est type-safe avec TypeScript