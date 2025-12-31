import { NextRequest, NextResponse } from 'next/server';

// API Proxy pour contourner le problème des fichiers statiques Railway
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('id');
    
    if (!fileId) {
      return NextResponse.json({ error: 'File ID requis' }, { status: 400 });
    }

    console.log(`🔍 Proxy téléchargement fichier ID: ${fileId}`);

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app';
    
    // Récupérer les métadonnées du fichier
    const fileResponse = await fetch(`${strapiUrl}/api/upload/files/${fileId}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!fileResponse.ok) {
      console.error(`❌ Fichier non trouvé: ${fileResponse.status}`);
      return NextResponse.json({ error: 'Fichier non trouvé' }, { status: 404 });
    }

    const fileData = await fileResponse.json();
    console.log(`📄 Fichier trouvé: ${fileData.name}`);

    // Essayer de récupérer le contenu du fichier
    const fileUrl = `${strapiUrl}${fileData.url}`;
    console.log(`📥 Téléchargement depuis: ${fileUrl}`);

    const contentResponse = await fetch(fileUrl, {
      headers: {
        'Accept': 'application/pdf, application/octet-stream, */*',
        'User-Agent': 'CMA-Education-Proxy/1.0',
        'Cache-Control': 'no-cache',
      },
    });

    if (!contentResponse.ok) {
      console.error(`❌ Impossible de récupérer le contenu: ${contentResponse.status}`);
      return NextResponse.json({ 
        error: 'Fichier temporairement indisponible',
        details: `Status: ${contentResponse.status}`,
        fileUrl: fileData.url
      }, { status: 503 });
    }

    // Récupérer le contenu
    const buffer = await contentResponse.arrayBuffer();
    console.log(`✅ Contenu récupéré: ${buffer.byteLength} bytes`);

    // Vérifier le type de contenu
    const contentType = contentResponse.headers.get('content-type') || fileData.mime || 'application/octet-stream';
    
    // Retourner le fichier avec les bons headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileData.name}"`,
        'Content-Length': buffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
        'X-Original-Filename': fileData.name,
        'X-File-Size': fileData.size?.toString() || buffer.byteLength.toString(),
        'X-Proxy-Method': 'strapi-api',
      },
    });

  } catch (error) {
    console.error('❌ Erreur proxy brochure:', error);
    return NextResponse.json({ 
      error: 'Erreur serveur proxy',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// Méthode POST pour compatibilité avec l'interface existante
export async function POST(request: NextRequest) {
  try {
    const { formationId } = await request.json();
    
    if (!formationId) {
      return NextResponse.json({ error: 'Formation ID requis' }, { status: 400 });
    }

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app';
    
    // Récupérer la formation avec sa brochure
    const formationResponse = await fetch(`${strapiUrl}/api/formations/${formationId}?populate=brochure`);
    
    if (!formationResponse.ok) {
      return NextResponse.json({ error: 'Formation non trouvée' }, { status: 404 });
    }

    const formationData = await formationResponse.json();
    const formation = formationData.data;
    
    if (!formation.attributes.brochure?.data?.id) {
      return NextResponse.json({ error: 'Brochure non disponible' }, { status: 404 });
    }

    const brochureId = formation.attributes.brochure.data.id;
    
    // Rediriger vers la méthode GET avec l'ID du fichier
    const proxyUrl = `${request.nextUrl.origin}/api/proxy-brochure?id=${brochureId}`;
    
    return NextResponse.redirect(proxyUrl);

  } catch (error) {
    console.error('❌ Erreur proxy brochure POST:', error);
    return NextResponse.json({ 
      error: 'Erreur serveur proxy',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}