'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { Download, FileText, User, Building, Mail, Phone, CheckCircle, Leaf } from 'lucide-react'
import { getFormations } from '@/lib/strapi'
import emailjs from '@emailjs/browser'

interface Formation {
  id: number
  title: string
  slug: string
  brochure?: string
  brochureData?: any
}

export default function BrochurePage() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    type: '',
    email: '',
    telephone: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    async function loadFormations() {
      try {
        const data = await getFormations()
        // Filtrer seulement les formations avec brochures
        const formationsWithBrochures = (data as Formation[]).filter(f => 
          (f as any).brochure?.data?.attributes?.url
        )
        setFormations(formationsWithBrochures)
      } catch (error) {
        console.error('Erreur chargement formations:', error)
      }
    }
    loadFormations()
  }, [])

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFormation) return

    setIsLoading(true)

    try {
      console.log('🔄 Téléchargement direct de la brochure depuis Strapi...');
      
      // Récupérer les détails de la formation avec brochure
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app';
      const formationResponse = await fetch(`${strapiUrl}/api/formations/${selectedFormation.id}?populate=brochure`);
      
      if (!formationResponse.ok) {
        throw new Error('Formation non trouvée');
      }

      const formationData = await formationResponse.json();
      const formation = formationData.data;
      
      if (!formation.attributes.brochure?.data?.attributes?.url) {
        throw new Error('Brochure non disponible pour cette formation');
      }

      const brochureData = formation.attributes.brochure.data.attributes;
      const brochureUrl = `${strapiUrl}${brochureData.url}`;
      
      console.log('📄 URL brochure:', brochureUrl);

      // Essayer de télécharger directement depuis Strapi avec CORS
      try {
        const pdfResponse = await fetch(brochureUrl, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Accept': 'application/pdf',
          },
        });

        if (pdfResponse.ok) {
          const pdfBlob = await pdfResponse.blob();
          
          // Créer un lien de téléchargement
          const url = window.URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `brochure-${selectedFormation.slug || 'formation'}-${formData.nom}-${formData.prenom}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Nettoyer l'URL temporaire
          setTimeout(() => window.URL.revokeObjectURL(url), 1000);
          
          console.log('✅ Brochure téléchargée avec succès !');
        } else {
          throw new Error(`Erreur ${pdfResponse.status}: ${pdfResponse.statusText}`);
        }
      } catch (fetchError) {
        console.log('⚠️ Téléchargement direct échoué, ouverture dans un nouvel onglet...');
        
        // Fallback: ouvrir dans un nouvel onglet
        const link = document.createElement('a');
        link.href = brochureUrl;
        link.target = '_blank';
        link.download = brochureData.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('📂 Brochure ouverte dans un nouvel onglet');
      }

      // Envoyer les données par EmailJS
      await emailjs.send(
        'service_cma2026',
        'template_n27932h',
        {
          to_email: 'contact.academy@cma-education.com',
          formation_title: selectedFormation.title,
          formation_id: selectedFormation.id,
          user_nom: formData.nom,
          user_prenom: formData.prenom,
          user_type: formData.type,
          user_email: formData.email,
          user_telephone: formData.telephone,
          date: new Date().toLocaleDateString('fr-FR'),
          brochure_type: 'Strapi PDF Direct'
        },
        'tdRwM2nw_IxILeGS-'
      )

      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({ nom: '', prenom: '', type: '', email: '', telephone: '' })
        setSelectedFormation(null)
      }, 3000)
    } catch (error) {
      console.error('❌ Erreur téléchargement:', error)
      alert(`Erreur: ${error instanceof Error ? error.message : 'Problème de téléchargement'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-blue via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Download className="w-5 h-5" />
              <span className="text-sm font-medium">Brochures Formations</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              Télécharger nos brochures
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Découvrez en détail nos formations BTP certifiantes. Téléchargez gratuitement les brochures de nos programmes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Brochure téléchargée !</h2>
              <p className="text-gray-600 mb-6">
                Votre brochure a été téléchargée avec succès. Vous devriez également recevoir un email de confirmation.
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Leaf className="w-4 h-4" />
                <span className="text-sm">Merci de préserver l'environnement en évitant l'impression</span>
              </div>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sélection de formation */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-primary-blue mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Choisir une formation
                </h2>
                
                <div className="space-y-3">
                  {formations.map((formation) => (
                    <button
                      key={formation.id}
                      onClick={() => setSelectedFormation(formation)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedFormation?.id === formation.id
                          ? 'border-primary-blue bg-blue-50'
                          : 'border-gray-200 hover:border-primary-blue/50'
                      }`}
                    >
                      <div className="font-medium text-gray-800">{formation.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Brochure PDF disponible
                      </div>
                    </button>
                  ))}
                </div>
                
                {formations.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Chargement des formations...</p>
                  </div>
                )}
              </motion.div>

              {/* Formulaire */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-primary-blue mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Vos informations
                </h2>

                {selectedFormation ? (
                  <form onSubmit={handleDownload} className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-700">
                        <strong>Formation sélectionnée :</strong><br />
                        {selectedFormation.title}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        <p>Cette brochure est un document numérique. Nous vous encourageons à la consulter en ligne.</p>
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
                          <span>Télécharger la brochure</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Sélectionnez d'abord une formation</p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}