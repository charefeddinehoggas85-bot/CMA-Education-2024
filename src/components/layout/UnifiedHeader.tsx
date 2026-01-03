'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Calendar, ChevronDown, GraduationCap, Award, Clock, RefreshCw } from 'lucide-react'
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
    window.open('https://cma-education.ymag.cloud/index.php/preinscription/', '_blank')
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
    { name: 'Nos formateurs', href: '/formateurs', shortName: 'Formateurs' },
    { name: 'Nos Partenaires', href: '/partenaires', shortName: 'Partenaires' },
    { name: 'Blog', href: '/blog', shortName: 'Blog' },
    { name: 'Pédagogie', href: '/pedagogie', shortName: 'Pédagogie' },
    { name: 'Admission', href: '/admission', shortName: 'Admission' },
    { name: 'À propos', href: '/about', shortName: 'À propos' }
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
          
          {/* LOGO - Ultra Responsive - Agrandi */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center">
              <div className="relative transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/logoo.svg"
                  alt="Construction Management Academy"
                  width={240}
                  height={72}
                  className="h-12 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-[140px] sm:max-w-[160px] lg:max-w-[200px] xl:max-w-[220px]"
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

                {/* MEGA DROPDOWN - RESPONSIVE DESIGN */}
                {showFormationsMenu && (
                  <div 
                    className="absolute top-full mt-1 
                               left-0 lg:left-auto lg:right-auto
                               w-[320px] sm:w-[380px] lg:w-[420px] xl:w-[480px]
                               bg-white rounded-lg lg:rounded-xl shadow-lg lg:shadow-xl border border-gray-100 z-[9999] overflow-hidden"
                    style={{ 
                      // Empêcher le dropdown de sortir de l'écran à gauche
                      maxWidth: 'calc(100vw - 24px)',
                    }}
                    onMouseEnter={handleFormationsMouseEnter}
                    onMouseLeave={handleFormationsMouseLeave}
                  >
                    {/* Onglets responsive */}
                    <div className="flex border-b border-gray-100 bg-gray-50">
                      {formationsData.map((category, index) => {
                        const IconComponent = category.icon
                        return (
                          <button
                            key={index}
                            onMouseEnter={() => {
                              handleFormationsMouseEnter()
                              setActiveTab(index)
                            }}
                            onClick={() => setActiveTab(index)}
                            className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-medium transition-all duration-200 ${
                              activeTab === index 
                                ? `text-white bg-gradient-to-r ${category.color}` 
                                : 'text-gray-600 hover:text-primary-blue hover:bg-gray-100'
                            }`}
                          >
                            <IconComponent className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                            <span className="truncate">{category.category}</span>
                            <span className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full ${
                              activeTab === index ? 'bg-white/20' : 'bg-gray-200 text-gray-500'
                            }`}>
                              {category.formations.length}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Liste formations responsive */}
                    <div className="p-1.5 sm:p-2 max-h-[40vh] sm:max-h-[45vh] overflow-y-auto">
                      {formationsData[activeTab]?.formations.map((formation, idx) => (
                        <Link
                          key={idx}
                          href={`/formations/${formation.slug}`}
                          className="block px-2 sm:px-3 py-1.5 sm:py-2 rounded-md lg:rounded-lg hover:bg-blue-50 transition-all duration-150 group"
                          onClick={() => setShowFormationsMenu(false)}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-800 group-hover:text-primary-blue text-xs sm:text-sm truncate">
                                {formation.title}
                              </div>
                              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
                                <span className="inline-flex items-center px-1 sm:px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[9px] sm:text-[10px] font-medium">
                                  <Award className="w-2 sm:w-2.5 h-2 sm:h-2.5 mr-0.5" />
                                  {formation.level}
                                </span>
                                <span className="inline-flex items-center px-1 sm:px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[9px] sm:text-[10px] font-medium">
                                  <Clock className="w-2 sm:w-2.5 h-2 sm:h-2.5 mr-0.5" />
                                  {formation.duree}
                                </span>
                              </div>
                            </div>
                            <svg className="w-3 sm:w-4 h-3 sm:h-4 text-gray-300 group-hover:text-primary-blue transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Footer responsive */}
                    <div className="px-2 sm:px-3 py-1.5 sm:py-2 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-0">
                      <Link
                        href="/formations"
                        className="text-[10px] sm:text-xs text-primary-blue hover:underline font-medium"
                        onClick={() => setShowFormationsMenu(false)}
                      >
                        Toutes les formations →
                      </Link>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        <Link
                          href="/formations/vae-btp"
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-purple-100 text-purple-700 rounded text-[9px] sm:text-[10px] font-medium hover:bg-purple-200 transition-colors"
                          onClick={() => setShowFormationsMenu(false)}
                        >
                          VAE
                        </Link>
                        <Link
                          href="/formations/entreprises"
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-orange-100 text-orange-700 rounded text-[9px] sm:text-[10px] font-medium hover:bg-orange-200 transition-colors"
                          onClick={() => setShowFormationsMenu(false)}
                        >
                          Entreprises
                        </Link>
                        <Link
                          href="/contact"
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-700 rounded text-[9px] sm:text-[10px] font-medium hover:bg-green-200 transition-colors"
                          onClick={() => setShowFormationsMenu(false)}
                        >
                          Contact
                        </Link>
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
                    <span className="xl:hidden">{item.shortName}</span>
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
                  <GraduationCap className="w-5 h-5" />
                  <span>Formations</span>
                </Link>
                
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        active 
                          ? 'text-primary-blue bg-primary-blue/10' 
                          : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
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