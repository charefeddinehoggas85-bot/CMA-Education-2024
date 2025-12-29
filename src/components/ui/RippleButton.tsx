'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState, useRef } from 'react'

interface RippleButtonProps {
  children: ReactNode
  onClick?: (e: React.MouseEvent) => void
  variant?: 'primary' | 'secondary' | 'outline' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  rippleColor?: string
  className?: string
  disabled?: boolean
}

interface Ripple {
  id: number
  x: number
  y: number
}

const RippleButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  rippleColor = 'rgba(255, 255, 255, 0.6)',
  className = '',
  disabled = false
}: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
  }

  const variantClasses = {
    primary: 'bg-primary-blue text-white hover:bg-blue-700',
    secondary: 'bg-primary-yellow text-primary-blue hover:bg-yellow-400',
    outline: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white',
    glass: 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
  }

  const createRipple = (e: React.MouseEvent) => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y
    }

    setRipples(prev => [...prev, newRipple])

    // Supprimer le ripple après l'animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!disabled) {
      createRipple(e)
      onClick?.(e)
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative overflow-hidden font-semibold transition-all duration-300
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
      `}
      onClick={handleClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ 
            width: 300, 
            height: 300, 
            opacity: 0 
          }}
          transition={{ 
            duration: 0.6, 
            ease: 'easeOut' 
          }}
        />
      ))}

      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
        whileHover={{ opacity: 1, x: ['-100%', '100%'] }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}

export default RippleButton