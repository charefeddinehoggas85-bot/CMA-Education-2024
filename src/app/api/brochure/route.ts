import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nom, email, telephone } = body

    // Validation
    if (!nom || !email || !telephone) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // TODO: Sauvegarder dans votre base de données
    // TODO: Envoyer un email de confirmation
    // TODO: Envoyer la brochure par email à contact.academy@cma-education.com
    
    console.log('Nouvelle demande de brochure:', { nom, email, telephone, date: new Date() })

    // Vous pouvez intégrer avec EmailJS, Resend, ou votre service d'emailing
    // Exemple avec fetch vers un service externe:
    /*
    await fetch('https://api.emailservice.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Votre brochure CMA Academy',
        template: 'brochure-download',
        data: { nom }
      })
    })
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Demande enregistrée avec succès' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API brochure:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
