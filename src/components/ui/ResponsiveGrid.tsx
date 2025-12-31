'use client'

import { ReactNode } from 'react'

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
  cols?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
    '3xl'?: number
  }
  gap?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
    '3xl'?: number
  }
}

const ResponsiveGrid = ({ 
  children, 
  className = '', 
  cols = {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 6,
    '3xl': 8
  },
  gap = {
    xs: 4,
    sm: 4,
    md: 6,
    lg: 6,
    xl: 8,
    '2xl': 8,
    '3xl': 10
  }
}: ResponsiveGridProps) => {
  
  // Construire les classes de colonnes
  const colClasses = [
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    cols['2xl'] && `2xl:grid-cols-${cols['2xl']}`,
    cols['3xl'] && `3xl:grid-cols-${cols['3xl']}`
  ].filter(Boolean).join(' ')

  // Construire les classes de gap
  const gapClasses = [
    gap.xs && `gap-${gap.xs}`,
    gap.sm && `sm:gap-${gap.sm}`,
    gap.md && `md:gap-${gap.md}`,
    gap.lg && `lg:gap-${gap.lg}`,
    gap.xl && `xl:gap-${gap.xl}`,
    gap['2xl'] && `2xl:gap-${gap['2xl']}`,
    gap['3xl'] && `3xl:gap-${gap['3xl']}`
  ].filter(Boolean).join(' ')

  return (
    <div className={`grid ${colClasses} ${gapClasses} ${className}`}>
      {children}
    </div>
  )
}

export default ResponsiveGrid
