#!/usr/bin/env node

const FRONTEND_URL = 'http://localhost:3000';

async function testURL() {
  try {
    console.log('🧪 Test de l\'URL de la page partenaires...\n');

    const response = await fetch(`${FRONTEND_URL}/partenaires`, {
      redirect: 'follow'
    });

    console.log(`1️⃣  URL finale: ${response.url}`);
    console.log(`   Status: ${response.status}`);
    console.log(`   OK: ${response.ok ? '✅' : '❌'}`);

    const html = await response.text();

    // Chercher le titre de la page
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    console.log(`\n2️⃣  Titre de la page: ${titleMatch ? titleMatch[1] : 'Non trouvé'}`);

    // Chercher le h1
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    console.log(`   H1: ${h1Match ? h1Match[1] : 'Non trouvé'}`);

    // Chercher les meta descriptions
    const metaMatch = html.match(/<meta name="description" content="([^"]+)"/);
    console.log(`   Meta description: ${metaMatch ? metaMatch[1] : 'Non trouvé'}`);

    // Vérifier si c'est la page partenaires
    console.log(`\n3️⃣  Vérification du contenu spécifique à la page partenaires...`);
    console.log(`   "Nos Partenaires" (titre): ${html.includes('<h1 class="text-5xl md:text-6xl font-montserrat font-black mb-6">\n              Nos Partenaires') ? '✅' : '❌'}`);
    console.log(`   "Ils nous font confiance": ${html.includes('Ils nous font confiance') ? '✅' : '❌'}`);
    console.log(`   "Léon Grosse" (partenaire): ${html.includes('Léon Grosse') ? '✅' : '❌'}`);

    // Chercher la section hero avec backgroundImage
    console.log(`\n4️⃣  Recherche de la section hero...`);
    const heroSectionMatch = html.match(/<section[^>]*class="[^"]*relative[^"]*py-20[^"]*min-h-\[500px\][^"]*"[^>]*>/);
    console.log(`   Section hero trouvée: ${heroSectionMatch ? '✅' : '❌'}`);

    if (heroSectionMatch) {
      console.log(`   Classe: ${heroSectionMatch[0]}`);
    }

    // Chercher les styles backgroundImage
    const bgImageMatches = html.match(/style="[^"]*backgroundImage[^"]*"/g);
    console.log(`\n5️⃣  Styles backgroundImage trouvés: ${bgImageMatches ? bgImageMatches.length : 0}`);
    
    if (bgImageMatches) {
      bgImageMatches.forEach((style, i) => {
        console.log(`   ${i + 1}. ${style}`);
      });
    }

    console.log('\n✅ Test terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testURL();
