import { useState, useEffect } from 'react'
import { getFormations } from '../strapi'
import { strapiFormationToLocal, StrapiFormation } from '../strapi-types'

export interface Formation {
  id: string
  title: string
  level: string
  rncp: string
  shortDesc: string
  fullDesc: string
  objectifs: string[]
  programme: string[]
  debouches: string[]
  duree: string
  volumeHoraire: string
  rythme: string
  modalite: string
  typeContrat: string
  effectif: string
  prerequis: string[]
  cout: string
  certificateur: string
  dateEnregistrement: string
  tauxReussite: string
  tauxInsertion: string
  isActive: boolean
  image: string
  gallery: string[]
  brochure: string
}

export function useFormations() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        setLoading(true)
        const strapiFormations = await getFormations()
        const convertedFormations = (strapiFormations as StrapiFormation[]).map(strapiFormationToLocal)
        setFormations(convertedFormations)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des formations')
      } finally {
        setLoading(false)
      }
    }

    fetchFormations()
  }, [])

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = !searchTerm || 
      formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !selectedCategory || formation.id.includes(selectedCategory)
    
    return formation.isActive && matchesSearch && matchesCategory
  })

  const getFormationBySlug = (slug: string) => {
    return formations.find(formation => formation.id === slug)
  }

  const getFeaturedFormations = () => {
    return formations.filter(formation => formation.isActive).slice(0, 3)
  }

  return {
    formations: filteredFormations,
    allFormations: formations,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    getFormationBySlug,
    getFeaturedFormations
  }
}
