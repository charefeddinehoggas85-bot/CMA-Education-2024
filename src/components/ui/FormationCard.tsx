'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import AnimatedIcon from './AnimatedIcon'

interface FormationCardProps {
  title: string
  level: string
  rncp?: string
  description: string
  icon: ReactNode
  image: string
  gradient: string
  index: number
}

const FormationCard = ({ title, level, rncp, description, icon, image, gradient, index }: FormationCardProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Background Image with Overlay */}
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
        
        {/* Geometric Overlay */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20" viewBox="0 0 400 300">
            <motion.polygon
              points="0,0 100,0 80,80 0,60"
              fill="rgba(255,255,255,0.2)"
              animate={{ 
                points: [
                  "0,0 100,0 80,80 0,60",
                  "0,0 120,20 100,100 0,80",
                  "0,0 100,0 80,80 0,60"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle
              cx="350" cy="50" r="30"
              fill="rgba(255,255,255,0.1)"
              animate={{ 
                r: [30, 40, 30],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </svg>
        </div>

        {/* Level Badge */}
        <div className="absolute top-4 left-4">
          <motion.div
            className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white font-bold text-sm">{level}</span>
          </motion.div>
        </div>

        {/* Icon */}
        <div className="absolute top-4 right-4">
          <motion.div
            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Decorative line */}
        <motion.div 
          className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-primary-blue to-primary-yellow rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <motion.h3 
          className="text-2xl font-bold text-gray-800 mb-2 mt-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {title}
        </motion.h3>
        
        {rncp && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <span className="bg-primary-yellow/20 text-primary-blue px-3 py-1 rounded-full text-sm font-semibold">
              {rncp}
            </span>
          </motion.div>
        )}

        <motion.p 
          className="text-gray-600 leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {description}
        </motion.p>

        {/* Action Area */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="text-primary-blue font-semibold">En alternance</span>
          <motion.button
            className="bg-gradient-to-r from-primary-blue to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Découvrir →
          </motion.button>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="w-full h-full bg-gradient-to-br from-primary-yellow/20 to-primary-blue/20 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default FormationCard