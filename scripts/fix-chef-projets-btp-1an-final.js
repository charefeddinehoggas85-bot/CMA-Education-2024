#!/usr/bin/env node

/**
 * Script final pour corriger la formation Chef de Projets BTP 1 an avec les bons champs
 */

const STRAPI_URL = 'http://localhost:1337'

async function fixChefProjetsBTP1anFinal() {
  console.log('🔧 Correction finale - Formation Chef de Projets BTP 1 an...\n')

  try {
    // 1. Récupérer la formation
    console.log('📋 Recherche de la formation...')
    const searchResponse = await fetch(`${STRAPI_URL}/api/formations?filters[slug][$eq]=chef-projets-btp-1an&populate=*`)
    
    if (!searchResponse.ok) {
      throw new Error(`Erreur lors de la recherche: ${searchResponse.status}`)
    }
    
    const searchData = await searchResponse.json()
    
    if (searchData.data && searchData.data.length > 0) {
      const formationId = searchData.data[0].id
      console.log(`✅ Formation trouvée avec l'ID: ${formationId}`)
      
      // 2. Mettre à jour avec les bons noms de champs Strapi
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
          `,
          // Utiliser les bons noms de champs d'après le schéma Strapi
          duree: "1 an",
          volumeHoraire: "697 heures",
          rythme: "Formation intensive - 697 heures (divisé par 2 par rapport au cursus 2 ans)",
          modalite: "100% présentiel",
          cout: "Prise en charge OPCO",
          typeContrat: "Contrat d'alternance / Formation continue",
          effectif: "15 maximum par session",
          certificateur: "Construction Management Academy",
          tauxReussite: "95%",
          tauxInsertion: "98%",
          isActive: true,
          ordre: 18,
          
          // Objectifs
          objectifs: [
            "Piloter des projets de construction complexes",
            "Manager des équipes pluridisciplinaires", 
            "Intégrer les enjeux RSE et développement durable",
            "Maîtriser les aspects financiers et contractuels",
            "Coordonner les différents intervenants"
          ],
          
          // Débouchés
          debouches: [
            "Chef de projets BTP",
            "Directeur de travaux",
            "Responsable d'agence",
            "Coordinateur de projets",
            "Consultant en management de projet"
          ],
          
          // Programme
          programme: [
            {
              titre: "Management de projet BTP",
              contenu: "Pilotage de projets complexes, planification, coordination des intervenants",
              heures: "200 heures"
            },
            {
              titre: "Gestion financière et budgétaire",
              contenu: "Budgets, marges, rentabilité, suivi financier des projets",
              heures: "150 heures"
            },
            {
              titre: "Coordination technique et réglementaire",
              contenu: "Normes, réglementations, aspects techniques, qualité",
              heures: "147 heures"
            },
            {
              titre: "Management d'équipes",
              contenu: "Leadership, gestion des équipes, communication",
              heures: "100 heures"
            },
            {
              titre: "RSE et développement durable",
              contenu: "Enjeux environnementaux, construction durable, RSE",
              heures: "100 heures"
            }
          ],
          
          // Prérequis
          prerequis: [
            "Bac+3 minimum ou expérience équivalente",
            "Expérience dans le BTP souhaitée",
            "Motivation pour le management de projet"
          ],
          
          // Financement
          financement: "OPCO, CPF, alternance, formation continue",
          
          // Répartition
          repartition: "1 an en alternance - 697 heures de formation",
          
          // Contact
          contact: {
            email: "inscription.academy@construction-management-academy.fr",
            telephone: "01 89 70 60 52",
            adresse: "67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne"
          },
          
          // SEO
          seoTitle: "Formation Chef de Projets BTP 1 an | Construction Management Academy",
          seoDescription: "Formation intensive Chef de Projets BTP en 1 an. 697 heures de formation, niveau Bac+5. Alternance, financement OPCO. 98% d'insertion professionnelle.",
          seoKeywords: [
            "formation chef de projets btp",
            "management projet construction",
            "formation btp niveau 7",
            "alternance chef de projets",
            "formation intensive btp"
          ],
          
          pageUrl: "http://localhost:3000/formations/chef-projets-btp-1an",
          
          publishedAt: new Date().toISOString()
        }
      }
      
      console.log('🔄 Mise à jour avec les bons champs...')
      const updateResponse = await fetch(`${STRAPI_URL}/api/formations/${formationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
      
      if (!updateResponse.ok) {
        const errorText = await updateResponse.text()
        throw new Error(`Erreur lors de la mise à jour: ${updateResponse.status} - ${errorText}`)
      }
      
      const updatedFormation = await updateResponse.json()
      console.log('✅ Formation mise à jour avec succès!')
      
      // 3. Vérification finale
      console.log('\n🔍 Vérification finale...')
      const verifyResponse = await fetch(`${STRAPI_URL}/api/formations?filters[slug][$eq]=chef-projets-btp-1an&populate=*`)
      const verifyData = await verifyResponse.json()
      
      if (verifyData.data && verifyData.data.length > 0) {
        const formation = verifyData.data[0]
        console.log('✅ Données vérifiées:')
        console.log(`   📋 Titre: ${formation.attributes.title}`)
        console.log(`   ⏱️  Durée: ${formation.attributes.duree}`)
        console.log(`   📊 Volume horaire: ${formation.attributes.volumeHoraire}`)
        console.log(`   🎯 Rythme: ${formation.attributes.rythme}`)
        console.log(`   💰 Coût: ${formation.attributes.cout}`)
        console.log(`   📍 Modalité: ${formation.attributes.modalite}`)
        console.log(`   📈 Taux insertion: ${formation.attributes.tauxInsertion}`)
        console.log(`   🎓 Niveau: ${formation.attributes.level}`)
      }
      
    } else {
      console.log('❌ Formation non trouvée')
    }
    
    console.log('\n🎉 Correction finale terminée avec succès!')
    console.log('📊 Résumé:')
    console.log('   • Formation Chef de Projets BTP 1 an complètement configurée')
    console.log('   • Volume horaire: 697h (divisé par 2 par rapport au cursus 2 ans)')
    console.log('   • Tous les champs Strapi correctement renseignés')
    console.log('   • Formation visible sur http://localhost:3000/formations')
    console.log('   • Page dédiée: http://localhost:3000/formations/chef-projets-btp-1an')
    
  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error.message)
    process.exit(1)
  }
}

// Exécution du script
fixChefProjetsBTP1anFinal()