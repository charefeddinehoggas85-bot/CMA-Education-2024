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
import Image from 'next/image';
import { getSiteSettings } from '@/lib/strapi';
var AccessibilityBanner = function () {
    var _a = useState({
        id: 1,
        siteName: 'Construction Management Academy',
        contactPhone: '01 89 70 60 52',
        accessibilityMessage: 'Nos formations sont ouvertes à tous, y compris aux personnes en situation de handicap. Nous mettons en place les aménagements nécessaires pour garantir les meilleures conditions d\'apprentissage.',
        accessibilityPhone: '01 89 70 60 52',
        referentHandicap: 'notre référent handicap'
    }), siteSettings = _a[0], setSiteSettings = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1]; // Pas de loading, affichage immédiat
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
    if (loading) {
        return (<section className="relative py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="animate-pulse bg-gray-200 w-40 h-40 rounded"></div>
            <div className="flex-1 max-w-4xl">
              <div className="animate-pulse bg-gray-200 h-8 w-64 rounded mb-3"></div>
              <div className="animate-pulse bg-gray-200 h-20 w-full rounded"></div>
            </div>
          </div>
        </div>
      </section>);
    }
    return (<section className="relative py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="flex-shrink-0">
            <Image src="/images/handicap.webp" alt="Accessibilité Handicap" width={160} height={160} className="w-40 h-40"/>
          </div>
          
          <div className="flex-1 max-w-4xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Accessibilité et Inclusion
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-primary-blue">{siteSettings.siteName} s'engage pour l'accessibilité.</span>{' '}
              {siteSettings.accessibilityMessage}{' '}
              Pour toute demande spécifique, contactez {siteSettings.referentHandicap} au{' '}
              <a href={"tel:".concat((siteSettings.accessibilityPhone || siteSettings.contactPhone).replace(/\s/g, ''))} className="text-primary-blue font-semibold hover:underline">
                {siteSettings.accessibilityPhone || siteSettings.contactPhone}
              </a>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>);
};
export default AccessibilityBanner;
