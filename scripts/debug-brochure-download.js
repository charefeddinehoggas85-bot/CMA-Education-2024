#!/usr/bin/env node

/**
 * Diagnostic du problème de téléchargement de brochures
 */

require('dotenv').config({ path: '.env.local' });

async function checkBrochureModal() {
  console.log('🔍 Vérification du composant BrochureModal...');
  
  const fs = require('fs');
  
  try {
    const modalContent = fs.readFileSync('src/components/ui/BrochureModal.tsx', 'utf8');
    
    // Vérifier les imports
    const hasGeneratePDF = modalContent.includes('generateBrochurePDF');
    const hasSimpleEmail = modalContent.includes('sendBrochureNotification');
    
    console.log(`📄 Import generateBrochurePDF: ${hasGeneratePDF ? '✅' : '❌'}`);
    console.log(`📧 Import sendBrochureNotification: ${hasSimpleEmail ? '✅' : '❌'}`);
    
    // Vérifier la logique de téléchargement
    const hasDownloadLogic = modalContent.includes('generateBrochurePDF(formation, formData)');
    const hasStrapiLogic = modalContent.includes('formation.brochure');
    
    console.log(`🔧 Logique génération PDF: ${hasDownloadLogic ? '✅' : '❌'}`);
    console.log(`📁 Logique brochure Strapi: ${hasStrapiLogic ? '✅' : '❌'}`);
    
    return { hasGeneratePDF, hasSimpleEmail, hasDownloadLogic, hasStrapiLogic };
    
  } catch (error) {
    console.error('❌ Erreur lecture BrochureModal:', error.message);
    return null;
  }
}

async function checkPDFGenerator() {
  console.log('\n🔍 Vérification du générateur PDF...');
  
  const fs = require('fs');
  
  try {
    if (fs.existsSync('src/lib/pdf-generator.ts')) {
      console.log('✅ pdf-generator.ts existe');
      
      const content = fs.readFileSync('src/lib/pdf-generator.ts', 'utf8');
      const hasGenerateFunction = content.includes('export async function generateBrochurePDF');
      
      console.log(`🔧 Fonction generateBrochurePDF: ${hasGenerateFunction ? '✅' : '❌'}`);
      
      return true;
    } else {
      console.log('❌ pdf-generator.ts manquant');
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur vérification PDF generator:', error.message);
    return false;
  }
}

async function checkStrapiFormations() {
  console.log('\n🔍 Vérification des formations Strapi...');
  
  try {
    const response = await fetch('http://localhost:1337/api/formations?populate=brochure');
    
    if (!response.ok) {
      console.log('❌ Strapi non accessible ou formations non trouvées');
      return false;
    }
    
    const data = await response.json();
    console.log(`📊 Formations trouvées: ${data.data?.length || 0}`);
    
    // Vérifier les brochures
    let formationsWithBrochure = 0;
    if (data.data) {
      data.data.forEach(formation => {
        if (formation.attributes.brochure?.data) {
          formationsWithBrochure++;
          console.log(`✅ ${formation.attributes.title}: Brochure disponible`);
        } else {
          console.log(`❌ ${formation.attributes.title}: Pas de brochure`);
        }
      });
    }
    
    console.log(`📁 Formations avec brochure: ${formationsWithBrochure}/${data.data?.length || 0}`);
    
    return formationsWithBrochure > 0;
    
  } catch (error) {
    console.error('❌ Erreur vérification Strapi:', error.message);
    return false;
  }
}

async function testFormationSpecific() {
  console.log('\n🔍 Test formation spécifique (Chef de Projets BTP)...');
  
  try {
    const response = await fetch('http://localhost:1337/api/formations?filters[slug][$eq]=chef-projets-btp-1an&populate=brochure');
    
    if (!response.ok) {
      console.log('❌ Formation non trouvée');
      return null;
    }
    
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const formation = data.data[0];
      console.log(`📋 Formation: ${formation.attributes.title}`);
      console.log(`🔗 Slug: ${formation.attributes.slug}`);
      
      if (formation.attributes.brochure?.data) {
        console.log('✅ Brochure disponible');
        console.log(`📄 URL: ${formation.attributes.brochure.data.attributes.url}`);
        console.log(`📏 Taille: ${formation.attributes.brochure.data.attributes.size} bytes`);
      } else {
        console.log('❌ Pas de brochure attachée');
      }
      
      return formation;
    } else {
      console.log('❌ Formation non trouvée');
      return null;
    }
    
  } catch (error) {
    console.error('❌ Erreur test formation:', error.message);
    return null;
  }
}

