// Test du header sur la page d'accueil

async function testHomepageHeader() {
  try {
    console.log('🔍 Test du header sur la page d\'accueil...\n');
    
    const response = await fetch('http://localhost:3000/');
    console.log(`📄 Page d'accueil: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const html = await response.text();
      
      // Vérifier les éléments du header
      const hasFormationsButton = html.includes('Formations</span>');
      const hasChevronDown = html.includes('chevron-down');
      const hasFormationsDropdown = html.includes('formations-dropdown');
      const hasAlternanceText = html.includes('Alternance');
      const hasAutresFormations = html.includes('Autres formations');
      
      console.log('🔍 Éléments du header détectés:');
      console.log(`   Bouton Formations: ${hasFormationsButton}`);
      console.log(`   Icône chevron: ${hasChevronDown}`);
      console.log(`   Classe formations-dropdown: ${hasFormationsDropdown}`);
      console.log(`   Texte "Alternance": ${hasAlternanceText}`);
      console.log(`   Texte "Autres formations": ${hasAutresFormations}`);
      
      // Extraire la section du header
      const headerMatch = html.match(/<header[^>]*>[\s\S]*?<\/header>/);
      if (headerMatch) {
        const headerHtml = headerMatch[0];
        
        // Chercher les formations dans le header
        const formationMatches = headerHtml.match(/formations\/[a-z0-9-]+/g) || [];
        console.log(`\n📋 Liens formations dans le header: ${formationMatches.length}`);
        
        // Vérifier si le menu est présent mais masqué
        const hasHiddenMenu = headerHtml.includes('showFormationsMenu');
        console.log(`   Menu conditionnel présent: ${hasHiddenMenu}`);
        
        // Extraire les noms de formations
        const formationNames = [];
        const nameMatches = headerHtml.match(/Chargé[^<]+|Conducteur[^<]+|Chef[^<]+|Double[^<]+/g) || [];
        console.log(`\n📝 Noms de formations détectés: ${nameMatches.length}`);
        nameMatches.slice(0, 3).forEach((name, index) => {
          console.log(`   ${index + 1}. ${name.trim()}`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testHomepageHeader();