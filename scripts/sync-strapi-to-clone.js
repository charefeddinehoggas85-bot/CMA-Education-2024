#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 SYNCHRONISATION STRAPI VERS LE CLONE');
console.log('======================================\n');

function createDirectoryIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`📁 Créé: ${dirPath}`);
        return true;
    }
    return false;
}

function copyFileIfExists(source, destination) {
    if (fs.existsSync(source)) {
        const destDir = path.dirname(destination);
        createDirectoryIfNotExists(destDir);
        
        fs.copyFileSync(source, destination);
        console.log(`📄 Copié: ${source} → ${destination}`);
        return true;
    } else {
        console.log(`❌ Source manquante: ${source}`);
        return false;
    }
}

function copyDirectoryRecursive(source, destination) {
    if (!fs.existsSync(source)) {
        console.log(`❌ Dossier source manquant: ${source}`);
        return false;
    }
    
    createDirectoryIfNotExists(destination);
    
    const items = fs.readdirSync(source);
    let copiedCount = 0;
    
    items.forEach(item => {
        const sourcePath = path.join(source, item);
        const destPath = path.join(destination, item);
        
        const stat = fs.statSync(sourcePath);
        
        if (stat.isDirectory()) {
            copyDirectoryRecursive(sourcePath, destPath);
        } else {
            fs.copyFileSync(sourcePath, destPath);
            copiedCount++;
        }
    });
    
    console.log(`📁 Copié: ${source} → ${destination} (${copiedCount} fichiers)`);
    return true;
}

function syncConfigurations() {
    console.log('⚙️ 1. SYNCHRONISATION DES CONFIGURATIONS');
    console.log('========================================');
    
    const configFiles = [
        'config/database.ts',
        'config/server.ts',
        'config/middlewares.ts',
        'config/admin.ts',
        'config/plugins.ts'
    ];
    
    let syncedCount = 0;
    
    configFiles.forEach(configFile => {
        const source = path.join('cms-cma', configFile);
        const destination = path.join('CMA-Education-2024', configFile);
        
        if (copyFileIfExists(source, destination)) {
            syncedCount++;
        }
    });
    
    console.log(`\n✅ Configurations synchronisées: ${syncedCount}/${configFiles.length}`);
    return syncedCount;
}

function syncAPIStructure() {
    console.log('\n🔌 2. SYNCHRONISATION DE LA STRUCTURE API');
    console.log('=========================================');
    
    const source = 'cms-cma/src/api';
    const destination = 'CMA-Education-2024/src/api';
    
    if (copyDirectoryRecursive(source, destination)) {
        // Compter les APIs copiées
        const apis = fs.readdirSync(destination);
        console.log(`\n✅ APIs synchronisées: ${apis.length}`);
        
        // Lister quelques APIs importantes
        const importantApis = ['formation', 'formateur', 'testimonial', 'site-setting'];
        console.log('\n📋 APIs critiques vérifiées:');
        importantApis.forEach(api => {
            const apiPath = path.join(destination, api);
            console.log(`  ${fs.existsSync(apiPath) ? '✅' : '❌'} ${api}`);
        });
        
        return true;
    }
    
    return false;
}

function syncPackageJson() {
    console.log('\n📦 3. SYNCHRONISATION DES DÉPENDANCES');
    console.log('====================================');
    
    const mainPackage = 'cms-cma/package.json';
    const clonePackage = 'CMA-Education-2024/package.json';
    
    if (!fs.existsSync(mainPackage)) {
        console.log('❌ package.json principal non trouvé');
        return false;
    }
    
    if (!fs.existsSync(clonePackage)) {
        console.log('📄 Création du package.json dans le clone');
        copyFileIfExists(mainPackage, clonePackage);
        return true;
    }
    
    // Comparer les dépendances Strapi
    const mainPkg = JSON.parse(fs.readFileSync(mainPackage, 'utf8'));
    const clonePkg = JSON.parse(fs.readFileSync(clonePackage, 'utf8'));
    
    const strapiDeps = Object.keys(mainPkg.dependencies || {}).filter(dep => 
        dep.includes('@strapi') || dep.includes('strapi')
    );
    
    console.log(`📊 Dépendances Strapi trouvées: ${strapiDeps.length}`);
    
    let needsUpdate = false;
    strapiDeps.forEach(dep => {
        const mainVersion = mainPkg.dependencies[dep];
        const cloneVersion = clonePkg.dependencies?.[dep];
        
        if (!cloneVersion || cloneVersion !== mainVersion) {
            console.log(`  ⚠️ ${dep}: ${cloneVersion || 'manquant'} → ${mainVersion}`);
            needsUpdate = true;
        } else {
            console.log(`  ✅ ${dep}: ${cloneVersion}`);
        }
    });
    
    if (needsUpdate) {
        console.log('\n⚠️ Mise à jour des dépendances recommandée');
        console.log('Exécuter: cd CMA-Education-2024 && npm install');
    }
    
    return !needsUpdate;
}

