async function analyzeMainFormationsPage() {
  try {
    console.log('🔍 ANALYSE DÉTAILLÉE PAGE FORMATIONS PRINCIPALE');
    
    const response = await fetch('http://localhost:3000/formations');
    const html = await response.text();
    
    console.log('Status:', response.status);
    
    // Analyser les éléments Strapi vs statiques
    const checks = {
      // Éléments qui DEVRAIENT venir de Strapi
      hasObjectifsSection: html.includes('Objectifs de la formation'),
      hasDebouchesSection: html.includes('Débouchés professionnels'),
      hasFormationCards: html.includes('Candidater'),
      hasRNCP: html.includes('RNCP'),
      
      // Titres spécifiques Strapi
      hasChargeAffaires: html.includes('Chargé(e) d\'Affaires du Bâtiment'),
      hasConducteurTravaux: html.includes('Conducteur') && html.includes('Travaux'),
      
      // Données Strapi spécifiques
      hasNiveau5: html.includes('Niveau 5 Européen'),
      has24Mois: html.includes('24 mois'),
      has3Semaines: html.includes('3 semaines en entreprise'),
      
      // Sections statiques (VAE, Entreprises)
      hasVAESection: html.includes('Professionnels en VAE'),
      hasEntrepriseSection: html.includes('Pour les entreprises'),
      hasAlternanceSection: html.includes('Formation en alternance'),
      hasReconversionSection: html.includes('Professionnels en reconversion')
    };
    
    console.log('\n📊 ANALYSE CONTENU:');
    Object.entries(checks).forEach(([key, value]) => {
      const status = value ? '✅' : '❌';
      const type = key.includes('Section') ? '[SECTION]' : 
                   key.includes('has24') || key.includes('has3') || key.includes('hasNiveau') ? '[STRAPI DATA]' :
                   key.includes('Charge') || key.includes('Conducteur') ? '[STRAPI TITLE]' : '[ELEMENT]';
      console.log(`   ${status} ${type} ${key}: ${value ? 'Présent' : 'Absent'}`);
    });
    
    // Compter les éléments Strapi vs statiques
    const strapiElements = ['hasObjectifsSection', 'hasDebouchesSection', 'hasChargeAffaires', 'hasConducteurTravaux', 'hasNiveau5', 'has24Mois', 'has3Semaines'];
    const staticElements = ['hasVAESection', 'hasEntrepriseSection', 'hasAlternanceSection', 'hasReconversionSection'];
    
    const strapiCount = strapiElements.filter(key => checks[key]).length;
    const staticCount = staticElements.filter(key => checks[key]).length;
    
    console.log('\n📈 RÉPARTITION:');
    console.log(`   Éléments Strapi détectés: ${strapiCount}/${strapiElements.length} (${Math.round(strapiCount/strapiElements.length*100)}%)`);
    console.log(`   Éléments statiques détectés: ${staticCount}/${staticElements.length} (${Math.round(staticCount/staticElements.length*100)}%)`);
    
    console.log('\n🔍 PROBLÈME IDENTIFIÉ:');
    if (!checks.hasObjectifsSection) {
      console.log('   ❌ Sections Objectifs manquantes dans les cartes formations');
    }
    if (!checks.hasDebouchesSection) {
      console.log('   ❌ Sections Débouchés manquantes dans les cartes formations');
    }
    if (!checks.hasNiveau5) {
      console.log('   ❌ Données Strapi spécifiques (Niveau 5) manquantes');
    }
    if (!checks.has24Mois) {
      console.log('   ❌ Données Strapi spécifiques (24 mois) manquantes');
    }
    
    console.log('\n💡 SOLUTION:');
    console.log('   La page formations principale utilise un mélange:');
    console.log('   - ✅ Cartes formations avec données Strapi de base (titre, RNCP)');
    console.log('   - ❌ Sections détaillées (objectifs/débouchés) manquantes');
    console.log('   - ✅ Sections VAE et Entreprises (données statiques complètes)');
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

analyzeMainFormationsPage();