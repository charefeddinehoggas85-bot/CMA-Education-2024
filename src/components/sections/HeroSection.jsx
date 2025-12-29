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
import { ArrowRight } from 'lucide-react';
import OptimizedButton from '@/components/ui/OptimizedButton';
import { getSiteSettings } from '@/lib/strapi';
var HeroSection = function () {
    var _a, _b;
    var _c = useState({
        id: 1,
        siteName: 'Construction Management Academy',
        siteTagline: 'Construction Management Academy',
        heroTitle: 'Construction Management Academy - Devenez l\'acteur du BTP d\'aujourd\'hui et de demain',
        heroSubtitle: 'Construction Management Academy',
        heroDescription: 'Formations BTP en alternance, reconversion et VAE. Du Niveau 5 au Niveau 7 (Bac+2 à Bac+5) avec nos partenaires entreprises.',
        contactPhone: '01 89 70 60 52',
        contactEmail: 'contact.academy@construction-management-academy.fr'
    }), siteSettings = _c[0], setSiteSettings = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1]; // Pas de loading, affichage immédiat
    useEffect(function () {
        function loadSiteSettings() {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, getSiteSettings()];
                        case 1:
                            data = _a.sent();
                            if (data) {
                                console.log('🎬 Site settings loaded:', data);
                                console.log('🎬 Hero video data:', data.heroVideo);
                                setSiteSettings(data);
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
        loadSiteSettings();
    }, []);
    var videoUrl = 'http://localhost:1337/uploads/Design_sans_titre_4_d438e047b5.mp4';
    var handleCandidater = function () {
        window.open('https://construction-management-academy.ymag.cloud/index.php/preinscription/', '_blank');
    };
    if (loading) {
        return (<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-header-offset md:pt-header-offset-mobile">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-primary-blue/30 to-slate-800/30"></div>
        <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-16 bg-white/20 rounded-lg mx-auto w-3/4"></div>
            <div className="h-8 bg-white/20 rounded-lg mx-auto w-1/2"></div>
            <div className="h-6 bg-white/20 rounded-lg mx-auto w-2/3"></div>
            <div className="h-12 bg-white/20 rounded-lg mx-auto w-48"></div>
          </div>
        </div>
      </section>);
    }
    return (<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-header-offset-mobile md:pt-header-offset-md lg:pt-header-offset">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={videoUrl} type="video/mp4"/>
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-slate-800/30 to-slate-800/30"></div>
      </div>

      {/* Content - Responsive */}
      <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Hero Title - Dynamique depuis Strapi - Responsive */}
        <motion.div className="mb-6 md:mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            <span className="block text-white mb-1 md:mb-2">
              {((_a = siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.heroTitle) === null || _a === void 0 ? void 0 : _a.split(' - ')[0]) || 'Construction Management Academy'}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-yellow via-orange-400 to-primary-yellow">
              {((_b = siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.heroTitle) === null || _b === void 0 ? void 0 : _b.split(' - ')[1]) || 'Devenez l\'acteur du BTP d\'aujourd\'hui et de demain'}
            </span>
          </motion.h1>
          
          <motion.p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-gray-300 mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
            {(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.heroSubtitle) || (siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.siteTagline) || 'Construction Management Academy'}
          </motion.p>
          
          <motion.div className="w-24 h-1 bg-gradient-to-r from-primary-yellow to-orange-500 mx-auto rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.6 }}/>
        </motion.div>

        {/* Clear Value Proposition - Dynamique */}
        <motion.p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
          {(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.heroDescription) || (<>
              Formations BTP en <span className="text-primary-yellow font-semibold">alternance, reconversion et VAE</span>.
              <br />Du <span className="text-primary-yellow font-semibold">Niveau 5 au Niveau 7 (Bac+2 à Bac+5)</span> avec nos partenaires entreprises.
            </>)}
        </motion.p>

        {/* Primary CTA - Single Focus */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <OptimizedButton variant="gradient" size="xl" icon={<ArrowRight className="w-6 h-6"/>} className="text-xl px-12 py-6 shadow-2xl hover:shadow-primary-yellow/25" onClick={handleCandidater}>
            CANDIDATER MAINTENANT
          </OptimizedButton>
        </motion.div>

        {/* Simplified Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-primary-yellow transition-colors animate-bounce">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"/>
          </div>
        </div>
      </div>

      {/* Subtle bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/5 to-transparent"/>
    </section>);
};
export default HeroSection;
