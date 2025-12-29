const http = require('http');

// Test favicon.ico
const testFavicon = () => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/favicon.ico',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`Favicon status: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('✅ Favicon.ico is accessible');
    } else {
      console.log('❌ Favicon.ico not found');
    }
  });

  req.on('error', (e) => {
    console.error(`Problem with favicon request: ${e.message}`);
  });

  req.end();
};

// Test favicon.svg
const testFaviconSvg = () => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/favicon.svg',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`Favicon SVG status: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('✅ Favicon.svg is accessible');
    } else {
      console.log('❌ Favicon.svg not found');
    }
  });

  req.on('error', (e) => {
    console.error(`Problem with favicon SVG request: ${e.message}`);
  });

  req.end();
};

console.log('Testing favicon files...');
testFavicon();
setTimeout(testFaviconSvg, 100);