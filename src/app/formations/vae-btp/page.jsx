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
import { CheckCircle, Clock, Award, ArrowRight, Euro, FileCheck, GraduationCap, ChevronDown, Building2, HardHat, Wrench } from 'lucide-react';
import Link from 'next/link';
import { getVAEFormules, getVAECertifications, getVAEAvantages, getVAEFaqs, getPageVAE } from '@/lib/strapi';
// Valeurs par défaut (fallback si Strapi non disponible)
var defaultPageData = {
    heroTitre: "Transformez votre expérience BTP en diplôme",
    heroSousTitre: "Validation des Acquis de l'Expérience",
    heroDescription: "Vous avez acquis des compétences au fil des années dans le BTP sans diplôme officiel ? La VAE vous permet de transformer cette expérience terrain en certification professionnelle reconnue par l'État.",
    heroBoutonPrincipal: "Démarrer ma VAE",
    heroBoutonSecondaire: "Télécharger la brochure",
    statExperienceValeur: "1 an",
    statExperienceLabel: "minimum",
    statCertificationsValeur: "5 titres",
    statCertificationsLabel: "RNCP",
    statFinancementValeur: "CPF",
    statFinancementLabel: "éligible",
    badgeTexte: "✓ 0 diplôme requis",
    sectionTitre: "Qu'est-ce que la VAE et à qui s'adresse-t-elle ?",
    sectionSousTitre: "Comprendre la VAE",
    sectionDescription: "<p>La <strong>Validation des Acquis de l'Expérience</strong> est un droit individuel inscrit dans le Code du Travail (articles L6313-1 et L6353-3). Elle permet d'obtenir tout ou partie d'un diplôme, d'un titre professionnel ou d'un certificat de qualification, en justifiant d'au moins <strong>1 an d'expérience</strong> en lien avec la certification visée.</p><p>Nos formations BTP en VAE sont accessibles <strong>sans condition d'âge, de nationalité ou de statut</strong> (salarié, indépendant, demandeur d'emploi, bénévole…).</p>",
    pointCle1Titre: "Accès élargi",
    pointCle1Description: "Sans diplôme initial requis",
    pointCle1Icone: "🎯",
    pointCle2Titre: "Reconnaissance",
    pointCle2Description: "Titre RNCP officiel",
    pointCle2Icone: "🏆",
    pointCle3Titre: "Flexible",
    pointCle3Description: "À votre rythme",
    pointCle3Icone: "⚡",
    avantagesTitre: "Avantages de la VAE BTP",
    certificationsTitre: "Certifications VAE BTP accessibles à la CMA",
    certificationsSousTitre: "Nos certifications",
    certificationsDescription: "Toutes nos certifications RNCP sont accessibles via la VAE. Validez un titre complet ou un ou plusieurs CCP.",
    validationPartielleTexte: "En cas de validation partielle, vous disposez de 1 an pour compléter les blocs de compétences manquants.",
    formulesTitre: "Choisissez votre formule d'accompagnement",
    formulesSousTitre: "Nos offres",
    formulesDescription: "Deux formules adaptées à vos besoins et votre niveau d'autonomie",
    financementTexte: "Financements possibles : CPF, employeurs, OPCO, autofinancement",
    financementSousTexte: "Nous vous aidons à constituer votre dossier de financement",
    faqTitre: "Questions fréquentes sur la VAE BTP",
    faqSousTitre: "FAQ",
    ctaTitre: "Prêt à valoriser votre expérience BTP ?",
    ctaDescription: "Transformez votre expérience terrain en diplôme reconnu. Contactez-nous pour étudier votre éligibilité à la VAE BTP et démarrer votre parcours de certification.",
    ctaBoutonPrincipal: "Démarrer ma VAE maintenant",
    ctaBoutonSecondaire: "Nous appeler",
    ctaTelephone: "+33123456789"
};
// Données statiques de fallback
var defaultAvantages = [
    { id: 1, texte: "Accessible à tous, sans condition de diplôme initial", ordre: 1 },
    { id: 2, texte: "Reconnaissance officielle par un titre RNCP", ordre: 2 },
    { id: 3, texte: "Accompagnement personnalisé et flexible", ordre: 3 },
    { id: 4, texte: "Financement possible via CPF, OPCO ou employeur", ordre: 4 },
    { id: 5, texte: "Valorisation de votre expérience terrain", ordre: 5 },
    { id: 6, texte: "Validation partielle possible", ordre: 6 }
];
var defaultCertifications = [
    { id: 1, titre: "Conducteur de Travaux Bâtiment et Génie Civil", rncp: "RNCP n°40217", niveau: "niveau5", description: "Pilotez vos chantiers de construction", ordre: 1 },
    { id: 2, titre: "Chef de Chantier en Voirie et Réseaux Divers", rncp: "RNCP n°41368", niveau: "niveau5", description: "Gérez les travaux VRD", ordre: 2 },
    { id: 3, titre: "Chargé d'Affaires du Bâtiment", rncp: "RNCP n°35503", niveau: "niveau5", description: "Développez votre activité commerciale", ordre: 3 },
    { id: 4, titre: "Coordinateur BIM du Bâtiment", rncp: "RNCP n°39408", niveau: "niveau6", description: "Maîtrisez la maquette numérique", ordre: 4 },
    { id: 5, titre: "Conducteur de Travaux Voirie et Réseaux Divers", rncp: "RNCP n°39469", niveau: "niveau6", description: "Dirigez les projets VRD", ordre: 5 }
];
var defaultFormules = [
    {
        id: 1,
        titre: "VAE avec Accompagnement (Formule Complète)",
        description: "Un accompagnement individualisé tout au long de votre démarche VAE.",
        services: ["Analyse de votre parcours", "Aide à la rédaction du dossier", "Préparation au jury", "Suivi personnalisé"],
        heures: "Jusqu'à 20 heures d'accompagnement",
        prix: "4 500 € TTC (3 750 € HT)",
        modalites: "Présentiel, visio, téléphone et mail",
        ordre: 1
    },
    {
        id: 2,
        titre: "VAE sans Accompagnement (Formule Libre)",
        description: "Gérez votre démarche en autonomie avec notre support administratif.",
        services: ["Vérification de l'éligibilité", "Inscription au jury", "Informations administratives"],
        heures: "Suivi administratif uniquement",
        prix: "2 760 € TTC (2 300 € HT)",
        modalites: "Démarche en autonomie",
        ordre: 2
    }
];
var defaultFaqs = [
    { id: 1, question: "Quelle expérience est requise pour la VAE ?", reponse: "Vous devez justifier d'au moins 1 an d'expérience en lien direct avec la certification visée.", ordre: 1 },
    { id: 2, question: "Puis-je valider partiellement un titre ?", reponse: "Oui, vous pouvez valider un ou plusieurs CCP. Vous disposez d'1 an pour compléter les blocs manquants.", ordre: 2 },
    { id: 3, question: "Comment financer ma VAE ?", reponse: "CPF, financement employeur, OPCO ou autofinancement. Nous vous aidons à constituer votre dossier.", ordre: 3 }
];
// Composant FAQ Accordion
function FAQItem(_a) {
    var item = _a.item, isOpen = _a.isOpen, onClick = _a.onClick;
    return (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button onClick={onClick} className="w-full p-6 flex items-center justify-between text-left group">
        <span className="font-semibold text-gray-900 group-hover:text-primary-blue transition-colors pr-4">
          {item.question}
        </span>
        <div className={"w-8 h-8 rounded-full bg-primary-blue/10 flex items-center justify-center transition-transform duration-300 ".concat(isOpen ? 'rotate-180' : '')}>
          <ChevronDown className="w-5 h-5 text-primary-blue"/>
        </div>
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="px-6 pb-6 text-gray-600 leading-relaxed">{item.reponse}</p>
      </motion.div>
    </motion.div>);
}
export default function VAEBTPPage() {
    var _a = useState(defaultFormules), formules = _a[0], setFormules = _a[1];
    var _b = useState(defaultCertifications), certifications = _b[0], setCertifications = _b[1];
    var _c = useState(defaultAvantages), avantages = _c[0], setAvantages = _c[1];
    var _d = useState(defaultFaqs), faqs = _d[0], setFaqs = _d[1];
    var _e = useState(defaultPageData), page = _e[0], setPage = _e[1];
    var _f = useState(0), openFaq = _f[0], setOpenFaq = _f[1];
    var heroRef = useRef(null);
    var scrollYProgress = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    }).scrollYProgress;
    var heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    useEffect(function () {
        function loadVAEData() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, formulesData, certificationsData, avantagesData, faqsData, pageVAEData, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Promise.all([
                                    getVAEFormules(),
                                    getVAECertifications(),
                                    getVAEAvantages(),
                                    getVAEFaqs(),
                                    getPageVAE()
                                ])];
                        case 1:
                            _a = _b.sent(), formulesData = _a[0], certificationsData = _a[1], avantagesData = _a[2], faqsData = _a[3], pageVAEData = _a[4];
                            if (formulesData === null || formulesData === void 0 ? void 0 : formulesData.length)
                                setFormules(formulesData);
                            if (certificationsData === null || certificationsData === void 0 ? void 0 : certificationsData.length)
                                setCertifications(certificationsData);
                            if (avantagesData === null || avantagesData === void 0 ? void 0 : avantagesData.length)
                                setAvantages(avantagesData);
                            if (faqsData === null || faqsData === void 0 ? void 0 : faqsData.length)
                                setFaqs(faqsData);
                            if (pageVAEData)
                                setPage(__assign(__assign({}, defaultPageData), pageVAEData));
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _b.sent();
                            console.error('Erreur lors du chargement des données VAE:', error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        loadVAEData();
    }, []);
    // Grouper les certifications par niveau
    var certificationsByNiveau = certifications.reduce(function (acc, cert) {
        var niveauLabel = cert.niveau === 'niveau5' ? 'Niveau 5 (BAC+2)'
            : cert.niveau === 'niveau6' ? 'Niveau 6 (BAC+3)'
                : 'Niveau 7 (BAC+5)';
        if (!acc[niveauLabel])
            acc[niveauLabel] = [];
        acc[niveauLabel].push(cert);
        return acc;
    }, {});
    // Points clés depuis Strapi
    var pointsCles = [
        { icone: page.pointCle1Icone, titre: page.pointCle1Titre, desc: page.pointCle1Description },
        { icone: page.pointCle2Icone, titre: page.pointCle2Titre, desc: page.pointCle2Description },
        { icone: page.pointCle3Icone, titre: page.pointCle3Titre, desc: page.pointCle3Description }
    ];
    return (<PageLayout>
      {/* Hero Section - 100% modifiable via Strapi */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue via-blue-700 to-blue-900"/>
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)"/>
            </svg>
          </div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary-yellow/30 rounded-full blur-3xl"/>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-yellow/20 rounded-full blur-3xl"/>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-yellow/20 rounded-lg backdrop-blur-sm">
                  <FileCheck className="w-6 h-6 text-primary-yellow"/>
                </div>
                <span className="text-primary-yellow font-medium tracking-wide uppercase text-sm">
                  {page.heroSousTitre}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6 leading-tight">
                {page.heroTitre.split('expérience BTP').map(function (part, i) {
            return i === 0 ? <span key={i}>{part}<span className="text-primary-yellow">expérience BTP</span></span> : part;
        })}
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {page.heroDescription}
              </p>

              {/* Stats depuis Strapi */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary-yellow/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-yellow"/>
                  </div>
                  <div>
                    <div className="text-white font-bold">{page.statExperienceValeur}</div>
                    <div className="text-blue-200 text-sm">{page.statExperienceLabel}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary-yellow/20 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary-yellow"/>
                  </div>
                  <div>
                    <div className="text-white font-bold">{page.statCertificationsValeur}</div>
                    <div className="text-blue-200 text-sm">{page.statCertificationsLabel}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary-yellow/20 rounded-lg flex items-center justify-center">
                    <Euro className="w-5 h-5 text-primary-yellow"/>
                  </div>
                  <div>
                    <div className="text-white font-bold">{page.statFinancementValeur}</div>
                    <div className="text-blue-200 text-sm">{page.statFinancementLabel}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="group bg-primary-yellow text-primary-blue px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 hover:shadow-lg hover:shadow-primary-yellow/25 transition-all inline-flex items-center justify-center">
                  {page.heroBoutonPrincipal}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"/>
                </Link>
                <Link href="/brochure" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all text-center">
                  {page.heroBoutonSecondaire}
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary-yellow rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-primary-blue"/>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Certification RNCP</h3>
                      <p className="text-blue-200">Reconnue par l'État</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
            { icon: HardHat, text: "Conducteur de Travaux" },
            { icon: Building2, text: "Chargé d'Affaires Bâtiment" },
            { icon: Wrench, text: "Chef de Chantier VRD" }
        ].map(function (item, i) { return (<div key={i} className="flex items-center gap-3 text-blue-100">
                        <item.icon className="w-5 h-5 text-primary-yellow"/>
                        <span>{item.text}</span>
                      </div>); })}
                  </div>
                </div>

                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-4 bg-primary-yellow text-primary-blue px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {page.badgeTexte}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-white/50"/>
        </motion.div>
      </section>

      {/* Section Présentation - 100% Strapi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-primary-blue font-semibold text-sm uppercase tracking-wider">
                {page.sectionSousTitre}
              </span>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 mt-2 mb-6">
                {page.sectionTitre}
              </h2>
              
              <div className="prose prose-lg text-gray-600" dangerouslySetInnerHTML={{ __html: page.sectionDescription }}/>

              {/* Points clés depuis Strapi */}
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {pointsCles.map(function (item, i) { return (<div key={i} className="bg-primary-cream rounded-xl p-4 text-center border border-primary-yellow/30">
                    <div className="text-2xl mb-2">{item.icone}</div>
                    <div className="font-semibold text-primary-blue">{item.titre}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>); })}
              </div>
            </motion.div>

            {/* Avantages depuis Strapi */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-primary-blue to-blue-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-primary-yellow rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary-blue"/>
                </span>
                {page.avantagesTitre}
              </h3>
              <div className="space-y-4">
                {avantages.map(function (avantage, index) { return (<motion.div key={avantage.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-yellow/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary-yellow"/>
                    </div>
                    <span className="text-blue-100">{avantage.texte}</span>
                  </motion.div>); })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Certifications - 100% Strapi */}
      <section className="py-20 bg-primary-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-blue font-semibold text-sm uppercase tracking-wider">
              {page.certificationsSousTitre}
            </span>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 mt-2 mb-4">
              {page.certificationsTitre}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {page.certificationsDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(certificationsByNiveau).map(function (_a, niveauIndex) {
            var niveau = _a[0], certs = _a[1];
            return (<motion.div key={niveau} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: niveauIndex * 0.2 }} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className={"w-12 h-12 rounded-xl flex items-center justify-center ".concat(niveau.includes('5') ? 'bg-primary-blue/10' : 'bg-primary-yellow/30')}>
                    <GraduationCap className="w-6 h-6 text-primary-blue"/>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{niveau}</h3>
                    <p className="text-sm text-gray-500">Titre professionnel</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {certs.map(function (cert) { return (<div key={cert.id} className="group p-4 rounded-xl bg-gray-50 hover:bg-primary-blue/5 transition-colors border border-transparent hover:border-primary-blue/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-primary-blue transition-colors">
                            {cert.titre}
                          </h4>
                          <p className="text-sm text-primary-blue font-medium mt-1">{cert.rncp}</p>
                          {cert.description && (<p className="text-sm text-gray-500 mt-2">{cert.description}</p>)}
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-blue group-hover:translate-x-1 transition-all"/>
                      </div>
                    </div>); })}
                </div>
              </motion.div>);
        })}
          </div>

          {/* Note validation partielle depuis Strapi */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 bg-primary-yellow/20 border border-primary-yellow rounded-2xl p-6 flex items-start gap-4">
            <div className="text-2xl">⚠️</div>
            <div>
              <p className="font-semibold text-primary-blue">Validation partielle possible</p>
              <p className="text-gray-700 mt-1">{page.validationPartielleTexte}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Formules - 100% Strapi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-blue font-semibold text-sm uppercase tracking-wider">
              {page.formulesSousTitre}
            </span>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 mt-2 mb-4">
              {page.formulesTitre}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {page.formulesDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {formules.map(function (formule, index) {
            var _a;
            return (<motion.div key={formule.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className={"relative rounded-3xl overflow-hidden ".concat(index === 0
                    ? 'bg-gradient-to-br from-primary-blue via-blue-600 to-blue-700 text-white'
                    : 'bg-white border-2 border-gray-200')}>
                {index === 0 && (<div className="absolute top-4 right-4 bg-primary-yellow text-primary-blue px-3 py-1 rounded-full text-xs font-bold">
                    RECOMMANDÉ
                  </div>)}
                
                <div className="p-8">
                  <h3 className={"text-2xl font-bold mb-3 ".concat(index === 0 ? 'text-white' : 'text-gray-900')}>
                    {formule.titre}
                  </h3>
                  <p className={"mb-6 ".concat(index === 0 ? 'text-blue-100' : 'text-gray-600')}>
                    {formule.description}
                  </p>
                  
                  <div className={"text-3xl font-bold mb-2 ".concat(index === 0 ? 'text-primary-yellow' : 'text-primary-blue')}>
                    {formule.prix}
                  </div>
                  <p className={"text-sm mb-6 ".concat(index === 0 ? 'text-blue-200' : 'text-gray-500')}>
                    {formule.heures}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {(_a = formule.services) === null || _a === void 0 ? void 0 : _a.map(function (service, i) { return (<div key={i} className="flex items-start gap-3">
                        <CheckCircle className={"w-5 h-5 flex-shrink-0 mt-0.5 ".concat(index === 0 ? 'text-primary-yellow' : 'text-primary-blue')}/>
                        <span className={index === 0 ? 'text-blue-100' : 'text-gray-700'}>
                          {service}
                        </span>
                      </div>); })}
                  </div>
                  
                  <div className={"text-sm mb-6 ".concat(index === 0 ? 'text-blue-200' : 'text-gray-500')}>
                    <strong>Modalités :</strong> {formule.modalites}
                  </div>
                  
                  <Link href="/contact" className={"block w-full py-4 rounded-xl font-semibold text-center transition-all ".concat(index === 0
                    ? 'bg-primary-yellow text-primary-blue hover:bg-yellow-300'
                    : 'bg-primary-blue text-white hover:bg-blue-700')}>
                    Choisir cette formule
                  </Link>
                </div>
              </motion.div>);
        })}
          </div>

          {/* Financement depuis Strapi */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-primary-cream text-primary-blue px-6 py-3 rounded-full border border-primary-yellow/50">
              <Euro className="w-5 h-5"/>
              <span className="font-medium">{page.financementTexte}</span>
            </div>
            <p className="text-gray-500 mt-3">{page.financementSousTexte}</p>
          </motion.div>
        </div>
      </section>

      {/* Section FAQ - 100% Strapi */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-primary-blue font-semibold text-sm uppercase tracking-wider">
              {page.faqSousTitre}
            </span>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 mt-2 mb-4">
              {page.faqTitre}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map(function (faq, index) { return (<FAQItem key={faq.id} item={faq} isOpen={openFaq === index} onClick={function () { return setOpenFaq(openFaq === index ? null : index); }}/>); })}
          </div>
        </div>
      </section>

      {/* CTA Final - 100% Strapi */}
      <section className="py-20 bg-gradient-to-br from-primary-blue via-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-yellow/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"/>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-yellow/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"/>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6">
              {page.ctaTitre}
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              {page.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="group bg-primary-yellow text-primary-blue px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition-all inline-flex items-center justify-center">
                {page.ctaBoutonPrincipal}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"/>
              </Link>
              <Link href={"tel:".concat(page.ctaTelephone)} className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all text-center">
                {page.ctaBoutonSecondaire}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>);
}
