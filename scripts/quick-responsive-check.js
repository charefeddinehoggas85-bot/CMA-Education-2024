#!/usr/bin/env node

/**
 * Test rapide de responsivité - Construction Management Academy
 * Vérifie les éléments critiques sans navigateur
 */

const fs = require('fs');
const path = require('path');

// Fichiers à analyser
const FILES_TO_CHECK = [
  'src/components/layout/Header.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/ui/FormationsCarousel.tsx',
  'tailwind.config.ts'
];

// Patterns de responsivité à vérifier
const RESPONSIVE_PATTERNS = [
  {
    name: 'Classes responsive Tailwind',
    pattern: /\b(sm:|md:|lg:|xl:|2xl:)/g,
    required: true,
    description: 'Utilisation des breakpoints Tailwind'
  },
  {
    name: 'Grilles responsive',
    pattern: /grid-cols-\d+\s+(sm:|md:|lg:|xl:|2xl:)grid-cols-\d+/g,
    required: true,
    description: 'Grilles adaptatives'
  },
  {
    name: 'Tailles fixes problématiques',
    pattern: /w-\[\d+px\]|h-\[\d+px\]/g,
    required: false,
    description: 'Tailles fixes qui peuvent poser problème'
  },
  {
    name: 'Padding/Margin responsive',
    pattern: /\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-\d+\s+(sm:|md:|lg:|xl:|2xl:)/g,
    required: true,
    description: 'Espacement adaptatif'
  },
  {
    name: 'Text responsive',
    pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\s+(sm:|md:|lg:|xl:|2xl:)/g,
    required: true,
    description: 'Tailles de texte adaptatives'
  }
];

// Problèmes courants à détecter
const COMMON_ISSUES = [
  {
    name: 'Largeur fixe trop grande',
    pattern: /w-\[([5-9]\d{2,}|[1-9]\d{3,})px\]/g,
    severity: 'ERROR',
    description: 'Largeur fixe > 500px qui peut déborder'
  },
  {
    name: 'Grid sans colonnes mobiles',
    pattern: /grid\s+(?!.*grid-cols-1).*grid-cols-[2-9]/g,
    severity: 'WARNING',
    description: 'Grille sans colonne mobile (grid-cols-1)'
  },
  {
    name: 'Menu desktop seulement',
    pattern: /hidden\s+lg:flex/g,
    severity: 'WARNING',
    description: 'Navigation cachée jusqu\'au desktop'
  },
  {
    name: 'Texte trop grand sur mobile',
    pattern: /text-[4-9]xl(?!\s+(sm:|md:|lg:|xl:|2xl:))/g,
    severity: 'WARNING',
    description: 'Texte très grand sans responsive'
  }
];

function analyzeFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {
      file: filePath,
      exists: false,
      error: 'Fichier non trouvé'
    };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const results = {
    file: filePath,
    exists: true,
    patterns: [],
    issues: [],
    score: 0
  };

  // Vérifier les patterns de responsivité
  for (const pattern of RESPONSIVE_PATTERNS) {
    const matches = content.match(pattern.pattern) || [];
    const found = matches.length > 0;
    
    results.patterns.push({
      name: pattern.name,
      found,
      count: matches.length,
      required: pattern.required,
      description: pattern.description,
      examples: matches.slice(0, 3) // Premiers exemples
    });

    if (pattern.required && found) {
      results.score += 20;
    } else if (!pattern.required && !found) {
      results.score += 10; // Bonus pour éviter les problèmes
    }
  }

  // Détecter les problèmes courants
  for (const issue of COMMON_ISSUES) {
    const matches = content.match(issue.pattern) || [];
    if (matches.length > 0) {
      results.issues.push({
        name: issue.name,
        severity: issue.severity,
        count: matches.length,
        description: issue.description,
        examples: matches.slice(0, 3)
      });

      // Pénalité selon la sévérité
      if (issue.severity === 'ERROR') {
        results.score -= 30;
      } else if (issue.severity === 'WARNING') {
        results.score -= 10;
      }
    }
  }

  // Score maximum 100
  results.score = Math.max(0, Math.min(100, results.score));

  return results;
}

function generateReport(results) {
  console.log('\n🎯 ANALYSE RAPIDE DE RESPONSIVITÉ\n');
  console.log('='.repeat(60));

  let totalScore = 0;
  let fileCount = 0;

  for (const result of results) {
    if (!result.exists) {
      console.log(`❌ ${result.file}: ${result.error}`);
      continue;
    }

    fileCount++;
    totalScore += result.score;

    const scoreColor = result.score >= 80 ? '🟢' : result.score >= 60 ? '🟡' : '🔴';
    console.log(`\n${scoreColor} ${path.basename(result.file)} - Score: ${result.score}/100`);

    // Patterns trouvés
    const goodPatterns = result.patterns.filter(p => p.found && p.required);
    const missingPatterns = result.patterns.filter(p => !p.found && p.required);

    if (goodPatterns.length > 0) {
      console.log(`  ✅ Patterns responsifs: ${goodPatterns.length}`);
      for (const pattern of goodPatterns.slice(0, 2)) {
        console.log(`     • ${pattern.name} (${pattern.count} occurrences)`);
      }
    }

    if (missingPatterns.length > 0) {
      console.log(`  ⚠️  Patterns manquants: ${missingPatterns.length}`);
      for (const pattern of missingPatterns) {
        console.log(`     • ${pattern.name}: ${pattern.description}`);
      }
    }

    // Problèmes détectés
    if (result.issues.length > 0) {
      console.log(`  🚨 Problèmes détectés: ${result.issues.length}`);
      for (const issue of result.issues) {
        const icon = issue.severity === 'ERROR' ? '❌' : '⚠️';
        console.log(`     ${icon} ${issue.name} (${issue.count}x)`);
        if (issue.examples.length > 0) {
          console.log(`        Ex: ${issue.examples[0]}`);
        }
      }
    }
  }

  // Résumé global
  const averageScore = fileCount > 0 ? Math.round(totalScore / fileCount) : 0;
  console.log('\n📊 RÉSUMÉ GLOBAL');
  console.log('='.repeat(30));
  console.log(`Score moyen: ${averageScore}/100`);
  console.log(`Fichiers analysés: ${fileCount}`);

  if (averageScore >= 80) {
    console.log('🎉 Excellent ! Votre code est bien responsive.');
  } else if (averageScore >= 60) {
    console.log('👍 Bon travail ! Quelques améliorations possibles.');
  } else {
    console.log('⚠️  Des améliorations importantes sont nécessaires.');
  }

  // Recommandations
  console.log('\n🔧 RECOMMANDATIONS RAPIDES:');
  console.log('• Ajouter grid-cols-1 pour mobile sur toutes les grilles');
  console.log('• Utiliser text-2xl md:text-4xl lg:text-6xl pour les titres');
  console.log('• Remplacer les largeurs fixes par des classes responsive');
  console.log('• Tester sur mobile avec le debugger intégré');
  console.log('• Utiliser md:hidden lg:flex au lieu de hidden lg:flex');

  return averageScore;
}

function main() {
  console.log('🚀 Démarrage de l\'analyse rapide...');
  
  const results = [];
  
  for (const file of FILES_TO_CHECK) {
    const result = analyzeFile(file);
    results.push(result);
  }

  const averageScore = generateReport(results);

  // Conseils selon le score
  console.log('\n💡 PROCHAINES ÉTAPES:');
  if (averageScore >= 80) {
    console.log('• Tester avec le script complet: npm run test:responsive');
    console.log('• Valider sur appareils réels');
    console.log('• Optimiser les performances mobile');
  } else {
    console.log('• Corriger les problèmes identifiés');
    console.log('• Relancer cette analyse');
    console.log('• Consulter le guide RESPONSIVE_IMPROVEMENTS_GUIDE.md');
  }

  console.log('\n📄 Pour plus de détails: cat RESPONSIVE_IMPROVEMENTS_GUIDE.md');
  
  process.exit(averageScore >= 60 ? 0 : 1);
}

if (require.main === module) {
  main();
}