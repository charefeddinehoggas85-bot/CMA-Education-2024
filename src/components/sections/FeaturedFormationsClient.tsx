'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, GraduationCap, Users, Award, Building2, Clock, MapPin, Star, ExternalLink, ChevronLeft, ChevronRight, CheckCircle, BookOpen, Euro } from 'lucide-react'
import Link from 'next/link'
import { getStrapiMediaURL } from '@/lib/strapi'
import { formationsAlternance, formationsReconversion, vaeCertifications, entrepriseThematiques } from '@/data/formations-static'
import { useState, useRef, useEffect } from 'react'

interface Formation {
  id: number
  title?: string
  titre?: string
  slug: string
  image?: any
  level?: string
  niveauRNCP?: string | null
  category?: any
  categorie?: string | null
  shortDescription?: string
  duration?: string
  rhythm?: string
  mode?: string
  price?: string
  rncp?: string
  rncpUrl?: string
  objectives?: string[]
  opportunities?: string[]
  isAlternance?: boolean
  isReconversion?: boolean
}

interface FeaturedFormationsClientProps {
  formations: Formation[]
}

// Composant Carousel horizontal avec navigation utilisant les cartes existantes
function FormationsCarousel({ 
  title, 
  formations, 
  icon: Icon, 
  bgGradient,
  iconColor 
}: {
  title: string
  formations: any[]
  icon: any
  bgGradient: string
  iconColor: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = 320 // 80 * 4 (w-80 = 320px)
      const scrollPosition = index * cardWidth
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1)
    scrollToIndex(newIndex)
  }

  const scrollRight = () => {
    const maxIndex = Math.max(0, formations.length - 3)
    const newIndex = Math.min(maxIndex, currentIndex + 1)
    scrollToIndex(newIndex)
  }

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0)
    setCanScrollRight(currentIndex < formations.length - 3)
  }, [currentIndex, formations.length])

  // Déterminer la catégorie basée sur le titre
  const getCategory = (title: string): string => {
    if (title.toLowerCase().includes('alternance')) return 'alternance'
    if (title.toLowerCase().includes('reconversion')) return 'reconversion'
    if (title.toLowerCase().includes('vae')) return 'vae'
    if (title.toLowerCase().includes('entreprise')) return 'entreprise'
    return 'alternance'
  }

  const category = getCategory(title)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`${bgGradient} rounded-3xl p-8 shadow-2xl relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header avec navigation */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`${iconColor} p-4 rounded-2xl shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1">{formations.length} formations disponibles</p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`p-3 rounded-xl transition-all duration-300 ${
              canScrollLeft 
                ? 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={canScrollLeft ? { scale: 1.05 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`p-3 rounded-xl transition-all duration-300 ${
              canScrollRight 
                ? 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={canScrollRight ? { scale: 1.05 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Carousel des formations */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 relative z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {formations.map((formation, index) => (
          <ExistingFormationCard key={formation.id} formation={formation} index={index} category={category} />
        ))}
      </div>

      {/* Indicateurs de pagination */}
      <div className="flex justify-center gap-2 mt-6 relative z-10">
        {Array.from({ length: Math.max(1, formations.length - 2) }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-gray-700 shadow-lg' : 'bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Composant FormationCard adapté depuis la page formations existante
function ExistingFormationCard({ formation, index, category }: { formation: any, index: number, category: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'alternance': return 'bg-gradient-to-r from-primary-blue to-blue-600'
      case 'reconversion': return 'bg-gradient-to-r from-green-600 to-emerald-600'
      case 'vae': return 'bg-gradient-to-r from-purple-600 to-indigo-600'
      case 'entreprise': return 'bg-gradient-to-r from-orange-600 to-red-600'
      default: return 'bg-gradient-primary'
    }
  }

  // Helper pour obtenir l'URL France Compétences
  const getRncpUrl = (rncp?: string, rncpUrl?: string): string | undefined => {
    if (rncpUrl && rncpUrl.trim() !== '') return rncpUrl
    if (rncp) {
      const rncpToUrlMap: Record<string, string> = {
        'RNCP35503': 'https://www.francecompetences.fr/recherche/rncp/35503/',
        'RNCP40217': 'https://www.francecompetences.fr/recherche/rncp/40217/',
        'RNCP41466': 'https://www.francecompetences.fr/recherche/rncp/41466/',
        'RNCP41368': 'https://www.francecompetences.fr/recherche/rncp/41368/',
        'RNCP39408': 'https://www.francecompetences.fr/recherche/rncp/39408/',
        'RNCP41369': 'https://www.francecompetences.fr/recherche/rncp/41369/',
        'RNCP39469': 'https://www.francecompetences.fr/recherche/rncp/39469/',
        'RNCP38549': 'https://www.francecompetences.fr/recherche/rncp/38549/',
      }
      return rncpToUrlMap[rncp] || undefined
    }
    return undefined
  }

  const rncpUrl = getRncpUrl(formation.rncp, formation.rncpUrl)

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex-shrink-0 w-80"
    >
      {/* Image de la formation */}
      {formation.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={formation.image}
            alt={formation.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className={`absolute inset-0 ${getCategoryColor(category)} opacity-40`} />
          <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
            {formation.level}
          </span>
        </div>
      )}
      
      <div className={`${!formation.image ? getCategoryColor(category) : ''} ${!formation.image ? 'p-6 text-white' : 'p-4'}`}>
        {!formation.image && (
          <>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                {formation.level}
              </span>
            </div>
          </>
        )}
        
        <h3 className={`text-xl font-montserrat font-bold mb-2 ${formation.image ? 'text-primary-blue' : ''}`}>
          {formation.title}
        </h3>
        
        {formation.rncp && (
          <div className={`flex items-center space-x-2 ${formation.image ? 'text-gray-600' : 'text-white/90'}`}>
            <Award className="w-4 h-4" />
            <span className="text-sm">{formation.rncp}</span>
            {rncpUrl && (
              <a 
                href={rncpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center space-x-1 text-xs ${formation.image ? 'text-primary-blue hover:text-blue-700' : 'text-white/80 hover:text-white'} transition-colors`}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
                <span>France Compétences</span>
              </a>
            )}
          </div>
        )}
      </div>
      
      <div className="p-6 pt-2">
        <p className="text-gray-600 mb-4">{formation.shortDescription}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          {formation.duration && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary-yellow" />
              <span className="text-gray-600">{formation.duration}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary-yellow" />
            <span className="text-gray-600">{formation.mode || 'Présentiel'}</span>
          </div>
          {formation.rhythm && (
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-primary-yellow" />
              <span className="text-gray-600 text-xs">{formation.rhythm}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Euro className="w-4 h-4 text-primary-yellow" />
            <span className="text-gray-600 text-xs">{formation.price || 'Prise en charge'}</span>
          </div>
        </div>
        
        {/* Objectifs principaux */}
        {formation.objectives && formation.objectives.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-primary-blue mb-2 text-sm">Objectifs principaux :</h4>
            <ul className="space-y-1 text-xs text-gray-600">
              {formation.objectives.slice(0, 2).map((obj: string, i: number) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Débouchés principaux */}
        {formation.opportunities && formation.opportunities.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-primary-blue mb-2 text-sm">Débouchés principaux :</h4>
            <div className="flex flex-wrap gap-1">
              {formation.opportunities.slice(0, 2).map((debouche: string, i: number) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {debouche.length > 25 ? debouche.substring(0, 25) + '...' : debouche}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-primary-blue hover:text-primary-yellow transition-colors w-full justify-center py-2 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/5"
          >
            <span>{isExpanded ? 'Voir moins' : 'Aperçu'}</span>
            <ArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          
          <Link 
            href={`/formations/${formation.slug}`}
            className="flex items-center space-x-2 bg-primary-blue text-white hover:bg-blue-700 transition-colors w-full justify-center py-2 rounded-lg font-semibold"
          >
            <span>Voir tous les détails</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedFormationsClient({ formations }: FeaturedFormationsClientProps) {
  // Si nous avons des formations depuis Strapi, les afficher dans un carousel horizontal
  if (formations.length > 0) {
    return (
      <div className="space-y-12">
        <FormationsCarousel
          title="Formations Disponibles"
          formations={formations}
          icon={GraduationCap}
          bgGradient="bg-gradient-to-br from-blue-50 to-indigo-100"
          iconColor="bg-primary-blue"
        />
      </div>
    )
  }

  // Carousels horizontaux avec les formations existantes par catégorie
  return (
    <div className="space-y-16">
      {/* Titre principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-blue/10 to-primary-yellow/10 px-6 py-3 rounded-full mb-6">
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
          <span className="text-primary-blue font-semibold text-sm uppercase tracking-wider">Nos Formations</span>
          <div className="w-2 h-2 bg-primary-yellow rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Découvrez Nos
          <span className="block bg-gradient-to-r from-primary-blue to-primary-yellow bg-clip-text text-transparent">
            Formations d'Excellence
          </span>
        </h3>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Explorez notre catalogue de formations BTP par modalité. Chaque parcours est conçu pour vous mener vers l'excellence professionnelle.
        </p>
      </motion.div>

      {/* Carousel Formations Alternance */}
      <FormationsCarousel
        title="Formations en Alternance"
        formations={formationsAlternance}
        icon={GraduationCap}
        bgGradient="bg-gradient-to-br from-blue-50 to-indigo-100"
        iconColor="bg-primary-blue"
      />

      {/* Carousel Formations Reconversion */}
      <FormationsCarousel
        title="Reconversion Professionnelle"
        formations={formationsReconversion}
        icon={Users}
        bgGradient="bg-gradient-to-br from-green-50 to-emerald-100"
        iconColor="bg-green-600"
      />

      {/* Section VAE - Cartes statiques */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-purple-600 p-4 rounded-2xl shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">VAE - Validation des Acquis</h3>
            <p className="text-gray-600 mt-1">Transformez votre expérience en certification</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {vaeCertifications.niveau5.slice(0, 4).map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h4 className="font-semibold text-gray-900 mb-2">{cert.titre}</h4>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                  Niveau 5
                </span>
                <span className="text-sm text-gray-600">{cert.rncp}</span>
              </div>
              {cert.rncpUrl && (
                <a 
                  href={cert.rncpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary-blue hover:text-blue-700 text-sm transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  France Compétences
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/formations/vae-btp"
            className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 group"
          >
            Découvrir la VAE
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Section Formations Entreprises */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 rounded-3xl p-8 lg:p-12 shadow-2xl text-white"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Building2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-4xl font-bold">Formations Entreprises</h3>
                <p className="text-orange-100 mt-2">Solutions sur mesure pour vos équipes</p>
              </div>
            </div>

            <p className="text-lg text-orange-100 mb-8 leading-relaxed">
              Développez les compétences de vos collaborateurs avec nos formations personnalisées. 
              Du Lean Construction au BIM collaboratif, nous adaptons nos programmes à vos enjeux.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {entrepriseThematiques.slice(0, 3).map((thematique, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  {thematique}
                </div>
              ))}
            </div>

            <Link
              href="/formations/entreprises"
              className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 group"
            >
              Découvrir nos solutions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

              {/* Statistiques */}
              <div className="grid grid-cols-2 gap-6 text-white">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-white mb-2">700€</div>
                  <div className="text-orange-100">À partir de / stagiaire</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-orange-100">Sur mesure</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-white mb-2">3</div>
                  <div className="text-orange-100">Modalités</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-white mb-2">5</div>
                  <div className="text-orange-100">Thématiques</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section finale - CTA global */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-3xl p-12"
      >
        <h4 className="text-3xl font-bold text-gray-900 mb-6">
          Prêt à transformer votre carrière ?
        </h4>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Découvrez toutes nos formations et trouvez celle qui correspond parfaitement à vos ambitions professionnelles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/formations"
            className="inline-flex items-center gap-3 bg-primary-blue text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 group"
          >
            Voir toutes les formations
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-primary-blue border-2 border-primary-blue px-8 py-4 rounded-xl font-semibold hover:bg-primary-blue hover:text-white transition-all duration-300"
          >
            Nous contacter
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
