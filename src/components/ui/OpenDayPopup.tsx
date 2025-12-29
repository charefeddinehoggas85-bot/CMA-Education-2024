'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec gradient et fermeture */}
            <div className="relative bg-gradient-to-br from-primary-blue via-blue-600 to-indigo-700 p-6 text-white overflow-hidden">
              {/* Éléments décoratifs */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full translate-y-12 -translate-x-12"></div>
              
              {/* Bouton fermer */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors group"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
              </button>

              {/* Timer circulaire */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="opacity-30"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * (1 - timeLeft / 10)}`}
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {timeLeft}
                  </span>
                </div>
              </div>

              {/* Contenu header */}
              <div className="relative mt-8">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wide">
                    Événement Spécial
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Journée Porte Ouverte
                </h2>
                <p className="text-white/90 text-sm">
                  Découvrez nos formations BTP et rencontrez nos experts
                </p>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="p-6">
              {/* Informations événement */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div>
                    <p className="font-semibold">6 dates disponibles</p>
                    <p className="text-sm text-gray-500">Février - Mars - Avril 2026</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">9h00 - 17h00</p>
                    <p className="text-sm text-gray-500">Accueil continu</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Campus CMA</p>
                    <p className="text-sm text-gray-500">Champs-sur-Marne</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Inscription recommandée</p>
                    <p className="text-sm text-gray-500">Formulaire en ligne</p>
                  </div>
                </div>
              </div>

              {/* Dates spécifiques */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Calendar className="w-4 h-4 text-primary-blue mr-2" />
                  Dates 2026
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mr-2"></div>
                    Ven. 6 Février
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mr-2"></div>
                    Sam. 7 Février
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mr-2"></div>
                    Ven. 6 Mars
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mr-2"></div>
                    Sam. 7 Mars
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mr-2"></div>
                    Ven. 11 Avril
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mr-2"></div>
                    Sam. 12 Avril
                  </div>
                </div>
              </div>

              {/* Avantages */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 text-green-600 mr-2" />
                  Au programme
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></div>
                    Visite des ateliers et laboratoires
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></div>
                    Rencontre avec les formateurs
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></div>
                    Présentation des formations
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></div>
                    Conseils personnalisés
                  </li>
                </ul>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col space-y-3">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Calendar className="w-4 h-4" />
                  <span>S'inscrire maintenant</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <Link
                  href="/journee-porte-ouverte"
                  onClick={onClose}
                  className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl"
                >
                  <span>Voir le programme complet</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 py-2 px-4 text-sm font-medium transition-colors"
                >
                  Peut-être plus tard
                </button>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="h-1 bg-gray-100">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-blue to-blue-600"
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