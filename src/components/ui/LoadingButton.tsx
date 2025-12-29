'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingButtonProps {
  children: ReactNode
  onClick?: () => Promise<void> | void
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  loadingText?: string
  disabled?: boolean
  className?: string
}

const LoadingButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  loadingText = 'Chargement...',
  disabled = false,
  className = ''
}: LoadingButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (onClick && !isLoading && !disabled) {
      setIsLoading(true)
      try {
        await onClick()
      } finally {
        setIsLoading(false)
      }
    }
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
  }

  const variantClasses = {
    primary: 'bg-primary-blue text-white hover:bg-blue-700',
    secondary: 'bg-primary-yellow text-primary-blue hover:bg-yellow-400',
    outline: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white',
    gradient: 'bg-gradient-to-r from-primary-blue to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
  }

  const isDisabled = disabled || isLoading

  return (
    <motion.button
      className={`
        relative overflow-hidden font-semibold transition-all duration-300
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
      `}
      onClick={handleClick}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
    >
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-current opacity-20"
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="w-4 h-4" />
              </motion.div>
              <span>{loadingText}</span>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center space-x-2"
            >
              {icon && (
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {icon}
                </motion.span>
              )}
              <span>{children}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 h-1 bg-white/30 origin-left"
            style={{ width: '100%' }}
          />
        )}
      </AnimatePresence>

      {/* Shimmer effect */}
      {!isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </motion.button>
  )
}

export default LoadingButton