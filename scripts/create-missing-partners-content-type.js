#!/usr/bin/env node

/**
 * Script pour créer le content type "partners" manquant sur Railway Strapi
 * et importer les données des partenaires
 */

const STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
const STRAPI_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

console.log('🚀 Création du content type Partners sur Railway Strapi...\n')

// Données des partenaires
const partnersData = [
  {
    nom: "VINCI Construction",
    description: "Leader mondial de la construction et des infrastructures",
    logo: null,
    url: "https://www.vinci-construction.com",
    featured: true,
    ordre: 1
  },
  {
    nom: "Bouygues Construction", 
    description: "Acteur majeur du BTP en France et à l'international",
    logo: null,
    url: "https://www.bouygues-construction.com",
    featured: true,
    ordre: 2
  },
  {
    nom: "Eiffage Construction",
    description: "Groupe français de BTP et de concessions",
    logo: null,
    url: "https://www.eiffage.com",
    featured: true,
    ordre: 3
  },
  {
    nom: "SPIE",
    description: "Spécialiste des services multi-techniques",
    logo: null,
    url: "https://www.spie.com",
    featured: false,
    ordre: 4
  },
  {
    nom: "Colas",
    description: "Leader mondial de la construction et maintenance d'infrastructures de transport",
    logo: null,
    url: "https://www.colas.com",
    featured: false,
    ordre: 5
  }
]

// 1. Vérifier si le content type existe
async function checkContentType() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/partners`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    })
    
    console.log(`Status check partners: ${response.status}`)
    return response.status === 200
  } catch (error) {
    console.log('❌ Erreur vérification content type:', error.message)
    return false
  }
}

// 2. Créer les entrées partners
async function createPartners() {
  console.log('📝 Création des partenaires...\n')
  
  for (const partner of partnersData) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/partners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_TOKEN}`
        },
        body: JSON.stringify({
          data: partner
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log(`✅ ${partner.nom} créé (ID: ${result.data.id})`)
      } else {
        const error = await response.text()
        console.log(`❌ Erreur création ${partner.nom}:`, response.status, error)
      }
    } catch (error) {
      console.log(`❌ Erreur réseau ${partner.nom}:`, error.message)
    }
  }
}

// 3. Vérifier les permissions
async function checkPermissions() {
  console.log('\n🔐 Vérification des permissions...')
  
  try {
    // Test en tant qu'utilisateur public
    const response = await fetch(`${STRAPI_URL}/api/partners?populate=*`)
    
    if (response.ok) {
      const data = await response.json()
      console.log(`✅ Permissions publiques OK - ${data.data?.length || 0} partenaires accessibles`)
      return true
    } else {
      console.log(`❌ Permissions publiques manquantes (${response.status})`)
      return false
    }
  } catch (error) {
    console.log('❌ Erreur test permissions:', error.message)
    return false
  }
}

// 4. Configurer les permissions si nécessaire
async function configurePermissions() {
  console.log('🔧 Configuration des permissions publiques...')
  
  // Note: Les permissions doivent être configurées manuellement dans l'admin Strapi
  // ou via l'API admin (plus complexe)
  
  console.log('⚠️ Les permissions doivent être configurées manuellement:')
  console.log('   1. Aller sur Railway Strapi Admin')
  console.log('   2. Settings > Users & Permissions Plugin > Roles > Public')
  console.log('   3. Activer "find" et "findOne" pour Partners')
  console.log('   4. Sauvegarder')
}

// Fonction principale
async function main() {
  console.log('🎯 Objectif: Corriger l\'erreur 404 sur /api/partners\n')
  
  // Vérifier si le content type existe
  const exists = await checkContentType()
  
  if (!exists) {
    console.log('❌ Content type Partners n\'existe pas sur Railway')
    console.log('📋 Actions requises:')
    console.log('   1. Créer le content type Partners dans l\'admin Strapi')
    console.log('   2. Relancer ce script pour importer les données')
    console.log('\n🔗 URL Admin: https://cma-education-strapi-production.up.railway.app/admin')
    return
  }
  
  console.log('✅ Content type Partners existe\n')
  
  // Créer les partenaires
  await createPartners()
  
  // Vérifier les permissions
  const permissionsOK = await checkPermissions()
  
  if (!permissionsOK) {
    await configurePermissions()
  }
  
  console.log('\n🎉 Script terminé!')
  console.log('🔄 Testez maintenant: https://cma-education-strapi-production.up.railway.app/api/partners')
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main }