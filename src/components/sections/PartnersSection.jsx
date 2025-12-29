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
import { useState, useEffect } from 'react';
import { getPartners } from '@/lib/strapi';
var PartnersSection = function () {
    var _a = useState([]), partners = _a[0], setPartners = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    useEffect(function () {
        function loadPartners() {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, getPartners()];
                        case 1:
                            data = _a.sent();
                            setPartners(data);
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Error loading partners:', error_1);
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
    return (<section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-primary-blue mb-6">
            Des partenaires engagés à nos côtés
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous collaborons avec les leaders du BTP pour vous offrir des formations en phase avec les réalités du terrain et vous garantir les meilleures opportunités d'emploi.
          </p>
        </motion.div>

        {/* Partners from Strapi */}
        {loading ? (<div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des partenaires...</p>
          </div>) : (<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {partners.map(function (partner, index) { return (<motion.div key={partner.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-blue">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{partner.name}</h3>
                <p className="text-sm text-primary-blue font-medium mb-2">{partner.sector}</p>
                {partner.description && (<p className="text-xs text-gray-600">{partner.description}</p>)}
              </motion.div>); })}
          </div>)}

        {/* Static Partners Grid (logos) */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 mb-16">
          {[
            'Afpa.webp', 'Bien sur élévations.webp', 'COREDIF.webp', 'DCT Solutions de Démolition.webp',
            'eiffage.webp', 'gcc.webp', 'Green Bat.webp', 'GS Construction.webp',
            'LEON GROSSE.webp', 'LT CONSTRUCTION.webp', 'nge.webp', 'O2P BAT.webp'
        ].slice(0, 12).map(function (logo, index) { return (<motion.div key={logo} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24 group">
              <img src={"/images/partners/".concat(logo)} alt={logo.replace('.webp', '')} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" onError={function (e) {
                console.error("Failed to load partner logo: ".concat(logo));
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = "<div class=\"text-xs font-bold text-gray-600 text-center\">".concat(logo.replace('.webp', ''), "</div>");
            }}/>
            </motion.div>); })}
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center bg-gradient-to-r from-primary-blue to-blue-800 text-white py-12 px-8 rounded-2xl">
          <h3 className="text-3xl font-montserrat font-bold mb-4">
            98% de nos diplômés en poste en moins de 4 mois
          </h3>
          <p className="text-xl opacity-90">
            Un taux d'insertion exceptionnel grâce à notre réseau de partenaires et notre pédagogie terrain
          </p>
        </motion.div>
      </div>
    </section>);
};
export default PartnersSection;
