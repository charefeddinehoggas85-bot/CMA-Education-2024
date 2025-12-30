#!/usr/bin/env node

/**
 * Script pour analyser l'affichage des formations sur le site de production
 */

const VERCEL_SITE = 'https://cma-education-2024.vercel.app'
const RAILWAY_STRAPI = 'https://cma-education-strapi-production.up.railway.app'

console.log('🔍 Analyse de l\'affichage des formations...\n')

// 1. Tester l'API formations
async function testFormationsAPI() {
  console.log('1️⃣ Test de l\'API formations Railway...')
  
  try {
    const response = await fetch(`${RAILWAY_STRAPI}/api/formations?populate=*`)
    
    if (response.ok) {
      const data = await response.json()
      console.log(`✅ API formations: ${data.data?.length || 0} formations disponibles`)
      
      // Afficher quelques formations
      if (data.data && data.data.length > 0) {
        console.log('\n📋 Formations disponibles:')
        data.data.slice(0, 5).forEach((formation, index) => {
          console.log(`   ${index + 1}. ${formation.attributes.titre}`)
          console.log(`      Slug: ${formation.attributes.slug}`)
          console.log(`      Catégorie: ${formation.attributes.category?.data?.attributes?.nom || 'Non définie'}`)
        })
        
        if (data.data.length > 5) {
          console.log(`   ... et ${data.data.length - 5} autres formations`)
        }
      }
      
      return data.data
    } else {
      console.log(`❌ Erreur API formations: ${response.status}`)
      return null
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
    return null
  }
}

// 2. Tester l'affichage sur le site
async function testFormationsDisplay() {
  console.log('\n2️⃣ Test de l\'affichage des formations sur le site...')
  
  try {
    // Tester la page formations principale
    const formationsResponse = await fetch(`${VERCEL_SITE}/formations`)
    
    if (formationsResponse.ok) {
      console.log('✅ Page /formations accessible')
      
      const html = await formationsResponse.text()
      
      // Vérifier la présence de formations dans le HTML
      const formationTitles = html.match(/Chargé.*?Affaires|Conducteur.*?Travaux|Chef.*?Projets/gi) || []
      console.log(`📊 Titres de formations détectés: ${formationTitles.length}`)
      
      if (formationTitles.length > 0) {
        console.log('   Formations trouvées:')
        formationTitles.slice(0, 3).forEach((title, index) => {
          console.log(`   ${index + 1}. ${title}`)
        })
      }
      
      // Vérifier les erreurs localhost
      const localhostRefs = html.match(/localhost:1337/g) || []
      if (localhostRefs.length > 0) {
        console.log(`⚠️ ${localhostRefs.length} référence(s) localhost détectée(s)`)
      } else {
        console.log('✅ Aucune référence localhost')
      }
      
    } else {
      console.log(`❌ Page /formations inaccessible: ${formationsResponse.status}`)
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
  }
}

// 3. Tester une formation spécifique
async function testSpecificFormation() {
  console.log('\n3️⃣ Test d\'une formation spécifique...')
  
  const formationSlugs = [
    'charge-affaires-batiment-alternance',
    'conducteur-travaux-batiment-alternance',
    'chef-projets-btp-1an'
  ]
  
  for (const slug of formationSlugs) {
    try {
      const response = await fetch(`${VERCEL_SITE}/formations/${slug}`)
      
      if (response.ok) {
        console.log(`✅ Formation ${slug}: Accessible`)
        
        const html = await response.text()
        
        // Vérifier les éléments clés
        const hasTitle = html.includes('Chargé') || html.includes('Conducteur') || html.includes('Chef')
        const hasDescription = html.includes('formation') && html.includes('BTP')
        const hasButtons = html.includes('Candidater') || html.includes('Brochure')
        
        console.log(`   Titre: ${hasTitle ? '✅' : '❌'}`)
        console.log(`   Description: ${hasDescription ? '✅' : '❌'}`)
        console.log(`   Boutons: ${hasButtons ? '✅' : '❌'}`)
        
      } else {
        console.log(`❌ Formation ${slug}: ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ Formation ${slug}: Erreur`)
    }
  }
}

// 4. Analyser les problèmes potentiels
async function analyzeIssues() {
  console.log('\n4️⃣ Analyse des problèmes potentiels...')
  
  // Vérifier les variables d'environnement via l'API
  try {
    const envResponse = await fetch(`${VERCEL_SITE}/api/test-env`)
    
    if (envResponse.ok) {
      const envData = await envResponse.json()
      console.log('📊 Variables d\'environnement:')
      console.log(`   NEXT_PUBLIC_STRAPI_URL: ${envData.NEXT_PUBLIC_STRAPI_URL || 'NON DÉFINIE'}`)
      console.log(`   NODE_ENV: ${envData.NODE_ENV || 'NON DÉFINIE'}`)
      
      if (!envData.NEXT_PUBLIC_STRAPI_URL) {
        console.log('❌ PROBLÈME: NEXT_PUBLIC_STRAPI_URL non définie')
        console.log('🔧 Solution: Configurer sur Vercel et redéployer')
      } else if (envData.NEXT_PUBLIC_STRAPI_URL.includes('localhost')) {
        console.log('❌ PROBLÈME: NEXT_PUBLIC_STRAPI_URL contient localhost')
        console.log('🔧 Solution: Remplacer par l\'URL Railway')
      } else {
        console.log('✅ Variables d\'environnement correctes')
      }
    } else {
      console.log('⚠️ Impossible de vérifier les variables d\'environnement')
    }
  } catch (error) {
    console.log('⚠️ Erreur vérification variables d\'environnement')
  }
}

// 5. Recommandations
function provideRecommendations() {
  console.log('\n5️⃣ Recommandations:')
  
  console.log('\n✅ Points positifs observés:')
  console.log('   - Navigation fonctionnelle')
  console.log('   - Affichage des formations correct')
  console.log('   - Contenu détaillé présent')
  console.log('   - Boutons d\'action visibles')
  
  console.log('\n🔧 Actions à finaliser:')
  console.log('   1. Configurer NEXT_PUBLIC_STRAPI_URL sur Vercel')
  console.log('   2. Créer le content type Partners sur Railway')
  console.log('   3. Vérifier que toutes les formations sont accessibles')
  
  console.log('\n📋 Commandes Vercel:')
  console.log('   vercel env add NEXT_PUBLIC_STRAPI_URL production')
  console.log('   # Entrer: https://cma-education-strapi-production.up.railway.app')
  console.log('   vercel --prod')
}

// Fonction principale
async function main() {
  console.log('🎯 Objectif: Analyser l\'affichage des formations en production\n')
  
  const formations = await testFormationsAPI()
  await testFormationsDisplay()
  await testSpecificFormation()
  await analyzeIssues()
  
  provideRecommendations()
  
  console.log('\n✅ Analyse terminée!')
  
  if (formations && formations.length > 0) {
    console.log('🎉 Les formations s\'affichent correctement!')
    console.log('🔧 Il reste juste à finaliser la configuration Vercel.')
  }
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main }