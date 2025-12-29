#!/usr/bin/env node

/**
 * Script de diagnostic pour vérifier pourquoi la galerie ne s'affiche pas
 */

const http = require('http')

console.log('🔍 Diagnostic de rendu de la galerie\n')

function testPageContent() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    }

    const req = http.request(options, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        console.log('📊 Analyse du contenu HTML:')
        
        // Vérifications spécifiques
        const checks = [
          { name: 'FormationsSection présente', pattern: /Nos Formations.*BTP.*Excellence/i, found: false },
          { name: 'Texte descriptif présent', pattern: /Des parcours conçus pour vous spécialiser/i, found: false },
          { name: 'FormationsGallery présente', pattern: /Explorez nos formations par catégorie/i, found: false },
          { name: 'Composant FormationsCarousel', pattern: /FormationsCarousel/i, found: false },
          { name: 'Données formations', pattern: /Chargé.*Affaires/i, found: false },
          { name: 'Catégories formations', pattern: /Formations en Alternance|Formations Reconversion|VAE/i, found: false },
          { name: 'Erreurs JavaScript', pattern: /Error|TypeError|ReferenceError/i, found: false }
        ]
        
        checks.forEach(check => {
          check.found = check.pattern.test(data)
          const status = check.found ? '✅' : '❌'
          console.log(`${status} ${check.name}`)
        })
        
        // Recherche de la galerie spécifiquement
        console.log('\n🎠 Recherche de la galerie:')
        
        const galleryMarkers = [
          'FormationsGallery',
          'Explorez nos formations par catégorie',
          'carousel',
          'formations-carousel',
          'category'
        ]
        
        galleryMarkers.forEach(marker => {
          const found = data.toLowerCase().includes(marker.toLowerCase())
          console.log(`${found ? '✅' : '❌'} "${marker}": ${found}`)
        })
        
        // Vérifier la structure après le texte descriptif
        console.log('\n📍 Position de la galerie:')
        const textIndex = data.indexOf('Des parcours conçus pour vous spécialiser')
        const galleryIndex = data.indexOf('Explorez nos formations par catégorie')
        
        if (textIndex > -1) {
          console.log('✅ Texte descriptif trouvé à la position:', textIndex)
          
          if (galleryIndex > -1) {
            console.log('✅ Galerie trouvée à la position:', galleryIndex)
            console.log(`${galleryIndex > textIndex ? '✅' : '❌'} Galerie après le texte: ${galleryIndex > textIndex}`)
          } else {
            console.log('❌ Galerie NON trouvée dans le HTML')
          }
        } else {
          console.log('❌ Texte descriptif NON trouvé')
        }
        
        // Extraire un échantillon autour du texte descriptif
        if (textIndex > -1) {
          const start = Math.max(0, textIndex - 200)
          const end = Math.min(data.length, textIndex + 1000)
          const sample = data.substring(start, end)
          
          console.log('\n📝 Échantillon HTML autour du texte:')
          console.log('---')
          console.log(sample.substring(0, 500) + '...')
          console.log('---')
        }
        
        resolve({
          hasFormationsSection: checks[0].found,
          hasDescriptiveText: checks[1].found,
          hasGallery: checks[2].found,
          hasCarousel: checks[3].found,
          hasFormationsData: checks[4].found,
          hasCategories: checks[5].found,
          hasErrors: checks[6].found,
          contentLength: data.length
        })
      })
    })
    
    req.on('error', reject)
    req.setTimeout(10000, () => {
      req.destroy()
      reject(new Error('Timeout'))
    })
    
    req.end()
  })
}

async function runDiagnostic() {
  try {
    const result = await testPageContent()
    
    console.log('\n🎯 Diagnostic:')
    
    if (!result.hasGallery) {
      console.log('❌ PROBLÈME: La galerie ne s\'affiche pas')
      console.log('\n💡 Causes possibles:')
      console.log('- Erreur dans le composant FormationsGallery')
      console.log('- Problème de chargement des données')
      console.log('- Erreur JavaScript côté client')
      console.log('- Composant non rendu par le serveur')
    } else {
      console.log('✅ La galerie est présente dans le HTML')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

runDiagnostic()