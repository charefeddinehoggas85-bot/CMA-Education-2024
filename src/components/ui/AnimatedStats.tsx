'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface StatProps {
  number: string
  label: string
  suffix?: string
  icon?: React.ReactNode
  color?: string
  delay?: number
}

const AnimatedStat = ({ number, label, suffix = '', icon, color = 'primary-blue', delay = 0 }: StatProps) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const targetNumber = parseInt(number.replace(/\D/g, ''))

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0
        const increment = targetNumber / 50
        const counter = setInterval(() => {
          start += increment
          if (start >= targetNumber) {
            setCount(targetNumber)
            clearInterval(counter)
          } else {
            setCount(Math.floor(start))
          }
        }, 30)
      }, delay * 1000)
      
      return () => clearTimeout(timer)
    }
  }, [isInView, targetNumber, delay])

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {/* Background avec glassmorphisme */}
      <div className="absolute inset-0 glass-card rounded-2xl group-hover:bg-white/40 transition-all duration-300" />
      
      {/* Forme géométrique animée */}
      <motion.div 
        className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-${color}/20 to-${color}/40 rounded-full blur-xl`}
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <div className="relative p-8 text-center">
        {/* Icône */}
        {icon && (
          <motion.div 
            className="mb-4 flex justify-center"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className={`w-12 h-12 bg-gradient-to-br from-${color} to-${color}/80 rounded-xl flex items-center justify-center shadow-lg`}>
              {icon}
            </div>
          </motion.div>
        )}
        
        {/* Nombre animé */}
        <motion.div 
          className={`text-4xl md:text-5xl font-montserrat font-bold text-${color} mb-2`}
          animate={{ scale: isInView ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
        >
          {count}{suffix}
        </motion.div>
        
        {/* Label */}
        <motion.div 
          className="text-gray-600 font-medium text-sm uppercase tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
        >
          {label}
        </motion.div>
        
        {/* Barre de progression */}
        <motion.div 
          className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: delay + 0.8 }}
        >
          <motion.div 
            className={`h-full bg-gradient-to-r from-${color} to-${color}/60 rounded-full`}
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '0%' } : {}}
            transition={{ duration: 1.5, delay: delay + 1 }}
          />
        </motion.div>
      </div>
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${color} rounded-full`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5 + delay
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default AnimatedStat