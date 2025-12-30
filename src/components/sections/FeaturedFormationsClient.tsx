'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, GraduationCap, Users, Award, Building2, Clock, MapPin, Star, ExternalLink, ChevronLeft, ChevronRight, CheckCircle, BookOpen, Euro } from 'lucide-react'
import Link from 'next/link'
import { getStrapiMediaURL } from '@/lib/strapi'
import { formationsAlternance, formationsReconversion, vaeCertifications, entrepriseThematiques } from '@/data/formations-static'
import { useState, useRef, useEffect } from 'react'

interface Formation {
  id: number
  title?: string
  titre?: string
  slug: string
  image?: any
  level?: string
  niveauRNCP?: string | null
  category?: any
  categorie?: string | null
  shortDescription?: string
  duration?: string
  rhythm?: string
  mode?: string
  price?: string
  rncp?: string
  rncpUrl?: string
  objectives?: string[]
  opportunities?: string[]
  isAlternance?: boolean
  isReconversion?: boolean
}

interface FeaturedFormationsClientProps {
  formations: Formation[]
}

// Composant Carousel horizontal moderne et artistique
function ArtisticFormationsCarousel({ 
  title, 
  formations, 
  icon: Icon, 
  bgGradient,
  iconColor 
}: {
  title: string
  formations: any[]
  icon: any
  bgGradient: string
  iconColor: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = 288 // w-72 = 288px (plus compact)
      const scrollPosition = index * cardWidth
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1)
    scrollToIndex(newIndex)
  }

  const scrollRight = () => {
    const maxIndex = Math.max(0, formations.length - 4) // Afficher 4 cartes à la fois
    const newIndex = Math.min(maxIndex, currentIndex + 1)
    scrollToIndex(newIndex)
  }

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0)
    setCanScrollRight(currentIndex < formations.length - 4)
  }, [currentIndex, formations.length])

  // Déterminer la catégorie basée sur le titre
  const getCategory = (title: string): string => {
    if (title.toLowerCase().includes('alternance')) return 'alternance'
    if (title.toLowerCase().includes('reconversion')) return 'reconversion'
    if (title.toLowerCase().includes('vae')) return 'vae'
    if (title.toLowerCase().includes('entreprise')) return 'entreprise'
    return 'alternance'
  }

  const category = getCategory(title)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Container avec design moderne */}
      <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 overflow-hidden">
        {/* Motif de fond artistique */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Header compact et moderne */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <motion.div 
              className={`${iconColor} p-3 rounded-2xl shadow-lg`}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{formations.length} formations</p>
            </div>
          </div>

          {/* Navigation moderne et compacte */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                canScrollLeft 
                  ? 'bg-white/80 text-gray-700 hover:bg-white shadow-lg hover:shadow-xl backdrop-blur-sm' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={canScrollLeft ? { scale: 1.05 } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                canScrollRight 
                  ? 'bg-white/80 text-gray-700 hover:bg-white shadow-lg hover:shadow-xl backdrop-blur-sm' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={canScrollRight ? { scale: 1.05 } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Carousel des formations */}
        <div 
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 relative z-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {formations.map((formation, index) => (
            <ArtisticFormationCard key={formation.id} formation={formation} index={index} category={category} />
          ))}
        </div>

        {/* Indicateurs minimalistes */}
        <div className="flex justify-center gap-1.5 mt-4 relative z-10">
          {Array.from({ length: Math.max(1, formations.length - 3) }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-gray-800 w-6' : 'bg-gray-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Composant FormationCard moderne et compact avec design artistique
function ArtisticFormationCard({ formation, index, category }: { formation: any, index: number, category: string }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const getCategoryGradient = (cat: string) => {
    switch(cat) {
      case 'alternance': return 'from-blue-500 via-indigo-500 to-purple-600'
      case 'reconversion': return 'from-emerald-500 via-teal-500 to-cyan-600'
      case 'vae': return 'from-purple-500 via-violet-500 to-fuchsia-600'
      case 'entreprise': return 'from-orange-500 via-red-500 to-pink-600'
      default: return 'from-blue-500 to-indigo-600'
    }
  }

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'alternance': return '🎓'
      case 'reconversion': return '🔄'
      case 'vae': return '🏆'
      case 'entreprise': return '🏢'
      default: return '📚'
    }
  }

  // Helper pour obtenir l'URL France Compétences
  const getRncpUrl = (rncp?: string, rncpUrl?: string): string | undefined => {
    if (rncpUrl && rncpUrl.trim() !== '') return rncpUrl
    if (rncp) {
      const rncpToUrlMap: Record<string, string> = {
        'RNCP35503': 'https://www.francecompetences.fr/recherche/rncp/35503/',
        'RNCP40217': 'https://www.francecompetences.fr/recherche/rncp/40217/',
        'RNCP41466': 'https://www.francecompetences.fr/recherche/rncp/41466/',
        'RNCP41368': 'https://www.francecompetences.fr/recherche/rncp/41368/',
        'RNCP39408': 'https://www.francecompetences.fr/recherche/rncp/39408/',
        'RNCP41369': 'https://www.francecompetences.fr/recherche/rncp/41369/',
        'RNCP39469': 'https://www.francecompetences.fr/recherche/rncp/39469/',
        'RNCP38549': 'https://www.francecompetences.fr/recherche/rncp/38549/',
      }
      return rncpToUrlMap[rncp] || undefined
    }
    return undefined
  }

  const rncpUrl = getRncpUrl(formation.rncp, formation.rncpUrl)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden flex-shrink-0 w-72 h-96 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
      }}
    >
      {/* Gradient de fond artistique */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category)} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Motif géométrique décoratif */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(category)} rounded-full transform rotate-45 scale-150`} />
      </div>

      {/* Header compact avec icône */}
      <div className="relative p-4 pb-2">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getCategoryGradient(category)} flex items-center justify-center text-white text-xl shadow-lg`}>
            {getCategoryIcon(category)}
          </div>
          
          {formation.level && (
            <motion.div 
              className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs font-semibold text-gray-700">{formation.level.split(' ')[0]} {formation.level.split(' ')[1]}</span>
            </motion.div>
          )}
        </div>

        {/* Titre compact */}
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {formation.title}
        </h3>

        {/* RNCP Badge compact */}
        {formation.rncp && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
              <Award className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">{formation.rncp}</span>
            </div>
            {rncpUrl && (
              <a 
                href={rncpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Contenu principal compact */}
      <div className="px-4 pb-4 flex-1 flex flex-col">
        {/* Description très courte */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {formation.shortDescription?.substring(0, 80)}...
        </p>

        {/* Informations essentielles en grille compacte */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          {formation.duration && (
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-gray-700 truncate">{formation.duration.split(' ')[0]} {formation.duration.split(' ')[1]}</span>
            </div>
          )}
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
            <MapPin className="w-3 h-3 text-gray-500" />
            <span className="text-gray-700 truncate">{formation.mode || 'Présentiel'}</span>
          </div>
        </div>

        {/* Objectifs compacts */}
        {formation.objectives && formation.objectives.length > 0 && (
          <div className="mb-3 flex-1">
            <div className="space-y-1">
              {formation.objectives.slice(0, 2).map((obj: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-gray-600 line-clamp-1">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button moderne et compact */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto"
        >
          <Link
            href={`/formations/${formation.slug}`}
            className={`group/btn relative overflow-hidden bg-gradient-to-r ${getCategoryGradient(category)} text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
          >
            <span className="relative z-10">Découvrir</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
            
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          </Link>
        </motion.div>
      </div>

      {/* Effet de bordure animée au hover */}
      <motion.div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getCategoryGradient(category)} opacity-0 group-hover:opacity-20`}
        style={{ 
          background: `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`,
          mixBlendMode: 'overlay'
        }}
        animate={{ 
          opacity: isHovered ? 0.1 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export function FeaturedFormationsClient({ formations }: FeaturedFormationsClientProps) {
  // Si nous avons des formations depuis Strapi, les afficher dans un carousel horizontal
  if (formations.length > 0) {
    return (
      <div className="space-y-8">
        <ArtisticFormationsCarousel
          title="Formations Disponibles"
          formations={formations}
          icon={GraduationCap}
          bgGradient="bg-gradient-to-br from-blue-50 to-indigo-100"
          iconColor="bg-primary-blue"
        />
      </div>
    )
  }

  // Carousels horizontaux artistiques avec les formations existantes par catégorie
  return (
    <div className="space-y-12">
      {/* Titre principal moderne et compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-4 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">Nos Formations</span>
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Formations
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            d'Excellence BTP
          </span>
        </h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Découvrez nos parcours certifiants conçus pour votre réussite professionnelle
        </p>
      </motion.div>

      {/* Carousel Formations Alternance */}
      <ArtisticFormationsCarousel
        title="Formations en Alternance"
        formations={formationsAlternance}
        icon={GraduationCap}
        bgGradient="bg-gradient-to-br from-blue-50 to-indigo-100"
        iconColor="bg-gradient-to-r from-blue-500 to-indigo-600"
      />

      {/* Carousel Formations Reconversion */}
      <ArtisticFormationsCarousel
        title="Reconversion Professionnelle"
        formations={formationsReconversion}
        icon={Users}
        bgGradient="bg-gradient-to-br from-green-50 to-emerald-100"
        iconColor="bg-gradient-to-r from-emerald-500 to-teal-600"
      />

      {/* Section VAE - Design moderne et compact */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 overflow-hidden">
          {/* Motif de fond */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), 
                                 radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`,
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="bg-gradient-to-r from-purple-500 to-violet-600 p-3 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">VAE - Validation des Acquis</h3>
                <p className="text-sm text-gray-600">Transformez votre expérience en certification</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {vaeCertifications.niveau5.slice(0, 4).map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                >
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">{cert.titre}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-xs font-bold">
                      Niveau 5
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <span>{cert.rncp}</span>
                    {cert.rncpUrl && (
                      <a 
                        href={cert.rncpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/formations/vae-btp"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 group"
              >
                Découvrir la VAE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section Formations Entreprises - Moderne et compact */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 overflow-hidden">
          {/* Motif de fond */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 40%, rgba(249, 115, 22, 0.1) 0%, transparent 50%), 
                                 radial-gradient(circle at 70% 60%, rgba(234, 88, 12, 0.1) 0%, transparent 50%)`,
              }}
            />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Building2 className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Formations Entreprises</h3>
                  <p className="text-sm text-gray-600">Solutions sur mesure</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Développez les compétences de vos équipes avec nos formations personnalisées.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {entrepriseThematiques.slice(0, 2).map((thematique, index) => (
                  <div key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg text-sm font-medium">
                    {thematique.split(':')[0]}
                  </div>
                ))}
              </div>

              <Link
                href="/formations/entreprises"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 group"
              >
                Découvrir nos solutions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4"
              >
                <div className="text-2xl font-bold text-white mb-1">700€</div>
                <div className="text-orange-200 text-xs">À partir de</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4"
              >
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-orange-200 text-xs">Sur mesure</div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section finale - CTA compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h4 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à transformer votre carrière ?
        </h4>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Découvrez toutes nos formations et trouvez celle qui correspond à vos ambitions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 group"
          >
            Voir toutes les formations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-gray-700 border-2 border-gray-200 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300"
          >
            Nous contacter
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
