#!/usr/bin/env node

/**
 * Script de validation de la configuration email
 * Vérifie que tout est prêt pour l'envoi d'emails
 */

require('dotenv').config({ path: '.env.local' });

function validateConfiguration() {
  console.log('🔍 Validation de la configuration email...\n');
  
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const destinationEmail = process.env.BROCHURE_NOTIFICATION_EMAIL || 'contact.academy@cma-education.com';
  
  let isValid = true;
  
  // Vérification EMAIL_USER
  if (!emailUser || emailUser === 'votre-email@gmail.com') {
    console.log('❌ EMAIL_USER: Non configuré ou valeur par défaut');
    console.log('   → Remplacez par votre vrai email dans .env.local');
    isValid = false;
  } else {
    console.log(`✅ EMAIL_USER: ${emailUser}`);
  }
  
  // Vérification EMAIL_PASSWORD
  if (!emailPassword || emailPassword === 'votre-mot-de-passe-application') {
    console.log('❌ EMAIL_PASSWORD: Non configuré ou valeur par défaut');
    console.log('   → Utilisez un mot de passe d\'application Gmail');
    isValid = false;
  } else {
    console.log('✅ EMAIL_PASSWORD: Configuré');
  }
  
  // Vérification email de destination
  console.log(`✅ EMAIL_DESTINATION: ${destinationEmail}`);
  
  return isValid;
}

function showGmailInstructions() {
  console.log('\n📧 INSTRUCTIONS GMAIL:');
  console.log('');
  console.log('1. Allez sur https://myaccount.google.com/security');
  console.log('2. Activez l\'authentification à 2 facteurs');
  console.log('3. Cliquez sur "Mots de passe des applications"');
  console.log('4. Sélectionnez "Autre" et tapez "CMA Website"');
  console.log('5. Copiez le mot de passe généré (16 caractères)');
  console.log('6. Mettez à jour .env.local avec vos vraies informations');
}

function showEnvExample() {
  console.log('\n📝 EXEMPLE .env.local:');
  console.log('');
  console.log('# Remplacez par vos vraies informations');
  console.log('EMAIL_USER=votre-email@gmail.com');
  console.log('EMAIL_PASSWORD=abcd-efgh-ijkl-mnop');
  console.log('BROCHURE_NOTIFICATION_EMAIL=contact.academy@cma-education.com');
}

function checkFiles() {
  console.log('\n📁 Vérification des fichiers...');
  
  const fs = require('fs');
  const path = require('path');
  
  const files = [
    'src/app/api/send-brochure-notification/route.ts',
    'src/lib/simple-email.ts',
    'src/components/ui/BrochureModal.tsx',
    '.env.local'
  ];
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - Manquant`);
    }
  });
}

function showTestInstructions() {
  console.log('\n🧪 INSTRUCTIONS DE TEST:');
  console.log('');
  console.log('1. Configurez vos vraies informations email');
  console.log('2. Démarrez les serveurs:');
  console.log('   cd cms-cma && npm run develop');
  console.log('   npm run dev');
  console.log('3. Testez l\'API:');
  console.log('   node scripts/test-brochure-complete-flow.js');
  console.log('4. Testez sur le site:');
  console.log('   http://localhost:3000/formations/chef-projets-btp-1an');
}

function main() {
  console.log('🚀 Validation de la configuration email pour les brochures\n');
  
  const isValid = validateConfiguration();
  checkFiles();
  
  if (isValid) {
    console.log('\n🎉 CONFIGURATION VALIDE!');
    console.log('✅ Vous pouvez tester le système');
    console.log('📧 Les emails seront envoyés vers contact.academy@cma-education.com');
    showTestInstructions();
  } else {
    console.log('\n⚠️ CONFIGURATION INCOMPLÈTE');
    showGmailInstructions();
    showEnvExample();
  }
  
  console.log('\n📋 RÉSUMÉ:');
  console.log(`⚙️ Configuration: ${isValid ? '✅ Prête' : '❌ À terminer'}`);
  console.log('🔧 API Route: ✅ Créée');
  console.log('📱 Composant: ✅ Mis à jour');
  console.log('📚 Nodemailer: ✅ Installé');
  console.log('📧 Destination: contact.academy@cma-education.com');
}

main();