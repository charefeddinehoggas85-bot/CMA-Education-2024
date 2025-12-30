#!/usr/bin/env node

/**
 * 🔍 DIAGNOSTIC COMPLET - Médias et Contenu Railway
 * 
 * Ce script diagnostique pourquoi les médias et le contenu 
 * ne sont pas visibles sur Railway
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 DIAGNOSTIC RAILWAY - MÉDIAS ET CONTENU');
console.log('==========================================\n');

// 1. Vérifier la structure locale
console.log('📁 ÉTAPE 1: Vérification Structure Locale');
console.log('------------------------------------------');

const localStrapiPath = 'D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi';
const projectStrapiPath = './cms-cma';

console.log(`🔍 Chemin Strapi cloné: ${localStrapiPath}`);
console.log(`🔍 Chemin Strapi projet: ${projectStrapiPath}`);

// Vérifier si les dossiers existent
if (fs.existsSync(localStrapiPath)) {
    console.log('✅ Dossier Strapi cloné trouvé');
    
    // Lister le contenu
    try {
        const files = fs.readdirSync(localStrapiPath);
        console.log('📂 Contenu du dossier cloné:');
        files.forEach(file => {
            console.log(`   - ${file}`);
        });
    } catch (error) {
        console.log('❌ Erreur lecture dossier cloné:', error.message);
    }
} else {
    console.log('❌ Dossier Strapi cloné non trouvé');
}

if (fs.existsSync(projectStrapiPath)) {
    console.log('✅ Dossier Strapi projet trouvé');
} else {
    console.log('❌ Dossier Strapi projet non trouvé');
}

console.log('\n📊 ÉTAPE 2: Analyse des Médias Locaux');
console.log('-------------------------------------');

// Vérifier les médias dans public/
const publicPath = './public';
const mediasToCheck = [
    'videos/hero-background.mp4',
    'images/hero/hero-bg.jpg',
    'images/hero/construction-hero.svg',
    'images/blog-hero.jpg',
    'images/contact-hero.jpg',
    'images/rejoignez-hero.jpg'
];

mediasToCheck.forEach(mediaPath => {
    const fullPath = path.join(publicPath, mediaPath);
    if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`✅ ${mediaPath} (${sizeKB} KB)`);
    } else {
        console.log(`❌ ${mediaPath} - MANQUANT`);
    }
});

console.log('\n🔗 ÉTAPE 3: Vérification Configuration Railway');
console.log('----------------------------------------------');

// Vérifier les variables d'environnement
const envPath = './.env.local';
if (fs.existsSync(envPath)) {
    console.log('✅ Fichier .env.local trouvé');
    
    try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        
        // Chercher STRAPI_URL
        const strapiUrlMatch = envContent.match(/STRAPI_URL=(.+)/);
        if (strapiUrlMatch) {
            const strapiUrl = strapiUrlMatch[1].trim();
            console.log(`🔗 STRAPI_URL configuré: ${strapiUrl}`);
            
            // Vérifier si c'est Railway
            if (strapiUrl.includes('railway.app')) {
                console.log('✅ URL Railway détectée');
            } else if (strapiUrl.includes('localhost')) {
                console.log('⚠️  URL localhost détectée - pas Railway');
            } else {
                console.log('❓ URL inconnue');
            }
        } else {
            console.log('❌ STRAPI_URL non trouvé dans .env.local');
        }
        
        // Chercher API Token
        const tokenMatch = envContent.match(/STRAPI_API_TOKEN=(.+)/);
        if (tokenMatch) {
            const token = tokenMatch[1].trim();
            console.log(`🔑 API Token configuré: ${token.substring(0, 20)}...`);
        } else {
            console.log('❌ STRAPI_API_TOKEN non trouvé');
        }
        
    } catch (error) {
        console.log('❌ Erreur lecture .env.local:', error.message);
    }
} else {
    console.log('❌ Fichier .env.local non trouvé');
}

console.log('\n🎯 ÉTAPE 4: Diagnostic du Problème');
console.log('----------------------------------');

console.log(`
🔍 ANALYSE DU PROBLÈME:

1. **Structure Détectée:**
   - Vous avez un dossier Strapi cloné séparé
   - Vous avez un dossier Strapi dans le projet
   - Les médias sont dans public/ (local)

2. **Problème Probable:**
   - Les médias sont dans votre projet local
   - Mais Railway utilise une base de données vide
   - Il faut synchroniser le contenu local → Railway

3. **Solutions Possibles:**
   a) Migrer le contenu du Strapi cloné vers Railway
   b) Uploader les médias dans Railway Media Library
   c) Importer les données via API

📋 PROCHAINES ÉTAPES RECOMMANDÉES:

1. **Vérifier Railway Admin:**
   - Accéder à https://votre-railway-url.up.railway.app/admin
   - Vérifier si des Content Types existent
   - Vérifier si la Media Library est vide

2. **Synchronisation:**
   - Exporter les données du Strapi cloné
   - Les importer dans Railway
   - Uploader les médias manuellement

3. **Configuration:**
   - S'assurer que .env.local pointe vers Railway
   - Tester la connexion API
`);

console.log('\n🚀 ACTIONS IMMÉDIATES:');
console.log('---------------------');
console.log('1. Donnez-moi votre URL Railway exacte');
console.log('2. Confirmez si vous pouvez accéder à /admin');
console.log('3. Je créerai un script de migration automatique');

console.log('\n✅ Diagnostic terminé !');