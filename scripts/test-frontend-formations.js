// Test des formations depuis le frontend

async function testFrontendFormations() {
  try {
    console.log('🔍 Test des formations depuis le frontend...\n');
    
    // Tester l'accès à la page formations
    const response = await fetch('http://localhost:3000/formations');
    console.log(`📄 Page formations: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const html = await response.text();
      
      // Vérifier si le header contient le menu formations
      const hasFormationsButton = html.includes('Formations</span>');
      const hasDropdownMenu = html.includes('formations-dropdown');
      const hasAlternanceCategory = html.includes('Alternance');
      
      console.log(`✅ Bouton Formations présent: ${hasFormationsButton}`);
      console.log(`✅ Menu dropdown présent: ${hasDropdownMenu}`);
      console.log(`✅ Catégorie Alternance présente: ${hasAlternanceCategory}`);
      
      // Extraire les formations du HTML
      const formationLinks = html.match(/\/formations\/[a-z0-9-]+/g) || [];
      const uniqueFormations = [...new Set(formationLinks)];
      
      console.log(`\n📋 Formations trouvées dans le HTML: ${uniqueFormations.length}`);
      uniqueFormations.slice(0, 5).forEach((link, index) => {
        console.log(`   ${index + 1}. ${link}`);
      });
      
      if (uniqueFormations.length > 5) {
        console.log(`   ... et ${uniqueFormations.length - 5} autres`);
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testFrontendFormations();