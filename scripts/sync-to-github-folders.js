#!/usr/bin/env node

/**
 * Script pour synchroniser les corrections vers les dossiers GitHub
 */

const fs = require('fs')
const path = require('path')

console.log('🔄 Synchronisation vers les dossiers GitHub...\n')

// Chemins des dossiers
const SOURCE_DIR = '.'
const FRONTEND_DIR = 'D:\\GITHUB\\CMA2026\\CMA-Education-2024'
const STRAPI_DIR = 'D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi'

// Fonction pour copier récursivement
function copyRecursive(src, dest, excludeDirs = []) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️ Source n'existe pas: ${src}`)
    return
  }

  // Créer le dossier de destination s'il n'existe pas
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const items = fs.readdirSync(src)
  
  items.forEach(item => {
    const srcPath = path.join(src, item)
    const destPath = path.join(dest, item)
    
    // Ignorer certains dossiers
    if (excludeDirs.includes(item)) {
      return
    }
    
    const stat = fs.statSync(srcPath)
    
    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath, excludeDirs)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  })
}

// 1. Synchroniser le Frontend (Next.js)
function syncFrontend() {
  console.log('1️⃣ Synchronisation Frontend vers CMA-Education-2024...')
  
  if (!fs.existsSync(FRONTEND_DIR)) {
    console.log(`❌ Dossier frontend non trouvé: ${FRONTEND_DIR}`)
    return false
  }
  
  // Fichiers et dossiers à copier pour le frontend
  const frontendItems = [
    'src',
    'public',
    'scripts',
    'Formations',
    'package.json',
    'package-lock.json',
    'next.config.js',
    'tailwind.config.ts',
    'tsconfig.json',
    'postcss.config.js',
    '.env.production',
    '.env.local',
    '.env.example',
    '.gitignore',
    '.vercelignore',
    'vercel.json',
    'README.md',
    'LOCALHOST_FIX_SUMMARY.md',
    'GUIDE_GITHUB_DESKTOP_COMPLET.md'
  ]
  
  // Fichiers markdown de documentation
  const docFiles = fs.readdirSync('.').filter(file => 
    file.endsWith('.md') && 
    !file.startsWith('cms-') && 
    !file.includes('STRAPI')
  )
  
  frontendItems.push(...docFiles)
  
  let copiedCount = 0
  
  frontendItems.forEach(item => {
    const srcPath = path.join(SOURCE_DIR, item)
    const destPath = path.join(FRONTEND_DIR, item)
    
    if (fs.existsSync(srcPath)) {
      const stat = fs.statSync(srcPath)
      
      if (stat.isDirectory()) {
        // Exclure certains dossiers
        const excludeDirs = ['.git', 'node_modules', '.next', 'cms-cma']
        copyRecursive(srcPath, destPath, excludeDirs)
        console.log(`   📁 ${item}/ → copié`)
      } else {
        fs.copyFileSync(srcPath, destPath)
        console.log(`   📄 ${item} → copié`)
      }
      copiedCount++
    }
  })
  
  console.log(`   ✅ ${copiedCount} éléments copiés vers le frontend\n`)
  return true
}

// 2. Synchroniser Strapi
function syncStrapi() {
  console.log('2️⃣ Synchronisation Strapi vers CMA-Education-Strapi...')
  
  if (!fs.existsSync(STRAPI_DIR)) {
    console.log(`❌ Dossier Strapi non trouvé: ${STRAPI_DIR}`)
    return false
  }
  
  const strapiSource = path.join(SOURCE_DIR, 'cms-cma')
  
  if (!fs.existsSync(strapiSource)) {
    console.log(`❌ Dossier cms-cma non trouvé: ${strapiSource}`)
    return false
  }
  
  // Copier tout le contenu de cms-cma vers le dossier Strapi
  const excludeDirs = ['.git', 'node_modules', '.tmp', 'build', '.cache']
  copyRecursive(strapiSource, STRAPI_DIR, excludeDirs)
  
  console.log(`   ✅ Strapi synchronisé\n`)
  return true
}

