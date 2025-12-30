'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { GraduationCap, Clock, Award, ArrowRight, RefreshCw, CheckCircle, Building2, Target, BookOpen, MapPin, Euro, Users, TrendingUp, Heart, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getFormations, getImageURL, getVAEFormules, getVAECertifications } from '@/lib/strapi'
import { 
  vaeFormules as staticVaeFormules,
  vaeCertifications as staticVaeCertifications,
  entrepriseAvantages,
  entrepriseThematiques,
  entrepriseModalites,
  entrepriseTarif
} from '@/data/formations-static'

// Mapping des codes RNCP vers les URLs France Compétences (fallback si non défini dans Strapi)
const rncpToUrlMap: Record<string, string> = {
  'RNCP35503': 'https://www.francecompetences.fr/recherche/rncp/35503/',
  'RNCP40217': 'https://www.francecompetences.fr/recherche/rncp/40217/',
  'RNCP41466': 'https://www.francecompetences.fr/recherche/rncp/41466/',
  'RNCP41368': 'https://www.francecompetences.fr/recherche/rncp/41368/',
  'RNCP39408': 'https://www.francecompetences.fr/recherche/rncp/39408/',
  'RNCP41369': 'https://www.francecompetences.fr/recherche/rncp/41369/',
  'RNCP39469': 'https://www.francecompetences.fr/recherche/rncp/39469/',
  'RNCP38549': 'https://www.francecompetences.fr/recherche/rncp/38549/',
}

// Helper pour obtenir l'URL France Compétences
// Priorité: 1. rncpUrl de Strapi, 2. Mapping statique basé sur code RNCP
const getRncpUrl = (rncp?: string, strapiRncpUrl?: string): string | undefined => {
  // Priorité 1: URL définie dans Strapi
  if (strapiRncpUrl && strapiRncpUrl.trim() !== '') {
    return strapiRncpUrl
  }
  // Priorité 2: Mapping statique basé sur le code RNCP
  if (rncp) {
    return rncpToUrlMap[rncp] || undefined
  }
  return undefined
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
  duration?: string
  duree?: string  // Champ Strapi
  rhythm?: string
  rythme?: string  // Champ Strapi
  mode?: string
  modalite?: string  // Champ Strapi
  price?: string
  cout?: string  // Champ Strapi
  objectives?: string[]
  objectifs?: string[]  // Champ Strapi
  opportunities?: string[]
  debouches?: string[]  // Champ Strapi
  prerequisites?: string[]
  successRate?: number
  insertionRate?: number
  isAlternance?: boolean
  isReconversion?: boolean
  publishedAt?: string
  image?: string
}

interface VAEFormule {
  id: number
  titre: string
  description?: string
  modalites: string
  services: string[]
  prix: string
  heures?: string | null
  ordre?: number
}

interface VAECertification {
  id: number
  titre: string
  rncp: string
  rncpUrl?: string
  niveau: 'niveau5' | 'niveau6' | 'niveau7'
  description?: string
  ordre?: number
}

