// Debug script to test FormationsGallery rendering
const puppeteer = require('puppeteer');

async function debugGallery() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Listen to console logs
  page.on('console', msg => {
    if (msg.text().includes('FormationsGallery')) {
      console.log('🎯 GALLERY LOG:', msg.text());
    }
  });
  
  try {
    console.log('🚀 Navigating to homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    console.log('📋 Checking for FormationsGallery elements...');
    
    // Check if gallery section exists
    const gallerySection = await page.$('section:has-text("Explorez nos formations par catégorie")');
    console.log('Gallery section found:', !!gallerySection);
    
    // Check for carousel elements
    const carousels = await page.$$('[class*="carousel"]');
    console.log('Carousel elements found:', carousels.length);
    
    // Check for category titles
    const categoryTitles = await page.$$eval('h3', elements => 
      elements.map(el => el.textContent).filter(text => 
        text.includes('Alternance') || text.includes('Reconversion') || text.includes('VAE')
      )
    );
    console.log('Category titles found:', categoryTitles);
    
    // Wait a bit to see if components load
    await page.waitForTimeout(3000);
    
    // Take screenshot
    await page.screenshot({ path: 'gallery-debug.png', fullPage: true });
    console.log('📸 Screenshot saved as gallery-debug.png');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

debugGallery();