'use client'

import { ReactNode } from 'react'

interface ResponsiveTextProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  size?: 'micro' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | '10xl'
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
  color?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  className?: string
  fluid?: boolean
  maxWidth?: string
}

const ResponsiveText = ({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'text-gray-900',
  align = 'left',
  className = '',
  fluid = true,
  maxWidth
}: ResponsiveTextProps) => {
  
  // Classes de taille (fluides par défaut)
  const sizeClasses = fluid ? {
    'micro': 'text-micro',
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl',
    '9xl': 'text-9xl',
    '10xl': 'text-10xl'
  } : {
    'micro': 'text-fixed-xs',
    'xs': 'text-fixed-xs',
    'sm': 'text-fixed-sm',
    'base': 'text-fixed-base',
    'lg': 'text-fixed-lg',
    'xl': 'text-fixed-xl',
    '2xl': 'text-fixed-xl',
    '3xl': 'text-fixed-xl',
    '4xl': 'text-fixed-xl',
    '5xl': 'text-fixed-xl',
    '6xl': 'text-fixed-xl',
    '7xl': 'text-fixed-xl',
    '8xl': 'text-fixed-xl',
    '9xl': 'text-fixed-xl',
    '10xl': 'text-fixed-xl'
  }

  // Classes de poids
  const weightClasses = {
    'thin': 'font-thin',
    'light': 'font-light',
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
    'extrabold': 'font-extrabold',
    'black': 'font-black'
  }

  // Classes d'alignement
  const alignClasses = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right',
    'justify': 'text-justify'
  }

  const finalClassName = `
    ${sizeClasses[size]}
    ${weightClasses[weight]}
    ${color}
    ${alignClasses[align]}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  const style = maxWidth ? { maxWidth } : undefined

  return (
    <Component className={finalClassName} style={style}>
      {children}
    </Component>
  )
}

export default ResponsiveText
