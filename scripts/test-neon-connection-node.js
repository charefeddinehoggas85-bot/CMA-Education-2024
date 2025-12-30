const { Client } = require('pg');

console.log('🔍 Test de connexion Neon Database (Node.js)');

// URL Neon depuis les variables d'environnement ou directement
const neonUrl = process.env.NEON_DATABASE_URL || 'postgresql://neondb_owner:npg_P2DZma1jtAkB@ep-silent-voice-a47tu3wg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function testNeonConnectionNode() {
  const client = new Client({
    connectionString: neonUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔗 Connexion à Neon...');
    await client.connect();
    console.log('✅ Connexion réussie !');

    // Test basique
    console.log('\n📊 Informations de la base:');
    const versionResult = await client.query('SELECT version()');
    console.log('Version PostgreSQL:', versionResult.rows[0].version.split(' ')[0] + ' ' + versionResult.rows[0].version.split(' ')[1]);

    const dbInfoResult = await client.query('SELECT current_database(), current_user');
    console.log('Database:', dbInfoResult.rows[0].current_database);
    console.log('User:', dbInfoResult.rows[0].current_user);

    // Lister les tables existantes
    console.log('\n📋 Tables existantes:');
    const tablesResult = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename
    `);

    if (tablesResult.rows.length === 0) {
      console.log('🆕 Base vide (parfait pour la migration)');
    } else {
      console.log(`📊 ${tablesResult.rows.length} tables trouvées:`);
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.tablename}`);
      });

      // Compter les enregistrements dans les tables Strapi importantes
      console.log('\n📈 Nombre d\'enregistrements:');
      const strapiTables = ['formations', 'articles_blog', 'formateurs', 'partners', 'up_users'];

      for (const table of strapiTables) {
        try {
          const countResult = await client.query(`SELECT COUNT(*) FROM ${table}`);
          const count = countResult.rows[0].count;
          console.log(`  ${table}: ${count} enregistrements`);
        } catch (error) {
          // Table n'existe pas encore
        }
      }
    }

    // Test d'écriture
    console.log('\n✍️  Test d\'écriture...');
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS test_migration (
          id SERIAL PRIMARY KEY, 
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
      
      await client.query('INSERT INTO test_migration DEFAULT VALUES');
      
      const testResult = await client.query('SELECT COUNT(*) FROM test_migration');
      console.log('✅ Écriture OK -', testResult.rows[0].count, 'enregistrement(s) de test');
      
      await client.query('DROP TABLE test_migration');
      console.log('✅ Nettoyage OK');
      
    } catch (error) {
      console.error('❌ Erreur d\'écriture:', error.message);
    }

    console.log('\n🎉 Neon est prêt pour la migration !');
    console.log('\n📝 Prochaines étapes:');
    console.log('1. Créer une sauvegarde: node scripts/backup-local-database.js');
    console.log('2. Lancer la migration: node scripts/migrate-to-neon.js');

  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    console.log('\n🔧 Vérifications:');
    console.log('1. URL Neon correcte ?');
    console.log('2. Credentials valides ?');
    console.log('3. Base de données créée dans Neon ?');
    console.log('4. IP autorisée dans les paramètres Neon ?');
    console.log('5. Firewall/antivirus bloque la connexion ?');
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Erreur DNS - Vérifiez votre connexion internet');
    }
    if (error.message.includes('authentication')) {
      console.log('\n💡 Erreur d\'authentification - Vérifiez username/password');
    }
    if (error.message.includes('timeout')) {
      console.log('\n💡 Timeout - Vérifiez les paramètres réseau/firewall');
    }
    
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  testNeonConnectionNode();
}

module.exports = { testNeonConnectionNode };