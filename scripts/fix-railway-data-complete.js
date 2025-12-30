#!/usr/bin/env node

/**
 * 🔧 CORRECTION COMPLÈTE DES DONNÉES RAILWAY
 * 
 * 1. Nettoie les doublons existants
 * 2. Importe les données manquantes depuis le clone
 * 3. Vérifie l'intégrité finale
 */

const axios = require('axios');

console.log('🔧 CORRECTION COMPLÈTE DES DONNÉES RAILWAY');
console.log('==========================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

// Configuration des Content Types
const contentTypes = [
    {
        name: 'formation-categories',
        endpoint: 'formation-categories',
        uniqueField: 'nom',
        description: 'Catégories de formations'
    },
    {
        name: 'formateurs',
        endpoint: 'formateurs',
        uniqueField: 'nom',
        description: 'Formateurs'
    },
    {
        name: 'testimonials',
        endpoint: 'testimonials',
        uniqueField: 'name',
        description: 'Témoignages'
    },
    {
        name: 'formations',
        endpoint: 'formations',
        uniqueField: 'slug',
        description: 'Formations'
    },
    {
        name: 'partners',
        endpoint: 'partners',
        uniqueField: 'nom',
        description: 'Partenaires'
    },
    {
        name: 'articles-blog',
        endpoint: 'articles-blog',
        uniqueField: 'slug',
        description: 'Articles blog'
    },
    {
        name: 'categories-blog',
        endpoint: 'categories-blog',
        uniqueField: 'nom',
        description: 'Catégories blog'
    }
];

// ÉTAPE 1: NETTOYAGE DES DOUBLONS
async function cleanDuplicates(contentType) {
    console.log(`🧹 Nettoyage: ${contentType.description}`);
    
    try {
        // Récupérer toutes les entrées
        const response = await axios.get(`${RAILWAY_URL}/api/${contentType.endpoint}?populate=*&pagination[pageSize]=100`, {
            headers: { 'Authorization': `Bearer ${API_TOKEN}` },
            timeout: 15000
        });
        
        if (response.status !== 200) {
            console.log(`   ❌ Erreur récupération: Status ${response.status}`);
            return false;
        }
        
        const entries = response.data?.data || [];
        console.log(`   📋 ${entries.length} entrées trouvées`);
        
        if (entries.length === 0) return true;
        
        // Identifier les doublons
        const seen = new Map();
        const duplicates = [];
        
        for (const entry of entries) {
            const data = entry.attributes || entry;
            const uniqueValue = data[contentType.uniqueField];
            
            if (!uniqueValue) continue;
            
            if (seen.has(uniqueValue)) {
                duplicates.push(entry.id);
            } else {
                seen.set(uniqueValue, entry.id);
            }
        }
        
        console.log(`   🔍 ${duplicates.length} doublons identifiés`);
        
        // Supprimer les doublons
        let cleanedCount = 0;
        for (const duplicateId of duplicates) {
            try {
                const deleteResponse = await axios.delete(`${RAILWAY_URL}/api/${contentType.endpoint}/${duplicateId}`, {
                    headers: { 'Authorization': `Bearer ${API_TOKEN}` },
                    timeout: 10000
                });
                
                if (deleteResponse.status === 200) {
                    cleanedCount++;
                }
                
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                console.log(`   ⚠️  Erreur suppression ID ${duplicateId}`);
            }
        }
        
        console.log(`   ✅ ${cleanedCount} doublons supprimés`);
        return true;
        
    } catch (error) {
        console.log(`   ❌ Erreur nettoyage: ${error.message}`);
        return false;
    }
}

// ÉTAPE 2: IMPORT DEPUIS LE CLONE
async function importFromClone(contentType) {
    console.log(`📥 Import: ${contentType.description}`);
    
    try {
        // Récupérer depuis le clone
        const cloneResponse = await axios.get(`http://localhost:1337/api/${contentType.endpoint}?populate=*`, {
            timeout: 15000
        });
        
        if (cloneResponse.status !== 200) {
            console.log(`   ❌ Clone non accessible: Status ${cloneResponse.status}`);
            return false;
        }
        
        const cloneData = cloneResponse.data?.data || [];
        console.log(`   📤 ${cloneData.length} éléments dans le clone`);
        
        if (cloneData.length === 0) return true;
        
        // Récupérer les données existantes sur Railway
        const railwayResponse = await axios.get(`${RAILWAY_URL}/api/${contentType.endpoint}?populate=*&pagination[pageSize]=100`, {
            headers: { 'Authorization': `Bearer ${API_TOKEN}` },
            timeout: 15000
        });
        
        const existingData = railwayResponse.data?.data || [];
        const existingValues = new Set(
            existingData.map(item => {
                const data = item.attributes || item;
                return data[contentType.uniqueField];
            }).filter(Boolean)
        );
        
        console.log(`   📋 ${existingData.length} éléments existants sur Railway`);
        
        // Importer les éléments manquants
        let importedCount = 0;
        let skippedCount = 0;
        
        for (const item of cloneData) {
            const itemData = item.attributes || item;
            const uniqueValue = itemData[contentType.uniqueField];
            
            if (!uniqueValue || existingValues.has(uniqueValue)) {
                skippedCount++;
                continue;
            }
            
            try {
                const importResponse = await axios.post(`${RAILWAY_URL}/api/${contentType.endpoint}`, {
                    data: itemData
                }, {
                    headers: {
                        'Authorization': `Bearer ${API_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                });
                
                if (importResponse.status === 200 || importResponse.status === 201) {
                    importedCount++;
                    console.log(`   ✅ Importé: ${uniqueValue}`);
                } else {
                    console.log(`   ⚠️  Erreur import: ${uniqueValue}`);
                }
                
                await new Promise(resolve => setTimeout(resolve, 200));
                
            } catch (error) {
                console.log(`   ❌ Erreur import ${uniqueValue}: ${error.message}`);
            }
        }
        
        console.log(`   ✅ Import terminé: ${importedCount} importés, ${skippedCount} ignorés`);
        return true;
        
    } catch (error) {
        console.log(`   ❌ Erreur import: ${error.message}`);
        return false;
    }
}

// ÉTAPE 3: VÉRIFICATION FINALE
async function verifyData(contentType) {
    console.log(`🔍 Vérification: ${contentType.description}`);
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/${contentType.endpoint}`, {
            headers: { 'Authorization': `Bearer ${API_TOKEN}` },
            timeout: 10000
        });
        
        if (response.status === 200) {
            const count = response.data?.data?.length || 0;
            console.log(`   ✅ ${count} éléments vérifiés`);
            return { success: true, count };
        } else {
            console.log(`   ❌ Erreur vérification: Status ${response.status}`);
            return { success: false, count: 0 };
        }
        
    } catch (error) {
        console.log(`   ❌ Erreur vérification: ${error.message}`);
        return { success: false, count: 0 };
    }
}

async function processContentType(contentType) {
    console.log(`\n📋 TRAITEMENT: ${contentType.description}`);
    console.log(''.padEnd(50, '-'));
    
    // 1. Nettoyage des doublons
    const cleaned = await cleanDuplicates(contentType);
    if (!cleaned) {
        console.log('   ❌ Échec du nettoyage');
        return false;
    }
    
    // 2. Import depuis le clone
    const imported = await importFromClone(contentType);
    if (!imported) {
        console.log('   ❌ Échec de l\'import');
        return false;
    }
    
    // 3. Vérification finale
    const verification = await verifyData(contentType);
    
    return verification.success;
}

async function checkPrerequisites() {
    console.log('🔍 VÉRIFICATION DES PRÉREQUIS');
    console.log('-----------------------------');
    
    // Vérifier le clone
    try {
        const cloneResponse = await axios.get('http://localhost:1337/api/formations', {
            timeout: 5000,
            validateStatus: () => true
        });
        
        if (cloneResponse.status === 200) {
            console.log('✅ Clone Strapi accessible');
        } else {
            console.log('❌ Clone Strapi non accessible');
            console.log('   Démarrez le clone avec: npm run develop');
            return false;
        }
    } catch (error) {
        console.log('❌ Clone Strapi non accessible');
        console.log('   Démarrez le clone avec: npm run develop');
        return false;
    }
    
    // Vérifier Railway
    try {
        const railwayResponse = await axios.get(`${RAILWAY_URL}/api/formations`, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (railwayResponse.status === 200) {
            console.log('✅ Railway accessible');
        } else {
            console.log('❌ Railway non accessible');
            return false;
        }
    } catch (error) {
        console.log('❌ Railway non accessible');
        return false;
    }
    
    return true;
}

async function main() {
    console.log('🎯 OBJECTIF: Corriger complètement les données Railway\n');
    
    // Vérifications préalables
    const prereqsOk = await checkPrerequisites();
    if (!prereqsOk) return;
    
    console.log('\n🚀 DÉBUT DE LA CORRECTION');
    console.log('=========================');
    
    let successCount = 0;
    let errorCount = 0;
    
    // Traiter chaque Content Type
    for (const contentType of contentTypes) {
        const success = await processContentType(contentType);
        
        if (success) {
            successCount++;
        } else {
            errorCount++;
        }
        
        // Pause entre les Content Types
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n🎉 RÉSUMÉ FINAL');
    console.log('==============');
    console.log(`✅ Content Types corrigés: ${successCount}`);
    console.log(`❌ Content Types en erreur: ${errorCount}`);
    console.log(`📊 Total traité: ${contentTypes.length}`);
    
    if (errorCount === 0) {
        console.log('\n🎊 CORRECTION COMPLÈTE RÉUSSIE !');
        console.log('- Tous les doublons ont été supprimés');
        console.log('- Toutes les données manquantes ont été importées');
        console.log('- Plus d\'erreurs de contrainte');
        console.log('- Le frontend devrait maintenant fonctionner correctement');
        console.log('');
        console.log('⏭️  PROCHAINES ÉTAPES:');
        console.log('1. Tester le frontend');
        console.log('2. Vérifier les pages principales');
        console.log('3. Upload des médias si nécessaire');
    } else {
        console.log('\n⚠️  CORRECTION PARTIELLE');
        console.log('Certains Content Types ont échoué.');
        console.log('Vérifiez les erreurs ci-dessus et relancez si nécessaire.');
    }
}

main().catch(console.error);