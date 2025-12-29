const http = require('http');

// Test if the formation page loads without React errors
const testReactErrors = () => {
  console.log('🧪 Testing formation page for React errors...');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/formations/conducteur-travaux-batiment',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`📊 Response Status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        // Check for common React error indicators in the HTML
        const hasReactError = data.includes('Objects are not valid as a React child');
        const hasHydrationError = data.includes('hydration');
        const hasErrorBoundary = data.includes('ErrorBoundary');
        const hasFormationTitle = data.includes('Conducteur de Travaux');
        const hasObjectifs = data.includes('Objectifs de la formation');
        const hasDebouches = data.includes('Débouchés professionnels');
        
        console.log('\n🔍 Content Analysis:');
        console.log(`- Formation title: ${hasFormationTitle ? '✅' : '❌'}`);
        console.log(`- Objectifs section: ${hasObjectifs ? '✅' : '❌'}`);
        console.log(`- Débouchés section: ${hasDebouches ? '✅' : '❌'}`);
        console.log(`- ErrorBoundary present: ${hasErrorBoundary ? '✅' : '❌'}`);
        console.log(`- React errors: ${hasReactError ? '❌ FOUND' : '✅ None detected'}`);
        console.log(`- Hydration errors: ${hasHydrationError ? '❌ FOUND' : '✅ None detected'}`);
        
        // Check for script errors or console errors in the HTML
        const hasScriptError = data.includes('console.error') || data.includes('TypeError') || data.includes('ReferenceError');
        console.log(`- Script errors: ${hasScriptError ? '❌ FOUND' : '✅ None detected'}`);
        
        if (!hasReactError && !hasHydrationError && !hasScriptError) {
          console.log('\n🎉 SUCCESS: No React errors detected in the HTML response!');
        } else {
          console.log('\n⚠️  WARNING: Potential errors detected in the response');
        }
      } else {
        console.log('❌ Page failed to load properly');
      }
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Request failed: ${e.message}`);
  });

  req.end();
};

testReactErrors();