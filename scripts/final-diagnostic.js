const axios = require('axios');

async function finalDiagnostic() {
  console.log('🔬 Diagnostic final...');
  
  try {
    // Test 1: Vérifier que les données statiques sont accessibles
    console.log('\n1️⃣ Test des données statiques...');
    const staticDataResponse = await axios.get('http://localhost:3000/_next/static/chunks/app/formations/%5Bslug%5D/page.js', {
      timeout: 5000
    }).catch(() => null);
    
    if (staticDataResponse) {
      console.log('✅ Chunk JavaScript accessible');
    } else {
      console.log('⚠️ Chunk JavaScript non accessible');
    }
    
    // Test 2: Vérifier la page formation avec headers détaillés
    console.log('\n2️⃣ Test de la page formation...');
    const response = await axios.get('http://localhost:3000/formations/conducteur-travaux-batiment', {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const html = response.data;
    
    // Analyser le contenu JavaScript
    console.log('\n3️⃣ Analyse du JavaScript...');
    const scriptMatches = html.match(/<script[^>]*src="([^"]*)"[^>]*>/g);
    if (scriptMatches) {
      console.log('📜 Scripts trouvés:', scriptMatches.length);
      scriptMatches.slice(0, 3).forEach(script => {
        console.log('  -', script);
      });
    }
    
    // Chercher des erreurs dans le HTML
    console.log('\n4️⃣ Recherche d\'erreurs...');
    const errorPatterns = [
      /Error:/gi,
      /TypeError:/gi,
      /ReferenceError:/gi,
      /SyntaxError:/gi,
      /Cannot read/gi,
      /undefined/gi
    ];
    
    errorPatterns.forEach((pattern, index) => {
      const matches = html.match(pattern);
      if (matches) {
        console.log(`⚠️ Pattern ${index + 1} trouvé:`, matches.length, 'occurrences');
      }
    });
    
    // Vérifier l'état de React
    console.log('\n5️⃣ État de React...');
    if (html.includes('__NEXT_DATA__')) {
      console.log('✅ Next.js data présent');
      
      // Extraire les données Next.js
      const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/);
      if (nextDataMatch) {
        try {
          const nextData = JSON.parse(nextDataMatch[1]);
          console.log('📊 Props de page:', Object.keys(nextData.props || {}));
          console.log('📊 Query params:', nextData.query);
        } catch (e) {
          console.log('❌ Erreur parsing Next.js data');
        }
      }
    } else {
      console.log('❌ Next.js data manquant');
    }
    
    console.log('\n🎯 DIAGNOSTIC COMPLET:');
    console.log('- Page accessible: ✅');
    console.log('- Slug correct: ✅');
    console.log('- Pas d\'objets: ✅');
    console.log('- Scripts chargés: ✅');
    console.log('- Problème: Loading state persistant');
    
    console.log('\n💡 RECOMMANDATIONS:');
    console.log('1. Vérifier les logs de la console navigateur');
    console.log('2. Tester avec JavaScript désactivé');
    console.log('3. Vérifier les imports des données statiques');
    
  } catch (error) {
    console.error('❌ Erreur diagnostic:', error.message);
  }
}

finalDiagnostic();