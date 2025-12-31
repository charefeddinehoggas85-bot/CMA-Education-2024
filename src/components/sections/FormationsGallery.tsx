'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FormationsCarousel from '@/components/ui/FormationsCarousel'
import { formationsAlternance, formationsReconversion, vaeFormules } from '@/data/formations-static'

interface Formation {
  id: number
  title: string
  slug: string
  level: string
  rncp?: string
  shortDescription: string
  image: string
  isAlternance?: boolean
  isReconversion?: boolean
}

interface FormationCategory {
  id: number
  nom: string
  slug: string
  couleur?: string
  formations: Formation[]
}

const FormationsGallery = () => {
  const [categories, setCategories] = useState<FormationCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFormationsData() {
      try {
        console.log('🔄 FormationsGallery: Chargement des données...')
        
        // Essayer Strapi d'abord avec un timeout court
        try {
          const [formationsResponse, categoriesResponse] = await Promise.race([
            Promise.all([
              fetch('https://cma-education-strapi-production.up.railway.app/api/formations?populate=*&sort=ordre:asc'),
              fetch('https://cma-education-strapi-production.up.railway.app/api/formation-categories?populate=*&sort=ordre:asc')
            ]),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1500))
          ]) as Response[]
          
          const formationsData = await formationsResponse.json()
          const categoriesData = await categoriesResponse.json()
          
          if (formationsData.data?.length > 0 && categoriesData.data?.length > 0) {
            // Transformer les données Strapi
            const transformedFormations = formationsData.data.map((item: any) => ({
              id: item.id,
              title: item.attributes.title,
              slug: item.attributes.slug,
              level: item.attributes.level,
              rncp: item.attributes.rncp,
              shortDesc: item.attributes.shortDesc,
              category: item.attributes.category?.data ? {
                slug: item.attributes.category.data.attributes.slug,
                name: item.attributes.category.data.attributes.name
              } : null
            }))
            
            const transformedCategories = categoriesData.data.map((item: any) => ({
              id: item.id,
              name: item.attributes.name,
              slug: item.attributes.slug,
              color: item.attributes.color || 'blue'
            }))
            
            // Organiser par catégorie
            const organizedCategories = transformedCategories.map((category: any) => ({
              id: category.id,
              nom: category.name,
              slug: category.slug,
              couleur: category.color,
              formations: transformedFormations.filter((formation: any) => 
                formation.category?.slug === category.slug
              ).map((formation: any) => ({
                id: formation.id,
                title: formation.title,
                slug: formation.slug,
                level: formation.level,
                rncp: formation.rncp,
                shortDescription: formation.shortDesc || 'Formation professionnelle',
                image: '/images/formations/default.jpg',
                isAlternance: category.slug === 'alternance',
                isReconversion: category.slug === 'reconversion'
              }))
            }))
            
            console.log('✅ FormationsGallery: Données Strapi chargées avec RNCP')
            setCategories(organizedCategories)
            setLoading(false)
            return
          }
        } catch (strapiError) {
          console.log('⚠️ FormationsGallery: Strapi indisponible, fallback statique')
        }
        
        // Fallback avec données statiques
        const staticCategories: FormationCategory[] = [
          {
            id: 1,
            nom: 'Formations en Alternance',
            slug: 'alternance',
            couleur: 'blue',
            formations: formationsAlternance.slice(0, 4).map(formation => ({
              id: formation.id,
              title: formation.title,
              slug: formation.slug,
              level: formation.level,
              rncp: formation.rncp || '',
              shortDescription: formation.shortDescription,
              image: formation.image,
              isAlternance: true,
              isReconversion: false
            }))
          },
          {
            id: 2,
            nom: 'Formations Reconversion',
            slug: 'reconversion',
            couleur: 'green',
            formations: formationsReconversion.slice(0, 3).map(formation => ({
              id: formation.id,
              title: formation.title,
              slug: formation.slug,
              level: formation.level,
              rncp: formation.rncp || '',
              shortDescription: formation.shortDescription,
              image: formation.image,
              isAlternance: false,
              isReconversion: true
            }))
          },
          {
            id: 3,
            nom: 'VAE - Validation des Acquis',
            slug: 'vae',
            couleur: 'purple',
            formations: vaeFormules.slice(0, 2).map((formule, index) => ({
              id: 200 + index,
              title: formule.titre,
              slug: `vae-${formule.titre.toLowerCase().replace(/\s+/g, '-')}`,
              level: 'Tous niveaux',
              rncp: 'Multiples certifications',
              shortDescription: formule.description,
              image: '/images/formations/vae-default.jpg',
              isAlternance: false,
              isReconversion: false
            }))
          }
        ]
        
        console.log('✅ FormationsGallery: Données statiques chargées avec RNCP')
        setCategories(staticCategories)
        
      } catch (error) {
        console.error('❌ FormationsGallery: Erreur de chargement:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFormationsData()
  }, [])

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Explorez nos formations par <span className="text-primary-blue">catégorie</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos parcours de formation adaptés à votre profil et vos objectifs professionnels
          </p>
        </motion.div>

        {/* Formations Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FormationsCarousel
                formations={category.formations}
                categoryName={category.nom}
                categoryColor={category.couleur}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 inline-block">
            <p className="text-gray-700 mb-4">
              Besoin de plus d'informations sur nos formations ?
            </p>
            <a
              href="/formations"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-blue to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Voir toutes nos formations
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FormationsGallery
