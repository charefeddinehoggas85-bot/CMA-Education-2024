import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { formationsAlternance, formationsReconversion } from '@/data/formations-static'
import FormationContent from './FormationContent'

// Force le rendu dynamique (SSR) pour toujours récupérer les données fraîches de Strapi
export const dynamic = 'force-dynamic'
export const revalidate = 0

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

// Fonction pour trouver une formation dans les données statiques
function findStaticFormation(slug: string): Formation | null {
  const allFormations = [...formationsAlternance, ...formationsReconversion]
  const found = allFormations.find(f => f.slug === slug)
  
  if (!found) return null
  
  return {
    id: found.id,
    title: found.title,
    slug: found.slug,
    level: found.level,
    rncp: found.rncp,
    shortDescription: found.shortDescription,
    fullDescription: found.shortDescription,
    duree: found.duration,
    rythme: found.rhythm,
    modalite: found.mode,
    cout: found.price,
    financement: found.price,
    objectifs: found.objectives,
    debouches: found.opportunities,
    prerequis: [],
    isActive: true,
    image: found.image
  }
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

// Server-side data fetching
async function getFormationData(slug: string): Promise<{ formation: Formation | null; source: string; error: string | null; debug: any }> {
  // Essayer Strapi en premier avec fetch direct
  const strapiResult = await fetchStrapiDirect(slug)
  
  if (strapiResult.formation) {
    return {
      formation: strapiResult.formation,
      source: 'STRAPI',
      error: null,
      debug: strapiResult.debug
    }
  }
  
  // Fallback vers données statiques
  const staticFormation = findStaticFormation(slug)
  
  if (staticFormation) {
    return {
      formation: staticFormation,
      source: 'STATIQUE',
      error: strapiResult.error,
      debug: { ...strapiResult.debug, fallbackUsed: true }
    }
  }
  
  return {
    formation: null,
    source: 'NONE',
    error: strapiResult.error || 'Formation non trouvée',
    debug: strapiResult.debug
  }
}

// Page principale avec SSR
export default async function FormationDetailPage({ params }: { params: { slug: string } }) {
  const { formation, source, error, debug } = await getFormationData(params.slug)
  
  if (!formation) {
    notFound()
  }

  return (
    <PageLayout>
      {/* Indicateur de debug AMÉLIORÉ - visible en production */}
      <div className="fixed bottom-4 left-4 bg-black text-white p-4 rounded-lg text-xs z-[9999] max-w-sm shadow-2xl border-2 border-yellow-400">
        <div className="font-bold text-lg mb-2" style={{ color: source === 'STRAPI' ? '#22c55e' : '#ef4444' }}>
          📊 {source}
        </div>
        <div className="space-y-1">
          <div><span className="text-gray-400">ID:</span> {formation.id}</div>
          <div><span className="text-gray-400">Slug:</span> {params.slug}</div>
          <div><span className="text-gray-400">Durée:</span> {formation.duree || 'N/A'}</div>
          <div><span className="text-gray-400">Objectifs:</span> {Array.isArray(formation.objectifs) ? formation.objectifs.length : 'N/A'}</div>
          <div><span className="text-gray-400">Débouchés:</span> {Array.isArray(formation.debouches) ? formation.debouches.length : 'N/A'}</div>
          <div><span className="text-gray-400">Programme:</span> {Array.isArray(formation.programme) ? formation.programme.length : 'N/A'}</div>
        </div>
        {error && (
          <div className="mt-2 p-2 bg-red-900/50 rounded text-red-300 text-[10px] break-all">
            <div className="font-bold">Erreur Strapi:</div>
            {error}
          </div>
        )}
        <div className="mt-2 text-[10px] text-gray-500">
          Fetch: {debug.fetchAttempted ? '✓' : '✗'} | 
          Status: {debug.responseStatus || 'N/A'} | 
          Data: {debug.dataReceived ? '✓' : '✗'}
        </div>
      </div>
      
      <FormationContent formation={formation} />
    </PageLayout>
  )
}
