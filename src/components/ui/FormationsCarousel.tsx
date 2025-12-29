'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, GraduationCap, Users, Building, Award, Cpu } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Formation {
  id: number
  title: string
  slug: string
  level: string
  rncp?: string
  shortDescription: string
  image: string
  isAlternance?: boolean
  isReconversion?: boolean
}

interface FormationsCarouselProps {
  formations: Formation[]
  categoryName: string
  categoryColor?: string
}

const FormationsCarousel = ({ formations, categoryName, categoryColor = 'blue' }: FormationsCarouselProps) => {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  console.log('🎠 FormationsCarousel rendu:', {
    categoryName,
    formationsCount: formations?.length || 0,
    categoryColor,
    formations: formations?.map(f => f.title) || []
  })

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && formations && formations.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === formations.length - 1 ? 0 : prevIndex + 1
        )
      }, 4000) // Change slide every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, formations])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === 0 ? formations.length - 1 : currentIndex - 1)
    setTimeout(() => setIsAutoPlaying(true), 5000) // Resume auto-play after 5 seconds
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === formations.length - 1 ? 0 : currentIndex + 1)
    setTimeout(() => setIsAutoPlaying(true), 5000) // Resume auto-play after 5 seconds
  }

  const handleFormationClick = (formation: Formation) => {
    if (formation.isAlternance) {
      router.push(`/formations/${formation.slug}`)
    } else if (formation.isReconversion) {
      router.push(`/formations/reconversion-btp/${formation.slug.replace('-reconversion', '')}`)
    } else {
      router.push(`/formations/vae-btp/${formation.slug}`)
    }
  }

  const getFormationIcon = (formation: Formation) => {
    const title = formation.title.toLowerCase()
    if (title.includes('chargé') || title.includes('affaires')) {
      return <Users className="w-5 h-5" />
    } else if (title.includes('conducteur') || title.includes('travaux')) {
      return <Building className="w-5 h-5" />
    } else if (title.includes('bim') || title.includes('digital')) {
      return <Cpu className="w-5 h-5" />
    } else if (title.includes('vae')) {
      return <Award className="w-5 h-5" />
    } else {
      return <GraduationCap className="w-5 h-5" />
    }
  }

  const getCategoryGradient = () => {
    const gradients = {
      blue: 'from-blue-600 to-indigo-600',
      green: 'from-emerald-600 to-teal-600',
      red: 'from-red-600 to-rose-600',
      purple: 'from-purple-600 to-violet-600',
      orange: 'from-orange-600 to-amber-600'
    }
    return gradients[categoryColor as keyof typeof gradients] || gradients.blue
  }

  if (!formations || formations.length === 0) {
    console.log('⚠️ FormationsCarousel: Aucune formation à afficher pour', categoryName)
    return (
      <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{categoryName}</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">Aucune formation disponible</p>
        </div>
      </div>
    )
  }

  console.log('✅ FormationsCarousel: Rendu avec', formations.length, 'formations pour', categoryName)

  return (
    <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
      {/* Category Header - Responsive */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className={`w-2 md:w-3 h-2 md:h-3 rounded-full bg-gradient-to-r ${getCategoryGradient()}`} />
          <h3 className="text-lg md:text-xl font-bold text-gray-800">{categoryName}</h3>
          <span className="text-xs md:text-sm text-gray-500">({formations.length} formation{formations.length > 1 ? 's' : ''})</span>
        </div>
        
        {/* Navigation Controls - Responsive */}
        {formations.length > 1 && (
          <div className="flex items-center space-x-1 md:space-x-2">
            <button
              onClick={handlePrevious}
              className="p-1.5 md:p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
              aria-label="Formation précédente"
            >
              <ChevronLeft className="w-3 md:w-4 h-3 md:h-4 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 md:p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
              aria-label="Formation suivante"
            >
              <ChevronRight className="w-3 md:w-4 h-3 md:h-4 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Carousel Container - Responsive */}
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            {formations[currentIndex] && (
              <div 
                className={`relative bg-gradient-to-br ${getCategoryGradient()} rounded-xl p-6 text-white cursor-pointer transform transition-transform hover:scale-[1.02] group`}
                onClick={() => handleFormationClick(formations[currentIndex])}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/30 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-lg rotate-12" />
                </div>

                <div className="relative z-10">
                  {/* Formation Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        {getFormationIcon(formations[currentIndex])}
                      </div>
                      <div>
                        <div className="text-xs font-medium opacity-90 mb-1">
                          {formations[currentIndex].level}
                        </div>
                        {formations[currentIndex].rncp && (
                          <div className="text-xs opacity-75">
                            {formations[currentIndex].rncp}
                          </div>
                        )}
                      </div>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Formation Title */}
                  <h4 className="text-lg font-bold mb-3 leading-tight">
                    {formations[currentIndex].title}
                  </h4>

                  {/* Formation Description */}
                  <p className="text-sm opacity-90 leading-relaxed line-clamp-3">
                    {formations[currentIndex].shortDescription}
                  </p>

                  {/* Formation Type Badge */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      {formations[currentIndex].isAlternance && (
                        <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                          Alternance
                        </span>
                      )}
                      {formations[currentIndex].isReconversion && (
                        <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                          Reconversion
                        </span>
                      )}
                    </div>
                    <div className="text-xs opacity-75">
                      Cliquez pour en savoir plus →
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      {formations.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {formations.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false)
                setCurrentIndex(index)
                setTimeout(() => setIsAutoPlaying(true), 5000)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? `bg-gradient-to-r ${getCategoryGradient()} w-6` 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller à la formation ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play indicator */}
      {isAutoPlaying && formations.length > 1 && (
        <div className="absolute top-2 right-2">
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      )}
    </div>
  )
}

export default FormationsCarousel