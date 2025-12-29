const FRONTEND_URL = 'http://localhost:3000'

async function testSimpleSection() {
  try {
    console.log('🔍 Test de FormationsSectionSimple...')
    
    const response = await fetch(FRONTEND_URL)
    const html = await response.text()
    
    console.log('\n📋 Recherche d\'éléments de FormationsSectionSimple...')
    
    const simpleElements = {
      'Titre section simple': html.includes('FORMATIONS SECTION SIMPLE'),
      'Bordure jaune': html.includes('border-yellow-500'),
      'Background jaune': html.includes('bg-yellow-50'),
      'Message test': html.includes('Test de FormationsSection sans complexité'),
      'Message final': html.includes('Si vous voyez cette section'),
      'Galerie chargement': html.includes('CHARGEMENT GALERIE FORMATIONS'),
      'Galerie chargée': html.includes('GALERIE FORMATIONS CHARGÉE')
    }
    
    console.log('\n🔍 Éléments détectés:')
    Object.entries(simpleElements).forEach(([element, found]) => {
      console.log(`  ${found ? '✅' : '❌'} ${element}`)
    })
    
    const hasAnySimpleElement = Object.values(simpleElements).some(found => found)
    
    console.log('\n🎯 RÉSULTAT:')
    if (hasAnySimpleElement) {
      console.log('✅ FormationsSectionSimple est détectée!')
      if (simpleElements['Galerie chargée']) {
        console.log('   → La galerie fonctionne parfaitement')
      } else if (simpleElements['Galerie chargement']) {
        console.log('   → La galerie est en cours de chargement')
      } else {
        console.log('   → La section simple fonctionne mais pas la galerie')
      }
    } else {
      console.log('❌ FormationsSectionSimple n\'est PAS détectée')
      console.log('   → Le problème est dans LazyFormationsSection ou plus haut')
      
      // Vérifier si le lazy loading fonctionne
      const hasLazyLoading = html.includes('animate-pulse') && html.includes('bg-gray-200')
      console.log(`   → Lazy loading détecté: ${hasLazyLoading ? '✅' : '❌'}`)
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testSimpleSection()