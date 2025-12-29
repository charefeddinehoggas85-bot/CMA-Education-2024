/**
 * Script pour créer le contenu de page-partenaires dans Strapi
 * Usage: set STRAPI_API_TOKEN=votre_token && node scripts/create-page-partenaires-content.js
 */

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

async function createPagePartenaires() {
  console.log('📄 Création du contenu Page Partenaires...\n');

  if (!API_TOKEN) {
    console.log('❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: set STRAPI_API_TOKEN=votre_token && node scripts/create-page-partenaires-content.js');
    return;
  }

  const pageData = {
    data: {
      heroTitle: "Nos Partenaires",
      heroSubtitle: "Des entreprises leaders du BTP qui nous font confiance pour former les professionnels de demain",
      sectionTitle: "Ils nous font confiance",
      sectionSubtitle: "Nos partenaires accueillent nos alternants et participent activement à leur formation",
      ctaTitle: "Devenez partenaire",
      ctaDescription: "Rejoignez notre réseau d'entreprises partenaires et accueillez nos alternants formés aux métiers du BTP",
      statEntreprises: "12",
      statAlternants: "150+",
      statInsertion: "98%",
      statSatisfaction: "95%"
    }
  };

  try {
    // Vérifier si le contenu existe déjà
    const checkRes = await fetch(`${STRAPI_URL}/api/page-partenaires`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    const checkData = await checkRes.json();
    
    if (checkData.data) {
      console.log('✅ Le contenu existe déjà, mise à jour...');
      
      const updateRes = await fetch(`${STRAPI_URL}/api/page-partenaires`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify(pageData)
      });
      
      if (updateRes.ok) {
        console.log('✅ Contenu mis à jour avec succès!');
      } else {
        const err = await updateRes.json();
        console.log('❌ Erreur:', err);
      }
    } else {
      console.log('📝 Création du contenu...');
      
      const createRes = await fetch(`${STRAPI_URL}/api/page-partenaires`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify(pageData)
      });
      
      if (createRes.ok) {
        const result = await createRes.json();
        console.log('✅ Contenu créé avec succès!');
        console.log('   ID:', result.data?.id);
        
        // Publier le contenu
        console.log('\n📢 Publication du contenu...');
        const publishRes = await fetch(`${STRAPI_URL}/api/page-partenaires`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          },
          body: JSON.stringify({
            data: {
              ...pageData.data,
              publishedAt: new Date().toISOString()
            }
          })
        });
        
        if (publishRes.ok) {
          console.log('✅ Contenu publié!');
        }
      } else {
        const err = await createRes.json();
        console.log('❌ Erreur création:', err);
      }
    }
    
    console.log('\n📋 Pour ajouter l\'image heroImage:');
    console.log('   1. Allez dans Strapi Admin → Content Manager → Page Partenaires');
    console.log('   2. Cliquez sur "heroImage" et uploadez votre image');
    console.log('   3. Sauvegardez et publiez');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

createPagePartenaires();
