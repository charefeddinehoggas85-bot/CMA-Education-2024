const fetch = require('node-fetch');

async function fixRailwayUploadsAccess() {
  console.log('🔧 Correction de la configuration Railway pour l\'accès aux uploads...\n');

  const strapiUrl = 'https://cma-education-strapi-production.up.railway.app';
  
  try {
    // 1. Diagnostic de la configuration actuelle
    console.log('🔍 Diagnostic de la configuration actuelle...');
    
    // Tester différents endpoints
    const endpoints = [
      '/uploads/',
      '/api/upload/files',
      '/api/upload/files/1',
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${strapiUrl}${endpoint}`, {
          method: 'HEAD'
        });
        console.log(`   ${endpoint}: ${response.status} ${response.statusText}`);
      } catch (error) {
        console.log(`   ${endpoint}: Erreur - ${error.message}`);
      }
    }

    // 2. Récupérer un fichier exemple pour tester
    console.log('\n📋 Récupération d\'un fichier exemple...');
    
    const filesResponse = await fetch(`${strapiUrl}/api/upload/files?pagination[limit]=1`);
    if (!filesResponse.ok) {
      throw new Error(`Impossible de récupérer les fichiers: ${filesResponse.status}`);
    }

    const filesData = await filesResponse.json();
    if (filesData.length === 0) {
      console.log('⚠️ Aucun fichier trouvé dans Strapi');
      return;
    }

    const testFile = filesData[0];
    console.log(`   Fichier test: ${testFile.name}`);
    console.log(`   URL: ${testFile.url}`);
    console.log(`   Taille: ${testFile.size} bytes`);

    // 3. Tester l'accès au fichier
    console.log('\n🔄 Test d\'accès au fichier...');
    
    const fileUrl = `${strapiUrl}${testFile.url}`;
    console.log(`   URL complète: ${fileUrl}`);

    try {
      const fileResponse = await fetch(fileUrl, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      console.log(`   Status: ${fileResponse.status} ${fileResponse.statusText}`);
      console.log(`   Content-Type: ${fileResponse.headers.get('content-type')}`);
      console.log(`   Content-Length: ${fileResponse.headers.get('content-length')}`);

      if (fileResponse.ok) {
        console.log('   ✅ Fichier accessible');
      } else {
        console.log('   ❌ Fichier inaccessible');
        
        // Analyser les headers de réponse
        console.log('\n📋 Headers de réponse:');
        for (const [key, value] of fileResponse.headers.entries()) {
          console.log(`   ${key}: ${value}`);
        }
      }
    } catch (error) {
      console.log(`   ❌ Erreur d'accès: ${error.message}`);
    }

    // 4. Suggestions de correction
    console.log('\n💡 Suggestions de correction:');
    console.log('   1. Vérifier la configuration des middlewares Strapi');
    console.log('   2. Vérifier la configuration Railway pour les fichiers statiques');
    console.log('   3. Vérifier les permissions des fichiers uploadés');
    console.log('   4. Vérifier la configuration CORS');

    // 5. Générer un fichier de configuration Railway
    console.log('\n📝 Génération de la configuration Railway recommandée...');
    
    const railwayConfig = {
      "build": {
        "builder": "NIXPACKS"
      },
      "deploy": {
        "startCommand": "npm run start",
        "healthcheckPath": "/api/health",
        "healthcheckTimeout": 300
      },
      "environments": {
        "production": {
          "variables": {
            "NODE_ENV": "production",
            "STRAPI_DISABLE_UPDATE_NOTIFICATION": "true",
            "STRAPI_HIDE_STARTUP_MESSAGE": "true"
          }
        }
      }
    };

    console.log('   Configuration Railway (railway.json):');
    console.log(JSON.stringify(railwayConfig, null, 2));

    // 6. Configuration middleware Strapi recommandée
    console.log('\n📝 Configuration middleware Strapi recommandée...');
    
    const middlewareConfig = `module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['https://cma-education-2024.vercel.app', 'http://localhost:3000']
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  {
    name: 'strapi::public',
    config: {
      path: './public',
      maxAge: 60000,
    }
  }
];`;

    console.log('   Configuration middlewares (config/middlewares.js):');
    console.log(middlewareConfig);

    console.log('\n✅ Diagnostic terminé');
    console.log('\n📋 Actions recommandées:');
    console.log('   1. Appliquer la configuration Railway ci-dessus');
    console.log('   2. Appliquer la configuration middlewares ci-dessus');
    console.log('   3. Redéployer l\'application Strapi sur Railway');
    console.log('   4. Tester à nouveau l\'accès aux fichiers');

  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error.message);
  }
}

// Exécuter le diagnostic
fixRailwayUploadsAccess();