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
import jsPDF from 'jspdf';
export function generateBrochurePDF(formation, userData) {
    return __awaiter(this, void 0, void 0, function () {
        var pdf, pageWidth, pageHeight, primaryBlue, yellow, white, darkBlue, gray, title, titleLines, rnpcY, yPos, leftCol, rightCol, evaluations, accessTexts, lines, footerY;
        return __generator(this, function (_a) {
            pdf = new jsPDF('p', 'mm', 'a4');
            pageWidth = pdf.internal.pageSize.getWidth();
            pageHeight = pdf.internal.pageSize.getHeight();
            primaryBlue = [0, 0, 255] // #0000FF
            ;
            yellow = [255, 255, 0] // #FFFF00
            ;
            white = [255, 255, 255] // #FFFFFF
            ;
            darkBlue = [0, 0, 204] // Bleu foncé
            ;
            gray = [51, 51, 51] // Texte
            ;
            // Header avec design bleu/jaune
            pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
            pdf.rect(0, 0, pageWidth, 70, 'F');
            // Accent jaune en haut à droite
            pdf.setFillColor(yellow[0], yellow[1], yellow[2]);
            pdf.circle(pageWidth - 30, 20, 25, 'F');
            // Logo CMA (cercle blanc avec texte)
            pdf.setFillColor(255, 255, 255);
            pdf.circle(30, 25, 12, 'F');
            pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text('CMA', 22, 28);
            // Titre
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(20);
            pdf.setFont('helvetica', 'bold');
            pdf.text('CONSTRUCTION MANAGEMENT ACADEMY', 50, 30);
            // Niveau en jaune
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(yellow[0], yellow[1], yellow[2]);
            pdf.text(formation.level || 'FORMATION PROFESSIONNELLE', 20, 50);
            // Titre de la formation
            pdf.setFontSize(20);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
            title = formation.title.length > 60 ? formation.title.substring(0, 60) + '...' : formation.title;
            titleLines = pdf.splitTextToSize(title, pageWidth - 40);
            pdf.text(titleLines, 20, 90);
            // RNCP en badge jaune
            if (formation.rncp) {
                rnpcY = 90 + (titleLines.length * 8);
                pdf.setFillColor(yellow[0], yellow[1], yellow[2]);
                pdf.roundedRect(20, rnpcY, 50, 8, 2, 2, 'F');
                pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'bold');
                pdf.text(formation.rncp, 23, rnpcY + 6);
            }
            yPos = 120;
            // Section Objectifs
            if (formation.objectifs) {
                // Titre avec bordure jaune
                pdf.setDrawColor(yellow[0], yellow[1], yellow[2]);
                pdf.setLineWidth(1);
                pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2);
                pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                pdf.setFontSize(14);
                pdf.setFont('helvetica', 'bold');
                pdf.text('OBJECTIFS DE LA FORMATION', 20, yPos);
                yPos += 12;
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(gray[0], gray[1], gray[2]);
                formation.objectifs.slice(0, 5).forEach(function (obj) {
                    // Puce jaune
                    pdf.setFillColor(yellow[0], yellow[1], yellow[2]);
                    pdf.circle(22, yPos - 1.5, 1.5, 'F');
                    var lines = pdf.splitTextToSize(obj, pageWidth - 45);
                    pdf.text(lines, 28, yPos);
                    yPos += lines.length * 4.5 + 2;
                });
                yPos += 8;
            }
            // Section Programme
            if (formation.programme && yPos < pageHeight - 40) {
                // Titre avec bordure jaune
                pdf.setDrawColor(yellow[0], yellow[1], yellow[2]);
                pdf.setLineWidth(1);
                pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2);
                pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                pdf.setFontSize(14);
                pdf.setFont('helvetica', 'bold');
                pdf.text('PROGRAMME DÉTAILLÉ', 20, yPos);
                yPos += 12;
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(gray[0], gray[1], gray[2]);
                formation.programme.slice(0, 8).forEach(function (prog, index) {
                    var title = prog.split(' : ')[0];
                    // Numéro en bleu
                    pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text("".concat(index + 1, "."), 22, yPos);
                    pdf.setTextColor(gray[0], gray[1], gray[2]);
                    pdf.setFont('helvetica', 'normal');
                    var lines = pdf.splitTextToSize(title, pageWidth - 50);
                    pdf.text(lines, 30, yPos);
                    yPos += lines.length * 4.5 + 1;
                });
                yPos += 8;
            }
            // Nouvelle page si nécessaire
            if (yPos > pageHeight - 80) {
                pdf.addPage();
                yPos = 30;
            }
            leftCol = 20;
            rightCol = pageWidth / 2 + 10;
            // Durée
            if (formation.duree) {
                // Titre avec bordure jaune
                pdf.setDrawColor(yellow[0], yellow[1], yellow[2]);
                pdf.setLineWidth(1);
                pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2);
                pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                pdf.setFontSize(14);
                pdf.setFont('helvetica', 'bold');
                pdf.text('INFORMATIONS PRATIQUES', leftCol, yPos);
                yPos += 12;
                // Encadré jaune pour les infos clés
                pdf.setFillColor(yellow[0], yellow[1], yellow[2]);
                pdf.roundedRect(20, yPos - 3, pageWidth - 40, 25, 3, 3, 'F');
                pdf.setFontSize(10);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                pdf.text("Duree: ".concat(formation.duree), 25, yPos + 4);
                if (formation.rythme)
                    pdf.text("Rythme: ".concat(formation.rythme), 25, yPos + 11);
                if (formation.modalite)
                    pdf.text("Modalite: Presentiel", 25, yPos + 18);
                yPos += 35;
            }
            // Évaluation
            if (formation.evaluation || formation.modalitesEvaluation) {
                pdf.setDrawColor(yellow[0], yellow[1], yellow[2]);
                pdf.setLineWidth(1);
                pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2);
                pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                pdf.setFontSize(14);
                pdf.setFont('helvetica', 'bold');
                pdf.text('ÉVALUATION & CERTIFICATION', leftCol, yPos);
                yPos += 12;
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(gray[0], gray[1], gray[2]);
                evaluations = formation.evaluation || formation.modalitesEvaluation;
                evaluations === null || evaluations === void 0 ? void 0 : evaluations.slice(0, 4).forEach(function (evaluation) {
                    pdf.setFillColor(yellow[0], yellow[1], yellow[2]);
                    pdf.circle(22, yPos - 1.5, 1.5, 'F');
                    var lines = pdf.splitTextToSize(evaluation, pageWidth - 45);
                    pdf.text(lines, 28, yPos);
                    yPos += lines.length * 4.5 + 2;
                });
                yPos += 10;
            }
            // Accessibilité
            pdf.setDrawColor(yellow[0], yellow[1], yellow[2]);
            pdf.setLineWidth(1);
            pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2);
            pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text('ACCESSIBILITE HANDICAP', leftCol, yPos);
            yPos += 12;
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(gray[0], gray[1], gray[2]);
            accessTexts = [
                'Formations accessibles aux personnes en situation de handicap',
                'Adaptation des modalités pédagogiques selon les besoins',
                'Référent handicap disponible pour accompagnement personnalisé'
            ];
            accessTexts.forEach(function (text) {
                pdf.setFillColor(yellow[0], yellow[1], yellow[2]);
                pdf.circle(22, yPos - 1.5, 1.5, 'F');
                pdf.text(text, 28, yPos);
                yPos += 6;
            });
            yPos += 10;
            // Tarif
            if (formation.cout) {
                pdf.setDrawColor(yellow[0], yellow[1], yellow[2]);
                pdf.setLineWidth(1);
                pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2);
                pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                pdf.setFontSize(14);
                pdf.setFont('helvetica', 'bold');
                pdf.text('TARIF & FINANCEMENT', leftCol, yPos);
                yPos += 12;
                pdf.setFontSize(10);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                pdf.text(formation.cout, 25, yPos);
                yPos += 8;
                if (formation.financement) {
                    pdf.setFontSize(9);
                    pdf.setFont('helvetica', 'normal');
                    pdf.setTextColor(gray[0], gray[1], gray[2]);
                    lines = pdf.splitTextToSize(formation.financement, pageWidth - 40);
                    pdf.text(lines, 25, yPos);
                    yPos += lines.length * 4.5;
                }
                yPos += 10;
            }
            footerY = pageHeight - 35;
            // Bande bleue
            pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
            pdf.rect(0, footerY - 5, pageWidth, 40, 'F');
            // Accent jaune
            pdf.setFillColor(yellow[0], yellow[1], yellow[2]);
            pdf.rect(0, footerY - 5, pageWidth, 3, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.text('CONSTRUCTION MANAGEMENT ACADEMY', 20, footerY + 5);
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Email: contact.academy@cma-education.com  |  Tel: 01 85 09 71 06  |  Adresse: Paris, France', 20, footerY + 12);
            // Informations personnalisées en jaune
            pdf.setTextColor(yellow[0], yellow[1], yellow[2]);
            pdf.setFontSize(7);
            pdf.text("Brochure pour: ".concat(userData.prenom, " ").concat(userData.nom, " | ").concat(userData.email, " | ").concat(new Date().toLocaleDateString('fr-FR')), 20, footerY + 20);
            return [2 /*return*/, pdf.output('blob')];
        });
    });
}
