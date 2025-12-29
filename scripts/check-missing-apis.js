#!/usr/bin/env node

/**
 * Script pour vérifier les APIs manquantes
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'

async function checkAPI(endpoint, name) {
  try {
    const response = await axios.get(`${STRAPI_URL}${endpoint}`)
    console.log(`✅ ${name}: ${response.status} - ${response.data?.data?.length || 'OK'} élément(s)`)
    return true
  } catch (error) {
    console.log(`❌ ${name}: ${error.response?.status || 'ERROR'} - ${error.message}`)
    return false
  }
}

async function main() {
  console.log('🔍 Vérification des APIs manquantes...\n')
  
  const apis = [
    { endpoint: '/api/partners', name: 'Partners API' },
    { endpoint: '/api/partners?populate=*', name: 'Partners API (populated)' },
    { endpoint: '/api/site-setting', name: 'Site Settings API' },
    { endpoint: '/api/formations', name: 'Formations API (référence)' },
    { endpoint: '/api/testimonials', name: 'Testimonials API (référence)' }
  ]
  
  const results = []
  for (const api of apis) {
    const success = await checkAPI(api.endpoint, api.name)
    results.push({ ...api, success })
  }
  
  console.log('\n📊 Résumé:')
  const missing = results.filter(r => !r.success)
  const working = results.filter(r => r.success)
  
  console.log(`   ✅ APIs fonctionnelles: ${working.length}`)
  console.log(`   ❌ APIs manquantes: ${missing.length}`)
  
  if (missing.length > 0) {
    console.log('\n🔧 APIs à créer:')
    missing.forEach(api => {
      console.log(`   - ${api.name}`)
    })
    
    console.log('\n💡 Solutions:')
    if (missing.some(api => api.endpoint.includes('partners'))) {
      console.log('   1. Créer le content-type "Partner" dans Strapi Admin')
      console.log('   2. Ou utiliser le script: node scripts/create-partners-content-type.js')
    }
    if (missing.some(api => api.endpoint.includes('site-setting'))) {
      console.log('   3. Créer le content-type "Site Setting" dans Strapi Admin')
      console.log('   4. Ou utiliser le script: node scripts/create-site-settings-content-type.js')
    }
  } else {
    console.log('\n🎉 Toutes les APIs sont fonctionnelles !')
  }
}

main().catch(console.error)