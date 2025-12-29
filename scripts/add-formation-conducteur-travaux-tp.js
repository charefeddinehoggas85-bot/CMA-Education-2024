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
  modalite: "Alternance",
  type: "Formation en alternance",
  
  // Description courte pour les listes
  description: "Formation professionnalisante pour devenir conducteur de travaux publics capable de préparer, coordonner et piloter des chantiers d'infrastructures (voirie, réseaux, assainissement, ouvrages d'art, etc.).",
  
  // Objectifs détaillés
  objectifs: `Cette formation professionnalisante, directement ancrée dans les réalités du terrain, vous forme en tant que conducteur de travaux publics capables de préparer, coordonner et piloter des chantiers d'infrastructures (voirie, réseaux, assainissement, ouvrages d'art, etc.). Elle permet d'acquérir des compétences techniques, organisationnelles et réglementaires immédiatement applicables en entreprise. Grâce à l'alternance, les apprenants deviennent rapidement opérationnels, répondant aux besoins concrets du secteur des travaux publics.

À l'issue de la formation, vous serez capable de :
1. Planifier, organiser et suivre l'exécution de chantiers de travaux publics
2. Gérer les budgets, contrats, achats et marges financières d'un projet
3. Superviser les équipes sur le terrain et coordonner les différents corps de métier
4. Veiller au respect des délais, des normes de sécurité, de qualité et des enjeux environnementaux
5. Assurer la communication avec les riverains, les prestataires, les autorités locales et les donneurs d'ordre`,

  // Programme détaillé
  programme: `## Le programme en 4 points

### Techniques des travaux publics
Terrassement, voirie, réseaux divers (VRD), fondations, ouvrages d'art, DAO/CAO, plans topographiques

### Gestion financière & réglementaire
Étude de prix TP, marges, DGD, droit des marchés publics, qualité, sécurité, AIPR, environnement

### Préparation et conduite de chantier
Élaboration des budgets, gestion des plannings, suivi de l'exécution, gestion des imprévus

### Communication & coordination
Animation de réunions, communication écrite et orale, gestion des relations avec les acteurs du chantier`,

  // Débouchés
  debouches: `Cette formation vous permet d'accéder à des postes clés dans le secteur des travaux publics. Vous pourrez exercer en tant que conducteur(trice) de travaux TP, avec la responsabilité complète de chantiers d'infrastructures. Selon votre profil et votre évolution, vous pourrez également devenir chef de chantier TP, coordinateur de travaux, ou intégrer un bureau d'études comme chargé(e) d'études techniques. Vous pourrez aussi intervenir en tant qu'assistant(e) maître d'œuvre TP, en appui à la conduite de projets publics ou privés.`,

  // Poursuites d'études
  poursuites: `Après l'obtention de votre formation niveau bac +2, plusieurs options s'offrent à vous pour élargir vos compétences ou viser des postes à responsabilité :

• Responsable Travaux – Parcours Travaux Publics (CMA)
• Double parcours : Responsable Travaux (Bâtiment) / Coordinateur BIM du Bâtiment
• Passerelles vers d'autres écoles spécialisées en ingénierie ou management de projet BTP

Ces poursuites d'études vous permettront de vous spécialiser, d'accéder à des fonctions d'encadrement et d'évoluer vers des projets d'envergure, notamment dans les grands groupes ou les marchés publics.`,

  // Informations pratiques
  dureeDetails: `**Durée totale :** 1 an
**Volume horaire :** 595 heures
**17 semaines** à l'école
**35 semaines** en entreprise
**Type de contrat :** Apprentissage ou Contrat de professionnalisation
**Modalité :** Formation 100% en présentiel
**Participants :** 20 maximum par session`,

  cout: "9548€ HT (PRISE EN CHARGE PAR L'OPCO – AUCUN FRAIS À LA CHARGE DES ALTERNANTS)",

  prerequis: `• Être titulaire du baccalauréat
• Avoir un niveau bac avec au moins 3 ans d'expérience dans le BTP ou dans la gestion d'équipe`,

  evaluation: `• Contrôle continu en cours de formation
• Épreuve de synthèse (écrite + orale)
• Dossier professionnel (CRAMP)
• Entretien final avec jury à partir des productions du candidat
• 4 projets tutorés concrets`,

  // Métadonnées
  featured: true,
  actif: true,
  ordre: 5,
  
  // SEO
  metaTitle: "Formation Conducteur de Travaux Publics BAC+2 en Alternance | CMA Education",
  metaDescription: "Formation professionnalisante de Conducteur de Travaux Publics en alternance. Niveau BAC+2, RNCP38549. Spécialisez-vous dans les infrastructures, voirie, réseaux.",
  
  // Mots-clés pour le référencement
  keywords: "conducteur travaux publics, formation alternance, travaux publics, infrastructure, voirie, réseaux, VRD, BAC+2, RNCP38549"
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

async function createFormationPage() {
  try {
    console.log('📄 Création de la page de formation...')
    
    // Créer le fichier de page pour cette formation
    const pageContent = `import FormationDetailClient from '@/components/sections/FormationDetailClient'

export default function ConducteurTravauxTPPage() {
  return <FormationDetailClient slug="conducteur-travaux-tp-alternance" />
}

export async function generateMetadata() {
  return {
    title: "${formationData.metaTitle}",
    description: "${formationData.metaDescription}",
    keywords: "${formationData.keywords}"
  }
}`
    
    // Note: En production, vous devriez créer le fichier de page
    console.log('ℹ️ Contenu de la page généré (à créer manuellement si nécessaire)')
    console.log('📁 Chemin suggéré: src/app/formations/conducteur-travaux-tp-alternance/page.tsx')
    
    return true
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page:', error.message)
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
    await createFormationPage()
    
    console.log('\n🎉 Formation "Conducteur de Travaux, Travaux Publics" ajoutée avec succès!')
    console.log('\n💡 Prochaines étapes:')
    console.log('1. Vérifiez la formation dans l\'admin Strapi')
    console.log('2. Testez l\'affichage dans le dropdown formations')
    console.log('3. Créez la page dédiée si nécessaire')
    console.log('4. Ajoutez une image de formation si disponible')
    console.log('\n🔗 URLs importantes:')
    console.log(`   Admin Strapi: http://localhost:1337/admin/content-manager/collectionType/api::formation.formation/${result.id}`)
    console.log(`   Page frontend: http://localhost:3001/formations/${formationData.slug}`)
  }
}

main().catch(console.error)