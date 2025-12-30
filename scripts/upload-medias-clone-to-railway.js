#!/usr/bin/env node

/**
 * 🚀 UPLOAD MÉDIAS CLONE → RAILWAY
 * 
 * Transfère automatiquement les médias manquants du clone vers Railway
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

console.log('🚀 UPLOAD MÉDIAS CLONE → RAILWAY');
console.log('===============================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const CLONE_URL = 'http://localhost:1337';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

async function getCloneMedias() {
    console.log('📁 ÉTAPE 1: Récupération médias du clone');
    console.log('---------------------------------------');
    
    try {
        const response = await axios.get(`${CLONE_URL}/api/upload/files`, {
            timeout: 10000
        });
        
        const files = response.data || [];
        console.log(`✅ Clone: ${files.length} médias trouvés`);
        
        return files;
        
    } catch (error) {
        console.log(`❌ Erreur clone: ${error.message}`);
        console.log('💡 Vérifiez que le clone est démarré sur localhost:1337');
        return [];
    }
}

async function getRailwayMedias() {
    console.log('\n🚀 ÉTAPE 2: Récupération médias Railway');
    console.log('--------------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/upload/files`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 10000
        });
        
        const files = response.data || [];
        console.log(`✅ Railway: ${files.length} médias trouvés`);
        
        return files;
        
    } catch (error) {
        console.log(`❌ Erreur Railway: ${error.message}`);
        return [];
    }
}

async function findMissingMedias(cloneMedias, railwayMedias) {
    console.log('\n🔍 ÉTAPE 3: Identification médias manquants');
    console.log('------------------------------------------');
    
    const railwayNames = new Set(railwayMedias.map(f => f.name));
    const missingMedias = cloneMedias.filter(media => !railwayNames.has(media.name));
    
    console.log(`❌ Médias manquants dans Railway: ${missingMedias.length}`);
    
    if (missingMedias.length > 0) {
        console.log('\n📋 Exemples de médias manquants:');
        missingMedias.slice(0, 10).forEach(media => {
            console.log(`   - ${media.name} (${(media.size / 1024).toFixed(1)} KB)`);
        });
        
        if (missingMedias.length > 10) {
            console.log(`   ... et ${missingMedias.length - 10} autres`);
        }
    }
    
    return missingMedias;
}

async function downloadMediaFromClone(media) {
    try {
        const mediaUrl = `${CLONE_URL}${media.url}`;
        
        const response = await axios.get(mediaUrl, {
            responseType: 'stream',
            timeout: 30000
        });
        
        return response.data;
        
    } catch (error) {
        console.log(`   ❌ Erreur téléchargement ${media.name}: ${error.message}`);
        return null;
    }
}

async function uploadMediaToRailway(media, fileStream) {
    try {
        const form = new FormData();
        form.append('files', fileStream, {
            filename: media.name,
            contentType: media.mime
        });
        
        const response = await axios.post(`${RAILWAY_URL}/api/upload`, form, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                ...form.getHeaders()
            },
            timeout: 60000,
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
        
        if (response.status === 200) {
            return response.data[0];
        } else {
            return null;
        }
        
    } catch (error) {
        console.log(`   ❌ Erreur upload ${media.name}: ${error.message}`);
        return null;
    }
}

async function uploadMissingMedias(missingMedias) {
    console.log('\n📤 ÉTAPE 4: Upload des médias manquants');
    console.log('-------------------------------------');
    
    if (missingMedias.length === 0) {
        console.log('✅ Aucun média à uploader');
        return { success: 0, errors: 0 };
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    console.log(`🚀 Début upload de ${missingMedias.length} médias...\n`);
    
    for (let i = 0; i < missingMedias.length; i++) {
        const media = missingMedias[i];
        const progress = `[${i + 1}/${missingMedias.length}]`;
        
        console.log(`${progress} Upload: ${media.name}`);
        
        // 1. Télécharger depuis le clone
        const fileStream = await downloadMediaFromClone(media);
        
        if (!fileStream) {
            errorCount++;
            continue;
        }
        
        // 2. Upload vers Railway
        const uploadResult = await uploadMediaToRailway(media, fileStream);
        
        if (uploadResult) {
            successCount++;
            console.log(`   ✅ Succès (${(media.size / 1024).toFixed(1)} KB)`);
        } else {
            errorCount++;
        }
        
        // Pause entre les uploads pour éviter la surcharge
        if (i < missingMedias.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    
    console.log(`\n📊 Upload terminé:`);
    console.log(`   ✅ Succès: ${successCount}`);
    console.log(`   ❌ Erreurs: ${errorCount}`);
    
    return { success: successCount, errors: errorCount };
}

async function verifyUpload() {
    console.log('\n🔍 ÉTAPE 5: Vérification finale');
    console.log('------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/upload/files`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 10000
        });
        
        const files = response.data || [];
        console.log(`✅ Railway après upload: ${files.length} médias`);
        
        return files.length;
        
    } catch (error) {
        console.log(`❌ Erreur vérification: ${error.message}`);
        return 0;
    }
}

async function main() {
    console.log('🎯 OBJECTIF: Synchroniser tous les médias du clone vers Railway\n');
    
    // 1. Récupérer les médias des deux côtés
    const cloneMedias = await getCloneMedias();
    const railwayMedias = await getRailwayMedias();
    
    if (cloneMedias.length === 0) {
        console.log('\n❌ ARRÊT: Clone non accessible ou vide');
        console.log('Démarrez le clone: cd "D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi" && npm run develop');
        return;
    }
    
    // 2. Identifier les médias manquants
    const missingMedias = await findMissingMedias(cloneMedias, railwayMedias);
    
    // 3. Upload des médias manquants
    const uploadResult = await uploadMissingMedias(missingMedias);
    
    // 4. Vérification finale
    const finalCount = await verifyUpload();
    
    console.log('\n🎉 RÉSUMÉ FINAL');
    console.log('==============');
    console.log(`📁 Clone: ${cloneMedias.length} médias`);
    console.log(`🚀 Railway avant: ${railwayMedias.length} médias`);
    console.log(`🚀 Railway après: ${finalCount} médias`);
    console.log(`📤 Uploadés: ${uploadResult.success} médias`);
    console.log(`❌ Erreurs: ${uploadResult.errors} médias`);
    
    if (finalCount >= cloneMedias.length) {
        console.log('\n🎊 SYNCHRONISATION COMPLÈTE !');
        console.log('Tous les médias sont maintenant disponibles dans Railway');
    } else {
        console.log('\n⚠️  SYNCHRONISATION PARTIELLE');
        console.log('Certains médias n\'ont pas pu être transférés');
        console.log('Vous pouvez relancer le script ou les uploader manuellement');
    }
    
    console.log('\n🔗 LIENS UTILES:');
    console.log(`- Railway Media Library: ${RAILWAY_URL}/admin/content-manager/collectionType/plugin::upload.file`);
    console.log(`- Clone Media Library: ${CLONE_URL}/admin/content-manager/collectionType/plugin::upload.file`);
}

main().catch(console.error);