// 3. Créer un résumé des changements
function createSyncSummary() {
  console.log('3️⃣ Création du résumé de synchronisation...')
  
  const summary = `# 🔄 Synchronisation GitHub - ${new Date().toLocaleString()}

## ✅ Corrections appliquées et synchronisées

### 🔧 Corrections localhost → Railway
- **11 fichiers** avec références localhost corrigées
- **src/lib/strapi.ts** : Configuration principale mise à jour
- **Variables d'environnement** : .env.production et .env.local créés
- **Scripts de test** : Ajoutés pour vérification

### 📁 Synchronisation des dossiers

#### Frontend (CMA-Education-2024)
- ✅ Code source (src/)
- ✅ Assets publics (public/)
- ✅ Scripts de déploiement (scripts/)
- ✅ Configuration (package.json, next.config.js, etc.)
- ✅ Variables d'environnement (.env.*)
- ✅ Documentation (.md files)

#### Backend (CMA-Education-Strapi)  
- ✅ Configuration Strapi complète (cms-cma/)
- ✅ Content types et API
- ✅ Configuration base de données
- ✅ Fichiers de déploiement Railway

## 🎯 Prochaines étapes

### Dans GitHub Desktop :

1. **Ouvrir CMA-Education-2024**
   - File → Add Local Repository
   - Sélectionner: D:\\GITHUB\\CMA2026\\CMA-Education-2024
   - Commit: "🔧 Fix localhost → Railway + sync corrections"
   - Push origin

2. **Ouvrir CMA-Education-Strapi**
   - File → Add Local Repository  
   - Sélectionner: D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi
   - Commit: "🔧 Sync Strapi configuration"
   - Push origin

### Après push GitHub :

1. **Vercel redéploiera automatiquement** le frontend
2. **Railway redéploiera automatiquement** le backend
3. **Tester** : \`node scripts/verify-production-fix.js\`

## 🎉 Résultat attendu

✅ Plus de références localhost en production  
✅ Site utilise correctement Railway Strapi  
✅ Erreurs ERR_CONNECTION_REFUSED résolues  
✅ Déploiement automatique configuré  

---
*Synchronisation effectuée le ${new Date().toLocaleString()}*
`
  
  // Écrire dans les deux dossiers
  if (fs.existsSync(FRONTEND_DIR)) {
    fs.writeFileSync(path.join(FRONTEND_DIR, 'SYNC_SUMMARY.md'), summary)
  }
  
  if (fs.existsSync(STRAPI_DIR)) {
    fs.writeFileSync(path.join(STRAPI_DIR, 'SYNC_SUMMARY.md'), summary)
  }
  
  // Écrire aussi dans le dossier source
  fs.writeFileSync('SYNC_SUMMARY.md', summary)
  
  console.log('   ✅ Résumé créé dans tous les dossiers\n')
}

// 4. Vérifier les dossiers de destination
function checkDestinations() {
  console.log('🔍 Vérification des dossiers de destination...\n')
  
  const frontendExists = fs.existsSync(FRONTEND_DIR)
  const strapiExists = fs.existsSync(STRAPI_DIR)
  
  console.log(`Frontend: ${frontendExists ? '✅' : '❌'} ${FRONTEND_DIR}`)
  console.log(`Strapi:   ${strapiExists ? '✅' : '❌'} ${STRAPI_DIR}\n`)
  
  if (!frontendExists || !strapiExists) {
    console.log('⚠️ Certains dossiers de destination n\'existent pas.')
    console.log('📋 Créez-les d\'abord avec GitHub Desktop :')
    console.log('1. Cloner CMA-Education-2024 vers D:\\GITHUB\\CMA2026\\CMA-Education-2024')
    console.log('2. Cloner CMA-Education-Strapi vers D:\\GITHUB\\CMA2026\\cms-cma\\CMA-Education-Strapi\n')
    return false
  }
  
  return true
}

// Fonction principale
async function main() {
  try {
    console.log('🚀 Synchronisation des corrections localhost vers GitHub\n')
    
    // Vérifier les destinations
    if (!checkDestinations()) {
      return
    }
    
    // Synchroniser
    const frontendOk = syncFrontend()
    const strapiOk = syncStrapi()
    
    if (frontendOk && strapiOk) {
      createSyncSummary()
      
      console.log('🎉 Synchronisation terminée avec succès!')
      console.log('\n📋 Prochaines étapes dans GitHub Desktop:')
      console.log('1. Ajouter les repositories locaux')
      console.log('2. Commit les changements')
      console.log('3. Push vers GitHub')
      console.log('4. Vérifier le redéploiement automatique')
      console.log('\n🧪 Tester après déploiement:')
      console.log('node scripts/verify-production-fix.js')
    } else {
      console.log('❌ Erreurs lors de la synchronisation')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

// Exécution
if (require.main === module) {
  main()
}

module.exports = { main }