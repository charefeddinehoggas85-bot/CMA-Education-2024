# 📧 Configuration Finale - Système Email Brochures

## ✅ STATUT ACTUEL
- **API Route**: ✅ Créée (`/api/send-brochure-notification`)
- **Composant**: ✅ Mis à jour (`BrochureModal.tsx`)
- **Bibliothèque**: ✅ Nodemailer installé
- **Configuration**: ⚠️ À finaliser

## 🔧 CONFIGURATION REQUISE

### 1. Configurez votre email professionnel

Dans le fichier `.env.local`, remplacez les valeurs par vos vraies informations :

```bash
# Remplacez ces valeurs par vos vraies informations
EMAIL_USER=votre-vrai-email@gmail.com
EMAIL_PASSWORD=votre-vrai-mot-de-passe-application
```

### 2. Configuration Gmail (Recommandée)

1. **Activez l'authentification à 2 facteurs** sur votre compte Gmail
2. **Générez un mot de passe d'application** :
   - Allez dans Paramètres Google > Sécurité
   - Authentification à 2 facteurs > Mots de passe des applications
   - Sélectionnez "Autre" et nommez "CMA Website"
   - Copiez le mot de passe généré (16 caractères)

3. **Mettez à jour .env.local** :
```bash
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=abcd-efgh-ijkl-mnop  # Le mot de passe d'application
```

### 3. Configuration Outlook/Hotmail

```bash
EMAIL_USER=votre-email@outlook.com
EMAIL_PASSWORD=votre-mot-de-passe-application
```

Dans `src/app/api/send-brochure-notification/route.ts`, changez :
```typescript
service: 'outlook', // au lieu de 'gmail'
```

## 🧪 TEST DU SYSTÈME

### 1. Démarrez les serveurs
```bash
# Terminal 1 - Strapi CMS
cd cms-cma
npm run develop

# Terminal 2 - Next.js
npm run dev
```

### 2. Testez l'API directement
```bash
node scripts/test-brochure-complete-flow.js
```

### 3. Test complet sur le site
1. Allez sur http://localhost:3000/formations/chef-projets-btp-1an
2. Cliquez sur "Télécharger la brochure"
3. Remplissez le formulaire avec vos vraies informations
4. Cliquez sur "Générer et télécharger"

## ✅ VÉRIFICATIONS

Après le test, vous devriez voir :
- ✅ La brochure se télécharge automatiquement
- ✅ Un email arrive sur `contact.academy@cma-education.com`
- ✅ L'email contient toutes les informations du candidat

## 📧 FORMAT DE L'EMAIL REÇU

```
TO: contact.academy@cma-education.com
SUBJECT: Nouvelle demande de brochure - [Nom de la formation]

Nouvelle demande de téléchargement de brochure

📋 INFORMATIONS DE LA FORMATION
Formation: Chef de Projets BTP - Cursus 1 an
Niveau: Niveau 7 (équivalent Bac+5)
Slug: chef-projets-btp-1an
ID: 21

👤 INFORMATIONS DU CANDIDAT
Nom complet: Jean Dupont
Nom: Dupont
Prénom: Jean
Profil: Particulier
Email: jean.dupont@example.com
Téléphone: 01 23 45 67 89

📅 INFORMATIONS DE LA DEMANDE
Date: 29/12/2025
Heure: 12:56:34
Type de brochure: Brochure Strapi PDF
Page d'origine: http://localhost:3000/formations/chef-projets-btp-1an

---
Cette demande a été générée automatiquement par le site Construction Management Academy.
```

## 🔧 DÉPANNAGE

### Erreur "Invalid login"
- Vérifiez que l'authentification 2FA est activée
- Utilisez un mot de passe d'application, pas votre mot de passe normal
- Vérifiez que l'email est correct

### Erreur "Connection refused"
- Vérifiez que le serveur Next.js est démarré (`npm run dev`)
- Vérifiez le port 3000

### Email non reçu
- Vérifiez les spams/indésirables
- Testez avec un autre email de destination temporairement
- Vérifiez les logs du serveur Next.js

## 🎯 AVANTAGES DE CETTE SOLUTION

✅ **Simple et direct** - Pas de service externe  
✅ **Fiable** - Utilise votre email professionnel  
✅ **Pas de limite** - Pas de restriction d'envoi  
✅ **Sécurisé** - Authentification par mot de passe d'application  
✅ **Gratuit** - Aucun coût supplémentaire  

## 📋 RÉSUMÉ TECHNIQUE

- **API Route**: `/api/send-brochure-notification`
- **Méthode**: POST avec données JSON
- **Email destination**: `contact.academy@cma-education.com`
- **Bibliothèque**: Nodemailer
- **Service**: Gmail (configurable)
- **Authentification**: Mot de passe d'application

Le système est maintenant prêt ! Il vous suffit de configurer vos vraies informations email dans `.env.local`.