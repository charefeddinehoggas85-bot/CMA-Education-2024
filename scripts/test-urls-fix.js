#!/usr/bin/env node

/**
 * Test rapide pour vérifier que les URLs sont correctes
 */

const EXPECTED_URL = 'https://cma-education-strapi-production.up.railway.app'

console.log('🧪 Test des URLs de production...')
console.log('URL attendue:', EXPECTED_URL)

// Test 1: Variables d'environnement
console.log('\n1️⃣ Variables d\'environnement:')
console.log('NEXT_PUBLIC_STRAPI_URL:', process.env.NEXT_PUBLIC_STRAPI_URL || 'NON DÉFINIE')

// Test 2: Import du module strapi
try {
  // Simuler l'environnement de production
  process.env.NEXT_PUBLIC_STRAPI_URL = EXPECTED_URL
  
  const { getStrapiURL } = require('./src/lib/strapi.ts')
  const testUrl = getStrapiURL('/api/formations')
  
  console.log('\n2️⃣ URL générée par getStrapiURL:')
  console.log('URL:', testUrl)
  
  if (testUrl.includes('localhost')) {
    console.log('❌ ERREUR: URL contient encore localhost!')
  } else if (testUrl.includes(EXPECTED_URL)) {
    console.log('✅ SUCCESS: URL utilise Railway!')
  } else {
    console.log('⚠️ WARNING: URL inattendue')
  }
  
} catch (error) {
  console.log('❌ Erreur lors du test:', error.message)
}

console.log('\n🎯 Pour corriger définitivement:')
console.log('1. Vérifiez les variables Vercel')
console.log('2. Redéployez: vercel --prod')
console.log('3. Attendez 2-3 minutes')
console.log('4. Testez: node scripts/verify-production-fix.js')
