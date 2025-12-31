'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getPartners } from '@/lib/strapi'

interface Partner {
  id: number
  name: string
  sector: string
  description?: string
  website?: string
}

const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPartners() {
      try {
        const data = await getPartners()
        setPartners(data as Partner[])
      } catch (error) {
        console.error('Error loading partners:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPartners()
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-primary-blue mb-6">
            Des partenaires engagés à nos côtés
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous collaborons avec les leaders du BTP pour vous offrir des formations en phase avec les réalités du terrain et vous garantir les meilleures opportunités d'emploi.
          </p>
        </motion.div>

        {/* Partners from Strapi */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des partenaires...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-blue">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{partner.name}</h3>
                <p className="text-sm text-primary-blue font-medium mb-2">{partner.sector}</p>
                {partner.description && (
                  <p className="text-xs text-gray-600">{partner.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Static Partners Grid (logos) */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 mb-16">
          {[
            'Afpa.webp', 'Bien sur élévations.webp', 'COREDIF.webp', 'DCT Solutions de Démolition.webp',
            'eiffage.webp', 'gcc.webp', 'Green Bat.webp', 'GS Construction.webp',
            'LEON GROSSE.webp', 'LT CONSTRUCTION.webp', 'nge.webp', 'O2P BAT.webp'
          ].slice(0, 12).map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24 group"
            >
              <img 
                src={`/images/partners/${logo}`} 
                alt={logo.replace('.webp', '')} 
                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  console.error(`Failed to load partner logo: ${logo}`)
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.innerHTML = `<div class="text-xs font-bold text-gray-600 text-center">${logo.replace('.webp', '')}</div>`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center bg-gradient-to-r from-primary-blue to-blue-800 text-white py-12 px-8 rounded-2xl"
        >
          <h3 className="text-3xl font-montserrat font-bold mb-4">
            98% de nos diplômés en poste en moins de 4 mois
          </h3>
          <p className="text-xl opacity-90">
            Un taux d'insertion exceptionnel grâce à notre réseau de partenaires et notre pédagogie terrain
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default PartnersSection
