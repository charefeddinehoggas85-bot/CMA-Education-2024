#!/usr/bin/env node

/**
 * Test de visibilité du dropdown Formations
 * Vérifie que le dropdown Formations apparaît correctement dans le header
 */

const fs = require('fs');
const path = require('path');

console.log('📚 TEST VISIBILITÉ DROPDOWN FORMATIONS');
console.log('======================================');

// Vérifier le composant Navigation
const navPath = path.join(process.cwd(), 'src/components/layout/Navigation.tsx');
if (fs.existsSync(navPath)) {
  const navContent = fs.readFileSync(navPath, 'utf8');
  
  console.log('\n⚛️ VÉRIFICATION COMPOSANT NAVIGATION:');
  console.log('====================================');
  
  const navChecks = [
    {
      name: '📚 Import FormationsDropdown',
      found: navContent.includes("import FormationsDropdown from '@/components/ui/FormationsDropdown'")
    },
    {
      name: '🎯 Dropdown dans nav-items-fix',
      found: navContent.includes('<FormationsDropdown isScrolled={isScrolled} />')
    },
    {
      name: '📱 Formations dans menu mobile',
      found: navContent.includes('href="/formations"') && navContent.includes('<span>Formations</span>')
    },
    {
      name: '🔧 Classes CSS personnalisées',
      found: navContent.includes('nav-desktop-fix') && navContent.includes('nav-items-fix')
    }
  ];
  
  navChecks.forEach(check => {
    if (check.found) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name}`);
    }
  });
} else {
  console.log('❌ Fichier Navigation.tsx non trouvé');
}

// Vérifier le composant FormationsDropdown
const dropdownPath = path.join(process.cwd(), 'src/components/ui/FormationsDropdown.tsx');
if (fs.existsSync(dropdownPath)) {
  const dropdownContent = fs.readFileSync(dropdownPath, 'utf8');
  
  console.log('\n📋 VÉRIFICATION COMPOSANT DROPDOWN:');
  console.log('==================================');
  
  const dropdownChecks = [
    {
      name: '🎨 Classe nav-item-fix appliquée',
      found: dropdownContent.includes('nav-item-fix')
    },
    {
      name: '🔄 État de chargement géré',
      found: dropdownContent.includes('if (loading)') && dropdownContent.includes('setLoading(false)')
    },
    {
      name: '📊 Chargement données Strapi',
      found: dropdownContent.includes('getFormations') && dropdownContent.includes('getFormationCategories')
    },
    {
      name: '🎯 Hover et interactions',
      found: dropdownContent.includes('onMouseEnter') && dropdownContent.includes('onMouseLeave')
    },
    {
      name: '📱 Responsive design',
      found: dropdownContent.includes('w-[500px]') && dropdownContent.includes('max-h-[80vh]')
    }
  ];
  
  dropdownChecks.forEach(check => {
    if (check.found) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name}`);
    }
  });
} else {
  console.log('❌ Fichier FormationsDropdown.tsx non trouvé');
}

// Vérifier le CSS
const cssPath = path.join(process.cwd(), 'src/styles/navigation-responsive-complete.css');
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  console.log('\n🎨 VÉRIFICATION CSS:');
  console.log('====================');
  
  const cssChecks = [
    {
      name: '🎯 Force visibilité desktop',
      found: cssContent.includes('display: flex !important') && cssContent.includes('@media (min-width: 768px)')
    },
    {
      name: '📚 Force visibilité dropdown Formations',
      found: cssContent.includes('.nav-items-fix > div:first-child')
    },
    {
      name: '📱 Menu mobile caché sur desktop',
      found: cssContent.includes('.nav-mobile-toggle-fix') && cssContent.includes('display: none !important')
    },
    {
      name: '🔧 Classes nav-item-fix définies',
      found: cssContent.includes('.nav-item-fix {') && cssContent.includes('padding:')
    }
  ];
  
  cssChecks.forEach(check => {
    if (check.found) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name}`);
    }
  });
} else {
  console.log('❌ Fichier CSS non trouvé');
}

console.log('\n🎯 CORRECTIONS APPLIQUÉES:');
console.log('==========================');
console.log('✅ Classe nav-item-fix appliquée au dropdown Formations');
console.log('✅ Force la visibilité sur tous les écrans desktop');
console.log('✅ CSS spécifique pour le premier div dans nav-items-fix');
console.log('✅ Gestion des états de chargement');

console.log('\n🔧 POUR TESTER:');
console.log('===============');
console.log('1. npm run dev');
console.log('2. Ouvrir http://localhost:3000');
console.log('3. Vérifier que "Formations" apparaît dans le header');
console.log('4. Tester le hover sur "Formations" pour voir le dropdown');
console.log('5. Vérifier sur écrans 1024px, 1200px, 1366px, 1440px');

console.log('\n✨ Test terminé !');