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
import { Award, Shield, Users, BookOpen } from 'lucide-react';
import { getValeursEcole } from '@/lib/strapi';
var InstitutionalSection = function () {
    var _a = useState([
        {
            id: 1,
            titre: "Certifié Qualiopi",
            description: "Certification qualité des organismes de formation",
            icon: "Award",
            ordre: 1,
            type: "certification"
        },
        {
            id: 2,
            titre: "Titres RNCP",
            description: "Formations reconnues par l'État niveau 5, 6 et 7",
            icon: "Shield",
            ordre: 2,
            type: "certification"
        },
        {
            id: 3,
            titre: "Partenaire OPCO",
            description: "Prise en charge des formations en alternance",
            icon: "Users",
            ordre: 3,
            type: "certification"
        },
        {
            id: 4,
            titre: "Membre FFB",
            description: "Fédération Française du Bâtiment",
            icon: "BookOpen",
            ordre: 4,
            type: "certification"
        }
    ]), certifications = _a[0], setCertifications = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1]; // Pas de loading, affichage immédiat
    useEffect(function () {
        function loadCertifications() {
            return __awaiter(this, void 0, void 0, function () {
                var data, certificationData, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, getValeursEcole()];
                        case 1:
                            data = _a.sent();
                            if (data && Array.isArray(data) && data.length > 0) {
                                certificationData = data.filter(function (valeur) {
                                    return valeur.type === 'certification' || valeur.type === 'institutional';
                                });
                                if (certificationData.length > 0) {
                                    setCertifications(certificationData);
                                }
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Strapi non disponible, utilisation des données statiques');
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        loadCertifications();
    }, []);
    // Fonction pour obtenir l'icône correspondante
    var getIcon = function (iconName) {
        switch (iconName) {
            case 'Award':
                return <Award className="w-8 h-8"/>;
            case 'Shield':
                return <Shield className="w-8 h-8"/>;
            case 'Users':
                return <Users className="w-8 h-8"/>;
            case 'BookOpen':
                return <BookOpen className="w-8 h-8"/>;
            default:
                return <Award className="w-8 h-8"/>;
        }
    };
    if (loading) {
        return (<section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse bg-gray-200 h-12 w-96 mx-auto rounded mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-2/3 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(function (i) { return (<div key={i} className="animate-pulse bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-gray-200 w-16 h-16 rounded-xl mb-4"></div>
                <div className="bg-gray-200 h-6 w-32 rounded mb-2"></div>
                <div className="bg-gray-200 h-16 w-full rounded"></div>
              </div>); })}
          </div>
        </div>
      </section>);
    }
    return (<section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.slice(0, 4).map(function (cert, index) { return (<motion.div key={cert.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
                {getIcon(cert.icon)}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.titre}</h3>
              <p className="text-sm text-gray-600">{cert.description}</p>
            </motion.div>); })}
        </div>
      </div>
    </section>);
};
export default InstitutionalSection;
