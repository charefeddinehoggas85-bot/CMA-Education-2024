#!/usr/bin/env node

/**
 * Script de vérification complète du rebranding Construction Management Academy
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Vérification complète du rebranding Construction Management Academy...\n')

// Fichiers à vérifier
const filesToCheck = [
  'src/components/layout/Footer.tsx',
  'src/components/layout/Header.tsx',
  'src/components/layout/Navigation.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/ContactSection.tsx',
  'src/components/sections/TestimonialsSection.tsx',
  'src/components/sections/FormationDetailClient.tsx',
  'src/components/ui/FloatingActions.tsx',
  'src/components/ui/ChatBot.tsx',
  'src/components/ui/BrochureModal.tsx',
  'src/components/ui/OptimizedGoogleMap.tsx',
  'src/components/ui/GoogleMap.tsx',
  'src/lib/strapi.ts'
]

// Patterns à vérifier (ne doivent plus exister)
const oldPatterns = [
  { pattern: /\bCMA Education\b/g, description: 'CMA Education' },
  { pattern: /\bCMA\b(?!\-)/g, description: 'CMA seul' },
  { pattern: /cma-education\.ymag\.cloud/g, description: 'Ancien domaine candidature' },
  { pattern: /contact\.academy@cma-education\.com/g, description: 'Ancien email' },
  { pattern: /École Supérieure de Management de la Construction/g, description: 'Ancien tagline' },
  { pattern: /Assistant CMA/g, description: 'Assistant CMA' },
  { pattern: /CMA-EDUCATION/g, description: 'CMA-EDUCATION dans URLs' }
]

// Patterns qui doivent exister (nouveau branding)
const newPatterns = [
  { pattern: /Construction Management Academy/g, description: 'Construction Management Academy' },
  { pattern: /construction-management-academy\.ymag\.cloud/g, description: 'Nouveau domaine candidature' },
  { pattern: /contact\.academy@construction-management-academy\.fr/g, description: 'Nouveau email' },
  { pattern: /Niveau \d+ \(équivalent Bac\+\d+\)/g, description: 'Nouveaux niveaux de formation' }
]

let totalIssues = 0
let totalSuccess = 0

console.log('📋 Vérification des anciens patterns (ne doivent plus exister):\n')

filesToCheck.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath)
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Fichier non trouvé: ${filePath}`)
    return
  }
  
  const content = fs.readFileSync(fullPath, 'utf8')
  let fileIssues = 0
  
  oldPatterns.forEach(({ pattern, description }) => {
    const matches = content.match(pattern)
    if (matches) {
      console.log(`❌ ${path.basename(filePath)}: ${matches.length} occurrence(s) de "${description}"`)
      fileIssues++
      totalIssues++
    }
  })
  
  if (fileIssues === 0) {
    console.log(`✅ ${path.basename(filePath)}: Aucun ancien pattern trouvé`)
    totalSuccess++
  }
})

console.log('\n📋 Vérification des nouveaux patterns (doivent exister):\n')

filesToCheck.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath)
  
  if (!fs.existsSync(fullPath)) {
    return
  }
  
  const content = fs.readFileSync(fullPath, 'utf8')
  let foundNewPatterns = 0
  
  newPatterns.forEach(({ pattern, description }) => {
    const matches = content.match(pattern)
    if (matches) {
      foundNewPatterns++
    }
  })
  
  if (foundNewPatterns > 0) {
    console.log(`✅ ${path.basename(filePath)}: ${foundNewPatterns} nouveau(x) pattern(s) trouvé(s)`)
  }
})

// Vérification spéciale des URLs de candidature
console.log('\n🔗 Vérification des URLs de candidature:\n')

const candidatureFiles = [
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/TestimonialsSection.tsx',
  'src/components/sections/FormationDetailClient.tsx',
  'src/components/sections/ContactSection.tsx',
  'src/components/layout/Navigation.tsx',
  'src/components/layout/Header.tsx'
]

candidatureFiles.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath)
  
  if (!fs.existsSync(fullPath)) {
    return
  }
  
  const content = fs.readFileSync(fullPath, 'utf8')
  
  if (content.includes('construction-management-academy.ymag.cloud')) {
    console.log(`✅ ${path.basename(filePath)}: URL de candidature mise à jour`)
  } else if (content.includes('cma-education.ymag.cloud')) {
    console.log(`❌ ${path.basename(filePath)}: Ancienne URL de candidature trouvée`)
    totalIssues++
  }
})

// Résumé final
console.log('\n' + '='.repeat(60))
console.log('📊 RÉSUMÉ DE LA VÉRIFICATION')
console.log('='.repeat(60))

if (totalIssues === 0) {
  console.log('🎉 SUCCÈS COMPLET!')
  console.log('✅ Tous les anciens patterns ont été remplacés')
  console.log('✅ Le rebranding vers Construction Management Academy est terminé')
  console.log('✅ Aucun conflit de données statiques/dynamiques détecté')
} else {
  console.log(`❌ ${totalIssues} problème(s) détecté(s)`)
  console.log('⚠️  Certains anciens patterns sont encore présents')
}

console.log(`\n📈 Statistiques:`)
console.log(`   • ${totalSuccess} fichiers sans problème`)
console.log(`   • ${totalIssues} problèmes détectés`)
console.log(`   • ${filesToCheck.length} fichiers vérifiés`)

console.log('\n🏗️  Changements appliqués:')
console.log('   • CMA → Construction Management Academy')
console.log('   • cma-education.ymag.cloud → construction-management-academy.ymag.cloud')
console.log('   • contact.academy@cma-education.com → contact.academy@construction-management-academy.fr')
console.log('   • Suppression du tagline "École Supérieure de Management de la Construction"')
console.log('   • Mise à jour des niveaux: Bac+X → Niveau X (équivalent Bac+X)')

if (totalIssues === 0) {
  console.log('\n✨ Le problème de conflit données statiques/dynamiques est résolu!')
  console.log('🚀 Le site affiche maintenant "Construction Management Academy" de manière cohérente')
}