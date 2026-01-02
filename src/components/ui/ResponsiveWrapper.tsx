'use client'

import { ReactNode } from 'react'

interface ResponsiveWrapperProps {
  children: ReactNode
  className?: string
  type?: 'section' | 'hero' | 'content' | 'form'
}

const ResponsiveWrapper = ({ 
  children, 
  className = '', 
  type = 'content' 
}: ResponsiveWrapperProps) => {
  const getTypeClass = () => {
    switch (type) {
      case 'hero': return 'hero-section'
      case 'section': return 'content-section'
      case 'form': return 'form-responsive'
      default: return 'section-container'
    }
  }

  return (
    <div className={`${getTypeClass()} ${className}`}>
      {children}
    </div>
  )
}

export default ResponsiveWrapper
