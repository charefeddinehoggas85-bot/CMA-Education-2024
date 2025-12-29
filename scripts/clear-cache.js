const fs = require('fs');
const path = require('path');

function clearNextCache() {
  const nextCacheDir = path.join(process.cwd(), '.next');
  
  try {
    if (fs.existsSync(nextCacheDir)) {
      console.log('🧹 Suppression du cache Next.js...');
      fs.rmSync(nextCacheDir, { recursive: true, force: true });
      console.log('✅ Cache Next.js supprimé');
    } else {
      console.log('ℹ️ Pas de cache Next.js trouvé');
    }
  } catch (error) {
    console.error('❌ Erreur suppression cache:', error.message);
  }
}

console.log('=== NETTOYAGE CACHE NEXT.JS ===');
clearNextCache();
console.log('\n💡 Redémarrez maintenant le serveur avec: npm run dev');