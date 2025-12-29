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
import { Users, Award, TrendingUp, Building } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnimatedStat from '@/components/ui/AnimatedStats';
import ModernBackground from '@/components/ui/ModernBackground';
import { getStatistiquesSite } from '@/lib/strapi';
var StatsSection = function () {
    var _a = useState([
        { id: 1, cle: 'experience', nombre: 15, label: 'Années d\'expertise BTP', suffixe: '+', ordre: 1 },
        { id: 2, cle: 'formations', nombre: 8, label: 'Formations certifiées RNCP', suffixe: '', ordre: 2 },
        { id: 3, cle: 'partners', nombre: 45, label: 'Entreprises partenaires actives', suffixe: '+', ordre: 3 }
    ]), stats = _a[0], setStats = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1]; // Pas de loading, affichage immédiat
    useEffect(function () {
        function loadStats() {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, getStatistiquesSite()];
                        case 1:
                            data = _a.sent();
                            if (data && Array.isArray(data) && data.length > 0) {
                                setStats(data);
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
        loadStats();
    }, []);
    var getStatIcon = function (cle) {
        switch (cle) {
            case 'experience':
                return <Award className="w-6 h-6 text-white"/>;
            case 'formations':
                return <TrendingUp className="w-6 h-6 text-white"/>;
            case 'partners':
                return <Building className="w-6 h-6 text-white"/>;
            case 'insertion':
                return <Users className="w-6 h-6 text-white"/>;
            default:
                return <Award className="w-6 h-6 text-white"/>;
        }
    };
    var getStatColor = function (index) {
        var colors = ['primary-blue', 'primary-yellow', 'green-500', 'purple-500'];
        return colors[index % colors.length];
    };
    if (loading) {
        return (<section className="relative py-20 overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>);
    }
    return (<section className="relative py-20 overflow-hidden pt-32">
      {/* Background moderne */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50"/>
      <ModernBackground variant="sustainable" className="opacity-20"/>
      
      {/* Formes géométriques décoratives */}
      <motion.div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary-blue/20 rounded-full" animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity }}/>
      <motion.div className="absolute bottom-20 right-10 w-24 h-24 bg-primary-yellow/20 rounded-lg" animate={{ rotate: -360, y: [0, -20, 0] }} transition={{ duration: 15, repeat: Infinity }}/>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16 relative" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          {/* Décoration de titre */}
          <motion.div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-20 h-1 bg-gradient-to-r from-primary-blue to-primary-yellow rounded-full" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }}/>
          
          <motion.h2 className="text-4xl md:text-6xl font-montserrat font-bold mb-6" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <span className="text-primary-blue">Nos chiffres</span>
            <span className="block text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary-yellow to-orange-500 mt-2">
              d'Excellence
            </span>
          </motion.h2>
          
          <motion.div className="relative max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="absolute inset-0 glass-card rounded-2xl"/>
            <p className="relative text-lg text-gray-700 p-6 leading-relaxed">
              Des résultats qui témoignent de notre <span className="font-semibold text-primary-blue">excellence</span> et de notre engagement 
              envers la <span className="font-semibold text-primary-yellow">réussite de nos étudiants</span>
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {stats.map(function (stat, index) { return (<AnimatedStat key={stat.id} number={stat.nombre.toString()} label={stat.label} suffix={stat.suffixe} icon={getStatIcon(stat.cle)} color={getStatColor(index)} delay={index * 0.2}/>); })}
        </div>
      </div>
      
      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path d="M0,40 C300,80 900,0 1200,40 L1200,120 L0,120 Z" fill="rgba(250, 221, 130, 0.1)" animate={{
            d: [
                "M0,40 C300,80 900,0 1200,40 L1200,120 L0,120 Z",
                "M0,60 C300,20 900,80 1200,60 L1200,120 L0,120 Z",
                "M0,40 C300,80 900,0 1200,40 L1200,120 L0,120 Z"
            ]
        }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}/>
        </svg>
      </div>
    </section>);
};
export default StatsSection;
