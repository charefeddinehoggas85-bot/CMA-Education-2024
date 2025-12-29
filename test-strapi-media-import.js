#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios');

console.log('🧪 TEST COMPLET: STRAPI MEDIA IMPORT - CLONE');
console.log('============================================\n');

const STRAPI_URL = 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;
const ADMIN_URL = `${STRAPI_URL}/admin`;

function checkStrapiStructure() {
    console.log('📁 1. VÉRIFICATION DE LA STRUCTURE STRAPI');
    console.log('=========================================');
    
    const requiredPaths = [
        'config/database.ts',
        'config/server.ts',
        'config/middlewares.ts',
        'src/api',
        '.env',
        'package.json'
    ];
    
    let structureScore = 0;
    
    requiredPaths.forEach(requiredPath => {
        if (fs.existsSync(requiredPath)) {
            console.log(`✅ ${requiredPath}`);
            structureScore++;
        } else {
            console.log(`❌ ${requiredPath}`);
        }
    });
    
    console.log(`\n📊 Structure: ${structureScore}/${requiredPaths.length} (${Math.round(structureScore/requiredPaths.length*100)}%)`);
    
    return structureScore === requiredPaths.length;
}

function checkStrapiDependencies() {
    console.log('\n📦 2. VÉRIFICATION DES DÉPENDANCES STRAPI');
    console.log('========================================');
    
    if (!fs.existsSync('package.json')) {
        console.log('❌ package.json non trouvé');
        return false;
    }
    
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = packageJson.dependencies || {};
    
    const requiredDeps = [
        '@strapi/strapi',
        '@strapi/plugin-upload',
        '@strapi/plugin-users-permissions',
        'sharp'
    ];
    
    let depsScore = 0;
    
    requiredDeps.forEach(dep => {
        if (dependencies[dep]) {
            console.log(`✅ ${dep}: ${dependencies[dep]}`);
            depsScore++;
        } else {
            console.log(`❌ ${dep}: manquant`);
        }
    });
    
    console.log(`\n📊 Dépendances: ${depsScore}/${requiredDeps.length} (${Math.round(depsScore/requiredDeps.length*100)}%)`);
    
    return depsScore === requiredDeps.length;
}

function checkEnvironmentConfig() {
    console.log('\n🔐 3. VÉRIFICATION DE LA CONFIGURATION ENVIRONNEMENT');
    console.log('===================================================');
    
    if (!fs.existsSync('.env')) {
        console.log('❌ Fichier .env non trouvé');
        return false;
    }
    
    const envContent = fs.readFileSync('.env', 'utf8');
    const requiredVars = [
        'HOST',
        'PORT',
        'APP_KEYS',
        'API_TOKEN_SALT',
        'ADMIN_JWT_SECRET',
        'JWT_SECRET',
        'DATABASE_CLIENT'
    ];
    
    let envScore = 0;
    
    requiredVars.forEach(varName => {
        const regex = new RegExp(`${varName}=(.+)`, 'i');
        const match = envContent.match(regex);
        
        if (match && match[1] && match[1] !== 'your-value-here') {
            console.log(`✅ ${varName}: configuré`);
            envScore++;
        } else {
            console.log(`❌ ${varName}: manquant ou non configuré`);
        }
    });
    
    console.log(`\n📊 Variables d'environnement: ${envScore}/${requiredVars.length} (${Math.round(envScore/requiredVars.length*100)}%)`);
    
    return envScore >= requiredVars.length * 0.8; // 80% minimum
}

