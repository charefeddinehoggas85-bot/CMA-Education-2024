'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import AboutSection from '@/components/sections/AboutSection'
import GallerySection from '@/components/sections/GallerySection'
import { getStatistiquesSite, getSiteSettings } from '@/lib/strapi'
import { GraduationCap } from 'lucide-react'

interface Statistique {
  id: number
  titre: string
  valeur: string
  suffixe?: string
  description?: string
  ordre: number
}

interface SiteSettings {
  id: number
  siteName: string
  aboutTitle?: string
  aboutDescription?: string
}

const StatsGrid = () => {
  const [stats, setStats] = useState<Statistique[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getStatistiquesSite()
        setStats(data as Statistique[])
      } catch (error) {
        console.error('Erreur chargement stats:', error)
        // Fallback avec données statiques
        setStats([
          { id: 1, titre: "années d'expérience", valeur: "15", suffixe: "+", ordre: 1 },
          { id: 2, titre: "formations certifiantes", valeur: "8", ordre: 2 },
          { id: 3, titre: "entreprises partenaires", valeur: "45", suffixe: "+", ordre: 3 }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-primary-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="formateurs-grid text-center">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/20 h-12 w-24 mx-auto rounded mb-2"></div>
                <div className="bg-white/20 h-4 w-32 mx-auto rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-primary-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="formateurs-grid text-center">
          {stats.slice(0, 3).map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-montserrat font-bold text-primary-yellow mb-2">
                {stat.valeur}{stat.suffixe || ''}
              </div>
              <div className="opacity-90">{stat.titre}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutSection />
      <StatsGrid />
      <GallerySection 
        page="about" 
        title="Notre Campus en Images"
        description="Découvrez nos installations modernes et notre environnement d'apprentissage"
        maxGalleries={2}
      />
    </PageLayout>
  )
}
