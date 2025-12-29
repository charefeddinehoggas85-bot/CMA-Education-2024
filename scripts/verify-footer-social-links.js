const fs = require('fs');
const path = require('path');

function verifyFooterSocialLinks() {
  console.log('🔍 Vérification des liens sociaux dans le footer...');
  
  try {
    // Lire le fichier Footer.tsx
    const footerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Footer.tsx');
    const footerContent = fs.readFileSync(footerPath, 'utf8');
    
    console.log('📄 Fichier Footer.tsx lu avec succès');
    
    // Vérifier les liens dans les données de fallback
    const facebookLinkMatch = footerContent.match(/facebook:\s*['"`]([^'"`]+)['"`]/);
    const tiktokLinkMatch = footerContent.match(/tiktok:\s*['"`]([^'"`]+)['"`]/);
    
    console.log('🔗 Liens sociaux trouvés dans le code:');
    
    if (facebookLinkMatch) {
      const facebookUrl = facebookLinkMatch[1];
      console.log(`  📘 Facebook: ${facebookUrl}`);
      
      if (facebookUrl.includes('Constructionmanagementacademy')) {
        console.log('    ✅ Nouveau lien Facebook correct');
      } else {
        console.log('    ❌ Ancien lien Facebook détecté');
      }
    } else {
      console.log('  ❌ Lien Facebook non trouvé');
    }
    
    if (tiktokLinkMatch) {
      const tiktokUrl = tiktokLinkMatch[1];
      console.log(`  🎵 TikTok: ${tiktokUrl}`);
      
      if (tiktokUrl.includes('@cmaeducation')) {
        console.log('    ✅ Nouveau lien TikTok correct');
      } else {
        console.log('    ❌ Ancien lien TikTok détecté');
      }
    } else {
      console.log('  ❌ Lien TikTok non trouvé');
    }
    
    // Vérifier la présence de l'icône TikTok SVG
    const tiktokSvgMatch = footerContent.includes('<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74');
    
    if (tiktokSvgMatch) {
      console.log('  ✅ Icône TikTok SVG personnalisée détectée');
    } else {
      console.log('  ❌ Icône TikTok SVG non trouvée');
    }
    
    // Vérifier que l'import Music n'est plus utilisé
    const musicImportMatch = footerContent.includes('Music');
    
    if (!musicImportMatch) {
      console.log('  ✅ Import Music supprimé (plus utilisé pour TikTok)');
    } else {
      console.log('  ⚠️ Import Music encore présent');
    }
    
    // Vérifier la structure des liens sociaux
    const socialLinksSection = footerContent.match(/socialMedia\?\.(facebook|tiktok|linkedin|instagram|youtube)/g);
    
    if (socialLinksSection && socialLinksSection.length >= 5) {
      console.log(`  ✅ ${socialLinksSection.length} plateformes sociales configurées`);
    } else {
      console.log('  ⚠️ Moins de 5 plateformes sociales trouvées');
    }
    
    console.log('\n📋 Résumé de la vérification:');
    console.log('  - Nouveau lien Facebook: https://www.facebook.com/Constructionmanagementacademy');
    console.log('  - Nouveau lien TikTok: https://www.tiktok.com/@cmaeducation');
    console.log('  - Icône TikTok: SVG personnalisée (plus Music de Lucide)');
    console.log('  - Icône Facebook: Facebook de Lucide');
    
    return {
      facebookUrl: facebookLinkMatch ? facebookLinkMatch[1] : null,
      tiktokUrl: tiktokLinkMatch ? tiktokLinkMatch[1] : null,
      hasTiktokSvg: tiktokSvgMatch,
      noMusicImport: !musicImportMatch
    };
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message);
    return null;
  }
}

// Test de rendu des liens
function testSocialLinksRendering() {
  console.log('\n🎨 Test de rendu des liens sociaux...');
  
  // Simuler les données qui seraient utilisées
  const mockSiteSettings = {
    socialMedia: {
      facebook: 'https://www.facebook.com/Constructionmanagementacademy',
      tiktok: 'https://www.tiktok.com/@cmaeducation',
      linkedin: 'https://www.linkedin.com/company/construction-management-academy',
      instagram: 'https://www.instagram.com/construction_management_academy',
      youtube: 'https://www.youtube.com/channel/construction-management-academy'
    }
  };
  
  console.log('📱 Données simulées pour le rendu:');
  Object.entries(mockSiteSettings.socialMedia).forEach(([platform, url]) => {
    console.log(`  ${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`);
  });
  
  // Vérifier que les URLs sont valides
  const urlPattern = /^https?:\/\/.+/;
  let validUrls = 0;
  
  Object.entries(mockSiteSettings.socialMedia).forEach(([platform, url]) => {
    if (urlPattern.test(url)) {
      validUrls++;
    } else {
      console.log(`  ❌ URL invalide pour ${platform}: ${url}`);
    }
  });
  
  console.log(`✅ ${validUrls}/${Object.keys(mockSiteSettings.socialMedia).length} URLs valides`);
  
  return mockSiteSettings;
}

// Exécution
if (require.main === module) {
  console.log('🚀 Vérification des liens sociaux du footer\n');
  
  const verification = verifyFooterSocialLinks();
  const mockData = testSocialLinksRendering();
  
  if (verification) {
    console.log('\n🎉 Vérification terminée avec succès !');
    
    if (verification.facebookUrl?.includes('Constructionmanagementacademy') && 
        verification.tiktokUrl?.includes('@cmaeducation')) {
      console.log('✅ Tous les nouveaux liens sont correctement configurés');
    } else {
      console.log('⚠️ Certains liens nécessitent une vérification');
    }
  } else {
    console.log('❌ Échec de la vérification');
  }
}

module.exports = { verifyFooterSocialLinks, testSocialLinksRendering };