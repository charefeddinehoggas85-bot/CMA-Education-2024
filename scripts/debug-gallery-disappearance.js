const FRONTEND_URL = 'http://localhost:3000'

async function debugGalleryDisappearance() {
  try {
    console.log('🔍 Diagnostic de la disparition de la galerie...')
    
    // Test 1: Vérifier l'accessibilité de la homepage
    console.log('\n1️⃣ Test d\'accessibilité de la homepage...')
    const response = await fetch(FRONTEND_URL)
    
    if (!response.ok) {
      console.log(`❌ Homepage inaccessible: ${response.status}`)
      return
    }
    
    console.log('✅ Homepage accessible')
    
    // Test 2: Vérifier le contenu HTML
    const html = await response.text()
    
    console.log('\n2️⃣ Analyse du contenu HTML...')
    
    // Chercher les éléments de la galerie
    const hasFormationsGallery = html.includes('FormationsGallery') || html.includes('Explorez nos formations par catégorie')
    const hasFormationsSection = html.includes('FormationsSection') || html.includes('Nos Formations')
    const hasCarousel = html.includes('carousel') || html.includes('formations')
    
    console.log(`📂 FormationsGallery: ${hasFormationsGallery ? '✅ Trouvée' : '❌ Absente'}`)
    console.log(`📋 FormationsSection: ${hasFormationsSection ? '✅ Trouvée' : '❌ Absente'}`)
    console.log(`🎠 Carousel: ${hasCarousel ? '✅ Trouvé' : '❌ Absent'}`)
    
    // Test 3: Chercher des erreurs JavaScript dans le HTML
    console.log('\n3️⃣ Recherche d\'erreurs JavaScript...')
    
    const hasJSError = html.includes('Error:') || html.includes('TypeError:') || html.includes('ReferenceError:')
    const hasCompilationError = html.includes('Compilation error') || html.includes('Module not found')
    
    console.log(`🐛 Erreurs JS: ${hasJSError ? '❌ Détectées' : '✅ Aucune'}`)
    console.log(`⚙️ Erreurs compilation: ${hasCompilationError ? '❌ Détectées' : '✅ Aucune'}`)
    
    // Test 4: Vérifier la structure des composants
    console.log('\n4️⃣ Vérification de la structure...')
    
    const hasLazyFormationsSection = html.includes('LazyFormationsSection')
    const hasModernBackground = html.includes('ModernBackground')
    const hasMotionDiv = html.includes('motion.div')
    
    console.log(`🔄 LazyFormationsSection: ${hasLazyFormationsSection ? '✅ Présente' : '❌ Absente'}`)
    console.log(`🎨 ModernBackground: ${hasModernBackground ? '✅ Présent' : '❌ Absent'}`)
    console.log(`🎭 Framer Motion: ${hasMotionDiv ? '✅ Actif' : '❌ Inactif'}`)
    
    // Test 5: Chercher des indices de problèmes de données
    console.log('\n5️⃣ Analyse des données...')
    
    const hasLoadingState = html.includes('animate-pulse') || html.includes('loading')
    const hasEmptyState = html.includes('Aucune formation') || html.includes('0 formations')
    const hasErrorState = html.includes('Erreur') || html.includes('Error')
    
    console.log(`⏳ État de chargement: ${hasLoadingState ? '⚠️ Détecté' : '✅ Normal'}`)
    console.log(`📭 État vide: ${hasEmptyState ? '⚠️ Détecté' : '✅ Normal'}`)
    console.log(`💥 État d'erreur: ${hasErrorState ? '❌ Détecté' : '✅ Normal'}`)
    
    // Résumé du diagnostic
    console.log('\n📊 RÉSUMÉ DU DIAGNOSTIC:')
    
    if (!hasFormationsGallery && !hasFormationsSection) {
      console.log('❌ PROBLÈME MAJEUR: Aucun composant de formations détecté')
      console.log('   → Vérifier les imports et la compilation')
    } else if (!hasFormationsGallery && hasFormationsSection) {
      console.log('⚠️ PROBLÈME PARTIEL: FormationsSection présente mais pas FormationsGallery')
      console.log('   → Vérifier l\'import de FormationsGallery dans FormationsSection')
    } else if (hasLoadingState) {
      console.log('⏳ CHARGEMENT EN COURS: La galerie est peut-être en cours de chargement')
      console.log('   → Attendre ou vérifier la connexion Strapi')
    } else if (hasEmptyState) {
      console.log('📭 DONNÉES VIDES: La galerie est présente mais sans données')
      console.log('   → Vérifier les données Strapi ou le fallback statique')
    } else {
      console.log('✅ TOUT SEMBLE NORMAL: La galerie devrait être visible')
      console.log('   → Vérifier le CSS ou les conditions d\'affichage')
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error.message)
  }
}

debugGalleryDisappearance()