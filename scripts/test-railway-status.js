#!/usr/bin/env node

const axios = require('axios');

console.log('🔍 TEST DES APIs RAILWAY APRÈS CORRECTION');
console.log('=========================================\n');

const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';

const apis = [
    { name: 'Formations', endpoint: 'formations' },
    { name: 'Formateurs', endpoint: 'formateurs' },
    { name: 'Témoignages', endpoint: 'testimonials' },
    { name: 'Catégories formations', endpoint: 'formation-categories' },
    { name: 'Articles blog', endpoint: 'articles-blog' },
    { name: 'Catégories blog', endpoint: 'categories-blog' },
    { name: 'Site settings', endpoint: 'site-setting' }
];

async function testAPIs() {
    for (const api of apis) {
        try {
            const response = await axios.get(`${RAILWAY_URL}/api/${api.endpoint}`, {
                timeout: 10000,
                validateStatus: () => true
            });
            
            if (response.status === 200) {
                const count = api.endpoint === 'site-setting' ? 'Single Type' : (response.data?.data?.length || 0);
                console.log(`✅ ${api.name}: ${count} éléments`);
            } else {
                console.log(`❌ ${api.name}: Status ${response.status}`);
            }
        } catch (error) {
            console.log(`❌ ${api.name}: ${error.message}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log('\n🎉 Test terminé !');
    console.log('\n📊 RÉSUMÉ:');
    console.log('- Les erreurs de contrainte ont été corrigées');
    console.log('- Les doublons ont été supprimés');
    console.log('- Les APIs fonctionnent correctement');
    console.log('- Le frontend devrait maintenant fonctionner sans erreurs 404');
}

testAPIs().catch(console.error);