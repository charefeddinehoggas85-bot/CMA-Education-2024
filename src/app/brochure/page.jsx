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
import { Download, FileText, User, Building, Mail, Phone, CheckCircle, Leaf } from 'lucide-react';
import { getFormations } from '@/lib/strapi';
import emailjs from '@emailjs/browser';
export default function BrochurePage() {
    var _this = this;
    var _a = useState([]), formations = _a[0], setFormations = _a[1];
    var _b = useState(null), selectedFormation = _b[0], setSelectedFormation = _b[1];
    var _c = useState({
        nom: '',
        prenom: '',
        type: '',
        email: '',
        telephone: ''
    }), formData = _c[0], setFormData = _c[1];
    var _d = useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var _e = useState(false), isSuccess = _e[0], setIsSuccess = _e[1];
    useEffect(function () {
        function loadFormations() {
            return __awaiter(this, void 0, void 0, function () {
                var data, formationsWithBrochures, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, getFormations()
                                // Filtrer seulement les formations avec brochures
                            ];
                        case 1:
                            data = _a.sent();
                            formationsWithBrochures = data.filter(function (f) { var _a; return f.brochure || ((_a = f.brochureData) === null || _a === void 0 ? void 0 : _a.data); });
                            setFormations(formationsWithBrochures);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Erreur chargement formations:', error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        loadFormations();
    }, []);
    var handleDownload = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var brochureUrl, link, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!selectedFormation)
                        return [2 /*return*/];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    brochureUrl = selectedFormation.brochure ||
                        "".concat(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').concat(selectedFormation.brochureData.data.attributes.url);
                    link = document.createElement('a');
                    link.href = brochureUrl;
                    link.download = "brochure-".concat(selectedFormation.slug, "-").concat(formData.nom, "-").concat(formData.prenom, ".pdf");
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    // Envoyer les données par EmailJS
                    return [4 /*yield*/, emailjs.send('service_cma2026', 'template_n27932h', {
                            to_email: 'contact.academy@cma-education.com',
                            formation_title: selectedFormation.title,
                            formation_id: selectedFormation.id,
                            user_nom: formData.nom,
                            user_prenom: formData.prenom,
                            user_type: formData.type,
                            user_email: formData.email,
                            user_telephone: formData.telephone,
                            date: new Date().toLocaleDateString('fr-FR'),
                            brochure_type: 'Strapi PDF'
                        }, 'tdRwM2nw_IxILeGS-')];
                case 2:
                    // Envoyer les données par EmailJS
                    _a.sent();
                    setIsSuccess(true);
                    setTimeout(function () {
                        setIsSuccess(false);
                        setFormData({ nom: '', prenom: '', type: '', email: '', telephone: '' });
                        setSelectedFormation(null);
                    }, 3000);
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Erreur téléchargement:', error_2);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<PageLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-blue via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Download className="w-5 h-5"/>
              <span className="text-sm font-medium">Brochures Formations</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              Télécharger nos brochures
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Découvrez en détail nos formations BTP certifiantes. Téléchargez gratuitement les brochures de nos programmes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSuccess ? (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600"/>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Brochure téléchargée !</h2>
              <p className="text-gray-600 mb-6">
                Votre brochure a été téléchargée avec succès. Vous devriez également recevoir un email de confirmation.
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Leaf className="w-4 h-4"/>
                <span className="text-sm">Merci de préserver l'environnement en évitant l'impression</span>
              </div>
            </motion.div>) : (<div className="grid md:grid-cols-2 gap-8">
              {/* Sélection de formation */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-primary-blue mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2"/>
                  Choisir une formation
                </h2>
                
                <div className="space-y-3">
                  {formations.map(function (formation) { return (<button key={formation.id} onClick={function () { return setSelectedFormation(formation); }} className={"w-full text-left p-4 rounded-lg border-2 transition-all ".concat((selectedFormation === null || selectedFormation === void 0 ? void 0 : selectedFormation.id) === formation.id
                    ? 'border-primary-blue bg-blue-50'
                    : 'border-gray-200 hover:border-primary-blue/50')}>
                      <div className="font-medium text-gray-800">{formation.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Brochure PDF disponible
                      </div>
                    </button>); })}
                </div>
                
                {formations.length === 0 && (<div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50"/>
                    <p>Chargement des formations...</p>
                  </div>)}
              </motion.div>

              {/* Formulaire */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-primary-blue mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2"/>
                  Vos informations
                </h2>

                {selectedFormation ? (<form onSubmit={handleDownload} className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-700">
                        <strong>Formation sélectionnée :</strong><br />
                        {selectedFormation.title}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom *
                        </label>
                        <input type="text" required value={formData.prenom} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { prenom: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom *
                        </label>
                        <input type="text" required value={formData.nom} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { nom: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"/>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building className="w-4 h-4 inline mr-1"/>
                        Profil *
                      </label>
                      <select required value={formData.type} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { type: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent">
                        <option value="">Sélectionnez votre profil</option>
                        <option value="etudiant">Étudiant</option>
                        <option value="entreprise">Entreprise</option>
                        <option value="particulier">Particulier</option>
                        <option value="demandeur-emploi">Demandeur d'emploi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1"/>
                        Email *
                      </label>
                      <input type="email" required value={formData.email} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { email: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"/>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1"/>
                        Téléphone *
                      </label>
                      <input type="tel" required value={formData.telephone} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { telephone: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"/>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 flex items-start space-x-3">
                      <Leaf className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"/>
                      <div className="text-sm text-green-700">
                        <p className="font-medium mb-1">Engagement environnemental</p>
                        <p>Cette brochure est un document numérique. Nous vous encourageons à la consulter en ligne.</p>
                      </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-primary-blue to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2">
                      {isLoading ? (<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>) : (<>
                          <Download className="w-5 h-5"/>
                          <span>Télécharger la brochure</span>
                        </>)}
                    </button>
                  </form>) : (<div className="text-center py-12 text-gray-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50"/>
                    <p>Sélectionnez d'abord une formation</p>
                  </div>)}
              </motion.div>
            </div>)}
        </div>
      </section>
    </PageLayout>);
}
