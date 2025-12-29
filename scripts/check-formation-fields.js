#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkFields() {
  try {
    const response = await axios.get('http://localhost:1337/api/formations/21');
    const formation = response.data.data.attributes;
    
    console.log('📋 Champs disponibles dans la formation:');
    Object.keys(formation).forEach(key => {
      const value = formation[key];
      const type = Array.isArray(value) ? 'array' : typeof value;
      const hasContent = value && (typeof value === 'string' ? value.length > 0 : true);
      console.log(`• ${key}: ${type} ${hasContent ? '✅' : '❌'}`);
    });
    
    // Vérifier spécifiquement les champs qui nous intéressent
    console.log('\n🔍 Champs spécifiques:');
    console.log(`• modalitesEvaluation: ${formation.modalitesEvaluation ? 'présent' : 'absent'}`);
    console.log(`• evaluation: ${formation.evaluation ? 'présent' : 'absent'}`);
    console.log(`• poursuiteEtudes: ${formation.poursuiteEtudes ? 'présent' : 'absent'}`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

checkFields();