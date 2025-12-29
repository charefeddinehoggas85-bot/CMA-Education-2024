// Test direct de la fonction getFormation
async function testGetFormation() {
  try {
    // Simulate the getFormation function
    const STRAPI_URL = 'http://localhost:1337';
    
    async function fetchAPI(path) {
      const response = await fetch(STRAPI_URL + path);
      return await response.json();
    }
    
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
      
      // Mapper les relations de catégorie pour les formations
      if (item.attributes?.category?.data) {
        transformed.category = {
          id: item.attributes.category.data.id,
          ...item.attributes.category.data.attributes
        };
      }
      
      // Ajouter les données d'image si présentes
      if (item.attributes?.image?.data) {
        transformed.imageData = item.attributes.image;
      }
      
      return transformed;
    }
    
    async function getFormation(slug) {
      const data = await fetchAPI(`/api/formations?filters[slug][$eq]=${slug}&populate=*`);
      return transformStrapiData(data.data?.[0]);
    }
    
    console.log('🔍 TEST getFormation DIRECT:');
    const formation = await getFormation('charge-affaires-batiment-alternance');
    
    console.log('Formation trouvée:', !!formation);
    if (formation) {
      console.log('ID:', formation.id);
      console.log('Titre:', formation.title);
      console.log('Niveau:', formation.level);
      console.log('RNCP:', formation.rncp);
      console.log('Durée:', formation.duree);
      console.log('Rythme:', formation.rythme);
      console.log('Short Description:', formation.shortDescription);
      console.log('Full Description:', formation.fullDescription);
      console.log('Objectifs:', Array.isArray(formation.objectifs) ? formation.objectifs.length : typeof formation.objectifs);
      console.log('Débouchés:', Array.isArray(formation.debouches) ? formation.debouches.length : typeof formation.debouches);
      console.log('Image Data:', !!formation.imageData);
    }
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

testGetFormation();