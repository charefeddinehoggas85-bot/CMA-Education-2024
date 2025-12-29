#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function debugFormationData() {
  try {
    console.log('🔍 Debug de la structure des données de formation...');
    
    const response = await axios.get('http://localhost:1337/api/formations/21');
    const formation = response.data.data.attributes;
    
    console.log('📋 Structure complète des données:');
    
    // Analyser chaque champ problématique
    const problematicFields = ['objectifs', 'programme', 'debouches', 'prerequis', 'modalitesEvaluation', 'poursuiteEtudes'];
    
    problematicFields.forEach(fieldName => {
      const field = formation[fieldName];
      console.log(`\n🔍 ${fieldName}:`);
      console.log(`   Type: ${typeof field}`);
      console.log(`   Is Array: ${Array.isArray(field)}`);
      console.log(`   Is null: ${field === null}`);
      console.log(`   Is undefined: ${field === undefined}`);
      
      if (field && typeof field === 'object') {
        console.log(`   Object keys: ${Object.keys(field)}`);
        console.log(`   Object content: ${JSON.stringify(field, null, 2)}`);
      } else if (field) {
        console.log(`   Content preview: "${field.toString().substring(0, 100)}..."`);
      }
    });
    
    // Vérifier si les données sont dans un format spécial
    console.log('\n� Recoherche de données dans d\'autres formats...');
    
    // Chercher des champs avec des noms similaires
    Object.keys(formation).forEach(key => {
      if (key.toLowerCase().includes('objectif') || 
          key.toLowerCase().includes('programme') || 
          key.toLowerCase().includes('debouche') || 
          key.toLowerCase().includes('prerequis') || 
          key.toLowerCase().includes('evaluation') || 
          key.toLowerCase().includes('poursuite')) {
        console.log(`   Champ trouvé: ${key} (${typeof formation[key]})`);
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

debugFormationData();