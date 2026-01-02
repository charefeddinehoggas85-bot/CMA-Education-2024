'use client'

import { useState } from 'react'
import { Phone, Mail, MessageCircle, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatBot from './ChatBot'

interface FloatingAction {
  icon: React.ReactNode
  label: string
  onClick: () => void
  color: string
  hoverColor: string
}

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)

  // Numéro de téléphone correct
  const phoneNumber = "0185097106"
  const email = "contact.academy@cma-education.com"
  const whatsappNumber = "33185097106" // Format international pour WhatsApp

  const actions: FloatingAction[] = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Appeler",
      onClick: () => window.open(`tel:${phoneNumber}`, '_self'),
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      onClick: () => window.open(`https://wa.me/${whatsappNumber}?text=Bonjour, je souhaite des informations sur vos formations BTP.`, '_blank'),
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      onClick: () => window.open(`mailto:${email}?subject=Demande d'information - Formations BTP&body=Bonjour,%0D%0A%0D%0AJe souhaite obtenir des informations sur vos formations BTP.%0D%0A%0D%0ACordialement`, '_self'),
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      icon: <Download className="w-5 h-5" />,
      label: "Brochure",
      onClick: () => window.open('/brochure', '_blank'),
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    }
  ]

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="mb-4 space-y-3"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={action.onClick}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-full shadow-lg text-white
                    ${action.color} ${action.hoverColor}
                    transform transition-all duration-200 hover:scale-105
                    min-w-[140px] justify-start
                  `}
                >
                  {action.icon}
                  <span className="font-medium text-sm">{action.label}</span>
                </motion.button>
              ))}
              
              {/* Bouton Chat séparé */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: actions.length * 0.1 }}
                onClick={() => setShowChat(true)}
                className="
                  flex items-center gap-3 px-4 py-3 rounded-full shadow-lg text-white
                  bg-purple-500 hover:bg-purple-600
                  transform transition-all duration-200 hover:scale-105
                  min-w-[140px] justify-start
                "
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium text-sm">Chat</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton principal */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="
            w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 
            hover:from-blue-700 hover:to-blue-800
            text-white rounded-full shadow-xl
            flex items-center justify-center
            transform transition-all duration-200 hover:scale-110
            border-2 border-white
          "
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            rotate: isOpen ? 45 : 0,
            backgroundColor: isOpen ? '#dc2626' : undefined
          }}
        >
          {isOpen ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 45 }}
              className="w-6 h-6 flex items-center justify-center"
            >
              <div className="w-4 h-0.5 bg-white absolute" />
              <div className="w-0.5 h-4 bg-white absolute" />
            </motion.div>
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      {/* ChatBot */}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </>
  )
}

export default FloatingActions