const FormationCard = ({ formation, index, category }: { formation: Formation, index: number, category: string }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const rncpUrl = getRncpUrl(formation.rncp, formation.rncpUrl)
  
  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'alternance': return 'bg-gradient-to-r from-primary-blue to-blue-600'
      case 'reconversion': return 'bg-gradient-to-r from-green-600 to-emerald-600'
      case 'vae': return 'bg-gradient-to-r from-purple-600 to-indigo-600'
      case 'entreprise': return 'bg-gradient-to-r from-orange-600 to-red-600'
      default: return 'bg-gradient-primary'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image de la formation */}
      {(formation.image || (formation as any).imageUrl) && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={getImageURL((formation as any).imageData, formation.image)}
            alt={formation.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className={`absolute inset-0 ${getCategoryColor(category)} opacity-40`} />
          <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
            {formation.level}
          </span>
        </div>
      )}
      
      <div className={`${!formation.image ? getCategoryColor(category) : ''} ${!formation.image ? 'p-6 text-white' : 'p-4'}`}>
        {!formation.image && (
          <>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                {formation.level}
              </span>
            </div>
          </>
        )}
        
        <h3 className={`text-xl font-montserrat font-bold mb-2 ${formation.image ? 'text-primary-blue' : ''}`}>
          {formation.title}
        </h3>
        
        {formation.rncp && (
          <div className={`flex items-center space-x-2 ${formation.image ? 'text-gray-600' : 'text-white/90'}`}>
            <Award className="w-4 h-4" />
            <span className="text-sm">{formation.rncp}</span>
            {rncpUrl && (
              <a 
                href={rncpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center space-x-1 text-xs ${formation.image ? 'text-primary-blue hover:text-blue-700' : 'text-white/80 hover:text-white'} transition-colors`}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
                <span>France Compétences</span>
              </a>
            )}
          </div>
        )}
      </div>
      
      <div className="p-6 pt-2">
        <p className="text-gray-600 mb-4">{formation.shortDescription || formation.shortDesc}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          {(formation.duration || formation.duree) && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary-yellow" />
              <span className="text-gray-600">{formation.duration || formation.duree}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary-yellow" />
            <span className="text-gray-600">{formation.mode || formation.modalite || 'Présentiel'}</span>
          </div>
          {(formation.rhythm || formation.rythme) && (
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-primary-yellow" />
              <span className="text-gray-600 text-xs">{formation.rhythm || formation.rythme}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Euro className="w-4 h-4 text-primary-yellow" />
            <span className="text-gray-600 text-xs">{formation.price || formation.cout || 'Prise en charge'}</span>
          </div>
        </div>
        
        {/* NOUVEAU: Affichage direct des objectifs Strapi */}
        {((formation.objectives && formation.objectives.length > 0) || (formation.objectifs && formation.objectifs.length > 0)) && (
          <div className="mb-4">
            <h4 className="font-semibold text-primary-blue mb-2 text-sm">Objectifs principaux :</h4>
            <ul className="space-y-1 text-xs text-gray-600">
              {(formation.objectives || formation.objectifs)?.slice(0, 2).map((obj: string, i: number) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* NOUVEAU: Affichage direct des débouchés Strapi */}
        {((formation.opportunities && formation.opportunities.length > 0) || (formation.debouches && formation.debouches.length > 0)) && (
          <div className="mb-4">
            <h4 className="font-semibold text-primary-blue mb-2 text-sm">Débouchés principaux :</h4>
            <div className="flex flex-wrap gap-1">
              {(formation.opportunities || formation.debouches)?.slice(0, 2).map((debouche: string, i: number) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {debouche.length > 25 ? debouche.substring(0, 25) + '...' : debouche}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 mb-6"
          >
            {((formation.objectives && formation.objectives.length > 2) || (formation.objectifs && formation.objectifs.length > 2)) && (
              <div>
                <h4 className="font-semibold text-primary-blue mb-2">Objectifs complets :</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {(formation.objectives || formation.objectifs)?.slice(2).map((obj: string, i: number) => (
                    <li key={i + 2} className="flex items-start space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {((formation.opportunities && formation.opportunities.length > 2) || (formation.debouches && formation.debouches.length > 2)) && (
              <div>
                <h4 className="font-semibold text-primary-blue mb-2">Débouchés complets :</h4>
                <div className="flex flex-wrap gap-2">
                  {(formation.opportunities || formation.debouches)?.slice(2).map((debouche: string, i: number) => (
                    <span key={i + 2} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {debouche}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
        
        <div className="space-y-3">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-primary-blue hover:text-primary-yellow transition-colors w-full justify-center py-2 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/5"
          >
            <span>{isExpanded ? 'Voir moins' : 'Aperçu'}</span>
            <ArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          
          <Link 
            href={`/formations/${formation.slug}`}
            className="flex items-center space-x-2 bg-primary-blue text-white hover:bg-blue-700 transition-colors w-full justify-center py-2 rounded-lg font-semibold"
          >
            <span>Voir tous les détails</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

const CategorySection = ({ title, subtitle, icon, formations, category, color }: any) => {
  // Fonction pour extraire le niveau numérique (5, 6, 7) depuis le champ level
  const extractNiveau = (level: string): number => {
    if (!level) return 0
    const levelLower = level.toLowerCase()
    
    // Chercher d'abord "Niveau X"
    const niveauMatch = levelLower.match(/niveau\s*(\d)/)
    if (niveauMatch) {
      return parseInt(niveauMatch[1])
    }
    
    // Sinon chercher "BAC+X" et convertir en niveau
    const bacMatch = levelLower.match(/bac\s*\+\s*(\d)/)
    if (bacMatch) {
      const bacPlus = parseInt(bacMatch[1])
      // BAC+2 = Niveau 5, BAC+3 = Niveau 6, BAC+5 = Niveau 7
      if (bacPlus === 2) return 5
      if (bacPlus === 3) return 6
      if (bacPlus === 5) return 7
    }
    
    return 0
  }

  // Fonction pour obtenir le label du niveau avec équivalent BAC
  const getNiveauLabel = (niveau: number): { niveau: string, bac: string } => {
    switch(niveau) {
      case 5: return { niveau: 'Niveau 5', bac: 'BAC+2' }
      case 6: return { niveau: 'Niveau 6', bac: 'BAC+3' }
      case 7: return { niveau: 'Niveau 7', bac: 'BAC+5' }
      default: return { niveau: 'Autre', bac: '' }
    }
  }

  // Grouper les formations par niveau
  const formationsByNiveau = formations.reduce((acc: any, formation: any) => {
    const niveau = extractNiveau(formation.level)
    if (!acc[niveau]) acc[niveau] = []
    acc[niveau].push(formation)
    return acc
  }, {})

  // Trier les niveaux (5, 6, 7)
  const sortedNiveaux = Object.keys(formationsByNiveau)
    .map(Number)
    .filter(n => n > 0)
    .sort((a, b) => a - b)

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={`inline-flex items-center space-x-3 ${color} text-white px-6 py-3 rounded-full mb-6`}>
            {icon}
            <h2 className="text-2xl font-montserrat font-bold">{title}</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">{subtitle}</p>
        </motion.div>
        
        {/* Affichage par niveau */}
        {sortedNiveaux.length > 0 ? (
          <div className="space-y-12">
            {sortedNiveaux.map((niveau) => {
              const { niveau: niveauLabel, bac } = getNiveauLabel(niveau)
              const formationsNiveau = formationsByNiveau[niveau]
              
              return (
                <motion.div 
                  key={niveau}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Header du niveau */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <div className="mx-4 flex items-center space-x-3">
                      <span className={`${color} text-white px-4 py-2 rounded-lg font-bold text-lg`}>
                        {niveauLabel}
                      </span>
                      {bac && (
                        <span className="bg-primary-yellow text-primary-blue px-3 py-2 rounded-lg font-semibold">
                          {bac}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  
                  {/* Grille des formations de ce niveau */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {formationsNiveau.map((formation: any, index: number) => (
                      <FormationCard key={formation.id || index} formation={formation} index={index} category={category} />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation: any, index: number) => (
              <FormationCard key={formation.id || index} formation={formation} index={index} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default function FormationsPage() {
  const router = useRouter()
  const [formationsAlternance, setFormationsAlternance] = useState<Formation[]>([])
  const [formationsReconversion, setFormationsReconversion] = useState<Formation[]>([])
  const [vaeFormules, setVaeFormules] = useState<VAEFormule[]>(staticVaeFormules)
  const [vaeCertifications, setVaeCertifications] = useState<{niveau5: any[], niveau6: any[]}>(staticVaeCertifications)
  const [loading, setLoading] = useState(true)

  // Helper pour normaliser les données VAE de Strapi
  const normalizeVAEFormule = (formule: any): VAEFormule => {
    // Extraire les services - peut être un tableau ou un objet complexe
    let services: string[] = []
    if (Array.isArray(formule.services)) {
      services = formule.services
    } else if (formule.services && typeof formule.services === 'object') {
      // Si c'est un objet complexe de Strapi, extraire les prestations
      if (formule.services.prestations && Array.isArray(formule.services.prestations)) {
        services = formule.services.prestations
      } else {
        // Fallback: convertir les valeurs de l'objet en tableau
        services = Object.values(formule.services).filter(v => typeof v === 'string') as string[]
      }
    }

    return {
      id: formule.id,
      titre: formule.titre || formule.type || 'Formule VAE',
      description: formule.description,
      modalites: formule.modalites || '',
      services: services,
      prix: formule.prix || formule.tarif || '',
      heures: formule.heures || formule.duree || null,
      ordre: formule.ordre
    }
  }

  useEffect(() => {
    async function loadFormations() {
      try {
        // Charger les formations depuis Strapi
        const data = await getFormations()
        console.log('📦 Données Strapi reçues:', data?.length || 0, 'formations')
        
        if (data && Array.isArray(data) && data.length > 0) {
          // Filtrer par catégorie (slug de la catégorie)
          const alternance = (data as any[]).filter((f) => 
            f.category?.slug === 'alternance' || f.category?.slug === 'alternance-btp'
          )
          const reconversion = (data as any[]).filter((f) => 
            f.category?.slug === 'reconversion' || f.category?.slug === 'reconversion-btp'
          )
          
          console.log('✅ Alternance:', alternance.length, '| Reconversion:', reconversion.length)
          
          // Mettre à jour avec les données Strapi
          setFormationsAlternance(alternance)
          setFormationsReconversion(reconversion)
        } else {
          // Fallback vers données statiques si Strapi ne retourne rien
          console.warn('⚠️ Strapi vide, utilisation des données statiques')
          const { formationsAlternance: staticAlt, formationsReconversion: staticReconv } = await import('@/data/formations-static')
          setFormationsAlternance(staticAlt as any[] || [])
          setFormationsReconversion(staticReconv as any[] || [])
        }

        // Charger les formules VAE
        const vaeFormulesData = await getVAEFormules()
        if (vaeFormulesData && Array.isArray(vaeFormulesData) && vaeFormulesData.length > 0) {
          const normalizedFormules = vaeFormulesData.map(normalizeVAEFormule)
          setVaeFormules(normalizedFormules)
        }

        // Charger les certifications VAE
        const vaeCertsData = await getVAECertifications()
        if (vaeCertsData && Array.isArray(vaeCertsData) && vaeCertsData.length > 0) {
          const niveau5 = (vaeCertsData as VAECertification[]).filter(c => c.niveau === 'niveau5')
          const niveau6 = (vaeCertsData as VAECertification[]).filter(c => c.niveau === 'niveau6')
          if (niveau5.length > 0 || niveau6.length > 0) {
            setVaeCertifications({ niveau5, niveau6 })
          }
        }
      } catch (error) {
        console.error('❌ Erreur chargement Strapi:', error)
        // Fallback vers données statiques en cas d'erreur
        try {
          const { formationsAlternance: staticAlt, formationsReconversion: staticReconv } = await import('@/data/formations-static')
          setFormationsAlternance(staticAlt || [])
          setFormationsReconversion(staticReconv || [])
          console.log('✅ Fallback statique chargé')
        } catch (e) {
          setFormationsAlternance([])
          setFormationsReconversion([])
        }
      } finally {
        setLoading(false)
      }
    }
    loadFormations()
  }, [])

  const handleCandidater = () => {
    window.open('https://cma-education.ymag.cloud/index.php/preinscription/', '_blank')
  }

  return (
    <PageLayout>
      {/* Hero avec image */}
      <section className="pt-24 pb-8 relative min-h-[450px]">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img 
            src="/images/formations/formations-hero.jpg"
            alt="Formations BTP"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay dégradé */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>
      </section>
      
      {/* Section titre et stats */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary-blue/10 px-4 py-2 rounded-full mb-6">
              <GraduationCap className="w-5 h-5 text-primary-blue" />
              <span className="text-sm font-medium text-primary-blue">Formations BTP Certifiantes</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-primary-blue mb-6">
              Formations BTP Certifiantes
            </h1>
            
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-8">
              Formation conducteur de travaux, formation chargé d'affaires bâtiment et formation BTP alternance. 
              Formations certifiantes RNCP avec 98% d'insertion professionnelle. Prise en charge OPCO intégrale.
            </p>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary-blue/10 rounded-full flex items-center justify-center mb-3">
                <GraduationCap className="w-7 h-7 text-primary-blue" />
              </div>
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-500">Formations diplômantes</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-500">Taux d'insertion</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Euro className="w-7 h-7 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-500">Prise en charge</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Building2 className="w-7 h-7 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">20+</div>
              <div className="text-sm text-gray-500">Entreprises partenaires</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation des catégories */}
      <section className="py-8 bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <a href="#alternance" className="flex items-center space-x-2 bg-primary-blue text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm md:text-base">
              <GraduationCap className="w-4 h-4" />
              <span>Formation en alternance</span>
            </a>
            <a href="#reconversion" className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-sm md:text-base">
              <RefreshCw className="w-4 h-4" />
              <span>Professionnels en reconversion</span>
            </a>
            <a href="#vae" className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors text-sm md:text-base">
              <Award className="w-4 h-4" />
              <span>Professionnels en VAE</span>
            </a>
            <a href="#entreprise" className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors text-sm md:text-base">
              <Building2 className="w-4 h-4" />
              <span>Pour les entreprises</span>
            </a>
          </div>
        </div>
      </section>

      {/* Formation en alternance */}
      <div id="alternance">
        <CategorySection
          title="Formation en alternance"
          subtitle="Formations alliant enseignement théorique et expérience en entreprise pour former des professionnels immédiatement opérationnels"
          icon={<GraduationCap className="w-6 h-6" />}
          formations={formationsAlternance}
          category="alternance"
          color="bg-gradient-to-r from-primary-blue to-blue-600"
        />
      </div>

      {/* Professionnels en reconversion */}
      <div id="reconversion" className="bg-gray-50">
        <CategorySection
          title="Professionnels en reconversion"
          subtitle="Formations pensées pour consolider votre savoir-faire avec une reconnaissance officielle, en valorisant votre expérience terrain"
          icon={<RefreshCw className="w-6 h-6" />}
          formations={formationsReconversion}
          category="reconversion"
          color="bg-gradient-to-r from-green-600 to-emerald-600"
        />
      </div>

      {/* VAE Section - Données statiques complètes */}
      <div id="vae" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full mb-6">
              <Award className="w-6 h-6" />
              <h2 className="text-2xl font-montserrat font-bold">Professionnels en VAE</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Transformez votre expérience en certification professionnelle reconnue
            </p>
          </motion.div>
          
          {/* VAE Formules */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {vaeFormules.map((formule, index) => (
              <motion.div 
                key={formule.id}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-8 rounded-2xl shadow-xl"
              >
                <h3 className="text-2xl font-montserrat font-bold mb-2">{formule.titre}</h3>
                <p className="text-white/80 mb-4">{formule.modalites}</p>
                
                <div className="space-y-3 mb-6">
                  {Array.isArray(formule.services) && formule.services.map((service, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-white/80 flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <p className="text-2xl font-bold mb-1">{formule.prix}</p>
                  {formule.heures && (
                    <p className="text-white/80 text-sm">{formule.heures}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Certifications accessibles */}
          <motion.div 
            className="bg-gray-50 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-montserrat font-bold text-primary-blue mb-6 text-center">
              Certifications accessibles via la VAE
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-purple-600 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Niveau 5 (BAC+2) :
                </h4>
                <ul className="space-y-3">
                  {vaeCertifications.niveau5.map((cert, i) => (
                    <li key={i} className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{cert.titre}</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-purple-600">{cert.rncp}</span>
                          {cert.rncpUrl && (
                            <a 
                              href={cert.rncpUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 text-xs text-primary-blue hover:text-blue-700 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Voir sur France Compétences</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-purple-600 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Niveau 6 (BAC+3) :
                </h4>
                <ul className="space-y-3">
                  {vaeCertifications.niveau6.map((cert, i) => (
                    <li key={i} className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{cert.titre}</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-purple-600">{cert.rncp}</span>
                          {cert.rncpUrl && (
                            <a 
                              href={cert.rncpUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 text-xs text-primary-blue hover:text-blue-700 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Voir sur France Compétences</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Formations Entreprises - Données statiques complètes */}
      <div id="entreprise" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full mb-6">
              <Building2 className="w-6 h-6" />
              <h2 className="text-2xl font-montserrat font-bold">Pour les entreprises</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Accompagnement des entreprises pour faire évoluer leurs salariés et développer leurs compétences
            </p>
          </motion.div>
          
          {/* Avantages entreprises */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {entrepriseAvantages.map((avantage, index) => (
              <motion.div 
                key={avantage.id}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  {index === 0 && <TrendingUp className="w-6 h-6 text-orange-600" />}
                  {index === 1 && <Target className="w-6 h-6 text-orange-600" />}
                  {index === 2 && <Heart className="w-6 h-6 text-orange-600" />}
                  {index === 3 && <Users className="w-6 h-6 text-orange-600" />}
                </div>
                <h3 className="font-bold text-primary-blue mb-2">{avantage.titre}</h3>
                <p className="text-sm text-gray-600">{avantage.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Thématiques de formation */}
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg mb-12"
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-montserrat font-bold text-primary-blue mb-6">
              Thématiques de formation
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {entrepriseThematiques.map((theme, i) => (
                <div key={i} className="flex items-center space-x-3 bg-orange-50 p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700">{theme}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Modalités */}
          <motion.div 
            className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white"
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-montserrat font-bold mb-6">Modalités</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {entrepriseModalites.map((modalite, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-bold mb-2">{modalite.type}</h4>
                  <p className="text-white/80 text-sm">{modalite.description}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Tarif : {entrepriseTarif}</p>
                <p className="text-white/80">Financement OPCO possible</p>
              </div>
              <button 
                onClick={handleCandidater}
                className="mt-4 md:mt-0 bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Demander un devis
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Final */}
      <section className="relative py-16 bg-gradient-to-r from-primary-blue to-indigo-600 text-white">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-montserrat font-bold mb-6">
              Prêt à transformer votre avenir professionnel ?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Contactez-nous pour un entretien personnalisé et découvrir la formation qui vous correspond
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleCandidater} 
                className="bg-white text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Candidater maintenant</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link 
                href="/brochure"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Télécharger la brochure
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}
