/**
 * Script pour importer les formateurs dans Strapi
 * Exécuter avec: node scripts/import-formateurs-strapi.js
 */

const STRAPI_URL = 'http://localhost:1337'

const formateurs = [
  // Direction & Pédagogie
  { 
    nom: "BOUCHOUIA", 
    prenom: "Abdel",
    poste: "Directeur Pédagogique & Directeur CMA", 
    secteur: "direction",
    description: "Expert du BTP avec plus de 16 ans d'expérience combinant direction d'école supérieure, gestion de chantiers et ingénierie pédagogique.", 
    experience: "16+ ans", 
    gender: "male",
    specialites: ["Direction pédagogique", "Gestion de chantiers", "Ingénierie pédagogique"],
    certifications: ["Directeur d'école supérieure", "Expert BTP"],
    isDirector: true,
    linkedin: "https://www.linkedin.com/in/abdel-bouchouia/",
    ordre: 1
  },
  // Bâtiment & Gestion de Projet
  { 
    nom: "PICHONNIER", 
    prenom: "Julien",
    poste: "Cofondateur Integraal, Moex, OPC", 
    secteur: "batiment",
    description: "25 ans en direction de projets Bâtiment. Formateur en écoles supérieures depuis 20 ans.", 
    experience: "25 ans", 
    gender: "male",
    specialites: ["Direction de projets", "Formation supérieure", "OPC"],
    certifications: ["Cofondateur Integraal", "Expert Bâtiment"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/julien-pichonnier-0b7b809b/",
    ordre: 2
  },
  { 
    nom: "DENIEUL", 
    prenom: "Alban",
    poste: "Expert Construction International", 
    secteur: "batiment",
    description: "20 ans d'expérience France/UK. Expert généraliste, spécialiste gestion de sinistres complexes.", 
    experience: "20 ans", 
    gender: "male",
    specialites: ["Construction internationale", "Gestion de sinistres", "Expertise généraliste"],
    certifications: ["Expert France/UK", "Spécialiste sinistres"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/alban-denieul-4a035559/",
    ordre: 3
  },
  { 
    nom: "PAILLIEZ", 
    prenom: "Arnaud",
    poste: "Spécialiste Gestion de Projet", 
    secteur: "batiment",
    description: "12 ans chez GS Construction. Actionnaire et expert en gestion de PME BTP.", 
    experience: "12 ans", 
    gender: "male",
    specialites: ["Gestion de projet", "PME BTP", "Management"],
    certifications: ["GS Construction", "Expert PME"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/arnaud-pailliez/",
    ordre: 4
  },
  { 
    nom: "COSME", 
    prenom: "Thomas",
    poste: "Ingénieur BTP - Associé", 
    secteur: "batiment",
    description: "8 ans chez Thomas et Vajda. Spécialiste conduite de travaux tous corps d'état IDF.", 
    experience: "8 ans", 
    gender: "male",
    specialites: ["Conduite de travaux", "Tous corps d'état", "IDF"],
    certifications: ["Ingénieur BTP", "Thomas et Vajda"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/cosmethomas/",
    ordre: 5
  },
  { 
    nom: "SIDROUHOU", 
    prenom: "Ratiba",
    poste: "Ingénieure BTP", 
    secteur: "batiment",
    description: "17 ans d'expérience. Direction d'exploitation en entreprise générale nationale.", 
    experience: "17 ans", 
    gender: "female",
    specialites: ["Direction d'exploitation", "Entreprise générale", "Management"],
    certifications: ["Ingénieure BTP", "Expert national"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/ratiba-sid-rouhou-36aa69158/",
    ordre: 6
  },
  { 
    nom: "BERRAMDANE", 
    prenom: "Mounir",
    poste: "Chef d'Entreprise BTP", 
    secteur: "batiment",
    description: "17 ans d'expérience. Opérations clés en main de la conception à la réalisation.", 
    experience: "17 ans", 
    gender: "male",
    specialites: ["Opérations clés en main", "Conception", "Réalisation"],
    certifications: ["Chef d'entreprise", "Expert conception"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/mounir-berramdane-09184955/",
    ordre: 7
  },
  // Travaux Publics & Infrastructure
  { 
    nom: "ALI ZERROUKI", 
    prenom: "Kader",
    poste: "Chef de Secteur Eiffage Route", 
    secteur: "travaux-publics",
    description: "7+ ans d'expérience. Supervision coordination équipes, pilotage chantiers grande envergure.", 
    experience: "7+ ans", 
    gender: "male",
    specialites: ["Supervision équipes", "Chantiers grande envergure", "Coordination"],
    certifications: ["Eiffage Route", "Chef de secteur"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/kader-ali-zerrouki-429a6612a/",
    ordre: 8
  },
  { 
    nom: "FERGATI", 
    prenom: "Bylel",
    poste: "Maître d'Ouvrage Public", 
    secteur: "travaux-publics",
    description: "15 ans VRD et génie civil chez Eurovia. Projets d'aménagement urbain et infrastructures.", 
    experience: "15 ans", 
    gender: "male",
    specialites: ["VRD", "Génie civil", "Aménagement urbain"],
    certifications: ["Eurovia", "Maître d'ouvrage public"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/bylel-fergati-605b61167/",
    ordre: 9
  },
  { 
    nom: "PINAUD", 
    prenom: "Noël",
    poste: "Président OPTEAM Consult", 
    secteur: "travaux-publics",
    description: "25+ ans travaux publics. Ex-SCREG/FAYOLLE. Spécialiste projets complexes GC/TP/VRD.", 
    experience: "25+ ans", 
    gender: "male",
    specialites: ["Projets complexes", "GC/TP/VRD", "Consultation"],
    certifications: ["OPTEAM Consult", "Ex-SCREG/FAYOLLE"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/no%C3%ABl-pinaud-068300145/",
    ordre: 10
  },
  { 
    nom: "DWORZECKI", 
    prenom: "André",
    poste: "Président ADE PROJECT", 
    secteur: "travaux-publics",
    description: "16+ ans TP et aménagement urbain. AMO collectivités, pilotage opérations, OPC.", 
    experience: "16+ ans", 
    gender: "male",
    specialites: ["Aménagement urbain", "AMO collectivités", "OPC"],
    certifications: ["ADE PROJECT", "Expert collectivités"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/andr%C3%A9-dworzecki-a0762310a/",
    ordre: 11
  },
  // Architecture & Énergie
  { 
    nom: "MANI", 
    prenom: "Thomaso",
    poste: "Architecte International", 
    secteur: "architecture-energie",
    description: "25+ ans, projets d'envergure cabinets internationaux. Expertise conception et enjeux urbains.", 
    experience: "25+ ans", 
    gender: "male",
    specialites: ["Projets internationaux", "Conception", "Enjeux urbains"],
    certifications: ["Architecte international", "Expert urbain"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/tomasomani/",
    ordre: 12
  },
  { 
    nom: "EL MAHAMDI", 
    prenom: "Abdeillah",
    poste: "Ingénieur Énergie Durable", 
    secteur: "architecture-energie",
    description: "17 ans spécialiste stratégies énergétiques. Performance énergétique et énergies renouvelables.", 
    experience: "17 ans", 
    gender: "male",
    specialites: ["Stratégies énergétiques", "Performance énergétique", "Énergies renouvelables"],
    certifications: ["Ingénieur énergie", "Expert durable"],
    isDirector: false,
    linkedin: "https://www.linkedin.com/in/abdeillah-el-mahamdi/",
    ordre: 13
  }
]

async function fetchAPI(endpoint, options = {}) {
  const url = `${STRAPI_URL}${endpoint}`
  const headers = { 'Content-Type': 'application/json' }

  try {
    const response = await fetch(url, { ...options, headers })
    const data = await response.json()
    return { ok: response.ok, status: response.status, data }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}

async function deleteExistingFormateurs() {
  console.log('🗑️  Suppression des formateurs existants...')
  const existing = await fetchAPI('/api/formateurs')
  
  if (existing.ok && existing.data?.data?.length > 0) {
    for (const item of existing.data.data) {
      await fetchAPI(`/api/formateurs/${item.id}`, { method: 'DELETE' })
    }
    console.log(`  ✅ ${existing.data.data.length} formateurs supprimés`)
  }
}

async function importFormateurs() {
  console.log('\n👥 Import des formateurs...')
  
  for (const formateur of formateurs) {
    const result = await fetchAPI('/api/formateurs', {
      method: 'POST',
      body: JSON.stringify({ data: formateur })
    })
    
    if (result.ok) {
      console.log(`  ✅ ${formateur.nom} (${formateur.secteur})`)
    } else {
      console.log(`  ❌ ${formateur.nom}: ${JSON.stringify(result.data?.error || result.error)}`)
    }
  }
}

async function main() {
  console.log('🚀 Import des formateurs dans Strapi\n')
  
  // Vérifier l'API
  const check = await fetchAPI('/api/formateurs')
  if (!check.ok) {
    console.log('❌ API formateurs non disponible')
    console.log('   Assurez-vous que Strapi est démarré et les permissions configurées')
    return
  }
  
  await deleteExistingFormateurs()
  await importFormateurs()
  
  console.log('\n✅ Import terminé!')
  console.log('\n📝 Prochaines étapes:')
  console.log('   1. Publiez les formateurs dans Strapi Admin')
  console.log('   2. Testez sur http://localhost:3000/formateurs')
}

main().catch(console.error)