async function checkStrapiServer() {
    console.log('\n🌐 4. TEST DE CONNEXION AU SERVEUR STRAPI');
    console.log('=========================================');
    
    try {
        console.log('⏳ Test de connexion à Strapi...');
        const response = await axios.get(`${STRAPI_URL}/_health`, { timeout: 5000 });
        
        if (response.status === 200) {
            console.log('✅ Serveur Strapi accessible');
            console.log(`📊 Status: ${response.status}`);
            return true;
        } else {
            console.log(`⚠️ Serveur répond mais status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log('❌ Serveur Strapi non accessible');
        console.log(`📝 Erreur: ${error.message}`);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Suggestion: Démarrer Strapi avec "npm run strapi:develop"');
        }
        
        return false;
    }
}

async function checkUploadPlugin() {
    console.log('\n📤 5. TEST DU PLUGIN UPLOAD');
    console.log('===========================');
    
    try {
        // Tester l'endpoint upload
        const response = await axios.get(`${API_URL}/upload/files`, { 
            timeout: 5000,
            validateStatus: function (status) {
                return status < 500; // Accepter les erreurs 4xx (pas d'auth)
            }
        });
        
        if (response.status === 200 || response.status === 401 || response.status === 403) {
            console.log('✅ Plugin Upload accessible');
            console.log(`📊 Status: ${response.status} (${response.status === 401 ? 'Auth requise' : 'OK'})`);
            return true;
        } else {
            console.log(`⚠️ Plugin Upload répond mais status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log('❌ Plugin Upload non accessible');
        console.log(`📝 Erreur: ${error.message}`);
        return false;
    }
}

async function checkMediaLibraryAccess() {
    console.log('\n📚 6. TEST D\'ACCÈS À LA MEDIA LIBRARY');
    console.log('=====================================');
    
    try {
        // Tester l'accès à l'admin
        const response = await axios.get(ADMIN_URL, { 
            timeout: 5000,
            validateStatus: function (status) {
                return status < 500;
            }
        });
        
        if (response.status === 200) {
            console.log('✅ Interface admin accessible');
            console.log('📱 URL Admin: http://localhost:1337/admin');
            console.log('💡 Vous pouvez créer un compte admin et tester l\'upload');
            return true;
        } else {
            console.log(`⚠️ Interface admin status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log('❌ Interface admin non accessible');
        console.log(`📝 Erreur: ${error.message}`);
        return false;
    }
}

function checkContentTypes() {
    console.log('\n🏗️7. VÉRIFICATION DES CONTENT TYPES');
    console.log('===================================');
    
    const apiDir = 'src/api';
    if (!fs.existsSync(apiDir)) {
        console.log('❌ Dossier src/api non trouvé');
        return false;
    }
    
    const contentTypes = fs.readdirSync(apiDir);
    console.log(`📊 Content Types trouvés: ${contentTypes.length}`);
    
    const importantTypes = ['formation', 'formateur', 'testimonial', 'site-setting'];
    let foundTypes = 0;
    
    importantTypes.forEach(type => {
        if (contentTypes.includes(type)) {
            console.log(`✅ ${type}`);
            foundTypes++;
        } else {
            console.log(`❌ ${type}`);
        }
    });
    
    console.log(`\n📊 Content Types critiques: ${foundTypes}/${importantTypes.length}`);
    
    return foundTypes >= importantTypes.length * 0.75; // 75% minimum
}

function generateTestReport(results) {
    console.log('\n📊 RAPPORT DE TEST COMPLET');
    console.log('==========================');
    
    const tests = [
        { name: 'Structure Strapi', result: results.structure },
        { name: 'Dépendances', result: results.dependencies },
        { name: 'Configuration Env', result: results.environment },
        { name: 'Serveur Strapi', result: results.server },
        { name: 'Plugin Upload', result: results.upload },
        { name: 'Media Library', result: results.mediaLibrary },
        { name: 'Content Types', result: results.contentTypes }
    ];
    
    let passedTests = 0;
    
    tests.forEach(test => {
        const status = test.result ? '✅' : '❌';
        console.log(`${status} ${test.name}`);
        if (test.result) passedTests++;
    });
    
    const score = Math.round((passedTests / tests.length) * 100);
    console.log(`\n🎯 Score global: ${score}% (${passedTests}/${tests.length})`);
    
    if (score >= 90) {
        console.log('🎉 EXCELLENT! Le clone peut gérer les imports de médias');
    } else if (score >= 70) {
        console.log('✅ BON! Quelques ajustements mineurs peuvent être nécessaires');
    } else if (score >= 50) {
        console.log('⚠️ MOYEN! Des problèmes subsistent');
    } else {
        console.log('❌ CRITIQUE! Configuration incomplète');
    }
    
    return score;
}

function provideRecommendations(score, results) {
    console.log('\n💡 RECOMMANDATIONS');
    console.log('==================');
    
    if (!results.structure) {
        console.log('🔧 Exécuter le script de synchronisation:');
        console.log('   node ../scripts/sync-strapi-to-clone.js');
    }
    
    if (!results.dependencies) {
        console.log('📦 Installer les dépendances Strapi:');
        console.log('   npm install @strapi/strapi @strapi/plugin-upload');
    }
    
    if (!results.environment) {
        console.log('🔐 Configurer les variables d\'environnement:');
        console.log('   node generate-strapi-keys.js');
    }
    
    if (!results.server) {
        console.log('🚀 Démarrer le serveur Strapi:');
        console.log('   npm run strapi:develop');
    }
    
    if (score >= 70) {
        console.log('\n🎯 PROCHAINES ÉTAPES POUR TESTER L\'IMPORT:');
        console.log('1. Ouvrir http://localhost:1337/admin');
        console.log('2. Créer un compte administrateur');
        console.log('3. Aller dans Media Library');
        console.log('4. Tester l\'upload d\'images');
        console.log('5. Vérifier les APIs de médias');
    }
}

async function main() {
    console.log('🎯 OBJECTIF: Vérifier que le clone peut importer des médias\n');
    
    const results = {
        structure: checkStrapiStructure(),
        dependencies: checkStrapiDependencies(),
        environment: checkEnvironmentConfig(),
        server: await checkStrapiServer(),
        upload: false,
        mediaLibrary: false,
        contentTypes: checkContentTypes()
    };
    
    // Tests serveur seulement si le serveur est accessible
    if (results.server) {
        results.upload = await checkUploadPlugin();
        results.mediaLibrary = await checkMediaLibraryAccess();
    }
    
    const score = generateTestReport(results);
    provideRecommendations(score, results);
    
    console.log('\n✨ Test terminé!');
    
    if (score >= 70) {
        console.log('🎉 Le clone est prêt pour les imports de médias!');
    } else {
        console.log('🔧 Des ajustements sont nécessaires avant les imports');
    }
}

main().catch(error => {
    console.error('❌ Erreur lors du test:', error.message);
    process.exit(1);
});