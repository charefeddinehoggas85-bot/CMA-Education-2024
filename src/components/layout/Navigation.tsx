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
      {/* Container principal avec padding adaptatif */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22">
          
          {/* SECTION GAUCHE - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center">
              <div className="relative transition-transform duration-200 group-hover:scale-105">
                <img 
                  src="/images/logoo.svg" 
                  alt="Construction Management Academy" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto"
                />
              </div>
            </Link>
          </div>

          {/* SECTION CENTRE - Navigation principale (Desktop uniquement) */}
          <nav className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-8">
            <div className="flex items-center space-x-1 xl:space-x-2">
              {/* Dropdown Formations */}
              <div className="relative">
                <FormationsDropdown isScrolled={isScrolled} />
              </div>
              
              {/* Liens de navigation */}
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 py-2 text-ui-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                      isActive 
                        ? 'text-primary-blue bg-primary-blue/10 shadow-sm' 
                        : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-blue rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* SECTION DROITE - Actions (Desktop uniquement) */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 flex-shrink-0">
            {/* Téléphone */}
            <a 
              href="tel:0189706052" 
              className="flex items-center space-x-2 px-3 py-2 text-ui-sm font-medium text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">01 89 70 60 52</span>
            </a>
            
            {/* Bouton JPO */}
            {isMounted && (
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <button className="flex items-center space-x-2 px-4 py-2.5 text-ui-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <Calendar className="w-4 h-4" />
                  <span className="hidden xl:inline">JPO</span>
                </button>
              </a>
            )}
            
            {/* Bouton Candidater */}
            <OptimizedButton 
              variant="gradient" 
              size="sm" 
              className="px-4 py-2.5 text-ui-sm font-semibold shadow-md hover:shadow-lg"
              onClick={handleCandidater}
            >
              CANDIDATER
            </OptimizedButton>
          </div>

          {/* BOUTON MENU MOBILE */}
          <div className="lg:hidden flex items-center">
            <button
              className="p-2 text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <nav className="space-y-2">
              {/* Formations en premier */}
              <Link
                href="/formations"
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  pathname === '/formations'
                    ? 'text-primary-blue bg-primary-blue/10' 
                    : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Formations
              </Link>
              
              {/* Autres liens */}
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive 
                        ? 'text-primary-blue bg-primary-blue/10' 
                        : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            
            {/* Actions mobiles */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              {/* Téléphone */}
              <a 
                href="tel:0189706052" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-base font-medium">01 89 70 60 52</span>
              </a>
              
              {/* Bouton JPO mobile */}
              {isMounted && (
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-md transition-all duration-200">
                    <Calendar className="w-5 h-5" />
                    <span>Inscription JPO</span>
                  </button>
                </a>
              )}
              
              {/* Bouton Candidater mobile */}
              <OptimizedButton 
                variant="gradient" 
                size="md" 
                className="w-full text-base font-semibold"
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
