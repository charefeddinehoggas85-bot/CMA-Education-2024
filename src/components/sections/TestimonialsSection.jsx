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
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getTestimonials } from '@/lib/strapi';
var TestimonialsSection = function () {
    var router = useRouter();
    var _a = useState([]), testimonials = _a[0], setTestimonials = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    useEffect(function () {
        function loadTestimonials() {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, getTestimonials()];
                        case 1:
                            data = _a.sent();
                            setTestimonials(data);
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Error loading testimonials:', error_1);
                            return [3 /*break*/, 4];
                        case 3:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        loadTestimonials();
    }, []);
    var handleCandidater = function () {
        window.open('https://construction-management-academy.ymag.cloud/index.php/preinscription/', '_blank');
    };
    // Fallback testimonials si Strapi ne répond pas
    var fallbackTestimonials = [
        {
            id: 1,
            name: "Marie Dubois",
            position: "Conductrice de Travaux",
            company: "Bouygues Construction",
            content: "La formation Construction Management Academy m'a donné toutes les clés pour réussir dans le BTP. L'approche pratique et les technologies modernes comme le BIM m'ont permis d'être opérationnelle dès mon premier poste.",
            rating: 5
        },
        {
            id: 2,
            name: "Thomas Martin",
            position: "Chef de Projet BIM",
            company: "Vinci Construction",
            content: "Grâce à Construction Management Academy, j'ai pu me spécialiser dans le digital et le BIM. Les formateurs sont des professionnels du secteur qui transmettent leur passion et leur expertise.",
            rating: 5
        },
        {
            id: 3,
            name: "Sarah Johnson",
            position: "Responsable Développement Durable",
            company: "Eiffage",
            content: "La formation en construction durable de Construction Management Academy est unique. Elle m'a permis de devenir experte en bâtiments écologiques et de contribuer à un BTP plus responsable.",
            rating: 5
        }
    ];
    var displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;
    return (<section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-primary-blue mb-6">
            Ils Témoignent
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Découvrez les parcours inspirants de nos anciens étudiants qui excellent aujourd'hui dans leurs carrières BTP.
          </p>
        </motion.div>

        {/* Loading */}
        {loading ? (<div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des témoignages...</p>
          </div>) : (
        /* Testimonials Grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials.map(function (testimonial, index) { return (<motion.div key={testimonial.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary-yellow/20 group-hover:text-primary-yellow/40 transition-colors duration-300">
                  <Quote className="w-12 h-12"/>
                </div>

                {/* Profile */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-blue to-primary-yellow mr-4 flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-blue text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                    {testimonial.company && (<p className="text-primary-yellow text-sm font-semibold">{testimonial.company}</p>)}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {__spreadArray([], Array(testimonial.rating), true).map(function (_, i) { return (<Star key={i} className="w-5 h-5 text-primary-yellow fill-current"/>); })}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"/>
              </motion.div>); })}
          </div>)}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-blue to-primary-blue/80 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Rejoignez-les !</h3>
            <p className="text-lg mb-6 text-gray-200">
              Commencez votre parcours vers une carrière réussie dans le BTP
            </p>
            <button onClick={handleCandidater} className="bg-primary-yellow text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105">
              Candidater maintenant
            </button>
          </div>
        </motion.div>
      </div>
    </section>);
};
export default TestimonialsSection;
