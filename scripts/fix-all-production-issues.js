#!/usr/bin/env node

/**
 * Script complet pour corriger tous les problèmes de production identifiés
 */

const STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
const STRAPI_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

console.log('🚀 Correction complète des problèmes de production\n')

// Données des partenaires à créer
const partnersData = [
  {
    nom: "VINCI Construction",
    description: "Leader mondial de la construction et des infrastructures",
    url: "https://www.vinci-construction.com",
    featured: true,
    ordre: 1
  },
  {
    nom: "Bouygues Construction", 
    description: "Acteur majeur du BTP en France et à l'international",
    url: "https://www.bouygues-construction.com",
    featured: true,
    ordre: 2
  },
  {
    nom: "Eiffage Construction",
    description: "Groupe français de BTP et de concessions",
    url: "https://www.eiffage.com",
    featured: true,
    ordre: 3
  },
  {
    nom: "SPIE",
    description: "Spécialiste des services multi-techniques",
    url: "https://www.spie.com",
    featured: false,
    ordre: 4
  },
  {
    nom: "Colas",
    description: "Leader mondial de la construction et maintenance d'infrastructures de transport",
    url: "https://www.colas.com",
    featured: false,
    ordre: 5
  }
]

// 1. Créer le content type Partners via l'API Content-Type Builder
async function createPartnersContentType() {
  console.log('1️⃣ Création du content type Partners...')
  
  const contentTypeSchema = {
    "kind": "collectionType",
    "collectionName": "partners",
    "info": {
      "singularName": "partner",
      "pluralName": "partners",
      "displayName": "Partner",
      "description": "Partenaires de l'école"
    },
    "options": {
      "draftAndPublish": true
    },
    "pluginOptions": {},
    "attributes": {
      "nom": {
        "type": "string",
        "required": true
      },
      "description": {
        "type": "text"
      },
      "logo": {
        "type": "media",
        "multiple": false,
        "required": false,
        "allowedTypes": ["images"]
      },
      "url": {
        "type": "string"
      },
      "featured": {
        "type": "boolean",
        "default": false
      },
      "ordre": {
        "type": "integer",
        "default": 1
      }
    }
  }
  
  try {
    const response = await fetch(`${STRAPI_URL}/content-type-builder/content-types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify(contentTypeSchema)
    })
    
    if (response.ok) {
      console.log('✅ Content type Partners créé')
      
      // Attendre que Strapi redémarre
      console.log('⏳ Attente du redémarrage de Strapi...')
      await new Promise(resolve => setTimeout(resolve, 10000))
      
      return true
    } else {
      const error = await response.text()
      console.log(`❌ Erreur création content type: ${response.status}`, error)
      return false
    }
  } catch (error) {
    console.log(`❌ Erreur réseau: ${error.message}`)
    return false
  }
}

// 2. Créer les entrées partners
async function createPartnersEntries() {
  console.log('\n2️⃣ Création des entrées partners...')
  
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
        console.log(`   ✅ ${partner.nom} créé (ID: ${result.data.id})`)
      } else {
        const error = await response.text()
        console.log(`   ❌ Erreur ${partner.nom}: ${response.status}`)
      }
    } catch (error) {
      console.log(`   ❌ Erreur réseau ${partner.nom}: ${error.message}`)
    }
  }
}

// 3. Configurer les permissions publiques
async function configurePublicPermissions() {
  console.log('\n3️⃣ Configuration des permissions publiques...')
  
  try {
    // Récupérer le rôle public
    const rolesResponse = await fetch(`${STRAPI_URL}/users-permissions/roles`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    })
    
    if (rolesResponse.ok) {
      const roles = await rolesResponse.json()
      const publicRole = roles.roles.find(role => role.type === 'public')
      
      if (publicRole) {
        // Ajouter les permissions pour partners
        const updatedPermissions = {
          ...publicRole.permissions,
          'api::partner.partner': {
            controllers: {
              partner: {
                find: { enabled: true },
                findOne: { enabled: true }
              }
            }
          }
        }
        
        const updateResponse = await fetch(`${STRAPI_URL}/users-permissions/roles/${publicRole.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          },
          body: JSON.stringify({
            ...publicRole,
            permissions: updatedPermissions
          })
        })
        
        if (updateResponse.ok) {
          console.log('✅ Permissions publiques configurées')
          return true
        } else {
          console.log(`❌ Erreur configuration permissions: ${updateResponse.status}`)
          return false
        }
      }
    }
  } catch (error) {
    console.log(`❌ Erreur permissions: ${error.message}`)
    return false
  }
}

