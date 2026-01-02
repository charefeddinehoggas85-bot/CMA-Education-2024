'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getEtapesAdmission, getPageAdmission, getImageURL } from '@/lib/strapi'
import { 
  FileText, 
  Users, 
  Search, 
  HeartHandshake, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  ArrowRight,
  Sparkles,
  GraduationCap,
  Award
} from 'lucide-react'

interface EtapeAdmission {
  id: number
  numero: number
  titre: string
  description: string
  details?: string[]
  icone?: string
  ordre: number
}

interface PageAdmission {
  titre: string
  sousTitre: string
  introduction: string
  heroImage?: any
  heroImageData?: any
  imageData?: any // Ajout pour compatibilité avec transformStrapiData
  contactPhone: string
  contactEmail: string
  ctaTexte: string
  ctaUrl: string
  pointCle1Titre: string
  pointCle1Description: string
  pointCle2Titre: string
  pointCle2Description: string
  pointCle3Titre: string
  pointCle3Description: string
  titreEtapes: string
  descriptionEtapes: string
  titreCTA: string
  descriptionCTA: string
  titreContact: string
  descriptionContact: string
}

// Données statiques par défaut
const defaultEtapes: EtapeAdmission[] = [
  {
    id: 1,
    numero: 1,
    titre: "Soumission du dossier de candidature",
    description: "Commencez par compléter notre formulaire en ligne : présentez votre parcours, votre profil et votre projet professionnel.",
    details: [
      "Complétez le formulaire de candidature en ligne",
      "Présentez votre parcours et votre projet professionnel",
      "Notre équipe vous recontacte sous 24 heures pour fixer un rendez-vous"
    ],
    icone: "FileText",
    ordre: 1
  },
  {
    id: 2,
    numero: 2,
    titre: "L'entretien d'admission CMA",
    description: "L'entretien peut se dérouler en présentiel ou à distance, selon votre préférence. C'est un moment d'échange privilégié pour discuter de vos motivations.",
    details: [
      "Entretien en présentiel ou à distance selon votre préférence",
      "Échange sur vos motivations et votre projet professionnel",
      "Évaluation de la cohérence entre votre profil et la formation visée",
      "Décision communiquée sous 48 heures après l'entretien"
    ],
    icone: "Users",
    ordre: 2
  },
  {
    id: 3,
    numero: 3,
    titre: "La recherche d'alternance",
    description: "Une fois votre candidature validée, vous recevrez tous les documents nécessaires pour démarrer votre recherche d'entreprise.",
    details: [
      "Réception des documents pour la recherche d'entreprise",
      "Préparation de votre contrat d'alternance",
      "Inscription définitive à la signature de la convention de formation"
    ],
    icone: "Search",
    ordre: 3
  },
  {
    id: 4,
    numero: 4,
    titre: "Un accompagnement dédié pour trouver votre entreprise",
    description: "Dès que votre inscription est validée, vous bénéficiez d'un accompagnement personnalisé dans votre recherche d'alternance.",
    details: [
      "Accompagnement personnalisé dans votre recherche",
      "Atelier pratique pour optimiser votre CV et lettre de motivation",
      "Conseils pour maximiser vos chances auprès des recruteurs"
    ],
    icone: "HeartHandshake",
    ordre: 4
  }
]

const defaultPageData: PageAdmission = {
  titre: "Parcours d'admission CMA",
  sousTitre: "Comment intégrer CMA ?",
  introduction: "À la Construction Management Academy, nous vous offrons un processus d'admission simplifié, sans concours d'entrée. L'admission CMA se fait uniquement sur la base d'un entretien de motivation. Si vous détenez les diplômes requis pour nos formations, vous êtes éligible. Lors de l'entretien, nous évaluerons votre motivation, qui est au cœur de notre processus de sélection. Il est important de noter qu'aucun frais de scolarité ou d'inscription ne sera demandé à l'alternant.",
  contactPhone: "01 85 09 71 06",
  contactEmail: "inscription.academy@cma-education.com",
  ctaTexte: "Déposer ma candidature",
  ctaUrl: "https://cma-education.ymag.cloud/index.php/preinscription/",
  pointCle1Titre: "Sans concours",
  pointCle1Description: "Admission sur entretien de motivation uniquement",
  pointCle2Titre: "Gratuit pour l'alternant",
  pointCle2Description: "Aucun frais de scolarité ou d'inscription",
  pointCle3Titre: "Réponse rapide",
  pointCle3Description: "Décision sous 48h après l'entretien",
  titreEtapes: "Les étapes de votre admission",
  descriptionEtapes: "Un processus simple et transparent pour rejoindre la Construction Management Academy",
  titreCTA: "Prêt à rejoindre CMA ?",
  descriptionCTA: "Lancez votre candidature dès maintenant et commencez votre parcours vers une carrière dans le BTP",
  titreContact: "Des questions sur l'admission ?",
  descriptionContact: "Notre équipe est à votre disposition pour vous accompagner"
}

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    FileText,
    Users,
    Search,
    HeartHandshake
  }
  return icons[iconName] || FileText
}

