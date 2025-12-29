#!/usr/bin/env node

/**
 * Test du fix du contenu formation
 */

const axios = require('axios')

async function testFormationContentFix() {
  console.log('🧪 Test du fix du contenu formation...\n')
  
  try {
    // Attendre un peu pour que la compilation soit terminée
    console.log('⏳ Attente de la compilation...')
    await new Promise(resolve => setTimeout(resolve, 5000))
    
    console.log('🌐 Test de la page formation...')
    const response = await axios.get('http://localhost:3001/formations/conducteur-travaux-tp-alternance', {
      timeout: 30000
    })
    
    console.log(`✅ Status: ${response.status}`)
    
    const content = response.data
    
    // Tests plus spécifiques
    const tests = {
      'Titre principal': content.includes('Conducteur de Travaux, Travaux Publics'),
      'RNCP code': content.includes('RNCP38549'),
      'Niveau BAC+2': content.includes('BAC+2'),
      'Section objectifs': content.includes('Objectifs de la formation'),
      'Section débouchés': content.includes('Débouchés professionnels'),
      'Objectif spécifique': content.includes('Planifier, organiser et suivre'),
      'Débouché spécifique': content.includes('Conducteur(trice) de travaux TP'),
      'Prérequis': content.includes('Prérequis'),
      'Baccalauréat': content.includes('baccalauréat'),
      'Financement': content.includes('9548€ HT'),
      'Durée formation': content.includes('1 an'),
      'Rythme': content.includes('17 semaines'),
      'Pas d\'erreur': !content.includes('Error') && !content.includes('undefined'),
      'Pas de chargement': !content.includes('Chargement de la formation'),
      'Contenu structuré': content.includes('max-w-7xl') && content.includes('grid')
    }
    
    console.log('\n📋 Résultats des tests:')
    let passedTests = 0
    let totalTests = Object.keys(tests).length
    
    Object.entries(tests).forEach(([test, passed]) => {
      console.log(`   ${test}: ${passed ? '✅' : '❌'}`)
      if (passed) passedTests++
    })
    
    console.log(`\n📊 Score: ${passedTests}/${totalTests} (${Math.round(passedTests/totalTests*100)}%)`)
    
    if (passedTests >= totalTests * 0.8) {
      console.log('🎉 SUCCÈS ! Le contenu s\'affiche correctement')
    } else if (passedTests >= totalTests * 0.5) {
      console.log('⚠️ PARTIEL - Certains éléments manquent')
    } else {
      console.log('❌ ÉCHEC - Le contenu ne s\'affiche pas correctement')
    }
    
    // Debug supplémentaire si nécessaire
    if (passedTests < totalTests * 0.8) {
      console.log('\n🔍 Debug supplémentaire:')
      
      // Chercher des indices dans le HTML
      const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/)
      if (h1Match) {
        console.log(`   H1 trouvé: "${h1Match[1]}"`)
      }
      
      // Chercher les sections principales
      const sectionsFound = []
      if (content.includes('Objectifs de la formation')) sectionsFound.push('Objectifs')
      if (content.includes('Débouchés professionnels')) sectionsFound.push('Débouchés')
      if (content.includes('Informations pratiques')) sectionsFound.push('Sidebar')
      
      console.log(`   Sections trouvées: ${sectionsFound.join(', ') || 'Aucune'}`)
      
      // Vérifier si c'est un problème de données
      if (content.includes('Formation non trouvée')) {
        console.log('   ⚠️ Message "Formation non trouvée" détecté')
      }
      
      if (content.includes('Chargement')) {
        console.log('   ⚠️ Page encore en chargement')
      }
    }
    
    return passedTests >= totalTests * 0.8
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
    return false
  }
}

testFormationContentFix()
  .then(success => {
    console.log(`\n🏁 Test ${success ? 'RÉUSSI' : 'ÉCHOUÉ'}`)
    process.exit(success ? 0 : 1)
  })
  .catch(error => {
    console.error('💥 Erreur fatale:', error.message)
    process.exit(1)
  })