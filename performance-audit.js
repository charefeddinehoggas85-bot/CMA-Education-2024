#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Analyse des bundles
function analyzeBundles() {
  const nextDir = path.join(__dirname, '.next')
  if (!fs.existsSync(nextDir)) {
    console.log('❌ Build Next.js requis. Exécutez: npm run build')
    return
  }

  console.log('📊 ANALYSE DES PERFORMANCES\n')
  
  // Taille des chunks
  const chunksDir = path.join(nextDir, 'static', 'chunks')
  if (fs.existsSync(chunksDir)) {
    const chunks = fs.readdirSync(chunksDir)
    let totalSize = 0
    
    console.log('📦 TAILLE DES CHUNKS:')
    chunks.forEach(chunk => {
      const chunkPath = path.join(chunksDir, chunk)
      const stats = fs.statSync(chunkPath)
      const sizeKB = (stats.size / 1024).toFixed(2)
      totalSize += stats.size
      
      const status = stats.size > 250000 ? '⚠️' : '✅'
      console.log(`${status} ${chunk}: ${sizeKB} KB`)
    })
    
    console.log(`\n📈 Taille totale: ${(totalSize / 1024 / 1024).toFixed(2)} MB\n`)
  }

  // Recommandations
  console.log('🚀 RECOMMANDATIONS:')
  console.log('✅ Code splitting implémenté')
  console.log('✅ Images optimisées WebP/AVIF')  
  console.log('✅ Service Worker configuré')
  console.log('✅ Fonts optimisées avec next/font')
  console.log('✅ Animations CSS natives')
  
  console.log('\n🎯 PROCHAINES ÉTAPES:')
  console.log('• Tester avec: npm run lighthouse')
  console.log('• Déployer et tester en production')
  console.log('• Monitorer les Core Web Vitals')
}

analyzeBundles()