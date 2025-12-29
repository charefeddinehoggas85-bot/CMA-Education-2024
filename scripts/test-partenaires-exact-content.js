#!/usr/bin/env node

const FRONTEND_URL = 'http://localhost:3000';

async function testExactContent() {
  try {
    console.log('🧪 Test du contenu exact de la page partenaires...\n');

    const response = await fetch(`${FRONTEND_URL}/partenaires`);
    const html = await response.text();

    // Chercher le contenu exact de notre page
    const searches = [
      { term: 'Devenez partenaire', desc: 'CTA title' },
      { term: 'Rejoignez notre réseau d\'entreprises partenaires', desc: 'CTA description' },
      { term: 'Découvrir nos formations', desc: 'CTA button' },
      { term: 'Candidater', desc: 'CTA button 2' },
      { term: 'Entreprises partenaires', desc: 'Stat label' },
      { term: 'Alternants placés', desc: 'Stat label 2' },
      { term: 'Taux d\'insertion', desc: 'Stat label 3' },
      { term: 'Satisfaction entreprises', desc: 'Stat label 4' },
    ];

    console.log('1️⃣  Recherche du contenu spécifique...');
    searches.forEach(search => {
      const found = html.includes(search.term);
      console.log(`   ${search.desc}: ${found ? '✅' : '❌'} (${search.term})`);
    });

    // Chercher le contenu du hero
    console.log('\n2️⃣  Recherche du contenu du hero...');
    const heroSearches = [
      { term: 'Nos Partenaires', desc: 'Hero title' },
      { term: 'Des entreprises leaders du BTP', desc: 'Hero subtitle' },
      { term: 'Ils nous font confiance', desc: 'Section title' },
      { term: 'Nos partenaires accueillent nos alternants', desc: 'Section subtitle' },
    ];

    heroSearches.forEach(search => {
      const found = html.includes(search.term);
      console.log(`   ${search.desc}: ${found ? '✅' : '❌'}`);
    });

    // Chercher les partenaires
    console.log('\n3️⃣  Recherche des partenaires...');
    const partners = ['Léon Grosse', 'Eiffage', 'Afpa', 'NGE', 'GCC Construction'];
    partners.forEach(partner => {
      const found = html.includes(partner);
      console.log(`   ${partner}: ${found ? '✅' : '❌'}`);
    });

    console.log('\n✅ Test terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testExactContent();
