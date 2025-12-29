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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useEffect } from 'react';
import { getFormation } from '@/lib/strapi';
export default function TestStrapiDebug() {
    var _a = useState([]), logs = _a[0], setLogs = _a[1];
    var _b = useState(null), result = _b[0], setResult = _b[1];
    var addLog = function (message) {
        console.log(message);
        setLogs(function (prev) { return __spreadArray(__spreadArray([], prev, true), ["".concat(new Date().toLocaleTimeString(), ": ").concat(message)], false); });
    };
    useEffect(function () {
        function testStrapi() {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var testUrl, testResponse, testData, strapiFormation, error_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            addLog('🔍 Début test Strapi');
                            addLog("\uD83D\uDD0D STRAPI_URL: ".concat(process.env.NEXT_PUBLIC_STRAPI_URL));
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 6, , 7]);
                            testUrl = "".concat(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337', "/api/formations?filters[slug][$eq]=charge-affaires-batiment-alternance&populate=*");
                            addLog("\uD83D\uDD0D URL de test: ".concat(testUrl));
                            return [4 /*yield*/, fetch(testUrl)];
                        case 2:
                            testResponse = _c.sent();
                            addLog("\uD83D\uDD0D Test response status: ".concat(testResponse.status));
                            addLog("\uD83D\uDD0D Test response ok: ".concat(testResponse.ok));
                            if (!testResponse.ok) return [3 /*break*/, 4];
                            return [4 /*yield*/, testResponse.json()];
                        case 3:
                            testData = _c.sent();
                            addLog("\uD83D\uDD0D Test data re\u00E7u: ".concat(!!testData.data));
                            addLog("\uD83D\uDD0D Test formation count: ".concat(((_a = testData.data) === null || _a === void 0 ? void 0 : _a.length) || 0));
                            if (testData.data && testData.data[0]) {
                                addLog("\uD83D\uDD0D Test formation titre: ".concat((_b = testData.data[0].attributes) === null || _b === void 0 ? void 0 : _b.title));
                            }
                            _c.label = 4;
                        case 4:
                            // Test 2: getFormation
                            addLog('📡 Test getFormation...');
                            return [4 /*yield*/, getFormation('charge-affaires-batiment-alternance')];
                        case 5:
                            strapiFormation = _c.sent();
                            addLog("\uD83D\uDCCA getFormation result: ".concat(!!strapiFormation));
                            if (strapiFormation) {
                                addLog("\uD83D\uDCCA Formation ID: ".concat(strapiFormation.id));
                                addLog("\uD83D\uDCCA Formation titre: ".concat(strapiFormation.title));
                                setResult(strapiFormation);
                            }
                            return [3 /*break*/, 7];
                        case 6:
                            error_1 = _c.sent();
                            addLog("\u274C Erreur: ".concat(error_1.message));
                            addLog("\u274C Stack: ".concat(error_1.stack));
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        testStrapi();
    }, []);
    return (<div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Strapi Debug</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Logs:</h2>
        <div className="text-sm space-y-1 max-h-96 overflow-y-auto">
          {logs.map(function (log, index) { return (<div key={index} className="font-mono">{log}</div>); })}
        </div>
      </div>
      
      {result && (<div className="bg-green-100 p-4 rounded">
          <h2 className="font-bold mb-2">Résultat:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>)}
    </div>);
}
