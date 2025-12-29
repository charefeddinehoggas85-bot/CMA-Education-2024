#!/usr/bin/env node

/**
 * Script de test pour valider les améliorations de responsivité
 * Construction Management Academy
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration des breakpoints à tester
const BREAKPOINTS = [
  { name: 'Mobile SE', width: 375, height: 667 },
  { name: 'Mobile Large', width: 414, height: 896 },
  { name: 'Tablet Portrait', width: 768, height: 1024 },
  { name: 'Tablet Landscape', width: 1024, height: 768 },
  { name: 'Desktop', width: 1280, height: 720 },
  { name: 'Large Desktop', width: 1920, height: 1080 }
];

// Pages à tester
const PAGES_TO_TEST = [
  { name: 'Homepage', url: 'http://localhost:3000' },
  { name: 'Formations', url: 'http://localhost:3000/formations' },
  { name: 'About', url: 'http://localhost:3000/about' },
  { name: 'Contact', url: 'http://localhost:3000/contact' }
];

// Tests de responsivité
const RESPONSIVE_TESTS = [
  {
    name: 'Header Logo Size',
    selector: 'header img',
    test: async (page, element) => {
      const box = await element.boundingBox();
      return box && box.width > 0 && box.width < 200; // Logo ne doit pas être trop grand
    }
  },
  {
    name: 'Mobile Menu Button',
    selector: 'button[aria-label*="menu"], button:has(svg)',
    test: async (page, element, viewport) => {
      if (viewport.width < 768) {
        const isVisible = await element.isIntersectingViewport();
        return isVisible;
      }
      return true; // Pas nécessaire sur desktop
    }
  },
  {
    name: 'No Horizontal Overflow',
    selector: 'body',
    test: async (page) => {
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      return scrollWidth <= clientWidth + 5; // Tolérance de 5px
    }
  },
  {
    name: 'Footer Grid Responsive',
    selector: 'footer .grid',
    test: async (page, element, viewport) => {
      const computedStyle = await page.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      }, element);
      
      if (viewport.width < 768) {
        return computedStyle.includes('1fr'); // 1 colonne sur mobile
      } else if (viewport.width < 1024) {
        return computedStyle.split(' ').length === 2; // 2 colonnes sur tablet
      } else {
        return computedStyle.split(' ').length >= 4; // 4 colonnes sur desktop
      }
    }
  },
  {
    name: 'Text Readability',
    selector: 'h1, h2, h3, p',
    test: async (page, element) => {
      const fontSize = await page.evaluate((el) => {
        return parseInt(window.getComputedStyle(el).fontSize);
      }, element);
      return fontSize >= 14; // Taille minimum pour la lisibilité
    }
  }
];

async function runResponsiveTests() {
  console.log('🚀 Démarrage des tests de responsivité...\n');
  
  const browser = await puppeteer.launch({
    headless: false, // Afficher le navigateur pour debug
    defaultViewport: null
  });

  const results = [];

  try {
    for (const page_config of PAGES_TO_TEST) {
      console.log(`📄 Test de la page: ${page_config.name}`);
      
      for (const breakpoint of BREAKPOINTS) {
        console.log(`  📱 Breakpoint: ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`);
        
        const page = await browser.newPage();
        await page.setViewport({
          width: breakpoint.width,
          height: breakpoint.height
        });

        try {
          // Charger la page
          await page.goto(page_config.url, { 
            waitUntil: 'networkidle2',
            timeout: 10000 
          });

          // Attendre que le contenu soit chargé
          await page.waitForTimeout(2000);

          const pageResults = {
            page: page_config.name,
            breakpoint: breakpoint.name,
            viewport: breakpoint,
            tests: []
          };

          // Exécuter chaque test
          for (const test of RESPONSIVE_TESTS) {
            try {
              const elements = await page.$$(test.selector);
              
              if (elements.length === 0) {
                pageResults.tests.push({
                  name: test.name,
                  status: 'SKIP',
                  message: `Sélecteur non trouvé: ${test.selector}`
                });
                continue;
              }

              // Tester le premier élément trouvé
              const element = elements[0];
              const testResult = await test.test(page, element, breakpoint);

              pageResults.tests.push({
                name: test.name,
                status: testResult ? 'PASS' : 'FAIL',
                message: testResult ? 'Test réussi' : 'Test échoué'
              });

              console.log(`    ${testResult ? '✅' : '❌'} ${test.name}`);

            } catch (error) {
              pageResults.tests.push({
                name: test.name,
                status: 'ERROR',
                message: error.message
              });
              console.log(`    ⚠️  ${test.name}: ${error.message}`);
            }
          }

          results.push(pageResults);

        } catch (error) {
          console.log(`    ❌ Erreur de chargement: ${error.message}`);
          results.push({
            page: page_config.name,
            breakpoint: breakpoint.name,
            viewport: breakpoint,
            error: error.message,
            tests: []
          });
        }

        await page.close();
      }
      
      console.log(''); // Ligne vide entre les pages
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  } finally {
    await browser.close();
  }

  // Générer le rapport
  generateReport(results);
  
  return results;
}

function generateReport(results) {
  console.log('\n📊 RAPPORT DE TESTS DE RESPONSIVITÉ\n');
  console.log('='.repeat(60));

  const summary = {
    total: 0,
    passed: 0,
    failed: 0,
    errors: 0,
    skipped: 0
  };

  let reportContent = `# Rapport de Tests de Responsivité\n\n`;
  reportContent += `**Date:** ${new Date().toLocaleString()}\n\n`;

  for (const result of results) {
    if (result.error) {
      console.log(`❌ ${result.page} - ${result.breakpoint}: ERREUR`);
      reportContent += `## ❌ ${result.page} - ${result.breakpoint}\n**Erreur:** ${result.error}\n\n`;
      continue;
    }

    console.log(`\n📄 ${result.page} - ${result.breakpoint}:`);
    reportContent += `## ${result.page} - ${result.breakpoint}\n\n`;

    for (const test of result.tests) {
      summary.total++;
      
      const icon = {
        'PASS': '✅',
        'FAIL': '❌',
        'ERROR': '⚠️',
        'SKIP': '⏭️'
      }[test.status];

      console.log(`  ${icon} ${test.name}: ${test.message}`);
      reportContent += `- ${icon} **${test.name}:** ${test.message}\n`;

      if (test.status === 'PASS') summary.passed++;
      else if (test.status === 'FAIL') summary.failed++;
      else if (test.status === 'ERROR') summary.errors++;
      else if (test.status === 'SKIP') summary.skipped++;
    }
    
    reportContent += '\n';
  }

  // Résumé
  console.log('\n📊 RÉSUMÉ:');
  console.log(`  Total: ${summary.total}`);
  console.log(`  ✅ Réussis: ${summary.passed}`);
  console.log(`  ❌ Échoués: ${summary.failed}`);
  console.log(`  ⚠️  Erreurs: ${summary.errors}`);
  console.log(`  ⏭️  Ignorés: ${summary.skipped}`);

  const successRate = summary.total > 0 ? ((summary.passed / summary.total) * 100).toFixed(1) : 0;
  console.log(`  📈 Taux de réussite: ${successRate}%`);

  reportContent += `## 📊 Résumé\n\n`;
  reportContent += `- **Total:** ${summary.total}\n`;
  reportContent += `- **✅ Réussis:** ${summary.passed}\n`;
  reportContent += `- **❌ Échoués:** ${summary.failed}\n`;
  reportContent += `- **⚠️ Erreurs:** ${summary.errors}\n`;
  reportContent += `- **⏭️ Ignorés:** ${summary.skipped}\n`;
  reportContent += `- **📈 Taux de réussite:** ${successRate}%\n\n`;

  // Recommandations
  if (summary.failed > 0 || summary.errors > 0) {
    reportContent += `## 🔧 Recommandations\n\n`;
    if (summary.failed > 0) {
      reportContent += `- Corriger les ${summary.failed} tests échoués\n`;
    }
    if (summary.errors > 0) {
      reportContent += `- Résoudre les ${summary.errors} erreurs techniques\n`;
    }
    reportContent += `- Tester sur appareils réels\n`;
    reportContent += `- Valider avec Lighthouse\n\n`;
  }

  // Sauvegarder le rapport
  const reportPath = path.join(__dirname, '..', 'responsive-test-report.md');
  fs.writeFileSync(reportPath, reportContent);
  
  console.log(`\n📄 Rapport sauvegardé: ${reportPath}`);
  
  if (successRate >= 90) {
    console.log('\n🎉 Excellent ! Votre site est bien responsive.');
  } else if (successRate >= 70) {
    console.log('\n👍 Bon travail ! Quelques améliorations possibles.');
  } else {
    console.log('\n⚠️  Des améliorations importantes sont nécessaires.');
  }
}

// Exécuter les tests si le script est appelé directement
if (require.main === module) {
  runResponsiveTests().catch(console.error);
}

module.exports = { runResponsiveTests };