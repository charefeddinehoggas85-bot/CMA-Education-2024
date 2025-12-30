'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface SmartImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
  responsive?: boolean
  breakpoints?: {
    micro?: string
    mobile?: string
    tablet?: string
    desktop?: string
    large?: string
    ultra?: string
  }
}

const SmartImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes: customSizes,
  fill = false,
  objectFit = 'cover',
  loading = 'lazy',
  responsive = true,
  breakpoints = {
    micro: '240px',
    mobile: '480px',
    tablet: '768px',
    desktop: '1200px',
    large: '1920px',
    ultra: '2560px'
  }
}: SmartImageProps) => {
  const [screenCategory, setScreenCategory] = useState<string>('desktop')
  const [pixelRatio, setPixelRatio] = useState<number>(1)

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth
      const ratio = window.devicePixelRatio || 1
      
      setPixelRatio(ratio)
      
      if (width < 320) setScreenCategory('micro')
      else if (width < 480) setScreenCategory('mobile')
      else if (width < 896) setScreenCategory('tablet')
      else if (width < 1440) setScreenCategory('desktop')
      else if (width < 2240) setScreenCategory('large')
      else setScreenCategory('ultra')
    }

    updateScreenInfo()
    window.addEventListener('resize', updateScreenInfo)
    return () => window.removeEventListener('resize', updateScreenInfo)
  }, [])

  // Générer les sizes automatiquement si responsive
  const generateSizes = () => {
    if (customSizes) return customSizes
    if (!responsive) return undefined

    return `
      (max-width: 320px) ${breakpoints.micro},
      (max-width: 480px) ${breakpoints.mobile},
      (max-width: 896px) ${breakpoints.tablet},
      (max-width: 1440px) ${breakpoints.desktop},
      (max-width: 2240px) ${breakpoints.large},
      ${breakpoints.ultra}
    `.replace(/\s+/g, ' ').trim()
  }

  // Ajuster la qualité selon l'écran
  const getOptimalQuality = () => {
    if (screenCategory === 'micro') return Math.max(50, quality - 25)
    if (screenCategory === 'mobile') return Math.max(60, quality - 15)
    if (screenCategory === 'ultra' && pixelRatio > 1) return Math.min(95, quality + 20)
    if (pixelRatio > 2) return Math.min(90, quality + 15)
    return quality
  }

  // Classes responsive pour l'image
  const getResponsiveClasses = () => {
    if (!responsive) return className

    const baseClasses = 'w-full h-auto'
    const responsiveClasses = `
      ${screenCategory === 'micro' ? 'max-w-micro' : ''}
      ${screenCategory === 'mobile' ? 'max-w-sm' : ''}
      ${screenCategory === 'tablet' ? 'max-w-md' : ''}
      ${screenCategory === 'desktop' ? 'max-w-lg' : ''}
      ${screenCategory === 'large' ? 'max-w-xl' : ''}
      ${screenCategory === 'ultra' ? 'max-w-2xl' : ''}
    `.trim()

    return `${baseClasses} ${responsiveClasses} ${className}`.replace(/\s+/g, ' ').trim()
  }

  const imageProps = {
    src,
    alt,
    className: getResponsiveClasses(),
    priority,
    quality: getOptimalQuality(),
    placeholder,
    ...(blurDataURL && { blurDataURL }),
    sizes: generateSizes(),
    loading,
    ...(fill ? { fill: true } : { width, height }),
    ...(fill && { style: { objectFit } })
  }

  return <Image {...imageProps} />
}

export default SmartImage