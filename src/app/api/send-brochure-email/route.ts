import { NextRequest, NextResponse } from 'next/server';
import { sendBrochureEmails, BrochureDownloadData } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { prenom, nom, email, telephone, profil, formationTitle, formationSlug } = body;

    // Validation des champs requis
    if (!prenom || !nom || !email || !telephone || !profil || !formationTitle) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    const emailData: BrochureDownloadData = {
      prenom,
      nom,
      email,
      telephone,
      profil,
      formationTitle,
      formationSlug
    };

    console.log('📧 Envoi emails brochure pour:', email);

    const result = await sendBrochureEmails(emailData);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Emails envoyés avec succès' 
      });
    } else {
      console.error('❌ Erreur envoi emails:', result.error);
      return NextResponse.json(
        { error: result.error || 'Erreur lors de l\'envoi des emails' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Erreur API send-brochure-email:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// GET pour tester que l'API est disponible
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'API send-brochure-email disponible',
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: process.env.SMTP_PORT || '465',
      user: process.env.SMTP_USER || 'notification@cma-education.com',
      configured: !!process.env.SMTP_PASS,
      // Ne pas exposer le mot de passe, juste sa longueur pour debug
      passLength: process.env.SMTP_PASS?.length || 0
    },
    emails: {
      notification: process.env.NOTIFICATION_EMAIL || 'notification@cma-education.com',
      inscription: process.env.INSCRIPTION_EMAIL || 'inscription@cma-education.com'
    }
  });
}
