'use client';
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
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { Calendar, ArrowRight, Search, Filter, TrendingUp, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { getArticlesBlog, getArticlesBlogFeatured, getCategoriesBlog, getImageURL } from '@/lib/strapi';
// Données par défaut
var defaultPageData = {
    heroTitle: 'Blog Construction Management Academy',
    heroSubtitle: 'Découvrez nos derniers articles sur les formations BTP, les tendances du secteur et les conseils de nos experts',
    heroImage: '/images/blog-hero.jpg',
    sectionTitle: 'Nos derniers articles',
    sectionSubtitle: 'Restez informé des actualités du BTP et des conseils pour votre carrière'
};
var defaultArticles = [
    {
        id: 1,
        titre: 'Les tendances du BTP en 2024',
        slug: 'tendances-btp-2024',
        resume: 'Découvrez les principales tendances qui façonnent le secteur du BTP cette année',
        datePublication: new Date().toISOString(),
        auteur: 'Équipe Construction Management Academy',
        imagePrincipale: '/images/blog/tendances-btp.jpg',
        featured: true
    }
];
export default function BlogPage() {
    var _a = useState(defaultArticles), articles = _a[0], setArticles = _a[1];
    var _b = useState([]), categories = _b[0], setCategories = _b[1];
    var _c = useState(defaultPageData), pageData = _c[0], setPageData = _c[1];
    var _d = useState(null), selectedCategory = _d[0], setSelectedCategory = _d[1];
    var _e = useState(''), searchTerm = _e[0], setSearchTerm = _e[1];
    var _f = useState(true), isLoading = _f[0], setIsLoading = _f[1];
    useEffect(function () {
        function loadData() {
            return __awaiter(this, void 0, void 0, function () {
                var formattedArticles, articlesData, featuredData, formattedFeatured_1, allArticles, categoriesData, formattedCategories, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, 5, 6]);
                            setIsLoading(true);
                            formattedArticles = [];
                            return [4 /*yield*/, getArticlesBlog()];
                        case 1:
                            articlesData = _a.sent();
                            if (articlesData && Array.isArray(articlesData) && articlesData.length > 0) {
                                formattedArticles = articlesData.map(function (a) { return ({
                                    id: a.id,
                                    titre: a.titre || 'Sans titre',
                                    slug: a.slug || "article-".concat(a.id),
                                    resume: a.extrait || a.resume || a.description || '',
                                    contenu: a.contenu || '',
                                    datePublication: a.datePublication || new Date().toISOString(),
                                    auteur: a.auteur || 'Équipe Construction Management Academy',
                                    imagePrincipale: getImageURL(a.imageData, '/images/blog/default.jpg'),
                                    categorie: a.categorie,
                                    featured: a.featured || false
                                }); });
                                setArticles(formattedArticles);
                            }
                            return [4 /*yield*/, getArticlesBlogFeatured()];
                        case 2:
                            featuredData = _a.sent();
                            if (featuredData && Array.isArray(featuredData) && featuredData.length > 0) {
                                formattedFeatured_1 = featuredData.map(function (a) { return ({
                                    id: a.id,
                                    titre: a.titre || 'Sans titre',
                                    slug: a.slug || "article-".concat(a.id),
                                    resume: a.extrait || a.resume || a.description || '',
                                    contenu: a.contenu || '',
                                    datePublication: a.datePublication || new Date().toISOString(),
                                    auteur: a.auteur || 'Équipe Construction Management Academy',
                                    imagePrincipale: getImageURL(a.imageData, '/images/blog/default.jpg'),
                                    categorie: a.categorie,
                                    featured: true
                                }); });
                                allArticles = formattedArticles.map(function (a) { return (__assign(__assign({}, a), { featured: formattedFeatured_1.some(function (f) { return f.id === a.id; }) })); });
                                setArticles(allArticles);
                            }
                            return [4 /*yield*/, getCategoriesBlog()];
                        case 3:
                            categoriesData = _a.sent();
                            if (categoriesData && Array.isArray(categoriesData)) {
                                formattedCategories = categoriesData.map(function (c) { return ({
                                    id: c.id,
                                    nom: c.nom || 'Sans nom',
                                    slug: c.slug || "categorie-".concat(c.id),
                                    description: c.description || ''
                                }); });
                                setCategories(formattedCategories);
                            }
                            return [3 /*break*/, 6];
                        case 4:
                            error_1 = _a.sent();
                            console.error('Erreur chargement données blog:', error_1);
                            return [3 /*break*/, 6];
                        case 5:
                            setIsLoading(false);
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        loadData();
    }, []);
    // Filtrer les articles
    var filteredArticles = articles.filter(function (article) {
        var _a, _b;
        var matchesSearch = article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.resume.toLowerCase().includes(searchTerm.toLowerCase());
        var matchesCategory = !selectedCategory ||
            ((_a = article.categorie) === null || _a === void 0 ? void 0 : _a.slug) === selectedCategory ||
            ((_b = article.categorie) === null || _b === void 0 ? void 0 : _b.id) === parseInt(selectedCategory);
        return matchesSearch && matchesCategory;
    });
    // Articles en vedette
    var featuredArticles = filteredArticles.filter(function (a) { return a.featured; }).slice(0, 3);
    var regularArticles = filteredArticles.filter(function (a) { return !a.featured; });
    var formatDate = function (dateString) {
        try {
            var date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        catch (_a) {
            return dateString;
        }
    };
    return (<PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 min-h-[550px] text-white overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0" style={{
            backgroundImage: "url('".concat(pageData.heroImage, "')"),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
        </div>
        
        <div className="absolute inset-0 opacity-20 z-10">
          <div className="absolute top-20 left-20 w-72 h-72 border border-primary-yellow/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-primary-yellow/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-yellow/20 backdrop-blur-sm text-primary-yellow px-4 py-2 rounded-full mb-6 border border-primary-yellow/30">
              <BookOpen className="w-4 h-4"/>
              <span className="text-sm font-bold">Ressources & Actualités</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-montserrat font-black mb-6 leading-tight" suppressHydrationWarning>
              {pageData.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed">
              {pageData.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Barre de recherche et filtres */}
      <section className="sticky top-0 z-40 py-6 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-4">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
              <input type="text" placeholder="Rechercher un article..." value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"/>
            </div>

            {/* Filtres par catégorie */}
            {categories.length > 0 && (<div className="flex flex-wrap gap-2 items-center overflow-x-auto pb-2">
                <Filter className="w-5 h-5 text-gray-600 flex-shrink-0"/>
                <button onClick={function () { return setSelectedCategory(null); }} className={"px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap flex-shrink-0 ".concat(selectedCategory === null
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}>
                  Tous
                </button>
                {categories.map(function (cat) { return (<button key={cat.id} onClick={function () { return setSelectedCategory(cat.slug); }} className={"px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap flex-shrink-0 ".concat(selectedCategory === cat.slug
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}>
                    {cat.nom}
                  </button>); })}
              </div>)}
          </motion.div>
        </div>
      </section>

      {/* Articles en vedette */}
      {featuredArticles.length > 0 && (<section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-primary-yellow"/>
                <h2 className="text-3xl font-montserrat font-bold text-slate-900">
                  Articles en vedette
                </h2>
              </div>
              <div className="h-1 w-20 bg-gradient-to-r from-primary-yellow to-transparent rounded-full"></div>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.1
                    }
                }
            }}>
              {featuredArticles.map(function (article) { return (<motion.div key={article.id} variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            type: "spring",
                            stiffness: 100,
                            damping: 12
                        }
                    }
                }} whileHover={{ y: -12 }} className="group">
                  <Link href={"/blog/".concat(article.slug)}>
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img src={article.imagePrincipale} alt={article.titre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={function (e) {
                    var target = e.target;
                    target.src = '/images/blog/default.jpg';
                }}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 bg-primary-yellow text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          En vedette
                        </div>
                      </div>

                      {/* Contenu */}
                      <div className="p-7 flex flex-col flex-grow">
                        {article.categorie && (<span className="text-primary-yellow text-xs font-bold mb-3 uppercase tracking-wider">
                            {article.categorie.nom || 'Catégorie'}
                          </span>)}
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-yellow transition-colors line-clamp-2 leading-tight">
                          {article.titre}
                        </h3>

                        <p className="text-gray-600 mb-5 flex-grow line-clamp-3 text-sm leading-relaxed">
                          {article.resume}
                        </p>

                        {/* Métadonnées */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-5 border-t border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4"/>
                              <span>{formatDate(article.datePublication)}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform"/>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>); })}
            </motion.div>
          </div>
        </section>)}

      {/* Tous les articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-3xl font-montserrat font-bold text-slate-900 mb-4">
              {pageData.sectionTitle}
            </h2>
            <p className="text-gray-600 text-lg">
              {pageData.sectionSubtitle}
            </p>
          </motion.div>

          {isLoading ? (<div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            </div>) : regularArticles.length === 0 ? (<div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4"/>
              <p className="text-gray-600 text-lg">Aucun article trouvé</p>
            </div>) : (<motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.1
                    }
                }
            }}>
              {regularArticles.map(function (article) { return (<motion.div key={article.id} variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            type: "spring",
                            stiffness: 100,
                            damping: 12
                        }
                    }
                }} whileHover={{ y: -8 }} className="group">
                  <Link href={"/blog/".concat(article.slug)}>
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img src={article.imagePrincipale} alt={article.titre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={function (e) {
                    var target = e.target;
                    target.src = '/images/blog/default.jpg';
                }}/>
                      </div>

                      {/* Contenu */}
                      <div className="p-6 flex flex-col flex-grow">
                        {article.categorie && (<span className="text-primary-yellow text-xs font-bold mb-2 uppercase tracking-wider">
                            {article.categorie.nom || 'Catégorie'}
                          </span>)}
                        
                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-yellow transition-colors line-clamp-2">
                          {article.titre}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                          {article.resume}
                        </p>

                        {/* Métadonnées */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3"/>
                            <span>{formatDate(article.datePublication)}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>); })}
            </motion.div>)}
        </div>
      </section>
    </PageLayout>);
}
