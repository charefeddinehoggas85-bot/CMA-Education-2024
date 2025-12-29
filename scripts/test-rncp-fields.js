const STRAPI_URL = 'http://localhost:1337'

async function testRNCPFields() {
  try {
    console.log('🔍 Test des champs RNCP dans Strapi...')
    
    // Test formations avec populate=*
    const response = await fetch(`${STRAPI_URL}/api/formations?populate=*`)
    const data = await response.json()
    
    if (data.data && data.data.length > 0) {
      console.log(`📊 ${data.data.length} formations trouvées`)
      
      // Vérifier les 3 premières formations
      data.data.slice(0, 3).forEach((formation, index) => {
        console.log(`\n📋 Formation ${index + 1}:`)
        console.log(`  - ID: ${formation.id}`)
        console.log(`  - Titre: ${formation.attributes.title}`) // Correct field name
        console.log(`  - Slug: ${formation.attributes.slug}`)
        console.log(`  - Niveau: ${formation.attributes.level}`) // Correct field name
        console.log(`  - RNCP: ${formation.attributes.rncp || 'NON DÉFINI'}`)
        console.log(`  - Description courte: ${formation.attributes.shortDesc ? formation.attributes.shortDesc.substring(0, 50) + '...' : 'Aucune'}`)
        console.log(`  - Catégorie: ${formation.attributes.category?.data?.attributes?.nom || 'Aucune'}`)
      })
      
      // Compter combien ont un RNCP
      const withRNCP = data.data.filter(f => f.attributes.rncp && f.attributes.rncp.trim() !== '')
      console.log(`\n✅ Formations avec RNCP: ${withRNCP.length}/${data.data.length}`)
      
      if (withRNCP.length > 0) {
        console.log('\n📝 Exemples de codes RNCP:')
        withRNCP.slice(0, 5).forEach(f => {
          console.log(`  - ${f.attributes.title}: ${f.attributes.rncp}`)
        })
      }
    } else {
      console.log('❌ Aucune formation trouvée')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testRNCPFields()