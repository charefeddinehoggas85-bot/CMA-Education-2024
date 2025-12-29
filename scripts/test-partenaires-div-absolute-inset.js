#!/usr/bin/env node

const FRONTEND_URL = 'http://localhost:3000';

async function testDivAbsoluteInset() {
  try {
    console.log('🧪 Test de la div "absolute inset-0" sans style...\n');

    const response = await fetch(`${FRONTEND_URL}/partenaires`);
    const html = await response.text();

    // Chercher la première section
    const sectionStart = html.indexOf('<section');
    const sectionEnd = html.indexOf('</section>', sectionStart) + 10;
    const section = html.substring(sectionStart, sectionEnd);

    console.log('1️⃣  Première section:');
    console.log(section.substring(0, 500));
    console.log('...\n');

    // Chercher les divs "absolute inset-0" dans la première section
    console.log('2️⃣  Divs "absolute inset-0" dans la première section:');
    const divMatches = section.match(/<div[^>]*class="[^"]*absolute[^"]*inset-0[^"]*"[^>]*>/g);
    console.log(`   Trouvées: ${divMatches ? divMatches.length : 0}`);
    
    if (divMatches) {
      divMatches.forEach((div, i) => {
        console.log(`   ${i + 1}. ${div}`);
      });
    }

    // Chercher les divs "absolute inset-0" sans style
    console.log('\n3️⃣  Divs "absolute inset-0" sans style:');
    const noStyleDivMatches = section.match(/<div[^>]*class="[^"]*absolute[^"]*inset-0[^"]*"(?![^>]*style)[^>]*>/g);
    console.log(`   Trouvées: ${noStyleDivMatches ? noStyleDivMatches.length : 0}`);
    
    if (noStyleDivMatches) {
      noStyleDivMatches.forEach((div, i) => {
        console.log(`   ${i + 1}. ${div}`);
      });
    }

    console.log('\n✅ Test terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testDivAbsoluteInset();
