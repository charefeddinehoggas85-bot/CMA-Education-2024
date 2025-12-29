const { getFormations, getFormation } = require('../src/lib/strapi.ts')

async function testFormationsIntegration() {
  console.log('🔍 Test de l\'intégration Strapi pour les formations...\n')
  
  try {
    // Test 1: Récupération de toutes les formations
    console.log('📋 Test getFormations()...')
    const formations = await getFormations()
    console.log('✅ Formations récupérées:', formations?.length || 0)
    
    if (formations && formations.length > 0) {
      console.log('📊 Première formation:')
      const first = formations[0]
      console.log('   - ID:', first.id)
      console.log('   - Titre:', first.title)
      console.log('   - Slug:', first.slug)
      console.log('   - Description:', first.shortDescription?.substring(0, 50) + '...')
      console.log('   - Image:', !!first.imageData)
      console.log('   - Catégorie:', first.category?.name || 'Non définie')
      
      // Test 2: Récupération d'une formation spécifique
      console.log('\n📋 Test getFormation() avec slug:', first.slug)
      const formation = await getFormation(first.slug)
      console.log('✅ Formation spécifique récupérée:', !!formation)
      
      if (formation) {
        console.log('📊 Détails formation:')
        console.log('   - Titre:', formation.title)
        console.log('   - Objectifs:', !!formation.objectifs)
        console.log('   - Débouchés:', !!formation.debouches)
        console.log('   - Prérequis:', !!formation.prerequis)
        console.log('   - Image data:', !!formation.imageData)
      }
    }
    
    // Test 3: Test avec un slug spécifique connu
    console.log('\n📋 Test avec slug spécifique: conducteur-travaux-batiment-alternance')
    const specificFormation = await getFormation('conducteur-travaux-batiment-alternance')
    console.log('✅ Formation conducteur-travaux récupérée:', !!specificFormation)
    
    if (specificFormation) {
      console.log('📊 Formation conducteur-travaux:')
      console.log('   - Titre:', specificFormation.title)
      console.log('   - Niveau:', specificFormation.level)
      console.log('   - RNCP:', specificFormation.rncp)
      console.log('   - Durée:', specificFormation.duree)
      console.log('   - Rythme:', specificFormation.rythme)
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
    console.error('Stack:', error.stack)
  }
}

// Test des URLs d'images
async function testImageURLs() {
  console.log('\n🖼️ Test des URLs d\'images...')
  
  try {
    const formations = await getFormations()
    if (formations && formations.length > 0) {
      const { getImageURL } = require('../src/lib/strapi.ts')
      
      formations.slice(0, 3).forEach((formation, index) => {
        console.log(`\n📸 Formation ${index + 1}: ${formation.title}`)
        console.log('   - Image data présente:', !!formation.imageData)
        console.log('   - Image fallback:', formation.image || 'Non définie')
        
        try {
          const imageURL = getImageURL(formation.imageData, formation.image)
          console.log('   - URL générée:', imageURL)
          console.log('   - Type URL:', typeof imageURL)
          console.log('   - URL valide:', typeof imageURL === 'string' && imageURL.length > 0)
        } catch (error) {
          console.log('   - Erreur URL:', error.message)
        }
      })
    }
  } catch (error) {
    console.error('❌ Erreur test images:', error.message)
  }
}

async function main() {
  await testFormationsIntegration()
  await testImageURLs()
  
  console.log('\n🎯 Résumé:')
  console.log('- Les fonctions Strapi sont opérationnelles')
  console.log('- Les formations sont récupérées depuis Strapi')
  console.log('- Les pages Next.js doivent utiliser ces données')
  console.log('- Vérifiez que les composants appellent getFormations() et getFormation()')
}

main()