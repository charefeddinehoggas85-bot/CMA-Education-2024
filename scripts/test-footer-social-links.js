const puppeteer = require('puppeteer');

async function testFooterSocialLinks() {
  console.log('🧪 Test des liens réseaux sociaux dans le footer...');
  
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    // Aller sur la page d'accueil
    console.log('📱 Navigation vers la page d\'accueil...');
    await page.goto('http://localhost:3001', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Attendre que le footer soit chargé
    await page.waitForSelector('footer', { timeout: 10000 });
    console.log('✅ Footer détecté');
    
    // Scroller vers le footer
    await page.evaluate(() => {
      document.querySelector('footer').scrollIntoView();
    });
    
    await page.waitForTimeout(2000);
    
    // Vérifier la présence des liens sociaux
    const socialLinks = await page.evaluate(() => {
      const links = [];
      
      // Chercher les liens Facebook
      const facebookLinks = document.querySelectorAll('a[href*="facebook.com"]');
      facebookLinks.forEach(link => {
        links.push({
          platform: 'Facebook',
          href: link.href,
          visible: link.offsetParent !== null
        });
      });
      
      // Chercher les liens TikTok
      const tiktokLinks = document.querySelectorAll('a[href*="tiktok.com"]');
      tiktokLinks.forEach(link => {
        links.push({
          platform: 'TikTok',
          href: link.href,
          visible: link.offsetParent !== null
        });
      });
      
      // Chercher les autres liens sociaux
      const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
      linkedinLinks.forEach(link => {
        links.push({
          platform: 'LinkedIn',
          href: link.href,
          visible: link.offsetParent !== null
        });
      });
      
      const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
      instagramLinks.forEach(link => {
        links.push({
          platform: 'Instagram',
          href: link.href,
          visible: link.offsetParent !== null
        });
      });
      
      const youtubeLinks = document.querySelectorAll('a[href*="youtube.com"]');
      youtubeLinks.forEach(link => {
        links.push({
          platform: 'YouTube',
          href: link.href,
          visible: link.offsetParent !== null
        });
      });
      
      return links;
    });
    
    console.log('📱 Liens sociaux trouvés:');
    socialLinks.forEach(link => {
      const status = link.visible ? '✅ Visible' : '❌ Caché';
      console.log(`  ${link.platform}: ${link.href} - ${status}`);
    });
    
    // Vérifier spécifiquement les nouveaux liens
    const facebookLink = socialLinks.find(link => 
      link.platform === 'Facebook' && 
      link.href.includes('Constructionmanagementacademy')
    );
    
    const tiktokLink = socialLinks.find(link => 
      link.platform === 'TikTok' && 
      link.href.includes('@cmaeducation')
    );
    
    if (facebookLink) {
      console.log('✅ Nouveau lien Facebook détecté:', facebookLink.href);
    } else {
      console.log('❌ Nouveau lien Facebook non trouvé');
    }
    
    if (tiktokLink) {
      console.log('✅ Nouveau lien TikTok détecté:', tiktokLink.href);
    } else {
      console.log('❌ Nouveau lien TikTok non trouvé');
    }
    
    // Prendre une capture d'écran du footer
    const footerElement = await page.$('footer');
    if (footerElement) {
      await footerElement.screenshot({ 
        path: 'footer-social-links-test.png',
        type: 'png'
      });
      console.log('📸 Capture d\'écran sauvegardée: footer-social-links-test.png');
    }
    
    // Test de clic sur les liens (sans naviguer)
    console.log('🖱️ Test des clics sur les liens sociaux...');
    
    for (const link of socialLinks) {
      if (link.visible) {
        try {
          await page.evaluate((href) => {
            const linkElement = document.querySelector(`a[href="${href}"]`);
            if (linkElement) {
              // Simuler un clic sans naviguer
              const event = new MouseEvent('click', { bubbles: true });
              linkElement.dispatchEvent(event);
            }
          }, link.href);
          console.log(`✅ Clic simulé sur ${link.platform}`);
        } catch (error) {
          console.log(`❌ Erreur clic ${link.platform}:`, error.message);
        }
      }
    }
    
    console.log('🎉 Test terminé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Exécution
if (require.main === module) {
  testFooterSocialLinks()
    .then(() => {
      console.log('✨ Test des liens sociaux terminé');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Erreur fatale:', error);
      process.exit(1);
    });
}

module.exports = { testFooterSocialLinks };