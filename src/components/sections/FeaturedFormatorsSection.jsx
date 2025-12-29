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
import { ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';
import { getFormateurs } from '@/lib/strapi';
import { getStrapiMediaURL } from '@/lib/strapi';
var FeaturedFormatorsSection = function () {
    var _a = useState([]), formateurs = _a[0], setFormateurs = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    useEffect(function () {
        function loadFormateurs() {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, getFormateurs()];
                        case 1:
                            data = _a.sent();
                            if (data && Array.isArray(data)) {
                                setFormateurs(data.slice(0, 4));
                            }
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Erreur chargement formateurs:', error_1);
                            return [3 /*break*/, 4];
                        case 3:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        loadFormateurs();
    }, []);
    if (loading) {
        return (<section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse bg-gray-200 h-12 w-96 mx-auto rounded mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-2/3 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(function (i) { return (<div key={i} className="animate-pulse bg-gray-100 rounded-2xl p-6 h-80"></div>); })}
          </div>
        </div>
      </section>);
    }
    return (<section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-primary-blue"/>
            <span className="text-sm font-semibold text-primary-blue uppercase tracking-wider">Notre Équipe</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-gray-900 mb-4">
            Nos Formateurs d'Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des experts du BTP passionnés par la transmission de savoir et l'accompagnement de vos projets
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {formateurs.map(function (formateur, index) {
            var _a, _b, _c;
            return (<motion.div key={formateur.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="group text-center">
              {/* Avatar Container */}
              <div className="relative mb-6 inline-block">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary-blue shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  {formateur.photo && getStrapiMediaURL(formateur.photo) ? (<img src={getStrapiMediaURL(formateur.photo) || ''} alt={"".concat(formateur.prenom, " ").concat(formateur.nom)} className="w-full h-full object-cover"/>) : (<div className="w-full h-full bg-gradient-to-br from-primary-blue to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                      {(_a = formateur.prenom) === null || _a === void 0 ? void 0 : _a[0]}{(_b = formateur.nom) === null || _b === void 0 ? void 0 : _b[0]}
                    </div>)}
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-primary-yellow opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
              </div>

              {/* Content */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 group-hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {formateur.prenom} {formateur.nom}
                </h3>
                
                <p className="text-primary-blue font-semibold text-sm mb-3">
                  {formateur.specialite}
                </p>

                {formateur.bio && (<p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {(_c = formateur.bio) !== null && _c !== void 0 ? _c : ''}
                  </p>)}

                {/* Expertise Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-primary-blue font-semibold">
                  <span className="w-2 h-2 bg-primary-yellow rounded-full"></span>
                  Expert BTP
                </div>
              </div>
            </motion.div>);
        })}
        </div>

        {/* CTA Global */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center">
          <Link href="/formateurs" className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-yellow to-yellow-500 text-primary-blue px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
            Rencontrer l'équipe complète
            <ArrowRight className="w-5 h-5"/>
          </Link>
        </motion.div>
      </div>
    </section>);
};
export default FeaturedFormatorsSection;
