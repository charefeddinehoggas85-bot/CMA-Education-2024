/**
 * Script d'import des données manquantes vers Strapi
 * Importe les modalités et met à jour site-settings
 */

const STRAPI_URL = 'http://localhost:1337'
const STRAPI_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
}

// Données des modalités
const modalites = [
  {
    titre: "Alternance",
    description: "Formation en alternance du Bac+2 au Bac+5. Rémunération garantie et insertion professionnelle.",
    slug: "alternance",
    icon: "GraduationCap",
    couleur: "from-blue-500 to-blue-600",
    lien: "/formations#alternance",
    ordre: 1,
    featured: true
  },
  {
    titre: "Reconversion",
    description: "Formations courtes pour professionnels en reconversion. Financement possible par CPF.",
    slug: "reconversion",
    icon: "RefreshCw",
    couleur: "from-green-500 to-green-600",
    lien: "/formations#reconversion",
    ordre: 2,
    featured: true
  },
  {
    titre: "VAE",
    description: "Validation des Acquis de l'Expérience. Obtenez un diplôme grâce à votre expérience.",
    slug: "vae",
    icon: "Award",
    couleur: "from-orange-500 to-orange-600",
    lien: "/formations#vae",
    ordre: 3,
    featured: true
  }
]

// Données site settings
const siteSettings = {
  siteName: "CMA Education",
  siteTagline: "Centre de Formation BTP d'Excellence",
  heroTitle: "L'Academy - Devenez l'acteur du BTP d'aujourd'hui et de demain",
  heroSubtitle: "Centre de Formation BTP d'Excellence",
  heroDescription: "Formations BTP en alternance, reconversion et VAE. Du Bac+2 au Bac+5 avec nos partenaires entreprises.",
  contactPhone: "01 89 70 60 52",
  contactEmail: "contact.academy@cma-education.com",
  emailInscription: "inscription.academy@cma-education.com",
  contactAddress: "67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne",
  accessibilityMessage: "Nos formations sont ouvertes à tous, y compris aux personnes en situation de handicap. Nous mettons en place les aménagements nécessaires pour garantir les meilleures conditions d'apprentissage.",
  accessibilityPhone: "01 89 70 60 52",
  referentHandicap: "notre référent handicap",
  seoTitle: "Formation BTP Alternance, Reconversion et VAE | CMA Education",
  seoDescription: "Formation conducteur de travaux, chargé d'affaires bâtiment en alternance. Formation BTP reconversion et VAE. 98% insertion, prise en charge OPCO."
}

async function createEntry(endpoint, data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error(`❌ Erreur création ${endpoint}:`, error)
      return null
    }
    
    const result = await response.json()
    console.log(`✅ Créé: ${data.titre || data.title || 'OK'}`)
    return result
  } catch (error) {
    console.error(`❌ Erreur ${endpoint}:`, error.message)
    return null
  }
}

async function updateSingleType(endpoint, data) {
  try {
    // D'abord essayer de créer
    let response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data })
    })
    
    if (!response.ok) {
      // Si PUT échoue, essayer POST
      response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
      })
    }
    
    if (!response.ok) {
      const error = await response.text()
      console.error(`❌ Erreur ${endpoint}:`, error)
      return null
    }
    
    const result = await response.json()
    console.log(`✅ Site Settings mis à jour`)
    return result
  } catch (error) {
    console.error(`❌ Erreur ${endpoint}:`, error.message)
    return null
  }
}

async function checkExistingData(endpoint) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, { headers })
    if (!response.ok) return { exists: false, count: 0 }
    const data = await response.json()
    const count = data.data ? (Array.isArray(data.data) ? data.data.length : 1) : 0
    return { exists: true, count }
  } catch {
    return { exists: false, count: 0 }
  }
}

async function main() {
  console.log('🚀 Import des données manquantes vers Strapi\n')
  console.log('=' .repeat(60))
  
  // 1. Vérifier et importer les modalités
  console.log('\n📋 Vérification des Modalités...')
  const modalitesCheck = await checkExistingData('modalites')
  
  if (modalitesCheck.exists && modalitesCheck.count === 0) {
    console.log('   Importation des modalités...')
    for (const modalite of modalites) {
      await createEntry('modalites', modalite)
    }
  } else if (modalitesCheck.count > 0) {
    console.log(`   ✅ ${modalitesCheck.count} modalité(s) déjà présente(s)`)
  } else {
    console.log('   ⚠️  API modalites non disponible - Redémarrez Strapi')
  }
  
  // 2. Vérifier et mettre à jour site-settings
  console.log('\n📋 Vérification de Site Settings...')
  const siteSettingsCheck = await checkExistingData('site-settings')
  
  if (siteSettingsCheck.exists) {
    console.log('   Mise à jour de Site Settings...')
    await updateSingleType('site-settings', siteSettings)
  } else {
    console.log('   ⚠️  API site-settings non disponible - Redémarrez Strapi')
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('✅ Import terminé!')
  console.log('\n📌 Prochaines étapes:')
  console.log('1. Redémarrez Strapi: cd cms-cma && npm run develop')
  console.log('2. Configurez les permissions dans Settings → Roles → Public')
  console.log('3. Testez: node scripts/check-strapi-apis.js')
}

main().catch(console.error)
