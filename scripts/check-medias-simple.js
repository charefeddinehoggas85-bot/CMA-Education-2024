#!/usr/bin/env node

/**
 * 🖼️ DIAGNOSTIC SIMPLE DES MÉDIAS
 */

const axios = require('axios');
const fs = require('fs');

console.log('🖼️ DIAGNOSTIC SIMPLE DES MÉDIAS');
console.log('==============================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

async function checkPublicFolder() {
    console.log('📁 ÉTAPE 1: Médias dans public/');
    console.log('------------------------------');
    
    const folders = ['public/images', 'public/uploads', 'public/assets'];
    let totalFiles = 0;
    
    for (const folder of folders) {
        if (fs.existsSync(folder)) {
            const files = fs.readdirSync(folder);
            console.log(`✅ ${folder}: ${files.length} fichiers`);
            totalFiles += files.length;
            
            // Afficher quelques exemples
            files.slice(0, 3).forEach(file => {
                console.log(`   - ${file}`);
            });
        } else {
            console.log(`❌ ${folder}: Non trouvé`);
        }
    }
    
    console.log(`📊 Total public/: ${totalFiles} fichiers\n`);
    return totalFiles;
}

async function checkRailwayMedias() {
    console.log('🚀 ÉTAPE 2: Médias dans Railway');
    console.log('------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/upload/files`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 10000
        });
        
        const files = response.data || [];
        console.log(`✅ Railway: ${files.length} médias`);
        
        // Afficher quelques exemples
        files.slice(0, 5).forEach(file => {
            console.log(`   - ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
        });
        
        console.log('');
        return files;
        
    } catch (error) {
        console.log(`❌ Erreur Railway: ${error.message}\n`);
        return [];
    }
}

async function checkCloneMedias() {
    console.log('📁 ÉTAPE 3: Médias dans Clone');
    console.log('----------------------------');
    
    try {
        const response = await axios.get('http://localhost:1337/api/upload/files', {
            timeout: 5000
        });
        
        const files = response.data || [];
        console.log(`✅ Clone: ${files.length} médias`);
        
        // Afficher quelques exemples
        files.slice(0, 5).forEach(file => {
            console.log(`   - ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
        });
        
        console.log('');
        return files;
        
    } catch (error) {
        console.log(`❌ Clone non accessible: ${error.message}`);
        console.log('💡 Démarrer: cd "D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi" && npm run develop\n');
        return [];
    }
}

async function main() {
    const publicFiles = await checkPublicFolder();
    const railwayFiles = await checkRailwayMedias();
    const cloneFiles = await checkCloneMedias();
    
    console.log('📊 RÉSUMÉ');
    console.log('=========');
    console.log(`📁 Public/: ${publicFiles} fichiers`);
    console.log(`🚀 Railway: ${railwayFiles.length} médias`);
    console.log(`📁 Clone: ${cloneFiles.length} médias`);
    
    if (railwayFiles.length < cloneFiles.length) {
        console.log(`\n❌ PROBLÈME: Railway manque ${cloneFiles.length - railwayFiles.length} médias`);
        console.log('🔧 SOLUTION: Upload des médias depuis le clone vers Railway');
    } else {
        console.log('\n✅ Médias synchronisés');
    }
}

main().catch(console.error);