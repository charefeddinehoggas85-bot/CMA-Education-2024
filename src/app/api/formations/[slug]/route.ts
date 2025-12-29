import { NextRequest, NextResponse } from 'next/server'
import { getFormation } from '@/lib/strapi'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const formation = await getFormation(params.slug)
    
    if (!formation) {
      return NextResponse.json(
        { error: 'Formation non trouvée' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(formation)
  } catch (error) {
    console.error('Erreur API formation:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}