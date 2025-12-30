#!/usr/bin/env node

/**
 * Script pour corriger la configuration de base de données Strapi
 * Corrige le fichier config/database.ts pour utiliser DATABASE_URL
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Correction de la configuration de base de données Strapi...\n');

// Chemin vers le fichier de configuration
const strapiPath = 'D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi';
const configPath = path.join(strapiPath, 'config', 'database.ts');

console.log(`📁 Répertoire Strapi : ${strapiPath}`);
console.log(`📄 Fichier config : ${configPath}`);

// Vérifier que le répertoire existe
if (!fs.existsSync(strapiPath)) {
  console.log('❌ Erreur : Répertoire Strapi non trouvé');
  console.log('   Vérifiez le chemin : D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi');
  process.exit(1);
}

// Vérifier que le fichier config existe
if (!fs.existsSync(configPath)) {
  console.log('❌ Erreur : Fichier config/database.ts non trouvé');
  console.log('   Chemin attendu :', configPath);
  process.exit(1);
}

// Lire le fichier actuel
console.log('📖 Lecture du fichier actuel...');
const currentContent = fs.readFileSync(configPath, 'utf8');

// Nouvelle configuration corrigée
const newContent = `export default ({ env }: { env: any }) => {
  // Configuration pour Railway avec DATABASE_URL
  if (env('DATABASE_URL')) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: {
            rejectUnauthorized: false
          }
        },
        pool: {
          min: 2,
          max: 10,
        },
        acquireConnectionTimeout: 60000,
      },
    };
  }

  // Configuration locale avec variables individuelles
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'cma_cms'),
        user: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'root'),
        ssl: false,
      },
      pool: {
        min: 2,
        max: 10,
      },
      acquireConnectionTimeout: 60000,
    },
  };
};
`;

// Créer une sauvegarde
const backupPath = configPath + '.backup';
console.log('💾 Création d\'une sauvegarde...');
fs.writeFileSync(backupPath, currentContent);
console.log(`✅ Sauvegarde créée : ${backupPath}`);

// Écrire la nouvelle configuration
console.log('✏️  Écriture de la nouvelle configuration...');
fs.writeFileSync(configPath, newContent);
console.log('✅ Configuration mise à jour !');

console.log('\n🔍 Vérification du contenu...');
const updatedContent = fs.readFileSync(configPath, 'utf8');

if (updatedContent.includes('DATABASE_URL')) {
  console.log('✅ DATABASE_URL détectée dans la configuration');
} else {
  console.log('❌ DATABASE_URL non trouvée - erreur possible');
}

if (updatedContent.includes('connectionString')) {
  console.log('✅ connectionString configurée');
} else {
  console.log('❌ connectionString non trouvée - erreur possible');
}

if (updatedContent.includes('rejectUnauthorized: false')) {
  console.log('✅ SSL configuré pour Neon');
} else {
  console.log('❌ SSL non configuré - erreur possible');
}

console.log('\n🚀 Prochaines étapes :');
console.log('1. Allez dans le répertoire Strapi :');
console.log('   cd "D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi"');
console.log('');
console.log('2. Commitez les changements :');
console.log('   git add config/database.ts');
console.log('   git commit -m "Fix: Configure DATABASE_URL for Railway deployment"');
console.log('   git push origin main');
console.log('');
console.log('3. Railway redéploiera automatiquement');
console.log('4. Surveillez les logs Railway pour "Database connected"');

console.log('\n📋 Variables Railway requises :');
console.log('DATABASE_URL=postgresql://neondb_owner:npg_P2DZma1jtAkB@ep-silent-voice-a47tu3wg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
console.log('NODE_ENV=production');
console.log('HOST=0.0.0.0');
console.log('PORT=1337');
console.log('APP_KEYS=temp-key-1,temp-key-2');
console.log('API_TOKEN_SALT=temp-salt-123');
console.log('ADMIN_JWT_SECRET=temp-admin-secret-456');
console.log('TRANSFER_TOKEN_SALT=temp-transfer-salt-789');
console.log('JWT_SECRET=temp-jwt-secret-abc');
console.log('FRONTEND_URL=https://cma-education-2024.vercel.app');

console.log('\n🎉 Configuration corrigée ! Railway devrait maintenant fonctionner.');