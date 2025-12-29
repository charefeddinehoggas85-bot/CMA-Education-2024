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
import { ExternalLink, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getPartners, getImageURL } from '@/lib/strapi';
// Partenaires statiques avec leurs logos
var defaultPartners = [
    { id: 1, name: 'Léon Grosse', logo: '/images/partners/LEON GROSSE.webp', website: 'https://www.leongrosse.fr/', featured: true },
    { id: 2, name: 'Eiffage', logo: '/images/partners/eiffage.webp', website: 'https://www.eiffage.com/', featured: true },
    { id: 3, name: 'NGE', logo: '/images/partners/nge.webp', website: 'https://www.nge.fr/', featured: true },
    { id: 4, name: 'GCC Construction', logo: '/images/partners/gcc.webp', website: 'https://www.gcc.fr/', featured: true },
    { id: 5, name: 'Coredif', logo: '/images/partners/COREDIF.webp', website: 'https://www.coredif.fr/', featured: true },
    { id: 6, name: 'Afpa', logo: '/images/partners/Afpa.webp', website: 'https://www.afpa.fr/', featured: true },
    { id: 7, name: 'DCT Solutions', logo: '/images/partners/DCT Solutions de Démolition.webp', website: 'https://www.dct-demolition.fr/', featured: false },
    { id: 8, name: 'Biens Sur Élévations', logo: '/images/partners/Bien sur élévations.webp', website: 'https://www.biens-sur.fr/', featured: false },
    { id: 9, name: 'LT Construction', logo: '/images/partners/LT CONSTRUCTION.webp', website: 'https://www.lt-construction.fr/', featured: false },
    { id: 10, name: 'O2P BAT', logo: '/images/partners/O2P BAT.webp', website: 'https://www.o2pbat.fr/', featured: false },
    { id: 11, name: 'Green Bât', logo: '/images/partners/Green Bat.webp', website: 'https://www.greenbat.fr/', featured: false },
    { id: 12, name: 'GS Construction', logo: '/images/partners/GS Construction.webp', website: 'https://www.gs-construction.fr/', featured: false },
];
var FeaturedPartnersSection = function () {
    var _a = useState(defaultPartners), partners = _a[0], setPartners = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    useEffect(function () {
        function loadPartners() {
            return __awaiter(this, void 0, void 0, function () {
                var partnersData, formattedPartners, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, 3, 4]);
                            setLoading(true);
                            return [4 /*yield*/, getPartners()];
                        case 1:
                            partnersData = _a.sent();
                            if (partnersData && Array.isArray(partnersData) && partnersData.length > 0) {
                                formattedPartners = partnersData.map(function (p) { return ({
                                    id: p.id,
                                    name: p.name || p.nom || 'Partenaire',
                                    website: p.website || p.siteWeb || '#',
                                    logo: getImageURL(p.logoData || p.imageData || p.logo, '/images/partners/default.webp'),
                                    featured: p.featured || false
                                }); });
                                setPartners(formattedPartners);
                            }
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Erreur chargement partenaires:', error_1);
                            return [3 /*break*/, 4];
                        case 3:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        loadPartners();
    }, []);
    // Sélectionner les 6 premiers partenaires pour l'affichage
    var featuredPartners = partners.filter(function (p) { return p.featured !== false; }).slice(0, 6);
    var totalPartners = partners.length;
    return (<section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center space-x-2 bg-primary-yellow/10 text-primary-yellow px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Building2 className="w-4 h-4"/>
            <span>Nos Partenaires de Confiance</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-montserrat font-black text-slate-900 mb-6">
            Ils nous font{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-yellow via-orange-500 to-primary-yellow">
              confiance
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Des entreprises leaders du BTP qui accueillent nos alternants et participent activement à leur formation professionnelle
          </p>
        </motion.div>

        {/* Stats rapides */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-3 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-primary-yellow mb-2">
              {totalPartners}+
            </div>
            <div className="text-sm text-gray-600 font-medium">Entreprises partenaires</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
              150+
            </div>
            <div className="text-sm text-gray-600 font-medium">Alternants placés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-green-600 mb-2">
              98%
            </div>
            <div className="text-sm text-gray-600 font-medium">Taux d'insertion</div>
          </div>
        </motion.div>

        {/* Grille des logos partenaires */}
        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                }
            }
        }}>
          {featuredPartners.map(function (partner, index) { return (<motion.a key={partner.id || index} href={partner.website || '#'} target="_blank" rel="noopener noreferrer" variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 12
                    }
                }
            }} whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
            }} whileTap={{ scale: 0.98 }} className="group relative bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[160px] cursor-pointer hover:border-primary-yellow/30 hover:shadow-xl transition-all duration-300">
              {/* Logo */}
              <motion.div className="relative w-full h-16 flex items-center justify-center mb-4" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" onError={function (e) {
                var target = e.target;
                target.style.display = 'none';
                if (target.parentElement) {
                    target.parentElement.innerHTML = "<div class=\"w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-600 rounded-xl flex items-center justify-center\"><span class=\"text-white font-bold text-xl\">".concat(partner.name.charAt(0), "</span></div>");
                }
            }}/>
              </motion.div>
              
              {/* Nom du partenaire */}
              <span className="text-sm text-gray-600 group-hover:text-slate-900 font-medium text-center transition-colors duration-300">
                {partner.name}
              </span>
              
              {/* Icône externe */}
              <ExternalLink className="w-4 h-4 text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

              {/* Indicateurs décoratifs */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            </motion.a>); })}
        </motion.div>

        {/* CTA vers la page partenaires */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} className="text-center">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-montserrat font-bold mb-4">
              Découvrez tous nos partenaires
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Explorez notre réseau complet d'entreprises partenaires et découvrez les opportunités d'alternance et d'emploi qui vous attendent
            </p>
            <Link href="/partenaires" className="inline-flex items-center space-x-2 bg-primary-yellow text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span>Voir tous nos partenaires</span>
              <ArrowRight className="w-5 h-5"/>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>);
};
export default FeaturedPartnersSection;
