'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Building2, Users, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getPartners, getImageURL, getPageHome } from '@/lib/strapi'

interface Partner {
  id: number
  name: string
  website?: string
  logo?: string
  logoData?: any
  imageData?: any
  featured?: boolean
}

interface PageHomeData {
  partnersSectionBadge: string
  partnersSectionTitle: string
  partnersSectionSubtitle: string
  partnersStatEntreprises: string
  partnersStatAlternants: string
  partnersStatAlternantsCount: string
  partnersStatInsertion: string
  partnersStatInsertionRate: string
  partnersSectionCtaTitle: string
  partnersSectionCtaSubtitle: string
  partnersSectionCtaText: string
  partnersSectionCtaUrl: string
}

// Partenaires statiques avec leurs logos
const defaultPartners = [
  { id: 1, name: 'Léon Grosse', logo: '/images/partners/LEON GROSSE.webp', website: 'https://www.leongrosse.fr/', featured: true },
  { id: 2, name: 'Eiffage', logo: '/images/partners/eiffage.webp', website: 'https://www.eiffage.com/', featured: true },
  { id: 3, name: 'NGE', logo: '/images/partners/nge.webp', website: 'https://www.nge.fr/', featured: true },
  { id: 4, name: 'GCC Construction', logo: '/images/partners/gcc.webp', website: 'https://www.gcc.fr/', featured: true },
  { id: 5, name: 'Coredif', logo: '/images/partners/COREDIF.webp', website: 'https://www.coredif.fr/', featured: true },
  { id: 6, name: 'Afpa', logo: '/images/partners/Afpa.webp', website: 'https://www.afpa.fr/', featured: true },
  { id: 7, name: 'DCT Solutions', logo: '/images/partners/DCT Solutions de Démolition.webp', website: 'https://www.dct-demolition.fr/', featured: false },
  { id: 8, name: 'Biens Sur Élévations', logo: '/images/partners/Bien sur élévations.webp', website: 'https://www.biens-sur.fr/', featured: false },
  { id: 9, name: 'LT Construction', logo: '/images/partners/LT CONSTRUCTION.webp', website: 'https://www.lt-construction.fr/', featured: false },
  { id: 10, name: 'O2P BAT', logo: '/images/partners/O2P BAT.webp', website: 'https://www.o2pbat.fr/', featured: false },
  { id: 11, name: 'Green Bât', logo: '/images/partners/Green Bat.webp', website: 'https://www.greenbat.fr/', featured: false },
  { id: 12, name: 'GS Construction', logo: '/images/partners/GS Construction.webp', website: 'https://www.gs-construction.fr/', featured: false },
]

const FeaturedPartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>(defaultPartners)
  const [pageData, setPageData] = useState<PageHomeData>({
    partnersSectionBadge: "Nos Partenaires de Confiance",
    partnersSectionTitle: "Ils nous font confiance",
    partnersSectionSubtitle: "Des entreprises leaders du BTP qui accueillent nos alternants et participent activement à leur formation professionnelle",
    partnersStatEntreprises: "Entreprises partenaires",
    partnersStatAlternants: "Alternants placés",
    partnersStatAlternantsCount: "150+",
    partnersStatInsertion: "Taux d'insertion",
    partnersStatInsertionRate: "98%",
    partnersSectionCtaTitle: "Découvrez tous nos partenaires",
    partnersSectionCtaSubtitle: "Explorez notre réseau complet d'entreprises partenaires et découvrez les opportunités d'alternance et d'emploi qui vous attendent",
    partnersSectionCtaText: "Voir tous nos partenaires",
    partnersSectionCtaUrl: "/partenaires"
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        
        // Charger les données de la page home
        const homeData = await getPageHome()
        if (homeData) {
          setPageData({
            partnersSectionBadge: homeData.partnersSectionBadge || pageData.partnersSectionBadge,
            partnersSectionTitle: homeData.partnersSectionTitle || pageData.partnersSectionTitle,
            partnersSectionSubtitle: homeData.partnersSectionSubtitle || pageData.partnersSectionSubtitle,
            partnersStatEntreprises: homeData.partnersStatEntreprises || pageData.partnersStatEntreprises,
            partnersStatAlternants: homeData.partnersStatAlternants || pageData.partnersStatAlternants,
            partnersStatAlternantsCount: homeData.partnersStatAlternantsCount || pageData.partnersStatAlternantsCount,
            partnersStatInsertion: homeData.partnersStatInsertion || pageData.partnersStatInsertion,
            partnersStatInsertionRate: homeData.partnersStatInsertionRate || pageData.partnersStatInsertionRate,
            partnersSectionCtaTitle: homeData.partnersSectionCtaTitle || pageData.partnersSectionCtaTitle,
            partnersSectionCtaSubtitle: homeData.partnersSectionCtaSubtitle || pageData.partnersSectionCtaSubtitle,
            partnersSectionCtaText: homeData.partnersSectionCtaText || pageData.partnersSectionCtaText,
            partnersSectionCtaUrl: homeData.partnersSectionCtaUrl || pageData.partnersSectionCtaUrl
          })
        }
        
        // Charger les partenaires
        const partnersData = await getPartners()
        if (partnersData && Array.isArray(partnersData) && partnersData.length > 0) {
          const formattedPartners = partnersData.map((p: any) => ({
            id: p.id,
            name: p.name || p.nom || 'Partenaire',
            website: p.website || p.siteWeb || '#',
            logo: getImageURL(p.logoData || p.imageData || p.logo, '/images/partners/default.webp'),
            featured: p.featured || false
          }))
          setPartners(formattedPartners)
        }
      } catch (error) {
        console.error('Erreur chargement données:', error)
        // Garder les données statiques en cas d'erreur
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Sélectionner les 6 premiers partenaires pour l'affichage
  const featuredPartners = partners.filter(p => p.featured !== false).slice(0, 6)
  const totalPartners = partners.length

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-primary-yellow/10 text-primary-yellow px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Building2 className="w-4 h-4" />
            <span>{pageData.partnersSectionBadge}</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-montserrat font-black text-slate-900 mb-6">
            {pageData.partnersSectionTitle.split(' ').map((word, index, array) => {
              if (index === array.length - 1) {
                return (
                  <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-primary-yellow via-orange-500 to-primary-yellow">
                    {word}
                  </span>
                )
              }
              return word + ' '
            })}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {pageData.partnersSectionSubtitle}
          </p>
        </motion.div>

        {/* Stats rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 mb-16"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-primary-yellow mb-2">
              {totalPartners}+
            </div>
            <div className="text-sm text-gray-600 font-medium">{pageData.partnersStatEntreprises}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
              {pageData.partnersStatAlternantsCount}
            </div>
            <div className="text-sm text-gray-600 font-medium">{pageData.partnersStatAlternants}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-green-600 mb-2">
              {pageData.partnersStatInsertionRate}
            </div>
            <div className="text-sm text-gray-600 font-medium">{pageData.partnersStatInsertion}</div>
          </div>
        </motion.div>

        {/* Grille des logos partenaires */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
        >
          {featuredPartners.map((partner, index) => (
            <motion.a
              key={partner.id || index}
              href={partner.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[160px] cursor-pointer hover:border-primary-yellow/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Logo */}
              <motion.div 
                className="relative w-full h-16 flex items-center justify-center mb-4"
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
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `<div class="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-600 rounded-xl flex items-center justify-center"><span class="text-white font-bold text-xl">${partner.name.charAt(0)}</span></div>`
                    }
                  }}
                />
              </motion.div>
              
              {/* Nom du partenaire */}
              <span className="text-sm text-gray-600 group-hover:text-slate-900 font-medium text-center transition-colors duration-300">
                {partner.name}
              </span>
              
              {/* Icône externe */}
              <ExternalLink className="w-4 h-4 text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Indicateurs décoratifs */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA vers la page partenaires */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-montserrat font-bold mb-4">
              {pageData.partnersSectionCtaTitle}
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {pageData.partnersSectionCtaSubtitle}
            </p>
            <Link
              href={pageData.partnersSectionCtaUrl}
              className="inline-flex items-center space-x-2 bg-primary-yellow text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>{pageData.partnersSectionCtaText}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedPartnersSection
