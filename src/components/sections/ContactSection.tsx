'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, Send, User, Building2, GraduationCap, Users } from 'lucide-react'
import ModernButton from '@/components/ui/ModernButton'
import AnimatedIcon from '@/components/ui/AnimatedIcon'
import { getSiteSettings, getPageContact, getImageURL } from '@/lib/strapi'

interface SiteSettings {
  id: number
  siteName: string
  contactPhone: string
  contactEmail: string
  emailInscription: string
  contactAddress: string
  socialMedia: {
    linkedin?: string
    facebook?: string
    instagram?: string
    youtube?: string
  }
}

interface PageContactData {
  sectionBackgroundImage?: any
  sectionTitle?: string
  sectionSubtitle?: string
  addressLabel?: string
  addressValue?: string
  phoneLabel?: string
  phoneValue?: string
  emailLabel?: string
  emailValue?: string
  callButtonText?: string
  chatButtonText?: string
  candidateFormTitle?: string
  candidateFormPrenomPlaceholder?: string
  candidateFormNomPlaceholder?: string
  candidateFormEmailPlaceholder?: string
  candidateFormTelephonePlaceholder?: string
  candidateFormFormationPlaceholder?: string
  candidateFormMessagePlaceholder?: string
  candidateFormSubmitText?: string
  candidateFormSubmitUrl?: string
  formationOptions?: Array<{ value: string; label: string }>
}

// Types de profils clients
type ProfileType = 'etudiant' | 'reconversion' | 'entreprise' | 'autre' | ''

const profileOptions = [
  { value: 'etudiant', label: 'Étudiant / Jeune diplômé', icon: GraduationCap, description: 'Formation en alternance' },
  { value: 'reconversion', label: 'Particulier en reconversion', icon: User, description: 'Reconversion professionnelle' },
  { value: 'entreprise', label: 'Entreprise / RH', icon: Building2, description: 'Formation pour vos équipes' },
  { value: 'autre', label: 'Autre demande', icon: Users, description: 'Renseignements généraux' },
]

// Options de formation par type de profil
const formationsByProfile: Record<ProfileType, Array<{ value: string; label: string }>> = {
  etudiant: [
    { value: "charge-affaires-batiment-alternance", label: "Chargé d'Affaires du Bâtiment (Bac+3/4)" },
    { value: "conducteur-travaux-batiment-alternance", label: "Conducteur de Travaux Bâtiment (Bac+3)" },
    { value: "chef-chantier-vrd-alternance", label: "Chef de Chantier VRD (Bac+2)" },
    { value: "conducteur-travaux-vrd-1an", label: "Conducteur de Travaux VRD - 1 an (Bac+3)" },
    { value: "conducteur-travaux-vrd-2ans", label: "Conducteur de Travaux VRD - 2 ans (Bac+3)" },
    { value: "double-parcours-bim-alternance", label: "Double Parcours BIM (Bac+4)" },
    { value: "chef-projets-btp-alternance", label: "Chef de Projets BTP (Bac+5)" },
    { value: "chef-projets-btp-1an", label: "Chef de Projets BTP - 1 an (Bac+5)" },
  ],
  reconversion: [
    { value: "reconversion-conducteur-travaux", label: "Conducteur de Travaux Bâtiment (7 mois)" },
    { value: "reconversion-charge-affaires", label: "Chargé d'Affaires Bâtiment (7 mois)" },
    { value: "reconversion-conducteur-tp", label: "Conducteur de Travaux Publics (7 mois)" },
  ],
  entreprise: [
    { value: "formation-intra", label: "Formation intra-entreprise sur mesure" },
    { value: "formation-inter", label: "Formation inter-entreprises" },
    { value: "formation-bim", label: "Formation BIM / Maquette numérique" },
    { value: "formation-management", label: "Management de chantier" },
    { value: "formation-securite", label: "Sécurité et prévention" },
    { value: "autre-besoin", label: "Autre besoin spécifique" },
  ],
  autre: [
    { value: "vae-accompagnement", label: "VAE avec accompagnement" },
    { value: "vae-sans-accompagnement", label: "VAE sans accompagnement" },
    { value: "renseignements", label: "Demande de renseignements" },
    { value: "partenariat", label: "Proposition de partenariat" },
    { value: "autre", label: "Autre demande" },
  ],
  '': []
}

