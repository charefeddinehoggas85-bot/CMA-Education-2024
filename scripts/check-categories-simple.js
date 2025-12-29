const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function checkCategories() {
  try {
    console.log('🔍 Vérification des catégories existantes...');
    
    const response = await axios.get(`${STRAPI_URL}/api/formation-categories`);
    const categories = response.data.data;
    
    console.log(`Total catégories: ${categories.length}`);
    
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ID: ${category.id}`);
      console.log(`   Name: "${category.attributes.name}"`);
      console.log(`   Slug: "${category.attributes.slug}"`);
      console.log(`   Description: "${category.attributes.description}"`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

checkCategories();