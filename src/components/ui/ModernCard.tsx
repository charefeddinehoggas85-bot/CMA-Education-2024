'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ReactNode } from 'react'

interface ModernCardProps {
  image?: string
  title: string
  description: string
  icon?: ReactNode
  gradient?: string
  className?: string
  onClick?: () => void
}

const ModernCard = ({ 
  image, 
  title, 
  description, 
  icon, 
  gradient = 'from-primary-blue to-primary-blue/80',
  className = '',
  onClick 
}: ModernCardProps) => {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${className}`}
      whileHover={{ y: -8 }}
      onClick={onClick}
    >
      {/* Image Background */}
      {image && (
        <div className="aspect-[4/3] relative">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={false}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
        </div>
      )}
      
      {/* Content */}
      <div className={`${image ? 'absolute inset-0 flex flex-col justify-end' : 'bg-white'} p-6`}>
        <div className={`${image ? 'text-white' : 'text-gray-800'}`}>
          {icon && (
            <div className="mb-4 flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
              {icon}
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary-yellow transition-colors duration-300">
            {title}
          </h3>
          
          <p className={`${image ? 'text-gray-200' : 'text-gray-600'} leading-relaxed`}>
            {description}
          </p>
        </div>
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Decorative Element */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-primary-yellow rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0" />
    </motion.div>
  )
}

export default ModernCard
