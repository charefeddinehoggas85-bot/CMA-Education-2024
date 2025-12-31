'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { Plus, X } from 'lucide-react'

interface FloatingAction {
  icon: ReactNode
  label: string
  onClick: () => void
  color?: string
}

interface FloatingActionButtonProps {
  actions: FloatingAction[]
  mainIcon?: ReactNode
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'glass'
}

const FloatingActionButton = ({
  actions,
  mainIcon = <Plus className="w-6 h-6" />,
  position = 'bottom-right',
  size = 'md',
  variant = 'gradient'
}: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }

  const variantClasses = {
    default: 'bg-primary-blue text-white shadow-lg',
    gradient: 'bg-gradient-to-r from-primary-blue to-purple-600 text-white shadow-lg shadow-blue-500/25',
    glass: 'bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg'
  }

  const getActionPosition = (index: number) => {
    const isBottom = position.includes('bottom')
    const isRight = position.includes('right')
    
    const distance = 80
    const baseY = isBottom ? -distance * (index + 1) : distance * (index + 1)
    
    return {
      x: 0,
      y: baseY
    }
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Actions secondaires */}
      <AnimatePresence>
        {isOpen && actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, ...getActionPosition(index) }}
            animate={{ opacity: 1, scale: 1, x: 0, y: getActionPosition(index).y }}
            exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="absolute"
            style={{
              bottom: position.includes('bottom') ? `${(index + 1) * 70}px` : 'auto',
              top: position.includes('top') ? `${(index + 1) * 70}px` : 'auto',
              right: position.includes('right') ? '0' : 'auto',
              left: position.includes('left') ? '0' : 'auto'
            }}
          >
            <motion.button
              className={`
                ${sizeClasses.sm} 
                ${variantClasses[variant]}
                rounded-full flex items-center justify-center
                hover:shadow-xl transition-all duration-300
                group relative overflow-hidden
              `}
              onClick={action.onClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative z-10">
                {action.icon}
              </span>
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: position.includes('right') ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`
                  absolute ${position.includes('right') ? 'right-full mr-3' : 'left-full ml-3'}
                  bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  pointer-events-none
                `}
              >
                {action.label}
                <div className={`
                  absolute top-1/2 transform -translate-y-1/2
                  ${position.includes('right') ? 'left-full' : 'right-full'}
                  w-0 h-0 border-4
                  ${position.includes('right') 
                    ? 'border-l-gray-900 border-r-transparent border-t-transparent border-b-transparent'
                    : 'border-r-gray-900 border-l-transparent border-t-transparent border-b-transparent'
                  }
                `} />
              </motion.div>
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Bouton principal */}
      <motion.button
        className={`
          ${sizeClasses[size]} 
          ${variantClasses[variant]}
          rounded-full flex items-center justify-center
          hover:shadow-2xl transition-all duration-300
          relative overflow-hidden group
        `}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Effet de pulsation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <span className="relative z-10">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mainIcon}
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      </motion.button>

      {/* Overlay pour fermer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingActionButton
