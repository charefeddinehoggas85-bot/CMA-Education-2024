#!/usr/bin/env node

/**
 * Script de vérification du rebranding Construction Management Academy
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Vérification du rebranding Construction Management Academy...\n')

// Fichiers à vérifier
const filesToCheck = [
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/ContactSection.tsx',
  'src/components/sections/AccessibilityBanner.tsx',
  'src/components/sections/TestimonialsSection.tsx',
  'src/components/sections/SocialProofSection.tsx',
  'src/components/sections/ModalitesSection.tsx',
  'src/components/sections/ValuesSection.tsx',
  'src/components/sections/AboutSection.tsx'
]

// Vérifications à effectuer
const checks = [
  {
    name: '✅ Construction Management Academy utilisé',
    pattern: /Construction Management Academy/,
    shouldFind: true
  },
  {
    name: '❌ Ancien "CMA Education" supprimé',
    pattern: /CMA Education/,
    shouldFind: false
  },
  {
    name: '❌ Ancien "CMA" seul supprimé (sauf URLs)',
    pattern: /\bCMA\b(?!-)/,
    shouldFind: false
  },
  {
    name: '✅ Niveaux de formation mis à jour',
    pattern: /Niveau [567]/,
    shouldFind: true
  },
  {
    name: '❌ Anciens "Bac+" supprimés (sauf dans parenthèses)',
    pattern: /\bBac\+[0-9](?!\))/,
    shouldFind: false
  },
  {
    name: '✅ École Supérieure utilisée',
    pattern: /École Supérieure/,
    shouldFind: true
  }
]

let totalIssues = 0
let totalSuccess = 0

filesToCheck.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath)
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Fichier non trouvé: ${filePath}`)
    return
  }
  
  console.log(`\n📄 ${path.basename(filePath)}:`)
  
  const content = fs.readFileSync(fullPath, 'utf8')
  
  checks.forEach(check => {
    const matches = content.match(check.pattern)
    const hasMatches = matches && matches.length > 0
    
    if (check.shouldFind && hasMatches) {
      console.log(`  ✅ ${check.name} (${matches.length} occurrence(s))`)
      totalSuccess++
    } else if (!check.shouldFind && !hasMatches) {
      console.log(`  ✅ ${check.name}`)
      totalSuccess++
    } else if (check.shouldFind && !hasMatches) {
      console.log(`  ❌ ${check.name} - MANQUANT`)
      totalIssues++
    } else if (!check.shouldFind && hasMatches) {
      console.log(`  ❌ ${check.name} - TROUVÉ: ${matches.slice(0, 3).join(', ')}`)
      totalIssues++
    }
  })
})

// Vérifications spéciales
console.log(`\n🔍 Vérifications spéciales:`)

// Vérifier les emails
const contactSection = path.join(__dirname, '..', 'src/components/sections/ContactSection.tsx')
if (fs.existsSync(contactSection)) {
  const contactContent = fs.readFileSync(contactSection, 'utf8')
  if (contactContent.includes('construction-management-academy.fr')) {
    console.log(`  ✅ Nouveaux emails avec domaine construction-management-academy.fr`)
    totalSuccess++
  } else {
    console.log(`  ❌ Emails non mis à jour vers construction-management-academy.fr`)
    totalIssues++
  }
}

// Vérifier le titre principal
const heroSection = path.join(__dirname, '..', 'src/components/sections/HeroSection.tsx')
if (fs.existsSync(heroSection)) {
  const heroContent = fs.readFileSync(heroSection, 'utf8')
  if (heroContent.includes('Construction Management Academy - Devenez')) {
    console.log(`  ✅ Titre principal mis à jour`)
    totalSuccess++
  } else {
    console.log(`  ❌ Titre principal non mis à jour`)
    totalIssues++
  }
}

// Résumé final
console.log(`\n📊 Résumé de la vérification:`)
console.log(`   ✅ Vérifications réussies: ${totalSuccess}`)
console.log(`   ❌ Problèmes détectés: ${totalIssues}`)

if (totalIssues === 0) {
  console.log(`\n🎉 Parfait ! Le rebranding vers Construction Management Academy est complet !`)
  console.log(`\n🏗️  Changements appliqués:`)
  console.log(`   • CMA → Construction Management Academy`)
  console.log(`   • Centre de Formation → École Supérieure de Management`)
  console.log(`   • Bac+X → Niveau X (équivalent Bac+X)`)
  console.log(`   • Emails mis à jour vers construction-management-academy.fr`)
  console.log(`   • Titre principal mis à jour`)
} else {
  console.log(`\n⚠️  ${totalIssues} problème(s) détecté(s). Vérifiez les fichiers ci-dessus.`)
}

console.log(`\n✨ Vérification terminée !`)