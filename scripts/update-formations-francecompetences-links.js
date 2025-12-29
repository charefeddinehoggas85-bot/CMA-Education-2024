/**
 * Script pour ajouter les liens France Compétences aux formations
 * Les liens sont basés sur les codes RNCP officiels
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Mapping des codes RNCP vers les liens France Compétences
// Format: https://www.francecompetences.fr/recherche/rncp/XXXXX/
const rncpLinks = {
  // Formations Alternance
  'RNCP35503': 'https://www.francecompetences.fr/recherche/rncp/35503/', // Chargé d'Affaires du Bâtiment
  'RNCP40217': 'https://www.francecompetences.fr/recherche/rncp/40217/', // Conducteur de Travaux Bâtiment et Génie Civil
  'RNCP41466': 'https://www.francecompetences.fr/recherche/rncp/41466/', // Conducteur de Travaux Travaux Publics
  'RNCP41368': 'https://www.francecompetences.fr/recherche/rncp/41368/', // Chef de Chantier VRD
  'RNCP39408': 'https://www.francecompetences.fr/recherche/rncp/39408/', // Coordinateur BIM du Bâtiment
  'RNCP41369': 'https://www.francecompetences.fr/recherche/rncp/41369/', // Conducteur de Travaux VRD (niveau 6)
  'RNCP39469': 'https://www.francecompetences.fr/recherche/rncp/39469/', // Conducteur de Travaux VRD (autre)
  'RNCP38549': 'https://www.francecompetences.fr/recherche/rncp/38549/', // Conducteur de Travaux Publics (reconversion)
};

// Données complètes des formations avec liens France Compétences
const formationsWithLinks = [
  // ALTERNANCE
  {
    slug: 'charge-affaires-batiment',
    rncp: 'RNCP35503',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/35503/',
    title: "Chargé(e) d'Affaires du Bâtiment"
  },
  {
    slug: 'conducteur-travaux-batiment',
    rncp: 'RNCP40217',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/40217/',
    title: "Conducteur de Travaux – Bâtiment & Génie Civil"
  },
  {
    slug: 'conducteur-travaux-tp-alternance',
    rncp: 'RNCP41466',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/41466/',
    title: "Conducteur de Travaux, Travaux Publics"
  },
  {
    slug: 'chef-chantier-vrd',
    rncp: 'RNCP41368',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/41368/',
    title: "Chef de Chantier Voirie et Réseaux Divers"
  },
  {
    slug: 'responsable-travaux-bim',
    rncp: 'RNCP39408',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/39408/',
    title: "Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM"
  },
  {
    slug: 'chef-projets-btp',
    rncp: 'En cours d\'enregistrement',
    rncpUrl: null,
    title: "Chef de Projets BTP"
  },
  {
    slug: 'conducteur-travaux-vrd-1an',
    rncp: 'RNCP41369',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/41369/',
    title: "Conducteur de Travaux en VRD - Cursus 1 an"
  },
  {
    slug: 'conducteur-travaux-vrd-2ans',
    rncp: 'RNCP41369',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/41369/',
    title: "Conducteur de Travaux VRD - Cursus 2 ans"
  },
  // RECONVERSION
  {
    slug: 'charge-affaires-reconversion',
    rncp: 'RNCP35503',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/35503/',
    title: "Chargé d'affaires du bâtiment - Reconversion"
  },
  {
    slug: 'conducteur-travaux-reconversion',
    rncp: 'RNCP40217',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/40217/',
    title: "Conducteur de Travaux Bâtiment - Reconversion"
  },
  {
    slug: 'conducteur-travaux-publics-reconversion',
    rncp: 'RNCP38549',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/38549/',
    title: "Conducteur de Travaux Publics - Reconversion"
  }
];

// VAE Certifications avec liens
const vaeCertificationsWithLinks = [
  {
    titre: "Conducteur de Travaux Bâtiment et Génie Civil",
    rncp: "RNCP n°40217",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/40217/",
    niveau: "niveau5"
  },
  {
    titre: "Chef de Chantier en Voirie et Réseaux Divers",
    rncp: "RNCP n°41368",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/41368/",
    niveau: "niveau5"
  },
  {
    titre: "Chargé d'Affaires du Bâtiment",
    rncp: "RNCP n°35503",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/35503/",
    niveau: "niveau5"
  },
  {
    titre: "Coordinateur BIM du Bâtiment",
    rncp: "RNCP n°39408",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/39408/",
    niveau: "niveau6"
  },
  {
    titre: "Conducteur de Travaux Voirie et Réseaux Divers",
    rncp: "RNCP n°39469",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/39469/",
    niveau: "niveau6"
  }
];

async function updateFormationsInStrapi() {
  console.log('\n📚 Mise à jour des formations avec liens France Compétences...');
  
  try {
    // Récupérer toutes les formations
    const response = await fetch(`${STRAPI_URL}/api/formations?pagination[limit]=100`, { headers });
    if (!response.ok) {
      console.log('❌ Impossible de récupérer les formations');
      return;
    }
    
    const data = await response.json();
    const formations = data.data || [];
    console.log(`📋 ${formations.length} formations trouvées`);
    
    let updated = 0;
    for (const formation of formations) {
      const slug = formation.attributes?.slug || formation.slug;
      const match = formationsWithLinks.find(f => f.slug === slug);
      
      if (match && match.rncpUrl) {
        try {
          const updateResponse = await fetch(`${STRAPI_URL}/api/formations/${formation.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
              data: {
                rncpUrl: match.rncpUrl
              }
            })
          });
          
          if (updateResponse.ok) {
            console.log(`  ✅ ${match.title} -> ${match.rncpUrl}`);
            updated++;
          }
        } catch (e) {
          console.log(`  ⚠ Erreur mise à jour ${slug}`);
        }
      }
    }
    
    console.log(`\n✅ ${updated} formations mises à jour`);
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

async function updateVAECertifications() {
  console.log('\n🎓 Mise à jour des certifications VAE avec liens France Compétences...');
  
  try {
    // Supprimer les anciennes
    const existing = await fetch(`${STRAPI_URL}/api/vae-certifications`, { headers });
    if (existing.ok) {
      const data = await existing.json();
      for (const item of (data.data || [])) {
        await fetch(`${STRAPI_URL}/api/vae-certifications/${item.id}`, { method: 'DELETE', headers });
      }
    }
    
    // Créer les nouvelles avec liens
    let success = 0;
    for (const cert of vaeCertificationsWithLinks) {
      try {
        const response = await fetch(`${STRAPI_URL}/api/vae-certifications`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            data: {
              ...cert,
              ordre: vaeCertificationsWithLinks.indexOf(cert) + 1,
              publishedAt: new Date().toISOString()
            }
          })
        });
        
        if (response.ok) {
          console.log(`  ✅ ${cert.titre} -> ${cert.rncpUrl}`);
          success++;
        }
      } catch (e) {}
    }
    
    console.log(`\n✅ ${success}/${vaeCertificationsWithLinks.length} certifications VAE créées`);
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

async function main() {
  console.log('🔗 Ajout des liens France Compétences aux formations');
  console.log('====================================================');
  console.log('📡 URL:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    return;
  }
  
  await updateFormationsInStrapi();
  await updateVAECertifications();
  
  console.log('\n====================================================');
  console.log('✅ Liens France Compétences ajoutés !');
  console.log('\n📋 Liens ajoutés:');
  formationsWithLinks.filter(f => f.rncpUrl).forEach(f => {
    console.log(`   • ${f.rncp}: ${f.rncpUrl}`);
  });
}

main().catch(console.error);
