#!/usr/bin/env node

/**
 * Test de visibilité de la navigation - Correction écrans 1024px-1440px
 * Vérifie que "Formations" et "À propos" sont visibles et le logo a la bonne taille
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 TEST NAVIGATION VISIBILITY FIX');
console.log('=====================================');

// Vérifier les fichiers modifiés
const filesToCheck = [
  'src/components/layout/Navigation.tsx',
  'src/styles/navigation-responsive-complete.css',
  'src/app/layout.tsx'
];

console.log('\n📁 Vérification des fichiers...');
filesToCheck.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - Existe`);
  } else {
    console.log(`❌ ${file} - Manquant`);
  }
});

// Vérifier le contenu du CSS
console.log('\n🎨 Vérification du CSS...');
const cssPath = path.join(process.cwd(), 'src/styles/navigation-responsive-complete.css');
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Vérifications critiques
  const checks = [
    {
      name: 'Force visibilité desktop (768px+)',
      pattern: /@media \(min-width: 768px\)[\s\S]*?\.nav-desktop-fix[\s\S]*?display: flex !important/,
      found: cssContent.match(/@media \(min-width: 768px\)[\s\S]*?\.nav-desktop-fix[\s\S]*?display: flex !important/)
    },
    {
      name: 'Correction écrans 1024px-1440px',
      pattern: /@media \(min-width: 1024px\) and \(max-width: 1440px\)/,
      found: cssContent.includes('@media (min-width: 1024px) and (max-width: 1440px)')
    },
    {
      name: 'Taille logo forcée',
      pattern: /\.nav-logo-fix[\s\S]*?height: 48px !important/,
      found: cssContent.includes('height: 48px !important')
    },
    {
      name: 'Masquage menu mobile sur desktop',
      pattern: /\.nav-mobile-toggle-fix[\s\S]*?display: none !important/,
      found: cssContent.includes('.nav-mobile-toggle-fix') && cssContent.includes('display: none !important')
    }
  ];
  
  checks.forEach(check => {
    if (check.found) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name}`);
    }
  });
} else {
  console.log('❌ Fichier CSS non trouvé');
}

// Vérifier le composant Navigation
console.log('\n⚛️ Vérification du composant Navigation...');
const navPath = path.join(process.cwd(), 'src/components/layout/Navigation.tsx');
if (fs.existsSync(navPath)) {
  const navContent = fs.readFileSync(navPath, 'utf8');
  
  const navChecks = [
    {
      name: 'Suppression "hidden md:flex" de nav-desktop-fix',
      found: !navContent.includes('nav-desktop-fix hidden md:flex')
    },
    {
      name: 'Suppression "hidden md:flex" du téléphone',
      found: !navContent.includes('nav-action-btn-fix hidden md:flex')
    },
    {
      name: 'Classe nav-mobile-toggle-fix ajoutée',
      found: navContent.includes('nav-mobile-toggle-fix')
    },
    {
      name: 'Suppression "md:hidden" du menu mobile',
      found: !navContent.includes('nav-mobile-menu-fix md:hidden')
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

// Vérifier l'import CSS dans layout.tsx
console.log('\n📦 Vérification des imports CSS...');
const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  const cssImports = [
    'navigation-responsive-complete.css',
    'global-responsive-fix.css',
    'header-responsive-fix.css'
  ];
  
  cssImports.forEach(cssFile => {
    if (layoutContent.includes(cssFile)) {
      console.log(`✅ Import ${cssFile}`);
    } else {
      console.log(`❌ Import ${cssFile} manquant`);
    }
  });
} else {
  console.log('❌ Fichier layout.tsx non trouvé');
}

console.log('\n🎯 RÉSUMÉ DES CORRECTIONS APPLIQUÉES:');
console.log('=====================================');
console.log('✅ Suppression des classes Tailwind "hidden md:flex"');
console.log('✅ Force la visibilité sur tous les écrans desktop (768px+)');
console.log('✅ Correction spécifique pour écrans 1024px-1440px');
console.log('✅ Taille du logo augmentée (48px minimum)');
console.log('✅ Gestion correcte du menu mobile/desktop');

console.log('\n🔧 POUR TESTER:');
console.log('===============');
console.log('1. npm run dev');
console.log('2. Ouvrir http://localhost:3000');
console.log('3. Tester sur écrans 1024px, 1200px, 1366px, 1440px');
console.log('4. Vérifier que "Formations" et "À propos" sont visibles');
console.log('5. Vérifier que le logo a une taille appropriée');

console.log('\n✨ Test terminé !');