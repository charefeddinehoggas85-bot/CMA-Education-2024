#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-token-here';

async function uploadImage(imagePath) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Image non trouvée: ${imagePath}`);
      return null;
    }

    const form = new FormData();
    form.append('files', fs.createReadStream(imagePath));

    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: form,
    });

    if (!response.ok) {
      console.error(`Erreur upload: ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log(`✅ Image uploadée: ${path.basename(imagePath)}`);
    return data[0]?.id;
  } catch (error) {
    console.error('Erreur upload image:', error.message);
    return null;
  }
}

async function setupPagePartenaires() {
  try {
    console.log('🔍 Vérification de la page partenaires...');

    // Récupérer la page partenaires existante
    const getResponse = await fetch(
      `${STRAPI_URL}/api/page-partenaires?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!getResponse.ok) {
      console.error('❌ Erreur récupération page partenaires');
      return;
    }

    const pageData = await getResponse.json();
    console.log('📄 Page partenaires trouvée');

    // Vérifier si l'image hero existe
    const hasHeroImage = pageData.data?.attributes?.heroImage?.data;
    console.log(`📸 Image hero: ${hasHeroImage ? '✅ Présente' : '❌ Manquante'}`);

    if (!hasHeroImage) {
      console.log('📤 Upload de l\'image hero...');
      
      // Chercher l'image dans le dossier public
      const imagePath = path.join(__dirname, '../public/images/hero/DEAL_DONE.jpg');
      
      if (fs.existsSync(imagePath)) {
        const imageId = await uploadImage(imagePath);
        
        if (imageId) {
          // Mettre à jour la page avec l'image
          const updateResponse = await fetch(
            `${STRAPI_URL}/api/page-partenaires`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${STRAPI_API_TOKEN}`,
              },
              body: JSON.stringify({
                data: {
                  heroImage: imageId,
                },
              }),
            }
          );

          if (updateResponse.ok) {
            console.log('✅ Image hero associée à la page');
          } else {
            console.error('❌ Erreur association image');
          }
        }
      } else {
        console.log('⚠️  Image par défaut non trouvée, utilisation de l\'URL statique');
      }
    }

    // Afficher les données actuelles
    const finalResponse = await fetch(
      `${STRAPI_URL}/api/page-partenaires?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    const finalData = await finalResponse.json();
    console.log('\n📋 Données actuelles:');
    console.log(JSON.stringify(finalData.data?.attributes, null, 2));
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

setupPagePartenaires();
