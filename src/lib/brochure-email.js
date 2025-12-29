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
import emailjs from '@emailjs/browser';
export function sendBrochureDownloadNotification(data) {
    return __awaiter(this, void 0, void 0, function () {
        var serviceId, templateId, publicKey, emailData, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('📧 Envoi de la notification de téléchargement de brochure...');
                    serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_cma2026';
                    templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_brochure_download';
                    publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
                    if (!publicKey) {
                        throw new Error('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY manquant dans .env.local');
                    }
                    emailData = {
                        // Email de destination (configuré dans le template EmailJS)
                        to_email: 'contact.academy@cma-education.com',
                        // Informations de la formation
                        formation_title: data.formation.title,
                        formation_level: data.formation.level || 'Non spécifié',
                        formation_slug: data.formation.slug,
                        formation_id: data.formation.id.toString(),
                        // Informations de l'utilisateur
                        user_nom: data.user.nom,
                        user_prenom: data.user.prenom,
                        user_type: data.user.type,
                        user_email: data.user.email,
                        user_telephone: data.user.telephone,
                        // Informations contextuelles
                        date: new Date().toLocaleDateString('fr-FR'),
                        time: new Date().toLocaleTimeString('fr-FR'),
                        brochure_type: data.brochureType,
                        page_url: data.pageUrl || window.location.href,
                        // Informations supplémentaires
                        user_fullname: "".concat(data.user.prenom, " ").concat(data.user.nom),
                        formation_url: "".concat(window.location.origin, "/formations/").concat(data.formation.slug),
                        timestamp: new Date().toISOString()
                    };
                    console.log('📤 Envoi vers:', emailData.to_email);
                    console.log('👤 Candidat:', emailData.user_fullname);
                    console.log('📚 Formation:', emailData.formation_title);
                    return [4 /*yield*/, emailjs.send(serviceId, templateId, emailData, publicKey)];
                case 1:
                    response = _a.sent();
                    console.log('✅ Email envoyé avec succès:', response.status, response.text);
                    return [2 /*return*/, {
                            success: true,
                            messageId: response.text,
                            status: response.status
                        }];
                case 2:
                    error_1 = _a.sent();
                    console.error('❌ Erreur lors de l\'envoi de l\'email:', error_1);
                    // Log détaillé pour le debug
                    if (error_1 instanceof Error) {
                        console.error('Message d\'erreur:', error_1.message);
                        console.error('Stack trace:', error_1.stack);
                    }
                    return [2 /*return*/, {
                            success: false,
                            error: error_1 instanceof Error ? error_1.message : 'Erreur inconnue'
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Fonction utilitaire pour valider les données avant envoi
export function validateBrochureData(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var errors = [];
    // Validation formation
    if (!((_a = data.formation) === null || _a === void 0 ? void 0 : _a.title))
        errors.push('Titre de formation manquant');
    if (!((_b = data.formation) === null || _b === void 0 ? void 0 : _b.slug))
        errors.push('Slug de formation manquant');
    // Validation utilisateur
    if (!((_c = data.user) === null || _c === void 0 ? void 0 : _c.nom))
        errors.push('Nom utilisateur manquant');
    if (!((_d = data.user) === null || _d === void 0 ? void 0 : _d.prenom))
        errors.push('Prénom utilisateur manquant');
    if (!((_e = data.user) === null || _e === void 0 ? void 0 : _e.email))
        errors.push('Email utilisateur manquant');
    if (!((_f = data.user) === null || _f === void 0 ? void 0 : _f.telephone))
        errors.push('Téléphone utilisateur manquant');
    if (!((_g = data.user) === null || _g === void 0 ? void 0 : _g.type))
        errors.push('Type utilisateur manquant');
    // Validation email
    if (((_h = data.user) === null || _h === void 0 ? void 0 : _h.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.user.email)) {
        errors.push('Format email invalide');
    }
    return errors;
}
