const FRONTEND_URL = 'http://localhost:3000'

async function testGalleryRendering() {
  try {
    console.log('🔍 Test spécifique du rendu de FormationsGallery...')
    
    // Attendre un peu pour laisser le temps au composant de se charger
    console.log('⏳ Attente de 3 secondes pour le chargement...')
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const response = await fetch(FRONTEND_URL)
    const html = await response.text()
    
    console.log('\n📋 Recherche d\'éléments spécifiques à FormationsGallery...')
    
    // Éléments spécifiques à FormationsGallery
    const galleryElements = {
      'Titre principal': html.includes('Explorez nos formations par catégorie'),
      'Sous-titre': html.includes('Découvrez nos parcours de formation'),
      'Conteneur galerie': html.includes('Formations Gallery Grid') || html.includes('grid md:grid-cols-2 lg:grid-cols-3'),
      'FormationsCarousel': html.includes('FormationsCarousel'),
      'CTA final': html.includes('Voir toutes nos formations'),
      'Debug info': html.includes('Debug Info:') || html.includes('Catégories chargées:'),
      'Loading state': html.includes('animate-pulse') && html.includes('formations'),
      'Error boundary': html.includes('Something went wrong') || html.includes('Error boundary')
    }
    
    console.log('\n🔍 Éléments détectés:')
    Object.entries(galleryElements).forEach(([element, found]) => {
      console.log(`  ${found ? '✅' : '❌'} ${element}`)
    })
    
    // Recherche de patterns de chargement
    console.log('\n⏳ États de chargement détectés:')
    const loadingPatterns = [
      'loading: true',
      'setLoading(true)',
      'useState(true)',
      'animate-pulse',
      'skeleton',
      'spinner'
    ]
    
    loadingPatterns.forEach(pattern => {
      const found = html.includes(pattern)
      if (found) {
        console.log(`  ⚠️ ${pattern}`)
      }
    })
    
    // Recherche d'erreurs spécifiques
    console.log('\n🐛 Erreurs potentielles:')
    const errorPatterns = [
      'FormationsGallery: Erreur Strapi',
      'Données Strapi incomplètes',
      'basculement vers données statiques',
      'Timeout Strapi',
      'Cannot read properties',
      'undefined is not a function'
    ]
    
    errorPatterns.forEach(pattern => {
      const found = html.includes(pattern)
      if (found) {
        console.log(`  ❌ ${pattern}`)
      }
    })
    
    // Vérification des logs console (si présents dans le HTML)
    console.log('\n📝 Logs de console détectés:')
    const consolePatterns = [
      'console.log',
      'console.error',
      'console.warn',
      'FormationsGallery:',
      'Tentative de chargement',
      'Données Strapi reçues'
    ]
    
    consolePatterns.forEach(pattern => {
      if (html.includes(pattern)) {
        console.log(`  📋 ${pattern}`)
      }
    })
    
    // Analyse finale
    console.log('\n🎯 ANALYSE FINALE:')
    
    const hasAnyGalleryElement = Object.values(galleryElements).some(found => found)
    
    if (!hasAnyGalleryElement) {
      console.log('❌ PROBLÈME CRITIQUE: Aucun élément de FormationsGallery détecté')
      console.log('   Causes possibles:')
      console.log('   - Erreur de compilation silencieuse')
      console.log('   - Condition de rendu qui empêche l\'affichage')
      console.log('   - Erreur dans l\'import du composant')
      console.log('   - Problème de hydratation React')
    } else if (galleryElements['Loading state']) {
      console.log('⏳ CHARGEMENT BLOQUÉ: La galerie semble bloquée en état de chargement')
      console.log('   Solutions:')
      console.log('   - Vérifier la connexion Strapi')
      console.log('   - Réduire le timeout de chargement')
      console.log('   - Forcer le fallback vers les données statiques')
    } else if (galleryElements['Debug info']) {
      console.log('🔧 MODE DEBUG ACTIF: La galerie est en mode debug')
      console.log('   - Vérifier les logs pour identifier le problème')
    } else {
      console.log('✅ ÉLÉMENTS PARTIELS DÉTECTÉS: La galerie se charge partiellement')
      console.log('   - Vérifier les données et les conditions d\'affichage')
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

testGalleryRendering()