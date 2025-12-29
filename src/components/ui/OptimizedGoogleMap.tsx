'use client'

import { useState, memo } from 'react'
import { MapPin, ExternalLink } from 'lucide-react'

interface OptimizedGoogleMapProps {
  address: string
  className?: string
}

const OptimizedGoogleMap = memo(({ address, className = '' }: OptimizedGoogleMapProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showMap, setShowMap] = useState(false)
  
  const directionsUrl = `https://www.google.com/maps/search/Construction-Management-Academy/@48.8589516,2.2796556,11z?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D`

  const handleShowMap = () => {
    setShowMap(true)
  }

  return (
    <div className={`relative ${className}`}>
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

      <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
        {!showMap ? (
          <div 
            className="h-48 flex items-center justify-center bg-gradient-to-br from-primary-blue/50 to-blue-800/50 backdrop-blur-sm cursor-pointer hover:from-primary-blue/60 hover:to-blue-800/60 transition-all duration-200"
            onClick={handleShowMap}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-primary-yellow" />
              </div>
              <p className="text-sm text-gray-300 mb-2">Cliquez pour charger la carte</p>
              <p className="text-xs text-gray-400">Économise la bande passante</p>
            </div>
          </div>
        ) : (
          <>
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-blue/50 to-blue-800/50 backdrop-blur-sm z-10">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-primary-yellow animate-pulse" />
                  </div>
                  <p className="text-sm text-gray-300">Chargement...</p>
                </div>
              </div>
            )}

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.8!2d2.2796556!3d48.8589516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzMyLjIiTiAywrAxNic0Ni44IkU!5e0!3m2!1sfr!2sfr!4v1"
              width="100%"
              height="192"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIsLoaded(true)}
            />
          </>
        )}
      </div>

      <div className="mt-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <p className="text-sm text-gray-300 leading-relaxed">
          {address}
        </p>
      </div>
    </div>
  )
})

OptimizedGoogleMap.displayName = 'OptimizedGoogleMap'

export default OptimizedGoogleMap