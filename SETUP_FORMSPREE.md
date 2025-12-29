# Configuration Formspree (Solution Gratuite)

## 🎯 Étapes de Configuration

### 1. Créer un compte Formspree
- Aller sur https://formspree.io
- Créer un compte gratuit
- Limite : 50 soumissions/mois (gratuit)

### 2. Créer un nouveau formulaire
- Cliquer sur "New Form"
- Nom : "Candidatures CMA Education"
- Email de destination : `contact.academy@cma-education.com`

### 3. Récupérer l'ID du formulaire
- Copier l'ID du formulaire (ex: `xdkogqpw`)
- Remplacer dans le code : `https://formspree.io/f/VOTRE_ID`

### 4. Configuration avancée (optionnel)
- **Notifications** : Activer les notifications email
- **Spam Protection** : Activé par défaut
- **File Uploads** : Activé pour CV et diplômes
- **Custom Thank You Page** : Redirection après envoi

## 📧 Email Reçu Contiendra

```
Sujet: 🎓 Nouvelle Candidature CMA Education

Contenu:
- Prénom: [valeur]
- Nom: [valeur]  
- Date de naissance: [valeur]
- Téléphone: [valeur]
- Email: [valeur]
- Code postal: [valeur]
- Formation: [valeur]
- CV: [fichier attaché]
- Diplôme: [fichier attaché]
```

## 🆓 Avantages Solution Gratuite

✅ **Gratuit** jusqu'à 50 soumissions/mois
✅ **Aucune configuration serveur** requise
✅ **Pièces jointes** supportées
✅ **Protection spam** intégrée
✅ **Notifications email** automatiques
✅ **Interface admin** pour voir les soumissions

## 🔧 Alternative : Netlify Forms

Si hébergé sur Netlify, remplacer par :
```html
<form netlify name="candidatures">
  <input type="hidden" name="form-name" value="candidatures" />
  <!-- reste du formulaire -->
</form>
```

## 📊 Monitoring

- Dashboard Formspree pour voir les soumissions
- Emails automatiques à `contact.academy@cma-education.com`
- Statistiques d'utilisation disponibles