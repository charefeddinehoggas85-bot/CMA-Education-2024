'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, User, Building, Mail, Phone, FileText, Leaf } from 'lucide-react'
import { generateBrochurePDF } from '@/lib/pdf-generator'
import { sendBrochureNotification, type BrochureData } from '@/lib/simple-email'

interface BrochureModalProps {
  isOpen: boolean
  onClose: () => void
  formation?: any
}

export default function BrochureModal({ isOpen, onClose, formation }: BrochureModalProps) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    type: '',
    email: '',
    telephone: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!formation) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Préparer les données pour l'email de notification
      const emailData: BrochureData = {
        formation: {
          id: formation.id,
          title: formation.title,
          level: formation.level,
          slug: formation.slug
        },
        user: {
          nom: formData.nom,
          prenom: formData.prenom,
          type: formData.type,
          email: formData.email,
          telephone: formData.telephone
        },
        brochureType: (formation.brochure || (formation as any).brochureData?.data) ? 'Brochure Strapi PDF' : 'Brochure générée dynamiquement',
        pageUrl: window.location.href
      }

      // Envoyer la notification email en premier
      console.log('📧 Envoi de la notification email...')
      const emailResult = await sendBrochureNotification(emailData)
      
      if (!emailResult.success) {
        console.warn('⚠️ Échec de l\'envoi email:', emailResult.error)
        // On continue quand même avec le téléchargement
      } else {
        console.log('✅ Email de notification envoyé avec succès')
      }

      // Procéder au téléchargement de la brochure
      console.log('📄 Génération de la brochure...')
      
      // Vérifier si la formation a une brochure Strapi
      if (formation.brochure?.data || formation.brochure) {
        // Construire l'URL de la brochure correctement
        let brochureUrl = '';
        
        if (formation.brochure?.data?.attributes?.url) {
          // Structure Strapi complète: formation.brochure.data.attributes.url
          brochureUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${formation.brochure.data.attributes.url}`;
        } else if (typeof formation.brochure === 'string') {
          // Si brochure est déjà une URL string
          brochureUrl = formation.brochure;
        } else {
          console.error('Structure de brochure:', formation.brochure);
          throw new Error('Structure de brochure non supportée');
        }
        
        // Télécharger directement la brochure Strapi
        const link = document.createElement('a');
        link.href = brochureUrl;
        link.download = `brochure-${formation.slug}-${formData.nom}-${formData.prenom}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Fallback: Générer le PDF dynamiquement
        const pdfBlob = await generateBrochurePDF(formation, formData)
        
        const url = URL.createObjectURL(pdfBlob)
        const a = document.createElement('a')
        a.href = url
        a.download = `brochure-${formation.id}-${formData.nom}-${formData.prenom}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }

      console.log('✅ Brochure téléchargée avec succès')
      setIsSuccess(true)
      
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        setFormData({ nom: '', prenom: '', type: '', email: '', telephone: '' })
      }, 3000)
      
    } catch (error) {
      console.error('❌ Erreur:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
      alert('Erreur lors du téléchargement: ' + errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {isSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Brochure téléchargée !</h3>
                <p className="text-gray-600 mb-4">Votre brochure a été générée et téléchargée avec succès.</p>
                <div className="flex items-center justify-center space-x-2 text-green-600 text-sm">
                  <Leaf className="w-4 h-4" />
                  <span>Merci de préserver l'environnement en évitant l'impression</span>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-primary-blue to-indigo-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Télécharger la brochure</h2>
                        <p className="text-white/80 text-sm">{formation.title}</p>
                      </div>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.prenom}
                        onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nom}
                        onChange={(e) => setFormData({...formData, nom: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-1" />
                      Profil *
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    >
                      <option value="">Sélectionnez votre profil</option>
                      <option value="etudiant">Étudiant</option>
                      <option value="entreprise">Entreprise</option>
                      <option value="particulier">Particulier</option>
                      <option value="demandeur-emploi">Demandeur d'emploi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telephone}
                      onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 flex items-start space-x-3">
                    <Leaf className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-green-700">
                      <p className="font-medium mb-1">Engagement environnemental</p>
                      <p>Cette brochure est générée numériquement. Nous vous encourageons à la consulter en ligne pour préserver l'environnement.</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary-blue to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Générer et télécharger</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}