/**
 * Script pour vérifier et corriger les catégories des formations
 * Catégories attendues:
 * - alternance-btp: formations en alternance
 * - reconversion-btp: formations en reconversion
 */

const STRAPI_URL = 'http://localhost:1337'

// Mapping des formations par catégorie
const formationsAlternance = [
  'charge-affaires-batiment',
  'conducteur-travaux-batiment', 
  'conducteur-travaux-tp-alternance',
  'chef-chantier-vrd',
  'responsable-travaux-bim',
  'chef-projets-btp',
  'conducteur-travaux-vrd-1an',
  'conducteur-travaux-vrd-2ans'
]

const formationsReconversion = [
  'charge-affaires-reconversion',
  'conducteur-travaux-reconversion',
  'conducteur-travaux-publics-reconversion'
]

async function fetchAPI(endpoint) {
  const response = await fetch(`${STRAPI_URL}${endpoint}`)
  if (!response.ok) throw new Error(`API Error: ${response.status}`)
  return response.json()
}

async function updateFormation(id, categoryId) {
  const response = await fetch(`${STRAPI_URL}/api/formations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { category: categoryId } })
  })
  return response.ok
}

async function main() {
  console.log('🔍 Vérification des catégories de formations...\n')

  // 1. Récupérer les catégories
  const categoriesData = await fetchAPI('/api/formation-categories?populate=*')
  const categories = categoriesData.data || []
  
  console.log('📁 Catégories disponibles:')
  categories.forEach(cat => {
    console.log(`   - ${cat.attributes.name} (slug: ${cat.attributes.slug}, ID: ${cat.id})`)
  })

  const alternanceCategory = categories.find(c => c.attributes.slug === 'alternance-btp' || c.attributes.slug === 'alternance')
  const reconversionCategory = categories.find(c => c.attributes.slug === 'reconversion-btp' || c.attributes.slug === 'reconversion')

  if (!alternanceCategory || !reconversionCategory) {
    console.log('\n❌ Catégories manquantes!')
    console.log('Alternance:', alternanceCategory ? 'OK' : 'MANQUANTE')
    console.log('Reconversion:', reconversionCategory ? 'OK' : 'MANQUANTE')
    return
  }

  const altSlug = alternanceCategory.attributes.slug
  const reconSlug = reconversionCategory.attributes.slug
  
  console.log(`\n✅ Catégorie Alternance: ID ${alternanceCategory.id} (slug: ${altSlug})`)
  console.log(`✅ Catégorie Reconversion: ID ${reconversionCategory.id} (slug: ${reconSlug})`)

  // 2. Récupérer toutes les formations
  const formationsData = await fetchAPI('/api/formations?populate=category&pagination[pageSize]=100')
  const formations = formationsData.data || []

  console.log(`\n📋 ${formations.length} formations trouvées\n`)

  // 3. Vérifier et corriger chaque formation
  let corrections = 0
  let errors = []

  console.log('--- FORMATIONS ALTERNANCE ---')
  for (const slug of formationsAlternance) {
    const formation = formations.find(f => f.attributes.slug === slug)
    if (!formation) {
      errors.push(`❌ Formation non trouvée: ${slug}`)
      continue
    }
    
    const currentCat = formation.attributes.category?.data?.attributes?.slug
    const isCorrect = currentCat === altSlug
    const status = isCorrect ? '✅' : '⚠️'
    console.log(`${status} ${slug} → catégorie actuelle: ${currentCat || 'AUCUNE'}`)
    
    if (!isCorrect) {
      const updated = await updateFormation(formation.id, alternanceCategory.id)
      if (updated) {
        console.log(`   🔧 Corrigé → ${altSlug}`)
        corrections++
      }
    }
  }

  console.log('\n--- FORMATIONS RECONVERSION ---')
  for (const slug of formationsReconversion) {
    const formation = formations.find(f => f.attributes.slug === slug)
    if (!formation) {
      errors.push(`❌ Formation non trouvée: ${slug}`)
      continue
    }
    
    const currentCat = formation.attributes.category?.data?.attributes?.slug
    const isCorrect = currentCat === reconSlug
    const status = isCorrect ? '✅' : '⚠️'
    console.log(`${status} ${slug} → catégorie actuelle: ${currentCat || 'AUCUNE'}`)
    
    if (!isCorrect) {
      const updated = await updateFormation(formation.id, reconversionCategory.id)
      if (updated) {
        console.log(`   🔧 Corrigé → ${reconSlug}`)
        corrections++
      }
    }
  }

  // 4. Résumé
  console.log('\n' + '='.repeat(50))
  console.log('📊 RÉSUMÉ')
  console.log('='.repeat(50))
  console.log(`Formations vérifiées: ${formationsAlternance.length + formationsReconversion.length}`)
  console.log(`Corrections effectuées: ${corrections}`)
  
  if (errors.length > 0) {
    console.log('\n⚠️ ERREURS:')
    errors.forEach(e => console.log(`   ${e}`))
  }

  console.log('\n✅ Vérification terminée!')
}

main().catch(console.error)
