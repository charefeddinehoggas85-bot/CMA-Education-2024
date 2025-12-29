import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleBlogArticleBlog extends Schema.CollectionType {
  collectionName: 'articles_blog';
  info: {
    singularName: 'article-blog';
    pluralName: 'articles-blog';
    displayName: 'Article Blog';
    description: 'Articles de blog du site';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::article-blog.article-blog', 'titre'>;
    extrait: Attribute.Text & Attribute.Required;
    contenu: Attribute.RichText;
    auteur: Attribute.String & Attribute.Required;
    datePublication: Attribute.Date & Attribute.Required;
    tempsLecture: Attribute.String & Attribute.DefaultTo<'5 min'>;
    image: Attribute.Media<'images'>;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    tags: Attribute.JSON;
    categorie: Attribute.Relation<
      'api::article-blog.article-blog',
      'manyToOne',
      'api::categorie-blog.categorie-blog'
    >;
    formationsLiees: Attribute.Relation<
      'api::article-blog.article-blog',
      'manyToMany',
      'api::formation.formation'
    >;
    seoTitle: Attribute.String;
    seoDescription: Attribute.Text;
    seoKeywords: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article-blog.article-blog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article-blog.article-blog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategorieBlogCategorieBlog extends Schema.CollectionType {
  collectionName: 'categories_blog';
  info: {
    singularName: 'categorie-blog';
    pluralName: 'categories-blog';
    displayName: 'Cat\u00E9gorie Blog';
    description: 'Cat\u00E9gories pour les articles de blog';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::categorie-blog.categorie-blog', 'nom'>;
    description: Attribute.Text;
    couleur: Attribute.String & Attribute.DefaultTo<'#3B82F6'>;
    articles: Attribute.Relation<
      'api::categorie-blog.categorie-blog',
      'oneToMany',
      'api::article-blog.article-blog'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categorie-blog.categorie-blog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categorie-blog.categorie-blog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiChiffreCleChiffreCle extends Schema.CollectionType {
  collectionName: 'chiffres_cles';
  info: {
    singularName: 'chiffre-cle';
    pluralName: 'chiffres-cles';
    displayName: 'Chiffre Cl\u00E9';
    description: "Chiffres cl\u00E9s de l'\u00E9cole (statistiques)";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    valeur: Attribute.String & Attribute.Required;
    label: Attribute.String & Attribute.Required;
    icon: Attribute.String;
    ordre: Attribute.Integer & Attribute.DefaultTo<0>;
    page: Attribute.String & Attribute.DefaultTo<'pedagogie'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::chiffre-cle.chiffre-cle',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::chiffre-cle.chiffre-cle',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactinfosContactinfo extends Schema.CollectionType {
  collectionName: 'contact_infos';
  info: {
    singularName: 'contactinfo';
    pluralName: 'contactinfos';
    displayName: 'Contact Info';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contactinfos.contactinfo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contactinfos.contactinfo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEntrepriseModaliteEntrepriseModalite
  extends Schema.CollectionType {
  collectionName: 'entreprise_modalites';
  info: {
    singularName: 'entreprise-modalite';
    pluralName: 'entreprise-modalites';
    displayName: 'Entreprise Modalit\u00E9';
    description: 'Modalit\u00E9s de formation pour entreprises';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    type: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::entreprise-modalite.entreprise-modalite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::entreprise-modalite.entreprise-modalite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEntrepriseServiceEntrepriseService
  extends Schema.CollectionType {
  collectionName: 'entreprise_services';
  info: {
    singularName: 'entreprise-service';
    pluralName: 'entreprise-services';
    displayName: 'Entreprise Service';
    description: 'Services propos\u00E9s aux entreprises';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    icone: Attribute.String;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::entreprise-service.entreprise-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::entreprise-service.entreprise-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEtapeAdmissionEtapeAdmission extends Schema.CollectionType {
  collectionName: 'etape_admissions';
  info: {
    singularName: 'etape-admission';
    pluralName: 'etape-admissions';
    displayName: '\u00C9tape Admission';
    description: "\u00C9tapes du processus d'admission CMA";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    numero: Attribute.Integer & Attribute.Required;
    titre: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    details: Attribute.JSON;
    icone: Attribute.String;
    ordre: Attribute.Integer & Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::etape-admission.etape-admission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::etape-admission.etape-admission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFaqsFaq extends Schema.CollectionType {
  collectionName: 'faqs';
  info: {
    singularName: 'faq';
    pluralName: 'faqs';
    displayName: 'FAQ';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::faqs.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::faqs.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiFormateurFormateur extends Schema.CollectionType {
  collectionName: 'formateurs';
  info: {
    singularName: 'formateur';
    pluralName: 'formateurs';
    displayName: 'Formateur';
    description: 'Formateurs et intervenants';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String & Attribute.Required;
    prenom: Attribute.String;
    poste: Attribute.String & Attribute.Required;
    secteur: Attribute.Enumeration<
      ['direction', 'batiment', 'travaux-publics', 'architecture-energie']
    > &
      Attribute.DefaultTo<'batiment'>;
    specialites: Attribute.JSON;
    certifications: Attribute.JSON;
    experience: Attribute.String;
    description: Attribute.Text;
    photo: Attribute.Media<'images'>;
    biographie: Attribute.RichText;
    linkedin: Attribute.String;
    gender: Attribute.Enumeration<['male', 'female']> &
      Attribute.DefaultTo<'male'>;
    isDirector: Attribute.Boolean & Attribute.DefaultTo<false>;
    formations: Attribute.Relation<
      'api::formateur.formateur',
      'manyToMany',
      'api::formation.formation'
    >;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::formateur.formateur',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::formateur.formateur',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFormationFormation extends Schema.CollectionType {
  collectionName: 'formations';
  info: {
    singularName: 'formation';
    pluralName: 'formations';
    displayName: 'Formation';
    description: "Formations propos\u00E9es par l'\u00E9cole";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::formation.formation', 'title'>;
    level: Attribute.String & Attribute.Required;
    rncp: Attribute.String;
    rncpUrl: Attribute.String;
    shortDesc: Attribute.Text & Attribute.Required;
    fullDesc: Attribute.RichText;
    metierDesc: Attribute.RichText;
    objectifs: Attribute.JSON;
    programme: Attribute.JSON;
    competences2eAnnee: Attribute.JSON;
    debouches: Attribute.JSON;
    duree: Attribute.String;
    volumeHoraire: Attribute.String;
    repartition: Attribute.String;
    rythme: Attribute.String;
    modalite: Attribute.String;
    typeContrat: Attribute.String;
    effectif: Attribute.String;
    prerequis: Attribute.JSON;
    cout: Attribute.String;
    financement: Attribute.String;
    certificateur: Attribute.String;
    dateEnregistrement: Attribute.String;
    entreprisesPartenaires: Attribute.JSON;
    tauxReussite: Attribute.String;
    tauxInsertion: Attribute.String;
    conception: Attribute.String;
    evaluation: Attribute.JSON;
    modalitesEvaluation: Attribute.JSON;
    poursuites: Attribute.JSON;
    poursuiteEtudes: Attribute.JSON;
    publicCible: Attribute.String;
    contact: Attribute.JSON;
    category: Attribute.Relation<
      'api::formation.formation',
      'manyToOne',
      'api::formation-category.formation-category'
    >;
    image: Attribute.Media<'images'>;
    gallery: Attribute.Media<'images', true>;
    brochure: Attribute.Media<'files'>;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    isActive: Attribute.Boolean & Attribute.DefaultTo<true>;
    seoTitle: Attribute.String;
    seoDescription: Attribute.Text;
    seoKeywords: Attribute.JSON;
    pageUrl: Attribute.String & Attribute.DefaultTo<''>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::formation.formation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::formation.formation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFormationCategoryFormationCategory
  extends Schema.CollectionType {
  collectionName: 'formation_categories';
  info: {
    singularName: 'formation-category';
    pluralName: 'formation-categories';
    displayName: 'Formation Category';
    description: 'Cat\u00E9gories de formations (Alternance, Reconversion, VAE, etc.)';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::formation-category.formation-category', 'name'>;
    description: Attribute.Text;
    color: Attribute.String & Attribute.DefaultTo<'#3B82F6'>;
    icon: Attribute.String;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    formations: Attribute.Relation<
      'api::formation-category.formation-category',
      'oneToMany',
      'api::formation.formation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::formation-category.formation-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::formation-category.formation-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFormationThematiqueFormationThematique
  extends Schema.CollectionType {
  collectionName: 'formation_thematiques';
  info: {
    singularName: 'formation-thematique';
    pluralName: 'formation-thematiques';
    displayName: 'Formation Thematique (Entreprise)';
    description: 'Th\u00E9matiques de formations pour entreprises';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    duree: Attribute.String;
    niveau: Attribute.String;
    prix: Attribute.String;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::formation-thematique.formation-thematique',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::formation-thematique.formation-thematique',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGalleriesGallery extends Schema.CollectionType {
  collectionName: 'galleries';
  info: {
    singularName: 'gallery';
    pluralName: 'galleries';
    displayName: 'Gallery';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::galleries.gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::galleries.gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMainNavigationMainNavigation extends Schema.CollectionType {
  collectionName: 'main_navigations';
  info: {
    singularName: 'main-navigation';
    pluralName: 'main-navigations';
    displayName: 'Navigation Principale';
    description: '\u00C9l\u00E9ments de navigation du header';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    icon: Attribute.String;
    featured: Attribute.Boolean & Attribute.DefaultTo<true>;
    external: Attribute.Boolean & Attribute.DefaultTo<false>;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::main-navigation.main-navigation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::main-navigation.main-navigation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMethodePedagogiqueMethodePedagogique
  extends Schema.CollectionType {
  collectionName: 'methodes_pedagogiques';
  info: {
    singularName: 'methode-pedagogique';
    pluralName: 'methodes-pedagogiques';
    displayName: 'M\u00E9thode P\u00E9dagogique';
    description: "M\u00E9thodes p\u00E9dagogiques de l'\u00E9cole";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    icon: Attribute.String;
    couleur: Attribute.String &
      Attribute.DefaultTo<'from-blue-500 to-blue-600'>;
    ordre: Attribute.Integer & Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::methode-pedagogique.methode-pedagogique',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::methode-pedagogique.methode-pedagogique',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiModaliteModalite extends Schema.CollectionType {
  collectionName: 'modalites';
  info: {
    singularName: 'modalite';
    pluralName: 'modalites';
    displayName: 'Modalite';
    description: 'Modalites de formation';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    slug: Attribute.UID<'api::modalite.modalite', 'titre'>;
    icon: Attribute.String;
    couleur: Attribute.String;
    lien: Attribute.String;
    ordre: Attribute.Integer & Attribute.DefaultTo<0>;
    featured: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::modalite.modalite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::modalite.modalite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNavigationmenusNavigationmenu
  extends Schema.CollectionType {
  collectionName: 'navigation_menus';
  info: {
    singularName: 'navigationmenu';
    pluralName: 'navigationmenus';
    displayName: 'Navigation Menu';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::navigationmenus.navigationmenu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::navigationmenus.navigationmenu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOutilPedagogiqueOutilPedagogique
  extends Schema.CollectionType {
  collectionName: 'outils_pedagogiques';
  info: {
    singularName: 'outil-pedagogique';
    pluralName: 'outils-pedagogiques';
    displayName: 'Outil P\u00E9dagogique';
    description: 'Outils et technologies p\u00E9dagogiques';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    ordre: Attribute.Integer & Attribute.DefaultTo<0>;
    categorie: Attribute.String & Attribute.DefaultTo<'outil'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::outil-pedagogique.outil-pedagogique',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::outil-pedagogique.outil-pedagogique',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPagePage extends Schema.CollectionType {
  collectionName: 'pages';
  info: {
    singularName: 'page';
    pluralName: 'pages';
    displayName: 'Page';
    description: 'Pages dynamiques du site';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::page.page', 'title'> & Attribute.Required;
    content: Attribute.RichText;
    template: Attribute.Enumeration<
      ['default', 'formation', 'blog', 'contact', 'about']
    > &
      Attribute.DefaultTo<'default'>;
    sections: Attribute.DynamicZone<
      [
        'sections.hero-section',
        'sections.text-section',
        'sections.gallery-section',
        'sections.stats-section',
        'sections.testimonials-section',
        'sections.contact-section'
      ]
    >;
    seoTitle: Attribute.String;
    seoDescription: Attribute.Text;
    seoKeywords: Attribute.JSON;
    featuredImage: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPageAdmissionPageAdmission extends Schema.SingleType {
  collectionName: 'page_admissions';
  info: {
    singularName: 'page-admission';
    pluralName: 'page-admissions';
    displayName: 'Page Admission';
    description: "Configuration de la page d'admission";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<"Parcours d'admission CMA">;
    sousTitre: Attribute.String &
      Attribute.DefaultTo<'Comment int\u00E9grer CMA ?'>;
    introduction: Attribute.Text;
    heroImage: Attribute.Media<'images'>;
    contactPhone: Attribute.String & Attribute.DefaultTo<'01 89 70 60 52'>;
    contactEmail: Attribute.Email &
      Attribute.DefaultTo<'inscription.academy@cma-education.com'>;
    ctaTexte: Attribute.String &
      Attribute.DefaultTo<'D\u00E9poser ma candidature'>;
    ctaUrl: Attribute.String &
      Attribute.DefaultTo<'https://cma-education.ymag.cloud/index.php/preinscription/'>;
    pointCle1Titre: Attribute.String & Attribute.DefaultTo<'Sans concours'>;
    pointCle1Description: Attribute.String &
      Attribute.DefaultTo<'Admission sur entretien de motivation uniquement'>;
    pointCle2Titre: Attribute.String &
      Attribute.DefaultTo<"Gratuit pour l'alternant">;
    pointCle2Description: Attribute.String &
      Attribute.DefaultTo<"Aucun frais de scolarit\u00E9 ou d'inscription">;
    pointCle3Titre: Attribute.String &
      Attribute.DefaultTo<'R\u00E9ponse rapide'>;
    pointCle3Description: Attribute.String &
      Attribute.DefaultTo<"D\u00E9cision sous 48h apr\u00E8s l'entretien">;
    titreEtapes: Attribute.String &
      Attribute.DefaultTo<'Les \u00E9tapes de votre admission'>;
    descriptionEtapes: Attribute.Text &
      Attribute.DefaultTo<'Un processus simple et transparent pour rejoindre la Construction Management Academy'>;
    titreCTA: Attribute.String &
      Attribute.DefaultTo<'Pr\u00EAt \u00E0 rejoindre CMA ?'>;
    descriptionCTA: Attribute.Text &
      Attribute.DefaultTo<'Lancez votre candidature d\u00E8s maintenant et commencez votre parcours vers une carri\u00E8re dans le BTP'>;
    titreContact: Attribute.String &
      Attribute.DefaultTo<"Des questions sur l'admission ?">;
    descriptionContact: Attribute.Text &
      Attribute.DefaultTo<'Notre \u00E9quipe est \u00E0 votre disposition pour vous accompagner'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-admission.page-admission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-admission.page-admission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageEntreprisePageEntreprise extends Schema.SingleType {
  collectionName: 'page_entreprises';
  info: {
    singularName: 'page-entreprise';
    pluralName: 'page-entreprises';
    displayName: 'Page Entreprises';
    description: 'Contenu complet de la page Formations Entreprises - 100% modifiable';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heroTitre: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Formations BTP pour Entreprises'>;
    heroSousTitre: Attribute.String &
      Attribute.DefaultTo<'Formations sur mesure'>;
    heroDescription: Attribute.Text & Attribute.Required;
    heroImage: Attribute.Media<'images'>;
    heroBoutonPrincipal: Attribute.String &
      Attribute.DefaultTo<'Demander un devis'>;
    heroBoutonSecondaire: Attribute.String &
      Attribute.DefaultTo<'T\u00E9l\u00E9charger la brochure'>;
    sectionInvestirTitre: Attribute.String &
      Attribute.DefaultTo<'Pourquoi investir dans la formation de vos salari\u00E9s ?'>;
    sectionInvestirSousTitre: Attribute.String &
      Attribute.DefaultTo<'Les avantages'>;
    sectionThematiquesTitre: Attribute.String &
      Attribute.DefaultTo<'Nos th\u00E9matiques de formation pour les entreprises'>;
    sectionThematiquesSousTitre: Attribute.String &
      Attribute.DefaultTo<'Formations populaires'>;
    sectionThematiquesDescription: Attribute.Text &
      Attribute.DefaultTo<'Nous couvrons de nombreux domaines, avec des modules courts ou des parcours complets.'>;
    surMesureTitre: Attribute.String &
      Attribute.DefaultTo<'Formations sur mesure et adaptables'>;
    surMesureDescription: Attribute.Text &
      Attribute.DefaultTo<"Toutes nos formations pour les entreprises sont propos\u00E9es sur devis, afin de s'adapter parfaitement \u00E0 vos besoins sp\u00E9cifiques et vos objectifs.">;
    surMesureBouton: Attribute.String &
      Attribute.DefaultTo<'Demander un programme personnalis\u00E9'>;
    modalitesTitre: Attribute.String &
      Attribute.DefaultTo<'Modalit\u00E9s de formation'>;
    modalitesSousTitre: Attribute.String &
      Attribute.DefaultTo<'Flexibilit\u00E9 totale'>;
    modalitesDescription: Attribute.Text &
      Attribute.DefaultTo<'Nos formations sont propos\u00E9es dans toute la France selon vos pr\u00E9f\u00E9rences'>;
    tarifTitre: Attribute.String & Attribute.DefaultTo<'Tarification'>;
    tarifJour: Attribute.String &
      Attribute.DefaultTo<'\u00C0 partir de 700\u20AC HT'>;
    tarifJourLabel: Attribute.String &
      Attribute.DefaultTo<'Par jour et par stagiaire'>;
    tarifDescription: Attribute.Text &
      Attribute.DefaultTo<'Le co\u00FBt varie selon le format (inter/intra), la dur\u00E9e, le contenu personnalis\u00E9.'>;
    tarifIntra: Attribute.String &
      Attribute.DefaultTo<'Tarif formation en intra : nous consulter'>;
    financementTitre: Attribute.String & Attribute.DefaultTo<'Financement'>;
    financementDescription: Attribute.Text &
      Attribute.DefaultTo<'Nous vous accompagnons dans la mobilisation de vos droits \u00E0 la formation'>;
    financements: Attribute.JSON & Attribute.DefaultTo<[]>;
    ctaTitre: Attribute.String &
      Attribute.DefaultTo<'Pr\u00EAt \u00E0 former vos \u00E9quipes ?'>;
    ctaDescription: Attribute.Text &
      Attribute.DefaultTo<'Contactez-nous pour discuter de vos besoins et obtenir un devis personnalis\u00E9'>;
    ctaBoutonPrincipal: Attribute.String &
      Attribute.DefaultTo<'Nous contacter'>;
    ctaBoutonSecondaire: Attribute.String &
      Attribute.DefaultTo<'T\u00E9l\u00E9charger la brochure'>;
    telephone: Attribute.String & Attribute.DefaultTo<'01 89 70 60 52'>;
    email: Attribute.String &
      Attribute.DefaultTo<'contact.academy@cma-education.com'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-entreprise.page-entreprise',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-entreprise.page-entreprise',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPagePartenairesPagePartenaires extends Schema.SingleType {
  collectionName: 'page_partenaires';
  info: {
    singularName: 'page-partenaires';
    pluralName: 'pages-partenaires';
    displayName: 'Page Partenaires';
    description: 'Configuration de la page partenaires';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heroTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Nos Partenaires'>;
    heroSubtitle: Attribute.Text &
      Attribute.DefaultTo<'Des entreprises leaders du BTP qui nous font confiance pour former les professionnels de demain'>;
    heroImage: Attribute.Media<'images'>;
    sectionTitle: Attribute.String &
      Attribute.DefaultTo<'Ils nous font confiance'>;
    sectionSubtitle: Attribute.Text &
      Attribute.DefaultTo<'Nos partenaires accueillent nos alternants et participent activement \u00E0 leur formation'>;
    ctaTitle: Attribute.String & Attribute.DefaultTo<'Devenez partenaire'>;
    ctaDescription: Attribute.Text &
      Attribute.DefaultTo<"Rejoignez notre r\u00E9seau d'entreprises partenaires et accueillez nos alternants form\u00E9s aux m\u00E9tiers du BTP">;
    statEntreprises: Attribute.String & Attribute.DefaultTo<'12'>;
    statAlternants: Attribute.String & Attribute.DefaultTo<'150+'>;
    statInsertion: Attribute.String & Attribute.DefaultTo<'98%'>;
    statSatisfaction: Attribute.String & Attribute.DefaultTo<'95%'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-partenaires.page-partenaires',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-partenaires.page-partenaires',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageVaePageVae extends Schema.SingleType {
  collectionName: 'page_vaes';
  info: {
    singularName: 'page-vae';
    pluralName: 'page-vaes';
    displayName: 'Page VAE';
    description: 'Contenu complet de la page VAE BTP - 100% modifiable';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heroTitre: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Transformez votre exp\u00E9rience BTP en dipl\u00F4me'>;
    heroSousTitre: Attribute.String &
      Attribute.DefaultTo<"Validation des Acquis de l'Exp\u00E9rience">;
    heroDescription: Attribute.Text & Attribute.Required;
    heroImage: Attribute.Media<'images'>;
    heroBoutonPrincipal: Attribute.String &
      Attribute.DefaultTo<'D\u00E9marrer ma VAE'>;
    heroBoutonSecondaire: Attribute.String &
      Attribute.DefaultTo<'T\u00E9l\u00E9charger la brochure'>;
    statExperienceValeur: Attribute.String & Attribute.DefaultTo<'1 an'>;
    statExperienceLabel: Attribute.String & Attribute.DefaultTo<'minimum'>;
    statCertificationsValeur: Attribute.String &
      Attribute.DefaultTo<'5 titres'>;
    statCertificationsLabel: Attribute.String & Attribute.DefaultTo<'RNCP'>;
    statFinancementValeur: Attribute.String & Attribute.DefaultTo<'CPF'>;
    statFinancementLabel: Attribute.String &
      Attribute.DefaultTo<'\u00E9ligible'>;
    badgeTexte: Attribute.String &
      Attribute.DefaultTo<'\u2713 0 dipl\u00F4me requis'>;
    sectionTitre: Attribute.String &
      Attribute.DefaultTo<"Qu'est-ce que la VAE et \u00E0 qui s'adresse-t-elle ?">;
    sectionSousTitre: Attribute.String &
      Attribute.DefaultTo<'Comprendre la VAE'>;
    sectionDescription: Attribute.RichText;
    pointCle1Titre: Attribute.String &
      Attribute.DefaultTo<'Acc\u00E8s \u00E9largi'>;
    pointCle1Description: Attribute.String &
      Attribute.DefaultTo<'Sans dipl\u00F4me initial requis'>;
    pointCle1Icone: Attribute.String & Attribute.DefaultTo<'\uD83C\uDFAF'>;
    pointCle2Titre: Attribute.String & Attribute.DefaultTo<'Reconnaissance'>;
    pointCle2Description: Attribute.String &
      Attribute.DefaultTo<'Titre RNCP officiel'>;
    pointCle2Icone: Attribute.String & Attribute.DefaultTo<'\uD83C\uDFC6'>;
    pointCle3Titre: Attribute.String & Attribute.DefaultTo<'Flexible'>;
    pointCle3Description: Attribute.String &
      Attribute.DefaultTo<'\u00C0 votre rythme'>;
    pointCle3Icone: Attribute.String & Attribute.DefaultTo<'\u26A1'>;
    avantagesTitre: Attribute.String &
      Attribute.DefaultTo<'Avantages de la VAE BTP'>;
    certificationsTitre: Attribute.String &
      Attribute.DefaultTo<'Certifications VAE BTP accessibles \u00E0 la CMA'>;
    certificationsSousTitre: Attribute.String &
      Attribute.DefaultTo<'Nos certifications'>;
    certificationsDescription: Attribute.Text &
      Attribute.DefaultTo<'Toutes nos certifications RNCP sont accessibles via la VAE. Validez un titre complet ou un ou plusieurs CCP.'>;
    validationPartielleTexte: Attribute.Text &
      Attribute.DefaultTo<'En cas de validation partielle, vous disposez de 1 an pour compl\u00E9ter les blocs de comp\u00E9tences manquants.'>;
    formulesTitre: Attribute.String &
      Attribute.DefaultTo<"Choisissez votre formule d'accompagnement">;
    formulesSousTitre: Attribute.String & Attribute.DefaultTo<'Nos offres'>;
    formulesDescription: Attribute.Text &
      Attribute.DefaultTo<"Deux formules adapt\u00E9es \u00E0 vos besoins et votre niveau d'autonomie">;
    financementTexte: Attribute.String &
      Attribute.DefaultTo<'Financements possibles : CPF, employeurs, OPCO, autofinancement'>;
    financementSousTexte: Attribute.String &
      Attribute.DefaultTo<'Nous vous aidons \u00E0 constituer votre dossier de financement'>;
    faqTitre: Attribute.String &
      Attribute.DefaultTo<'Questions fr\u00E9quentes sur la VAE BTP'>;
    faqSousTitre: Attribute.String & Attribute.DefaultTo<'FAQ'>;
    ctaTitre: Attribute.String &
      Attribute.DefaultTo<'Pr\u00EAt \u00E0 valoriser votre exp\u00E9rience BTP ?'>;
    ctaDescription: Attribute.Text &
      Attribute.DefaultTo<'Transformez votre exp\u00E9rience terrain en dipl\u00F4me reconnu. Contactez-nous pour \u00E9tudier votre \u00E9ligibilit\u00E9 \u00E0 la VAE BTP.'>;
    ctaBoutonPrincipal: Attribute.String &
      Attribute.DefaultTo<'D\u00E9marrer ma VAE maintenant'>;
    ctaBoutonSecondaire: Attribute.String & Attribute.DefaultTo<'Nous appeler'>;
    ctaTelephone: Attribute.String & Attribute.DefaultTo<'+33123456789'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-vae.page-vae',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-vae.page-vae',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPartnerPartner extends Schema.CollectionType {
  collectionName: 'partners';
  info: {
    singularName: 'partner';
    pluralName: 'partners';
    displayName: 'Partner';
    description: "Partenaires de l'\u00E9cole";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String & Attribute.Required;
    logo: Attribute.Media<'images'>;
    description: Attribute.Text;
    siteWeb: Attribute.String;
    secteur: Attribute.String;
    ordre: Attribute.Integer & Attribute.DefaultTo<0>;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProcessusAdmissionProcessusAdmission
  extends Schema.CollectionType {
  collectionName: 'processus_admissions';
  info: {
    singularName: 'processus-admission';
    pluralName: 'processus-admissions';
    displayName: 'Processus Admission';
    description: "\u00C9tapes du processus d'admission";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    etape: Attribute.Integer & Attribute.Required;
    titre: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    detail: Attribute.Text;
    icone: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::processus-admission.processus-admission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::processus-admission.processus-admission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSeosettingsSeosetting extends Schema.CollectionType {
  collectionName: 'seo_settings';
  info: {
    singularName: 'seosetting';
    pluralName: 'seosettings';
    displayName: 'SEO Setting';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::seosettings.seosetting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::seosettings.seosetting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSiteSettingSiteSetting extends Schema.SingleType {
  collectionName: 'site_settings';
  info: {
    singularName: 'site-setting';
    pluralName: 'site-settings';
    displayName: 'Param\u00E8tres du Site';
    description: 'Configuration g\u00E9n\u00E9rale du site (logo, nom, contact, etc.)';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    siteName: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'CMA Education'>;
    siteDescription: Attribute.Text;
    logo: Attribute.Media<'images'>;
    favicon: Attribute.Media<'images'>;
    contactPhone: Attribute.String & Attribute.DefaultTo<'01 89 70 60 52'>;
    contactEmail: Attribute.Email &
      Attribute.DefaultTo<'contact.academy@cma-education.com'>;
    contactAddress: Attribute.Text;
    socialMedia: Attribute.JSON;
    headerButtonText: Attribute.String & Attribute.DefaultTo<'Candidater'>;
    headerButtonUrl: Attribute.String & Attribute.DefaultTo<'/contact'>;
    headerButtonVariant: Attribute.Enumeration<
      ['primary', 'secondary', 'neon', 'outline']
    > &
      Attribute.DefaultTo<'neon'>;
    seoTitle: Attribute.String;
    seoDescription: Attribute.Text;
    seoKeywords: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::site-setting.site-setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::site-setting.site-setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStatistiqueSiteStatistiqueSite
  extends Schema.CollectionType {
  collectionName: 'statistiques_site';
  info: {
    singularName: 'statistique-site';
    pluralName: 'statistiques-site';
    displayName: 'Statistique Site';
    description: 'Statistiques et chiffres cl\u00E9s du site';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cle: Attribute.String & Attribute.Required & Attribute.Unique;
    nombre: Attribute.Integer & Attribute.Required;
    label: Attribute.String & Attribute.Required;
    suffixe: Attribute.String;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::statistique-site.statistique-site',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::statistique-site.statistique-site',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTestimonialTestimonial extends Schema.CollectionType {
  collectionName: 'testimonials';
  info: {
    singularName: 'testimonial';
    pluralName: 'testimonials';
    displayName: 'Testimonial';
    description: "T\u00E9moignages d'\u00E9tudiants et dipl\u00F4m\u00E9s";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    position: Attribute.String & Attribute.Required;
    company: Attribute.String;
    content: Attribute.Text & Attribute.Required;
    rating: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 5;
        },
        number
      > &
      Attribute.DefaultTo<5>;
    photo: Attribute.Media<'images'>;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    formation: Attribute.Relation<
      'api::testimonial.testimonial',
      'manyToOne',
      'api::formation.formation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVaeAvantageVaeAvantage extends Schema.CollectionType {
  collectionName: 'vae_avantages';
  info: {
    singularName: 'vae-avantage';
    pluralName: 'vae-avantages';
    displayName: 'VAE Avantage';
    description: 'Avantages de la VAE BTP';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    texte: Attribute.String & Attribute.Required;
    icone: Attribute.String & Attribute.DefaultTo<'check'>;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vae-avantage.vae-avantage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vae-avantage.vae-avantage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVaeCertificationVaeCertification
  extends Schema.CollectionType {
  collectionName: 'vae_certifications';
  info: {
    singularName: 'vae-certification';
    pluralName: 'vae-certifications';
    displayName: 'VAE Certification';
    description: 'Certifications accessibles via la VAE';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    rncp: Attribute.String & Attribute.Required;
    rncpUrl: Attribute.String;
    niveau: Attribute.Enumeration<['niveau5', 'niveau6', 'niveau7']> &
      Attribute.Required &
      Attribute.DefaultTo<'niveau5'>;
    description: Attribute.Text;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vae-certification.vae-certification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vae-certification.vae-certification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVaeFaqVaeFaq extends Schema.CollectionType {
  collectionName: 'vae_faqs';
  info: {
    singularName: 'vae-faq';
    pluralName: 'vae-faqs';
    displayName: 'VAE FAQ';
    description: 'Questions fr\u00E9quentes sur la VAE BTP';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.String & Attribute.Required;
    reponse: Attribute.Text & Attribute.Required;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vae-faq.vae-faq',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vae-faq.vae-faq',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVaeFormuleVaeFormule extends Schema.CollectionType {
  collectionName: 'vae_formules';
  info: {
    singularName: 'vae-formule';
    pluralName: 'vae-formules';
    displayName: 'VAE Formule';
    description: "Formules de Validation des Acquis de l'Exp\u00E9rience";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    modalites: Attribute.String;
    services: Attribute.JSON;
    prix: Attribute.String & Attribute.Required;
    heures: Attribute.String;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vae-formule.vae-formule',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vae-formule.vae-formule',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiValeurEcoleValeurEcole extends Schema.CollectionType {
  collectionName: 'valeurs_ecole';
  info: {
    singularName: 'valeur-ecole';
    pluralName: 'valeurs-ecole';
    displayName: 'Valeur \u00C9cole';
    description: "Valeurs et principes de l'\u00E9cole";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    points: Attribute.JSON;
    icone: Attribute.String;
    ordre: Attribute.Integer & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::valeur-ecole.valeur-ecole',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::valeur-ecole.valeur-ecole',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::article-blog.article-blog': ApiArticleBlogArticleBlog;
      'api::categorie-blog.categorie-blog': ApiCategorieBlogCategorieBlog;
      'api::chiffre-cle.chiffre-cle': ApiChiffreCleChiffreCle;
      'api::contactinfos.contactinfo': ApiContactinfosContactinfo;
      'api::entreprise-modalite.entreprise-modalite': ApiEntrepriseModaliteEntrepriseModalite;
      'api::entreprise-service.entreprise-service': ApiEntrepriseServiceEntrepriseService;
      'api::etape-admission.etape-admission': ApiEtapeAdmissionEtapeAdmission;
      'api::faqs.faq': ApiFaqsFaq;
      'api::formateur.formateur': ApiFormateurFormateur;
      'api::formation.formation': ApiFormationFormation;
      'api::formation-category.formation-category': ApiFormationCategoryFormationCategory;
      'api::formation-thematique.formation-thematique': ApiFormationThematiqueFormationThematique;
      'api::galleries.gallery': ApiGalleriesGallery;
      'api::main-navigation.main-navigation': ApiMainNavigationMainNavigation;
      'api::methode-pedagogique.methode-pedagogique': ApiMethodePedagogiqueMethodePedagogique;
      'api::modalite.modalite': ApiModaliteModalite;
      'api::navigationmenus.navigationmenu': ApiNavigationmenusNavigationmenu;
      'api::outil-pedagogique.outil-pedagogique': ApiOutilPedagogiqueOutilPedagogique;
      'api::page.page': ApiPagePage;
      'api::page-admission.page-admission': ApiPageAdmissionPageAdmission;
      'api::page-entreprise.page-entreprise': ApiPageEntreprisePageEntreprise;
      'api::page-partenaires.page-partenaires': ApiPagePartenairesPagePartenaires;
      'api::page-vae.page-vae': ApiPageVaePageVae;
      'api::partner.partner': ApiPartnerPartner;
      'api::processus-admission.processus-admission': ApiProcessusAdmissionProcessusAdmission;
      'api::seosettings.seosetting': ApiSeosettingsSeosetting;
      'api::site-setting.site-setting': ApiSiteSettingSiteSetting;
      'api::statistique-site.statistique-site': ApiStatistiqueSiteStatistiqueSite;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
      'api::vae-avantage.vae-avantage': ApiVaeAvantageVaeAvantage;
      'api::vae-certification.vae-certification': ApiVaeCertificationVaeCertification;
      'api::vae-faq.vae-faq': ApiVaeFaqVaeFaq;
      'api::vae-formule.vae-formule': ApiVaeFormuleVaeFormule;
      'api::valeur-ecole.valeur-ecole': ApiValeurEcoleValeurEcole;
    }
  }
}
