// Générateur de Brochures Professionnelles CMA 2026
// Design: Bleu #0000FF, Jaune #FFFF00, Blanc #FFFFFF

import { formationsAlternance, formationsReconversion } from './data'
import { formationsVRD } from './formations-vrd'

interface Formation {
  id: string
  level: string
  title: string
  rncp: string
  shortDesc: string
  fullDesc: string
  objectifs: string[]
  programme: string[]
  debouches: string[]
  duree: string
  volumeHoraire: string
  rythme: string
  modalite: string
  effectif: string
  prerequis: string[]
  cout: string
  evaluation?: string[]
  poursuites?: string[]
  certificateur: string
  [key: string]: any
}

const COLORS = {
  bleu: '#0000FF',
  jaune: '#FFFF00',
  blanc: '#FFFFFF',
  bleuFonce: '#0000CC',
  jauneClair: '#FFFF66'
}

export function generateBrochureHTML(formationId: string): string {
  // Trouver la formation
  const allFormations = [...formationsAlternance, ...formationsReconversion, ...formationsVRD]
  const formation = allFormations.find(f => f.id === formationId)
  
  if (!formation) {
    throw new Error(`Formation ${formationId} non trouvée`)
  }

  // Calculer le nombre de pages nécessaires
  const contentSize = calculateContentSize(formation)
  const pages = contentSize > 1500 ? 3 : 2

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brochure - ${formation.title}</title>
  <style>
    ${generateCSS()}
  </style>
</head>
<body>
  ${generatePage1(formation)}
  ${generatePage2(formation)}
  ${pages === 3 ? generatePage3(formation) : ''}
</body>
</html>
  `
}

function calculateContentSize(formation: Formation): number {
  let size = 0
  size += formation.objectifs.length * 50
  size += formation.programme.length * 80
  size += formation.debouches.length * 40
  size += (formation.evaluation?.length || 0) * 40
  size += (formation.poursuites?.length || 0) * 40
  return size
}

function generateCSS(): string {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    @page {
      size: A4;
      margin: 0;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      line-height: 1.6;
    }

    .page {
      width: 210mm;
      height: 297mm;
      padding: 20mm;
      background: ${COLORS.blanc};
      page-break-after: always;
      position: relative;
      overflow: hidden;
    }

    .page:last-child {
      page-break-after: auto;
    }

    /* Header avec logo et bandes colorées */
    .header {
      position: relative;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 4px solid ${COLORS.bleu};
    }

    .logo {
      width: 180px;
      height: auto;
      margin-bottom: 15px;
    }

    .header-band {
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      height: 100%;
      background: linear-gradient(135deg, ${COLORS.bleu} 0%, ${COLORS.bleuFonce} 100%);
      opacity: 0.1;
      z-index: 0;
    }

    .header-band-yellow {
      position: absolute;
      top: 0;
      right: 100px;
      width: 50px;
      height: 100%;
      background: ${COLORS.jaune};
      opacity: 0.2;
      z-index: 0;
    }

    /* Titres */
    .title {
      font-size: 28px;
      font-weight: bold;
      color: ${COLORS.bleu};
      margin-bottom: 10px;
      line-height: 1.3;
      position: relative;
      z-index: 1;
    }

    .subtitle {
      font-size: 16px;
      color: #666;
      margin-bottom: 5px;
      font-weight: 600;
    }

    .rncp {
      display: inline-block;
      background: ${COLORS.jaune};
      color: #000;
      padding: 5px 15px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 14px;
      margin-top: 10px;
    }

    /* Sections */
    .section {
      margin-bottom: 25px;
    }

    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: ${COLORS.bleu};
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid ${COLORS.jaune};
      display: flex;
      align-items: center;
    }

    .section-title::before {
      content: '';
      width: 8px;
      height: 8px;
      background: ${COLORS.jaune};
      border-radius: 50%;
      margin-right: 10px;
    }

    .section-content {
      font-size: 13px;
      color: #444;
      line-height: 1.8;
    }

    /* Listes */
    .list-item {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
      border-left: 3px solid ${COLORS.bleu};
      margin-bottom: 8px;
      background: linear-gradient(90deg, rgba(0,0,255,0.03) 0%, rgba(255,255,255,1) 100%);
    }

    .list-item::before {
      content: '▸';
      position: absolute;
      left: 8px;
      color: ${COLORS.jaune};
      font-weight: bold;
    }

    /* Encadrés */
    .info-box {
      background: linear-gradient(135deg, rgba(0,0,255,0.05) 0%, rgba(255,255,0,0.05) 100%);
      border: 2px solid ${COLORS.bleu};
      border-left: 6px solid ${COLORS.jaune};
      padding: 15px;
      margin: 15px 0;
      border-radius: 8px;
    }

    .info-box-title {
      font-weight: bold;
      color: ${COLORS.bleu};
      margin-bottom: 8px;
      font-size: 14px;
    }

    .info-box-content {
      font-size: 13px;
      color: #555;
    }

    /* Grid pour informations pratiques */
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-top: 15px;
    }

    .info-item {
      background: ${COLORS.blanc};
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .info-item-label {
      font-weight: bold;
      color: ${COLORS.bleu};
      font-size: 12px;
      margin-bottom: 5px;
    }

    .info-item-value {
      font-size: 13px;
      color: #333;
    }

    /* Footer */
    .footer {
      position: absolute;
      bottom: 15mm;
      left: 20mm;
      right: 20mm;
      padding-top: 15px;
      border-top: 3px solid ${COLORS.bleu};
      font-size: 11px;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-contact {
      font-size: 11px;
    }

    .footer-contact strong {
      color: ${COLORS.bleu};
    }

    .page-number {
      background: ${COLORS.jaune};
      color: #000;
      padding: 5px 12px;
      border-radius: 15px;
      font-weight: bold;
    }

    /* Débouchés avec salaires */
    .debouche-item {
      padding: 10px;
      margin-bottom: 8px;
      background: linear-gradient(90deg, rgba(255,255,0,0.1) 0%, rgba(255,255,255,1) 100%);
      border-left: 4px solid ${COLORS.jaune};
      border-radius: 4px;
      font-size: 13px;
    }

    .debouche-title {
      font-weight: 600;
      color: #333;
    }

    .debouche-salary {
      color: ${COLORS.bleu};
      font-weight: bold;
      font-size: 12px;
      margin-top: 3px;
    }

    /* Bande décorative */
    .decorative-band {
      position: absolute;
      top: 0;
      right: 0;
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, ${COLORS.bleu} 0%, ${COLORS.jaune} 100%);
      opacity: 0.1;
      border-radius: 0 0 0 100%;
      z-index: 0;
    }

    @media print {
      .page {
        margin: 0;
        border: none;
        box-shadow: none;
      }
    }
  `
}

function generatePage1(formation: Formation): string {
  return `
    <div class="page">
      <div class="decorative-band"></div>
      <div class="header-band"></div>
      <div class="header-band-yellow"></div>
      
      <div class="header">
        <img src="/logoo.svg" alt="CMA Logo" class="logo" />
        <div class="subtitle">${formation.level}</div>
        <h1 class="title">${formation.title}</h1>
        <span class="rncp">Code RNCP : ${formation.rncp}</span>
      </div>

      <div class="section">
        <h2 class="section-title">Présentation de la Formation</h2>
        <div class="section-content">
          <p><strong>${formation.shortDesc}</strong></p>
          <p style="margin-top: 10px;">${formation.fullDesc}</p>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Objectifs Pédagogiques</h2>
        <div class="section-content">
          ${formation.objectifs.slice(0, 4).map(obj => `
            <div class="list-item">${obj}</div>
          `).join('')}
          ${formation.objectifs.length > 4 ? '<p style="margin-top: 10px; font-style: italic; color: #666;">Suite page suivante...</p>' : ''}
        </div>
      </div>

      <div class="info-box">
        <div class="info-box-title">📅 Informations Clés</div>
        <div class="info-box-content">
          <strong>Durée :</strong> ${formation.duree}<br>
          <strong>Volume horaire :</strong> ${formation.volumeHoraire}<br>
          <strong>Rythme :</strong> ${formation.rythme}
        </div>
      </div>

      <div class="footer">
        <div class="footer-contact">
          <strong>CMA - Construction Management Academy</strong><br>
          67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne<br>
          📞 01 85 09 71 06 | ✉️ contact.academy@cma-education.com
        </div>
        <div class="page-number">Page 1</div>
      </div>
    </div>
  `
}

