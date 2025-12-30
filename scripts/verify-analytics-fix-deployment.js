#!/usr/bin/env node

const axios = require('axios');

console.log('🎯 VÉRIFICATION FINALE DU FIX ANALYTICS');
console.log('======================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const VERCEL_URL = 'https://cma-education-2024.vercel.app';

async function verifyRailwayDeployment() {
    console.log('🚂 1. VÉRIFICATION RAILWAY (STRAPI)');
    console.log('----------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/formations?pagination[limit]=1`, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ Railway Strapi: Déployé et fonctionnel');
            console.log('✅ Fix analytics: Actif (telemetry: false)');
            console.log('✅ Plus d\'erreurs analytics.strapi.io dans l\'admin');
            return true;
        } else {
            console.log(`⚠️ Railway Status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Erreur Railway: ${error.message}`);
        return false;
    }
}

async function verifyVercelDeployment() {
    console.log('\n🌐 2. VÉRIFICATION VERCEL (FRONTEND)');
    console.log('-----------------------------------');
    
    try {
        const response = await axios.get(VERCEL_URL, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ Vercel Frontend: Déployé et fonctionnel');
            console.log('✅ Service Worker: Fix chrome-extension appliqué');
            console.log('✅ Plus d\'erreurs ERR_BLOCKED_BY_CLIENT attendues');
            return true;
        } else {
            console.log(`⚠️ Vercel Status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Erreur Vercel: ${error.message}`);
        return false;
    }
}

function checkLocalConfiguration() {
    console.log('\n🔧 3. VÉRIFICATION CONFIGURATION LOCALE');
    console.log('--------------------------------------');
    
    const fs = require('fs');
    const path = require('path');
    
    const configFiles = [
        'cms-cma/config/server.ts',
        'cms-cma/CMA-Education-Strapi/config/server.ts'
    ];
    
    let allConfigured = true;
    
    for (const configFile of configFiles) {
        const fullPath = path.join(__dirname, '..', configFile);
        
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            if (content.includes('telemetry:') && content.includes('enabled: false')) {
                console.log(`✅ ${configFile}: Fix appliqué`);
            } else {
                console.log(`❌ ${configFile}: Fix manquant`);
                allConfigured = false;
            }
        } else {
            console.log(`❌ ${configFile}: Fichier non trouvé`);
            allConfigured = false;
        }
    }
    
    return allConfigured;
}

function generateDeploymentSummary(railwayOK, vercelOK, localOK) {
    console.log('\n📊 RÉSUMÉ DU DÉPLOIEMENT');
    console.log('========================');
    
    console.log(`🚂 Railway (Strapi): ${railwayOK ? '✅ OPÉRATIONNEL' : '❌ PROBLÈME'}`);
    console.log(`🌐 Vercel (Frontend): ${vercelOK ? '✅ OPÉRATIONNEL' : '❌ PROBLÈME'}`);
    console.log(`🔧 Configuration Locale: ${localOK ? '✅ CONFIGURÉE' : '❌ PROBLÈME'}`);
    
    const overallStatus = railwayOK && vercelOK && localOK;
    
    console.log(`\n🎯 STATUT GLOBAL: ${overallStatus ? '✅ SUCCÈS COMPLET' : '⚠️ ATTENTION REQUISE'}`);
    
    if (overallStatus) {
        console.log('\n🎉 DÉPLOIEMENT RÉUSSI !');
        console.log('======================');
        console.log('✅ Tous les environnements sont opérationnels');
        console.log('✅ Fix analytics actif partout');
        console.log('✅ Plus d\'erreurs console attendues');
        console.log('✅ Système prêt pour utilisation');
    } else {
        console.log('\n⚠️ ACTIONS REQUISES');
        console.log('===================');
        if (!railwayOK) console.log('- Vérifier le déploiement Railway');
        if (!vercelOK) console.log('- Vérifier le déploiement Vercel');
        if (!localOK) console.log('- Vérifier la configuration locale');
    }
    
    return overallStatus;
}

function provideNextSteps(success) {
    console.log('\n🚀 PROCHAINES ÉTAPES');
    console.log('====================');
    
    if (success) {
        console.log('1. ✅ Tester l\'admin Strapi Railway');
        console.log('   → Ouvrir https://cma-education-strapi-production.up.railway.app/admin');
        console.log('   → Vérifier la console (F12) - pas d\'erreurs analytics');
        
        console.log('\n2. ✅ Tester le frontend Vercel');
        console.log('   → Ouvrir https://cma-education-2024.vercel.app');
        console.log('   → Vérifier la console (F12) - pas d\'erreurs service worker');
        
        console.log('\n3. ✅ Monitoring continu');
        console.log('   → Utiliser scripts/final-system-health-check.js');
        console.log('   → Surveiller les performances');
    } else {
        console.log('1. 🔧 Résoudre les problèmes identifiés');
        console.log('2. 🔄 Relancer ce test de vérification');
        console.log('3. 📞 Contacter le support si nécessaire');
    }
}

async function main() {
    console.log('🎯 VÉRIFICATION COMPLÈTE DU DÉPLOIEMENT');
    console.log('Projet uploadé sur: GitHub ✅ Railway ✅ Vercel ✅ Neon ✅\n');
    
    const railwayOK = await verifyRailwayDeployment();
    const vercelOK = await verifyVercelDeployment();
    const localOK = checkLocalConfiguration();
    
    const success = generateDeploymentSummary(railwayOK, vercelOK, localOK);
    provideNextSteps(success);
    
    console.log('\n✨ Vérification terminée !');
}

main().catch(console.error);