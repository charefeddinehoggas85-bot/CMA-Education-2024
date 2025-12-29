const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
  const runnerResult = await lighthouse('http://localhost:3000', options);

  console.log('Performance Score:', runnerResult.lhr.categories.performance.score * 100);
  console.log('FCP:', runnerResult.lhr.audits['first-contentful-paint'].displayValue);
  console.log('LCP:', runnerResult.lhr.audits['largest-contentful-paint'].displayValue);
  console.log('CLS:', runnerResult.lhr.audits['cumulative-layout-shift'].displayValue);

  await chrome.kill();
}

runLighthouse();