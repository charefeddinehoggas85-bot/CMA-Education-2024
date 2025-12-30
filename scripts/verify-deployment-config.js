#!/usr/bin/env node

/**
 * Script de vérification de la configuration de déploiement
 * Vérifie que Railway et Vercel sont bien configurés
 */

const https = require('https');
const http = require('http');

// Configuration
const FRONTEND_URL = 'https://cma-education-2024.vercel.app';
const STRAPI_URL = process.argv[2]; // URL Railway à passer en paramètre

console.log('🔍 Vérification de la configuration de déploiement...\n');

// Fonction pour faire une requête HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data,
          headers: res.headers
        });
      });
    }).on('error', reject);
  });
}

async function checkDeployment() {
  console.log('📋 Checklist de déploiement:\n');
  
  // 1. Vérifier Frontend Vercel
  console.log('1️⃣ Test Frontend Vercel...');
  try {
    const frontendResponse = await makeRequest(FRONTEND_URL);
    if (frontendResponse.status === 200) {
      console.log('   ✅ Frontend accessible');
      console.log(`   📊 Status: ${frontendResponse.status}`);
    } else {
      console.log(`   ❌ Frontend erreur: ${frontendResponse.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Frontend inaccessible: ${error.message}`);
  }
  
  // 2. Vérifier Strapi Railway (si URL fournie)
  if (STRAPI_URL) {
    console.log('\n2️⃣ Test Strapi Railway...');
    try {
      const strapiResponse = await makeRequest(STRAPI_URL);
      if (strapiResponse.status === 200) {
        console.log('   ✅ Strapi accessible');
        console.log(`   📊 Status: ${strapiResponse.status}`);
      } else {
        console.log(`   ❌ Strapi erreur: ${strapiResponse.status}`);
      }
    } catch (error) {
      console.log(`   ❌ Strapi inaccessible: ${error.message}`);
    }
    
    // 3. Vérifier API Strapi
    console.log('\n3️⃣ Test API Strapi...');
    try {
      const apiResponse = await makeRequest(`${STRAPI_URL}/api/formations`);
      if (apiResponse.status === 200) {
        console.log('   ✅ API Strapi accessible');
        const data = JSON.parse(apiResponse.data);
        console.log(`   📊 Formations trouvées: ${data.data ? data.data.length : 0}`);
      } else {
        console.log(`   ❌ API Strapi erreur: ${apiResponse.status}`);
      }
    } catch (error) {
      console.log(`   ❌ API Strapi inaccessible: ${error.message}`);
    }
    
    // 4. Vérifier Admin Strapi
    console.log('\n4️⃣ Test Admin Strapi...');
    try {
      const adminResponse = await makeRequest(`${STRAPI_URL}/admin`);
      if (adminResponse.status === 200) {
        console.log('   ✅ Panel admin accessible');
      } else {
        console.log(`   ❌ Panel admin erreur: ${adminResponse.status}`);
      }
    } catch (error) {
      console.log(`   ❌ Panel admin inaccessible: ${error.message}`);
    }
  } else {
    console.log('\n2️⃣ ⚠️  URL Strapi non fournie');
    console.log('   Usage: node verify-deployment-config.js https://votre-app.up.railway.app');
  }
  
  // 5. Vérifications des variables d'environnement
  console.log('\n5️⃣ Variables d\'environnement à vérifier:');
  console.log('   📋 Railway (Strapi):');
  console.log('      - DATABASE_URL ✓');
  console.log('      - HOST=0.0.0.0');
  console.log('      - PORT=1337');
  console.log('      - NODE_ENV=production');
  console.log('      - APP_KEYS (2 clés)');
  console.log('      - API_TOKEN_SALT');
  console.log('      - ADMIN_JWT_SECRET');
  console.log('      - TRANSFER_TOKEN_SALT');
  console.log('      - JWT_SECRET');
  console.log('      - FRONTEND_URL');
  
  console.log('\n   📋 Vercel (Frontend):');
  console.log('      - NEXT_PUBLIC_STRAPI_URL');
  console.log('      - STRAPI_API_TOKEN');
  
  console.log('\n🎯 Prochaines étapes:');
  console.log('   1. Déployez Strapi sur Railway');
  console.log('   2. Configurez les variables d\'environnement');
  console.log('   3. Créez le compte admin Strapi');
  console.log('   4. Générez l\'API Token');
  console.log('   5. Mettez à jour Vercel avec le token');
  console.log('   6. Testez la connexion complète');
  
  console.log('\n✨ Une fois terminé, votre site sera en ligne !');
}

// Exécuter la vérification
checkDeployment().catch(console.error);