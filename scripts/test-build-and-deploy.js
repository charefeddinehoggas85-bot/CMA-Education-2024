#!/usr/bin/env node

/**
 * Script pour tester le build et préparer le déploiement
 */

const { execSync } = require('child_process')
const fs = require('fs')

console.log('🚀 Test de build et préparation déploiement...\n')

// 1. Vérifier les fichiers de configuration
function checkConfigFiles() {
  console.log('1️⃣ Vérification des fichiers de configuration...')
  
  const files = [
    '.env.production',
    '.env.local',
    'src/lib/strapi.ts',
    'next.config.js'
  ]
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file} existe`)
      
      // Vérifier le contenu pour localhost
      const content = fs.readFileSync(file, 'utf8')
      if (content.includes('localhost:1337')) {
        console.log(`   ⚠️ ${file} contient encore localhost:1337`)
      } else {
        console.log(`   ✅ ${file} ne contient pas localhost`)
      }
    } else {
      console.log(`   ❌ ${file} manquant`)
    }
  })
}

// 2. Tester le build Next.js
function testBuild() {
  console.log('\n2️⃣ Test du build Next.js...')
  
  try {
    console.log('   🔧 Nettoyage du cache...')
    execSync('npm run build', { stdio: 'pipe' })
    console.log('   ✅ Build réussi!')
    return true
  } catch (error) {
    console.log('   ❌ Erreur de build:')
    console.log(error.stdout?.toString() || error.message)
    return false
  }
}

// 3. Créer un résumé des corrections
function createSummary() {
  console.log('\n3️⃣ Résumé des corrections appliquées...')
  
  const summary = `# 🔧 Corrections Localhost → Railway

## ✅ Fichiers corrigés automatiquement:
- src/lib/strapi.ts (configuration principale)
- src/app/brochure/page.tsx
- src/app/formations/[slug]/test-simple-strapi.tsx
- src/app/formations/[slug]/test-simple.tsx
- src/app/formations-ssr/page.tsx
- src/app/test-formation/page.tsx
- src/app/test-simple/page.tsx
- src/app/test-strapi-debug/page.tsx
- src/components/sections/FormationsGallery.tsx
- src/components/sections/HeroSection.tsx
- src/components/ui/BrochureModal.tsx

## ✅ Fichiers de configuration créés/mis à jour:
- .env.production (variables de production)
- .env.local (variables locales)

## 🎯 URL de production configurée:
\`https://cma-education-strapi-production.up.railway.app\`

## 📋 Variables Vercel à vérifier:
\`\`\`
NEXT_PUBLIC_STRAPI_URL=https://cma-education-strapi-production.up.railway.app
STRAPI_API_TOKEN=744de645f118fa88ee689db97a0f091b5ae17685a7f5646f113c62607fdd47c892ce1f2570fa89f62bcdec23577dc618d12bdb69547b6778153470637b626987869d6d11124ae446edac14e95283981eba766cfb3c2d4fc8d5c0d608c84bd036f705448818feece41ce7f3b9afea49d07dc26d0cf7d6ebc257b76f900be69c00
\`\`\`

## 🚀 Commandes de déploiement:
\`\`\`bash
# Redéployer sur Vercel
vercel --prod

# Attendre 2-3 minutes puis vérifier
node scripts/verify-production-fix.js
\`\`\`
`
  
  fs.writeFileSync('LOCALHOST_FIX_SUMMARY.md', summary)
  console.log('   ✅ Résumé créé: LOCALHOST_FIX_SUMMARY.md')
}

// Fonction principale
async function main() {
  checkConfigFiles()
  
  const buildSuccess = testBuild()
  
  createSummary()
  
  console.log('\n🎉 Préparation terminée!')
  
  if (buildSuccess) {
    console.log('\n✅ Le build fonctionne - prêt pour le déploiement!')
    console.log('\n📋 Étapes suivantes:')
    console.log('1. Redéployez: vercel --prod')
    console.log('2. Attendez 2-3 minutes')
    console.log('3. Vérifiez: node scripts/verify-production-fix.js')
  } else {
    console.log('\n❌ Erreur de build - corrigez les erreurs avant de déployer')
  }
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}