async function checkDebugInfo() {
  try {
    const response = await fetch('http://localhost:3000/formations/charge-affaires-batiment-alternance');
    const html = await response.text();
    
    console.log('Status:', response.status);
    
    // Chercher le debug info
    const hasDebugTitle = html.includes('DEBUG FORMATION');
    const hasLogs = html.includes('Logs:');
    const hasSlugDebug = html.includes('charge-affaires-batiment-alternance');
    
    console.log('Debug title présent:', hasDebugTitle ? '✅' : '❌');
    console.log('Logs présents:', hasLogs ? '✅' : '❌');
    console.log('Slug dans debug:', hasSlugDebug ? '✅' : '❌');
    
    // Chercher les éléments de formation
    const hasFormationTitle = html.includes('Chargé(e) d\'Affaires du Bâtiment');
    const hasFormationH1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    
    console.log('Titre formation dans HTML:', hasFormationTitle ? '✅' : '❌');
    console.log('H1 trouvé:', hasFormationH1 ? hasFormationH1[1] : 'Non');
    
    // Vérifier si la page est en état de chargement
    const hasLoadingState = html.includes('Chargement de la formation');
    const hasErrorState = html.includes('Formation non trouvée');
    
    console.log('État loading:', hasLoadingState ? '✅' : '❌');
    console.log('État error:', hasErrorState ? '✅' : '❌');
    
    // Extraire un échantillon du HTML pour voir la structure
    const bodyMatch = html.match(/<body[^>]*>(.*?)<\/body>/s);
    if (bodyMatch) {
      const bodyContent = bodyMatch[1];
      console.log('\nÉchantillon HTML (premiers 500 caractères):');
      console.log(bodyContent.substring(0, 500));
    }
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

checkDebugInfo();