// Helpers pour convertir les données Strapi vers le format existant
export function strapiFormationToLocal(strapiFormation) {
    var _a, _b, _c, _d, _e;
    var attributes = strapiFormation.attributes;
    return {
        id: attributes.slug,
        title: attributes.title,
        level: attributes.level,
        rncp: attributes.rncp || '',
        shortDesc: attributes.shortDescription,
        fullDesc: attributes.fullDescription,
        objectifs: attributes.objectives || [],
        programme: attributes.program || [],
        debouches: attributes.debouches || [],
        duree: attributes.duration || '',
        volumeHoraire: attributes.volumeHoraire || '',
        rythme: attributes.rythme || '',
        modalite: attributes.modalite || '',
        typeContrat: attributes.typeContrat || '',
        effectif: attributes.effectif || '',
        prerequis: attributes.prerequis || [],
        cout: attributes.cout || '',
        certificateur: attributes.certificateur || '',
        dateEnregistrement: attributes.dateEnregistrement || '',
        tauxReussite: attributes.tauxReussite || '',
        tauxInsertion: attributes.tauxInsertion || '',
        isActive: attributes.isActive,
        image: ((_b = (_a = attributes.image) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes.url) || '',
        gallery: ((_c = attributes.gallery) === null || _c === void 0 ? void 0 : _c.data.map(function (img) { return img.attributes.url; })) || [],
        brochure: ((_e = (_d = attributes.brochure) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.attributes.url) || ''
    };
}
export function strapiArticleToLocal(strapiArticle) {
    var _a, _b, _c, _d;
    var attributes = strapiArticle.attributes;
    return {
        id: strapiArticle.id,
        title: attributes.title,
        slug: attributes.slug,
        excerpt: attributes.excerpt,
        content: attributes.content,
        author: attributes.author,
        date: new Date(attributes.publishedAt || attributes.createdAt).toLocaleDateString('fr-FR'),
        readTime: "".concat(attributes.readTime, " min"),
        image: ((_b = (_a = attributes.featuredImage) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes.url) || '',
        featured: attributes.isFeatured,
        tags: attributes.tags || [],
        category: ((_d = (_c = attributes.category) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.attributes.name) || 'Non classé'
    };
}
