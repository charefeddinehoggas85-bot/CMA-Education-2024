import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getFormation } from '@/lib/strapi'
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

// Server-side data fetching
async function getFormationData(slug: string): Promise<Formation | null> {
  console.log('🔍 SSR: Chargement formation pour slug:', slug)
  console.log('   - STRAPI_URL:', process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app')
  
  try {
    // Priorité 1: Essayer Strapi
    const strapiFormation = await getFormation(slug)
    
    // Vérifier que la formation Strapi a des données valides
    if (strapiFormation && strapiFormation.id && strapiFormation.title) {
      console.log('✅ SSR: Formation Strapi VALIDE trouvée!')
      console.log('   - ID:', strapiFormation.id)
      console.log('   - Titre:', strapiFormation.title)
      console.log('   - Durée:', strapiFormation.duree)
      console.log('   - Objectifs count:', Array.isArray(strapiFormation.objectifs) ? strapiFormation.objectifs.length : 'N/A')
      console.log('   - Débouchés count:', Array.isArray(strapiFormation.debouches) ? strapiFormation.debouches.length : 'N/A')
      
      // Retourner les données Strapi
      return strapiFormation as Formation
    }
    
    console.log('⚠️ SSR: Formation Strapi invalide ou non trouvée, fallback vers statique')
    console.log('   - strapiFormation:', strapiFormation ? 'exists but invalid' : 'null')
    
  } catch (error) {
    console.error('❌ SSR: Erreur Strapi:', error)
  }
  
  // Priorité 2: Fallback vers données statiques (seulement si Strapi échoue)
  const staticFormation = findStaticFormation(slug)
  if (staticFormation) {
    console.log('⚠️ SSR: Utilisation données STATIQUES (fallback)')
    console.log('   - Titre:', staticFormation.title)
    return staticFormation
  }
  
  console.log('❌ SSR: Aucune formation trouvée (ni Strapi ni statique)')
  return null
}

// Page principale avec SSR
export default async function FormationDetailPage({ params }: { params: { slug: string } }) {
  const formation = await getFormationData(params.slug)
  
  if (!formation) {
    notFound()
  }

  // Déterminer la source des données
  const isFromStrapi = formation.id < 1000 && Array.isArray(formation.objectifs) && formation.objectifs.length > 3
  const dataSource = isFromStrapi ? 'STRAPI' : 'STATIQUE'

  return (
    <PageLayout>
      {/* Indicateur de source de données - TOUJOURS visible pour debug */}
      <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 max-w-xs">
        <div className="font-bold text-yellow-400">📊 Source: {dataSource}</div>
        <div>ID: {formation.id}</div>
        <div>Objectifs: {Array.isArray(formation.objectifs) ? formation.objectifs.length : 'N/A'}</div>
        <div>Débouchés: {Array.isArray(formation.debouches) ? formation.debouches.length : 'N/A'}</div>
        <div>Programme: {Array.isArray(formation.programme) ? formation.programme.length : 'N/A'}</div>
        <div>Durée: {formation.duree || 'N/A'}</div>
      </div>
      
      <FormationContent formation={formation} />
    </PageLayout>
  )
}

// DÉSACTIVÉ: generateStaticParams force la génération statique au build time
// ce qui empêche le chargement dynamique des données Strapi
// Pour réactiver la génération statique, décommenter cette fonction
/*
export async function generateStaticParams() {
  try {
    // Récupérer toutes les formations depuis Strapi
    const { getFormations } = await import('@/lib/strapi')
    const strapiFormations = await getFormations()
    
    // Formations statiques comme fallback
    const staticFormations = [...formationsAlternance, ...formationsReconversion]
    
    // Combiner les slugs Strapi et statiques
    const allSlugs = new Set()
    
    // Ajouter les slugs Strapi
    if (strapiFormations && Array.isArray(strapiFormations)) {
      strapiFormations.forEach((formation: any) => {
        if (formation.slug) {
          allSlugs.add(formation.slug)
        }
      })
    }
    
    // Ajouter les slugs statiques
    staticFormations.forEach((formation) => {
      allSlugs.add(formation.slug)
    })
    
    const params = Array.from(allSlugs).map((slug) => ({
      slug: slug as string,
    }))
    
    console.log('✅ SSR: Génération de', params.length, 'pages statiques')
    return params
    
  } catch (error) {
    console.error('Erreur génération params statiques:', error)
    
    // Fallback vers formations statiques uniquement
    const staticFormations = [...formationsAlternance, ...formationsReconversion]
    return staticFormations.map((formation) => ({
      slug: formation.slug,
    }))
  }
}
*/