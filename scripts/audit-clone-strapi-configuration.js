#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 AUDIT COMPLET DES CONFIGURATIONS STRAPI - CLONE');
console.log('=================================================\n');

function analyzeCloneStructure() {
    console.log('📂 1. ANALYSE DE LA STRUCTURE DU CLONE');
    console.log('=====================================');
    
    const clonePath = 'CMA-Education-2024';
    const mainPath = 'cms-cma';
    
    if (!fs.existsSync(clonePath)) {
        console.log('❌ Dossier clone non trouvé');
        return false;
    }
    
    console.log('✅ Dossier clone trouvé');
    
    // Vérifier la présence de Strapi dans le clone
    const cloneContents = fs.readdirSync(clonePath);
    console.log('\n📋 Contenu du clone:');
    
    const strapiRelated = cloneContents.filter(item => 
        item.toLowerCase().includes('strapi') || 
        item.toLowerCase().includes('cms') ||
        item === 'config' ||
        item === 'src'
    );
    
    strapiRelated.forEach(item => {
        console.log(`  📁 ${item}`);
    });
    
    return strapiRelated.length > 0;
}

function compareConfigurations() {
    console.log('\n⚖️ 2. COMPARAISON DES CONFIGURATIONS');
    console.log('====================================');
    
    const configFiles = [
        'config/database.ts',
        'config/server.ts',
        'config/middlewares.ts',
        'config/admin.ts',
        'config/api.ts'
    ];
    
    console.log('📊 Comparaison des fichiers de configuration:');
    
    configFiles.forEach(configFile => {
        const mainFile = path.join('cms-cma', configFile);
        const cloneFile = path.join('CMA-Education-2024', configFile);
        
        const mainExists = fs.existsSync(mainFile);
        const cloneExists = fs.existsSync(cloneFile);
        
        console.log(`\n📄 ${configFile}:`);
        console.log(`  Principal: ${mainExists ? '✅' : '❌'}`);
        console.log(`  Clone: ${cloneExists ? '✅' : '❌'}`);
        
        if (mainExists && cloneExists) {
            const mainContent = fs.readFileSync(mainFile, 'utf8');
            const cloneContent = fs.readFileSync(cloneFile, 'utf8');
            
            if (mainContent === cloneContent) {
                console.log('  🔄 Identiques');
            } else {
                console.log('  ⚠️ Différents');
            }
        }
    });
}

function analyzeAPIStructure() {
    console.log('\n🔌 3. ANALYSE DE LA STRUCTURE DES APIs');
    console.log('====================================');
    
    const mainApiPath = 'cms-cma/src/api';
    const cloneApiPath = 'CMA-Education-2024/src/api';
    
    console.log('📊 Comparaison des APIs:');
    
    if (fs.existsSync(mainApiPath)) {
        const mainApis = fs.readdirSync(mainApiPath);
        console.log(`\n📁 APIs principales (${mainApis.length}):`);
        mainApis.forEach(api => console.log(`  ✅ ${api}`));
        
        if (fs.existsSync(cloneApiPath)) {
            const cloneApis = fs.readdirSync(cloneApiPath);
            console.log(`\n📁 APIs clone (${cloneApis.length}):`);
            cloneApis.forEach(api => console.log(`  ${mainApis.includes(api) ? '✅' : '⚠️'} ${api}`));
            
            // APIs manquantes dans le clone
            const missingInClone = mainApis.filter(api => !cloneApis.includes(api));
            if (missingInClone.length > 0) {
                console.log(`\n❌ APIs manquantes dans le clone (${missingInClone.length}):`);
                missingInClone.forEach(api => console.log(`  ❌ ${api}`));
            }
            
            // APIs supplémentaires dans le clone
            const extraInClone = cloneApis.filter(api => !mainApis.includes(api));
            if (extraInClone.length > 0) {
                console.log(`\n⚠️ APIs supplémentaires dans le clone (${extraInClone.length}):`);
                extraInClone.forEach(api => console.log(`  ⚠️ ${api}`));
            }
        } else {
            console.log('\n❌ Aucune API trouvée dans le clone');
        }
    } else {
        console.log('❌ Dossier API principal non trouvé');
    }
}

