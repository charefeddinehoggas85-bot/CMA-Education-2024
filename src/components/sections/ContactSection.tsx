'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ModernButton from '@/components/ui/ModernButton'
import AnimatedIcon from '@/components/ui/AnimatedIcon'
import { getSiteSettings } from '@/lib/strapi'
import emailjs from '@emailjs/browser'

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
  emailConfig?: {
    emailjs?: {
      serviceId: string
      templateId: string
      publicKey: string
    }
  }
}

const ContactSection = () => {
  const router = useRouter()
  const form = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    id: 1,
    siteName: 'Construction Management Academy',
    contactPhone: '01 89 70 60 52',
    contactEmail: 'contact.academy@construction-management-academy.fr',
    emailInscription: 'inscription.academy@construction-management-academy.fr',
    contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
    socialMedia: {},
    emailConfig: {
      emailjs: {
        serviceId: 'service_cma2026',
        templateId: 'template_n27932h',
        publicKey: 'tdRwM2nw_IxILeGS-'
      }
    }
  })

  useEffect(() => {
    async function loadSiteSettings() {
      try {
        const data = await getSiteSettings()
        if (data) {
          setSiteSettings(data as SiteSettings)
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      }
    }
    loadSiteSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) return

    setIsLoading(true)
    
    try {
      const emailConfig = siteSettings.emailConfig?.emailjs
      if (emailConfig) {
        await emailjs.sendForm(
          emailConfig.serviceId,
          emailConfig.templateId,
          form.current,
          emailConfig.publicKey
        )
      } else {
        // Fallback configuration
        await emailjs.sendForm(
          'service_cma2026',
          'template_n27932h',
          form.current,
          'tdRwM2nw_IxILeGS-'
        )
      }
      
      alert('✅ Message envoyé avec succès ! Nous vous recontacterons rapidement.')
      form.current.reset()
    } catch (error) {
      console.error('Erreur:', error)
      alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCall = () => {
    window.open(`tel:${siteSettings.contactPhone.replace(/\s/g, '')}`, '_self')
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-blue to-blue-800 text-white pt-32 overflow-hidden">
      <img 
        src="/images/formations/conducteur-travaux-reconversion.jpg" 
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
              Rejoignez {siteSettings.siteName} !
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Faites le premier pas vers une carrière concrète, utile et pleine d'avenir dans le BTP.
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
                  <p className="font-semibold">Adresse</p>
                  <p className="opacity-90">{siteSettings.contactAddress}</p>
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
                  <p className="font-semibold">Téléphone</p>
                  <p className="opacity-90">{siteSettings.contactPhone}</p>
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
                  <p className="font-semibold">Email</p>
                  <p className="opacity-90">{siteSettings.contactEmail}</p>
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
                Nous appeler
              </ModernButton>
              
              <ModernButton
                variant="outline"
                size="md"
                icon={<AnimatedIcon variant="bounce" size="sm"><MessageCircle className="w-5 h-5" /></AnimatedIcon>}
                iconPosition="left"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-blue"
              >
                Chat en direct
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
              Candidater maintenant
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
                  placeholder="Prénom"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"
                />
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"
                />
              </div>
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"
              />
              
              <input
                type="tel"
                name="telephone"
                placeholder="Téléphone"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"
              />
              
              <select name="formation" required className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-primary-yellow">
                <option value="">Formation d'intérêt</option>
                <option value="charge-affaires-batiment-alternance">Chargé d'Affaires du Bâtiment</option>
                <option value="conducteur-travaux-batiment-alternance">Conducteur de Travaux Bâtiment</option>
                <option value="chef-chantier-vrd-alternance">Chef de Chantier VRD</option>
                <option value="double-parcours-bim-alternance">Double Parcours BIM</option>
                <option value="chef-projets-btp-alternance">Chef de Projets BTP</option>
              </select>
              
              <textarea
                name="message"
                placeholder="Votre message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow resize-none"
              ></textarea>
              
              <a
                href="https://construction-management-academy.ymag.cloud/index.php/preinscription/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-primary-yellow to-yellow-500 text-primary-blue py-3 rounded-lg font-semibold hover:shadow-xl transition-all text-center"
              >
                Accéder à la préinscription
              </a>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection