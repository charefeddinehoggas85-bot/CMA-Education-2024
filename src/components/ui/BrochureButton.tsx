'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import BrochureModal from './BrochureModal'

interface BrochureButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode
}

const BrochureButton = ({ 
  variant = 'primary', 
  size = 'md',
  className = '',
  children 
}: BrochureButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const variants = {
    primary: 'bg-gradient-to-r from-primary-blue to-purple-600 text-white hover:shadow-lg',
    secondary: 'bg-orange-500 text-white hover:bg-orange-600',
    outline: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`
          ${variants[variant]}
          ${sizes[size]}
          ${className}
          rounded-xl font-semibold transition-all duration-200
          flex items-center space-x-2
        `}
      >
        <Download className="w-5 h-5" />
        <span>{children || 'Télécharger la brochure'}</span>
      </button>

      <BrochureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default BrochureButton
