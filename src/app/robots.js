export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/_next/',
                '/admin/',
                '*.json',
                '/private/'
            ],
        },
        sitemap: 'https://cma-education.com/sitemap.xml',
    };
}
