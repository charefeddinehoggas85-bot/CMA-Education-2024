#!/usr/bin/env node

/**
 * Script pour diagnostiquer pourquoi la galerie n'est pas visible
 */

console.log('🔍 Diagnostic de visibilité de la galerie...\n')

const fs = require('fs')
const path = require('path')

try {
  // 1. Vérifier FormationsSection
  const formationsSectionPath = path.join(__dirname, '..', 'src', 'components', 'sections', 'FormationsSection.tsx')
  const formationsSectionContent = fs.readFileSync(formationsSectionPath, 'utf8')
  
  console.log('📁 Vérification de FormationsSection.tsx:')
  
  if (formationsSectionContent.includes('<FormationsGallery')) {
    console.log('✅ FormationsGallery est utilisée dans FormationsSection')
    
    // Trouver la position exacte
    const lines = formationsSectionContent.split('\n')
    lines.forEach((line, index) => {
      if (line.includes('<FormationsGallery')) {
        console.log(`   → Ligne ${index + 1}: ${line.trim()}`)
      }
    })
  } else {
    console.log('❌ FormationsGallery n\'est PAS utilisée dans FormationsSection')
  }
  
  if (formationsSectionContent.includes('import FormationsGallery')) {
    console.log('✅ FormationsGallery est importée')
  } else {
    console.log('❌ FormationsGallery n\'est PAS importée')
  }
  
  // 2. Vérifier FormationsGallery
  const galleryPath = path.join(__dirname, '..', 'src', 'components', 'sections', 'FormationsGallery.tsx')
  const galleryContent = fs.readFileSync(galleryPath, 'utf8')
  
  console.log('\n📁 Vérification de FormationsGallery.tsx:')
  
  if (galleryContent.includes('export default FormationsGallery')) {
    console.log('✅ FormationsGallery est exportée par défaut')
  } else {
    console.log('❌ FormationsGallery n\'est PAS exportée par défaut')
  }
  
  // Vérifier s'il y a des erreurs de syntaxe évidentes
  const openBraces = (galleryContent.match(/{/g) || []).length
  const closeBraces = (galleryContent.match(/}/g) || []).length
  
  if (openBraces === closeBraces) {
    console.log('✅ Accolades équilibrées')
  } else {
    console.log(`❌ Accolades déséquilibrées: ${openBraces} ouvertes, ${closeBraces} fermées`)
  }
  
  // 3. Vérifier les données statiques
  const staticDataPath = path.join(__dirname, '..', 'src', 'data', 'formations-static.ts')
  const staticDataContent = fs.readFileSync(staticDataPath, 'utf8')
  
  console.log('\n📊 Vérification des données statiques:')
  
  const alternanceCount = (staticDataContent.match(/{\s*id:\s*\d+,[\s\S]*?}/g) || []).length
  console.log(`📈 Formations trouvées dans le fichier: ~${alternanceCount}`)
  
  console.log('\n🎯 Actions recommandées:')
  console.log('1. Vérifier que FormationsGallery est bien importée et utilisée')
  console.log('2. Vérifier qu\'il n\'y a pas d\'erreurs de compilation')
  console.log('3. Vérifier que les données statiques se chargent correctement')
  console.log('4. Ajouter des console.log pour tracer l\'exécution')
  
} catch (error) {
  console.log('❌ Erreur lors du diagnostic:', error.message)
}