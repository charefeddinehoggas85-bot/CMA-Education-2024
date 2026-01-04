'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface OpenDayPopupProps {
  isVisible: boolean
  onClose: () => void
}

export default function OpenDayPopup({ isVisible, onClose }: OpenDayPopupProps) {
  const [timeLeft, setTimeLeft] = useState(10)

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible, onClose])

  const titleText = "VOUS ÊTES INVITÉ"
  const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Carte d'invitation 16:9 */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateX: 90 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
            className="relative w-full max-w-4xl aspect-video bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: "1000px" }}
          >
            {/* Texture de fond */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid-jpo" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.3"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid-jpo)" />
              </svg>
            </div>

            {/* Éléments décoratifs */}
            <motion.div 
              className="absolute top-4 left-4 w-16 h-16 border-2 border-black/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute bottom-4 right-4 w-24 h-24 border-2 border-black/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Bouton fermer */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-all group"
            >
              <X className="w-5 h-5 text-black/70 group-hover:text-black group-hover:rotate-90 transition-all duration-200" />
            </button>

            {/* Contenu principal */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12 py-8 text-center">
              
              {/* Titre animé lettre par lettre */}
              <div className="flex flex-wrap justify-center gap-1 mb-2 md:mb-4">
                {titleText.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="text-sm md:text-lg font-medium tracking-[0.3em] text-black/70"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </div>

              {/* Titre principal */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-black mb-4 md:mb-6 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                JOURNÉE
                <br />
                <span className="relative">
                  PORTES OUVERTES
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                    className="absolute -bottom-1 left-0 right-0 h-1 md:h-2 bg-black/20 origin-left"
                  />
                </span>
              </motion.h2>

              {/* Dates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8"
              >
                {['6-7 FÉV', '6-7 MARS', '11-12 AVR'].map((date, index) => (
                  <motion.span
                    key={date}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.15, type: "spring" }}
                    className="px-3 py-1 md:px-4 md:py-2 bg-black/10 rounded-full text-xs md:text-sm font-bold text-black/80"
                  >
                    {date} 2026
                  </motion.span>
                ))}
              </motion.div>

              {/* Bouton CTA unique */}
              <motion.a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-black text-yellow-400 px-8 py-3 md:px-12 md:py-4 rounded-full font-black text-base md:text-xl uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                <span className="relative z-10">S'inscrire</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            </div>

            {/* Barre de progression en bas */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
              <motion.div
                className="h-full bg-black/30"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 10, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
