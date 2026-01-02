'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GallerySection from '@/components/sections/GallerySection'
import { getPagePedagogie, getStrapiMediaURL } from '@/lib/strapi'
import { 
  BookOpen, Users, Target, Award, CheckCircle, ArrowRight, 
  Lightbulb, Cog, Heart, Star, Clock, TrendingUp 
} from 'lucide-react'
import Link from 'next/link'

// Types pour le Single Type Page Pédagogie
interface ChiffreCle {
  id?: number
  valeur: string
  label: string
  icon?: string
  ordre: number
}

interface ValeurPedagogique {
  id?: number
  titre: string
  description: string
  icon?: string
  ordre: number
}

interface MethodePedagogique {
  id?: number
  nom: string
  description: string
  icon?: string
  couleur?: string
  ordre: number
}

interface OutilPedagogique {
  id?: number
  nom: string
  description?: string
  ordre: number
}

interface EnvironnementItem {
  id?: number
  texte: string
  icon?: string
  ordre: number
}

interface PagePedagogieData {
  heroTitle: string
  heroDescription: string
  heroImage: string | null
  chiffresCles: ChiffreCle[]
  valeursPedagogiques: ValeurPedagogique[]
  methodesPedagogiques: MethodePedagogique[]
  outilsPedagogiques: OutilPedagogique[]
  environnementTitle: string
  environnementItems: EnvironnementItem[]
  ctaTitle: string
  ctaDescription: string
  ctaPrimaryButtonText: string
  ctaPrimaryButtonLink: string
  ctaSecondaryButtonText: string
  ctaSecondaryButtonLink: string
}

// Image par défaut (fallback)
const DEFAULT_HERO_IMAGE = '/images/pedagogie-hero.jpg'

// Données par défaut (fallback)
const defaultData: PagePedagogieData = {
  heroTitle: "Notre Pédagogie d'Excellence",
  heroDescription: "Une approche innovante qui allie théorie et pratique pour former les professionnels BTP de demain",
  heroImage: DEFAULT_HERO_IMAGE,
  chiffresCles: [
    { valeur: "95%", label: "Taux de réussite", icon: "Award", ordre: 1 },
    { valeur: "20", label: "Étudiants max par classe", icon: "Users", ordre: 2 },
    { valeur: "70%", label: "Pratique terrain", icon: "Cog", ordre: 3 },
    { valeur: "15+", label: "Années d'expérience", icon: "Star", ordre: 4 }
  ],
  valeursPedagogiques: [
    { titre: "Pédagogie par projet", description: "Apprentissage concret à travers des projets réels d'entreprises partenaires", icon: "Target", ordre: 1 },
    { titre: "Accompagnement personnalisé", description: "Suivi individuel avec un formateur référent tout au long du parcours", icon: "Users", ordre: 2 },
    { titre: "Innovation pédagogique", description: "Outils digitaux, réalité virtuelle et méthodes actives d'apprentissage", icon: "Lightbulb", ordre: 3 },
    { titre: "Lien entreprise permanent", description: "Immersion en entreprise et projets collaboratifs avec nos partenaires", icon: "Cog", ordre: 4 }
  ],
  methodesPedagogiques: [
    { nom: "Apprentissage par l'action", description: "70% de pratique, 30% de théorie pour un apprentissage efficace", icon: "Cog", couleur: "from-blue-500 to-blue-600", ordre: 1 },
    { nom: "Pédagogie collaborative", description: "Travail en équipe et projets collectifs pour développer les soft skills", icon: "Users", couleur: "from-green-500 to-green-600", ordre: 2 },
    { nom: "Mentorat professionnel", description: "Accompagnement par des professionnels expérimentés du secteur", icon: "Heart", couleur: "from-purple-500 to-purple-600", ordre: 3 },
    { nom: "Innovation technologique", description: "Intégration des dernières technologies BTP et outils digitaux", icon: "Lightbulb", couleur: "from-orange-500 to-orange-600", ordre: 4 }
  ],
  outilsPedagogiques: [
    { nom: "Plateforme e-learning dédiée", ordre: 1 },
    { nom: "Simulateurs de chantier BTP", ordre: 2 },
    { nom: "Logiciels professionnels (AutoCAD, Revit, MS Project)", ordre: 3 },
    { nom: "Réalité virtuelle pour la sécurité", ordre: 4 },
    { nom: "Études de cas d'entreprises réelles", ordre: 5 },
    { nom: "Projets collaboratifs inter-promotions", ordre: 6 }
  ],
  environnementTitle: "Environnement d'Apprentissage",
  environnementItems: [
    { texte: "Salles équipées dernière génération", icon: "Clock", ordre: 1 },
    { texte: "Laboratoires de simulation BTP", icon: "TrendingUp", ordre: 2 },
    { texte: "Espaces de travail collaboratif", icon: "Users", ordre: 3 },
    { texte: "Bibliothèque technique spécialisée", icon: "BookOpen", ordre: 4 }
  ],
  ctaTitle: "Prêt à Rejoindre Notre École d'Excellence ?",
  ctaDescription: "Découvrez comment notre pédagogie innovante peut transformer votre carrière dans le BTP.",
  ctaPrimaryButtonText: "Voir nos formations",
  ctaPrimaryButtonLink: "/formations",
  ctaSecondaryButtonText: "Nous contacter",
  ctaSecondaryButtonLink: "/contact"
}