function checkPackageJSON() {
  console.log('\n🔍 Vérification des dépendances...');
  
  const fs = require('fs');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const dependencies = {
      'jspdf': packageJson.dependencies?.jspdf || packageJson.devDependencies?.jspdf,
      'html2canvas': packageJson.dependencies?.html2canvas || packageJson.devDependencies?.html2canvas,
      'nodemailer': packageJson.dependencies?.nodemailer || packageJson.devDependencies?.nodemailer
    };
    
    Object.entries(dependencies).forEach(([dep, version]) => {
      console.log(`📦 ${dep}: ${version ? `✅ ${version}` : '❌ Manquant'}`);
    });
    
    return dependencies;
    
  } catch (error) {
    console.error('❌ Erreur lecture package.json:', error.message);
    return null;
  }
}

function showSolutions() {
  console.log('\n🔧 SOLUTIONS POSSIBLES:');
  console.log('');
  console.log('1. 📄 Si pdf-generator.ts manque:');
  console.log('   - Créer le générateur PDF avec jsPDF');
  console.log('   - Installer les dépendances: npm install jspdf html2canvas');
  console.log('');
  console.log('2. 📁 Si les brochures Strapi manquent:');
  console.log('   - Uploader des brochures PDF dans Strapi');
  console.log('   - Associer les brochures aux formations');
  console.log('');
  console.log('3. 🔧 Si le composant a des erreurs:');
  console.log('   - Vérifier les imports dans BrochureModal.tsx');
  console.log('   - Vérifier la logique de téléchargement');
  console.log('');
  console.log('4. 🌐 Si Strapi n\'est pas accessible:');
  console.log('   - Démarrer Strapi: cd cms-cma && npm run develop');
  console.log('   - Vérifier le port 1337');
}

async function main() {
  console.log('🚀 Diagnostic du problème de téléchargement de brochures\n');
  
  // Vérifications
  const modalCheck = await checkBrochureModal();
  const pdfCheck = await checkPDFGenerator();
  const packageCheck = checkPackageJSON();
  const strapiCheck = await checkStrapiFormations();
  const formationCheck = await testFormationSpecific();
  
  console.log('\n📊 RÉSUMÉ DU DIAGNOSTIC:');
  console.log(`📱 BrochureModal: ${modalCheck ? '✅' : '❌'}`);
  console.log(`📄 PDF Generator: ${pdfCheck ? '✅' : '❌'}`);
  console.log(`📦 Dépendances: ${packageCheck ? '✅' : '❌'}`);
  console.log(`🌐 Strapi: ${strapiCheck ? '✅' : '❌'}`);
  console.log(`📋 Formation test: ${formationCheck ? '✅' : '❌'}`);
  
  // Identifier le problème principal
  if (!pdfCheck) {
    console.log('\n🎯 PROBLÈME PRINCIPAL: Générateur PDF manquant');
    console.log('💡 SOLUTION: Créer le fichier pdf-generator.ts');
  } else if (!strapiCheck) {
    console.log('\n🎯 PROBLÈME PRINCIPAL: Brochures Strapi manquantes');
    console.log('💡 SOLUTION: Uploader des brochures PDF dans Strapi');
  } else if (!modalCheck) {
    console.log('\n🎯 PROBLÈME PRINCIPAL: Erreur dans BrochureModal');
    console.log('💡 SOLUTION: Corriger les imports et la logique');
  } else {
    console.log('\n🎯 PROBLÈME: Configuration ou serveur');
    console.log('💡 SOLUTION: Vérifier les serveurs et la configuration');
  }
  
  showSolutions();
}

main().catch(console.error);