const { exec } = require('child_process');
const os = require('os');

function openFooterTest() {
  console.log('🌐 Ouverture de la page pour tester le footer...');
  
  const url = 'http://localhost:3001';
  let command;
  
  // Déterminer la commande selon l'OS
  switch (os.platform()) {
    case 'win32':
      command = `start ${url}`;
      break;
    case 'darwin':
      command = `open ${url}`;
      break;
    case 'linux':
      command = `xdg-open ${url}`;
      break;
    default:
      console.log('❌ OS non supporté pour l\'ouverture automatique');
      console.log(`📱 Ouvrez manuellement: ${url}`);
      return;
  }
  
  exec(command, (error) => {
    if (error) {
      console.error('❌ Erreur lors de l\'ouverture:', error.message);
      console.log(`📱 Ouvrez manuellement: ${url}`);
    } else {
      console.log('✅ Page ouverte dans le navigateur');
      console.log('📋 Instructions de test:');
      console.log('  1. Scrollez vers le bas jusqu\'au footer');
      console.log('  2. Vérifiez la présence des icônes Facebook et TikTok');
      console.log('  3. Cliquez sur l\'icône Facebook - doit ouvrir: https://www.facebook.com/Constructionmanagementacademy');
      console.log('  4. Cliquez sur l\'icône TikTok - doit ouvrir: https://www.tiktok.com/@cmaeducation');
      console.log('  5. Vérifiez que l\'icône TikTok utilise le nouveau SVG (pas l\'icône Music)');
    }
  });
}

// Fonction pour afficher les informations de test
function displayTestInfo() {
  console.log('📋 Informations de test du footer:');
  console.log('');
  console.log('🔗 Nouveaux liens sociaux ajoutés:');
  console.log('  📘 Facebook: https://www.facebook.com/Constructionmanagementacademy');
  console.log('  🎵 TikTok: https://www.tiktok.com/@cmaeducation');
  console.log('');
  console.log('🎨 Modifications apportées:');
  console.log('  ✅ Mise à jour du lien Facebook dans les données de fallback');
  console.log('  ✅ Mise à jour du lien TikTok dans les données de fallback');
  console.log('  ✅ Remplacement de l\'icône Music par un SVG TikTok personnalisé');
  console.log('  ✅ Suppression de l\'import Music non utilisé');
  console.log('');
  console.log('🧪 Tests à effectuer:');
  console.log('  1. Vérifier que les icônes sont visibles dans le footer');
  console.log('  2. Tester les clics sur les icônes (ouverture dans nouvel onglet)');
  console.log('  3. Vérifier que les URLs sont correctes');
  console.log('  4. Confirmer que l\'icône TikTok a le bon design');
  console.log('');
}

// Exécution
if (require.main === module) {
  displayTestInfo();
  
  console.log('🚀 Lancement du test du footer...\n');
  
  // Attendre un peu avant d'ouvrir le navigateur
  setTimeout(() => {
    openFooterTest();
  }, 1000);
}

module.exports = { openFooterTest, displayTestInfo };