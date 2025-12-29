import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getFormation } from '@/lib/strapi'
import { formationsAlternance, formationsReconversion } from '@/data/formations-static'
import FormationContent from './FormationContent'

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
  try {
    console.log('🔍 SSR: Chargement formation pour slug:', slug)
    
    // Priorité 1: Essayer Strapi
    const strapiFormation = await getFormation(slug)
    
    if (strapiFormation && (strapiFormation as any)?.id) {
      console.log('✅ SSR: Formation Strapi trouvée:', (strapiFormation as any).title)
      return strapiFormation as Formation
    }
    
    console.log('⚠️ SSR: Pas de formation Strapi, fallback vers statique')
    
    // Priorité 2: Fallback vers données statiques
    const staticFormation = findStaticFormation(slug)
    if (staticFormation) {
      console.log('✅ SSR: Formation statique trouvée:', staticFormation.title)
      return staticFormation
    }
    
    console.log('❌ SSR: Aucune formation trouvée')
    return null
    
  } catch (error) {
    console.error('❌ SSR: Erreur chargement formation:', error)
    
    // En cas d'erreur Strapi, essayer les données statiques
    const staticFormation = findStaticFormation(slug)
    if (staticFormation) {
      console.log('✅ SSR: Fallback statique après erreur:', staticFormation.title)
      return staticFormation
    }
    
    return null
  }
}

// Page principale avec SSR
export default async function FormationDetailPage({ params }: { params: { slug: string } }) {
  const formation = await getFormationData(params.slug)
  
  if (!formation) {
    notFound()
  }

  return (
    <PageLayout>
      {/* Debug Info - Visible uniquement en développement */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg text-xs z-50 max-w-sm">
          <div><strong>✅ SSR FORMATION CHARGÉE</strong></div>
          <div>Slug: {params.slug}</div>
          <div>ID: {formation.id}</div>
          <div>Titre: {formation.title?.substring(0, 20)}...</div>
          <div>Niveau: {formation.level?.substring(0, 15)}...</div>
          <div>RNCP: {formation.rncp || 'Non défini'}</div>
          <div>Durée: {formation.duree || 'Non définie'}</div>
          <div>Objectifs: {formation.objectifs ? formation.objectifs.length : 'Null'}</div>
          <div>Débouchés: {formation.debouches ? formation.debouches.length : 'Null'}</div>
          <div>Source: {formation.id > 1000 ? 'Statique' : 'Strapi'}</div>
        </div>
      )}
      
      <FormationContent formation={formation} />
    </PageLayout>
  )
}

// Générer les paramètres statiques pour les formations connues
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