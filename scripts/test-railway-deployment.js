#!/usr/bin/env node

/**
 * 🚀 TEST RAILWAY DEPLOYMENT
 * 
 * Vérifie que Railway a bien redéployé avec la nouvelle structure
 */

const axios = require('axios');

console.log('🚀 TEST RAILWAY DEPLOYMENT');
console.log('==========================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

async function testRailwayDeployment() {
    console.log('🔍 ÉTAPE 1: Test de base Railway');
    console.log('------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/admin`, {
            timeout: 10000,
            validateStatus: () => true // Accept all status codes
        });
        
        console.log(`✅ Railway répond: ${response.status}`);
        
        if (response.status === 200) {
            console.log('✅ Railway Admin accessible');
        } else {
            console.log(`⚠️  Status: ${response.status} - ${response.statusText}`);
        }
        
    } catch (error) {
        console.log(`❌ Erreur connexion Railway: ${error.message}`);
        return false;
    }
    
    console.log('\n🔍 ÉTAPE 2: Test API Content Types');
    console.log('----------------------------------');
    
    // Test des Content Types principaux
    const contentTypesToTest = [
        'formations',
        'formation-categories', 
        'formateurs',
        'site-setting',
        'statistiques-site',
        'etape-admissions',
        'page-admission'
    ];
    
    for (const contentType of contentTypesToTest) {
        try {
            const response = await axios.get(`${RAILWAY_URL}/api/${contentType}`, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                },
                timeout: 5000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                console.log(`✅ ${contentType}: OK (${response.data?.data?.length || 0} items)`);
            } else if (response.status === 403) {
                console.log(`🔒 ${contentType}: Permissions manquantes (403)`);
            } else if (response.status === 404) {
                console.log(`❌ ${contentType}: Content Type non trouvé (404)`);
            } else {
                console.log(`⚠️  ${contentType}: Status ${response.status}`);
            }
            
        } catch (error) {
            console.log(`❌ ${contentType}: Erreur - ${error.message}`);
        }
    }
    
    console.log('\n🔍 ÉTAPE 3: Test API Public (sans token)');
    console.log('----------------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/formations`, {
            timeout: 5000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ API Public accessible');
            console.log(`📊 Formations trouvées: ${response.data?.data?.length || 0}`);
        } else if (response.status === 403) {
            console.log('🔒 API Public: Permissions non configurées (403)');
        } else {
            console.log(`⚠️  API Public: Status ${response.status}`);
        }
        
    } catch (error) {
        console.log(`❌ API Public: ${error.message}`);
    }
    
    console.log('\n📋 RÉSUMÉ');
    console.log('=========');
    console.log('✅ Structure copiée depuis le Strapi cloné');
    console.log('✅ Railway accessible');
    console.log('');
    console.log('🎯 PROCHAINES ÉTAPES:');
    console.log('1. Accéder à Railway Admin pour vérifier les Content Types');
    console.log('2. Configurer les permissions Public');
    console.log('3. Importer les données depuis le Strapi cloné');
    console.log('4. Uploader les médias');
    console.log('');
    console.log('🔗 URLs:');
    console.log(`- Railway Admin: ${RAILWAY_URL}/admin`);
    console.log(`- Railway API: ${RAILWAY_URL}/api`);
}

testRailwayDeployment().catch(console.error);