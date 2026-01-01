'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import OptimizedButton from '@/components/ui/OptimizedButton'
import { getSiteSettings, getPageHome } from '@/lib/strapi'

interface SiteSettings {
  id?: number
  siteName?: string
  siteTagline?: string
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  contactPhone?: string
  contactEmail?: string
  heroVideo?: any
  [key: string]: any
}

interface PageHomeData {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  heroVideoUrl?: string
  heroCtaText?: string
  heroCtaUrl?: string
}

const HeroSection = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    id: 1,
    siteName: 'Construction Management Academy',
    siteTagline: 'Centre de formation BTP',
    heroTitle: 'Devenez l\'acteur du BTP d\'aujourd\'hui et de demain',
    heroSubtitle: 'Formations BTP spécialisées',
    heroDescription: 'Alternance, reconversion et VAE. Niveaux 5 à 7 (Bac+2 à Bac+5).',
    contactPhone: '01 89 70 60 52',
    contactEmail: 'contact.academy@cma-education.com'
  })
  const [pageData, setPageData] = useState<PageHomeData | null>(null)
  const [loading, setLoading] = useState(false) // Pas de loading, affichage immédiat

  useEffect(() => {
    async function loadData() {
      try {
        const [settingsData, homeData] = await Promise.all([
          getSiteSettings(),
          getPageHome()
        ])
        if (settingsData) {
          setSiteSettings(settingsData as SiteSettings)
        }
        if (homeData) {
          setPageData(homeData as PageHomeData)
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      }
    }

    loadData()
  }, [])

  // Computed values with fallbacks
  const heroTitle = pageData?.heroTitle || siteSettings?.heroTitle || 'Devenez l\'acteur du BTP d\'aujourd\'hui et de demain'
  const heroSubtitle = pageData?.heroSubtitle || siteSettings?.heroSubtitle || 'Formations BTP spécialisées'
  const heroDescription = pageData?.heroDescription || siteSettings?.heroDescription || 'Alternance, reconversion et VAE. Niveaux 5 à 7 (Bac+2 à Bac+5).'
  const videoUrl = pageData?.heroVideoUrl || 'https://cma-education-strapi-production.up.railway.app/uploads/Design_sans_titre_4_d438e047b5.mp4'
  const ctaText = pageData?.heroCtaText || 'CANDIDATER MAINTENANT'
  const ctaUrl = pageData?.heroCtaUrl || 'https://construction-management-academy.ymag.cloud/index.php/preinscription/'

  const handleCandidater = () => {
    window.open(ctaUrl, '_blank')
  }

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-header-offset md:pt-header-offset-mobile">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-primary-blue/30 to-slate-800/30"></div>
        <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-16 bg-white/20 rounded-lg mx-auto w-3/4"></div>
            <div className="h-8 bg-white/20 rounded-lg mx-auto w-1/2"></div>
            <div className="h-6 bg-white/20 rounded-lg mx-auto w-2/3"></div>
            <div className="h-12 bg-white/20 rounded-lg mx-auto w-48"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-header-offset md:pt-header-offset-md lg:pt-header-offset-lg xl:pt-header-offset-xl 2xl:pt-header-offset-2xl">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-slate-800/30 to-slate-800/30"></div>
      </div>

      {/* Content - Responsive Optimisé pour 2XL */}
      <div className="relative z-20 text-center text-white max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 py-6 md:py-8 lg:py-12 2xl:py-16">
        {/* Hero Title - Dynamique depuis Strapi - Responsive */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-4 md:mb-6 2xl:mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-yellow via-orange-400 to-primary-yellow">
              {heroTitle}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light text-gray-300 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroSubtitle}
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary-yellow to-orange-500 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>

        {/* Clear Value Proposition - Dynamique - Optimisé 2XL */}
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-200 mb-8 2xl:mb-12 max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {heroDescription}
        </motion.p>

        {/* Primary CTA - Single Focus */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <OptimizedButton
            variant="gradient"
            size="xl"
            icon={<ArrowRight className="w-6 h-6" />}
            className="text-xl px-12 py-6 shadow-2xl hover:shadow-primary-yellow/25"
            onClick={handleCandidater}
          >
            {ctaText}
          </OptimizedButton>
        </motion.div>

        {/* Simplified Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-primary-yellow transition-colors animate-bounce">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Subtle bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/5 to-transparent" />
    </section>
  )
}

export default HeroSection
