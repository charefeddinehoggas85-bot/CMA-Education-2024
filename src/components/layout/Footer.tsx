'use client'

import Link from 'next/link'
import { Facebook, Linkedin, Phone, Mail, MapPin, Sparkles, Youtube } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getStatistiquesSite, getSiteSettings } from '@/lib/strapi'
import OptimizedGoogleMap from '@/components/ui/OptimizedGoogleMap'

interface Statistique {
  id: number
  cle: string
  nombre: number
  label: string
  suffixe: string
  ordre: number
}

interface SiteSettings {
  id: number
  siteName: string
  contactPhone: string
  contactEmail: string
  contactAddress: string
  logoData?: any
  socialMedia: {
    linkedin?: string
    facebook?: string
    instagram?: string
    youtube?: string
    tiktok?: string
  }
}

const Footer = () => {
  const [stats, setStats] = useState<Statistique[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)

  // FORCE: Données statiques pour garantir 5 réseaux sociaux TOUJOURS
  const FORCED_SOCIAL_MEDIA = {
    facebook: 'https://www.facebook.com/Constructionmanagementacademy',
    instagram: 'https://www.instagram.com/construction_management_academy',
    tiktok: 'https://www.tiktok.com/@cmaeducation',
    youtube: 'https://www.youtube.com/channel/construction-management-academy',
    linkedin: 'https://www.linkedin.com/company/construction-management-academy'
  };

  useEffect(() => {
    // FORCE: Ignorer complètement Strapi et utiliser les données statiques
    console.log('🎯 FORCE: Utilisation des données statiques pour 5 réseaux sociaux');
    setStats([
      { id: 1, cle: 'experience', nombre: 15, label: 'Années', suffixe: '+', ordre: 1 },
      { id: 2, cle: 'formations', nombre: 8, label: 'Formations', suffixe: '', ordre: 2 },
      { id: 3, cle: 'partners', nombre: 45, label: 'Partenaires', suffixe: '+', ordre: 3 }
    ])
    setSiteSettings({
      id: 1,
      siteName: 'Construction Management Academy',
      contactPhone: '01 85 09 71 06',
      contactEmail: 'contact.academy@cma-education.com',
      contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
      socialMedia: FORCED_SOCIAL_MEDIA
    })
    setLoading(false)
  }, [])

  const quickLinks = [
    { name: 'Formations', href: '/formations' },
    { name: 'À propos', href: '/about' },
    { name: 'Pédagogie', href: '/pedagogie' },
    { name: 'Partenaires', href: '/partenaires' }
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/95 via-blue-800/95 to-primary-blue/95 backdrop-blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)] backdrop-blur-sm"></div>
      
      <div className="relative">
        {/* Section principale - Responsive */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            
            {/* Branding épuré - Responsive */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-start space-y-3 md:space-y-4 mb-6">
                <div className="bg-white rounded-lg p-2 w-full max-w-[200px]">
                  <img 
                    src="/images/Qualuipo.webp" 
                    alt="Qualuipo" 
                    className="h-16 md:h-20 lg:h-24 w-full object-contain"
                  />
                </div>
                <div className="bg-white rounded-lg p-2 w-full max-w-[200px]">
                  <img 
                    src="/images/logoo.svg" 
                    alt={siteSettings?.siteName || "Construction Management Academy"} 
                    className="h-16 md:h-20 lg:h-24 w-full object-contain"
                  />
                </div>
              </div>
              
              <p className="text-gray-200 mb-6 md:mb-8 leading-relaxed font-medium text-sm md:text-base">
                Former les professionnels qui construisent le monde de demain.
              </p>

              {/* Stats épurées - Responsive */}
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 animate-pulse">
                      <div className="h-5 md:h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-2 md:h-3 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                  {stats.slice(0, 3).map((stat) => (
                    <div key={stat.id} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                      <div className="text-lg md:text-xl lg:text-2xl font-black text-primary-yellow">
                        {stat.nombre}{stat.suffixe}
                      </div>
                      <div className="text-xs text-gray-300 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Réseaux sociaux - FORCE 5 ICÔNES - Responsive */}
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                {/* Facebook - TOUJOURS AFFICHÉ */}
                <Link href={FORCED_SOCIAL_MEDIA.facebook} className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-yellow hover:text-primary-blue transition-all duration-300 group">
                  <Facebook className="w-5 h-5" />
                </Link>
                
                {/* Instagram - TOUJOURS AFFICHÉ */}
                <Link href={FORCED_SOCIAL_MEDIA.instagram} className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-yellow hover:text-primary-blue transition-all duration-300 group">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
                </Link>
                
                {/* TikTok - TOUJOURS AFFICHÉ */}
                <Link href={FORCED_SOCIAL_MEDIA.tiktok} className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-yellow hover:text-primary-blue transition-all duration-300 group">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </Link>
                
                {/* YouTube - TOUJOURS AFFICHÉ */}
                <Link href={FORCED_SOCIAL_MEDIA.youtube} className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-yellow hover:text-primary-blue transition-all duration-300 group">
                  <Youtube className="w-5 h-5" />
                </Link>
                
                {/* LinkedIn - TOUJOURS AFFICHÉ */}
                <Link href={FORCED_SOCIAL_MEDIA.linkedin} className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-yellow hover:text-primary-blue transition-all duration-300 group">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Navigation épurée */}
            <div className="lg:col-span-1">
              <h4 className="font-black text-white mb-6 text-lg">Navigation</h4>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white font-medium transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact épuré */}
            <div className="lg:col-span-1">
              <h4 className="font-black text-white mb-6 text-lg">Contact</h4>
              
              <div className="space-y-4 mb-8">
                {siteSettings?.contactPhone && (
                  <Link
                    href={`tel:${siteSettings.contactPhone.replace(/\s/g, '')}`}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-primary-yellow group-hover:text-primary-blue transition-all duration-200">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold">{siteSettings.contactPhone}</div>
                      <div className="text-xs opacity-80">Lun-Ven 9h-18h</div>
                    </div>
                  </Link>
                )}

                {siteSettings?.contactEmail && (
                  <Link
                    href={`mailto:${siteSettings.contactEmail}`}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-primary-yellow group-hover:text-primary-blue transition-all duration-200">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{siteSettings.contactEmail}</div>
                      <div className="text-xs opacity-80">Réponse sous 24h</div>
                    </div>
                  </Link>
                )}

                {siteSettings?.contactAddress && (
                  <div className="flex items-start space-x-3 text-gray-300">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm leading-tight">{siteSettings.contactAddress}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Footer */}
              <Link
                href="/contact"
                className="group relative overflow-hidden bg-gradient-to-r from-primary-yellow via-primary-orange to-primary-yellow bg-size-200 bg-pos-0 hover:bg-pos-100 text-primary-blue px-6 py-3 rounded-xl font-black text-sm shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 flex items-center space-x-2 w-full justify-center"
              >
                <Sparkles className="w-4 h-4" />
                <span>Rejoignez Construction Management Academy</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>
            </div>

            {/* Localisation avec carte */}
            <div className="lg:col-span-1">
              <OptimizedGoogleMap address={siteSettings?.contactAddress || "67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne"} />
            </div>
          </div>
        </div>

        {/* Footer bottom glassmorphism */}
        <div className="border-t border-white/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm text-gray-400 font-medium">
                &copy; 2024 {siteSettings?.siteName || "Construction Management Academy"}
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors font-medium">Mentions légales</Link>
                <Link href="/confidentialite" className="text-gray-400 hover:text-white transition-colors font-medium">Confidentialité</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
