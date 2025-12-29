#!/usr/bin/env node

const FRONTEND_URL = 'http://localhost:3000';

async function testDivWithStyle() {
  try {
    console.log('🧪 Test de la div avec style backgroundImage...\n');

    const response = await fetch(`${FRONTEND_URL}/partenaires`);
    const html = await response.text();

    // Chercher la div avec la classe "absolute inset-0"
    console.log('1️⃣  Recherche de la div avec "absolute inset-0"...');
    const divMatches = html.match(/<div[^>]*class="[^"]*absolute[^"]*inset-0[^"]*"[^>]*>/g);
    console.log(`   Trouvées: ${divMatches ? divMatches.length : 0}`);
    
    if (divMatches) {
      divMatches.slice(0, 5).forEach((div, i) => {
        console.log(`   ${i + 1}. ${div.substring(0, 100)}...`);
      });
    }

    // Chercher les divs avec style et "absolute inset-0"
    console.log('\n2️⃣  Recherche de la div avec "absolute inset-0" et style...');
    const styledDivMatches = html.match(/<div[^>]*class="[^"]*absolute[^"]*inset-0[^"]*"[^>]*style="[^"]*"[^>]*>/g);
    console.log(`   Trouvées: ${styledDivMatches ? styledDivMatches.length : 0}`);
    
    if (styledDivMatches) {
      styledDivMatches.forEach((div, i) => {
        console.log(`   ${i + 1}. ${div}`);
      });
    }

    // Chercher les divs avec "absolute inset-0" et backgroundImage
    console.log('\n3️⃣  Recherche de la div avec "absolute inset-0" et backgroundImage...');
    const bgDivMatches = html.match(/<div[^>]*class="[^"]*absolute[^"]*inset-0[^"]*"[^>]*style="[^"]*backgroundImage[^"]*"[^>]*>/g);
    console.log(`   Trouvées: ${bgDivMatches ? bgDivMatches.length : 0}`);
    
    if (bgDivMatches) {
      bgDivMatches.forEach((div, i) => {
        console.log(`   ${i + 1}. ${div}`);
      });
    }

    // Chercher les divs avec "absolute inset-0" et "url("
    console.log('\n4️⃣  Recherche de la div avec "absolute inset-0" et "url("...');
    const urlDivMatches = html.match(/<div[^>]*class="[^"]*absolute[^"]*inset-0[^"]*"[^>]*style="[^"]*url\([^)]*\)[^"]*"[^>]*>/g);
    console.log(`   Trouvées: ${urlDivMatches ? urlDivMatches.length : 0}`);
    
    if (urlDivMatches) {
      urlDivMatches.forEach((div, i) => {
        console.log(`   ${i + 1}. ${div}`);
      });
    }

    console.log('\n✅ Test terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testDivWithStyle();
