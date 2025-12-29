'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import OptimizedButton from '@/components/ui/OptimizedButton';
import FormationsDropdown from '@/components/ui/FormationsDropdown';
var Navigation = function () {
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = useState(false), isScrolled = _b[0], setIsScrolled = _b[1];
    var _c = useState(false), isMounted = _c[0], setIsMounted = _c[1];
    var pathname = usePathname();
    var router = useRouter();
    useEffect(function () {
        setIsMounted(true);
    }, []);
    var handleCandidater = function () {
        window.open('https://construction-management-academy.ymag.cloud/index.php/preinscription/', '_blank');
    };
    useEffect(function () {
        var handleScroll = function () { return setIsScrolled(window.scrollY > 20); };
        window.addEventListener('scroll', handleScroll);
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    var navigation = [
        { name: 'Nos formateurs', href: '/formateurs' },
        { name: 'Nos Partenaires', href: '/partenaires' },
        { name: 'Blog', href: '/blog' },
        { name: 'Pédagogie', href: '/pedagogie' },
        { name: 'Admission', href: '/admission' },
        { name: 'À propos', href: '/about' }
    ];
    return (<header className={"fixed top-0 w-full z-50 transition-all duration-300 ".concat(isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-white/90 backdrop-blur-sm')}>
      <nav className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center h-24 w-full">
          
          {/* Logo à gauche */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative hover:scale-105 transition-transform duration-200">
                <img src="/images/logoo.svg" alt="Construction Management Academy" className="h-32 w-auto"/>
              </div>
            </Link>
          </div>

          {/* Navigation au centre */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              <FormationsDropdown isScrolled={isScrolled}/>
              {navigation.map(function (item) {
            var isActive = pathname === item.href;
            return (<Link key={item.name} href={item.href} className={"font-medium transition-colors px-4 py-2 rounded-lg whitespace-nowrap ".concat(isActive
                    ? 'text-primary-yellow bg-primary-yellow/10'
                    : 'text-gray-900 hover:text-primary-yellow')}>
                    {item.name}
                  </Link>);
        })}
            </div>
          </div>

          {/* CTA à droite */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <a href="tel:0189706052" className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-gray-900 hover:bg-gray-100">
              <Phone className="w-4 h-4"/>
              <span className="text-sm font-medium">01 89 70 60 52</span>
            </a>
            
            {/* Bouton Inscription JPO - Premium Design */}
            {isMounted && (<a href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" target="_blank" rel="noopener noreferrer">
                <button className="group relative px-6 py-3 font-bold text-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 hover:from-orange-500 hover:via-orange-600 hover:to-red-600">
                  <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>Inscription JPO</span>
                  </span>
                </button>
              </a>)}
            
            <OptimizedButton variant="gradient" size="md" className="shadow-lg" onClick={handleCandidater}>
              CANDIDATER
            </OptimizedButton>
          </div>

          {/* Menu mobile */}
          <div className="lg:hidden flex-shrink-0">
            <button className="p-2 rounded-lg transition-colors text-gray-900 hover:bg-gray-100" onClick={function () { return setIsOpen(!isOpen); }}>
              {isOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>

        {isOpen && (<div className="lg:hidden bg-white/95 backdrop-blur-xl rounded-2xl mt-2 border border-gray-200/50 shadow-xl transition-all duration-300">
            <div className="p-6 space-y-4">
              <Link href="/formations" className="block font-medium transition-colors px-3 py-2 rounded-lg text-gray-700 hover:text-primary-blue" onClick={function () { return setIsOpen(false); }}>
                Formations
              </Link>
              {navigation.map(function (item) {
                var isActive = pathname === item.href;
                return (<Link key={item.name} href={item.href} className={"block font-medium transition-colors px-3 py-2 rounded-lg ".concat(isActive
                        ? 'text-primary-blue bg-primary-blue/10'
                        : 'text-gray-700 hover:text-primary-blue')} onClick={function () { return setIsOpen(false); }}>
                    {item.name}
                  </Link>);
            })}
              
              <div className="pt-4 border-t border-gray-200">
                <a href="tel:0189706052" className="flex items-center space-x-2 text-gray-700 mb-4">
                  <Phone className="w-4 h-4"/>
                  <span>01 89 70 60 52</span>
                </a>
                
                {isMounted && (<a href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" target="_blank" rel="noopener noreferrer" className="block w-full mb-3" onClick={function () { return setIsOpen(false); }}>
                    <button className="group relative w-full px-4 py-3 font-bold text-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 hover:from-orange-500 hover:via-orange-600 hover:to-red-600">
                      <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>Inscription JPO</span>
                      </span>
                    </button>
                  </a>)}
                
                <OptimizedButton variant="gradient" size="md" className="w-full" onClick={handleCandidater}>
                  CANDIDATER
                </OptimizedButton>
              </div>
            </div>
          </div>)}
      </nav>
    </header>);
};
export default Navigation;
