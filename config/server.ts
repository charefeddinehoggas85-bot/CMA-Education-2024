export default ({ env }: { env: any }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // Désactiver les analytics Strapi pour éviter les erreurs ERR_BLOCKED_BY_CLIENT
  telemetry: {
    enabled: false,
  },
});
