const axios = require('axios');

async function debugFormationContent() {
  console.log('🔍 Debug du contenu de formation...');
  
  try {
    const response = await axios.get('http://localhost:3000/formations/conducteur-travaux-batiment', {
      timeout: 15000
    });
    
    const html = response.data;
    
    // Chercher des indices sur le chargement
    console.log('📋 Recherche d\'indices de chargement...');
    
    if (html.includes('Chargement de la formation')) {
      console.log('⏳ Page en état de chargement');
    }
    
    if (html.includes('Formation non trouvée')) {
      console.log('❌ Formation non trouvée');
    }
    
    if (html.includes('conducteur-travaux-batiment')) {
      console.log('✅ Slug détecté dans la page');
    }
    
    // Chercher le titre dans différents formats
    const titlePatterns = [
      /Conducteur de Travaux/i,
      /conducteur.*travaux/i,
      /formation.*conducteur/i
    ];
    
    console.log('🔍 Recherche de titres...');
    titlePatterns.forEach((pattern, index) => {
      const matches = html.match(pattern);
      if (matches) {
        console.log(`✅ Pattern ${index + 1} trouvé:`, matches[0]);
      }
    });
    
    // Chercher des éléments de debug
    if (html.includes('Slug:')) {
      const slugMatch = html.match(/Slug: ([^<\n]+)/);
      if (slugMatch) {
        console.log('🏷️ Slug trouvé:', slugMatch[1]);
      }
    }
    
    if (html.includes('Formation ID:')) {
      const idMatch = html.match(/Formation ID: ([^<\n]+)/);
      if (idMatch) {
        console.log('🆔 ID trouvé:', idMatch[1]);
      }
    }
    
    // Vérifier la structure de la page
    console.log('\n📊 Structure de la page:');
    console.log('- Taille HTML:', html.length, 'caractères');
    console.log('- Contient header:', html.includes('<header') ? '✅' : '❌');
    console.log('- Contient main:', html.includes('<main') ? '✅' : '❌');
    console.log('- Contient footer:', html.includes('<footer') ? '✅' : '❌');
    
    // Chercher des erreurs hydratation
    if (html.includes('hydration') || html.includes('Hydration')) {
      console.log('⚠️ Problèmes d\'hydratation possibles');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

debugFormationContent();