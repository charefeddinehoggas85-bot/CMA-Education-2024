/**
 * Script pour importer les données VAE dans Strapi
 * Exécuter avec: node scripts/import-vae-data-strapi.js
 */

const STRAPI_URL = 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

// Données VAE à importer
const vaeFormules = [
  {
    titre: "VAE avec accompagnement",
    description: "Accompagnement complet pour valider vos acquis",
    modalites: "Présentiel, visio, téléphone et mail",
    services: [
      "Analyse de votre parcours",
      "Aide à la rédaction du dossier",
      "Préparation à l'entretien jury"
    ],
    prix: "4500 € TTC (3750 € HT)",
    heures: "Jusqu'à 20 heures d'accompagnement",
    ordre: 1
  },
  {
    titre: "VAE sans accompagnement",
    description: "Suivi administratif uniquement",
    modalites: "Suivi administratif",
    services: [
      "Vérification de l'éligibilité",
      "Inscription et convocation jury",
      "Informations administratives"
    ],
    prix: "2760 € TTC (2300 € HT)",
    heures: null,
    ordre: 2
  }
]

const vaeCertifications = [
  // Niveau 5
  { titre: "Conducteur de Travaux Bâtiment et Génie Civil", rncp: "RNCP40217", niveau: "niveau5", ordre: 1 },
  { titre: "Chef de Chantier en Voirie et Réseaux Divers", rncp: "RNCP41368", niveau: "niveau5", ordre: 2 },
  { titre: "Chargé d'Affaires du Bâtiment", rncp: "RNCP35503", niveau: "niveau5", ordre: 3 },
  // Niveau 6
  { titre: "Coordinateur BIM du Bâtiment", rncp: "RNCP39408", niveau: "niveau6", ordre: 4 },
  { titre: "Conducteur de Travaux Voirie et Réseaux Divers", rncp: "RNCP39469", niveau: "niveau6", ordre: 5 }
]

async function fetchAPI(endpoint, options = {}) {
  const url = `${STRAPI_URL}${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` })
  }

  try {
    const response = await fetch(url, { ...options, headers })
    const data = await response.json()
    return { ok: response.ok, status: response.status, data }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}

async function updateVAEFormules() {
  console.log('\n📋 Mise à jour des formules VAE existantes...')
  
  // D'abord, récupérer les formules existantes
  const existing = await fetchAPI('/api/vae-formules')
  
  if (existing.ok && existing.data?.data?.length > 0) {
    console.log(`  📝 ${existing.data.data.length} formules existantes trouvées`)
    
    // Mettre à jour chaque formule avec les bons champs
    for (const item of existing.data.data) {
      const id = item.id
      const attrs = item.attributes
      
      // Trouver la formule correspondante dans nos données
      const matchingFormule = vaeFormules.find(f => 
        f.titre === attrs.type || f.titre === attrs.titre
      )
      
      if (matchingFormule) {
        const result = await fetchAPI(`/api/vae-formules/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ 
            data: {
              titre: matchingFormule.titre,
              description: matchingFormule.description,
              modalites: matchingFormule.modalites,
              services: matchingFormule.services,
              prix: matchingFormule.prix,
              heures: matchingFormule.heures,
              ordre: matchingFormule.ordre
            }
          })
        })
        
        if (result.ok) {
          console.log(`  ✅ Mis à jour: ${matchingFormule.titre}`)
        } else {
          console.log(`  ❌ Erreur mise à jour ${matchingFormule.titre}: ${JSON.stringify(result.data?.error || result.error)}`)
        }
      }
    }
  } else {
    // Créer les formules si elles n'existent pas
    console.log('  📝 Création des formules VAE...')
    for (const formule of vaeFormules) {
      const result = await fetchAPI('/api/vae-formules', {
        method: 'POST',
        body: JSON.stringify({ data: formule })
      })
      
      if (result.ok) {
        console.log(`  ✅ Créé: ${formule.titre}`)
      } else {
        console.log(`  ❌ Erreur création ${formule.titre}: ${JSON.stringify(result.data?.error || result.error)}`)
      }
    }
  }
}

async function importVAECertifications() {
  console.log('\n🎓 Import des certifications VAE...')
  
  // Vérifier si l'API existe
  const check = await fetchAPI('/api/vae-certifications')
  
  if (!check.ok && check.status === 404) {
    console.log('  ⚠️  L\'API vae-certifications n\'existe pas encore.')
    console.log('  📝 Vous devez redémarrer Strapi pour créer le content-type.')
    console.log('     1. Arrêtez Strapi (Ctrl+C)')
    console.log('     2. Relancez: npm run develop (dans cms-cma)')
    console.log('     3. Configurez les permissions dans Strapi Admin:')
    console.log('        Settings > Users & Permissions > Roles > Public')
    console.log('        Cochez find et findOne pour vae-certification')
    return false
  }
  
  for (const cert of vaeCertifications) {
    const result = await fetchAPI('/api/vae-certifications', {
      method: 'POST',
      body: JSON.stringify({ data: cert })
    })
    
    if (result.ok) {
      console.log(`  ✅ ${cert.titre} (${cert.niveau})`)
    } else {
      console.log(`  ❌ ${cert.titre}: ${JSON.stringify(result.data?.error || result.error)}`)
    }
  }
  
  return true
}

async function checkAPIs() {
  console.log('🔍 Vérification des APIs VAE...')
  
  const formules = await fetchAPI('/api/vae-formules')
  console.log(`  VAE Formules: ${formules.ok ? '✅ OK' : '❌ Non disponible'}`)
  
  const certs = await fetchAPI('/api/vae-certifications')
  console.log(`  VAE Certifications: ${certs.ok ? '✅ OK' : '❌ Non disponible (redémarrer Strapi)'}`)
  
  return { formulesOk: formules.ok, certsOk: certs.ok }
}

async function main() {
  console.log('🚀 Import des données VAE dans Strapi\n')
  
  const { formulesOk, certsOk } = await checkAPIs()
  
  if (formulesOk) {
    await updateVAEFormules()
  } else {
    console.log('\n⚠️  API vae-formules non disponible.')
  }
  
  if (certsOk) {
    await importVAECertifications()
  } else {
    console.log('\n⚠️  API vae-certifications non disponible.')
    console.log('   Redémarrez Strapi puis relancez ce script.')
  }
  
  console.log('\n✅ Script terminé!')
  console.log('\n📝 Prochaines étapes:')
  console.log('   1. Si vae-certifications n\'existe pas: redémarrez Strapi')
  console.log('   2. Configurez les permissions dans Strapi Admin')
  console.log('   3. Publiez les entrées (cliquez sur "Publish" pour chaque)')
  console.log('   4. Testez sur http://localhost:3000/formations')
}

main().catch(console.error)
