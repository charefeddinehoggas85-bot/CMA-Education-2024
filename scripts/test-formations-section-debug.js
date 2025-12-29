const FRONTEND_URL = 'http://localhost:3000'

async function testFormationsSectionDebug() {
  try {
    console.log('🔍 Debug spécifique de FormationsSection...')
    
    const response = await fetch(FRONTEND_URL)
    const html = await response.text()
    
    console.log('\n📋 Recherche d\'éléments de FormationsSection...')
    
    const sectionElements = {
      'Titre principal': html.includes('Nos Formations') || html.includes('BTP d\'Excellence'),
      'Sous-titre': html.includes('Des parcours conçus pour vous spécialiser'),
      'Stats section': html.includes('formations certifiantes') || html.includes('années d\'expérience'),
      'Catégories tabs': html.includes('Alternance') && html.includes('Reconversion'),
      'CTA final': html.includes('Découvrir toutes nos formations'),
      'FormationsGallery import': html.includes('FormationsGallery'),
      'Galerie chargement': html.includes('CHARGEMENT GALERIE FORMATIONS'),
      'Galerie chargée': html.includes('GALERIE FORMATIONS CHARGÉE'),
      'Bordure verte': html.includes('border-green-500'),
      'Bordure bleue': html.includes('border-blue-500')
    }
    
    console.log('\n🔍 Éléments détectés:')
    Object.entries(sectionElements).forEach(([element, found]) => {
      console.log(`  ${found ? '✅' : '❌'} ${element}`)
    })
    
    // Vérifier la position de FormationsGallery dans FormationsSection
    console.log('\n📍 Position de FormationsGallery:')
    
    const formationsSectionStart = html.indexOf('Nos Formations')
    const formationsSectionEnd = html.indexOf('Découvrir toutes nos formations')
    
    if (formationsSectionStart !== -1 && formationsSectionEnd !== -1) {
      const sectionContent = html.substring(formationsSectionStart, formationsSectionEnd + 100)
      
      const hasGalleryInSection = sectionContent.includes('GALERIE FORMATIONS') || 
                                  sectionContent.includes('FormationsGallery') ||
                                  sectionContent.includes('border-green-500')
      
      console.log(`  📦 FormationsSection trouvée: ✅`)
      console.log(`  🎯 FormationsGallery dans la section: ${hasGalleryInSection ? '✅' : '❌'}`)
      
      if (!hasGalleryInSection) {
        console.log('\n🔍 Contenu de FormationsSection (extrait):')
        console.log(sectionContent.substring(0, 500) + '...')
      }
    } else {
      console.log(`  📦 FormationsSection: ❌ Non trouvée`)
    }
    
    // Vérifier les erreurs React
    console.log('\n🐛 Recherche d\'erreurs React:')
    const reactErrors = [
      'Hydration failed',
      'Text content does not match',
      'Cannot read properties',
      'undefined is not a function',
      'Failed to compile',
      'Module not found'
    ]
    
    reactErrors.forEach(error => {
      if (html.includes(error)) {
        console.log(`  ❌ ${error}`)
      }
    })
    
    console.log('\n🎯 CONCLUSION:')
    if (sectionElements['Galerie chargée']) {
      console.log('✅ FormationsGallery fonctionne parfaitement!')
    } else if (sectionElements['Galerie chargement']) {
      console.log('⏳ FormationsGallery est bloquée en chargement')
    } else if (sectionElements['Titre principal']) {
      console.log('⚠️ FormationsSection présente mais FormationsGallery absente')
      console.log('   → Problème d\'import ou de rendu dans FormationsSection')
    } else {
      console.log('❌ FormationsSection elle-même ne s\'affiche pas')
      console.log('   → Problème plus profond dans LazyFormationsSection')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testFormationsSectionDebug()