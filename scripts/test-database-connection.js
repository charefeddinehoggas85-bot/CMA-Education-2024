#!/usr/bin/env node

/**
 * Script de test de connexion à la base de données PostgreSQL
 * Vérifie que la DATABASE_URL fonctionne correctement
 */

const { Client } = require('pg');

// URL de la base de données
const DATABASE_URL = 'postgresql://neondb_owner:npg_P2DZma1jtAkB@ep-silent-voice-a47tu3wg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

console.log('🔍 Test de connexion à la base de données PostgreSQL...\n');

async function testDatabaseConnection() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('📡 Tentative de connexion...');
    await client.connect();
    console.log('✅ Connexion réussie !');
    
    // Test d'une requête simple
    console.log('🔍 Test d\'une requête simple...');
    const result = await client.query('SELECT NOW() as current_time, version() as postgres_version');
    console.log('✅ Requête réussie !');
    console.log(`📊 Heure serveur : ${result.rows[0].current_time}`);
    console.log(`📊 Version PostgreSQL : ${result.rows[0].postgres_version.split(' ')[0]}`);
    
    // Test des permissions
    console.log('🔍 Test des permissions...');
    try {
      await client.query('CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name VARCHAR(50))');
      console.log('✅ Permissions CREATE : OK');
      
      await client.query('INSERT INTO test_table (name) VALUES ($1)', ['test']);
      console.log('✅ Permissions INSERT : OK');
      
      const selectResult = await client.query('SELECT * FROM test_table LIMIT 1');
      console.log('✅ Permissions SELECT : OK');
      console.log(`📊 Données trouvées : ${selectResult.rows.length} ligne(s)`);
      
      await client.query('DROP TABLE test_table');
      console.log('✅ Permissions DROP : OK');
      
    } catch (permError) {
      console.log('❌ Erreur de permissions :', permError.message);
    }
    
  } catch (error) {
    console.log('❌ Erreur de connexion :');
    console.log(`   Code : ${error.code}`);
    console.log(`   Message : ${error.message}`);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n🔧 Solutions possibles :');
      console.log('   - Vérifiez l\'URL de la base de données');
      console.log('   - Vérifiez votre connexion internet');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Solutions possibles :');
      console.log('   - Le serveur PostgreSQL n\'est pas accessible');
      console.log('   - Vérifiez le port et l\'adresse');
    } else if (error.message.includes('authentication')) {
      console.log('\n🔧 Solutions possibles :');
      console.log('   - Vérifiez le nom d\'utilisateur et mot de passe');
      console.log('   - Vérifiez les permissions de la base');
    }
    
  } finally {
    await client.end();
    console.log('\n🔌 Connexion fermée.');
  }
}

// Configuration pour Railway
console.log('📋 Configuration pour Railway :');
console.log('');
console.log('Variables d\'environnement à définir :');
console.log('DATABASE_URL=' + DATABASE_URL);
console.log('NODE_ENV=production');
console.log('HOST=0.0.0.0');
console.log('PORT=1337');
console.log('');

// Exécuter le test
testDatabaseConnection().catch(console.error);