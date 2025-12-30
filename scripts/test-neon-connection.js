const { execSync } = require('child_process');

console.log('🔍 Test de connexion Neon Database');

// URL Neon depuis les variables d'environnement
const neonUrl = process.env.NEON_DATABASE_URL;

if (!neonUrl) {
  console.error('❌ Variable NEON_DATABASE_URL manquante');
  console.log('📝 Ajoutez dans votre .env:');
  console.log('NEON_DATABASE_URL=postgresql://username:password@ep-xxx.neon.tech/dbname?sslmode=require');
  process.exit(1);
}

async function testNeonConnection() {
  try {
    console.log('🔗 Test de connexion...');
    
    // Test basique de connexion
    const versionResult = execSync(`psql "${neonUrl}" -c "SELECT version();"`, { encoding: 'utf8' });
    console.log('✅ Connexion réussie');
    
    // Informations sur la base
    console.log('\n📊 Informations de la base:');
    const dbInfo = execSync(`psql "${neonUrl}" -t -c "SELECT current_database(), current_user, inet_server_addr(), inet_server_port();"`, { encoding: 'utf8' });
    const [database, user, host, port] = dbInfo.trim().split('|').map(s => s.trim());
    
    console.log(`Database: ${database}`);
    console.log(`User: ${user}`);
    console.log(`Host: ${host}`);
    console.log(`Port: ${port}`);
    
    // Lister les tables existantes
    console.log('\n📋 Tables existantes:');
    try {
      const tablesResult = execSync(`psql "${neonUrl}" -t -c "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;"`, { encoding: 'utf8' });
      const tables = tablesResult.trim().split('\n').filter(t => t.trim());
      
      if (tables.length === 0) {
        console.log('🆕 Base vide (parfait pour la migration)');
      } else {
        console.log(`📊 ${tables.length} tables trouvées:`);
        tables.forEach(table => console.log(`  - ${table.trim()}`));
        
        // Compter les enregistrements dans les tables Strapi importantes
        console.log('\n📈 Nombre d\'enregistrements:');
        const strapiTables = ['formations', 'articles_blog', 'formateurs', 'partners', 'up_users'];
        
        for (const table of strapiTables) {
          try {
            const countResult = execSync(`psql "${neonUrl}" -t -c "SELECT COUNT(*) FROM ${table};"`, { encoding: 'utf8' });
            const count = countResult.trim();
            console.log(`  ${table}: ${count} enregistrements`);
          } catch (error) {
            // Table n'existe pas encore
          }
        }
      }
    } catch (error) {
      console.log('🆕 Aucune table (base vide)');
    }
    
    // Test d'écriture
    console.log('\n✍️  Test d\'écriture...');
    try {
      execSync(`psql "${neonUrl}" -c "CREATE TABLE IF NOT EXISTS test_migration (id SERIAL PRIMARY KEY, created_at TIMESTAMP DEFAULT NOW());"`, { stdio: 'pipe' });
      execSync(`psql "${neonUrl}" -c "INSERT INTO test_migration DEFAULT VALUES;"`, { stdio: 'pipe' });
      const testResult = execSync(`psql "${neonUrl}" -t -c "SELECT COUNT(*) FROM test_migration;"`, { encoding: 'utf8' });
      execSync(`psql "${neonUrl}" -c "DROP TABLE test_migration;"`, { stdio: 'pipe' });
      console.log('✅ Écriture OK');
    } catch (error) {
      console.error('❌ Erreur d\'écriture:', error.message);
    }
    
    console.log('\n🎉 Neon est prêt pour la migration !');
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    console.log('\n🔧 Vérifications:');
    console.log('1. URL Neon correcte ?');
    console.log('2. Credentials valides ?');
    console.log('3. Base de données créée ?');
    console.log('4. IP autorisée dans Neon ?');
    process.exit(1);
  }
}

if (require.main === module) {
  testNeonConnection();
}

module.exports = { testNeonConnection };