#!/usr/bin/env node

/**
 * Script de test pour l'import des formations d'exemple via Strapi
 * Vérifie que tout fonctionne correctement avant l'import réel
 */

const axios = require('axios');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || 'your-strapi-token';

console.log('🧪 Test de l\'import des formations d\'exemple');
console.log('=' .repeat(50));

// Tests de connectivité et prérequis
async function runTests() {
  const results = {
    connectivity: false,
    contentTypes: false,
    permissions: false,
    upload: false,
    ready: false
  };

  try {
    // Test 1: Connectivité Strapi
    console.log('\n1️⃣ Test de connectivité Strapi...');
    const healthCheck = await axios.get(`${STRAPI_URL}/api/formations`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
    });
    console.log('✅ Connexion Strapi OK');
    results.connectivity = true;

    // Test 2: Vérification des content types
    console.log('\n2️⃣ Vérification des content types...');
    
    // Test formations
    try {
      await axios.get(`${STRAPI_URL}/api/formations`, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
      });
      console.log('✅ Content type "formations" disponible');
    } catch (error) {
      console.log('❌ Content type "formations" manquant');
      return results;
    }

    // Test categories
    try {
      await axios.get(`${STRAPI_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
      });
      console.log('✅ Content type "categories" disponible');
      results.contentTypes = true;
    } catch (error) {
      console.log('❌ Content type "categories" manquant');
      return results;
    }

    // Test 3: Permissions d'écriture
    console.log('\n3️⃣ Test des permissions d\'écriture...');
    
    // Test création catégorie
    try {
      const testCategory = await axios.post(`${STRAPI_URL}/api/categories`, {
        data: {
          name: 'Test Category',
          slug: 'test-category-' + Date.now(),
          description: 'Catégorie de test',
          publishedAt: new Date().toISOString()
        }
      }, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
      });
      
      console.log('✅ Création de catégorie autorisée');
      
      // Supprimer la catégorie de test
      await axios.delete(`${STRAPI_URL}/api/categories/${testCategory.data.data.id}`, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
      });
      console.log('✅ Suppression de catégorie autorisée');
      
      results.permissions = true;
    } catch (error) {
      console.log('❌ Permissions insuffisantes pour les catégories');
      console.log('   Erreur:', error.response?.data?.error?.message || error.message);
      return results;
    }

    // Test 4: Upload d'images
    console.log('\n4️⃣ Test d\'upload d\'images...');
    
    try {
      const FormData = require('form-data');
      const testSvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#3B82F6"/>
        <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="12">TEST</text>
      </svg>`;
      
      const formData = new FormData();
      formData.append('files', Buffer.from(testSvg), 'test-image.svg');
      
      const uploadResponse = await axios.post(`${STRAPI_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
          ...formData.getHeaders()
        }
      });
      
      console.log('✅ Upload d\'images autorisé');
      
      // Supprimer l'image de test
      if (uploadResponse.data[0]?.id) {
        try {
          await axios.delete(`${STRAPI_URL}/api/upload/files/${uploadResponse.data[0].id}`, {
            headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
          });
          console.log('✅ Suppression d\'images autorisée');
        } catch (deleteError) {
          console.log('⚠️  Suppression d\'image échouée (pas critique)');
        }
      }
      
      results.upload = true;
    } catch (error) {
      console.log('❌ Upload d\'images échoué');
      console.log('   Erreur:', error.response?.data?.error?.message || error.message);
      return results;
    }

    results.ready = true;
    return results;

  } catch (error) {
    console.log('❌ Erreur de connectivité:', error.response?.data?.error?.message || error.message);
    return results;
  }
}

// Affichage des résultats
function displayResults(results) {
  console.log('\n' + '='.repeat(50));
  console.log('📊 RÉSULTATS DES TESTS');
  console.log('='.repeat(50));
  
  console.log(`\n🔗 Connectivité Strapi: ${results.connectivity ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`📋 Content Types: ${results.contentTypes ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🔐 Permissions: ${results.permissions ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`📸 Upload Images: ${results.upload ? '✅ OK' : '❌ ÉCHEC'}`);
  
  console.log(`\n🎯 STATUT GLOBAL: ${results.ready ? '✅ PRÊT POUR L\'IMPORT' : '❌ CONFIGURATION REQUISE'}`);
  
  if (results.ready) {
    console.log('\n🚀 Vous pouvez maintenant lancer l\'import:');
    console.log('   node scripts/import-formations-examples-with-images.js');
  } else {
    console.log('\n🔧 Actions requises:');
    
    if (!results.connectivity) {
      console.log('   • Vérifier l\'URL Strapi et le token d\'authentification');
      console.log('   • S\'assurer que Strapi est démarré et accessible');
    }
    
    if (!results.contentTypes) {
      console.log('   • Créer les content types "formations" et "categories"');
      console.log('   • Vérifier la structure des APIs');
    }
    
    if (!results.permissions) {
      console.log('   • Configurer les permissions d\'écriture pour les APIs');
      console.log('   • Vérifier les rôles et permissions dans Strapi Admin');
    }
    
    if (!results.upload) {
      console.log('   • Configurer les permissions d\'upload');
      console.log('   • Vérifier les limites de taille de fichiers');
    }
  }
  
  console.log('\n💡 Variables d\'environnement:');
  console.log(`   STRAPI_URL=${STRAPI_URL}`);
  console.log(`   STRAPI_TOKEN=${STRAPI_TOKEN ? '[CONFIGURÉ]' : '[MANQUANT]'}`);
}

// Fonction principale
async function main() {
  console.log('🔍 Vérification des prérequis pour l\'import...\n');
  
  const results = await runTests();
  displayResults(results);
  
  if (results.ready) {
    console.log('\n🎉 Tous les tests sont passés avec succès !');
    process.exit(0);
  } else {
    console.log('\n⚠️  Certains tests ont échoué. Veuillez corriger les problèmes avant de continuer.');
    process.exit(1);
  }
}

// Lancer les tests si le script est exécuté directement
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erreur lors des tests:', error.message);
    process.exit(1);
  });
}

module.exports = { runTests };
