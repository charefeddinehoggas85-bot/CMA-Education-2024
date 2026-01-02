'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getSiteSettings, getPageHome, getImageURL } from '@/lib/strapi'

interface SiteSettings {
  id: number
  siteName: string
  contactPhone: string
  accessibilityMessage?: string
  accessibilityPhone?: string
  referentHandicap?: string
}

interface PageHomeData {
  accessibilityTitle: string
  accessibilityMessage: string
  accessibilityReferent: string
  accessibilityImage?: any
}

const AccessibilityBanner = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    id: 1,
    siteName: 'Construction Management Academy',
    contactPhone: '01 85 09 71 06',
    accessibilityMessage: 'Nos formations sont ouvertes à tous, y compris aux personnes en situation de handicap. Nous mettons en place les aménagements nécessaires pour garantir les meilleures conditions d\'apprentissage.',
    accessibilityPhone: '01 85 09 71 06',
    referentHandicap: 'notre référent handicap'
  })
  const [pageData, setPageData] = useState<PageHomeData>({
    accessibilityTitle: "Accessibilité et Inclusion",
    accessibilityMessage: "Nos formations sont ouvertes à tous, y compris aux personnes en situation de handicap. Nous mettons en place les aménagements nécessaires pour garantir les meilleures conditions d'apprentissage.",
    accessibilityReferent: "notre référent handicap",
    accessibilityImage: null
  })
  const [loading, setLoading] = useState(false) // Pas de loading, affichage immédiat

  useEffect(() => {
    async function loadData() {
      try {
        // Charger les données de la page home
        const homeData = await getPageHome()
        if (homeData) {
          setPageData({
            accessibilityTitle: homeData.accessibilityTitle || pageData.accessibilityTitle,
            accessibilityMessage: homeData.accessibilityMessage || pageData.accessibilityMessage,
            accessibilityReferent: homeData.accessibilityReferent || pageData.accessibilityReferent,
            accessibilityImage: homeData.accessibilityImage || pageData.accessibilityImage
          })
        }
        
        // Charger les paramètres du site pour le téléphone
        const data = await getSiteSettings()
        if (data) {
          setSiteSettings(data as SiteSettings)
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <section className="relative py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="animate-pulse bg-gray-200 w-40 h-40 rounded"></div>
            <div className="flex-1 max-w-4xl">
              <div className="animate-pulse bg-gray-200 h-8 w-64 rounded mb-3"></div>
              <div className="animate-pulse bg-gray-200 h-20 w-full rounded"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="relative py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left"
        >
          <div className="flex-shrink-0">
            <Image 
              src={getImageURL(pageData.accessibilityImage, "/images/handicap.webp")} 
              alt="Accessibilité Handicap" 
              width={160} 
              height={160}
              className="w-40 h-40"
            />
          </div>
          
          <div className="flex-1 max-w-4xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {pageData.accessibilityTitle}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-primary-blue">{siteSettings.siteName} s'engage pour l'accessibilité.</span>{' '}
              {pageData.accessibilityMessage}{' '}
              Pour toute demande spécifique, contactez {pageData.accessibilityReferent} au{' '}
              <a 
                href={`tel:${(siteSettings.accessibilityPhone || siteSettings.contactPhone).replace(/\s/g, '')}`} 
                className="text-primary-blue font-semibold hover:underline"
              >
                {siteSettings.accessibilityPhone || siteSettings.contactPhone}
              </a>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AccessibilityBanner
