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
import FormationsCarousel from '@/components/ui/FormationsCarousel';
import { formationsAlternance, formationsReconversion, vaeFormules } from '@/data/formations-static';
var FormationsGallery = function () {
    var _a = useState([]), categories = _a[0], setCategories = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    useEffect(function () {
        function loadFormationsData() {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var _c, formationsResponse, categoriesResponse, formationsData, categoriesData, transformedFormations_1, transformedCategories, organizedCategories, strapiError_1, staticCategories, error_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 7, 8, 9]);
                            console.log('🔄 FormationsGallery: Chargement des données...');
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, Promise.race([
                                    Promise.all([
                                        fetch('http://localhost:1337/api/formations?populate=*&sort=ordre:asc'),
                                        fetch('http://localhost:1337/api/formation-categories?populate=*&sort=ordre:asc')
                                    ]),
                                    new Promise(function (_, reject) { return setTimeout(function () { return reject(new Error('Timeout')); }, 1500); })
                                ])];
                        case 2:
                            _c = _d.sent(), formationsResponse = _c[0], categoriesResponse = _c[1];
                            return [4 /*yield*/, formationsResponse.json()];
                        case 3:
                            formationsData = _d.sent();
                            return [4 /*yield*/, categoriesResponse.json()];
                        case 4:
                            categoriesData = _d.sent();
                            if (((_a = formationsData.data) === null || _a === void 0 ? void 0 : _a.length) > 0 && ((_b = categoriesData.data) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                                transformedFormations_1 = formationsData.data.map(function (item) {
                                    var _a;
                                    return ({
                                        id: item.id,
                                        title: item.attributes.title,
                                        slug: item.attributes.slug,
                                        level: item.attributes.level,
                                        rncp: item.attributes.rncp,
                                        shortDesc: item.attributes.shortDesc,
                                        category: ((_a = item.attributes.category) === null || _a === void 0 ? void 0 : _a.data) ? {
                                            slug: item.attributes.category.data.attributes.slug,
                                            name: item.attributes.category.data.attributes.name
                                        } : null
                                    });
                                });
                                transformedCategories = categoriesData.data.map(function (item) { return ({
                                    id: item.id,
                                    name: item.attributes.name,
                                    slug: item.attributes.slug,
                                    color: item.attributes.color || 'blue'
                                }); });
                                organizedCategories = transformedCategories.map(function (category) { return ({
                                    id: category.id,
                                    nom: category.name,
                                    slug: category.slug,
                                    couleur: category.color,
                                    formations: transformedFormations_1.filter(function (formation) { var _a; return ((_a = formation.category) === null || _a === void 0 ? void 0 : _a.slug) === category.slug; }).map(function (formation) { return ({
                                        id: formation.id,
                                        title: formation.title,
                                        slug: formation.slug,
                                        level: formation.level,
                                        rncp: formation.rncp,
                                        shortDescription: formation.shortDesc || 'Formation professionnelle',
                                        image: '/images/formations/default.jpg',
                                        isAlternance: category.slug === 'alternance',
                                        isReconversion: category.slug === 'reconversion'
                                    }); })
                                }); });
                                console.log('✅ FormationsGallery: Données Strapi chargées avec RNCP');
                                setCategories(organizedCategories);
                                setLoading(false);
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            strapiError_1 = _d.sent();
                            console.log('⚠️ FormationsGallery: Strapi indisponible, fallback statique');
                            return [3 /*break*/, 6];
                        case 6:
                            staticCategories = [
                                {
                                    id: 1,
                                    nom: 'Formations en Alternance',
                                    slug: 'alternance',
                                    couleur: 'blue',
                                    formations: formationsAlternance.slice(0, 4).map(function (formation) { return ({
                                        id: formation.id,
                                        title: formation.title,
                                        slug: formation.slug,
                                        level: formation.level,
                                        rncp: formation.rncp || '',
                                        shortDescription: formation.shortDescription,
                                        image: formation.image,
                                        isAlternance: true,
                                        isReconversion: false
                                    }); })
                                },
                                {
                                    id: 2,
                                    nom: 'Formations Reconversion',
                                    slug: 'reconversion',
                                    couleur: 'green',
                                    formations: formationsReconversion.slice(0, 3).map(function (formation) { return ({
                                        id: formation.id,
                                        title: formation.title,
                                        slug: formation.slug,
                                        level: formation.level,
                                        rncp: formation.rncp || '',
                                        shortDescription: formation.shortDescription,
                                        image: formation.image,
                                        isAlternance: false,
                                        isReconversion: true
                                    }); })
                                },
                                {
                                    id: 3,
                                    nom: 'VAE - Validation des Acquis',
                                    slug: 'vae',
                                    couleur: 'purple',
                                    formations: vaeFormules.slice(0, 2).map(function (formule, index) { return ({
                                        id: 200 + index,
                                        title: formule.titre,
                                        slug: "vae-".concat(formule.titre.toLowerCase().replace(/\s+/g, '-')),
                                        level: 'Tous niveaux',
                                        rncp: 'Multiples certifications',
                                        shortDescription: formule.description,
                                        image: '/images/formations/vae-default.jpg',
                                        isAlternance: false,
                                        isReconversion: false
                                    }); })
                                }
                            ];
                            console.log('✅ FormationsGallery: Données statiques chargées avec RNCP');
                            setCategories(staticCategories);
                            return [3 /*break*/, 9];
                        case 7:
                            error_1 = _d.sent();
                            console.error('❌ FormationsGallery: Erreur de chargement:', error_1);
                            return [3 /*break*/, 9];
                        case 8:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        }
        loadFormationsData();
    }, []);
    if (loading) {
        return (<section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(function (i) { return (<div key={i} className="h-48 bg-gray-200 rounded-xl"></div>); })}
            </div>
          </div>
        </div>
      </section>);
    }
    return (<section className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent"/>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Explorez nos formations par <span className="text-primary-blue">catégorie</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos parcours de formation adaptés à votre profil et vos objectifs professionnels
          </p>
        </motion.div>

        {/* Formations Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(function (category, index) { return (<motion.div key={category.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}>
              <FormationsCarousel formations={category.formations} categoryName={category.nom} categoryColor={category.couleur}/>
            </motion.div>); })}
        </div>

        {/* Call to Action */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mt-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 inline-block">
            <p className="text-gray-700 mb-4">
              Besoin de plus d'informations sur nos formations ?
            </p>
            <a href="/formations" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-blue to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Voir toutes nos formations
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>);
};
export default FormationsGallery;
