const fs = require('fs');
const path = require('path');

function debugFooterLive() {
  console.log('🔍 Diagnostic en direct du footer...');
  
  try {
    // 1. Vérifier le serveur de développement
    console.log('\n1. 📡 Vérification du serveur:');
    console.log('   URL attendue: http://localhost:3001');
    console.log('   (Le serveur Next.js a démarré sur le port 3001)');
    
    // 2. Vérifier le fichier Footer.tsx actuel
    console.log('\n2. 📄 Vérification du fichier Footer.tsx:');
    const footerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Footer.tsx');
    const footerContent = fs.readFileSync(footerPath, 'utf8');
    
    // Vérifier si le footer a été modifié
    const hasForceModification = footerContent.includes('🎯 Utilisation forcée des données de fallback pour 5 icônes sociales');
    console.log(`   Footer modifié: ${hasForceModification ? '✅ Oui' : '❌ Non'}`);
    
    // 3. Compter les icônes dans le code
    console.log('\n3. 🔢 Comptage des icônes dans le code:');
    const socialIconChecks = [
      'siteSettings?.socialMedia?.facebook',
      'siteSettings?.socialMedia?.instagram', 
      'siteSettings?.socialMedia?.tiktok',
      'siteSettings?.socialMedia?.youtube',
      'siteSettings?.socialMedia?.linkedin'
    ];
    
    let foundIcons = 0;
    socialIconChecks.forEach(check => {
      if (footerContent.includes(check)) {
        foundIcons++;
        console.log(`   ✅ ${check.split('.').pop()}`);
      } else {
        console.log(`   ❌ ${check.split('.').pop()}`);
      }
    });
    
    console.log(`   Total: ${foundIcons}/5 icônes dans le code`);
    
    // 4. Vérifier les données de fallback
    console.log('\n4. 📋 Vérification des données de fallback:');
    const fallbackPlatforms = ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin'];
    let fallbackCount = 0;
    
    fallbackPlatforms.forEach(platform => {
      const regex = new RegExp(`${platform}:\\s*['"\`]([^'"\`]+)['"\`]`);
      const match = footerContent.match(regex);
      if (match) {
        fallbackCount++;
        console.log(`   ✅ ${platform}: ${match[1].substring(0, 50)}...`);
      } else {
        console.log(`   ❌ ${platform}: Non trouvé`);
      }
    });
    
    console.log(`   Total: ${fallbackCount}/5 plateformes configurées`);
    
    // 5. Diagnostic du problème
    console.log('\n5. 🔍 Diagnostic du problème:');
    
    if (!hasForceModification) {
      console.log('   ⚠️ PROBLÈME: Footer pas encore modifié');
      console.log('   💡 SOLUTION: Exécuter "node scripts/force-fallback-social-icons.js force"');
      return false;
    }
    
    if (foundIcons < 5) {
      console.log('   ⚠️ PROBLÈME: Code incomplet');
      console.log('   💡 SOLUTION: Vérifier le fichier Footer.tsx');
      return false;
    }
    
    if (fallbackCount < 5) {
      console.log('   ⚠️ PROBLÈME: Données de fallback incomplètes');
      console.log('   💡 SOLUTION: Vérifier les données de fallback');
      return false;
    }
    
    console.log('   ✅ Code correct: 5 icônes configurées');
    console.log('   🤔 Problème possible: Cache du navigateur ou erreur de rendu');
    
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error.message);
    return false;
  }
}

// Instructions de débogage spécifiques
function showDebuggingSteps() {
  console.log('\n🛠️ Étapes de débogage:');
  console.log('');
  console.log('1. 🔄 Vider le cache du navigateur:');
  console.log('   - Ctrl+Shift+R (Windows/Linux)');
  console.log('   - Cmd+Shift+R (Mac)');
  console.log('   - Ou F12 > Network > Disable cache');
  console.log('');
  console.log('2. 🔍 Inspecter le footer:');
  console.log('   - F12 > Elements');
  console.log('   - Chercher <footer>');
  console.log('   - Compter les liens <a href="*social*">');
  console.log('');
  console.log('3. 📱 Vérifier la console:');
  console.log('   - F12 > Console');
  console.log('   - Chercher les erreurs JavaScript');
  console.log('   - Vérifier les logs "🎯 Utilisation forcée"');
  console.log('');
  console.log('4. 🌐 Tester différentes pages:');
  console.log('   - http://localhost:3001 (accueil)');
  console.log('   - http://localhost:3001/about');
  console.log('   - http://localhost:3001/contact');
  console.log('');
  console.log('5. 🔧 Forcer le rechargement du composant:');
  console.log('   - Modifier temporairement Footer.tsx');
  console.log('   - Sauvegarder pour déclencher le hot reload');
  console.log('   - Restaurer le fichier');
}

