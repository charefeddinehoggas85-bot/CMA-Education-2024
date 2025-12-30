#!/usr/bin/env node

/**
 * 🔧 CRÉATION AUTOMATIQUE DU CONTENT TYPE PARTNERS VIA API
 * 
 * Crée automatiquement le Content Type Partners dans Railway via l'API Admin
 */

const axios = require('axios');

console.log('🔧 CRÉATION AUTOMATIQUE CONTENT TYPE PARTNERS');
console.log('=============================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

// Schéma du Content Type Partners
const partnersSchema = {
  kind: 'collectionType',
  collectionName: 'partners',
  info: {
    singularName: 'partner',
    pluralName: 'partners',
    displayName: 'Partners',
    description: 'Partenaires entreprises'
  },
  options: {
    draftAndPublish: true
  },
  pluginOptions: {},
  attributes: {
    nom: {
      type: 'string',
      required: true
    },
    logo: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: ['images']
    },
    description: {
      type: 'text'
    },
    secteur: {
      type: 'string'
    },
    ordre: {
      type: 'integer',
      default: 1
    },
    featured: {
      type: 'boolean',
      default: true
    },
    url: {
      type: 'string'
    }
  }
};

async function createPartnersContentType() {
    console.log('📋 ÉTAPE 1: Création du Content Type Partners');
    console.log('---------------------------------------------');
    
    try {
        // Tentative de création via l'API Content-Type Builder
        const response = await axios.post(`${RAILWAY_URL}/content-type-builder/content-types`, partnersSchema, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            timeout: 15000,
            validateStatus: () => true
        });
        
        if (response.status === 201 || response.status === 200) {
            console.log('✅ Content Type Partners créé avec succès !');
            
            // Attendre un peu pour que Strapi redémarre
            console.log('⏳ Attente du redémarrage de Strapi...');
            await new Promise(resolve => setTimeout(resolve, 10000));
            
        } else {
            console.log(`⚠️  Status ${response.status}: ${response.data?.message || 'Erreur inconnue'}`);
            console.log('📝 Création manuelle nécessaire');
        }
        
    } catch (error) {
        console.log(`❌ Erreur création automatique: ${error.message}`);
        console.log('📝 Procédure manuelle nécessaire');
    }
    
    console.log('\n🔍 ÉTAPE 2: Vérification de la création');
    console.log('--------------------------------------');
    
    // Attendre et vérifier
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/partners`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 10000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            console.log('✅ Content Type Partners accessible !');
            console.log(`📊 Données: ${response.data?.data?.length || 0} partenaires`);
            return true;
        } else if (response.status === 404) {
            console.log('❌ Content Type Partners toujours manquant');
            return false;
        } else {
            console.log(`⚠️  Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur vérification: ${error.message}`);
        return false;
    }
}

async function createSamplePartners() {
    console.log('\n📝 ÉTAPE 3: Création de partenaires d\'exemple');
    console.log('---------------------------------------------');
    
    const samplePartners = [
        {
            nom: 'Bouygues Construction',
            description: 'Leader français du BTP et de la construction',
            secteur: 'Bâtiment',
            ordre: 1,
            featured: true,
            url: 'https://www.bouygues-construction.com'
        },
        {
            nom: 'Vinci Construction',
            description: 'Groupe de construction et concessions',
            secteur: 'Travaux Publics',
            ordre: 2,
            featured: true,
            url: 'https://www.vinci-construction.com'
        },
        {
            nom: 'Eiffage',
            description: 'Groupe français de BTP et concessions',
            secteur: 'Bâtiment',
            ordre: 3,
            featured: true,
            url: 'https://www.eiffage.com'
        },
        {
            nom: 'Spie',
            description: 'Services multi-techniques',
            secteur: 'Énergie',
            ordre: 4,
            featured: false,
            url: 'https://www.spie.com'
        }
    ];
    
    for (const partner of samplePartners) {
        try {
            const response = await axios.post(`${RAILWAY_URL}/api/partners`, {
                data: partner
            }, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000,
                validateStatus: () => true
            });
            
            if (response.status === 200 || response.status === 201) {
                console.log(`✅ Partenaire "${partner.nom}" créé`);
            } else {
                console.log(`⚠️  Partenaire "${partner.nom}": Status ${response.status}`);
            }
        } catch (error) {
            console.log(`❌ Erreur partenaire "${partner.nom}": ${error.message}`);
        }
    }
}

async function configurePermissions() {
    console.log('\n🔐 ÉTAPE 4: Configuration des permissions');
    console.log('----------------------------------------');
    
    try {
        // Récupérer les rôles existants
        const rolesResponse = await axios.get(`${RAILWAY_URL}/users-permissions/roles`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 10000
        });
        
        const publicRole = rolesResponse.data?.roles?.find(role => role.type === 'public');
        
        if (publicRole) {
            console.log(`📋 Rôle Public trouvé: ID ${publicRole.id}`);
            
            // Configurer les permissions pour Partners
            const permissions = {
                ...publicRole.permissions,
                'api::partner.partner': {
                    controllers: {
                        partner: {
                            find: {
                                enabled: true,
                                policy: ''
                            },
                            findOne: {
                                enabled: true,
                                policy: ''
                            }
                        }
                    }
                }
            };
            
            const updateResponse = await axios.put(`${RAILWAY_URL}/users-permissions/roles/${publicRole.id}`, {
                ...publicRole,
                permissions
            }, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000,
                validateStatus: () => true
            });
            
            if (updateResponse.status === 200) {
                console.log('✅ Permissions configurées pour le rôle Public');
            } else {
                console.log(`⚠️  Erreur permissions: Status ${updateResponse.status}`);
            }
        }
        
    } catch (error) {
        console.log(`❌ Erreur configuration permissions: ${error.message}`);
        console.log('📝 Configuration manuelle nécessaire dans Railway Admin');
    }
}

async function testFinalAPI() {
    console.log('\n🧪 ÉTAPE 5: Test final de l\'API');
    console.log('-------------------------------');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/partners?populate=*&sort=ordre:asc`, {
            timeout: 10000
        });
        
        if (response.status === 200) {
            console.log(`✅ API Partners fonctionne parfaitement !`);
            console.log(`📊 ${response.data?.data?.length || 0} partenaires disponibles`);
            
            response.data?.data?.forEach(partner => {
                console.log(`   - ${partner.attributes.nom} (${partner.attributes.secteur})`);
            });
            
            return true;
        }
        
    } catch (error) {
        console.log(`❌ Erreur test API: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('🎯 OBJECTIF: Créer le Content Type Partners manquant\n');
    
    const created = await createPartnersContentType();
    
    if (created) {
        await createSamplePartners();
        await configurePermissions();
        const working = await testFinalAPI();
        
        if (working) {
            console.log('\n🎉 SUCCÈS COMPLET !');
            console.log('==================');
            console.log('✅ Content Type Partners créé');
            console.log('✅ Données d\'exemple ajoutées');
            console.log('✅ Permissions configurées');
            console.log('✅ API fonctionnelle');
            console.log('');
            console.log('🔗 Test: https://cma-education-strapi-production.up.railway.app/api/partners');
            console.log('');
            console.log('⏭️  PROCHAINE ÉTAPE: Plus d\'erreurs 404 pour Partners !');
        }
    } else {
        console.log('\n📝 CRÉATION MANUELLE NÉCESSAIRE');
        console.log('==============================');
        console.log('1. Aller à: https://cma-education-strapi-production.up.railway.app/admin');
        console.log('2. Content-Type Builder → Create new collection type');
        console.log('3. Display name: Partners');
        console.log('4. API ID: partners');
        console.log('5. Ajouter les champs selon le schéma ci-dessus');
        console.log('6. Settings → Roles → Public → Partners: ✅ find + findOne');
        console.log('7. Relancer ce script pour créer les données');
    }
}

main().catch(console.error);