#!/usr/bin/env node

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-token-here';

async function configurePermissions() {
  try {
    console.log('🔐 Configuration des permissions pour page-partenaires...\n');

    // 1. Récupérer les rôles
    console.log('1️⃣  Récupération des rôles...');
    const rolesResponse = await fetch(
      `${STRAPI_URL}/admin/roles`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!rolesResponse.ok) {
      console.error(`❌ Erreur récupération rôles: ${rolesResponse.status}`);
      return;
    }

    const rolesData = await rolesResponse.json();
    const publicRole = rolesData.data?.find(r => r.code === 'strapi-public');
    
    if (!publicRole) {
      console.error('❌ Rôle public non trouvé');
      return;
    }

    console.log(`✅ Rôle public trouvé (ID: ${publicRole.id})`);

    // 2. Configurer les permissions pour le rôle public
    console.log('\n2️⃣  Configuration des permissions...');
    
    const permissionsResponse = await fetch(
      `${STRAPI_URL}/admin/roles/${publicRole.id}/permissions`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          permissions: [
            {
              action: 'plugin::content-manager.explorer.read',
              subject: 'api::page-partenaires.page-partenaires',
              properties: {},
              conditions: [],
            },
          ],
        }),
      }
    );

    if (!permissionsResponse.ok) {
      console.error(`❌ Erreur configuration permissions: ${permissionsResponse.status}`);
      const error = await permissionsResponse.text();
      console.error(error);
      return;
    }

    console.log('✅ Permissions configurées');

    // 3. Vérifier les permissions
    console.log('\n3️⃣  Vérification des permissions...');
    const verifyResponse = await fetch(
      `${STRAPI_URL}/admin/roles/${publicRole.id}/permissions`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    if (verifyResponse.ok) {
      const permsData = await verifyResponse.json();
      const pagePartenairesPerms = permsData.data?.permissions?.filter(p => 
        p.subject === 'api::page-partenaires.page-partenaires'
      );
      
      if (pagePartenairesPerms && pagePartenairesPerms.length > 0) {
        console.log('✅ Permissions vérifiées');
        console.log(`   ${pagePartenairesPerms.length} permission(s) configurée(s)`);
      } else {
        console.log('⚠️  Aucune permission trouvée pour page-partenaires');
      }
    }

    console.log('\n✅ Configuration terminée!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

configurePermissions();
