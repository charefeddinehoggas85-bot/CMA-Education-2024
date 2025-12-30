#!/usr/bin/env node

/**
 * 🔍 DIAGNOSTIC COMPLET MIGRATION RAILWAY
 * 
 * Vérifie l'état complet de la migration Railway et identifie les actions nécessaires
 */

const axios = require('axios');

console.log('🔍 DIAGNOSTIC COMPLET MIGRATION RAILWAY');
console.log('======================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const CLONE_URL = 'http://localhost:1337';

// Content Types essentiels à vérifier
const essentialContentTypes = [
    { name: 'formations', description: 'Formations' },
    { name: 'formation-categories', description: 'Catégories formations' },
    { name: 'formateurs', description: 'Formateurs' },
    { name: 'partners', description: 'Partenaires' },
    { name: 'testimonials', description: 'Témoignages' },
    { name: 'articles-blog', description: 'Articles blog' },
    { name: 'categories-blog', description: 'Catégories blog' },
    { name: 'statistiques-site', description: 'Statistiques' },
    { name: 'site-setting', description: 'Configuration site', singleType: true },
    { name: 'page-vae', description: 'Page VAE', singleType: true },
    { name: 'page-entreprise', description: 'Page Entreprises', singleType: true },
    { name: 'page-partenaires', description: 'Page Partenaires', singleType: true }
];

async function checkRailwayStatus() {
    console.log('🚀 ÉTAPE 1: Statut Railway Strapi');
    console.log('--------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/admin`, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ Railway Strapi accessible');
            console.log(`🔗 Admin: ${RAILWAY_URL}/admin`);
            return true;
        } else {
            console.log(`❌ Railway Strapi non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Railway Strapi non accessible: ${error.message}`);
        return false;
    }
}

