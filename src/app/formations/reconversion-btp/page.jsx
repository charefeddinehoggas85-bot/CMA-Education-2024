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
import { notFound } from 'next/navigation';
import { getFormation } from '@/lib/strapi';
import ProcessSection from '@/components/sections/ProcessSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import ContactSection from '@/components/sections/ContactSection';
import PageLayout from '@/components/layout/PageLayout';
import { GraduationCap, Clock, Award, MapPin, Euro, CheckCircle, Users, Building } from 'lucide-react';
var SLUG = 'reconversion-btp';
export function generateMetadata() {
    return __awaiter(this, void 0, void 0, function () {
        var formation, title, description, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getFormation(SLUG)];
                case 1:
                    formation = _a.sent();
                    if (!formation) {
                        return [2 /*return*/, {
                                title: 'Formation non trouvée - CMA Education',
                                description: 'Cette formation n\'existe pas ou n\'est plus disponible.'
                            }];
                    }
                    title = formation.title || formation.titre || 'Formation BTP';
                    description = formation.description || formation.shortDescription || 'Formation BTP d\'excellence';
                    return [2 /*return*/, {
                            title: "".concat(title, " - Formation BTP | CMA Education"),
                            description: description
                        }];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, {
                            title: 'Formation BTP - CMA Education',
                            description: 'Formation BTP d\'excellence en alternance'
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export default function FormationPage() {
    return __awaiter(this, void 0, void 0, function () {
        var formationData, formation, title, level, description, duration, rhythm, rncp, objectives, opportunities, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getFormation(SLUG)];
                case 1:
                    formationData = _a.sent();
                    formation = formationData;
                    if (!formation) {
                        notFound();
                    }
                    title = formation.title || formation.titre || 'Formation BTP d\'Excellence';
                    level = formation.level || formation.niveau || 'Formation Professionnelle';
                    description = formation.description || formation.shortDescription || 'Devenez un expert du BTP';
                    duration = formation.duration || formation.duree || '1 an';
                    rhythm = formation.rhythm || formation.rythme || 'Alternance';
                    rncp = formation.rncp || '';
                    objectives = formation.objectives || formation.objectifs || [];
                    opportunities = formation.opportunities || formation.debouches || [];
                    return [2 /*return*/, (<PageLayout>
        <section className="relative py-20 bg-gradient-to-br from-primary-blue via-blue-700 to-indigo-800 text-white">
          <div className="absolute inset-0 bg-black/90"/>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <GraduationCap className="w-5 h-5"/>
              <span className="text-sm font-medium">Formation BTP</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl opacity-90 mb-4">{level}</p>
            {rncp && (<div className="inline-flex items-center space-x-2 bg-primary-yellow/20 px-4 py-2 rounded-full">
                <Award className="w-5 h-5 text-primary-yellow"/>
                <span className="text-primary-yellow font-semibold">{rncp}</span>
              </div>)}
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-primary-blue"/>
                <div><p className="text-sm text-gray-500">Durée</p><p className="font-semibold">{duration}</p></div>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="w-6 h-6 text-primary-blue"/>
                <div><p className="text-sm text-gray-500">Rythme</p><p className="font-semibold">{rhythm}</p></div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-primary-blue"/>
                <div><p className="text-sm text-gray-500">Lieu</p><p className="font-semibold">Champs-sur-Marne</p></div>
              </div>
              <div className="flex items-center space-x-3">
                <Euro className="w-6 h-6 text-primary-blue"/>
                <div><p className="text-sm text-gray-500">Financement</p><p className="font-semibold">Prise en charge</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">À propos</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
              </div>
              {objectives.length > 0 && (<div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Objectifs</h3>
                  <ul className="space-y-3">
                    {objectives.map(function (obj, i) { return (<li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"/>
                        <span className="text-gray-600">{obj}</span>
                      </li>); })}
                  </ul>
                </div>)}
            </div>
          </div>
        </section>

        {opportunities.length > 0 && (<section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Débouchés</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {opportunities.map(function (job, i) { return (<div key={i} className="bg-gray-50 p-6 rounded-xl text-center">
                    <Users className="w-8 h-8 text-primary-blue mx-auto mb-3"/>
                    <p className="font-semibold text-gray-900">{job}</p>
                  </div>); })}
              </div>
            </div>
          </section>)}

        <ProcessSection />
        <SocialProofSection />
        <ContactSection />
      </PageLayout>)];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, (<PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Erreur</h1>
            <a href="/formations" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Voir les formations</a>
          </div>
        </div>
      </PageLayout>)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