export default function PedagogiePage() {
  const [pageData, setPageData] = useState<PagePedagogieData>(defaultData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPedagogieData() {
      try {
        const strapiData = await getPagePedagogie()
        console.log('📦 Données Strapi Pédagogie:', strapiData)
        
        if (strapiData) {
          // Récupérer l'URL de l'image hero depuis Strapi
          let heroImageUrl = DEFAULT_HERO_IMAGE
          const heroImageData = strapiData.heroImage
          
          console.log('🖼️ heroImage data:', heroImageData)
          
          if (heroImageData) {
            // Essayer getStrapiMediaURL d'abord
            const strapiImageUrl = getStrapiMediaURL(heroImageData)
            console.log('🔗 getStrapiMediaURL result:', strapiImageUrl)
            
            if (strapiImageUrl) {
              heroImageUrl = strapiImageUrl
            } else if (heroImageData.data?.attributes?.url) {
              // Fallback: construire l'URL manuellement
              const url = heroImageData.data.attributes.url
              heroImageUrl = url.startsWith('http') 
                ? url 
                : `https://cma-education-strapi-production.up.railway.app${url}`
              console.log('🔗 URL construite manuellement:', heroImageUrl)
            }
            
            console.log('✅ Image Pédagogie finale:', heroImageUrl)
          }
          
          // Fusionner les données Strapi avec les valeurs par défaut
          setPageData({
            heroTitle: strapiData.heroTitle || defaultData.heroTitle,
            heroDescription: strapiData.heroDescription || defaultData.heroDescription,
            heroImage: heroImageUrl,
            chiffresCles: strapiData.chiffresCles?.length > 0 ? strapiData.chiffresCles : defaultData.chiffresCles,
            valeursPedagogiques: strapiData.valeursPedagogiques?.length > 0 ? strapiData.valeursPedagogiques : defaultData.valeursPedagogiques,
            methodesPedagogiques: strapiData.methodesPedagogiques?.length > 0 ? strapiData.methodesPedagogiques : defaultData.methodesPedagogiques,
            outilsPedagogiques: strapiData.outilsPedagogiques?.length > 0 ? strapiData.outilsPedagogiques : defaultData.outilsPedagogiques,
            environnementTitle: strapiData.environnementTitle || defaultData.environnementTitle,
            environnementItems: strapiData.environnementItems?.length > 0 ? strapiData.environnementItems : defaultData.environnementItems,
            ctaTitle: strapiData.ctaTitle || defaultData.ctaTitle,
            ctaDescription: strapiData.ctaDescription || defaultData.ctaDescription,
            ctaPrimaryButtonText: strapiData.ctaPrimaryButtonText || defaultData.ctaPrimaryButtonText,
            ctaPrimaryButtonLink: strapiData.ctaPrimaryButtonLink || defaultData.ctaPrimaryButtonLink,
            ctaSecondaryButtonText: strapiData.ctaSecondaryButtonText || defaultData.ctaSecondaryButtonText,
            ctaSecondaryButtonLink: strapiData.ctaSecondaryButtonLink || defaultData.ctaSecondaryButtonLink
          })
        }
      } catch (error) {
        console.error('Erreur chargement pédagogie:', error)
        // Utiliser les données par défaut en cas d'erreur
      } finally {
        setLoading(false)
      }
    }

    loadPedagogieData()
  }, [])

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-8 h-8" />
      case 'Users': return <Users className="w-8 h-8" />
      case 'Lightbulb': return <Lightbulb className="w-8 h-8" />
      case 'Cog': return <Cog className="w-8 h-8" />
      case 'Heart': return <Heart className="w-8 h-8" />
      case 'Award': return <Award className="w-6 h-6" />
      case 'Star': return <Star className="w-6 h-6" />
      default: return <BookOpen className="w-8 h-8" />
    }
  }

  const getIconSmall = (iconName?: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6" />
      case 'Users': return <Users className="w-6 h-6" />
      case 'Cog': return <Cog className="w-6 h-6" />
      case 'Star': return <Star className="w-6 h-6" />
      case 'Clock': return <Clock className="w-5 h-5" />
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />
      case 'BookOpen': return <BookOpen className="w-5 h-5" />
      default: return <BookOpen className="w-6 h-6" />
    }
  }

  if (loading) {
    return (
      <>
        <div className="py-20 text-center">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-16 w-96 mx-auto rounded mb-4"></div>
            <div className="bg-gray-200 h-6 w-2/3 mx-auto rounded"></div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-blue via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${pageData.heroImage || DEFAULT_HERO_IMAGE}')` }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <BookOpen className="w-6 h-6" />
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                Pédagogie d&apos;Excellence
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              {pageData.heroTitle}
            </h1>
            
            <p className="text-xl opacity-90 mb-8">
              {pageData.heroDescription}
            </p>
            
            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {pageData.chiffresCles.sort((a, b) => a.ordre - b.ordre).map((chiffre, index) => (
                <motion.div
                  key={chiffre.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <div className="text-primary-yellow mb-2">{getIconSmall(chiffre.icon)}</div>
                  <div className="text-2xl font-bold text-primary-yellow">{chiffre.valeur}</div>
                  <div className="text-sm opacity-90">{chiffre.label}</div>
                </motion.div>
              ))}
            </div>
            
            <Link 
              href="/formations"
              className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center"
            >
              Découvrir nos formations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Valeurs pédagogiques */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-blue mb-4">
              Nos Valeurs Pédagogiques
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une pédagogie centrée sur l&apos;apprenant et orientée vers l&apos;employabilité
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pageData.valeursPedagogiques.sort((a, b) => a.ordre - b.ordre).map((valeur, index) => (
              <motion.div
                key={valeur.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                  {getIcon(valeur.icon)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{valeur.titre}</h3>
                <p className="text-sm text-gray-600">{valeur.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthodes pédagogiques */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-blue mb-4">
              Nos Méthodes Pédagogiques
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des approches innovantes pour un apprentissage efficace et durable
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {pageData.methodesPedagogiques.sort((a, b) => a.ordre - b.ordre).map((methode, index) => (
              <motion.div
                key={methode.id || index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${methode.couleur || 'from-blue-500 to-blue-600'} rounded-xl flex items-center justify-center text-white mb-6`}>
                  {getIcon(methode.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{methode.nom}</h3>
                <p className="text-gray-600">{methode.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outils pédagogiques */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary-blue mb-6">
                Outils et Technologies Pédagogiques
              </h2>
              <p className="text-gray-600 mb-8">
                Nous utilisons les dernières technologies pour offrir une expérience d&apos;apprentissage 
                moderne et immersive, préparant nos étudiants aux réalités du terrain.
              </p>
              
              <div className="space-y-4">
                {pageData.outilsPedagogiques.sort((a, b) => a.ordre - b.ordre).map((outil, index) => (
                  <motion.div
                    key={outil.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary-blue flex-shrink-0" />
                    <span className="text-gray-700">{outil.nom}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-blue to-indigo-600 text-white p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">{pageData.environnementTitle}</h3>
              <div className="space-y-4">
                {pageData.environnementItems.sort((a, b) => a.ordre - b.ordre).map((item, index) => (
                  <div key={item.id || index} className="flex items-center space-x-3">
                    <span className="text-primary-yellow">{getIconSmall(item.icon)}</span>
                    <span>{item.texte}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-90">
                  &quot;Un environnement d&apos;apprentissage optimal pour développer les compétences 
                  techniques et humaines essentielles au secteur BTP.&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Galerie pédagogie */}
      <GallerySection 
        page="pedagogie" 
        title="Notre Pédagogie en Images"
        description="Découvrez nos méthodes d'enseignement et nos espaces de formation"
        maxGalleries={2}
      />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-blue to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-montserrat font-bold mb-6">
              {pageData.ctaTitle}
            </h2>
            <p className="text-xl opacity-90 mb-8">
              {pageData.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={pageData.ctaPrimaryButtonLink}
                className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center"
              >
                {pageData.ctaPrimaryButtonText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                href={pageData.ctaSecondaryButtonLink}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary-blue transition-colors"
              >
                {pageData.ctaSecondaryButtonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
