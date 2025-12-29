'use client'

import { motion } from 'framer-motion'
import { Award, Heart, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getValeursEcole } from '@/lib/strapi'

interface ValeurEcole {
  id: number
  titre: string
  points: string[]
  icone: string
  ordre: number
}

const ValuesSection = () => {
  const [values, setValues] = useState<ValeurEcole[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadValues() {
      try {
        const data = await getValeursEcole()
        setValues(data as ValeurEcole[])
      } catch (error) {
        console.error('Erreur lors du chargement des valeurs:', error)
        // Fallback data en cas d'erreur
        setValues([
          {
            id: 1,
            titre: "Professionnalisme",
            icone: "Award",
            points: [
              "Des formateurs issus du terrain, experts dans leur domaine",
              "Un accompagnement rigoureux tout au long du parcours",
              "Une exigence de qualité dans chaque formation",
              "Une préparation concrète aux réalités du métier"
            ],
            ordre: 1
          },
          {
            id: 2,
            titre: "Proximité",
            icone: "Heart",
            points: [
              "Une écoute attentive des besoins de chaque apprenant",
              "Une relation humaine, bienveillante et accessible",
              "Un lien fort avec les entreprises partenaires du secteur"
            ],
            ordre: 2
          },
          {
            id: 3,
            titre: "Pédagogie",
            icone: "BookOpen",
            points: [
              "Une approche pratique, centrée sur l'apprentissage par l'action",
              "Des outils et supports adaptés au secteur du BTP",
              "Un suivi personnalisé pour s'adapter au rythme de chaque apprenant",
              "L'objectif : faire monter en compétence de manière durable"
            ],
            ordre: 3
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    loadValues()
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return Award
      case 'Heart':
        return Heart
      case 'BookOpen':
        return BookOpen
      default:
        return Award
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-primary-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-white/20 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-primary-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
            Nos valeurs chez Construction Management Academy
          </h2>
          <p className="text-xl opacity-90 max-w-4xl mx-auto">
            Chez Construction Management Academy, nous croyons que la réussite passe par plus que des compétences techniques. 
            C'est pourquoi nous plaçons l'humain, l'engagement et l'excellence au cœur de notre pédagogie.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = getIcon(value.icone)
            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <span className="text-6xl font-montserrat font-bold text-primary-yellow mr-4">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="w-12 h-12 bg-primary-yellow rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary-blue" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-montserrat font-bold mb-6">
                  {value.titre}
                </h3>
                
                <ul className="space-y-3">
                  {value.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-primary-yellow rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="opacity-90 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-xl opacity-90 mb-8">
            Nous formons des professionnels responsables, passionnés et prêts à relever les défis du secteur du BTP avec rigueur et ambition.
          </p>
          <button className="bg-gradient-primary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Commencer votre nouvelle carrière
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default ValuesSection