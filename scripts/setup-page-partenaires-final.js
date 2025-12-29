#!/usr/bin/env node

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-token-here';

async function setupPagePartenaires() {
  try {
    console.log('🔧 Configuration de la page partenaires...\n');

    // 1. Vérifier si la page existe
    console.log('1️⃣  Vérification de l\'existence de la page...');
    const getResponse = await fetch(
      `${STRAPI_URL}/api/page-partenaires`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    let pageExists = getResponse.ok;
    
    if (pageExists) {
      console.log('✅ Page existe déjà');
      const data = await getResponse.json();
      console.log('\n📋 Données actuelles:');
      console.log(JSON.stringify(data.data?.attributes, null, 2));
    } else {
      console.log('❌ Page n\'existe pas, création...');
      
      // 2. Créer la page
      const createResponse = await fetch(
        `${STRAPI_URL}/api/page-partenaires`,
        {
          method: 'PUT',
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
              publishedAt: new Date().toISOString(),
            },
          }),
        }
      );

      if (!createResponse.ok) {
        const error = await createResponse.text();
        console.error(`❌ Erreur création: ${createResponse.status}`);
        console.error(error);
        return;
      }

      const data = await createResponse.json();
      console.log('✅ Page créée avec succès');
      console.log('\n📋 Données créées:');
      console.log(JSON.stringify(data.data?.attributes, null, 2));
    }

    // 3. Configurer les permissions
    console.log('\n2️⃣  Configuration des permissions...');
    
    // Récupérer les rôles
    const rolesResponse = await fetch(
      `${STRAPI_URL}/admin/roles`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    if (rolesResponse.ok) {
      const rolesData = await rolesResponse.json();
      const publicRole = rolesData.data?.find(r => r.code === 'strapi-public');
      
      if (publicRole) {
        console.log(`✅ Rôle public trouvé (ID: ${publicRole.id})`);
        
        // Configurer les permissions pour le rôle public
        const permissionsResponse = await fetch(
          `${STRAPI_URL}/admin/roles/${publicRole.id}/permissions`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            },
            body: JSON.stringify({
              permissions: [
                {
                  action: 'plugin::content-manager.explorer.read',
                  subject: 'api::page-partenaires.page-partenaires',
                  properties: {},
                  conditions: [],
                },
              ],
            }),
          }
        );

        if (permissionsResponse.ok) {
          console.log('✅ Permissions configurées');
        } else {
          console.log('⚠️  Permissions non configurées (peut être normal)');
        }
      }
    }

    console.log('\n✅ Configuration terminée!');
    console.log('\n📝 Prochaines étapes:');
    console.log('1. Accédez à http://localhost:1337/admin');
    console.log('2. Allez dans "Page Partenaires"');
    console.log('3. Uploadez une image hero');
    console.log('4. Publiez la page');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

setupPagePartenaires();
