'use client';
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
import { Calendar, User, ArrowLeft, Share2, Clock, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getArticleBlog, getArticlesBlog, getImageURL } from '@/lib/strapi';
export default function ArticlePage(_a) {
    var params = _a.params;
    var _b = useState(null), article = _b[0], setArticle = _b[1];
    var _c = useState([]), relatedArticles = _c[0], setRelatedArticles = _c[1];
    var _d = useState(true), isLoading = _d[0], setIsLoading = _d[1];
    useEffect(function () {
        function loadData() {
            return __awaiter(this, void 0, void 0, function () {
                var articleData, formattedArticle, allArticles, related, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, 5, 6]);
                            setIsLoading(true);
                            return [4 /*yield*/, getArticleBlog(params.slug)];
                        case 1:
                            articleData = _a.sent();
                            if (!articleData) return [3 /*break*/, 3];
                            formattedArticle = {
                                id: articleData.id,
                                titre: articleData.titre || 'Sans titre',
                                slug: articleData.slug || params.slug,
                                resume: articleData.extrait || articleData.resume || '',
                                contenu: articleData.contenu || '',
                                datePublication: articleData.datePublication || new Date().toISOString(),
                                auteur: articleData.auteur || 'Équipe CMA',
                                imagePrincipale: getImageURL(articleData.imageData, '/images/blog/default.jpg'),
                                categorie: articleData.categorie,
                                featured: articleData.featured || false
                            };
                            setArticle(formattedArticle);
                            return [4 /*yield*/, getArticlesBlog()];
                        case 2:
                            allArticles = _a.sent();
                            if (allArticles && Array.isArray(allArticles)) {
                                related = allArticles
                                    .filter(function (a) { return a.slug !== params.slug; })
                                    .slice(0, 3)
                                    .map(function (a) { return ({
                                    id: a.id,
                                    titre: a.titre || 'Sans titre',
                                    slug: a.slug || "article-".concat(a.id),
                                    resume: a.extrait || a.resume || '',
                                    contenu: a.contenu || '',
                                    datePublication: a.datePublication || new Date().toISOString(),
                                    auteur: a.auteur || 'Équipe CMA',
                                    imagePrincipale: getImageURL(a.imageData, '/images/blog/default.jpg'),
                                    categorie: a.categorie,
                                    featured: a.featured || false
                                }); });
                                setRelatedArticles(related);
                            }
                            _a.label = 3;
                        case 3: return [3 /*break*/, 6];
                        case 4:
                            error_1 = _a.sent();
                            console.error('Erreur chargement article:', error_1);
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
    }, [params.slug]);
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
    var estimateReadTime = function (content) {
        var wordsPerMinute = 200;
        var words = content.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };
    if (isLoading) {
        return (<PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
      </PageLayout>);
    }
    if (!article) {
        return (<PageLayout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <BookOpen className="w-16 h-16 text-gray-300 mb-4"/>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Article non trouvé</h1>
          <Link href="/blog" className="text-primary-yellow hover:underline flex items-center space-x-2 font-medium">
            <ArrowLeft className="w-4 h-4"/>
            <span>Retour au blog</span>
          </Link>
        </div>
      </PageLayout>);
    }
    var readTime = estimateReadTime(article.contenu);
    return (<PageLayout>
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4"/>
            <span className="text-slate-900 font-medium line-clamp-1">{article.titre}</span>
          </div>
        </div>
      </div>

      {/* Hero Section avec image */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Catégorie et métadonnées */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {article.categorie && (<span className="bg-primary-yellow text-slate-900 px-4 py-2 rounded-full text-sm font-bold">
                  {article.categorie.nom || 'Catégorie'}
                </span>)}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary-yellow"/>
                  <span>{formatDate(article.datePublication)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary-yellow"/>
                  <span>{readTime} min de lecture</span>
                </div>
                {article.auteur && (<div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-primary-yellow"/>
                    <span>{article.auteur}</span>
                  </div>)}
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-5xl md:text-6xl font-montserrat font-black text-slate-900 mb-6 leading-tight">
              {article.titre}
            </h1>

            {/* Résumé */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
              {article.resume}
            </p>

            {/* Bouton partage */}
            <button className="inline-flex items-center space-x-2 text-slate-900 hover:text-primary-yellow transition-colors font-medium group">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform"/>
              <span>Partager cet article</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Image principale */}
      {article.imagePrincipale && (<section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={article.imagePrincipale} alt={article.titre} className="w-full h-auto object-cover" onError={function (e) {
                var target = e.target;
                target.src = '/images/blog/default.jpg';
            }}/>
            </motion.div>
          </div>
        </section>)}

      {/* Contenu principal */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-6 text-lg" dangerouslySetInnerHTML={{ __html: article.contenu }}/>
          </motion.div>
        </div>
      </section>

      {/* Articles connexes */}
      {relatedArticles.length > 0 && (<section className="py-20 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-6 h-6 text-primary-yellow"/>
                <h2 className="text-3xl font-montserrat font-bold text-slate-900">
                  Articles connexes
                </h2>
              </div>
              <div className="h-1 w-20 bg-gradient-to-r from-primary-yellow to-transparent rounded-full"></div>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1
                    }
                }
            }}>
              {relatedArticles.map(function (relatedArticle) { return (<motion.div key={relatedArticle.id} variants={{
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
                  <Link href={"/blog/".concat(relatedArticle.slug)}>
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img src={relatedArticle.imagePrincipale} alt={relatedArticle.titre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={function (e) {
                    var target = e.target;
                    target.src = '/images/blog/default.jpg';
                }}/>
                      </div>

                      {/* Contenu */}
                      <div className="p-6 flex flex-col flex-grow">
                        {relatedArticle.categorie && (<span className="text-primary-yellow text-xs font-bold mb-2 uppercase tracking-wider">
                            {relatedArticle.categorie.nom || 'Catégorie'}
                          </span>)}
                        
                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-yellow transition-colors line-clamp-2">
                          {relatedArticle.titre}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                          {relatedArticle.resume}
                        </p>

                        {/* Métadonnées */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <span>{formatDate(relatedArticle.datePublication)}</span>
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>); })}
            </motion.div>
          </div>
        </section>)}

      {/* CTA Retour */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link href="/blog" className="inline-flex items-center space-x-2 text-slate-900 hover:text-primary-yellow transition-colors font-bold text-lg group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
              <span>Retour au blog</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>);
}
