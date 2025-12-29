#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

console.log('🚀 Mise à jour simple de la formation Chef de Projets BTP...');

async function updateFormation() {
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

        contact: "📞 01 85 09 71 06\n📧 inscription@cma-education.com"
      }
    };

    console.log('📝 Mise à jour en cours...');
    
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
      console.log('📋 Contenu ajouté:');
      console.log('   • Objectifs détaillés');
      console.log('   • 5 compétences clés');
      console.log('   • Programme en 4 modules');
      console.log('   • Informations de contact');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

updateFormation();