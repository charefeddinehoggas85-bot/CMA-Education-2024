// Diagnostic des problèmes d'hydratation React
async function diagnoseHydrationIssues() {
  console.log('🔍 DIAGNOSTIC DES PROBLÈMES D\'HYDRATATION\n')
  
  console.log('=' .repeat(60))
  console.log('1. VÉRIFICATION DES ERREURS JAVASCRIPT')
  console.log('=' .repeat(60))
  
  // Test des pages avec analyse du contenu HTML
  const testPages = [
    { url: 'http://localhost:3000/test-simple', name: 'Test Simple' },
    { url: 'http://localhost:3000/formations', name: 'Formations' },
    { url: 'http://localhost:3000/formations/conducteur-travaux-batiment-alternance', name: 'Formation Spécifique' }
  ]
  
  for (const page of testPages) {
    console.log(`\n🔍 Analyse de ${page.name}:`)
    
    try {
      const response = await fetch(page.url)
      console.log(`   Status: ${response.status}`)
      
      if (response.ok) {
        const html = await response.text()
        
        // Vérifications critiques pour l'hydratation
        const checks = {
          hasNextData: html.includes('__NEXT_DATA__'),
          hasReactRoot: html.includes('__next'),
          hasScripts: html.includes('<script'),
          hasErrors: html.includes('Error') || html.includes('SyntaxError') || html.includes('TypeError'),
          hasHydrationMarkers: html.includes('data-reactroot') || html.includes('data-react'),
          hasClientComponents: html.includes('use client'),
          hasModuleScripts: html.includes('type="module"'),
          hasNextScripts: html.includes('/_next/static/')
        }
        
        console.log('   Vérifications d\'hydratation:')
        Object.entries(checks).forEach(([key, value]) => {
          const status = value ? '✅' : '❌'
          console.log(`     ${key}: ${status}`)
        })
        
        // Extraire les erreurs potentielles
        const errorMatches = html.match(/Error[^<]*|SyntaxError[^<]*|TypeError[^<]*/g)
        if (errorMatches) {
          console.log('   Erreurs détectées:')
          errorMatches.slice(0, 3).forEach(error => {
            console.log(`     - ${error.substring(0, 80)}...`)
          })
        }
        
        // Vérifier la structure Next.js
        const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([^<]*)<\/script>/)
        if (nextDataMatch) {
          try {
            const nextData = JSON.parse(nextDataMatch[1])
            console.log(`   Next.js Data: ✅ (buildId: ${nextData.buildId?.substring(0, 8)}...)`)
          } catch (e) {
            console.log('   Next.js Data: ❌ (JSON invalide)')
          }
        }
        
      } else {
        console.log(`   ❌ Page non accessible`)
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}`)
    }
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('2. VÉRIFICATION DE LA CONFIGURATION NEXT.JS')
  console.log('=' .repeat(60))
  
  // Vérifier les fichiers de configuration
  const configFiles = [
    'next.config.js',
    'package.json',
    'tsconfig.json'
  ]
  
  for (const file of configFiles) {
    try {
      const fs = require('fs')
      if (fs.existsSync(file)) {
        console.log(`\n📄 ${file}: ✅ Présent`)
        
        if (file === 'package.json') {
          const packageJson = JSON.parse(fs.readFileSync(file, 'utf8'))
          console.log(`   Next.js version: ${packageJson.dependencies?.next || 'Non trouvée'}`)
          console.log(`   React version: ${packageJson.dependencies?.react || 'Non trouvée'}`)
        }
      } else {
        console.log(`\n📄 ${file}: ❌ Manquant`)
      }
    } catch (error) {
      console.log(`\n📄 ${file}: ❌ Erreur lecture`)
    }
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('3. RECOMMANDATIONS DE CORRECTION')
  console.log('=' .repeat(60))
  
  console.log('\n🔧 ACTIONS PRIORITAIRES:')
  console.log('   1. Vérifier les logs du serveur Next.js pour les erreurs de compilation')
  console.log('   2. Simplifier les composants pour isoler le problème')
  console.log('   3. Vérifier les imports et dépendances manquantes')
  console.log('   4. Tester avec un composant minimal')
  
  console.log('\n🎯 SOLUTIONS POSSIBLES:')
  console.log('   - Erreur dans un composant qui empêche l\'hydratation')
  console.log('   - Import manquant ou incorrect')
  console.log('   - Conflit entre SSR et CSR')
  console.log('   - Configuration Next.js incorrecte')
  console.log('   - Erreur JavaScript côté client')
  
  console.log('\n📊 PROCHAINES ÉTAPES:')
  console.log('   1. Créer un composant de test minimal')
  console.log('   2. Identifier l\'erreur spécifique')
  console.log('   3. Corriger l\'erreur')
  console.log('   4. Valider l\'hydratation')
}

diagnoseHydrationIssues()