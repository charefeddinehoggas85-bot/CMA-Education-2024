#!/usr/bin/env node

const FRONTEND_URL = 'http://localhost:3000';

async function testUniqueClass() {
  try {
    console.log('🧪 Test de la classe unique de la page partenaires...\n');

    const response = await fetch(`${FRONTEND_URL}/partenaires`);
    const html = await response.text();

    // Chercher la classe unique de notre section hero
    console.log('1️⃣  Recherche de la classe "min-h-[500px]"...');
    const minHeightMatch = html.match(/min-h-\[500px\]/);
    console.log(`   Trouvée: ${minHeightMatch ? '✅' : '❌'}`);

    // Chercher la classe du gradient
    console.log('\n2️⃣  Recherche de la classe "bg-gradient-to-br from-primary-blue to-blue-800"...');
    const gradientMatch = html.match(/bg-gradient-to-br from-primary-blue to-blue-800/);
    console.log(`   Trouvée: ${gradientMatch ? '✅' : '❌'}`);

    // Chercher les deux ensemble
    console.log('\n3️⃣  Recherche des deux classes ensemble...');
    const bothMatch = html.match(/min-h-\[500px\].*bg-gradient-to-br from-primary-blue to-blue-800|bg-gradient-to-br from-primary-blue to-blue-800.*min-h-\[500px\]/);
    console.log(`   Trouvées ensemble: ${bothMatch ? '✅' : '❌'}`);

    // Chercher la section avec min-h-[500px]
    console.log('\n4️⃣  Recherche de la section avec "min-h-[500px]"...');
    const sectionMatch = html.match(/<section[^>]*min-h-\[500px\][^>]*>/);
    if (sectionMatch) {
      console.log(`   Trouvée: ✅`);
      console.log(`   Classe: ${sectionMatch[0]}`);
    } else {
      console.log(`   Trouvée: ❌`);
    }

    // Chercher la section avec le gradient
    console.log('\n5️⃣  Recherche de la section avec le gradient...');
    const gradientSectionMatch = html.match(/<section[^>]*bg-gradient-to-br from-primary-blue to-blue-800[^>]*>/);
    if (gradientSectionMatch) {
      console.log(`   Trouvée: ✅`);
      console.log(`   Classe: ${gradientSectionMatch[0]}`);
    } else {
      console.log(`   Trouvée: ❌`);
    }

    console.log('\n✅ Test terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testUniqueClass();
