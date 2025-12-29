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
        var _a, formation, formationId, nom, prenom, type, email, telephone, transporter, mailOptions, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    _a = _b.sent(), formation = _a.formation, formationId = _a.formationId, nom = _a.nom, prenom = _a.prenom, type = _a.type, email = _a.email, telephone = _a.telephone;
                    transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASS,
                        },
                    });
                    mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: 'contact.academy@cma-education.com',
                        subject: "Demande de brochure - ".concat(formation),
                        html: "\n        <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">\n          <div style=\"background: linear-gradient(135deg, #2962ff 0%, #1e3a8a 100%); padding: 30px; text-align: center;\">\n            <h1 style=\"color: white; margin: 0; font-size: 24px;\">Nouvelle demande de brochure</h1>\n          </div>\n          \n          <div style=\"padding: 30px; background: #f8fafc;\">\n            <h2 style=\"color: #1e3a8a; margin-bottom: 20px;\">Informations du demandeur</h2>\n            \n            <div style=\"background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;\">\n              <p><strong>Nom:</strong> ".concat(nom, "</p>\n              <p><strong>Pr\u00E9nom:</strong> ").concat(prenom, "</p>\n              <p><strong>Profil:</strong> ").concat(type, "</p>\n              <p><strong>Email:</strong> ").concat(email, "</p>\n              <p><strong>T\u00E9l\u00E9phone:</strong> ").concat(telephone, "</p>\n            </div>\n            \n            <h3 style=\"color: #1e3a8a; margin-bottom: 15px;\">Formation demand\u00E9e</h3>\n            <div style=\"background: white; padding: 20px; border-radius: 8px;\">\n              <p><strong>Formation:</strong> ").concat(formation, "</p>\n              <p><strong>ID Formation:</strong> ").concat(formationId, "</p>\n              <p><strong>Date de demande:</strong> ").concat(new Date().toLocaleDateString('fr-FR'), "</p>\n            </div>\n            \n            <div style=\"margin-top: 30px; padding: 20px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;\">\n              <p style=\"margin: 0; color: #065f46;\">\n                <strong>\uD83C\uDF31 Action \u00E9co-responsable:</strong> Cette brochure a \u00E9t\u00E9 g\u00E9n\u00E9r\u00E9e num\u00E9riquement. \n                Le demandeur a \u00E9t\u00E9 sensibilis\u00E9 \u00E0 la pr\u00E9servation de l'environnement en \u00E9vitant l'impression.\n              </p>\n            </div>\n          </div>\n          \n          <div style=\"background: #1e3a8a; padding: 20px; text-align: center;\">\n            <p style=\"color: white; margin: 0; font-size: 14px;\">\n              CMA Education - Construction Management Academy<br>\n              contact.academy@cma-education.com | 01 85 09 71 06\n            </p>\n          </div>\n        </div>\n      "),
                    };
                    return [4 /*yield*/, transporter.sendMail(mailOptions)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, NextResponse.json({ success: true })];
                case 3:
                    error_1 = _b.sent();
                    console.error('Erreur envoi email:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
