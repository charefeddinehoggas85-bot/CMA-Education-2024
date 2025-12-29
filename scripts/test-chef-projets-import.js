#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || process.env.STRAPI_TOKEN;

console.log('🔍 Test de connexion Strapi...');
console.log('URL:', STRAPI_URL);
console.log('Token présent:', !!STRAPI_TOKEN);

async function testConnection() {
  try {
    const response = await axios.get(
      `${STRAPI_URL}/api/formations?filters[title][$containsi]=chef de projets btp`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Connexion réussie');
    console.log('Formations trouvées:', response.data.data.length);
    
    response.data.data.forEach(formation => {
      console.log(`- ${formation.attributes.title || formation.attributes.titre || 'Titre non défini'} (ID: ${formation.id})`);
      console.log('  Attributs disponibles:', Object.keys(formation.attributes));
    });

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

testConnection();