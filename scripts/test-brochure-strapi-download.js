#!/usr/bin/env node

/**
 * Test spécifique du téléchargement des brochures Strapi
 */

require('dotenv').config({ path: '.env.local' });

async function testBrochureURL() {
  console.log('🔍 Test de l\'URL de brochure Strapi...');
  
  try {
    // Récupérer la formation Chef de Projets BTP avec brochure
    const response = await fetch('http://localhost:1337/api/formations?filters[slug][$eq]=chef-projets-btp-1an&populate=brochure');
    
    if (!response.ok) {
      console.log('❌ Impossible de récupérer la formation');
      return false;
    }
    
    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      console.log('❌ Formation non trouvée');
      return false;
    }
    
    const formation = data.data[0];
    const brochure = formation.attributes.brochure;
    
    if (!brochure?.data) {
      console.log('❌ Pas de brochure attachée');
      return false;
    }
    
    console.log('✅ Formation trouvée:', formation.attributes.title);
    console.log('📄 Brochure URL:', brochure.data.attributes.url);
    console.log('📏 Taille:', brochure.data.attributes.size, 'bytes');
    
    // Construire l'URL complète
    const fullURL = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${brochure.data.attributes.url}`;
    console.log('🔗 URL complète:', fullURL);
    
    // Tester l'accès au fichier
    console.log('\n🧪 Test d\'accès au fichier...');
    const fileResponse = await fetch(fullURL);
    
    if (fileResponse.ok) {
      console.log('✅ Fichier accessible');
      console.log('📋 Content-Type:', fileResponse.headers.get('content-type'));
      console.log('📏 Content-Length:', fileResponse.headers.get('content-length'));
      return { formation, brochure, fullURL };
    } else {
      console.log('❌ Fichier non accessible:', fileResponse.status, fileResponse.statusText);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return false;
  }
}

async function testBrowserDownload() {
  console.log('\n🌐 Test de téléchargement navigateur...');
  
  const testResult = await testBrochureURL();
  
  if (!testResult) {
    console.log('❌ Impossible de tester - brochure non accessible');
    return;
  }
  
  const { fullURL } = testResult;
  
  console.log('💡 Code JavaScript pour téléchargement:');
  console.log(`
// Code qui devrait fonctionner dans le navigateur:
const link = document.createElement('a');
link.href = '${fullURL}';
link.download = 'brochure-chef-projets-btp.pdf';
link.target = '_blank';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
  `);
}

function checkBrochureModalLogic() {
  console.log('\n🔍 Vérification de la logique BrochureModal...');
  
  const fs = require('fs');
  
  try {
    const modalContent = fs.readFileSync('src/components/ui/BrochureModal.tsx', 'utf8');
    
    // Vérifier la logique de construction d'URL
    const hasUrlConstruction = modalContent.includes('process.env.NEXT_PUBLIC_STRAPI_URL');
    const hasBrochureCheck = modalContent.includes('formation.brochure');
    const hasDownloadLogic = modalContent.includes('link.download');
    
    console.log(`🔗 Construction URL Strapi: ${hasUrlConstruction ? '✅' : '❌'}`);
    console.log(`📄 Vérification brochure: ${hasBrochureCheck ? '✅' : '❌'}`);
    console.log(`⬇️ Logique téléchargement: ${hasDownloadLogic ? '✅' : '❌'}`);
    
    // Extraire la partie critique du code
    const urlConstructionMatch = modalContent.match(/brochureUrl = `([^`]+)`/);
    if (urlConstructionMatch) {
      console.log('🔧 Construction URL détectée:', urlConstructionMatch[1]);
    }
    
    return { hasUrlConstruction, hasBrochureCheck, hasDownloadLogic };
    
  } catch (error) {
    console.error('❌ Erreur lecture BrochureModal:', error.message);
    return null;
  }
}

function showCommonIssues() {
  console.log('\n🔧 PROBLÈMES COURANTS ET SOLUTIONS:');
  console.log('');
  console.log('1. 🚫 Erreur CORS:');
  console.log('   - Vérifier les middlewares Strapi');
  console.log('   - Autoriser les téléchargements depuis localhost:3000');
  console.log('');
  console.log('2. 📁 Fichier non trouvé:');
  console.log('   - Vérifier que le fichier existe dans cms-cma/public/uploads/');
  console.log('   - Vérifier les permissions du dossier uploads');
  console.log('');
  console.log('3. 🔗 URL incorrecte:');
  console.log('   - Vérifier NEXT_PUBLIC_STRAPI_URL dans .env.local');
  console.log('   - S\'assurer que l\'URL se termine par le bon chemin');
  console.log('');
  console.log('4. 🌐 Problème navigateur:');
  console.log('   - Tester dans un autre navigateur');
  console.log('   - Vérifier la console développeur pour les erreurs');
  console.log('');
  console.log('5. 📱 Problème modal:');
  console.log('   - Vérifier que le composant reçoit bien les données formation');
  console.log('   - Vérifier la structure des données brochure');
}

function showFixSuggestions() {
  console.log('\n💡 CORRECTIONS SUGGÉRÉES:');
  console.log('');
  console.log('1. 🔧 Mise à jour BrochureModal (si nécessaire):');
  console.log(`
// Dans handleSubmit, remplacer la logique de téléchargement par:
if (formation.brochure?.data) {
  const brochureUrl = \`\${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}\${formation.brochure.data.attributes.url}\`;
  
  // Téléchargement direct
  const link = document.createElement('a');
  link.href = brochureUrl;
  link.download = \`brochure-\${formation.slug}.pdf\`;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
  `);
  
  console.log('2. 🌐 Vérification CORS Strapi:');
  console.log(`
// Dans cms-cma/config/middlewares.ts, s'assurer que:
'strapi::cors': {
  enabled: true,
  config: {
    origin: ['http://localhost:3000', 'http://localhost:1337'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  },
}
  `);
}

async function main() {
  console.log('🚀 Test spécifique du téléchargement de brochures Strapi\n');
  
  // Tests
  const urlTest = await testBrochureURL();
  const modalCheck = checkBrochureModalLogic();
  await testBrowserDownload();
  
  console.log('\n📊 RÉSUMÉ:');
  console.log(`🔗 URL brochure Strapi: ${urlTest ? '✅' : '❌'}`);
  console.log(`📱 Logique BrochureModal: ${modalCheck ? '✅' : '❌'}`);
  
  if (urlTest && modalCheck) {
    console.log('\n🎉 CONFIGURATION CORRECTE!');
    console.log('💡 Si le téléchargement ne fonctionne toujours pas:');
    console.log('   - Vérifiez la console navigateur pour les erreurs');
    console.log('   - Testez manuellement l\'URL de la brochure');
    console.log('   - Vérifiez les permissions du dossier uploads');
  } else {
    console.log('\n⚠️ PROBLÈME DÉTECTÉ');
    showCommonIssues();
    showFixSuggestions();
  }
}

main().catch(console.error);