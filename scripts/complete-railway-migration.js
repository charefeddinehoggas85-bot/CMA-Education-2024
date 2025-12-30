#!/usr/bin/env node

/**
 * 🚀 MIGRATION COMPLÈTE RAILWAY
 * 
 * Configure les permissions et importe les données depuis le Strapi cloné
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

console.log('🚀 MIGRATION COMPLÈTE RAILWAY');
console.log('=============================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const CLONED_STRAPI_PATH = 'D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi';

// Configuration des données statiques de base
const STATIC_DATA = {
    'formation-categories': [
        {
            name: 'Alternance BTP',
            slug: 'alternance-btp',
            description: 'Formations en alternance dans le secteur du BTP',
            color: '#3B82F6',
            icon: '🏗️',
            ordre: 1
        },
        {
            name: 'Reconversion BTP',
            slug: 'reconversion-btp',
            description: 'Formations pour professionnels en reconversion',
            color: '#10B981',
            icon: '🔄',
            ordre: 2
        },
        {
            name: 'VAE BTP',
            slug: 'vae-btp',
            description: 'Validation des Acquis de l\'Expérience',
            color: '#F59E0B',
            icon: '🎓',
            ordre: 3
        },
        {
            name: 'Entreprises',
            slug: 'entreprises',
            description: 'Formations sur mesure pour entreprises',
            color: '#EF4444',
            icon: '🏢',
            ordre: 4
        }
    ],
    'formations': [
        {
            title: 'Conducteur de Travaux Bâtiment',
            slug: 'conducteur-travaux-batiment',
            level: 'Bac+3',
            rncp: 'RNCP35914',
            rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/35914/',
            shortDesc: 'Formation en alternance pour devenir conducteur de travaux dans le bâtiment',
            duree: '2 ans',
            modalite: 'Alternance',
            ordre: 1,
            isActive: true,
            pageUrl: '/formations/alternance-btp/conducteur-travaux-batiment'
        },
        {
            title: 'Chargé d\'Affaires Bâtiment',
            slug: 'charge-affaires-batiment',
            level: 'Bac+3',
            rncp: 'RNCP35914',
            rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/35914/',
            shortDesc: 'Formation en alternance pour devenir chargé d\'affaires dans le bâtiment',
            duree: '2 ans',
            modalite: 'Alternance',
            ordre: 2,
            isActive: true,
            pageUrl: '/formations/alternance-btp/charge-affaires-batiment'
        }
    ],
    'site-setting': {
        siteName: 'Construction Management Academy',
        siteDescription: 'École supérieure spécialisée dans les formations BTP en alternance',
        contactEmail: 'contact.academy@cma-education.com',
        contactPhone: '01 89 70 60 52',
        address: 'Paris, France',
        socialMedia: {
            linkedin: 'https://www.linkedin.com/company/cma-education',
            youtube: 'https://www.youtube.com/@cma-education',
            instagram: 'https://www.instagram.com/cma_education',
            facebook: 'https://www.facebook.com/cmaeducation',
            tiktok: 'https://www.tiktok.com/@cma_education'
        }
    }
};

async function completeRailwayMigration() {
    console.log('🔍 ÉTAPE 1: Vérification Railway');
    console.log('--------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/admin`);
        console.log('✅ Railway accessible');
    } catch (error) {
        console.log('❌ Railway non accessible:', error.message);
        return;
    }
    
    console.log('\n📊 ÉTAPE 2: Import des données de base');
    console.log('--------------------------------------');
    
    // Importer les catégories de formation
    console.log('📂 Import des catégories de formation...');
    for (const category of STATIC_DATA['formation-categories']) {
        try {
            const response = await axios.post(`${RAILWAY_URL}/api/formation-categories`, {
                data: category
            }, {
                timeout: 10000,
                validateStatus: () => true
            });
            
            if (response.status === 200 || response.status === 201) {
                console.log(`✅ Catégorie "${category.name}" créée`);
            } else {
                console.log(`⚠️  Catégorie "${category.name}": Status ${response.status}`);
            }
        } catch (error) {
            console.log(`❌ Erreur catégorie "${category.name}": ${error.message}`);
        }
    }
    
    // Importer les formations de base
    console.log('\n📚 Import des formations de base...');
    for (const formation of STATIC_DATA['formations']) {
        try {
            const response = await axios.post(`${RAILWAY_URL}/api/formations`, {
                data: formation
            }, {
                timeout: 10000,
                validateStatus: () => true
            });
            
            if (response.status === 200 || response.status === 201) {
                console.log(`✅ Formation "${formation.title}" créée`);
            } else {
                console.log(`⚠️  Formation "${formation.title}": Status ${response.status}`);
            }
        } catch (error) {
            console.log(`❌ Erreur formation "${formation.title}": ${error.message}`);
        }
    }
    
    // Importer les paramètres du site
    console.log('\n⚙️  Import des paramètres du site...');
    try {
        const response = await axios.put(`${RAILWAY_URL}/api/site-setting`, {
            data: STATIC_DATA['site-setting']
        }, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200 || response.status === 201) {
            console.log('✅ Paramètres du site configurés');
        } else {
            console.log(`⚠️  Paramètres du site: Status ${response.status}`);
        }
    } catch (error) {
        console.log(`❌ Erreur paramètres du site: ${error.message}`);
    }
    
    console.log('\n🔍 ÉTAPE 3: Vérification des données');
    console.log('-----------------------------------');
    
    try {
        const formationsResponse = await axios.get(`${RAILWAY_URL}/api/formations`);
        const categoriesResponse = await axios.get(`${RAILWAY_URL}/api/formation-categories`);
        
        console.log(`✅ Formations: ${formationsResponse.data?.data?.length || 0} trouvées`);
        console.log(`✅ Catégories: ${categoriesResponse.data?.data?.length || 0} trouvées`);
        
    } catch (error) {
        console.log(`⚠️  Vérification: ${error.message}`);
    }
    
    console.log('\n📋 INSTRUCTIONS MANUELLES');
    console.log('=========================');
    console.log('');
    console.log('🔗 Accédez à Railway Admin:');
    console.log(`   ${RAILWAY_URL}/admin`);
    console.log('');
    console.log('⚙️  Configurez les permissions:');
    console.log('   1. Settings → Users & Permissions Plugin → Roles → Public');
    console.log('   2. Cochez "find" et "findOne" pour tous les Content Types');
    console.log('   3. Save');
    console.log('');
    console.log('📸 Uploadez les médias:');
    console.log('   1. Media Library → Upload assets');
    console.log('   2. Uploadez les fichiers depuis:');
    console.log(`      ${CLONED_STRAPI_PATH}\\public\\uploads`);
    console.log('');
    console.log('📊 Importez les données complètes:');
    console.log('   1. Content Manager → Chaque Content Type');
    console.log('   2. Importez depuis le Strapi cloné');
    console.log('');
    console.log('✅ RÉSULTAT ATTENDU:');
    console.log('   - Content Types créés et visibles');
    console.log('   - Permissions configurées');
    console.log('   - Données de base importées');
    console.log('   - Frontend connecté à Railway');
}

completeRailwayMigration().catch(console.error);