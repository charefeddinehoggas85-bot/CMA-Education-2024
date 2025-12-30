#!/usr/bin/env node

/**
 * 🔍 ANALYSE AFFICHAGE MÉDIAS RAILWAY
 * 
 * Analyse pourquoi vous ne voyez que 20 médias au lieu de 81
 */

const axios = require('axios');

console.log('🔍 ANALYSE AFFICHAGE MÉDIAS RAILWAY');
console.log('==================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

async function analyzeMediaPagination() {
    console.log('📄 ÉTAPE 1: Analyse pagination des médias');
    console.log('----------------------------------------');
    
    try {
        // Test avec différentes tailles de page
        const pageSizes = [10, 20, 25, 50, 100];
        
        for (const pageSize of pageSizes) {
            const response = await axios.get(`${RAILWAY_URL}/api/upload/files?pagination[pageSize]=${pageSize}`, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                },
                timeout: 10000
            });
            
            const files = response.data || [];
            console.log(`📋 Page size ${pageSize}: ${files.length} médias retournés`);
        }
        
        // Test sans pagination
        const allResponse = await axios.get(`${RAILWAY_URL}/api/upload/files`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 10000
        });
        
        const allFiles = allResponse.data || [];
        console.log(`📋 Sans pagination: ${allFiles.length} médias total`);
        
        return allFiles;
        
    } catch (error) {
        console.log(`❌ Erreur analyse: ${error.message}`);
        return [];
    }
}

async function analyzeMediaTypes(allFiles) {
    console.log('\n📊 ÉTAPE 2: Analyse types de médias');
    console.log('----------------------------------');
    
    const typeStats = {};
    const sizeStats = { small: 0, medium: 0, large: 0 };
    
    allFiles.forEach(file => {
        // Type de fichier
        const ext = file.ext || 'unknown';
        typeStats[ext] = (typeStats[ext] || 0) + 1;
        
        // Taille de fichier
        const sizeKB = file.size / 1024;
        if (sizeKB < 100) sizeStats.small++;
        else if (sizeKB < 1000) sizeStats.medium++;
        else sizeStats.large++;
    });
    
    console.log('📋 Types de fichiers:');
    Object.entries(typeStats).forEach(([type, count]) => {
        console.log(`   ${type}: ${count} fichiers`);
    });
    
    console.log('\n📋 Tailles de fichiers:');
    console.log(`   Petits (<100KB): ${sizeStats.small}`);
    console.log(`   Moyens (100KB-1MB): ${sizeStats.medium}`);
    console.log(`   Grands (>1MB): ${sizeStats.large}`);
}

async function testMediaAccess(allFiles) {
    console.log('\n🔗 ÉTAPE 3: Test accès aux médias');
    console.log('--------------------------------');
    
    const sampleFiles = allFiles.slice(0, 5);
    
    for (const file of sampleFiles) {
        try {
            const mediaUrl = `${RAILWAY_URL}${file.url}`;
            const response = await axios.head(mediaUrl, {
                timeout: 5000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                console.log(`✅ ${file.name}: Accessible`);
            } else {
                console.log(`❌ ${file.name}: Status ${response.status}`);
            }
            
        } catch (error) {
            console.log(`❌ ${file.name}: ${error.message}`);
        }
    }
}

async function checkAdminInterface() {
    console.log('\n🖥️  ÉTAPE 4: Vérification interface admin');
    console.log('----------------------------------------');
    
    try {
        // Test accès à l'interface admin
        const response = await axios.get(`${RAILWAY_URL}/admin`, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ Interface admin accessible');
            
            // Vérifier si c'est un problème de pagination par défaut
            console.log('\n💡 EXPLICATION POSSIBLE:');
            console.log('L\'interface Railway Admin affiche par défaut 20 médias par page.');
            console.log('Pour voir tous les médias:');
            console.log('1. Aller dans Media Library');
            console.log('2. Regarder en bas de page pour la pagination');
            console.log('3. Changer le nombre d\'éléments par page');
            console.log('4. Ou naviguer entre les pages');
            
        } else {
            console.log(`⚠️  Interface admin: Status ${response.status}`);
        }
        
    } catch (error) {
        console.log(`❌ Erreur interface admin: ${error.message}`);
    }
}

async function generateMediaReport(allFiles) {
    console.log('\n📋 ÉTAPE 5: Rapport détaillé des médias');
    console.log('--------------------------------------');
    
    console.log(`📊 Total médias: ${allFiles.length}`);
    
    // Médias récents
    const recentFiles = allFiles
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);
    
    console.log('\n📅 10 médias les plus récents:');
    recentFiles.forEach((file, index) => {
        const date = new Date(file.createdAt).toLocaleDateString();
        console.log(`   ${index + 1}. ${file.name} (${date})`);
    });
    
    // Médias les plus volumineux
    const largestFiles = allFiles
        .sort((a, b) => b.size - a.size)
        .slice(0, 5);
    
    console.log('\n📦 5 médias les plus volumineux:');
    largestFiles.forEach((file, index) => {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        console.log(`   ${index + 1}. ${file.name} (${sizeMB} MB)`);
    });
}

async function main() {
    console.log('🎯 OBJECTIF: Comprendre pourquoi vous ne voyez que 20 médias\n');
    
    const allFiles = await analyzeMediaPagination();
    
    if (allFiles.length === 0) {
        console.log('\n❌ ARRÊT: Impossible d\'accéder aux médias Railway');
        return;
    }
    
    await analyzeMediaTypes(allFiles);
    await testMediaAccess(allFiles);
    await checkAdminInterface();
    await generateMediaReport(allFiles);
    
    console.log('\n🎯 CONCLUSION');
    console.log('=============');
    
    if (allFiles.length === 81) {
        console.log('✅ Tous les 81 médias sont bien présents dans Railway');
        console.log('📄 Le problème est probablement la pagination de l\'interface admin');
        console.log('');
        console.log('🔧 SOLUTION:');
        console.log('1. Aller à: https://cma-education-strapi-production.up.railway.app/admin');
        console.log('2. Menu: Media Library');
        console.log('3. En bas de page: Changer "20 per page" vers "100 per page"');
        console.log('4. Ou naviguer entre les pages avec les flèches');
    } else {
        console.log(`⚠️  Problème détecté: ${allFiles.length} médias au lieu de 81 attendus`);
    }
}

main().catch(console.error);