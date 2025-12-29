'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, RefreshCw, Award } from 'lucide-react'
import Link from 'next/link'
import { getModalites } from '@/lib/strapi'

interface Modalite {
  id: number
  titre: string
  description: string
  slug: string
  icon: string
  couleur: string
  lien: string
  ordre: number
  featured: boolean
}

const ModalitesSection = () => {
  const [modalites, setModalites] = useState<Modalite[]>([
    {
      id: 1,
      titre: "Alternance",
      description: "Formation en alternance du Niveau 5 (équivalent Niveau 5 (équivalent Bac+2)) au Niveau 7 (équivalent Niveau 7 (équivalent Bac+5)). Rémunération garantie et insertion professionnelle.",
      slug: "alternance",
      icon: "GraduationCap",
      couleur: "from-blue-500 to-blue-600",
      lien: "/formations#alternance",
      ordre: 1,
      featured: true
    },
    {
      id: 2,
      titre: "Reconversion",
      description: "Formations courtes pour professionnels en reconversion. Financement possible par CPF.",
      slug: "reconversion",
      icon: "RefreshCw",
      couleur: "from-green-500 to-green-600",
      lien: "/formations#reconversion",
      ordre: 2,
      featured: true
    },
    {
      id: 3,
      titre: "VAE",
      description: "Validation des Acquis de l'Expérience. Obtenez un diplôme grâce à votre expérience.",
      slug: "vae",
      icon: "Award",
      couleur: "from-orange-500 to-orange-600",
      lien: "/formations#vae",
      ordre: 3,
      featured: true
    }
  ])
  const [loading, setLoading] = useState(false) // Pas de loading, affichage immédiat

  useEffect(() => {
    async function loadModalites() {
      try {
        const data = await getModalites()
        if (data && Array.isArray(data) && data.length > 0) {
          setModalites(data as Modalite[])
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      }
    }

    loadModalites()
  }, [])

  // Fonction pour obtenir l'icône correspondante
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-8 h-8" />
      case 'RefreshCw':
        return <RefreshCw className="w-8 h-8" />
      case 'Award':
        return <Award className="w-8 h-8" />
      default:
        return <GraduationCap className="w-8 h-8" />
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse bg-gray-200 h-12 w-96 mx-auto rounded mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-2/3 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-8 shadow-lg">
                <div className="bg-gray-200 w-16 h-16 rounded-2xl mb-6"></div>
                <div className="bg-gray-200 h-8 w-32 rounded mb-4"></div>
                <div className="bg-gray-200 h-20 w-full rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Choisissez votre <span className="text-primary-blue">modalité de formation</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Trois voies d'accès adaptées à votre profil et vos objectifs professionnels
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {modalites.filter(m => m.featured).map((modalite, index) => (
            <motion.div
              key={modalite.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={modalite.lien}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${modalite.couleur} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {getIcon(modalite.icon)}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-blue transition-colors">
                    {modalite.titre}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {modalite.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-primary-blue font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>En savoir plus</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ModalitesSection