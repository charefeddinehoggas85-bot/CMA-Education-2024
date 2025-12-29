// Test simple pour vérifier le header
console.log('🔍 Test du header - Vérification de la structure...');

// Simuler le rendu du header pour voir la structure
const headerStructure = {
  logo: 'CMA Education Logo',
  navigation: [
    'Accueil',
    'À propos', 
    'Pédagogie',
    'Partenaires',
    'Formations (dropdown)'
  ],
  cta: {
    jpoButton: {
      text: 'Inscription JPO',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1',
      classes: 'hidden lg:block',
      color: 'orange'
    },
    candidateButton: {
      text: 'Candidater',
      url: 'https://cma-education.ymag.cloud/index.php/preinscription/',
      classes: 'ModernButton',
      color: 'blue'
    }
  }
};

console.log('📋 Structure du header:');
console.log(JSON.stringify(headerStructure, null, 2));

console.log('\n🎯 Points de contrôle:');
console.log('1. Le bouton JPO devrait être visible sur lg+ (1024px+)');
console.log('2. Classes CSS: "hidden lg:block" = caché sur mobile, visible sur desktop');
console.log('3. URL du formulaire Google Forms configurée');
console.log('4. Couleur orange avec dégradé');

console.log('\n🔧 Pour déboguer dans le navigateur:');
console.log('1. Ouvrir les DevTools (F12)');
console.log('2. Aller dans l\'onglet Elements');
console.log('3. Chercher: a[href*="1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ"]');
console.log('4. Vérifier les classes CSS appliquées');
console.log('5. Tester en redimensionnant la fenêtre');

console.log('\n✅ Test terminé - Vérifiez manuellement dans le navigateur');