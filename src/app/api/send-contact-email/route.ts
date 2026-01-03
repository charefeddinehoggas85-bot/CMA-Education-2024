import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuration SMTP Hostinger
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'notification@cma-education.com',
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const nom = formData.get('nom') as string;
    const prenom = formData.get('prenom') as string;
    const email = formData.get('email') as string;
    const telephone = formData.get('telephone') as string;
    const sujet = formData.get('sujet') as string;
    const message = formData.get('message') as string;

    // Validation
    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont requis' },
        { status: 400 }
      );
    }

    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'notification@cma-education.com';
    const inscriptionEmail = process.env.INSCRIPTION_EMAIL || 'inscription@cma-education.com';

    // Email HTML pour l'équipe
    const internalHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouveau message de contact</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <tr>
      <td style="background-color: #1e3a5f; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">📬 Nouveau Message de Contact</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #1e3a5f; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          Informations du contact
        </h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 140px;">Nom complet :</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">${prenom || ''} ${nom}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email :</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a>
            </td>
          </tr>
          ${telephone ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Téléphone :</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <a href="tel:${telephone}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${telephone}</a>
            </td>
          </tr>
          ` : ''}
          ${sujet ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Sujet :</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${sujet}</td>
          </tr>
          ` : ''}
        </table>

        <h2 style="color: #1e3a5f; margin: 30px 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          Message
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
          <p style="margin: 0; color: #374151; white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>

        <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>📅 Reçu le :</strong> ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
          </p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #6b7280; font-size: 12px;">
          Email généré automatiquement par le site CMA Education
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Envoyer l'email à l'équipe
    await transporter.sendMail({
      from: `"CMA Education - Site Web" <${notificationEmail}>`,
      to: inscriptionEmail,
      replyTo: email,
      subject: `📬 Nouveau message de contact - ${prenom || ''} ${nom}`,
      html: internalHTML,
    });

    console.log('✅ Email de contact envoyé à', inscriptionEmail);

    // Email de confirmation au visiteur
    const confirmationHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Confirmation - Construction Management Academy</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                Construction Management Academy
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">
                Centre de Formation BTP d'Excellence
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #1e3a5f; margin: 0 0 20px 0; font-size: 22px;">
                Bonjour ${prenom || nom},
              </h2>
              
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Nous avons bien reçu votre message et nous vous en remercions.
              </p>

              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Notre équipe vous répondra dans les plus brefs délais, généralement sous 24 à 48 heures ouvrées.
              </p>

              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 12px; margin: 30px 0;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #1e3a5f; margin: 0 0 15px 0; font-size: 18px;">
                      📞 Besoin d'une réponse urgente ?
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.6;">
                      N'hésitez pas à nous appeler directement au <strong>01 85 09 71 06</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color: #1e3a5f; padding: 30px; text-align: center; border-radius: 0 0 16px 16px;">
              <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px 0; font-size: 14px;">
                📍 67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne
              </p>
              <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 12px;">
                © ${new Date().getFullYear()} Construction Management Academy
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"Construction Management Academy" <${notificationEmail}>`,
      to: email,
      subject: `Confirmation de votre message - Construction Management Academy`,
      html: confirmationHTML,
    });

    console.log('✅ Email de confirmation envoyé à', email);

    return NextResponse.json({ 
      success: true, 
      message: 'Message envoyé avec succès' 
    });

  } catch (error) {
    console.error('❌ Erreur API send-contact-email:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'API send-contact-email disponible'
  });
}
