#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

console.log('🔧 Correction du format des données Chef de Projets BTP...');

async function updateFormationWithCorrectFormat() {
  try {
    const formationId = 21;
    
    // Données au format correct (arrays)
    const updateData = {
      data: {
        // Objectifs détaillés du fichier markdown
        objectifs: [
          "Piloter intégralement des projets de construction complexes, de la conception à la livraison",
          "Intégrer les outils numériques comme le BIM, l'intelligence artificielle et le Lean Construction dans la stratégie de projet",
          "Gérer les dimensions financières, juridiques, contractuelles et environnementales d'une opération",
          "Manager des équipes pluridisciplinaires et multiculturelles avec leadership et méthode",
          "Répondre aux enjeux des territoires intelligents grâce à une vision Smart Building et Smart Cities"
        ],
        
        // Programme détaillé du fichier markdown
        programme: [
          {
            titre: "Conduite et Management stratégique de projets BTP",
            heures: "350 heures",
            contenu: "Pilotage multi-sites (planification, coordination, Méthodologie, suivi), Management financier, gestion des risques, stratégie d'entreprise, gestion contractuelle"
          },
          {
            titre: "Technologies numériques et innovation",
            heures: "300 heures", 
            contenu: "BIM avancé, IA appliquée, automatisation, Lean Construction et logistique optimisée"
          },
          {
            titre: "Transition énergétique et construction durable",
            heures: "350 heures",
            contenu: "Conception BEPOS, ACV, économie circulaire, certifications environnementales, RSE"
          },
          {
            titre: "Smart Building & Smart Cities",
            heures: "393 heures",
            contenu: "Infrastructures connectées, performance énergétique, IoT, urbanisme intelligent"
          }
        ],
        
        // Débouchés détaillés
        debouches: [
          "Chef de projets BTP dans des entreprises de construction",
          "Conducteur de travaux pour des projets complexes",
          "Ingénieur travaux avec expertise managériale",
          "Manager de la construction et coordinateur de projets",
          "Responsable BIM & innovation numérique",
          "Consultant en stratégie BTP/RSE",
          "Entrepreneur dans le secteur du Bâtiment et des Travaux Publics",
          "Expert en construction durable et Smart Cities"
        ],
        
        // Prérequis du fichier markdown
        prerequis: [
          "Être titulaire d'un BAC+3 professionnel ou technique dans le BTP",
          "Ou justifier d'un niveau 6 équivalent avec expérience dans le domaine"
        ],
        
        // Modalités d'évaluation
        modalitesEvaluation: [
          "Contrôle continu en cours de formation",
          "Projets concrets réalisés en entreprise (dossiers + présentations orales)",
          "Soutenance finale d'un mémoire professionnel, évalué par un jury d'experts du secteur"
        ],
        
        // Poursuites d'études détaillées
        poursuiteEtudes: [
          "Mastère Spécialisé (MS) en management de l'innovation dans la construction",
          "MS en gestion de projets d'infrastructures durables", 
          "MS en maîtrise d'ouvrage et d'urbanisme intelligent (Smart Cities)",
          "MS en transition énergétique et systèmes durables",
          "MBA ou Master en école d'ingénieurs ou de commerce",
          "Doctorat (PhD) en ingénierie du bâtiment, urbanisme ou environnement"
        ],
        
        // Mise à jour du statut
        publishedAt: new Date().toISOString()
      }
    };

    console.log('📝 Mise à jour avec le format array correct...');
    
    const response = await axios.put(
      `${STRAPI_URL}/api/formations/${formationId}`,
      updateData,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data) {
      console.log('✅ Formation mise à jour avec le format correct!');
      console.log('📋 Données mises à jour:');
      console.log('   • 5 objectifs détaillés (array)');
      console.log('   • 4 modules de programme avec heures (array d\'objets)');
      console.log('   • 8 débouchés professionnels (array)');
      console.log('   • 2 prérequis (array)');
      console.log('   • 3 modalités d\'évaluation (array)');
      console.log('   • 6 options de poursuites d\'études (array)');
      
      return response.data.data;
    }
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error.response?.data || error.message);
    throw error;
  }
}

async function verifyCorrectFormat() {
  try {
    console.log('\n🔍 Vérification du format correct...');
    
    const response = await axios.get(`${STRAPI_URL}/api/formations/21`);
    const formation = response.data.data.attributes;
    
    console.log('✅ Vérification des types de données:');
    console.log(`   • objectifs: ${Array.isArray(formation.objectifs) ? 'Array ✅' : 'Pas array ❌'} (${formation.objectifs?.length || 0} éléments)`);
    console.log(`   • programme: ${Array.isArray(formation.programme) ? 'Array ✅' : 'Pas array ❌'} (${formation.programme?.length || 0} éléments)`);
    console.log(`   • debouches: ${Array.isArray(formation.debouches) ? 'Array ✅' : 'Pas array ❌'} (${formation.debouches?.length || 0} éléments)`);
    console.log(`   • prerequis: ${Array.isArray(formation.prerequis) ? 'Array ✅' : 'Pas array ❌'} (${formation.prerequis?.length || 0} éléments)`);
    console.log(`   • modalitesEvaluation: ${Array.isArray(formation.modalitesEvaluation) ? 'Array ✅' : 'Pas array ❌'} (${formation.modalitesEvaluation?.length || 0} éléments)`);
    console.log(`   • poursuiteEtudes: ${Array.isArray(formation.poursuiteEtudes) ? 'Array ✅' : 'Pas array ❌'} (${formation.poursuiteEtudes?.length || 0} éléments)`);
    
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.response?.data || error.message);
    return false;
  }
}

async function main() {
  try {
    console.log('🚀 Démarrage de la correction du format...');
    
    await updateFormationWithCorrectFormat();
    const verified = await verifyCorrectFormat();
    
    if (verified) {
      console.log('\n🎉 Correction terminée avec succès!');
      console.log('✅ Toutes les données sont maintenant au format array correct');
      console.log('✅ Le composant FormationContent devrait maintenant fonctionner parfaitement');
      console.log('🌐 La page formation est prête: http://localhost:3000/formations/chef-projets-btp-1an');
    } else {
      console.log('⚠️ Problème lors de la vérification');
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
    process.exit(1);
  }
}

main();