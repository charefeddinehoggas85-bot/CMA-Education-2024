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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { getTestimonials, getPartners } from '@/lib/strapi';
var SocialProofSection = function () {
    var _a = useState([
        {
            id: 1,
            nom: "Thomas Martin",
            poste: "Conducteur de travaux",
            entreprise: "Bouygues Construction",
            commentaire: "Construction Management Academy m'a donné toutes les clés pour réussir. Formation terrain exceptionnelle !",
            note: 5,
            photo: "/images/testimonials/thomas-martin.svg",
            featured: true
        },
        {
            id: 2,
            nom: "Sarah Johnson",
            poste: "Chef de projet BIM",
            entreprise: "Vinci Construction",
            commentaire: "18 mois qui ont transformé ma carrière. Emploi trouvé avant même la fin !",
            note: 5,
            photo: "/images/testimonials/sarah-johnson.svg",
            featured: true
        },
        {
            id: 3,
            nom: "Marie Dubois",
            poste: "Responsable QSE",
            entreprise: "Eiffage",
            commentaire: "Pédagogie innovante et formateurs experts. Je recommande à 100% !",
            note: 5,
            photo: "/images/testimonials/marie-dubois.svg",
            featured: true
        }
    ]), testimonials = _a[0], setTestimonials = _a[1];
    var _b = useState([
        { id: 1, nom: "Eiffage", logo: "eiffage.webp", featured: true },
        { id: 2, nom: "NGE", logo: "nge.webp", featured: true },
        { id: 3, nom: "Leon Grosse", logo: "LEON GROSSE.webp", featured: true },
        { id: 4, nom: "GS Construction", logo: "GS Construction.webp", featured: true },
        { id: 5, nom: "Coredif", logo: "COREDIF.webp", featured: true },
        { id: 6, nom: "GCC", logo: "gcc.webp", featured: true }
    ]), partners = _b[0], setPartners = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1]; // Pas de loading, affichage immédiat
    useEffect(function () {
        function loadSocialProofData() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, testimonialsData, partnersData, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Promise.all([
                                    getTestimonials(),
                                    getPartners()
                                ])];
                        case 1:
                            _a = _b.sent(), testimonialsData = _a[0], partnersData = _a[1];
                            if (testimonialsData && Array.isArray(testimonialsData) && testimonialsData.length > 0) {
                                setTestimonials(testimonialsData);
                            }
                            if (partnersData && Array.isArray(partnersData) && partnersData.length > 0) {
                                setPartners(partnersData);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _b.sent();
                            console.error('Strapi non disponible, utilisation des données statiques');
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        loadSocialProofData();
    }, []);
    // Calculer la note moyenne
    var averageRating = testimonials.length > 0
        ? (testimonials.reduce(function (sum, t) { return sum + t.note; }, 0) / testimonials.length).toFixed(1)
        : "4.9";
    if (loading) {
        return (<section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map(function (i) { return (<div key={i} className="animate-pulse bg-gray-50 p-6 rounded-2xl">
                <div className="bg-gray-200 w-8 h-8 rounded mb-4"></div>
                <div className="bg-gray-200 h-20 w-full rounded mb-6"></div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 w-12 h-12 rounded-full"></div>
                  <div className="flex-1">
                    <div className="bg-gray-200 h-4 w-32 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 w-24 rounded"></div>
                  </div>
                </div>
              </div>); })}
          </div>
        </div>
      </section>);
    }
    return (<section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        


        {/* Testimonials dynamiques */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.filter(function (t) { return t.featured; }).slice(0, 3).map(function (testimonial, index) { return (<motion.div key={testimonial.id} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} whileHover={{ y: -5 }}>
              <Quote className="w-8 h-8 text-primary-yellow mb-4"/>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.commentaire || 'Commentaire non disponible'}"
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {testimonial.photo && typeof testimonial.photo === 'string' && testimonial.photo.endsWith('.svg') ? (<img src={testimonial.photo} alt={testimonial.nom} className="w-full h-full object-cover rounded-full" onError={function (e) {
                    console.error("Failed to load testimonial photo: ".concat(testimonial.photo));
                    e.currentTarget.style.display = 'none';
                    var fallbackInitial = testimonial.nom && typeof testimonial.nom === 'string' ? testimonial.nom.charAt(0) : '?';
                    e.currentTarget.parentElement.innerHTML = "<div class=\"w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center text-white font-bold\">".concat(fallbackInitial, "</div>");
                }}/>) : (<div className="w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center text-white font-bold">
                      {testimonial.nom && typeof testimonial.nom === 'string' ? testimonial.nom.charAt(0) : '?'}
                    </div>)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.nom || 'Anonyme'}</h4>
                  <p className="text-sm text-gray-600">{testimonial.poste || 'Poste non spécifié'}</p>
                  <p className="text-xs text-primary-blue font-medium">{testimonial.entreprise || 'Entreprise'}</p>
                </div>
              </div>
              
              <div className="flex mt-4">
                {__spreadArray([], Array(testimonial.note || 5), true).map(function (_, i) { return (<Star key={i} className="w-4 h-4 text-yellow-400 fill-current"/>); })}
              </div>
            </motion.div>); })}
        </div>

        {/* Company Logos dynamiques */}
        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-gray-600 mb-8 text-lg">
            Nos diplômés travaillent dans les plus grandes entreprises du BTP
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {partners.slice(0, 6).map(function (partner, index) { return (<motion.div key={partner.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24 group">
                <img src={partner.logo ? "/images/partners/".concat(partner.logo) : "/images/partners/default.webp"} alt={partner.nom || 'Partenaire'} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" onError={function (e) {
                console.error("Failed to load partner logo: ".concat(partner.logo));
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = "<div class=\"text-xs font-bold text-gray-600 text-center\">".concat(partner.nom || 'Partenaire', "</div>");
            }}/>
              </motion.div>); })}
          </div>
        </motion.div>
      </div>
    </section>);
};
export default SocialProofSection;
