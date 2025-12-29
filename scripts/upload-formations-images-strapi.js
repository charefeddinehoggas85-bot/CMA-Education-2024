/**
 * Script pour uploader les images des formations vers Strapi
 * et les associer aux formations correspondantes
 */

const fs = require('fs');
const path = require('path');
const https = require('http');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

// Mapping des slugs de formations vers leurs images
const formationImages = {
  'charge-affaires-batiment': 'charge-affaires.jpg',
  'conducteur-travaux-batiment': 'conducteur-travaux-reconversion.jpg',
  'chef-chantier-vrd': 'chef-chantier-vrd.jpg',
  'responsable-travaux-bim': 'double-parcours-bim.jpg',
  'chef-projets-btp': 'chef-projet-btp.jpg',
  'conducteur-travaux-vrd-1an': 'conducteur-vrd-1an.jpg',
  'conducteur-travaux-vrd-2ans': 'conducteur-vrd-2ans-1.jpg',
  'charge-affaires-reconversion': 'reconversion-charge-affaires.jpg',
  'conducteur-travaux-reconversion': 'reconversion-conducteur-travaux.jpg',
  'alt-bac3-conducteur-vrd-1an': 'conducteur-vrd-1an.jpg',
  'alt-bac3-conducteur-vrd-2ans': 'conducteur-vrd-2ans-1.jpg',
  // Nouveaux slugs avec suffixe alternance
  'charge-affaires-batiment-alternance': 'charge-affaires.jpg',
  'conducteur-travaux-batiment-alternance': 'conducteur-travaux-reconversion.jpg',
  'chef-chantier-vrd-alternance': 'chef-chantier-vrd.jpg',
  'double-parcours-bim-alternance': 'double-parcours-bim.jpg',
  'chef-projets-btp-alternance': 'chef-projet-btp.jpg',
  'alt-bac2-charge-affaires': 'charge-affaires.jpg',
  'alt-bac2-conducteur-travaux': 'conducteur-travaux-reconversion.jpg',
};

function uploadFile(filePath, fileName) {
  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(filePath);
    const boundary = '----FormBoundary' + Math.random().toString(36).substring(2);
    
    const header = `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${fileName}"\r\nContent-Type: image/jpeg\r\n\r\n`;
    const footer = `\r\n--${boundary}--\r\n`;
    
    const body = Buffer.concat([
      Buffer.from(header),
      fileContent,
      Buffer.from(footer)
    ]);

    const options = {
      hostname: 'localhost',
      port: 1337,
      path: '/api/upload',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          try {
            const json = JSON.parse(data);
            resolve(json[0]);
          } catch (e) {
            reject(new Error(`Parse error: ${data}`));
          }
        } else {
          reject(new Error(`Upload failed: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function getFormations() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: '/api/formations?populate=*',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.data || []);
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function updateFormationImage(formationId, imageId) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      data: { image: imageId }
    });

    const options = {
      hostname: 'localhost',
      port: 1337,
      path: `/api/formations/${formationId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve(res.statusCode === 200);
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('🚀 Upload des images des formations vers Strapi\n');

  // Récupérer les formations existantes
  console.log('📋 Récupération des formations...');
  const formations = await getFormations();
  console.log(`   ${formations.length} formations trouvées\n`);

  const imagesDir = path.join(__dirname, '..', 'public', 'images', 'formations');

  for (const formation of formations) {
    const slug = formation.attributes?.slug;
    const imageName = formationImages[slug];

    if (!imageName) {
      console.log(`⏭️  ${slug}: Pas d'image mappée`);
      continue;
    }

    // Vérifier si la formation a déjà une image
    if (formation.attributes?.image?.data) {
      console.log(`✅ ${slug}: Image déjà présente`);
      continue;
    }

    const imagePath = path.join(imagesDir, imageName);

    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  ${slug}: Image non trouvée (${imageName})`);
      continue;
    }

    console.log(`📤 ${slug}: Upload de ${imageName}...`);
    
    try {
      const uploadedImage = await uploadFile(imagePath, imageName);
      
      if (uploadedImage && uploadedImage.id) {
        const success = await updateFormationImage(formation.id, uploadedImage.id);
        if (success) {
          console.log(`   ✅ Image associée avec succès (ID: ${uploadedImage.id})`);
        } else {
          console.log(`   ⚠️ Upload OK mais association échouée`);
        }
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}`);
    }
  }

  console.log('\n✨ Upload terminé!');
}

main().catch(console.error);
