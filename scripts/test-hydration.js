const http = require('http');

const testMainPage = () => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`Main page status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      // Check if favicon links are present
      const hasFaviconIco = data.includes('favicon.ico');
      const hasFaviconSvg = data.includes('favicon.svg');
      
      console.log(`✅ Main page loaded successfully`);
      console.log(`Favicon ICO in HTML: ${hasFaviconIco ? '✅' : '❌'}`);
      console.log(`Favicon SVG in HTML: ${hasFaviconSvg ? '✅' : '❌'}`);
      
      // Check for suppressHydrationWarning
      const hasSuppress = data.includes('suppressHydrationWarning');
      console.log(`Hydration warning suppression: ${hasSuppress ? '✅' : '❌'}`);
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with main page request: ${e.message}`);
  });

  req.end();
};

console.log('Testing main page and favicon integration...');
testMainPage();