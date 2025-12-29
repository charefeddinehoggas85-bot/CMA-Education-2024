#!/usr/bin/env node

/**
 * Script de configuration EmailJS pour l'envoi des informations de téléchargement de brochure
 * vers contact.academy@cma-education.com
 */

console.log('📧 Configuration EmailJS pour les téléchargements de brochure...');

const emailjsConfig = {
  // Configuration EmailJS
  serviceId: 'service_cma2026',
  templateId: 'template_brochure_download',
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // À remplacer par votre clé publique EmailJS
  
  // Email de destination
  destinationEmail: 'contact.academy@cma-education.com',
  
  // Template de l'email
  emailTemplate: {
    subject: 'Nouvelle demande de brochure - {{formation_title}}',
    body: `
Nouvelle demande de téléchargement de brochure

📋 INFORMATIONS DE LA FORMATION
Formation: {{formation_title}}
Niveau: {{formation_level}}
Slug: {{formation_slug}}

👤 INFORMATIONS DU CANDIDAT
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

---
Cette demande a été générée automatiquement par le site Construction Management Academy.
    `
  }
};

console.log('✅ Configuration EmailJS générée:');
console.log(`📧 Email de destination: ${emailjsConfig.destinationEmail}`);
console.log(`🔑 Service ID: ${emailjsConfig.serviceId}`);
console.log(`📄 Template ID: ${emailjsConfig.templateId}`);

console.log('\n📋 ÉTAPES DE CONFIGURATION EMAILJS:');
console.log('1. Connectez-vous à https://www.emailjs.com/');
console.log('2. Créez un service email (Gmail, Outlook, etc.)');
console.log('3. Créez un template avec les variables suivantes:');

const templateVariables = [
  'formation_title',
  'formation_level', 
  'formation_slug',
  'user_nom',
  'user_prenom',
  'user_type',
  'user_email',
  'user_telephone',
  'date',
  'time',
  'brochure_type',
  'page_url'
];

templateVariables.forEach(variable => {
  console.log(`   • {{${variable}}}`);
});

console.log('\n4. Configurez l\'email de destination dans le template EmailJS');
console.log(`   📧 TO: ${emailjsConfig.destinationEmail}`);

console.log('\n5. Mettez à jour le fichier .env.local avec vos clés:');
console.log('   NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id');
console.log('   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_brochure_download');
console.log('   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key');

module.exports = emailjsConfig;