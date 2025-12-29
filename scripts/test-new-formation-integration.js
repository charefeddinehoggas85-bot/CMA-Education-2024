#!/usr/bin/env node

/**
 * Test de l'intégration complète de la nouvelle formation Conducteur de Travaux TP
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'
const FRONTEND_URL = 'http://localhost:3001'
const FORMATION_SLUG = 'conducteur-travaux-tp-alternance'

async function testStrapiIntegration() {
  try {
    console.log('🔍 Test de l\'intégration Strapi...')
    
    // Test 1: Vérifier que la formation existe
    const formationsResponse = await axios.get(`${STRAPI_URL}/api/formations?populate=category`)
    const formations = formationsResponse.data.data
    
    const newFormation = formations.find(f => f.attributes.slug === FORMATION_SLUG)
    
    if (newFormation) {
      console.log('✅ Formation trouvée dans Strapi:')
      console.log(`   ID: ${newFormation.id}`)
      console.log(`   Titre: ${newFormation.attributes.title}`)
      console.log(`   Niveau: ${newFormation.attributes.level}`)
      console.log(`   RNCP: ${newFormation.attributes.rncp}`)
      console.log(`   Catégorie: ${newFormation.attributes.category?.data?.attributes?.name}`)
      console.log(`   Durée: ${newFormation.attributes.duree}`)
      console.log(`   Coût: ${newFormation.attributes.cout}`)
      
      // Test 2: Vérifier les champs requis
      const requiredFields = ['shortDesc', 'fullDesc', 'objectifs', 'debouches', 'prerequis']
      console.log('\n📋 Vérification des champs requis:')
      requiredFields.forEach(field => {
        const hasField = newFormation.attributes[field] !== null && newFormation.attributes[field] !== undefined
        console.log(`   ${field}: ${hasField ? '✅' : '❌'}`)
      })
      
      return newFormation
    } else {
      console.log('❌ Formation non trouvée dans Strapi')
      return null
    }
  } catch (error) {
    console.error('❌ Erreur lors du test Strapi:', error.message)
    return null
  }
}

async function testCategoryIntegration() {
  try {
    console.log('\n🏷️ Test de l\'intégration dans la catégorie alternance...')
    
    const response = await axios.get(`${STRAPI_URL}/api/formations?filters[category][slug][$eq]=alternance&populate=category`)
    const alternanceFormations = response.data.data
    
    console.log(`✅ ${alternanceFormations.length} formations en alternance trouvées`)
    
    const newFormation = alternanceFormations.find(f => f.attributes.slug === FORMATION_SLUG)
    
    if (newFormation) {
      console.log('✅ Nouvelle formation bien classée en alternance')
      
      console.log('\n📚 Toutes les formations alternance:')
      alternanceFormations.forEach((f, index) => {
        const isNew = f.attributes.slug === FORMATION_SLUG
        console.log(`   ${index + 1}. ${f.attributes.title} ${isNew ? '🆕' : ''}`)
      })
      
      return true
    } else {
      console.log('❌ Formation non trouvée dans la catégorie alternance')
      return false
    }
  } catch (error) {
    console.error('❌ Erreur lors du test catégorie:', error.message)
    return false
  }
}

async function testFrontendPage() {
  try {
    console.log('\n🌐 Test de la page frontend...')
    
    const response = await axios.get(`${FRONTEND_URL}/formations/${FORMATION_SLUG}`, {
      timeout: 10000
    })
    
    if (response.status === 200) {
      console.log('✅ Page de formation accessible')
      
      // Vérifier le contenu de base
      const content = response.data
      const hasTitle = content.includes('Conducteur de Travaux, Travaux Publics')
      const hasRNCP = content.includes('RNCP38549')
      const hasLevel = content.includes('BAC+2')
      
      console.log(`   Titre présent: ${hasTitle ? '✅' : '❌'}`)
      console.log(`   RNCP présent: ${hasRNCP ? '✅' : '❌'}`)
      console.log(`   Niveau présent: ${hasLevel ? '✅' : '❌'}`)
      
      return hasTitle && hasRNCP && hasLevel
    } else {
      console.log('❌ Page de formation non accessible')
      return false
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('⚠️ Frontend non accessible - Vérifiez que le serveur de dev est lancé')
    } else {
      console.error('❌ Erreur lors du test frontend:', error.message)
    }
    return false
  }
}

async function testDropdownIntegration() {
  try {
    console.log('\n📋 Test de l\'intégration dans le dropdown...')
    
    // Tester l'API utilisée par le dropdown
    const categoriesResponse = await axios.get(`${STRAPI_URL}/api/formation-categories`)
    const formationsResponse = await axios.get(`${STRAPI_URL}/api/formations?populate=category`)
    
    const categories = categoriesResponse.data.data
    const formations = formationsResponse.data.data
    
    // Organiser comme le fait le dropdown
    const categoriesWithFormations = categories.map(category => {
      const categoryFormations = formations.filter(formation => 
        formation.attributes.category?.data?.attributes?.slug === category.attributes.slug
      )
      
      return {
        name: category.attributes.name,
        slug: category.attributes.slug,
        formations: categoryFormations
      }
    })
    
    const alternanceCategory = categoriesWithFormations.find(cat => cat.slug === 'alternance')
    
    if (alternanceCategory) {
      console.log(`✅ Catégorie alternance: ${alternanceCategory.formations.length} formations`)
      
      const hasNewFormation = alternanceCategory.formations.some(f => 
        f.attributes.slug === FORMATION_SLUG
      )
      
      if (hasNewFormation) {
        console.log('✅ Nouvelle formation présente dans le dropdown')
        
        console.log('\n📋 Formations alternance dans le dropdown:')
        alternanceCategory.formations.forEach((f, index) => {
          const isNew = f.attributes.slug === FORMATION_SLUG
          console.log(`   ${index + 1}. ${f.attributes.title} ${isNew ? '🆕' : ''}`)
        })
        
        return true
      } else {
        console.log('❌ Nouvelle formation absente du dropdown')
        return false
      }
    } else {
      console.log('❌ Catégorie alternance non trouvée')
      return false
    }
  } catch (error) {
    console.error('❌ Erreur lors du test dropdown:', error.message)
    return false
  }
}

async function testFormationDetails() {
  try {
    console.log('\n📄 Test des détails de la formation...')
    
    const response = await axios.get(`${STRAPI_URL}/api/formations?filters[slug][$eq]=${FORMATION_SLUG}&populate=*`)
    const formation = response.data.data[0]
    
    if (formation) {
      console.log('✅ Détails de la formation récupérés')
      
      const attrs = formation.attributes
      console.log('\n📋 Contenu vérifié:')
      console.log(`   Description courte: ${attrs.shortDesc ? '✅' : '❌'} (${attrs.shortDesc?.length || 0} chars)`)
      console.log(`   Description complète: ${attrs.fullDesc ? '✅' : '❌'} (${attrs.fullDesc?.length || 0} chars)`)
      console.log(`   Objectifs: ${attrs.objectifs ? '✅' : '❌'}`)
      console.log(`   Débouchés: ${attrs.debouches ? '✅' : '❌'}`)
      console.log(`   Prérequis: ${attrs.prerequis ? '✅' : '❌'}`)
      console.log(`   Rythme: ${attrs.rythme ? '✅' : '❌'}`)
      console.log(`   Coût: ${attrs.cout ? '✅' : '❌'}`)
      
      return true
    } else {
      console.log('❌ Détails de formation non trouvés')
      return false
    }
  } catch (error) {
    console.error('❌ Erreur lors du test des détails:', error.message)
    return false
  }
}

async function main() {
  console.log('🧪 Test complet de l\'intégration de la formation "Conducteur de Travaux, Travaux Publics"\n')
  
  // Tests séquentiels
  const strapiOK = await testStrapiIntegration()
  const categoryOK = await testCategoryIntegration()
  const dropdownOK = await testDropdownIntegration()
  const detailsOK = await testFormationDetails()
  const frontendOK = await testFrontendPage()
  
  // Résumé
  console.log('\n📊 Résumé des tests:')
  console.log(`   Strapi: ${strapiOK ? '✅' : '❌'}`)
  console.log(`   Catégorie: ${categoryOK ? '✅' : '❌'}`)
  console.log(`   Dropdown: ${dropdownOK ? '✅' : '❌'}`)
  console.log(`   Détails: ${detailsOK ? '✅' : '❌'}`)
  console.log(`   Frontend: ${frontendOK ? '✅' : '❌'}`)
  
  const allTestsPassed = strapiOK && categoryOK && dropdownOK && detailsOK && frontendOK
  
  if (allTestsPassed) {
    console.log('\n🎉 Tous les tests sont passés avec succès!')
    console.log('✅ La formation "Conducteur de Travaux, Travaux Publics" est parfaitement intégrée')
    console.log('\n💡 Vous pouvez maintenant:')
    console.log('1. Voir la formation dans le dropdown sur http://localhost:3001')
    console.log('2. Accéder à la page détaillée sur http://localhost:3001/formations/conducteur-travaux-tp-alternance')
    console.log('3. Modifier le contenu via l\'admin Strapi')
  } else {
    console.log('\n⚠️ Certains tests ont échoué')
    console.log('🔧 Vérifiez les points en erreur ci-dessus')
  }
}

main().catch(console.error)