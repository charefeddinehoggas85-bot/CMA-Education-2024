# ✅ Configuration SMTP Hostinger - Terminée

## Résumé des modifications

### 1. Fichiers créés
- `src/lib/email.ts` - Configuration Nodemailer + Templates HTML professionnels
- `src/app/api/send-brochure-email/route.ts` - API pour emails brochure
- `src/app/api/send-contact-email/route.ts` - API pour formulaire contact

### 2. Fichiers modifiés
- `src/app/brochure/page.tsx` - Suppression EmailJS, utilisation nouvelle API
- `src/components/sections/ContactSection.tsx` - Suppression EmailJS, utilisation nouvelle API

### 3. Fichiers supprimés
- `src/lib/brochure-email.ts` - Ancien système EmailJS

---

## Configuration SMTP Hostinger

```
Host: smtp.hostinger.com
Port: 465 (SSL)
User: notification@cma-education.com
Password: Notification@114
```

---

## Variables d'environnement à ajouter sur Vercel

⚠️ **IMPORTANT**: Ajoutez ces variables dans Vercel Dashboard > Settings > Environment Variables

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=notification@cma-education.com
SMTP_PASS=Notification@114
NOTIFICATION_EMAIL=notification@cma-education.com
INSCRIPTION_EMAIL=inscription@cma-education.com
```

---

## Fonctionnement du système d'emails

### Téléchargement de brochure
Quand un utilisateur télécharge une brochure :

1. **Email interne** → `inscription@cma-education.com`
   - Contient toutes les informations du formulaire
   - Nom, prénom, email, téléphone, profil
   - Formation demandée
   - Date et heure

2. **Email de confirmation** → Email de l'utilisateur
   - Design professionnel avec logo CMA
   - Récapitulatif de la demande
   - Coordonnées de contact complètes
   - Liens réseaux sociaux

### Formulaire de contact
Quand un utilisateur envoie un message :

1. **Email interne** → `inscription@cma-education.com`
   - Toutes les informations du formulaire
   - Possibilité de répondre directement

2. **Email de confirmation** → Email de l'utilisateur
   - Confirmation de réception
   - Délai de réponse estimé

---

## Étapes de déploiement

### 1. Ajouter les variables sur Vercel
1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet CMA-Education-2024
3. Settings > Environment Variables
4. Ajouter chaque variable listée ci-dessus

### 2. Pousser les modifications sur GitHub
```bash
git add .
git commit -m "feat: Replace EmailJS with Hostinger SMTP"
git push origin main
```

### 3. Redéployer sur Vercel
- Le déploiement se fera automatiquement après le push
- OU cliquer sur "Redeploy" avec "Clear Build Cache"

### 4. Tester
- Aller sur https://www.cma-education.com/brochure
- Remplir le formulaire et télécharger une brochure
- Vérifier la réception des emails

---

## Coordonnées dans les emails

- **Téléphone**: 01 85 09 71 06
- **Email**: contact.academy@cma-education.com
- **Adresse**: 67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne
- **Site**: www.cma-education.com

---

## Support

En cas de problème avec les emails :
1. Vérifier les logs Vercel (Functions)
2. Tester l'API: `GET /api/send-brochure-email` (doit retourner status: ok)
3. Vérifier les credentials SMTP Hostinger
