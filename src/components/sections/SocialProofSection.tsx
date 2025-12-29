'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { getTestimonials, getPartners } from '@/lib/strapi'

interface Testimonial {
  id: number
  nom: string
  poste: string
  entreprise: string
  commentaire: string
  note: number
  photo?: string
  photoData?: any
  featured: boolean
}

interface Partner {
  id: number
  nom: string
  logo?: string
  logoData?: any
  description?: string
  siteWeb?: string
  featured: boolean
}

const SocialProofSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      nom: "Thomas Martin",
      poste: "Conducteur de travaux",
      entreprise: "Bouygues Construction",
      commentaire: "Construction Management Academy m'a donné toutes les clés pour réussir. Formation terrain exceptionnelle !",
      note: 5,
      photo: "/images/testimonials/thomas-martin.svg",
      featured: true
    },
    {
      id: 2,
      nom: "Sarah Johnson",
      poste: "Chef de projet BIM",
      entreprise: "Vinci Construction",
      commentaire: "18 mois qui ont transformé ma carrière. Emploi trouvé avant même la fin !",
      note: 5,
      photo: "/images/testimonials/sarah-johnson.svg",
      featured: true
    },
    {
      id: 3,
      nom: "Marie Dubois",
      poste: "Responsable QSE",
      entreprise: "Eiffage",
      commentaire: "Pédagogie innovante et formateurs experts. Je recommande à 100% !",
      note: 5,
      photo: "/images/testimonials/marie-dubois.svg",
      featured: true
    }
  ])
  const [partners, setPartners] = useState<Partner[]>([
    { id: 1, nom: "Eiffage", logo: "eiffage.webp", featured: true },
    { id: 2, nom: "NGE", logo: "nge.webp", featured: true },
    { id: 3, nom: "Leon Grosse", logo: "LEON GROSSE.webp", featured: true },
    { id: 4, nom: "GS Construction", logo: "GS Construction.webp", featured: true },
    { id: 5, nom: "Coredif", logo: "COREDIF.webp", featured: true },
    { id: 6, nom: "GCC", logo: "gcc.webp", featured: true }
  ])
  const [loading, setLoading] = useState(false) // Pas de loading, affichage immédiat

  useEffect(() => {
    async function loadSocialProofData() {
      try {
        const [testimonialsData, partnersData] = await Promise.all([
          getTestimonials(),
          getPartners()
        ])
        
        if (testimonialsData && Array.isArray(testimonialsData) && testimonialsData.length > 0) {
          setTestimonials(testimonialsData as Testimonial[])
        }
        if (partnersData && Array.isArray(partnersData) && partnersData.length > 0) {
          setPartners(partnersData as Partner[])
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      }
    }

    loadSocialProofData()
  }, [])

  // Calculer la note moyenne
  const averageRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.note, 0) / testimonials.length).toFixed(1)
    : "4.9"

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse bg-gray-50 p-6 rounded-2xl">
                <div className="bg-gray-200 w-8 h-8 rounded mb-4"></div>
                <div className="bg-gray-200 h-20 w-full rounded mb-6"></div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 w-12 h-12 rounded-full"></div>
                  <div className="flex-1">
                    <div className="bg-gray-200 h-4 w-32 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 w-24 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        


        {/* Testimonials dynamiques */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.filter(t => t.featured).slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Quote className="w-8 h-8 text-primary-yellow mb-4" />
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.commentaire || 'Commentaire non disponible'}"
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {testimonial.photo && typeof testimonial.photo === 'string' && testimonial.photo.endsWith('.svg') ? (
                    <img
                      src={testimonial.photo}
                      alt={testimonial.nom}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        console.error(`Failed to load testimonial photo: ${testimonial.photo}`)
                        e.currentTarget.style.display = 'none'
                        const fallbackInitial = testimonial.nom && typeof testimonial.nom === 'string' ? testimonial.nom.charAt(0) : '?'
                        e.currentTarget.parentElement!.innerHTML = `<div class="w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center text-white font-bold">${fallbackInitial}</div>`
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center text-white font-bold">
                      {testimonial.nom && typeof testimonial.nom === 'string' ? testimonial.nom.charAt(0) : '?'}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.nom || 'Anonyme'}</h4>
                  <p className="text-sm text-gray-600">{testimonial.poste || 'Poste non spécifié'}</p>
                  <p className="text-xs text-primary-blue font-medium">{testimonial.entreprise || 'Entreprise'}</p>
                </div>
              </div>
              
              <div className="flex mt-4">
                {[...Array(testimonial.note || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Logos dynamiques */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-8 text-lg">
            Nos diplômés travaillent dans les plus grandes entreprises du BTP
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {partners.slice(0, 6).map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24 group"
              >
                <img 
                  src={partner.logo ? `/images/partners/${partner.logo}` : `/images/partners/default.webp`}
                  alt={partner.nom || 'Partenaire'} 
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    console.error(`Failed to load partner logo: ${partner.logo}`)
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.innerHTML = `<div class="text-xs font-bold text-gray-600 text-center">${partner.nom || 'Partenaire'}</div>`
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SocialProofSection