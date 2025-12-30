#!/usr/bin/env node

/**
 * Script pour vérifier les variables d'environnement Railway
 * Utilisé pour diagnostiquer les problèmes de connexion à la base de données
 */

console.log('🔍 Vérification des Variables d\'Environnement Railway\n');

// Variables critiques pour Railway
const criticalVars = [
  'DATABASE_URL',
  'HOST',
  'PORT',
  'NODE_ENV',
  'APP_KEYS',
  'API_TOKEN_SALT',
  'ADMIN_JWT_SECRET',
  'TRANSFER_TOKEN_SALT',
  'JWT_SECRET',
  'FRONTEND_URL'
];

console.log('📋 Variables Critiques:');
console.log('========================');

let missingVars = [];
let presentVars = [];

criticalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    presentVars.push(varName);
    // Masquer les valeurs sensibles
    if (varName.includes('SECRET') || varName.includes('KEY') || varName.includes('SALT')) {
      console.log(`✅ ${varName}: [MASKED - ${value.length} chars]`);
    } else if (varName === 'DATABASE_URL') {
      // Masquer les credentials mais montrer la structure
      const maskedUrl = value.replace(/\/\/[^@]+@/, '//[CREDENTIALS]@');
      console.log(`✅ ${varName}: ${maskedUrl}`);
    } else {
      console.log(`✅ ${varName}: ${value}`);
    }
  } else {
    missingVars.push(varName);
    console.log(`❌ ${varName}: NON DÉFINIE`);
  }
});

console.log('\n📊 Résumé:');
console.log('===========');
console.log(`✅ Variables présentes: ${presentVars.length}/${criticalVars.length}`);
console.log(`❌ Variables manquantes: ${missingVars.length}`);

if (missingVars.length > 0) {
  console.log('\n🚨 Variables Manquantes:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
}

// Vérification spécifique DATABASE_URL
console.log('\n🔍 Analyse DATABASE_URL:');
console.log('========================');

const databaseUrl = process.env.DATABASE_URL;
if (databaseUrl) {
  try {
    const url = new URL(databaseUrl);
    console.log(`✅ Protocol: ${url.protocol}`);
    console.log(`✅ Host: ${url.hostname}`);
    console.log(`✅ Port: ${url.port || 'default'}`);
    console.log(`✅ Database: ${url.pathname.substring(1)}`);
    console.log(`✅ SSL: ${url.searchParams.get('sslmode') || 'non spécifié'}`);
    
    // Vérifier si c'est une URL Neon
    if (url.hostname.includes('neon.tech')) {
      console.log('✅ Type: Neon Database (correct)');
    } else {
      console.log(`⚠️  Type: ${url.hostname} (vérifiez que c'est correct)`);
    }
  } catch (error) {
    console.log(`❌ URL invalide: ${error.message}`);
  }
} else {
  console.log('❌ DATABASE_URL non définie - Strapi utilisera la config locale');
}

// Test de connexion simulé
console.log('\n🧪 Test de Configuration:');
console.log('==========================');

if (process.env.DATABASE_URL) {
  console.log('✅ Strapi utilisera DATABASE_URL');
  console.log('✅ Configuration PostgreSQL externe');
  console.log('✅ SSL activé automatiquement');
} else {
  console.log('❌ Strapi utilisera la configuration locale');
  console.log('❌ Tentera de se connecter à 127.0.0.1:5432');
  console.log('❌ Échec attendu sur Railway');
}

console.log('\n🎯 Recommandations:');
console.log('====================');

if (missingVars.length > 0) {
  console.log('1. Définir les variables manquantes dans Railway');
  console.log('2. Redéployer l\'application');
}

if (!process.env.DATABASE_URL) {
  console.log('1. URGENT: Définir DATABASE_URL dans Railway');
  console.log('2. Utiliser l\'URL Neon fournie');
  console.log('3. Redéployer immédiatement');
}

if (process.env.DATABASE_URL && presentVars.length === criticalVars.length) {
  console.log('✅ Configuration complète - Déploiement possible');
}

console.log('\n🚀 Prochaines Étapes:');
console.log('======================');
console.log('1. Corriger les variables manquantes');
console.log('2. Redéployer sur Railway');
console.log('3. Surveiller les logs de démarrage');
console.log('4. Tester l\'accès à l\'admin');

process.exit(missingVars.length > 0 ? 1 : 0);