'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Calendar, ChevronDown, GraduationCap, Building, Users, Award, Clock, RefreshCw } from 'lucide-react'
import OptimizedButton from '@/components/ui/OptimizedButton'
import { getFormations } from '@/lib/strapi'

interface FormationItem {
  id?: number
  title: string
  slug: string
  level: string
  duree: string
  category?: string
}

interface FormationCategory {
  category: string
  categorySlug: string
  icon: React.ComponentType<any>
  color: string
  formations: FormationItem[]
}

// Données de fallback si Strapi n'est pas disponible
const FALLBACK_FORMATIONS: FormationCategory[] = [
  {
    category: 'Alternance',
    categorySlug: 'alternance',
    icon: GraduationCap,
    color: 'from-primary-blue to-blue-600',
    formations: [
      { title: 'Chargé d\'Affaires Bâtiment', slug: 'charge-affaires-batiment', level: 'Bac+2', duree: '1 an', category: 'Alternance' },
      { title: 'Conducteur de Travaux Bâtiment', slug: 'conducteur-travaux-batiment', level: 'Bac+2', duree: '1 an', category: 'Alternance' },
      { title: 'Chef de Chantier VRD', slug: 'chef-chantier-vrd', level: 'Bac+2', duree: '1 an', category: 'Alternance' },
      { title: 'Conducteur de Travaux TP', slug: 'conducteur-travaux-tp-alternance', level: 'Bac+2', duree: '1 an', category: 'Alternance' },
      { title: 'Chef de Projets BTP', slug: 'chef-projets-btp-1an', level: 'Bac+5', duree: '1 an', category: 'Alternance' }
    ]
  },
  {
    category: 'Reconversion',
    categorySlug: 'reconversion',
    icon: RefreshCw,
    color: 'from-green-600 to-emerald-600',
    formations: [
      { title: 'Chargé d\'Affaires - Reconversion', slug: 'reconversion-btp/charge-affaires', level: 'Bac+2', duree: '7 mois', category: 'Reconversion' },
      { title: 'Conducteur de Travaux - Reconversion', slug: 'reconversion-btp/conducteur-travaux', level: 'Bac+2', duree: '7 mois', category: 'Reconversion' },
      { title: 'Conducteur TP - Reconversion', slug: 'reconversion-btp/conducteur-travaux-publics', level: 'Bac+2', duree: '7 mois', category: 'Reconversion' }
    ]
  }
]

const UnifiedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showFormationsMenu, setShowFormationsMenu] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [formationsData, setFormationsData] = useState<FormationCategory[]>(FALLBACK_FORMATIONS)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
    
    // Charger les formations depuis Strapi
    async function loadFormations() {
      try {
        const data = await getFormations()
        if (data && Array.isArray(data) && data.length > 0) {
          // Filtrer et organiser par catégorie
          const alternance = (data as any[]).filter((f) => 
            f.category?.slug === 'alternance' || f.category?.slug === 'alternance-btp'
          ).map((f) => ({
            id: f.id,
            title: f.title || f.titre,
            slug: f.slug,
            level: f.level || f.niveau || 'Bac+2',
            duree: f.duree || f.duration || '1 an',
            category: 'Alternance'
          }))
          
          const reconversion = (data as any[]).filter((f) => 
            f.category?.slug === 'reconversion' || f.category?.slug === 'reconversion-btp'
          ).map((f) => ({
            id: f.id,
            title: f.title || f.titre,
            slug: f.slug,
            level: f.level || f.niveau || 'Bac+2',
            duree: f.duree || f.duration || '7 mois',
            category: 'Reconversion'
          }))
          
          // Mettre à jour si on a des données
          if (alternance.length > 0 || reconversion.length > 0) {
            const newData: FormationCategory[] = []
            
            if (alternance.length > 0) {
              newData.push({
                category: 'Alternance',
                categorySlug: 'alternance',
                icon: GraduationCap,
                color: 'from-primary-blue to-blue-600',
                formations: alternance
              })
            } else {
              newData.push(FALLBACK_FORMATIONS[0])
            }
            
            if (reconversion.length > 0) {
              newData.push({
                category: 'Reconversion',
                categorySlug: 'reconversion',
                icon: RefreshCw,
                color: 'from-green-600 to-emerald-600',
                formations: reconversion
              })
            } else {
              newData.push(FALLBACK_FORMATIONS[1])
            }
            
            setFormationsData(newData)
          }
        }
      } catch (error) {
        console.log('Header: Utilisation des données de fallback')
      }
    }
    
    loadFormations()
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showFormationsMenu && !target.closest('.formations-dropdown-unified')) {
        setShowFormationsMenu(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
      if (hoverTimeout) clearTimeout(hoverTimeout)
    }
  }, [showFormationsMenu, hoverTimeout])

  const handleCandidater = () => {
    window.open('https://construction-management-academy.ymag.cloud/index.php/preinscription/', '_blank')
  }

  const handleFormationsMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setShowFormationsMenu(true)
  }

  const handleFormationsMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowFormationsMenu(false)
    }, 200)
    setHoverTimeout(timeout)
  }

  const navigation = [
    { name: 'Nos formateurs', href: '/formateurs', icon: '👨‍🏫' },
    { name: 'Nos Partenaires', href: '/partenaires', icon: '🤝' },
    { name: 'Blog', href: '/blog', icon: '📝' },
    { name: 'Pédagogie', href: '/pedagogie', icon: '🎓' },
    { name: 'Admission', href: '/admission', icon: '📋' },
    { name: 'À propos', href: '/about', icon: 'ℹ️' }
  ]

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          
          {/* LOGO - Ultra Responsive */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center">
              <div className="relative transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/logoo.svg"
                  alt="Construction Management Academy"
                  width={200}
                  height={60}
                  className="h-10 sm:h-12 lg:h-14 xl:h-16 w-auto max-w-[120px] sm:max-w-[140px] lg:max-w-[160px] xl:max-w-[180px]"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* NAVIGATION DESKTOP - Visible à partir de lg */}
          <nav className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-4">
            <div className="flex items-center space-x-1 xl:space-x-2">
              
              {/* DROPDOWN FORMATIONS - TOUJOURS VISIBLE */}
              <div 
                className="relative formations-dropdown-unified"
                onMouseEnter={handleFormationsMouseEnter}
                onMouseLeave={handleFormationsMouseLeave}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActive('/formations') || showFormationsMenu
                      ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
                      : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                  }`}
                  aria-expanded={showFormationsMenu}
                  aria-haspopup="true"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Formations</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFormationsMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* MEGA DROPDOWN - DESIGN EXPERT */}
                {showFormationsMenu && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[650px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 z-[9999] overflow-hidden backdrop-blur-sm"
                    onMouseEnter={handleFormationsMouseEnter}
                    onMouseLeave={handleFormationsMouseLeave}
                    style={{ 
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
                    }}
                  >
                    {/* Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">Nos Formations</h3>
                      <p className="text-sm text-gray-500">Alternance & Reconversion professionnelle</p>
                    </div>

                    {/* Onglets - Seulement Alternance et Reconversion */}
                    <div className="flex border-b border-gray-100 bg-gray-50 overflow-x-auto">
                      {formationsData.map((category, index) => {
                        const IconComponent = category.icon
                        return (
                          <button
                            key={index}
                            onMouseEnter={() => {
                              handleFormationsMouseEnter()
                              setActiveTab(index)
                            }}
                            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                              activeTab === index 
                                ? `text-white bg-gradient-to-r ${category.color} shadow-sm` 
                                : 'text-gray-600 hover:text-primary-blue hover:bg-gray-100'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span>{category.category}</span>
                            <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                              activeTab === index 
                                ? 'bg-white/20 text-white' 
                                : 'bg-gray-200 text-gray-500'
                            }`}>
                              {category.formations.length}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Contenu - Formations avec détails */}
                    <div className="p-4 max-h-[55vh] overflow-y-auto">
                      <div className="grid grid-cols-1 gap-2">
                        {formationsData[activeTab]?.formations.map((formation, idx) => (
                          <Link
                            key={idx}
                            href={`/formations/${formation.slug}`}
                            className="block p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 group border border-transparent hover:border-blue-200 hover:shadow-md"
                            onClick={() => setShowFormationsMenu(false)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                {/* Titre de la formation */}
                                <div className="font-semibold text-gray-900 group-hover:text-primary-blue text-base mb-2">
                                  {formation.title}
                                </div>
                                
                                {/* Détails: Niveau, Durée, Catégorie */}
                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                  {/* Niveau */}
                                  <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                    <Award className="w-3 h-3 mr-1" />
                                    {formation.level}
                                  </span>
                                  
                                  {/* Durée */}
                                  <span className="inline-flex items-center px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {formation.duree}
                                  </span>
                                  
                                  {/* Catégorie */}
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                    formation.category === 'Alternance' 
                                      ? 'bg-primary-blue/10 text-primary-blue' 
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}>
                                    {formation.category === 'Alternance' ? (
                                      <GraduationCap className="w-3 h-3 mr-1" />
                                    ) : (
                                      <RefreshCw className="w-3 h-3 mr-1" />
                                    )}
                                    {formation.category}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Flèche */}
                              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {/* Footer avec boutons VAE, Entreprises, Contact */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                      <div className="flex justify-between items-center">
                        <Link
                          href="/formations"
                          className="inline-flex items-center space-x-2 text-sm text-primary-blue hover:text-primary-yellow font-semibold transition-colors group"
                          onClick={() => setShowFormationsMenu(false)}
                        >
                          <span>Voir toutes les formations</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <div className="flex gap-2">
                          <Link
                            href="/formations/vae-btp"
                            className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition-colors flex items-center gap-1"
                            onClick={() => setShowFormationsMenu(false)}
                          >
                            <Award className="w-3 h-3" />
                            VAE
                          </Link>
                          <Link
                            href="/formations/entreprises"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors flex items-center gap-1"
                            onClick={() => setShowFormationsMenu(false)}
                          >
                            <Building className="w-3 h-3" />
                            Entreprises
                          </Link>
                          <Link
                            href="/contact"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                            onClick={() => setShowFormationsMenu(false)}
                          >
                            Contact
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* AUTRES LIENS NAVIGATION */}
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                      active 
                        ? 'text-primary-blue bg-primary-blue/10 shadow-sm' 
                        : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                    }`}
                  >
                    <span className="hidden xl:inline">{item.name}</span>
                    <span className="xl:hidden">{item.icon}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* ACTIONS CTA - Ultra Responsive */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Téléphone - Desktop uniquement */}
            <a 
              href="tel:0185097106" 
              className="hidden xl:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden 2xl:inline">01 85 09 71 06</span>
            </a>

            {/* Bouton JPO - TOUJOURS VISIBLE */}
            {isMounted && (
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <button className="flex items-center space-x-1 px-2 sm:px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span className="hidden sm:inline lg:hidden">JPO</span>
                  <span className="hidden lg:inline">Inscription JPO</span>
                </button>
              </a>
            )}

            {/* Bouton Candidater - Visible sur tablet+ */}
            <OptimizedButton 
              variant="gradient" 
              size="sm" 
              className="hidden md:flex shadow-md hover:shadow-lg flex-shrink-0 text-xs lg:text-sm px-2 lg:px-4 py-2"
              onClick={handleCandidater}
            >
              <span className="hidden lg:inline">CANDIDATER</span>
              <span className="lg:hidden">✨</span>
            </OptimizedButton>

            {/* Menu mobile - Visible sur mobile/tablet */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MENU MOBILE - Design moderne */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-3 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-xl z-[9998] overflow-hidden">
            <div className="py-4 max-h-[70vh] overflow-y-auto">
              
              {/* Navigation principale mobile */}
              <div className="space-y-1 px-4">
                <Link
                  href="/formations"
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive('/formations')
                      ? 'text-primary-blue bg-primary-blue/10' 
                      : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">📚</span>
                  <span>Formations</span>
                </Link>
                
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        active 
                          ? 'text-primary-blue bg-primary-blue/10' 
                          : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Actions mobiles */}
              <div className="mt-6 pt-4 px-4 space-y-3 border-t border-gray-200">
                {/* Téléphone mobile */}
                <a 
                  href="tel:0185097106" 
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">01 85 09 71 06</span>
                </a>
                
                {/* Bouton JPO mobile */}
                {isMounted && (
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full"
                  >
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl shadow-md transition-all duration-200">
                      <Calendar className="w-5 h-5" />
                      <span>Inscription JPO</span>
                    </button>
                  </a>
                )}
                
                {/* Bouton Candidater mobile */}
                <OptimizedButton 
                  variant="gradient" 
                  size="md" 
                  className="w-full font-semibold py-3"
                  onClick={() => {
                    handleCandidater()
                    setIsMenuOpen(false)
                  }}
                >
                  CANDIDATER
                </OptimizedButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default UnifiedHeader