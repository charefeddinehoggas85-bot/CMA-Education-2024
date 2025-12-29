async function testSimplePage() {
  try {
    console.log('🔍 TEST PAGE SIMPLE:');
    
    const response = await fetch('http://localhost:3000/formations/charge-affaires-batiment-alternance');
    const html = await response.text();
    
    console.log('Status:', response.status);
    
    // Chercher les messages de notre composant de test
    const hasTestTitle = html.includes('Test Strapi Direct');
    const hasSlugInfo = html.includes('charge-affaires-batiment-alternance');
    const hasLoadingMessage = html.includes('Chargement...');
    const hasErrorMessage = html.includes('Erreur:');
    const hasSuccessMessage = html.includes('Données reçues:');
    
    console.log('Page de test chargée:', hasTestTitle ? '✅' : '❌');
    console.log('Slug affiché:', hasSlugInfo ? '✅' : '❌');
    console.log('Message loading:', hasLoadingMessage ? '✅' : '❌');
    console.log('Message erreur:', hasErrorMessage ? '✅' : '❌');
    console.log('Message succès:', hasSuccessMessage ? '✅' : '❌');
    
    // Extraire le contenu de la div de test si présent
    const testMatch = html.match(/<div class="p-8[^>]*>.*?<\/div>/s);
    if (testMatch) {
      console.log('\n📄 CONTENU TEST:');
      console.log(testMatch[0].substring(0, 500) + '...');
    }
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

testSimplePage();