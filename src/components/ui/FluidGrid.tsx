'use client'

import { ReactNode, useEffect, useState } from 'react'

interface FluidGridProps {
  children: ReactNode
  className?: string
  minItemWidth?: string
  maxCols?: number
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid'
  autoFit?: boolean
  equalHeight?: boolean
}

const FluidGrid = ({
  children,
  className = '',
  minItemWidth = '280px',
  maxCols = 12,
  gap = 'fluid',
  autoFit = true,
  equalHeight = false
}: FluidGridProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(1200)

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    updateScreenWidth()
    window.addEventListener('resize', updateScreenWidth)
    return () => window.removeEventListener('resize', updateScreenWidth)
  }, [])

  // Calculer le nombre optimal de colonnes
  const calculateOptimalCols = () => {
    const containerWidth = screenWidth * 0.9 // Approximation avec padding
    const itemWidthNum = parseInt(minItemWidth.replace('px', ''))
    const gapSize = gap === 'fluid' ? Math.max(16, screenWidth * 0.02) : 
                   gap === 'xs' ? 8 :
                   gap === 'sm' ? 16 :
                   gap === 'md' ? 24 :
                   gap === 'lg' ? 32 : 40

    const possibleCols = Math.floor((containerWidth + gapSize) / (itemWidthNum + gapSize))
    return Math.min(Math.max(1, possibleCols), maxCols)
  }

  const optimalCols = calculateOptimalCols()

  // Classes de gap adaptatives
  const gapClasses = {
    'xs': 'gap-2',
    'sm': 'gap-4',
    'md': 'gap-6',
    'lg': 'gap-8',
    'xl': 'gap-10',
    'fluid': screenWidth < 480 ? 'gap-2' :
             screenWidth < 768 ? 'gap-4' :
             screenWidth < 1024 ? 'gap-6' :
             screenWidth < 1440 ? 'gap-8' : 'gap-10'
  }

  // Style CSS Grid dynamique
  const gridStyle = autoFit ? {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
    ...(equalHeight && { gridAutoRows: '1fr' })
  } : {
    display: 'grid',
    gridTemplateColumns: `repeat(${optimalCols}, 1fr)`,
    ...(equalHeight && { gridAutoRows: '1fr' })
  }

  const finalClassName = `${gapClasses[gap]} ${className}`.trim()

  return (
    <div 
      className={finalClassName}
      style={gridStyle}
    >
      {children}
    </div>
  )
}

export default FluidGrid