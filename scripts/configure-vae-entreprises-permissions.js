/**
 * Script pour configurer les permissions des nouvelles APIs VAE et Entreprises
 * À exécuter après avoir redémarré Strapi
 */

const STRAPI_URL = 'http://localhost:1337'

// Liste des APIs à configurer avec permissions publiques
const apisToEnable = [
  'vae-avantage',
  'vae-faq', 
  'page-vae',
  'page-entreprise',
  'entreprise-modalite',
  // APIs existantes à vérifier
  'vae-formule',
  'vae-certification',
  'entreprise-service',
  'formation-thematique'
]

async function checkAPIs() {
  console.log('🔍 Vérification des APIs...\n')
  
  for (const api of apisToEnable) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/${api}s?populate=*`)
      const data = await response.json()
      
      if (response.ok) {
        const count = Array.isArray(data.data) ? data.data.length : (data.data ? 1 : 0)
        console.log(`✅ ${api}: ${count} entrée(s)`)
      } else {
        console.log(`❌ ${api}: ${response.status} - ${data.error?.message || 'Erreur'}`)
      }
    } catch (error) {
      console.log(`❌ ${api}: ${error.message}`)
    }
  }
  
  console.log('\n📌 INSTRUCTIONS POUR CONFIGURER LES PERMISSIONS:')
  console.log('================================================')
  console.log('1. Ouvrir Strapi Admin: http://localhost:1337/admin')
  console.log('2. Aller dans Settings > Users & Permissions > Roles')
  console.log('3. Cliquer sur "Public"')
  console.log('4. Pour chaque API ci-dessous, cocher "find" et "findOne":')
  console.log('')
  apisToEnable.forEach(api => {
    console.log(`   • ${api}`)
  })
  console.log('')
  console.log('5. Cliquer sur "Save"')
  console.log('6. Publier les entrées dans Content Manager')
}

checkAPIs().catch(console.error)
