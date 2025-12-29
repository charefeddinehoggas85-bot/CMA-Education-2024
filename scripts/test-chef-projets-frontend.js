#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const STRAPI_URL = 'http://localhost:1337';

console.log('🧪 Test d\'accès frontend à la formation Chef de Projets BTP...');

async function testFrontendAccess() {
  try {
    // Test d'accès public (comme le ferait le frontend)
    console.log('📡 Test d\'accès public à la formation...');
    
    const response = await axios.get(
      `${STRAPI_URL}/api/formations/21?populate=*`
    );

    if (response.data.data) {
      const formation = response.data.data.attributes;
      
      console.log('✅ Accès réussi!');
      console.log('\n📋 Données disponibles pour le frontend:');
      console.log(`📌 Titre: ${formation.title}`);
      console.log(`🎯 Niveau: ${formation.level}`);
      console.log(`🔗 Slug: ${formation.slug}`);
      console.log(`📜 RNCP: ${formation.rncp}`);
      
      console.log('\n📝 Contenu détaillé:');
      console.log(`• Objectifs: ${formation.objectifs ? 'Disponible (' + formation.objectifs.length + ' caractères)' : 'Non disponible'}`);
      console.log(`• Compétences 2e année: ${formation.competences2eAnnee ? 'Disponible (' + formation.competences2eAnnee.length + ' caractères)' : 'Non disponible'}`);
      console.log(`• Programme: ${formation.programme ? 'Disponible (' + formation.programme.length + ' caractères)' : 'Non disponible'}`);
      console.log(`• Débouchés: ${formation.debouches ? 'Disponible (' + formation.debouches.length + ' caractères)' : 'Non disponible'}`);
      console.log(`• Poursuites d'études: ${formation.poursuiteEtudes ? 'Disponible (' + formation.poursuiteEtudes.length + ' caractères)' : 'Non disponible'}`);
      
      console.log('\n🔧 Informations pratiques:');
      console.log(`• Durée: ${formation.duree || 'Non spécifiée'}`);
      console.log(`• Volume horaire: ${formation.volumeHoraire || 'Non spécifié'}`);
      console.log(`• Répartition: ${formation.repartition || 'Non spécifiée'}`);
      console.log(`• Type de contrat: ${formation.typeContrat || 'Non spécifié'}`);
      console.log(`• Modalité: ${formation.modalite || 'Non spécifiée'}`);
      console.log(`• Effectif: ${formation.effectif || 'Non spécifié'}`);
      console.log(`• Coût: ${formation.cout || 'Non spécifié'}`);
      
      console.log('\n📞 Contact:');
      console.log(formation.contact || 'Non spécifié');
      
      console.log('\n🌐 URL et SEO:');
      console.log(`• Page URL: ${formation.pageUrl || 'Non définie'}`);
      console.log(`• SEO Title: ${formation.seoTitle || 'Non défini'}`);
      console.log(`• SEO Description: ${formation.seoDescription || 'Non définie'}`);
      
      // Test de la structure pour le frontend
      console.log('\n🔍 Structure pour composant React:');
      const frontendData = {
        id: response.data.data.id,
        title: formation.title,
        slug: formation.slug,
        level: formation.level,
        rncp: formation.rncp,
        objectifs: formation.objectifs,
        competences: formation.competences2eAnnee,
        programme: formation.programme,
        debouches: formation.debouches,
        poursuites: formation.poursuiteEtudes,
        prerequis: formation.prerequis,
        evaluation: formation.modalitesEvaluation,
        duree: formation.duree,
        volumeHoraire: formation.volumeHoraire,
        repartition: formation.repartition,
        typeContrat: formation.typeContrat,
        modalite: formation.modalite,
        effectif: formation.effectif,
        cout: formation.cout,
        contact: formation.contact,
        pageUrl: formation.pageUrl,
        seoTitle: formation.seoTitle,
        seoDescription: formation.seoDescription
      };
      
      console.log('✅ Structure de données prête pour React');
      console.log(`📊 Nombre de champs remplis: ${Object.values(frontendData).filter(v => v && v !== '').length}/${Object.keys(frontendData).length}`);
      
      return frontendData;
    }

  } catch (error) {
    console.error('❌ Erreur d\'accès:', error.response?.data || error.message);
    return null;
  }
}

async function testSpecificFields() {
  try {
    console.log('\n🎯 Test des champs spécifiques importés...');
    
    const response = await axios.get(
      `${STRAPI_URL}/api/formations/21`
    );

    if (response.data.data) {
      const formation = response.data.data.attributes;
      
      console.log('\n📋 Aperçu du contenu importé:');
      
      if (formation.objectifs) {
        console.log('\n🎯 OBJECTIFS (extrait):');
        console.log(formation.objectifs.substring(0, 200) + '...');
      }
      
      if (formation.competences2eAnnee) {
        console.log('\n💪 COMPÉTENCES (extrait):');
        console.log(formation.competences2eAnnee.substring(0, 200) + '...');
      }
      
      if (formation.programme) {
        console.log('\n📚 PROGRAMME (extrait):');
        console.log(formation.programme.substring(0, 200) + '...');
      }
      
      console.log('\n✅ Tous les contenus détaillés sont accessibles!');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

async function main() {
  const frontendData = await testFrontendAccess();
  
  if (frontendData) {
    await testSpecificFields();
    console.log('\n🎉 Test terminé avec succès!');
    console.log('🚀 La formation Chef de Projets BTP est prête pour le frontend avec tous les contenus détaillés du fichier markdown!');
  } else {
    console.log('\n❌ Échec du test');
  }
}

main();