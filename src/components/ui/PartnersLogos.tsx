'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getPartners } from '@/lib/strapi'

interface Partner {
  id: number
  name: string
  sector: string
  description?: string
  website?: string
  featured: boolean
  logo?: string
  logoData?: any
}

const PartnersLogos = () => {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPartners() {
      try {
        const data = await getPartners()
        setPartners(data as Partner[])
      } catch (error) {
        console.error('Erreur lors du chargement des partenaires:', error)
        // Fallback data en cas d'erreur
        setPartners([
          { id: 1, name: 'Bouygues Construction', sector: 'Construction', featured: true },
          { id: 2, name: 'Vinci Construction', sector: 'Construction', featured: true },
          { id: 3, name: 'Eiffage Construction', sector: 'Construction', featured: true },
          { id: 4, name: 'Spie Batignolles', sector: 'Construction', featured: false }
        ])
      } finally {
        setLoading(false)
      }
    }
    loadPartners()
  }, [])

  // Logos statiques fallback
  const logoMapping: { [key: string]: string } = {
    'Bouygues Construction': 'bouygues.svg',
    'Vinci Construction': 'vinci.svg',
    'Eiffage Construction': 'eiffage.webp',
    'Spie Batignolles': 'spie.svg',
    'NGE': 'nge.webp',
    'Leon Grosse': 'leon-grosse.webp',
    'GS Construction': 'GS Construction.webp',
    'Coredif': 'COREDIF.webp'
  }

  if (loading) {
    return (
      <motion.div 
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className="text-center text-gray-300 mb-8 text-lg">
          Nos partenaires de confiance
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 animate-pulse"
            >
              <div className="h-12 w-24 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="mt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <p className="text-center text-gray-300 mb-8 text-lg">
        Nos partenaires de confiance
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 hover:opacity-100 transition-opacity">
        {partners.slice(0, 5).map((partner, index) => {
          const fallbackLogo = logoMapping[partner.name] ? `/images/partners/${logoMapping[partner.name]}` : null
          
          return (
            <motion.div
              key={partner.id}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              title={partner.description || partner.name}
            >
              {fallbackLogo ? (
                <img 
                  src={fallbackLogo} 
                  alt={partner.name} 
                  className="h-12 w-auto object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    console.error(`Failed to load partner logo: ${fallbackLogo}`)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div className="h-12 w-24 flex items-center justify-center bg-white/20 rounded text-white text-xs font-bold">
                  {partner.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
      
      {partners.length > 5 && (
        <motion.p 
          className="text-center text-gray-400 mt-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          Et {partners.length - 5} autres partenaires...
        </motion.p>
      )}
    </motion.div>
  )
}

export default PartnersLogos