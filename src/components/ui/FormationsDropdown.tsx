'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { getFormations, getFormationCategories } from '@/lib/strapi'

interface FormationsDropdownProps {
  isScrolled?: boolean // Optionnel, peut être utilisé pour le style
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

const FormationsDropdown = ({ isScrolled }: FormationsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [categories, setCategories] = useState<FormationCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

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
    }, 150) // Délai de 150ms avant de fermer
    setHoverTimeout(timeout)
  }

  useEffect(() => {
    async function loadFormations() {
      try {
        console.log('🔄 Chargement des formations depuis Strapi...')
        const [categoriesData, formationsData] = await Promise.all([
          getFormationCategories(),
          getFormations()
        ])
        
        console.log('📊 Données Strapi reçues:', {
          categories: categoriesData?.length || 0,
          formations: formationsData?.length || 0
        })
        
        // Organiser les formations par catégorie (uniquement depuis Strapi)
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
        
        console.log('✅ Catégories avec formations:', validCategories.map(cat => ({
          name: cat.name,
          count: cat.formations?.length || 0
        })))
        
        // Utiliser uniquement les données Strapi (pas de fallback)
        setCategories(validCategories)
        
      } catch (error) {
        console.error('❌ Erreur chargement Strapi:', error)
        // Pas de fallback - afficher un tableau vide
        setCategories([])
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

  if (loading) {
    return (
      <div className="relative">
        <button className="nav-item-fix flex items-center space-x-1 font-medium transition-colors rounded-lg text-gray-900 hover:text-primary-blue">
          <span>Formations</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="nav-item-fix flex items-center space-x-1 font-medium transition-colors rounded-lg text-gray-900 hover:text-primary-blue"
      >
        <span>Formations</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && categories.length > 0 && (
        <div 
          className="absolute top-full left-0 mt-1 w-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-[80vh] overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Onglets */}
          <div className="flex border-b border-gray-100 bg-gray-50">
            {categories.map((category, index) => (
              <button
                key={index}
                onMouseEnter={() => {
                  handleMouseEnter()
                  setActiveTab(index)
                }}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === index 
                    ? 'text-primary-blue border-b-2 border-primary-blue bg-white' 
                    : 'text-gray-600 hover:text-primary-blue hover:bg-gray-100'
                }`}
              >
                <span>{category.name}</span>
                <span className="ml-1 text-xs text-gray-400">({category.formations?.length || 0})</span>
              </button>
            ))}
          </div>

          {/* Contenu - Affiche TOUTES les formations */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-2">
              {categories[activeTab]?.formations && categories[activeTab].formations.length > 0 ? (
                categories[activeTab].formations.map((formation: any, idx) => (
                  <Link
                    key={idx}
                    href={`/formations/${formation.slug || formation.id || 'formation'}`}
                    className="block p-3 rounded-lg hover:bg-blue-50 transition-colors group border border-transparent hover:border-blue-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 group-hover:text-primary-blue text-sm">
                          {formation.title || 'Formation'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{formation.level || 'Niveau pro'}</span>
                          <span>•</span>
                          <span>{formation.duree || formation.duration || '1 an'}</span>
                        </div>
                      </div>
                      <span className="text-primary-blue opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-sm text-gray-500 text-center py-8">
                  Aucune formation disponible dans cette catégorie
                </div>
              )}
            </div>
          </div>
          
          {/* Footer avec liens */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <Link
              href="/formations"
              className="text-sm text-primary-blue hover:text-primary-yellow font-medium flex items-center gap-1"
            >
              <span>Voir toutes les formations</span>
              <span>→</span>
            </Link>
            <div className="flex gap-2">
              <Link
                href="/formations/entreprises"
                className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md text-xs font-medium hover:bg-orange-200 transition-colors"
              >
                Entreprises
              </Link>
              <Link
                href="/formations/vae-btp"
                className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md text-xs font-medium hover:bg-purple-200 transition-colors"
              >
                VAE
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormationsDropdown
