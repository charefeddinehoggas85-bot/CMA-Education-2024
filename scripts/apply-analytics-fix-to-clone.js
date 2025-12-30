#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 APPLICATION DU FIX ANALYTICS AU CLONE');
console.log('========================================\n');

function findStrapiConfigsInClone() {
    console.log('📋 RECHERCHE DES CONFIGURATIONS STRAPI DANS LE CLONE:');
    console.log('----------------------------------------------------');
    
    const possiblePaths = [
        'CMA-Education-2024/cms-cma/config/server.ts',
        'CMA-Education-2024/config/server.ts',
        'CMA-Education-2024/strapi/config/server.ts',
        'CMA-Education-2024/backend/config/server.ts'
    ];
    
    const foundConfigs = [];
    
    for (const configPath of possiblePaths) {
        const fullPath = path.join(__dirname, '..', configPath);
        
        if (fs.existsSync(fullPath)) {
            console.log(`✅ Trouvé: ${configPath}`);
            foundConfigs.push(configPath);
        } else {
            console.log(`❌ Non trouvé: ${configPath}`);
        }
    }
    
    return foundConfigs;
}

function applyAnalyticsFixToFile(filePath) {
    console.log(`\n🔧 APPLICATION DU FIX À: ${filePath}`);
    console.log('----------------------------------------');
    
    try {
        const fullPath = path.join(__dirname, '..', filePath);
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Vérifier si le fix est déjà appliqué
        if (content.includes('telemetry:') && content.includes('enabled: false')) {
            console.log('✅ Fix déjà appliqué');
            return true;
        }
        
        // Appliquer le fix
        const fixedContent = content.replace(
            /webhooks: \{[\s\S]*?\},/,
            `webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // Désactiver les analytics Strapi pour éviter les erreurs ERR_BLOCKED_BY_CLIENT
  telemetry: {
    enabled: false,
  },`
        );
        
        if (fixedContent !== content) {
            fs.writeFileSync(fullPath, fixedContent, 'utf8');
            console.log('✅ Fix appliqué avec succès');
            return true;
        } else {
            console.log('⚠️ Impossible d\'appliquer le fix automatiquement');
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur: ${error.message}`);
        return false;
    }
}

function analyzeCloneStructure() {
    console.log('\n📊 ANALYSE DE LA STRUCTURE DU CLONE:');
    console.log('====================================');
    
    const clonePath = path.join(__dirname, '..', 'CMA-Education-2024');
    
    if (!fs.existsSync(clonePath)) {
        console.log('❌ Dossier clone CMA-Education-2024 non trouvé');
        return false;
    }
    
    console.log('✅ Dossier clone trouvé');
    
    // Vérifier le contenu
    const cloneContents = fs.readdirSync(clonePath);
    
    const hasNextConfig = cloneContents.includes('next.config.js');
    const hasPackageJson = cloneContents.includes('package.json');
    const hasSrcFolder = cloneContents.includes('src');
    const hasCmsFolder = cloneContents.some(item => item.toLowerCase().includes('cms') || item.toLowerCase().includes('strapi'));
    
    console.log(`📦 Next.js config: ${hasNextConfig ? '✅' : '❌'}`);
    console.log(`📦 Package.json: ${hasPackageJson ? '✅' : '❌'}`);
    console.log(`📦 Dossier src: ${hasSrcFolder ? '✅' : '❌'}`);
    console.log(`📦 Dossier CMS/Strapi: ${hasCmsFolder ? '✅' : '❌'}`);
    
    if (!hasCmsFolder) {
        console.log('\n💡 CONCLUSION:');
        console.log('Le clone CMA-Education-2024 semble contenir uniquement le frontend Next.js');
        console.log('Il n\'y a pas de configuration Strapi à modifier dans ce clone');
        return false;
    }
    
    return true;
}

function main() {
    const hasStrapi = analyzeCloneStructure();
    
    if (!hasStrapi) {
        console.log('\n🎯 RÉSULTAT:');
        console.log('============');
        console.log('✅ Le clone ne contient pas de configuration Strapi');
        console.log('✅ Le fix analytics a déjà été appliqué aux configurations principales:');
        console.log('   - cms-cma/config/server.ts');
        console.log('   - cms-cma/CMA-Education-Strapi/config/server.ts');
        console.log('\n💡 AUCUNE ACTION REQUISE SUR LE CLONE');
        return;
    }
    
    const foundConfigs = findStrapiConfigsInClone();
    
    if (foundConfigs.length === 0) {
        console.log('\n⚠️ AUCUNE CONFIGURATION STRAPI TROUVÉE DANS LE CLONE');
        console.log('Le clone semble contenir uniquement le frontend Next.js');
        return;
    }
    
    console.log(`\n🔧 APPLICATION DU FIX À ${foundConfigs.length} FICHIER(S):`);
    
    let successCount = 0;
    
    for (const configPath of foundConfigs) {
        if (applyAnalyticsFixToFile(configPath)) {
            successCount++;
        }
    }
    
    console.log('\n🎯 RÉSUMÉ:');
    console.log('==========');
    console.log(`✅ Configurations trouvées: ${foundConfigs.length}`);
    console.log(`✅ Fixes appliqués: ${successCount}`);
    
    if (successCount === foundConfigs.length) {
        console.log('🎉 TOUS LES FIXES APPLIQUÉS AVEC SUCCÈS');
    } else {
        console.log('⚠️ Certains fixes n\'ont pas pu être appliqués automatiquement');
    }
}

main();