#!/usr/bin/env node

/**
 * Script pour vérifier et corriger le champ heroVideo dans site-settings
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'

async function checkSiteSettings() {
  try {
    console.log('🔍 Vérification des paramètres du site...')
    
    const response = await axios.get(`${STRAPI_URL}/api/site-setting?populate=*`)
    const data = response.data.data
    
    console.log('📊 Données actuelles:')
    console.log('   - siteName:', data?.attributes?.siteName || 'Non défini')
    console.log('   - contactEmail:', data?.attributes?.contactEmail || 'Non défini')
    console.log('   - heroVideo:', data?.attributes?.heroVideo || 'Non défini')
    console.log('   - logoData:', data?.attributes?.logoData ? 'Défini' : 'Non défini')
    
    if (!data?.attributes?.heroVideo) {
      console.log('\n⚠️ Le champ heroVideo est manquant ou vide')
      return false
    }
    
    return true
  } catch (error) {
    console.log('❌ Erreur lors de la vérification:', error.response?.status, error.message)
    return false
  }
}

async function updateSiteSettings() {
  try {
    console.log('🔧 Mise à jour des paramètres du site...')
    
    const siteSettings = {
      siteName: 'Construction Management Academy',
      contactPhone: '01 89 70 60 52',
      contactEmail: 'contact.academy@construction-management-academy.fr',
      inscriptionEmail: 'inscription.academy@construction-management-academy.fr',
      contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
      socialMedia: {
        linkedin: 'https://www.linkedin.com/company/construction-management-academy',
        instagram: 'https://www.instagram.com/construction_management_academy',
        facebook: 'https://www.facebook.com/construction.management.academy',
        youtube: 'https://www.youtube.com/channel/construction-management-academy',
        tiktok: 'https://www.tiktok.com/@construction_management_academy'
      }
    }

    const response = await axios.put(
      `${STRAPI_URL}/api/site-setting`,
      { data: siteSettings },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('✅ Paramètres du site mis à jour avec succès')
    console.log('📊 Nouveau siteName:', response.data.data.attributes.siteName)
    return true
  } catch (error) {
    console.log('❌ Erreur mise à jour:', error.response?.status, error.response?.data)
    return false
  }
}

async function main() {
  console.log('🚀 Vérification et correction des paramètres du site...\n')
  
  const isValid = await checkSiteSettings()
  
  if (!isValid) {
    console.log('\n🔧 Correction nécessaire...')
    await updateSiteSettings()
  } else {
    console.log('\n✅ Les paramètres du site sont corrects')
  }
  
  console.log('\n📝 Note: Le champ heroVideo peut être ajouté manuellement dans Strapi Admin')
  console.log('   1. Allez dans Content Manager > Site Setting')
  console.log('   2. Ajoutez un fichier vidéo dans le champ heroVideo')
  console.log('   3. Ou laissez vide si pas de vidéo héro')
}

main().catch(console.error)