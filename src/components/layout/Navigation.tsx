'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Calendar } from 'lucide-react'
import OptimizedButton from '@/components/ui/OptimizedButton'
import FormationsDropdown from '@/components/ui/FormationsDropdown'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleCandidater = () => {
    window.open('https://construction-management-academy.ymag.cloud/index.php/preinscription/', '_blank')
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navigation = [
    { name: 'Nos formateurs', href: '/formateurs' },
    { name: 'Nos Partenaires', href: '/partenaires' },
    { name: 'Blog', href: '/blog' },
    { name: 'Pédagogie', href: '/pedagogie' },
    { name: 'Admission', href: '/admission' },
    { name: 'À propos', href: '/about' }
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-white/90 backdrop-blur-sm'}`}>
      {/* Container principal avec padding ultra adaptatif */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 2xl:h-22">
          
          {/* SECTION GAUCHE - Logo Ultra Responsive */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center">
              <div className="relative transition-transform duration-200 group-hover:scale-105">
                <img 
                  src="/images/logoo.svg" 
                  alt="Construction Management Academy" 
                  className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto"
                />
              </div>
            </Link>
          </div>

          {/* SECTION CENTRE - Navigation principale (Desktop uniquement) */}
          <nav className="hidden lg:flex items-center justify-center flex-1 max-w-5xl mx-4 xl:mx-8">
            <div className="flex items-center space-x-0.5 xl:space-x-1 2xl:space-x-2">
              {/* Dropdown Formations */}
              <div className="relative">
                <FormationsDropdown isScrolled={isScrolled} />
              </div>
              
              {/* Liens de navigation ultra compacts */}
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-2 lg:px-3 xl:px-4 py-2 text-xs lg:text-sm xl:text-base font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                      isActive 
                        ? 'text-primary-blue bg-primary-blue/10 shadow-sm' 
                        : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                    }`}
                  >
                    <span className="hidden xl:inline">{item.name}</span>
                    <span className="xl:hidden">
                      {item.name === 'Nos formateurs' && '👨‍🏫'}
                      {item.name === 'Nos Partenaires' && '🤝'}
                      {item.name === 'Blog' && '📝'}
                      {item.name === 'Pédagogie' && '🎓'}
                      {item.name === 'Admission' && '📋'}
                      {item.name === 'À propos' && 'ℹ️'}
                    </span>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-blue rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* SECTION DROITE - Actions Ultra Responsive */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 xl:space-x-4 flex-shrink-0">
            {/* Téléphone - Adaptatif */}
            <a 
              href="tel:0185097106" 
              className="hidden md:flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <Phone className="w-3 lg:w-4 h-3 lg:h-4" />
              <span className="hidden lg:inline xl:hidden">📞</span>
              <span className="hidden xl:inline">01 85 09 71 06</span>
            </a>
            
            {/* Bouton JPO Ultra Compact */}
            {isMounted && (
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex-shrink-0"
              >
                <button className="flex items-center space-x-1 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span className="hidden sm:inline lg:hidden">JPO</span>
                  <span className="hidden lg:inline">Inscription JPO</span>
                </button>
              </a>
            )}
            
            {/* Bouton Candidater Ultra Adaptatif */}
            <OptimizedButton 
              variant="gradient" 
              size="sm" 
              className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg flex-shrink-0"
              onClick={handleCandidater}
            >
              <span className="hidden sm:inline lg:hidden">✨</span>
              <span className="hidden lg:inline">CANDIDATER</span>
              <span className="sm:hidden">📝</span>
            </OptimizedButton>

            {/* BOUTON MENU MOBILE Ultra Responsive */}
            <div className="lg:hidden flex items-center">
              <button
                className="p-1.5 sm:p-2 text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
              >
                {isOpen ? <X size={18} className="sm:w-6 sm:h-6" /> : <Menu size={18} className="sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MENU MOBILE Ultra Responsive */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-xl">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <nav className="space-y-1 sm:space-y-2">
              {/* Formations en premier avec icône */}
              <Link
                href="/formations"
                className={`flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-colors ${
                  pathname === '/formations'
                    ? 'text-primary-blue bg-primary-blue/10' 
                    : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg">📚</span>
                <span>Formations</span>
              </Link>
              
              {/* Autres liens avec icônes */}
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const getIcon = (name: string) => {
                  switch(name) {
                    case 'Nos formateurs': return '👨‍🏫'
                    case 'Nos Partenaires': return '🤝'
                    case 'Blog': return '📝'
                    case 'Pédagogie': return '🎓'
                    case 'Admission': return '📋'
                    case 'À propos': return 'ℹ️'
                    default: return '•'
                  }
                }
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-colors ${
                      isActive 
                        ? 'text-primary-blue bg-primary-blue/10' 
                        : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg">{getIcon(item.name)}</span>
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
            
            {/* Actions mobiles Ultra Responsive */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
              {/* Téléphone mobile */}
              <a 
                href="tel:0185097106" 
                className="flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">01 85 09 71 06</span>
              </a>
              
              {/* Bouton JPO mobile Ultra Responsive */}
              {isMounted && (
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl shadow-md transition-all duration-200">
                    <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span>Inscription JPO</span>
                  </button>
                </a>
              )}
              
              {/* Bouton Candidater mobile Ultra Responsive */}
              <OptimizedButton 
                variant="gradient" 
                size="md" 
                className="w-full text-sm sm:text-base font-semibold py-3 sm:py-4"
                onClick={() => {
                  handleCandidater()
                  setIsOpen(false)
                }}
              >
                CANDIDATER
              </OptimizedButton>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navigation