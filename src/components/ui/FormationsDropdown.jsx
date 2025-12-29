'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { getFormations, getFormationCategories } from '@/lib/strapi';
var FormationsDropdown = function (_a) {
    var _b;
    var isScrolled = _a.isScrolled;
    var _c = useState(false), isOpen = _c[0], setIsOpen = _c[1];
    var _d = useState(0), activeTab = _d[0], setActiveTab = _d[1];
    var _e = useState([]), categories = _e[0], setCategories = _e[1];
    var _f = useState(true), loading = _f[0], setLoading = _f[1];
    var _g = useState(null), hoverTimeout = _g[0], setHoverTimeout = _g[1];
    var handleMouseEnter = function () {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setIsOpen(true);
    };
    var handleMouseLeave = function () {
        var timeout = setTimeout(function () {
            setIsOpen(false);
        }, 150); // Délai de 150ms avant de fermer
        setHoverTimeout(timeout);
    };
    useEffect(function () {
        function loadFormations() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, categoriesData, formationsData_1, categoriesWithFormations, validCategories, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, 3, 4]);
                            console.log('🔄 Chargement des formations depuis Strapi...');
                            return [4 /*yield*/, Promise.all([
                                    getFormationCategories(),
                                    getFormations()
                                ])];
                        case 1:
                            _a = _b.sent(), categoriesData = _a[0], formationsData_1 = _a[1];
                            console.log('📊 Données Strapi reçues:', {
                                categories: (categoriesData === null || categoriesData === void 0 ? void 0 : categoriesData.length) || 0,
                                formations: (formationsData_1 === null || formationsData_1 === void 0 ? void 0 : formationsData_1.length) || 0
                            });
                            categoriesWithFormations = categoriesData.map(function (category) {
                                var categoryFormations = formationsData_1.filter(function (formation) { var _a, _b; return ((_a = formation.category) === null || _a === void 0 ? void 0 : _a.slug) === category.slug || ((_b = formation.category) === null || _b === void 0 ? void 0 : _b.name) === category.name; });
                                return __assign(__assign({}, category), { formations: categoryFormations });
                            });
                            validCategories = categoriesWithFormations.filter(function (cat) { return cat.formations && cat.formations.length > 0; });
                            console.log('✅ Catégories avec formations:', validCategories.map(function (cat) {
                                var _a;
                                return ({
                                    name: cat.name,
                                    count: ((_a = cat.formations) === null || _a === void 0 ? void 0 : _a.length) || 0
                                });
                            }));
                            // Utiliser uniquement les données Strapi (pas de fallback)
                            setCategories(validCategories);
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _b.sent();
                            console.error('❌ Erreur chargement Strapi:', error_1);
                            // Pas de fallback - afficher un tableau vide
                            setCategories([]);
                            return [3 /*break*/, 4];
                        case 3:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        loadFormations();
    }, []);
    // Nettoyage des timeouts
    useEffect(function () {
        return function () {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
        };
    }, [hoverTimeout]);
    if (loading) {
        return (<div className="relative">
        <button className="flex items-center space-x-1 font-medium transition-colors px-3 py-2 rounded-lg text-gray-900 hover:text-primary-yellow">
          <span>Formations</span>
          <ChevronDown className="w-4 h-4"/>
        </button>
      </div>);
    }
    return (<div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="flex items-center space-x-1 font-medium transition-colors px-3 py-2 rounded-lg text-gray-900 hover:text-primary-yellow">
        <span>Formations</span>
        <ChevronDown className={"w-4 h-4 transition-transform duration-200 ".concat(isOpen ? 'rotate-180' : '')}/>
      </button>

      {isOpen && categories.length > 0 && (<div className="absolute top-full left-0 mt-1 w-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-[80vh] overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Onglets */}
          <div className="flex border-b border-gray-100 bg-gray-50">
            {categories.map(function (category, index) {
                var _a;
                return (<button key={index} onMouseEnter={function () {
                        handleMouseEnter();
                        setActiveTab(index);
                    }} className={"flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ".concat(activeTab === index
                        ? 'text-primary-blue border-b-2 border-primary-blue bg-white'
                        : 'text-gray-600 hover:text-primary-blue hover:bg-gray-100')}>
                <span>{category.name}</span>
                <span className="ml-1 text-xs text-gray-400">({((_a = category.formations) === null || _a === void 0 ? void 0 : _a.length) || 0})</span>
              </button>);
            })}
          </div>

          {/* Contenu - Affiche TOUTES les formations */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-2">
              {((_b = categories[activeTab]) === null || _b === void 0 ? void 0 : _b.formations) && categories[activeTab].formations.length > 0 ? (categories[activeTab].formations.map(function (formation, idx) { return (<Link key={idx} href={"/formations/".concat(formation.slug || formation.id || 'formation')} className="block p-3 rounded-lg hover:bg-blue-50 transition-colors group border border-transparent hover:border-blue-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 group-hover:text-primary-blue text-sm">
                          {formation.title || 'Formation'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{formation.level || 'Niveau pro'}</span>
                          <span>•</span>
                          <span>{formation.duree || formation.duration || '1 an'}</span>
                        </div>
                      </div>
                      <span className="text-primary-blue opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
                    </div>
                  </Link>); })) : (<div className="text-sm text-gray-500 text-center py-8">
                  Aucune formation disponible dans cette catégorie
                </div>)}
            </div>
          </div>
          
          {/* Footer avec liens */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <Link href="/formations" className="text-sm text-primary-blue hover:text-primary-yellow font-medium flex items-center gap-1">
              <span>Voir toutes les formations</span>
              <span>→</span>
            </Link>
            <div className="flex gap-2">
              <Link href="/formations/entreprises" className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md text-xs font-medium hover:bg-orange-200 transition-colors">
                Entreprises
              </Link>
              <Link href="/formations/vae-btp" className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md text-xs font-medium hover:bg-purple-200 transition-colors">
                VAE
              </Link>
            </div>
          </div>
        </div>)}
    </div>);
};
export default FormationsDropdown;
