'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Phone, Mail, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  hasActions?: boolean
}

interface ChatBotProps {
  onClose: () => void
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant virtuel de Construction Management Academy. Comment puis-je vous aider avec nos formations BTP ?',
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    { text: "Voir les formations", action: "formations" },
    { text: "Tarifs et financement", action: "tarifs" },
    { text: "Prendre contact", action: "contact" },
    { text: "Télécharger brochure", action: "brochure" }
  ]

  const getBotResponse = (userMessage: string): { text: string; hasActions?: boolean } => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('formation') || message.includes('cours') || message === 'formations') {
      return {
        text: 'Nous proposons plusieurs formations BTP :\n\n• Conducteur de Travaux Bâtiment\n• Chef de Chantier VRD\n• Responsable Travaux & BIM\n• Formations en reconversion professionnelle\n\nToutes nos formations sont certifiantes et éligibles au CPF. Quelle formation vous intéresse le plus ?'
      }
    }
    
    if (message.includes('prix') || message.includes('coût') || message.includes('tarif') || message === 'tarifs') {
      return {
        text: 'Nos formations sont entièrement finançables :\n\n💰 CPF (Compte Personnel de Formation)\n💼 Pôle Emploi\n🏢 OPCO entreprises\n📋 Financement personnel\n\nContactez-nous pour un devis personnalisé et gratuit !',
        hasActions: true
      }
    }
    
    if (message.includes('durée') || message.includes('temps')) {
      return {
        text: 'Durée de nos formations :\n\n⏱️ Formations courtes : 3-6 mois\n📚 Diplômes complets : 1-2 ans\n🎯 Formations en alternance disponibles\n\nLa durée dépend de votre niveau et de vos objectifs professionnels.'
      }
    }
    
    if (message.includes('inscription') || message.includes('candidature')) {
      return {
        text: 'Pour vous inscrire :\n\n1️⃣ Contactez-nous par téléphone ou email\n2️⃣ Entretien de motivation\n3️⃣ Constitution du dossier\n4️⃣ Recherche de financement\n\nNous vous accompagnons à chaque étape !',
        hasActions: true
      }
    }
    
    if (message.includes('contact') || message.includes('téléphone') || message.includes('adresse') || message === 'contact') {
      return {
        text: 'Nos coordonnées :\n\n📞 01 85 09 71 06\n📧 contact.academy@cma-education.com\n🕒 Lun-Ven : 8h-18h\n\nNotre équipe est à votre disposition pour répondre à toutes vos questions !',
        hasActions: true
      }
    }
    
    if (message.includes('débouché') || message.includes('emploi') || message.includes('métier')) {
      return {
        text: 'Débouchés professionnels :\n\n🏗️ Conducteur de travaux\n👷 Chef de chantier\n💻 Technicien BIM\n🔧 Expert rénovation énergétique\n\n📈 Taux d\'insertion : 85%\n💼 Secteur en forte demande'
      }
    }
    
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return {
        text: 'Bonjour ! Ravi de vous aider. Que souhaitez-vous savoir sur nos formations BTP ? Vous pouvez me poser des questions sur :\n\n• Les formations disponibles\n• Les tarifs et financements\n• Les débouchés professionnels\n• Les modalités d\'inscription'
      }
    }
    
    if (message.includes('merci')) {
      return {
        text: 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions. Notre équipe reste disponible pour vous accompagner dans votre projet professionnel. 😊'
      }
    }

    if (message === 'brochure') {
      return {
        text: 'Je vais vous rediriger vers notre page de téléchargement de brochure où vous pourrez obtenir toutes les informations détaillées sur nos formations.',
        hasActions: true
      }
    }
    
    return {
      text: 'Je peux vous renseigner sur :\n\n📚 Nos formations BTP\n💰 Tarifs et financements\n🎯 Débouchés professionnels\n📝 Modalités d\'inscription\n📞 Prise de contact\n\nQue souhaitez-vous savoir ?'
    }
  }

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputValue
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Réponse du bot après un délai réaliste
    setTimeout(() => {
      const response = getBotResponse(messageText)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        hasActions: response.hasActions
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'contact':
        window.open('tel:0185097106', '_self')
        break
      case 'brochure':
        window.open('/brochure', '_blank')
        break
      default:
        handleSendMessage(action)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl w-96 h-[500px] border border-gray-200 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Assistant CMA</h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-xs text-blue-100">En ligne</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-blue-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex items-start gap-2 max-w-[85%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.isBot ? 'bg-blue-600' : 'bg-gray-600'
              }`}>
                {message.isBot ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                message.isBot 
                  ? 'bg-white text-gray-800 shadow-sm border border-gray-100' 
                  : 'bg-blue-600 text-white'
              }`}>
                <div className="whitespace-pre-line">{message.text}</div>
                
                {/* Actions rapides pour certains messages du bot */}
                {message.isBot && message.hasActions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => window.open('tel:0185097106', '_self')}
                      className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-full transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      Appeler
                    </button>
                    <button
                      onClick={() => window.open('mailto:contact.academy@cma-education.com', '_self')}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-full transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      Email
                    </button>
                    <button
                      onClick={() => window.open('/brochure', '_blank')}
                      className="flex items-center gap-1 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-full transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      Brochure
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Indicateur de frappe */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Actions rapides */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-gray-200 bg-white">
          <p className="text-xs text-gray-500 mb-2">Actions rapides :</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors"
              >
                {action.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Tapez votre message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isTyping || !inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatBot