const FRONTEND_URL = 'http://localhost:3000'

async function testSimpleGallery() {
  try {
    console.log('🔍 Test de FormationsGallerySimple...')
    
    // Attendre le chargement
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const response = await fetch(FRONTEND_URL)
    const html = await response.text()
    
    console.log('\n📋 Recherche d\'éléments de FormationsGallerySimple...')
    
    const simpleGalleryElements = {
      'Titre chargement': html.includes('FormationsGallerySimple - CHARGEMENT'),
      'Titre chargé': html.includes('FormationsGallerySimple - CHARGÉ'),
      'Message succès': html.includes('Galerie chargée avec succès'),
      'Bordure jaune (loading)': html.includes('border-yellow-500'),
      'Bordure verte (loaded)': html.includes('border-green-500'),
      'Background jaune': html.includes('bg-yellow-100'),
      'Background vert': html.includes('bg-green-100')
    }
    
    console.log('\n🔍 Éléments détectés:')
    Object.entries(simpleGalleryElements).forEach(([element, found]) => {
      console.log(`  ${found ? '✅' : '❌'} ${element}`)
    })
    
    const hasAnySimpleElement = Object.values(simpleGalleryElements).some(found => found)
    
    console.log('\n🎯 RÉSULTAT:')
    if (hasAnySimpleElement) {
      console.log('✅ FormationsGallerySimple est détectée!')
      if (simpleGalleryElements['Titre chargé']) {
        console.log('   → La galerie simple fonctionne parfaitement')
      } else if (simpleGalleryElements['Titre chargement']) {
        console.log('   → La galerie simple est bloquée en chargement')
      }
    } else {
      console.log('❌ FormationsGallerySimple n\'est PAS détectée')
      console.log('   → Le problème est dans FormationsSection ou plus haut')
    }
    
    // Vérifier si FormationsSection s'affiche du tout
    console.log('\n🔍 Vérification de FormationsSection...')
    const sectionElements = {
      'Titre section': html.includes('Nos Formations') || html.includes('BTP d\'Excellence'),
      'Stats section': html.includes('formations certifiantes') || html.includes('années d\'expérience'),
      'Catégories section': html.includes('Alternance') || html.includes('Reconversion'),
      'CTA section': html.includes('Découvrir toutes nos formations')
    }
    
    Object.entries(sectionElements).forEach(([element, found]) => {
      console.log(`  ${found ? '✅' : '❌'} ${element}`)
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testSimpleGallery()