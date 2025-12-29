'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, Award, Lightbulb } from 'lucide-react'

import AnimatedIcon from '@/components/ui/AnimatedIcon'
import ModernBackground from '@/components/ui/ModernBackground'
import { getPages } from '@/lib/strapi'

interface PageContent {
  id: number
  title: string
  content: string
  slug: string
  section?: string
}

const AboutSection = () => {
  const [histoireContent, setHistoireContent] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHistoireContent() {
      try {
        const pages = await getPages() as PageContent[]
        const histoirePage = pages.find(page => 
          page.slug === 'notre-histoire' || 
          page.title === 'Notre Histoire' ||
          page.section === 'about'
        )
        
        if (histoirePage) {
          setHistoireContent(histoirePage)
          console.log('✅ Contenu "Notre Histoire" chargé depuis Strapi')
        } else {
          console.log('⚠️ Contenu "Notre Histoire" non trouvé, utilisation du fallback')
        }
      } catch (error) {
        console.error('❌ Erreur lors du chargement du contenu Histoire:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHistoireContent()
  }, [])
  const features = [
    {
      icon: Building2,
      title: "Spécialisation métier",
      description: "Formations BTP adaptées à l'évolution du secteur avec une expertise reconnue dans la conduite et le management de travaux."
    },
    {
      icon: Users,
      title: "Alternance & professionnalisation",
      description: "Des parcours en alternance qui permettent une immersion directe dans le monde professionnel."
    },
    {
      icon: Award,
      title: "Innovation & digitalisation",
      description: "Intégration des nouvelles technologies : transition énergétique, digitalisation, BIM et innovation technologique."
    },
    {
      icon: Lightbulb,
      title: "Accompagnement personnalisé",
      description: "Un suivi individualisé pour rendre chaque apprenant immédiatement opérationnel et acteur de la transformation du BTP."
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden pt-32">
      {/* Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-white" />
      <ModernBackground variant="innovation" className="opacity-20" />
      
      {/* Geometric decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary-blue/20 rounded-full" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary-yellow/10 rounded-lg rotate-45" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Floating geometric shapes */}
          <motion.div 
            className="absolute -top-10 left-1/4 w-16 h-16 border-2 border-primary-yellow/30 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -top-5 right-1/4 w-12 h-12 bg-primary-blue/10 rounded-lg"
            animate={{ rotate: -360, y: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          
          <motion.h2 
            className="text-4xl md:text-6xl font-montserrat font-bold mb-8 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-primary-blue mb-2">Qui sommes nous</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-yellow via-orange-500 to-primary-yellow bg-size-200 animate-shimmer">
              Centre de formation BTP
            </span>
          </motion.h2>
          
          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl border border-white/30 shadow-xl" />
            <p className="relative text-xl text-gray-700 p-8 leading-relaxed">
              Un centre de formation BTP reconnu pour son savoir-faire dans la préparation aux métiers de la conduite et du management de travaux. 
              Nos programmes sont conçus pour répondre aux nouveaux défis du BTP : <span className="font-semibold text-primary-blue">transition énergétique, digitalisation, exigences réglementaires et innovation technologique</span>.
            </p>
          </motion.div>

          {/* Section Notre Histoire depuis Strapi */}
          {!loading && histoireContent && (
            <motion.div
              className="relative max-w-5xl mx-auto mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-white/80 to-primary-yellow/5 backdrop-blur-sm rounded-3xl border border-primary-blue/20 shadow-xl" />
              <div className="relative p-8">
                <h3 className="text-2xl font-montserrat font-bold text-primary-blue mb-4 flex items-center">
                  <AnimatedIcon variant="pulse" size="md" background={true} backgroundVariant="circle" className="bg-primary-blue/10 mr-3">
                    <Award className="w-5 h-5 text-primary-blue" />
                  </AnimatedIcon>
                  {histoireContent.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {histoireContent.content}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Image & Content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group h-[450px]">
              <img 
                src="/images/formations/digital-construction.jpg" 
                alt="Innovation & Excellence Construction Management Academy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/90 via-transparent to-transparent" />
              
              {/* Geometric overlay */}
              <div className="absolute inset-0">
                <svg className="w-full h-full opacity-30" viewBox="0 0 600 400">
                  <motion.polygon
                    points="0,0 150,0 120,120 0,100"
                    fill="rgba(255,255,255,0.1)"
                    animate={{ 
                      points: [
                        "0,0 150,0 120,120 0,100",
                        "0,0 180,30 150,150 0,120",
                        "0,0 150,0 120,120 0,100"
                      ]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                </svg>
              </div>
              
              <div className="absolute bottom-6 left-6 text-white">
                <motion.h4 
                  className="text-2xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Innovation & Excellence
                </motion.h4>
                <motion.p 
                  className="text-sm text-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Des installations modernes pour une formation d'excellence
                </motion.p>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <motion.div 
              className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-primary-yellow/30 to-orange-400/30 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-primary-blue/40 to-purple-600/40 rounded-2xl blur-lg"
              animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-blue-800 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-primary-blue to-blue-800 text-white p-8 rounded-3xl border border-white/10">
                <div className="flex items-center mb-4">
                  <AnimatedIcon variant="pulse" size="lg" background={true} backgroundVariant="circle" className="bg-white/20 mr-4">
                    <Award className="w-6 h-6 text-white" />
                  </AnimatedIcon>
                  <h3 className="text-2xl font-montserrat font-bold">Notre Mission</h3>
                </div>
                <p className="text-lg leading-relaxed opacity-90">
                  À travers des formations concrètes, accessibles et orientées terrain, notre mission est de rendre chaque apprenant <span className="text-primary-yellow font-semibold">immédiatement opérationnel</span> et acteur de la transformation du BTP.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-yellow to-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-r from-primary-yellow to-orange-500 text-white p-8 rounded-3xl border border-white/10">
                <div className="flex items-center mb-4">
                  <AnimatedIcon variant="glow" size="lg" background={true} backgroundVariant="circle" className="bg-white/20 mr-4">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </AnimatedIcon>
                  <h3 className="text-2xl font-montserrat font-bold">Notre Vision</h3>
                </div>
                <p className="text-lg leading-relaxed opacity-90">
                  Devenir une <span className="text-white font-semibold">référence nationale</span> dans la formation BTP, en plaçant l'innovation, la durabilité et la performance au cœur de chaque parcours.
                </p>
                <div className="mt-6 text-sm opacity-80">
                  <p className="mb-2">Grâce à une veille constante du marché et à l'intervention de professionnels en activité, nos formations évoluent en permanence pour rester en phase avec les réalités du terrain et les attentes des entreprises.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
              whileHover={{ y: -10 }}
            >
              {/* Background with glassmorphism */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300" />
              
              {/* Floating decoration */}
              <motion.div 
                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary-yellow/30 to-orange-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative text-center p-8">
                <AnimatedIcon 
                  variant={index % 2 === 0 ? "bounce" : "pulse"} 
                  size="xl" 
                  background={true} 
                  backgroundVariant="gradient"
                  className="mx-auto mb-6"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </AnimatedIcon>
                
                <motion.h4 
                  className="text-xl font-montserrat font-semibold text-primary-blue mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {feature.title}
                </motion.h4>
                
                <motion.p 
                  className="text-gray-700 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection