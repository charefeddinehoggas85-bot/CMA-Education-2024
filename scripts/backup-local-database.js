const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('💾 Sauvegarde de la base de données locale');

// Configuration base locale
const LOCAL_DB = {
  host: '127.0.0.1',
  port: 5432,
  database: 'cma_cms',
  username: 'postgres',
  password: 'root'
};

async function backupLocalDatabase() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const backupDir = path.join(__dirname, '..', 'backups');
    const backupFile = path.join(backupDir, `cma-cms-backup-${timestamp}.sql`);
    
    // Créer le dossier backups s'il n'existe pas
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log('📁 Dossier backups créé');
    }
    
    console.log('🔍 Vérification de la connexion locale...');
    const localConnString = `postgresql://${LOCAL_DB.username}:${LOCAL_DB.password}@${LOCAL_DB.host}:${LOCAL_DB.port}/${LOCAL_DB.database}`;
    
    try {
      execSync(`psql "${localConnString}" -c "SELECT version();"`, { stdio: 'pipe' });
      console.log('✅ Connexion locale OK');
    } catch (error) {
      console.error('❌ Impossible de se connecter à la base locale');
      console.error('Vérifiez que PostgreSQL est démarré et que la base cma_cms existe');
      return;
    }
    
    console.log('📊 Informations sur la base locale:');
    
    // Compter les tables et enregistrements
    try {
      const tablesResult = execSync(`psql "${localConnString}" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';"`, { encoding: 'utf8' });
      const tableCount = tablesResult.trim();
      console.log(`📋 ${tableCount} tables`);
      
      // Compter les enregistrements dans les tables importantes
      const importantTables = ['formations', 'articles_blog', 'formateurs', 'partners', 'up_users'];
      let totalRecords = 0;
      
      for (const table of importantTables) {
        try {
          const countResult = execSync(`psql "${localConnString}" -t -c "SELECT COUNT(*) FROM ${table};"`, { encoding: 'utf8' });
          const count = parseInt(countResult.trim());
          totalRecords += count;
          console.log(`  ${table}: ${count} enregistrements`);
        } catch (error) {
          console.log(`  ${table}: table non trouvée`);
        }
      }
      
      console.log(`📈 Total: ${totalRecords} enregistrements importants`);
      
    } catch (error) {
      console.log('⚠️  Impossible de compter les enregistrements');
    }
    
    console.log(`💾 Création de la sauvegarde: ${path.basename(backupFile)}`);
    
    // Créer la sauvegarde avec pg_dump
    const dumpCommand = `pg_dump "${localConnString}" --clean --if-exists --no-owner --no-privileges --verbose > "${backupFile}"`;
    
    try {
      execSync(dumpCommand, { stdio: 'inherit' });
      
      // Vérifier que le fichier a été créé
      if (fs.existsSync(backupFile)) {
        const stats = fs.statSync(backupFile);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`✅ Sauvegarde créée: ${fileSizeMB} MB`);
        console.log(`📁 Fichier: ${backupFile}`);
        
        // Créer aussi une copie avec un nom simple
        const simpleBackupFile = path.join(backupDir, 'cma-cms-latest.sql');
        fs.copyFileSync(backupFile, simpleBackupFile);
        console.log(`📋 Copie créée: ${path.basename(simpleBackupFile)}`);
        
      } else {
        console.error('❌ Fichier de sauvegarde non créé');
      }
      
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error.message);
      return;
    }
    
    console.log('\n🎉 Sauvegarde terminée avec succès !');
    console.log('📝 Vous pouvez maintenant procéder à la migration vers Neon');
    console.log('💡 Pour restaurer cette sauvegarde plus tard:');
    console.log(`   psql "${localConnString}" < "${backupFile}"`);
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Fonction pour lister les sauvegardes existantes
function listBackups() {
  const backupDir = path.join(__dirname, '..', 'backups');
  
  if (!fs.existsSync(backupDir)) {
    console.log('📁 Aucune sauvegarde trouvée');
    return;
  }
  
  const files = fs.readdirSync(backupDir)
    .filter(file => file.endsWith('.sql'))
    .map(file => {
      const filePath = path.join(backupDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
        date: stats.mtime.toLocaleString()
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
  
  if (files.length === 0) {
    console.log('📁 Aucune sauvegarde trouvée');
    return;
  }
  
  console.log('📋 Sauvegardes disponibles:');
  files.forEach(file => {
    console.log(`  ${file.name} (${file.size}) - ${file.date}`);
  });
}

if (require.main === module) {
  if (process.argv.includes('--list')) {
    listBackups();
  } else if (process.argv.includes('--help')) {
    console.log('Usage: node backup-local-database.js [options]');
    console.log('');
    console.log('Options:');
    console.log('  --list    Lister les sauvegardes existantes');
    console.log('  --help    Afficher cette aide');
    console.log('');
    console.log('Sauvegarde la base de données locale cma_cms avant migration');
  } else {
    backupLocalDatabase();
  }
}

module.exports = { backupLocalDatabase, listBackups };