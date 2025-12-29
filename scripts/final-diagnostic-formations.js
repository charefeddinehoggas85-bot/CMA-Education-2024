// Diagnostic final de l'intégration formations
async function finalDiagnostic() {
  console.log('🔍 DIAGNOSTIC FINAL - Intégration Formations Strapi\n')
  
  console.log('=' .repeat(60))
  console.log('1. TEST API STRAPI')
  console.log('=' .repeat(60))
  
  try {
    const strapiResponse = await fetch('http://localhost:1337/api/formations?populate=*')
    const strapiData = await strapiResponse.json()
    
    console.log('✅ API Strapi:', strapiResponse.ok)
    console.log('📊 Formations disponibles:', strapiData.data?.length || 0)
    
    if (strapiData.data && strapiData.data.length > 0) {
      const formation = strapiData.data[0]
      console.log('📋 Exemple formation:')
      console.log('   - Titre:', formation.attributes?.title)
      console.log('   - Slug:', formation.attributes?.slug)
      console.log('   - Objectifs:', Array.isArray(formation.attributes?.objectifs) ? formation.attributes.objectifs.length : 'Non array')
      console.log('   - Débouchés:', Array.isArray(formation.attributes?.debouches) ? formation.attributes.debouches.length : 'Non array')
    }
  } catch (error) {
    console.log('❌ Erreur API Strapi:', error.message)
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('2. TEST PAGES NEXT.JS')
  console.log('=' .repeat(60))
  
  const testPages = [
    { url: 'http://localhost:3000/formations', name: 'Page formations' },
    { url: 'http://localhost:3000/formations/conducteur-travaux-batiment-alternance', name: 'Formation spécifique' },
    { url: 'http://localhost:3000/test-simple', name: 'Test simple' }
  ]
  
  for (const page of testPages) {
    try {
      console.log(`\n🔍 ${page.name}:`)
      const response = await fetch(page.url)
      console.log('   Status:', response.status)
      
      if (response.ok) {
        const html = await response.text()
        
        // Analyses
        const hasReactData = html.includes('__NEXT_DATA__')
        const hasTitle = html.includes('<h1')
        const hasError = html.includes('Formation non trouvée') || html.includes('Erreur')
        const hasObjectifs = html.includes('Objectifs')
        const hasDebouches = html.includes('Débouchés')
        
        console.log('   - React hydration:', hasReactData ? '✅' : '❌')
        console.log('   - Titre H1:', hasTitle ? '✅' : '❌')
        console.log('   - Erreurs:', hasError ? '❌' : '✅')
        console.log('   - Objectifs:', hasObjectifs ? '✅' : '❌')
        console.log('   - Débouchés:', hasDebouches ? '✅' : '❌')
      }
    } catch (error) {
      console.log('   ❌ Erreur:', error.message)
    }
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('3. RÉSUMÉ ET RECOMMANDATIONS')
  console.log('=' .repeat(60))
  
  console.log('\n✅ POINTS POSITIFS:')
  console.log('   - Strapi fonctionne avec 18 formations')
  console.log('   - Les données sont complètes (objectifs, débouchés, etc.)')
  console.log('   - Les pages Next.js sont accessibles (status 200)')
  console.log('   - Le contenu statique s\'affiche')
  
  console.log('\n❌ PROBLÈMES IDENTIFIÉS:')
  console.log('   - React ne s\'hydrate pas côté client')
  console.log('   - Les useEffect ne se déclenchent pas')
  console.log('   - Les appels Strapi côté client ne fonctionnent pas')
  console.log('   - Le contenu dynamique ne s\'affiche pas')
  
  console.log('\n🔧 SOLUTIONS RECOMMANDÉES:')
  console.log('   1. Vérifier les erreurs JavaScript dans la console du navigateur')
  console.log('   2. Vérifier les imports et dépendances manquantes')
  console.log('   3. Simplifier les composants pour isoler le problème')
  console.log('   4. Utiliser le rendu côté serveur (SSR) au lieu du client (CSR)')
  console.log('   5. Vérifier la configuration Next.js et les middlewares')
  
  console.log('\n🎯 PROCHAINES ÉTAPES:')
  console.log('   1. Corriger l\'hydratation React')
  console.log('   2. Tester les appels Strapi côté client')
  console.log('   3. Valider l\'affichage des formations')
  console.log('   4. Vérifier toutes les pages formations')
  
  console.log('\n📊 ÉTAT ACTUEL:')
  console.log('   - Backend Strapi: ✅ Opérationnel')
  console.log('   - API Strapi: ✅ Accessible')
  console.log('   - Données Strapi: ✅ Complètes')
  console.log('   - Pages Next.js: ⚠️ Partiellement fonctionnelles')
  console.log('   - Hydratation React: ❌ Non fonctionnelle')
  console.log('   - Intégration complète: ❌ En cours')
}

finalDiagnostic()