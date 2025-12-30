#!/usr/bin/env node

/**
 * 🔍 VÉRIFICATION CORRECTION VERCEL
 * 
 * Vérifie que les variables d'environnement sont correctement configurées
 * et que les formations s'affichent sur Vercel
 */

const axios = require('axios');

console.log('🔍 VÉRIFICATION CORRECTION VERCEL');
console.log('=================================\n');

const VERCEL_URL = 'https://cma-education-2024.vercel.app';

async function testEnvironmentVariables() {
    console.log('🌐 TEST 1: Variables d\'environnement');
    console.log('-----------------------------------');
    
    try {
        const response = await axios.get(`${VERCEL_URL}/api/test-env`, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            const env = response.data;
            console.log('✅ API test-env accessible');
            console.log(`📊 STRAPI_URL: ${env.NEXT_PUBLIC_STRAPI_URL}`);
            console.log(`📊 API_TOKEN: ${env.STRAPI_API_TOKEN}`);
            console.log(`📊 NODE_ENV: ${env.NODE_ENV}`);
            console.log(`📊 VERCEL_ENV: ${env.VERCEL_ENV}`);
            
            const isConfigured = env.NEXT_PUBLIC_STRAPI_URL && 
                               env.NEXT_PUBLIC_STRAPI_URL !== 'non défini' &&
                               env.NEXT_PUBLIC_STRAPI_URL.includes('railway.app');
            
            if (isConfigured) {
                console.log('✅ Variables correctement configurées');
                return true;
            } else {
                console.log('❌ Variables mal configurées');
                return false;
            }
        } else {
            console.log(`❌ API test-env non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur test variables: ${error.message}`);
        return false;
    }
}

async function testFormationsAPI() {
    console.log('\n📚 TEST 2: API formations');
    console.log('------------------------');
    
    try {
        const response = await axios.get(`${VERCEL_URL}/api/test-formations`, {
            timeout: 15000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            const data = response.data;
            console.log('✅ API formations accessible');
            console.log(`📊 Succès: ${data.success}`);
            console.log(`📊 Formations: ${data.count}`);
            console.log(`📊 URL Strapi: ${data.strapiUrl}`);
            
            if (data.success && data.count > 0) {
                console.log('✅ Formations récupérées avec succès');
                
                // Afficher quelques formations
                if (data.formations && data.formations.length > 0) {
                    console.log('\n📋 Formations disponibles:');
                    data.formations.slice(0, 3).forEach((formation, i) => {
                        console.log(`   ${i + 1}. ${formation.title || 'Sans titre'}`);
                    });
                }
                
                return true;
            } else {
                console.log('❌ Aucune formation récupérée');
                if (data.error) {
                    console.log(`📝 Erreur: ${data.error}`);
                }
                return false;
            }
        } else {
            console.log(`❌ API formations non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur API formations: ${error.message}`);
        return false;
    }
}

async function testFormationsPage() {
    console.log('\n📄 TEST 3: Page formations');
    console.log('-------------------------');
    
    try {
        const response = await axios.get(`${VERCEL_URL}/formations`, {
            timeout: 15000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ Page formations accessible');
            
            const html = response.data;
            
            // Chercher des indices de formations affichées
            const hasFormationCards = html.includes('Formation') && html.includes('RNCP');
            const hasAlternanceSection = html.includes('Formation en alternance');
            const hasReconversionSection = html.includes('Professionnels en reconversion');
            const hasFormationTitles = html.includes('Chargé') || html.includes('Conducteur');
            
            console.log(`📊 Cartes formations: ${hasFormationCards ? '✅' : '❌'}`);
            console.log(`📊 Section alternance: ${hasAlternanceSection ? '✅' : '❌'}`);
            console.log(`📊 Section reconversion: ${hasReconversionSection ? '✅' : '❌'}`);
            console.log(`📊 Titres formations: ${hasFormationTitles ? '✅' : '❌'}`);
            
            const isWorking = hasFormationCards && hasAlternanceSection && hasReconversionSection;
            
            if (isWorking) {
                console.log('✅ Page formations fonctionne correctement');
                return true;
            } else {
                console.log('⚠️  Page formations partiellement fonctionnelle');
                return false;
            }
        } else {
            console.log(`❌ Page formations non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur page formations: ${error.message}`);
        return false;
    }
}

async function testSpecificFormationPage() {
    console.log('\n🎯 TEST 4: Page formation spécifique');
    console.log('-----------------------------------');
    
    try {
        const response = await axios.get(`${VERCEL_URL}/formations/charge-affaires-batiment`, {
            timeout: 15000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ Page formation spécifique accessible');
            
            const html = response.data;
            const hasFormationContent = html.includes('Chargé') && html.includes('Affaires');
            const hasRNCP = html.includes('RNCP');
            const hasObjectifs = html.includes('Objectifs') || html.includes('objectifs');
            
            console.log(`📊 Contenu formation: ${hasFormationContent ? '✅' : '❌'}`);
            console.log(`📊 Code RNCP: ${hasRNCP ? '✅' : '❌'}`);
            console.log(`📊 Objectifs: ${hasObjectifs ? '✅' : '❌'}`);
            
            return hasFormationContent && hasRNCP;
        } else {
            console.log(`❌ Page formation non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur page formation: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('🎯 OBJECTIF: Vérifier que la correction Vercel fonctionne\n');
    
    const results = {
        env: await testEnvironmentVariables(),
        api: await testFormationsAPI(),
        page: await testFormationsPage(),
        specific: await testSpecificFormationPage()
    };
    
    console.log('\n🎉 RÉSUMÉ DE LA VÉRIFICATION');
    console.log('============================');
    console.log(`🌐 Variables d'environnement: ${results.env ? '✅' : '❌'}`);
    console.log(`📡 API formations: ${results.api ? '✅' : '❌'}`);
    console.log(`📄 Page formations: ${results.page ? '✅' : '❌'}`);
    console.log(`🎯 Page spécifique: ${results.specific ? '✅' : '❌'}`);
    
    const allWorking = Object.values(results).every(Boolean);
    
    console.log('\n🏆 STATUT FINAL');
    console.log('===============');
    
    if (allWorking) {
        console.log('🎊 CORRECTION RÉUSSIE !');
        console.log('✅ Toutes les fonctionnalités marchent');
        console.log('✅ Les formations s\'affichent correctement');
        console.log('✅ Vercel est connecté à Railway');
        console.log('');
        console.log('🌐 Site fonctionnel: https://cma-education-2024.vercel.app/formations');
    } else {
        console.log('⚠️  CORRECTION PARTIELLE');
        console.log('');
        console.log('🔧 ACTIONS REQUISES:');
        
        if (!results.env) {
            console.log('❌ Configurer les variables d\'environnement sur Vercel');
            console.log('   → Dashboard Vercel → Settings → Environment Variables');
        }
        
        if (!results.api) {
            console.log('❌ Problème de connexion API');
            console.log('   → Vérifier les logs Vercel');
            console.log('   → Tester la connexion Railway');
        }
        
        if (!results.page) {
            console.log('❌ Problème d\'affichage des formations');
            console.log('   → Vérifier le composant React');
            console.log('   → Redéployer l\'application');
        }
        
        console.log('');
        console.log('📖 Guide complet: VERCEL_ENVIRONMENT_VARIABLES_FIX.md');
    }
}

main().catch(console.error);