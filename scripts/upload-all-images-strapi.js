/**
 * Script pour uploader TOUTES les images vers Strapi
 * - Partenaires (logos)
 * - Témoignages (photos)
 * - Articles blog (images)
 * - Galerie
 * - Site Settings (logo, favicon)
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

// Fonction pour déterminer le type MIME
function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

function uploadFile(filePath, fileName) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject(new Error(`File not found: ${filePath}`));
      return;
    }
    
    const fileContent = fs.readFileSync(filePath);
    const boundary = '----FormBoundary' + Math.random().toString(36).substring(2);
    const mimeType = getMimeType(fileName);
    
    const header = `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${fileName}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
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

    const req = http.request(options, (res) => {
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
          reject(new Error(`Upload failed: ${res.statusCode} - ${data.substring(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function apiRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      const bodyStr = JSON.stringify(body);
      req.setHeader('Content-Length', Buffer.byteLength(bodyStr));
      req.write(bodyStr);
    }
    req.end();
  });
}

// ============ PARTENAIRES ============
async function uploadPartnerLogos() {
  console.log('\n📦 PARTENAIRES - Upload des logos...\n');
  
  const partnersDir = path.join(__dirname, '..', 'public', 'images', 'partners');
  const { data: partners } = await apiRequest('GET', '/api/partners?populate=*');
  
  if (!partners?.data) {
    console.log('   ⚠️ Aucun partenaire trouvé dans Strapi');
    return;
  }

  // Mapping nom partenaire -> fichier logo
  const logoMapping = {
    'Bouygues Construction': 'bouygues.svg',
    'Bouygues': 'bouygues.svg',
    'Eiffage': 'eiffage.webp',
    'Vinci': 'vinci.svg',
    'VINCI': 'vinci.svg',
    'NGE': 'nge.webp',
    'Spie': 'spie.svg',
    'SPIE': 'spie.svg',
    'GCC': 'gcc.webp',
    'Leon Grosse': 'leon-grosse.webp',
    'LEON GROSSE': 'LEON GROSSE.webp',
    'Afpa': 'Afpa.webp',
    'AFPA': 'Afpa.webp',
    'COREDIF': 'COREDIF.webp',
    'Green Bat': 'Green Bat.webp',
    'GS Construction': 'GS Construction.webp',
    'LT Construction': 'LT CONSTRUCTION.webp',
    'LT CONSTRUCTION': 'LT CONSTRUCTION.webp',
    'O2P BAT': 'O2P BAT.webp',
    'DCT Solutions': 'DCT Solutions de Démolition.webp',
    'Bien sur élévations': 'Bien sur élévations.webp',
    'Qualuipo': 'Qualuipo.webp'
  };

  for (const partner of partners.data) {
    const name = partner.attributes?.name;
    
    // Vérifier si déjà une image
    if (partner.attributes?.logo?.data) {
      console.log(`   ✅ ${name}: Logo déjà présent`);
      continue;
    }

    // Chercher le fichier correspondant
    let logoFile = logoMapping[name];
    
    // Si pas de mapping direct, chercher par nom similaire
    if (!logoFile) {
      const files = fs.readdirSync(partnersDir);
      logoFile = files.find(f => 
        f.toLowerCase().includes(name.toLowerCase().split(' ')[0])
      );
    }

    if (!logoFile) {
      console.log(`   ⏭️  ${name}: Pas de logo trouvé`);
      continue;
    }

    const logoPath = path.join(partnersDir, logoFile);
    if (!fs.existsSync(logoPath)) {
      console.log(`   ⚠️  ${name}: Fichier non trouvé (${logoFile})`);
      continue;
    }

    console.log(`   📤 ${name}: Upload de ${logoFile}...`);
    try {
      const uploaded = await uploadFile(logoPath, logoFile);
      if (uploaded?.id) {
        await apiRequest('PUT', `/api/partners/${partner.id}`, {
          data: { logo: uploaded.id }
        });
        console.log(`      ✅ Logo associé (ID: ${uploaded.id})`);
      }
    } catch (error) {
      console.log(`      ❌ Erreur: ${error.message}`);
    }
  }
}

// ============ TÉMOIGNAGES ============
async function uploadTestimonialPhotos() {
  console.log('\n👤 TÉMOIGNAGES - Upload des photos...\n');
  
  const testimonialsDir = path.join(__dirname, '..', 'public', 'images', 'testimonials');
  const { data: testimonials } = await apiRequest('GET', '/api/testimonials?populate=*');
  
  if (!testimonials?.data) {
    console.log('   ⚠️ Aucun témoignage trouvé dans Strapi');
    return;
  }

  const photoMapping = {
    'Thomas Martin': 'thomas-martin.svg',
    'Marie Dubois': 'marie-dubois.svg',
    'Sarah Johnson': 'sarah-johnson.svg'
  };

  for (const testimonial of testimonials.data) {
    const name = testimonial.attributes?.name;
    
    if (testimonial.attributes?.photo?.data) {
      console.log(`   ✅ ${name}: Photo déjà présente`);
      continue;
    }

    let photoFile = photoMapping[name];
    if (!photoFile) {
      const files = fs.readdirSync(testimonialsDir);
      const firstName = name.toLowerCase().split(' ')[0];
      photoFile = files.find(f => f.toLowerCase().includes(firstName));
    }

    if (!photoFile) {
      console.log(`   ⏭️  ${name}: Pas de photo trouvée`);
      continue;
    }

    const photoPath = path.join(testimonialsDir, photoFile);
    if (!fs.existsSync(photoPath)) continue;

    console.log(`   📤 ${name}: Upload de ${photoFile}...`);
    try {
      const uploaded = await uploadFile(photoPath, photoFile);
      if (uploaded?.id) {
        await apiRequest('PUT', `/api/testimonials/${testimonial.id}`, {
          data: { photo: uploaded.id }
        });
        console.log(`      ✅ Photo associée (ID: ${uploaded.id})`);
      }
    } catch (error) {
      console.log(`      ❌ Erreur: ${error.message}`);
    }
  }
}

// ============ ARTICLES BLOG ============
async function uploadBlogImages() {
  console.log('\n📰 ARTICLES BLOG - Upload des images...\n');
  
  const blogDir = path.join(__dirname, '..', 'public', 'images', 'blog');
  const { data: articles } = await apiRequest('GET', '/api/article-blogs?populate=*');
  
  if (!articles?.data) {
    console.log('   ⚠️ Aucun article trouvé dans Strapi');
    return;
  }

  const imageMapping = {
    'alternance-btp': 'alternance-btp.jpg',
    'centre-formation': 'centre-formation.jpg',
    'conducteur-travaux': 'conducteur-travaux.jpg',
    'economiste-construction': 'economiste-construction.jpg',
    'financement-formation': 'financement-formation.jpg',
    'formation-bim': 'formation-bim.jpg',
    'guide-formation-btp': 'guide-formation-btp.jpg',
    'metiers-btp-2025': 'metiers-btp-2025.jpg',
    'niveaux-formation': 'niveaux-formation.jpg',
    'reconversion-40ans': 'reconversion-40ans.jpg'
  };

  for (const article of articles.data) {
    const slug = article.attributes?.slug;
    const title = article.attributes?.titre || article.attributes?.title;
    
    if (article.attributes?.image?.data || article.attributes?.imagePrincipale?.data) {
      console.log(`   ✅ ${slug || title}: Image déjà présente`);
      continue;
    }

    let imageFile = imageMapping[slug];
    if (!imageFile && fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir);
      imageFile = files.find(f => slug && f.toLowerCase().includes(slug.split('-')[0]));
    }

    if (!imageFile) {
      console.log(`   ⏭️  ${slug || title}: Pas d'image trouvée`);
      continue;
    }

    const imagePath = path.join(blogDir, imageFile);
    if (!fs.existsSync(imagePath)) continue;

    console.log(`   📤 ${slug || title}: Upload de ${imageFile}...`);
    try {
      const uploaded = await uploadFile(imagePath, imageFile);
      if (uploaded?.id) {
        await apiRequest('PUT', `/api/article-blogs/${article.id}`, {
          data: { imagePrincipale: uploaded.id }
        });
        console.log(`      ✅ Image associée (ID: ${uploaded.id})`);
      }
    } catch (error) {
      console.log(`      ❌ Erreur: ${error.message}`);
    }
  }
}

// ============ SITE SETTINGS ============
async function uploadSiteSettingsImages() {
  console.log('\n⚙️  SITE SETTINGS - Upload logo et favicon...\n');
  
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  const { data: settings } = await apiRequest('GET', '/api/site-settings?populate=*');
  
  if (!settings?.data) {
    console.log('   ⚠️ Site Settings non trouvé dans Strapi');
    return;
  }

  // Upload logo
  if (!settings.data.attributes?.logo?.data) {
    const logoPath = path.join(imagesDir, 'logoo.svg');
    if (fs.existsSync(logoPath)) {
      console.log('   📤 Upload du logo...');
      try {
        const uploaded = await uploadFile(logoPath, 'logoo.svg');
        if (uploaded?.id) {
          await apiRequest('PUT', '/api/site-settings', {
            data: { logo: uploaded.id }
          });
          console.log(`      ✅ Logo uploadé (ID: ${uploaded.id})`);
        }
      } catch (error) {
        console.log(`      ❌ Erreur: ${error.message}`);
      }
    }
  } else {
    console.log('   ✅ Logo déjà présent');
  }

  // Upload favicon (utiliser le même logo)
  if (!settings.data.attributes?.favicon?.data) {
    const faviconPath = path.join(imagesDir, 'logo.svg');
    if (fs.existsSync(faviconPath)) {
      console.log('   📤 Upload du favicon...');
      try {
        const uploaded = await uploadFile(faviconPath, 'logo.svg');
        if (uploaded?.id) {
          await apiRequest('PUT', '/api/site-settings', {
            data: { favicon: uploaded.id }
          });
          console.log(`      ✅ Favicon uploadé (ID: ${uploaded.id})`);
        }
      } catch (error) {
        console.log(`      ❌ Erreur: ${error.message}`);
      }
    }
  } else {
    console.log('   ✅ Favicon déjà présent');
  }
}

// ============ GALERIE ============
async function uploadGalleryImages() {
  console.log('\n🖼️  GALERIE - Upload des images...\n');
  
  const galleryDir = path.join(__dirname, '..', 'public', 'images', 'gallery');
  
  if (!fs.existsSync(galleryDir)) {
    console.log('   ⚠️ Dossier galerie non trouvé');
    return;
  }

  const files = fs.readdirSync(galleryDir).filter(f => 
    ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(f).toLowerCase())
  );

  console.log(`   📁 ${files.length} images trouvées dans le dossier galerie`);
  
  for (const file of files) {
    const filePath = path.join(galleryDir, file);
    console.log(`   📤 Upload de ${file}...`);
    try {
      const uploaded = await uploadFile(filePath, file);
      console.log(`      ✅ Uploadé (ID: ${uploaded.id})`);
    } catch (error) {
      console.log(`      ❌ Erreur: ${error.message}`);
    }
  }
}

// ============ MAIN ============
async function main() {
  console.log('🚀 UPLOAD COMPLET DES IMAGES VERS STRAPI');
  console.log('=========================================\n');

  try {
    await uploadPartnerLogos();
    await uploadTestimonialPhotos();
    await uploadBlogImages();
    await uploadSiteSettingsImages();
    await uploadGalleryImages();

    console.log('\n=========================================');
    console.log('✨ Upload complet terminé!');
    console.log('\n📝 Toutes les images sont maintenant gérables via:');
    console.log('   http://localhost:1337/admin');
  } catch (error) {
    console.error('\n❌ Erreur globale:', error.message);
  }
}

main();
