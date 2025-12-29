// Test simple pour vérifier les données statiques
console.log('🧪 Test des données statiques...');

try {
  // Simuler l'import des données
  const fs = require('fs');
  const path = require('path');
  
  // Lire le fichier des formations statiques
  const formationsPath = path.join(__dirname, '..', 'src', 'data', 'formations-static.ts');
  const formationsContent = fs.readFileSync(formationsPath, 'utf8');
  
  console.log('📄 Fichier formations-static.ts lu avec succès');
  console.log('📏 Taille du fichier:', formationsContent.length, 'caractères');
  
  // Vérifier la présence du slug recherché
  if (formationsContent.includes('conducteur-travaux-batiment')) {
    console.log('✅ Slug "conducteur-travaux-batiment" trouvé dans les données');
  } else {
    console.log('❌ Slug "conducteur-travaux-batiment" non trouvé');
  }
  
  // Compter les formations
  const formationMatches = formationsContent.match(/slug: "/g);
  if (formationMatches) {
    console.log('📊 Nombre de formations détectées:', formationMatches.length);
  }
  
  // Vérifier la syntaxe TypeScript
  if (formationsContent.includes('export const formationsAlternance')) {
    console.log('✅ Export formationsAlternance trouvé');
  }
  
  if (formationsContent.includes('export const formationsReconversion')) {
    console.log('✅ Export formationsReconversion trouvé');
  }
  
  console.log('\n🎯 RÉSULTAT: Données statiques semblent correctes');
  
} catch (error) {
  console.error('❌ Erreur lors du test:', error.message);
}

console.log('\n💡 PROCHAINE ÉTAPE: Vérifier pourquoi le composant React ne charge pas ces données');