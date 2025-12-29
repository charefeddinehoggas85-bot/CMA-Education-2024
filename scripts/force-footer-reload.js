const fs = require('fs');
const path = require('path');

function forceFooterReload() {
  console.log('🔄 Forçage du rechargement du footer...');
  
  try {
    const footerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Footer.tsx');
    let footerContent = fs.readFileSync(footerPath, 'utf8');
    
    // Ajouter un commentaire temporaire pour déclencher le hot reload
    const timestamp = new Date().toISOString();
    const tempComment = `// 🔄 Rechargement forcé: ${timestamp}`;
    
    // Ajouter le commentaire au début du fichier
    if (!footerContent.includes('// 🔄 Rechargement forcé:')) {
      footerContent = `${tempComment}\n${footerContent}`;
    } else {
      // Remplacer le commentaire existant
      footerContent = footerContent.replace(
        /\/\/ 🔄 Rechargement forcé:.*\n/,
        `${tempComment}\n`
      );
    }
    
    // Sauvegarder pour déclencher le hot reload
    fs.writeFileSync(footerPath, footerContent, 'utf8');
    console.log('✅ Commentaire temporaire ajouté pour déclencher le hot reload');
    
    // Attendre un peu
    setTimeout(() => {
      // Supprimer le commentaire temporaire
      const cleanContent = footerContent.replace(/\/\/ 🔄 Rechargement forcé:.*\n/, '');
      fs.writeFileSync(footerPath, cleanContent, 'utf8');
      console.log('✅ Commentaire temporaire supprimé');
      console.log('🌐 Le composant Footer devrait maintenant être rechargé');
    }, 2000);
    
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors du rechargement:', error.message);
    return false;
  }
}

// Vérifier l'état du serveur de développement
function checkDevServer() {
  console.log('📡 Vérification du serveur de développement...');
  
  const { exec } = require('child_process');
  
  exec('netstat -an | findstr :3001', (error, stdout, stderr) => {
    if (stdout.includes(':3001')) {
      console.log('✅ Serveur détecté sur le port 3001');
    } else {
      console.log('⚠️ Serveur non détecté sur le port 3001');
      console.log('💡 Vérifiez que "npm run dev" est en cours d\'exécution');
    }
  });
}

// Instructions de test immédiat
function showImmediateTestInstructions() {
  console.log('\n📋 Instructions de test immédiat:');
  console.log('');
  console.log('1. 🌐 Ouvrir/Actualiser la page:');
  console.log('   http://localhost:3001');
  console.log('');
  console.log('2. 🔄 Vider le cache (IMPORTANT):');
  console.log('   - Windows/Linux: Ctrl+Shift+R');
  console.log('   - Mac: Cmd+Shift+R');
  console.log('   - Ou F12 > Network > cocher "Disable cache"');
  console.log('');
  console.log('3. 📜 Scroller vers le footer');
  console.log('');
  console.log('4. 🔢 Compter les icônes sociales:');
  console.log('   - Chercher la section avec les icônes rondes');
  console.log('   - Compter Facebook, Instagram, TikTok, YouTube, LinkedIn');
  console.log('   - ATTENDU: 5 icônes');
  console.log('');
  console.log('5. 🔍 Si toujours 3 icônes:');
  console.log('   - F12 > Console');
  console.log('   - Chercher "🎯 Utilisation forcée des données de fallback"');
  console.log('   - Vérifier les erreurs JavaScript');
  console.log('');
  console.log('6. 🧪 Comparer avec le test de référence:');
  console.log('   - Ouvrir test-footer-5-icons.html');
  console.log('   - Comparer visuellement');
}

// Test de validation en temps réel
function createLiveValidationScript() {
  console.log('\n🧪 Création d\'un script de validation en temps réel...');
  
  const validationScript = `
// 🧪 Script de validation des icônes sociales
// Coller ce code dans la console du navigateur (F12 > Console)

console.log('🧪 Validation des icônes sociales du footer');

// Chercher le footer
const footer = document.querySelector('footer');
if (!footer) {
  console.error('❌ Footer non trouvé');
} else {
  console.log('✅ Footer trouvé');
  
  // Chercher les liens sociaux
  const socialLinks = footer.querySelectorAll('a[href*="facebook"], a[href*="instagram"], a[href*="tiktok"], a[href*="youtube"], a[href*="linkedin"]');
  
  console.log(\`📊 Icônes sociales trouvées: \${socialLinks.length}\`);
  
  if (socialLinks.length === 0) {
    console.error('❌ Aucune icône sociale trouvée');
    console.log('🔍 Vérification alternative...');
    
    // Chercher par classe ou structure
    const socialSection = footer.querySelector('.flex.space-x-3');
    if (socialSection) {
      const allLinks = socialSection.querySelectorAll('a');
      console.log(\`📱 Liens dans la section sociale: \${allLinks.length}\`);
      
      allLinks.forEach((link, index) => {
        console.log(\`  \${index + 1}. \${link.href || 'Pas de href'}\`);
      });
    }
  } else {
    console.log('📱 Détails des icônes:');
    socialLinks.forEach((link, index) => {
      const platform = link.href.includes('facebook') ? 'Facebook' :
                      link.href.includes('instagram') ? 'Instagram' :
                      link.href.includes('tiktok') ? 'TikTok' :
                      link.href.includes('youtube') ? 'YouTube' :
                      link.href.includes('linkedin') ? 'LinkedIn' : 'Inconnu';
      
      console.log(\`  \${index + 1}. \${platform}: \${link.href}\`);
    });
    
    if (socialLinks.length === 5) {
      console.log('🎉 SUCCÈS: 5 icônes sociales trouvées !');
    } else {
      console.warn(\`⚠️ PROBLÈME: Seulement \${socialLinks.length}/5 icônes trouvées\`);
    }
  }
}

// Vérifier les données de l'état React (si disponible)
if (window.React) {
  console.log('⚛️ React détecté, vérification de l\'état...');
}
`;

  const scriptPath = path.join(__dirname, '..', 'validation-footer-console.js');
  fs.writeFileSync(scriptPath, validationScript, 'utf8');
  
  console.log('✅ Script créé: validation-footer-console.js');
  console.log('📋 Instructions:');
  console.log('   1. Ouvrir http://localhost:3001');
  console.log('   2. F12 > Console');
  console.log('   3. Copier-coller le contenu du fichier validation-footer-console.js');
  console.log('   4. Appuyer sur Entrée');
  
  return scriptPath;
}

// Exécution
if (require.main === module) {
  console.log('🚀 Forçage du rechargement du footer\n');
  
  checkDevServer();
  
  setTimeout(() => {
    const reloadSuccess = forceFooterReload();
    
    if (reloadSuccess) {
      console.log('\n✅ Rechargement déclenché');
      
      setTimeout(() => {
        createLiveValidationScript();
        showImmediateTestInstructions();
        
        console.log('\n🎯 ACTIONS IMMÉDIATES:');
        console.log('1. Vider le cache du navigateur (Ctrl+Shift+R)');
        console.log('2. Aller sur http://localhost:3001');
        console.log('3. Scroller vers le footer');
        console.log('4. Compter les icônes sociales');
        console.log('5. Si toujours 3, utiliser le script de validation console');
        
      }, 3000);
    }
  }, 1000);
}

module.exports = { forceFooterReload, checkDevServer };