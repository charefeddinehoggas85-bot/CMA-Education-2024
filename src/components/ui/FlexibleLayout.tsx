'use client'

import { ReactNode, useEffect, useState } from 'react'

interface FlexibleLayoutProps {
  children: ReactNode
  className?: string
  direction?: 'row' | 'column' | 'auto'
  wrap?: boolean
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  breakpoint?: number
  mobileDirection?: 'row' | 'column'
  desktopDirection?: 'row' | 'column'
}

const FlexibleLayout = ({
  children,
  className = '',
  direction = 'auto',
  wrap = true,
  gap = 'fluid',
  align = 'start',
  justify = 'start',
  breakpoint = 768,
  mobileDirection = 'column',
  desktopDirection = 'row'
}: FlexibleLayoutProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(1200)

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    updateScreenWidth()
    window.addEventListener('resize', updateScreenWidth)
    return () => window.removeEventListener('resize', updateScreenWidth)
  }, [])

  // Déterminer la direction automatiquement
  const getDirection = () => {
    if (direction !== 'auto') return direction
    return screenWidth < breakpoint ? mobileDirection : desktopDirection
  }

  // Classes de direction
  const directionClasses = {
    'row': 'flex-row',
    'column': 'flex-col'
  }

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

  // Classes d'alignement
  const alignClasses = {
    'start': 'items-start',
    'center': 'items-center',
    'end': 'items-end',
    'stretch': 'items-stretch'
  }

  // Classes de justification
  const justifyClasses = {
    'start': 'justify-start',
    'center': 'justify-center',
    'end': 'justify-end',
    'between': 'justify-between',
    'around': 'justify-around',
    'evenly': 'justify-evenly'
  }

  const currentDirection = getDirection()
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap'

  const finalClassName = `
    flex
    ${directionClasses[currentDirection]}
    ${wrapClass}
    ${gapClasses[gap]}
    ${alignClasses[align]}
    ${justifyClasses[justify]}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <div className={finalClassName}>
      {children}
    </div>
  )
}

export default FlexibleLayout