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
export default function TestFormationPage() {
    var _a = useState(null), formation = _a[0], setFormation = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    useEffect(function () {
        function loadFormation() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return __awaiter(this, void 0, void 0, function () {
                var slug, response, data, formationData, transformed, err_1;
                return __generator(this, function (_l) {
                    switch (_l.label) {
                        case 0:
                            slug = 'conducteur-travaux-batiment-alternance';
                            console.log('🚀 Test formation - Début loadFormation, slug:', slug);
                            _l.label = 1;
                        case 1:
                            _l.trys.push([1, 4, 5, 6]);
                            setLoading(true);
                            setError(null);
                            return [4 /*yield*/, fetch("http://localhost:1337/api/formations?filters[slug][$eq]=".concat(slug, "&populate=*"))];
                        case 2:
                            response = _l.sent();
                            console.log('📡 Réponse Strapi:', response.ok, response.status);
                            if (!response.ok) {
                                throw new Error("Erreur API: ".concat(response.status));
                            }
                            return [4 /*yield*/, response.json()];
                        case 3:
                            data = _l.sent();
                            console.log('📊 Données reçues:', !!data.data, 'formations:', ((_a = data.data) === null || _a === void 0 ? void 0 : _a.length) || 0);
                            if (data.data && data.data.length > 0) {
                                formationData = data.data[0];
                                transformed = {
                                    id: formationData.id,
                                    title: (_b = formationData.attributes) === null || _b === void 0 ? void 0 : _b.title,
                                    slug: (_c = formationData.attributes) === null || _c === void 0 ? void 0 : _c.slug,
                                    level: (_d = formationData.attributes) === null || _d === void 0 ? void 0 : _d.level,
                                    rncp: (_e = formationData.attributes) === null || _e === void 0 ? void 0 : _e.rncp,
                                    duree: (_f = formationData.attributes) === null || _f === void 0 ? void 0 : _f.duree,
                                    rythme: (_g = formationData.attributes) === null || _g === void 0 ? void 0 : _g.rythme,
                                    objectifs: (_h = formationData.attributes) === null || _h === void 0 ? void 0 : _h.objectifs,
                                    debouches: (_j = formationData.attributes) === null || _j === void 0 ? void 0 : _j.debouches,
                                    prerequis: (_k = formationData.attributes) === null || _k === void 0 ? void 0 : _k.prerequis
                                };
                                console.log('✅ Formation transformée:', transformed.title);
                                console.log('📋 Objectifs:', Array.isArray(transformed.objectifs) ? transformed.objectifs.length : typeof transformed.objectifs);
                                console.log('💼 Débouchés:', Array.isArray(transformed.debouches) ? transformed.debouches.length : typeof transformed.debouches);
                                setFormation(transformed);
                            }
                            else {
                                setError('Formation non trouvée');
                            }
                            return [3 /*break*/, 6];
                        case 4:
                            err_1 = _l.sent();
                            console.error('❌ Erreur:', err_1);
                            setError(err_1 instanceof Error ? err_1.message : 'Erreur inconnue');
                            return [3 /*break*/, 6];
                        case 5:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        loadFormation();
    }, []);
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement de la formation...</p>
        </div>
      </div>);
    }
    if (error) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600 mb-2">{error}</p>
        </div>
      </div>);
    }
    if (!formation) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Formation non trouvée</h1>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Debug Info */}
        <div className="bg-black text-white p-4 rounded-lg mb-8 text-sm">
          <h3 className="font-bold mb-2">🔍 Debug Info - Test Formation</h3>
          <div>Formation ID: {formation.id}</div>
          <div>Titre: {formation.title}</div>
          <div>Slug: {formation.slug}</div>
          <div>Objectifs: {Array.isArray(formation.objectifs) ? "".concat(formation.objectifs.length, " items") : typeof formation.objectifs}</div>
          <div>Débouchés: {Array.isArray(formation.debouches) ? "".concat(formation.debouches.length, " items") : typeof formation.debouches}</div>
        </div>

        {/* Formation Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {formation.title}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Niveau</h3>
              <p className="text-gray-600">{formation.level}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">RNCP</h3>
              <p className="text-gray-600">{formation.rncp}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Durée</h3>
              <p className="text-gray-600">{formation.duree}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Rythme</h3>
              <p className="text-gray-600">{formation.rythme}</p>
            </div>
          </div>

          {/* Objectifs */}
          {formation.objectifs && Array.isArray(formation.objectifs) && formation.objectifs.length > 0 && (<div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Objectifs de la formation</h2>
              <ul className="space-y-2">
                {formation.objectifs.map(function (objectif, index) { return (<li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{objectif}</span>
                  </li>); })}
              </ul>
            </div>)}

          {/* Débouchés */}
          {formation.debouches && Array.isArray(formation.debouches) && formation.debouches.length > 0 && (<div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Débouchés professionnels</h2>
              <ul className="space-y-2">
                {formation.debouches.map(function (debouche, index) { return (<li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{debouche}</span>
                  </li>); })}
              </ul>
            </div>)}

          {/* Prérequis */}
          {formation.prerequis && Array.isArray(formation.prerequis) && formation.prerequis.length > 0 && (<div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Prérequis</h2>
              <ul className="space-y-2">
                {formation.prerequis.map(function (prerequis, index) { return (<li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{prerequis}</span>
                  </li>); })}
              </ul>
            </div>)}

          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">✅ Test réussi !</h3>
            <p className="text-green-700">Cette page démontre que l'intégration Strapi fonctionne correctement.</p>
          </div>
        </div>
      </div>
    </div>);
}
