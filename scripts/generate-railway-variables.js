#!/usr/bin/env node

/**
 * Script pour générer les variables Railway au bon format
 * Affiche chaque variable séparément pour copier-coller dans Railway
 */

console.log('🔧 Générateur de Variables Railway - Format Correct\n');

const variables = [
  {
    name: 'DATABASE_URL',
    value: 'postgresql://neondb_owner:npg_P2DZma1jtAkB@ep-silent-voice-a47tu3wg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    description: 'URL de connexion à la base de données PostgreSQL Neon'
  },
  {
    name: 'HOST',
    value: '0.0.0.0',
    description: 'Adresse d\'écoute du serveur'
  },
  {
    name: 'PORT',
    value: '1337',
    description: 'Port d\'écoute du serveur'
  },
  {
    name: 'NODE_ENV',
    value: 'production',
    description: 'Environnement d\'exécution'
  },
  {
    name: 'APP_KEYS',
    value: 'temp-key-1,temp-key-2',
    description: 'Clés d\'application Strapi (temporaires)'
  },
  {
    name: 'API_TOKEN_SALT',
    value: 'temp-salt-123',
    description: 'Salt pour les tokens API (temporaire)'
  },
  {
    name: 'ADMIN_JWT_SECRET',
    value: 'temp-admin-secret-456',
    description: 'Secret JWT pour l\'admin (temporaire)'
  },
  {
    name: 'TRANSFER_TOKEN_SALT',
    value: 'temp-transfer-salt-789',
    description: 'Salt pour les tokens de transfert (temporaire)'
  },
  {
    name: 'JWT_SECRET',
    value: 'temp-jwt-secret-abc',
    description: 'Secret JWT général (temporaire)'
  },
  {
    name: 'FRONTEND_URL',
    value: 'https://cma-education-2024.vercel.app',
    description: 'URL du frontend pour CORS'
  }
];

console.log('📋 Variables à ajouter dans Railway (une par une) :\n');

variables.forEach((variable, index) => {
  console.log(`=== Variable ${index + 1}/10 ===`);
  console.log(`Nom : ${variable.name}`);
  console.log(`Valeur : ${variable.value}`);
  console.log(`Description : ${variable.description}`);
  console.log('');
});

console.log('🚀 Instructions :');
console.log('1. Allez sur Railway → Variables');
console.log('2. Supprimez toutes les variables existantes mal formatées');
console.log('3. Cliquez "New Variable" pour chaque variable ci-dessus');
console.log('4. Copiez-collez exactement le Nom et la Valeur');
console.log('5. Railway redéploiera automatiquement');
console.log('');

console.log('⚠️  Important :');
console.log('- Ne mettez PAS de guillemets autour des valeurs');
console.log('- Respectez exactement la casse des noms');
console.log('- Pas d\'espaces avant/après les valeurs');
console.log('');

console.log('🔍 Vérification :');
console.log('Vous devriez avoir exactement 10 variables séparées dans Railway');
console.log('');

console.log('✅ Une fois terminé, surveillez les logs Railway pour :');
console.log('   "Database connected successfully"');
console.log('   "Server started on port 1337"');

// Génération d'un fichier de référence
const envContent = variables.map(v => `${v.name}=${v.value}`).join('\n');
require('fs').writeFileSync('.env.railway-reference', envContent);
console.log('\n📄 Fichier .env.railway-reference créé pour référence');