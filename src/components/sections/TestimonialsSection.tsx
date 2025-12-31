'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getTestimonials } from '@/lib/strapi'

interface Testimonial {
  id: number
  name: string
  position: string
  company?: string
  content: string
  rating: number
}

const TestimonialsSection = () => {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getTestimonials()
        setTestimonials(data as Testimonial[])
      } catch (error) {
        console.error('Error loading testimonials:', error)
      } finally {
        setLoading(false)
      }
    }
    loadTestimonials()
  }, [])

  const handleCandidater = () => {
    window.open('https://construction-management-academy.ymag.cloud/index.php/preinscription/', '_blank')
  }

  // Fallback testimonials si Strapi ne répond pas
  const fallbackTestimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      position: "Conductrice de Travaux",
      company: "Bouygues Construction",
      content: "La formation Construction Management Academy m'a donné toutes les clés pour réussir dans le BTP. L'approche pratique et les technologies modernes comme le BIM m'ont permis d'être opérationnelle dès mon premier poste.",
      rating: 5
    },
    {
      id: 2,
      name: "Thomas Martin",
      position: "Chef de Projet BIM",
      company: "Vinci Construction",
      content: "Grâce à Construction Management Academy, j'ai pu me spécialiser dans le digital et le BIM. Les formateurs sont des professionnels du secteur qui transmettent leur passion et leur expertise.",
      rating: 5
    },
    {
      id: 3,
      name: "Sarah Johnson",
      position: "Responsable Développement Durable",
      company: "Eiffage",
      content: "La formation en construction durable de Construction Management Academy est unique. Elle m'a permis de devenir experte en bâtiments écologiques et de contribuer à un BTP plus responsable.",
      rating: 5
    }
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-primary-blue mb-6">
            Ils Témoignent
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Découvrez les parcours inspirants de nos anciens étudiants qui excellent aujourd'hui dans leurs carrières BTP.
          </p>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des témoignages...</p>
          </div>
        ) : (
          /* Testimonials Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary-yellow/20 group-hover:text-primary-yellow/40 transition-colors duration-300">
                  <Quote className="w-12 h-12" />
                </div>

                {/* Profile */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-blue to-primary-yellow mr-4 flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-blue text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                    {testimonial.company && (
                      <p className="text-primary-yellow text-sm font-semibold">{testimonial.company}</p>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary-yellow fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-blue to-primary-blue/80 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Rejoignez-les !</h3>
            <p className="text-lg mb-6 text-gray-200">
              Commencez votre parcours vers une carrière réussie dans le BTP
            </p>
            <button 
              onClick={handleCandidater}
              className="bg-primary-yellow text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105"
            >
              Candidater maintenant
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
