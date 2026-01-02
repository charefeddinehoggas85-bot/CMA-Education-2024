'use client'

import { ReactNode } from 'react'
import UnifiedHeader from './UnifiedHeader'
import Footer from './Footer'
import FloatingActions from '@/components/ui/FloatingActions'

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen ${className}`}>
      <UnifiedHeader />
      <main className="pt-16 sm:pt-18 lg:pt-20">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}

export default PageLayout
