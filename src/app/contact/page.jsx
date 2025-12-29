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
import { getSiteSettings, getContactInfo, getProcessusAdmission, getPartners, getFormations } from '@/lib/strapi';
import { Phone, Mail, MapPin, Clock, CheckCircle, UserPlus } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
var AdmissionStep = function (_a) {
    var step = _a.step, index = _a.index;
    return (<motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex items-start space-x-4">
    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold">{step.etape}</span>
    </div>
    <div>
      <h3 className="text-xl font-montserrat font-bold text-primary-blue mb-2">
        {step.titre}
      </h3>
      <p className="text-gray-600 mb-2">{step.description}</p>
      {step.detail && <p className="text-sm text-gray-500">{step.detail}</p>}
    </div>
  </motion.div>);
};
export default function ContactPage() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f;
    var form = useRef(null);
    var _g = useState(false), isLoading = _g[0], setIsLoading = _g[1];
    var _h = useState(null), siteSettings = _h[0], setSiteSettings = _h[1];
    var _j = useState(null), contactInfo = _j[0], setContactInfo = _j[1];
    var _k = useState([]), admissionSteps = _k[0], setAdmissionSteps = _k[1];
    var _l = useState([]), partners = _l[0], setPartners = _l[1];
    var _m = useState([]), formations = _m[0], setFormations = _m[1];
    var _o = useState(true), loading = _o[0], setLoading = _o[1];
    useEffect(function () {
        function loadContactData() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, settingsData, contactData, stepsData, partnersData, formationsData, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, Promise.all([
                                    getSiteSettings(),
                                    getContactInfo(),
                                    getProcessusAdmission(),
                                    getPartners(),
                                    getFormations()
                                ])];
                        case 1:
                            _a = _b.sent(), settingsData = _a[0], contactData = _a[1], stepsData = _a[2], partnersData = _a[3], formationsData = _a[4];
                            setSiteSettings(settingsData);
                            setContactInfo(contactData);
                            setAdmissionSteps(stepsData);
                            setPartners(partnersData);
                            setFormations(formationsData);
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _b.sent();
                            console.error('Erreur chargement contact:', error_1);
                            // Fallback avec données statiques
                            setSiteSettings({
                                id: 1,
                                siteName: 'Construction Management Academy',
                                contactPhone: '01 89 70 60 52',
                                contactEmail: 'contact.academy@construction-management-academy.fr',
                                inscriptionEmail: 'inscription.academy@construction-management-academy.fr'
                            });
                            setAdmissionSteps([
                                {
                                    id: 1,
                                    titre: "Candidature en ligne",
                                    description: "Remplissez le formulaire de candidature",
                                    detail: "Processus simplifié en 5 minutes",
                                    etape: 1,
                                    ordre: 1
                                },
                                {
                                    id: 2,
                                    titre: "Entretien de motivation",
                                    description: "Échange avec notre équipe pédagogique",
                                    detail: "Entretien personnalisé de 30 minutes",
                                    etape: 2,
                                    ordre: 2
                                }
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
        loadContactData();
    }, []);
    var sendEmail = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!form.current)
                        return [2 /*return*/];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, emailjs.sendForm('service_cma2026', 'template_n27932h', form.current, 'tdRwM2nw_IxILeGS-')];
                case 2:
                    _a.sent();
                    alert('✅ Candidature envoyée avec succès ! Nous vous recontacterons sous 24h.');
                    form.current.reset();
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Erreur EmailJS:', error_2);
                    alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Organiser les formations par catégorie pour le select
    var formationsByCategory = formations.reduce(function (acc, formation) {
        var _a;
        var categoryName = ((_a = formation.category) === null || _a === void 0 ? void 0 : _a.nom) || 'Autres formations';
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(formation);
        return acc;
    }, {});
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
      {/* Hero */}
      <section className="py-96 text-white relative">
        <div className="absolute inset-0 opacity-100">
          <img src="/images/rejoignez-hero.jpg" alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 className="text-5xl md:text-6xl font-montserrat font-bold mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            Rejoignez {(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.siteName) || 'Construction Management Academy'} !
          </motion.h1>
          <motion.p className="text-xl opacity-90 max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Processus d'admission simplifié, sans concours d'entrée. 
            L'admission se fait uniquement sur entretien de motivation.
          </motion.p>
        </div>
        </div>
      </section>

        {/* Parcours d'admission */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-montserrat font-bold text-primary-blue mb-6">
                Parcours d'admission {(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.siteName) || 'Construction Management Academy'}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Un processus simplifié en {admissionSteps.length} étapes pour intégrer nos formations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {admissionSteps.map(function (step, index) { return (<AdmissionStep key={step.id} step={step} index={index}/>); })}
            </div>
          </div>
        </section>

        {/* Nos partenaires de confiance */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-montserrat font-bold text-primary-blue mb-6">
                Nos partenaires de confiance
              </h2>
              <p className="text-xl text-gray-600">
                Des entreprises leaders qui recrutent nos diplômés
              </p>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
              {partners.slice(0, 12).map(function (partner, index) { return (<motion.div key={partner.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24 group">
                  <img src={partner.logo ? "/images/partners/".concat(partner.logo) : "/images/partners/default.webp"} alt={partner.nom} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" onError={function (e) {
                console.error("Failed to load partner logo: ".concat(partner.logo));
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = "<div class=\"text-xs font-bold text-gray-600 text-center\">".concat(partner.nom, "</div>");
            }}/>
                </motion.div>); })}
            </div>
          </div>
        </section>

        {/* Contact & Formulaire */}
        <section className="py-20 bg-white relative">
          <div className="absolute inset-0 opacity-30">
            <img src="/images/contact-hero.jpg" alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Informations de contact */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="relative mb-8">
                  <img src="/images/contact-hero.jpg" alt="Construction Management Academy - Contactez-nous" className="w-full h-48 object-cover rounded-2xl shadow-lg"/>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/80 to-transparent rounded-2xl flex items-center">
                    <h2 className="text-3xl font-montserrat font-bold text-white ml-8">
                      Contactez-nous
                    </h2>
                  </div>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white"/>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-blue mb-1">Adresse</h3>
                      <p className="text-gray-600">
                        {(contactInfo === null || contactInfo === void 0 ? void 0 : contactInfo.adressePrincipale) ?
            "".concat(contactInfo.adressePrincipale.rue, ", ").concat(contactInfo.adressePrincipale.codePostal, " ").concat(contactInfo.adressePrincipale.ville) :
            '123 Avenue de la Construction, 75001 Paris'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white"/>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-blue mb-1">Téléphone</h3>
                      <p className="text-gray-600">
                        {((_b = (_a = contactInfo === null || contactInfo === void 0 ? void 0 : contactInfo.telephones) === null || _a === void 0 ? void 0 : _a.find(function (t) { return t.principal; })) === null || _b === void 0 ? void 0 : _b.numero) ||
            (siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.contactPhone) ||
            '01 89 70 60 52'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white"/>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-blue mb-1">Email</h3>
                      <p className="text-gray-600">
                        {((_d = (_c = contactInfo === null || contactInfo === void 0 ? void 0 : contactInfo.emails) === null || _c === void 0 ? void 0 : _c.find(function (e) { return e.type === 'contact'; })) === null || _d === void 0 ? void 0 : _d.email) ||
            (siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.contactEmail) ||
            'contact.academy@construction-management-academy.fr'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-white"/>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-blue mb-1">Inscription</h3>
                      <p className="text-gray-600">
                        {((_f = (_e = contactInfo === null || contactInfo === void 0 ? void 0 : contactInfo.emails) === null || _e === void 0 ? void 0 : _e.find(function (e) { return e.type === 'inscription'; })) === null || _f === void 0 ? void 0 : _f.email) ||
            (siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.inscriptionEmail) ||
            'inscription.academy@construction-management-academy.fr'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white"/>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-blue mb-1">Réactivité</h3>
                      <p className="text-gray-600">Réponse sous 24h</p>
                      <p className="text-sm text-gray-500">Décision sous 48h après entretien</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-blue text-white p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <CheckCircle className="w-6 h-6 text-primary-yellow"/>
                    <h3 className="font-semibold">Aucun frais de scolarité</h3>
                  </div>
                  <p className="opacity-90">
                    Aucun frais de scolarité ou d'inscription ne sera demandé à l'alternant.
                  </p>
                </div>
              </motion.div>

              {/* Formulaire */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-montserrat font-bold text-primary-blue mb-6">
                  Formulaire d'inscription
                </h3>
                
                <form ref={form} className="space-y-6" onSubmit={sendEmail}>
                  {/* Champs cachés pour EmailJS */}
                  <input type="hidden" name="to_email" value={(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.inscriptionEmail) || "inscription.academy@construction-management-academy.fr"}/>
                  <input type="hidden" name="from_name" value={"Site Web ".concat((siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.siteName) || 'Construction Management Academy')}/>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" name="prenom" placeholder="Prénom *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-blue" required/>
                    <input type="text" name="nom" placeholder="Nom *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-blue" required/>
                  </div>
                  
                  <input type="date" name="dateNaissance" placeholder="Date de naissance *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-blue" required/>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="tel" name="telephone" placeholder="Téléphone *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-blue" required/>
                    <input type="email" name="email" placeholder="Email *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-blue" required/>
                  </div>
                  
                  <input type="text" name="codePostal" placeholder="Code postal *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-blue" required/>
                  
                  <select name="formation" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-blue" required>
                    <option value="">Sélectionner la Formation *</option>
                    
                    {Object.entries(formationsByCategory).map(function (_a) {
            var categoryName = _a[0], categoryFormations = _a[1];
            return (<optgroup key={categoryName} label={categoryName}>
                        {categoryFormations.map(function (formation) { return (<option key={formation.id} value={formation.slug}>
                            {formation.titre} {formation.niveau && "- ".concat(formation.niveau)}
                          </option>); })}
                      </optgroup>);
        })}
                    
                    {/* Fallback si pas de formations Strapi */}
                    {Object.keys(formationsByCategory).length === 0 && (<>
                        <optgroup label="🎓 FORMATIONS EN ALTERNANCE">
                          <option value="conducteur-travaux-batiment-alternance">Conducteur de Travaux Bâtiment - Bac+3 (Alternance)</option>
                          <option value="charge-affaires-batiment-alternance">Chargé d'Affaires Bâtiment - Bac+3 (Alternance)</option>
                        </optgroup>
                        <optgroup label="🔄 FORMATIONS RECONVERSION">
                          <option value="conducteur-travaux-reconversion">Conducteur de Travaux - Reconversion (7 mois)</option>
                          <option value="charge-affaires-reconversion">Chargé d'Affaires - Reconversion (6 mois)</option>
                        </optgroup>
                      </>)}
                  </select>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléverser votre CV
                      </label>
                      <input type="file" name="cv" accept=".pdf,.doc,.docx" className="w-full"/>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléverser votre dernier diplôme
                      </label>
                      <input type="file" name="diplome" accept=".pdf,.jpg,.png" className="w-full"/>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <input type="checkbox" id="consent" className="mt-1" required/>
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      J'accepte être recontacté et que mes données soient collectées par {(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.siteName) || 'Construction Management Academy'}
                    </label>
                  </div>
                  
                  <a href="https://cma-education.ymag.cloud/index.php/preinscription/" target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 text-center">
                    Accéder à la préinscription
                  </a>
                </form>
              </motion.div>
            </div>
          </div>
          </div>
        </section>
    </PageLayout>);
}