async function checkCloneStatus() {
    console.log('\n📁 ÉTAPE 2: Statut Clone Local');
    console.log('------------------------------');
    
    try {
        const response = await axios.get(`${CLONE_URL}/admin`, {
            timeout: 5000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ Clone Strapi accessible');
            console.log(`🔗 Admin: ${CLONE_URL}/admin`);
            return true;
        } else {
            console.log(`❌ Clone Strapi non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Clone Strapi non accessible: ${error.message}`);
        console.log('💡 Démarrer le clone: cd "D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi" && npm run develop');
        return false;
    }
}

async function compareContentTypes() {
    console.log('\n📊 ÉTAPE 3: Comparaison Content Types');
    console.log('------------------------------------');
    
    const results = {
        railway: {},
        clone: {},
        missing: [],
        present: []
    };
    
    console.log('🔍 Vérification Railway:');
    for (const ct of essentialContentTypes) {
        try {
            const response = await axios.get(`${RAILWAY_URL}/api/${ct.name}`, {
                timeout: 5000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                const count = ct.singleType ? 1 : (response.data?.data?.length || 0);
                results.railway[ct.name] = count;
                results.present.push(ct.name);
                console.log(`   ✅ ${ct.description}: ${count} élément(s)`);
            } else if (response.status === 404) {
                results.railway[ct.name] = 'MANQUANT';
                results.missing.push(ct.name);
                console.log(`   ❌ ${ct.description}: Content Type manquant`);
            } else {
                results.railway[ct.name] = `ERREUR_${response.status}`;
                console.log(`   ⚠️  ${ct.description}: Status ${response.status}`);
            }
            
        } catch (error) {
            results.railway[ct.name] = 'ERREUR_CONNEXION';
            console.log(`   ❌ ${ct.description}: ${error.message}`);
        }
    }
    
    console.log('\n🔍 Vérification Clone (si accessible):');
    for (const ct of essentialContentTypes) {
        try {
            const response = await axios.get(`${CLONE_URL}/api/${ct.name}`, {
                timeout: 3000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                const count = ct.singleType ? 1 : (response.data?.data?.length || 0);
                results.clone[ct.name] = count;
                console.log(`   ✅ ${ct.description}: ${count} élément(s)`);
            } else {
                results.clone[ct.name] = 'ERREUR';
                console.log(`   ⚠️  ${ct.description}: Status ${response.status}`);
            }
            
        } catch (error) {
            results.clone[ct.name] = 'NON_ACCESSIBLE';
            console.log(`   ⚠️  ${ct.description}: Clone non accessible`);
        }
    }
    
    return results;
}

async function checkFrontendErrors() {
    console.log('\n🌐 ÉTAPE 4: Test APIs Frontend');
    console.log('-----------------------------');
    
    const frontendAPIs = [
        'formations?populate=*&sort=ordre:asc',
        'formation-categories?populate=*&sort=ordre:asc',
        'formateurs?populate=*&sort=ordre:asc',
        'partners?populate=*&sort=ordre:asc',
        'testimonials?populate=*&sort=ordre:asc',
        'site-setting?populate=*',
        'statistiques-site?sort=ordre:asc&populate=*'
    ];
    
    const errors = [];
    const working = [];
    
    for (const api of frontendAPIs) {
        try {
            const response = await axios.get(`${RAILWAY_URL}/api/${api}`, {
                timeout: 8000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                working.push(api.split('?')[0]);
                console.log(`✅ ${api.split('?')[0]}: OK`);
            } else if (response.status === 404) {
                errors.push({ api: api.split('?')[0], error: 'Content Type manquant' });
                console.log(`❌ ${api.split('?')[0]}: 404 - Content Type manquant`);
            } else {
                errors.push({ api: api.split('?')[0], error: `Status ${response.status}` });
                console.log(`⚠️  ${api.split('?')[0]}: Status ${response.status}`);
            }
            
        } catch (error) {
            errors.push({ api: api.split('?')[0], error: error.message });
            console.log(`❌ ${api.split('?')[0]}: ${error.message}`);
        }
    }
    
    return { errors, working };
}

async function generateActionPlan(comparisonResults, frontendResults) {
    console.log('\n📋 ÉTAPE 5: Plan d\'action');
    console.log('-------------------------');
    
    const actions = [];
    
    // Content Types manquants
    if (comparisonResults.missing.length > 0) {
        actions.push({
            priority: 'URGENT',
            action: 'Créer Content Types manquants',
            details: comparisonResults.missing,
            script: 'Création manuelle dans Railway Admin'
        });
    }
    
    // Données manquantes
    const emptyContentTypes = Object.entries(comparisonResults.railway)
        .filter(([name, count]) => count === 0 && !comparisonResults.missing.includes(name))
        .map(([name]) => name);
    
    if (emptyContentTypes.length > 0) {
        actions.push({
            priority: 'IMPORTANT',
            action: 'Importer données depuis le clone',
            details: emptyContentTypes,
            script: 'node scripts/import-complete-data-from-clone.js'
        });
    }
    
    // Erreurs frontend
    if (frontendResults.errors.length > 0) {
        actions.push({
            priority: 'CRITIQUE',
            action: 'Résoudre erreurs frontend',
            details: frontendResults.errors.map(e => `${e.api}: ${e.error}`),
            script: 'Voir actions ci-dessus'
        });
    }
    
    // Affichage du plan
    if (actions.length === 0) {
        console.log('🎉 Aucune action nécessaire - Migration complète !');
    } else {
        actions.forEach((action, index) => {
            console.log(`\n${index + 1}. ${action.action} [${action.priority}]`);
            console.log(`   📋 Détails: ${action.details.join(', ')}`);
            console.log(`   🔧 Script: ${action.script}`);
        });
    }
    
    return actions;
}

async function main() {
    console.log('🎯 OBJECTIF: Diagnostic complet de la migration Railway\n');
    
    const railwayOk = await checkRailwayStatus();
    const cloneOk = await checkCloneStatus();
    
    if (!railwayOk) {
        console.log('\n❌ ARRÊT: Railway Strapi non accessible');
        return;
    }
    
    const comparisonResults = await compareContentTypes();
    const frontendResults = await checkFrontendErrors();
    const actions = await generateActionPlan(comparisonResults, frontendResults);
    
    console.log('\n📊 RÉSUMÉ DIAGNOSTIC');
    console.log('===================');
    console.log(`✅ Content Types présents: ${comparisonResults.present.length}`);
    console.log(`❌ Content Types manquants: ${comparisonResults.missing.length}`);
    console.log(`✅ APIs frontend OK: ${frontendResults.working.length}`);
    console.log(`❌ APIs frontend erreur: ${frontendResults.errors.length}`);
    
    if (actions.length > 0) {
        console.log(`\n⚡ ${actions.length} action(s) nécessaire(s)`);
        console.log('Voir le plan d\'action ci-dessus');
    } else {
        console.log('\n🎊 MIGRATION RAILWAY COMPLÈTE !');
        console.log('Toutes les APIs fonctionnent correctement');
    }
    
    console.log('\n🔗 LIENS UTILES:');
    console.log(`- Railway Admin: ${RAILWAY_URL}/admin`);
    console.log(`- Test API: ${RAILWAY_URL}/api/formations`);
    console.log('- Guide: GUIDE_EXPORT_IMPORT_JSON_COMPLET.md');
}

main().catch(console.error);