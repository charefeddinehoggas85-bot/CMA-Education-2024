#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

console.log('🚀 Mise à jour complète de la formation Chef de Projets BTP...');

async function updateFormationComplete() {
  try {
    // ID de la formation "Chef de Projets BTP - Cursus 1 an" 
    const formationId = 21;
    
    const updateData = {
      data: {
        objectifs: `Cette formation chef de projets BTP professionnalisante prépare des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP : transition énergétique, digitalisation, durabilité, performance économique et innovation managériale.

Elle forme des chefs de projets agiles, stratèges et responsables, capables de répondre aux exigences des Smart Buildings, des Smart Cities, et de la construction durable, tout en maîtrisant les outils les plus avancés du secteur : BIM, IA, Lean Construction, automatisation, gestion financière, etc.`,

        competences2eAnnee: `• Piloter intégralement des projets de construction complexes, de la conception à la livraison
• Intégrer les outils numériques comme le BIM, l'intelligence artificielle et le Lean Construction dans la stratégie de projet
• Gérer les dimensions financières, juridiques, contractuelles et environnementales d'une opération
• Manager des équipes pluridisciplinaires et multiculturelles avec leadership et méthode
• Répondre aux enjeux des territoires intelligents grâce à une vision Smart Building et Smart Cities`,

        programme: `**Conduite et Management stratégique de projets BTP**
Pilotage multi-sites (planification, coordination, Méthodologie, suivi), Management financier, gestion des risques, stratégie d'entreprise, gestion contractuelle

**Technologies numériques et innovation**
BIM avancé, IA appliquée, automatisation, Lean Construction et logistique optimisée

**Transition énergétique et construction durable**
Conception BEPOS, ACV, économie circulaire, certifications environnementales, RSE

**Smart Building & Smart Cities**
Infrastructures connectées, performance énergétique, IoT, urbanisme intelligent`,

        debouches: `À l'issue du BAC+5 Chef de Projet BTP, vous accéderez à des postes à haute responsabilité au sein d'entreprises de construction, de bureaux d'ingénierie, ou encore dans les collectivités publiques.

Grâce à une formation complète et polyvalente, vous serez préparé à exercer des fonctions telles que chef de projets BTP, conducteur de travaux, ingénieur travaux, ou manager de la construction, avec une maîtrise des dimensions techniques, financières et managériales des projets.

Vous pourrez également vous orienter vers des métiers plus stratégiques comme responsable BIM & innovation numérique, ou consultant en stratégie BTP/RSE, en lien avec les transitions environnementales et numériques du secteur.

Enfin, cette formation vous offre les compétences nécessaires pour vous lancer dans l'entrepreneuriat, en développant votre propre activité dans le secteur du Bâtiment, des Travaux Publics, ou dans des domaines porteurs tels que la construction durable et les Smart Cities.`,

        poursuiteEtudes: `Après l'obtention du BAC+5 Chef de Projet BTP, plusieurs possibilités s'offrent à vous si vous souhaitez poursuivre vos études ou vous spécialiser davantage.

Vous pouvez intégrer un Mastère Spécialisé (MS) dans des domaines stratégiques comme :
• Le management de l'innovation dans la construction
• La gestion de projets d'infrastructures durables
• La maîtrise d'ouvrage et d'urbanisme intelligent (Smart Cities)
• La transition énergétique et les systèmes durables

Il est également possible de suivre un MBA ou un Master en école d'ingénieurs ou de commerce, afin de renforcer vos compétences en gestion stratégique, entrepreneuriat, ou développement international dans le secteur du BTP.

Enfin, pour les profils orientés vers la recherche ou l'enseignement supérieur, une inscription en Doctorat (PhD) en lien avec l'ingénierie du bâtiment, l'urbanisme ou l'environnement est envisageable, notamment dans des universités partenaires à l'international.

Ces poursuites d'études vous permettront d'évoluer vers des postes de direction générale, de consultant expert, ou de chef de projets internationaux, avec une forte capacité à innover dans un secteur en pleine mutation.`,

        prerequis: `• Être titulaire d'un BAC+3 professionnel ou technique dans le BTP
• Ou justifier d'un niveau 6 équivalent avec expérience dans le domaine`,

        modalitesEvaluation: `• Contrôle continu en cours de formation
• Projets concrets réalisés en entreprise (dossiers + présentations orales)
• Soutenance finale d'un mémoire professionnel, évalué par un jury d'experts du secteur`,

        duree: "2 ans",
        volumeHoraire: "1393 heures",
        repartition: "40 semaines à l'école, 64 semaines en entreprise",
        typeContrat: "Contrat de professionnalisation",
        modalite: "Formation 100% en présentiel",
        effectif: "20 maximum par session",
        cout: "13€ HT/h DE FORMATION (PRISE EN CHARGE PAR L'OPCO ET L'ENTREPRISE)",

        contact: "📞 01 85 09 71 06\n📧 inscription@cma-education.com",
        
        // Mise à jour du statut
        publishedAt: new Date().toISOString()
      }
    };

    console.log('📝 Mise à jour complète en cours...');
    
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
      console.log('✅ Formation mise à jour avec succès!');
      console.log('📋 Contenu complet ajouté:');
      console.log('   • Objectifs détaillés et professionnels');
      console.log('   • 5 compétences clés de 2e année');
      console.log('   • Programme structuré en 4 modules');
      console.log('   • Débouchés professionnels complets');
      console.log('   • Poursuites d\'études détaillées');
      console.log('   • Prérequis et modalités d\'évaluation');
      console.log('   • Informations pratiques complètes');
      console.log('   • Durée, volume horaire, répartition');
      console.log('   • Type de contrat et modalités');
      console.log('   • Effectif et coût de formation');
      console.log('   • Informations de contact');
      console.log('\n🎉 La formation est maintenant complètement documentée!');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

async function verifyUpdate() {
  try {
    console.log('\n🔍 Vérification de la mise à jour...');
    
    const response = await axios.get(
      `${STRAPI_URL}/api/formations/21?populate=*`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.data) {
      const formation = response.data.data.attributes;
      console.log('✅ Vérification réussie:');
      console.log(`   • Titre: ${formation.title}`);
      console.log(`   • Objectifs: ${formation.objectifs ? '✅ Présent' : '❌ Manquant'}`);
      console.log(`   • Compétences: ${formation.competences2eAnnee ? '✅ Présent' : '❌ Manquant'}`);
      console.log(`   • Programme: ${formation.programme ? '✅ Présent' : '❌ Manquant'}`);
      console.log(`   • Débouchés: ${formation.debouches ? '✅ Présent' : '❌ Manquant'}`);
      console.log(`   • Poursuites: ${formation.poursuiteEtudes ? '✅ Présent' : '❌ Manquant'}`);
      console.log(`   • Prérequis: ${formation.prerequis ? '✅ Présent' : '❌ Manquant'}`);
      console.log(`   • Évaluation: ${formation.modalitesEvaluation ? '✅ Présent' : '❌ Manquant'}`);
      console.log(`   • Durée: ${formation.duree ? '✅ Présent' : '❌ Manquant'}`);
      console.log(`   • Contact: ${formation.contact ? '✅ Présent' : '❌ Manquant'}`);
      
      console.log('\n🌐 La formation est prête pour le frontend!');
    }

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.response?.data || error.message);
  }
}

async function main() {
  await updateFormationComplete();
  await verifyUpdate();
}

main();