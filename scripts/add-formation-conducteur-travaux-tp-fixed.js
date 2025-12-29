#!/usr/bin/env node

/**
 * Script pour ajouter la formation "Conducteur de Travaux, Travaux Publics" à Strapi
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'

const formationData = {
  title: "Conducteur de Travaux, Travaux Publics",
  slug: "conducteur-travaux-tp-alternance",
  level: "BAC+2 (niveau 5)",
  duree: "1 an",
  rncp: "RNCP38549",
  
  // Champs requis
  shortDesc: "Formation professionnalisante pour devenir conducteur de travaux publics capable de préparer, coordonner et piloter des chantiers d'infrastructures (voirie, réseaux, assainissement, ouvrages d'art, etc.).",
  
  fullDesc: "Cette formation professionnalisante, directement ancrée dans les réalités du terrain, vous forme en tant que conducteur de travaux publics capables de préparer, coordonner et piloter des chantiers d'infrastructures. Grâce à l'alternance, les apprenants deviennent rapidement opérationnels, répondant aux besoins concrets du secteur des travaux publics.",
  
  rythme: "17 semaines à l'école, 35 semaines en entreprise",
  cout: "9548€ HT (prise en charge OPCO)",
  tauxReussite: "95%",
  tauxInsertion: "92%",
  isActive: true,
  ordre: 20,
  
  // Objectifs structurés
  objectifs: {
    introduction: "Cette formation professionnalisante, directement ancrée dans les réalités du terrain, vous forme en tant que conducteur de travaux publics capables de préparer, coordonner et piloter des chantiers d'infrastructures (voirie, réseaux, assainissement, ouvrages d'art, etc.). Elle permet d'acquérir des compétences techniques, organisationnelles et réglementaires immédiatement applicables en entreprise. Grâce à l'alternance, les apprenants deviennent rapidement opérationnels, répondant aux besoins concrets du secteur des travaux publics.",
    competences: [
      "Planifier, organiser et suivre l'exécution de chantiers de travaux publics",
      "Gérer les budgets, contrats, achats et marges financières d'un projet", 
      "Superviser les équipes sur le terrain et coordonner les différents corps de métier",
      "Veiller au respect des délais, des normes de sécurité, de qualité et des enjeux environnementaux",
      "Assurer la communication avec les riverains, les prestataires, les autorités locales et les donneurs d'ordre"
    ]
  },
  
  // Débouchés structurés
  debouches: {
    description: "Cette formation vous permet d'accéder à des postes clés dans le secteur des travaux publics.",
    postes: [
      "Conducteur(trice) de travaux TP",
      "Chef de chantier TP", 
      "Coordinateur de travaux",
      "Chargé(e) d'études techniques",
      "Assistant(e) maître d'œuvre TP"
    ],
    secteurs: [
      "Entreprises de travaux publics",
      "Bureaux d'études techniques",
      "Collectivités territoriales",
      "Maîtrise d'œuvre publique et privée"
    ]
  },
  
  // Prérequis structurés
  prerequis: {
    diplomes: [
      "Être titulaire du baccalauréat",
      "Avoir un niveau bac avec au moins 3 ans d'expérience dans le BTP ou dans la gestion d'équipe"
    ],
    competences: [
      "Aptitudes relationnelles et organisationnelles",
      "Goût pour le terrain et les défis techniques"
    ]
  }
}

async function checkFormationCategory() {
  try {
    console.log('🔍 Vérification de la catégorie "alternance"...')
    
    const response = await axios.get(`${STRAPI_URL}/api/formation-categories`)
    const categories = response.data.data
    
    const alternanceCategory = categories.find(cat => 
      cat.attributes.slug === 'alternance' || 
      cat.attributes.name.toLowerCase().includes('alternance')
    )
    
    if (alternanceCategory) {
      console.log('✅ Catégorie alternance trouvée:', {
        id: alternanceCategory.id,
        name: alternanceCategory.attributes.name,
        slug: alternanceCategory.attributes.slug
      })
      return alternanceCategory.id
    } else {
      console.log('❌ Catégorie alternance non trouvée')
      return null
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de la catégorie:', error.message)
    return null
  }
}

async function checkExistingFormation() {
  try {
    console.log('🔍 Vérification si la formation existe déjà...')
    
    const response = await axios.get(`${STRAPI_URL}/api/formations`)
    const formations = response.data.data
    
    const existingFormation = formations.find(formation => 
      formation.attributes.slug === formationData.slug ||
      formation.attributes.title.includes('Conducteur de Travaux, Travaux Publics') ||
      formation.attributes.rncp === formationData.rncp
    )
    
    if (existingFormation) {
      console.log('⚠️ Formation similaire trouvée:', {
        id: existingFormation.id,
        title: existingFormation.attributes.title,
        slug: existingFormation.attributes.slug
      })
      return existingFormation
    }
    
    console.log('ℹ️ Aucune formation similaire trouvée')
    return null
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message)
    return null
  }
}

async function addFormationToStrapi(categoryId) {
  try {
    console.log('📝 Ajout de la formation à Strapi...')
    
    const strapiData = {
      data: {
        ...formationData,
        category: categoryId,
        publishedAt: new Date().toISOString()
      }
    }
    
    const response = await axios.post(
      `${STRAPI_URL}/api/formations`,
      strapiData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('✅ Formation ajoutée avec succès!')
    console.log('📄 Détails de la formation créée:')
    console.log(`   ID: ${response.data.data.id}`)
    console.log(`   Titre: ${response.data.data.attributes.title}`)
    console.log(`   Slug: ${response.data.data.attributes.slug}`)
    console.log(`   RNCP: ${response.data.data.attributes.rncp}`)
    
    return response.data.data
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout:', error.response?.data || error.message)
    return null
  }
}

async function updateExistingFormation(formationId, categoryId) {
  try {
    console.log(`📝 Mise à jour de la formation existante (ID: ${formationId})...`)
    
    const strapiData = {
      data: {
        ...formationData,
        category: categoryId,
        publishedAt: new Date().toISOString()
      }
    }
    
    const response = await axios.put(
      `${STRAPI_URL}/api/formations/${formationId}`,
      strapiData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('✅ Formation mise à jour avec succès!')
    return response.data.data
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error.response?.data || error.message)
    return null
  }
}

async function createFormationPage(slug) {
  try {
    console.log('📄 Création de la page de formation...')
    
    const pageDir = `src/app/formations/${slug}`
    const pageContent = `import FormationDetailClient from '@/components/sections/FormationDetailClient'

export default function ConducteurTravauxTPPage() {
  return <FormationDetailClient slug="${slug}" />
}

export async function generateMetadata() {
  return {
    title: "Formation Conducteur de Travaux Publics BAC+2 en Alternance | CMA Education",
    description: "Formation professionnalisante de Conducteur de Travaux Publics en alternance. Niveau BAC+2, RNCP38549. Spécialisez-vous dans les infrastructures, voirie, réseaux.",
    keywords: "conducteur travaux publics, formation alternance, travaux publics, infrastructure, voirie, réseaux, VRD, BAC+2, RNCP38549"
  }
}`
    
    console.log('ℹ️ Contenu de la page généré')
    console.log(`📁 Chemin: ${pageDir}/page.tsx`)
    console.log('📝 Contenu:')
    console.log(pageContent)
    
    return true
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page:', error.message)
    return false
  }
}

async function testFormationInDropdown() {
  try {
    console.log('🧪 Test de la formation dans le dropdown...')
    
    // Vérifier que la formation apparaît dans l'API formations
    const response = await axios.get(`${STRAPI_URL}/api/formations?populate=category`)
    const formations = response.data.data
    
    const newFormation = formations.find(f => f.attributes.slug === formationData.slug)
    
    if (newFormation) {
      console.log('✅ Formation trouvée dans l\'API')
      console.log(`   Catégorie: ${newFormation.attributes.category?.data?.attributes?.name || 'Non définie'}`)
      
      // Vérifier les formations de la catégorie alternance
      const alternanceFormations = formations.filter(f => 
        f.attributes.category?.data?.attributes?.slug === 'alternance'
      )
      
      console.log(`✅ ${alternanceFormations.length} formations en alternance trouvées`)
      console.log('   Formations alternance:')
      alternanceFormations.forEach(f => {
        console.log(`     • ${f.attributes.title}`)
      })
      
      return true
    } else {
      console.log('❌ Formation non trouvée dans l\'API')
      return false
    }
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
    return false
  }
}

async function main() {
  console.log('🚀 Ajout de la formation "Conducteur de Travaux, Travaux Publics"\n')
  
  // 1. Vérifier la catégorie alternance
  const categoryId = await checkFormationCategory()
  if (!categoryId) {
    console.log('❌ Impossible de continuer sans catégorie alternance')
    return
  }
  
  // 2. Vérifier si la formation existe déjà
  const existingFormation = await checkExistingFormation()
  
  let result
  if (existingFormation) {
    // 3a. Mettre à jour la formation existante
    result = await updateExistingFormation(existingFormation.id, categoryId)
  } else {
    // 3b. Ajouter la nouvelle formation
    result = await addFormationToStrapi(categoryId)
  }
  
  if (result) {
    // 4. Créer la page de formation
    await createFormationPage(formationData.slug)
    
    // 5. Tester l'intégration
    await testFormationInDropdown()
    
    console.log('\n🎉 Formation "Conducteur de Travaux, Travaux Publics" ajoutée avec succès!')
    console.log('\n💡 Prochaines étapes:')
    console.log('1. Vérifiez la formation dans l\'admin Strapi')
    console.log('2. Testez l\'affichage dans le dropdown formations')
    console.log('3. Créez la page dédiée manuellement si nécessaire')
    console.log('4. Ajoutez une image de formation si disponible')
    console.log('\n🔗 URLs importantes:')
    console.log(`   Admin Strapi: http://localhost:1337/admin/content-manager/collectionType/api::formation.formation/${result.id}`)
    console.log(`   Page frontend: http://localhost:3001/formations/${formationData.slug}`)
    console.log(`   Dropdown test: http://localhost:3001 (menu Formations)`)
  }
}

main().catch(console.error)