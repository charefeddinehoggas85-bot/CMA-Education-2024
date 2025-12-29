/**
 * Script pour importer les données pédagogiques dans Strapi
 * - Méthodes pédagogiques
 * - Chiffres clés
 * - Outils pédagogiques
 */

const STRAPI_URL = 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ''

// Données à importer
const methodesPedagogiques = [
  {
    nom: "Apprentissage par l'action",
    description: "70% de pratique, 30% de théorie pour un apprentissage efficace",
    icon: "Cog",
    couleur: "from-blue-500 to-blue-600",
    ordre: 1
  },
  {
    nom: "Pédagogie collaborative",
    description: "Travail en équipe et projets collectifs pour développer les soft skills",
    icon: "Users",
    couleur: "from-green-500 to-green-600",
    ordre: 2
  },
  {
    nom: "Mentorat professionnel",
    description: "Accompagnement par des professionnels expérimentés du secteur",
    icon: "Heart",
    couleur: "from-purple-500 to-purple-600",
    ordre: 3
  },
  {
    nom: "Innovation technologique",
    description: "Intégration des dernières technologies BTP et outils digitaux",
    icon: "Lightbulb",
    couleur: "from-orange-500 to-orange-600",
    ordre: 4
  }
]

const chiffresCles = [
  { valeur: "95%", label: "Taux de réussite", icon: "Award", ordre: 1, page: "pedagogie" },
  { valeur: "20", label: "Étudiants max par classe", icon: "Users", ordre: 2, page: "pedagogie" },
  { valeur: "70%", label: "Pratique terrain", icon: "Cog", ordre: 3, page: "pedagogie" },
  { valeur: "15+", label: "Années d'expérience", icon: "Star", ordre: 4, page: "pedagogie" }
]

const outilsPedagogiques = [
  { nom: "Plateforme e-learning dédiée", ordre: 1, categorie: "digital" },
  { nom: "Simulateurs de chantier BTP", ordre: 2, categorie: "simulation" },
  { nom: "Logiciels professionnels (AutoCAD, Revit, MS Project)", ordre: 3, categorie: "logiciel" },
  { nom: "Réalité virtuelle pour la sécurité", ordre: 4, categorie: "vr" },
  { nom: "Études de cas d'entreprises réelles", ordre: 5, categorie: "cas" },
  { nom: "Projets collaboratifs inter-promotions", ordre: 6, categorie: "projet" }
]

async function importData(endpoint, data, name) {
  console.log(`\n📦 Import ${name}...`)
  
  for (const item of data) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` })
        },
        body: JSON.stringify({ data: { ...item, publishedAt: new Date().toISOString() } })
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log(`  ✅ ${item.nom || item.label || item.valeur} (ID: ${result.data.id})`)
      } else {
        const error = await response.text()
        console.log(`  ⚠️ ${item.nom || item.label}: ${response.status} - ${error.substring(0, 100)}`)
      }
    } catch (err) {
      console.log(`  ❌ Erreur: ${err.message}`)
    }
  }
}

async function main() {
  console.log('🚀 Import des données pédagogiques dans Strapi\n')
  console.log('⚠️  Assurez-vous que Strapi est redémarré après création des content-types!\n')
  
  // Test connexion
  try {
    const test = await fetch(`${STRAPI_URL}/api/methodes-pedagogiques`)
    if (!test.ok && test.status === 404) {
      console.log('❌ API methodes-pedagogiques non disponible.')
      console.log('   → Redémarrez Strapi: cd cms-cma && npm run develop')
      return
    }
  } catch (err) {
    console.log('❌ Strapi non accessible:', err.message)
    return
  }
  
  await importData('methodes-pedagogiques', methodesPedagogiques, 'Méthodes pédagogiques')
  await importData('chiffres-cles', chiffresCles, 'Chiffres clés')
  await importData('outils-pedagogiques', outilsPedagogiques, 'Outils pédagogiques')
  
  console.log('\n✅ Import terminé!')
  console.log('\n📍 Liens Strapi Admin:')
  console.log('   - Méthodes: http://localhost:1337/admin/content-manager/collection-types/api::methode-pedagogique.methode-pedagogique')
  console.log('   - Chiffres: http://localhost:1337/admin/content-manager/collection-types/api::chiffre-cle.chiffre-cle')
  console.log('   - Outils: http://localhost:1337/admin/content-manager/collection-types/api::outil-pedagogique.outil-pedagogique')
}

main()
