'use client'

import { motion } from 'framer-motion'
import { Users, Award, TrendingUp, Building } from 'lucide-react'
import { useEffect, useState } from 'react'
import AnimatedStat from '@/components/ui/AnimatedStats'
import ModernBackground from '@/components/ui/ModernBackground'
import { getStatistiquesSite } from '@/lib/strapi'

interface Statistique {
  id: number
  cle: string
  nombre: number
  label: string
  suffixe: string
  ordre: number
}

const StatsSection = () => {
  const [stats, setStats] = useState<Statistique[]>([
    { id: 1, cle: 'experience', nombre: 15, label: 'Années d\'expertise BTP', suffixe: '+', ordre: 1 },
    { id: 2, cle: 'formations', nombre: 8, label: 'Formations certifiées RNCP', suffixe: '', ordre: 2 },
    { id: 3, cle: 'partners', nombre: 45, label: 'Entreprises partenaires actives', suffixe: '+', ordre: 3 }
  ])
  const [loading, setLoading] = useState(false) // Pas de loading, affichage immédiat

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getStatistiquesSite()
        if (data && Array.isArray(data) && data.length > 0) {
          setStats(data as Statistique[])
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      }
    }
    loadStats()
  }, [])

  const getStatIcon = (cle: string) => {
    switch (cle) {
      case 'experience':
        return <Award className="w-6 h-6 text-white" />
      case 'formations':
        return <TrendingUp className="w-6 h-6 text-white" />
      case 'partners':
        return <Building className="w-6 h-6 text-white" />
      case 'insertion':
        return <Users className="w-6 h-6 text-white" />
      default:
        return <Award className="w-6 h-6 text-white" />
    }
  }

  const getStatColor = (index: number) => {
    const colors = ['primary-blue', 'primary-yellow', 'green-500', 'purple-500']
    return colors[index % colors.length]
  }

  if (loading) {
    return (
      <section className="relative py-20 overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
    <section className="relative py-20 overflow-hidden pt-32">
      {/* Background moderne */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50" />
      <ModernBackground variant="sustainable" className="opacity-20" />
      
      {/* Formes géométriques décoratives */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 border-2 border-primary-blue/20 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-24 h-24 bg-primary-yellow/20 rounded-lg"
        animate={{ rotate: -360, y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Décoration de titre */}
          <motion.div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-20 h-1 bg-gradient-to-r from-primary-blue to-primary-yellow rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <motion.h2 
            className="text-4xl md:text-6xl font-montserrat font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary-blue">Nos chiffres</span>
            <span className="block text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary-yellow to-orange-500 mt-2">
              d'Excellence
            </span>
          </motion.h2>
          
          <motion.div
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 glass-card rounded-2xl" />
            <p className="relative text-lg text-gray-700 p-6 leading-relaxed">
              Des résultats qui témoignent de notre <span className="font-semibold text-primary-blue">excellence</span> et de notre engagement 
              envers la <span className="font-semibold text-primary-yellow">réussite de nos étudiants</span>
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.id}
              number={stat.nombre.toString()}
              label={stat.label}
              suffix={stat.suffixe}
              icon={getStatIcon(stat.cle)}
              color={getStatColor(index)}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
      
      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path 
            d="M0,40 C300,80 900,0 1200,40 L1200,120 L0,120 Z" 
            fill="rgba(250, 221, 130, 0.1)"
            animate={{ 
              d: [
                "M0,40 C300,80 900,0 1200,40 L1200,120 L0,120 Z",
                "M0,60 C300,20 900,80 1200,60 L1200,120 L0,120 Z",
                "M0,40 C300,80 900,0 1200,40 L1200,120 L0,120 Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  )
}

export default StatsSection