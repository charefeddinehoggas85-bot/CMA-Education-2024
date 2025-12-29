export default (function (_a) {
    var env = _a.env;
    // Debug: Log environment variables (remove in production)
    console.log('DATABASE_URL exists:', !!env('DATABASE_URL'));
    console.log('NODE_ENV:', env('NODE_ENV'));
    // Configuration pour Railway/Production avec DATABASE_URL
    var databaseUrl = env('DATABASE_URL');
    if (databaseUrl) {
        console.log('Using DATABASE_URL configuration');
        return {
            connection: {
                client: 'postgres',
                connection: {
                    connectionString: databaseUrl,
                    ssl: {
                        rejectUnauthorized: false
                    }
                },
                pool: {
                    min: 2,
                    max: 10,
                },
                acquireConnectionTimeout: 60000,
                debug: false,
            },
        };
    }
    // Configuration locale pour développement
    console.log('Using local database configuration');
    return {
        connection: {
            client: 'postgres',
            connection: {
                host: env('DATABASE_HOST', '127.0.0.1'),
                port: env.int('DATABASE_PORT', 5432),
                database: env('DATABASE_NAME', 'cma_cms'),
                user: env('DATABASE_USERNAME', 'postgres'),
                password: env('DATABASE_PASSWORD', 'root'),
                ssl: false,
            },
            pool: {
                min: 2,
                max: 10,
            },
            acquireConnectionTimeout: 60000,
            debug: false,
        },
    };
});
