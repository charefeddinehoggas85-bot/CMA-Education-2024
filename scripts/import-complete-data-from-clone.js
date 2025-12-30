#!/usr/bin/env node

/**
 * 🚀 IMPORT COMPLET DES DONNÉES DEPUIS LE CLONE VERS RAILWAY
 * 
 * Importe automatiquement toutes les données depuis le clone Strapi local
 * vers Railway en respectant l'ordre des dépendances
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

console.log('🚀 IMPORT COMPLET DONNÉES CLONE → RAILWAY');
console.log('========================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const CLONE_PATH = 'D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

// Ordre d'import respectant les dépendances
const importOrder = [
    // 1. Content Types sans dépendances
    { 
        name: 'formation-categories', 
        endpoint: 'formation-categories',
        description: 'Catégories de formations (base)'
    },
    { 
        name: 'formateurs', 
        endpoint: 'formateurs',
        description: 'Formateurs'
    },
    { 
        name: 'categories-blog', 
        endpoint: 'categories-blog',
        description: 'Catégories blog'
    },
    
    // 2. Content Types avec dépendances simples
    { 
        name: 'formations', 
        endpoint: 'formations',
        description: 'Formations (dépend des catégories)'
    },
    { 
        name: 'articles-blog', 
        endpoint: 'articles-blog',
        description: 'Articles blog (dépend des catégories)'
    },
    
    // 3. Content Types indépendants
    { 
        name: 'partners', 
        endpoint: 'partners',
        description: 'Partenaires entreprises'
    },
    { 
        name: 'testimonials', 
        endpoint: 'testimonials',
        description: 'Témoignages'
    },
    { 
        name: 'statistiques-site', 
        endpoint: 'statistiques-site',
        description: 'Statistiques du site'
    },
    
    // 4. Single Types
    { 
        name: 'site-setting', 
        endpoint: 'site-setting',
        description: 'Configuration du site',
        singleType: true
    },
    { 
        name: 'page-vae', 
        endpoint: 'page-vae',
        description: 'Page VAE',
        singleType: true
    },
    { 
        name: 'page-entreprise', 
        endpoint: 'page-entreprise',
        description: 'Page Entreprises',
        singleType: true
    },
    { 
        name: 'page-partenaires', 
        endpoint: 'page-partenaires',
        description: 'Page Partenaires',
        singleType: true
    }
];

async function checkCloneAccess() {
    console.log('🔍 ÉTAPE 1: Vérification accès au clone Strapi');
    console.log('---------------------------------------------');
    
    try {
        // Vérifier si le clone est accessible
        const response = await axios.get('http://localhost:1337/api/formations', {
            timeout: 5000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log(`✅ Clone Strapi accessible: ${response.data?.data?.length || 0} formations`);
            return true;
        } else {
            console.log(`❌ Clone Strapi non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Clone Strapi non accessible: ${error.message}`);
        console.log('');
        console.log('📝 ACTIONS REQUISES:');
        console.log('1. Ouvrir un terminal dans le clone:');
        console.log(`   cd "${CLONE_PATH}"`);
        console.log('2. Démarrer le clone:');
        console.log('   npm run develop');
        console.log('3. Attendre que le clone soit accessible sur http://localhost:1337');
        console.log('4. Relancer ce script');
        return false;
    }
}

async function checkRailwayAccess() {
    console.log('\n🔍 ÉTAPE 2: Vérification accès Railway');
    console.log('------------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/formations`, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log(`✅ Railway accessible: ${response.data?.data?.length || 0} formations`);
            return true;
        } else {
            console.log(`❌ Railway non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Railway non accessible: ${error.message}`);
        return false;
    }
}

async function exportFromClone(contentType) {
    console.log(`📤 Export depuis clone: ${contentType.description}`);
    
    try {
        const response = await axios.get(`http://localhost:1337/api/${contentType.endpoint}?populate=*`, {
            timeout: 15000
        });
        
        if (response.status === 200) {
            const data = response.data?.data;
            if (contentType.singleType) {
                console.log(`   ✅ Données exportées: Single Type`);
                return data;
            } else {
                console.log(`   ✅ Données exportées: ${data?.length || 0} éléments`);
                return data;
            }
        } else {
            console.log(`   ❌ Erreur export: Status ${response.status}`);
            return null;
        }
        
    } catch (error) {
        console.log(`   ❌ Erreur export: ${error.message}`);
        return null;
    }
}

async function getExistingData(contentType) {
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/${contentType.endpoint}?populate=*`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            return response.data?.data || [];
        }
        return [];
    } catch (error) {
        console.log(`   ⚠️  Erreur récupération données existantes: ${error.message}`);
        return [];
    }
}

async function importToRailway(contentType, data) {
    console.log(`📥 Import vers Railway: ${contentType.description}`);
    
    if (!data) {
        console.log('   ⚠️  Aucune donnée à importer');
        return false;
    }
    
    try {
        if (contentType.singleType) {
            // Single Type - PUT (remplace toujours)
            const response = await axios.put(`${RAILWAY_URL}/api/${contentType.endpoint}`, {
                data: data.attributes || data
            }, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 15000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                console.log('   ✅ Single Type importé avec succès');
                return true;
            } else {
                console.log(`   ❌ Erreur import: Status ${response.status}`);
                console.log(`   📝 Réponse: ${JSON.stringify(response.data, null, 2)}`);
                return false;
            }
            
        } else {
            // Collection Type - Vérifier les doublons
            console.log('   🔍 Vérification des données existantes...');
            const existingData = await getExistingData(contentType);
            
            let successCount = 0;
            let skipCount = 0;
            let errorCount = 0;
            
            for (const item of data) {
                try {
                    const itemData = item.attributes || item;
                    
                    // Vérifier si l'élément existe déjà (par nom, titre, slug, etc.)
                    const isDuplicate = existingData.some(existing => {
                        const existingData = existing.attributes || existing;
                        
                        // Vérification par différents champs uniques
                        if (itemData.slug && existingData.slug === itemData.slug) return true;
                        if (itemData.nom && existingData.nom === itemData.nom) return true;
                        if (itemData.titre && existingData.titre === itemData.titre) return true;
                        if (itemData.title && existingData.title === itemData.title) return true;
                        if (itemData.name && existingData.name === itemData.name) return true;
                        if (itemData.email && existingData.email === itemData.email) return true;
                        
                        return false;
                    });
                    
                    if (isDuplicate) {
                        skipCount++;
                        console.log(`   ⏭️  Élément existant ignoré: ${itemData.nom || itemData.titre || itemData.title || itemData.name || 'Sans nom'}`);
                        continue;
                    }
                    
                    // Créer le nouvel élément
                    const response = await axios.post(`${RAILWAY_URL}/api/${contentType.endpoint}`, {
                        data: itemData
                    }, {
                        headers: {
                            'Authorization': `Bearer ${API_TOKEN}`,
                            'Content-Type': 'application/json'
                        },
                        timeout: 10000,
                        validateStatus: () => true
                    });
                    
                    if (response.status === 200 || response.status === 201) {
                        successCount++;
                        console.log(`   ✅ Créé: ${itemData.nom || itemData.titre || itemData.title || itemData.name || 'Sans nom'}`);
                    } else {
                        errorCount++;
                        console.log(`   ❌ Erreur création: Status ${response.status} - ${itemData.nom || itemData.titre || itemData.title || itemData.name || 'Sans nom'}`);
                        if (response.data?.error) {
                            console.log(`   📝 Détail erreur: ${JSON.stringify(response.data.error, null, 2)}`);
                        }
                    }
                    
                    // Pause entre les requêtes
                    await new Promise(resolve => setTimeout(resolve, 200));
                    
                } catch (error) {
                    errorCount++;
                    console.log(`   ❌ Erreur item: ${error.message}`);
                }
            }
            
            console.log(`   ✅ Import terminé: ${successCount} créés, ${skipCount} ignorés, ${errorCount} erreurs`);
            return successCount > 0 || skipCount > 0;
        }
        
    } catch (error) {
        console.log(`   ❌ Erreur import: ${error.message}`);
        return false;
    }
}

async function verifyImport(contentType) {
    console.log(`🔍 Vérification: ${contentType.description}`);
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/${contentType.endpoint}`, {
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            if (contentType.singleType) {
                console.log('   ✅ Single Type vérifié');
            } else {
                const count = response.data?.data?.length || 0;
                console.log(`   ✅ ${count} éléments vérifiés`);
            }
            return true;
        } else {
            console.log(`   ❌ Erreur vérification: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`   ❌ Erreur vérification: ${error.message}`);
        return false;
    }
}

async function processContentType(contentType) {
    console.log(`\n📋 TRAITEMENT: ${contentType.description}`);
    console.log(''.padEnd(50, '-'));
    
    // 1. Export depuis le clone
    const data = await exportFromClone(contentType);
    
    if (!data) {
        console.log('   ⚠️  Aucune donnée trouvée dans le clone');
        return false;
    }
    
    // 2. Import vers Railway
    const imported = await importToRailway(contentType, data);
    
    if (!imported) {
        console.log('   ❌ Échec de l\'import');
        return false;
    }
    
    // 3. Vérification
    const verified = await verifyImport(contentType);
    
    return verified;
}

async function main() {
    console.log('🎯 OBJECTIF: Importer toutes les données du clone vers Railway\n');
    
    // Vérifications préalables
    const cloneOk = await checkCloneAccess();
    if (!cloneOk) return;
    
    const railwayOk = await checkRailwayAccess();
    if (!railwayOk) return;
    
    console.log('\n🚀 DÉBUT DE L\'IMPORT AUTOMATIQUE');
    console.log('=================================');
    
    let successCount = 0;
    let errorCount = 0;
    
    // Traitement de chaque Content Type dans l'ordre
    for (const contentType of importOrder) {
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
    console.log(`✅ Content Types importés avec succès: ${successCount}`);
    console.log(`❌ Content Types en erreur: ${errorCount}`);
    console.log(`📊 Total traité: ${importOrder.length}`);
    
    if (errorCount === 0) {
        console.log('\n🎊 IMPORT COMPLET RÉUSSI !');
        console.log('- Toutes les données ont été transférées');
        console.log('- Railway contient maintenant toutes les données du clone');
        console.log('- Plus d\'erreurs 404 sur le frontend');
        console.log('');
        console.log('⏭️  PROCHAINES ÉTAPES:');
        console.log('1. Upload des médias (images, fichiers)');
        console.log('2. Test complet du frontend');
        console.log('3. Configuration des permissions finales');
    } else {
        console.log('\n⚠️  IMPORT PARTIEL');
        console.log('Certains Content Types ont échoué.');
        console.log('Vérifiez les erreurs ci-dessus et relancez si nécessaire.');
    }
}

main().catch(console.error);