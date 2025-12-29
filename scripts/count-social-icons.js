const fs = require('fs');
const path = require('path');

function countSocialIcons() {
  console.log('🔍 Comptage des icônes sociales dans le footer...');
  
  try {
    // Lire le fichier Footer.tsx
    const footerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Footer.tsx');
    const footerContent = fs.readFileSync(footerPath, 'utf8');
    
    // Chercher toutes les conditions d'affichage des icônes sociales
    const socialIconPatterns = [
      /siteSettings\?\.socialMedia\?\.(facebook)/g,
      /siteSettings\?\.socialMedia\?\.(instagram)/g,
      /siteSettings\?\.socialMedia\?\.(tiktok)/g,
      /siteSettings\?\.socialMedia\?\.(youtube)/g,
      /siteSettings\?\.socialMedia\?\.(linkedin)/g
    ];
    
    console.log('📱 Icônes sociales configurées dans le code:');
    
    let totalIcons = 0;
    const foundPlatforms = [];
    
    socialIconPatterns.forEach(pattern => {
      const matches = footerContent.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const platform = match.split('.').pop();
          if (!foundPlatforms.includes(platform)) {
            foundPlatforms.push(platform);
            totalIcons++;
            console.log(`  ✅ ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
          }
        });
      }
    });
    
    console.log(`\n📊 Total: ${totalIcons} icônes sociales configurées`);
    
    // Vérifier les données de fallback
    const fallbackMatch = footerContent.match(/setSiteSettings\(\{[\s\S]*?socialMedia:\s*\{([\s\S]*?)\}[\s\S]*?\}\)/);
    
    if (fallbackMatch) {
      console.log('\n🔄 Données de fallback trouvées:');
      const socialMediaSection = fallbackMatch[1];
      
      const platforms = ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin'];
      let fallbackCount = 0;
      
      platforms.forEach(platform => {
        const platformRegex = new RegExp(`${platform}:\\s*['"\`]([^'"\`]+)['"\`]`);
        const match = socialMediaSection.match(platformRegex);
        if (match) {
          fallbackCount++;
          console.log(`  ✅ ${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${match[1]}`);
        } else {
          console.log(`  ❌ ${platform.charAt(0).toUpperCase() + platform.slice(1)}: Non configuré`);
        }
      });
      
      console.log(`\n📊 Fallback: ${fallbackCount}/5 plateformes configurées`);
    }
    
    // Analyser pourquoi seulement 3 icônes pourraient être visibles
    console.log('\n🔍 Analyse des problèmes possibles:');
    
    if (totalIcons === 5) {
      console.log('  ✅ Code: 5 icônes configurées correctement');
      console.log('  🤔 Problème possible: Données Strapi non chargées');
      console.log('  💡 Solution: Le footer utilise les données de fallback en cas d\'erreur');
    } else {
      console.log(`  ⚠️ Code: Seulement ${totalIcons} icônes trouvées`);
    }
    
    return {
      totalConfigured: totalIcons,
      platforms: foundPlatforms,
      hasFallback: !!fallbackMatch
    };
    
  } catch (error) {
    console.error('❌ Erreur lors du comptage:', error.message);
    return null;
  }
}

// Test de rendu conditionnel
function analyzeConditionalRendering() {
  console.log('\n🎨 Analyse du rendu conditionnel...');
  
  // Simuler différents scénarios de données
  const scenarios = [
    {
      name: 'Strapi OK - Toutes les données',
      data: {
        socialMedia: {
          facebook: 'https://www.facebook.com/Constructionmanagementacademy',
          instagram: 'https://www.instagram.com/construction_management_academy',
          tiktok: 'https://www.tiktok.com/@cmaeducation',
          youtube: 'https://www.youtube.com/channel/construction-management-academy',
          linkedin: 'https://www.linkedin.com/company/construction-management-academy'
        }
      }
    },
    {
      name: 'Strapi partiel - 3 plateformes seulement',
      data: {
        socialMedia: {
          facebook: 'https://www.facebook.com/Constructionmanagementacademy',
          tiktok: 'https://www.tiktok.com/@cmaeducation',
          linkedin: 'https://www.linkedin.com/company/construction-management-academy'
        }
      }
    },
    {
      name: 'Strapi vide - Fallback utilisé',
      data: null
    }
  ];
  
  scenarios.forEach((scenario, index) => {
    console.log(`\n${index + 1}. ${scenario.name}:`);
    
    if (scenario.data?.socialMedia) {
      const platforms = Object.keys(scenario.data.socialMedia);
      console.log(`   📱 ${platforms.length} icônes affichées: ${platforms.join(', ')}`);
    } else {
      console.log('   📱 5 icônes affichées (données de fallback)');
    }
  });
}

// Suggestions de débogage
function debugSuggestions() {
  console.log('\n🛠️ Suggestions de débogage:');
  console.log('');
  console.log('1. 📊 Vérifier les données Strapi:');
  console.log('   - Ouvrir http://localhost:1337/admin');
  console.log('   - Aller dans Site Settings');
  console.log('   - Vérifier les champs socialMedia');
  console.log('');
  console.log('2. 🔍 Inspecter le navigateur:');
  console.log('   - F12 > Console');
  console.log('   - Chercher les erreurs de chargement');
  console.log('   - Vérifier les données siteSettings');
  console.log('');
  console.log('3. 🧪 Forcer les données de fallback:');
  console.log('   - Modifier temporairement le useEffect');
  console.log('   - Toujours utiliser les données de fallback');
  console.log('');
  console.log('4. 📱 Test visuel:');
  console.log('   - Ouvrir http://localhost:3001');
  console.log('   - Scroller vers le footer');
  console.log('   - Compter les icônes visibles');
}

// Exécution
if (require.main === module) {
  console.log('🚀 Analyse des icônes sociales du footer\n');
  
  const result = countSocialIcons();
  analyzeConditionalRendering();
  debugSuggestions();
  
  if (result) {
    console.log('\n🎯 Résumé:');
    console.log(`  - Icônes configurées: ${result.totalConfigured}`);
    console.log(`  - Plateformes: ${result.platforms.join(', ')}`);
    console.log(`  - Fallback disponible: ${result.hasFallback ? 'Oui' : 'Non'}`);
    
    if (result.totalConfigured < 5) {
      console.log('\n⚠️ Problème détecté: Moins de 5 icônes configurées');
    } else {
      console.log('\n✅ Configuration correcte: 5 icônes trouvées');
      console.log('💡 Si seulement 3 sont visibles, vérifier les données Strapi');
    }
  }
}

module.exports = { countSocialIcons, analyzeConditionalRendering };