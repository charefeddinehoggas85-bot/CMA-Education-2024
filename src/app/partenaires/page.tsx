'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Building2, Users, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { getPagePartenaires, getPartners, getStrapiMediaURL, getImageURL } from '@/lib/strapi'

// Image par défaut (fallback)
const DEFAULT_HERO_IMAGE = '/images/partenaires-hero.jpg'

// Données statiques par défaut (fallback)
const defaultPartners = [
  { name: 'Léon Grosse', logo: '/images/partners/LEON GROSSE.webp', website: 'https://www.leongrosse.fr/' },
  { name: 'Eiffage', logo: '/images/partners/eiffage.webp', website: 'https://www.eiffage.com/' },
  { name: 'Afpa', logo: '/images/partners/Afpa.webp', website: 'https://www.afpa.fr/' },
  { name: 'NGE', logo: '/images/partners/nge.webp', website: 'https://www.nge.fr/' },
  { name: 'GCC Construction', logo: '/images/partners/gcc.webp', website: 'https://www.gcc.fr/' },
  { name: 'Coredif', logo: '/images/partners/COREDIF.webp', website: 'https://www.coredif.fr/' },
  { name: 'DCT Solutions de Démolition', logo: '/images/partners/DCT Solutions de Démolition.webp', website: 'https://www.dct-demolition.fr/' },
  { name: 'Biens Sur Élévations', logo: '/images/partners/Bien sur élévations.webp', website: 'https://www.biens-sur.fr/' },
  { name: 'LT Construction', logo: '/images/partners/LT CONSTRUCTION.webp', website: 'https://www.lt-construction.fr/' },
  { name: 'O2P BAT', logo: '/images/partners/O2P BAT.webp', website: 'https://www.o2pbat.fr/' },
  { name: 'Green Bât', logo: '/images/partners/Green Bat.webp', website: 'https://www.greenbat.fr/' },
  { name: 'GS Construction', logo: '/images/partners/GS Construction.webp', website: 'https://www.gs-construction.fr/' },
]

// Statistiques par défaut
const defaultStats = [
  { icon: Building2, value: '12', label: 'Entreprises partenaires', suffix: '' },
  { icon: Users, value: '40', label: 'Alternants placés', suffix: '+' },
  { icon: Briefcase, value: '98', label: "Taux d'insertion", suffix: '%' },
]

interface PageData {
  heroTitle: string
  heroSubtitle: string
  heroImage: string | null
  sectionTitle: string
  sectionDescription: string
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  ctaButtonLink: string
}

interface Partner {
  id?: number
  name: string
  logo: string
  website?: string
  logoData?: any
}

