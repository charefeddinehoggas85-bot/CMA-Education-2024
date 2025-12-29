// Debug des données dans le composant formation
async function debugFormationComponentData() {
  console.log('🔍 Debug des données du composant formation...\n')
  
  const testSlug = 'conducteur-travaux-batiment-alternance'
  
  console.log('=' .repeat(60))
  console.log('1. TEST DIRECT DE getFormation()')
  console.log('=' .repeat(60))
  
  try {
    // Simuler la fonction getFormation
    const strapiUrl = `http://localhost:1337/api/formations?filters[slug][$eq]=${testSlug}&populate=*`
    console.log('URL Strapi:', strapiUrl)
    
    const response = await fetch(strapiUrl)
    const data = await response.json()
    
    console.log('✅ Réponse Strapi:', response.ok)
    console.log('📊 Formations trouvées:', data.data?.length || 0)
    
    if (data.data && data.data.length > 0) {
      const item = data.data[0]
      
      // Simuler la transformation comme dans strapi.ts
      const transformed = {
        id: item.id,
        ...item.attributes,
        // Mapper les relations de catégorie
        category: item.attributes?.category?.data ? {
          id: item.attributes.category.data.id,
          ...item.attributes.category.data.attributes
        } : null,
        // Ajouter les données d'image
        imageData: item.attributes?.image || null
      }
      
      console.log('\n📋 Données transformées (comme getFormation):')
      console.log('   - ID:', transformed.id)
      console.log('   - title:', transformed.title)
      console.log('   - slug:', transformed.slug)
      console.log('   - level:', transformed.level)
      console.log('   - rncp:', transformed.rncp)
      console.log('   - duree:', transformed.duree)
      console.log('   - rythme:', transformed.rythme)
      console.log('   - shortDescription:', transformed.shortDescription)
      console.log('   - objectifs type:', typeof transformed.objectifs)
      console.log('   - objectifs contenu:', Array.isArray(transformed.objectifs) ? `Array(${transformed.objectifs.length})` : transformed.objectifs)
      console.log('   - debouches type:', typeof transformed.debouches)
      console.log('   - debouches contenu:', Array.isArray(transformed.debouches) ? `Array(${transformed.debouches.length})` : transformed.debouches)
      
      // Vérifier les champs utilisés par le composant
      console.log('\n🔍 Mapping des champs pour le composant:')
      const componentMapping = {
        'title': transformed.title,
        'level': transformed.level,
        'rncp': transformed.rncp,
        'duree': transformed.duree,
        'rythme': transformed.rythme,
        'shortDesc': transformed.shortDescription,
        'fullDesc': transformed.fullDescription,
        'objectifs': transformed.objectifs,
        'debouches': transformed.debouches,
        'prerequis': transformed.prerequis
      }
      
      Object.entries(componentMapping).forEach(([key, value]) => {
        const status = value !== undefined && value !== null ? '✅' : '❌'
        console.log(`   ${key}: ${status} (${typeof value}) ${Array.isArray(value) ? `[${value.length}]` : ''}`)
      })
      
      return transformed
    }
  } catch (error) {
    console.log('❌ Erreur getFormation:', error.message)
    return null
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('2. TEST DE LA PAGE NEXT.JS')
  console.log('=' .repeat(60))
  
  try {
    const pageResponse = await fetch(`http://localhost:3000/formations/${testSlug}`)
    console.log('✅ Page accessible:', pageResponse.ok)
    
    if (pageResponse.ok) {
      const html = await pageResponse.text()
      
      // Chercher des indices de debug dans le HTML
      console.log('\n🔍 Recherche d\'indices dans le HTML:')
      
      // Vérifier si les données sont dans le HTML (même si pas affichées)
      const checks = {
        hasFormationNonTrouvee: html.includes('Formation non trouvée'),
        hasChargement: html.includes('Chargement'),
        hasDebugInfo: html.includes('Debug') || html.includes('debug'),
        hasConsoleLog: html.includes('console.log'),
        hasErrorBoundary: html.includes('ErrorBoundary'),
        hasTitle: html.includes('Conducteur') && html.includes('Travaux'),
        hasRNCP: html.includes('RNCP40217'),
        hasLevel: html.includes('Niveau 6'),
        hasDuration: html.includes('12 mois')
      }
      
      Object.entries(checks).forEach(([key, value]) => {
        console.log(`   ${key}: ${value ? '✅' : '❌'}`)
      })
      
      // Extraire le titre de la page
      const titleMatch = html.match(/<title>([^<]+)<\/title>/)
      if (titleMatch) {
        console.log(`\n📄 Titre de la page: ${titleMatch[1]}`)
      }
      
      // Chercher des erreurs JavaScript
      const errorMatches = html.match(/Error[^<]*|error[^<]*|undefined[^<]*/gi)
      if (errorMatches && errorMatches.length > 0) {
        console.log('\n⚠️ Erreurs potentielles détectées:')
        errorMatches.slice(0, 3).forEach(error => {
          console.log(`   - ${error}`)
        })
      }
    }
  } catch (error) {
    console.log('❌ Erreur page:', error.message)
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('3. DIAGNOSTIC')
  console.log('=' .repeat(60))
  
  console.log('\n🎯 HYPOTHÈSES:')
  console.log('1. Les données Strapi arrivent mais ne s\'affichent pas')
  console.log('2. Le mapping des champs est incorrect')
  console.log('3. Il y a une erreur JavaScript côté client')
  console.log('4. Le composant utilise les données statiques en priorité')
  
  console.log('\n🔧 SOLUTIONS À TESTER:')
  console.log('1. Vérifier le mapping des champs Strapi → Composant')
  console.log('2. Ajouter des logs de debug visibles dans le HTML')
  console.log('3. Simplifier le composant pour isoler le problème')
  console.log('4. Forcer l\'utilisation de Strapi sans fallback statique')
}

debugFormationComponentData()