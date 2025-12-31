#!/usr/bin/env node

/**
 * Test script pour vérifier le carousel horizontal avec les cartes de formations existantes
 * Vérifie que les formations sont correctement importées et affichées horizontalement
 */

const fs = require('fs');
const path = require('path');

console.log('🎠 Test du Carousel Horizontal avec Formations Existantes');
console.log('=' .repeat(60));

// Vérifier que le fichier FeaturedFormationsClient.tsx existe et contient les bonnes modifications
const featuredFormationsPath = path.join(__dirname, '../src/components/sections/FeaturedFormationsClient.tsx');

if (!fs.existsSync(featuredFormationsPath)) {
  console.error('❌ Fichier FeaturedFormationsClient.tsx non trouvé');
  process.exit(1);
}

const featuredFormationsContent = fs.readFileSync(featuredFormationsPath, 'utf8');

// Vérifications du contenu
const checks = [
  {
    name: 'Import des formations statiques',
    test: () => featuredFormationsContent.includes('import { formationsAlternance, formationsReconversion, vaeCertifications, entrepriseThematiques } from \'@/data/formations-static\''),
    description: 'Vérifie que les formations statiques sont importées'
  },
  {
    name: 'Composant ExistingFormationCard',
    test: () => featuredFormationsContent.includes('function ExistingFormationCard'),
    description: 'Vérifie que le composant ExistingFormationCard existe'
  },
  {
    name: 'Carousel horizontal',
    test: () => featuredFormationsContent.includes('FormationsCarousel') && featuredFormationsContent.includes('overflow-x-auto'),
    description: 'Vérifie que le carousel horizontal est implémenté'
  },
  {
    name: 'Navigation du carousel',
    test: () => featuredFormationsContent.includes('ChevronLeft') && featuredFormationsContent.includes('ChevronRight'),
    description: 'Vérifie que les contrôles de navigation sont présents'
  },
  {
    name: 'Cartes de formations avec détails',
    test: () => featuredFormationsContent.includes('objectives') && featuredFormationsContent.includes('opportunities'),
    description: 'Vérifie que les cartes affichent les objectifs et débouchés'
  },
  {
    name: 'Liens RNCP',
    test: () => featuredFormationsContent.includes('getRncpUrl') && featuredFormationsContent.includes('France Compétences'),
    description: 'Vérifie que les liens RNCP sont gérés'
  },
  {
    name: 'Animations Framer Motion',
    test: () => featuredFormationsContent.includes('motion.div') && featuredFormationsContent.includes('whileInView'),
    description: 'Vérifie que les animations sont présentes'
  },
  {
    name: 'Carousels par catégorie',
    test: () => featuredFormationsContent.includes('Formations en Alternance') && featuredFormationsContent.includes('Reconversion Professionnelle'),
    description: 'Vérifie que les carousels sont organisés par catégorie'
  }
];

let passedChecks = 0;
let totalChecks = checks.length;

console.log('\n📋 Vérifications du code:');
console.log('-'.repeat(40));

checks.forEach((check, index) => {
  const passed = check.test();
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${check.name}`);
  console.log(`   ${check.description}`);
  
  if (passed) {
    passedChecks++;
  } else {
    console.log(`   ⚠️  Échec de la vérification`);
  }
  console.log('');
});

// Vérifier les données de formations
const formationsDataPath = path.join(__dirname, '../src/data/formations-static.ts');
if (fs.existsSync(formationsDataPath)) {
  const formationsData = fs.readFileSync(formationsDataPath, 'utf8');
  
  console.log('📊 Vérification des données de formations:');
  console.log('-'.repeat(40));
  
  // Compter les formations
  const alternanceMatches = formationsData.match(/export const formationsAlternance = \[([\s\S]*?)\]/);
  const reconversionMatches = formationsData.match(/export const formationsReconversion = \[([\s\S]*?)\]/);
  
  if (alternanceMatches) {
    const alternanceCount = (alternanceMatches[1].match(/{\s*id:/g) || []).length;
    console.log(`✅ Formations Alternance: ${alternanceCount} formations`);
  }
  
  if (reconversionMatches) {
    const reconversionCount = (reconversionMatches[1].match(/{\s*id:/g) || []).length;
    console.log(`✅ Formations Reconversion: ${reconversionCount} formations`);
  }
  
  // Vérifier les champs requis
  const requiredFields = ['title', 'slug', 'level', 'shortDescription', 'duration', 'objectives', 'opportunities'];
  const hasAllFields = requiredFields.every(field => formationsData.includes(field));
  
  console.log(`${hasAllFields ? '✅' : '❌'} Champs requis présents: ${requiredFields.join(', ')}`);
} else {
  console.log('❌ Fichier formations-static.ts non trouvé');
}

console.log('\n' + '='.repeat(60));
console.log(`📊 Résultat: ${passedChecks}/${totalChecks} vérifications réussies`);

if (passedChecks === totalChecks) {
  console.log('🎉 Tous les tests sont passés !');
  console.log('\n🚀 Le carousel horizontal avec les cartes de formations existantes est prêt !');
  console.log('\n📝 Fonctionnalités implémentées:');
  console.log('   • Carousel horizontal avec navigation');
  console.log('   • Cartes de formations avec design existant');
  console.log('   • Animations fluides');
  console.log('   • Organisation par catégories');
  console.log('   • Liens vers les détails des formations');
  console.log('   • Informations complètes (objectifs, débouchés, RNCP)');
  
  console.log('\n🎯 Pour tester:');
  console.log('   1. Démarrez le serveur de développement');
  console.log('   2. Visitez la page d\'accueil');
  console.log('   3. Scrollez jusqu\'à la section "Nos Formations"');
  console.log('   4. Utilisez les flèches pour naviguer horizontalement');
  console.log('   5. Cliquez sur les cartes pour voir les détails');
} else {
  console.log('⚠️  Certaines vérifications ont échoué');
  console.log('   Vérifiez les erreurs ci-dessus et corrigez-les');
}

console.log('\n' + '='.repeat(60));
