#!/usr/bin/env node

/**
 * Script de test pour vérifier la configuration EmailJS des brochures
 */

require('dotenv').config({ path: '.env.local' });

console.log('🧪 Test de la configuration EmailJS pour les brochures...');

function checkEnvironmentVariables() {
  console.log('\n🔍 Vérification des variables d\'environnement:');
  
  const requiredVars = [
    'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
    'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', 
    'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'
  ];
  
  const optionalVars = [
    'BROCHURE_NOTIFICATION_EMAIL'
  ];
  
  let allRequired = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    const status = value && value !== 'YOUR_EMAILJS_PUBLIC_KEY' ? '✅' : '❌';
    console.log(`   ${varName}: ${status} ${value ? '(configuré)' : '(manquant)'}`);
    
    if (!value || value === 'YOUR_EMAILJS_PUBLIC_KEY') {
      allRequired = false;
    }
  });
  
  optionalVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅' : '⚠️';
    console.log(`   ${varName}: ${status} ${value || '(optionnel)'}`);
  });
  
  return allRequired;
}

function generateEmailJSTemplate() {
  console.log('\n📧 Template EmailJS recommandé:');
  console.log('---');
  console.log('Subject: Nouvelle demande de brochure - {{formation_title}}');
  console.log('');
  console.log('Body:');
  console.log(`
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
Email de destination: contact.academy@cma-education.com
  `);
  console.log('---');
}

function showConfigurationSteps() {
  console.log('\n📋 ÉTAPES DE CONFIGURATION:');
  console.log('');
  console.log('1. 🌐 Connectez-vous à https://www.emailjs.com/');
  console.log('');
  console.log('2. 📧 Créez un service email:');
  console.log('   - Choisissez Gmail, Outlook, ou autre');
  console.log('   - Configurez avec votre email professionnel');
  console.log('   - Notez le Service ID');
  console.log('');
  console.log('3. 📄 Créez un template email:');
  console.log('   - Template ID: template_brochure_download');
  console.log('   - TO Email: contact.academy@cma-education.com');
  console.log('   - Utilisez le template ci-dessus');
  console.log('');
  console.log('4. 🔑 Récupérez votre Public Key:');
  console.log('   - Dans Account > API Keys');
  console.log('   - Copiez la Public Key');
  console.log('');
  console.log('5. ⚙️ Mettez à jour .env.local:');
  console.log('   NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id');
  console.log('   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_brochure_download');
  console.log('   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key');
  console.log('');
  console.log('6. 🧪 Testez la configuration:');
  console.log('   - Redémarrez le serveur Next.js');
  console.log('   - Testez le téléchargement d\'une brochure');
  console.log('   - Vérifiez la réception de l\'email');
}

function simulateEmailData() {
  console.log('\n📤 Exemple de données qui seront envoyées:');
  
  const exampleData = {
    to_email: 'contact.academy@cma-education.com',
    formation_title: 'Chef de Projets BTP - Cursus 1 an',
    formation_level: 'Niveau 7 (équivalent Bac+5)',
    formation_slug: 'chef-projets-btp-1an',
    formation_id: '21',
    formation_url: 'http://localhost:3000/formations/chef-projets-btp-1an',
    user_nom: 'Dupont',
    user_prenom: 'Jean',
    user_type: 'Particulier',
    user_email: 'jean.dupont@example.com',
    user_telephone: '01 23 45 67 89',
    user_fullname: 'Jean Dupont',
    date: new Date().toLocaleDateString('fr-FR'),
    time: new Date().toLocaleTimeString('fr-FR'),
    brochure_type: 'Brochure Strapi PDF',
    page_url: 'http://localhost:3000/formations/chef-projets-btp-1an',
    timestamp: new Date().toISOString()
  };
  
  console.log(JSON.stringify(exampleData, null, 2));
}

function main() {
  console.log('🚀 Démarrage du test de configuration EmailJS...\n');
  
  const envConfigured = checkEnvironmentVariables();
  
  generateEmailJSTemplate();
  showConfigurationSteps();
  simulateEmailData();
  
  console.log('\n🎯 RÉSUMÉ:');
  console.log(`📧 Email de destination: contact.academy@cma-education.com`);
  console.log(`⚙️ Variables d'environnement: ${envConfigured ? '✅ Configurées' : '❌ À configurer'}`);
  console.log(`🔧 Service EmailJS: ${envConfigured ? '✅ Prêt' : '❌ À configurer'}`);
  
  if (envConfigured) {
    console.log('\n🎉 Configuration complète! Vous pouvez tester le téléchargement de brochure.');
  } else {
    console.log('\n⚠️ Configuration incomplète. Suivez les étapes ci-dessus pour terminer la configuration.');
  }
}

main();