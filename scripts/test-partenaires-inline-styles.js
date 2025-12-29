#!/usr/bin/env node

const FRONTEND_URL = 'http://localhost:3000';

async function testInlineStyles() {
  try {
    console.log('🧪 Test des styles inline de la page partenaires...\n');

    const response = await fetch(`${FRONTEND_URL}/partenaires`);
    const html = await response.text();

    // Chercher tous les styles inline
    const styleMatches = html.match(/style="[^"]*"/g);
    console.log(`1️⃣  Nombre de styles inline: ${styleMatches ? styleMatches.length : 0}`);

    // Chercher les styles backgroundImage
    const bgImageMatches = html.match(/style="[^"]*backgroundImage[^"]*"/g);
    console.log(`\n2️⃣  Styles backgroundImage: ${bgImageMatches ? bgImageMatches.length : 0}`);
    
    if (bgImageMatches) {
      bgImageMatches.forEach((style, i) => {
        console.log(`   ${i + 1}. ${style}`);
      });
    }

    // Chercher les styles backgroundSize
    const bgSizeMatches = html.match(/style="[^"]*backgroundSize[^"]*"/g);
    console.log(`\n3️⃣  Styles backgroundSize: ${bgSizeMatches ? bgSizeMatches.length : 0}`);

    // Chercher les styles backgroundPosition
    const bgPosMatches = html.match(/style="[^"]*backgroundPosition[^"]*"/g);
    console.log(`\n4️⃣  Styles backgroundPosition: ${bgPosMatches ? bgPosMatches.length : 0}`);

    // Chercher les styles opacity et transform (de Framer Motion)
    const opacityMatches = html.match(/style="[^"]*opacity[^"]*"/g);
    console.log(`\n5️⃣  Styles opacity: ${opacityMatches ? opacityMatches.length : 0}`);
    
    if (opacityMatches) {
      opacityMatches.slice(0, 3).forEach((style, i) => {
        console.log(`   ${i + 1}. ${style}`);
      });
    }

    // Chercher les divs avec style
    const styledDivMatches = html.match(/<div[^>]*style="[^"]*"[^>]*>/g);
    console.log(`\n6️⃣  Divs avec style: ${styledDivMatches ? styledDivMatches.length : 0}`);

    // Chercher la première div avec style
    if (styledDivMatches && styledDivMatches.length > 0) {
      console.log(`\n   Première div avec style:`);
      console.log(`   ${styledDivMatches[0]}`);
    }

    console.log('\n✅ Test terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testInlineStyles();
