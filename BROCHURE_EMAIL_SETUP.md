# Configuration EmailJS pour les Brochures

Ce guide vous explique comment configurer l'envoi automatique d'emails vers `contact.academy@cma-education.com` lors du téléchargement de brochures.

## 🎯 Objectif

Quand un utilisateur télécharge une brochure après avoir rempli le formulaire, vous recevrez automatiquement un email avec toutes les informations du candidat.

## 📧 Email de destination

**contact.academy@cma-education.com**

## 🔧 Configuration EmailJS

### 1. Créer un compte EmailJS

1. Allez sur https://www.emailjs.com/
2. Créez un compte ou connectez-vous
3. Accédez au dashboard

### 2. Configurer un service email

1. Cliquez sur "Add New Service"
2. Choisissez votre fournisseur email (Gmail, Outlook, etc.)
3. Configurez avec votre email professionnel
4. Notez le **Service ID** (ex: `service_cma2026`)

### 3. Créer le template email

1. Cliquez sur "Create New Template"
2. **Template ID**: `template_brochure_download`
3. **TO Email**: `contact.academy@cma-education.com`
4. **Subject**: `Nouvelle demande de brochure - {{formation_title}}`

#### Template Body:
```
Nouvelle demande de téléchargement de brochure

📋 INFORMATIONS DE LA FORMATION
Formation: {{formation_title}}
Niveau: {{formation_level}}
Slug: {{formation_slug}}
ID: {{formation_id}}
URL: {{formation_url}}

👤 INFORMATIONS DU CANDIDAT
Nom complet: {{user_fullname}}
Nom: {{user_nom}}
Prénom: {{user_prenom}}
Profil: {{user_type}}
Email: {{user_email}}
Téléphone: {{user_telephone}}

📅 INFORMATIONS DE LA DEMANDE
Date: {{date}}
Heure: {{time}}
Type de brochure: {{brochure_type}}
Page d'origine: {{page_url}}
Timestamp: {{timestamp}}

---
Cette demande a été générée automatiquement par le site Construction Management Academy.
```

### 4. Récupérer la Public Key

1. Allez dans "Account" > "API Keys"
2. Copiez votre **Public Key**

### 5. Mettre à jour .env.local

```env
# Configuration EmailJS pour les brochures
NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_brochure_download
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key

# Email de destination pour les notifications de brochure
BROCHURE_NOTIFICATION_EMAIL=contact.academy@cma-education.com
```

## 🧪 Test de la configuration

1. Exécutez le script de test:
```bash
node scripts/test-brochure-email.js
```

2. Redémarrez le serveur Next.js:
```bash
npm run dev
```

3. Testez le téléchargement d'une brochure sur le site

## 📋 Variables disponibles dans le template

| Variable | Description | Exemple |
|----------|-------------|---------|
| `{{formation_title}}` | Titre de la formation | "Chef de Projets BTP - Cursus 1 an" |
| `{{formation_level}}` | Niveau de la formation | "Niveau 7 (équivalent Bac+5)" |
| `{{formation_slug}}` | Slug de la formation | "chef-projets-btp-1an" |
| `{{formation_id}}` | ID de la formation | "21" |
| `{{formation_url}}` | URL de la formation | "http://localhost:3000/formations/..." |
| `{{user_nom}}` | Nom du candidat | "Dupont" |
| `{{user_prenom}}` | Prénom du candidat | "Jean" |
| `{{user_fullname}}` | Nom complet | "Jean Dupont" |
| `{{user_type}}` | Profil du candidat | "Particulier", "Entreprise", etc. |
| `{{user_email}}` | Email du candidat | "jean.dupont@example.com" |
| `{{user_telephone}}` | Téléphone du candidat | "01 23 45 67 89" |
| `{{date}}` | Date de la demande | "29/12/2024" |
| `{{time}}` | Heure de la demande | "14:30:25" |
| `{{brochure_type}}` | Type de brochure | "Brochure Strapi PDF" |
| `{{page_url}}` | Page d'origine | URL complète |
| `{{timestamp}}` | Timestamp ISO | "2024-12-29T14:30:25.123Z" |

## 🔍 Dépannage

### Email non reçu
1. Vérifiez les spams/courriers indésirables
2. Vérifiez la configuration du service EmailJS
3. Vérifiez que l'email de destination est correct dans le template
4. Consultez les logs du navigateur (F12 > Console)

### Erreur de configuration
1. Vérifiez que toutes les variables d'environnement sont définies
2. Redémarrez le serveur après modification du .env.local
3. Vérifiez que les IDs correspondent exactement à ceux d'EmailJS

### Test de validation
```bash
# Vérifier la configuration
node scripts/test-brochure-email.js

# Tester une formation spécifique
curl http://localhost:3000/formations/chef-projets-btp-1an
```

## 📱 Fonctionnement

1. **Utilisateur** remplit le formulaire de brochure
2. **Système** valide les données
3. **Email** envoyé automatiquement vers `contact.academy@cma-education.com`
4. **Brochure** téléchargée pour l'utilisateur
5. **Confirmation** affichée à l'utilisateur

## 🎉 Résultat

Vous recevrez un email professionnel avec toutes les informations du candidat à chaque téléchargement de brochure, vous permettant de suivre les leads et de contacter les prospects intéressés.