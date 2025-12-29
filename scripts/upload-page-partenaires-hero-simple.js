#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-token-here';

async function uploadAndAssignImage() {
  try {
    console.log('📤 Upload de l\'image hero pour la page partenaires...\n');

    // Chercher l'image
    const imagePath = path.join(__dirname, '../public/images/hero/DEAL_DONE.jpg');
    
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ Image non trouvée: ${imagePath}`);
      console.log('\n💡 Vérifiez que le fichier existe dans public/images/hero/');
      return;
    }

    console.log(`✅ Image trouvée: ${imagePath}`);

    // 1. Upload l'image
    console.log('\n1️⃣  Upload de l\'image...');
    
    const fileBuffer = fs.readFileSync(imagePath);
    const fileName = path.basename(imagePath);
    
    // Créer FormData manuellement
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substr(2, 9);
    let body = '';
    
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="files"; filename="${fileName}"\r\n`;
    body += `Content-Type: image/jpeg\r\n\r\n`;
    
    const bodyBuffer = Buffer.concat([
      Buffer.from(body),
      fileBuffer,
      Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);

    const uploadResponse = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: bodyBuffer,
    });

    if (!uploadResponse.ok) {
      console.error(`❌ Erreur upload: ${uploadResponse.status}`);
      const error = await uploadResponse.text();
      console.error(error);
      return;
    }

    const uploadData = await uploadResponse.json();
    const imageId = uploadData[0]?.id;
    
    if (!imageId) {
      console.error('❌ Pas d\'ID d\'image retourné');
      console.log('Réponse:', JSON.stringify(uploadData, null, 2));
      return;
    }

    console.log(`✅ Image uploadée (ID: ${imageId})`);

    // 2. Associer l'image à la page
    console.log('\n2️⃣  Association de l\'image à la page...');
    
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

    if (!updateResponse.ok) {
      console.error(`❌ Erreur association: ${updateResponse.status}`);
      const error = await updateResponse.text();
      console.error(error);
      return;
    }

    const updateData = await updateResponse.json();
    console.log('✅ Image associée à la page');

    // 3. Vérifier le résultat
    console.log('\n3️⃣  Vérification...');
    const getResponse = await fetch(
      `${STRAPI_URL}/api/page-partenaires?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    if (getResponse.ok) {
      const data = await getResponse.json();
      const heroImage = data.data?.attributes?.heroImage?.data;
      
      if (heroImage) {
        const imageUrl = `${STRAPI_URL}${heroImage.attributes.url}`;
        console.log(`✅ Image hero configurée`);
        console.log(`📸 URL: ${imageUrl}`);
      } else {
        console.log('⚠️  Image non trouvée dans la page');
      }
    }

    console.log('\n✅ Configuration terminée!');
    console.log('\n🌐 Testez la page: http://localhost:3000/partenaires');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

uploadAndAssignImage();
