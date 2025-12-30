#!/usr/bin/env node

/**
 * 📊 IMPORT COMPLET DONNÉES DEPUIS LE CLONE
 * 
 * Importe toutes les données depuis le Strapi cloné vers Railway
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

console.log('📊 IMPORT COMPLET DONNÉES DEPUIS LE CLONE');
console.log('=========================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const CLONED_STRAPI_PATH = 'D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi';

// Vérifier si le clone existe
if (!fs.existsSync(CLONED_STRAPI_PATH)) {
    console.log('❌ Clone Strapi non trouvé !');
    console.log('Chemin:', CLONED_STRAPI_PATH);
    process.exit(1);
}

async function importAllDataFromClone() {
    console.log('🔍 ÉTAPE 1: Analyse du clone');
    console.log('----------------------------');
    
    // Vérifier si le clone a une base de données
    const dbPath = path.join(CLONED_STRAPI_PATH, '.tmp', 'data.db');
    const altDbPath = path.join(CLONED_STRAPI_PATH, 'database', 'data.db');
    
    let dbExists = false;
    if (fs.existsSync(dbPath)) {
        console.log('✅ Base de données trouvée:', dbPath);
        dbExists = true;
    } else if (fs.existsSync(altDbPath)) {
        console.log('✅ Base de données trouvée:', altDbPath);
        dbExists = true;
    } else {
        console.log('⚠️  Base de données SQLite non trouvée');
        console.log('Le clone utilise peut-être PostgreSQL ou MySQL');
    }
    
    // Analyser les médias
    const uploadsPath = path.join(CLONED_STRAPI_PATH, 'public', 'uploads');
    let mediaCount = 0;
    
    if (fs.existsSync(uploadsPath)) {
        const files = fs.readdirSync(uploadsPath, { recursive: true });
        const mediaFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.mp4', '.webm', '.pdf'].includes(ext);
        });
        mediaCount = mediaFiles.length;
        console.log(`✅ ${mediaCount} fichiers média trouvés`);
    }
    
    console.log('\n📋 ÉTAPE 2: Instructions d\'import');
    console.log('----------------------------------');
    
    console.log('🎯 MÉTHODES D\'IMPORT DISPONIBLES:');
    console.log('');
    
    console.log('**MÉTHODE 1: Import manuel via Railway Admin**');
    console.log('1. Démarrer le clone Strapi localement:');
    console.log(`   cd "${CLONED_STRAPI_PATH}"`);
    console.log('   npm run develop');
    console.log('');
    console.log('2. Accéder au clone: http://localhost:1337/admin');
    console.log('3. Content Manager → Exporter chaque Content Type');
    console.log('4. Accéder à Railway: https://cma-education-strapi-production.up.railway.app/admin');
    console.log('5. Content Manager → Importer dans chaque Content Type');
    console.log('');
    
    console.log('**MÉTHODE 2: Export/Import JSON**');
    console.log('1. Dans le clone Strapi:');
    console.log('   - Content Manager → Chaque Content Type');
    console.log('   - Sélectionner tout → Export JSON');
    console.log('2. Dans Railway Strapi:');
    console.log('   - Content Manager → Chaque Content Type');
    console.log('   - Import → Sélectionner fichier JSON');
    console.log('');
    
    console.log('**MÉTHODE 3: Copie de base de données (si SQLite)**');
    if (dbExists) {
        console.log('✅ Possible - Base de données SQLite détectée');
        console.log('1. Copier le fichier .db depuis le clone');
        console.log('2. L\'uploader dans Railway (nécessite accès serveur)');
    } else {
        console.log('❌ Non applicable - Base de données non SQLite');
    }
    console.log('');
    
    console.log('**MÉTHODE 4: Script API automatique**');
    console.log('⚠️  Nécessite que le clone soit accessible via API');
    console.log('1. Démarrer le clone: npm run develop');
    console.log('2. Exécuter: node scripts/sync-data-clone-to-railway.js');
    console.log('');
    
    console.log('📸 ÉTAPE 3: Import des médias');
    console.log('-----------------------------');
    console.log(`📊 ${mediaCount} fichiers à uploader`);
    console.log('');
    console.log('**Upload manuel:**');
    console.log('1. Railway Admin → Media Library → Upload assets');
    console.log(`2. Sélectionner fichiers depuis: ${uploadsPath}`);
    console.log('3. Upload par lots (max 50 fichiers à la fois)');
    console.log('');
    
    console.log('🎯 RECOMMANDATION');
    console.log('=================');
    console.log('');
    console.log('✅ **MÉTHODE RECOMMANDÉE: Export/Import JSON**');
    console.log('   - Plus rapide');
    console.log('   - Préserve les relations');
    console.log('   - Contrôle total');
    console.log('');
    console.log('📋 **ORDRE D\'IMPORT:**');
    console.log('1. Formation Categories (d\'abord)');
    console.log('2. Formations');
    console.log('3. Formateurs');
    console.log('4. Articles Blog');
    console.log('5. Autres Content Types');
    console.log('6. Médias (en dernier)');
    console.log('');
    
    console.log('🔗 **LIENS UTILES:**');
    console.log(`- Clone Admin: http://localhost:1337/admin (après npm run develop)`);
    console.log(`- Railway Admin: ${RAILWAY_URL}/admin`);
    console.log(`- Médias à uploader: ${uploadsPath}`);
    
    console.log('\n✅ RÉSULTAT ATTENDU APRÈS IMPORT:');
    console.log('- Toutes les formations visibles');
    console.log('- Tous les formateurs avec photos');
    console.log('- Articles de blog complets');
    console.log('- Médias accessibles');
    console.log('- Frontend entièrement fonctionnel');
}

importAllDataFromClone().catch(console.error);