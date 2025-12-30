const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Migration de la base de données locale vers Neon');

// Configuration
const LOCAL_DB = {
  host: '127.0.0.1',
  port: 5432,
  database: 'cma_cms',
  username: 'postgres',
  password: 'root'
};

// Vous devez remplir ces informations avec votre base Neon
const NEON_DB = {
  connectionString: process.env.NEON_DATABASE_URL || 'VOTRE_URL_NEON_ICI'
};

async function migrateToNeon() {
  try {
    console.log('📋 Étape 1: Vérification des prérequis...');
    
    // Vérifier que pg_dump est disponible
    try {
      execSync('pg_dump --version', { stdio: 'pipe' });
      console.log('✅ pg_dump disponible');
    } catch (error) {
      console.error('❌ pg_dump non trouvé. Installez PostgreSQL client tools');
      return;
    }

    // Vérifier la connexion locale
    console.log('� Étapep 2: Test de connexion à la base locale...');
    const localConnString = `postgresql://${LOCAL_DB.username}:${LOCAL_DB.password}@${LOCAL_DB.host}:${LOCAL_DB.port}/${LOCAL_DB.database}`;
    
    try {
      execSync(`psql "${localConnString}" -c "SELECT version();"`, { stdio: 'pipe' });
      console.log('✅ Connexion locale OK');
    } catch (error) {
      console.error('❌ Impossible de se connecter à la base locale');
      console.error('Vérifiez que PostgreSQL est démarré et que la base cma_cms existe');
      return;
    }

    // Vérifier l'URL Neon
    if (!NEON_DB.connectionString || NEON_DB.connectionString === 'VOTRE_URL_NEON_ICI') {
      console.error('❌ URL Neon manquante');
      console.log('📝 Ajoutez votre URL Neon dans le fichier .env:');
      console.log('NEON_DATABASE_URL=postgresql://username:password@ep-xxx.neon.tech/dbname?sslmode=require');
      return;
    }

    console.log('� Étape 3a: Test de connexion à Neon...');
    try {
      execSync(`psql "${NEON_DB.connectionString}" -c "SELECT version();"`, { stdio: 'pipe' });
      console.log('✅ Connexion Neon OK');
    } catch (error) {
      console.error('❌ Impossible de se connecter à Neon');
      console.error('Vérifiez votre URL de connexion Neon');
      return;
    }

    console.log('📋 Étape 4: Export de la base locale...');
    const dumpFile = path.join(__dirname, '..', 'backup-local-strapi.sql');
    
    // Export avec pg_dump
    const dumpCommand = `pg_dump "${localConnString}" --clean --if-exists --no-owner --no-privileges > "${dumpFile}"`;
    
    try {
      execSync(dumpCommand, { stdio: 'inherit' });
      console.log('✅ Export terminé:', dumpFile);
    } catch (error) {
      console.error('❌ Erreur lors de l\'export:', error.message);
      return;
    }

    console.log('📋 Étape 5: Import vers Neon...');
    
    // Import vers Neon
    const importCommand = `psql "${NEON_DB.connectionString}" < "${dumpFile}"`;
    
    try {
      execSync(importCommand, { stdio: 'inherit' });
      console.log('✅ Import vers Neon terminé');
    } catch (error) {
      console.error('❌ Erreur lors de l\'import:', error.message);
      console.log('💡 Ceci peut être normal si certaines tables existent déjà');
    }

    console.log('📋 Étape 6: Vérification des données...');
    
    // Compter les enregistrements dans quelques tables importantes
    const tables = ['formations', 'articles_blog', 'formateurs', 'partners'];
    
    for (const table of tables) {
      try {
        const result = execSync(`psql "${NEON_DB.connectionString}" -t -c "SELECT COUNT(*) FROM ${table};"`, { encoding: 'utf8' });
        const count = result.trim();
        console.log(`✅ Table ${table}: ${count} enregistrements`);
      } catch (error) {
        console.log(`⚠️  Table ${table}: non trouvée ou erreur`);
      }
    }

    console.log('📋 Étape 7: Nettoyage...');
    if (fs.existsSync(dumpFile)) {
      fs.unlinkSync(dumpFile);
      console.log('✅ Fichier de sauvegarde supprimé');
    }

    console.log('\n🎉 Migration terminée avec succès !');
    console.log('📝 Prochaines étapes:');
    console.log('1. Mettez à jour votre .env avec DATABASE_URL=votre_url_neon');
    console.log('2. Redémarrez Strapi pour utiliser Neon');
    console.log('3. Vérifiez que tout fonctionne dans l\'admin Strapi');

  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Fonction pour créer le fichier .env avec Neon
function createNeonEnvConfig() {
  console.log('\n📝 Configuration pour Neon:');
  console.log('Ajoutez cette ligne à votre cms-cma/.env:');
  console.log('DATABASE_URL=postgresql://username:password@ep-xxx.neon.tech/dbname?sslmode=require');
  console.log('\nRemplacez par votre vraie URL de connexion Neon');
}

// Exécution
if (require.main === module) {
  if (process.argv.includes('--help')) {
    console.log('Usage: node migrate-to-neon.js');
    console.log('');
    console.log('Prérequis:');
    console.log('1. PostgreSQL client tools installés (pg_dump, psql)');
    console.log('2. Base locale cma_cms accessible');
    console.log('3. URL Neon configurée dans NEON_DATABASE_URL');
    console.log('');
    console.log('Variables d\'environnement:');
    console.log('NEON_DATABASE_URL=postgresql://user:pass@host/db?sslmode=require');
    createNeonEnvConfig();
  } else {
    migrateToNeon();
  }
}

module.exports = { migrateToNeon };