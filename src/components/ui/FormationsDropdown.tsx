'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, GraduationCap, Building, Users, Award } from 'lucide-react'
import { getFormations, getFormationCategories } from '@/lib/strapi'

interface FormationsDropdownProps {
  isScrolled?: boolean
}

interface Formation {
  id: number
  title: string
  slug: string
  level: string
  duree?: string
  category?: {
    name: string
    slug: string
  }
}

interface FormationCategory {
  id: number
  name: string
  slug: string
  formations?: Formation[]
}

// Interface pour les données fallback
interface FallbackCategory {
  category: string
  icon: React.ComponentType<any>
  formations: Array<{
    title: string
    slug: string
    level: string
    duree: string
  }>
}

// FALLBACK DATA - Formations statiques pour garantir l'affichage TOUJOURS
const FALLBACK_FORMATIONS: FallbackCategory[] = [
  {
    category: 'Alternance',
    icon: GraduationCap,
    formations: [
      { title: 'Chargé d\'Affaires Bâtiment', slug: 'charge-affaires-batiment', level: 'Bac+2', duree: '1 an' },
      { title: 'Conducteur de Travaux Bâtiment', slug: 'conducteur-travaux-batiment', level: 'Bac+2', duree: '1 an' },
      { title: 'Chef de Chantier VRD', slug: 'chef-chantier-vrd', level: 'Bac+2', duree: '1 an' },
      { title: 'Conducteur de Travaux TP', slug: 'conducteur-travaux-tp-alternance', level: 'Bac+2', duree: '1 an' },
      { title: 'Chef de Projets BTP', slug: 'chef-projets-btp-1an', level: 'Bac+5', duree: '1 an' }
    ]
  },
  {
    category: 'Reconversion',
    icon: Users,
    formations: [
      { title: 'Chargé d\'Affaires - Reconversion', slug: 'reconversion-btp/charge-affaires', level: 'Bac+2', duree: '7 mois' },
      { title: 'Conducteur de Travaux - Reconversion', slug: 'reconversion-btp/conducteur-travaux', level: 'Bac+2', duree: '7 mois' },
      { title: 'Conducteur TP - Reconversion', slug: 'reconversion-btp/conducteur-travaux-publics', level: 'Bac+2', duree: '7 mois' }
    ]
  },
  {
    category: 'VAE',
    icon: Award,
    formations: [
      { title: 'VAE Conducteur de Travaux', slug: 'vae-btp/conducteur-travaux', level: 'Validation', duree: '6-12 mois' },
      { title: 'VAE Chargé d\'Affaires', slug: 'vae-btp/charge-affaires', level: 'Validation', duree: '6-12 mois' }
    ]
  },
  {
    category: 'Entreprises',
    icon: Building,
    formations: [
      { title: 'Formation sur mesure', slug: 'entreprises', level: 'Pro', duree: 'Variable' },
      { title: 'Accompagnement équipes', slug: 'entreprises#accompagnement', level: 'Pro', duree: 'Variable' }
    ]
  }
]

