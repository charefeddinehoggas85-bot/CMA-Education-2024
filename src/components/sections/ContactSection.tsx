'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
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

const ContactSection = () => {
  const form = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pageData, setPageData] = useState<PageContactData | null>(null)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) return

    setIsLoading(true)
    
    try {
      // Utiliser notre API SMTP Hostinger
      const formData = new FormData(form.current)
      
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        alert('✅ Message envoyé avec succès ! Nous vous recontacterons rapidement.')
        form.current.reset()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de l\'envoi')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
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
  const candidateFormTitle = pageData?.candidateFormTitle || "Candidater maintenant"
  const prenomPlaceholder = pageData?.candidateFormPrenomPlaceholder || "Prénom"
  const nomPlaceholder = pageData?.candidateFormNomPlaceholder || "Nom"
  const emailPlaceholder = pageData?.candidateFormEmailPlaceholder || "Email"
  const telephonePlaceholder = pageData?.candidateFormTelephonePlaceholder || "Téléphone"
  const formationPlaceholder = pageData?.candidateFormFormationPlaceholder || "Formation"
  const messagePlaceholder = pageData?.candidateFormMessagePlaceholder || "Votre message"
  const submitText = pageData?.candidateFormSubmitText || "Accéder à la préinscription"
  const submitUrl = pageData?.candidateFormSubmitUrl || "https://construction-management-academy.ymag.cloud/index.php/preinscription/"
  const formationOptions = pageData?.formationOptions || [
    { value: "charge-affaires-batiment-alternance", label: "Chargé d'Affaires du Bâtiment" },
    { value: "conducteur-travaux-batiment-alternance", label: "Conducteur de Travaux Bâtiment" },
    { value: "chef-chantier-vrd-alternance", label: "Chef de Chantier VRD" },
    { value: "double-parcours-bim-alternance", label: "Double Parcours BIM" },
    { value: "chef-projets-btp-alternance", label: "Chef de Projets BTP" }
  ]

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
            <h3 className="text-2xl font-montserrat font-bold mb-6">
              {candidateFormTitle}
            </h3>
            
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <input 
                type="hidden" 
                name="to_email" 
                value={siteSettings.emailInscription || siteSettings.contactEmail} 
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="prenom"
                  placeholder={prenomPlaceholder}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"
                />
                <input
                  type="text"
                  name="nom"
                  placeholder={nomPlaceholder}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"
                />
              </div>
              
              <input
                type="email"
                name="email"
                placeholder={emailPlaceholder}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"
              />
              
              <input
                type="tel"
                name="telephone"
                placeholder={telephonePlaceholder}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"
              />
              
              <select name="formation" required className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-primary-yellow">
                <option value="">{formationPlaceholder}</option>
                {formationOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              <textarea
                name="message"
                placeholder={messagePlaceholder}
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow resize-none"
              ></textarea>
              
              <a
                href={submitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-primary-yellow to-yellow-500 text-primary-blue py-3 rounded-lg font-semibold hover:shadow-xl transition-all text-center"
              >
                {submitText}
              </a>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
