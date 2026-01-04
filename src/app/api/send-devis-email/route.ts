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
    
    const entreprise = formData.get('entreprise') as string;
    const prenom = formData.get('prenom') as string;
    const nom = formData.get('nom') as string;
    const email = formData.get('email') as string;
    const telephone = formData.get('telephone') as string;
    const effectif = formData.get('effectif') as string;
    const thematique = formData.get('thematique') as string;
    const thematiqueLabel = formData.get('thematiqueLabel') as string;
    const message = formData.get('message') as string || '';

    // Validation
    if (!entreprise || !prenom || !nom || !email || !telephone || !effectif || !thematique) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    const notificationEmail = process.env.SMTP_USER || 'notification@cma-education.com';
    const destinationEmail = 'contact@cma-education.com';

    // Mapper effectif pour affichage
    const effectifLabels: Record<string, string> = {
      '1-5': '1 à 5 salariés',
      '6-10': '6 à 10 salariés',
      '11-20': '11 à 20 salariés',
      '20+': 'Plus de 20 salariés'
    };
    const effectifLabel = effectifLabels[effectif] || effectif;

    // Email HTML pour l'équipe CMA
    const internalHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de devis entreprise</title>
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table role="presentation" style="width: 100%; max-width: 650px; margin: 0 auto; border-collapse: collapse;">
    <tr>
      <td>
        <table style="width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 22px; font-weight: 600;">
                🏢 Nouvelle Demande de Devis Entreprise
              </h1>
              <span style="display: inline-block; background-color: #d1fae5; color: #065f46; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                Formation sur mesure
              </span>
            </td>
          </tr>

          <!-- Contenu -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Entreprise -->
              <table style="width: 100%; background-color: #ecfdf5; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #10b981;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #065f46; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">
                      🏢 ${entreprise}
                    </h2>
                    <p style="margin: 0; color: #047857; font-size: 14px;">
                      <strong>Effectif à former :</strong> ${effectifLabel}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Contact -->
              <table style="width: 100%; background-color: #f8fafc; border-radius: 12px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #1e3a5f; margin: 0 0 15px 0; font-size: 16px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      👤 Contact
                    </h2>
                    <table style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; width: 100px; font-size: 14px;">Nom</td>
                        <td style="padding: 8px 0; color: #1f2937; font-weight: 600; font-size: 14px;">${prenom} ${nom}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600; font-size: 14px;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Téléphone</td>
                        <td style="padding: 8px 0;">
                          <a href="tel:${telephone}" style="color: #2563eb; text-decoration: none; font-weight: 600; font-size: 14px;">${telephone}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Besoin -->
              <table style="width: 100%; background-color: #fef3c7; border-radius: 12px; border-left: 4px solid #f59e0b; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                      📚 Besoin de formation
                    </h2>
                    <p style="margin: 0 0 10px 0; color: #78350f; font-size: 14px;">
                      <strong>Thématique :</strong> ${thematiqueLabel || thematique}
                    </p>
                    ${message ? `
                    <p style="margin: 10px 0 0 0; color: #78350f; font-size: 14px; line-height: 1.6;">
                      <strong>Précisions :</strong><br/>
                      ${message}
                    </p>
                    ` : ''}
                  </td>
                </tr>
              </table>

              <!-- Actions -->
              <table style="width: 100%; margin-top: 25px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-right: 10px;">
                      ✉️ Répondre
                    </a>
                    <a href="tel:${telephone}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                      📞 Appeler
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px;">
                📅 Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">
                Construction Management Academy - Demande de devis entreprise
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

    // Envoyer à contact@cma-education.com
    await transporter.sendMail({
      from: `"CMA Education - Devis" <${notificationEmail}>`,
      to: destinationEmail,
      replyTo: email,
      subject: `🏢 Demande de devis - ${entreprise} (${effectifLabel})`,
      html: internalHTML,
    });

    console.log('✅ Email de devis envoyé à', destinationEmail);

    // Email de confirmation au client
    const confirmationHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation - Demande de devis</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700;">
                Construction Management Academy
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                Formation BTP pour les entreprises
              </p>
            </td>
          </tr>

          <!-- Contenu -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 70px; height: 70px; background-color: #d1fae5; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">✅</span>
                </div>
                <h2 style="color: #1e3a5f; margin: 0 0 10px 0; font-size: 24px;">
                  Demande de devis reçue !
                </h2>
                <p style="color: #4a5568; font-size: 16px; margin: 0;">
                  Bonjour ${prenom}, merci pour votre demande.
                </p>
              </div>

              <!-- Récapitulatif -->
              <table style="width: 100%; background-color: #f8fafc; border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #1e3a5f; margin: 0 0 20px 0; font-size: 16px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      📋 Récapitulatif de votre demande
                    </h3>
                    <table style="width: 100%;">
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Entreprise</td>
                        <td style="padding: 10px 0; color: #1f2937; font-weight: 600; font-size: 14px; border-bottom: 1px solid #e5e7eb; text-align: right;">${entreprise}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Effectif à former</td>
                        <td style="padding: 10px 0; color: #1f2937; font-weight: 600; font-size: 14px; border-bottom: 1px solid #e5e7eb; text-align: right;">${effectifLabel}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Thématique</td>
                        <td style="padding: 10px 0; color: #1f2937; font-weight: 600; font-size: 14px; border-bottom: 1px solid #e5e7eb; text-align: right;">${thematiqueLabel || thematique}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Date de demande</td>
                        <td style="padding: 10px 0; color: #1f2937; font-weight: 600; font-size: 14px; text-align: right;">${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Prochaines étapes -->
              <table style="width: 100%; background-color: #dbeafe; border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                      ⏱️ Prochaines étapes
                    </h3>
                    <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; line-height: 1.8;">
                      <li>Analyse de votre besoin par notre équipe</li>
                      <li>Élaboration d'un programme personnalisé</li>
                      <li>Envoi du devis sous <strong>24-48h ouvrées</strong></li>
                      <li>Échange téléphonique pour affiner votre projet</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Contact -->
              <table style="width: 100%; text-align: center;">
                <tr>
                  <td style="padding: 20px; background-color: #f8fafc; border-radius: 12px;">
                    <p style="margin: 0 0 15px 0; color: #4a5568; font-size: 14px;">
                      📞 <strong>Une question urgente ?</strong>
                    </p>
                    <a href="tel:0185097106" style="display: inline-block; background-color: #1e3a5f; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                      Appelez-nous : 01 85 09 71 06
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e3a5f; padding: 30px; text-align: center; border-radius: 0 0 16px 16px;">
              <p style="color: rgba(255,255,255,0.9); margin: 0 0 8px 0; font-size: 14px;">
                📍 67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne
              </p>
              <p style="color: rgba(255,255,255,0.7); margin: 0 0 15px 0; font-size: 13px;">
                ✉️ contact@cma-education.com | 📞 01 85 09 71 06
              </p>
              <a href="https://www.cma-education.com" style="color: #fbbf24; text-decoration: none; font-size: 13px; font-weight: 600;">
                www.cma-education.com
              </a>
              <p style="color: rgba(255,255,255,0.5); margin: 15px 0 0 0; font-size: 11px;">
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
      subject: `✅ Demande de devis reçue - Construction Management Academy`,
      html: confirmationHTML,
    });

    console.log('✅ Email de confirmation envoyé à', email);

    return NextResponse.json({ 
      success: true, 
      message: 'Demande de devis envoyée avec succès' 
    });

  } catch (error) {
    console.error('❌ Erreur API send-devis-email:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'API send-devis-email disponible',
    destination: 'contact@cma-education.com'
  });
}
