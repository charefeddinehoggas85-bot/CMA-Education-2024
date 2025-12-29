#!/usr/bin/env node

/**
 * Diagnostic en temps réel du problème de téléchargement de brochures
 */

require('dotenv').config({ path: '.env.local' });

async function testFormationData() {
  console.log('🔍 Test des données de formation reçues par le composant...');
  
  try {
    // Test comme le fait getFormation dans le frontend
    const response = await fetch('http://localhost:3000/api/formations/chef-projets-btp-1an');
    
    if (!response.ok) {
      console.log('❌ API frontend non accessible:', response.status);
      return null;
    }
    
    const formation = await response.json();
    
    console.log('📋 Formation reçue par le composant:');
    console.log('- ID:', formation.id);
    console.log('- Title:', formation.title);
    console.log('- Slug:', formation.slug);
    
    // Vérifier la structure brochure
    console.log('\n📄 Structure brochure:');
    if (formation.brochure) {
      console.log('✅ formation.brochure existe');
      console.log('Type:', typeof formation.brochure);
      
      if (formation.brochure.data) {
        console.log('✅ formation.brochure.data existe');
        console.log('✅ formation.brochure.data.attributes:', !!formation.brochure.data.attributes);
        console.log('✅ formation.brochure.data.attributes.url:', formation.brochure.data.attributes?.url);
      } else {
        console.log('❌ formation.brochure.data manquant');
        console.log('Structure actuelle:', JSON.stringify(formation.brochure, null, 2));
      }
    } else {
      console.log('❌ formation.brochure manquant');
    }
    
    return formation;
    
  } catch (error) {
    console.error('❌ Erreur test formation:', error.message);
    return null;
  }
}

async function testStrapiDirect() {
  console.log('\n🔍 Test Strapi direct...');
  
  try {
    const response = await fetch('http://localhost:1337/api/formations?filters[slug][$eq]=chef-projets-btp-1an&populate=brochure');
    
    if (!response.ok) {
      console.log('❌ Strapi non accessible');
      return null;
    }
    
    const data = await response.json();
    const formation = data.data[0];
    
    console.log('📋 Données Strapi brutes:');
    console.log('- Formation:', formation.attributes.title);
    console.log('- Brochure structure:', JSON.stringify(formation.attributes.brochure, null, 2));
    
    return formation.attributes;
    
  } catch (error) {
    console.error('❌ Erreur Strapi:', error.message);
    return null;
  }
}

