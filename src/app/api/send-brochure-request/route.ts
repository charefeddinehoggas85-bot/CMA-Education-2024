import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { formation, formationId, nom, prenom, type, email, telephone } = await request.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'contact.academy@cma-education.com',
      subject: `Demande de brochure - ${formation}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2962ff 0%, #1e3a8a 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle demande de brochure</h1>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #1e3a8a; margin-bottom: 20px;">Informations du demandeur</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>Nom:</strong> ${nom}</p>
              <p><strong>Prénom:</strong> ${prenom}</p>
              <p><strong>Profil:</strong> ${type}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Téléphone:</strong> ${telephone}</p>
            </div>
            
            <h3 style="color: #1e3a8a; margin-bottom: 15px;">Formation demandée</h3>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <p><strong>Formation:</strong> ${formation}</p>
              <p><strong>ID Formation:</strong> ${formationId}</p>
              <p><strong>Date de demande:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #065f46;">
                <strong>🌱 Action éco-responsable:</strong> Cette brochure a été générée numériquement. 
                Le demandeur a été sensibilisé à la préservation de l'environnement en évitant l'impression.
              </p>
            </div>
          </div>
          
          <div style="background: #1e3a8a; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 14px;">
              CMA Education - Construction Management Academy<br>
              contact.academy@cma-education.com | 01 85 09 71 06
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}