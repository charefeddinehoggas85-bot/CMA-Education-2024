/**
 * Script pour corriger les erreurs d'images des formateurs en production
 * Corrige les problèmes de mapping des fichiers SVG et améliore la gestion des fallbacks
 */

const fs = require('fs')
const path = require('path')

console.log('🔧 Correction des erreurs d\'images des formateurs...')

// 1. Corriger le composant ProfessionalAvatar pour mapper correctement les fichiers SVG
const avatarPath = 'src/components/ui/ProfessionalAvatar.tsx'
const avatarContent = `'use client'

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
    const colors = {
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
        localAvatar: \`/images/formateurs/\${svgFile}\`,
        hasLocalFile: true
      }
    }
    
    // Fallback: générer le slug standard
    const slug = normalizedName
      .replace(/\\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    
    return {
      localAvatar: \`/images/formateurs/\${slug}.svg\`,
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
      <div className={\`\${getSizeClasses()} rounded-full \${colorClass} flex items-center justify-center text-white font-bold shadow-lg \${className}\`}>
        {initials}
      </div>
    )
  }

  return (
    <div className={\`\${getSizeClasses()} rounded-full overflow-hidden shadow-lg \${className}\`}>
      {isLoading && (
        <div className={\`w-full h-full \${colorClass} flex items-center justify-center text-white font-bold animate-pulse\`}>
          {initials}
        </div>
      )}
      <Image
        src={currentAvatar}
        alt={\`Avatar de \${name}\`}
        width={96}
        height={96}
        className={\`w-full h-full object-cover \${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300\`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        priority={size === 'xl'}
      />
    </div>
  )
}
`

// 2. Améliorer la fonction getImageURL dans strapi.ts
const strapiPath = 'src/lib/strapi.ts'
let strapiContent = fs.readFileSync(strapiPath, 'utf8')

// Remplacer la fonction getImageURL
const newGetImageURL = `// Helper pour obtenir l'URL d'une image avec fallback amélioré
export function getImageURL(strapiMedia: any, fallbackPath?: string): string {
  // Validation stricte : ne jamais retourner un objet
  const validateURL = (url: any): string | null => {
    if (typeof url === 'string' && url.length > 0 && !url.includes('[object') && !url.includes('undefined')) {
      return url
    }
    return null
  }

  // Priorité 1: Image Strapi valide
  const strapiURL = getStrapiMediaURL(strapiMedia)
  const validStrapiURL = validateURL(strapiURL)
  if (validStrapiURL) {
    console.log('✅ Image Strapi trouvée:', validStrapiURL)
    return validStrapiURL
  }
  
  // Priorité 2: Fallback path valide (doit être une string)
  if (fallbackPath && typeof fallbackPath === 'string') {
    const validFallback = validateURL(fallbackPath)
    if (validFallback) {
      console.log('⚠️ Utilisation du fallback:', validFallback)
      return validFallback
    }
  }
  
  // Priorité 3: Image par défaut pour éviter les erreurs
  console.log('❌ Aucune image valide trouvée, utilisation de l\'image par défaut')
  return '/images/placeholder-avatar.svg'
}`

// Remplacer l'ancienne fonction
strapiContent = strapiContent.replace(
  /\/\/ Helper pour obtenir l'URL d'une image avec fallback[\s\S]*?return '\/images\/placeholder-avatar\.svg'\s*}/,
  newGetImageURL
)

// 3. Créer une image placeholder par défaut
const placeholderSVG = `<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="48" fill="#1e40af"/>
  <circle cx="48" cy="35" r="12" fill="white" opacity="0.8"/>
  <path d="M20 75c0-15.464 12.536-28 28-28s28 12.536 28 28" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
</svg>`

// 4. Améliorer le composant FormatorCard pour une meilleure gestion des erreurs
const formatorCardPath = 'src/components/ui/FormatorCard.tsx'
let formatorCardContent = fs.readFileSync(formatorCardPath, 'utf8')

// Améliorer la gestion des photos
const improvedPhotoHandling = `  // Récupérer l'URL de la photo avec validation améliorée
  const getValidPhotoUrl = () => {
    if (!formateur.photoData) return null
    
    try {
      const photoUrl = getImageURL(formateur.photoData)
      // Vérifier que l'URL est valide et ne contient pas de mots-clés problématiques
      if (photoUrl && 
          typeof photoUrl === 'string' && 
          !photoUrl.includes('formations-hero') && 
          !photoUrl.includes('[object') &&
          !photoUrl.includes('undefined')) {
        return photoUrl
      }
    } catch (error) {
    console.warn('Erreur lors de la récupération de la photo:', error)
    }
    
    return null
  }
  
  const photoUrl = getValidPhotoUrl()
  const hasPhoto = !!photoUrl`

// Remplacer l'ancienne gestion
formatorCardContent = formatorCardContent.replace(
  /\/\/ Récupérer l'URL de la photo si disponible[\s\S]*?const hasPhoto = photoUrl && !photoUrl\.includes\('formations-hero'\)/,
  improvedPhotoHandling
)

// 5. Écrire les fichiers corrigés
try {
  fs.writeFileSync(avatarPath, avatarContent)
  console.log('✅ ProfessionalAvatar.tsx corrigé')
  
  fs.writeFileSync(strapiPath, strapiContent)
  console.log('✅ strapi.ts amélioré')
  
  fs.writeFileSync(formatorCardPath, formatorCardContent)
  console.log('✅ FormatorCard.tsx amélioré')
  
  // Créer le dossier images/formateurs s'il n'existe pas
  const imagesDir = 'public/images'
  const formateursDir = 'public/images/formateurs'
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }
  
  if (!fs.existsSync(formateursDir)) {
    fs.mkdirSync(formateursDir, { recursive: true })
  }
  
  // Créer l'image placeholder
  fs.writeFileSync('public/images/placeholder-avatar.svg', placeholderSVG)
  console.log('✅ Image placeholder créée')
  
  console.log('\\n🎉 Correction terminée avec succès!')
  console.log('\\n📋 Résumé des corrections:')
  console.log('- ✅ Mapping correct des fichiers SVG existants')
  console.log('- ✅ Fallback vers initiales pour les formateurs sans SVG')
  console.log('- ✅ Validation améliorée des URLs d\'images')
  console.log('- ✅ Gestion d\'erreur robuste')
  console.log('- ✅ Image placeholder par défaut')
  console.log('\\n🚀 Redéployez votre application pour voir les corrections!')
  
} catch (error) {
  console.error('❌ Erreur lors de l\'écriture des fichiers:', error)
  process.exit(1)
}