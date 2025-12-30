import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') || 'conducteur-travaux-batiment'
  
  const STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
  const apiUrl = `${STRAPI_URL}/api/formations?filters[slug][$eq]=${slug}&populate=*`
  
  const results: any = {
    timestamp: new Date().toISOString(),
    slug,
    strapiUrl: STRAPI_URL,
    apiUrl,
    envVars: {
      NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL || 'NOT SET',
      STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN ? 'SET (hidden)' : 'NOT SET',
    },
    fetchResult: null,
    error: null,
    formation: null
  }
  
  try {
    console.log('🔍 Testing Strapi API:', apiUrl)
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    
    results.fetchResult = {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    }
    
    if (response.ok) {
      const data = await response.json()
      results.rawData = data
      
      if (data?.data?.[0]) {
        const item = data.data[0]
        const attrs = item.attributes || {}
        
        results.formation = {
          id: item.id,
          title: attrs.title,
          slug: attrs.slug,
          duree: attrs.duree,
          objectifsCount: Array.isArray(attrs.objectifs) ? attrs.objectifs.length : 'not array',
          debouchesCount: Array.isArray(attrs.debouches) ? attrs.debouches.length : 'not array',
          programmeCount: Array.isArray(attrs.programme) ? attrs.programme.length : 'not array',
          prerequisCount: Array.isArray(attrs.prerequis) ? attrs.prerequis.length : 'not array',
        }
      } else {
        results.error = 'No formation found in response'
      }
    } else {
      const errorText = await response.text()
      results.error = `HTTP ${response.status}: ${errorText}`
    }
    
  } catch (error: any) {
    results.error = {
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n').slice(0, 5)
    }
  }
  
  return NextResponse.json(results, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  })
}
