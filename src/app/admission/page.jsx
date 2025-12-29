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
import { getEtapesAdmission, getPageAdmission, getImageURL } from '@/lib/strapi';
import { FileText, Users, Search, HeartHandshake, CheckCircle, Clock, Phone, Mail, ArrowRight, Sparkles, GraduationCap, Award } from 'lucide-react';
// Données statiques par défaut
var defaultEtapes = [
    {
        id: 1,
        numero: 1,
        titre: "Soumission du dossier de candidature",
        description: "Commencez par compléter notre formulaire en ligne : présentez votre parcours, votre profil et votre projet professionnel.",
        details: [
            "Complétez le formulaire de candidature en ligne",
            "Présentez votre parcours et votre projet professionnel",
            "Notre équipe vous recontacte sous 24 heures pour fixer un rendez-vous"
        ],
        icone: "FileText",
        ordre: 1
    },
    {
        id: 2,
        numero: 2,
        titre: "L'entretien d'admission CMA",
        description: "L'entretien peut se dérouler en présentiel ou à distance, selon votre préférence. C'est un moment d'échange privilégié pour discuter de vos motivations.",
        details: [
            "Entretien en présentiel ou à distance selon votre préférence",
            "Échange sur vos motivations et votre projet professionnel",
            "Évaluation de la cohérence entre votre profil et la formation visée",
            "Décision communiquée sous 48 heures après l'entretien"
        ],
        icone: "Users",
        ordre: 2
    },
    {
        id: 3,
        numero: 3,
        titre: "La recherche d'alternance",
        description: "Une fois votre candidature validée, vous recevrez tous les documents nécessaires pour démarrer votre recherche d'entreprise.",
        details: [
            "Réception des documents pour la recherche d'entreprise",
            "Préparation de votre contrat d'alternance",
            "Inscription définitive à la signature de la convention de formation"
        ],
        icone: "Search",
        ordre: 3
    },
    {
        id: 4,
        numero: 4,
        titre: "Un accompagnement dédié pour trouver votre entreprise",
        description: "Dès que votre inscription est validée, vous bénéficiez d'un accompagnement personnalisé dans votre recherche d'alternance.",
        details: [
            "Accompagnement personnalisé dans votre recherche",
            "Atelier pratique pour optimiser votre CV et lettre de motivation",
            "Conseils pour maximiser vos chances auprès des recruteurs"
        ],
        icone: "HeartHandshake",
        ordre: 4
    }
];
var defaultPageData = {
    titre: "Parcours d'admission CMA",
    sousTitre: "Comment intégrer CMA ?",
    introduction: "À la Construction Management Academy, nous vous offrons un processus d'admission simplifié, sans concours d'entrée. L'admission CMA se fait uniquement sur la base d'un entretien de motivation. Si vous détenez les diplômes requis pour nos formations, vous êtes éligible. Lors de l'entretien, nous évaluerons votre motivation, qui est au cœur de notre processus de sélection. Il est important de noter qu'aucun frais de scolarité ou d'inscription ne sera demandé à l'alternant.",
    contactPhone: "01 89 70 60 52",
    contactEmail: "inscription.academy@cma-education.com",
    ctaTexte: "Déposer ma candidature",
    ctaUrl: "https://cma-education.ymag.cloud/index.php/preinscription/",
    pointCle1Titre: "Sans concours",
    pointCle1Description: "Admission sur entretien de motivation uniquement",
    pointCle2Titre: "Gratuit pour l'alternant",
    pointCle2Description: "Aucun frais de scolarité ou d'inscription",
    pointCle3Titre: "Réponse rapide",
    pointCle3Description: "Décision sous 48h après l'entretien",
    titreEtapes: "Les étapes de votre admission",
    descriptionEtapes: "Un processus simple et transparent pour rejoindre la Construction Management Academy",
    titreCTA: "Prêt à rejoindre CMA ?",
    descriptionCTA: "Lancez votre candidature dès maintenant et commencez votre parcours vers une carrière dans le BTP",
    titreContact: "Des questions sur l'admission ?",
    descriptionContact: "Notre équipe est à votre disposition pour vous accompagner"
};
var getIconComponent = function (iconName) {
    var icons = {
        FileText: FileText,
        Users: Users,
        Search: Search,
        HeartHandshake: HeartHandshake
    };
    return icons[iconName] || FileText;
};
var EtapeCard = function (_a) {
    var etape = _a.etape, index = _a.index;
    var IconComponent = getIconComponent(etape.icone || 'FileText');
    var isEven = index % 2 === 0;
    return (<motion.div initial={{ opacity: 0, x: isEven ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.15 }} viewport={{ once: true }} className="relative">
      {index < 3 && (<div className="hidden md:block absolute left-1/2 top-full w-0.5 h-16 bg-gradient-to-b from-primary-blue to-primary-yellow transform -translate-x-1/2 z-0"/>)}
      
      <div className={"flex flex-col md:flex-row items-center gap-8 ".concat(isEven ? '' : 'md:flex-row-reverse')}>
        <div className="flex-shrink-0 relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-blue to-blue-700 flex items-center justify-center shadow-xl shadow-primary-blue/30">
            <IconComponent className="w-10 h-10 text-white"/>
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary-yellow flex items-center justify-center font-montserrat font-bold text-primary-blue text-lg shadow-lg">
            {etape.numero}
          </div>
        </div>
        
        <div className={"flex-1 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 ".concat(isEven ? 'md:text-left' : 'md:text-right')}>
          <h3 className="text-xl font-montserrat font-bold text-primary-blue mb-3">
            {etape.titre}
          </h3>
          <p className="text-gray-600 mb-4">
            {etape.description}
          </p>
          
          {etape.details && etape.details.length > 0 && (<ul className={"space-y-2 ".concat(isEven ? '' : 'md:flex md:flex-col md:items-end')}>
              {etape.details.map(function (detail, i) { return (<li key={i} className={"flex items-start gap-2 text-sm text-gray-500 ".concat(isEven ? '' : 'md:flex-row-reverse md:text-right')}>
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"/>
                  <span>{detail}</span>
                </li>); })}
            </ul>)}
        </div>
      </div>
    </motion.div>);
};
export default function AdmissionPage() {
    var _a = useState(defaultEtapes), etapes = _a[0], setEtapes = _a[1];
    var _b = useState(defaultPageData), pageData = _b[0], setPageData = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    useEffect(function () {
        function loadData() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, etapesData, pageDataResult, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, Promise.all([
                                    getEtapesAdmission(),
                                    getPageAdmission()
                                ])];
                        case 1:
                            _a = _b.sent(), etapesData = _a[0], pageDataResult = _a[1];
                            if (etapesData && Array.isArray(etapesData) && etapesData.length > 0) {
                                setEtapes(etapesData);
                            }
                            if (pageDataResult) {
                                setPageData(__assign(__assign({}, defaultPageData), pageDataResult));
                            }
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _b.sent();
                            console.error('Erreur chargement données admission:', error_1);
                            return [3 /*break*/, 4];
                        case 3:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        loadData();
    }, []);
    var handleCandidater = function () {
        window.open(pageData.ctaUrl, '_blank');
    };
    // Récupérer l'URL de l'image hero depuis plusieurs sources possibles
    var heroImageUrl = getImageURL(pageData.heroImageData || pageData.heroImage || pageData.imageData, '/images/formations/gallery-1.jpg');
    // Debug en développement
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('Page Admission - Hero Image Debug:', {
            heroImageData: pageData.heroImageData,
            heroImage: pageData.heroImage,
            imageData: pageData.imageData,
            finalUrl: heroImageUrl
        });
    }
    return (<PageLayout>
      {/* Hero Section avec image de fond */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImageUrl} alt="Admission CMA" className="w-full h-full object-cover" onError={function (e) {
            console.error('Erreur chargement image hero:', heroImageUrl);
            e.target.src = '/images/formations/gallery-1.jpg';
        }}/>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <GraduationCap className="w-5 h-5 text-primary-yellow"/>
              <span className="text-sm font-medium text-white">Admission simplifiée</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-4">
              {pageData.titre}
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-montserrat text-primary-yellow mb-6">
              {pageData.sousTitre}
            </h2>
            
            <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-2xl">
              {pageData.introduction}
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={handleCandidater} className="group inline-flex items-center space-x-3 bg-primary-yellow text-primary-blue px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <span>{pageData.ctaTexte}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
              </button>
              
              <a href={"tel:".concat(pageData.contactPhone.replace(/\s/g, ''))} className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                <Phone className="w-5 h-5"/>
                <span>{pageData.contactPhone}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Points clés */}
      <section className="py-12 bg-white -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-green-600"/>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{pageData.pointCle1Titre}</h3>
              <p className="text-gray-500">{pageData.pointCle1Description}</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-primary-blue"/>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{pageData.pointCle2Titre}</h3>
              <p className="text-gray-500">{pageData.pointCle2Description}</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-yellow-600"/>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{pageData.pointCle3Titre}</h3>
              <p className="text-gray-500">{pageData.pointCle3Description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Étapes d'admission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-4">
              {pageData.titreEtapes}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {pageData.descriptionEtapes}
            </p>
          </motion.div>

          <div className="space-y-16">
            {etapes.map(function (etape, index) { return (<EtapeCard key={etape.id} etape={etape} index={index}/>); })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"/>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white rounded-full"/>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-white rounded-full"/>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Sparkles className="w-12 h-12 text-primary-yellow mx-auto mb-6"/>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
              {pageData.titreCTA}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {pageData.descriptionCTA}
            </p>
            
            <button onClick={handleCandidater} className="group inline-flex items-center space-x-3 bg-primary-yellow text-primary-blue px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span>{pageData.ctaTexte}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl font-montserrat font-bold text-primary-blue mb-4">
              {pageData.titreContact}
            </h2>
            <p className="text-gray-600">
              {pageData.descriptionContact}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.a href={"tel:".concat(pageData.contactPhone.replace(/\s/g, ''))} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center space-x-4 bg-gray-50 rounded-xl p-6 hover:bg-primary-blue/5 transition-colors group">
              <div className="w-14 h-14 bg-primary-blue/10 rounded-full flex items-center justify-center group-hover:bg-primary-blue/20 transition-colors">
                <Phone className="w-6 h-6 text-primary-blue"/>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                <p className="text-lg font-semibold text-gray-900">{pageData.contactPhone}</p>
              </div>
            </motion.a>

            <motion.a href={"mailto:".concat(pageData.contactEmail)} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center space-x-4 bg-gray-50 rounded-xl p-6 hover:bg-primary-blue/5 transition-colors group">
              <div className="w-14 h-14 bg-primary-blue/10 rounded-full flex items-center justify-center group-hover:bg-primary-blue/20 transition-colors">
                <Mail className="w-6 h-6 text-primary-blue"/>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-semibold text-gray-900">{pageData.contactEmail}</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </PageLayout>);
}
