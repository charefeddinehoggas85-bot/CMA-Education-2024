import { NextResponse } from 'next/server'
import { getFormations } from '@/lib/strapi'

export async function GET() {
  try {
    console.log('🔍 Test API formations - Début')
    console.log('STRAPI_URL:', process.env.NEXT_PUBLIC_STRAPI_URL)
    
    const formations = await getFormations()
    
    console.log('📊 Formations récupérées:', formations?.length || 0)
    
    return NextResponse.json({
      success: true,
      formations: formations || [],
      count: formations?.length || 0,
      strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Erreur API formations:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      formations: [],
      count: 0,
      strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}