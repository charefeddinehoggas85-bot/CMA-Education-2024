const FRONTEND_URL = 'http://localhost:3000'

async function testHomepageRNCP() {
  try {
    console.log('🔍 Test de l\'affichage des RNCP sur la homepage...')
    
    const response = await fetch(FRONTEND_URL)
    const html = await response.text()
    
    if (response.ok) {
      console.log('✅ Homepage accessible')
      
      // Chercher les codes RNCP dans le HTML
      const rncpMatches = html.match(/RNCP\d+/g) || []
      const uniqueRNCPs = [...new Set(rncpMatches)]
      
      console.log(`📊 Codes RNCP trouvés: ${uniqueRNCPs.length}`)
      if (uniqueRNCPs.length > 0) {
        console.log('📝 Codes RNCP détectés:')
        uniqueRNCPs.forEach(rncp => {
          console.log(`  - ${rncp}`)
        })
      }
      
      // Vérifier la présence de la galerie de formations
      const hasFormationsGallery = html.includes('FormationsGallery') || html.includes('formations par catégorie')
      console.log(`📂 Galerie de formations: ${hasFormationsGallery ? '✅ Présente' : '❌ Absente'}`)
      
      // Vérifier la présence du carousel
      const hasCarousel = html.includes('carousel') || html.includes('formations')
      console.log(`🎠 Carousel: ${hasCarousel ? '✅ Présent' : '❌ Absent'}`)
      
      if (uniqueRNCPs.length > 0) {
        console.log('\n✅ SUCCÈS: Les codes RNCP sont affichés sur la homepage!')
      } else {
        console.log('\n⚠️  ATTENTION: Aucun code RNCP détecté dans le HTML')
        console.log('   Cela peut être normal si les données sont chargées côté client')
      }
      
    } else {
      console.log(`❌ Erreur HTTP: ${response.status}`)
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testHomepageRNCP()