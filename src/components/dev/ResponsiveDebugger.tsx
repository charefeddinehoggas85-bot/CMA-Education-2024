'use client'

import { useState, useEffect } from 'react'
import { Monitor, Smartphone, Tablet } from 'lucide-react'

interface ViewportInfo {
  width: number
  height: number
  breakpoint: string
  device: string
}

const ResponsiveDebugger = () => {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    breakpoint: '',
    device: ''
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      let breakpoint = ''
      let device = ''
      
      if (width < 475) {
        breakpoint = 'xs'
        device = 'Mobile Small'
      } else if (width < 640) {
        breakpoint = 'sm'
        device = 'Mobile'
      } else if (width < 768) {
        breakpoint = 'md'
        device = 'Mobile Large'
      } else if (width < 1024) {
        breakpoint = 'lg'
        device = 'Tablet'
      } else if (width < 1280) {
        breakpoint = 'xl'
        device = 'Desktop'
      } else {
        breakpoint = '2xl'
        device = 'Large Desktop'
      }
      
      setViewport({ width, height, breakpoint, device })
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

  const getDeviceIcon = () => {
    if (viewport.width < 768) return <Smartphone className="w-4 h-4" />
    if (viewport.width < 1024) return <Tablet className="w-4 h-4" />
    return <Monitor className="w-4 h-4" />
  }

  const getBreakpointColor = () => {
    const colors = {
      'xs': 'bg-red-500',
      'sm': 'bg-orange-500',
      'md': 'bg-yellow-500',
      'lg': 'bg-green-500',
      'xl': 'bg-blue-500',
      '2xl': 'bg-purple-500'
    }
    return colors[viewport.breakpoint as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg font-mono text-xs">
      <div className="flex items-center space-x-3">
        {getDeviceIcon()}
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${getBreakpointColor()}`}></span>
          <span className="font-semibold">{viewport.breakpoint}</span>
        </div>
        <div className="text-gray-300">
          {viewport.width} × {viewport.height}
        </div>
        <div className="text-gray-400">
          {viewport.device}
        </div>
      </div>
      
      {/* Tests en temps réel */}
      <div className="mt-2 pt-2 border-t border-gray-600 space-y-1">
        <div className="flex items-center justify-between">
          <span>Header Height:</span>
          <span className="text-green-400">
            {viewport.width < 768 ? '64px' : viewport.width < 1024 ? '72px' : '80px'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Grid Cols:</span>
          <span className="text-blue-400">
            {viewport.width < 768 ? '1' : viewport.width < 1024 ? '2' : '4'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Menu Type:</span>
          <span className="text-yellow-400">
            {viewport.width < 768 ? 'Mobile' : 'Desktop'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveDebugger