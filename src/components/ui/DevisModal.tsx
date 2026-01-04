'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, Building2, Users, Phone, Mail, Briefcase } from 'lucide-react'

interface DevisModalProps {
  isOpen: boolean
  onClose: () => void
  defaultThematique?: string
}

const thematiquesOptions = [
  { value: 'management-chantier', label: 'Management de chantier' },
  { value: 'conduite-travaux', label: 'Conduite de travaux' },
  { value: 'bim-maquette', label: 'BIM / Maquette numérique' },
  { value: 'securite-prevention', label: 'Sécurité et prévention' },
  { value: 'gestion-projet', label: 'Gestion de projet BTP' },
  { value: 'lecture-plans', label: 'Lecture de plans' },
  { value: 'reglementation', label: 'Réglementation et normes' },
  { value: 'developpement-durable', label: 'Développement durable / RE2020' },
  { value: 'autre', label: 'Autre (préciser dans le message)' },
]

const effectifsOptions = [
  { value: '1-5', label: '1 à 5 salariés' },
  { value: '6-10', label: '6 à 10 salariés' },
  { value: '11-20', label: '11 à 20 salariés' },
  { value: '20+', label: 'Plus de 20 salariés' },
]

export default function DevisModal({ isOpen, onClose, defaultThematique = '' }: DevisModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedData, setSubmittedData] = useState<{
    entreprise: string
    contact: string
    email: string
    thematique: string
  } | null>(null)

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const getThematiqueLabel = (value: string) => {
    return thematiquesOptions.find(t => t.value === value)?.label || value
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsLoading(true)

    try {
      const formData = new FormData(formRef.current)
      formData.append('thematiqueLabel', getThematiqueLabel(formData.get('thematique') as string))

      const response = await fetch('/api/send-devis-email', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setSubmittedData({
          entreprise: formData.get('entreprise') as string,
          contact: `${formData.get('prenom')} ${formData.get('nom')}`,
          email: formData.get('email') as string,
          thematique: getThematiqueLabel(formData.get('thematique') as string)
        })
        setIsSuccess(true)
        formRef.current.reset()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de l\'envoi')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('❌ Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter par téléphone.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsSuccess(false)
    setSubmittedData(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-blue to-blue-700 px-6 py-5 text-white">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Demande de devis</h2>
                <p className="text-white/80 text-sm">Formation entreprise sur mesure</p>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              /* Message de succès */
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Demande envoyée !
                </h3>
                <p className="text-gray-600 mb-4">
                  Merci pour votre demande de devis.
                </p>

                {/* Récapitulatif */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
                  <h4 className="font-semibold text-primary-blue mb-2 text-sm">📋 Récapitulatif :</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="text-gray-500">Entreprise :</span> {submittedData?.entreprise}</p>
                    <p><span className="text-gray-500">Contact :</span> {submittedData?.contact}</p>
                    <p><span className="text-gray-500">Thématique :</span> {submittedData?.thematique}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Un email de confirmation a été envoyé à {submittedData?.email}.<br />
                  Notre équipe vous contactera sous 24-48h.
                </p>

                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-primary-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Fermer
                </button>
              </motion.div>
            ) : (
              /* Formulaire */
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 space-y-4"
              >
                {/* Entreprise */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    Nom de l'entreprise *
                  </label>
                  <input
                    type="text"
                    name="entreprise"
                    required
                    placeholder="Votre entreprise"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                  />
                </div>

                {/* Nom et Prénom */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                    <input
                      type="text"
                      name="prenom"
                      required
                      placeholder="Prénom"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input
                      type="text"
                      name="nom"
                      required
                      placeholder="Nom"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Email et Téléphone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="email@entreprise.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      required
                      placeholder="01 23 45 67 89"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Effectif à former */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Users className="w-4 h-4 inline mr-1" />
                    Nombre de salariés à former *
                  </label>
                  <select
                    name="effectif"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionnez</option>
                    {effectifsOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Thématique */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thématique souhaitée *
                  </label>
                  <select
                    name="thematique"
                    required
                    defaultValue={defaultThematique}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionnez une thématique</option>
                    {thematiquesOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Précisions sur votre besoin
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Décrivez vos objectifs, contraintes, dates souhaitées..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Bouton submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-primary-yellow to-yellow-500 text-primary-blue rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer ma demande de devis
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Réponse garantie sous 24-48h ouvrées
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
