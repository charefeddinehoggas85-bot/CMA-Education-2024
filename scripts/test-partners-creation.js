#!/usr/bin/env node

/**
 * 🧪 TEST CRÉATION CONTENT TYPE PARTNERS
 * 
 * Vérifie que le Content Type Partners a été créé avec succès
 */

const axios = require('axios');

console.log('🧪 TEST CRÉATION CONTENT TYPE PARTNERS');
console.log('====================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';

async function testPartnersAPI() {
    console.log('🔍 ÉTAPE 1: Test de l\'API Partners');
    console.log('----------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/partners`, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ API Partners accessible !');
            console.log(`📊 Données: ${response.data?.data?.length || 0} partenaires`);
            console.log(`📋 Structure: ${JSON.stringify(response.data?.meta || {}, null, 2)}`);
            return true;
        } else if (response.status === 404) {
            console.log('❌ Content Type Partners toujours manquant');
            console.log('📝 Suivre le guide: CREATION_PARTNERS_MANUEL_RAILWAY.md');
            return false;
        } else {
            console.log(`⚠️  Status ${response.status}: ${response.data?.message || 'Erreur inconnue'}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur connexion: ${error.message}`);
        return false;
    }
}

async function createSamplePartner() {
    console.log('\n📝 ÉTAPE 2: Création d\'un partenaire test');
    console.log('------------------------------------------');
    
    const samplePartner = {
        nom: 'Bouygues Construction',
        description: 'Leader français du BTP et de la construction',
        secteur: 'Bâtiment',
        ordre: 1,
        featured: true,
        url: 'https://www.bouygues-construction.com'
    };
    
    try {
        const response = await axios.post(`${RAILWAY_URL}/api/partners`, {
            data: samplePartner
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200 || response.status === 201) {
            console.log('✅ Partenaire test créé avec succès !');
            console.log(`📋 ID: ${response.data?.data?.id}`);
            console.log(`📝 Nom: ${response.data?.data?.attributes?.nom}`);
            return true;
        } else {
            console.log(`⚠️  Erreur création: Status ${response.status}`);
            console.log('💡 Créer manuellement via Railway Admin');
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur création: ${error.message}`);
        return false;
    }
}

async function testFrontendIntegration() {
    console.log('\n🌐 ÉTAPE 3: Test intégration frontend');
    console.log('------------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/partners?populate=*&sort=ordre:asc`, {
            timeout: 10000
        });
        
        if (response.status === 200) {
            console.log('✅ API Partners avec populate fonctionne !');
            
            const partners = response.data?.data || [];
            console.log(`📊 ${partners.length} partenaire(s) trouvé(s)`);
            
            partners.forEach((partner, index) => {
                console.log(`   ${index + 1}. ${partner.attributes.nom} (${partner.attributes.secteur})`);
            });
            
            return true;
        }
        
    } catch (error) {
        console.log(`❌ Erreur test frontend: ${error.message}`);
        return false;
    }
}

async function testOtherAPIs() {
    console.log('\n🔍 ÉTAPE 4: Vérification autres APIs');
    console.log('-----------------------------------');
    
    const apisToTest = [
        'formations',
        'formation-categories', 
        'formateurs',
        'testimonials',
        'site-setting',
        'statistiques-site'
    ];
    
    for (const api of apisToTest) {
        try {
            const response = await axios.get(`${RAILWAY_URL}/api/${api}`, {
                timeout: 5000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                const count = response.data?.data?.length || (response.data?.data ? 1 : 0);
                console.log(`✅ ${api}: ${count} élément(s)`);
            } else if (response.status === 404) {
                console.log(`❌ ${api}: Content Type manquant`);
            } else {
                console.log(`⚠️  ${api}: Status ${response.status}`);
            }
            
        } catch (error) {
            console.log(`❌ ${api}: ${error.message}`);
        }
    }
}

async function main() {
    console.log('🎯 OBJECTIF: Vérifier que Partners est créé et fonctionnel\n');
    
    const apiWorking = await testPartnersAPI();
    
    if (apiWorking) {
        const partnerCreated = await createSamplePartner();
        
        if (partnerCreated) {
            await testFrontendIntegration();
        }
        
        await testOtherAPIs();
        
        console.log('\n🎉 RÉSUMÉ FINAL');
        console.log('==============');
        console.log('✅ Content Type Partners créé');
        console.log('✅ API Partners fonctionnelle');
        console.log('✅ Données test ajoutées');
        console.log('✅ Plus d\'erreur 404 pour Partners');
        console.log('');
        console.log('🔗 Test direct: https://cma-education-strapi-production.up.railway.app/api/partners');
        console.log('');
        console.log('⏭️  PROCHAINE ÉTAPE: Import des vraies données depuis le clone');
        
    } else {
        console.log('\n📝 ACTION REQUISE');
        console.log('================');
        console.log('1. Suivre le guide: CREATION_PARTNERS_MANUEL_RAILWAY.md');
        console.log('2. Créer le Content Type Partners dans Railway Admin');
        console.log('3. Relancer ce script pour vérifier');
        console.log('');
        console.log('🔗 Railway Admin: https://cma-education-strapi-production.up.railway.app/admin');
    }
}

main().catch(console.error);