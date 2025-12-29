
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
  
  console.log(`📊 Icônes sociales trouvées: ${socialLinks.length}`);
  
  if (socialLinks.length === 0) {
    console.error('❌ Aucune icône sociale trouvée');
    console.log('🔍 Vérification alternative...');
    
    // Chercher par classe ou structure
    const socialSection = footer.querySelector('.flex.space-x-3');
    if (socialSection) {
      const allLinks = socialSection.querySelectorAll('a');
      console.log(`📱 Liens dans la section sociale: ${allLinks.length}`);
      
      allLinks.forEach((link, index) => {
        console.log(`  ${index + 1}. ${link.href || 'Pas de href'}`);
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
      
      console.log(`  ${index + 1}. ${platform}: ${link.href}`);
    });
    
    if (socialLinks.length === 5) {
      console.log('🎉 SUCCÈS: 5 icônes sociales trouvées !');
    } else {
      console.warn(`⚠️ PROBLÈME: Seulement ${socialLinks.length}/5 icônes trouvées`);
    }
  }
}

// Vérifier les données de l'état React (si disponible)
if (window.React) {
  console.log('⚛️ React détecté, vérification de l'état...');
}
