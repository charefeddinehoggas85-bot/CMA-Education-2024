#!/usr/bin/env node

const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-api-token';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

async function getPublicRole() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/admin/roles?type=api`, {
      headers,
    });

    if (response.ok) {
      const result = await response.json();
      const publicRole = result.data?.find((role) => role.code === 'strapi-public');
      return publicRole?.id;
    }
    return null;
  } catch (error) {
    console.error('❌ Erreur récupération rôle public:', error.message);
    return null;
  }
}

async function configurePermissions(roleId, contentType) {
  try {
    console.log(`\n🔐 Configuration des permissions pour ${contentType}`);

    const permissions = [
      {
        action: `plugin::content-manager.explorer.create`,
        subject: `api::${contentType}.${contentType}`,
        properties: {},
        conditions: [],
      },
      {
        action: `plugin::content-manager.explorer.read`,
        subject: `api::${contentType}.${contentType}`,
        properties: {},
        conditions: [],
      },
      {
        action: `plugin::content-manager.explorer.update`,
        subject: `api::${contentType}.${contentType}`,
        properties: {},
        conditions: [],
      },
      {
        action: `plugin::content-manager.explorer.delete`,
        subject: `api::${contentType}.${contentType}`,
        properties: {},
        conditions: [],
      },
    ];

    for (const permission of permissions) {
      const response = await fetch(
        `${STRAPI_URL}/api/admin/permissions`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            role: roleId,
            ...permission,
          }),
        }
      );

      if (response.ok) {
        console.log(`✅ Permission ${permission.action} configurée`);
      } else {
        const error = await response.json();
        console.log(`⚠️ Permission ${permission.action} existe probablement déjà`);
      }
    }
  } catch (error) {
    console.error(`❌ Erreur configuration permissions:`, error.message);
  }
}

async function setupBlogPermissions() {
  console.log('🚀 Configuration des permissions Blog...\n');

  const publicRoleId = await getPublicRole();

  if (!publicRoleId) {
    console.log('⚠️ Rôle public non trouvé. Configuration manuelle requise.');
    console.log('\n📋 Instructions manuelles:');
    console.log('1. Accédez à http://localhost:1337/admin/settings/roles');
    console.log('2. Cliquez sur le rôle "Public"');
    console.log('3. Allez dans l\'onglet "Permissions"');
    console.log('4. Cherchez "Article Blog" et "Catégorie Blog"');
    console.log('5. Cochez "find" et "findOne" pour les deux');
    console.log('6. Sauvegardez');
    return;
  }

  // Configurer les permissions pour les catégories blog
  await configurePermissions(publicRoleId, 'categorie-blog');

  // Configurer les permissions pour les articles blog
  await configurePermissions(publicRoleId, 'article-blog');

  console.log('\n✅ Configuration des permissions Blog terminée!');
  console.log('\n📋 Vérification:');
  console.log('1. Accédez à http://localhost:1337/admin/settings/roles');
  console.log('2. Vérifiez que le rôle "Public" a accès à "Article Blog" et "Catégorie Blog"');
  console.log('3. Testez l\'accès à http://localhost:3000/blog');
}

setupBlogPermissions().catch(console.error);
