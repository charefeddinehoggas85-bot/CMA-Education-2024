'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedIconProps {
  children: ReactNode
  variant?: 'bounce' | 'rotate' | 'pulse' | 'float' | 'glow' | 'morph' | 'shake'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  background?: boolean
  backgroundVariant?: 'circle' | 'square' | 'hexagon' | 'gradient'
  className?: string
  onClick?: () => void
}

const AnimatedIcon = ({
  children,
  variant = 'float',
  size = 'md',
  color = 'text-primary-blue',
  background = false,
  backgroundVariant = 'circle',
  className = '',
  onClick
}: AnimatedIconProps) => {
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const backgroundSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  const backgroundClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    hexagon: 'rounded-xl transform rotate-45',
    gradient: 'rounded-full bg-gradient-to-br from-primary-blue to-purple-600'
  }

  const animations = {
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    rotate: {
      rotate: [0, 360],
      transition: { duration: 3, repeat: Infinity, ease: "linear" }
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    float: {
      y: [0, -8, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    glow: {
      boxShadow: [
        "0 0 0 0 rgba(59, 130, 246, 0)",
        "0 0 20px 10px rgba(59, 130, 246, 0.3)",
        "0 0 0 0 rgba(59, 130, 246, 0)"
      ],
      transition: { duration: 2, repeat: Infinity }
    },
    morph: {
      borderRadius: ["50%", "25%", "50%"],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    shake: {
      x: [0, -2, 2, -2, 2, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
    }
  }

  const IconWrapper = ({ children: iconChildren }: { children: ReactNode }) => {
    if (background) {
      return (
        <motion.div
          className={`
            ${backgroundSizes[size]} 
            ${backgroundVariant === 'gradient' ? backgroundClasses.gradient : 'bg-white shadow-lg'} 
            ${backgroundClasses[backgroundVariant]}
            flex items-center justify-center
            ${onClick ? 'cursor-pointer hover:shadow-xl' : ''}
            ${className}
          `}
          animate={animations[variant]}
          whileHover={onClick ? { scale: 1.1 } : {}}
          whileTap={onClick ? { scale: 0.95 } : {}}
          onClick={onClick}
        >
          <div className={`${sizeClasses[size]} ${color} flex items-center justify-center`}>
            {iconChildren}
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div
        className={`
          ${sizeClasses[size]} 
          ${color} 
          flex items-center justify-center
          ${onClick ? 'cursor-pointer' : ''}
          ${className}
        `}
        animate={animations[variant]}
        whileHover={onClick ? { scale: 1.1 } : {}}
        whileTap={onClick ? { scale: 0.95 } : {}}
        onClick={onClick}
      >
        {iconChildren}
      </motion.div>
    )
  }

  return <IconWrapper>{children}</IconWrapper>
}

// Composant d'icône avec effet de particules
export const ParticleIcon = ({ 
  children, 
  particleCount = 8,
  className = '',
  onClick 
}: { 
  children: ReactNode
  particleCount?: number
  className?: string
  onClick?: () => void
}) => {
  return (
    <motion.div 
      className={`relative inline-block ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover="hover"
      onClick={onClick}
    >
      {/* Icône principale */}
      <motion.div
        variants={{
          hover: { scale: 1.1, rotate: 5 }
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
      
      {/* Particules */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-yellow rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          variants={{
            hover: {
              x: Math.cos((i / particleCount) * Math.PI * 2) * 30,
              y: Math.sin((i / particleCount) * Math.PI * 2) * 30,
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }
          }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        />
      ))}
    </motion.div>
  )
}

// Composant d'icône avec effet de morphing
export const MorphIcon = ({ 
  icon1, 
  icon2, 
  className = '',
  onClick 
}: { 
  icon1: ReactNode
  icon2: ReactNode
  className?: string
  onClick?: () => void
}) => {
  return (
    <motion.div
      className={`relative inline-block ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover="hover"
      onClick={onClick}
    >
      <motion.div
        variants={{
          hover: { opacity: 0, scale: 0.8, rotate: 180 }
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
      >
        {icon1}
      </motion.div>
      
      <motion.div
        variants={{
          hover: { opacity: 1, scale: 1, rotate: 0 }
        }}
        initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
        transition={{ duration: 0.3 }}
      >
        {icon2}
      </motion.div>
    </motion.div>
  )
}

export default AnimatedIcon
