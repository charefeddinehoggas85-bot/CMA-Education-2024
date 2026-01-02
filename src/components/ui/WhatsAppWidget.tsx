'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getFloatingActions } from '@/lib/strapi'

interface WhatsAppData {
  whatsappNumber: string
  whatsappTitle: string
  whatsappStatus: string
  whatsappMessage: string
  whatsappButtonText: string
  whatsappDefaultMessage: string
  isWhatsappEnabled: boolean
  whatsappButtonColor: string
}

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [whatsappData, setWhatsappData] = useState<WhatsAppData>({
    whatsappNumber: "+33 1 85 09 71 06",
    whatsappTitle: "Support Construction Management Academy",
    whatsappStatus: "En ligne",
    whatsappMessage: "Besoin d'aide ? Contactez-nous sur WhatsApp pour toutes vos questions sur nos formations BTP !",
    whatsappButtonText: "Démarrer la conversation",
    whatsappDefaultMessage: "Bonjour, je souhaite obtenir des informations sur les formations Construction Management Academy BTP.",
    isWhatsappEnabled: true,
    whatsappButtonColor: "bg-green-500 hover:bg-green-600"
  })

  useEffect(() => {
    async function loadWhatsAppData() {
      try {
        const data = await getFloatingActions()
        if (data) {
          setWhatsappData({
            whatsappNumber: data.whatsappNumber,
            whatsappTitle: data.whatsappTitle,
            whatsappStatus: data.whatsappStatus,
            whatsappMessage: data.whatsappMessage,
            whatsappButtonText: data.whatsappButtonText,
            whatsappDefaultMessage: data.whatsappDefaultMessage,
            isWhatsappEnabled: data.isWhatsappEnabled,
            whatsappButtonColor: data.whatsappButtonColor
          })
        }
      } catch (error) {
        console.error('Erreur chargement WhatsApp data:', error)
      }
    }
    loadWhatsAppData()
  }, [])
  
  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappData.whatsappNumber.replace(/[\s+]/g, '')
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappData.whatsappDefaultMessage)}`
    window.open(url, '_blank')
  }

  // Don't render if WhatsApp is disabled
  if (!whatsappData.isWhatsappEnabled) {
    return null
  }

  return (
    <>
      {/* Widget flottant */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="mb-4 bg-white rounded-2xl shadow-2xl p-4 w-80 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{whatsappData.whatsappTitle}</h3>
                    <p className="text-sm text-green-500">{whatsappData.whatsappStatus}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {whatsappData.whatsappMessage}
              </p>
              
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {whatsappData.whatsappButtonText}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.button>
      </motion.div>
    </>
  )
}

export default WhatsAppWidget
