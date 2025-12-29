// Debug du menu header

async function debugHeaderMenu() {
  try {
    console.log('🔍 Debug du menu header...\n');
    
    // Simuler les données comme dans le Header
    const formationsResponse = await fetch('http://localhost:1337/api/formations?populate=*&sort=ordre:asc');
    const formationsData = await formationsResponse.json();
    
    // Transformer les données
    const formations = formationsData.data.map(item => {
      const transformed = { id: item.id, ...item.attributes };
      if (item.attributes?.category?.data) {
        transformed.category = {
          id: item.attributes.category.data.id,
          ...item.attributes.category.data.attributes
        };
      }
      return transformed;
    });
    
    console.log(`📋 Formations chargées: ${formations.length}`);
    
    // Créer le menu comme dans le Header
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
    
    // Fallback menu
    const fallbackFormationsMenu = [
      {
        category: 'Formation en alternance',
        href: '/formations#alternance',
        items: [
          { name: 'Chargé d\'Affaires du Bâtiment (BAC+2)', href: '/formations/alt-bac2-charge-affaires' },
          { name: 'Conducteur de Travaux Bâtiment (BAC+2)', href: '/formations/alt-bac2-conducteur-travaux' },
          { name: 'Chef de Chantier VRD (BAC+2)', href: '/formations/alt-bac2-chef-chantier-vrd' }
        ]
      },
      {
        category: 'Professionnels en reconversion',
        href: '/formations#reconversion',
        items: [
          { name: 'Chargé d\'Affaires - Reconversion', href: '/formations/rec-bac2-charge-affaires' },
          { name: 'Conducteur de Travaux - Reconversion', href: '/formations/rec-bac2-conducteur-travaux' }
        ]
      }
    ];
    
    const finalFormationsMenu = formationsMenu.length > 0 ? formationsMenu : fallbackFormationsMenu;
    
    console.log(`\n🎯 Menu final utilisé: ${formationsMenu.length > 0 ? 'Strapi' : 'Fallback'}`);
    console.log(`📊 Nombre de catégories: ${finalFormationsMenu.length}`);
    console.log(`📊 Total formations: ${finalFormationsMenu.reduce((total, cat) => total + cat.items.length, 0)}`);
    
    console.log('\n📋 Structure du menu:');
    finalFormationsMenu.forEach((category, index) => {
      console.log(`\n${index + 1}. ${category.category} (${category.items.length} formations)`);
      category.items.slice(0, 3).forEach((item, itemIndex) => {
        console.log(`   ${itemIndex + 1}. ${item.name}`);
      });
      if (category.items.length > 3) {
        console.log(`   ... et ${category.items.length - 3} autres`);
      }
    });
    
    // Vérifier si le menu est vide
    const isEmpty = finalFormationsMenu.length === 0 || finalFormationsMenu.every(cat => cat.items.length === 0);
    console.log(`\n${isEmpty ? '❌' : '✅'} Menu ${isEmpty ? 'vide' : 'rempli'}`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

debugHeaderMenu();