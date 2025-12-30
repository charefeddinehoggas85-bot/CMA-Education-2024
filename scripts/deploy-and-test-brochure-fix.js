const { execSync } = require('child_process');

console.log('🚀 Déploiement et test du fix brochure...\n');

async function deployAndTestBrochureFix() {
  try {
    // 1. Vérifier que nous sommes dans le bon dossier
    console.log('📁 Vérification du dossier...');
    process.chdir('CMA-Education-2024');
    console.log('✅ Dans le dossier CMA-Education-2024');

    // 2. Commit et push des changements
    console.log('\n📝 Commit des changements...');
    try {
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "Fix: Ajout API proxy pour téléchargement brochures PDF"', { stdio: 'inherit' });
      execSync('git push origin main', { stdio: 'inherit' });
      console.log('✅ Changements pushés vers GitHub');
    } catch (gitError) {
      console.log('⚠️ Erreur Git (peut-être rien à commiter):', gitError.message);
    }

    // 3. Attendre le déploiement Vercel
    console.log('\n⏳ Attente du déploiement Vercel (60 secondes)...');
    await new Promise(resolve => setTimeout(resolve, 60000));

    // 4. Tester l'API
    console.log('\n🧪 Test de l\'API après déploiement...');
    const axios = require('axios');
    
    const frontendUrl = 'https://cma-education-2024.vercel.app';
    const strapiUrl = 'https://cma-education-strapi-production.up.railway.app';
    
    // Récupérer une formation avec brochure
    const formationsResponse = await axios.get(`${strapiUrl}/api/formations?populate=brochure`);
    const formations = formationsResponse.data.data;
    
    const formationAvecBrochure = formations.find(f => 
      f.attributes.brochure?.data?.attributes?.url
    );
    
    if (!formationAvecBrochure) {
      console.log('❌ Aucune formation avec brochure trouvée');
      return;
    }
    
    console.log(`🔍 Test avec: ${formationAvecBrochure.attributes.title}`);
    
    const testData = {
      formationId: formationAvecBrochure.id,
      userData: {
        nom: 'Test',
        prenom: 'User',
        email: 'test@example.com',
        telephone: '0123456789',
        type: 'particulier'
      }
    };
    
    try {
      const response = await axios.post(`${frontendUrl}/api/download-brochure`, testData, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      console.log('✅ API fonctionne !');
      console.log(`   Status: ${response.status}`);
      console.log(`   Taille: ${response.data.byteLength} bytes`);
      
      // Vérifier que c'est un PDF
      const pdfHeader = new Uint8Array(response.data.slice(0, 4));
      const isPdf = pdfHeader[0] === 0x25 && pdfHeader[1] === 0x50 && pdfHeader[2] === 0x44 && pdfHeader[3] === 0x46;
      
      if (isPdf) {
        console.log('✅ Fichier PDF valide reçu');
        console.log('\n🎉 SUCCESS ! Le téléchargement de brochures fonctionne !');
        console.log('\n📋 Instructions pour tester:');
        console.log(`1. Aller sur: ${frontendUrl}/brochure`);
        console.log('2. Sélectionner une formation');
        console.log('3. Remplir le formulaire');
        console.log('4. Cliquer sur "Télécharger la brochure"');
      } else {
        console.log('⚠️ Le fichier reçu ne semble pas être un PDF valide');
      }
      
    } catch (apiError) {
      console.log(`❌ Erreur API: ${apiError.response?.status || apiError.message}`);
      
      if (apiError.response?.status === 405) {
        console.log('⚠️ L\'API n\'est pas encore déployée. Attendre quelques minutes de plus.');
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

deployAndTestBrochureFix();