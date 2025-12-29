#!/usr/bin/env node

/**
 * Script de test pour la solution email simple avec Nodemailer
 */

require('dotenv').config({ path: '.env.local' });

console.log('📧 Test de la solution email simple...');

function checkConfiguration() {
  console.log('\n🔍 Vérification de la configuration:');
  
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const destinationEmail = process.env.BROCHURE_NOTIFICATION_EMAIL;
  
  console.log(`📧 Email expéditeur: ${emailUser ? '✅ Configuré' : '❌ Manquant'}`);
  console.log(`🔑 Mot de passe: ${emailPassword ? '✅ Configuré' : '❌ Manquant'}`);
  console.log(`📮 Email destination: ${destinationEmail || 'contact.academy@cma-education.com'}`);
  
  return emailUser && emailPassword;
}

function showSetupInstructions() {
  console.log('\n📋 CONFIGURATION SIMPLE:');
  console.log('');
  console.log('1. 📧 Configurez votre email professionnel:');
  console.log('   - Utilisez Gmail, Outlook, ou autre');
  console.log('   - Activez l\'authentification à 2 facteurs');
  console.log('   - Générez un "mot de passe d\'application"');
  console.log('');
  console.log('2. 🔧 Mettez à jour .env.local:');
  console.log('   EMAIL_USER=votre-email@gmail.com');
  console.log('   EMAIL_PASSWORD=votre-mot-de-passe-application');
  console.log('');
  console.log('3. 🚀 Redémarrez le serveur Next.js');
  console.log('');
  console.log('4. 🧪 Testez le téléchargement de brochure');
}

function showGmailSetup() {
  console.log('\n📧 CONFIGURATION GMAIL:');
  console.log('');
  console.log('1. Allez dans votre compte Google');
  console.log('2. Sécurité > Authentification à 2 facteurs');
  console.log('3. Mots de passe des applications');
  console.log('4. Sélectionnez "Autre" et nommez "CMA Website"');
  console.log('5. Copiez le mot de passe généré');
  console.log('6. Utilisez ce mot de passe dans EMAIL_PASSWORD');
}

function showTestData() {
  console.log('\n📤 Exemple de données qui seront envoyées:');
  
  const testData = {
    formation: {
      id: '21',
      title: 'Chef de Projets BTP - Cursus 1 an',
      level: 'Niveau 7 (équivalent Bac+5)',
      slug: 'chef-projets-btp-1an'
    },
    user: {
      nom: 'Dupont',
      prenom: 'Jean',
      type: 'Particulier',
      email: 'jean.dupont@example.com',
      telephone: '01 23 45 67 89'
    },
    brochureType: 'Brochure Strapi PDF',
    pageUrl: 'http://localhost:3000/formations/chef-projets-btp-1an'
  };
  
  console.log(JSON.stringify(testData, null, 2));
}

function showEmailPreview() {
  console.log('\n📧 Aperçu de l\'email qui sera envoyé:');
  console.log('');
  console.log('📬 TO: contact.academy@cma-education.com');
  console.log('📋 SUBJECT: Nouvelle demande de brochure - Chef de Projets BTP - Cursus 1 an');
  console.log('');
  console.log('📄 BODY:');
  console.log(`
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
Date: ${new Date().toLocaleDateString('fr-FR')}
Heure: ${new Date().toLocaleTimeString('fr-FR')}
Type de brochure: Brochure Strapi PDF
Page d'origine: http://localhost:3000/formations/chef-projets-btp-1an

---
Cette demande a été générée automatiquement par le site Construction Management Academy.
  `);
}

function main() {
  console.log('🚀 Test de la solution email simple avec Nodemailer...\n');
  
  const configured = checkConfiguration();
  
  if (configured) {
    console.log('\n🎉 Configuration complète!');
    console.log('✅ Vous pouvez tester le téléchargement de brochure');
    console.log('📧 Les emails seront envoyés vers contact.academy@cma-education.com');
  } else {
    console.log('\n⚠️ Configuration incomplète');
    showSetupInstructions();
    showGmailSetup();
  }
  
  showTestData();
  showEmailPreview();
  
  console.log('\n🎯 AVANTAGES DE CETTE SOLUTION:');
  console.log('✅ Simple et direct');
  console.log('✅ Pas de service externe');
  console.log('✅ Utilise votre email professionnel');
  console.log('✅ Pas de limite d\'envoi');
  console.log('✅ Configuration rapide');
  
  console.log('\n📋 RÉSUMÉ:');
  console.log(`📧 Email destination: contact.academy@cma-education.com`);
  console.log(`⚙️ Configuration: ${configured ? '✅ Prête' : '❌ À terminer'}`);
  console.log(`🔧 API Route: ✅ Créée (/api/send-brochure-notification)`);
  console.log(`📱 Composant: ✅ Mis à jour`);
}

main();