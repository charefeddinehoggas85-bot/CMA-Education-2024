'use client'

import { ReactNode } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import FloatingActions from '@/components/ui/FloatingActions'

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen ${className}`}>
      <Navigation />
      <main className="pt-header-offset md:pt-header-offset-mobile">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}

export default PageLayout