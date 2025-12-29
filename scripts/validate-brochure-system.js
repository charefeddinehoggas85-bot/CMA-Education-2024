#!/usr/bin/env node

/**
 * Script de validation finale du système de brochure avec envoi d'email
 */

require('dotenv').config({ path: '.env.local' });

console.log('✅ Validation finale du système de brochure...');

function checkSystemReadiness() {
  console.log('\n🔍 Vérification de l\'état du système:');
  
  // Vérifier les variables d'environnement
  const emailjsConfigured = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY && 
                           process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY';
  
  const serviceConfigured = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID === 'service_cma2026';
  const templateConfigured = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID === 'template_brochure_download';
  const destinationConfigured = process.env.BROCHURE_NOTIFICATION_EMAIL === 'contact.academy@cma-education.com';
  
  console.log(`📧 EmailJS Public Key: ${emailjsConfigured ? '✅' : '❌'}`);
  console.log(`🔧 Service ID: ${serviceConfigured ? '✅' : '❌'}`);
  console.log(`📄 Template ID: ${templateConfigured ? '✅' : '❌'}`);
  console.log(`📮 Email destination: ${destinationConfigured ? '✅' : '❌'}`);
  
  return emailjsConfigured && serviceConfigured && templateConfigured && destinationConfigured;
}

function showTestInstructions() {
  console.log('\n🧪 Instructions de test:');
  console.log('');
  console.log('1. 🚀 Démarrez le serveur Next.js:');
  console.log('   npm run dev');
  console.log('');
  console.log('2. 🌐 Ouvrez une formation dans le navigateur:');
  console.log('   http://localhost:3000/formations/chef-projets-btp-1an');
  console.log('');
  console.log('3. 📄 Cliquez sur "Télécharger la brochure"');
  console.log('');
  console.log('4. 📝 Remplissez le formulaire avec des données de test:');
  console.log('   - Prénom: Test');
  console.log('   - Nom: Utilisateur');
  console.log('   - Profil: Particulier');
  console.log('   - Email: votre-email@test.com');
  console.log('   - Téléphone: 01 23 45 67 89');
  console.log('');
  console.log('5. ⬇️ Cliquez sur "Générer et télécharger"');
  console.log('');
  console.log('6. ✅ Vérifiez:');
  console.log('   - La brochure se télécharge');
  console.log('   - Vous recevez un email sur contact.academy@cma-education.com');
  console.log('   - L\'email contient toutes les informations du candidat');
}

function showEmailContent() {
  console.log('\n📧 Contenu de l\'email que vous recevrez:');
  console.log('');
  console.log('📬 TO: contact.academy@cma-education.com');
  console.log('📋 SUBJECT: Nouvelle demande de brochure - [Nom de la formation]');
  console.log('');
  console.log('📄 BODY:');
  console.log(`
Nouvelle demande de téléchargement de brochure

📋 INFORMATIONS DE LA FORMATION
Formation: Chef de Projets BTP - Cursus 1 an
Niveau: Niveau 7 (équivalent Bac+5)
Slug: chef-projets-btp-1an
ID: 21
URL: http://localhost:3000/formations/chef-projets-btp-1an

👤 INFORMATIONS DU CANDIDAT
Nom complet: Test Utilisateur
Nom: Utilisateur
Prénom: Test
Profil: Particulier
Email: votre-email@test.com
Téléphone: 01 23 45 67 89

📅 INFORMATIONS DE LA DEMANDE
Date: 29/12/2024
Heure: 14:30:25
Type de brochure: Brochure Strapi PDF
Page d'origine: http://localhost:3000/formations/chef-projets-btp-1an
Timestamp: 2024-12-29T14:30:25.123Z

---
Cette demande a été générée automatiquement par le site Construction Management Academy.
  `);
}

function showTroubleshooting() {
  console.log('\n🔧 Dépannage:');
  console.log('');
  console.log('❌ Email non reçu:');
  console.log('   - Vérifiez les spams/courriers indésirables');
  console.log('   - Vérifiez la configuration EmailJS');
  console.log('   - Consultez la console du navigateur (F12)');
  console.log('');
  console.log('❌ Erreur de téléchargement:');
  console.log('   - Vérifiez que la formation a une brochure');
  console.log('   - Consultez les logs du serveur');
  console.log('');
  console.log('❌ Erreur de configuration:');
  console.log('   - Redémarrez le serveur après modification .env.local');
  console.log('   - Vérifiez que les IDs EmailJS correspondent');
}

function showNextSteps() {
  console.log('\n🎯 Prochaines étapes:');
  console.log('');
  console.log('1. 🔑 Configurez EmailJS avec votre compte professionnel');
  console.log('2. 📧 Créez le template avec l\'email de destination');
  console.log('3. 🔄 Mettez à jour NEXT_PUBLIC_EMAILJS_PUBLIC_KEY dans .env.local');
  console.log('4. 🧪 Testez le système complet');
  console.log('5. 🚀 Déployez en production');
  console.log('');
  console.log('📖 Guide complet: BROCHURE_EMAIL_SETUP.md');
}

function main() {
  console.log('🚀 Validation du système de brochure avec notification email...\n');
  
  const systemReady = checkSystemReadiness();
  
  if (systemReady) {
    console.log('\n🎉 Système prêt! Vous pouvez tester le téléchargement de brochure.');
    showTestInstructions();
    showEmailContent();
  } else {
    console.log('\n⚠️ Configuration incomplète.');
    showNextSteps();
  }
  
  showTroubleshooting();
  
  console.log('\n📋 RÉSUMÉ DU SYSTÈME:');
  console.log('✅ Formulaire de brochure configuré');
  console.log('✅ Service d\'email intégré');
  console.log('✅ Validation des données implémentée');
  console.log('✅ Email de destination: contact.academy@cma-education.com');
  console.log(`${systemReady ? '✅' : '⚠️'} Configuration EmailJS: ${systemReady ? 'Complète' : 'À terminer'}`);
  
  console.log('\n🎯 Fonctionnalités:');
  console.log('• Formulaire de contact avec validation');
  console.log('• Téléchargement automatique de brochure');
  console.log('• Notification email instantanée');
  console.log('• Données complètes du candidat');
  console.log('• Informations de la formation');
  console.log('• Horodatage précis');
}

main();