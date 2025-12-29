/**
 * Script pour créer le Content Type Modalite via l'API Content Type Builder
 */

const STRAPI_URL = 'http://localhost:1337';

// Token admin (pas API token) - on va utiliser l'authentification admin
async function getAdminToken() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@cma-education.com',
        password: 'Admin123!'
      })
    });
    
    if (!response.ok) {
      console.log('❌ Impossible de se connecter en admin');
      console.log('   Créez le Content Type manuellement dans Strapi Admin');
      return null;
    }
    
    const data = await response.json();
    return data.data.token;
  } catch (error) {
    console.log('❌ Erreur de connexion admin:', error.message);
    return null;
  }
}

async function createModaliteContentType(adminToken) {
  const contentType = {
    contentType: {
      kind: 'collectionType',
      collectionName: 'modalites',
      info: {
        singularName: 'modalite',
        pluralName: 'modalites',
        displayName: 'Modalité',
        description: 'Modalités de formation (Alternance, Reconversion, VAE)'
      },
      options: {
        draftAndPublish: false
      },
      pluginOptions: {},
      attributes: {
        titre: {
          type: 'string',
          required: true
        },
        description: {
          type: 'text',
          required: true
        },
        slug: {
          type: 'uid',
          targetField: 'titre'
        },
        icon: {
          type: 'string',
          default: 'GraduationCap'
        },
        couleur: {
          type: 'string',
          default: 'from-blue-500 to-blue-600'
        },
        lien: {
          type: 'string',
          default: '/formations'
        },
        ordre: {
          type: 'integer',
          default: 0
        },
        featured: {
          type: 'boolean',
          default: true
        }
      }
    }
  };

  try {
    const response = await fetch(`${STRAPI_URL}/content-type-builder/content-types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(contentType)
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Content Type Modalite créé avec succès!');
      console.log('   Strapi va redémarrer automatiquement...');
      return true;
    } else {
      console.log('❌ Erreur lors de la création:', data.error?.message || JSON.stringify(data));
      return false;
    }
  } catch (error) {
    console.log('❌ Erreur:', error.message);
    return false;
  }
}

async function main() {
  console.log('🔧 Création du Content Type Modalite via API\n');
  console.log('=' .repeat(60));
  
  // Vérifier si Strapi est en ligne
  try {
    await fetch(`${STRAPI_URL}/_health`);
  } catch (error) {
    console.log('❌ Strapi n\'est pas accessible!');
    console.log('   Démarrez Strapi avec: cd cms-cma && npm run develop');
    return;
  }
  
  console.log('✅ Strapi est en ligne\n');
  
  // Obtenir le token admin
  console.log('🔐 Connexion admin...');
  const adminToken = await getAdminToken();
  
  if (!adminToken) {
    console.log('\n' + '=' .repeat(60));
    console.log('\n📋 CRÉATION MANUELLE REQUISE:\n');
    console.log('1. Ouvrez http://localhost:1337/admin');
    console.log('2. Allez dans Content-Type Builder');
    console.log('3. Cliquez sur "Create new collection type"');
    console.log('4. Nom: "Modalité" (singularName: modalite)');
    console.log('5. Ajoutez les champs:');
    console.log('   - titre (Text, Required)');
    console.log('   - description (Rich Text, Required)');
    console.log('   - slug (UID, target: titre)');
    console.log('   - icon (Text, default: GraduationCap)');
    console.log('   - couleur (Text, default: from-blue-500 to-blue-600)');
    console.log('   - lien (Text, default: /formations)');
    console.log('   - ordre (Number, Integer, default: 0)');
    console.log('   - featured (Boolean, default: true)');
    console.log('6. Cliquez sur "Save"');
    console.log('7. Strapi redémarrera automatiquement');
    console.log('\n8. Configurez les permissions:');
    console.log('   Settings → Roles → Public → Modalite → find, findOne');
    return;
  }
  
  // Créer le Content Type
  console.log('📝 Création du Content Type Modalite...');
  await createModaliteContentType(adminToken);
}

main().catch(console.error);
