# Template EmailJS pour les demandes de brochure

## Configuration EmailJS

### 1. Créer un nouveau template dans EmailJS

Allez sur https://dashboard.emailjs.com/admin/templates et créez un nouveau template avec ces paramètres :

**Template Name:** Demande de brochure CMA

**To Email:** contact.academy@cma-education.com

### 2. Contenu du template

**Subject:**
```
Nouvelle demande de brochure - {{formation_title}}
```

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #2962ff 0%, #1e3a8a 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle demande de brochure</h1>
  </div>
  
  <div style="padding: 30px; background: #f8fafc;">
    <h2 style="color: #1e3a8a; margin-bottom: 20px;">Informations du demandeur</h2>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <p><strong>Nom:</strong> {{user_nom}}</p>
      <p><strong>Prénom:</strong> {{user_prenom}}</p>
      <p><strong>Profil:</strong> {{user_type}}</p>
      <p><strong>Email:</strong> {{user_email}}</p>
      <p><strong>Téléphone:</strong> {{user_telephone}}</p>
    </div>
    
    <h3 style="color: #1e3a8a; margin-bottom: 15px;">Formation demandée</h3>
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <p><strong>Formation:</strong> {{formation_title}}</p>
      <p><strong>ID Formation:</strong> {{formation_id}}</p>
      <p><strong>Date de demande:</strong> {{date}}</p>
    </div>
    
    <div style="margin-top: 30px; padding: 20px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
      <p style="margin: 0; color: #065f46;">
        <strong>🌱 Action éco-responsable:</strong> Cette brochure a été générée numériquement. 
        Le demandeur a été sensibilisé à la préservation de l'environnement en évitant l'impression.
      </p>
    </div>
  </div>
  
  <div style="background: #1e3a8a; padding: 20px; text-align: center;">
    <p style="color: white; margin: 0; font-size: 14px;">
      CMA Education - Construction Management Academy<br>
      contact.academy@cma-education.com | 01 85 09 71 06
    </p>
  </div>
</div>
```

### 3. Variables du template

Les variables suivantes seront automatiquement remplies :
- `{{formation_title}}` - Titre de la formation
- `{{formation_id}}` - ID de la formation
- `{{user_nom}}` - Nom du demandeur
- `{{user_prenom}}` - Prénom du demandeur
- `{{user_type}}` - Type de profil (étudiant/entreprise/etc.)
- `{{user_email}}` - Email du demandeur
- `{{user_telephone}}` - Téléphone du demandeur
- `{{date}}` - Date de la demande

### 4. Configuration dans .env.local

Ajoutez la variable suivante dans votre fichier `.env.local` :
```
NEXT_PUBLIC_EMAILJS_BROCHURE_TEMPLATE_ID=template_xxxxxxx
```

Remplacez `template_xxxxxxx` par l'ID du template que vous avez créé dans EmailJS.
