#!/usr/bin/env node

/**
 * Script pour pousser les corrections localhost vers GitHub
 */

const { execSync } = require('child_process')
const fs = require('fs')

console.log('🚀 Push des corrections localhost vers GitHub...\n')

// 1. Vérifier si on est dans un repo Git
function checkGitRepo() {
  console.log('1️⃣ Vérification du repository Git...')
  
  try {
    execSync('git status', { stdio: 'pipe' })
    console.log('   ✅ Repository Git détecté')
    return true
  } catch (error) {
    console.log('   ❌ Pas de repository Git trouvé')
    console.log('   🔧 Initialisation du repository...')
    
    try {
      execSync('git init', { stdio: 'inherit' })
      console.log('   ✅ Repository Git initialisé')
      return true
    } catch (initError) {
      console.log('   ❌ Erreur lors de l\'initialisation:', initError.message)
      return false
    }
  }
}

// 2. Configurer les remotes GitHub
function setupGitRemotes() {
  console.log('\n2️⃣ Configuration des remotes GitHub...')
  
  const remotes = {
    'origin': 'https://github.com/charefeddinehoggas85-bot/CMA-Education-2024.git'
  }
  
  try {
    // Vérifier les remotes existantes
    const existingRemotes = execSync('git remote -v', { encoding: 'utf8' })
    console.log('   📋 Remotes existantes:')
    console.log(existingRemotes)
    
    // Ajouter ou mettre à jour origin si nécessaire
    if (!existingRemotes.includes('origin')) {
      execSync(`git remote add origin ${remotes.origin}`, { stdio: 'inherit' })
      console.log('   ✅ Remote origin ajoutée')
    } else {
      console.log('   ✅ Remote origin déjà configurée')
    }
    
    return true
  } catch (error) {
    console.log('   ❌ Erreur configuration remotes:', error.message)
    return false
  }
}

// 3. Ajouter tous les fichiers modifiés
function addChanges() {
  console.log('\n3️⃣ Ajout des fichiers modifiés...')
  
  try {
    // Voir les fichiers modifiés
    const status = execSync('git status --porcelain', { encoding: 'utf8' })
    console.log('   📋 Fichiers modifiés:')
    console.log(status || '   (Aucun changement détecté)')
    
    if (status.trim()) {
      // Ajouter tous les fichiers
      execSync('git add .', { stdio: 'inherit' })
      console.log('   ✅ Tous les fichiers ajoutés')
      return true
    } else {
      console.log('   ⚠️ Aucun changement à commiter')
      return false
    }
  } catch (error) {
    console.log('   ❌ Erreur lors de l\'ajout:', error.message)
    return false
  }
}

// 4. Créer le commit
function createCommit() {
  console.log('\n4️⃣ Création du commit...')
  
  const commitMessage = `🔧 Fix: Correction complète des références localhost

✅ Corrections appliquées:
- src/lib/strapi.ts: Configuration principale corrigée
- 11 fichiers avec références localhost hardcodées
- Création de .env.production et .env.local
- Scripts de test et vérification ajoutés

🎯 Objectif: Éliminer toutes les erreurs localhost en production
🔗 URL Railway: https://cma-education-strapi-production.up.railway.app

📋 Prochaines étapes:
1. Vérifier variables Vercel
2. Redéployer: vercel --prod
3. Tester: node scripts/verify-production-fix.js`

  try {
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' })
    console.log('   ✅ Commit créé avec succès')
    return true
  } catch (error) {
    console.log('   ❌ Erreur lors du commit:', error.message)
    return false
  }
}

// 5. Pousser vers GitHub
function pushToGitHub() {
  console.log('\n5️⃣ Push vers GitHub...')
  
  try {
    // Essayer de pousser vers main d'abord
    try {
      execSync('git push origin main', { stdio: 'inherit' })
      console.log('   ✅ Push vers main réussi')
      return true
    } catch (mainError) {
      // Si main échoue, essayer master
      console.log('   ⚠️ Push vers main échoué, essai avec master...')
      execSync('git push origin master', { stdio: 'inherit' })
      console.log('   ✅ Push vers master réussi')
      return true
    }
  } catch (error) {
    console.log('   ❌ Erreur lors du push:', error.message)
    console.log('\n   🔧 Solutions possibles:')
    console.log('   1. Vérifiez vos credentials GitHub')
    console.log('   2. Utilisez GitHub Desktop pour pousser manuellement')
    console.log('   3. Configurez un token d\'accès personnel')
    return false
  }
}

// 6. Vérifier le push
function verifyPush() {
  console.log('\n6️⃣ Vérification du push...')
  
  try {
    const remoteInfo = execSync('git ls-remote origin', { encoding: 'utf8' })
    console.log('   ✅ Repository accessible sur GitHub')
    console.log('   🔗 URL: https://github.com/charefeddinehoggas85-bot/CMA-Education-2024')
    return true
  } catch (error) {
    console.log('   ⚠️ Impossible de vérifier le push:', error.message)
    return false
  }
}

// 7. Instructions post-push
function showPostPushInstructions() {
  console.log('\n7️⃣ Instructions post-push...')
  
  console.log(`
📋 Étapes suivantes sur Vercel:

1. 🔗 Aller sur https://vercel.com/dashboard
2. 🔄 Redéployer le projet:
   - Cliquer sur votre projet CMA-Education-2024
   - Onglet "Deployments"
   - Cliquer "Redeploy" sur le dernier déploiement
   
3. ⚙️ Vérifier les variables d'environnement:
   - Onglet "Settings" > "Environment Variables"
   - NEXT_PUBLIC_STRAPI_URL = https://cma-education-strapi-production.up.railway.app
   - STRAPI_API_TOKEN = [votre-token]

4. ⏱️ Attendre 2-3 minutes après le redéploiement

5. 🧪 Tester la correction:
   node scripts/verify-production-fix.js

🎉 Une fois terminé, vous devriez voir:
✅ Plus de références localhost dans le HTML
✅ Site fonctionnel sans erreurs ERR_CONNECTION_REFUSED
`)
}

// Fonction principale
async function main() {
  try {
    const gitOk = checkGitRepo()
    if (!gitOk) {
      console.log('❌ Impossible de continuer sans Git')
      return
    }
    
    const remotesOk = setupGitRemotes()
    if (!remotesOk) {
      console.log('❌ Impossible de configurer les remotes')
      return
    }
    
    const changesAdded = addChanges()
    if (!changesAdded) {
      console.log('⚠️ Aucun changement à pousser')
      return
    }
    
    const commitOk = createCommit()
    if (!commitOk) {
      console.log('❌ Impossible de créer le commit')
      return
    }
    
    const pushOk = pushToGitHub()
    if (pushOk) {
      verifyPush()
      showPostPushInstructions()
      console.log('\n🎉 Push terminé avec succès!')
    } else {
      console.log('\n❌ Push échoué - utilisez GitHub Desktop comme alternative')
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error)
  }
}

// Exécution
if (require.main === module) {
  main()
}

module.exports = { main }