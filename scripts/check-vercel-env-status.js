#!/usr/bin/env node

/**
 * Script pour vérifier le statut exact des variables d'environnement Vercel
 * et fournir les commandes exactes à exécuter
 */

console.log('🔍 Vérification du statut des variables d\'environnement Vercel\n')

// 1. Vérifier les variables locales
function checkLocalEnvironment() {
  console.log('1️⃣ Variables d\'environnement locales:')
  
  const vars = [
    'NEXT_PUBLIC_STRAPI_URL',
    'STRAPI_API_TOKEN',
    'NODE_ENV'
  ]
  
  vars.forEach(varName => {
    const value = process.env[varName]
    if (value) {
      if (varName === 'NEXT_PUBLIC_STRAPI_URL') {
        if (value.includes('localhost')) {
          console.log(`   ❌ ${varName}: ${value} (CONTIENT LOCALHOST!)`)
        } else {
          console.log(`   ✅ ${varName}: ${value}`)
        }
      } else if (varName === 'STRAPI_API_TOKEN') {
        console.log(`   ✅ ${varName}: [DÉFINI - ${value.length} caractères]`)
      } else {
        console.log(`   ✅ ${varName}: ${value}`)
      }
    } else {
      console.log(`   ❌ ${varName}: [NON DÉFINI]`)
    }
  })
}

// 2. Générer les commandes Vercel exactes
function generateVercelCommands() {
  console.log('\n2️⃣ Commandes Vercel à exécuter MAINTENANT:')
  
  console.log('\n# ÉTAPE 1: Supprimer les anciennes variables')
  console.log('vercel env rm NEXT_PUBLIC_STRAPI_URL production')
  console.log('vercel env rm STRAPI_API_TOKEN production')
  
  console.log('\n# ÉTAPE 2: Ajouter les nouvelles variables')
  console.log('vercel env add NEXT_PUBLIC_STRAPI_URL production')
  console.log('# Quand demandé, copier-coller exactement:')
  console.log('# https://cma-education-strapi-production.up.railway.app')
  
  console.log('\nvercel env add STRAPI_API_TOKEN production')
  console.log('# Quand demandé, copier-coller exactement:')
  console.log('# 62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d')
  
  console.log('\n# ÉTAPE 3: Redéployer immédiatement')
  console.log('vercel --prod')
}

// 3. Alternative Dashboard Vercel
function dashboardInstructions() {
  console.log('\n3️⃣ Alternative via Dashboard Vercel:')
  
  console.log('\n🌐 Aller sur: https://vercel.com/dashboard')
  console.log('📁 Sélectionner: cma-education-2024')
  console.log('⚙️ Aller dans: Settings > Environment Variables')
  
  console.log('\n📝 Supprimer les anciennes variables (si elles existent):')
  console.log('   - NEXT_PUBLIC_STRAPI_URL')
  console.log('   - STRAPI_API_TOKEN')
  
  console.log('\n➕ Ajouter les nouvelles variables:')
  console.log('\n   Variable 1:')
  console.log('   Name: NEXT_PUBLIC_STRAPI_URL')
  console.log('   Value: https://cma-education-strapi-production.up.railway.app')
  console.log('   Environment: Production ✅')
  
  console.log('\n   Variable 2:')
  console.log('   Name: STRAPI_API_TOKEN')
  console.log('   Value: 62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d')
  console.log('   Environment: Production ✅')
  
  console.log('\n🚀 Redéployer: Deployments > ... > Redeploy')
}

// 4. Vérification post-déploiement
function verificationSteps() {
  console.log('\n4️⃣ Vérification après déploiement (attendre 2-3 minutes):')
  
  console.log('\n📋 Tests à effectuer:')
  console.log('   1. Ouvrir: https://cma-education-2024.vercel.app')
  console.log('   2. F12 > Console: Vérifier qu\'il n\'y a plus d\'erreur localhost')
  console.log('   3. Exécuter: node scripts/verify-production-fix.js')
  console.log('   4. Vérifier que "❌ Références localhost" devient "✅"')
}

// 5. Diagnostic du problème actuel
function diagnoseProblem() {
  console.log('\n5️⃣ Diagnostic du problème actuel:')
  
  console.log('\n🔍 Situation actuelle:')
  console.log('   ✅ Railway Strapi fonctionne')
  console.log('   ✅ Site Vercel accessible')
  console.log('   ✅ APIs Railway accessibles')
  console.log('   ❌ HTML contient encore des références localhost')
  
  console.log('\n🎯 Cause probable:')
  console.log('   - NEXT_PUBLIC_STRAPI_URL pas définie sur Vercel')
  console.log('   - Le code utilise la valeur par défaut: localhost:1337')
  console.log('   - Les variables locales ne sont pas utilisées en production')
  
  console.log('\n⚡ Solution:')
  console.log('   - Configurer NEXT_PUBLIC_STRAPI_URL sur Vercel')
  console.log('   - Redéployer pour que Next.js utilise la bonne URL')
}

// Fonction principale
function main() {
  console.log('🎯 Objectif: Éliminer les références localhost du HTML de production\n')
  
  checkLocalEnvironment()
  diagnoseProblem()
  generateVercelCommands()
  dashboardInstructions()
  verificationSteps()
  
  console.log('\n🚨 ACTION CRITIQUE:')
  console.log('   Les variables d\'environnement Vercel DOIVENT être configurées')
  console.log('   Sans cela, le site continuera à utiliser localhost:1337')
  
  console.log('\n⏱️ Temps estimé: 5 minutes')
  console.log('🎯 Résultat attendu: Plus de références localhost dans le HTML')
}

// Exécution
if (require.main === module) {
  main()
}

module.exports = { main }