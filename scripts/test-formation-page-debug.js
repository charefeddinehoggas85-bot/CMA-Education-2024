// Test de la page formation pour debug
async function testFormationPageDebug() {
  try {
    console.log('🔍 TEST PAGE FORMATION DEBUG:');
    
    const response = await fetch('http://localhost:3000/formations/charge-affaires-batiment-alternance');
    const html = await response.text();
    
    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    
    // Chercher le debug info dans le HTML
    const debugRegex = /DEBUG FORMATION[^}]+}/g;
    const debugMatches = html.match(debugRegex);
    
    if (debugMatches) {
      console.log('\n🔍 DEBUG INFO TROUVÉ:');
      debugMatches.forEach((match, index) => {
        console.log(`Debug ${index + 1}:`, match);
      });
    } else {
      console.log('\n❌ Aucun debug info trouvé');
    }
    
    // Chercher les erreurs JavaScript
    const errorRegex = /Error[^<]+/g;
    const errorMatches = html.match(errorRegex);
    
    if (errorMatches) {
      console.log('\n❌ ERREURS TROUVÉES:');
      errorMatches.forEach((error, index) => {
        console.log(`Erreur ${index + 1}:`, error);
      });
    }
    
    // Vérifier si la page contient du contenu React
    const hasReact = html.includes('__NEXT_DATA__');
    console.log('\n📊 ANALYSE PAGE:');
    console.log('Contient __NEXT_DATA__:', hasReact);
    console.log('Taille HTML:', html.length, 'caractères');
    
    // Chercher les éléments spécifiques
    const hasTitle = html.includes('Chargé(e) d\'Affaires du Bâtiment');
    const hasLevel = html.includes('Niveau 5 Européen');
    const hasRNCP = html.includes('RNCP35503');
    const hasDuree = html.includes('24 mois');
    
    console.log('\n🔍 CONTENU STRAPI:');
    console.log('Titre Strapi:', hasTitle ? '✅' : '❌');
    console.log('Niveau Strapi:', hasLevel ? '✅' : '❌');
    console.log('RNCP Strapi:', hasRNCP ? '✅' : '❌');
    console.log('Durée Strapi:', hasDuree ? '✅' : '❌');
    
    // Extraire un échantillon du HTML autour du titre
    const titleIndex = html.indexOf('<h1');
    if (titleIndex !== -1) {
      const sample = html.substring(titleIndex, titleIndex + 500);
      console.log('\n📄 ÉCHANTILLON HTML (titre):');
      console.log(sample);
    }
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

testFormationPageDebug();