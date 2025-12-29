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
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { getFormations } from '@/lib/strapi';
import { FeaturedFormationsClient } from './FeaturedFormationsClient';
function FeaturedFormationsSection() {
    return __awaiter(this, void 0, void 0, function () {
        var formations, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formations = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getFormations()];
                case 2:
                    data = _a.sent();
                    if (data && Array.isArray(data)) {
                        // Map the formations to ensure we have the right field names
                        formations = data.slice(0, 3).map(function (f) {
                            var _a;
                            return ({
                                id: f.id,
                                title: f.title || f.titre,
                                titre: f.title || f.titre,
                                slug: f.slug,
                                image: f.image || f.imageData,
                                level: f.level || f.niveauRNCP,
                                niveauRNCP: f.level || f.niveauRNCP,
                                category: f.category,
                                categorie: ((_a = f.category) === null || _a === void 0 ? void 0 : _a.name) || f.categorie,
                            });
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Erreur chargement formations:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, (<section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-primary-yellow"/>
            <span className="text-sm font-semibold text-primary-yellow uppercase tracking-wider">Formations Vedette</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-gray-900 mb-4">
            Nos Formations Phares
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos programmes les plus demandés, conçus pour transformer votre carrière dans le BTP
          </p>
        </div>

        <FeaturedFormationsClient formations={formations}/>

        {/* CTA Global */}
        <div className="text-center">
          <Link href="/formations" className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-blue to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
            Voir toutes nos formations
            <ArrowRight className="w-5 h-5"/>
          </Link>
        </div>
      </div>
    </section>)];
            }
        });
    });
}
export default FeaturedFormationsSection;
