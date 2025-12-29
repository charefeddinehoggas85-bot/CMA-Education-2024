'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface ProfessionalAvatarProps {
  name: string
  gender: 'male' | 'female'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showFallback?: boolean
}

export default function ProfessionalAvatar({ 
  name, 
  gender, 
  size = 'md', 
  className = '',
  showFallback = true 
}: ProfessionalAvatarProps) {
  const [imageError, setImageError] = useState(false)
  const [currentAvatar, setCurrentAvatar] = useState('')
  
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-24 h-24 text-lg',
    lg: 'w-32 h-32 text-xl',
    xl: 'w-40 h-40 text-2xl'
  }
  
  // Couleurs professionnelles basées sur le nom pour la cohérence
  const getAvatarColor = (name: string, gender: string) => {
    const colors = gender === 'female' 
      ? [
          'bg-gradient-to-br from-pink-500 to-rose-600',
          'bg-gradient-to-br from-purple-500 to-indigo-600',
          'bg-gradient-to-br from-blue-500 to-cyan-600',
          'bg-gradient-to-br from-emerald-500 to-teal-600'
        ]
      : [
          'bg-gradient-to-br from-blue-600 to-indigo-700',
          'bg-gradient-to-br from-slate-600 to-gray-700',
          'bg-gradient-to-br from-emerald-600 to-green-700',
          'bg-gradient-to-br from-orange-600 to-red-700'
        ]
    
    const index = name.length % colors.length
    return colors[index]
  }

  // URLs d'avatars professionnels - d'abord chercher localement, puis fallback
  const getAvatarUrl = (name: string) => {
    // Convertir le nom en slug pour le fichier
    const slug = name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    
    // D'abord essayer l'avatar local
    const localAvatar = `/images/formateurs/${slug}.svg`
    
    // Fallback vers avatar généré
    const seed = name.toLowerCase().replace(/\s+/g, '')
    const generatedAvatar = `https://api.dicebear.com/7.x/professional/svg?seed=${seed}&backgroundColor=1e40af,1e3a8a,3730a3&clothingColor=1f2937,374151,4b5563`
    
    return { localAvatar, generatedAvatar }
  }

  const colorClass = getAvatarColor(name, gender)
  const avatarUrls = getAvatarUrl(name)

  // Initialiser l'avatar au premier rendu
  useEffect(() => {
    setCurrentAvatar(avatarUrls.localAvatar)
  }, [avatarUrls.localAvatar])

  const handleImageError = () => {
    if (currentAvatar === avatarUrls.localAvatar) {
      // Essayer l'avatar généré
      setCurrentAvatar(avatarUrls.generatedAvatar)
    } else {
      // Utiliser le fallback avec initiales
      setImageError(true)
    }
  }

  if (imageError || !showFallback) {
    return (
      <div className={`${sizeClasses[size]} ${colorClass} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg ${className}`}>
        {initials}
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <Image
        src={currentAvatar}
        alt={`Avatar de ${name}`}
        width={size === 'xl' ? 160 : size === 'lg' ? 128 : size === 'md' ? 96 : 48}
        height={size === 'xl' ? 160 : size === 'lg' ? 128 : size === 'md' ? 96 : 48}
        className="w-full h-full object-cover"
        onError={handleImageError}
      />
    </div>
  )
}