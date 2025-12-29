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
import { motion } from 'framer-motion';
import { Award, Heart, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getValeursEcole } from '@/lib/strapi';
var ValuesSection = function () {
    var _a = useState([]), values = _a[0], setValues = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    useEffect(function () {
        function loadValues() {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, getValeursEcole()];
                        case 1:
                            data = _a.sent();
                            setValues(data);
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Erreur lors du chargement des valeurs:', error_1);
                            // Fallback data en cas d'erreur
                            setValues([
                                {
                                    id: 1,
                                    titre: "Professionnalisme",
                                    icone: "Award",
                                    points: [
                                        "Des formateurs issus du terrain, experts dans leur domaine",
                                        "Un accompagnement rigoureux tout au long du parcours",
                                        "Une exigence de qualité dans chaque formation",
                                        "Une préparation concrète aux réalités du métier"
                                    ],
                                    ordre: 1
                                },
                                {
                                    id: 2,
                                    titre: "Proximité",
                                    icone: "Heart",
                                    points: [
                                        "Une écoute attentive des besoins de chaque apprenant",
                                        "Une relation humaine, bienveillante et accessible",
                                        "Un lien fort avec les entreprises partenaires du secteur"
                                    ],
                                    ordre: 2
                                },
                                {
                                    id: 3,
                                    titre: "Pédagogie",
                                    icone: "BookOpen",
                                    points: [
                                        "Une approche pratique, centrée sur l'apprentissage par l'action",
                                        "Des outils et supports adaptés au secteur du BTP",
                                        "Un suivi personnalisé pour s'adapter au rythme de chaque apprenant",
                                        "L'objectif : faire monter en compétence de manière durable"
                                    ],
                                    ordre: 3
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
        loadValues();
    }, []);
    var getIcon = function (iconName) {
        switch (iconName) {
            case 'Award':
                return Award;
            case 'Heart':
                return Heart;
            case 'BookOpen':
                return BookOpen;
            default:
                return Award;
        }
    };
    if (loading) {
        return (<section className="py-20 bg-primary-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-white/20 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>);
    }
    return (<section className="py-20 bg-primary-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
            Nos valeurs chez Construction Management Academy
          </h2>
          <p className="text-xl opacity-90 max-w-4xl mx-auto">
            Chez Construction Management Academy, nous croyons que la réussite passe par plus que des compétences techniques. 
            C'est pourquoi nous plaçons l'humain, l'engagement et l'excellence au cœur de notre pédagogie.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {values.map(function (value, index) {
            var IconComponent = getIcon(value.icone);
            return (<motion.div key={value.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.2 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <span className="text-6xl font-montserrat font-bold text-primary-yellow mr-4">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="w-12 h-12 bg-primary-yellow rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary-blue"/>
                  </div>
                </div>
                
                <h3 className="text-2xl font-montserrat font-bold mb-6">
                  {value.titre}
                </h3>
                
                <ul className="space-y-3">
                  {value.points.map(function (point, pointIndex) { return (<li key={pointIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-primary-yellow rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="opacity-90 leading-relaxed">{point}</span>
                    </li>); })}
                </ul>
              </motion.div>);
        })}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }} className="text-center mt-16">
          <p className="text-xl opacity-90 mb-8">
            Nous formons des professionnels responsables, passionnés et prêts à relever les défis du secteur du BTP avec rigueur et ambition.
          </p>
          <button className="bg-gradient-primary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Commencer votre nouvelle carrière
          </button>
        </motion.div>
      </div>
    </section>);
};
export default ValuesSection;
