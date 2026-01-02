'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles, ChevronDown, Phone } from 'lucide-react'
import ModernButton from '@/components/ui/ModernButton'
import AnimatedIcon, { ParticleIcon } from '@/components/ui/AnimatedIcon'
import { getSiteSettings, getMainNavigation, getFormations } from '@/lib/strapi'

interface SiteSettings {
  id: number
  siteName: string
  contactPhone: string
  contactEmail: string
  logoData?: any
}

interface NavigationItem {
  id: number
  label: string
  url: string
  ordre: number
  icon?: string
  featured: boolean
  external: boolean
}

interface Formation {
  id: number
  title: string // Changé de 'titre' à 'title'
  slug: string
  category?: {
    name: string // Changé de 'nom' à 'name'
    slug: string
  }
}

interface FormationMenuItem {
  name: string
  href: string
}

interface FormationMenuCategory {
  category: string
  href: string
  items: FormationMenuItem[]
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showFormationsMenu, setShowFormationsMenu] = useState(false)
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showFormationsMenu && !target.closest('.formations-dropdown')) {
        setShowFormationsMenu(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showFormationsMenu])

  // Charger les données Strapi
  useEffect(() => {
    async function loadHeaderData() {
      try {
        setLoading(true)
        const [settingsData, navData, formationsData] = await Promise.all([
          getSiteSettings(),
          getMainNavigation(),
          getFormations()
        ])
        
        setSiteSettings(settingsData as SiteSettings)
        setNavigationItems(navData as NavigationItem[])
        setFormations(formationsData as Formation[])
      } catch (error) {
        console.error('Erreur chargement header:', error)
        // Fallback avec données statiques
        setSiteSettings({
          id: 1,
          siteName: 'Construction Management Academy',
          contactPhone: '01 85 09 71 06',
          contactEmail: 'contact.academy@cma-education.com'
        })
        setNavigationItems([
          { id: 1, label: 'Accueil', url: '/', ordre: 1, featured: true, external: false },
          { id: 2, label: 'À propos', url: '/about', ordre: 2, featured: true, external: false },
          { id: 3, label: 'Pédagogie', url: '/pedagogie', ordre: 3, featured: true, external: false },
          { id: 4, label: 'Admission', url: '/admission', ordre: 4, featured: true, external: false },
          { id: 5, label: 'Partenaires', url: '/partenaires', ordre: 5, featured: true, external: false }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadHeaderData()
  }, [])

  // Formations organisées par catégorie
  const formationsMenu: FormationMenuCategory[] = formations.reduce((acc: FormationMenuCategory[], formation) => {
    // Utiliser les bons noms de champs depuis Strapi
    const categoryName = formation.category?.name || 'Autres formations'
    const categorySlug = formation.category?.slug || 'autres'
    
    let category = acc.find(cat => cat.category === categoryName)
    if (!category) {
      category = {
        category: categoryName,
        href: `/formations#${categorySlug}`,
        items: []
      }
      acc.push(category)
    }
    
    category.items.push({
      name: formation.title, // Utiliser 'title' au lieu de 'titre'
      href: `/formations/${formation.slug}`
    })
    
    return acc
  }, [])

  // Fallback si pas de formations Strapi
  const fallbackFormationsMenu: FormationMenuCategory[] = [
    {
      category: 'Formation en alternance',
      href: '/formations#alternance',
      items: [
        { name: 'Chargé d\'Affaires du Bâtiment (BAC+2)', href: '/formations/alt-bac2-charge-affaires' },
        { name: 'Conducteur de Travaux Bâtiment (BAC+2)', href: '/formations/alt-bac2-conducteur-travaux' },
        { name: 'Chef de Chantier VRD (BAC+2)', href: '/formations/alt-bac2-chef-chantier-vrd' }
      ]
    },
    {
      category: 'Professionnels en reconversion',
      href: '/formations#reconversion',
      items: [
        { name: 'Chargé d\'Affaires - Reconversion', href: '/formations/rec-bac2-charge-affaires' },
        { name: 'Conducteur de Travaux - Reconversion', href: '/formations/rec-bac2-conducteur-travaux' }
      ]
    }
  ]

  const finalFormationsMenu: FormationMenuCategory[] = formationsMenu.length > 0 ? formationsMenu : fallbackFormationsMenu

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href))

  if (loading) {
    return (
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
            <div className="animate-pulse bg-gray-200 h-12 sm:h-14 w-32 sm:w-36 rounded"></div>
            <div className="hidden lg:flex space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
              ))}
            </div>
            <div className="animate-pulse bg-gray-200 h-10 w-24 rounded"></div>
          </div>
        </nav>
      </header>
    )
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-primary-blue/5' 
        : 'bg-white/80 backdrop-blur-lg'
    }`}>
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22 min-h-[56px]">
          
          {/* Logo dynamique - Ultra Responsive avec protection overflow */}
          <Link href="/" className="flex items-center group flex-shrink-0 min-w-0">
            <div className="relative overflow-hidden">
              <Image
                src="/logo.svg"
                alt={`${siteSettings?.siteName || 'Construction Management Academy'} Logo`}
                width={200}
                height={200}
                className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-18 w-auto max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px] xl:max-w-[180px] 2xl:max-w-none transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Navigation dynamique - Desktop à partir de lg */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-2 lg:mx-4 xl:mx-6 overflow-hidden">
            <div className="flex items-center space-x-0.5 lg:space-x-1 xl:space-x-2 overflow-x-auto scrollbar-hide">
              <Link
                href="/"
                className={`px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  pathname === '/'
                    ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
                    : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80'
                }`}
              >
                Accueil
              </Link>
              <Link
                href="/about"
                className={`px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  isActive('/about')
                    ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
                    : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80'
                }`}
              >
                À propos
              </Link>
              <Link
                href="/pedagogie"
                className={`px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  isActive('/pedagogie')
                    ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
                    : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80'
                }`}
              >
                Pédagogie
              </Link>
              <Link
                href="/admission"
                className={`px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  isActive('/admission')
                    ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
                    : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80'
                }`}
              >
                Admission
              </Link>
              
              {/* Formations avec dropdown dynamique - Ultra Responsive */}
              <div 
                className="relative formations-dropdown"
                onMouseEnter={() => setShowFormationsMenu(true)}
                onMouseLeave={() => setShowFormationsMenu(false)}
              >
                <button
                  onClick={() => setShowFormationsMenu(!showFormationsMenu)}
                  className={`flex items-center space-x-1 px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    isActive('/formations') || showFormationsMenu
                      ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
                      : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80'
                  }`}
                >
                  <span>Formations</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showFormationsMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Mega Menu dynamique - Ultra Responsive */}
                {showFormationsMenu && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[90vw] max-w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-[9999]">
                    <div className="p-4 lg:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        {finalFormationsMenu.map((category, idx) => (
                          <div key={idx}>
                            <Link 
                              href={category.href}
                              className="block text-primary-blue font-semibold mb-3 hover:text-blue-700 transition-colors text-sm lg:text-base"
                              onClick={() => setShowFormationsMenu(false)}
                            >
                              {category.category}
                            </Link>
                            <ul className="space-y-1 lg:space-y-2">
                              {category.items.map((subItem: FormationMenuItem, subIdx: number) => (
                                <li key={subIdx}>
                                  <Link
                                    href={subItem.href}
                                    className="block text-xs lg:text-sm text-gray-600 hover:text-primary-blue hover:bg-gray-50 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg transition-all duration-200"
                                    onClick={() => setShowFormationsMenu(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Link
                href="/partenaires"
                className={`px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  isActive('/partenaires')
                    ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
                    : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80'
                }`}
              >
                Partenaires
              </Link>
            </div>
          </div>

          {/* Actions CTA - Ultra Responsive avec protection overflow */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0 min-w-0 overflow-hidden">
            {/* Téléphone - Visible sur desktop uniquement */}
            <a 
              href="tel:0185097106" 
              className="hidden xl:flex items-center space-x-2 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all duration-200 flex-shrink-0"
            >
              <Phone className="w-3 xl:w-4 h-3 xl:h-4 flex-shrink-0" />
              <span className="hidden 2xl:inline whitespace-nowrap">01 85 09 71 06</span>
            </a>

            {/* Bouton JPO Orange - TOUJOURS VISIBLE avec tailles adaptatives */}
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <button className="px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap min-w-0">
                <span className="flex items-center gap-1 min-w-0">
                  <span className="flex-shrink-0">📅</span>
                  <span className="hidden sm:inline truncate">JPO</span>
                  <span className="hidden lg:inline truncate">Inscription</span>
                </span>
              </button>
            </a>

            {/* Bouton Candidater - Visible sur tablet+ avec tailles adaptatives */}
            <a 
              href="https://construction-management-academy.ymag.cloud/index.php/preinscription/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:inline-block flex-shrink-0"
            >
              <ModernButton
                variant="neon"
                size="sm"
                icon={
                  <ParticleIcon particleCount={6}>
                    <Sparkles className="w-3 lg:w-4 h-3 lg:h-4 flex-shrink-0" />
                  </ParticleIcon>
                }
                iconPosition="left"
                className="animate-pulse hover:animate-none text-xs lg:text-sm px-2 md:px-3 lg:px-4 py-1.5 lg:py-2 min-w-0"
              >
                <span className="hidden lg:inline truncate">Candidater</span>
                <span className="lg:hidden truncate">Postuler</span>
              </ModernButton>
            </a>

            {/* Menu mobile - Visible sur mobile/tablet */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-colors duration-200 flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <AnimatedIcon variant="morph" size="sm">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </AnimatedIcon>
            </button>
          </div>
        </div>

        {/* Menu mobile glassmorphism - Ultra Responsive */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100/50 shadow-xl max-h-[70vh] overflow-y-auto">
            
            {/* Navigation principale mobile */}
            <div className="space-y-1">
              <Link
                href="/"
                className={`block px-4 sm:px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                  pathname === '/' ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Accueil
              </Link>
              <Link
                href="/about"
                className={`block px-4 sm:px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                  isActive('/about') ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                ℹ️ À propos
              </Link>
              <Link
                href="/pedagogie"
                className={`block px-4 sm:px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                  isActive('/pedagogie') ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                🎓 Pédagogie
              </Link>
              <Link
                href="/admission"
                className={`block px-4 sm:px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                  isActive('/admission') ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                📝 Admission
              </Link>
              
              <Link
                href="/formations"
                className={`block px-4 sm:px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                  isActive('/formations') ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                📚 Formations
              </Link>
              
              {/* Sous-menu formations mobile */}
              <div className="pl-6 sm:pl-8 pb-2 space-y-1">
                {finalFormationsMenu.map((category, idx) => (
                  <Link
                    key={idx}
                    href={category.href}
                    className="block px-3 py-2 text-xs font-medium text-primary-blue hover:bg-primary-blue/5 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    • {category.category}
                  </Link>
                ))}
              </div>
              
              <Link
                href="/partenaires"
                className={`block px-4 sm:px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                  isActive('/partenaires') ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                🤝 Partenaires
              </Link>
            </div>

            {/* Actions mobiles */}
            <div className="mt-6 pt-4 px-4 sm:px-6 space-y-3 border-t border-gray-200/50">
              {/* Téléphone mobile */}
              <a 
                href="tel:0185097106" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                <span className="text-base font-medium">01 85 09 71 06</span>
              </a>
              
              {/* Bouton JPO mobile */}
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full"
              >
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  📅 <span>Inscription JPO</span>
                </button>
              </a>
              
              {/* Bouton Candidater mobile */}
              <a 
                href="https://construction-management-academy.ymag.cloud/index.php/preinscription/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full"
              >
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Sparkles className="w-5 h-5" />
                  <span>Candidater</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header