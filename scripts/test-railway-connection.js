#!/usr/bin/env node

/**
 * 🔍 TEST CONNEXION RAILWAY
 * 
 * Teste la connexion à votre Railway Strapi
 */

const https = require('https');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';

console.log('🔍 TEST CONNEXION RAILWAY');
console.log('=========================\n');

console.log(`🎯 URL Railway: ${RAILWAY_URL}`);

async function testConnection() {
    console.log('\n📡 Test 1: Connexion de base...');
    
    return new Promise((resolve) => {
        const req = https.get(RAILWAY_URL, (res) => {
            console.log(`✅ Status: ${res.statusCode}`);
            
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('✅ Railway Strapi accessible !');
                    console.log(`📄 Réponse: ${data.substring(0, 100)}...`);
                } else {
                    console.log(`⚠️  Status ${res.statusCode} - peut être normal`);
                }
                resolve(true);
            });
        });
        
        req.on('error', (error) => {
            console.log(`❌ Erreur: ${error.message}`);
            resolve(false);
        });
        
        req.setTimeout(10000, () => {
            console.log('⏱️  Timeout - Railway peut être lent');
            req.destroy();
            resolve(false);
        });
    });
}

async function testAdmin() {
    console.log('\n📡 Test 2: Admin panel...');
    
    return new Promise((resolve) => {
        const req = https.get(`${RAILWAY_URL}/admin`, (res) => {
            console.log(`✅ Admin Status: ${res.statusCode}`);
            
            if (res.statusCode === 200) {
                console.log('✅ Admin panel accessible !');
                console.log(`🔗 Accédez à: ${RAILWAY_URL}/admin`);
            }
            resolve(true);
        });
        
        req.on('error', (error) => {
            console.log(`❌ Admin erreur: ${error.message}`);
            resolve(false);
        });
        
        req.setTimeout(10000, () => {
            console.log('⏱️  Admin timeout');
            req.destroy();
            resolve(false);
        });
    });
}

async function testAPI() {
    console.log('\n📡 Test 3: API REST...');
    
    return new Promise((resolve) => {
        const req = https.get(`${RAILWAY_URL}/api/formations`, (res) => {
            console.log(`✅ API Status: ${res.statusCode}`);
            
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    console.log('✅ API REST fonctionnelle !');
                    console.log(`📊 Formations trouvées: ${json.data ? json.data.length : 0}`);
                    
                    if (json.data && json.data.length === 0) {
                        console.log('📋 Base de données vide - migration nécessaire');
                    }
                } catch (error) {
                    console.log('⚠️  Réponse API non-JSON:', data.substring(0, 100));
                }
                resolve(true);
            });
        });
        
        req.on('error', (error) => {
            console.log(`❌ API erreur: ${error.message}`);
            resolve(false);
        });
        
        req.setTimeout(10000, () => {
            console.log('⏱️  API timeout');
            req.destroy();
            resolve(false);
        });
    });
}

async function runTests() {
    await testConnection();
    await testAdmin();
    await testAPI();
    
    console.log('\n🎯 RÉSULTAT:');
    console.log('------------');
    console.log('Si tous les tests passent ✅, Railway est opérationnel');
    console.log('Prochaine étape: Migration automatique du contenu local');
    
    console.log('\n📋 ACTIONS SUIVANTES:');
    console.log('1. Accédez à l\'admin Railway pour créer un compte');
    console.log('2. Générez un API Token');
    console.log('3. Lancez la migration automatique');
}

runTests();