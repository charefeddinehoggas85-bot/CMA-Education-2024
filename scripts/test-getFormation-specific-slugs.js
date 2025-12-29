// Test spécifique de getFormation avec les slugs Strapi
async function testGetFormationSpecificSlugs() {
  console.log('🔍 Test getFormation avec slugs Strapi spécifiques...\n')
  
  // Récupérer les slugs depuis Strapi
  try {
    const strapiResponse = await fetch('http://localhost:1337/api/formations?populate=*')
    const strapiData = await strapiResponse.json()
    
    if (!strapiData.data || strapiData.data.length === 0) {
      console.log('❌ Aucune formation dans Strapi')
      return
    }
    
    console.log('📊 Formations Strapi disponibles:', strapiData.data.length)
    
    // Tester les 5 premiers slugs
    const testSlugs = strapiData.data.slice(0, 5).map(item => ({
      slug: item.attributes?.slug,
      title: item.attributes?.title,
      id: item.id
    }))
    
    console.log('\n🔍 Test des slugs individuels:')
    
    for (const formation of testSlugs) {
      console.log(`\n📋 Test slug: "${formation.slug}"`)
      console.log(`   Titre attendu: ${formation.title}`)
      console.log(`   ID Strapi: ${formation.id}`)
      
      try {
        // Test direct de l'API Strapi
        const directResponse = await fetch(`http://localhost:1337/api/formations?filters[slug][$eq]=${formation.slug}&populate=*`)
        const directData = await directResponse.json()
        
        console.log(`   API directe: ${directResponse.ok ? '✅' : '❌'}`)
        console.log(`   Formations trouvées: ${directData.data?.length || 0}`)
        
        if (directData.data && directData.data.length > 0) {
          const foundFormation = directData.data[0]
          console.log(`   Titre trouvé: ${foundFormation.attributes?.title}`)
          console.log(`   Niveau: ${foundFormation.attributes?.level}`)
          console.log(`   RNCP: ${foundFormation.attributes?.rncp}`)
          console.log(`   Durée: ${foundFormation.attributes?.duree}`)
          console.log(`   Objectifs: ${Array.isArray(foundFormation.attributes?.objectifs) ? foundFormation.attributes.objectifs.length : 'N/A'}`)
          console.log(`   Débouchés: ${Array.isArray(foundFormation.attributes?.debouches) ? foundFormation.attributes.debouches.length : 'N/A'}`)
          
          // Test de la page Next.js
          console.log(`\n   🌐 Test page Next.js...`)
          try {
            const nextResponse = await fetch(`http://localhost:3000/formations/${formation.slug}`)
            console.log(`   Page Next.js: ${nextResponse.ok ? '✅' : '❌'} (${nextResponse.status})`)
            
            if (nextResponse.ok) {
              const html = await nextResponse.text()
              
              // Vérifier si le contenu Strapi est présent
              const hasTitle = html.includes(foundFormation.attributes?.title)
              const hasLevel = foundFormation.attributes?.level ? html.includes(foundFormation.attributes.level) : true
              const hasRNCP = foundFormation.attributes?.rncp ? html.includes(foundFormation.attributes.rncp) : true
              const hasDuration = foundFormation.attributes?.duree ? html.includes(foundFormation.attributes.duree) : true
              
              console.log(`   Contenu Strapi sur page:`)
              console.log(`     - Titre: ${hasTitle ? '✅' : '❌'}`)
              console.log(`     - Niveau: ${hasLevel ? '✅' : '❌'}`)
              console.log(`     - RNCP: ${hasRNCP ? '✅' : '❌'}`)
              console.log(`     - Durée: ${hasDuration ? '✅' : '❌'}`)
              
              const score = [hasTitle, hasLevel, hasRNCP, hasDuration].filter(Boolean).length
              console.log(`   Score intégration: ${score}/4 ${score >= 3 ? '✅' : score >= 2 ? '⚠️' : '❌'}`)
            }
          } catch (pageError) {
            console.log(`   ❌ Erreur page: ${pageError.message}`)
          }
        } else {
          console.log('   ❌ Formation non trouvée dans Strapi')
        }
      } catch (error) {
        console.log(`   ❌ Erreur: ${error.message}`)
      }
    }
    
    console.log('\n' + '='.repeat(60))
    console.log('DIAGNOSTIC:')
    console.log('Si les API directes fonctionnent mais les pages Next.js ne montrent')
    console.log('pas le contenu, le problème est dans le composant React.')
    console.log('Si les API directes ne fonctionnent pas, le problème est dans Strapi.')
    
  } catch (error) {
    console.log('❌ Erreur générale:', error.message)
  }
}

testGetFormationSpecificSlugs()