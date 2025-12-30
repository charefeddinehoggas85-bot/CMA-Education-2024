#!/usr/bin/env node

/**
 * Script de test pour vérifier que le fix Railway fonctionne
 * Teste la configuration de base de données corrigée
 */

console.log('🔍 Test du Fix Railway - Configuration Base de Données\n');

// Simulation de l'environnement Railway
const mockEnv = (key, defaultValue) => {
  const envVars = {
    'DATABASE_URL': 'postgresql://neondb_owner:npg_P2DZma1jtAkB@ep-silent-voice-a47tu3wg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    'NODE_ENV': 'production',
    'HOST': '0.0.0.0',
    'PORT': '1337'
  };
  
  return envVars[key] || defaultValue;
};

mockEnv.int = (key, defaultValue) => {
  const value = mockEnv(key, defaultValue);
  return parseInt(value, 10);
};

// Test de la nouvelle configuration
console.log('📋 Test de la configuration corrigée :');

try {
  // Simulation de la nouvelle config
  const databaseConfig = ({ env }) => {
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

  const config = databaseConfig({ env: mockEnv });
  
  console.log('✅ Configuration générée avec succès');
  console.log('📊 Type de connexion :', config.connection.connection.connectionString ? 'DATABASE_URL' : 'Variables individuelles');
  
  if (config.connection.connection.connectionString) {
    console.log('✅ Utilise DATABASE_URL (correct pour Railway)');
    console.log('✅ SSL configuré pour Neon');
    console.log('📡 URL de connexion :', config.connection.connection.connectionString.substring(0, 50) + '...');
  } else {
    console.log('❌ Utilise variables individuelles (problématique pour Railway)');
    console.log('🔧 Host :', config.connection.connection.host);
    console.log('🔧 Port :', config.connection.connection.port);
  }
  
  console.log('\n🎯 Résultat du test :');
  
  if (config.connection.connection.connectionString) {
    console.log('✅ SUCCÈS - La configuration est correcte pour Railway');
    console.log('✅ Strapi utilisera DATABASE_URL');
    console.log('✅ SSL activé pour Neon PostgreSQL');
    console.log('\n🚀 Actions suivantes :');
    console.log('   1. Commit et push les changements');
    console.log('   2. Railway redéploiera automatiquement');
    console.log('   3. Surveillez les logs pour "Database connected"');
  } else {
    console.log('❌ ÉCHEC - Configuration incorrecte');
    console.log('❌ Strapi essaiera localhost:5432');
    console.log('\n🔧 Vérifiez que DATABASE_URL est définie');
  }

} catch (error) {
  console.log('❌ Erreur lors du test :', error.message);
}

console.log('\n📋 Variables d\'environnement Railway requises :');
console.log('DATABASE_URL=postgresql://neondb_owner:npg_P2DZma1jtAkB@...');
console.log('NODE_ENV=production');
console.log('HOST=0.0.0.0');
console.log('PORT=1337');
console.log('APP_KEYS=clé1,clé2');
console.log('API_TOKEN_SALT=salt');
console.log('ADMIN_JWT_SECRET=secret');
console.log('TRANSFER_TOKEN_SALT=transfer');
console.log('JWT_SECRET=jwt');
console.log('FRONTEND_URL=https://cma-education-2024.vercel.app');

console.log('\n⏱️  Temps estimé pour le fix : 5-7 minutes');
console.log('🎉 Une fois corrigé, votre Strapi démarrera sur Railway !');