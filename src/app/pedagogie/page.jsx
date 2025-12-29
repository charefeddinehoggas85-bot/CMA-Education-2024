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
import GallerySection from '@/components/sections/GallerySection';
import { getSiteSettings, getValeursEcole, getProcessusAdmission, getMethodesPedagogiques, getChiffresCles, getOutilsPedagogiques } from '@/lib/strapi';
import { BookOpen, Users, Target, Award, CheckCircle, ArrowRight, Lightbulb, Cog, Heart, Star, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
export default function PedagogiePage() {
    var _a = useState(null), siteSettings = _a[0], setSiteSettings = _a[1];
    var _b = useState([]), valeursPedagogiques = _b[0], setValeursPedagogiques = _b[1];
    var _c = useState([]), processus = _c[0], setProcessus = _c[1];
    var _d = useState([]), methodesPedagogiques = _d[0], setMethodesPedagogiques = _d[1];
    var _e = useState([]), chiffresCles = _e[0], setChiffresCles = _e[1];
    var _f = useState([]), outilsPedagogiques = _f[0], setOutilsPedagogiques = _f[1];
    var _g = useState(true), loading = _g[0], setLoading = _g[1];
    useEffect(function () {
        function loadPedagogieData() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, settingsData, valeursData, processusData, methodesData, chiffresData, outilsData, valeursPedago, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, Promise.all([
                                    getSiteSettings(),
                                    getValeursEcole(),
                                    getProcessusAdmission(),
                                    getMethodesPedagogiques(),
                                    getChiffresCles('pedagogie'),
                                    getOutilsPedagogiques()
                                ])];
                        case 1:
                            _a = _b.sent(), settingsData = _a[0], valeursData = _a[1], processusData = _a[2], methodesData = _a[3], chiffresData = _a[4], outilsData = _a[5];
                            setSiteSettings(settingsData);
                            valeursPedago = valeursData.filter(function (valeur) {
                                return !valeur.type || valeur.type === 'pedagogie' || valeur.type === 'methode';
                            });
                            setValeursPedagogiques(valeursPedago);
                            setProcessus(processusData);
                            // Méthodes pédagogiques avec fallback
                            if (methodesData.length > 0) {
                                setMethodesPedagogiques(methodesData);
                            }
                            else {
                                setMethodesPedagogiques([
                                    { id: 1, nom: "Apprentissage par l'action", description: "70% de pratique, 30% de théorie pour un apprentissage efficace", icon: "Cog", couleur: "from-blue-500 to-blue-600", ordre: 1 },
                                    { id: 2, nom: "Pédagogie collaborative", description: "Travail en équipe et projets collectifs pour développer les soft skills", icon: "Users", couleur: "from-green-500 to-green-600", ordre: 2 },
                                    { id: 3, nom: "Mentorat professionnel", description: "Accompagnement par des professionnels expérimentés du secteur", icon: "Heart", couleur: "from-purple-500 to-purple-600", ordre: 3 },
                                    { id: 4, nom: "Innovation technologique", description: "Intégration des dernières technologies BTP et outils digitaux", icon: "Lightbulb", couleur: "from-orange-500 to-orange-600", ordre: 4 }
                                ]);
                            }
                            // Chiffres clés avec fallback
                            if (chiffresData.length > 0) {
                                setChiffresCles(chiffresData);
                            }
                            else {
                                setChiffresCles([
                                    { id: 1, valeur: "95%", label: "Taux de réussite", icon: "Award", ordre: 1 },
                                    { id: 2, valeur: "20", label: "Étudiants max par classe", icon: "Users", ordre: 2 },
                                    { id: 3, valeur: "70%", label: "Pratique terrain", icon: "Cog", ordre: 3 },
                                    { id: 4, valeur: "15+", label: "Années d'expérience", icon: "Star", ordre: 4 }
                                ]);
                            }
                            // Outils pédagogiques avec fallback
                            if (outilsData.length > 0) {
                                setOutilsPedagogiques(outilsData);
                            }
                            else {
                                setOutilsPedagogiques([
                                    { id: 1, nom: "Plateforme e-learning dédiée", ordre: 1 },
                                    { id: 2, nom: "Simulateurs de chantier BTP", ordre: 2 },
                                    { id: 3, nom: "Logiciels professionnels (AutoCAD, Revit, MS Project)", ordre: 3 },
                                    { id: 4, nom: "Réalité virtuelle pour la sécurité", ordre: 4 },
                                    { id: 5, nom: "Études de cas d'entreprises réelles", ordre: 5 },
                                    { id: 6, nom: "Projets collaboratifs inter-promotions", ordre: 6 }
                                ]);
                            }
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _b.sent();
                            console.error('Erreur chargement pédagogie:', error_1);
                            // Fallback avec données statiques
                            setSiteSettings({
                                id: 1,
                                siteName: 'CMA Education',
                                pedagogieTitle: 'Notre Pédagogie d\'Excellence',
                                pedagogieDescription: 'Une approche innovante qui allie théorie et pratique pour former les professionnels BTP de demain'
                            });
                            setValeursPedagogiques([
                                { id: 1, titre: "Pédagogie par projet", description: "Apprentissage concret à travers des projets réels d'entreprises partenaires", icon: "Target", ordre: 1, type: "pedagogie" },
                                { id: 2, titre: "Accompagnement personnalisé", description: "Suivi individuel avec un formateur référent tout au long du parcours", icon: "Users", ordre: 2, type: "pedagogie" },
                                { id: 3, titre: "Innovation pédagogique", description: "Outils digitaux, réalité virtuelle et méthodes actives d'apprentissage", icon: "Lightbulb", ordre: 3, type: "pedagogie" },
                                { id: 4, titre: "Lien entreprise permanent", description: "Immersion en entreprise et projets collaboratifs avec nos partenaires", icon: "Cog", ordre: 4, type: "pedagogie" }
                            ]);
                            setMethodesPedagogiques([
                                { id: 1, nom: "Apprentissage par l'action", description: "70% de pratique, 30% de théorie pour un apprentissage efficace", icon: "Cog", couleur: "from-blue-500 to-blue-600", ordre: 1 },
                                { id: 2, nom: "Pédagogie collaborative", description: "Travail en équipe et projets collectifs pour développer les soft skills", icon: "Users", couleur: "from-green-500 to-green-600", ordre: 2 },
                                { id: 3, nom: "Mentorat professionnel", description: "Accompagnement par des professionnels expérimentés du secteur", icon: "Heart", couleur: "from-purple-500 to-purple-600", ordre: 3 },
                                { id: 4, nom: "Innovation technologique", description: "Intégration des dernières technologies BTP et outils digitaux", icon: "Lightbulb", couleur: "from-orange-500 to-orange-600", ordre: 4 }
                            ]);
                            setChiffresCles([
                                { id: 1, valeur: "95%", label: "Taux de réussite", icon: "Award", ordre: 1 },
                                { id: 2, valeur: "20", label: "Étudiants max par classe", icon: "Users", ordre: 2 },
                                { id: 3, valeur: "70%", label: "Pratique terrain", icon: "Cog", ordre: 3 },
                                { id: 4, valeur: "15+", label: "Années d'expérience", icon: "Star", ordre: 4 }
                            ]);
                            setOutilsPedagogiques([
                                { id: 1, nom: "Plateforme e-learning dédiée", ordre: 1 },
                                { id: 2, nom: "Simulateurs de chantier BTP", ordre: 2 },
                                { id: 3, nom: "Logiciels professionnels (AutoCAD, Revit, MS Project)", ordre: 3 },
                                { id: 4, nom: "Réalité virtuelle pour la sécurité", ordre: 4 },
                                { id: 5, nom: "Études de cas d'entreprises réelles", ordre: 5 },
                                { id: 6, nom: "Projets collaboratifs inter-promotions", ordre: 6 }
                            ]);
                            return [3 /*break*/, 4];
                        case 3:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        loadPedagogieData();
    }, []);
    var getIcon = function (iconName) {
        switch (iconName) {
            case 'Target':
                return <Target className="w-8 h-8"/>;
            case 'Users':
                return <Users className="w-8 h-8"/>;
            case 'Lightbulb':
                return <Lightbulb className="w-8 h-8"/>;
            case 'Cog':
                return <Cog className="w-8 h-8"/>;
            case 'Heart':
                return <Heart className="w-8 h-8"/>;
            case 'Award':
                return <Award className="w-6 h-6"/>;
            case 'Star':
                return <Star className="w-6 h-6"/>;
            default:
                return <BookOpen className="w-8 h-8"/>;
        }
    };
    var getIconSmall = function (iconName) {
        switch (iconName) {
            case 'Award':
                return <Award className="w-6 h-6"/>;
            case 'Users':
                return <Users className="w-6 h-6"/>;
            case 'Cog':
                return <Cog className="w-6 h-6"/>;
            case 'Star':
                return <Star className="w-6 h-6"/>;
            default:
                return <BookOpen className="w-6 h-6"/>;
        }
    };
    if (loading) {
        return (<PageLayout>
        <div className="py-20 text-center">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-16 w-96 mx-auto rounded mb-4"></div>
            <div className="bg-gray-200 h-6 w-2/3 mx-auto rounded"></div>
          </div>
        </div>
      </PageLayout>);
    }
    return (<PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-blue via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pedagogie-hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <BookOpen className="w-6 h-6"/>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                Pédagogie d'Excellence
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              {(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.pedagogieTitle) || 'Notre Pédagogie d\'Excellence'}
            </h1>
            
            <p className="text-xl opacity-90 mb-8">
              {(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.pedagogieDescription) ||
            'Une approche innovante qui allie théorie et pratique pour former les professionnels BTP de demain'}
            </p>
            
            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {chiffresCles.map(function (chiffre, index) { return (<motion.div key={chiffre.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-primary-yellow mb-2">{getIconSmall(chiffre.icon)}</div>
                  <div className="text-2xl font-bold text-primary-yellow">{chiffre.valeur}</div>
                  <div className="text-sm opacity-90">{chiffre.label}</div>
                </motion.div>); })}
            </div>
            
            <Link href="/formations" className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center">
              Découvrir nos formations
              <ArrowRight className="w-5 h-5 ml-2"/>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Valeurs pédagogiques */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-blue mb-4">
              Nos Valeurs Pédagogiques
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une pédagogie centrée sur l'apprenant et orientée vers l'employabilité
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valeursPedagogiques.map(function (valeur, index) { return (<motion.div key={valeur.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                  {getIcon(valeur.icon)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{valeur.titre}</h3>
                <p className="text-sm text-gray-600">{valeur.description}</p>
              </motion.div>); })}
          </div>
        </div>
      </section>

      {/* Méthodes pédagogiques */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-blue mb-4">
              Nos Méthodes Pédagogiques
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des approches innovantes pour un apprentissage efficace et durable
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {methodesPedagogiques.map(function (methode, index) { return (<motion.div key={methode.id} initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={"w-16 h-16 bg-gradient-to-br ".concat(methode.couleur || 'from-blue-500 to-blue-600', " rounded-xl flex items-center justify-center text-white mb-6")}>
                  {getIcon(methode.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{methode.nom}</h3>
                <p className="text-gray-600">{methode.description}</p>
              </motion.div>); })}
          </div>
        </div>
      </section>

      {/* Outils pédagogiques */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-primary-blue mb-6">
                Outils et Technologies Pédagogiques
              </h2>
              <p className="text-gray-600 mb-8">
                Nous utilisons les dernières technologies pour offrir une expérience d'apprentissage 
                moderne et immersive, préparant nos étudiants aux réalités du terrain.
              </p>
              
              <div className="space-y-4">
                {outilsPedagogiques.map(function (outil, index) { return (<motion.div key={outil.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-blue flex-shrink-0"/>
                    <span className="text-gray-700">{outil.nom}</span>
                  </motion.div>); })}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-primary-blue to-indigo-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Environnement d'Apprentissage</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary-yellow"/>
                  <span>Salles équipées dernière génération</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-primary-yellow"/>
                  <span>Laboratoires de simulation BTP</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary-yellow"/>
                  <span>Espaces de travail collaboratif</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-primary-yellow"/>
                  <span>Bibliothèque technique spécialisée</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-90">
                  "Un environnement d'apprentissage optimal pour développer les compétences 
                  techniques et humaines essentielles au secteur BTP."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Galerie pédagogie */}
      <GallerySection page="pedagogie" title="Notre Pédagogie en Images" description="Découvrez nos méthodes d'enseignement et nos espaces de formation" maxGalleries={2}/>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-blue to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-montserrat font-bold mb-6">
              Prêt à Rejoindre Notre École d'Excellence ?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Découvrez comment notre pédagogie innovante peut transformer votre carrière dans le BTP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/formations" className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center">
                Voir nos formations
                <ArrowRight className="w-5 h-5 ml-2"/>
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary-blue transition-colors">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>);
}
