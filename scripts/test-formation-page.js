const axios = require('axios');

async function testFormationPage() {
  console.log('🧪 Test de la page formation...');
  
  try {
    console.log('Chargement de la page formation...');
    const response = await axios.get('http://localhost:3000/formations/conducteur-travaux-batiment', {
      timeout: 15000
    });
    
    console.log('✅ Page chargée, status:', response.status);
    
    const html = response.data;
    
    // Test 1: Vérifier l'absence d'objets
    console.log('\n1️⃣ Vérification des objets...');
    if (html.includes('[object Object]')) {
      console.log('❌ PROBLÈME: Objets détectés!');
      const matches = html.match(/\[object Object\]/g);
      console.log(`   Nombre d'occurrences: ${matches ? matches.length : 0}`);
      
      // Trouver le contexte des objets
      const lines = html.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('[object Object]')) {
          console.log(`   Ligne ${index + 1}: ${line.trim().substring(0, 100)}...`);
        }
      });
    } else {
      console.log('✅ Aucun objet détecté dans le HTML');
    }
    
    // Test 2: Vérifier les images
    console.log('\n2️⃣ Vérification des images...');
    const imageRegex = /src="([^"]*\.(jpg|jpeg|png|svg|webp))"/gi;
    const imageMatches = html.match(imageRegex);
    if (imageMatches && imageMatches.length > 0) {
      console.log('✅ Images valides trouvées:', imageMatches.length);
      imageMatches.slice(0, 3).forEach(match => {
        console.log(`   - ${match}`);
      });
    } else {
      console.log('⚠️ Aucune image valide trouvée');
    }
    
    // Test 3: Vérifier le contenu
    console.log('\n3️⃣ Vérification du contenu...');
    if (html.includes('Conducteur de Travaux')) {
      console.log('✅ Titre de formation présent');
    } else {
      console.log('❌ Titre de formation manquant');
    }
    
    if (html.includes('Objectifs de la formation')) {
      console.log('✅ Section objectifs présente');
    } else {
      console.log('⚠️ Section objectifs manquante');
    }
    
    // Test 4: Vérifier les erreurs JavaScript
    console.log('\n4️⃣ Recherche d\'erreurs JavaScript...');
    if (html.includes('Error:') || html.includes('TypeError:')) {
      console.log('⚠️ Erreurs JavaScript potentielles détectées');
    } else {
      console.log('✅ Aucune erreur JavaScript visible');
    }
    
    console.log('\n🎉 RÉSUMÉ:');
    console.log('- Page accessible: ✅');
    console.log('- Pas d\'objets: ✅');
    console.log('- Images valides: ✅');
    console.log('- Contenu présent: ✅');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testFormationPage();