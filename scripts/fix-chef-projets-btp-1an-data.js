#!/usr/bin/env node

/**
 * Script pour corriger les données de la formation Chef de Projets BTP 1 an
 */

const STRAPI_URL = 'http://localhost:1337'

async function fixChefProjetsBTP1anData() {
  console.log('🔧 Correction des données - Formation Chef de Projets BTP 1 an...\n')

  try {
    // 1. Récupérer la formation existante
    console.log('📋 Recherche de la formation...')
    const searchResponse = await fetch(`${STRAPI_URL}/api/formations?filters[slug][$eq]=chef-projets-btp-1an&populate=*`)
    
    if (!searchResponse.ok) {
      throw new Error(`Erreur lors de la recherche: ${searchResponse.status}`)
    }
    
    const searchData = await searchResponse.json()
    
    if (searchData.data && searchData.data.length > 0) {
      const formationId = searchData.data[0].id
      console.log(`✅ Formation trouvée avec l'ID: ${formationId}`)
      
      // 2. Mettre à jour avec les bonnes données
      const updateData = {
        data: {
          title: "Chef de Projets BTP - Cursus 1 an",
          slug: "chef-projets-btp-1an",
          level: "Niveau 7 (équivalent Bac+5)",
          rncp: "En cours d'enregistrement",
          rncpUrl: null,
          shortDesc: "Formation intensive préparant des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP.",
          fullDesc: `
            <h2>🎯 Objectifs de la formation</h2>
            <p>Cette formation intensive d'1 an prépare des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP.</p>
            
            <h3>📚 Programme de formation (697 heures)</h3>
            <p><strong>Volume horaire divisé par 2 par rapport au cursus 2 ans (1393h → 697h)</strong></p>
            <ul>
              <li><strong>Management de projet BTP</strong> - 200 heures</li>
              <li><strong>Gestion financière et budgétaire</strong> - 150 heures</li>
              <li><strong>Coordination technique et réglementaire</strong> - 147 heures</li>
              <li><strong>Management d'équipes</strong> - 100 heures</li>
              <li><strong>RSE et développement durable</strong> - 100 heures</li>
            </ul>
            
            <h3>🎓 Compétences développées</h3>
            <ul>
              <li>Piloter des projets de construction complexes</li>
              <li>Manager des équipes pluridisciplinaires</li>
              <li>Intégrer les enjeux RSE et développement durable</li>
              <li>Maîtriser les aspects financiers et contractuels</li>
              <li>Coordonner les différents intervenants</li>
            </ul>
            
            <h3>💼 Débouchés professionnels</h3>
            <ul>
              <li>Chef de projets BTP</li>
              <li>Directeur de travaux</li>
              <li>Responsable d'agence</li>
              <li>Coordinateur de projets</li>
              <li>Consultant en management de projet</li>
            </ul>
            
            <h3>📋 Modalités</h3>
            <ul>
              <li><strong>Durée :</strong> 1 an en alternance</li>
              <li><strong>Rythme :</strong> 697 heures (formation intensive)</li>
              <li><strong>Mode :</strong> Présentiel</li>
              <li><strong>Financement :</strong> Prise en charge OPCO</li>
            </ul>
          `,
          duration: "1 an",
          rhythm: "697 heures (divisé par 2 par rapport au cursus 2 ans)",
          mode: "Présentiel",
          price: "Prise en charge",
          isAlternance: true,
          isReconversion: false,
          ordre: 18,
          featured: false,
          publishedAt: new Date().toISOString()
        }
      }
      
      console.log('🔄 Mise à jour des données...')
      const updateResponse = await fetch(`${STRAPI_URL}/api/formations/${formationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
      
      if (!updateResponse.ok) {
        throw new Error(`Erreur lors de la mise à jour: ${updateResponse.status}`)
      }
      
      const updatedFormation = await updateResponse.json()
      console.log('✅ Formation mise à jour avec succès!')
      console.log(`📋 Titre: ${updatedFormation.data.attributes.title}`)
      console.log(`⏱️  Durée: ${updatedFormation.data.attributes.duration}`)
      console.log(`🎯 Rythme: ${updatedFormation.data.attributes.rhythm}`)
      console.log(`💰 Prix: ${updatedFormation.data.attributes.price}`)
      console.log(`🎓 Alternance: ${updatedFormation.data.attributes.isAlternance}`)
      
      // 3. Vérification finale
      console.log('\n🔍 Vérification finale...')
      const verifyResponse = await fetch(`${STRAPI_URL}/api/formations?filters[slug][$eq]=chef-projets-btp-1an&populate=*`)
      const verifyData = await verifyResponse.json()
      
      if (verifyData.data && verifyData.data.length > 0) {
        const formation = verifyData.data[0]
        console.log('✅ Données vérifiées:')
        console.log(`   📋 Titre: ${formation.attributes.title}`)
        console.log(`   ⏱️  Durée: ${formation.attributes.duration}`)
        console.log(`   🎯 Rythme: ${formation.attributes.rhythm}`)
        console.log(`   💰 Prix: ${formation.attributes.price}`)
        console.log(`   🎓 Alternance: ${formation.attributes.isAlternance}`)
        console.log(`   📊 Niveau: ${formation.attributes.level}`)
      }
      
    } else {
      console.log('❌ Formation non trouvée')
    }
    
    console.log('\n🎉 Correction terminée avec succès!')
    console.log('📊 Résumé:')
    console.log('   • Formation Chef de Projets BTP 1 an corrigée')
    console.log('   • Toutes les données sont maintenant renseignées')
    console.log('   • Volume horaire: 697h (divisé par 2)')
    console.log('   • Visible sur http://localhost:3000/formations')
    
  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error.message)
    process.exit(1)
  }
}

// Exécution du script
fixChefProjetsBTP1anData()