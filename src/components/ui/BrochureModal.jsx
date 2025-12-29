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
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, User, Building, Mail, Phone, FileText, Leaf } from 'lucide-react';
import { generateBrochurePDF } from '@/lib/pdf-generator';
import { sendBrochureNotification } from '@/lib/simple-email';
export default function BrochureModal(_a) {
    var _this = this;
    var isOpen = _a.isOpen, onClose = _a.onClose, formation = _a.formation;
    var _b = useState({
        nom: '',
        prenom: '',
        type: '',
        email: '',
        telephone: ''
    }), formData = _b[0], setFormData = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(false), isSuccess = _d[0], setIsSuccess = _d[1];
    if (!formation)
        return null;
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var emailData, emailResult, brochureUrl, link, pdfBlob, url, a, error_1, errorMessage;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    e.preventDefault();
                    setIsLoading(true);
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 6, 7, 8]);
                    emailData = {
                        formation: {
                            id: formation.id,
                            title: formation.title,
                            level: formation.level,
                            slug: formation.slug
                        },
                        user: {
                            nom: formData.nom,
                            prenom: formData.prenom,
                            type: formData.type,
                            email: formData.email,
                            telephone: formData.telephone
                        },
                        brochureType: (formation.brochure || ((_a = formation.brochureData) === null || _a === void 0 ? void 0 : _a.data)) ? 'Brochure Strapi PDF' : 'Brochure générée dynamiquement',
                        pageUrl: window.location.href
                    };
                    // Envoyer la notification email en premier
                    console.log('📧 Envoi de la notification email...');
                    return [4 /*yield*/, sendBrochureNotification(emailData)];
                case 2:
                    emailResult = _f.sent();
                    if (!emailResult.success) {
                        console.warn('⚠️ Échec de l\'envoi email:', emailResult.error);
                        // On continue quand même avec le téléchargement
                    }
                    else {
                        console.log('✅ Email de notification envoyé avec succès');
                    }
                    // Procéder au téléchargement de la brochure
                    console.log('📄 Génération de la brochure...');
                    if (!(((_b = formation.brochure) === null || _b === void 0 ? void 0 : _b.data) || formation.brochure)) return [3 /*break*/, 3];
                    brochureUrl = '';
                    if ((_e = (_d = (_c = formation.brochure) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.attributes) === null || _e === void 0 ? void 0 : _e.url) {
                        // Structure Strapi complète: formation.brochure.data.attributes.url
                        brochureUrl = "".concat(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').concat(formation.brochure.data.attributes.url);
                    }
                    else if (typeof formation.brochure === 'string') {
                        // Si brochure est déjà une URL string
                        brochureUrl = formation.brochure;
                    }
                    else {
                        console.error('Structure de brochure:', formation.brochure);
                        throw new Error('Structure de brochure non supportée');
                    }
                    link = document.createElement('a');
                    link.href = brochureUrl;
                    link.download = "brochure-".concat(formation.slug, "-").concat(formData.nom, "-").concat(formData.prenom, ".pdf");
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, generateBrochurePDF(formation, formData)];
                case 4:
                    pdfBlob = _f.sent();
                    url = URL.createObjectURL(pdfBlob);
                    a = document.createElement('a');
                    a.href = url;
                    a.download = "brochure-".concat(formation.id, "-").concat(formData.nom, "-").concat(formData.prenom, ".pdf");
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    _f.label = 5;
                case 5:
                    console.log('✅ Brochure téléchargée avec succès');
                    setIsSuccess(true);
                    setTimeout(function () {
                        onClose();
                        setIsSuccess(false);
                        setFormData({ nom: '', prenom: '', type: '', email: '', telephone: '' });
                    }, 3000);
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _f.sent();
                    console.error('❌ Erreur:', error_1);
                    errorMessage = error_1 instanceof Error ? error_1.message : 'Erreur inconnue';
                    alert('Erreur lors du téléchargement: ' + errorMessage);
                    return [3 /*break*/, 8];
                case 7:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return (<AnimatePresence>
      {isOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden" onClick={function (e) { return e.stopPropagation(); }}>
            {isSuccess ? (<div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-600"/>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Brochure téléchargée !</h3>
                <p className="text-gray-600 mb-4">Votre brochure a été générée et téléchargée avec succès.</p>
                <div className="flex items-center justify-center space-x-2 text-green-600 text-sm">
                  <Leaf className="w-4 h-4"/>
                  <span>Merci de préserver l'environnement en évitant l'impression</span>
                </div>
              </div>) : (<>
                <div className="bg-gradient-to-r from-primary-blue to-indigo-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Download className="w-5 h-5"/>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Télécharger la brochure</h2>
                        <p className="text-white/80 text-sm">{formation.title}</p>
                      </div>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white">
                      <X className="w-6 h-6"/>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1"/>
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
                      <p>Cette brochure est générée numériquement. Nous vous encourageons à la consulter en ligne pour préserver l'environnement.</p>
                    </div>
                  </div>

                  <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-primary-blue to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2">
                    {isLoading ? (<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>) : (<>
                        <Download className="w-5 h-5"/>
                        <span>Générer et télécharger</span>
                      </>)}
                  </button>
                </form>
              </>)}
          </motion.div>
        </motion.div>)}
    </AnimatePresence>);
}
