'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ModernButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'neon'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  disabled?: boolean
  className?: string
  animate?: boolean
}

const ModernButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  onClick,
  disabled = false,
  className = '',
  animate = true
}: ModernButtonProps) => {
  
  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
    xl: "px-10 py-5 text-xl rounded-2xl"
  }
  
  const variantClasses = {
    primary: "bg-primary-blue text-white hover:bg-blue-700 focus:ring-blue-300 shadow-lg hover:shadow-xl",
    secondary: "bg-primary-yellow text-primary-blue hover:bg-yellow-400 focus:ring-yellow-300 shadow-lg hover:shadow-xl",
    outline: "border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white focus:ring-blue-300",
    ghost: "text-primary-blue hover:bg-blue-50 focus:ring-blue-300",
    gradient: "bg-gradient-to-r from-primary-blue via-purple-600 to-primary-blue bg-size-200 bg-pos-0 hover:bg-pos-100 text-white shadow-lg hover:shadow-2xl",
    neon: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:shadow-2xl border border-cyan-400/30"
  }

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  const ButtonContent = () => (
    <>
      {/* Effet de brillance animé */}
      {animate && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
      
      {/* Contenu du bouton */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {icon && iconPosition === 'left' && (
          <motion.span
            animate={animate ? { rotate: [0, 10, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            {icon}
          </motion.span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <motion.span
            animate={animate ? { x: [0, 5, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="flex items-center"
          >
            {icon}
          </motion.span>
        )}
      </span>

      {/* Effet de particules pour le variant neon */}
      {variant === 'neon' && animate && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-300 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}
    </>
  )

  if (animate) {
    return (
      <motion.button
        className={`${buttonClasses} group`}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ButtonContent />
      </motion.button>
    )
  }

  return (
    <button
      className={`${buttonClasses} group`}
      onClick={onClick}
      disabled={disabled}
    >
      <ButtonContent />
    </button>
  )
}

export default ModernButton
