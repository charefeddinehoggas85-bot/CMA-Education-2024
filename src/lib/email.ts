import nodemailer from 'nodemailer';

// Log de debug pour vérifier la configuration
console.log('📧 SMTP Config Check:', {
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: process.env.SMTP_PORT || '465',
  user: process.env.SMTP_USER || 'notification@cma-education.com',
  passConfigured: !!process.env.SMTP_PASS,
  passLength: process.env.SMTP_PASS?.length || 0
});

// Configuration SMTP Hostinger
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_USER || 'notification@cma-education.com',
    pass: process.env.SMTP_PASS || '',
  },
});

export interface BrochureDownloadData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  profil: string;
  formationTitle: string;
  formationSlug?: string;
}

// Email HTML professionnel pour le demandeur
function generateUserEmailHTML(data: BrochureDownloadData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre brochure - Construction Management Academy</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);">
          
          <!-- Header avec Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <img src="https://www.cma-education.com/images/logo-white.png" alt="Construction Management Academy" style="max-width: 200px; height: auto;" />
              <h1 style="color: #ffffff; margin: 20px 0 0 0; font-size: 24px; font-weight: 600;">
                Construction Management Academy
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">
                Centre de Formation BTP d'Excellence
              </p>
            </td>
          </tr>

          <!-- Contenu Principal -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #1e3a5f; margin: 0 0 20px 0; font-size: 22px;">
                Bonjour ${data.prenom} ${data.nom},
              </h2>
              
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Nous vous remercions pour l'intérêt que vous portez à notre formation 
                <strong style="color: #1e3a5f;">${data.formationTitle}</strong>.
              </p>

              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Votre brochure a été téléchargée avec succès. Notre équipe pédagogique reste à votre disposition pour répondre à toutes vos questions.
              </p>

              <!-- Bouton CTA -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://www.cma-education.com/contact" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1e3a5f 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Nous Contacter
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Encart Informations -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 12px; margin: 30px 0;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #1e3a5f; margin: 0 0 15px 0; font-size: 18px;">
                      📋 Récapitulatif de votre demande
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Formation :</td>
                        <td style="padding: 8px 0; color: #1e3a5f; font-size: 14px; font-weight: 600;">${data.formationTitle}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Profil :</td>
                        <td style="padding: 8px 0; color: #1e3a5f; font-size: 14px;">${data.profil}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Date :</td>
                        <td style="padding: 8px 0; color: #1e3a5f; font-size: 14px;">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Section Contact -->
          <tr>
            <td style="padding: 0 30px 40px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; border: 1px solid #bae6fd;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #1e3a5f; margin: 0 0 20px 0; font-size: 18px; text-align: center;">
                      📞 Contactez-nous
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 10px; text-align: center;">
                          <p style="margin: 0; color: #64748b; font-size: 13px;">Téléphone</p>
                          <a href="tel:+33185097106" style="color: #1e3a5f; font-size: 16px; font-weight: 600; text-decoration: none;">
                            01 85 09 71 06
                          </a>
                        </td>
                        <td style="padding: 10px; text-align: center; border-left: 1px solid #bae6fd;">
                          <p style="margin: 0; color: #64748b; font-size: 13px;">Email</p>
                          <a href="mailto:contact.academy@cma-education.com" style="color: #1e3a5f; font-size: 14px; font-weight: 600; text-decoration: none;">
                            contact.academy@cma-education.com
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 20px 0 0 0; text-align: center; color: #64748b; font-size: 13px;">
                      📍 67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne
                    </p>
                    <p style="margin: 8px 0 0 0; text-align: center; color: #64748b; font-size: 13px;">
                      🕐 Lundi - Vendredi : 9h00 - 18h00
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e3a5f; padding: 30px; text-align: center; border-radius: 0 0 16px 16px;">
              <p style="color: rgba(255,255,255,0.9); margin: 0 0 15px 0; font-size: 14px;">
                Suivez-nous sur les réseaux sociaux
              </p>
              <table role="presentation" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="https://www.linkedin.com/company/construction-management-academy" style="color: #ffffff; text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/32/174/174857.png" alt="LinkedIn" style="width: 28px; height: 28px;" />
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://www.facebook.com/CMAEducation" style="color: #ffffff; text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/32/174/174848.png" alt="Facebook" style="width: 28px; height: 28px;" />
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://www.instagram.com/cma_education" style="color: #ffffff; text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/32/174/174855.png" alt="Instagram" style="width: 28px; height: 28px;" />
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color: rgba(255,255,255,0.7); margin: 20px 0 0 0; font-size: 12px;">
                © ${new Date().getFullYear()} Construction Management Academy. Tous droits réservés.
              </p>
              <p style="color: rgba(255,255,255,0.5); margin: 10px 0 0 0; font-size: 11px;">
                <a href="https://www.cma-education.com" style="color: rgba(255,255,255,0.7); text-decoration: none;">www.cma-education.com</a>
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
}

// Email pour l'équipe interne (inscription@cma-education.com)
function generateInternalEmailHTML(data: BrochureDownloadData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouvelle demande de brochure</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <tr>
      <td style="background-color: #1e3a5f; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">📥 Nouvelle Demande de Brochure</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #1e3a5f; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          Informations du demandeur
        </h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 140px;">Prénom :</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">${data.prenom}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Nom :</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">${data.nom}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email :</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Téléphone :</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <a href="tel:${data.telephone}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${data.telephone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Profil :</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.profil}</td>
          </tr>
        </table>

        <h2 style="color: #1e3a5f; margin: 30px 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          Formation demandée
        </h2>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
          <p style="margin: 0; color: #1e3a5f; font-size: 16px; font-weight: 600;">${data.formationTitle}</p>
          ${data.formationSlug ? `<p style="margin: 8px 0 0 0; color: #6b7280; font-size: 13px;">Slug: ${data.formationSlug}</p>` : ''}
        </div>

        <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>📅 Date :</strong> ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
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
}

// Envoyer les emails
export async function sendBrochureEmails(data: BrochureDownloadData): Promise<{ success: boolean; error?: string }> {
  // Vérifier que le mot de passe SMTP est configuré
  if (!process.env.SMTP_PASS) {
    console.error('❌ SMTP_PASS non configuré dans les variables d\'environnement');
    return { 
      success: false, 
      error: 'Configuration SMTP incomplète - SMTP_PASS manquant' 
    };
  }

  try {
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'notification@cma-education.com';
    const inscriptionEmail = process.env.INSCRIPTION_EMAIL || 'inscription@cma-education.com';

    console.log('📧 Tentative d\'envoi email...');
    console.log('  - From:', notificationEmail);
    console.log('  - To (interne):', inscriptionEmail);
    console.log('  - To (user):', data.email);

    // Email 1: Notification interne vers inscription@cma-education.com
    await transporter.sendMail({
      from: `"CMA Education - Site Web" <${notificationEmail}>`,
      to: inscriptionEmail,
      subject: `📥 Nouvelle demande de brochure - ${data.prenom} ${data.nom}`,
      html: generateInternalEmailHTML(data),
    });

    console.log('✅ Email interne envoyé à', inscriptionEmail);

    // Email 2: Confirmation au demandeur
    await transporter.sendMail({
      from: `"Construction Management Academy" <${notificationEmail}>`,
      to: data.email,
      subject: `Votre brochure ${data.formationTitle} - Construction Management Academy`,
      html: generateUserEmailHTML(data),
    });

    console.log('✅ Email de confirmation envoyé à', data.email);

    return { success: true };
  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
}

export default transporter;