function syncEnvironmentFiles() {
    console.log('\n🔐 4. SYNCHRONISATION DES VARIABLES D\'ENVIRONNEMENT');
    console.log('==================================================');
    
    const envFiles = [
        '.env.example',
        '.env.local.example'
    ];
    
    let syncedCount = 0;
    
    envFiles.forEach(envFile => {
        const source = path.join('cms-cma', envFile);
        const destination = path.join('CMA-Education-2024', envFile);
        
        if (copyFileIfExists(source, destination)) {
            syncedCount++;
        }
    });
    
    // Vérifier les variables Strapi dans .env.local
    const cloneEnvLocal = 'CMA-Education-2024/.env.local';
    if (fs.existsSync(cloneEnvLocal)) {
        const content = fs.readFileSync(cloneEnvLocal, 'utf8');
        const strapiVars = content.split('\n').filter(line => 
            line.includes('STRAPI') || line.includes('DATABASE') || line.includes('JWT')
        );
        
        console.log(`\n📊 Variables Strapi dans .env.local: ${strapiVars.length}`);
        strapiVars.forEach(variable => {
            const varName = variable.split('=')[0];
            console.log(`  ✅ ${varName}`);
        });
    }
    
    console.log(`\n✅ Fichiers d'environnement synchronisés: ${syncedCount}/${envFiles.length}`);
    return syncedCount;
}

function createStrapiStartScript() {
    console.log('\n🚀 5. CRÉATION DU SCRIPT DE DÉMARRAGE');
    console.log('====================================');
    
    const startScript = `#!/bin/bash

echo "🚀 Démarrage de Strapi CMA Education"
echo "===================================="

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier si .env existe
if [ ! -f ".env" ]; then
    echo "⚠️ Fichier .env manquant"
    echo "Copier .env.example vers .env et configurer les variables"
    exit 1
fi

# Démarrer Strapi
echo "🎯 Démarrage de Strapi..."
npm run develop
`;

    const scriptPath = 'CMA-Education-2024/start-strapi.sh';
    fs.writeFileSync(scriptPath, startScript);
    
    // Rendre le script exécutable (sur Unix)
    try {
        fs.chmodSync(scriptPath, '755');
    } catch (error) {
        // Ignore sur Windows
    }
    
    console.log(`✅ Script créé: ${scriptPath}`);
    
    // Créer aussi la version Windows
    const batScript = `@echo off
echo 🚀 Démarrage de Strapi CMA Education
echo ====================================

if not exist node_modules (
    echo 📦 Installation des dépendances...
    npm install
)

if not exist .env (
    echo ⚠️ Fichier .env manquant
    echo Copier .env.example vers .env et configurer les variables
    pause
    exit /b 1
)

echo 🎯 Démarrage de Strapi...
npm run develop
pause
`;

    const batPath = 'CMA-Education-2024/start-strapi.bat';
    fs.writeFileSync(batPath, batScript);
    console.log(`✅ Script Windows créé: ${batPath}`);
}

function generateSyncReport(configSync, apiSync, packageSync, envSync) {
    console.log('\n📊 RAPPORT DE SYNCHRONISATION');
    console.log('============================');
    
    const totalScore = (configSync ? 25 : 0) + (apiSync ? 40 : 0) + (packageSync ? 20 : 0) + (envSync ? 15 : 0);
    
    console.log(`⚙️ Configurations: ${configSync ? '✅' : '❌'} (25%)`);
    console.log(`🔌 Structure API: ${apiSync ? '✅' : '❌'} (40%)`);
    console.log(`📦 Dépendances: ${packageSync ? '✅' : '❌'} (20%)`);
    console.log(`🔐 Environnement: ${envSync ? '✅' : '❌'} (15%)`);
    
    console.log(`\n🎯 Score global: ${totalScore}%`);
    
    if (totalScore >= 90) {
        console.log('🎉 SYNCHRONISATION EXCELLENTE');
        console.log('Le clone devrait maintenant pouvoir importer les médias');
    } else if (totalScore >= 70) {
        console.log('✅ SYNCHRONISATION BONNE');
        console.log('Quelques ajustements mineurs peuvent être nécessaires');
    } else {
        console.log('⚠️ SYNCHRONISATION PARTIELLE');
        console.log('Des problèmes subsistent, vérifier les étapes échouées');
    }
    
    return totalScore;
}

function provideNextSteps(score) {
    console.log('\n🚀 PROCHAINES ÉTAPES');
    console.log('===================');
    
    if (score >= 90) {
        console.log('1. ✅ Aller dans le dossier clone:');
        console.log('   cd CMA-Education-2024');
        
        console.log('\n2. ✅ Installer les dépendances:');
        console.log('   npm install');
        
        console.log('\n3. ✅ Configurer l\'environnement:');
        console.log('   cp .env.example .env');
        console.log('   # Éditer .env avec vos variables');
        
        console.log('\n4. ✅ Démarrer Strapi:');
        console.log('   npm run develop');
        console.log('   # ou ./start-strapi.sh');
        
        console.log('\n5. ✅ Tester l\'import des médias:');
        console.log('   - Ouvrir l\'admin Strapi');
        console.log('   - Aller dans Media Library');
        console.log('   - Tester l\'upload d\'images');
    } else {
        console.log('1. 🔧 Résoudre les problèmes de synchronisation');
        console.log('2. 🔄 Relancer ce script');
        console.log('3. 📞 Vérifier les logs d\'erreur');
    }
}

function main() {
    console.log('🎯 OBJECTIF: Résoudre les problèmes d\'import de médias');
    console.log('En synchronisant la structure Strapi complète vers le clone\n');
    
    const configSync = syncConfigurations() > 0;
    const apiSync = syncAPIStructure();
    const packageSync = syncPackageJson();
    const envSync = syncEnvironmentFiles() > 0;
    
    createStrapiStartScript();
    
    const score = generateSyncReport(configSync, apiSync, packageSync, envSync);
    provideNextSteps(score);
    
    console.log('\n✨ Synchronisation terminée !');
    console.log('Le clone devrait maintenant avoir une structure Strapi complète');
}

main();