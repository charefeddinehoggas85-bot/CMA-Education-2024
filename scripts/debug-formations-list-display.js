#!/usr/bin/env node

/**
 * Script de diagnostic pour identifier pourquoi la formation Chef de Projets BTP 1 an
 * n'apparaît pas dans la liste des formations
 */

const STRAPI_URL = 'http://localhost:1337'

async function debugFormationsListDisplay() {
  console.log('🔍 Diagnostic - Affichage de la liste des formations...\n')

  try {
    // 1. Vérifier toutes les formations dans Strapi
    console.log('📋 1. Vérification de toutes les formations dans Strapi...')
    const allFormationsResponse = await fetch(`${STRAPI_URL}/api/formations?populate=*&sort=ordre:asc`)
    
    if (!allFormationsResponse.ok) {
      throw new Error(`Erreur API Strapi: ${allFormationsResponse.status}`)
    }
    
    const allFormationsData = await allFormationsResponse.json()
    
    console.log(`✅ ${allFormationsData.data.length} formations trouvées dans Strapi:`)
    allFormationsData.data.forEach((formation, index) => {
      console.log(`   ${index + 1}. ${formation.attributes.title}`)
      console.log(`      • ID: ${formation.id}`)
      console.log(`      • Slug: ${formation.attributes.slug}`)
      console.log(`      • Ordre: ${formation.attributes.ordre}`)
      console.log(`      • Actif: ${formation.attributes.isActive}`)
      console.log(`      • Publié: ${formation.attributes.publishedAt ? 'Oui' : 'Non'}`)
      console.log(`      • Catégorie: ${formation.attributes.category?.data?.attributes?.name || 'Aucune'}`)
      console.log('')
    })

    // 2. Vérifier spécifiquement la formation Chef de Projets BTP 1 an
    console.log('🎯 2. Vérification spécifique de la formation Chef de Projets BTP 1 an...')
    const chefProjetsResponse = await fetch(`${STRAPI_URL}/api/formations?filters[slug][$eq]=chef-projets-btp-1an&populate=*`)
    const chefProjetsData = await chefProjetsResponse.json()
    
    if (chefProjetsData.data && chefProjetsData.data.length > 0) {
      const formation = chefProjetsData.data[0]
      console.log('✅ Formation Chef de Projets BTP 1 an trouvée:')
      console.log(`   • ID: ${formation.id}`)
      console.log(`   • Titre: ${formation.attributes.title}`)
      console.log(`   • Slug: ${formation.attributes.slug}`)
      console.log(`   • Ordre: ${formation.attributes.ordre}`)
      console.log(`   • Actif: ${formation.attributes.isActive}`)
      console.log(`   • Publié: ${formation.attributes.publishedAt ? 'Oui' : 'Non'}`)
      console.log(`   • Date publication: ${formation.attributes.publishedAt}`)
      console.log(`   • Catégorie: ${formation.attributes.category?.data?.attributes?.name || 'Aucune'}`)
      console.log(`   • Durée: ${formation.attributes.duree}`)
      console.log(`   • Volume horaire: ${formation.attributes.volumeHoraire}`)
    } else {
      console.log('❌ Formation Chef de Projets BTP 1 an non trouvée')
    }

    // 3. Vérifier les catégories
    console.log('\n📂 3. Vérification des catégories...')
    const categoriesResponse = await fetch(`${STRAPI_URL}/api/formation-categories?populate=*`)
    
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json()
      console.log(`✅ ${categoriesData.data.length} catégories trouvées:`)
      categoriesData.data.forEach(cat => {
        console.log(`   • ${cat.attributes.name} (slug: ${cat.attributes.slug})`)
      })
    }

    // 4. Vérifier les formations par catégorie alternance
    console.log('\n🔄 4. Vérification des formations en alternance...')
    const alternanceResponse = await fetch(`${STRAPI_URL}/api/formations?filters[category][slug][$eq]=alternance&populate=*&sort=ordre:asc`)
    
    if (alternanceResponse.ok) {
      const alternanceData = await alternanceResponse.json()
      console.log(`✅ ${alternanceData.data.length} formations en alternance:`)
      alternanceData.data.forEach(f => {
        console.log(`   • ${f.attributes.title} (ordre: ${f.attributes.ordre})`)
      })
    }

    // 5. Test de l'API frontend
    console.log('\n🌐 5. Test de l\'API utilisée par le frontend...')
    try {
      // Simuler l'appel que fait le frontend
      const frontendResponse = await fetch('http://localhost:3000/api/formations')
      if (frontendResponse.ok) {
        const frontendData = await frontendResponse.json()
        console.log(`✅ API frontend: ${frontendData.length} formations`)
        
        const chefProjetsInFrontend = frontendData.find(f => f.slug === 'chef-projets-btp-1an')
        if (chefProjetsInFrontend) {
          console.log('✅ Formation Chef de Projets BTP 1 an trouvée dans l\'API frontend')
        } else {
          console.log('❌ Formation Chef de Projets BTP 1 an NON trouvée dans l\'API frontend')
        }
      } else {
        console.log('⚠️  API frontend non accessible')
      }
    } catch (error) {
      console.log('⚠️  Impossible de tester l\'API frontend (serveur Next.js non démarré)')
    }

    // 6. Vérifier les données statiques
    console.log('\n📊 6. Vérification des données statiques...')
    const fs = require('fs')
    const path = require('path')
    
    const staticDataPath = path.join(__dirname, '..', 'src/data/formations-static.ts')
    const staticContent = fs.readFileSync(staticDataPath, 'utf8')
    
    // Compter les formations dans formationsAlternance
    const alternanceMatches = staticContent.match(/export const formationsAlternance = \[([\s\S]*?)\]/)[1]
    const formationCount = (alternanceMatches.match(/{\s*id:/g) || []).length
    console.log(`✅ ${formationCount} formations dans formationsAlternance (données statiques)`)
    
    if (staticContent.includes('Chef de Projets BTP - Cursus 1 an')) {
      console.log('✅ Formation Chef de Projets BTP 1 an trouvée dans les données statiques')
    } else {
      console.log('❌ Formation Chef de Projets BTP 1 an NON trouvée dans les données statiques')
    }

    // 7. Recommandations de correction
    console.log('\n💡 7. Recommandations de correction:')
    
    if (chefProjetsData.data && chefProjetsData.data.length > 0) {
      const formation = chefProjetsData.data[0]
      
      if (!formation.attributes.publishedAt) {
        console.log('   ❌ PROBLÈME: Formation non publiée dans Strapi')
        console.log('   🔧 SOLUTION: Publier la formation dans Strapi')
      }
      
      if (!formation.attributes.isActive) {
        console.log('   ❌ PROBLÈME: Formation inactive')
        console.log('   🔧 SOLUTION: Activer la formation (isActive: true)')
      }
      
      if (!formation.attributes.category?.data) {
        console.log('   ❌ PROBLÈME: Formation sans catégorie')
        console.log('   🔧 SOLUTION: Assigner la formation à la catégorie "alternance"')
      }
      
      if (formation.attributes.ordre === null || formation.attributes.ordre === undefined) {
        console.log('   ❌ PROBLÈME: Formation sans ordre de tri')
        console.log('   🔧 SOLUTION: Définir un ordre de tri')
      }
    }
    
    console.log('\n🎯 Actions à effectuer:')
    console.log('   1. Vérifier que la formation est publiée dans Strapi')
    console.log('   2. Vérifier que la formation est active (isActive: true)')
    console.log('   3. Assigner la formation à la bonne catégorie')
    console.log('   4. Définir un ordre de tri approprié')
    console.log('   5. Redémarrer le serveur Next.js si nécessaire')
    
  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error.message)
  }
}

// Exécution du script
debugFormationsListDisplay()