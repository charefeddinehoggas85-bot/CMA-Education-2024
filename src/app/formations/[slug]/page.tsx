import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import FormationContent from './FormationContent'

// Force le rendu dynamique (SSR) pour toujours récupérer les données fraîches de Strapi
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Génération dynamique des metadata SEO pour chaque formation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { formation } = await getFormationData(params.slug)
  
  if (!formation) {
    return {
      title: 'Formation non trouvée | Construction Management Academy',
      description: 'Cette formation n\'existe pas ou n\'est plus disponible.'
    }
  }

  const title = `${formation.title} | Formation BTP ${formation.level} | CMA Education`
  const description = formation.shortDescription || formation.shortDesc || 
    `Formation ${formation.title} en alternance. ${formation.rncp ? `Certification ${formation.rncp}.` : ''} ${formation.tauxInsertion ? `${formation.tauxInsertion} d'insertion professionnelle.` : ''} Prise en charge OPCO.`

  return {
    title,
    description,
    keywords: [
      `formation ${formation.title.toLowerCase()}`,
      'formation btp alternance',
      'formation conducteur travaux',
      'formation chargé affaires bâtiment',
      formation.rncp || '',
      'formation btp ile de france',
      'alternance btp',
      formation.level?.toLowerCase() || ''
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Construction Management Academy',
      url: `https://cma-education.com/formations/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://cma-education.com/formations/${params.slug}`,
    },
  }
}

interface Formation {
  id: number
  title: string
  slug: string
  level: string
  rncp?: string
  rncpUrl?: string
  shortDescription?: string
  shortDesc?: string
  fullDescription?: string
  fullDesc?: string
  metierDesc?: string
  duree?: string
  volumeHoraire?: string
  repartition?: string
  rythme?: string
  modalite?: string
  typeContrat?: string
  effectif?: string
  cout?: string
  financement?: string
  certificateur?: string
  objectifs?: string[]
  programme?: Array<{ titre: string; contenu: string[] }>
  debouches?: string[]
  prerequis?: string[]
  evaluation?: string[]
  poursuiteEtudes?: string[]
  entreprisesPartenaires?: string[]
  tauxReussite?: string
  tauxInsertion?: string
  publicCible?: string
  contact?: { telephone?: string; email?: string; adresse?: string }
  isActive?: boolean
  image?: string
  imageData?: any
}

// FETCH STRAPI DIRECT - sans passer par le module strapi.ts
async function fetchStrapiDirect(slug: string): Promise<{ formation: Formation | null; error: string | null; debug: any }> {
  const STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
  const apiUrl = `${STRAPI_URL}/api/formations?filters[slug][$eq]=${slug}&populate=*`
  
  const debug: any = {
    url: apiUrl,
    timestamp: new Date().toISOString(),
    fetchAttempted: false,
    responseStatus: null,
    responseOk: null,
    dataReceived: false,
    formationFound: false
  }
  
  try {
    debug.fetchAttempted = true
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      // Timeout de 10 secondes
      signal: AbortSignal.timeout(10000)
    })
    
    debug.responseStatus = response.status
    debug.responseOk = response.ok
    
    if (!response.ok) {
      return { 
        formation: null, 
        error: `HTTP ${response.status}: ${response.statusText}`,
        debug 
      }
    }
    
    const data = await response.json()
    debug.dataReceived = true
    debug.dataLength = data?.data?.length || 0
    
    if (!data?.data?.[0]) {
      return { 
        formation: null, 
        error: 'Aucune formation trouvée dans la réponse Strapi',
        debug 
      }
    }
    
    debug.formationFound = true
    const item = data.data[0]
    const attrs = item.attributes || {}
    
    // Construire l'objet formation
    const formation: Formation = {
      id: item.id,
      title: attrs.title,
      slug: attrs.slug,
      level: attrs.level,
      rncp: attrs.rncp,
      rncpUrl: attrs.rncpUrl,
      shortDescription: attrs.shortDesc || attrs.shortDescription,
      shortDesc: attrs.shortDesc,
      fullDescription: attrs.fullDesc || attrs.fullDescription,
      fullDesc: attrs.fullDesc,
      metierDesc: attrs.metierDesc,
      duree: attrs.duree,
      volumeHoraire: attrs.volumeHoraire,
      repartition: attrs.repartition,
      rythme: attrs.rythme,
      modalite: attrs.modalite,
      typeContrat: attrs.typeContrat,
      effectif: attrs.effectif,
      cout: attrs.cout,
      financement: attrs.financement,
      certificateur: attrs.certificateur,
      objectifs: attrs.objectifs,
      programme: attrs.programme,
      debouches: attrs.debouches,
      prerequis: attrs.prerequis,
      evaluation: attrs.evaluation,
      poursuiteEtudes: attrs.poursuiteEtudes,
      entreprisesPartenaires: attrs.entreprisesPartenaires,
      tauxReussite: attrs.tauxReussite,
      tauxInsertion: attrs.tauxInsertion,
      publicCible: attrs.publicCible,
      contact: attrs.contact,
      isActive: attrs.isActive,
      image: attrs.image?.data?.attributes?.url,
      imageData: attrs.image
    }
    
    debug.formationId = formation.id
    debug.formationTitle = formation.title
    debug.objectifsCount = Array.isArray(formation.objectifs) ? formation.objectifs.length : 0
    debug.debouchesCount = Array.isArray(formation.debouches) ? formation.debouches.length : 0
    debug.programmeCount = Array.isArray(formation.programme) ? formation.programme.length : 0
    
    return { formation, error: null, debug }
    
  } catch (error: any) {
    debug.errorType = error.name
    debug.errorMessage = error.message
    
    return { 
      formation: null, 
      error: `${error.name}: ${error.message}`,
      debug 
    }
  }
}

// Server-side data fetching - Uses only Strapi data
async function getFormationData(slug: string): Promise<{ formation: Formation | null; source: string; error: string | null; debug: any }> {
  // Essayer Strapi avec fetch direct
  const strapiResult = await fetchStrapiDirect(slug)
  
  if (strapiResult.formation) {
    return {
      formation: strapiResult.formation,
      source: 'STRAPI',
      error: null,
      debug: strapiResult.debug
    }
  }
  
  // Si pas trouvé dans Strapi, retourner null (plus de fallback statique)
  return {
    formation: null,
    source: 'NONE',
    error: strapiResult.error || 'Formation non trouvée dans Strapi',
    debug: strapiResult.debug
  }
}

// Page principale avec SSR
export default async function FormationDetailPage({ params }: { params: { slug: string } }) {
  const { formation } = await getFormationData(params.slug)
  
  if (!formation) {
    notFound()
  }

  return <FormationContent formation={formation} />
}
