#!/usr/bin/env node

/**
 * 🔍 TEST DE CONNEXION VERCEL → RAILWAY STRAPI
 * 
 * Teste la connexion depuis Vercel vers Railway pour diagnostiquer
 * pourquoi les formations ne s'affichent pas
 */

const axios = require('axios');

console.log('🔍 TEST CONNEXION VERCEL → RAILWAY STRAPI');
console.log('==========================================\n');

const VERCEL_URL = 'https://cma-education-2024.vercel.app';
const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';

async function testDirectRailwayConnection() {
    console.log('📡 TEST 1: Connexion directe à Railway');
    console.log('-------------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/formations`, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            const formations = response.data?.data || [];
            console.log(`✅ Railway accessible: ${formations.length} formations`);
            
            // Afficher quelques formations pour vérification
            if (formations.length > 0) {
                console.log('\n📋 Formations disponibles:');
                formations.slice(0, 3).forEach((formation, i) => {
                    const title = formation.attributes?.title || formation.title || 'Sans titre';
                    const slug = formation.attributes?.slug || formation.slug || 'sans-slug';
                    console.log(`   ${i + 1}. ${title} (${slug})`);
                });
            }
            
            return true;
        } else {
            console.log(`❌ Railway non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur connexion Railway: ${error.message}`);
        return false;
    }
}

async function testVercelEnvironment() {
    console.log('\n🌐 TEST 2: Variables d\'environnement Vercel');
    console.log('-------------------------------------------');
    
    try {
        // Tester l'API interne de Vercel qui expose les variables d'environnement
        const response = await axios.get(`${VERCEL_URL}/api/test-env`, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ API test-env accessible');
            console.log('📊 Variables d\'environnement:', response.data);
            return response.data;
        } else {
            console.log(`⚠️  API test-env non disponible: Status ${response.status}`);
            return null;
        }
        
    } catch (error) {
        console.log(`⚠️  API test-env non disponible: ${error.message}`);
        return null;
    }
}

async function testVercelFormationsAPI() {
    console.log('\n📚 TEST 3: API formations depuis Vercel');
    console.log('--------------------------------------');
    
    try {
        const response = await axios.get(`${VERCEL_URL}/api/test-formations`, {
            timeout: 15000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ API formations Vercel accessible');
            const data = response.data;
            
            if (data.formations && Array.isArray(data.formations)) {
                console.log(`📋 ${data.formations.length} formations récupérées depuis Vercel`);
                
                if (data.formations.length > 0) {
                    console.log('\n📋 Formations Vercel:');
                    data.formations.slice(0, 3).forEach((formation, i) => {
                        console.log(`   ${i + 1}. ${formation.title || 'Sans titre'} (${formation.slug || 'sans-slug'})`);
                    });
                }
            } else {
                console.log('❌ Aucune formation récupérée depuis Vercel');
                console.log('📊 Réponse:', JSON.stringify(data, null, 2));
            }
            
            return data;
        } else {
            console.log(`❌ API formations Vercel non accessible: Status ${response.status}`);
            return null;
        }
        
    } catch (error) {
        console.log(`❌ Erreur API formations Vercel: ${error.message}`);
        return null;
    }
}

async function testVercelFormationsPage() {
    console.log('\n📄 TEST 4: Page formations Vercel');
    console.log('--------------------------------');
    
    try {
        const response = await axios.get(`${VERCEL_URL}/formations`, {
            timeout: 15000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ Page formations accessible');
            
            // Analyser le contenu HTML pour voir si les formations sont présentes
            const html = response.data;
            const hasFormations = html.includes('Formation') && html.includes('RNCP');
            const hasLoadingState = html.includes('loading') || html.includes('Chargement');
            const hasErrorState = html.includes('erreur') || html.includes('Error');
            
            console.log(`📊 Contient des formations: ${hasFormations ? '✅' : '❌'}`);
            console.log(`📊 État de chargement: ${hasLoadingState ? '⏳' : '✅'}`);
            console.log(`📊 État d'erreur: ${hasErrorState ? '❌' : '✅'}`);
            
            // Chercher des indices dans le HTML
            if (html.includes('Formation en alternance')) {
                console.log('✅ Section alternance détectée');
            }
            if (html.includes('Professionnels en reconversion')) {
                console.log('✅ Section reconversion détectée');
            }
            
            return { hasFormations, hasLoadingState, hasErrorState };
        } else {
            console.log(`❌ Page formations non accessible: Status ${response.status}`);
            return null;
        }
        
    } catch (error) {
        console.log(`❌ Erreur page formations: ${error.message}`);
        return null;
    }
}

async function main() {
    console.log('🎯 OBJECTIF: Diagnostiquer pourquoi les formations ne s\'affichent pas sur Vercel\n');
    
    // Test 1: Connexion directe à Railway
    const railwayOk = await testDirectRailwayConnection();
    
    // Test 2: Variables d'environnement Vercel
    const vercelEnv = await testVercelEnvironment();
    
    // Test 3: API formations Vercel
    const vercelAPI = await testVercelFormationsAPI();
    
    // Test 4: Page formations Vercel
    const vercelPage = await testVercelFormationsPage();
    
    console.log('\n🎉 RÉSUMÉ DU DIAGNOSTIC');
    console.log('======================');
    console.log(`🔗 Railway accessible: ${railwayOk ? '✅' : '❌'}`);
    console.log(`🌐 Variables Vercel: ${vercelEnv ? '✅' : '❌'}`);
    console.log(`📡 API Vercel: ${vercelAPI ? '✅' : '❌'}`);
    console.log(`📄 Page Vercel: ${vercelPage ? '✅' : '❌'}`);
    
    console.log('\n🔍 DIAGNOSTIC');
    console.log('=============');
    
    if (!railwayOk) {
        console.log('❌ PROBLÈME: Railway Strapi non accessible');
        console.log('   → Vérifier que Railway est en ligne');
        console.log('   → Vérifier l\'URL Railway');
    } else if (!vercelAPI) {
        console.log('❌ PROBLÈME: Vercel ne peut pas récupérer les données');
        console.log('   → Variables d\'environnement manquantes sur Vercel');
        console.log('   → Problème de CORS ou de réseau');
    } else if (vercelAPI && !vercelPage?.hasFormations) {
        console.log('❌ PROBLÈME: Données récupérées mais pas affichées');
        console.log('   → Problème dans le composant React');
        console.log('   → Erreur de rendu côté client');
    } else {
        console.log('✅ TOUT SEMBLE FONCTIONNER');
        console.log('   → Le problème pourrait être temporaire');
    }
    
    console.log('\n⏭️  PROCHAINES ÉTAPES');
    console.log('====================');
    
    if (!railwayOk) {
        console.log('1. Vérifier le statut de Railway');
        console.log('2. Redémarrer le service Railway si nécessaire');
    } else if (!vercelEnv || !vercelAPI) {
        console.log('1. Configurer les variables d\'environnement sur Vercel');
        console.log('2. Redéployer l\'application Vercel');
    } else {
        console.log('1. Vérifier les logs Vercel');
        console.log('2. Tester le rendu côté client');
        console.log('3. Vérifier la console du navigateur');
    }
}

main().catch(console.error);