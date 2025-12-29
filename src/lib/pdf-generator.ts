import jsPDF from 'jspdf'

interface FormData {
  nom: string
  prenom: string
  type: string
  email: string
  telephone: string
}

export async function generateBrochurePDF(formation: any, userData: FormData): Promise<Blob> {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  // Couleurs du thème - Nouveau design
  const primaryBlue = [0, 0, 255]      // #0000FF
  const yellow = [255, 255, 0]         // #FFFF00
  const white = [255, 255, 255]        // #FFFFFF
  const darkBlue = [0, 0, 204]         // Bleu foncé
  const gray = [51, 51, 51]            // Texte

  // Header avec design bleu/jaune
  pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  pdf.rect(0, 0, pageWidth, 70, 'F')
  
  // Accent jaune en haut à droite
  pdf.setFillColor(yellow[0], yellow[1], yellow[2])
  pdf.circle(pageWidth - 30, 20, 25, 'F')
  
  // Logo CMA (cercle blanc avec texte)
  pdf.setFillColor(255, 255, 255)
  pdf.circle(30, 25, 12, 'F')
  pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('CMA', 22, 28)
  
  // Titre
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(20)
  pdf.setFont('helvetica', 'bold')
  pdf.text('CONSTRUCTION MANAGEMENT ACADEMY', 50, 30)

  // Niveau en jaune
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(yellow[0], yellow[1], yellow[2])
  pdf.text(formation.level || 'FORMATION PROFESSIONNELLE', 20, 50)
  
  // Titre de la formation
  pdf.setFontSize(20)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  const title = formation.title.length > 60 ? formation.title.substring(0, 60) + '...' : formation.title
  const titleLines = pdf.splitTextToSize(title, pageWidth - 40)
  pdf.text(titleLines, 20, 90)

  // RNCP en badge jaune
  if (formation.rncp) {
    const rnpcY = 90 + (titleLines.length * 8)
    pdf.setFillColor(yellow[0], yellow[1], yellow[2])
    pdf.roundedRect(20, rnpcY, 50, 8, 2, 2, 'F')
    pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text(formation.rncp, 23, rnpcY + 6)
  }

  let yPos = 120

  // Section Objectifs
  if (formation.objectifs) {
    // Titre avec bordure jaune
    pdf.setDrawColor(yellow[0], yellow[1], yellow[2])
    pdf.setLineWidth(1)
    pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2)
    
    pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('OBJECTIFS DE LA FORMATION', 20, yPos)
    yPos += 12

    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(gray[0], gray[1], gray[2])
    
    formation.objectifs.slice(0, 5).forEach((obj: string) => {
      // Puce jaune
      pdf.setFillColor(yellow[0], yellow[1], yellow[2])
      pdf.circle(22, yPos - 1.5, 1.5, 'F')
      
      const lines = pdf.splitTextToSize(obj, pageWidth - 45)
      pdf.text(lines, 28, yPos)
      yPos += lines.length * 4.5 + 2
    })
    yPos += 8
  }

  // Section Programme
  if (formation.programme && yPos < pageHeight - 40) {
    // Titre avec bordure jaune
    pdf.setDrawColor(yellow[0], yellow[1], yellow[2])
    pdf.setLineWidth(1)
    pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2)
    
    pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('PROGRAMME DÉTAILLÉ', 20, yPos)
    yPos += 12

    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(gray[0], gray[1], gray[2])
    
    formation.programme.slice(0, 8).forEach((prog: string, index: number) => {
      const title = prog.split(' : ')[0]
      // Numéro en bleu
      pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
      pdf.setFont('helvetica', 'bold')
      pdf.text(`${index + 1}.`, 22, yPos)
      
      pdf.setTextColor(gray[0], gray[1], gray[2])
      pdf.setFont('helvetica', 'normal')
      const lines = pdf.splitTextToSize(title, pageWidth - 50)
      pdf.text(lines, 30, yPos)
      yPos += lines.length * 4.5 + 1
    })
    yPos += 8
  }

  // Nouvelle page si nécessaire
  if (yPos > pageHeight - 80) {
    pdf.addPage()
    yPos = 30
  }

  // Informations pratiques en colonnes
  const leftCol = 20
  const rightCol = pageWidth / 2 + 10

  // Durée
  if (formation.duree) {
    // Titre avec bordure jaune
    pdf.setDrawColor(yellow[0], yellow[1], yellow[2])
    pdf.setLineWidth(1)
    pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2)
    
    pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('INFORMATIONS PRATIQUES', leftCol, yPos)
    yPos += 12

    // Encadré jaune pour les infos clés
    pdf.setFillColor(yellow[0], yellow[1], yellow[2])
    pdf.roundedRect(20, yPos - 3, pageWidth - 40, 25, 3, 3, 'F')
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.text(`Duree: ${formation.duree}`, 25, yPos + 4)
    if (formation.rythme) pdf.text(`Rythme: ${formation.rythme}`, 25, yPos + 11)
    if (formation.modalite) pdf.text(`Modalite: Presentiel`, 25, yPos + 18)
    yPos += 35
  }

  // Évaluation
  if (formation.evaluation || formation.modalitesEvaluation) {
    pdf.setDrawColor(yellow[0], yellow[1], yellow[2])
    pdf.setLineWidth(1)
    pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2)
    
    pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('ÉVALUATION & CERTIFICATION', leftCol, yPos)
    yPos += 12

    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(gray[0], gray[1], gray[2])
    
    const evaluations = formation.evaluation || formation.modalitesEvaluation
    evaluations?.slice(0, 4).forEach((evaluation: string) => {
      pdf.setFillColor(yellow[0], yellow[1], yellow[2])
      pdf.circle(22, yPos - 1.5, 1.5, 'F')
      
      const lines = pdf.splitTextToSize(evaluation, pageWidth - 45)
      pdf.text(lines, 28, yPos)
      yPos += lines.length * 4.5 + 2
    })
    yPos += 10
  }

  // Accessibilité
  pdf.setDrawColor(yellow[0], yellow[1], yellow[2])
  pdf.setLineWidth(1)
  pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2)
  
  pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('ACCESSIBILITE HANDICAP', leftCol, yPos)
  yPos += 12

  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(gray[0], gray[1], gray[2])
  
  const accessTexts = [
    'Formations accessibles aux personnes en situation de handicap',
    'Adaptation des modalités pédagogiques selon les besoins',
    'Référent handicap disponible pour accompagnement personnalisé'
  ]
  
  accessTexts.forEach(text => {
    pdf.setFillColor(yellow[0], yellow[1], yellow[2])
    pdf.circle(22, yPos - 1.5, 1.5, 'F')
    pdf.text(text, 28, yPos)
    yPos += 6
  })
  yPos += 10

  // Tarif
  if (formation.cout) {
    pdf.setDrawColor(yellow[0], yellow[1], yellow[2])
    pdf.setLineWidth(1)
    pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2)
    
    pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('TARIF & FINANCEMENT', leftCol, yPos)
    yPos += 12

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.text(formation.cout, 25, yPos)
    yPos += 8
    
    if (formation.financement) {
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(gray[0], gray[1], gray[2])
      const lines = pdf.splitTextToSize(formation.financement, pageWidth - 40)
      pdf.text(lines, 25, yPos)
      yPos += lines.length * 4.5
    }
    yPos += 10
  }

  // Footer avec informations de contact
  const footerY = pageHeight - 35
  
  // Bande bleue
  pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  pdf.rect(0, footerY - 5, pageWidth, 40, 'F')
  
  // Accent jaune
  pdf.setFillColor(yellow[0], yellow[1], yellow[2])
  pdf.rect(0, footerY - 5, pageWidth, 3, 'F')

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('CONSTRUCTION MANAGEMENT ACADEMY', 20, footerY + 5)

  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Email: contact.academy@cma-education.com  |  Tel: 01 85 09 71 06  |  Adresse: Paris, France', 20, footerY + 12)
  
  // Informations personnalisées en jaune
  pdf.setTextColor(yellow[0], yellow[1], yellow[2])
  pdf.setFontSize(7)
  pdf.text(`Brochure pour: ${userData.prenom} ${userData.nom} | ${userData.email} | ${new Date().toLocaleDateString('fr-FR')}`, 20, footerY + 20)

  return pdf.output('blob')
}
