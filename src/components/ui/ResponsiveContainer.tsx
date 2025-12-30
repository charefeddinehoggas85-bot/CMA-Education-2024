'use client'

import { ReactNode } from 'react'

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  padding?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
    '3xl'?: string
  }
}

const ResponsiveContainer = ({ 
  children, 
  className = '', 
  size = '2xl',
  padding = {
    xs: 'px-4',
    sm: 'px-6',
    md: 'px-8',
    lg: 'px-12',
    xl: 'px-16',
    '2xl': 'px-20',
    '3xl': 'px-24'
  }
}: ResponsiveContainerProps) => {
  
  // Définir les tailles de container
  const sizeClasses = {
    'sm': 'max-w-screen-sm',
    'md': 'max-w-screen-md',
    'lg': 'max-w-screen-lg',
    'xl': 'max-w-screen-xl',
    '2xl': 'max-w-8xl',
    '3xl': 'max-w-9xl',
    'full': 'max-w-full'
  }

  // Construire les classes de padding
  const paddingClasses = [
    padding.xs,
    padding.sm && `sm:${padding.sm}`,
    padding.md && `md:${padding.md}`,
    padding.lg && `lg:${padding.lg}`,
    padding.xl && `xl:${padding.xl}`,
    padding['2xl'] && `2xl:${padding['2xl']}`,
    padding['3xl'] && `3xl:${padding['3xl']}`
  ].filter(Boolean).join(' ')

  return (
    <div className={`mx-auto ${sizeClasses[size]} ${paddingClasses} ${className}`}>
      {children}
    </div>
  )
}

export default ResponsiveContainer