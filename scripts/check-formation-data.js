/**
 * Script pour vérifier les données d'une formation dans Strapi
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function checkFormation() {
  const slug = 'charge-affaires-batiment';
  
  console.log('🔍 Vérification de la formation:', slug);
  console.log('='.repeat(50));
  
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/formations?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_TOKEN}`
        }
      }
    );
    
    if (!response.ok) {
      console.log('❌ Erreur API:', response.status);
      return;
    }
    
    const data = await response.json();
    const formation = data.data?.[0];
    
    if (!formation) {
      console.log('❌ Formation non trouvée');
      return;
    }
    
    const attrs = formation.attributes || formation;
    
    console.log('\n📋 Données de la formation:');
    console.log('   ID:', formation.id);
    console.log('   Titre:', attrs.title);
    console.log('   Slug:', attrs.slug);
    console.log('   RNCP:', attrs.rncp);
    console.log('   Niveau:', attrs.level);
    console.log('   Durée:', attrs.duree);
    console.log('   Volume horaire:', attrs.volumeHoraire);
    console.log('   Répartition:', attrs.repartition);
    console.log('   Modalité:', attrs.modalite);
    console.log('   Coût:', attrs.cout);
    console.log('   Financement:', attrs.financement);
    console.log('   Taux réussite:', attrs.tauxReussite);
    console.log('   Taux insertion:', attrs.tauxInsertion);
    
    console.log('\n📝 Objectifs:', attrs.objectifs ? `${attrs.objectifs.length} objectifs` : 'Non défini');
    if (attrs.objectifs) {
      attrs.objectifs.slice(0, 3).forEach((o, i) => console.log(`      ${i+1}. ${o}`));
      if (attrs.objectifs.length > 3) console.log(`      ... et ${attrs.objectifs.length - 3} autres`);
    }
    
    console.log('\n📚 Programme:', attrs.programme ? `${attrs.programme.length} modules` : 'Non défini');
    if (attrs.programme) {
      console.log('   Structure:', JSON.stringify(attrs.programme[0], null, 2).substring(0, 200));
    }
    
    console.log('\n💼 Débouchés:', attrs.debouches ? `${attrs.debouches.length} débouchés` : 'Non défini');
    console.log('📋 Prérequis:', attrs.prerequis ? `${attrs.prerequis.length} prérequis` : 'Non défini');
    console.log('✅ Évaluation:', attrs.evaluation ? `${attrs.evaluation.length} modalités` : 'Non défini');
    console.log('🎓 Poursuites:', attrs.poursuiteEtudes ? `${attrs.poursuiteEtudes.length} formations` : 'Non défini');
    console.log('🏢 Partenaires:', attrs.entreprisesPartenaires ? `${attrs.entreprisesPartenaires.length} entreprises` : 'Non défini');
    console.log('📞 Contact:', attrs.contact ? 'Défini' : 'Non défini');
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

checkFormation();
