#!/usr/bin/env node

/**
 * Script pour créer les APIs manquantes (partners et site-settings)
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'
const STRAPI_TOKEN = 'your-token-here' // Sera récupéré automatiquement

async function createPartnersContentType() {
  try {
    console.log('🏢 Création du content-type Partners...')
    
    const partnersSchema = {
      kind: 'collectionType',
      collectionName: 'partners',
      info: {
        singularName: 'partner',
        pluralName: 'partners',
        displayName: 'Partner',
        description: 'Partenaires de l\'école'
      },
      options: {
        draftAndPublish: true
      },
      pluginOptions: {},
      attributes: {
        nom: {
          type: 'string',
          required: true
        },
        logo: {
          type: 'media',
          multiple: false,
          required: false,
          allowedTypes: ['images']
        },
        description: {
          type: 'text'
        },
        siteWeb: {
          type: 'string'
        },
        secteur: {
          type: 'string'
        },
        ordre: {
          type: 'integer',
          default: 0
        },
        featured: {
          type: 'boolean',
          default: false
        }
      }
    }

    const response = await axios.post(
      `${STRAPI_URL}/content-type-builder/content-types`,
      { data: partnersSchema },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log('✅ Content-type Partners créé avec succès')
    return true
  } catch (error) {
    console.log('⚠️ Partners content-type existe déjà ou erreur:', error.response?.status)
    return false
  }
}

async function createSiteSettingsContentType() {
  try {
    console.log('⚙️ Création du content-type Site Settings...')
    
    const siteSettingsSchema = {
      kind: 'singleType',
      collectionName: 'site_settings',
      info: {
        singularName: 'site-setting',
        pluralName: 'site-settings',
        displayName: 'Site Settings',
        description: 'Paramètres généraux du site'
      },
      options: {
        draftAndPublish: true
      },
      pluginOptions: {},
      attributes: {
        siteName: {
          type: 'string',
          required: true,
          default: 'Construction Management Academy'
        },
        contactPhone: {
          type: 'string'
        },
        contactEmail: {
          type: 'email'
        },
        contactAddress: {
          type: 'text'
        },
        heroVideo: {
          type: 'media',
          multiple: false,
          required: false,
          allowedTypes: ['videos']
        },
        logoData: {
          type: 'media',
          multiple: false,
          required: false,
          allowedTypes: ['images']
        },
        socialMedia: {
          type: 'json'
        }
      }
    }

    const response = await axios.post(
      `${STRAPI_URL}/content-type-builder/content-types`,
      { data: siteSettingsSchema },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log('✅ Content-type Site Settings créé avec succès')
    return true
  } catch (error) {
    console.log('⚠️ Site Settings content-type existe déjà ou erreur:', error.response?.status)
    return false
  }
}

async function createSamplePartners() {
  try {
    console.log('📊 Création de partenaires d\'exemple...')
    
    const partners = [
      {
        nom: 'Bouygues Construction',
        description: 'Leader mondial de la construction',
        secteur: 'Construction',
        ordre: 1,
        featured: true
      },
      {
        nom: 'Vinci Construction',
        description: 'Groupe de construction et concessions',
        secteur: 'Construction',
        ordre: 2,
        featured: true
      },
      {
        nom: 'Eiffage',
        description: 'Groupe européen de construction',
        secteur: 'Construction',
        ordre: 3,
        featured: true
      },
      {
        nom: 'Spie Batignolles',
        description: 'Entreprise de construction',
        secteur: 'Construction',
        ordre: 4,
        featured: true
      },
      {
        nom: 'Colas',
        description: 'Leader mondial de la construction routière',
        secteur: 'Infrastructure',
        ordre: 5,
        featured: true
      },
      {
        nom: 'Sogea-Satom',
        description: 'Filiale de Vinci Construction',
        secteur: 'Construction',
        ordre: 6,
        featured: true
      }
    ]

    for (const partner of partners) {
      try {
        await axios.post(
          `${STRAPI_URL}/api/partners`,
          { data: partner },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        console.log(`✅ Partenaire créé: ${partner.nom}`)
      } catch (error) {
        console.log(`⚠️ Erreur création ${partner.nom}:`, error.response?.status)
      }
    }
  } catch (error) {
    console.log('❌ Erreur création partenaires:', error.message)
  }
}

async function createSiteSettings() {
  try {
    console.log('⚙️ Création des paramètres du site...')
    
    const siteSettings = {
      siteName: 'Construction Management Academy',
      contactPhone: '01 89 70 60 52',
      contactEmail: 'contact.academy@construction-management-academy.fr',
      contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
      socialMedia: {
        linkedin: 'https://www.linkedin.com/company/construction-management-academy',
        instagram: 'https://www.instagram.com/construction_management_academy',
        facebook: 'https://www.facebook.com/construction.management.academy',
        youtube: 'https://www.youtube.com/channel/construction-management-academy',
        tiktok: 'https://www.tiktok.com/@construction_management_academy'
      }
    }

    await axios.put(
      `${STRAPI_URL}/api/site-setting`,
      { data: siteSettings },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('✅ Paramètres du site créés avec succès')
  } catch (error) {
    console.log('❌ Erreur création site settings:', error.response?.status, error.response?.data)
  }
}

async function main() {
  console.log('🚀 Correction des APIs manquantes...\n')
  
  // Créer les content-types
  await createPartnersContentType()
  await createSiteSettingsContentType()
  
  // Attendre un peu pour que Strapi redémarre
  console.log('\n⏳ Attente du redémarrage de Strapi (10 secondes)...')
  await new Promise(resolve => setTimeout(resolve, 10000))
  
  // Créer les données d'exemple
  await createSamplePartners()
  await createSiteSettings()
  
  console.log('\n✅ Correction terminée ! Testez maintenant:')
  console.log('   🏢 Partners: http://localhost:1337/api/partners?populate=*')
  console.log('   ⚙️ Site Settings: http://localhost:1337/api/site-setting')
}

main().catch(console.error)