#!/usr/bin/env node

/**
 * 🔍 VÉRIFICATION STATUT RAILWAY
 * 
 * Ce script vérifie l'état de votre Strapi sur Railway
 */

const https = require('https');
const http = require('http');

console.log('🔍 VÉRIFICATION RAILWAY STRAPI');
console.log('==============================\n');

// URLs Railway communes à tester
const possibleUrls = [
    'https://cms-cma-production.up.railway.app',
    'https://strapi-cma-production.up.railway.app',
    'https://cma-strapi-production.up.railway.app',
    'https://cma-education-strapi-production.up.railway.app'
];

console.log('🔍 Test des URLs Railway possibles...\n');

async function testUrl(url) {
    return new Promise((resolve) => {
        const protocol = url.startsWith('https') ? https : http;
        
        const req = protocol.get(url, (res) => {
            console.log(`✅ ${url} - Status: ${res.statusCode}`);
            
            if (res.statusCode === 200) {
                console.log(`🎉 TROUVÉ ! Votre Railway URL: ${url}`);
                console.log(`📋 Admin: ${url}/admin`);
                console.log(`🔗 API: ${url}/api`);
            }
            
            resolve({ url, status: res.statusCode, success: res.statusCode === 200 });
        });
        
        req.on('error', (error) => {
            console.log(`❌ ${url} - Erreur: ${error.message}`);
            resolve({ url, status: 'error', success: false });
        });
        
        req.setTimeout(5000, () => {
            console.log(`⏱️  ${url} - Timeout`);
            req.destroy();
            resolve({ url, status: 'timeout', success: false });
        });
    });
}

async function checkAllUrls() {
    console.log('🔍 Test automatique des URLs Railway...\n');
    
    for (const url of possibleUrls) {
        await testUrl(url);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause 1s
    }
    
    console.log('\n📋 INSTRUCTIONS:');
    console.log('----------------');
    console.log('1. Si une URL fonctionne ✅, utilisez-la');
    console.log('2. Sinon, allez sur Railway.app → votre projet → Settings');
    console.log('3. Copiez l\'URL dans "Domains"');
    console.log('4. Donnez-moi cette URL exacte');
    
    console.log('\n🔧 PROCHAINE ÉTAPE:');
    console.log('Une fois l\'URL confirmée, je créerai le script de migration');
    console.log('pour transférer tout votre contenu local vers Railway !');
}

checkAllUrls();