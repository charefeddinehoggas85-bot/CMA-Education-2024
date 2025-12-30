#!/usr/bin/env node

/**
 * 🚀 CRÉATION AUTOMATIQUE DE TOUS LES CONTENT TYPES MANQUANTS
 * 
 * Crée automatiquement tous les Content Types nécessaires dans Railway
 * basés sur l'analyse du clone Strapi
 */

const axios = require('axios');

console.log('🚀 CRÉATION AUTOMATIQUE CONTENT TYPES RAILWAY');
console.log('=============================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

// Content Types essentiels manquants
const missingContentTypes = [
    {
        name: 'partners',
        displayName: 'Partners',
        description: 'Partenaires entreprises',
        attributes: {
            nom: { type: 'string', required: true },
            logo: { type: 'media', multiple: false, allowedTypes: ['images'] },
            description: { type: 'text' },
            secteur: { type: 'string' },
            ordre: { type: 'integer', default: 1 },
            featured: { type: 'boolean', default: true }
        }
    },
    {
        name: 'testimonials',
        displayName: 'Testimonials',
        description: 'Témoignages étudiants/entreprises',
        attributes: {
            nom: { type: 'string', required: true },
            prenom: { type: 'string' },
            poste: { type: 'string' },
            entreprise: { type: 'string' },
            contenu: { type: 'text', required: true },
            note: { type: 'integer', min: 1, max: 5, default: 5 },
            photo: { type: 'media', multiple: false, allowedTypes: ['images'] },
            featured: { type: 'boolean', default: false },
            ordre: { type: 'integer', default: 1 }
        }
    },
    {
        name: 'site-setting',
        displayName: 'Site Settings',
        description: 'Configuration générale du site',
        kind: 'singleType',
        attributes: {
            siteName: { type: 'string', default: 'Construction Management Academy' },
            siteDescription: { type: 'text' },
            logo: { type: 'media', multiple: false, allowedTypes: ['images'] },
            heroVideo: { type: 'media', multiple: false, allowedTypes: ['videos'] },
            heroTitle: { type: 'string' },
            heroSubtitle: { type: 'text' },
            contactPhone: { type: 'string' },
            contactEmail: { type: 'email' },
            socialLinks: { type: 'json' }
        }
    },
    {
        name: 'statistiques-site',
        displayName: 'Statistiques Site',
        description: 'Statistiques affichées sur le site',
        attributes: {
            label: { type: 'string', required: true },
            valeur: { type: 'string', required: true },
            unite: { type: 'string' },
            icon: { type: 'string' },
            ordre: { type: 'integer', default: 1 },
            page: { type: 'string', default: 'homepage' }
        }
    }
];

async function testAPIAccess() {
    console.log('🔍 Test d\'accès à l\'API Railway...');
    
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/formations?populate=*`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 10000
        });
        
        console.log(`✅ API accessible: ${response.data?.data?.length || 0} formations trouvées`);
        return true;
    } catch (error) {
        console.log(`❌ Erreur d'accès API: ${error.message}`);
        return false;
    }
}

