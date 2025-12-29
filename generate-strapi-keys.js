#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');

console.log('🔐 GÉNÉRATION DES CLÉS SÉCURISÉES STRAPI');
console.log('=======================================\n');

function generateSecureKey(length = 32) {
    return crypto.randomBytes(length).toString('base64');
}

function generateAppKeys() {
    // Générer 4 clés pour APP_KEYS
    const keys = [];
    for (let i = 0; i < 4; i++) {
        keys.push(generateSecureKey());
    }
    return keys.join(',');
}

function updateEnvFile() {
    const envPath = '.env';
    
    if (!fs.existsSync(envPath)) {
        console.error('❌ Fichier .env non trouvé');
        return false;
    }
    
    const keys = {
        APP_KEYS: generateAppKeys(),
        API_TOKEN_SALT: generateSecureKey(),
        ADMIN_JWT_SECRET: generateSecureKey(),
        TRANSFER_TOKEN_SALT: generateSecureKey(),
        JWT_SECRET: generateSecureKey()
    };
    
    console.log('🔑 Clés générées:');
    Object.entries(keys).forEach(([key, value]) => {
        console.log(`✅ ${key}: ${value.substring(0, 20)}...`);
    });
    
    // Lire le fichier .env actuel
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Remplacer les valeurs placeholder
    Object.entries(keys).forEach(([key, value]) => {
        const regex = new RegExp(`${key}=.*`, 'g');
        envContent = envContent.replace(regex, `${key}=${value}`);
    });
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(envPath, envContent);
    
    console.log('\n✅ Fichier .env mis à jour avec les clés sécurisées');
    return true;
}

function createDatabaseDirectory() {
    const tmpDir = '.tmp';
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
        console.log('✅ Dossier .tmp créé pour la base de données SQLite');
    } else {
        console.log('✅ Dossier .tmp existe déjà');
    }
}

function main() {
    console.log('🎯 OBJECTIF: Configurer les clés sécurisées pour Strapi\n');
    
    if (updateEnvFile()) {
        createDatabaseDirectory();
        
        console.log('\n🎉 CONFIGURATION TERMINÉE!');
        console.log('=========================');
        console.log('✅ Clés sécurisées générées et configurées');
        console.log('✅ Base de données SQLite prête');
        console.log('✅ Strapi prêt à démarrer');
        
        console.log('\n🚀 DÉMARRAGE STRAPI:');
        console.log('npm run strapi:develop');
        console.log('# ou npm run cms:dev');
        
        console.log('\n📱 ACCÈS ADMIN:');
        console.log('http://localhost:1337/admin');
        
    } else {
        console.log('❌ Échec de la configuration');
    }
}

main();