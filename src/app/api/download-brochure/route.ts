import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { formationId, userData } = await request.json();
    
    if (!formationId) {
      return NextResponse.json({ error: 'Formation ID requis' }, { status: 400 });
    }

    // Récupérer la formation avec sa brochure depuis Strapi
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app';
    const formationResponse = await fetch(`${strapiUrl}/api/formations/${formationId}?populate=brochure`);
    
    if (!formationResponse.ok) {
      throw new Error('Formation non trouvée');
    }

    const formationData = await formationResponse.json();
    const formation = formationData.data;
    
    if (!formation.attributes.brochure?.data?.attributes?.url) {
      return NextResponse.json({ error: 'Brochure non disponible' }, { status: 404 });
    }

    const brochureUrl = `${strapiUrl}${formation.attributes.brochure.data.attributes.url}`;
    const brochureData = formation.attributes.brochure.data.attributes;
    
    console.log('🔍 Tentative de téléchargement:', brochureUrl);

    // Essayer de récupérer le PDF depuis Strapi
    const pdfResponse = await fetch(brochureUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    });

    if (!pdfResponse.ok) {
      console.log('❌ Échec téléchargement direct, tentative via API uploads...');
      
      // Fallback: essayer via l'API uploads de Strapi
      const uploadsResponse = await fetch(`${strapiUrl}/api/upload/files`);
      if (uploadsResponse.ok) {
        const files = await uploadsResponse.json();
        const pdfFile = files.find((f: any) => f.id === formation.attributes.brochure.data.id);
        
        if (pdfFile) {
          const alternativeUrl = `${strapiUrl}${pdfFile.url}`;
          console.log('🔄 Tentative URL alternative:', alternativeUrl);
          
          const altResponse = await fetch(alternativeUrl);
          if (altResponse.ok) {
            const pdfBuffer = await altResponse.arrayBuffer();
            
            return new NextResponse(pdfBuffer, {
              status: 200,
              headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${brochureData.name}"`,
                'Content-Length': pdfBuffer.byteLength.toString(),
              },
            });
          }
        }
      }
      
      return NextResponse.json({ 
        error: 'PDF temporairement indisponible',
        details: 'Le fichier existe mais n\'est pas accessible actuellement'
      }, { status: 503 });
    }

    // Si le téléchargement direct fonctionne
    const pdfBuffer = await pdfResponse.arrayBuffer();
    
    console.log('✅ PDF téléchargé avec succès:', pdfBuffer.byteLength, 'bytes');

    // Retourner le PDF avec les bons headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${brochureData.name}"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600', // Cache 1 heure
      },
    });

  } catch (error) {
    console.error('❌ Erreur téléchargement brochure:', error);
    return NextResponse.json({ 
      error: 'Erreur lors du téléchargement',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}