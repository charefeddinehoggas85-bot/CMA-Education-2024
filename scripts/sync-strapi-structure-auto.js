#!/usr/bin/env node

/**
 * 🔄 SYNCHRONISATION AUTOMATIQUE STRAPI CLONÉ → RAILWAY
 * 
 * Ce script copie automatiquement la structure et les données
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 SYNCHRONISATION AUTOMATIQUE STRAPI');
console.log('=====================================\n');

// Chemins
const CLONED_STRAPI_PATH = 'D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi';
const PROJECT_STRAPI_PATH = './cms-cma';

console.log(`📂 Source: ${CLONED_STRAPI_PATH}`);
console.log(`📂 Destination: ${PROJECT_STRAPI_PATH}`);

// Vérifications
if (!fs.existsSync(CLONED_STRAPI_PATH)) {
    console.log('❌ Strapi cloné non trouvé !');
    process.exit(1);
}

if (!fs.existsSync(PROJECT_STRAPI_PATH)) {
    console.log('❌ Dossier cms-cma non trouvé !');
    process.exit(1);
}

console.log('\n🔄 ÉTAPE 1: Copie des Content Types');
console.log('-----------------------------------');

// Copier les Content Types
const sourceSrcPath = path.join(CLONED_STRAPI_PATH, 'src');
const destSrcPath = path.join(PROJECT_STRAPI_PATH, 'src');

if (fs.existsSync(sourceSrcPath)) {
    try {
        // Créer le dossier de destination si nécessaire
        if (!fs.existsSync(destSrcPath)) {
            fs.mkdirSync(destSrcPath, { recursive: true });
        }
        
        // Copier récursivement le dossier src
        copyDirectory(sourceSrcPath, destSrcPath);
        console.log('✅ Content Types copiés');
        
    } catch (error) {
        console.log(`❌ Erreur copie Content Types: ${error.message}`);
    }
} else {
    console.log('❌ Dossier src non trouvé dans le Strapi cloné');
}

console.log('\n📊 ÉTAPE 2: Copie de la configuration');
console.log('-------------------------------------');

// Copier les fichiers de configuration importants
const configFiles = [
    'config/database.js',
    'config/middlewares.js',
    'config/server.js',
    'config/admin.js'
];

configFiles.forEach(configFile => {
    const sourcePath = path.join(CLONED_STRAPI_PATH, configFile);
    const destPath = path.join(PROJECT_STRAPI_PATH, configFile);
    
    if (fs.existsSync(sourcePath)) {
        try {
            // Créer le dossier parent si nécessaire
            const destDir = path.dirname(destPath);
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }
            
            fs.copyFileSync(sourcePath, destPath);
            console.log(`✅ ${configFile} copié`);
        } catch (error) {
            console.log(`⚠️  Erreur copie ${configFile}: ${error.message}`);
        }
    } else {
        console.log(`⚠️  ${configFile} non trouvé`);
    }
});

console.log('\n📸 ÉTAPE 3: Analyse des médias');
console.log('-----------------------------');

const sourceUploadsPath = path.join(CLONED_STRAPI_PATH, 'public', 'uploads');
const destUploadsPath = path.join(PROJECT_STRAPI_PATH, 'public', 'uploads');

if (fs.existsSync(sourceUploadsPath)) {
    try {
        // Créer le dossier de destination
        if (!fs.existsSync(destUploadsPath)) {
            fs.mkdirSync(destUploadsPath, { recursive: true });
        }
        
        // Copier les médias (limité aux fichiers importants)
        const files = fs.readdirSync(sourceUploadsPath, { recursive: true });
        const mediaFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.mp4', '.webm', '.pdf'].includes(ext);
        });
        
        console.log(`📊 ${mediaFiles.length} fichiers média trouvés`);
        
        // Copier les 50 premiers fichiers (pour éviter de surcharger)
        const filesToCopy = mediaFiles.slice(0, 50);
        
        filesToCopy.forEach(file => {
            try {
                const sourcePath = path.join(sourceUploadsPath, file);
                const destPath = path.join(destUploadsPath, file);
                
                // Créer le dossier parent si nécessaire
                const destDir = path.dirname(destPath);
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }
                
                fs.copyFileSync(sourcePath, destPath);
            } catch (error) {
                console.log(`⚠️  Erreur copie ${file}: ${error.message}`);
            }
        });
        
        console.log(`✅ ${filesToCopy.length} fichiers média copiés`);
        
        if (mediaFiles.length > 50) {
            console.log(`⚠️  ${mediaFiles.length - 50} fichiers restants à copier manuellement`);
        }
        
    } catch (error) {
        console.log(`❌ Erreur copie médias: ${error.message}`);
    }
} else {
    console.log('⚠️  Dossier uploads non trouvé');
}

console.log('\n🎯 ÉTAPE 4: Instructions finales');
console.log('--------------------------------');

console.log('✅ Structure synchronisée !');
console.log('');
console.log('📋 PROCHAINES ÉTAPES:');
console.log('1. Redéployez Railway avec la nouvelle structure');
console.log('2. Accédez à Railway Admin pour vérifier les Content Types');
console.log('3. Configurez les permissions Public');
console.log('4. Importez les données avec le script de migration');
console.log('');
console.log('🔗 URLs importantes:');
console.log('- Railway Admin: https://cma-education-strapi-production.up.railway.app/admin');
console.log('- Railway Logs: https://railway.app (votre projet)');

// Fonction utilitaire pour copier récursivement
function copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }
    
    const items = fs.readdirSync(source);
    
    items.forEach(item => {
        const sourcePath = path.join(source, item);
        const destPath = path.join(destination, item);
        
        const stat = fs.statSync(sourcePath);
        
        if (stat.isDirectory()) {
            copyDirectory(sourcePath, destPath);
        } else {
            try {
                fs.copyFileSync(sourcePath, destPath);
            } catch (error) {
                console.log(`⚠️  Erreur copie ${item}: ${error.message}`);
            }
        }
    });
}

console.log('\n✅ Synchronisation terminée !');