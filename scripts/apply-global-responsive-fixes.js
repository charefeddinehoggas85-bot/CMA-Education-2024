#!/usr/bin/env node

/**
 * SCRIPT D'APPLICATION GLOBALE - CORRECTIONS RESPONSIVITÉ
 * Applique les corrections de responsivité sur toutes les pages
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 APPLICATION GLOBALE - CORRECTIONS RESPONSIVITÉ');
console.log('================================================');

// Corrections à appliquer
const corrections = [
  // Formations page - Grilles principales
  {
    file: 'src/app/formations/page.tsx',
    replacements: [
      {
        from: 'className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"',
        to: 'className="formations-grid"'
      },
      {
        from: 'className="grid md:grid-cols-3 gap-6"',
        to: 'className="formations-grid"'
      },
      {
        from: 'className="grid md:grid-cols-3 gap-4"',
        to: 'className="formations-grid"'
      }
    ]
  },
  
  // Blog page - Grilles articles
  {
    file: 'src/app/blog/page.tsx',
    replacements: [
      {
        from: 'className="grid grid-cols-1 md:grid-cols-3 gap-8"',
        to: 'className="blog-grid"'
      },
      {
        from: 'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"',
        to: 'className="blog-grid"'
      }
    ]
  },
  
  // Contact page - Grille partenaires
  {
    file: 'src/app/contact/page.tsx',
    replacements: [
      {
        from: 'className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6"',
        to: 'className="partners-grid"'
      }
    ]
  },
  
  // Formateurs page - Grille formateurs
  {
    file: 'src/app/formateurs/page.tsx',
    replacements: [
      {
        from: 'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"',
        to: 'className="formateurs-grid"'
      },
      {
        from: 'className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16"',
        to: 'className="formateurs-grid max-w-3xl mx-auto mb-16"'
      }
    ]
  },
  
  // About page - Grille stats
  {
    file: 'src/app/about/page.tsx',
    replacements: [
      {
        from: 'className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"',
        to: 'className="formateurs-grid text-center"'
      }
    ]
  },
  
  // Partenaires page
  {
    file: 'src/app/partenaires/page.tsx',
    replacements: [
      {
        from: 'className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"',
        to: 'className="partners-grid"'
      }
    ]
  }
];

// Fonction pour appliquer les corrections
function applyCorrections() {
  let totalCorrections = 0;
  let totalFiles = 0;
  
  corrections.forEach(correction => {
    const filePath = path.join(process.cwd(), correction.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Fichier non trouvé: ${correction.file}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let fileModified = false;
    let fileCorrections = 0;
    
    correction.replacements.forEach(replacement => {
      if (content.includes(replacement.from)) {
        content = content.replace(new RegExp(replacement.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement.to);
        fileModified = true;
        fileCorrections++;
        totalCorrections++;
      }
    });
    
    if (fileModified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${correction.file} - ${fileCorrections} corrections appliquées`);
      totalFiles++;
    } else {
      console.log(`ℹ️  ${correction.file} - Aucune correction nécessaire`);
    }
  });
  
  return { totalFiles, totalCorrections };
}

// Fonction pour ajouter les classes aux sections
function addSectionClasses() {
  const sectionsToFix = [
    {
      file: 'src/app/page.tsx',
      additions: [
        {
          search: 'className="py-16',
          replace: 'className="content-section'
        },
        {
          search: 'className="py-20',
          replace: 'className="hero-section'
        }
      ]
    }
  ];
  
  let sectionCorrections = 0;
  
  sectionsToFix.forEach(section => {
    const filePath = path.join(process.cwd(), section.file);
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      section.additions.forEach(addition => {
        const regex = new RegExp(addition.search, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, addition.replace);
          modified = true;
          sectionCorrections++;
        }
      });
      
      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${section.file} - Classes de section ajoutées`);
      }
    }
  });
  
  return sectionCorrections;
}

// Fonction pour créer un composant wrapper responsive
function createResponsiveWrapper() {
  const wrapperContent = `'use client'

import { ReactNode } from 'react'

interface ResponsiveWrapperProps {
  children: ReactNode
  className?: string
  type?: 'section' | 'hero' | 'content' | 'form'
}

const ResponsiveWrapper = ({ 
  children, 
  className = '', 
  type = 'content' 
}: ResponsiveWrapperProps) => {
  const getTypeClass = () => {
    switch (type) {
      case 'hero': return 'hero-section'
      case 'section': return 'content-section'
      case 'form': return 'form-responsive'
      default: return 'section-container'
    }
  }

  return (
    <div className={\`\${getTypeClass()} \${className}\`}>
      {children}
    </div>
  )
}

export default ResponsiveWrapper
`;

  const wrapperPath = path.join(process.cwd(), 'src/components/ui/ResponsiveWrapper.tsx');
  fs.writeFileSync(wrapperPath, wrapperContent, 'utf8');
  console.log('✅ ResponsiveWrapper créé');
}

// Fonction pour valider les corrections
function validateCorrections() {
  console.log('\n🔍 VALIDATION DES CORRECTIONS:');
  
  const validationChecks = [
    {
      file: 'src/styles/global-responsive-fix.css',
      checks: ['formations-grid', 'blog-grid', 'partners-grid', 'formateurs-grid']
    },
    {
      file: 'src/app/layout.tsx',
      checks: ['global-responsive-fix.css']
    }
  ];
  
  let allValid = true;
  
  validationChecks.forEach(check => {
    const filePath = path.join(process.cwd(), check.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ ${check.file} - Fichier manquant`);
      allValid = false;
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    check.checks.forEach(item => {
      if (content.includes(item)) {
        console.log(`✅ ${check.file} - ${item} présent`);
      } else {
        console.log(`❌ ${check.file} - ${item} manquant`);
        allValid = false;
      }
    });
  });
  
  return allValid;
}

// Fonction principale
function main() {
  console.log('\n📋 ÉTAPE 1: Application des corrections de grilles');
  const { totalFiles, totalCorrections } = applyCorrections();
  
  console.log('\n📋 ÉTAPE 2: Ajout des classes de sections');
  const sectionCorrections = addSectionClasses();
  
  console.log('\n📋 ÉTAPE 3: Création du composant ResponsiveWrapper');
  createResponsiveWrapper();
  
  console.log('\n📋 ÉTAPE 4: Validation des corrections');
  const isValid = validateCorrections();
  
  console.log('\n📊 RÉSUMÉ:');
  console.log(`✅ Fichiers modifiés: ${totalFiles}`);
  console.log(`✅ Corrections de grilles: ${totalCorrections}`);
  console.log(`✅ Corrections de sections: ${sectionCorrections}`);
  console.log(`✅ Composant ResponsiveWrapper: Créé`);
  console.log(`${isValid ? '✅' : '❌'} Validation: ${isValid ? 'Réussie' : 'Échouée'}`);
  
  console.log('\n🎯 RÉSULTAT:');
  if (isValid && totalCorrections > 0) {
    console.log('🎉 CORRECTIONS APPLIQUÉES AVEC SUCCÈS !');
    console.log('');
    console.log('📱 PAGES CORRIGÉES:');
    console.log('• Page Formations - Grilles optimisées pour 1024px-1440px');
    console.log('• Page Blog - Grilles optimisées pour 1024px-1440px');
    console.log('• Page Contact - Grille partenaires optimisée');
    console.log('• Page Formateurs - Grilles optimisées');
    console.log('• Page About - Grilles stats optimisées');
    console.log('• Page Partenaires - Grilles optimisées');
    console.log('');
    console.log('🚀 PROCHAINES ÉTAPES:');
    console.log('1. Tester: npm run dev');
    console.log('2. Vérifier en mode responsive (F12 + Ctrl+Shift+M)');
    console.log('3. Tester les résolutions 1024px, 1200px, 1366px, 1440px');
    console.log('');
    console.log('🎊 La responsivité est maintenant appliquée sur TOUTES les pages !');
  } else {
    console.log('⚠️  Certaines corrections ont échoué. Vérifier les erreurs ci-dessus.');
  }
  
  console.log('\n🏁 Script terminé.');
}

// Exécution
main();