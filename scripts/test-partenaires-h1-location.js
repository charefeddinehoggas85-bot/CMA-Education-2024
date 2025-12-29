#!/usr/bin/env node

const FRONTEND_URL = 'http://localhost:3000';

async function testH1Location() {
  try {
    console.log('🧪 Test de la localisation du H1...\n');

    const response = await fetch(`${FRONTEND_URL}/partenaires`);
    const html = await response.text();

    // Trouver tous les H1
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/g);
    console.log(`1️⃣  Nombre de H1: ${h1Matches ? h1Matches.length : 0}`);
    
    if (h1Matches) {
      h1Matches.forEach((h1, i) => {
        console.log(`   ${i + 1}. ${h1.substring(0, 100)}...`);
      });
    }

    // Trouver le contexte du H1 "Nos Partenaires"
    console.log(`\n2️⃣  Contexte du H1 "Nos Partenaires"...`);
    const h1Index = html.indexOf('<h1');
    if (h1Index !== -1) {
      const h1End = html.indexOf('</h1>', h1Index) + 5;
      const h1Element = html.substring(h1Index, h1End);
      console.log(`   Élément: ${h1Element}`);

      // Chercher la section parente
      const sectionStart = html.lastIndexOf('<section', h1Index);
      const sectionEnd = html.indexOf('</section>', sectionStart) + 10;
      const section = html.substring(sectionStart, Math.min(sectionEnd, sectionStart + 500));
      console.log(`\n   Section parente: ${section.substring(0, 200)}...`);
    }

    // Chercher les divs avec style
    console.log(`\n3️⃣  Recherche des divs avec style...`);
    const styledDivMatches = html.match(/<div[^>]*style="[^"]*"[^>]*>/g);
    console.log(`   Divs avec style trouvés: ${styledDivMatches ? styledDivMatches.length : 0}`);
    
    if (styledDivMatches) {
      styledDivMatches.slice(0, 5).forEach((div, i) => {
        console.log(`   ${i + 1}. ${div.substring(0, 100)}...`);
      });
    }

    // Chercher les divs avec backgroundImage
    console.log(`\n4️⃣  Recherche des divs avec backgroundImage...`);
    const bgDivMatches = html.match(/<div[^>]*style="[^"]*backgroundImage[^"]*"[^>]*>/g);
    console.log(`   Divs avec backgroundImage: ${bgDivMatches ? bgDivMatches.length : 0}`);
    
    if (bgDivMatches) {
      bgDivMatches.forEach((div, i) => {
        console.log(`   ${i + 1}. ${div}`);
      });
    }

    console.log('\n✅ Test terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testH1Location();
