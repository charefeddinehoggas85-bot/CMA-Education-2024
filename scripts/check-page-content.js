async function checkPageContent() {
  try {
    const response = await fetch('http://localhost:3000/formations/charge-affaires-batiment-alternance');
    const html = await response.text();
    
    console.log('🔍 ANALYSE CONTENU PAGE:');
    console.log('Status:', response.status);
    
    // Chercher le debug info
    const debugMatch = html.match(/✅ FORMATION CHARGÉE[^}]+}/);
    if (debugMatch) {
      console.log('\n🔍 DEBUG INFO:');
      console.log(debugMatch[0]);
    }
    
    // Chercher le titre dans le h1
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match) {
      console.log('\n📄 TITRE H1 TROUVÉ:');
      console.log(h1Match[1]);
    }
    
    // Chercher les éléments Strapi spécifiques
    const hasChargeAffaires = html.includes('Chargé(e) d\'Affaires du Bâtiment');
    const hasNiveau5 = html.includes('Niveau 5 Européen');
    const hasRNCP35503 = html.includes('RNCP35503');
    const has24Mois = html.includes('24 mois');
    const has3Semaines = html.includes('3 semaines en entreprise');
    
    console.log('\n🔍 CONTENU STRAPI SPÉCIFIQUE:');
    console.log('Titre Chargé d\'Affaires:', hasChargeAffaires ? '✅' : '❌');
    console.log('Niveau 5 Européen:', hasNiveau5 ? '✅' : '❌');
    console.log('RNCP35503:', hasRNCP35503 ? '✅' : '❌');
    console.log('24 mois:', has24Mois ? '✅' : '❌');
    console.log('3 semaines en entreprise:', has3Semaines ? '✅' : '❌');
    
    // Chercher les sections objectifs et débouchés
    const hasObjectifsSection = html.includes('Objectifs de la formation');
    const hasDebouchesSection = html.includes('Débouchés professionnels');
    
    console.log('\n🔍 SECTIONS:');
    console.log('Section Objectifs:', hasObjectifsSection ? '✅' : '❌');
    console.log('Section Débouchés:', hasDebouchesSection ? '✅' : '❌');
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

checkPageContent();