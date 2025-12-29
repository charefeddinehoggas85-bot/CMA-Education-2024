/**
 * Script pour mettre à jour le champ pageUrl de toutes les formations
 */

const STRAPI_URL = 'http://localhost:1337'
const SITE_URL = 'http://localhost:3000'

async function main() {
  console.log('🔄 Mise à jour des URLs de pages des formations...\n')

  // Récupérer toutes les formations
  const response = await fetch(`${STRAPI_URL}/api/formations?pagination[pageSize]=100`)
  const data = await response.json()
  const formations = data.data || []

  console.log(`📋 ${formations.length} formations trouvées\n`)

  for (const formation of formations) {
    const slug = formation.attributes.slug
    const pageUrl = `${SITE_URL}/formations/${slug}`
    
    // Mettre à jour la formation
    const updateResponse = await fetch(`${STRAPI_URL}/api/formations/${formation.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { pageUrl } })
    })

    if (updateResponse.ok) {
      console.log(`✅ ${slug} → ${pageUrl}`)
    } else {
      console.log(`❌ ${slug} - Erreur mise à jour`)
    }
  }

  console.log('\n✅ Mise à jour terminée!')
  console.log('\n⚠️  Redémarrez Strapi pour voir la nouvelle colonne pageUrl')
}

main().catch(console.error)
