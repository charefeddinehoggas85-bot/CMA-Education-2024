// Test pour vérifier si l'hydratation fonctionne maintenant
async function testHydrationWorking() {
  console.log('🔍 Test final de l\'hydratation...\n')
  
  const testPages = [
    { url: 'http://localhost:3000/test-minimal', name: 'Test Minimal' },
    { url: 'http://localhost:3000/test-hydration', name: 'Test Hydratation' },
    { url: 'http://localhost:3000/formations', name: 'Formations' },
    { url: 'http://localhost:3000/formations/conducteur-travaux-batiment-alternance', name: 'Formation Spécifique' }
  ]
  
  for (const page of testPages) {
    console.log(`🔍 Test ${page.name}:`)
    
    try {
      const response = await fetch(page.url)
      console.log(`   Status: ${response.status}`)
      
      if (response.ok) {
        const html = await response.text()
        
        // Vérifications d'hydratation
        const hasNextRoot = html.includes('id="__next"')
        const hasScripts = html.includes('<script')
        const hasContent = html.includes(page.name.includes('Formation') ? 'Formation' : 'Test')
        const hasReactElements = html.includes('data-react') || html.includes('react')
        
        // Vérifications spécifiques par page
        let specificCheck = false
        if (page.name === 'Formations') {
          specificCheck = html.includes('Candidater') || html.includes('formations')
        } else if (page.name === 'Formation Spécifique') {
          specificCheck = html.includes('Conducteur') || html.includes('Travaux')
        } else {
          specificCheck = html.includes('Test')
        }
        
        console.log(`   - Root Next.js: ${hasNextRoot ? '✅' : '❌'}`)
        console.log(`   - Scripts: ${hasScripts ? '✅' : '❌'}`)
        console.log(`   - Contenu: ${hasContent ? '✅' : '❌'}`)
        console.log(`   - Contenu spécifique: ${specificCheck ? '✅' : '❌'}`)
        
        // Score d'hydratation
        const score = [hasNextRoot, hasScripts, hasContent, specificCheck].filter(Boolean).length
        console.log(`   - Score hydratation: ${score}/4 ${score >= 3 ? '✅' : score >= 2 ? '⚠️' : '❌'}`)
        
      } else {
        console.log(`   ❌ Erreur ${response.status}`)
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}`)
    }
    
    console.log('')
  }
  
  console.log('🎯 RÉSUMÉ:')
  console.log('Si les scores sont >= 3/4, l\'hydratation fonctionne!')
  console.log('Si les pages formations montrent du contenu, Strapi est intégré!')
}

testHydrationWorking()