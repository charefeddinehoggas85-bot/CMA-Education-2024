import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validation des données
    const { formation, user, brochureType, pageUrl } = data
    
    if (!formation || !user || !user.email || !user.nom || !user.prenom) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER, // Votre email professionnel
        pass: process.env.EMAIL_PASSWORD // Mot de passe d'application
      }
    })

    // Contenu de l'email
    const emailContent = `
Nouvelle demande de téléchargement de brochure

📋 INFORMATIONS DE LA FORMATION
Formation: ${formation.title}
Niveau: ${formation.level || 'Non spécifié'}
Slug: ${formation.slug}
ID: ${formation.id}

👤 INFORMATIONS DU CANDIDAT
Nom complet: ${user.prenom} ${user.nom}
Nom: ${user.nom}
Prénom: ${user.prenom}
Profil: ${user.type}
Email: ${user.email}
Téléphone: ${user.telephone}

📅 INFORMATIONS DE LA DEMANDE
Date: ${new Date().toLocaleDateString('fr-FR')}
Heure: ${new Date().toLocaleTimeString('fr-FR')}
Type de brochure: ${brochureType}
Page d'origine: ${pageUrl}

---
Cette demande a été générée automatiquement par le site Construction Management Academy.
    `

    // Options de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'contact.academy@cma-education.com',
      subject: `Nouvelle demande de brochure - ${formation.title}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    }

    // Envoyer l'email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Email envoyé avec succès' 
    })

  } catch (error) {
    console.error('Erreur envoi email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
}