const FRONTEND_URL = 'http://localhost:3000'

async function testHomepageGalleryFinal() {
  try {
    console.log('🔍 Test final de la galerie sur la page d\'accueil...')
    
    const response = await fetch(FRONTEND_URL)
    const html = await response.text()
    
    console.log('\n📋 Recherche d\'éléments de la galerie...')
    
    const galleryElements = {
      'Titre galerie': html.includes('Explorez nos formations par catégorie'),
      'Sous-titre galerie': html.includes('Découvrez nos parcours de formation'),
      'FormationsCarousel': html.includes('FormationsCarousel') || html.includes('carousel'),
      'CTA formations': html.includes('Voir toutes nos formations'),
      'Codes RNCP': /RNCP\d+/.test(html),
      'Catégories': html.includes('Alternance') && html.includes('Reconversion'),
      'Framer Motion': html.includes('motion') || html.includes('animate'),
      'Grid layout': html.includes('grid md:grid-cols-2 lg:grid-cols-3')
    }
    
    console.log('\n🔍 Éléments détectés:')
    Object.entries(galleryElements).forEach(([element, found]) => {
      console.log(`  ${found ? '✅' : '❌'} ${element}`)
    })
    
    // Compter les codes RNCP
    const rncpMatches = html.match(/RNCP\d+/g) || []
    const uniqueRNCPs = [...new Set(rncpMatches)]
    
    console.log(`\n📊 Codes RNCP détectés: ${uniqueRNCPs.length}`)
    if (uniqueRNCPs.length > 0) {
      console.log('📝 Codes RNCP trouvés:')
      uniqueRNCPs.slice(0, 5).forEach(rncp => {
        console.log(`  - ${rncp}`)
      })
    }
    
    // Vérifier la présence de FormationsSection
    const hasFormationsSection = html.includes('Nos Formations') || html.includes('BTP d\'Excellence')
    console.log(`\n📦 FormationsSection: ${hasFormationsSection ? '✅' : '❌'}`)
    
    // Résultat final
    console.log('\n🎯 RÉSULTAT FINAL:')
    
    const galleryWorking = galleryElements['Titre galerie'] && galleryElements['CTA formations']
    const rncpWorking = uniqueRNCPs.length > 0
    
    if (galleryWorking && rncpWorking) {
      console.log('🎉 SUCCÈS COMPLET!')
      console.log('   ✅ La galerie de formations est visible sur la page d\'accueil')
      console.log('   ✅ Les codes RNCP sont affichés')
      console.log('   ✅ L\'intégration Strapi fonctionne')
    } else if (galleryWorking) {
      console.log('✅ GALERIE RESTAURÉE!')
      console.log('   ✅ La galerie est visible')
      console.log(`   ${rncpWorking ? '✅' : '⚠️'} RNCP: ${rncpWorking ? 'Affichés' : 'À vérifier'}`)
    } else {
      console.log('❌ PROBLÈME PERSISTANT')
      console.log('   ❌ La galerie n\'est toujours pas visible')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testHomepageGalleryFinal()