'use client'

import { useState, useEffect } from 'react'

interface ViewportInfo {
  width: number
  height: number
  category: 'micro' | 'mobile' | 'tablet' | 'desktop' | 'large' | 'ultra'
  breakpoint: string
  device: string
  orientation: 'portrait' | 'landscape'
  pixelRatio: number
  isTouch: boolean
  isRetina: boolean
}

const ViewportDetector = () => {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    category: 'desktop',
    breakpoint: 'lg',
    device: 'Desktop',
    orientation: 'landscape',
    pixelRatio: 1,
    isTouch: false,
    isRetina: false
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = window.devicePixelRatio || 1
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isRetina = pixelRatio > 1
      const orientation = width > height ? 'landscape' : 'portrait'
      
      let category: ViewportInfo['category'] = 'desktop'
      let breakpoint = 'lg'
      let device = 'Desktop'
      
      // Détection intelligente basée sur la taille ET les capacités
      if (width < 320) {
        category = 'micro'
        breakpoint = 'micro'
        device = 'Smartwatch/Micro'
      } else if (width < 480) {
        category = 'mobile'
        breakpoint = 'xs'
        device = isTouch ? 'Mobile Phone' : 'Small Window'
      } else if (width < 896) {
        category = isTouch && orientation === 'portrait' ? 'mobile' : 'tablet'
        breakpoint = width < 624 ? 'sm' : 'md'
        device = isTouch ? (orientation === 'portrait' ? 'Mobile Large' : 'Tablet Small') : 'Small Desktop'
      } else if (width < 1152) {
        category = 'tablet'
        breakpoint = 'lg'
        device = isTouch ? 'Tablet' : 'Desktop Small'
      } else if (width < 1440) {
        category = 'desktop'
        breakpoint = 'xl'
        device = 'Desktop'
      } else if (width < 1728) {
        category = 'desktop'
        breakpoint = '2xl'
        device = 'Desktop Large'
      } else if (width < 2240) {
        category = 'large'
        breakpoint = '3xl'
        device = 'Desktop Wide'
      } else if (width < 3200) {
        category = 'large'
        breakpoint = '4xl'
        device = '2K Display'
      } else if (width < 4480) {
        category = 'ultra'
        breakpoint = '5xl'
        device = '4K Display'
      } else if (width < 6400) {
        category = 'ultra'
        breakpoint = '6xl'
        device = '5K Display'
      } else {
        category = 'ultra'
        breakpoint = '7xl'
        device = '8K Display'
      }
      
      setViewport({
        width,
        height,
        category,
        breakpoint,
        device,
        orientation,
        pixelRatio,
        isTouch,
        isRetina
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  // Afficher seulement en développement
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development')
  }, [])

  if (!isVisible) return null

  const getCategoryColor = () => {
    const colors = {
      'micro': 'bg-red-600',
      'mobile': 'bg-orange-500',
      'tablet': 'bg-yellow-500',
      'desktop': 'bg-green-500',
      'large': 'bg-blue-500',
      'ultra': 'bg-purple-500'
    }
    return colors[viewport.category]
  }

  const getDeviceIcon = () => {
    if (viewport.category === 'micro') return '⌚'
    if (viewport.category === 'mobile') return '📱'
    if (viewport.category === 'tablet') return '📱'
    if (viewport.category === 'ultra') return '🖥️'
    return '💻'
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl shadow-2xl font-mono text-xs max-w-xs">
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-lg">{getDeviceIcon()}</span>
        <div className="flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full ${getCategoryColor()}`}></span>
          <span className="font-bold text-white">{viewport.breakpoint}</span>
        </div>
        <div className="text-gray-300 text-xs">
          {viewport.width} × {viewport.height}
        </div>
      </div>
      
      <div className="text-gray-400 text-xs mb-2">
        {viewport.device} • {viewport.orientation}
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between">
          <span>Category:</span>
          <span className="text-green-400 capitalize">{viewport.category}</span>
        </div>
        <div className="flex justify-between">
          <span>Pixel Ratio:</span>
          <span className="text-blue-400">{viewport.pixelRatio}x</span>
        </div>
        <div className="flex justify-between">
          <span>Touch:</span>
          <span className={viewport.isTouch ? 'text-green-400' : 'text-red-400'}>
            {viewport.isTouch ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Retina:</span>
          <span className={viewport.isRetina ? 'text-green-400' : 'text-gray-400'}>
            {viewport.isRetina ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
      
      {/* Recommandations automatiques */}
      <div className="mt-2 pt-2 border-t border-gray-600">
        <div className="text-xs text-gray-300">
          <div className="flex justify-between">
            <span>Grid Cols:</span>
            <span className="text-yellow-400">
              {viewport.category === 'micro' ? '1' :
               viewport.category === 'mobile' ? '1-2' :
               viewport.category === 'tablet' ? '2-3' :
               viewport.category === 'desktop' ? '3-4' :
               viewport.category === 'large' ? '4-6' : '6-8'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Container:</span>
            <span className="text-purple-400">
              {viewport.category === 'micro' ? 'micro' :
               viewport.category === 'mobile' ? 'fluid-sm' :
               viewport.category === 'tablet' ? 'fluid-md' :
               viewport.category === 'desktop' ? 'fluid-lg' :
               viewport.category === 'large' ? 'fluid-xl' : 'fluid-2xl'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewportDetector
