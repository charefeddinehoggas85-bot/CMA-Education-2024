const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

const api = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Authorization': `Bearer ${STRAPI_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Partenaires (champs corrigés selon schema)
const partnersData = [
  {
    name: "Bouygues Construction",
    description: "Leader mondial de la construction et des services",
    website: "https://www.bouygues-construction.com",
    sector: "Construction",
    type: "Entreprise d'accueil",
    featured: true,
    ordre: 1
  },
  {
    name: "Vinci Construction",
    description: "Premier groupe mondial de concessions et de construction",
    website: "https://www.vinci-construction.com",
    sector: "Construction",
    type: "Entreprise d'accueil",
    featured: true,
    ordre: 2
  },
  {
    name: "Eiffage Construction",
    description: "Groupe de construction et de concessions français",
    website: "https://www.eiffage.com",
    sector: "Construction",
    type: "Entreprise d'accueil",
    featured: true,
    ordre: 3
  },
  {
    name: "Spie Batignolles",
    description: "Entreprise française de BTP et de génie civil",
    website: "https://www.spiebatignolles.fr",
    sector: "Construction",
    type: "Entreprise d'accueil",
    featured: false,
    ordre: 4
  }
];

// Témoignages (champs corrigés selon schema)
const testimonialsData = [
  {
    name: "Alexandre Martin",
    position: "Conducteur de Travaux",
    company: "Bouygues Construction",
    content: "La formation en alternance m'a permis d'acquérir une expérience concrète tout en obtenant mon diplôme. L'équipe pédagogique est très professionnelle et à l'écoute.",
    rating: 5,
    featured: true,
    ordre: 1
  },
  {
    name: "Sophie Dubois",
    position: "Chargée d'Affaires",
    company: "Vinci Construction",
    content: "Excellente formation qui m'a permis de me reconvertir dans le BTP. Les formateurs sont des professionnels du secteur avec une vraie expertise.",
    rating: 5,
    featured: true,
    ordre: 2
  },
  {
    name: "Thomas Leroy",
    position: "Responsable de Chantier",
    company: "Eiffage Construction",
    content: "La VAE m'a permis de valider mon expérience et d'obtenir une reconnaissance officielle de mes compétences. Un vrai plus pour ma carrière.",
    rating: 4,
    featured: true,
    ordre: 3
  },
  {
    name: "Marie Rousseau",
    position: "Ingénieure Travaux",
    company: "Spie Batignolles",
    content: "Formation complète et bien structurée. L'alternance permet vraiment de mettre en pratique les connaissances théoriques immédiatement.",
    rating: 5,
    featured: false,
    ordre: 4
  }
];

async function importPartners() {
  console.log('🤝 Import des partenaires...');
  
  let imported = 0;
  
  for (const partner of partnersData) {
    try {
      const response = await api.post('/api/partners', { data: partner });
      console.log(`✅ Partenaire importé: ${partner.name}`);
      imported++;
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
        console.log(`ℹ️ Partenaire existe déjà: ${partner.name}`);
      } else {
        console.error(`❌ Erreur import ${partner.name}:`, error.response?.data?.error?.message || error.message);
      }
    }
  }
  
  console.log(`📊 ${imported}/${partnersData.length} partenaires importés\n`);
  return imported;
}

async function importTestimonials() {
  console.log('💬 Import des témoignages...');
  
  let imported = 0;
  
  for (const testimonial of testimonialsData) {
    try {
      const response = await api.post('/api/testimonials', { data: testimonial });
      console.log(`✅ Témoignage importé: ${testimonial.name}`);
      imported++;
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
        console.log(`ℹ️ Témoignage existe déjà: ${testimonial.name}`);
      } else {
        console.error(`❌ Erreur import ${testimonial.name}:`, error.response?.data?.error?.message || error.message);
      }
    }
  }
  
  console.log(`📊 ${imported}/${testimonialsData.length} témoignages importés\n`);
  return imported;
}

async function main() {
  console.log('🚀 IMPORT PARTENAIRES ET TÉMOIGNAGES - PHASE 4B\n');
  
  if (!STRAPI_TOKEN) {
    console.error('❌ STRAPI_TOKEN non défini');
    process.exit(1);
  }
  
  try {
    // Vérifier que Strapi est accessible
    await api.get('/api/partners');
    console.log('✅ Strapi accessible\n');
    
    const partnersImported = await importPartners();
    const testimonialsImported = await importTestimonials();
    
    console.log('📊 RÉSULTATS D\'IMPORT:');
    console.log(`✅ Partenaires: ${partnersImported} importés`);
    console.log(`✅ Témoignages: ${testimonialsImported} importés`);
    
    if (partnersImported > 0 || testimonialsImported > 0) {
      console.log('\n🎯 Phase 4B - Partenaires et témoignages terminée avec succès !');
      console.log('📋 Prochaine étape: Phase 4C - Migration des composants');
    } else {
      console.log('\n⚠️ Aucune donnée importée - Vérifiez les erreurs ci-dessus');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    if (error.response?.status === 500) {
      console.error('💡 Vérifiez que Strapi est démarré et accessible');
    }
    process.exit(1);
  }
}

main();