#!/usr/bin/env node

/**
 * 🔍 FORCE AFFICHAGE MÉDIAS RAILWAY
 * 
 * Identifie pourquoi l'interface Railway n'affiche que 20 médias
 */

const axios = require('axios');

console.log('🔍 FORCE AFFICHAGE MÉDIAS RAILWAY');
console.log('================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

async function testDifferentAPICalls() {
    console.log('🔍 ÉTAPE 1: Test différents appels API');
    console.log('------------------------------------');
    
    const testCalls = [
        { name: 'API Standard', url: '/api/upload/files' },
        { name: 'API avec pagination', url: '/api/upload/files?pagination[page]=1&pagination[pageSize]=100' },
        { name: 'API sans auth', url: '/api/upload/files', noAuth: true },
        { name: 'API Admin', url: '/admin/upload/files' },
        { name: 'API Content Manager', url: '/content-manager/collection-types/plugin::upload.file' }
    ];
    
    const results = {};
    
    for (const test of testCalls) {
        try {
            const headers = test.noAuth ? {} : {
                'Authorization': `Bearer ${API_TOKEN}`
            };
            
            const response = await axios.get(`${RAILWAY_URL}${test.url}`, {
                headers,
                timeout: 10000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                const data = response.data;
                const count = Array.isArray(data) ? data.length : 
                             data?.data ? (Array.isArray(data.data) ? data.data.length : 1) :
                             data?.results ? data.results.length : 0;
                
                results[test.name] = { status: 200, count, hasData: !!data };
                console.log(`✅ ${test.name}: ${count} médias (Status 200)`);
            } else {
                results[test.name] = { status: response.status, count: 0 };
                console.log(`❌ ${test.name}: Status ${response.status}`);
            }
            
        } catch (error) {
            results[test.name] = { error: error.message };
            console.log(`❌ ${test.name}: ${error.message}`);
        }
    }
    
    return results;
}

async function checkMediaPagination() {
    console.log('\n📄 ÉTAPE 2: Test pagination détaillée');
    console.log('-----------------------------------');
    
    try {
        // Test page par page
        let allMedias = [];
        let page = 1;
        let hasMore = true;
        
        while (hasMore && page <= 10) { // Limite à 10 pages pour éviter boucle infinie
            const response = await axios.get(`${RAILWAY_URL}/api/upload/files`, {
                params: {
                    'pagination[page]': page,
                    'pagination[pageSize]': 25
                },
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                },
                timeout: 10000
            });
            
            if (response.status === 200) {
                const pageData = response.data || [];
                console.log(`📋 Page ${page}: ${pageData.length} médias`);
                
                allMedias = allMedias.concat(pageData);
                
                if (pageData.length < 25) {
                    hasMore = false;
                }
                page++;
            } else {
                hasMore = false;
            }
        }
        
        console.log(`📊 Total via pagination: ${allMedias.length} médias`);
        return allMedias;
        
    } catch (error) {
        console.log(`❌ Erreur pagination: ${error.message}`);
        return [];
    }
}

async function checkAdminEndpoints() {
    console.log('\n🔧 ÉTAPE 3: Test endpoints admin');
    console.log('-------------------------------');
    
    const adminEndpoints = [
        '/admin/content-manager/collection-types/plugin::upload.file',
        '/admin/content-manager/collection-types/plugin::upload.file?page=1&pageSize=100',
        '/admin/upload/search',
        '/admin/users/me'
    ];
    
    for (const endpoint of adminEndpoints) {
        try {
            const response = await axios.get(`${RAILWAY_URL}${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000,
                validateStatus: () => true
            });
            
            console.log(`📋 ${endpoint}: Status ${response.status}`);
            
            if (response.status === 200 && response.data) {
                const data = response.data;
                if (data.results) {
                    console.log(`   📊 ${data.results.length} résultats`);
                } else if (Array.isArray(data)) {
                    console.log(`   📊 ${data.length} éléments`);
                } else if (data.data) {
                    console.log(`   📊 Données présentes`);
                }
            }
            
        } catch (error) {
            console.log(`❌ ${endpoint}: ${error.message}`);
        }
    }
}

async function analyzeMediaMetadata() {
    console.log('\n📊 ÉTAPE 4: Analyse métadonnées médias');
    console.log('------------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/upload/files`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 10000
        });
        
        const medias = response.data || [];
        console.log(`📋 Total médias API: ${medias.length}`);
        
        // Analyser les dates de création
        const dateGroups = {};
        medias.forEach(media => {
            const date = new Date(media.createdAt).toDateString();
            dateGroups[date] = (dateGroups[date] || 0) + 1;
        });
        
        console.log('\n📅 Médias par date de création:');
        Object.entries(dateGroups)
            .sort(([a], [b]) => new Date(b) - new Date(a))
            .slice(0, 5)
            .forEach(([date, count]) => {
                console.log(`   ${date}: ${count} médias`);
            });
        
        // Analyser les IDs
        const ids = medias.map(m => m.id).sort((a, b) => a - b);
        console.log(`\n🔢 IDs médias: ${ids[0]} à ${ids[ids.length - 1]}`);
        
        // Vérifier s'il y a des trous dans les IDs
        const missingIds = [];
        for (let i = ids[0]; i <= ids[ids.length - 1]; i++) {
            if (!ids.includes(i)) {
                missingIds.push(i);
            }
        }
        
        if (missingIds.length > 0) {
            console.log(`⚠️  IDs manquants: ${missingIds.slice(0, 10).join(', ')}${missingIds.length > 10 ? '...' : ''}`);
        }
        
        return medias;
        
    } catch (error) {
        console.log(`❌ Erreur analyse: ${error.message}`);
        return [];
    }
}

async function generateDetailedReport(medias) {
    console.log('\n📋 ÉTAPE 5: Rapport détaillé');
    console.log('---------------------------');
    
    console.log(`📊 RÉSUMÉ MÉDIAS:`);
    console.log(`   Total API: ${medias.length} médias`);
    console.log(`   Interface: 20 médias visibles`);
    console.log(`   Différence: ${medias.length - 20} médias cachés`);
    
    if (medias.length > 20) {
        console.log('\n🔍 MÉDIAS CACHÉS (exemples):');
        const hiddenMedias = medias.slice(20, 30);
        hiddenMedias.forEach((media, index) => {
            console.log(`   ${index + 21}. ${media.name} (ID: ${media.id})`);
        });
    }
    
    console.log('\n💡 CAUSES POSSIBLES:');
    console.log('1. Pagination par défaut de l\'interface (20 par page)');
    console.log('2. Filtre ou tri appliqué dans l\'interface');
    console.log('3. Permissions d\'affichage limitées');
    console.log('4. Cache de l\'interface non rafraîchi');
    console.log('5. Problème de synchronisation base de données');
}

async function provideSolutions() {
    console.log('\n🔧 SOLUTIONS À ESSAYER:');
    console.log('======================');
    
    console.log('\n1. PAGINATION INTERFACE:');
    console.log('   - Aller dans Railway Admin → Media Library');
    console.log('   - En bas: changer "20 per page" → "100 per page"');
    console.log('   - Ou utiliser les flèches de navigation');
    
    console.log('\n2. RAFRAÎCHIR CACHE:');
    console.log('   - F5 ou Ctrl+F5 dans Railway Admin');
    console.log('   - Vider cache navigateur');
    console.log('   - Essayer mode incognito');
    
    console.log('\n3. VÉRIFIER FILTRES:');
    console.log('   - Dans Media Library, vérifier s\'il y a des filtres actifs');
    console.log('   - Réinitialiser tous les filtres');
    
    console.log('\n4. ACCÈS DIRECT:');
    console.log(`   - URL directe: ${RAILWAY_URL}/admin/content-manager/collection-types/plugin::upload.file`);
    
    console.log('\n5. SI PROBLÈME PERSISTE:');
    console.log('   - Les 81 médias sont bien présents dans l\'API');
    console.log('   - Le problème est uniquement d\'affichage interface');
    console.log('   - Fonctionnalité non impactée');
}

async function main() {
    console.log('🎯 OBJECTIF: Résoudre le problème d\'affichage des médias\n');
    
    const apiResults = await testDifferentAPICalls();
    const paginatedMedias = await checkMediaPagination();
    await checkAdminEndpoints();
    const allMedias = await analyzeMediaMetadata();
    
    await generateDetailedReport(allMedias);
    await provideSolutions();
    
    console.log('\n🎯 CONCLUSION:');
    console.log('==============');
    
    if (allMedias.length === 81) {
        console.log('✅ Tous les médias sont présents dans Railway');
        console.log('📱 Le problème est uniquement l\'affichage interface');
        console.log('🔧 Essayez les solutions ci-dessus');
    } else {
        console.log(`⚠️  Problème détecté: ${allMedias.length} médias au lieu de 81`);
    }
}

main().catch(console.error);