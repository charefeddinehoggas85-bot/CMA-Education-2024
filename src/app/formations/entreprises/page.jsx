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
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Building2, Users, TrendingUp, Award, CheckCircle, Phone, Mail, ArrowRight, ChevronDown, Briefcase, Target, Heart, Star, GraduationCap, Euro, MapPin, Zap } from 'lucide-react';
import Link from 'next/link';
import { getEntrepriseServices, getFormationThematiques, getPageEntreprise, getEntrepriseModalites } from '@/lib/strapi';
// Valeurs par défaut
var defaultPageData = {
    heroTitre: "Formations BTP pour Entreprises",
    heroSousTitre: "Formations sur mesure",
    heroDescription: "Chez Construction Management Academy, nous accompagnons les entreprises souhaitant faire évoluer leurs salariés pour qu'ils deviennent de véritables piliers dans leur secteur d'activité. Nos formations sont conçues pour développer les compétences, booster la performance et permettre à vos équipes de s'adapter aux exigences actuelles du marché.",
    heroBoutonPrincipal: "Demander un devis",
    heroBoutonSecondaire: "Télécharger la brochure",
    sectionInvestirTitre: "Pourquoi investir dans la formation de vos salariés ?",
    sectionInvestirSousTitre: "Les avantages",
    sectionThematiquesTitre: "Nos thématiques de formation pour les entreprises",
    sectionThematiquesSousTitre: "Formations populaires",
    sectionThematiquesDescription: "Nous couvrons de nombreux domaines, avec des modules courts ou des parcours complets. Parmi les formations les plus demandées :",
    surMesureTitre: "Formations sur mesure et adaptables",
    surMesureDescription: "Toutes nos formations pour les entreprises sont proposées sur devis, afin de s'adapter parfaitement à vos besoins spécifiques et vos objectifs.",
    surMesureBouton: "Demander un programme personnalisé",
    modalitesTitre: "Modalités de formation",
    modalitesSousTitre: "Flexibilité totale",
    modalitesDescription: "Nos formations sont proposées dans toute la France selon vos préférences",
    tarifTitre: "Tarification",
    tarifJour: "À partir de 700€ HT",
    tarifJourLabel: "Par jour et par stagiaire",
    tarifDescription: "Le coût varie selon le format (inter/intra), la durée, le contenu personnalisé.",
    tarifIntra: "Tarif formation en intra : nous consulter",
    financementTitre: "Financement",
    financementDescription: "Nous vous accompagnons dans la mobilisation de vos droits à la formation",
    financements: [
        "Plan de développement des compétences",
        "Financement via OPCO (Constructys, Atlas…)",
        "CPF pour les formations certifiantes"
    ],
    ctaTitre: "Prêt à former vos équipes ?",
    ctaDescription: "Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé",
    ctaBoutonPrincipal: "Nous contacter",
    ctaBoutonSecondaire: "Télécharger la brochure",
    telephone: "01 89 70 60 52",
    email: "contact.academy@cma-education.com"
};
// Avantages par défaut
var defaultAvantages = [
    { id: 1, titre: "Amélioration des performances internes", description: "Des collaborateurs mieux formés, c'est une productivité renforcée et une meilleure efficacité dans les missions du quotidien.", icone: "TrendingUp", ordre: 1 },
    { id: 2, titre: "Adaptation aux évolutions du secteur", description: "Le monde du BTP évolue rapidement : se former, c'est rester compétitif et à la pointe des nouvelles méthodes et réglementations.", icone: "Zap", ordre: 2 },
    { id: 3, titre: "Fidélisation des talents", description: "Offrir des formations à vos équipes, c'est aussi leur montrer que vous investissez en eux — un excellent levier de motivation et de fidélité.", icone: "Heart", ordre: 3 },
    { id: 4, titre: "Valorisez votre image employeur", description: "Une entreprise qui forme ses salariés est perçue comme innovante, responsable et tournée vers l'avenir.", icone: "Award", ordre: 4 }
];
// Thématiques par défaut
var defaultThematiques = [
    { id: 1, nom: "Lean Construction", description: "Optimiser les processus chantier", ordre: 1 },
    { id: 2, nom: "Pilotage de projet de rénovation énergétique", description: "Maîtriser les enjeux de la transition énergétique", ordre: 2 },
    { id: 3, nom: "Management financier d'un projet de construction", description: "Gérer les budgets et la rentabilité", ordre: 3 },
    { id: 4, nom: "Gestion de chantier, coordination d'intervenants, sécurité", description: "Piloter efficacement vos équipes terrain", ordre: 4 },
    { id: 5, nom: "BIM collaboratif – prise en main Revit / méthodologie BIM", description: "Maîtriser la maquette numérique", ordre: 5 }
];
// Modalités par défaut
var defaultModalites = [
    { id: 1, type: "Inter-entreprise", description: "Dans nos locaux selon un calendrier défini", ordre: 1 },
    { id: 2, type: "Intra-entreprise", description: "Sur site ou en distanciel, selon vos besoins", ordre: 2 },
    { id: 3, type: "100% sur mesure", description: "Nous construisons avec vous un programme adapté à vos besoins spécifiques", ordre: 3 }
];
// Fonction pour obtenir l'icône
var getIcon = function (iconName, className) {
    if (className === void 0) { className = "w-6 h-6"; }
    var icons = {
        TrendingUp: <TrendingUp className={className}/>,
        Building2: <Building2 className={className}/>,
        Users: <Users className={className}/>,
        Award: <Award className={className}/>,
        Heart: <Heart className={className}/>,
        Zap: <Zap className={className}/>,
        Target: <Target className={className}/>,
        Briefcase: <Briefcase className={className}/>,
        Star: <Star className={className}/>
    };
    return icons[iconName] || <Building2 className={className}/>;
};
export default function FormationsEntreprises() {
    var _a = useState(defaultAvantages), avantages = _a[0], setAvantages = _a[1];
    var _b = useState(defaultThematiques), thematiques = _b[0], setThematiques = _b[1];
    var _c = useState(defaultModalites), modalites = _c[0], setModalites = _c[1];
    var _d = useState(defaultPageData), page = _d[0], setPage = _d[1];
    var heroRef = useRef(null);
    var scrollYProgress = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    }).scrollYProgress;
    var heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    useEffect(function () {
        function loadData() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, servicesData, thematiquesData, modalitesData, pageData, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Promise.all([
                                    getEntrepriseServices(),
                                    getFormationThematiques(),
                                    getEntrepriseModalites(),
                                    getPageEntreprise()
                                ])];
                        case 1:
                            _a = _b.sent(), servicesData = _a[0], thematiquesData = _a[1], modalitesData = _a[2], pageData = _a[3];
                            if (servicesData === null || servicesData === void 0 ? void 0 : servicesData.length)
                                setAvantages(servicesData);
                            if (thematiquesData === null || thematiquesData === void 0 ? void 0 : thematiquesData.length)
                                setThematiques(thematiquesData);
                            if (modalitesData === null || modalitesData === void 0 ? void 0 : modalitesData.length)
                                setModalites(modalitesData);
                            if (pageData)
                                setPage(__assign(__assign({}, defaultPageData), pageData));
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _b.sent();
                            console.error('Erreur chargement données entreprise:', error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        loadData();
    }, []);
    return (<PageLayout>
      {/* Hero Section - Design moderne avec couleurs CMA */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500"/>
          {/* Pattern géométrique */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid-ent" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-ent)"/>
            </svg>
          </div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"/>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-blue/20 rounded-full blur-3xl"/>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Building2 className="w-6 h-6 text-white"/>
                </div>
                <span className="text-white/90 font-medium tracking-wide uppercase text-sm">
                  {page.heroSousTitre}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6 leading-tight">
                {page.heroTitre.includes('Entreprises')
            ? <>Formations BTP pour <span className="text-primary-blue bg-white px-3 py-1 rounded-lg">Entreprises</span></>
            : page.heroTitre}
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {page.heroDescription}
              </p>

              {/* Stats rapides */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Euro className="w-5 h-5 text-white"/>
                  <span className="text-white font-medium">Sur devis</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-white"/>
                  <span className="text-white font-medium">Toute la France</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Users className="w-5 h-5 text-white"/>
                  <span className="text-white font-medium">Inter / Intra</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="group bg-primary-blue text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg transition-all inline-flex items-center justify-center">
                  {page.heroBoutonPrincipal}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"/>
                </Link>
                <Link href="/brochure" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all text-center">
                  {page.heroBoutonSecondaire}
                </Link>
              </div>
            </motion.div>

            {/* Card visuelle */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary-blue rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white"/>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Formation sur mesure</h3>
                      <p className="text-white/70">Adaptée à vos besoins</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {["Lean Construction", "Rénovation énergétique", "BIM collaboratif"].map(function (item, i) { return (<div key={i} className="flex items-center gap-3 text-white/90">
                        <CheckCircle className="w-5 h-5 text-primary-blue"/>
                        <span>{item}</span>
                      </div>); })}
                  </div>
                </div>

                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-4 bg-primary-blue text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✓ Financement OPCO
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-white/50"/>
        </motion.div>
      </section>

      {/* Section Avantages - Pourquoi investir */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
              {page.sectionInvestirSousTitre}
            </span>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 mt-2 mb-4">
              {page.sectionInvestirTitre}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {avantages.map(function (avantage, index) { return (<motion.div key={avantage.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                    {getIcon(avantage.icone, "w-7 h-7")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {avantage.titre}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{avantage.description}</p>
                  </div>
                </div>
              </motion.div>); })}
          </div>
        </div>
      </section>

      {/* Section Thématiques */}
      <section className="py-20 bg-primary-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
                {page.sectionThematiquesSousTitre}
              </span>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 mt-2 mb-6">
                {page.sectionThematiquesTitre}
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                {page.sectionThematiquesDescription}
              </p>
              
              <div className="space-y-4">
                {thematiques.map(function (thematique, index) { return (<motion.div key={thematique.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                      <CheckCircle className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors"/>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {thematique.nom}
                      </h4>
                      {thematique.description && (<p className="text-sm text-gray-500 mt-1">{thematique.description}</p>)}
                    </div>
                  </motion.div>); })}
              </div>
            </motion.div>

            {/* Card Sur Mesure */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:sticky lg:top-32">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 text-white shadow-2xl">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white"/>
                </div>
                <h3 className="text-2xl font-bold mb-4">{page.surMesureTitre}</h3>
                <p className="text-white/90 mb-8 leading-relaxed">
                  {page.surMesureDescription}
                </p>
                <Link href="/contact" className="block w-full bg-primary-blue text-white py-4 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors">
                  {page.surMesureBouton}
                </Link>
              </div>

              {/* Badge info */}
              <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-blue"/>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Formations dans toute la France</p>
                    <p className="text-sm text-gray-500">Sur catalogue ou sur mesure</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Modalités */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
              {page.modalitesSousTitre}
            </span>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 mt-2 mb-4">
              {page.modalitesTitre}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {page.modalitesDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {modalites.map(function (modalite, index) { return (<motion.div key={modalite.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="group text-center p-8 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-orange-500 hover:bg-white hover:shadow-xl transition-all">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                  {index === 0 && <Users className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors"/>}
                  {index === 1 && <Building2 className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors"/>}
                  {index === 2 && <Target className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors"/>}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {modalite.type}
                </h3>
                <p className="text-gray-600">{modalite.description}</p>
              </motion.div>); })}
          </div>
        </div>
      </section>

      {/* Section Tarifs et Financement */}
      <section className="py-20 bg-gradient-to-br from-primary-blue via-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"/>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-yellow/10 rounded-full blur-3xl"/>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Tarification */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-8">{page.tarifTitre}</h2>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-primary-yellow">{page.tarifJour}</span>
                </div>
                <p className="text-blue-200 mb-4">{page.tarifJourLabel}</p>
                <p className="text-blue-100 mb-6">{page.tarifDescription}</p>
                
                <div className="pt-6 border-t border-white/20">
                  <p className="text-white/80 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary-yellow"/>
                    {page.tarifIntra}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Financement */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-8">{page.financementTitre}</h2>
              
              <p className="text-blue-100 mb-8 text-lg">{page.financementDescription}</p>
              
              <div className="space-y-4">
                {page.financements.map(function (financement, index) { return (<motion.div key={index} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="w-10 h-10 bg-primary-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-primary-blue"/>
                    </div>
                    <span className="text-white">{financement}</span>
                  </motion.div>); })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 mb-6">
              {page.ctaTitre}
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {page.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/contact" className="group bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all inline-flex items-center justify-center">
                {page.ctaBoutonPrincipal}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"/>
              </Link>
              <Link href="/brochure" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-orange-500 hover:text-orange-600 transition-all text-center">
                {page.ctaBoutonSecondaire}
              </Link>
            </div>

            {/* Contact direct */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href={"tel:".concat(page.telephone.replace(/\s/g, ''))} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <Phone className="w-5 h-5"/>
                <span className="font-medium">{page.telephone}</span>
              </a>
              <a href={"mailto:".concat(page.email)} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <Mail className="w-5 h-5"/>
                <span className="font-medium">{page.email}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>);
}
