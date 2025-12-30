import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { formation, userData } = await request.json();
    
    // Essayer d'abord l'URL Strapi
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app';
    const brochureUrl = `${strapiUrl}${formation.brochure.data.attributes.url}`;
    
    try {
      // Tester si l'URL Strapi fonctionne
      const strapiResponse = await fetch(brochureUrl, { method: 'HEAD' });
      
      if (strapiResponse.ok) {
        // Si l'URL Strapi fonctionne, rediriger vers elle
        return NextResponse.json({ 
          success: true, 
          downloadUrl: brochureUrl,
          source: 'strapi'
        });
      }
    } catch (strapiError) {
      console.log('URL Strapi inaccessible, génération d\'une brochure alternative');
    }
    
    // Générer une brochure HTML simple qui sera convertie en PDF par le navigateur
    const brochureHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Brochure - ${formation.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { color: #2563eb; font-size: 24px; font-weight: bold; }
        .formation-title { color: #1e40af; font-size: 20px; margin: 20px 0; }
        .section { margin: 20px 0; }
        .contact-info { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 30px; }
        .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">CONSTRUCTION MANAGEMENT ACADEMY</div>
        <div>Formation BTP Certifiante</div>
    </div>
    
    <div class="formation-title">${formation.title}</div>
    
    <div class="section">
        <h3>Informations du demandeur</h3>
        <p><strong>Nom :</strong> ${userData.prenom} ${userData.nom}</p>
        <p><strong>Email :</strong> ${userData.email}</p>
        <p><strong>Téléphone :</strong> ${userData.telephone}</p>
        <p><strong>Profil :</strong> ${userData.type}</p>
    </div>
    
    <div class="section">
        <h3>À propos de cette formation</h3>
        <p>Cette formation fait partie de notre catalogue de formations BTP certifiantes, conçues pour répondre aux besoins du secteur de la construction.</p>
        
        <h4>Nos atouts :</h4>
        <ul>
            <li>Formations certifiantes RNCP</li>
            <li>98% de taux d'insertion professionnelle</li>
            <li>Prise en charge OPCO possible</li>
            <li>Alternance et reconversion professionnelle</li>
        </ul>
    </div>
    
    <div class="contact-info">
        <h3>Contactez-nous</h3>
        <p><strong>Téléphone :</strong> 01 89 70 60 52</p>
        <p><strong>Email :</strong> contact.academy@construction-management-academy.fr</p>
        <p><strong>Adresse :</strong> 67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne</p>
    </div>
    
    <div class="footer">
        <p>Brochure générée automatiquement le ${new Date().toLocaleDateString('fr-FR')}</p>
        <p>Construction Management Academy - Formations BTP Certifiantes</p>
    </div>
</body>
</html>`;
    
    // Retourner le HTML pour que le client puisse l'imprimer en PDF
    return new NextResponse(brochureHtml, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="brochure-${formation.slug || 'formation'}.html"`
      }
    });
    
  } catch (error) {
    console.error('Erreur génération brochure:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erreur lors de la génération de la brochure' 
    }, { status: 500 });
  }
}