#!/usr/bin/env node

/**
 * 🔗 TEST CONNEXION FRONTEND → RAILWAY
 * 
 * Vérifie que le frontend peut se connecter à Railway
 */

const axios = require('axios');

console.log('🔗 TEST CONNEXION FRONTEND → RAILWAY');
console.log('====================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';

async function testFrontendConnection() {
    console.log('🔍 ÉTAPE 1: Test des APIs utilisées par le frontend');
    console.log('--------------------------------------------------');
    
    const frontendAPIs = [
        'formations?populate=*&sort=ordre:asc',
        'formation-categories?populate=*&sort=ordre:asc',
        'site-setting?populate=*',
        'statistiques-site?sort=ordre:asc&populate=*',
        'etape-admissions?sort=ordre:asc&populate=*',
        'page-admission?populate=*',
        'formateurs?populate=*&sort=ordre:asc'
    ];
    
    let successCount = 0;
    let totalCount = frontendAPIs.length;
    
    for (const api of frontendAPIs) {
        try {
            const response = await axios.get(`${RAILWAY_URL}/api/${api}`, {
                timeout: 5000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                const dataCount = response.data?.data?.length || (response.data?.data ? 1 : 0);
                console.log(`✅ ${api.split('?')[0]}: OK (${dataCount} items)`);
                successCount++;
            } else if (response.status === 403) {
                console.log(`🔒 ${api.split('?')[0]}: Permissions manquantes (403)`);
            } else if (response.status === 404) {
                console.log(`❌ ${api.split('?')[0]}: Non trouvé (404)`);
            } else {
                console.log(`⚠️  ${api.split('?')[0]}: Status ${response.status}`);
            }
            
        } catch (error) {
            console.log(`❌ ${api.split('?')[0]}: ${error.message}`);
        }
    }
    
    console.log('\n🔍 ÉTAPE 2: Test des données spécifiques');
    console.log('----------------------------------------');
    
    try {
        // Test formations avec détails
        const formationsResponse = await axios.get(`${RAILWAY_URL}/api/formations?populate=*`);
        
        if (formationsResponse.status === 200) {
            const formations = formationsResponse.data.data;
            console.log(`✅ Formations détaillées: ${formations.length} trouvées`);
            
            if (formations.length > 0) {
                const firstFormation = formations[0];
                console.log(`   - Première formation: "${firstFormation.attributes?.title || 'Sans titre'}"`);
                console.log(`   - Slug: ${firstFormation.attributes?.slug || 'N/A'}`);
                console.log(`   - Niveau: ${firstFormation.attributes?.level || 'N/A'}`);
            }
        }
        
        // Test catégories
        const categoriesResponse = await axios.get(`${RAILWAY_URL}/api/formation-categories?populate=*`);
        
        if (categoriesResponse.status === 200) {
            const categories = categoriesResponse.data.data;
            console.log(`✅ Catégories: ${categories.length} trouvées`);
            
            categories.forEach(cat => {
                const name = cat.attributes?.name || 'Sans nom';
                const formationsCount = cat.attributes?.formations?.data?.length || 0;
                console.log(`   - ${name}: ${formationsCount} formations`);
            });
        }
        
    } catch (error) {
        console.log(`❌ Test détaillé: ${error.message}`);
    }
    
    console.log('\n📊 RÉSUMÉ DE LA CONNEXION');
    console.log('=========================');
    console.log(`✅ APIs fonctionnelles: ${successCount}/${totalCount}`);
    console.log(`📈 Taux de succès: ${Math.round((successCount/totalCount)*100)}%`);
    
    if (successCount >= totalCount * 0.7) {
        console.log('🎉 CONNEXION FRONTEND → RAILWAY: RÉUSSIE');
        console.log('');
        console.log('✅ Le frontend peut maintenant se connecter à Railway');
        console.log('✅ Les données de base sont disponibles');
        console.log('✅ Plus d\'erreurs 503 attendues');
    } else {
        console.log('⚠️  CONNEXION PARTIELLE');
        console.log('');
        console.log('🔧 Actions nécessaires:');
        console.log('1. Configurer les permissions manquantes dans Railway Admin');
        console.log('2. Vérifier les Content Types non trouvés');
    }
    
    console.log('\n🔗 URLs de test:');
    console.log(`- Railway Admin: ${RAILWAY_URL}/admin`);
    console.log(`- API Formations: ${RAILWAY_URL}/api/formations`);
    console.log(`- API Catégories: ${RAILWAY_URL}/api/formation-categories`);
}

testFrontendConnection().catch(console.error);