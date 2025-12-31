interface BrochureData {
  formation: {
    id: string | number
    title: string
    level?: string
    slug: string
  }
  user: {
    nom: string
    prenom: string
    type: string
    email: string
    telephone: string
  }
  brochureType: string
  pageUrl?: string
}

export async function sendBrochureNotification(data: BrochureData) {
  try {
    console.log('📧 Envoi de la notification de brochure...')
    
    const response = await fetch('/api/send-brochure-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erreur lors de l\'envoi')
    }

    const result = await response.json()
    console.log('✅ Email envoyé avec succès')
    
    return {
      success: true,
      message: result.message
    }

  } catch (error) {
    console.error('❌ Erreur envoi email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }
  }
}

export type { BrochureData }