// 4. Corriger la vidéo hero
async function fixHeroVideo() {
  console.log('\n4️⃣ Correction de la vidéo hero...')
  
  try {
    // Récupérer le site-setting
    const response = await fetch(`${STRAPI_URL}/api/site-setting?populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      const heroVideo = data.data?.attributes?.heroVideo
      
      if (heroVideo?.data?.attributes?.url?.includes('localhost')) {
        console.log('❌ URL localhost détectée, suppression temporaire...')
        
        // Supprimer la référence à la vidéo hero
        const updateResponse = await fetch(`${STRAPI_URL}/api/site-setting`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          },
          body: JSON.stringify({
            data: {
              heroVideo: null
            }
          })
        })
        
        if (updateResponse.ok) {
          console.log('✅ Vidéo hero désactivée temporairement')
          return true
        }
      } else {
        console.log('✅ Aucune URL localhost détectée')
        return true
      }
    }
  } catch (error) {
    console.log(`❌ Erreur correction vidéo: ${error.message}`)
    return false
  }
}

// 5. Tester les corrections
async function testFixes() {
  console.log('\n5️⃣ Test des corrections...')
  
  const tests = [
    { name: 'Partners API', url: '/api/partners?populate=*' },
    { name: 'Site Settings', url: '/api/site-setting?populate=*' },
    { name: 'Formations API', url: '/api/formations?populate=*' }
  ]
  
  for (const test of tests) {
    try {
      // Test en tant qu'utilisateur public (sans token)
      const response = await fetch(`${STRAPI_URL}${test.url}`)
      
      if (response.ok) {
        const data = await response.json()
        const count = Array.isArray(data.data) ? data.data.length : 'singleton'
        console.log(`   ✅ ${test.name}: ${count} entrées`)
      } else {
        console.log(`   ❌ ${test.name}: ${response.status}`)
      }
    } catch (error) {
      console.log(`   ❌ ${test.name}: Erreur réseau`)
    }
  }
}

// 6. Instructions finales
function finalInstructions() {
  console.log('\n6️⃣ Instructions finales:')
  console.log('\n🔧 Actions manuelles requises sur Vercel:')
  console.log('   1. Configurer NEXT_PUBLIC_STRAPI_URL:')
  console.log('      vercel env add NEXT_PUBLIC_STRAPI_URL production')
  console.log('      → https://cma-education-strapi-production.up.railway.app')
  console.log('\n   2. Configurer STRAPI_API_TOKEN:')
  console.log('      vercel env add STRAPI_API_TOKEN production')
  console.log('      → [Votre token Strapi]')
  console.log('\n   3. Redéployer:')
  console.log('      vercel --prod')
  
  console.log('\n📋 Vérifications post-déploiement:')
  console.log('   - Plus d\'erreur Mixed Content (localhost URLs)')
  console.log('   - API Partners accessible (200 au lieu de 404)')
  console.log('   - Vidéo hero désactivée temporairement')
  
  console.log('\n🔗 Liens utiles:')
  console.log('   - Vercel Dashboard: https://vercel.com/dashboard')
  console.log('   - Railway Admin: https://cma-education-strapi-production.up.railway.app/admin')
  console.log('   - Site production: https://cma-education-2024.vercel.app')
}

// Fonction principale
async function main() {
  console.log('🎯 Objectifs:')
  console.log('   ✓ Corriger l\'erreur 404 sur /api/partners')
  console.log('   ✓ Corriger l\'erreur Mixed Content (localhost URLs)')
  console.log('   ✓ Corriger l\'erreur 503 de la vidéo hero\n')
  
  // Vérifier si partners existe déjà
  try {
    const checkResponse = await fetch(`${STRAPI_URL}/api/partners`)
    if (checkResponse.status === 404) {
      console.log('❌ Content type Partners manquant, création...')
      
      // Note: La création via API Content-Type Builder nécessite des permissions admin spéciales
      // Pour l'instant, on va juste créer les données si le content type existe
      console.log('⚠️ Le content type Partners doit être créé manuellement dans l\'admin Strapi')
      console.log('📋 Structure requise:')
      console.log('   - nom (string, required)')
      console.log('   - description (text)')
      console.log('   - logo (media, single image)')
      console.log('   - url (string)')
      console.log('   - featured (boolean, default: false)')
      console.log('   - ordre (integer, default: 1)')
      
      console.log('\n🔗 Créer le content type: https://cma-education-strapi-production.up.railway.app/admin/plugins/content-type-builder')
      console.log('   1. Cliquer sur "Create new collection type"')
      console.log('   2. Nom: "partner" (singulier)')
      console.log('   3. Ajouter les champs listés ci-dessus')
      console.log('   4. Sauvegarder et attendre le redémarrage')
      console.log('   5. Relancer ce script')
      
      return
    } else {
      console.log('✅ Content type Partners existe')
    }
  } catch (error) {
    console.log('❌ Erreur vérification Partners:', error.message)
    return
  }
  
  // Créer les entrées partners
  await createPartnersEntries()
  
  // Corriger la vidéo hero
  await fixHeroVideo()
  
  // Tester les corrections
  await testFixes()
  
  // Instructions finales
  finalInstructions()
  
  console.log('\n🎉 Script terminé!')
  console.log('🚀 Suivez les instructions Vercel ci-dessus pour finaliser les corrections.')
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main }