function analyzeMediaConfiguration() {
    console.log('\n🖼️ 4. ANALYSE DE LA CONFIGURATION MÉDIAS');
    console.log('========================================');
    
    const mediaConfigs = [
        'config/middlewares.ts',
        'config/plugins.ts',
        'config/server.ts'
    ];
    
    mediaConfigs.forEach(configFile => {
        const mainFile = path.join('cms-cma', configFile);
        const cloneFile = path.join('CMA-Education-2024', configFile);
        
        console.log(`\n📄 ${configFile}:`);
        
        if (fs.existsSync(mainFile)) {
            const content = fs.readFileSync(mainFile, 'utf8');
            
            // Vérifier les configurations médias
            const hasUploadConfig = content.includes('upload') || content.includes('formLimit') || content.includes('maxFileSize');
            const hasSecurityConfig = content.includes('contentSecurityPolicy') || content.includes('img-src');
            const hasCorsConfig = content.includes('cors');
            
            console.log(`  Principal:`);
            console.log(`    Upload config: ${hasUploadConfig ? '✅' : '❌'}`);
            console.log(`    Security config: ${hasSecurityConfig ? '✅' : '❌'}`);
            console.log(`    CORS config: ${hasCorsConfig ? '✅' : '❌'}`);
            
            if (fs.existsSync(cloneFile)) {
                const cloneContent = fs.readFileSync(cloneFile, 'utf8');
                
                const cloneHasUpload = cloneContent.includes('upload') || cloneContent.includes('formLimit') || cloneContent.includes('maxFileSize');
                const cloneHasSecurity = cloneContent.includes('contentSecurityPolicy') || cloneContent.includes('img-src');
                const cloneHasCors = cloneContent.includes('cors');
                
                console.log(`  Clone:`);
                console.log(`    Upload config: ${cloneHasUpload ? '✅' : '❌'}`);
                console.log(`    Security config: ${cloneHasSecurity ? '✅' : '❌'}`);
                console.log(`    CORS config: ${cloneHasCors ? '✅' : '❌'}`);
                
                // Comparaison
                if (hasUploadConfig !== cloneHasUpload) console.log('    ⚠️ Configuration upload différente');
                if (hasSecurityConfig !== cloneHasSecurity) console.log('    ⚠️ Configuration sécurité différente');
                if (hasCorsConfig !== cloneHasCors) console.log('    ⚠️ Configuration CORS différente');
            } else {
                console.log(`  Clone: ❌ Fichier manquant`);
            }
        } else {
            console.log(`  Principal: ❌ Fichier manquant`);
        }
    });
}

function analyzeControllers() {
    console.log('\n🎮 5. ANALYSE DES CONTRÔLEURS');
    console.log('=============================');
    
    const mainApiPath = 'cms-cma/src/api';
    
    if (!fs.existsSync(mainApiPath)) {
        console.log('❌ Dossier API principal non trouvé');
        return;
    }
    
    const apis = fs.readdirSync(mainApiPath);
    
    console.log(`📊 Analyse des contrôleurs pour ${apis.length} APIs:`);
    
    apis.forEach(apiName => {
        const controllerPath = path.join(mainApiPath, apiName, 'controllers');
        const routesPath = path.join(mainApiPath, apiName, 'routes');
        const servicesPath = path.join(mainApiPath, apiName, 'services');
        
        console.log(`\n📁 ${apiName}:`);
        console.log(`  Controllers: ${fs.existsSync(controllerPath) ? '✅' : '❌'}`);
        console.log(`  Routes: ${fs.existsSync(routesPath) ? '✅' : '❌'}`);
        console.log(`  Services: ${fs.existsSync(servicesPath) ? '✅' : '❌'}`);
        
        // Vérifier dans le clone
        const cloneControllerPath = path.join('CMA-Education-2024/src/api', apiName, 'controllers');
        const cloneRoutesPath = path.join('CMA-Education-2024/src/api', apiName, 'routes');
        const cloneServicesPath = path.join('CMA-Education-2024/src/api', apiName, 'services');
        
        if (fs.existsSync('CMA-Education-2024/src/api')) {
            console.log(`  Clone Controllers: ${fs.existsSync(cloneControllerPath) ? '✅' : '❌'}`);
            console.log(`  Clone Routes: ${fs.existsSync(cloneRoutesPath) ? '✅' : '❌'}`);
            console.log(`  Clone Services: ${fs.existsSync(cloneServicesPath) ? '✅' : '❌'}`);
        }
    });
}

function analyzeEnvironmentVariables() {
    console.log('\n🔐 6. ANALYSE DES VARIABLES D\'ENVIRONNEMENT');
    console.log('===========================================');
    
    const envFiles = ['.env', '.env.local', '.env.example', '.env.production'];
    
    envFiles.forEach(envFile => {
        const mainEnv = envFile;
        const cloneEnv = path.join('CMA-Education-2024', envFile);
        
        console.log(`\n📄 ${envFile}:`);
        console.log(`  Principal: ${fs.existsSync(mainEnv) ? '✅' : '❌'}`);
        console.log(`  Clone: ${fs.existsSync(cloneEnv) ? '✅' : '❌'}`);
        
        if (fs.existsSync(mainEnv)) {
            const content = fs.readFileSync(mainEnv, 'utf8');
            const strapiVars = content.split('\n').filter(line => 
                line.includes('STRAPI') || 
                line.includes('DATABASE') || 
                line.includes('JWT') ||
                line.includes('API_TOKEN')
            );
            
            if (strapiVars.length > 0) {
                console.log(`    Variables Strapi trouvées: ${strapiVars.length}`);
                strapiVars.forEach(variable => {
                    const varName = variable.split('=')[0];
                    console.log(`      ${varName}`);
                });
            }
        }
    });
}

