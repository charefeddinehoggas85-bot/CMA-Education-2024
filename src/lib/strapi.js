var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
var STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
export function getStrapiURL(path) {
    if (path === void 0) { path = ''; }
    return "".concat(STRAPI_URL).concat(path);
}
// Helper pour construire l'URL complète d'un média Strapi
export function getStrapiMediaURL(media) {
    var _a;
    if (!media)
        return null;
    // Si c'est un objet avec data (format Strapi v4)
    if (media.data) {
        var url = (_a = media.data.attributes) === null || _a === void 0 ? void 0 : _a.url;
        if (url) {
            // Si l'URL est relative, ajouter le domaine Strapi
            return url.startsWith('http') ? url : "".concat(STRAPI_URL).concat(url);
        }
        return null;
    }
    // Si c'est directement un objet avec url
    if (media.url) {
        return media.url.startsWith('http') ? media.url : "".concat(STRAPI_URL).concat(media.url);
    }
    return null;
}
// Helper pour obtenir l'URL d'une image avec fallback
export function getImageURL(strapiMedia, fallbackPath) {
    // Validation stricte : ne jamais retourner un objet
    var validateURL = function (url) {
        if (typeof url === 'string' && url.length > 0 && !url.includes('[object')) {
            return url;
        }
        return null;
    };
    // Priorité 1: Image Strapi valide
    var strapiURL = getStrapiMediaURL(strapiMedia);
    var validStrapiURL = validateURL(strapiURL);
    if (validStrapiURL)
        return validStrapiURL;
    // Priorité 2: Fallback path valide (doit être une string)
    if (fallbackPath && typeof fallbackPath === 'string') {
        var validFallback = validateURL(fallbackPath);
        if (validFallback)
            return validFallback;
    }
    // Priorité 3: Image par défaut
    return '/images/formations/formations-hero.jpg';
}
export function fetchAPI(path, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var defaultOptions, revalidateSeconds, mergedOptions, requestUrl, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defaultOptions = {
                        headers: __assign({ 'Content-Type': 'application/json' }, (STRAPI_API_TOKEN && {
                            Authorization: "Bearer ".concat(STRAPI_API_TOKEN),
                        })),
                    };
                    // Only add Next.js specific options on the server-side
                    if (typeof window === 'undefined') {
                        revalidateSeconds = process.env.NODE_ENV === 'development' ? 5 : 60;
                        defaultOptions.next = { revalidate: revalidateSeconds };
                    }
                    mergedOptions = __assign(__assign(__assign({}, defaultOptions), options), { headers: __assign(__assign({}, defaultOptions.headers), options.headers) });
                    requestUrl = getStrapiURL(path);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(requestUrl, mergedOptions)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error("Strapi API Error: ".concat(response.status, " ").concat(response.statusText));
                        return [2 /*return*/, { data: null, error: response.status }];
                    }
                    return [4 /*yield*/, response.json()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_1 = _a.sent();
                    console.error('Strapi API Error:', error_1);
                    return [2 /*return*/, { data: null, error: error_1 }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Fonction pour forcer le revalidate (développement uniquement)
export function revalidateFormations() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(process.env.NODE_ENV === 'development')) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(getStrapiURL('/api/formations?populate=*&sort=ordre:asc'), {
                            headers: __assign({ 'Content-Type': 'application/json' }, (STRAPI_API_TOKEN && {
                                Authorization: "Bearer ".concat(STRAPI_API_TOKEN),
                            })),
                            cache: 'no-store' // Force pas de cache
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    console.log('✅ Cache formations revalidé');
                    return [4 /*yield*/, response.json()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error('Erreur revalidation:', error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, null];
            }
        });
    });
}
// Helper pour transformer les données Strapi
export function transformStrapiData(item) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (!item)
        return null;
    var transformed = __assign({ id: item.id }, item.attributes);
    // Mapper les champs spécifiques aux formations pour compatibilité
    if ((_a = item.attributes) === null || _a === void 0 ? void 0 : _a.shortDesc) {
        transformed.shortDescription = item.attributes.shortDesc;
    }
    if ((_b = item.attributes) === null || _b === void 0 ? void 0 : _b.fullDesc) {
        transformed.fullDescription = item.attributes.fullDesc;
    }
    // Mapper les relations de catégorie pour les formations
    if ((_d = (_c = item.attributes) === null || _c === void 0 ? void 0 : _c.category) === null || _d === void 0 ? void 0 : _d.data) {
        transformed.category = __assign({ id: item.attributes.category.data.id }, item.attributes.category.data.attributes);
    }
    // Ajouter les données d'image si présentes
    if ((_f = (_e = item.attributes) === null || _e === void 0 ? void 0 : _e.image) === null || _f === void 0 ? void 0 : _f.data) {
        transformed.imageData = item.attributes.image;
    }
    // Ajouter les données de logo si présentes
    if ((_h = (_g = item.attributes) === null || _g === void 0 ? void 0 : _g.logo) === null || _h === void 0 ? void 0 : _h.data) {
        transformed.logoData = item.attributes.logo;
    }
    // Ajouter les données de favicon si présentes
    if ((_k = (_j = item.attributes) === null || _j === void 0 ? void 0 : _j.favicon) === null || _k === void 0 ? void 0 : _k.data) {
        transformed.faviconData = item.attributes.favicon;
    }
    // Ajouter les données de heroImage si présentes (pour pages)
    if ((_m = (_l = item.attributes) === null || _l === void 0 ? void 0 : _l.heroImage) === null || _m === void 0 ? void 0 : _m.data) {
        transformed.heroImage = item.attributes.heroImage;
    }
    return transformed;
}
export function transformStrapiArray(data) {
    if (!data || !Array.isArray(data))
        return [];
    return data.map(function (item) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var transformed = __assign({ id: item.id }, item.attributes);
        // Mapper les champs spécifiques aux formations pour compatibilité
        if ((_a = item.attributes) === null || _a === void 0 ? void 0 : _a.shortDesc) {
            transformed.shortDescription = item.attributes.shortDesc;
        }
        if ((_b = item.attributes) === null || _b === void 0 ? void 0 : _b.fullDesc) {
            transformed.fullDescription = item.attributes.fullDesc;
        }
        // Mapper les relations de catégorie pour les formations
        if ((_d = (_c = item.attributes) === null || _c === void 0 ? void 0 : _c.category) === null || _d === void 0 ? void 0 : _d.data) {
            transformed.category = __assign({ id: item.attributes.category.data.id }, item.attributes.category.data.attributes);
        }
        // Ajouter les données d'image si présentes
        if ((_f = (_e = item.attributes) === null || _e === void 0 ? void 0 : _e.image) === null || _f === void 0 ? void 0 : _f.data) {
            transformed.imageData = item.attributes.image;
        }
        // Ajouter les données de logo si présentes (pour partenaires)
        if ((_h = (_g = item.attributes) === null || _g === void 0 ? void 0 : _g.logo) === null || _h === void 0 ? void 0 : _h.data) {
            transformed.logoData = item.attributes.logo;
        }
        // Ajouter les données de photo si présentes (pour témoignages)
        if ((_k = (_j = item.attributes) === null || _j === void 0 ? void 0 : _j.photo) === null || _k === void 0 ? void 0 : _k.data) {
            transformed.photoData = item.attributes.photo;
        }
        // Ajouter les données d'image principale si présentes (pour articles)
        if ((_m = (_l = item.attributes) === null || _l === void 0 ? void 0 : _l.imagePrincipale) === null || _m === void 0 ? void 0 : _m.data) {
            transformed.imagePrincipaleData = item.attributes.imagePrincipale;
        }
        return transformed;
    });
}
// Formations
export function getFormations() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/formations?populate=*&sort=ordre:asc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getFormation(slug) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var data, transformed;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, fetchAPI("/api/formations?filters[slug][$eq]=".concat(slug, "&populate=brochure,image,category"))];
                case 1:
                    data = _f.sent();
                    transformed = transformStrapiData((_a = data.data) === null || _a === void 0 ? void 0 : _a[0]);
                    // Mapper explicitement les données de brochure si présentes
                    if (transformed && ((_e = (_d = (_c = (_b = data.data) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.attributes) === null || _d === void 0 ? void 0 : _d.brochure) === null || _e === void 0 ? void 0 : _e.data)) {
                        transformed.brochure = data.data[0].attributes.brochure;
                    }
                    return [2 /*return*/, transformed];
            }
        });
    });
}
export function getFormationsByCategory(categorySlug) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI("/api/formations?filters[category][slug][$eq]=".concat(categorySlug, "&populate=*&sort=ordre:asc"))];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getFormationCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/formation-categories?populate=*&sort=ordre:asc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Articles
export function getArticles() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/articles?populate=*&sort=publishedAt:desc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getArticle(slug) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetchAPI("/api/articles?filters[slug][$eq]=".concat(slug, "&populate=*"))];
                case 1:
                    data = _b.sent();
                    return [2 /*return*/, transformStrapiData((_a = data.data) === null || _a === void 0 ? void 0 : _a[0])];
            }
        });
    });
}
// Pages
export function getPages() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/pages?populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getPage(slug) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetchAPI("/api/pages?filters[slug][$eq]=".concat(slug, "&populate=*"))];
                case 1:
                    data = _b.sent();
                    return [2 /*return*/, transformStrapiData((_a = data.data) === null || _a === void 0 ? void 0 : _a[0])];
            }
        });
    });
}
// Partners
export function getPartners() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/partners?populate=*&sort=ordre:asc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getPartnersFeatured() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/partners?filters[featured][$eq]=true&populate=*&sort=ordre:asc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Testimonials
export function getTestimonials() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/testimonials?populate=*&sort=ordre:asc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getTestimonialsFeatured() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/testimonials?filters[featured][$eq]=true&populate=*&sort=ordre:asc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Site Settings
export function getSiteSettings() {
    return __awaiter(this, void 0, void 0, function () {
        var data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchAPI('/api/site-setting?populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiData(data.data)];
                case 2:
                    error_3 = _a.sent();
                    console.warn('⚠️ Site Settings not available in Strapi, using defaults');
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Formations VRD
export function getFormationsVRD() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/formations?filters[category][slug][$eq]=vrd&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// VAE
export function getVAEFormules() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/vae-formules?sort=ordre:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getVAECertifications() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/vae-certifications?sort=ordre:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getVAECertificationsByNiveau(niveau) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI("/api/vae-certifications?filters[niveau][$eq]=".concat(niveau, "&sort=ordre:asc&populate=*"))];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Entreprises
export function getEntrepriseServices() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/entreprise-services?sort=ordre:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getFormationThematiques() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/formation-thematiques?sort=ordre:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Site
export function getValeursEcole() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/valeurs-ecole?sort=ordre:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getStatistiquesSite() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/statistiques-site?sort=ordre:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getProcessusAdmission() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/processus-admissions?sort=etape:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Blog
export function getCategoriesBlog() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/categories-blog?populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getArticlesBlog() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/articles-blog?populate=*&sort=datePublication:desc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getArticleBlog(slug) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetchAPI("/api/articles-blog?filters[slug][$eq]=".concat(slug, "&populate=*"))];
                case 1:
                    data = _b.sent();
                    return [2 /*return*/, transformStrapiData((_a = data.data) === null || _a === void 0 ? void 0 : _a[0])];
            }
        });
    });
}
export function getArticlesBlogFeatured() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/articles-blog?filters[featured][$eq]=true&populate=*&sort=datePublication:desc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getArticlesBlogByCategory(categorySlug) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI("/api/articles-blog?filters[categorie][slug][$eq]=".concat(categorySlug, "&populate=*&sort=datePublication:desc"))];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Modalités de formation
export function getModalites() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/modalites?populate=*&sort=ordre:asc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Formateurs
export function getFormateurs() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/formateurs?populate=*&sort=ordre:asc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
export function getFormateur(id) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI("/api/formateurs/".concat(id, "?populate=*"))];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiData(data.data)];
            }
        });
    });
}
// Navigation principale (retourne les données statiques par défaut)
export function getMainNavigation() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Navigation statique - peut être étendue pour Strapi si nécessaire
            return [2 /*return*/, [
                    { id: 1, label: 'Accueil', url: '/', ordre: 1, featured: true, external: false },
                    { id: 2, label: 'À propos', url: '/about', ordre: 2, featured: true, external: false },
                    { id: 3, label: 'Pédagogie', url: '/pedagogie', ordre: 3, featured: true, external: false },
                    { id: 4, label: 'Admission', url: '/admission', ordre: 4, featured: true, external: false },
                    { id: 5, label: 'Partenaires', url: '/partenaires', ordre: 5, featured: true, external: false }
                ]];
        });
    });
}
// Contact Info (retourne les données statiques par défaut)
export function getContactInfo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Retourner directement les données statiques sans appeler getSiteSettings
            // qui génère une erreur 404 si le content-type n'existe pas
            return [2 /*return*/, {
                    id: 1,
                    phone: '01 89 70 60 52',
                    email: 'contact.academy@construction-management-academy.fr',
                    address: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
                    emailInscription: 'inscription.academy@construction-management-academy.fr',
                    horaires: 'Lundi - Vendredi : 9h00 - 18h00'
                }];
        });
    });
}
// Galleries par page (retourne des données statiques pour l'instant)
export function getGalleriesByPage(pageSlug) {
    return __awaiter(this, void 0, void 0, function () {
        var galleries;
        return __generator(this, function (_a) {
            galleries = {
                'about': [
                    { id: 1, titre: 'Équipe', images: [], description: 'Notre équipe pédagogique' }
                ]
            };
            return [2 /*return*/, galleries[pageSlug] || []];
        });
    });
}
// Gallery functions
export function getGallery(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Retourne une galerie vide par défaut
            return [2 /*return*/, { id: parseInt(id), titre: 'Galerie', images: [], description: '', slug: id, ordre: 1, featured: false }];
        });
    });
}
export function getGalleries() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Retourne un tableau vide par défaut
            return [2 /*return*/, []];
        });
    });
}
// Pédagogie - Méthodes pédagogiques
export function getMethodesPedagogiques() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/methodes-pedagogiques?populate=*&sort=ordre:asc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Pédagogie - Chiffres clés
export function getChiffresCles(page) {
    return __awaiter(this, void 0, void 0, function () {
        var filter, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filter = page ? "&filters[page][$eq]=".concat(page) : '';
                    return [4 /*yield*/, fetchAPI("/api/chiffres-cles?populate=*&sort=ordre:asc".concat(filter))];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Pédagogie - Outils pédagogiques
export function getOutilsPedagogiques() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/outils-pedagogiques?populate=*&sort=ordre:asc')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// VAE - Avantages
export function getVAEAvantages() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/vae-avantages?sort=ordre:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// VAE - FAQ
export function getVAEFaqs() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/vae-faqs?sort=ordre:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Page VAE (singleton)
export function getPageVAE() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/page-vae?populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiData(data.data)];
            }
        });
    });
}
// Page Entreprises (singleton)
export function getPageEntreprise() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/page-entreprise?populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiData(data.data)];
            }
        });
    });
}
// Entreprises - Modalités
export function getEntrepriseModalites() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/entreprise-modalites?sort=ordre:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Admission - Étapes
export function getEtapesAdmission() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/etape-admissions?sort=ordre:asc&populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiArray(data.data || [])];
            }
        });
    });
}
// Page Admission (singleton)
export function getPageAdmission() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var data, transformed;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/page-admission?populate=*')];
                case 1:
                    data = _d.sent();
                    transformed = transformStrapiData(data.data);
                    // Mapper explicitement heroImage si présent
                    if (transformed && ((_c = (_b = (_a = data.data) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.heroImage) === null || _c === void 0 ? void 0 : _c.data)) {
                        transformed.heroImageData = data.data.attributes.heroImage;
                    }
                    return [2 /*return*/, transformed];
            }
        });
    });
}
// Page Partenaires (singleton)
export function getPagePartenaires() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAPI('/api/page-partenaires?populate=*')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, transformStrapiData(data.data)];
            }
        });
    });
}
