// Utiliser fetch natif de Node.js 18+

async function checkFormations() {
  try {
    console.log('🔍 Vérification des formations et catégories...\n');
    
    // Vérifier les formations
    const formationsResponse = await fetch('http://localhost:1337/api/formations?populate=*');
    const formationsData = await formationsResponse.json();
    
    console.log('📋 Structure complète des formations:');
    console.log(JSON.stringify(formationsData.data[0], null, 2));
    
    console.log('\n\n🏷️ Structure complète des catégories:');
    const categoriesResponse = await fetch('http://localhost:1337/api/formation-categories?populate=*');
    const categoriesData = await categoriesResponse.json();
    console.log(JSON.stringify(categoriesData.data[0], null, 2));
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

checkFormations();