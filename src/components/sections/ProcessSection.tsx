'use client'

import { motion } from 'framer-motion'
import { FileText, Users, Briefcase, Trophy, MessageCircle, Search, UserCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getProcessusAdmission } from '@/lib/strapi'

interface ProcessusEtape {
  id: number
  etape: number
  titre: string
  description: string
  detail?: string
  icone: string
}

const ProcessSection = () => {
  const [steps, setSteps] = useState<ProcessusEtape[]>([
    {
      id: 1,
      etape: 1,
      titre: "Soumission du dossier",
      description: "Complétez notre formulaire en ligne avec votre parcours et projet professionnel.",
      detail: "Notre équipe vous recontactera sous 24 heures pour fixer un rendez-vous.",
      icone: "FileText"
    },
    {
      id: 2,
      etape: 2,
      titre: "Entretien d'admission",
      description: "Échange privilégié en présentiel ou à distance selon votre préférence.",
      detail: "Décision communiquée sous 48 heures après l'entretien.",
      icone: "MessageCircle"
    },
    {
      id: 3,
      etape: 3,
      titre: "Recherche d'alternance",
      description: "Réception des documents pour démarrer votre recherche d'entreprise.",
      detail: "Inscription définitive dès la signature de la convention de formation.",
      icone: "Search"
    },
    {
      id: 4,
      etape: 4,
      titre: "Accompagnement dédié",
      description: "Accompagnement personnalisé et atelier CV/lettre de motivation.",
      detail: "Maximisation de vos chances auprès des recruteurs.",
      icone: "UserCheck"
    }
  ])
  const [loading, setLoading] = useState(false) // Pas de loading, affichage immédiat

  useEffect(() => {
    async function loadProcessus() {
      try {
        const data = await getProcessusAdmission()
        if (data && Array.isArray(data) && data.length > 0) {
          setSteps(data as ProcessusEtape[])
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      }
    }
    loadProcessus()
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return FileText
      case 'MessageCircle':
        return MessageCircle
      case 'Search':
        return Search
      case 'UserCheck':
        return UserCheck
      case 'Users':
        return Users
      case 'Briefcase':
        return Briefcase
      case 'Trophy':
        return Trophy
      default:
        return FileText
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary-blue mb-4">
            VOTRE PARCOURS EN 4 ÉTAPES
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un processus simple et efficace pour transformer votre avenir professionnel
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-primary-yellow to-green-500 rounded-full transform -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = getIcon(step.icone)
              return (
                <motion.div
                  key={step.id}
                  className="text-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-primary-blue/20 group-hover:border-primary-yellow transition-colors">
                      <IconComponent className="w-8 h-8 text-primary-blue group-hover:text-primary-yellow transition-colors" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-yellow rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.etape}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{step.titre}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  {step.detail && (
                    <p className="text-sm text-gray-500 italic">{step.detail}</p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Prêt à commencer votre transformation ?
            </h3>
            <p className="text-gray-600 mb-6">
              Rejoignez les 500+ étudiants qui ont déjà transformé leur carrière
            </p>
            <motion.button
              className="bg-gradient-to-r from-primary-blue to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              COMMENCER MAINTENANT
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection
