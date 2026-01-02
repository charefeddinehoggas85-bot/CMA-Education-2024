'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Calendar, ChevronDown, GraduationCap, Building, Users, Award } from 'lucide-react'
import OptimizedButton from '@/components/ui/OptimizedButton'

interface FormationItem {
  title: string
  slug: string
  level: string
  duree: string
}

interface FormationCategory {
  category: string
  icon: React.ComponentType<any>
  formations: FormationItem[]
}

// DONNÉES FORMATIONS GARANTIES - TOUJOURS AFFICHÉES
const FORMATIONS_DATA: FormationCategory[] = [
  {
    category: 'Alternance',
    icon: GraduationCap,
    formations: [
      { title: 'Chargé d\'Affaires Bâtiment', slug: 'charge-affaires-batiment', level: 'Bac+2', duree: '1 an' },
      { title: 'Conducteur de Travaux Bâtiment', slug: 'conducteur-travaux-batiment', level: 'Bac+2', duree: '1 an' },
      { title: 'Chef de Chantier VRD', slug: 'chef-chantier-vrd', level: 'Bac+2', duree: '1 an' },
      { title: 'Conducteur de Travaux TP', slug: 'conducteur-travaux-tp-alternance', level: 'Bac+2', duree: '1 an' },
      { title: 'Chef de Projets BTP', slug: 'chef-projets-btp-1an', level: 'Bac+5', duree: '1 an' }
    ]
  },
  {
    category: 'Reconversion',
    icon: Users,
    formations: [
      { title: 'Chargé d\'Affaires - Reconversion', slug: 'reconversion-btp/charge-affaires', level: 'Bac+2', duree: '7 mois' },
      { title: 'Conducteur de Travaux - Reconversion', slug: 'reconversion-btp/conducteur-travaux', level: 'Bac+2', duree: '7 mois' },
      { title: 'Conducteur TP - Reconversion', slug: 'reconversion-btp/conducteur-travaux-publics', level: 'Bac+2', duree: '7 mois' }
    ]
  },
  {
    category: 'VAE',
    icon: Award,
    formations: [
      { title: 'VAE Conducteur de Travaux', slug: 'vae-btp/conducteur-travaux', level: 'Validation', duree: '6-12 mois' },
      { title: 'VAE Chargé d\'Affaires', slug: 'vae-btp/charge-affaires', level: 'Validation', duree: '6-12 mois' }
    ]
  },
  {
    category: 'Entreprises',
    icon: Building,
    formations: [
      { title: 'Formation sur mesure', slug: 'entreprises', level: 'Pro', duree: 'Variable' },
      { title: 'Accompagnement équipes', slug: 'entreprises#accompagnement', level: 'Pro', duree: 'Variable' }
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
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
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
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 z-[9999] overflow-hidden backdrop-blur-sm"
                    onMouseEnter={handleFormationsMouseEnter}
                    onMouseLeave={handleFormationsMouseLeave}
                    style={{ 
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
                    }}
                  >
                    {/* Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">Nos Formations</h3>
                    </div>

                    {/* Onglets */}
                    <div className="flex border-b border-gray-100 bg-gray-50 overflow-x-auto">
                      {FORMATIONS_DATA.map((category, index) => {
                        const IconComponent = category.icon
                        return (
                          <button
                            key={index}
                            onMouseEnter={() => {
                              handleFormationsMouseEnter()
                              setActiveTab(index)
                            }}
                            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                              activeTab === index 
                                ? 'text-primary-blue border-b-2 border-primary-blue bg-white shadow-sm' 
                                : 'text-gray-600 hover:text-primary-blue hover:bg-gray-100'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span>{category.category}</span>
                            <span className="ml-1 text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full">
                              {category.formations.length}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Contenu */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                      <div className="grid grid-cols-1 gap-3">
                        {FORMATIONS_DATA[activeTab].formations.map((formation, idx) => (
                          <Link
                            key={idx}
                            href={`/formations/${formation.slug}`}
                            className="block p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 group border border-transparent hover:border-blue-200 hover:shadow-md"
                            onClick={() => setShowFormationsMenu(false)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 group-hover:text-primary-blue text-base mb-2">
                                  {formation.title}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                  <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                    {formation.level}
                                  </span>
                                  <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {formation.duree}
                                  </span>
                                </div>
                              </div>
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
                    
                    {/* Footer */}
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
                            href="/formations/entreprises"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors"
                            onClick={() => setShowFormationsMenu(false)}
                          >
                            Entreprises
                          </Link>
                          <Link
                            href="/formations/vae-btp"
                            className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition-colors"
                            onClick={() => setShowFormationsMenu(false)}
                          >
                            VAE
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