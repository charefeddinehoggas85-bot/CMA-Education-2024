export default function sitemap() {
    var baseUrl = 'https://cma-education.com';
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: "".concat(baseUrl, "/formations"),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: "".concat(baseUrl, "/formations/conducteur-travaux-batiment-alternance"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: "".concat(baseUrl, "/formations/charge-affaires-batiment-alternance"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: "".concat(baseUrl, "/formations/reconversion-btp"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: "".concat(baseUrl, "/formations/reconversion-btp/conducteur-travaux"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: "".concat(baseUrl, "/formations/reconversion-btp/charge-affaires"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: "".concat(baseUrl, "/formations/conducteur-travaux-publics-alternance"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: "".concat(baseUrl, "/formations/responsable-travaux-bim-alternance"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: "".concat(baseUrl, "/formations/chef-projet-btp-alternance"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: "".concat(baseUrl, "/formations/vae-btp"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: "".concat(baseUrl, "/formations/vae-btp/conducteur-travaux"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: "".concat(baseUrl, "/formations/vae-btp/charge-affaires"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: "".concat(baseUrl, "/about"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: "".concat(baseUrl, "/contact"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: "".concat(baseUrl, "/partenaires"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: "".concat(baseUrl, "/pedagogie"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: "".concat(baseUrl, "/formations/entreprises"),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: "".concat(baseUrl, "/confidentialite"),
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        }
    ];
}
