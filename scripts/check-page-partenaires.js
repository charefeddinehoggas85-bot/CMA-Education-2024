#!/usr/bin/env node

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-token-here';

async function checkPagePartenaires() {
  try {
    console.log('🔍 Vérification de la page partenaires...\n');

    // Récupérer la page partenaires
    const response = await fetch(
      `${STRAPI_URL}/api/page-partenaires?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`❌ Erreur: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    
    if (!data.data) {
      console.log('❌ Page partenaires non trouvée dans Strapi');
      console.log('\n📝 Création de la page...');
      
      // Créer la page
      const createResponse = await fetch(
        `${STRAPI_URL}/api/page-partenaires`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              heroTitle: 'Nos Partenaires',
              heroSubtitle: 'Des entreprises leaders du BTP qui nous font confiance pour former les professionnels de demain',
              sectionTitle: 'Ils nous font confiance',
              sectionSubtitle: 'Nos partenaires accueillent nos alternants et participent activement à leur formation',
              ctaTitle: 'Devenez partenaire',
              ctaDescription: "Rejoignez notre réseau d'entreprises partenaires et accueillez nos alternants formés aux métiers du BTP",
              statEntreprises: '12',
              statAlternants: '150+',
              statInsertion: '98%',
              statSatisfaction: '95%',
            },
          }),
        }
      );

      if (createResponse.ok) {
        console.log('✅ Page créée avec succès');
      } else {
        console.error('❌ Erreur création page');
      }
      return;
    }

    const attrs = data.data.attributes;
    console.log('✅ Page partenaires trouvée\n');
    
    console.log('📋 Données actuelles:');
    console.log(`  • heroTitle: ${attrs.heroTitle || '❌ Manquant'}`);
    console.log(`  • heroSubtitle: ${attrs.heroSubtitle || '❌ Manquant'}`);
    console.log(`  • heroImage: ${attrs.heroImage?.data ? '✅ Présent' : '❌ Manquant'}`);
    console.log(`  • sectionTitle: ${attrs.sectionTitle || '❌ Manquant'}`);
    console.log(`  • sectionSubtitle: ${attrs.sectionSubtitle || '❌ Manquant'}`);
    console.log(`  • ctaTitle: ${attrs.ctaTitle || '❌ Manquant'}`);
    console.log(`  • ctaDescription: ${attrs.ctaDescription || '❌ Manquant'}`);
    console.log(`  • statEntreprises: ${attrs.statEntreprises || '❌ Manquant'}`);
    console.log(`  • statAlternants: ${attrs.statAlternants || '❌ Manquant'}`);
    console.log(`  • statInsertion: ${attrs.statInsertion || '❌ Manquant'}`);
    console.log(`  • statSatisfaction: ${attrs.statSatisfaction || '❌ Manquant'}`);

    if (attrs.heroImage?.data) {
      console.log(`\n📸 Image hero URL: ${STRAPI_URL}${attrs.heroImage.data.attributes.url}`);
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

checkPagePartenaires();
