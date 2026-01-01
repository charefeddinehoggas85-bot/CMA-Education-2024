'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import Link from 'next/link'
import { getFormateurs, getPageHome } from '@/lib/strapi'
import { getStrapiMediaURL } from '@/lib/strapi'

interface Formateur {
  id: number
  nom: string
  prenom: string
  specialite: string
  bio?: string | null
  photo?: any
  slug?: string
}

interface PageHomeData {
  formatorsSectionBadge?: string
  formatorsSectionTitle?: string
  formatorsSectionSubtitle?: string
  formatorsSectionCtaText?: string
  formatorsSectionCtaUrl?: string
  formatorsBadgeText?: string
}

const FeaturedFormatorsSection = () => {
  const [formateurs, setFormateurs] = useState<Formateur[]>([])
  const [pageData, setPageData] = useState<PageHomeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [formateursData, homeData] = await Promise.all([
          getFormateurs(),
          getPageHome()
        ])
        if (formateursData && Array.isArray(formateursData)) {
          setFormateurs((formateursData as Formateur[]).slice(0, 4))
        }
        if (homeData) {
          setPageData(homeData as PageHomeData)
        }
      } catch (error) {
        console.error('Erreur chargement formateurs:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Computed values with fallbacks
  const badgeText = pageData?.formatorsSectionBadge || "Notre Équipe"
  const sectionTitle = pageData?.formatorsSectionTitle || "Nos Formateurs d'Excellence"
  const sectionSubtitle = pageData?.formatorsSectionSubtitle || "Des experts du BTP passionnés par la transmission de savoir et l'accompagnement de vos projets"
  const ctaText = pageData?.formatorsSectionCtaText || "Rencontrer l'équipe complète"
  const ctaUrl = pageData?.formatorsSectionCtaUrl || "/formateurs"
  const expertBadgeText = pageData?.formatorsBadgeText || "Expert BTP"

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse bg-gray-200 h-12 w-96 mx-auto rounded mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-2/3 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-2xl p-6 h-80"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-primary-blue" />
            <span className="text-sm font-semibold text-primary-blue uppercase tracking-wider">{badgeText}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-gray-900 mb-4">
            {sectionTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {formateurs.map((formateur, index) => (
            <motion.div
              key={formateur.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              {/* Avatar Container */}
              <div className="relative mb-6 inline-block">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary-blue shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  {formateur.photo && getStrapiMediaURL(formateur.photo) ? (
                    <img
                      src={getStrapiMediaURL(formateur.photo) || ''}
                      alt={`${formateur.prenom} ${formateur.nom}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-blue to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                      {formateur.prenom?.[0]}{formateur.nom?.[0]}
                    </div>
                  )}
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-primary-yellow opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
              </div>

              {/* Content */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 group-hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {formateur.prenom} {formateur.nom}
                </h3>
                
                <p className="text-primary-blue font-semibold text-sm mb-3">
                  {formateur.specialite}
                </p>

                {formateur.bio && (
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {formateur.bio ?? ''}
                  </p>
                )}

                {/* Expertise Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-primary-blue font-semibold">
                  <span className="w-2 h-2 bg-primary-yellow rounded-full"></span>
                  {expertBadgeText}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Global */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href={ctaUrl}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-yellow to-yellow-500 text-primary-blue px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedFormatorsSection
