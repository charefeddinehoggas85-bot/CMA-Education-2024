'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import ModernButton from '@/components/ui/ModernButton';
import AnimatedIcon, { ParticleIcon } from '@/components/ui/AnimatedIcon';
import { getSiteSettings, getMainNavigation, getFormations } from '@/lib/strapi';
var Header = function () {
    var _a = useState(false), isMenuOpen = _a[0], setIsMenuOpen = _a[1];
    var _b = useState(false), isScrolled = _b[0], setIsScrolled = _b[1];
    var _c = useState(false), showFormationsMenu = _c[0], setShowFormationsMenu = _c[1];
    var _d = useState(null), siteSettings = _d[0], setSiteSettings = _d[1];
    var _e = useState([]), navigationItems = _e[0], setNavigationItems = _e[1];
    var _f = useState([]), formations = _f[0], setFormations = _f[1];
    var _g = useState(true), loading = _g[0], setLoading = _g[1];
    var pathname = usePathname();
    useEffect(function () {
        var handleScroll = function () { return setIsScrolled(window.scrollY > 10); };
        var handleClickOutside = function (event) {
            var target = event.target;
            if (showFormationsMenu && !target.closest('.formations-dropdown')) {
                setShowFormationsMenu(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
        return function () {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showFormationsMenu]);
    // Charger les données Strapi
    useEffect(function () {
        function loadHeaderData() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, settingsData, navData, formationsData, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, 3, 4]);
                            setLoading(true);
                            return [4 /*yield*/, Promise.all([
                                    getSiteSettings(),
                                    getMainNavigation(),
                                    getFormations()
                                ])];
                        case 1:
                            _a = _b.sent(), settingsData = _a[0], navData = _a[1], formationsData = _a[2];
                            setSiteSettings(settingsData);
                            setNavigationItems(navData);
                            setFormations(formationsData);
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _b.sent();
                            console.error('Erreur chargement header:', error_1);
                            // Fallback avec données statiques
                            setSiteSettings({
                                id: 1,
                                siteName: 'Construction Management Academy',
                                contactPhone: '01 89 70 60 52',
                                contactEmail: 'contact.academy@construction-management-academy.fr'
                            });
                            setNavigationItems([
                                { id: 1, label: 'Accueil', url: '/', ordre: 1, featured: true, external: false },
                                { id: 2, label: 'À propos', url: '/about', ordre: 2, featured: true, external: false },
                                { id: 3, label: 'Pédagogie', url: '/pedagogie', ordre: 3, featured: true, external: false },
                                { id: 4, label: 'Admission', url: '/admission', ordre: 4, featured: true, external: false },
                                { id: 5, label: 'Partenaires', url: '/partenaires', ordre: 5, featured: true, external: false }
                            ]);
                            return [3 /*break*/, 4];
                        case 3:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        loadHeaderData();
    }, []);
    // Navigation dynamique depuis Strapi avec fallback
    var navigation = navigationItems.length > 0 ? navigationItems.filter(function (item) { return item.featured; }) : [
        { id: 1, label: 'Accueil', url: '/', ordre: 1, featured: true, external: false },
        { id: 2, label: 'À propos', url: '/about', ordre: 2, featured: true, external: false },
        { id: 3, label: 'Pédagogie', url: '/pedagogie', ordre: 3, featured: true, external: false },
        { id: 4, label: 'Admission', url: '/admission', ordre: 4, featured: true, external: false },
        { id: 5, label: 'Partenaires', url: '/partenaires', ordre: 5, featured: true, external: false }
    ];
    // Formations organisées par catégorie
    var formationsMenu = formations.reduce(function (acc, formation) {
        var _a, _b;
        // Utiliser les bons noms de champs depuis Strapi
        var categoryName = ((_a = formation.category) === null || _a === void 0 ? void 0 : _a.name) || 'Autres formations';
        var categorySlug = ((_b = formation.category) === null || _b === void 0 ? void 0 : _b.slug) || 'autres';
        var category = acc.find(function (cat) { return cat.category === categoryName; });
        if (!category) {
            category = {
                category: categoryName,
                href: "/formations#".concat(categorySlug),
                items: []
            };
            acc.push(category);
        }
        category.items.push({
            name: formation.title,
            href: "/formations/".concat(formation.slug)
        });
        return acc;
    }, []);
    // Fallback si pas de formations Strapi
    var fallbackFormationsMenu = [
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
    ];
    var finalFormationsMenu = formationsMenu.length > 0 ? formationsMenu : fallbackFormationsMenu;
    var isActive = function (href) { return pathname === href || (href !== '/' && pathname.startsWith(href)); };
    if (loading) {
        return (<header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="animate-pulse bg-gray-200 h-14 w-36 rounded"></div>
            <div className="hidden lg:flex space-x-4">
              {[1, 2, 3, 4].map(function (i) { return (<div key={i} className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>); })}
            </div>
            <div className="animate-pulse bg-gray-200 h-10 w-24 rounded"></div>
          </div>
        </nav>
      </header>);
    }
    return (<header className={"fixed top-0 w-full z-50 transition-all duration-500 ".concat(isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-primary-blue/5'
            : 'bg-white/60 backdrop-blur-lg')}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18 lg:h-20">
          
          {/* Logo dynamique - Responsive */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image src="/logo.svg" alt={"".concat((siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.siteName) || 'Construction Management Academy', " Logo")} width={200} height={200} className="h-10 md:h-12 lg:h-14 w-auto max-w-[120px] md:max-w-[160px] lg:max-w-none transition-all duration-300 group-hover:scale-105"/>
            </div>
          </Link>

          {/* Navigation dynamique - Responsive */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            <Link href="/" className={"px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ".concat(pathname === '/'
            ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
            : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80')}>
              Accueil
            </Link>
            <Link href="/about" className={"px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ".concat(isActive('/about')
            ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
            : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80')}>
              À propos
            </Link>
            <Link href="/pedagogie" className={"px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ".concat(isActive('/pedagogie')
            ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
            : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80')}>
              Pédagogie
            </Link>
            <Link href="/admission" className={"px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ".concat(isActive('/admission')
            ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
            : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80')}>
              Admission
            </Link>
            
            {/* Lien JPO avec badge spécial */}
            <Link href="/journee-porte-ouverte" className={"relative px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ".concat(isActive('/journee-porte-ouverte')
            ? 'text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg'
            : 'text-white bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 shadow-md hover:shadow-lg')}>
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3"/>
                <span>Journée Porte Ouverte</span>
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </Link>
            
            {/* Formations avec dropdown dynamique - Responsive */}
            <div className="relative formations-dropdown" onMouseEnter={function () { return setShowFormationsMenu(true); }} onMouseLeave={function () { return setShowFormationsMenu(false); }}>
              <button onClick={function () { return setShowFormationsMenu(!showFormationsMenu); }} className={"flex items-center space-x-1 px-3 md:px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all duration-300 ".concat(isActive('/formations') || showFormationsMenu
            ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
            : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80')}>
                <span>Formations</span>
                <ChevronDown className={"w-3 h-3 transition-transform ".concat(showFormationsMenu ? 'rotate-180' : '')}/>
              </button>
              
              {/* Mega Menu dynamique - Responsive */}
              {showFormationsMenu && (<div className="absolute top-full left-0 mt-2 w-full md:w-[600px] lg:w-[800px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-200 z-[9999]">
                  <div className="p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      {finalFormationsMenu.map(function (category, idx) { return (<div key={idx}>
                          <Link href={category.href} className="block text-primary-blue font-semibold mb-3 hover:text-blue-700 transition-colors text-sm md:text-base" onClick={function () { return setShowFormationsMenu(false); }}>
                            {category.category}
                          </Link>
                          <ul className="space-y-1 md:space-y-2">
                            {category.items.map(function (subItem, subIdx) { return (<li key={subIdx}>
                                <Link href={subItem.href} className="block text-xs md:text-sm text-gray-600 hover:text-primary-blue hover:bg-gray-50 px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-all duration-200" onClick={function () { return setShowFormationsMenu(false); }}>
                                  {subItem.name}
                                </Link>
                              </li>); })}
                          </ul>
                        </div>); })}
                    </div>
                  </div>
                </div>)}
            </div>
            
            <Link href="/partenaires" className={"px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ".concat(isActive('/partenaires')
            ? 'text-primary-blue bg-primary-blue/10 shadow-sm'
            : 'text-gray-900 hover:text-primary-blue hover:bg-gray-50/80')}>
              Partenaires
            </Link>
          </div>

          {/* CTA avec animation attractive - Responsive */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Bouton JPO Orange - TOUJOURS VISIBLE */}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" target="_blank" rel="noopener noreferrer">
              <button className="px-2 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs md:text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap">
                📅 <span className="hidden sm:inline">JPO</span>
              </button>
            </a>

            {/* Bouton Candidater - Bleu */}
            <a href="https://construction-management-academy.ymag.cloud/index.php/preinscription/" target="_blank" rel="noopener noreferrer" className="hidden md:inline-block">
              <ModernButton variant="neon" size="md" icon={<ParticleIcon particleCount={6}>
                    <Sparkles className="w-3 md:w-4 h-3 md:h-4"/>
                  </ParticleIcon>} iconPosition="left" className="animate-pulse hover:animate-none text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2">
                Candidater
              </ModernButton>
            </a>

            {/* Menu mobile */}
            <button className="md:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-colors duration-200" onClick={function () { return setIsMenuOpen(!isMenuOpen); }}>
              <AnimatedIcon variant="morph" size="sm">
                {isMenuOpen ? <X size={18}/> : <Menu size={18}/>}
              </AnimatedIcon>
            </button>
          </div>
        </div>

        {/* Menu mobile glassmorphism - Responsive */}
        <div className={"md:hidden transition-all duration-300 ".concat(isMenuOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0', " overflow-hidden")}>
          <div className="py-3 mt-2 bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-100/50 shadow-xl max-h-[60vh] overflow-y-auto">
            <Link href="/" className={"block px-6 py-3 font-medium text-sm transition-colors duration-200 ".concat(pathname === '/' ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue')} onClick={function () { return setIsMenuOpen(false); }}>
              Accueil
            </Link>
            <Link href="/about" className={"block px-6 py-3 font-medium text-sm transition-colors duration-200 ".concat(isActive('/about') ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue')} onClick={function () { return setIsMenuOpen(false); }}>
              À propos
            </Link>
            <Link href="/pedagogie" className={"block px-6 py-3 font-medium text-sm transition-colors duration-200 ".concat(isActive('/pedagogie') ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue')} onClick={function () { return setIsMenuOpen(false); }}>
              Pédagogie
            </Link>
            <Link href="/admission" className={"block px-6 py-3 font-medium text-sm transition-colors duration-200 ".concat(isActive('/admission') ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue')} onClick={function () { return setIsMenuOpen(false); }}>
              Admission
            </Link>
            
            <Link href="/formations" className={"block px-6 py-3 font-medium text-sm transition-colors duration-200 ".concat(isActive('/formations') ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue')} onClick={function () { return setIsMenuOpen(false); }}>
              Formations
            </Link>
            
            <div className="pl-4 pb-2">
              {finalFormationsMenu.map(function (category, idx) { return (<div key={idx} className="mb-2">
                  <Link href={category.href} className="block px-4 py-1 text-xs font-medium text-primary-blue" onClick={function () { return setIsMenuOpen(false); }}>
                    {category.category}
                  </Link>
                </div>); })}
            </div>
            
            <Link href="/partenaires" className={"block px-6 py-3 font-medium text-sm transition-colors duration-200 ".concat(isActive('/partenaires') ? 'text-primary-blue bg-primary-blue/5' : 'text-gray-900 hover:text-primary-blue')} onClick={function () { return setIsMenuOpen(false); }}>
              Partenaires
            </Link>

            {/* Boutons CTA dans le menu mobile */}
            <div className="px-6 pt-4 space-y-3 border-t border-gray-200/50">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" target="_blank" rel="noopener noreferrer" onClick={function () { return setIsMenuOpen(false); }} className="block w-full">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 via-orange-550 to-orange-600 text-white font-bold text-sm rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-orange-400/50">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>Inscription JPO</span>
                  </span>
                </button>
              </a>
              
              <a href="https://construction-management-academy.ymag.cloud/index.php/preinscription/" target="_blank" rel="noopener noreferrer" onClick={function () { return setIsMenuOpen(false); }} className="block w-full">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5"/>
                    <span>Candidater</span>
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>);
};
export default Header;
