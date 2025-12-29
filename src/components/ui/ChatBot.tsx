'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant virtuel Construction Management Academy. Comment puis-je vous aider avec nos formations BTP ?',
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('formation') || message.includes('cours')) {
      return 'Nous proposons des formations en conducteur de travaux, maçonnerie, électricité, plomberie et énergies renouvelables. Souhaitez-vous plus d\'informations sur une formation spécifique ?'
    }
    
    if (message.includes('prix') || message.includes('coût') || message.includes('tarif')) {
      return 'Nos formations sont éligibles au CPF et peuvent être financées par Pôle Emploi. Contactez-nous au 01 23 45 67 89 pour un devis personnalisé.'
    }
    
    if (message.includes('durée') || message.includes('temps')) {
      return 'La durée varie selon la formation : de 3 mois pour les certifications à 2 ans pour les diplômes complets. Quelle formation vous intéresse ?'
    }
    
    if (message.includes('inscription') || message.includes('candidature')) {
      return 'Les inscriptions se font en ligne ou sur rendez-vous. Vous pouvez remplir le formulaire de contact ou nous appeler directement.'
    }
    
    if (message.includes('contact') || message.includes('téléphone') || message.includes('adresse')) {
      return 'Vous pouvez nous contacter au 01 89 70 60 52 ou par email à contact.academy@construction-management-academy.fr. Notre centre est ouvert du lundi au vendredi de 8h à 18h.'
    }
    
    if (message.includes('débouché') || message.includes('emploi') || message.includes('métier')) {
      return 'Nos formations mènent à des métiers d\'avenir : conducteur de travaux, chef de chantier, technicien BIM, expert en rénovation énergétique. Le taux d\'insertion est de 85%.'
    }
    
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return 'Bonjour ! Ravi de vous aider. Que souhaitez-vous savoir sur nos formations BTP ?'
    }
    
    if (message.includes('merci')) {
      return 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions sur nos formations.'
    }
    
    return 'Je peux vous renseigner sur nos formations, les tarifs, les débouchés, les inscriptions et nos coordonnées. Que souhaitez-vous savoir ?'
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Réponse du bot après un délai
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <>
      <motion.div
        className="fixed bottom-24 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="mb-4 bg-white rounded-2xl shadow-2xl w-96 h-96 border border-gray-200 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-blue rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-yellow rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Assistant Construction Management Academy</h3>
                    <p className="text-xs text-blue-200">En ligne</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-blue-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.isBot ? 'bg-primary-blue' : 'bg-primary-yellow'
                      }`}>
                        {message.isBot ? (
                          <Bot className="w-3 h-3 text-white" />
                        ) : (
                          <User className="w-3 h-3 text-primary-blue" />
                        )}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm ${
                        message.isBot 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-primary-blue text-white'
                      }`}>
                        {message.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Tapez votre message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-primary-blue hover:bg-blue-700 text-white p-2 rounded-xl transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary-blue hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </motion.button>
      </motion.div>
    </>
  )
}

export default ChatBot