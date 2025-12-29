export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/blog/',
            disallow: '/blog/draft/',
        },
        sitemap: 'https://cma-education.com/blog/sitemap.xml',
    };
}
