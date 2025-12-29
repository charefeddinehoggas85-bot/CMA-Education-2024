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
import { notFound } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { getFormation } from '@/lib/strapi';
import { formationsAlternance, formationsReconversion } from '@/data/formations-static';
import FormationContent from './FormationContent';
// Fonction pour trouver une formation dans les données statiques
function findStaticFormation(slug) {
    var allFormations = __spreadArray(__spreadArray([], formationsAlternance, true), formationsReconversion, true);
    var found = allFormations.find(function (f) { return f.slug === slug; });
    if (!found)
        return null;
    return {
        id: found.id,
        title: found.title,
        slug: found.slug,
        level: found.level,
        rncp: found.rncp,
        shortDescription: found.shortDescription,
        fullDescription: found.shortDescription,
        duree: found.duration,
        rythme: found.rhythm,
        modalite: found.mode,
        cout: found.price,
        financement: found.price,
        objectifs: found.objectives,
        debouches: found.opportunities,
        prerequis: [],
        isActive: true,
        image: found.image
    };
}
// Server-side data fetching
function getFormationData(slug) {
    return __awaiter(this, void 0, void 0, function () {
        var strapiFormation, staticFormation, error_1, staticFormation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('🔍 SSR: Chargement formation pour slug:', slug);
                    return [4 /*yield*/, getFormation(slug)];
                case 1:
                    strapiFormation = _a.sent();
                    if (strapiFormation && (strapiFormation === null || strapiFormation === void 0 ? void 0 : strapiFormation.id)) {
                        console.log('✅ SSR: Formation Strapi trouvée:', strapiFormation.title);
                        return [2 /*return*/, strapiFormation];
                    }
                    console.log('⚠️ SSR: Pas de formation Strapi, fallback vers statique');
                    staticFormation = findStaticFormation(slug);
                    if (staticFormation) {
                        console.log('✅ SSR: Formation statique trouvée:', staticFormation.title);
                        return [2 /*return*/, staticFormation];
                    }
                    console.log('❌ SSR: Aucune formation trouvée');
                    return [2 /*return*/, null];
                case 2:
                    error_1 = _a.sent();
                    console.error('❌ SSR: Erreur chargement formation:', error_1);
                    staticFormation = findStaticFormation(slug);
                    if (staticFormation) {
                        console.log('✅ SSR: Fallback statique après erreur:', staticFormation.title);
                        return [2 /*return*/, staticFormation];
                    }
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Page principale avec SSR
export default function FormationDetailPage(_a) {
    var _b, _c;
    var params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var formation;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, getFormationData(params.slug)];
                case 1:
                    formation = _d.sent();
                    if (!formation) {
                        notFound();
                    }
                    return [2 /*return*/, (<PageLayout>
      {/* Debug Info - Visible uniquement en développement */}
      {process.env.NODE_ENV === 'development' && (<div className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg text-xs z-50 max-w-sm">
          <div><strong>✅ SSR FORMATION CHARGÉE</strong></div>
          <div>Slug: {params.slug}</div>
          <div>ID: {formation.id}</div>
          <div>Titre: {(_b = formation.title) === null || _b === void 0 ? void 0 : _b.substring(0, 20)}...</div>
          <div>Niveau: {(_c = formation.level) === null || _c === void 0 ? void 0 : _c.substring(0, 15)}...</div>
          <div>RNCP: {formation.rncp || 'Non défini'}</div>
          <div>Durée: {formation.duree || 'Non définie'}</div>
          <div>Objectifs: {formation.objectifs ? formation.objectifs.length : 'Null'}</div>
          <div>Débouchés: {formation.debouches ? formation.debouches.length : 'Null'}</div>
          <div>Source: {formation.id > 1000 ? 'Statique' : 'Strapi'}</div>
        </div>)}
      
      <FormationContent formation={formation}/>
    </PageLayout>)];
            }
        });
    });
}
// Générer les paramètres statiques pour les formations connues
export function generateStaticParams() {
    return __awaiter(this, void 0, void 0, function () {
        var getFormations, strapiFormations, staticFormations, allSlugs_1, params, error_2, staticFormations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, import('@/lib/strapi')];
                case 1:
                    getFormations = (_a.sent()).getFormations;
                    return [4 /*yield*/, getFormations()
                        // Formations statiques comme fallback
                    ];
                case 2:
                    strapiFormations = _a.sent();
                    staticFormations = __spreadArray(__spreadArray([], formationsAlternance, true), formationsReconversion, true);
                    allSlugs_1 = new Set();
                    // Ajouter les slugs Strapi
                    if (strapiFormations && Array.isArray(strapiFormations)) {
                        strapiFormations.forEach(function (formation) {
                            if (formation.slug) {
                                allSlugs_1.add(formation.slug);
                            }
                        });
                    }
                    // Ajouter les slugs statiques
                    staticFormations.forEach(function (formation) {
                        allSlugs_1.add(formation.slug);
                    });
                    params = Array.from(allSlugs_1).map(function (slug) { return ({
                        slug: slug,
                    }); });
                    console.log('✅ SSR: Génération de', params.length, 'pages statiques');
                    return [2 /*return*/, params];
                case 3:
                    error_2 = _a.sent();
                    console.error('Erreur génération params statiques:', error_2);
                    staticFormations = __spreadArray(__spreadArray([], formationsAlternance, true), formationsReconversion, true);
                    return [2 /*return*/, staticFormations.map(function (formation) { return ({
                            slug: formation.slug,
                        }); })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
