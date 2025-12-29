'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface MorphButtonProps {
  primaryText: string
  secondaryText: string
  primaryIcon?: ReactNode
  secondaryIcon?: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const MorphButton = ({
  primaryText,
  secondaryText,
  primaryIcon,
  secondaryIcon,
  onClick,
  variant = 'primary',
  size = 'md',
  className = ''
}: MorphButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'bg-primary-blue text-white',
    secondary: 'bg-primary-yellow text-primary-blue',
    gradient: 'bg-gradient-to-r from-primary-blue to-purple-600 text-white'
  }

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-xl font-semibold
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        transition-all duration-300
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background morphing */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '0%' : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Content container */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <AnimatePresence mode="wait">
          {isHovered ? (
            <motion.div
              key="secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              {secondaryIcon && (
                <motion.span
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {secondaryIcon}
                </motion.span>
              )}
              <span>{secondaryText}</span>
            </motion.div>
          ) : (
            <motion.div
              key="primary"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              {primaryIcon && (
                <motion.span
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {primaryIcon}
                </motion.span>
              )}
              <span>{primaryText}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Particle effect */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -20, -40]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default MorphButton