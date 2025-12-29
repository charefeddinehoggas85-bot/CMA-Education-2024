// Test du header avec les formations

async function testHeaderFormations() {
  try {
    console.log('🔍 Test du header avec formations...\n');
    
    // Simuler la récupération des formations comme dans le Header
    const formationsResponse = await fetch('http://localhost:1337/api/formations?populate=*&sort=ordre:asc');
    const formationsData = await formationsResponse.json();
    
    // Transformer les données comme dans strapi.ts
    const formations = formationsData.data.map(item => {
      const transformed = { id: item.id, ...item.attributes };
      
      // Mapper les relations de catégorie
      if (item.attributes?.category?.data) {
        transformed.category = {
          id: item.attributes.category.data.id,
          ...item.attributes.category.data.attributes
        };
      }
      
      return transformed;
    });
    
    console.log('📋 Formations transformées:');
    formations.forEach((formation, index) => {
      console.log(`${index + 1}. ${formation.title}`);
      console.log(`   Slug: ${formation.slug}`);
      console.log(`   Catégorie: ${formation.category?.name || 'Pas de catégorie'}`);
    });
    
    // Simuler la création du menu comme dans le Header
    const formationsMenu = formations.reduce((acc, formation) => {
      const categoryName = formation.category?.name || 'Autres formations';
      const categorySlug = formation.category?.slug || 'autres';
      
      let category = acc.find(cat => cat.category === categoryName);
      if (!category) {
        category = {
          category: categoryName,
          href: `/formations#${categorySlug}`,
          items: []
        };
        acc.push(category);
      }
      
      category.items.push({
        name: formation.title,
        href: `/formations/${formation.slug}`
      });
      
      return acc;
    }, []);
    
    console.log('\n🎯 Menu formations généré:');
    formationsMenu.forEach((category, index) => {
      console.log(`\n${index + 1}. ${category.category} (${category.href})`);
      category.items.forEach((item, itemIndex) => {
        console.log(`   ${itemIndex + 1}. ${item.name} → ${item.href}`);
      });
    });
    
    console.log(`\n✅ Menu formations créé avec ${formationsMenu.length} catégories et ${formationsMenu.reduce((total, cat) => total + cat.items.length, 0)} formations`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testHeaderFormations();