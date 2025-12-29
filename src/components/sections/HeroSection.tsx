'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import OptimizedButton from '@/components/ui/OptimizedButton'
import { getSiteSettings } from '@/lib/strapi'

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

const HeroSection = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    id: 1,
    siteName: 'Construction Management Academy',
    siteTagline: 'Construction Management Academy',
    heroTitle: 'Construction Management Academy - Devenez l\'acteur du BTP d\'aujourd\'hui et de demain',
    heroSubtitle: 'Construction Management Academy',
    heroDescription: 'Formations BTP en alternance, reconversion et VAE. Du Niveau 5 au Niveau 7 (Bac+2 à Bac+5) avec nos partenaires entreprises.',
    contactPhone: '01 89 70 60 52',
    contactEmail: 'contact.academy@construction-management-academy.fr'
  })
  const [loading, setLoading] = useState(false) // Pas de loading, affichage immédiat

  useEffect(() => {
    async function loadSiteSettings() {
      try {
        const data = await getSiteSettings()
        if (data) {
          console.log('🎬 Site settings loaded:', data)
          console.log('🎬 Hero video data:', (data as SiteSettings).heroVideo)
          setSiteSettings(data as SiteSettings)
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      }
    }

    loadSiteSettings()
  }, [])

  const videoUrl = 'http://localhost:1337/uploads/Design_sans_titre_4_d438e047b5.mp4'

  const handleCandidater = () => {
    window.open('https://construction-management-academy.ymag.cloud/index.php/preinscription/', '_blank')
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-header-offset-mobile md:pt-header-offset-md lg:pt-header-offset">
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

      {/* Content - Responsive */}
      <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Hero Title - Dynamique depuis Strapi - Responsive */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block text-white mb-1 md:mb-2">
              {siteSettings?.heroTitle?.split(' - ')[0] || 'Construction Management Academy'}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-yellow via-orange-400 to-primary-yellow">
              {siteSettings?.heroTitle?.split(' - ')[1] || 'Devenez l\'acteur du BTP d\'aujourd\'hui et de demain'}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-gray-300 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {siteSettings?.heroSubtitle || siteSettings?.siteTagline || 'Construction Management Academy'}
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary-yellow to-orange-500 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>

        {/* Clear Value Proposition - Dynamique */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {siteSettings?.heroDescription || (
            <>
              Formations BTP en <span className="text-primary-yellow font-semibold">alternance, reconversion et VAE</span>.
              <br />Du <span className="text-primary-yellow font-semibold">Niveau 5 au Niveau 7 (Bac+2 à Bac+5)</span> avec nos partenaires entreprises.
            </>
          )}
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
            CANDIDATER MAINTENANT
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