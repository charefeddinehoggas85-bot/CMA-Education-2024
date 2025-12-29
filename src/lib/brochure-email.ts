import emailjs from '@emailjs/browser'

interface BrochureDownloadData {
  // Informations de la formation
  formation: {
    id: string | number
    title: string
    level?: string
    slug: string
  }
  
  // Informations de l'utilisateur
  user: {
    nom: string
    prenom: string
    type: string
    email: string
    telephone: string
  }
  
  // Informations contextuelles
  brochureType: string
  pageUrl?: string
}

export async function sendBrochureDownloadNotification(data: BrochureDownloadData) {
  try {
    console.log('📧 Envoi de la notification de téléchargement de brochure...')
    
    // Configuration EmailJS depuis les variables d'environnement
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_cma2026'
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_brochure_download'
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    
    if (!publicKey) {
      throw new Error('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY manquant dans .env.local')
    }
    
    // Préparer les données pour EmailJS
    const emailData = {
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
      user_fullname: `${data.user.prenom} ${data.user.nom}`,
      formation_url: `${window.location.origin}/formations/${data.formation.slug}`,
      timestamp: new Date().toISOString()
    }
    
    console.log('📤 Envoi vers:', emailData.to_email)
    console.log('👤 Candidat:', emailData.user_fullname)
    console.log('📚 Formation:', emailData.formation_title)
    
    // Envoyer l'email via EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      emailData,
      publicKey
    )
    
    console.log('✅ Email envoyé avec succès:', response.status, response.text)
    
    return {
      success: true,
      messageId: response.text,
      status: response.status
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error)
    
    // Log détaillé pour le debug
    if (error instanceof Error) {
      console.error('Message d\'erreur:', error.message)
      console.error('Stack trace:', error.stack)
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }
  }
}

// Fonction utilitaire pour valider les données avant envoi
export function validateBrochureData(data: Partial<BrochureDownloadData>): string[] {
  const errors: string[] = []
  
  // Validation formation
  if (!data.formation?.title) errors.push('Titre de formation manquant')
  if (!data.formation?.slug) errors.push('Slug de formation manquant')
  
  // Validation utilisateur
  if (!data.user?.nom) errors.push('Nom utilisateur manquant')
  if (!data.user?.prenom) errors.push('Prénom utilisateur manquant')
  if (!data.user?.email) errors.push('Email utilisateur manquant')
  if (!data.user?.telephone) errors.push('Téléphone utilisateur manquant')
  if (!data.user?.type) errors.push('Type utilisateur manquant')
  
  // Validation email
  if (data.user?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.user.email)) {
    errors.push('Format email invalide')
  }
  
  return errors
}

// Types pour l'export
export type { BrochureDownloadData }