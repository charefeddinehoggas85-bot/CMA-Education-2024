#!/usr/bin/env node

/**
 * 🧹 NETTOYAGE DES ENTRÉES DUPLIQUÉES
 * 
 * Nettoie les entrées dupliquées qui causent les erreurs de contrainte
 * dans la base de données Railway
 */

const axios = require('axios');

console.log('🧹 NETTOYAGE DES ENTRÉES DUPLIQUÉES');
console.log('===================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

// Content Types à nettoyer
const contentTypesToClean = [
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
    }
];

async function getAllEntries(contentType) {
    console.log(`📋 Récupération de toutes les entrées: ${contentType.description}`);
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/${contentType.endpoint}?populate=*&pagination[pageSize]=100`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 15000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            const entries = response.data?.data || [];
            console.log(`   ✅ ${entries.length} entrées trouvées`);
            return entries;
        } else {
            console.log(`   ❌ Erreur récupération: Status ${response.status}`);
            return [];
        }
        
    } catch (error) {
        console.log(`   ❌ Erreur récupération: ${error.message}`);
        return [];
    }
}

async function findDuplicates(entries, uniqueField) {
    console.log(`🔍 Recherche des doublons par champ: ${uniqueField}`);
    
    const seen = new Map();
    const duplicates = [];
    
    for (const entry of entries) {
        const data = entry.attributes || entry;
        const uniqueValue = data[uniqueField];
        
        if (!uniqueValue) {
            console.log(`   ⚠️  Entrée sans ${uniqueField}: ID ${entry.id}`);
            continue;
        }
        
        if (seen.has(uniqueValue)) {
            // C'est un doublon
            duplicates.push({
                id: entry.id,
                uniqueValue,
                originalId: seen.get(uniqueValue)
            });
            console.log(`   🔍 Doublon trouvé: "${uniqueValue}" (ID ${entry.id}, original ID ${seen.get(uniqueValue)})`);
        } else {
            seen.set(uniqueValue, entry.id);
        }
    }
    
    console.log(`   📊 ${duplicates.length} doublons identifiés`);
    return duplicates;
}

async function deleteDuplicate(contentType, duplicateId) {
    try {
        const response = await axios.delete(`${RAILWAY_URL}/api/${contentType.endpoint}/${duplicateId}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log(`   ✅ Doublon supprimé: ID ${duplicateId}`);
            return true;
        } else {
            console.log(`   ❌ Erreur suppression ID ${duplicateId}: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`   ❌ Erreur suppression ID ${duplicateId}: ${error.message}`);
        return false;
    }
}

async function cleanContentType(contentType) {
    console.log(`\n🧹 NETTOYAGE: ${contentType.description}`);
    console.log(''.padEnd(50, '-'));
    
    // 1. Récupérer toutes les entrées
    const entries = await getAllEntries(contentType);
    
    if (entries.length === 0) {
        console.log('   ⚠️  Aucune entrée trouvée');
        return { cleaned: 0, errors: 0 };
    }
    
    // 2. Identifier les doublons
    const duplicates = await findDuplicates(entries, contentType.uniqueField);
    
    if (duplicates.length === 0) {
        console.log('   ✅ Aucun doublon trouvé');
        return { cleaned: 0, errors: 0 };
    }
    
    // 3. Supprimer les doublons
    console.log(`🗑️  Suppression de ${duplicates.length} doublons...`);
    
    let cleanedCount = 0;
    let errorCount = 0;
    
    for (const duplicate of duplicates) {
        const success = await deleteDuplicate(contentType, duplicate.id);
        
        if (success) {
            cleanedCount++;
        } else {
            errorCount++;
        }
        
        // Pause entre les suppressions
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log(`   ✅ Nettoyage terminé: ${cleanedCount} supprimés, ${errorCount} erreurs`);
    return { cleaned: cleanedCount, errors: errorCount };
}

async function verifyCleanup(contentType) {
    console.log(`🔍 Vérification post-nettoyage: ${contentType.description}`);
    
    const entries = await getAllEntries(contentType);
    const duplicates = await findDuplicates(entries, contentType.uniqueField);
    
    if (duplicates.length === 0) {
        console.log('   ✅ Plus de doublons détectés');
        return true;
    } else {
        console.log(`   ⚠️  ${duplicates.length} doublons restants`);
        return false;
    }
}

async function main() {
    console.log('🎯 OBJECTIF: Nettoyer les entrées dupliquées causant les erreurs de contrainte\n');
    
    let totalCleaned = 0;
    let totalErrors = 0;
    let successfulCleanups = 0;
    
    // Nettoyer chaque Content Type
    for (const contentType of contentTypesToClean) {
        const result = await cleanContentType(contentType);
        
        totalCleaned += result.cleaned;
        totalErrors += result.errors;
        
        // Vérification
        const verified = await verifyCleanup(contentType);
        if (verified) {
            successfulCleanups++;
        }
        
        // Pause entre les Content Types
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n🎉 RÉSUMÉ FINAL');
    console.log('==============');
    console.log(`🧹 Total entrées supprimées: ${totalCleaned}`);
    console.log(`❌ Total erreurs: ${totalErrors}`);
    console.log(`✅ Content Types nettoyés: ${successfulCleanups}/${contentTypesToClean.length}`);
    
    if (totalErrors === 0 && successfulCleanups === contentTypesToClean.length) {
        console.log('\n🎊 NETTOYAGE COMPLET RÉUSSI !');
        console.log('- Tous les doublons ont été supprimés');
        console.log('- Plus d\'erreurs de contrainte attendues');
        console.log('- L\'import peut maintenant fonctionner correctement');
        console.log('');
        console.log('⏭️  PROCHAINES ÉTAPES:');
        console.log('1. Relancer l\'import des données');
        console.log('2. Vérifier que tout fonctionne');
        console.log('3. Tester le frontend');
    } else {
        console.log('\n⚠️  NETTOYAGE PARTIEL');
        console.log('Certains doublons n\'ont pas pu être supprimés.');
        console.log('Vérifiez les erreurs ci-dessus et relancez si nécessaire.');
    }
}

main().catch(console.error);