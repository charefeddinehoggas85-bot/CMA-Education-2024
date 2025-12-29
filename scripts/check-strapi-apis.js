/**
 * Script de diagnostic des APIs Strapi disponibles
 */

const STRAPI_URL = 'http://localhost:1337'
const STRAPI_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
}

const apisToCheck = [
  { name: 'Site Settings', endpoint: 'site-setting' },
  { name: 'Formations', endpoint: 'formations' },
  { name: 'Modalités', endpoint: 'modalites' },
  { name: 'Statistiques Site', endpoint: 'statistiques-site' },
  { name: 'Témoignages', endpoint: 'testimonials' },
  { name: 'Partenaires', endpoint: 'partners' },
  { name: 'Valeurs École', endpoint: 'valeurs-ecole' },
  { name: 'Processus Admission', endpoint: 'processus-admissions' },
  { name: 'Articles Blog', endpoint: 'articles-blog' },
  { name: 'Catégories Blog', endpoint: 'categories-blog' },
  { name: 'Formateurs', endpoint: 'formateurs' }
]

async function checkApi(name, endpoint) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, { headers })
    const data = await response.json()
    
    if (response.ok) {
      const count = data.data ? (Array.isArray(data.data) ? data.data.length : 1) : 0
      return { name, endpoint, status: '✅', count, message: `${count} entrée(s)` }
    } else {
      return { name, endpoint, status: '❌', count: 0, message: data.error?.message || 'Non disponible' }
    }
  } catch (error) {
    return { name, endpoint, status: '⚠️', count: 0, message: 'Strapi non accessible' }
  }
}

async function main() {
  console.log('🔍 Vérification des APIs Strapi...\n')
  console.log('URL:', STRAPI_URL)
  console.log('=' .repeat(70))
  
  // Test connexion Strapi
  try {
    const healthCheck = await fetch(`${STRAPI_URL}/_health`)
    if (!healthCheck.ok) {
      console.log('\n❌ Strapi n\'est pas accessible!')
      console.log('   Démarrez Strapi avec: cd cms-cma && npm run develop')
      return
    }
    console.log('✅ Strapi est en ligne\n')
  } catch (error) {
    console.log('\n❌ Strapi n\'est pas accessible!')
    console.log('   Démarrez Strapi avec: cd cms-cma && npm run develop')
    return
  }
  
  console.log('┌────────────────────────────┬────────┬──────────────────────────────┐')
  console.log('│ API                        │ Status │ Détails                      │')
  console.log('├────────────────────────────┼────────┼──────────────────────────────┤')
  
  let available = 0
  let missing = 0
  
  for (const api of apisToCheck) {
    const result = await checkApi(api.name, api.endpoint)
    const namePadded = result.name.padEnd(26)
    const statusPadded = result.status.padEnd(6)
    const messagePadded = result.message.substring(0, 28).padEnd(28)
    console.log(`│ ${namePadded} │ ${statusPadded} │ ${messagePadded} │`)
    
    if (result.status === '✅') available++
    else missing++
  }
  
  console.log('└────────────────────────────┴────────┴──────────────────────────────┘')
  
  console.log(`\n📊 Résumé: ${available} API(s) disponible(s), ${missing} manquante(s)`)
  
  if (missing > 0) {
    console.log('\n📌 Pour créer les Content Types manquants:')
    console.log('   node scripts/setup-strapi-content-types.js')
    console.log('\n📌 Après création, importez les données:')
    console.log('   node scripts/import-all-static-data-to-strapi.js')
  } else {
    console.log('\n✅ Toutes les APIs sont disponibles!')
    console.log('   Vous pouvez importer les données avec:')
    console.log('   node scripts/import-all-static-data-to-strapi.js')
  }
}

main().catch(console.error)
