'use client'

import { ReactNode, memo } from 'react'

interface OptimizedButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const OptimizedButton = memo(({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled = false,
  className = ''
}: OptimizedButtonProps) => {
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
    xl: "px-10 py-5 text-xl rounded-2xl"
  }
  
  const variantClasses = {
    primary: "bg-primary-blue text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
    secondary: "bg-primary-yellow text-primary-blue hover:bg-yellow-400 shadow-lg hover:shadow-xl",
    gradient: "bg-gradient-to-r from-primary-blue to-purple-600 text-white shadow-lg hover:shadow-2xl"
  }

  const baseClasses = "relative font-semibold transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} group`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="flex items-center justify-center space-x-2">
        <span>{children}</span>
        {icon && (
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </button>
  )
})

OptimizedButton.displayName = 'OptimizedButton'

export default OptimizedButton