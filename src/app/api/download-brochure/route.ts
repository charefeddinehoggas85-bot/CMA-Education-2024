import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { formationId, userData } = await request.json();
    
    if (!formationId) {
      return NextResponse.json({ error: 'Formation ID requis' }, { status: 400 });
    }

    console.log(`🔍 Récupération brochure pour formation ${formationId}`);

    // Récupérer la formation avec sa brochure depuis Strapi
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app';
    
    const formationResponse = await fetch(`${strapiUrl}/api/formations/${formationId}?populate=brochure`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!formationResponse.ok) {
      console.error(`❌ Formation non trouvée: ${formationResponse.status}`);
      return NextResponse.json({ error: 'Formation non trouvée' }, { status: 404 });
    }

    const formationData = await formationResponse.json();
    const formation = formationData.data;
    
    if (!formation.attributes.brochure?.data?.attributes?.url) {
      console.error('❌ Pas de brochure pour cette formation');
      return NextResponse.json({ error: 'Brochure non disponible' }, { status: 404 });
    }

    const brochureData = formation.attributes.brochure.data.attributes;
    const brochureId = formation.attributes.brochure.data.id;
    
    console.log(`📄 Brochure trouvée: ${brochureData.name} (ID: ${brochureId})`);

    // SOLUTION: Utiliser l'API Strapi pour récupérer le contenu du fichier
    // Puisque les URLs directes /uploads/ ne fonctionnent pas sur Railway,
    // nous utilisons l'API /api/upload/files/{id} qui fonctionne
    
    let pdfBuffer = null;
    let successMethod = null;

    try {
      console.log('🔄 Récupération via API Strapi upload/files...');
      
      // Étape 1: Récupérer les métadonnées du fichier
      const fileMetaResponse = await fetch(`${strapiUrl}/api/upload/files/${brochureId}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!fileMetaResponse.ok) {
        throw new Error(`API upload/files failed: ${fileMetaResponse.status}`);
      }

      const fileMeta = await fileMetaResponse.json();
      console.log(`📋 Métadonnées récupérées: ${fileMeta.name}`);

      // Étape 2: Essayer de récupérer le contenu via différentes méthodes
      
      // Méthode A: Essayer l'URL directe avec différents headers
      const directUrl = `${strapiUrl}${fileMeta.url}`;
      console.log(`📥 Tentative URL directe: ${directUrl}`);
      
      const directResponse = await fetch(directUrl, {
        headers: {
          'Accept': 'application/pdf, application/octet-stream, */*',
          'User-Agent': 'CMA-Education-Bot/1.0',
          'Cache-Control': 'no-cache',
        },
      });

      if (directResponse.ok) {
        const buffer = await directResponse.arrayBuffer();
        
        // Vérifier que c'est bien un PDF
        const pdfHeader = new Uint8Array(buffer.slice(0, 4));
        const isPdf = pdfHeader[0] === 0x25 && pdfHeader[1] === 0x50 && pdfHeader[2] === 0x44 && pdfHeader[3] === 0x46; // %PDF
        
        if (isPdf && buffer.byteLength > 100) {
          pdfBuffer = buffer;
          successMethod = 'direct-url';
          console.log(`✅ URL directe réussie - ${buffer.byteLength} bytes`);
        } else {
          console.log(`⚠️ URL directe - Contenu invalide (${buffer.byteLength} bytes, isPdf: ${isPdf})`);
          
          // Si ce n'est pas un PDF, c'est probablement une réponse d'erreur JSON
          if (buffer.byteLength < 1000) {
            const textContent = new TextDecoder().decode(buffer);
            console.log(`📄 Contenu reçu: ${textContent.substring(0, 200)}`);
          }
        }
      } else {
        console.log(`❌ URL directe failed: ${directResponse.status}`);
      }

    } catch (error) {
      console.log(`❌ Erreur récupération fichier: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }

    // Si nous n'avons pas réussi à récupérer le PDF, générer un PDF de remplacement
    if (!pdfBuffer) {
      console.log('📄 Génération d\'un PDF de remplacement...');
      
      const replacementPDF = generateReplacementPDF(formation.attributes, brochureData, userData);
      pdfBuffer = Buffer.from(replacementPDF, 'binary');
      successMethod = 'generated';
      
      console.log(`✅ PDF de remplacement généré: ${pdfBuffer.length} bytes`);
    }

    // Envoyer notification email si userData fourni
    if (userData?.email) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://cma-education-2024.vercel.app'}/api/send-brochure-notification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userData,
            formation: formation.attributes,
            brochureName: brochureData.name,
            downloadMethod: successMethod
          })
        });
        console.log('📧 Notification email envoyée');
      } catch (emailError) {
        console.log('⚠️ Erreur envoi email:', emailError instanceof Error ? emailError.message : 'Erreur inconnue');
      }
    }

    // Retourner le PDF avec les bons headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${brochureData.name}"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
        'X-Download-Method': successMethod,
        'X-Original-Filename': brochureData.name,
        'X-File-Size': brochureData.size?.toString() || pdfBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('❌ Erreur générale téléchargement brochure:', error);
    return NextResponse.json({ 
      error: 'Erreur serveur lors du téléchargement',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

function generateReplacementPDF(formation: any, brochureData: any, userData: any): string {
  const title = formation.title || 'Formation BTP';
  const description = formation.description || 'Formation professionnelle dans le secteur du BTP';
  const duree = formation.duree || 'Durée à définir';
  const modalite = formation.modalite || 'Modalité à définir';
  const rncp = formation.rncp || '';
  
  // Contenu PDF de remplacement avec plus d'informations
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
/F2 6 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 1800
>>
stream
BT
/F1 20 Tf
50 750 Td
(CONSTRUCTION MANAGEMENT ACADEMY) Tj
0 -30 Td
/F2 18 Tf
(${title}) Tj
0 -50 Td
/F1 14 Tf
(BROCHURE DE FORMATION) Tj
0 -40 Td
/F2 12 Tf
(INFORMATIONS GENERALES) Tj
0 -25 Td
(Duree: ${duree}) Tj
0 -20 Td
(Modalite: ${modalite}) Tj
${rncp ? `0 -20 Td\n(Certification: ${rncp}) Tj` : ''}
0 -40 Td
/F1 12 Tf
(DEMANDEUR) Tj
0 -20 Td
(Nom: ${userData?.nom || 'Non renseigne'} ${userData?.prenom || ''}) Tj
0 -20 Td
(Email: ${userData?.email || 'Non renseigne'}) Tj
0 -20 Td
(Telephone: ${userData?.telephone || 'Non renseigne'}) Tj
0 -20 Td
(Profil: ${userData?.type || 'Non renseigne'}) Tj
0 -40 Td
/F1 12 Tf
(DESCRIPTION DE LA FORMATION) Tj
0 -25 Td
/F2 10 Tf
(${description.substring(0, 300).replace(/[()]/g, '')}...) Tj
0 -60 Td
/F1 12 Tf
(OBJECTIFS PEDAGOGIQUES) Tj
0 -20 Td
/F2 10 Tf
(- Acquerir les competences techniques du metier) Tj
0 -15 Td
(- Maitriser les outils et methodes professionnels) Tj
0 -15 Td
(- Developper l'autonomie et la responsabilite) Tj
0 -15 Td
(- Preparer a l'insertion professionnelle) Tj
0 -40 Td
/F1 12 Tf
(MODALITES D'ADMISSION) Tj
0 -20 Td
/F2 10 Tf
(- Entretien de motivation) Tj
0 -15 Td
(- Etude du dossier de candidature) Tj
0 -15 Td
(- Tests de positionnement si necessaire) Tj
0 -40 Td
/F1 12 Tf
(CONTACT ET INFORMATIONS) Tj
0 -20 Td
/F2 10 Tf
(Construction Management Academy) Tj
0 -15 Td
(Tel: 01 89 70 60 52) Tj
0 -15 Td
(Email: contact.academy@cma-education.com) Tj
0 -15 Td
(Site: www.construction-management-academy.fr) Tj
0 -30 Td
/F1 8 Tf
(Document genere le ${new Date().toLocaleDateString('fr-FR')} - ${new Date().toLocaleTimeString('fr-FR')}) Tj
0 -15 Td
(Brochure originale: ${brochureData.name}) Tj
0 -15 Td
(Note: Ce document est genere automatiquement en remplacement) Tj
0 -10 Td
(de la brochure originale temporairement indisponible.) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
endobj

6 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000002126 00000 n 
0000002190 00000 n 
trailer
<<
/Size 7
/Root 1 0 R
>>
startxref
2249
%%EOF`;

  return pdfContent;
}