function generatePage2(formation: Formation): string {
  const remainingObjectifs = formation.objectifs.slice(4)
  
  return `
    <div class="page">
      <div class="decorative-band"></div>
      
      <div class="header">
        <img src="/logoo.svg" alt="CMA Logo" class="logo" />
        <h2 class="title" style="font-size: 22px;">${formation.title}</h2>
      </div>

      ${remainingObjectifs.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Objectifs Pédagogiques (suite)</h2>
          <div class="section-content">
            ${remainingObjectifs.map(obj => `
              <div class="list-item">${obj}</div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="section">
        <h2 class="section-title">Programme Détaillé</h2>
        <div class="section-content">
          ${formation.programme.map(prog => `
            <div class="list-item">${prog}</div>
          `).join('')}
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Débouchés Professionnels</h2>
        <div class="section-content">
          ${formation.debouches.map(deb => {
            const [metier, salaire] = deb.includes('salaire') 
              ? deb.split('(salaire')
              : [deb, '']
            return `
              <div class="debouche-item">
                <div class="debouche-title">${metier.trim()}</div>
                ${salaire ? `<div class="debouche-salary">💰 Salaire ${salaire.replace(')', '').trim()}</div>` : ''}
              </div>
            `
          }).join('')}
        </div>
      </div>

      <div class="footer">
        <div class="footer-contact">
          <strong>CMA - Construction Management Academy</strong><br>
          📞 01 85 09 71 06 | ✉️ contact.academy@cma-education.com
        </div>
        <div class="page-number">Page 2</div>
      </div>
    </div>
  `
}

function generatePage3(formation: Formation): string {
  return `
    <div class="page">
      <div class="decorative-band"></div>
      
      <div class="header">
        <img src="/logoo.svg" alt="CMA Logo" class="logo" />
        <h2 class="title" style="font-size: 22px;">${formation.title}</h2>
      </div>

      <div class="section">
        <h2 class="section-title">Informations Pratiques</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-item-label">⏱️ Durée</div>
            <div class="info-item-value">${formation.duree}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">📚 Volume Horaire</div>
            <div class="info-item-value">${formation.volumeHoraire}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">🔄 Rythme</div>
            <div class="info-item-value">${formation.rythme}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">📍 Modalité</div>
            <div class="info-item-value">${formation.modalite}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">👥 Effectif</div>
            <div class="info-item-value">${formation.effectif}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">💰 Coût</div>
            <div class="info-item-value">${formation.cout}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Prérequis</h2>
        <div class="section-content">
          ${formation.prerequis.map(pre => `
            <div class="list-item">${pre}</div>
          `).join('')}
        </div>
      </div>

      ${formation.evaluation ? `
        <div class="section">
          <h2 class="section-title">Évaluation et Certification</h2>
          <div class="section-content">
            ${formation.evaluation.map(item => `
              <div class="list-item">${item}</div>
            `).join('')}
            <div class="info-box" style="margin-top: 15px;">
              <div class="info-box-title">🎓 Certificateur</div>
              <div class="info-box-content">${formation.certificateur}</div>
            </div>
          </div>
        </div>
      ` : ''}

      ${formation.poursuites ? `
        <div class="section">
          <h2 class="section-title">Poursuites d'Études</h2>
          <div class="section-content">
            ${formation.poursuites.map(item => `
              <div class="list-item">${item}</div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="info-box" style="background: linear-gradient(135deg, rgba(0,0,255,0.1) 0%, rgba(255,255,0,0.1) 100%); border: 3px solid ${COLORS.bleu};">
        <div class="info-box-title" style="font-size: 16px;">📞 Contact & Inscription</div>
        <div class="info-box-content">
          <strong>Construction Management Academy</strong><br>
          67-69 Avenue du Général de Gaulle<br>
          77420 Champs sur Marne<br><br>
          <strong style="color: ${COLORS.bleu};">Téléphone :</strong> 01 85 09 71 06<br>
          <strong style="color: ${COLORS.bleu};">Email :</strong> contact.academy@cma-education.com<br>
          <strong style="color: ${COLORS.bleu};">Inscription :</strong> inscription.academy@cma-education.com
        </div>
      </div>

      <div class="footer">
        <div class="footer-contact">
          <strong>CMA - Construction Management Academy</strong><br>
          Formation certifiante RNCP | Établissement d'enseignement supérieur
        </div>
        <div class="page-number">Page 3</div>
      </div>
    </div>
  `
}

// Fonction pour générer toutes les brochures
export function generateAllBrochures() {
  const allFormations = [...formationsAlternance, ...formationsReconversion, ...formationsVRD]
  
  return allFormations.map(formation => ({
    id: formation.id,
    title: formation.title,
    html: generateBrochureHTML(formation.id)
  }))
}

// Export pour utilisation dans l'API
export { generateBrochureHTML as default }
