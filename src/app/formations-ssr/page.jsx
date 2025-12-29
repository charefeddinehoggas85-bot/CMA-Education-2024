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
import PageLayout from '@/components/layout/PageLayout';
import { GraduationCap, Clock, Award, ArrowRight, RefreshCw, CheckCircle, BookOpen, MapPin, Euro } from 'lucide-react';
import Link from 'next/link';
// Fonction pour récupérer les formations côté serveur
function getFormationsSSR() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('http://localhost:1337/api/formations?populate=*&sort=ordre:asc', {
                            cache: 'no-store' // Pas de cache pour avoir les données fraîches
                        })];
                case 1:
                    response = _b.sent();
                    if (!response.ok) {
                        throw new Error("Erreur API: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()
                        // Transformer les données
                    ];
                case 2:
                    data = _b.sent();
                    // Transformer les données
                    return [2 /*return*/, ((_a = data.data) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
                            return ({
                                id: item.id,
                                title: (_a = item.attributes) === null || _a === void 0 ? void 0 : _a.title,
                                slug: (_b = item.attributes) === null || _b === void 0 ? void 0 : _b.slug,
                                level: (_c = item.attributes) === null || _c === void 0 ? void 0 : _c.level,
                                rncp: (_d = item.attributes) === null || _d === void 0 ? void 0 : _d.rncp,
                                shortDescription: (_e = item.attributes) === null || _e === void 0 ? void 0 : _e.shortDescription,
                                duree: (_f = item.attributes) === null || _f === void 0 ? void 0 : _f.duree,
                                rythme: (_g = item.attributes) === null || _g === void 0 ? void 0 : _g.rythme,
                                modalite: (_h = item.attributes) === null || _h === void 0 ? void 0 : _h.modalite,
                                cout: (_j = item.attributes) === null || _j === void 0 ? void 0 : _j.cout,
                                objectifs: (_k = item.attributes) === null || _k === void 0 ? void 0 : _k.objectifs,
                                debouches: (_l = item.attributes) === null || _l === void 0 ? void 0 : _l.debouches,
                                prerequis: (_m = item.attributes) === null || _m === void 0 ? void 0 : _m.prerequis,
                                isAlternance: ((_r = (_q = (_p = (_o = item.attributes) === null || _o === void 0 ? void 0 : _o.category) === null || _p === void 0 ? void 0 : _p.data) === null || _q === void 0 ? void 0 : _q.attributes) === null || _r === void 0 ? void 0 : _r.name) === 'Alternance',
                                isReconversion: ((_v = (_u = (_t = (_s = item.attributes) === null || _s === void 0 ? void 0 : _s.category) === null || _t === void 0 ? void 0 : _t.data) === null || _u === void 0 ? void 0 : _u.attributes) === null || _v === void 0 ? void 0 : _v.name) === 'Reconversion',
                                imageData: (_w = item.attributes) === null || _w === void 0 ? void 0 : _w.image
                            });
                        })) || []];
                case 3:
                    error_1 = _b.sent();
                    console.error('Erreur récupération formations SSR:', error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Composant de carte formation
function FormationCard(_a) {
    var formation = _a.formation, index = _a.index, category = _a.category;
    var getCategoryColor = function (cat) {
        switch (cat) {
            case 'alternance': return 'bg-gradient-to-r from-blue-600 to-blue-700';
            case 'reconversion': return 'bg-gradient-to-r from-green-600 to-emerald-600';
            default: return 'bg-gradient-to-r from-gray-600 to-gray-700';
        }
    };
    return (<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className={"".concat(getCategoryColor(category), " p-6 text-white")}>
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white"/>
          </div>
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
            {formation.level}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">
          {formation.title}
        </h3>
        
        {formation.rncp && (<div className="flex items-center space-x-2 text-white/90">
            <Award className="w-4 h-4"/>
            <span className="text-sm">{formation.rncp}</span>
          </div>)}
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">{formation.shortDescription}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          {formation.duree && (<div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-yellow-500"/>
              <span className="text-gray-600">{formation.duree}</span>
            </div>)}
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-yellow-500"/>
            <span className="text-gray-600">{formation.modalite || 'Présentiel'}</span>
          </div>
          {formation.rythme && (<div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-yellow-500"/>
              <span className="text-gray-600 text-xs">{formation.rythme}</span>
            </div>)}
          <div className="flex items-center space-x-2">
            <Euro className="w-4 h-4 text-yellow-500"/>
            <span className="text-gray-600 text-xs">{formation.cout || 'Prise en charge'}</span>
          </div>
        </div>
        
        {/* Objectifs */}
        {formation.objectifs && Array.isArray(formation.objectifs) && formation.objectifs.length > 0 && (<div className="mb-4">
            <h4 className="font-semibold text-blue-600 mb-2">Objectifs :</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {formation.objectifs.slice(0, 3).map(function (obj, i) { return (<li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0"/>
                  <span>{obj}</span>
                </li>); })}
            </ul>
          </div>)}
        
        {/* Débouchés */}
        {formation.debouches && Array.isArray(formation.debouches) && formation.debouches.length > 0 && (<div className="mb-6">
            <h4 className="font-semibold text-blue-600 mb-2">Débouchés :</h4>
            <div className="flex flex-wrap gap-2">
              {formation.debouches.slice(0, 3).map(function (debouche, i) { return (<span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {debouche.split('(')[0].trim()}
                </span>); })}
            </div>
          </div>)}
        
        <Link href={"/formations/".concat(formation.slug)} className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors w-full justify-center py-2 rounded-lg font-semibold">
          <span>Voir tous les détails</span>
          <ArrowRight className="w-4 h-4"/>
        </Link>
      </div>
    </div>);
}
// Composant principal avec SSR
export default function FormationsSSRPage() {
    return __awaiter(this, void 0, void 0, function () {
        var formations, formationsAlternance, formationsReconversion, handleCandidater;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFormationsSSR()];
                case 1:
                    formations = _a.sent();
                    formationsAlternance = formations.filter(function (f) { return f.isAlternance; });
                    formationsReconversion = formations.filter(function (f) { return f.isReconversion; });
                    handleCandidater = function () {
                        if (typeof window !== 'undefined') {
                            window.open('https://cma-education.ymag.cloud/index.php/preinscription/', '_blank');
                        }
                    };
                    return [2 /*return*/, (<PageLayout>
      {/* Debug Info */}
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        <strong>✅ Page SSR - Formations Strapi</strong>
        <div className="text-sm mt-1">
          Total formations: {formations.length} | 
          Alternance: {formationsAlternance.length} | 
          Reconversion: {formationsReconversion.length}
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"/>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <GraduationCap className="w-5 h-5"/>
              <span className="text-sm font-medium">Formations BTP Certifiantes - Version SSR</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Formations BTP Certifiantes
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto mb-8">
            Formation conducteur de travaux, formation chargé d'affaires bâtiment et formation BTP alternance. 
            Formations certifiantes RNCP avec 98% d'insertion professionnelle. Prise en charge OPCO intégrale.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold">{formations.length}</div>
              <div className="text-sm opacity-90">Formations disponibles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold">98%</div>
              <div className="text-sm opacity-90">Taux d'insertion</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold">100%</div>
              <div className="text-sm opacity-90">Prise en charge</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold">20+</div>
              <div className="text-sm opacity-90">Entreprises partenaires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Formation en alternance */}
      {formationsAlternance.length > 0 && (<section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full mb-6">
                <GraduationCap className="w-6 h-6"/>
                <h2 className="text-2xl font-bold">Formation en alternance</h2>
              </div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Formations alliant enseignement théorique et expérience en entreprise pour former des professionnels immédiatement opérationnels
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formationsAlternance.map(function (formation, index) { return (<FormationCard key={formation.id} formation={formation} index={index} category="alternance"/>); })}
            </div>
          </div>
        </section>)}

      {/* Professionnels en reconversion */}
      {formationsReconversion.length > 0 && (<section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full mb-6">
                <RefreshCw className="w-6 h-6"/>
                <h2 className="text-2xl font-bold">Professionnels en reconversion</h2>
              </div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Formations pensées pour consolider votre savoir-faire avec une reconnaissance officielle, en valorisant votre expérience terrain
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formationsReconversion.map(function (formation, index) { return (<FormationCard key={formation.id} formation={formation} index={index} category="reconversion"/>); })}
            </div>
          </div>
        </section>)}

      {/* CTA Final */}
      <section className="relative py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à transformer votre avenir professionnel ?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Contactez-nous pour un entretien personnalisé et découvrir la formation qui vous correspond
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://cma-education.ymag.cloud/index.php/preinscription/" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
              <span>Candidater maintenant</span>
              <ArrowRight className="w-5 h-5"/>
            </a>
            <Link href="/brochure" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Télécharger la brochure
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>)];
            }
        });
    });
}
