/**
 * Vérifier l'état de Strapi
 */

const http = require('http');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

function testEndpoint(path, description) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✅ ${description}: ${res.statusCode}`);
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            if (json.data) {
              console.log(`   📊 ${Array.isArray(json.data) ? json.data.length : 1} élément(s)`);
            }
          } catch (e) {
            console.log(`   📄 Réponse non-JSON`);
          }
        }
        resolve(true);
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${description}: ${error.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log(`⏱️  ${description}: Timeout`);
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function checkStrapiStatus() {
  console.log('🔍 Vérification de l\'état de Strapi\n');

  const tests = [
    ['/api/formations', 'API Formations'],
    ['/api/formations?populate=*', 'API Formations avec populate'],
    ['/api/formations?filters[slug][$eq]=charge-affaires-batiment&populate=*', 'Formation spécifique'],
    ['/uploads/charge_affaires_c9bad5d296.jpg', 'Image uploadée'],
    ['/api/partners', 'API Partners'],
    ['/api/testimonials', 'API Testimonials'],
    ['/api/site-settings', 'API Site Settings']
  ];

  for (const [path, description] of tests) {
    await testEndpoint(path, description);
  }

  console.log('\n🌐 URLs à tester dans le navigateur:');
  console.log(`   Admin: http://localhost:1337/admin`);
  console.log(`   API: http://localhost:1337/api/formations?populate=*`);
  console.log(`   Image: http://localhost:1337/uploads/charge_affaires_c9bad5d296.jpg`);
  console.log(`   Frontend: http://localhost:3000/formations/charge-affaires-batiment`);
}

checkStrapiStatus().catch(console.error);