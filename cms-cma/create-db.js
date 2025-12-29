const { Client } = require('pg');

async function createDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'postgres'
  });

  try {
    await client.connect();
    await client.query('CREATE DATABASE cma_cms');
    console.log('✅ Base de données cma_cms créée avec succès');
  } catch (error) {
    if (error.code === '42P04') {
      console.log('ℹ️  La base de données cma_cms existe déjà');
    } else {
      console.error('❌ Erreur:', error.message);
    }
  } finally {
    await client.end();
  }
}

createDatabase();
