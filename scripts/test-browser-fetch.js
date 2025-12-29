// Test de fetch depuis le contexte navigateur (simulation)
async function testBrowserFetch() {
  try {
    console.log('🔍 TEST FETCH NAVIGATEUR:');
    
    // Test 1: Fetch direct vers Strapi (comme le ferait le navigateur)
    console.log('1. Test fetch direct Strapi...');
    const directUrl = 'http://localhost:1337/api/formations?filters[slug][$eq]=charge-affaires-batiment-alternance&populate=*';
    console.log('URL:', directUrl);
    
    const directResponse = await fetch(directUrl);
    console.log('Status:', directResponse.status);
    console.log('OK:', directResponse.ok);
    
    if (directResponse.ok) {
      const directData = await directResponse.json();
      console.log('Données reçues:', !!directData.data);
      console.log('Nombre formations:', directData.data?.length || 0);
      
      if (directData.data && directData.data[0]) {
        const formation = directData.data[0];
        console.log('Formation trouvée:');
        console.log('  - ID:', formation.id);
        console.log('  - Titre:', formation.attributes?.title);
        console.log('  - Niveau:', formation.attributes?.level);
        console.log('  - RNCP:', formation.attributes?.rncp);
        console.log('  - Durée:', formation.attributes?.duree);
      }
    } else {
      console.log('Erreur response:', directResponse.statusText);
    }
    
    // Test 2: Simulation de la fonction getFormation
    console.log('\n2. Test simulation getFormation...');
    
    function transformStrapiData(item) {
      if (!item) return null;
      const transformed = { id: item.id, ...item.attributes };
      
      // Mapper les champs spécifiques aux formations pour compatibilité
      if (item.attributes?.shortDesc) {
        transformed.shortDescription = item.attributes.shortDesc;
      }
      if (item.attributes?.fullDesc) {
        transformed.fullDescription = item.attributes.fullDesc;
      }
      
      return transformed;
    }
    
    async function simulateGetFormation(slug) {
      const url = `http://localhost:1337/api/formations?filters[slug][$eq]=${slug}&populate=*`;
      const response = await fetch(url);
      const data = await response.json();
      return transformStrapiData(data.data?.[0]);
    }
    
    const simulatedResult = await simulateGetFormation('charge-affaires-batiment-alternance');
    console.log('Résultat simulé:', !!simulatedResult);
    
    if (simulatedResult) {
      console.log('Formation simulée:');
      console.log('  - ID:', simulatedResult.id);
      console.log('  - Titre:', simulatedResult.title);
      console.log('  - Niveau:', simulatedResult.level);
      console.log('  - RNCP:', simulatedResult.rncp);
      console.log('  - Durée:', simulatedResult.duree);
      console.log('  - Short Desc:', simulatedResult.shortDescription);
      console.log('  - Full Desc:', simulatedResult.fullDescription);
      console.log('  - Objectifs:', Array.isArray(simulatedResult.objectifs) ? simulatedResult.objectifs.length : typeof simulatedResult.objectifs);
      console.log('  - Débouchés:', Array.isArray(simulatedResult.debouches) ? simulatedResult.debouches.length : typeof simulatedResult.debouches);
    }
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
    console.log('Stack:', error.stack);
  }
}

testBrowserFetch();