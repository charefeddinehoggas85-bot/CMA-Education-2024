#!/usr/bin/env node

const FRONTEND_URL = 'http://localhost:3000';

async function testHTML() {
  try {
    console.log('🧪 Test détaillé du HTML de la page partenaires...\n');

    const response = await fetch(`${FRONTEND_URL}/partenaires`);
    const html = await response.text();

    console.log('1️⃣  Recherche de l\'image dans le HTML...');
    
    // Chercher différentes variantes
    const searches = [
      { term: 'DEAL_DONE', desc: 'Nom du fichier' },
      { term: 'uploads', desc: 'Dossier uploads' },
      { term: 'backgroundImage', desc: 'Propriété CSS' },
      { term: 'http://localhost:1337', desc: 'URL Strapi' },
      { term: '/uploads/', desc: 'Chemin uploads' },
      { term: 'heroImage', desc: 'Nom de variable' },
      { term: 'Nos Partenaires', desc: 'Titre' },
      { term: 'Ils nous font confiance', desc: 'Section title' },
    ];

    searches.forEach(search => {
      const found = html.includes(search.term);
      console.log(`   ${search.desc}: ${found ? '✅' : '❌'} (${search.term})`);
    });

    // Chercher les sections
    console.log('\n2️⃣  Recherche des sections...');
    const heroSectionMatch = html.match(/<section[^>]*class="[^"]*relative[^"]*py-20[^"]*min-h-\[500px\][^"]*"[^>]*>/);
    console.log(`   Section hero: ${heroSectionMatch ? '✅' : '❌'}`);

    // Chercher les styles inline
    console.log('\n3️⃣  Recherche des styles inline...');
    const styleMatches = html.match(/style="[^"]*backgroundImage[^"]*"/g);
    if (styleMatches) {
      console.log(`   Styles backgroundImage trouvés: ${styleMatches.length}`);
      styleMatches.slice(0, 3).forEach((style, i) => {
        console.log(`     ${i + 1}. ${style.substring(0, 100)}...`);
      });
    } else {
      console.log(`   Styles backgroundImage: ❌`);
    }

    // Chercher les URLs d'image
    console.log('\n4️⃣  Recherche des URLs d\'image...');
    const urlMatches = html.match(/url\([^)]+\)/g);
    if (urlMatches) {
      console.log(`   URLs trouvées: ${urlMatches.length}`);
      urlMatches.slice(0, 5).forEach((url, i) => {
        console.log(`     ${i + 1}. ${url}`);
      });
    } else {
      console.log(`   URLs: ❌`);
    }

    // Chercher les images
    console.log('\n5️⃣  Recherche des balises img...');
    const imgMatches = html.match(/<img[^>]*src="[^"]*"[^>]*>/g);
    if (imgMatches) {
      console.log(`   Balises img trouvées: ${imgMatches.length}`);
      imgMatches.slice(0, 3).forEach((img, i) => {
        console.log(`     ${i + 1}. ${img.substring(0, 100)}...`);
      });
    } else {
      console.log(`   Balises img: ❌`);
    }

    // Afficher un extrait du HTML
    console.log('\n6️⃣  Extrait du HTML (première section)...');
    const sectionStart = html.indexOf('<section');
    if (sectionStart !== -1) {
      const sectionEnd = html.indexOf('</section>', sectionStart) + 10;
      const section = html.substring(sectionStart, Math.min(sectionEnd, sectionStart + 500));
      console.log(section);
    }

    console.log('\n✅ Test terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testHTML();
