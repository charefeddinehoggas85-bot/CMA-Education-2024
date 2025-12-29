// Test spécifique d'une formation Strapi
async function testSpecificFormation() {
  console.log('🔍 Test spécifique formation Strapi...\n')
  
  const slug = 'conducteur-travaux-batiment-alternance'
  
  // Test 1: Vérifier que la formation existe dans Strapi
  console.log('📡 Test 1: Récupération depuis Strapi...')
  try {
    const strapiUrl = `http://localhost:1337/api/formations?filters[slug][$eq]=${slug}&populate=*`
    console.log('URL Strapi:', strapiUrl)
    
    const response = await fetch(strapiUrl)
    const data = await response.json()
    
    console.log('✅ Réponse Strapi:', response.ok)
    console.log('📊 Formations trouvées:', data.data?.length || 0)
    
    if (data.data && data.data.length > 0) {
      const formation = data.data[0]
      console.log('\n📋 Détails formation:')
      console.log('   - ID:', formation.id)
      console.log('   - Titre:', formation.attributes?.title)
      console.log('   - Slug:', formation.attributes?.slug)
      console.log('   - Description:', formation.attributes?.shortDescription?.substring(0, 100) + '...')
      console.log('   - Niveau:', formation.attributes?.level)
      console.log('   - RNCP:', formation.attributes?.rncp)
      console.log('   - Durée:', formation.attributes?.duree)
      console.log('   - Rythme:', formation.attributes?.rythme)
      console.log('   - Modalité:', formation.attributes?.modalite)
      console.log('   - Coût:', formation.attributes?.cout)
      console.log('   - Image présente:', !!formation.attributes?.image?.data)
      console.log('   - Objectifs présents:', !!formation.attributes?.objectifs)
      console.log('   - Débouchés présents:', !!formation.attributes?.debouches)
      console.log('   - Prérequis présents:', !!formation.attributes?.prerequis)
      
      // Détails des objectifs
      if (formation.attributes?.objectifs) {
        console.log('\n🎯 Objectifs:')
        if (Array.isArray(formation.attributes.objectifs)) {
          formation.attributes.objectifs.slice(0, 3).forEach((obj, i) => {
            console.log(`   ${i + 1}. ${obj}`)
          })
        } else if (typeof formation.attributes.objectifs === 'object') {
          console.log('   Type objet:', Object.keys(formation.attributes.objectifs))
        }
      }
      
      // Détails des débouchés
      if (formation.attributes?.debouches) {
        console.log('\n💼 Débouchés:')
        if (Array.isArray(formation.attributes.debouches)) {
          formation.attributes.debouches.slice(0, 3).forEach((deb, i) => {
            console.log(`   ${i + 1}. ${deb}`)
          })
        } else if (typeof formation.attributes.debouches === 'object') {
          console.log('   Type objet:', Object.keys(formation.attributes.debouches))
        }
      }
    } else {
      console.log('❌ Aucune formation trouvée avec ce slug')
    }
  } catch (error) {
    console.error('❌ Erreur Strapi:', error.message)
  }
  
  console.log('\n' + '='.repeat(60) + '\n')
  
  // Test 2: Tester la page Next.js
  console.log('📋 Test 2: Page Next.js...')
  try {
    const nextUrl = `http://localhost:3000/formations/${slug}`
    console.log('URL Next.js:', nextUrl)
    
    const response = await fetch(nextUrl)
    console.log('✅ Status:', response.status)
    
    if (response.ok) {
      const html = await response.text()
      
      // Analyser le contenu
      console.log('\n📊 Analyse du contenu HTML:')
      
      // Vérifier le titre
      const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
      if (titleMatch) {
        console.log('   - Titre H1:', titleMatch[1].trim())
      }
      
      // Vérifier les erreurs
      const hasError = html.includes('Formation non trouvée') || html.includes('non trouvée')
      console.log('   - Erreur "Formation non trouvée":', hasError)
      
      // Vérifier le contenu
      const hasObjectifs = html.includes('Objectifs') || html.includes('objectifs')
      const hasDebouches = html.includes('Débouchés') || html.includes('débouchés')
      const hasRNCP = html.includes('RNCP')
      const hasImage = html.includes('localhost:1337') || html.includes('/images/formations/')
      
      console.log('   - Objectifs présents:', hasObjectifs)
      console.log('   - Débouchés présents:', hasDebouches)
      console.log('   - RNCP présent:', hasRNCP)
      console.log('   - Image présente:', hasImage)
      
      // Vérifier les logs de debug
      const hasDebugInfo = html.includes('Slug:') || html.includes('Formation ID:')
      console.log('   - Info de debug présente:', hasDebugInfo)
      
      // Extraire les infos de debug si présentes
      if (hasDebugInfo) {
        const debugMatch = html.match(/Slug: ([^<]+)/i)
        if (debugMatch) {
          console.log('   - Slug détecté:', debugMatch[1].trim())
        }
      }
      
    } else {
      console.log('❌ Page non accessible')
    }
  } catch (error) {
    console.error('❌ Erreur page Next.js:', error.message)
  }
  
  console.log('\n🎯 CONCLUSION:')
  console.log('Si Strapi retourne la formation mais Next.js affiche "Formation non trouvée",')
  console.log('le problème est dans le composant Next.js qui ne récupère pas les données.')
  console.log('\nVérifiez:')
  console.log('1. La fonction getFormation() dans src/lib/strapi.ts')
  console.log('2. Le useEffect() dans src/app/formations/[slug]/page.tsx')
  console.log('3. La gestion des erreurs et des états de chargement')
}

testSpecificFormation()