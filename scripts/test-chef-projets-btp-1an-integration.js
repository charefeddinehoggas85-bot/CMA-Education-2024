#!/usr/bin/env node

/**
 * Script de test pour vérifier l'intégration de la formation Chef de Projets BTP 1 an
 */

const STRAPI_URL = 'http://localhost:1337'

async function testChefProjetsBTP1anIntegration() {
  console.log('🧪 Test d\'intégration - Formation Chef de Projets BTP 1 an...\n')

  try {
    // 1. Test API Strapi
    console.log('📡 Test de l\'API Strapi...')
    const strapiResponse = await fetch(`${STRAPI_URL}/api/formations?filters[slug][$eq]=chef-projets-btp-1an&populate=*`)
    
    if (!strapiResponse.ok) {
      throw new Error(`Erreur API Strapi: ${strapiResponse.status}`)
    }
    
    const strapiData = await strapiResponse.json()
    
    if (strapiData.data && strapiData.data.length > 0) {
      const formation = strapiData.data[0]
      console.log('✅ Formation trouvée dans Strapi:')
      console.log(`   📋 Titre: ${formation.attributes.title}`)
      console.log(`   🔗 Slug: ${formation.attributes.slug}`)
      console.log(`   📊 Niveau: ${formation.attributes.level}`)
      console.log(`   ⏱️  Durée: ${formation.attributes.duration}`)
      console.log(`   🎯 Rythme: ${formation.attributes.rhythm || 'Non défini'}`)
      console.log(`   💰 Prix: ${formation.attributes.price}`)
      console.log(`   🎓 Alternance: ${formation.attributes.isAlternance}`)
    } else {
      console.log('❌ Formation non trouvée dans Strapi')
    }

    // 2. Test de la liste des formations
    console.log('\n📋 Test de la liste complète des formations...')
    const allFormationsResponse = await fetch(`${STRAPI_URL}/api/formations?populate=*&sort=ordre:asc`)
    
    if (allFormationsResponse.ok) {
      const allFormationsData = await allFormationsResponse.json()
      const chefProjetFormations = allFormationsData.data.filter(f => 
        f.attributes.title.toLowerCase().includes('chef de projets btp')
      )
      
      console.log(`✅ ${chefProjetFormations.length} formation(s) "Chef de Projets BTP" trouvée(s):`)
      chefProjetFormations.forEach(f => {
        console.log(`   • ${f.attributes.title} (${f.attributes.duration})`)
      })
    }

    // 3. Test des données statiques
    console.log('\n📊 Vérification des données statiques...')
    const fs = require('fs')
    const path = require('path')
    
    const staticDataPath = path.join(__dirname, '..', 'src/data/formations-static.ts')
    const staticContent = fs.readFileSync(staticDataPath, 'utf8')
    
    if (staticContent.includes('Chef de Projets BTP - Cursus 1 an')) {
      console.log('✅ Formation trouvée dans les données statiques')
      
      // Extraire les informations de la formation
      const match = staticContent.match(/title: "Chef de Projets BTP - Cursus 1 an"[\s\S]*?rhythm: "([^"]*)"/)
      if (match) {
        console.log(`   ⏱️  Rythme statique: ${match[1]}`)
      }
    } else {
      console.log('❌ Formation non trouvée dans les données statiques')
    }

    // 4. Test de l'URL de la formation
    console.log('\n🌐 Test de l\'URL de la formation...')
    try {
      const formationPageResponse = await fetch('http://localhost:3000/formations/chef-projets-btp-1an')
      console.log(`📄 Page formation: ${formationPageResponse.status === 200 ? '✅ Accessible' : '❌ Non accessible'}`)
    } catch (error) {
      console.log('⚠️  Impossible de tester l\'URL (serveur Next.js non démarré)')
    }

    // 5. Recommandations
    console.log('\n💡 Recommandations:')
    console.log('   1. Vérifier que la formation apparaît sur http://localhost:3000/formations')
    console.log('   2. Tester l\'accès à http://localhost:3000/formations/chef-projets-btp-1an')
    console.log('   3. Vérifier que les heures sont correctement affichées (697h)')
    console.log('   4. S\'assurer que la formation est dans la bonne catégorie')

    console.log('\n🎉 Test d\'intégration terminé!')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
    process.exit(1)
  }
}

// Exécution du script
testChefProjetsBTP1anIntegration()