// Test direct des fonctions strapi.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

// Copie des fonctions de strapi.ts
async function fetchAPI(path, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  const requestUrl = `${STRAPI_URL}${path}`
  
  try {
    const response = await fetch(requestUrl, mergedOptions)
    
    if (!response.ok) {
      console.error(`Strapi API Error: ${response.status} ${response.statusText}`)
      return { data: null, error: response.status }
    }
    
    return await response.json()
  } catch (error) {
    console.error('Strapi API Error:', error)
    return { data: null, error }
  }
}

function transformStrapiArray(data) {
  if (!data || !Array.isArray(data)) return []
  return data.map(item => {
    const transformed = { id: item.id, ...item.attributes }
    
    // Mapper les relations de catégorie pour les formations
    if (item.attributes?.category?.data) {
      transformed.category = {
        id: item.attributes.category.data.id,
        ...item.attributes.category.data.attributes
      }
    }
    
    return transformed
  })
}

async function getFormations() {
  const data = await fetchAPI('/api/formations?populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

async function getFormationCategories() {
  const data = await fetchAPI('/api/formation-categories?populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

// Test principal
async function testStrapiDirectFunctions() {
  console.log('🔍 Test direct des fonctions strapi.ts...')
  
  try {
    console.log('📡 Appel getFormationCategories()...')
    const categories = await getFormationCategories()
    console.log(`✅ ${categories.length} catégories récupérées`)
    
    console.log('📡 Appel getFormations()...')
    const formations = await getFormations()
    console.log(`✅ ${formations.length} formations récupérées`)
    
    // Organiser comme dans FormationsDropdown
    const categoriesWithFormations = categories.map(category => {
      const categoryFormations = formations.filter(formation => 
        formation.category?.slug === category.slug || formation.category?.name === category.name
      )
      
      return {
        ...category,
        formations: categoryFormations
      }
    })
    
    console.log('\n📊 Résultat final (comme dans FormationsDropdown):')
    categoriesWithFormations.forEach((cat, index) => {
      console.log(`\n${index + 1}. 📁 ${cat.name} (${cat.slug})`)
      console.log(`   📊 ${cat.formations?.length || 0} formations`)
      
      if (cat.formations?.length > 0) {
        cat.formations.slice(0, 5).forEach((formation, idx) => {
          console.log(`   ${idx + 1}. ✓ ${formation.title}`)
          console.log(`      Category: ${formation.category?.name || 'N/A'}`)
        })
      }
    })
    
    // Test de validation
    const validCategories = categoriesWithFormations.filter(cat => cat.formations?.length > 0)
    console.log(`\n🔍 Validation: ${validCategories.length} catégories avec formations`)
    
    if (validCategories.length >= 1) {
      console.log('✅ Utiliserait les données Strapi')
    } else {
      console.log('🔄 Utiliserait le fallback')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testStrapiDirectFunctions()