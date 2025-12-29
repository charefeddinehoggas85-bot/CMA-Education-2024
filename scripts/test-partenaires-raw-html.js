#!/usr/bin/env node

const FRONTEND_URL = 'http://localhost:3000';

async function testRawHTML() {
  try {
    console.log('🧪 Test du HTML brut de la page partenaires...\n');

    const response = await fetch(`${FRONTEND_URL}/partenaires`);
    const html = await response.text();

    // Chercher la première section
    const firstSectionStart = html.indexOf('<section');
    const firstSectionEnd = html.indexOf('</section>', firstSectionStart) + 10;
    const firstSection = html.substring(firstSectionStart, firstSectionEnd);

    console.log('1️⃣  Première section trouvée:');
    console.log(firstSection.substring(0, 300));
    console.log('...\n');

    // Chercher toutes les sections
    const sectionMatches = html.match(/<section[^>]*>/g);
    console.log(`2️⃣  Nombre de sections: ${sectionMatches ? sectionMatches.length : 0}`);
    
    if (sectionMatches) {
      sectionMatches.forEach((section, i) => {
        console.log(`   ${i + 1}. ${section.substring(0, 100)}...`);
      });
    }

    // Chercher le titre "Nos Partenaires"
    console.log('\n3️⃣  Recherche du titre "Nos Partenaires"...');
    const titleIndex = html.indexOf('Nos Partenaires');
    if (titleIndex !== -1) {
      const context = html.substring(Math.max(0, titleIndex - 200), titleIndex + 200);
      console.log(`   Trouvé à l'index ${titleIndex}`);
      console.log(`   Contexte: ...${context}...`);
    } else {
      console.log('   ❌ Non trouvé');
    }

    // Chercher le mot "partenaires" dans les classes
    console.log('\n4️⃣  Recherche de "partenaires" dans les classes...');
    const partnerMatches = html.match(/class="[^"]*partenaires[^"]*"/gi);
    if (partnerMatches) {
      console.log(`   Trouvé ${partnerMatches.length} fois`);
      partnerMatches.slice(0, 3).forEach((match, i) => {
        console.log(`     ${i + 1}. ${match}`);
      });
    } else {
      console.log('   ❌ Non trouvé');
    }

    // Vérifier si c'est la page d'accueil
    console.log('\n5️⃣  Vérification du contenu...');
    console.log(`   Contient "Nos Partenaires": ${html.includes('Nos Partenaires') ? '✅' : '❌'}`);
    console.log(`   Contient "Ils nous font confiance": ${html.includes('Ils nous font confiance') ? '✅' : '❌'}`);
    console.log(`   Contient "Devenez partenaire": ${html.includes('Devenez partenaire') ? '✅' : '❌'}`);
    console.log(`   Contient "Rejoignez notre réseau": ${html.includes('Rejoignez notre réseau') ? '✅' : '❌'}`);

    // Afficher la taille du HTML
    console.log(`\n6️⃣  Taille du HTML: ${html.length} bytes`);

    console.log('\n✅ Test terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testRawHTML();
