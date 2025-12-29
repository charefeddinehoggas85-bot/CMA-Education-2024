/**
 * Script pour configurer automatiquement les permissions Public dans Strapi
 * Permet l'accès en lecture à toutes les APIs nécessaires
 */

const STRAPI_URL = 'http://localhost:1337'
const STRAPI_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
}

// Liste des APIs à configurer avec leurs actions
const apisToEnable = [
  // Collection Types
  { uid: 'api::formation.formation', actions: ['find', 'findOne'] },
  { uid: 'api::modalite.modalite', actions: ['find', 'findOne'] },
  { uid: 'api::statistique-site.statistique-site', actions: ['find', 'findOne'] },
  { uid: 'api::testimonial.testimonial', actions: ['find', 'findOne'] },
  { uid: 'api::partner.partner', actions: ['find', 'findOne'] },
  { uid: 'api::valeur-ecole.valeur-ecole', actions: ['find', 'findOne'] },
  { uid: 'api::processus-admission.processus-admission', actions: ['find', 'findOne'] },
  { uid: 'api::article-blog.article-blog', actions: ['find', 'findOne'] },
  { uid: 'api::categorie-blog.categorie-blog', actions: ['find', 'findOne'] },
  { uid: 'api::formateur.formateur', actions: ['find', 'findOne'] },
  { uid: 'api::formation-category.formation-category', actions: ['find', 'findOne'] },
  { uid: 'api::vae-formule.vae-formule', actions: ['find', 'findOne'] },
  { uid: 'api::entreprise-service.entreprise-service', actions: ['find', 'findOne'] },
  { uid: 'api::formation-thematique.formation-thematique', actions: ['find', 'findOne'] },
  { uid: 'api::page.page', actions: ['find', 'findOne'] },
  { uid: 'api::faqs.faqs', actions: ['find', 'findOne'] },
  // Single Types
  { uid: 'api::site-settings.site-settings', actions: ['find'] },
]

async function getPublicRole() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/users-permissions/roles`, { headers })
    if (!response.ok) {
      console.error('Erreur récupération des rôles')
      return null
    }
    const data = await response.json()
    const publicRole = data.roles?.find(role => role.type === 'public')
    return publicRole
  } catch (error) {
    console.error('Erreur:', error.message)
    return null
  }
}

async function updateRolePermissions(roleId, permissions) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/users-permissions/roles/${roleId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ permissions })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error('Erreur mise à jour permissions:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Erreur:', error.message)
    return false
  }
}

async function getRoleDetails(roleId) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/users-permissions/roles/${roleId}`, { headers })
    if (!response.ok) return null
    const data = await response.json()
    return data.role
  } catch {
    return null
  }
}

async function main() {
  console.log('🔧 Configuration des permissions Public dans Strapi\n')
  console.log('=' .repeat(60))
  
  // 1. Récupérer le rôle Public
  console.log('\n📋 Récupération du rôle Public...')
  const publicRole = await getPublicRole()
  
  if (!publicRole) {
    console.error('❌ Impossible de trouver le rôle Public')
    return
  }
  
  console.log(`✅ Rôle Public trouvé (ID: ${publicRole.id})`)
  
  // 2. Récupérer les détails du rôle
  console.log('\n📋 Récupération des permissions actuelles...')
  const roleDetails = await getRoleDetails(publicRole.id)
  
  if (!roleDetails) {
    console.error('❌ Impossible de récupérer les détails du rôle')
    return
  }
  
  // 3. Construire les nouvelles permissions
  console.log('\n📋 Construction des nouvelles permissions...')
  const permissions = roleDetails.permissions || {}
  
  for (const api of apisToEnable) {
    const [, apiName] = api.uid.split('::')
    const [controller] = apiName.split('.')
    
    if (!permissions[api.uid]) {
      permissions[api.uid] = { controllers: {} }
    }
    
    if (!permissions[api.uid].controllers) {
      permissions[api.uid].controllers = {}
    }
    
    if (!permissions[api.uid].controllers[controller]) {
      permissions[api.uid].controllers[controller] = {}
    }
    
    for (const action of api.actions) {
      permissions[api.uid].controllers[controller][action] = { enabled: true }
    }
    
    console.log(`   ✅ ${apiName}: ${api.actions.join(', ')}`)
  }
  
  // 4. Mettre à jour les permissions
  console.log('\n📋 Mise à jour des permissions...')
  const success = await updateRolePermissions(publicRole.id, permissions)
  
  if (success) {
    console.log('\n✅ Permissions configurées avec succès!')
  } else {
    console.log('\n❌ Erreur lors de la configuration des permissions')
    console.log('\n📌 Configuration manuelle requise:')
    console.log('   1. Allez dans Strapi Admin: http://localhost:1337/admin')
    console.log('   2. Settings → Users & Permissions → Roles → Public')
    console.log('   3. Pour chaque API, cochez "find" et "findOne"')
    console.log('   4. Sauvegardez')
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('\n📌 Vérifiez avec: node scripts/check-strapi-apis.js')
}

main().catch(console.error)
