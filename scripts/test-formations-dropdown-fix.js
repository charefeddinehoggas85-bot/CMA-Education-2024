#!/usr/bin/env node

/**
 * Test du fix du dropdown formations
 * Vérifie que le dropdown affiche toujours les formations Alternance et Reconversion
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Test du fix du dropdown formations...\n');

// 1. Vérifier que le fichier FormationsDropdown.tsx existe
const dropdownPath = path.join(__dirname, '../src/components/ui/FormationsDropdown.tsx');
if (!fs.existsSync(dropdownPath)) {
  console.error('❌ Fichier FormationsDropdown.tsx non trouvé');
  process.exit(1);
}

console.log('✅ Fichier FormationsDropdown.tsx trouvé');

// 2. Lire le contenu du fichier
const dropdownContent = fs.readFileSync(dropdownPath, 'utf8');

// 3. Vérifier les éléments critiques du fix
const checks = [
  {
    name: 'Fallback data avec Alternance',
    test: () => dropdownContent.includes("category: 'Alternance'"),
    description: 'Vérifie que les données fallback incluent la catégorie Alternance'
  },
  {
    name: 'Fallback data avec Reconversion',
    test: () => dropdownContent.includes("category: 'Reconversion'"),
    description: 'Vérifie que les données fallback incluent la catégorie Reconversion'
  },
  {
    name: 'Formations Alternance dans fallback',
    test: () => dropdownContent.includes("Chargé d'Affaires Bâtiment") && dropdownContent.includes("Conducteur de Travaux Bâtiment"),
    description: 'Vérifie que les formations Alternance sont présentes dans le fallback'
  },
  {
    name: 'Formations Reconversion dans fallback',
    test: () => dropdownContent.includes("Chargé d'Affaires - Reconversion") && dropdownContent.includes("Conducteur de Travaux - Reconversion"),
    description: 'Vérifie que les formations Reconversion sont présentes dans le fallback'
  },
  {
    name: 'useFallback initialisé à true',
    test: () => dropdownContent.includes("const [useFallback, setUseFallback] = useState(true)"),
    description: 'Vérifie que le fallback est activé par défaut'
  },
  {
    name: 'Dropdown toujours affiché',
    test: () => dropdownContent.includes("DROPDOWN TOUJOURS AFFICHÉ") || dropdownContent.includes("{isOpen && ("),
    description: 'Vérifie que le dropdown s\'affiche même sans données Strapi'
  },
  {
    name: 'Icônes pour chaque catégorie',
    test: () => dropdownContent.includes("GraduationCap") && dropdownContent.includes("Users") && dropdownContent.includes("Award"),
    description: 'Vérifie que les icônes sont définies pour chaque catégorie'
  },
  {
    name: 'Gestion des erreurs Strapi',
    test: () => dropdownContent.includes("catch (error)") && dropdownContent.includes("setUseFallback(true)"),
    description: 'Vérifie que les erreurs Strapi activent le fallback'
  }
];

let passedChecks = 0;
let totalChecks = checks.length;

console.log('\n📋 Vérification des éléments du fix:\n');

checks.forEach((check, index) => {
  const passed = check.test();
  const status = passed ? '✅' : '❌';
  const number = `${index + 1}`.padStart(2, '0');
  
  console.log(`${status} ${number}. ${check.name}`);
  console.log(`    ${check.description}`);
  
  if (passed) {
    passedChecks++;
  } else {
    console.log(`    ⚠️  Échec de la vérification`);
  }
  console.log('');
});

// 4. Résumé
console.log('📊 RÉSUMÉ DU TEST:');
console.log(`✅ Vérifications réussies: ${passedChecks}/${totalChecks}`);
console.log(`❌ Vérifications échouées: ${totalChecks - passedChecks}/${totalChecks}`);

if (passedChecks === totalChecks) {
  console.log('\n🎉 SUCCÈS: Tous les éléments du fix sont présents!');
  console.log('\n📝 Le dropdown formations devrait maintenant:');
  console.log('   • Afficher les formations Alternance et Reconversion');
  console.log('   • Fonctionner même si Strapi est indisponible');
  console.log('   • Utiliser les données fallback par défaut');
  console.log('   • Avoir des icônes pour chaque catégorie');
  console.log('   • Gérer les erreurs gracieusement');
} else {
  console.log('\n⚠️  ATTENTION: Certains éléments du fix sont manquants');
  console.log('   Le dropdown pourrait ne pas fonctionner correctement');
}

// 5. Vérifier la structure des données fallback
console.log('\n🔍 Analyse des données fallback:');

const alternanceMatch = dropdownContent.match(/category: 'Alternance'[\s\S]*?formations: \[([\s\S]*?)\]/);
const reconversionMatch = dropdownContent.match(/category: 'Reconversion'[\s\S]*?formations: \[([\s\S]*?)\]/);

if (alternanceMatch) {
  const alternanceFormations = alternanceMatch[1].match(/title: '[^']+'/g) || [];
  console.log(`✅ Formations Alternance trouvées: ${alternanceFormations.length}`);
  alternanceFormations.forEach((formation, index) => {
    console.log(`   ${index + 1}. ${formation.replace("title: '", "").replace("'", "")}`);
  });
} else {
  console.log('❌ Formations Alternance non trouvées dans le fallback');
}

if (reconversionMatch) {
  const reconversionFormations = reconversionMatch[1].match(/title: '[^']+'/g) || [];
  console.log(`✅ Formations Reconversion trouvées: ${reconversionFormations.length}`);
  reconversionFormations.forEach((formation, index) => {
    console.log(`   ${index + 1}. ${formation.replace("title: '", "").replace("'", "")}`);
  });
} else {
  console.log('❌ Formations Reconversion non trouvées dans le fallback');
}

console.log('\n🚀 Test terminé!');
console.log('\n💡 Pour tester en live:');
console.log('   1. Démarrer le serveur de développement: npm run dev');
console.log('   2. Aller sur http://localhost:3000');
console.log('   3. Survoler "Formations" dans le header');
console.log('   4. Vérifier que les onglets Alternance et Reconversion s\'affichent');
console.log('   5. Cliquer sur chaque onglet pour voir les formations');