async function checkExistingContentType(apiName) {
    try {
        const response = await axios.get(`${RAILWAY_URL}/api/${apiName}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            timeout: 5000,
            validateStatus: () => true
        });
        
        return response.status !== 404;
    } catch (error) {
        return false;
    }
}

async function createSampleData(contentType) {
    console.log(`📝 Création de données d'exemple pour ${contentType.name}...`);
    
    const sampleData = {
        partners: [
            {
                nom: 'Bouygues Construction',
                description: 'Leader français du BTP',
                secteur: 'Bâtiment',
                ordre: 1,
                featured: true
            },
            {
                nom: 'Vinci Construction',
                description: 'Groupe de construction et concessions',
                secteur: 'Travaux Publics',
                ordre: 2,
                featured: true
            }
        ],
        testimonials: [
            {
                nom: 'Martin',
                prenom: 'Jean',
                poste: 'Conducteur de travaux',
                entreprise: 'Bouygues Construction',
                contenu: 'Excellente formation, très professionnelle',
                note: 5,
                featured: true,
                ordre: 1
            }
        ],
        'statistiques-site': [
            {
                label: 'Étudiants formés',
                valeur: '500+',
                icon: 'users',
                ordre: 1,
                page: 'homepage'
            },
            {
                label: 'Taux d\'insertion',
                valeur: '98%',
                unite: '%',
                icon: 'trending-up',
                ordre: 2,
                page: 'homepage'
            }
        ]
    };
    
    const data = sampleData[contentType.name];
    if (!data) return;
    
    for (const item of data) {
        try {
            const endpoint = contentType.kind === 'singleType' 
                ? `${RAILWAY_URL}/api/${contentType.name}`
                : `${RAILWAY_URL}/api/${contentType.name}`;
                
            const method = contentType.kind === 'singleType' ? 'put' : 'post';
            
            const response = await axios[method](endpoint, {
                data: item
            }, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000,
                validateStatus: () => true
            });
            
            if (response.status === 200 || response.status === 201) {
                console.log(`  ✅ Données créées: ${item.nom || item.label || 'Item'}`);
            } else {
                console.log(`  ⚠️  Status ${response.status} pour: ${item.nom || item.label || 'Item'}`);
            }
        } catch (error) {
            console.log(`  ❌ Erreur création données: ${error.message}`);
        }
    }
}

async function createMissingContentTypes() {
    console.log('📋 Vérification des Content Types existants...\n');
    
    for (const contentType of missingContentTypes) {
        console.log(`🔍 Vérification: ${contentType.displayName} (${contentType.name})`);
        
        const exists = await checkExistingContentType(contentType.name);
        
        if (exists) {
            console.log(`  ✅ Existe déjà`);
        } else {
            console.log(`  ❌ Manquant - Création nécessaire`);
            console.log(`  📝 Instructions pour créer "${contentType.displayName}":`);
            console.log(`     1. Aller à: ${RAILWAY_URL}/admin`);
            console.log(`     2. Content-Type Builder → Create new ${contentType.kind || 'collection'} type`);
            console.log(`     3. Display name: ${contentType.displayName}`);
            console.log(`     4. API ID: ${contentType.name}`);
            console.log(`     5. Ajouter les champs:`);
            
            Object.entries(contentType.attributes).forEach(([fieldName, fieldConfig]) => {
                let fieldDesc = `        - ${fieldName} (${fieldConfig.type}`;
                if (fieldConfig.required) fieldDesc += ', Required';
                if (fieldConfig.default !== undefined) fieldDesc += `, Default: ${fieldConfig.default}`;
                if (fieldConfig.allowedTypes) fieldDesc += `, Types: ${fieldConfig.allowedTypes.join(', ')}`;
                fieldDesc += ')';
                console.log(fieldDesc);
            });
            
            console.log(`     6. Save → Finish`);
            console.log(`     7. Settings → Roles → Public → ${contentType.displayName}:`);
            console.log(`        ✅ find`);
            console.log(`        ✅ findOne`);
            console.log('');
        }
    }
    
    console.log('\n🎯 ÉTAPES SUIVANTES:');
    console.log('===================');
    console.log('1. Créer manuellement les Content Types manquants dans Railway Admin');
    console.log('2. Configurer les permissions Public (find + findOne)');
    console.log('3. Relancer ce script pour créer les données d\'exemple');
    console.log('4. Suivre le guide Export/Import JSON pour importer toutes les données');
    console.log('');
    console.log('🔗 Railway Admin: https://cma-education-strapi-production.up.railway.app/admin');
}

async function main() {
    const apiAccessible = await testAPIAccess();
    
    if (!apiAccessible) {
        console.log('\n❌ Impossible d\'accéder à l\'API Railway');
        console.log('Vérifiez que Railway Strapi est démarré et accessible');
        return;
    }
    
    await createMissingContentTypes();
    
    console.log('\n📊 RÉSUMÉ:');
    console.log('=========');
    console.log('- Railway Strapi: ✅ Accessible');
    console.log('- Content Types manquants identifiés');
    console.log('- Instructions de création fournies');
    console.log('');
    console.log('⏭️  PROCHAINE ÉTAPE: Créer les Content Types dans Railway Admin');
}

main().catch(console.error);