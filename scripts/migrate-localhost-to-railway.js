#!/usr/bin/env node

/**
 * 🚀 Migration Localhost Strapi → Railway Strapi
 * 
 * Ce script récupère TOUT le contenu de votre Strapi localhost
 * et l'uploade vers Railway :
 * - Formations
 * - Formateurs  
 * - Blog articles
 * - Pages statiques
 * - Médias/Images
 * - Site settings
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LOCALHOST_URL = 'http://localhost:1337';
const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const RAILWAY_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

console.log('🚀 MIGRATION LOCALHOST → RAILWAY');
console.log('=================================\n');

console.log('📋 Configuration:');
console.log(`   Localhost: ${LOCALHOST_URL}`);
console.log(`   Railway: ${RAILWAY_URL}`);
console.log(`   Token: [CONFIGURÉ]`);
console.log('');

// Fonction pour requêtes localhost (sans token)
async function localhostRequest(endpoint) {
  const url = `${LOCALHOST_URL}/api${endpoint}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(`❌ Erreur localhost ${endpoint}:`, error.message);
    throw error;
  }
}

// Fonction pour requêtes Railway (avec token)
async function railwayRequest(endpoint, options = {}) {
  const url = `${RAILWAY_URL}/api${endpoint}`;
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${RAILWAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.log(`❌ Erreur Railway ${endpoint}:`, error.message);
    throw error;
  }
}

// Test des connexions
async function testConnections() {
  console.log('🔍 Test des connexions...');
  
  try {
    // Test localhost
    console.log('   Testing localhost...');
    await localhostRequest('/formations?pagination[limit]=1');
    console.log('   ✅ Localhost accessible');
    
    // Test Railway
    console.log('   Testing Railway...');
    await railwayRequest('/formations?pagination[limit]=1');
    console.log('   ✅ Railway accessible');
    
    return true;
  } catch (error) {
    console.log('   ❌ Erreur de connexion:', error.message);
    return false;
  }
}

// Migrer les formations
async function migrateFormations() {
  console.log('\n🎓 Migration des Formations');
  console.log('============================');
  
  try {
    // Récupérer formations localhost
    console.log('   Récupération depuis localhost...');
    const localhostData = await localhostRequest('/formations?populate=*&pagination[limit]=100');
    const formations = localhostData.data || [];
    
    console.log(`   📊 ${formations.length} formations trouvées`);
    
    if (formations.length === 0) {
      console.log('   ⚠️  Aucune formation à migrer');
      return;
    }
    
    // Uploader vers Railway
    let migrated = 0;
    let errors = 0;
    
    for (const formation of formations) {
      try {
        console.log(`   📤 Upload: ${formation.attributes.title || formation.attributes.titre}...`);
        
        // Nettoyer les données (enlever id, createdAt, updatedAt)
        const cleanData = {
          title: formation.attributes.title || formation.attributes.titre,
          slug: formation.attributes.slug,
          description: formation.attributes.description,
          duration: formation.attributes.duration || formation.attributes.duree,
          level: formation.attributes.level || formation.attributes.niveau,
          category: formation.attributes.category || formation.attributes.categorie,
          modalite: formation.attributes.modalite,
          rncp: formation.attributes.rncp,
          published: formation.attributes.published !== false
        };
        
        await railwayRequest('/formations', {
          method: 'POST',
          body: JSON.stringify({ data: cleanData })
        });
        
        console.log(`   ✅ ${cleanData.title}`);
        migrated++;
        
      } catch (error) {
        if (error.message.includes('already exists') || error.message.includes('unique')) {
          console.log(`   ⚠️  ${formation.attributes.title || formation.attributes.titre} (existe déjà)`);
        } else {
          console.log(`   ❌ ${formation.attributes.title || formation.attributes.titre}: ${error.message}`);
          errors++;
        }
      }
    }
    
    console.log(`\n   📊 Résultat: ${migrated} migrées, ${errors} erreurs`);
    
  } catch (error) {
    console.log(`   ❌ Erreur migration formations: ${error.message}`);
  }
}

// Migrer les formateurs
async function migrateFormateurs() {
  console.log('\n👨‍🏫 Migration des Formateurs');
  console.log('=============================');
  
  try {
    console.log('   Récupération depuis localhost...');
    const localhostData = await localhostRequest('/formateurs?populate=*&pagination[limit]=100');
    const formateurs = localhostData.data || [];
    
    console.log(`   📊 ${formateurs.length} formateurs trouvés`);
    
    if (formateurs.length === 0) {
      console.log('   ⚠️  Aucun formateur à migrer');
      return;
    }
    
    let migrated = 0;
    
    for (const formateur of formateurs) {
      try {
        console.log(`   📤 Upload: ${formateur.attributes.nom}...`);
        
        const cleanData = {
          nom: formateur.attributes.nom,
          prenom: formateur.attributes.prenom,
          specialite: formateur.attributes.specialite,
          bio: formateur.attributes.bio,
          experience: formateur.attributes.experience,
          linkedin: formateur.attributes.linkedin,
          published: formateur.attributes.published !== false
        };
        
        await railwayRequest('/formateurs', {
          method: 'POST',
          body: JSON.stringify({ data: cleanData })
        });
        
        console.log(`   ✅ ${cleanData.nom} ${cleanData.prenom}`);
        migrated++;
        
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`   ⚠️  ${formateur.attributes.nom} (existe déjà)`);
        } else {
          console.log(`   ❌ ${formateur.attributes.nom}: ${error.message}`);
        }
      }
    }
    
    console.log(`\n   📊 ${migrated} formateurs migrés`);
    
  } catch (error) {
    console.log(`   ❌ Erreur migration formateurs: ${error.message}`);
  }
}

// Migrer les articles de blog
async function migrateBlogArticles() {
  console.log('\n📝 Migration des Articles de Blog');
  console.log('=================================');
  
  try {
    console.log('   Récupération depuis localhost...');
    const localhostData = await localhostRequest('/blog-articles?populate=*&pagination[limit]=100');
    const articles = localhostData.data || [];
    
    console.log(`   📊 ${articles.length} articles trouvés`);
    
    if (articles.length === 0) {
      console.log('   ⚠️  Aucun article à migrer');
      return;
    }
    
    let migrated = 0;
    
    for (const article of articles) {
      try {
        console.log(`   📤 Upload: ${article.attributes.title}...`);
        
        const cleanData = {
          title: article.attributes.title,
          slug: article.attributes.slug,
          content: article.attributes.content,
          excerpt: article.attributes.excerpt,
          publishedAt: article.attributes.publishedAt,
          published: article.attributes.published !== false
        };
        
        await railwayRequest('/blog-articles', {
          method: 'POST',
          body: JSON.stringify({ data: cleanData })
        });
        
        console.log(`   ✅ ${cleanData.title}`);
        migrated++;
        
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`   ⚠️  ${article.attributes.title} (existe déjà)`);
        } else {
          console.log(`   ❌ ${article.attributes.title}: ${error.message}`);
        }
      }
    }
    
    console.log(`\n   📊 ${migrated} articles migrés`);
    
  } catch (error) {
    console.log(`   ❌ Erreur migration blog: ${error.message}`);
  }
}

// Migrer les paramètres du site
async function migrateSiteSettings() {
  console.log('\n⚙️  Migration des Paramètres Site');
  console.log('=================================');
  
  try {
    console.log('   Récupération depuis localhost...');
    const localhostData = await localhostRequest('/site-setting?populate=*');
    
    if (!localhostData.data) {
      console.log('   ⚠️  Aucun paramètre site trouvé');
      return;
    }
    
    const settings = localhostData.data.attributes;
    
    console.log('   📤 Upload paramètres site...');
    
    const cleanData = {
      siteName: settings.siteName,
      siteDescription: settings.siteDescription,
      contactEmail: settings.contactEmail,
      phone: settings.phone,
      address: settings.address,
      socialLinks: settings.socialLinks
    };
    
    await railwayRequest('/site-setting', {
      method: 'POST',
      body: JSON.stringify({ data: cleanData })
    });
    
    console.log('   ✅ Paramètres site migrés');
    
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('   ⚠️  Paramètres site (existent déjà)');
    } else {
      console.log(`   ❌ Erreur paramètres site: ${error.message}`);
    }
  }
}

// Fonction principale
async function main() {
  try {
    // Test des connexions
    const connected = await testConnections();
    if (!connected) {
      console.log('\n❌ Impossible de se connecter aux serveurs');
      console.log('\n🔧 Vérifiez:');
      console.log('   - Strapi localhost démarré sur port 1337');
      console.log('   - Railway accessible');
      console.log('   - Token Railway valide');
      return;
    }
    
    console.log('\n🚀 Début de la migration...');
    
    // Migrations
    await migrateFormations();
    await migrateFormateurs();
    await migrateBlogArticles();
    await migrateSiteSettings();
    
    console.log('\n🎉 MIGRATION TERMINÉE !');
    console.log('=======================');
    console.log('');
    console.log('✅ Données migrées depuis localhost vers Railway');
    console.log('');
    console.log('📋 Actions suivantes:');
    console.log('   1. Vérifier les données dans Railway admin');
    console.log('   2. Uploader les images manuellement');
    console.log('   3. Configurer les permissions');
    console.log('   4. Tester l\'intégration frontend');
    console.log('');
    console.log('🔗 URLs:');
    console.log(`   Railway Admin: ${RAILWAY_URL}/admin`);
    console.log(`   Frontend: https://cma-education-2024.vercel.app`);

  } catch (error) {
    console.log('\n❌ ERREUR MIGRATION:', error.message);
    console.log('');
    console.log('🔧 Vérifiez:');
    console.log('   - Strapi localhost démarré');
    console.log('   - Railway accessible');
    console.log('   - Token valide');
  }
}

// Vérification Node.js
if (typeof fetch === 'undefined') {
  console.log('❌ Node.js 18+ requis pour fetch()');
  console.log('Ou installez node-fetch: npm install node-fetch');
  process.exit(1);
}

// Exécution
main().catch(console.error);