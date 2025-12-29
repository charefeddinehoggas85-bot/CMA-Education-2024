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
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var data, formation, user, brochureType, pageUrl, transporter, emailContent, mailOptions, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, request.json()
                        // Validation des données
                    ];
                case 1:
                    data = _a.sent();
                    formation = data.formation, user = data.user, brochureType = data.brochureType, pageUrl = data.pageUrl;
                    if (!formation || !user || !user.email || !user.nom || !user.prenom) {
                        return [2 /*return*/, NextResponse.json({ error: 'Données manquantes' }, { status: 400 })];
                    }
                    transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASSWORD // Mot de passe d'application
                        }
                    });
                    emailContent = "\nNouvelle demande de t\u00E9l\u00E9chargement de brochure\n\n\uD83D\uDCCB INFORMATIONS DE LA FORMATION\nFormation: ".concat(formation.title, "\nNiveau: ").concat(formation.level || 'Non spécifié', "\nSlug: ").concat(formation.slug, "\nID: ").concat(formation.id, "\n\n\uD83D\uDC64 INFORMATIONS DU CANDIDAT\nNom complet: ").concat(user.prenom, " ").concat(user.nom, "\nNom: ").concat(user.nom, "\nPr\u00E9nom: ").concat(user.prenom, "\nProfil: ").concat(user.type, "\nEmail: ").concat(user.email, "\nT\u00E9l\u00E9phone: ").concat(user.telephone, "\n\n\uD83D\uDCC5 INFORMATIONS DE LA DEMANDE\nDate: ").concat(new Date().toLocaleDateString('fr-FR'), "\nHeure: ").concat(new Date().toLocaleTimeString('fr-FR'), "\nType de brochure: ").concat(brochureType, "\nPage d'origine: ").concat(pageUrl, "\n\n---\nCette demande a \u00E9t\u00E9 g\u00E9n\u00E9r\u00E9e automatiquement par le site Construction Management Academy.\n    ");
                    mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: 'contact.academy@cma-education.com',
                        subject: "Nouvelle demande de brochure - ".concat(formation.title),
                        text: emailContent,
                        html: emailContent.replace(/\n/g, '<br>')
                    };
                    // Envoyer l'email
                    return [4 /*yield*/, transporter.sendMail(mailOptions)];
                case 2:
                    // Envoyer l'email
                    _a.sent();
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            message: 'Email envoyé avec succès'
                        })];
                case 3:
                    error_1 = _a.sent();
                    console.error('Erreur envoi email:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
