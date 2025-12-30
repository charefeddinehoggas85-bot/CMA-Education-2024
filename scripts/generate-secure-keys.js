#!/usr/bin/env node

/**
 * Générateur de clés sécurisées pour Strapi
 * Génère toutes les clés nécessaires pour Railway
 */

const crypto = require('crypto');

console.log('🔐 Générateur de Clés Sécurisées pour Strapi\n');

function generateSecureKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function generateAppKeys() {
  return `${generateSecureKey()},${generateSecureKey()}`;
}

console.log('📋 Variables d\'environnement sécurisées pour Railway :\n');

console.log('# === COPIEZ CES VARIABLES DANS RAILWAY ===');
console.log('');

// Clés de sécurité
console.log('# Clés de sécurité Strapi');
console.log(`APP_KEYS=${generateAppKeys()}`);
console.log(`API_TOKEN_SALT=${generateSecureKey()}`);
console.log(`ADMIN_JWT_SECRET=${generateSecureKey()}`);
console.log(`TRANSFER_TOKEN_SALT=${generateSecureKey()}`);
console.log(`JWT_SECRET=${generateSecureKey()}`);
console.log('');

// Configuration serveur
console.log('# Configuration serveur');
console.log('HOST=0.0.0.0');
console.log('PORT=1337');
console.log('NODE_ENV=production');
console.log('');

// Base de données
console.log('# Base de données');
console.log('DATABASE_URL=postgresql://neondb_owner:npg_P2DZma1jtAkB@ep-silent-voice-a47tu3wg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
console.log('');

// CORS
console.log('# CORS et Frontend');
console.log('FRONTEND_URL=https://cma-education-2024.vercel.app');
console.log('');

console.log('# === FIN DES VARIABLES ===');
console.log('');

console.log('🚀 Instructions :');
console.log('1. Copiez TOUTES les variables ci-dessus');
console.log('2. Allez dans Railway → Variables');
console.log('3. Ajoutez chaque variable une par une');
console.log('4. Redéployez votre application');
console.log('');

console.log('⚠️  IMPORTANT :');
console.log('- Gardez ces clés secrètes');
console.log('- Ne les partagez jamais publiquement');
console.log('- Utilisez ces clés uniquement pour la production');
console.log('');

console.log('✅ Une fois configuré, votre Strapi sera sécurisé !');

// Génération d'un fichier .env pour référence locale
const envContent = `# Variables générées le ${new Date().toISOString()}
# NE PAS COMMITER CE FICHIER

# Clés de sécurité Strapi
APP_KEYS=${generateAppKeys()}
API_TOKEN_SALT=${generateSecureKey()}
ADMIN_JWT_SECRET=${generateSecureKey()}
TRANSFER_TOKEN_SALT=${generateSecureKey()}
JWT_SECRET=${generateSecureKey()}

# Configuration serveur
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Base de données
DATABASE_URL=postgresql://neondb_owner:npg_P2DZma1jtAkB@ep-silent-voice-a47tu3wg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# CORS et Frontend
FRONTEND_URL=https://cma-education-2024.vercel.app
`;

require('fs').writeFileSync('.env.railway', envContent);
console.log('📄 Fichier .env.railway créé pour référence (ne pas commiter)');