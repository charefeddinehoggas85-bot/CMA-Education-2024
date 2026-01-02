'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getSiteSettings, getContactInfo, getProcessusAdmission, getPartners, getPageContact } from '@/lib/strapi'
import { Phone, Mail, MapPin, Clock, CheckCircle, UserPlus, ArrowRight, Rocket, ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react'

interface SiteSettings {
  id: number
  siteName: string
  contactPhone: string
  contactEmail: string
  inscriptionEmail?: string
}

interface ContactInfo {
  id: number
  adressePrincipale?: {
    nom: string
    rue: string
    ville: string
    codePostal: string
  }
  telephones?: Array<{
    numero: string
    type: string
    label: string
    principal: boolean
  }>
  emails?: Array<{
    email: string
    type: string
    label: string
    principal: boolean
  }>
}

interface ProcessusAdmission {
  id: number
  titre: string
  description: string
  detail?: string
  etape: number
  ordre: number
}

interface Partner {
  id: number
  nom: string
  logo?: string
}

// Animated floating particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-primary-yellow/30 rounded-full"
        initial={{ 
          x: Math.random() * 100 + '%', 
          y: '100%',
          opacity: 0 
        }}
        animate={{ 
          y: '-100%',
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: 'linear'
        }}
      />
    ))}
  </div>
)

// Animated gradient orbs
const GradientOrbs = () => (
  <>
    <motion.div
      className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-blue/20 to-primary-yellow/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-primary-yellow/20 to-green-500/20 rounded-full blur-3xl"
      animate={{
        scale: [1.2, 1, 1.2],
        x: [0, -40, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
  </>
)

const AdmissionStep = ({ step, index }: { step: ProcessusAdmission, index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="flex items-start space-x-4"
  >
    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold">{step.etape}</span>
    </div>
    <div>
      <h3 className="text-xl font-montserrat font-bold text-primary-blue mb-2">
        {step.titre}
      </h3>
      <p className="text-gray-600 mb-2">{step.description}</p>
      {step.detail && <p className="text-sm text-gray-500">{step.detail}</p>}
    </div>
  </motion.div>
)

export default function ContactPage() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [admissionSteps, setAdmissionSteps] = useState<ProcessusAdmission[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [pageData, setPageData] = useState<any>(null)

  useEffect(() => {
    async function loadContactData() {
      try {
        const [settingsData, contactData, stepsData, partnersData, pageContactData] = await Promise.all([
          getSiteSettings(),
          getContactInfo(),
          getProcessusAdmission(),
          getPartners(),
          getPageContact()
        ])
        
        setSiteSettings(settingsData as SiteSettings)
        setContactInfo(contactData as ContactInfo)
        setAdmissionSteps(stepsData as ProcessusAdmission[])
        setPartners(partnersData as Partner[])
        if (pageContactData) {
          setPageData(pageContactData)
        }
      } catch (error) {
        console.error('Erreur chargement contact:', error)
        setSiteSettings({
          id: 1,
          siteName: 'Construction Management Academy',
          contactPhone: '01 85 09 71 06',
          contactEmail: 'contact.academy@cma-education.com',
          inscriptionEmail: 'inscription.academy@construction-management-academy.fr'
        })
        setAdmissionSteps([
          { id: 1, titre: "Candidature en ligne", description: "Remplissez le formulaire de candidature", detail: "Processus simplifié en 5 minutes", etape: 1, ordre: 1 },
          { id: 2, titre: "Entretien de motivation", description: "Échange avec notre équipe pédagogique", detail: "Entretien personnalisé de 30 minutes", etape: 2, ordre: 2 }
        ])
      } finally {
        setLoading(false)
      }
    }
    loadContactData()
  }, [])

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-16 w-96 mx-auto rounded mb-4"></div>
          <div className="bg-gray-200 h-6 w-2/3 mx-auto rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-96 text-white relative">
        <div className="absolute inset-0 opacity-100">
          <img src="/images/rejoignez-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-montserrat font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {pageData?.heroTitle || `Rejoignez ${siteSettings?.siteName || 'Construction Management Academy'} !`}
            </motion.h1>
            <motion.p 
              className="text-xl opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {pageData?.heroSubtitle || "Processus d'admission simplifié, sans concours d'entrée. L'admission se fait uniquement sur entretien de motivation."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ✨ ANIMATED CTA SECTION - Minimal Design with Attention Arrows */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-primary-blue to-slate-900 relative overflow-hidden">
        <FloatingParticles />
        <GradientOrbs />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            {/* CTA Button with Animated Arrows */}
            <div className="relative">
              {/* Animated Arrows - Left Side */}
              <div className="absolute -left-16 md:-left-24 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronRight className="w-8 h-8 text-primary-yellow/60" />
                </motion.div>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                >
                  <ChevronRight className="w-8 h-8 text-primary-yellow/80" />
                </motion.div>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                >
                  <ChevronRight className="w-8 h-8 text-primary-yellow" />
                </motion.div>
              </div>

              {/* Animated Arrows - Right Side */}
              <div className="absolute -right-16 md:-right-24 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <motion.div
                  animate={{ x: [0, -8, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                >
                  <ChevronLeft className="w-8 h-8 text-primary-yellow" />
                </motion.div>
                <motion.div
                  animate={{ x: [0, -8, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                >
                  <ChevronLeft className="w-8 h-8 text-primary-yellow/80" />
                </motion.div>
                <motion.div
                  animate={{ x: [0, -8, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronLeft className="w-8 h-8 text-primary-yellow/60" />
                </motion.div>
              </div>

              {/* Animated Arrows - Top */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-12 flex flex-col items-center gap-0">
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-8 h-8 text-primary-yellow/60" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                  className="-mt-4"
                >
                  <ChevronDown className="w-8 h-8 text-primary-yellow/80" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="-mt-4"
                >
                  <ChevronDown className="w-8 h-8 text-primary-yellow" />
                </motion.div>
              </div>

              {/* Pulsing Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-primary-yellow/20 rounded-2xl blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Main CTA Button */}
              <motion.a
                href="https://cma-education.ymag.cloud/index.php/preinscription/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-primary-yellow to-yellow-400 text-primary-blue font-bold text-2xl rounded-2xl shadow-2xl shadow-primary-yellow/30 hover:shadow-primary-yellow/50 transition-all duration-300 overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <Rocket className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                <span>Candidater Maintenant</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </motion.a>
            </div>

            {/* Sans frais de scolarité */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-white/80 text-lg mt-4"
            >
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Sans frais de scolarité</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Parcours d'admission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-primary-blue mb-6">
              {pageData?.admissionSectionTitle || `Parcours d'admission`}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {(pageData?.admissionSectionSubtitle || "Un processus simplifié en {count} étapes pour intégrer nos formations").replace('{count}', String(admissionSteps.length))}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {admissionSteps.map((step, index) => (
              <AdmissionStep key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Nos partenaires de confiance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-primary-blue mb-6">
              {pageData?.partnersSectionTitle || "Nos partenaires de confiance"}
            </h2>
            <p className="text-xl text-gray-600">
              {pageData?.partnersSectionSubtitle || "Des entreprises leaders qui recrutent nos diplômés"}
            </p>
          </div>
          
          <div className="partners-grid">
            {partners.slice(0, 12).map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24 group"
              >
                <img 
                  src={partner.logo ? `/images/partners/${partner.logo}` : `/images/partners/default.webp`}
                  alt={partner.nom} 
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.innerHTML = `<div class="text-xs font-bold text-gray-600 text-center">${partner.nom}</div>`
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/contact-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-montserrat font-bold text-primary-blue mb-4">
                {pageData?.contactSectionTitle || "Contactez-nous"}
              </h2>
              <p className="text-xl text-gray-600">
                Notre équipe est à votre disposition pour répondre à toutes vos questions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Cards */}
              {[
                { icon: MapPin, title: pageData?.addressLabel || "Adresse", value: pageData?.addressValue || (contactInfo?.adressePrincipale ? `${contactInfo.adressePrincipale.rue}, ${contactInfo.adressePrincipale.codePostal} ${contactInfo.adressePrincipale.ville}` : '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne'), color: 'bg-primary-blue' },
                { icon: Phone, title: pageData?.phoneLabel || "Téléphone", value: pageData?.phoneValue || contactInfo?.telephones?.find(t => t.principal)?.numero || siteSettings?.contactPhone || '01 85 09 71 06', color: 'bg-primary-blue' },
                { icon: Mail, title: pageData?.emailLabel || "Email", value: pageData?.emailValue || contactInfo?.emails?.find(e => e.type === 'contact')?.email || siteSettings?.contactEmail || 'contact.academy@cma-education.com', color: 'bg-primary-blue' },
                { icon: UserPlus, title: pageData?.inscriptionLabel || "Inscription", value: pageData?.inscriptionEmail || contactInfo?.emails?.find(e => e.type === 'inscription')?.email || siteSettings?.inscriptionEmail || 'inscription.academy@construction-management-academy.fr', color: 'bg-green-600' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-blue mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 bg-gradient-to-r from-primary-blue to-blue-700 text-white p-8 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-7 h-7 text-primary-yellow" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{pageData?.reactiviteLabel || "Réactivité garantie"}</h3>
                    <p className="opacity-90">{pageData?.reactiviteValue || "Réponse sous 24h"}</p>
                    <p className="text-sm opacity-70">{pageData?.reactiviteDetail || "Décision sous 48h après entretien"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-primary-yellow" />
                  <span className="font-semibold">{pageData?.noFeesTitle || "Aucun frais de scolarité"}</span>
                </div>
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <motion.a
                href="https://cma-education.ymag.cloud/index.php/preinscription/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-yellow to-yellow-400 text-primary-blue font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Rocket className="w-5 h-5" />
                Démarrer ma candidature
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
