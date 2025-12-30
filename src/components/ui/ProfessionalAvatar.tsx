'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ProfessionalAvatarProps {
  name: string
  gender?: 'male' | 'female'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function ProfessionalAvatar({ 
  name, 
  gender = 'male', 
  size = 'md',
  className = '' 
}: ProfessionalAvatarProps) {
  const [currentAvatar, setCurrentAvatar] = useState<string>('')
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Mapping spécifique des formateurs avec leurs fichiers SVG réels
  const formateurSVGMapping: Record<string, string> = {
    'abdel bouchouia': 'abdel-bouchouia.svg',
    'julien pichonnier': 'pichonnier-julien.svg', 
    'ratiba sidrouhou': 'sidrouhou-ratiba.svg',
    // Ajouter d'autres mappings si nécessaire
  }

  const getAvatarColor = (name: string, gender: string) => {
    const colors: Record<string, string[]> = {
      male: [
        'bg-gradient-to-br from-blue-500 to-blue-700',
        'bg-gradient-to-br from-green-500 to-green-700',
        'bg-gradient-to-br from-purple-500 to-purple-700',
        'bg-gradient-to-br from-indigo-500 to-indigo-700',
        'bg-gradient-to-br from-teal-500 to-teal-700'
      ],
      female: [
        'bg-gradient-to-br from-pink-500 to-pink-700',
        'bg-gradient-to-br from-rose-500 to-rose-700',
        'bg-gradient-to-br from-purple-500 to-purple-700',
        'bg-gradient-to-br from-indigo-500 to-indigo-700',
        'bg-gradient-to-br from-violet-500 to-violet-700'
      ]
    }
    
    const colorArray = colors[gender] || colors.male
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    
    return colorArray[Math.abs(hash) % colorArray.length]
  }

  const getAvatarUrl = (name: string) => {
    const normalizedName = name.toLowerCase().trim()
    
    // Vérifier si on a un mapping spécifique pour ce formateur
    const svgFile = formateurSVGMapping[normalizedName]
    
    if (svgFile) {
      return {
        localAvatar: `/images/formateurs/${svgFile}`,
        hasLocalFile: true
      }
    }
    
    // Fallback: générer le slug standard
    const slug = normalizedName
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    
    return {
      localAvatar: `/images/formateurs/${slug}.svg`,
      hasLocalFile: false
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8 text-xs'
      case 'md': return 'w-12 h-12 text-sm'
      case 'lg': return 'w-16 h-16 text-base'
      case 'xl': return 'w-24 h-24 text-lg'
      default: return 'w-12 h-12 text-sm'
    }
  }

  const colorClass = getAvatarColor(name, gender)
  const avatarUrls = getAvatarUrl(name)
  const initials = getInitials(name)

  // Initialiser l'avatar au premier rendu
  useEffect(() => {
    setCurrentAvatar(avatarUrls.localAvatar)
    setIsLoading(true)
    setImageError(false)
  }, [avatarUrls.localAvatar])

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setImageError(true)
  }

  // Si erreur d'image ou pas de fichier local, afficher les initiales
  if (imageError || !avatarUrls.hasLocalFile) {
    return (
      <div className={`${getSizeClasses()} rounded-full ${colorClass} flex items-center justify-center text-white font-bold shadow-lg ${className}`}>
        {initials}
      </div>
    )
  }

  return (
    <div className={`${getSizeClasses()} rounded-full overflow-hidden shadow-lg ${className}`}>
      {isLoading && (
        <div className={`w-full h-full ${colorClass} flex items-center justify-center text-white font-bold animate-pulse`}>
          {initials}
        </div>
      )}
      <Image
        src={currentAvatar}
        alt={`Avatar de ${name}`}
        width={96}
        height={96}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        priority={size === 'xl'}
      />
    </div>
  )
}