function checkBrochureModalCode() {
  console.log('\n🔍 Vérification du code BrochureModal...');
  
  const fs = require('fs');
  
  try {
    const content = fs.readFileSync('src/components/ui/BrochureModal.tsx', 'utf8');
    
    // Chercher les conditions de vérification
    const brochureChecks = [
      'formation.brochure?.data',
      'formation.brochure',
      'brochureData',
      'impossible de télécharger'
    ];
    
    brochureChecks.forEach(check => {
      const found = content.includes(check);
      console.log(`${found ? '✅' : '❌'} Code contient "${check}": ${found}`);
    });
    
    // Extraire la logique de vérification
    const ifMatch = content.match(/if \(([^)]+)\) \{[^}]*brochureUrl/);
    if (ifMatch) {
      console.log('🔧 Condition de vérification détectée:', ifMatch[1]);
    }
    
    // Chercher les messages d'erreur
    const errorMatches = content.match(/throw new Error\(['"`]([^'"`]+)['"`]\)/g);
    if (errorMatches) {
      console.log('⚠️ Messages d\'erreur trouvés:');
      errorMatches.forEach(match => console.log('  -', match));
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lecture BrochureModal:', error.message);
    return false;
  }
}

async function simulateModalLogic(formation) {
  console.log('\n🧪 Simulation de la logique BrochureModal...');
  
  if (!formation) {
    console.log('❌ Pas de données de formation');
    return false;
  }
  
  console.log('📋 Test des conditions:');
  
  // Test condition 1: formation.brochure?.data?.attributes?.url
  const condition1 = formation.brochure?.data?.attributes?.url;
  console.log(`1. formation.brochure?.data?.attributes?.url: ${condition1 ? '✅' : '❌'}`);
  if (condition1) {
    console.log('   URL:', condition1);
  }
  
  // Test condition 2: typeof formation.brochure === 'string'
  const condition2 = typeof formation.brochure === 'string';
  console.log(`2. typeof formation.brochure === 'string': ${condition2 ? '✅' : '❌'}`);
  
  // Test condition globale
  const globalCondition = formation.brochure?.data || formation.brochure;
  console.log(`3. formation.brochure?.data || formation.brochure: ${globalCondition ? '✅' : '❌'}`);
  
  if (condition1) {
    const brochureUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${formation.brochure.data.attributes.url}`;
    console.log('✅ URL construite:', brochureUrl);
    
    // Test accès fichier
    try {
      const fileResponse = await fetch(brochureUrl);
      console.log(`✅ Fichier accessible: ${fileResponse.ok ? 'OUI' : 'NON'} (${fileResponse.status})`);
      return true;
    } catch (error) {
      console.log('❌ Erreur accès fichier:', error.message);
      return false;
    }
  } else if (condition2) {
    console.log('✅ Brochure est une string:', formation.brochure);
    return true;
  } else {
    console.log('❌ Aucune condition remplie - ERREUR ATTENDUE');
    console.log('Structure brochure reçue:', JSON.stringify(formation.brochure, null, 2));
    return false;
  }
}

function showFixSuggestion(frontendData, strapiData) {
  console.log('\n💡 ANALYSE ET SOLUTION:');
  
  if (!frontendData && !strapiData) {
    console.log('❌ Problème de connectivité - vérifiez les serveurs');
    return;
  }
  
  if (strapiData && !frontendData) {
    console.log('❌ Problème dans l\'API frontend - vérifiez getFormation');
    return;
  }
  
  if (frontendData && strapiData) {
    const frontendHasBrochure = frontendData.brochure?.data?.attributes?.url;
    const strapiHasBrochure = strapiData.brochure?.data?.attributes?.url;
    
    if (strapiHasBrochure && !frontendHasBrochure) {
      console.log('❌ PROBLÈME: La brochure existe dans Strapi mais pas dans le frontend');
      console.log('💡 SOLUTION: Vérifier la fonction getFormation dans src/lib/strapi.ts');
      console.log('   - S\'assurer que populate=brochure est inclus');
      console.log('   - Vérifier la transformation des données');
    } else if (!strapiHasBrochure) {
      console.log('❌ PROBLÈME: Pas de brochure dans Strapi');
      console.log('💡 SOLUTION: Uploader une brochure dans Strapi admin');
    } else {
      console.log('✅ Les données semblent correctes');
      console.log('💡 VÉRIFICATION: Regarder la console navigateur pour les erreurs JavaScript');
    }
  }
}

async function main() {
  console.log('🚀 Diagnostic en temps réel - Problème "impossible de télécharger"\n');
  
  // Tests
  const frontendData = await testFormationData();
  const strapiData = await testStrapiDirect();
  const modalCheck = checkBrochureModalCode();
  
  if (frontendData) {
    await simulateModalLogic(frontendData);
  }
  
  showFixSuggestion(frontendData, strapiData);
  
  console.log('\n📋 RÉSUMÉ DIAGNOSTIC:');
  console.log(`🌐 API Frontend: ${frontendData ? '✅' : '❌'}`);
  console.log(`🔧 Strapi Direct: ${strapiData ? '✅' : '❌'}`);
  console.log(`📱 BrochureModal: ${modalCheck ? '✅' : '❌'}`);
  
  console.log('\n🎯 PROCHAINES ÉTAPES:');
  console.log('1. Vérifiez que les serveurs sont démarrés (npm run dev + Strapi)');
  console.log('2. Testez manuellement sur http://localhost:3000/formations/chef-projets-btp-1an');
  console.log('3. Ouvrez F12 > Console pour voir les erreurs JavaScript');
  console.log('4. Vérifiez les logs de ce script pour identifier le problème exact');
}

main().catch(console.error);