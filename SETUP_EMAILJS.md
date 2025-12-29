# Configuration EmailJS

## 🎯 Étapes de Configuration

### 1. Créer un compte EmailJS
- Aller sur https://www.emailjs.com/
- Créer un compte avec : `b6track@gmail.com`
- Mot de passe : `0041954***Ce`

### 2. Service Email Configuré ✅
- **Service** : Gmail_API
- **Email** : b6track@gmail.com
- **Service ID** : `service_cma2026` (confirmé)
- **Statut** : Connecté et opérationnel

### 3. Créer un Template Email
- Aller dans "Email Templates"
- Cliquer "Create New Template"
- **Template ID** : `template_candidature`
- **Subject** : `🎓 Nouvelle Candidature - {{prenom}} {{nom}} - {{formation}}`
- **To Email** : `contact.academy@cma-education.com`

**Template HTML :**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .section { margin-bottom: 20px; padding: 15px; border-left: 4px solid #3b82f6; background: #f8fafc; }
        .label { font-weight: bold; color: #1e40af; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎓 Nouvelle Candidature CMA Education</h1>
        <p>Candidature reçue le {{date}}</p>
    </div>
    
    <div class="content">
        <div class="section">
            <h2>👤 Informations Personnelles</h2>
            <p><span class="label">Nom complet :</span> {{prenom}} {{nom}}</p>
            <p><span class="label">Date de naissance :</span> {{dateNaissance}}</p>
            <p><span class="label">Téléphone :</span> {{telephone}}</p>
            <p><span class="label">Email :</span> {{email}}</p>
            <p><span class="label">Code postal :</span> {{codePostal}}</p>
        </div>
        
        <div class="section">
            <h2>🎯 Formation Demandée</h2>
            <p><span class="label">Formation choisie :</span> {{formation}}</p>
        </div>
        
        <div class="section">
            <h2>⏰ Actions à Effectuer</h2>
            <ul>
                <li>📞 Contacter le candidat sous 24h</li>
                <li>📅 Programmer un entretien de motivation</li>
                <li>📋 Vérifier les prérequis de la formation</li>
                <li>✉️ Envoyer la confirmation de réception</li>
            </ul>
        </div>
    </div>
    
    <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
        <p>CMA Education - Centre de Formation BTP</p>
        <p>Email automatique généré par le site web</p>
    </div>
</body>
</html>
```

### 4. Récupérer la Public Key ⚠️
- **Étape critique** : Aller dans "Account" > "General"
- Copier la "Public Key" (commence par un code alphanumérique)
- Remplacer `YOUR_PUBLIC_KEY` dans `.env.local`
- **Sans cette clé, le formulaire ne fonctionnera pas**

### 5. Configuration finale
```javascript
// Dans le code, remplacer :
service_cma2026     // Service ID
template_candidature // Template ID  
YOUR_PUBLIC_KEY     // Votre clé publique
```

## 📧 Variables du Template

Variables à utiliser dans le template EmailJS :
- `{{prenom}}` - Prénom du candidat
- `{{nom}}` - Nom du candidat
- `{{dateNaissance}}` - Date de naissance
- `{{telephone}}` - Numéro de téléphone
- `{{email}}` - Email du candidat
- `{{codePostal}}` - Code postal
- `{{formation}}` - Formation choisie
- `{{to_email}}` - Email de destination (contact.academy@cma-education.com)

## 🆓 Limites Gratuites

- **200 emails/mois** gratuits
- **Pièces jointes** supportées (2MB max)
- **Templates illimités**
- **Services multiples**

## 🔧 Test

1. Remplir le formulaire sur le site
2. Vérifier la réception sur `contact.academy@cma-education.com`
3. Vérifier les statistiques dans le dashboard EmailJS