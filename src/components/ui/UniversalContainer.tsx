'use client'

import { ReactNode, useEffect, useState } from 'react'

interface UniversalContainerProps {
  children: ReactNode
  className?: string
  size?: 'micro' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'fluid' | 'content' | 'full'
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid'
  center?: boolean
  as?: keyof JSX.IntrinsicElements
}

const UniversalContainer = ({
  children,
  className = '',
  size = 'fluid',
  padding = 'fluid',
  center = true,
  as: Component = 'div'
}: UniversalContainerProps) => {
  const [screenCategory, setScreenCategory] = useState<string>('desktop')

  useEffect(() => {
    const updateScreenCategory = () => {
      const width = window.innerWidth
      
      if (width < 320) setScreenCategory('micro')
      else if (width < 480) setScreenCategory('mobile')
      else if (width < 896) setScreenCategory('tablet')
      else if (width < 1440) setScreenCategory('desktop')
      else if (width < 2240) setScreenCategory('large')
      else setScreenCategory('ultra')
    }

    updateScreenCategory()
    window.addEventListener('resize', updateScreenCategory)
    return () => window.removeEventListener('resize', updateScreenCategory)
  }, [])

  // Tailles de container adaptatives
  const sizeClasses = {
    'micro': 'max-w-micro',
    'xs': 'max-w-xs',
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    'fluid': screenCategory === 'micro' ? 'max-w-fluid-sm' :
             screenCategory === 'mobile' ? 'max-w-fluid-md' :
             screenCategory === 'tablet' ? 'max-w-fluid-lg' :
             screenCategory === 'desktop' ? 'max-w-fluid-xl' :
             screenCategory === 'large' ? 'max-w-fluid-2xl' : 'max-w-fluid-3xl',
    'content': 'max-w-content',
    'full': 'max-w-full'
  }

  // Paddings adaptatifs
  const paddingClasses = {
    'none': '',
    'xs': 'px-2 py-1',
    'sm': 'px-4 py-2',
    'md': 'px-6 py-3',
    'lg': 'px-8 py-4',
    'xl': 'px-12 py-6',
    'fluid': screenCategory === 'micro' ? 'px-2 py-1' :
             screenCategory === 'mobile' ? 'px-4 py-2' :
             screenCategory === 'tablet' ? 'px-6 py-3' :
             screenCategory === 'desktop' ? 'px-8 py-4' :
             screenCategory === 'large' ? 'px-12 py-6' : 'px-16 py-8'
  }

  const centerClass = center ? 'mx-auto' : ''
  
  const finalClassName = `
    ${sizeClasses[size]} 
    ${paddingClasses[padding]} 
    ${centerClass} 
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <Component className={finalClassName}>
      {children}
    </Component>
  )
}

export default UniversalContainer
