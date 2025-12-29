const http = require('http');

async function finalTest() {
  console.log('🚀 Final test of formation page fixes...\n');
  
  // Test 1: Check if page loads
  await testPageLoad();
  
  // Test 2: Check Strapi data
  await testStrapiData();
  
  // Test 3: Check favicon
  await testFavicon();
  
  console.log('\n✅ All tests completed!');
}

function testPageLoad() {
  return new Promise((resolve) => {
    console.log('1️⃣ Testing page load...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/formations/conducteur-travaux-batiment',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      console.log(`   Status: ${res.statusCode} ${res.statusCode === 200 ? '✅' : '❌'}`);
      resolve();
    });

    req.on('error', (e) => {
      console.log(`   Error: ${e.message} ❌`);
      resolve();
    });

    req.end();
  });
}

function testStrapiData() {
  return new Promise((resolve) => {
    console.log('2️⃣ Testing Strapi data...');
    
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: '/api/formations?filters[slug][$eq]=conducteur-travaux-batiment&populate=*',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          const hasData = jsonData.data && jsonData.data.length > 0;
          console.log(`   Strapi API: ${hasData ? '✅' : '❌'}`);
          
          if (hasData) {
            const formation = jsonData.data[0];
            const hasObjectifs = Array.isArray(formation.attributes?.objectifs);
            const hasDebouches = Array.isArray(formation.attributes?.debouches);
            console.log(`   Objectifs array: ${hasObjectifs ? '✅' : '❌'}`);
            console.log(`   Débouchés array: ${hasDebouches ? '✅' : '❌'}`);
          }
        } catch (error) {
          console.log(`   JSON Parse Error: ❌`);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`   Strapi Error: ${e.message} ❌`);
      resolve();
    });

    req.end();
  });
}

function testFavicon() {
  return new Promise((resolve) => {
    console.log('3️⃣ Testing favicon...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/favicon.ico',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      console.log(`   Favicon: ${res.statusCode === 200 ? '✅' : '❌'}`);
      resolve();
    });

    req.on('error', (e) => {
      console.log(`   Favicon Error: ❌`);
      resolve();
    });

    req.end();
  });
}

finalTest();