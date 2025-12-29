'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, Shield, Users, BookOpen } from 'lucide-react'
import { getValeursEcole } from '@/lib/strapi'

interface ValeurEcole {
  id: number
  titre: string
  description: string
  icon?: string
  ordre: number
  type?: string
}

const InstitutionalSection = () => {
  const [certifications, setCertifications] = useState<ValeurEcole[]>([
    {
      id: 1,
      titre: "Certifié Qualiopi",
      description: "Certification qualité des organismes de formation",
      icon: "Award",
      ordre: 1,
      type: "certification"
    },
    {
      id: 2,
      titre: "Titres RNCP",
      description: "Formations reconnues par l'État niveau 5, 6 et 7",
      icon: "Shield",
      ordre: 2,
      type: "certification"
    },
    {
      id: 3,
      titre: "Partenaire OPCO",
      description: "Prise en charge des formations en alternance",
      icon: "Users",
      ordre: 3,
      type: "certification"
    },
    {
      id: 4,
      titre: "Membre FFB",
      description: "Fédération Française du Bâtiment",
      icon: "BookOpen",
      ordre: 4,
      type: "certification"
    }
  ])
  const [loading, setLoading] = useState(false) // Pas de loading, affichage immédiat

  useEffect(() => {
    async function loadCertifications() {
      try {
        const data = await getValeursEcole()
        if (data && Array.isArray(data) && data.length > 0) {
          const certificationData = (data as ValeurEcole[]).filter(valeur => 
            valeur.type === 'certification' || valeur.type === 'institutional'
          )
          if (certificationData.length > 0) {
            setCertifications(certificationData)
          }
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      }
    }

    loadCertifications()
  }, [])

  // Fonction pour obtenir l'icône correspondante
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-8 h-8" />
      case 'Shield':
        return <Shield className="w-8 h-8" />
      case 'Users':
        return <Users className="w-8 h-8" />
      case 'BookOpen':
        return <BookOpen className="w-8 h-8" />
      default:
        return <Award className="w-8 h-8" />
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse bg-gray-200 h-12 w-96 mx-auto rounded mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-2/3 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-gray-200 w-16 h-16 rounded-xl mb-4"></div>
                <div className="bg-gray-200 h-6 w-32 rounded mb-2"></div>
                <div className="bg-gray-200 h-16 w-full rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.slice(0, 4).map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
                {getIcon(cert.icon)}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.titre}</h3>
              <p className="text-sm text-gray-600">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InstitutionalSection
