async function testMinimalPage() {
  console.log('🔍 Test du composant ultra-minimal...')
  
  try {
    const response = await fetch('http://localhost:3000/test-minimal')
    console.log('✅ Status:', response.status)
    
    if (response.ok) {
      const html = await response.text()
      
      const hasNextData = html.includes('__NEXT_DATA__')
      const hasTitle = html.includes('Test Minimal')
      const hasText = html.includes('Si vous voyez ce texte')
      
      console.log('📊 Test minimal:')
      console.log('   - Next.js Data:', hasNextData ? '✅' : '❌')
      console.log('   - Titre présent:', hasTitle ? '✅' : '❌')
      console.log('   - Texte présent:', hasText ? '✅' : '❌')
      
      if (hasNextData) {
        console.log('🎉 Le composant minimal fonctionne!')
      } else {
        console.log('❌ Même le composant minimal ne s\'hydrate pas')
        
        // Analyser le HTML pour comprendre
        console.log('\n🔍 Analyse du HTML:')
        const hasHtml = html.includes('<html')
        const hasBody = html.includes('<body')
        const hasNextRoot = html.includes('id="__next"')
        const hasScriptTags = html.includes('<script')
        
        console.log('   - Balise HTML:', hasHtml ? '✅' : '❌')
        console.log('   - Balise BODY:', hasBody ? '✅' : '❌')
        console.log('   - Root Next.js:', hasNextRoot ? '✅' : '❌')
        console.log('   - Scripts:', hasScriptTags ? '✅' : '❌')
        
        // Extraire un échantillon du HTML
        console.log('\n📄 Échantillon HTML (premiers 200 caractères):')
        console.log(html.substring(0, 200) + '...')
      }
    }
  } catch (error) {
    console.log('❌ Erreur:', error.message)
  }
}

testMinimalPage()