// Test de rendu en temps réel
function simulateRealTimeTest() {
  console.log('\n🎨 Simulation du rendu en temps réel:');
  
  // Lire le footer actuel
  const footerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Footer.tsx');
  const footerContent = fs.readFileSync(footerPath, 'utf8');
  
  // Extraire les données de fallback
  const fallbackMatch = footerContent.match(/setSiteSettings\(\{[\s\S]*?socialMedia:\s*\{([\s\S]*?)\}[\s\S]*?\}\)/);
  
  if (fallbackMatch) {
    console.log('   📱 Données qui DEVRAIENT s\'afficher:');
    
    const socialMediaSection = fallbackMatch[1];
    const platforms = ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin'];
    let visibleCount = 0;
    
    platforms.forEach((platform, index) => {
      const platformRegex = new RegExp(`${platform}:\\s*['"\`]([^'"\`]+)['"\`]`);
      const match = socialMediaSection.match(platformRegex);
      if (match) {
        visibleCount++;
        const icon = ['📘', '📷', '🎵', '📺', '💼'][index];
        console.log(`   ${visibleCount}. ${icon} ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
      }
    });
    
    console.log(`\n   📊 Total attendu: ${visibleCount} icônes`);
    
    if (visibleCount === 5) {
      console.log('   ✅ Configuration correcte pour 5 icônes');
    } else {
      console.log(`   ❌ Problème: Seulement ${visibleCount} icônes configurées`);
    }
  } else {
    console.log('   ❌ Données de fallback non trouvées');
  }
}

// Créer un test HTML simple
function createSimpleTest() {
  console.log('\n🧪 Création d\'un test HTML simple...');
  
  const testHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Footer - 5 Icônes Sociales</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .social-icons { display: flex; gap: 10px; margin: 20px 0; }
        .social-icon { 
            width: 44px; height: 44px; 
            background: #1e40af; 
            border-radius: 12px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            text-decoration: none;
            transition: all 0.3s;
        }
        .social-icon:hover { background: #fbbf24; color: #1e40af; }
        .test-info { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 10px 0; }
    </style>
</head>
<body>
    <h1>🧪 Test Footer - 5 Icônes Sociales</h1>
    
    <div class="test-info">
        <h3>📋 Test de référence</h3>
        <p>Ce test montre comment les 5 icônes sociales DEVRAIENT apparaître:</p>
    </div>
    
    <div class="social-icons">
        <a href="https://www.facebook.com/Constructionmanagementacademy" class="social-icon" title="Facebook">📘</a>
        <a href="https://www.instagram.com/construction_management_academy" class="social-icon" title="Instagram">📷</a>
        <a href="https://www.tiktok.com/@cmaeducation" class="social-icon" title="TikTok">🎵</a>
        <a href="https://www.youtube.com/channel/construction-management-academy" class="social-icon" title="YouTube">📺</a>
        <a href="https://www.linkedin.com/company/construction-management-academy" class="social-icon" title="LinkedIn">💼</a>
    </div>
    
    <div class="test-info">
        <h3>🔍 Instructions de comparaison</h3>
        <ol>
            <li>Ouvrez <a href="http://localhost:3001" target="_blank">http://localhost:3001</a></li>
            <li>Scrollez vers le footer</li>
            <li>Comparez avec les 5 icônes ci-dessus</li>
            <li>Si vous voyez moins de 5 icônes, il y a un problème</li>
        </ol>
    </div>
    
    <div class="test-info">
        <h3>🎯 Nouveaux liens (mis à jour)</h3>
        <ul>
            <li><strong>Facebook:</strong> /Constructionmanagementacademy ✅</li>
            <li><strong>TikTok:</strong> /@cmaeducation ✅</li>
        </ul>
    </div>
    
    <script>
        console.log('🧪 Test Footer - 5 Icônes Sociales');
        console.log('📊 Icônes de référence: 5');
        console.log('🔗 Liens mis à jour: Facebook + TikTok');
        
        // Compter les icônes
        const icons = document.querySelectorAll('.social-icon');
        console.log(\`📱 Icônes affichées dans ce test: \${icons.length}\`);
    </script>
</body>
</html>`;

  const testPath = path.join(__dirname, '..', 'test-footer-5-icons.html');
  fs.writeFileSync(testPath, testHtml, 'utf8');
  
  console.log('   ✅ Fichier créé: test-footer-5-icons.html');
  console.log('   🌐 Ouvrez ce fichier dans votre navigateur pour voir la référence');
  
  return testPath;
}

// Exécution
if (require.main === module) {
  console.log('🚀 Diagnostic en direct du footer\n');
  
  const isCorrect = debugFooterLive();
  simulateRealTimeTest();
  showDebuggingSteps();
  const testFile = createSimpleTest();
  
  console.log('\n🎯 Résumé du diagnostic:');
  console.log(`  - Configuration: ${isCorrect ? '✅ Correcte' : '❌ Problème détecté'}`);
  console.log('  - Test de référence: ✅ Créé');
  console.log('  - Instructions: ✅ Fournies');
  
  if (!isCorrect) {
    console.log('\n⚠️ ACTION REQUISE:');
    console.log('1. Exécuter: node scripts/force-fallback-social-icons.js force');
    console.log('2. Vider le cache du navigateur');
    console.log('3. Recharger la page');
  } else {
    console.log('\n🔍 VÉRIFICATION MANUELLE:');
    console.log('1. Ouvrir http://localhost:3001');
    console.log('2. Scroller vers le footer');
    console.log('3. Compter les icônes sociales');
    console.log('4. Comparer avec test-footer-5-icons.html');
  }
}

module.exports = { debugFooterLive, simulateRealTimeTest };