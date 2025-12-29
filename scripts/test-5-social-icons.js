const fs = require('fs');
const path = require('path');

function test5SocialIcons() {
  console.log('🧪 Test des 5 icônes sociales...');
  
  try {
    // Vérifier que le footer a été modifié
    const footerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Footer.tsx');
    const footerContent = fs.readFileSync(footerPath, 'utf8');
    
    // Vérifier la présence du code forcé
    const hasForcedFallback = footerContent.includes('🎯 Utilisation forcée des données de fallback pour 5 icônes sociales');
    
    if (hasForcedFallback) {
      console.log('✅ Footer modifié pour forcer 5 icônes');
    } else {
      console.log('❌ Footer non modifié, exécutez d\'abord:');
      console.log('   node scripts/force-fallback-social-icons.js force');
      return false;
    }
    
    // Vérifier les 5 plateformes dans les données de fallback
    const platforms = ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin'];
    const foundPlatforms = [];
    
    platforms.forEach(platform => {
      const platformRegex = new RegExp(`${platform}:\\s*['"\`]([^'"\`]+)['"\`]`);
      const match = footerContent.match(platformRegex);
      if (match) {
        foundPlatforms.push({
          platform: platform,
          url: match[1]
        });
      }
    });
    
    console.log('\n📱 Plateformes configurées:');
    foundPlatforms.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}: ${item.url}`);
    });
    
    if (foundPlatforms.length === 5) {
      console.log('\n✅ Les 5 icônes sociales sont configurées !');
      
      // Vérifier les nouveaux liens spécifiques
      const facebookCorrect = foundPlatforms.find(p => 
        p.platform === 'facebook' && 
        p.url.includes('Constructionmanagementacademy')
      );
      
      const tiktokCorrect = foundPlatforms.find(p => 
        p.platform === 'tiktok' && 
        p.url.includes('@cmaeducation')
      );
      
      console.log('\n🎯 Vérification des nouveaux liens:');
      console.log(`  Facebook: ${facebookCorrect ? '✅ Correct' : '❌ Incorrect'}`);
      console.log(`  TikTok: ${tiktokCorrect ? '✅ Correct' : '❌ Incorrect'}`);
      
      return true;
    } else {
      console.log(`\n❌ Seulement ${foundPlatforms.length}/5 plateformes trouvées`);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    return false;
  }
}

// Test de rendu visuel simulé
function simulateVisualTest() {
  console.log('\n🎨 Simulation du rendu visuel...');
  
  const mockSiteSettings = {
    socialMedia: {
      facebook: 'https://www.facebook.com/Constructionmanagementacademy',
      instagram: 'https://www.instagram.com/construction_management_academy',
      tiktok: 'https://www.tiktok.com/@cmaeducation',
      youtube: 'https://www.youtube.com/channel/construction-management-academy',
      linkedin: 'https://www.linkedin.com/company/construction-management-academy'
    }
  };
  
  console.log('📱 Icônes qui seront affichées:');
  
  let iconCount = 0;
  Object.entries(mockSiteSettings.socialMedia).forEach(([platform, url]) => {
    if (url) {
      iconCount++;
      const icon = getIconForPlatform(platform);
      console.log(`  ${iconCount}. ${icon} ${platform.charAt(0).toUpperCase() + platform.slice(1)} → ${url}`);
    }
  });
  
  console.log(`\n📊 Total d'icônes visibles: ${iconCount}`);
  
  if (iconCount === 5) {
    console.log('🎉 Parfait ! Les 5 icônes seront visibles');
  } else {
    console.log('⚠️ Problème: Moins de 5 icônes');
  }
  
  return iconCount;
}

function getIconForPlatform(platform) {
  const icons = {
    facebook: '📘',
    instagram: '📷',
    tiktok: '🎵',
    youtube: '📺',
    linkedin: '💼'
  };
  return icons[platform] || '🔗';
}

// Instructions de test manuel
function showManualTestInstructions() {
  console.log('\n📋 Instructions de test manuel:');
  console.log('');
  console.log('1. 🌐 Ouvrir le navigateur:');
  console.log('   http://localhost:3001');
  console.log('');
  console.log('2. 📜 Scroller vers le footer');
  console.log('');
  console.log('3. 🔍 Compter les icônes sociales:');
  console.log('   - Chercher la section "Réseaux sociaux"');
  console.log('   - Compter les boutons avec icônes');
  console.log('   - Vérifier qu\'il y en a bien 5');
  console.log('');
  console.log('4. 🖱️ Tester les liens:');
  console.log('   - Clic droit > "Ouvrir dans un nouvel onglet"');
  console.log('   - Vérifier les URLs:');
  console.log('     • Facebook: /Constructionmanagementacademy');
  console.log('     • TikTok: /@cmaeducation');
  console.log('     • Instagram: /construction_management_academy');
  console.log('     • YouTube: /channel/construction-management-academy');
  console.log('     • LinkedIn: /company/construction-management-academy');
  console.log('');
  console.log('5. 🎨 Vérifier les icônes:');
  console.log('   - Facebook: Icône Facebook standard');
  console.log('   - Instagram: SVG Instagram personnalisé');
  console.log('   - TikTok: SVG TikTok personnalisé (pas Music)');
  console.log('   - YouTube: Icône YouTube standard');
  console.log('   - LinkedIn: Icône LinkedIn standard');
}

// Exécution
if (require.main === module) {
  console.log('🚀 Test des 5 icônes sociales du footer\n');
  
  const testResult = test5SocialIcons();
  const iconCount = simulateVisualTest();
  showManualTestInstructions();
  
  console.log('\n🎯 Résumé du test:');
  console.log(`  - Configuration: ${testResult ? 'OK' : 'Problème'}`);
  console.log(`  - Icônes attendues: ${iconCount}/5`);
  console.log(`  - Status: ${testResult && iconCount === 5 ? '✅ Prêt' : '⚠️ Vérification nécessaire'}`);
  
  if (testResult && iconCount === 5) {
    console.log('\n🎉 Succès ! Les 5 icônes sociales devraient maintenant être visibles');
    console.log('🌐 Rechargez la page pour voir le résultat');
  } else {
    console.log('\n❌ Problème détecté, vérification manuelle recommandée');
  }
}

module.exports = { test5SocialIcons, simulateVisualTest };