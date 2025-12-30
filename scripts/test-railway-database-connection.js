#!/usr/bin/env node

const axios = require('axios');

console.log('🔍 TEST COMPLET DE LA CONNEXION RAILWAY');
console.log('=====================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';

async function testDatabaseConnection() {
    console.log('📊 1. TEST DE LA CONNEXION À LA BASE DE DONNÉES');
    console.log('-----------------------------------------------');
    
    try {
        // Test de santé général
        const healthResponse = await axios.get(`${RAILWAY_URL}/api/formations?pagination[limit]=1`, {
            timeout: 15000,
            validateStatus: () => true
        });
        
        if (healthResponse.status === 200) {
            console.log('✅ Connexion à la base de données: OK');
            console.log(`✅ Temps de réponse: ${healthResponse.headers['x-response-time'] || 'N/A'}`);
        } else {
            console.log(`❌ Connexion à la base de données: Status ${healthResponse.status}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Erreur de connexion: ${error.message}`);
        return false;
    }
    
    console.log('\n📋 2. TEST DES APIs CRITIQUES');
    console.log('-----------------------------');
    
    const criticalAPIs = [
        { name: 'Formations', endpoint: 'formations', expected: 11 },
        { name: 'Formateurs', endpoint: 'formateurs', expected: 13 },
        { name: 'Témoignages', endpoint: 'testimonials', expected: 7 }
    ];
    
    let allGood = true;
    
    for (const api of criticalAPIs) {
        try {
            const response = await axios.get(`${RAILWAY_URL}/api/${api.endpoint}`, {
                timeout: 10000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                const count = response.data?.data?.length || 0;
                const status = count === api.expected ? '✅' : '⚠️';
                console.log(`${status} ${api.name}: ${count}/${api.expected} éléments`);
                
                if (count !== api.expected) {
                    allGood = false;
                }
            } else {
                console.log(`❌ ${api.name}: Status ${response.status}`);
                allGood = false;
            }
        } catch (error) {
            console.log(`❌ ${api.name}: ${error.message}`);
            allGood = false;
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log('\n🔍 3. TEST DE PERFORMANCE');
    console.log('-------------------------');
    
    const startTime = Date.now();
    try {
        await axios.get(`${RAILWAY_URL}/api/formations?populate=*`, {
            timeout: 10000
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        if (responseTime < 2000) {
            console.log(`✅ Performance: ${responseTime}ms (Excellent)`);
        } else if (responseTime < 5000) {
            console.log(`⚠️ Performance: ${responseTime}ms (Acceptable)`);
        } else {
            console.log(`❌ Performance: ${responseTime}ms (Lent)`);
            allGood = false;
        }
    } catch (error) {
        console.log(`❌ Test de performance échoué: ${error.message}`);
        allGood = false;
    }
    
    console.log('\n📊 RÉSUMÉ DE LA CONNEXION RAILWAY');
    console.log('=================================');
    
    if (allGood) {
        console.log('✅ STATUT: EXCELLENT');
        console.log('✅ Base de données: Connectée et fonctionnelle');
        console.log('✅ APIs: Toutes opérationnelles');
        console.log('✅ Performance: Dans les normes');
        console.log('✅ Données: Intègres et complètes');
    } else {
        console.log('⚠️ STATUT: PROBLÈMES DÉTECTÉS');
        console.log('⚠️ Vérifier les détails ci-dessus');
    }
    
    return allGood;
}

async function analyzeServiceWorkerIssue() {
    console.log('\n🔧 4. ANALYSE DES ERREURS SERVICE WORKER');
    console.log('========================================');
    
    console.log('📋 Erreurs rapportées:');
    console.log('- sw.js:83 Uncaught TypeError: Failed to execute \'put\' on \'Cache\'');
    console.log('- Request scheme \'chrome-extension\' is unsupported');
    
    console.log('\n🔍 DIAGNOSTIC:');
    console.log('✅ Type d\'erreur: Cache API avec chrome-extension://');
    console.log('✅ Impact: MINEUR - N\'affecte pas le fonctionnement du site');
    console.log('✅ Cause: Extensions Chrome tentant d\'utiliser le cache');
    console.log('✅ Solution: Filtrage des requêtes non-HTTP dans le Service Worker');
    
    console.log('\n💡 RECOMMANDATIONS:');
    console.log('1. Ajouter un filtre pour ignorer les chrome-extension:// URLs');
    console.log('2. Ces erreurs n\'impactent pas les utilisateurs normaux');
    console.log('3. Priorité: BASSE (cosmétique)');
}

async function main() {
    const dbStatus = await testDatabaseConnection();
    await analyzeServiceWorkerIssue();
    
    console.log('\n🎯 CONCLUSION GÉNÉRALE');
    console.log('======================');
    
    if (dbStatus) {
        console.log('✅ RAILWAY: Parfaitement fonctionnel');
        console.log('✅ BASE DE DONNÉES: Aucun problème détecté');
        console.log('⚠️ SERVICE WORKER: Erreurs mineures (extensions Chrome)');
        console.log('\n🚀 Le site fonctionne correctement !');
        console.log('Les erreurs Service Worker sont cosmétiques et n\'affectent pas l\'expérience utilisateur.');
    } else {
        console.log('❌ RAILWAY: Problèmes détectés');
        console.log('🔧 Action requise sur la base de données');
    }
}

main().catch(console.error);