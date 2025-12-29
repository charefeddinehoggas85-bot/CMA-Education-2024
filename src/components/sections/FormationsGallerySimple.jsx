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
var FormationsGallerySimple = function () {
    var _a = useState(true), loading = _a[0], setLoading = _a[1];
    var _b = useState(null), data = _b[0], setData = _b[1];
    useEffect(function () {
        console.log('🔄 FormationsGallerySimple: Démarrage du chargement...');
        function loadData() {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Simuler un chargement simple
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                        case 1:
                            // Simuler un chargement simple
                            _a.sent();
                            console.log('✅ FormationsGallerySimple: Données chargées');
                            setData({ message: 'Galerie chargée avec succès!' });
                            setLoading(false);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('❌ FormationsGallerySimple: Erreur', error_1);
                            setLoading(false);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        loadData();
    }, []);
    console.log('🎯 FormationsGallerySimple: Rendu avec loading =', loading);
    if (loading) {
        return (<div className="py-12 bg-yellow-100 border-2 border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">
            🔄 FormationsGallerySimple - CHARGEMENT
          </h3>
          <div className="animate-pulse">
            <div className="h-8 bg-yellow-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-yellow-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>);
    }
    return (<div className="py-12 bg-green-100 border-2 border-green-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          ✅ FormationsGallerySimple - CHARGÉ
        </h3>
        <p className="text-green-700">
          {(data === null || data === void 0 ? void 0 : data.message) || 'Données chargées'}
        </p>
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-600">
            Si vous voyez ce message, le problème n'est pas dans la logique de base de React.
          </p>
        </div>
      </div>
    </div>);
};
export default FormationsGallerySimple;