export default function PartenairesPage() {
  const [pageData, setPageData] = useState<PageData>({
    heroTitle: 'Nos Partenaires',
    heroSubtitle: 'Des entreprises leaders du BTP qui nous font confiance pour former les professionnels de demain',
    heroImage: null,
    sectionTitle: 'Ils nous font confiance',
    sectionDescription: 'Nos partenaires accueillent nos alternants et participent activement à leur formation',
    ctaTitle: 'Devenez partenaire',
    ctaDescription: 'Rejoignez notre réseau d\'entreprises partenaires et accueillez nos alternants formés aux métiers du BTP',
    ctaButtonText: 'Nous contacter',
    ctaButtonLink: '/contact'
  })
  const [partners, setPartners] = useState<Partner[]>(defaultPartners)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        // Charger les données de la page
        const strapiPageData = await getPagePartenaires()
        if (strapiPageData) {
          // Récupérer l'URL de l'image hero depuis Strapi
          let heroImageUrl: string | null = null
          if ((strapiPageData as any).heroImage) {
            const strapiImageUrl = getStrapiMediaURL((strapiPageData as any).heroImage)
            if (strapiImageUrl) {
              heroImageUrl = strapiImageUrl
              console.log('✅ Image Partenaires chargée depuis Strapi:', heroImageUrl)
            }
          }
          
          setPageData({
            heroTitle: (strapiPageData as any).heroTitle || 'Nos Partenaires',
            heroSubtitle: (strapiPageData as any).heroSubtitle || (strapiPageData as any).heroDescription || pageData.heroSubtitle,
            heroImage: heroImageUrl,
            sectionTitle: (strapiPageData as any).sectionTitle || pageData.sectionTitle,
            sectionDescription: (strapiPageData as any).sectionDescription || pageData.sectionDescription,
            ctaTitle: (strapiPageData as any).ctaTitle || pageData.ctaTitle,
            ctaDescription: (strapiPageData as any).ctaDescription || pageData.ctaDescription,
            ctaButtonText: (strapiPageData as any).ctaButtonText || pageData.ctaButtonText,
            ctaButtonLink: (strapiPageData as any).ctaButtonLink || pageData.ctaButtonLink
          })
        }

        // Charger les partenaires depuis Strapi
        const strapiPartners = await getPartners()
        if (strapiPartners && strapiPartners.length > 0) {
          const formattedPartners = strapiPartners.map((p: any) => ({
            id: p.id,
            name: p.nom || p.name,
            logo: getImageURL(p.logoData || p.logo, '/images/placeholder-partner.png'),
            website: p.siteWeb || p.website || '#'
          }))
          setPartners(formattedPartners)
        }
      } catch (error) {
        console.error('Erreur chargement partenaires:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])
  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-16 w-96 mx-auto rounded mb-4"></div>
          <div className="bg-gray-200 h-6 w-2/3 mx-auto rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-blue to-blue-800 text-white overflow-hidden">
        {/* Image de fond dynamique depuis Strapi */}
        {pageData.heroImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${pageData.heroImage}')` }}
          />
        )}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-white/30 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-white/20 rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-montserrat font-black mb-6">
              {pageData.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-12">
              {pageData.heroSubtitle}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {defaultStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <stat.icon className="w-8 h-8 text-primary-yellow mx-auto mb-3" />
                  <div className="text-3xl font-black text-primary-yellow mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logos des Partenaires */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-montserrat font-bold text-primary-blue mb-6">
              {pageData.sectionTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {pageData.sectionDescription}
            </p>
          </motion.div>

          {/* Grille de logos avec animations élégantes */}
          <motion.div 
            className="partners-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1
                }
              }
            }}
          >
            {partners.map((partner, index) => (
              <motion.a
                key={index}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 40,
                    scale: 0.8,
                    rotateY: -15
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    rotateY: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                      duration: 0.6
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0 20px 40px rgba(13, 75, 211, 0.15)",
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[180px] cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                {/* Effet de brillance au survol */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, transparent 40%, rgba(13, 75, 211, 0.03) 50%, transparent 60%)",
                  }}
                />
                
                {/* Bordure animée */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-blue/20"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />

                <motion.div 
                  className="relative w-full h-20 flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = `<div class="w-16 h-16 bg-gradient-to-br from-primary-blue to-blue-600 rounded-xl flex items-center justify-center"><span class="text-white font-bold text-xl">${partner.name.charAt(0)}</span></div>`
                    }}
                  />
                </motion.div>
                
                <motion.span 
                  className="text-sm text-gray-600 group-hover:text-primary-blue font-medium text-center transition-colors duration-300"
                >
                  {partner.name}
                </motion.span>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <ExternalLink className="w-4 h-4 text-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                {/* Particules décoratives au survol */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-primary-yellow rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-blue rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ delay: 0.15 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Devenir Partenaire */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-6">
              {pageData.ctaTitle}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {pageData.ctaDescription}
            </p>
            <Link
              href={pageData.ctaButtonLink}
              className="inline-flex items-center space-x-2 bg-primary-blue text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              <span>{pageData.ctaButtonText}</span>
              <ExternalLink className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-montserrat font-bold mb-6">
              Rejoignez notre réseau
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Intégrez une formation qui vous connecte directement aux leaders du BTP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/formations"
                className="bg-primary-yellow text-primary-blue px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Découvrir nos formations
              </Link>
              <Link
                href="/admission"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-blue transition-all"
              >
                Candidater
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
