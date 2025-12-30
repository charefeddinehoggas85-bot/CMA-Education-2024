#!/usr/bin/env node

/**
 * 🔄 COPIE STRUCTURE DU STRAPI CLONÉ VERS RAILWAY
 * 
 * Ce script analyse le Strapi cloné et recrée la même structure sur Railway
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 COPIE STRUCTURE STRAPI CLONÉ → RAILWAY');
console.log('=========================================\n');

// Chemin vers le Strapi cloné
const CLONED_STRAPI_PATH = 'D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi';

console.log(`📂 Analyse du Strapi cloné: ${CLONED_STRAPI_PATH}`);

// Vérifier si le dossier existe
if (!fs.existsSync(CLONED_STRAPI_PATH)) {
    console.log('❌ Dossier Strapi cloné non trouvé !');
    console.log('Vérifiez le chemin:', CLONED_STRAPI_PATH);
    process.exit(1);
}

// Analyser la structure des Content Types
const srcApiPath = path.join(CLONED_STRAPI_PATH, 'src', 'api');

if (!fs.existsSync(srcApiPath)) {
    console.log('❌ Dossier src/api non trouvé dans le Strapi cloné');
    process.exit(1);
}

console.log('✅ Dossier src/api trouvé');
console.log('\n📋 ANALYSE DES CONTENT TYPES');
console.log('-----------------------------');

// Lister tous les Content Types
const contentTypes = [];

try {
    const apiDirs = fs.readdirSync(srcApiPath);
    
    apiDirs.forEach(dir => {
        const contentTypePath = path.join(srcApiPath, dir, 'content-types', dir, 'schema.json');
        
        if (fs.existsSync(contentTypePath)) {
            try {
                const schema = JSON.parse(fs.readFileSync(contentTypePath, 'utf8'));
                
                contentTypes.push({
                    name: dir,
                    displayName: schema.info?.displayName || dir,
                    singularName: schema.info?.singularName || dir,
                    pluralName: schema.info?.pluralName || dir + 's',
                    kind: schema.kind || 'collectionType',
                    attributes: schema.attributes || {},
                    schemaPath: contentTypePath
                });
                
                console.log(`✅ ${schema.info?.displayName || dir} (${schema.kind || 'collectionType'})`);
                
                // Afficher les champs principaux
                if (schema.attributes) {
                    const fields = Object.keys(schema.attributes);
                    console.log(`   Champs: ${fields.slice(0, 5).join(', ')}${fields.length > 5 ? '...' : ''}`);
                }
                
            } catch (error) {
                console.log(`⚠️  Erreur lecture schema ${dir}: ${error.message}`);
            }
        }
    });
    
} catch (error) {
    console.log(`❌ Erreur lecture dossier API: ${error.message}`);
    process.exit(1);
}

console.log(`\n📊 Total: ${contentTypes.length} Content Types trouvés`);

// Analyser les médias
console.log('\n📸 ANALYSE DES MÉDIAS');
console.log('--------------------');

const publicUploadsPath = path.join(CLONED_STRAPI_PATH, 'public', 'uploads');
let mediaFiles = [];

if (fs.existsSync(publicUploadsPath)) {
    try {
        const files = fs.readdirSync(publicUploadsPath, { recursive: true });
        mediaFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.mp4', '.webm', '.pdf'].includes(ext);
        });
        
        console.log(`✅ ${mediaFiles.length} fichiers média trouvés`);
        
        // Afficher quelques exemples
        mediaFiles.slice(0, 5).forEach(file => {
            const filePath = path.join(publicUploadsPath, file);
            const stats = fs.statSync(filePath);
            const sizeKB = Math.round(stats.size / 1024);
            console.log(`   - ${file} (${sizeKB} KB)`);
        });
        
        if (mediaFiles.length > 5) {
            console.log(`   ... et ${mediaFiles.length - 5} autres fichiers`);
        }
        
    } catch (error) {
        console.log(`⚠️  Erreur lecture médias: ${error.message}`);
    }
} else {
    console.log('⚠️  Dossier public/uploads non trouvé');
}

// Générer les instructions de migration
console.log('\n🎯 PLAN DE MIGRATION');
console.log('====================');

console.log('\n**ÉTAPE 1: Créer les Content Types dans Railway Admin**');
console.log('URL: https://cma-education-strapi-production.up.railway.app/admin');
console.log('');

contentTypes.forEach((ct, index) => {
    console.log(`${index + 1}. **${ct.displayName}** (${ct.kind})`);
    console.log(`   - Content-Type Builder → Create new ${ct.kind === 'singleType' ? 'single type' : 'collection type'}`);
    console.log(`   - Display name: ${ct.displayName}`);
    console.log(`   - API ID: ${ct.singularName}`);
    
    // Lister les champs principaux
    const attributes = Object.entries(ct.attributes);
    if (attributes.length > 0) {
        console.log('   - Champs à créer:');
        attributes.slice(0, 8).forEach(([fieldName, fieldConfig]) => {
            const type = fieldConfig.type || 'text';
            console.log(`     * ${fieldName} (${type})`);
        });
        if (attributes.length > 8) {
            console.log(`     ... et ${attributes.length - 8} autres champs`);
        }
    }
    console.log('');
});

console.log('**ÉTAPE 2: Configurer les Permissions**');
console.log('Settings → Users & Permissions → Roles → Public');
console.log('Cocher "find" et "findOne" pour tous les Content Types');
console.log('');

console.log('**ÉTAPE 3: Uploader les Médias**');
console.log('Media Library → Upload assets');
console.log(`${mediaFiles.length} fichiers à uploader depuis:`);
console.log(`${publicUploadsPath}`);
console.log('');

console.log('**ÉTAPE 4: Importer les Données**');
console.log('Une fois les Content Types créés, relancer:');
console.log('node scripts/copy-content-to-railway.js');

console.log('\n🎯 RÉSUMÉ');
console.log('=========');
console.log(`✅ ${contentTypes.length} Content Types à créer`);
console.log(`✅ ${mediaFiles.length} fichiers média à uploader`);
console.log('✅ Structure analysée avec succès');

console.log('\n📋 PROCHAINE ÉTAPE:');
console.log('Accédez à Railway Admin et créez les Content Types listés ci-dessus');
console.log('URL: https://cma-education-strapi-production.up.railway.app/admin');

// Sauvegarder l'analyse pour référence
const analysisReport = {
    timestamp: new Date().toISOString(),
    clonedStrapiPath: CLONED_STRAPI_PATH,
    contentTypes: contentTypes,
    mediaFiles: mediaFiles.slice(0, 20), // Limiter pour éviter un fichier trop gros
    totalMediaFiles: mediaFiles.length
};

fs.writeFileSync('railway-migration-analysis.json', JSON.stringify(analysisReport, null, 2));
console.log('\n💾 Analyse sauvegardée dans: railway-migration-analysis.json');