function generateProblemsReport() {
    console.log('\n🚨 7. RAPPORT DES PROBLÈMES IDENTIFIÉS');
    console.log('=====================================');
    
    const problems = [];
    
    // Vérifier si le clone a une structure Strapi complète
    if (!fs.existsSync('CMA-Education-2024/src/api')) {
        problems.push({
            type: 'CRITIQUE',
            category: 'Structure',
            description: 'Aucune structure API Strapi dans le clone',
            impact: 'Impossible d\'importer les médias et données',
            solution: 'Copier la structure API complète du projet principal'
        });
    }
    
    // Vérifier les configurations manquantes
    const requiredConfigs = ['config/database.ts', 'config/server.ts', 'config/middlewares.ts'];
    requiredConfigs.forEach(config => {
        if (!fs.existsSync(path.join('CMA-Education-2024', config))) {
            problems.push({
                type: 'MAJEUR',
                category: 'Configuration',
                description: `Configuration manquante: ${config}`,
                impact: 'Strapi ne peut pas fonctionner correctement',
                solution: `Copier ${config} du projet principal`
            });
        }
    });
    
    // Vérifier les variables d'environnement
    if (!fs.existsSync('CMA-Education-2024/.env.example')) {
        problems.push({
            type: 'MINEUR',
            category: 'Environnement',
            description: 'Fichier .env.example manquant',
            impact: 'Configuration d\'environnement difficile',
            solution: 'Copier .env.example du projet principal'
        });
    }
    
    if (problems.length === 0) {
        console.log('✅ Aucun problème critique identifié');
    } else {
        console.log(`❌ ${problems.length} problème(s) identifié(s):\n`);
        
        problems.forEach((problem, index) => {
            console.log(`${index + 1}. [${problem.type}] ${problem.category}`);
            console.log(`   Problème: ${problem.description}`);
            console.log(`   Impact: ${problem.impact}`);
            console.log(`   Solution: ${problem.solution}\n`);
        });
    }
    
    return problems;
}

function generateSyncScript(problems) {
    console.log('\n🔧 8. GÉNÉRATION DU SCRIPT DE SYNCHRONISATION');
    console.log('=============================================');
    
    if (problems.length === 0) {
        console.log('✅ Aucune synchronisation nécessaire');
        return;
    }
    
    console.log('📝 Script de synchronisation recommandé:');
    console.log('```bash');
    console.log('# Synchronisation des configurations Strapi');
    console.log('');
    
    // Copier les configurations
    console.log('# 1. Copier les configurations');
    console.log('cp -r cms-cma/config/* CMA-Education-2024/config/ 2>/dev/null || true');
    console.log('');
    
    // Copier la structure API
    console.log('# 2. Copier la structure API');
    console.log('cp -r cms-cma/src/api/* CMA-Education-2024/src/api/ 2>/dev/null || true');
    console.log('');
    
    // Copier les variables d\'environnement
    console.log('# 3. Copier les variables d\'environnement');
    console.log('cp cms-cma/.env.example CMA-Education-2024/.env.example 2>/dev/null || true');
    console.log('');
    
    // Copier les dépendances
    console.log('# 4. Synchroniser les dépendances');
    console.log('cd CMA-Education-2024');
    console.log('npm install');
    console.log('```');
}

function main() {
    console.log('🎯 AUDIT COMPLET DES CONFIGURATIONS STRAPI');
    console.log('Objectif: Identifier pourquoi Strapi n\'importe pas les médias\n');
    
    const hasStrapi = analyzeCloneStructure();
    
    if (!hasStrapi) {
        console.log('\n❌ CONCLUSION: Le clone ne contient pas de structure Strapi');
        console.log('Le clone semble être uniquement le frontend Next.js');
        console.log('Pour résoudre les problèmes de médias, il faut:');
        console.log('1. Utiliser le Strapi principal (cms-cma)');
        console.log('2. Ou copier la structure Strapi complète dans le clone');
        return;
    }
    
    compareConfigurations();
    analyzeAPIStructure();
    analyzeMediaConfiguration();
    analyzeControllers();
    analyzeEnvironmentVariables();
    
    const problems = generateProblemsReport();
    generateSyncScript(problems);
    
    console.log('\n🎯 CONCLUSION DE L\'AUDIT');
    console.log('=========================');
    
    if (problems.length === 0) {
        console.log('✅ Configuration clone correcte');
        console.log('Les problèmes de médias viennent probablement d\'ailleurs');
    } else {
        console.log(`❌ ${problems.length} problème(s) de configuration détecté(s)`);
        console.log('Ces problèmes peuvent expliquer pourquoi les médias ne s\'importent pas');
    }
}

main();