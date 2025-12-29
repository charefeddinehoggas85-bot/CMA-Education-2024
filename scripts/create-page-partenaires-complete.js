#!/usr/bin/env node

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-token-here';

async function createPagePartenaires() {
  try {
    console.log('📝 Création de la page partenaires...\n');

    const response = await fetch(
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

    if (!response.ok) {
      const error = await response.json();
      console.error(`❌ Erreur: ${response.status}`);
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    const data = await response.json();
    console.log('✅ Page partenaires créée avec succès');
    console.log('\n📋 Données créées:');
    console.log(JSON.stringify(data.data.attributes, null, 2));

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

createPagePartenaires();
