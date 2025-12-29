#!/usr/bin/env node

/**
 * Script de mise à jour du branding CMA vers Construction Management Academy
 * et des niveaux de formation vers la nomenclature officielle
 */

const fs = require('fs')
const path = require('path')

console.log('🎯 Mise à jour du branding vers Construction Management Academy...\n')

// Fichiers à modifier
const filesToUpdate = [
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/ContactSection.tsx',
  'src/components/sections/AccessibilityBanner.tsx',
  'src/components/sections/TestimonialsSection.tsx',
  'src/components/sections/SocialProofSection.tsx',
  'src/components/sections/ModalitesSection.tsx',
  'src/components/sections/ValuesSection.tsx',
  'src/components/sections/AboutSection.tsx',
  'src/components/sections/FormationDetailClient.tsx',
  'src/lib/strapi.ts'
]

// Règles de remplacement pour le branding
const brandingReplacements = [
  // Branding principal
  { from: /CMA Education/g, to: 'Construction Management Academy' },
  { from: /'CMA'/g, to: "'Construction Management Academy'" },
  { from: /"CMA"/g, to: '"Construction Management Academy"' },
  { from: /\bCMA\b(?!\-)/g, to: 'Construction Management Academy' }, // CMA seul mais pas CMA-xxx
  
  // Descriptions et textes
  { from: /Centre de Formation BTP d'Excellence/g, to: 'École Supérieure de Management de la Construction' },
  { from: /Centre de Formation BTP d\\'Excellence/g, to: 'École Supérieure de Management de la Construction' },
  
  // Niveaux de formation
  { from: /\bBac\+2\b/g, to: 'Niveau 5 (équivalent Bac+2)' },
  { from: /\bBac\+3\b/g, to: 'Niveau 6 (équivalent Bac+3)' },
  { from: /\bBac\+5\b/g, to: 'Niveau 7 (équivalent Bac+5)' },
  
  // Textes spécifiques
  { from: /Du Bac\+2 au Bac\+5/g, to: 'Du Niveau 5 au Niveau 7 (Bac+2 à Bac+5)' },
  { from: /Formation en alternance du Bac\+2 au Bac\+5/g, to: 'Formation en alternance du Niveau 5 au Niveau 7 (Bac+2 à Bac+5)' },
  
  // Textes dans les témoignages
  { from: /La formation CMA/g, to: 'La formation Construction Management Academy' },
  { from: /Grâce à CMA/g, to: 'Grâce à Construction Management Academy' },
  { from: /de CMA/g, to: 'de Construction Management Academy' },
  { from: /chez CMA/g, to: 'chez Construction Management Academy' },
  
  // Alt texts et descriptions
  { from: /Contact CMA/g, to: 'Contact Construction Management Academy' },
  { from: /Innovation & Excellence CMA/g, to: 'Innovation & Excellence Construction Management Academy' }
]

// Fonction pour appliquer les remplacements
function applyReplacements(content, filePath) {
  let updatedContent = content
  let changesCount = 0
  
  brandingReplacements.forEach(rule => {
    const matches = updatedContent.match(rule.from)
    if (matches) {
      console.log(`  📝 ${path.basename(filePath)}: ${matches.length} remplacement(s) pour "${rule.from}"`)
      updatedContent = updatedContent.replace(rule.from, rule.to)
      changesCount += matches.length
    }
  })
  
  return { content: updatedContent, changes: changesCount }
}

// Traitement des fichiers
let totalChanges = 0

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath)
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Fichier non trouvé: ${filePath}`)
    return
  }
  
  console.log(`\n🔄 Traitement: ${filePath}`)
  
  const originalContent = fs.readFileSync(fullPath, 'utf8')
  const { content: updatedContent, changes } = applyReplacements(originalContent, filePath)
  
  if (changes > 0) {
    fs.writeFileSync(fullPath, updatedContent, 'utf8')
    console.log(`✅ ${changes} modification(s) appliquée(s)`)
    totalChanges += changes
  } else {
    console.log(`ℹ️  Aucune modification nécessaire`)
  }
})

// Mise à jour spéciale pour les données statiques dans strapi.ts
console.log(`\n🔄 Mise à jour des données par défaut dans strapi.ts...`)
const strapiPath = path.join(__dirname, '..', 'src/lib/strapi.ts')
if (fs.existsSync(strapiPath)) {
  let strapiContent = fs.readFileSync(strapiPath, 'utf8')
  
  // Remplacements spécifiques pour les données par défaut
  const strapiReplacements = [
    { from: /phone: '01 89 70 60 52'/g, to: "phone: '01 89 70 60 52'" },
    { from: /email: 'contact\.academy@cma-education\.com'/g, to: "email: 'contact.academy@construction-management-academy.fr'" },
    { from: /emailInscription: 'inscription\.academy@cma-education\.com'/g, to: "emailInscription: 'inscription.academy@construction-management-academy.fr'" }
  ]
  
  strapiReplacements.forEach(rule => {
    strapiContent = strapiContent.replace(rule.from, rule.to)
  })
  
  fs.writeFileSync(strapiPath, strapiContent, 'utf8')
  console.log(`✅ Données par défaut mises à jour`)
}

console.log(`\n🎉 Mise à jour terminée!`)
console.log(`📊 Résumé:`)
console.log(`   • ${totalChanges} modifications appliquées`)
console.log(`   • ${filesToUpdate.length} fichiers traités`)
console.log(`\n🏗️  Changements effectués:`)
console.log(`   • CMA → Construction Management Academy`)
console.log(`   • Bac+2 → Niveau 5 (équivalent Bac+2)`)
console.log(`   • Bac+3 → Niveau 6 (équivalent Bac+3)`)
console.log(`   • Bac+5 → Niveau 7 (équivalent Bac+5)`)
console.log(`   • Centre de Formation → École Supérieure de Management`)
console.log(`   • Emails mis à jour vers le nouveau domaine`)

console.log(`\n✨ Le rebranding vers Construction Management Academy est terminé!`)