const EtapeCard = ({ etape, index }: { etape: EtapeAdmission, index: number }) => {
  const IconComponent = getIconComponent(etape.icone || 'FileText')
  const isEven = index % 2 === 0
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="relative"
    >
      {index < 3 && (
        <div className="hidden md:block absolute left-1/2 top-full w-0.5 h-16 bg-gradient-to-b from-primary-blue to-primary-yellow transform -translate-x-1/2 z-0" />
      )}
      
      <div className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}>
        <div className="flex-shrink-0 relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-blue to-blue-700 flex items-center justify-center shadow-xl shadow-primary-blue/30">
            <IconComponent className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary-yellow flex items-center justify-center font-montserrat font-bold text-primary-blue text-lg shadow-lg">
            {etape.numero}
          </div>
        </div>
        
        <div className={`flex-1 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
          <h3 className="text-xl font-montserrat font-bold text-primary-blue mb-3">
            {etape.titre}
          </h3>
          <p className="text-gray-600 mb-4">
            {etape.description}
          </p>
          
          {etape.details && etape.details.length > 0 && (
            <ul className={`space-y-2 ${isEven ? '' : 'md:flex md:flex-col md:items-end'}`}>
              {etape.details.map((detail, i) => (
                <li key={i} className={`flex items-start gap-2 text-sm text-gray-500 ${isEven ? '' : 'md:flex-row-reverse md:text-right'}`}>
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function AdmissionPage() {
  const [etapes, setEtapes] = useState<EtapeAdmission[]>(defaultEtapes)
  const [pageData, setPageData] = useState<PageAdmission>(defaultPageData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [etapesData, pageDataResult] = await Promise.all([
          getEtapesAdmission(),
          getPageAdmission()
        ])
        
        if (etapesData && Array.isArray(etapesData) && etapesData.length > 0) {
          setEtapes(etapesData as EtapeAdmission[])
        }
        
        if (pageDataResult) {
          setPageData({
            ...defaultPageData,
            ...(pageDataResult as PageAdmission)
          })
        }
      } catch (error) {
        console.error('Erreur chargement données admission:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleCandidater = () => {
    window.open(pageData.ctaUrl, '_blank')
  }

  // Récupérer l'URL de l'image hero depuis plusieurs sources possibles
  const heroImageUrl = getImageURL(
    pageData.heroImageData || pageData.heroImage || pageData.imageData, 
    '/images/formations/gallery-1.jpg'
  )
  
  // Debug en développement
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Page Admission - Hero Image Debug:', {
      heroImageData: pageData.heroImageData,
      heroImage: pageData.heroImage,
      imageData: pageData.imageData,
      finalUrl: heroImageUrl
    })
  }

  return (
    <>
      {/* Hero Section avec image de fond */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImageUrl}
            alt="Admission CMA"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Erreur chargement image hero:', heroImageUrl);
              (e.target as HTMLImageElement).src = '/images/formations/gallery-1.jpg';
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <GraduationCap className="w-5 h-5 text-primary-yellow" />
              <span className="text-sm font-medium text-white">Admission simplifiée</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-4">
              {pageData.titre}
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-montserrat text-primary-yellow mb-6">
              {pageData.sousTitre}
            </h2>
            
            <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-2xl">
              {pageData.introduction}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCandidater}
                className="group inline-flex items-center space-x-3 bg-primary-yellow text-primary-blue px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span>{pageData.ctaTexte}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href={`tel:${pageData.contactPhone.replace(/\s/g, '')}`}
                className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>{pageData.contactPhone}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Points clés */}
      <section className="py-12 bg-white -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{pageData.pointCle1Titre}</h3>
              <p className="text-gray-500">{pageData.pointCle1Description}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-primary-blue" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{pageData.pointCle2Titre}</h3>
              <p className="text-gray-500">{pageData.pointCle2Description}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{pageData.pointCle3Titre}</h3>
              <p className="text-gray-500">{pageData.pointCle3Description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Étapes d'admission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-4">
              {pageData.titreEtapes}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {pageData.descriptionEtapes}
            </p>
          </motion.div>

          <div className="space-y-16">
            {etapes.map((etape, index) => (
              <EtapeCard key={etape.id} etape={etape} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-white rounded-full" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 text-primary-yellow mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
              {pageData.titreCTA}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {pageData.descriptionCTA}
            </p>
            
            <button
              onClick={handleCandidater}
              className="group inline-flex items-center space-x-3 bg-primary-yellow text-primary-blue px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span>{pageData.ctaTexte}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-montserrat font-bold text-primary-blue mb-4">
              {pageData.titreContact}
            </h2>
            <p className="text-gray-600">
              {pageData.descriptionContact}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.a
              href={`tel:${pageData.contactPhone.replace(/\s/g, '')}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 bg-gray-50 rounded-xl p-6 hover:bg-primary-blue/5 transition-colors group"
            >
              <div className="w-14 h-14 bg-primary-blue/10 rounded-full flex items-center justify-center group-hover:bg-primary-blue/20 transition-colors">
                <Phone className="w-6 h-6 text-primary-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                <p className="text-lg font-semibold text-gray-900">{pageData.contactPhone}</p>
              </div>
            </motion.a>

            <motion.a
              href={`mailto:${pageData.contactEmail}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 bg-gray-50 rounded-xl p-6 hover:bg-primary-blue/5 transition-colors group"
            >
              <div className="w-14 h-14 bg-primary-blue/10 rounded-full flex items-center justify-center group-hover:bg-primary-blue/20 transition-colors">
                <Mail className="w-6 h-6 text-primary-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-semibold text-gray-900">{pageData.contactEmail}</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </>
  )
}
