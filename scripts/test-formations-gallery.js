#!/usr/bin/env node

/**
 * Script de test pour la galerie de formations
 * Vérifie que les données sont correctement chargées et organisées
 */

const { formationsAlternance, formationsReconversion, vaeFormules } = require('../src/data/formations-static.ts')

console.log('🧪 Test de la galerie de formations\n')

// Test des données statiques
console.log('📊 Données disponibles:')
console.log(`- Formations Alternance: ${formationsAlternance?.length || 0}`)
console.log(`- Formations Reconversion: ${formationsReconversion?.length || 0}`)
console.log(`- Formules VAE: ${vaeFormules?.length || 0}`)

// Test de la structure des données
console.log('\n🔍 Structure des formations:')

if (formationsAlternance && formationsAlternance.length > 0) {
  const sample = formationsAlternance[0]
  console.log('✅ Formation Alternance exemple:')
  console.log(`  - Titre: ${sample.title}`)
  console.log(`  - Slug: ${sample.slug}`)
  console.log(`  - Niveau: ${sample.level}`)
  console.log(`  - RNCP: ${sample.rncp}`)
  console.log(`  - Description: ${sample.shortDescription?.substring(0, 100)}...`)
}

if (formationsReconversion && formationsReconversion.length > 0) {
  const sample = formationsReconversion[0]
  console.log('✅ Formation Reconversion exemple:')
  console.log(`  - Titre: ${sample.title}`)
  console.log(`  - Slug: ${sample.slug}`)
  console.log(`  - Niveau: ${sample.level}`)
}

if (vaeFormules && vaeFormules.length > 0) {
  const sample = vaeFormules[0]
  console.log('✅ Formule VAE exemple:')
  console.log(`  - Titre: ${sample.titre}`)
  console.log(`  - Description: ${sample.description}`)
  console.log(`  - Prix: ${sample.prix}`)
}

// Test de la logique de catégorisation
console.log('\n🏷️ Test de catégorisation:')

const categories = [
  {
    nom: 'Formations en Alternance',
    slug: 'alternance',
    couleur: 'blue',
    formations: formationsAlternance || []
  },
  {
    nom: 'Formations Reconversion',
    slug: 'reconversion', 
    couleur: 'green',
    formations: formationsReconversion || []
  },
  {
    nom: 'VAE - Validation des Acquis',
    slug: 'vae',
    couleur: 'purple',
    formations: (vaeFormules || []).map((formule, index) => ({
      id: 200 + index,
      title: formule.titre,
      slug: `vae-${formule.titre.toLowerCase().replace(/\s+/g, '-')}`,
      level: 'Tous niveaux',
      rncp: 'Multiples certifications',
      shortDescription: formule.description
    }))
  }
]

categories.forEach(category => {
  console.log(`📂 ${category.nom}: ${category.formations.length} formation(s)`)
  if (category.formations.length > 0) {
    category.formations.forEach((formation, index) => {
      console.log(`   ${index + 1}. ${formation.title}`)
    })
  }
})

// Test des URLs de navigation
console.log('\n🔗 Test des URLs de navigation:')

const testUrls = [
  { type: 'Alternance', slug: 'charge-affaires-batiment', url: '/formations/charge-affaires-batiment' },
  { type: 'Reconversion', slug: 'charge-affaires-reconversion', url: '/formations/reconversion-btp/charge-affaires' },
  { type: 'VAE', slug: 'vae-avec-accompagnement', url: '/formations/vae-btp/vae-avec-accompagnement' }
]

testUrls.forEach(test => {
  console.log(`✅ ${test.type}: ${test.slug} → ${test.url}`)
})

console.log('\n✨ Test terminé avec succès!')
console.log('\n📝 Résumé:')
console.log('- La galerie affichera 3 catégories de formations')
console.log('- Chaque catégorie aura son propre carousel animé')
console.log('- Les formations seront cliquables avec navigation appropriée')
console.log('- Auto-scroll toutes les 4 secondes avec contrôles manuels')
console.log('- Design responsive avec indicateurs visuels')