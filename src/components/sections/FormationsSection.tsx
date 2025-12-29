'use client'

import { motion } from 'framer-motion'
import FormationsGallery from '@/components/sections/FormationsGallery'

const FormationsSection = () => {
  return (
    <section className="relative py-20 overflow-hidden pt-32">
      {/* Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-montserrat font-bold mb-6 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary-blue">Nos Formations</span>
            <span className="block text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary-yellow to-orange-500 mt-2">
              BTP d'Excellence
            </span>
          </motion.h2>
          
          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20" />
            <p className="relative text-xl text-gray-700 p-6 leading-relaxed">
              Des parcours conçus pour vous spécialiser dans les <span className="font-semibold text-primary-blue">métiers clés du BTP</span> et accélérer votre carrière dans un secteur en pleine évolution technologique.
            </p>
          </motion.div>
        </motion.div>

        {/* Galerie des formations par catégorie - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <FormationsGallery />
        </div>

        {/* Stats dynamiques - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 mt-12 md:mt-16">
          {[
            { valeur: "8", suffixe: "", titre: "formations certifiantes" },
            { valeur: "100", suffixe: "%", titre: "formations axées terrain" },
            { valeur: "15", suffixe: "+", titre: "années d'expérience" },
            { valeur: "45", suffixe: "+", titre: "entreprises partenaires" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-montserrat font-bold text-primary-blue mb-2">
                {stat.valeur}{stat.suffixe}
              </div>
              <div className="text-gray-600 font-medium">{stat.titre}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center relative"
        >
          <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <motion.h3 
              className="text-2xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Prêt à transformer votre avenir ?
            </motion.h3>
            
            <a
              href="/formations"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-blue to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Découvrir toutes nos formations
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FormationsSection