const ContactSection = () => {
  const form = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>('')
  const [pageData, setPageData] = useState<PageContactData | null>(null)
  const [submittedData, setSubmittedData] = useState<{
    prenom: string
    nom: string
    email: string
    profile: string
    formation: string
  } | null>(null)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    id: 1,
    siteName: 'Construction Management Academy',
    contactPhone: '01 85 09 71 06',
    contactEmail: 'contact.academy@cma-education.com',
    emailInscription: 'inscription@cma-education.com',
    contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
    socialMedia: {}
  })

  useEffect(() => {
    async function loadData() {
      try {
        const [settingsData, contactData] = await Promise.all([
          getSiteSettings(),
          getPageContact()
        ])
        if (settingsData) {
          setSiteSettings(settingsData as SiteSettings)
        }
        if (contactData) {
          setPageData(contactData as PageContactData)
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      }
    }
    loadData()
  }, [])

  // Obtenir les formations selon le profil sélectionné
  const currentFormations = selectedProfile ? formationsByProfile[selectedProfile] : []

  // Obtenir le label du profil
  const getProfileLabel = (value: string) => {
    return profileOptions.find(p => p.value === value)?.label || value
  }

  // Obtenir le label de la formation
  const getFormationLabel = (value: string) => {
    for (const formations of Object.values(formationsByProfile)) {
      const found = formations.find(f => f.value === value)
      if (found) return found.label
    }
    return value
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) return

    setIsLoading(true)
    
    try {
      const formData = new FormData(form.current)
      
      // Ajouter les labels lisibles pour l'email
      formData.append('profileLabel', getProfileLabel(selectedProfile))
      formData.append('formationLabel', getFormationLabel(formData.get('formation') as string))
      
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        // Sauvegarder les données soumises pour l'affichage
        setSubmittedData({
          prenom: formData.get('prenom') as string,
          nom: formData.get('nom') as string,
          email: formData.get('email') as string,
          profile: getProfileLabel(selectedProfile),
          formation: getFormationLabel(formData.get('formation') as string)
        })
        setIsSuccess(true)
        form.current.reset()
        setSelectedProfile('')
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

  const handleNewRequest = () => {
    setIsSuccess(false)
    setSubmittedData(null)
  }

  const handleCall = () => {
    const phone = pageData?.phoneValue || siteSettings.contactPhone
    window.open(`tel:${phone.replace(/\s/g, '')}`, '_self')
  }

  // Données avec fallback
  const backgroundImage = getImageURL(pageData?.sectionBackgroundImage, '/images/formations/conducteur-travaux-reconversion.jpg')
  const sectionTitle = pageData?.sectionTitle || `Rejoignez ${siteSettings.siteName} !`
  const sectionSubtitle = pageData?.sectionSubtitle || "Faites le premier pas vers une carrière concrète, utile et pleine d'avenir dans le BTP."
  const addressLabel = pageData?.addressLabel || "Adresse"
  const addressValue = pageData?.addressValue || siteSettings.contactAddress
  const phoneLabel = pageData?.phoneLabel || "Téléphone"
  const phoneValue = pageData?.phoneValue || siteSettings.contactPhone
  const emailLabel = pageData?.emailLabel || "Email"
  const emailValue = pageData?.emailValue || siteSettings.contactEmail
  const callButtonText = pageData?.callButtonText || "Nous appeler"
  const chatButtonText = pageData?.chatButtonText || "Chat en direct"
  const candidateFormTitle = pageData?.candidateFormTitle || "Contactez-nous"
  const prenomPlaceholder = pageData?.candidateFormPrenomPlaceholder || "Prénom"
  const nomPlaceholder = pageData?.candidateFormNomPlaceholder || "Nom"
  const emailPlaceholder = pageData?.candidateFormEmailPlaceholder || "Email"
  const telephonePlaceholder = pageData?.candidateFormTelephonePlaceholder || "Téléphone"
  const messagePlaceholder = pageData?.candidateFormMessagePlaceholder || "Décrivez votre projet ou posez vos questions..."

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-blue to-blue-800 text-white pt-32 overflow-hidden">
      <img 
        src={backgroundImage} 
        alt="Contact Construction Management Academy"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              {sectionTitle}
            </h2>
            <p className="text-xl opacity-90 mb-8">
              {sectionSubtitle}
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <AnimatedIcon 
                  variant="bounce" 
                  size="lg" 
                  background={true} 
                  backgroundVariant="circle"
                  className="bg-primary-yellow"
                >
                  <MapPin className="w-6 h-6 text-primary-blue" />
                </AnimatedIcon>
                <div>
                  <p className="font-semibold">{addressLabel}</p>
                  <p className="opacity-90">{addressValue}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <AnimatedIcon 
                  variant="pulse" 
                  size="lg" 
                  background={true} 
                  backgroundVariant="circle"
                  className="bg-primary-yellow"
                >
                  <Phone className="w-6 h-6 text-primary-blue" />
                </AnimatedIcon>
                <div>
                  <p className="font-semibold">{phoneLabel}</p>
                  <p className="opacity-90">{phoneValue}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <AnimatedIcon 
                  variant="float" 
                  size="lg" 
                  background={true} 
                  backgroundVariant="circle"
                  className="bg-primary-yellow"
                >
                  <Mail className="w-6 h-6 text-primary-blue" />
                </AnimatedIcon>
                <div>
                  <p className="font-semibold">{emailLabel}</p>
                  <p className="opacity-90">{emailValue}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ModernButton
                variant="secondary"
                size="md"
                icon={<AnimatedIcon variant="shake" size="sm"><Phone className="w-5 h-5" /></AnimatedIcon>}
                iconPosition="left"
                onClick={handleCall}
              >
                {callButtonText}
              </ModernButton>
              
              <ModernButton
                variant="outline"
                size="md"
                icon={<AnimatedIcon variant="bounce" size="sm"><MessageCircle className="w-5 h-5" /></AnimatedIcon>}
                iconPosition="left"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-blue"
              >
                {chatButtonText}
              </ModernButton>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* Message de succès */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-montserrat font-bold mb-4 text-white">
                    Message envoyé avec succès !
                  </h3>
                  
                  <p className="text-white/90 mb-6">
                    Merci {submittedData?.prenom} ! Nous avons bien reçu votre demande.
                  </p>

                  {/* Récapitulatif */}
                  <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
                    <h4 className="font-semibold text-primary-yellow mb-3">📋 Récapitulatif de votre demande :</h4>
                    <div className="space-y-2 text-sm text-white/90">
                      <p><span className="text-white/70">Profil :</span> {submittedData?.profile}</p>
                      <p><span className="text-white/70">Formation/Service :</span> {submittedData?.formation}</p>
                      <p><span className="text-white/70">Email de confirmation envoyé à :</span> {submittedData?.email}</p>
                    </div>
                  </div>

                  <p className="text-white/80 text-sm mb-6">
                    Un email de confirmation vous a été envoyé.<br />
                    Notre équipe vous répondra sous 24-48h.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleNewRequest}
                      className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium"
                    >
                      Nouvelle demande
                    </button>
                    <a
                      href={`tel:${phoneValue.replace(/\s/g, '')}`}
                      className="px-6 py-3 bg-primary-yellow text-primary-blue rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Nous appeler
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* Formulaire */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-2xl font-montserrat font-bold mb-2">
                    {candidateFormTitle}
                  </h3>
                  <p className="text-white/80 text-sm mb-6">
                    Étudiant, professionnel ou entreprise, nous avons une solution pour vous.
                  </p>
                  
                  <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                    <input type="hidden" name="to_email" value="contact@cma-education.com" />
                    
                    {/* Sélection du profil */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Vous êtes *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {profileOptions.map((profile) => {
                          const Icon = profile.icon
                          return (
                            <button
                              key={profile.value}
                              type="button"
                              onClick={() => setSelectedProfile(profile.value as ProfileType)}
                              className={`p-3 rounded-lg border-2 transition-all text-left ${
                                selectedProfile === profile.value
                                  ? 'border-primary-yellow bg-primary-yellow/20 text-white'
                                  : 'border-white/30 bg-white/10 text-white/80 hover:border-white/50'
                              }`}
                            >
                              <Icon className={`w-5 h-5 mb-1 ${selectedProfile === profile.value ? 'text-primary-yellow' : ''}`} />
                              <span className="text-xs font-medium block">{profile.label}</span>
                            </button>
                          )
                        })}
                      </div>
                      <input type="hidden" name="profile" value={selectedProfile} required />
                    </div>

                    {/* Nom et Prénom */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="prenom"
                        placeholder={prenomPlaceholder}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow transition-colors"
                      />
                      <input
                        type="text"
                        name="nom"
                        placeholder={nomPlaceholder}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow transition-colors"
                      />
                    </div>
                    
                    {/* Email */}
                    <input
                      type="email"
                      name="email"
                      placeholder={emailPlaceholder}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow transition-colors"
                    />
                    
                    {/* Téléphone */}
                    <input
                      type="tel"
                      name="telephone"
                      placeholder={telephonePlaceholder}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow transition-colors"
                    />

                    {/* Entreprise (si profil entreprise) */}
                    {selectedProfile === 'entreprise' && (
                      <motion.input
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        type="text"
                        name="entreprise"
                        placeholder="Nom de votre entreprise"
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow transition-colors"
                      />
                    )}
                    
                    {/* Sélection formation/service selon profil */}
                    <select 
                      name="formation" 
                      required 
                      disabled={!selectedProfile}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-primary-yellow transition-colors disabled:opacity-50"
                    >
                      <option value="" className="text-gray-800">
                        {!selectedProfile ? 'Sélectionnez d\'abord votre profil' : 'Choisissez une formation / service'}
                      </option>
                      {currentFormations.map((option) => (
                        <option key={option.value} value={option.value} className="text-gray-800">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    
                    {/* Message */}
                    <textarea
                      name="message"
                      placeholder={messagePlaceholder}
                      rows={3}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow resize-none transition-colors"
                    ></textarea>
                    
                    {/* Bouton d'envoi */}
                    <button
                      type="submit"
                      disabled={isLoading || !selectedProfile}
                      className="w-full bg-gradient-to-r from-primary-yellow to-yellow-500 text-primary-blue py-4 rounded-lg font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
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
                          Envoyer ma demande
                        </>
                      )}
                    </button>

                    <p className="text-xs text-white/60 text-center">
                      En soumettant ce formulaire, vous acceptez d'être recontacté par notre équipe.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
