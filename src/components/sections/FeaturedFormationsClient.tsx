'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, GraduationCap, Users, Award, Building2, Clock, MapPin, Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
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

// Composant pour une carte de formation moderne avec toutes les informations
function ModernFormationCard({ formation, index }: { formation: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 flex-shrink-0 w-80 h-[520px] border border-gray-100"
    >
      {/* Image Container avec overlay gradient */}
      <div className="relative h-48 overflow-hidden">
        {formation.image ? (
          <motion.img
            src={formation.image}
            alt={formation.title || formation.titre || 'Formation'}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-blue via-blue-600 to-indigo-700 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-5xl mb-3">🏗️</div>
              <p className="text-sm font-semibold opacity-90">Formation BTP</p>
            </div>
          </div>
        )}
        
        {/* Overlay gradient animé */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Badges flottants */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {formation.isAlternance && (
            <motion.div 
              className="bg-primary-yellow text-primary-blue px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              Alternance
            </motion.div>
          )}
          {formation.isReconversion && (
            <motion.div 
              className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              Reconversion
            </motion.div>
          )}
          <motion.div 
            className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-3 h-3 inline mr-1" />
            Populaire
          </motion.div>
        </div>

        {/* Niveau RNCP en bas de l'image */}
        {formation.level && (
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/90 backdrop-blur-sm text-primary-blue px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              {formation.level}
            </div>
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        {/* Titre avec animation */}
        <motion.h3 
          className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-blue transition-colors"
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {formation.title || formation.titre}
        </motion.h3>

        {/* Description courte */}
        {formation.shortDescription && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {formation.shortDescription}
          </p>
        )}

        {/* Informations pratiques */}
        <div className="space-y-2 mb-4 flex-grow">
          {formation.duration && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="w-4 h-4 text-primary-blue" />
              <span>{formation.duration}</span>
            </div>
          )}
          {formation.mode && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="w-4 h-4 text-primary-blue" />
              <span>{formation.mode}</span>
            </div>
          )}
          {formation.price && (
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600">
              <span className="w-4 h-4 text-center">💰</span>
              <span>{formation.price}</span>
            </div>
          )}
        </div>

        {/* RNCP Badge */}
        {formation.rncp && (
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-primary-blue px-3 py-1.5 rounded-lg text-xs font-semibold">
              <Award className="w-3 h-3" />
              <span>{formation.rncp}</span>
              {formation.rncpUrl && (
                <Link href={formation.rncpUrl} target="_blank" className="hover:text-primary-yellow transition-colors">
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* CTA Button avec animation */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={`/formations/${formation.slug}`}
            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-blue to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group/btn"
          >
            Découvrir la formation
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Composant Carousel horizontal avec navigation
function FormationsCarousel({ 
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
      const cardWidth = 320 // 80 * 4 (w-80 = 320px)
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
    const maxIndex = Math.max(0, formations.length - 3)
    const newIndex = Math.min(maxIndex, currentIndex + 1)
    scrollToIndex(newIndex)
  }

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0)
    setCanScrollRight(currentIndex < formations.length - 3)
  }, [currentIndex, formations.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`${bgGradient} rounded-3xl p-8 shadow-2xl relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header avec navigation */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`${iconColor} p-4 rounded-2xl shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1">{formations.length} formations disponibles</p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`p-3 rounded-xl transition-all duration-300 ${
              canScrollLeft 
                ? 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={canScrollLeft ? { scale: 1.05 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`p-3 rounded-xl transition-all duration-300 ${
              canScrollRight 
                ? 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={canScrollRight ? { scale: 1.05 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Carousel des formations */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 relative z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {formations.map((formation, index) => (
          <ModernFormationCard key={formation.id} formation={formation} index={index} />
        ))}
      </div>

      {/* Indicateurs de pagination */}
      <div className="flex justify-center gap-2 mt-6 relative z-10">
        {Array.from({ length: Math.max(1, formations.length - 2) }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white shadow-lg' : 'bg-white/40'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function FeaturedFormationsClient({ formations }: FeaturedFormationsClientProps) {
  // Si nous avons des formations depuis Strapi, les afficher
  if (formations.length > 0) {
    return (
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {formations.map((formation, index) => (
          <motion.div
            key={formation.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-blue to-blue-600">
              {formation.image && getStrapiMediaURL(formation.image) ? (
                <img
                  src={getStrapiMediaURL(formation.image) || ''}
                  alt={formation.title || formation.titre || 'Formation'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🏗️</div>
                    <p className="text-sm font-semibold">{formation.categorie || formation.category?.name || 'Formation BTP'}</p>
                  </div>
                </div>
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-primary-yellow text-primary-blue px-3 py-1 rounded-full text-xs font-bold">
                Populaire
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-full">
              {/* Badges Section */}
              <div className="mb-4 flex flex-wrap gap-2 min-h-[32px]">
                {(formation.niveauRNCP || formation.level) && (
                  <span className="inline-block bg-blue-100 text-primary-blue text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {formation.niveauRNCP || formation.level}
                  </span>
                )}
                {(formation.categorie || formation.category?.name) && (
                  <span className="inline-block bg-yellow-100 text-primary-yellow text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {formation.categorie || formation.category?.name}
                  </span>
                )}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-6 line-clamp-3 group-hover:text-primary-blue transition-colors flex-grow">
                {formation.title || formation.titre}
              </h3>

              {/* CTA Button */}
              <Link
                href={`/formations/${formation.slug}`}
                className="inline-flex items-center gap-2 text-primary-blue font-semibold hover:text-primary-yellow transition-colors group/btn mt-auto"
              >
                Découvrir
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Galerie moderne avec extraits de formations par catégorie
  return (
    <div className="space-y-20">
      {/* Titre principal de la galerie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-blue/10 to-primary-yellow/10 px-6 py-3 rounded-full mb-6">
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
          <span className="text-primary-blue font-semibold text-sm uppercase tracking-wider">Galerie Formations</span>
          <div className="w-2 h-2 bg-primary-yellow rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Découvrez Nos
          <span className="block bg-gradient-to-r from-primary-blue to-primary-yellow bg-clip-text text-transparent">
            Formations d'Excellence
          </span>
        </h3>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Explorez notre catalogue de formations BTP par modalité. Chaque parcours est conçu pour vous mener vers l'excellence professionnelle.
        </p>
      </motion.div>

      {/* Galerie Masonry Layout */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Colonne 1 - Formations Alternance (Grande carte) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-6 group"
        >
          <div className="relative h-[600px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold">Formations en Alternance</h4>
                    <p className="text-blue-100 mt-1">Théorie + Pratique en entreprise</p>
                  </div>
                </div>

                {/* Extraits de formations */}
                <div className="space-y-4 mb-8">
                  {formationsAlternance.slice(0, 3).map((formation, index) => (
                    <motion.div
                      key={formation.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
                    >
                      <h5 className="font-semibold mb-2 line-clamp-1">{formation.title}</h5>
                      <div className="flex items-center gap-4 text-sm text-blue-100">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formation.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {formation.level}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-yellow mb-2">{formationsAlternance.length}</div>
                  <div className="text-blue-100">Formations disponibles</div>
                </div>
                <Link
                  href="/formations"
                  className="block w-full bg-white text-primary-blue px-6 py-4 rounded-xl font-semibold text-center hover:bg-blue-50 transition-all duration-300 group/btn"
                >
                  <span className="flex items-center justify-center gap-2">
                    Explorer l'Alternance
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Colonne 2 - Reconversion + VAE */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Reconversion Professionnelle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-[280px] bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">Reconversion</h4>
                      <p className="text-green-100 text-sm">Nouvelle carrière BTP</p>
                    </div>
                  </div>

                  {/* Extrait formation reconversion */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4">
                    <h5 className="font-semibold text-sm mb-1 line-clamp-1">
                      {formationsReconversion[0]?.title}
                    </h5>
                    <p className="text-xs text-green-100 line-clamp-2">
                      {formationsReconversion[0]?.shortDescription}
                    </p>
                  </div>
                </div>

                <Link
                  href="/formations/reconversion-btp"
                  className="bg-white text-green-600 px-4 py-3 rounded-xl font-semibold text-center text-sm hover:bg-green-50 transition-all duration-300 group/btn"
                >
                  <span className="flex items-center justify-center gap-2">
                    Découvrir
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* VAE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-[280px] bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='25 0 30 20 50 25 30 30 25 50 20 30 0 25 20 20'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">VAE</h4>
                      <p className="text-purple-100 text-sm">Validation des acquis</p>
                    </div>
                  </div>

                  {/* Extraits certifications VAE */}
                  <div className="space-y-2 mb-4">
                    {vaeCertifications.niveau5.slice(0, 2).map((cert, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                        <h5 className="font-semibold text-xs mb-1 line-clamp-1">{cert.titre}</h5>
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full text-xs font-bold">
                            Niveau 5
                          </span>
                          <span className="text-xs text-purple-100">{cert.rncp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/formations/vae-btp"
                  className="bg-white text-purple-600 px-4 py-3 rounded-xl font-semibold text-center text-sm hover:bg-purple-50 transition-all duration-300 group/btn"
                >
                  <span className="flex items-center justify-center gap-2">
                    Découvrir la VAE
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Formations Entreprises - Pleine largeur */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="group"
      >
        <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40h40v40H40V40zm20 20h20v20H60V60z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative z-10 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Contenu */}
              <div className="text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                    <Building2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-4xl font-bold">Formations Entreprises</h4>
                    <p className="text-orange-100 mt-2">Solutions sur mesure pour vos équipes</p>
                  </div>
                </div>

                <p className="text-lg text-orange-100 mb-8 leading-relaxed">
                  Développez les compétences de vos collaborateurs avec nos formations personnalisées. 
                  Du Lean Construction au BIM collaboratif, nous adaptons nos programmes à vos enjeux.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {entrepriseThematiques.slice(0, 3).map((thematique, index) => (
                    <div key={index} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                      {thematique}
                    </div>
                  ))}
                </div>

                <Link
                  href="/formations/entreprises"
                  className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 group/btn"
                >
                  Découvrir nos solutions
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-2 gap-6 text-white">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-white mb-2">700€</div>
                  <div className="text-orange-100">À partir de / stagiaire</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-orange-100">Sur mesure</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-white mb-2">3</div>
                  <div className="text-orange-100">Modalités</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-white mb-2">5</div>
                  <div className="text-orange-100">Thématiques</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section finale - CTA global */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-3xl p-12"
      >
        <h4 className="text-3xl font-bold text-gray-900 mb-6">
          Prêt à transformer votre carrière ?
        </h4>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Découvrez toutes nos formations et trouvez celle qui correspond parfaitement à vos ambitions professionnelles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/formations"
            className="inline-flex items-center gap-3 bg-primary-blue text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 group"
          >
            Voir toutes les formations
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-primary-blue border-2 border-primary-blue px-8 py-4 rounded-xl font-semibold hover:bg-primary-blue hover:text-white transition-all duration-300"
          >
            Nous contacter
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
