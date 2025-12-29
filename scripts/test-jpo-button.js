const puppeteer = require('puppeteer');

async function testJPOButton() {
  console.log('🔍 Test du bouton JPO dans le header...');
  
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    // Aller sur la page d'accueil
    console.log('📱 Navigation vers localhost:3000...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });
    
    // Attendre que le header soit chargé
    await page.waitForSelector('header', { timeout: 5000 });
    console.log('✅ Header chargé');
    
    // Chercher le bouton JPO
    const jpoButton = await page.$('a[href*="1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ"]');
    
    if (jpoButton) {
      console.log('✅ Bouton JPO trouvé dans le DOM');
      
      // Vérifier s'il est visible
      const isVisible = await page.evaluate((element) => {
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      }, jpoButton);
      
      if (isVisible) {
        console.log('✅ Bouton JPO visible à l\'écran');
        
        // Obtenir le texte du bouton
        const buttonText = await page.evaluate((element) => {
          return element.textContent.trim();
        }, jpoButton);
        
        console.log(`📝 Texte du bouton: "${buttonText}"`);
        
        // Vérifier la position
        const boundingBox = await jpoButton.boundingBox();
        console.log(`📍 Position: x=${boundingBox.x}, y=${boundingBox.y}, width=${boundingBox.width}, height=${boundingBox.height}`);
        
      } else {
        console.log('❌ Bouton JPO présent mais pas visible (CSS hidden)');
        
        // Vérifier les classes CSS
        const classes = await page.evaluate((element) => {
          return element.className;
        }, jpoButton);
        console.log(`🎨 Classes CSS: ${classes}`);
      }
    } else {
      console.log('❌ Bouton JPO non trouvé dans le DOM');
      
      // Lister tous les liens dans le header
      const headerLinks = await page.evaluate(() => {
        const header = document.querySelector('header');
        const links = header ? header.querySelectorAll('a') : [];
        return Array.from(links).map(link => ({
          href: link.href,
          text: link.textContent.trim(),
          classes: link.className
        }));
      });
      
      console.log('🔗 Liens trouvés dans le header:');
      headerLinks.forEach((link, index) => {
        console.log(`  ${index + 1}. "${link.text}" -> ${link.href}`);
        console.log(`     Classes: ${link.classes}`);
      });
    }
    
    // Vérifier aussi le bouton Candidater pour comparaison
    const candidateButton = await page.$('a[href*="cma-education.ymag.cloud"]');
    if (candidateButton) {
      console.log('✅ Bouton Candidater trouvé pour comparaison');
    } else {
      console.log('❌ Bouton Candidater non trouvé');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Exécuter le test
testJPOButton().catch(console.error);