#!/usr/bin/env node

/**
 * Script de test pour vérifier que la galerie de formations
 * s'affiche correctement sur la page d'accueil
 */

const http = require('http')

console.log('🧪 Test de la galerie sur la page d\'accueil\n')

// Test de la page d'accueil
function testHomepage() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Test-Script/1.0'
      }
    }

    const req = http.request(options, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        console.log(`📊 Status: ${res.statusCode}`)
        
        if (res.statusCode === 200) {
          // Vérifier la présence des éléments de la galerie
          const checks = [
            { name: 'FormationsSection', pattern: /FormationsSection|Nos Formations/i },
            { name: 'FormationsGallery', pattern: /FormationsGallery|Explorez nos formations/i },
            { name: 'Formations en Alternance', pattern: /Formations en Alternance|alternance/i },
            { name: 'Formations Reconversion', pattern: /Formations Reconversion|reconversion/i },
            { name: 'VAE', pattern: /VAE|Validation des Acquis/i },
            { name: 'Chargé d\'Affaires', pattern: /Chargé.*Affaires/i },
            { name: 'Conducteur de Travaux', pattern: /Conducteur.*Travaux/i }
          ]
          
          console.log('\n🔍 Vérification du contenu:')
          
          checks.forEach(check => {
            const found = check.pattern.test(data)
            console.log(`${found ? '✅' : '❌'} ${check.name}: ${found ? 'Trouvé' : 'Non trouvé'}`)
          })
          
          // Vérifier la structure HTML
          const hasFormationsSection = data.includes('Nos Formations') || data.includes('BTP d\'Excellence')
          const hasGalleryComponent = data.includes('Explorez nos formations') || data.includes('catégorie')
          
          console.log('\n📋 Structure de la page:')
          console.log(`✅ Section Formations: ${hasFormationsSection ? 'Présente' : 'Absente'}`)
          console.log(`✅ Galerie de formations: ${hasGalleryComponent ? 'Présente' : 'Absente'}`)
          
          resolve({
            success: true,
            hasFormationsSection,
            hasGalleryComponent,
            contentLength: data.length
          })
        } else {
          reject(new Error(`HTTP ${res.statusCode}`))
        }
      })
    })
    
    req.on('error', (err) => {
      reject(err)
    })
    
    req.setTimeout(10000, () => {
      req.destroy()
      reject(new Error('Timeout'))
    })
    
    req.end()
  })
}

// Exécuter le test
async function runTest() {
  try {
    console.log('🌐 Test de connexion à http://localhost:3000')
    
    const result = await testHomepage()
    
    console.log('\n✨ Résultats du test:')
    console.log(`📄 Taille du contenu: ${result.contentLength} caractères`)
    console.log(`🎯 Section Formations: ${result.hasFormationsSection ? '✅ OK' : '❌ Manquante'}`)
    console.log(`🎠 Galerie animée: ${result.hasGalleryComponent ? '✅ OK' : '❌ Manquante'}`)
    
    if (result.hasFormationsSection && result.hasGalleryComponent) {
      console.log('\n🎉 Test réussi ! La galerie de formations est bien intégrée.')
      console.log('\n📝 Fonctionnalités attendues:')
      console.log('- 3 catégories de formations (Alternance, Reconversion, VAE)')
      console.log('- Carousel animé horizontal pour chaque catégorie')
      console.log('- Auto-scroll toutes les 4 secondes')
      console.log('- Contrôles de navigation manuels')
      console.log('- Cartes cliquables vers les pages de formation')
      console.log('- Design responsive avec animations Framer Motion')
    } else {
      console.log('\n⚠️ Problème détecté dans l\'intégration de la galerie.')
    }
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message)
    console.log('\n💡 Vérifiez que:')
    console.log('- Le serveur Next.js est démarré (npm run dev)')
    console.log('- Le port 3000 est disponible')
    console.log('- Les composants sont correctement importés')
  }
}

runTest()