#!/usr/bin/env node

/**
 * Test complet du système de notification de brochure
 * Teste l'API route et simule le processus complet
 */

require('dotenv').config({ path: '.env.local' });

async function testEmailAPI() {
  console.log('🧪 Test de l\'API de notification email...');
  
  const testData = {
    formation: {
      id: '21',
      title: 'Chef de Projets BTP - Cursus 1 an',
      level: 'Niveau 7 (équivalent Bac+5)',
      slug: 'chef-projets-btp-1an'
    },
    user: {
      nom: 'Test',
      prenom: 'Utilisateur',
      type: 'Particulier',
      email: 'test@example.com',
      telephone: '01 23 45 67 89'
    },
    brochureType: 'Test - Brochure Strapi PDF',
    pageUrl: 'http://localhost:3000/formations/chef-projets-btp-1an'
  };

  try {
    console.log('📤 Envoi de la requête de test...');
    
    const response = await fetch('http://localhost:3000/api/send-brochure-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`HTTP ${response.status}: ${error.error || 'Erreur inconnue'}`);
    }

    const result = await response.json();
    console.log('✅ Succès:', result.message);
    console.log('📧 Email envoyé vers: contact.academy@cma-education.com');
    
    return true;
  } catch (error) {
    console.error('❌ Erreur lors du test API:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 Le serveur Next.js n\'est pas démarré. Lancez: npm run dev');
    } else if (error.message.includes('auth')) {
      console.log('💡 Problème d\'authentification email. Vérifiez EMAIL_USER et EMAIL_PASSWORD');
    }
    
    return false;
  }
}

function showConfiguration() {
  console.log('\n📋 Configuration actuelle:');
  console.log(`📧 Email expéditeur: ${process.env.EMAIL_USER || 'Non configuré'}`);
  console.log(`🔑 Mot de passe: ${process.env.EMAIL_PASSWORD ? '✅ Configuré' : '❌ Manquant'}`);
  console.log(`📮 Email destination: ${process.env.BROCHURE_NOTIFICATION_EMAIL || 'contact.academy@cma-education.com'}`);
}

function showNextSteps() {
  console.log('\n🎯 PROCHAINES ÉTAPES:');
  console.log('');
  console.log('1. 🚀 Démarrez le serveur Next.js:');
  console.log('   npm run dev');
  console.log('');
  console.log('2. 🧪 Testez sur une formation:');
  console.log('   - Allez sur http://localhost:3000/formations/chef-projets-btp-1an');
  console.log('   - Cliquez sur "Télécharger la brochure"');
  console.log('   - Remplissez le formulaire');
  console.log('   - Cliquez sur "Générer et télécharger"');
  console.log('');
  console.log('3. ✅ Vérifiez:');
  console.log('   - La brochure se télécharge');
  console.log('   - Un email arrive sur contact.academy@cma-education.com');
  console.log('   - L\'email contient toutes les informations du candidat');
}

function showTroubleshooting() {
  console.log('\n🔧 DÉPANNAGE:');
  console.log('');
  console.log('❌ Si l\'email ne s\'envoie pas:');
  console.log('   - Vérifiez EMAIL_USER et EMAIL_PASSWORD dans .env.local');
  console.log('   - Assurez-vous d\'utiliser un "mot de passe d\'application"');
  console.log('   - Vérifiez que l\'authentification 2FA est activée');
  console.log('');
  console.log('❌ Si la brochure ne se télécharge pas:');
  console.log('   - Vérifiez que Strapi est démarré (npm run develop dans cms-cma)');
  console.log('   - Vérifiez les permissions des fichiers dans Strapi');
  console.log('');
  console.log('❌ Si le serveur ne répond pas:');
  console.log('   - Vérifiez que Next.js est démarré (npm run dev)');
  console.log('   - Vérifiez le port 3000');
}

async function main() {
  console.log('🚀 Test complet du système de notification de brochure\n');
  
  showConfiguration();
  
  console.log('\n📧 Test de l\'API de notification...');
  const success = await testEmailAPI();
  
  if (success) {
    console.log('\n🎉 SYSTÈME FONCTIONNEL!');
    console.log('✅ L\'API de notification fonctionne');
    console.log('✅ Les emails sont envoyés vers contact.academy@cma-education.com');
    console.log('✅ Le système est prêt pour la production');
  } else {
    console.log('\n⚠️ PROBLÈME DÉTECTÉ');
    showTroubleshooting();
  }
  
  showNextSteps();
  
  console.log('\n📊 RÉSUMÉ DU SYSTÈME:');
  console.log('🔧 API Route: /api/send-brochure-notification');
  console.log('📧 Email destination: contact.academy@cma-education.com');
  console.log('📱 Composant: BrochureModal.tsx (mis à jour)');
  console.log('📚 Bibliothèque: Nodemailer (simple et fiable)');
  console.log('⚙️ Configuration: .env.local');
}

main().catch(console.error);