const FormationsDropdown = ({ isScrolled }: FormationsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [categories, setCategories] = useState<FormationCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [useFallback, setUseFallback] = useState(true) // Commencer par le fallback

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false)
    }, 200) // Délai augmenté pour meilleure UX
    setHoverTimeout(timeout)
  }

  useEffect(() => {
    async function loadFormations() {
      try {
        console.log('🔄 Tentative de chargement depuis Strapi...')
        const [categoriesData, formationsData] = await Promise.all([
          getFormationCategories(),
          getFormations()
        ])
        
        console.log('📊 Données Strapi reçues:', {
          categories: categoriesData?.length || 0,
          formations: formationsData?.length || 0
        })
        
        if (categoriesData && formationsData && categoriesData.length > 0 && formationsData.length > 0) {
          // Organiser les formations par catégorie
          const categoriesWithFormations = (categoriesData as FormationCategory[]).map(category => {
            const categoryFormations = (formationsData as Formation[]).filter(formation => 
              formation.category?.slug === category.slug || formation.category?.name === category.name
            )
            
            return {
              ...category,
              formations: categoryFormations
            }
          })
          
          // Filtrer pour ne garder que les catégories avec des formations
          const validCategories = categoriesWithFormations.filter(cat => cat.formations && cat.formations.length > 0)
          
          if (validCategories.length > 0) {
            console.log('✅ Utilisation des données Strapi')
            setCategories(validCategories)
            setUseFallback(false)
          } else {
            console.log('⚠️ Pas de formations valides dans Strapi, utilisation du fallback')
            setUseFallback(true)
          }
        } else {
          console.log('⚠️ Données Strapi insuffisantes, utilisation du fallback')
          setUseFallback(true)
        }
        
      } catch (error) {
        console.error('❌ Erreur chargement Strapi:', error)
        console.log('🔄 Utilisation du fallback')
        setUseFallback(true)
      } finally {
        setLoading(false)
      }
    }
    loadFormations()
  }, [])

  // Nettoyage des timeouts
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  // Données à afficher (Strapi ou fallback) - TOUJOURS QUELQUE CHOSE
  const displayData: (FormationCategory | FallbackCategory)[] = useFallback ? FALLBACK_FORMATIONS : categories

  if (loading) {
    return (
      <div className="relative">
        <button className="nav-item-fix flex items-center space-x-1 font-medium transition-colors rounded-lg text-gray-900 hover:text-primary-blue">
          <GraduationCap className="w-4 h-4" />
          <span>Formations</span>
          <ChevronDown className="w-4 h-4 animate-pulse" />
        </button>
      </div>
    )
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="nav-item-fix flex items-center space-x-1 font-medium transition-all duration-200 rounded-lg text-gray-900 hover:text-primary-blue group-hover:bg-blue-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <GraduationCap className="w-4 h-4" />
        <span>Formations</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && displayData.length > 0 && (
        <div 
          className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-[85vh] overflow-hidden backdrop-blur-sm"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
          }}
        >
          {/* Header avec indicateur de source */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Nos Formations</h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                {useFallback ? (
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">Mode hors ligne</span>
                ) : (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">En direct</span>
                )}
              </div>
            </div>
          </div>

          {/* Onglets */}
          <div className="flex border-b border-gray-100 bg-gray-50 overflow-x-auto">
            {displayData.map((category, index) => {
              const IconComponent = useFallback ? (category as FallbackCategory).icon : GraduationCap
              const categoryName = useFallback ? (category as FallbackCategory).category : (category as FormationCategory).name
              const formationsCount = useFallback ? (category as FallbackCategory).formations.length : ((category as FormationCategory).formations?.length || 0)
              
              return (
                <button
                  key={index}
                  onMouseEnter={() => {
                    handleMouseEnter()
                    setActiveTab(index)
                  }}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === index 
                      ? 'text-primary-blue border-b-2 border-primary-blue bg-white shadow-sm' 
                      : 'text-gray-600 hover:text-primary-blue hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{categoryName}</span>
                  <span className="ml-1 text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full">
                    {formationsCount}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Contenu */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-3">
              {(() => {
                const activeCategory = displayData[activeTab]
                const formations = useFallback 
                  ? (activeCategory as FallbackCategory).formations 
                  : (activeCategory as FormationCategory).formations
                
                if (!formations || formations.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Aucune formation disponible</p>
                    </div>
                  )
                }

                return formations.map((formation: any, idx) => (
                  <Link
                    key={idx}
                    href={`/formations/${formation.slug || formation.id || 'formation'}`}
                    className="block p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 group border border-transparent hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 group-hover:text-primary-blue text-base mb-2">
                          {formation.title || 'Formation'}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {formation.level || 'Niveau pro'}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formation.duree || formation.duration || '1 an'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              })()}
            </div>
          </div>
          
          {/* Footer avec liens d'action */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex justify-between items-center">
              <Link
                href="/formations"
                className="inline-flex items-center space-x-2 text-sm text-primary-blue hover:text-primary-yellow font-semibold transition-colors group"
              >
                <span>Voir toutes les formations</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <div className="flex gap-2">
                <Link
                  href="/formations/entreprises"
                  className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors"
                >
                  Entreprises
                </Link>
                <Link
                  href="/formations/vae-btp"
                  className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition-colors"
                >
                  VAE
                </Link>
                <Link
                  href="/contact"
                  className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormationsDropdown
