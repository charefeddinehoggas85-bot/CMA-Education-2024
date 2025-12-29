'use client'

import { useState } from 'react'
import { MapPin, ExternalLink } from 'lucide-react'

interface GoogleMapProps {
  address: string
  className?: string
}

const GoogleMap = ({ address, className = '' }: GoogleMapProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // URL Google Maps avec l'adresse Construction Management Academy
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.8!2d2.2796556!3d48.8589516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzMyLjIiTiAywrAxNic0Ni44IkU!5e0!3m2!1sfr!2sfr!4v1"
  
  const directionsUrl = `https://www.google.com/maps/search/Construction-Management-Academy/@48.8589516,2.2796556,11z?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D`

  return (
    <div className={`relative group ${className}`}>
      {/* Header de la carte */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-yellow/20 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary-yellow" />
          </div>
          <h4 className="font-black text-white text-lg">Notre localisation</h4>
        </div>
        
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-xs text-gray-300 hover:text-primary-yellow transition-colors duration-200"
        >
          <span>Itinéraire</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Container de la carte */}
      <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
        {/* Placeholder pendant le chargement */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-blue/50 to-blue-800/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-primary-yellow animate-pulse" />
              </div>
              <p className="text-sm text-gray-300">Chargement de la carte...</p>
            </div>
          </div>
        )}

        {/* Iframe Google Maps */}
        <iframe
          src={mapUrl}
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="transition-opacity duration-500"
          onLoad={() => setIsLoaded(true)}
        />

        {/* Overlay avec effet glassmorphism au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Adresse sous la carte */}
      <div className="mt-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <p className="text-sm text-gray-300 leading-relaxed">
          {address}
        </p>
      </div>
    </div>
  )
}

export default GoogleMap