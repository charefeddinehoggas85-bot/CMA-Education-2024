'use client'

import { motion } from 'framer-motion'

export const ConstructionGrid = () => (
  <div className="absolute inset-0 opacity-10">
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
)

export const FloatingCrane = () => (
  <motion.div
    className="absolute top-20 right-10 opacity-20"
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 2, 0]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg width="120" height="200" viewBox="0 0 120 200" className="text-primary-yellow">
      <path d="M60 20 L60 180 M20 40 L100 40 M60 40 L60 20 L80 20" 
            stroke="currentColor" strokeWidth="3" fill="none"/>
      <circle cx="60" cy="180" r="8" fill="currentColor"/>
      <rect x="75" y="15" width="20" height="10" fill="currentColor"/>
    </svg>
  </motion.div>
)

export const BuildingBlocks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-16 h-16 border-2 border-primary-yellow/30"
        style={{
          left: `${10 + i * 15}%`,
          top: `${20 + (i % 2) * 60}%`,
        }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 6 + i,
          repeat: Infinity,
          delay: i * 0.5
        }}
      />
    ))}
  </div>
)

export const GeometricPattern = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg className="w-full h-full opacity-5" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FADD82" />
          <stop offset="100%" stopColor="#0D4BD3" />
        </linearGradient>
      </defs>
      {[...Array(20)].map((_, i) => (
        <motion.polygon
          key={i}
          points={`${50 + i * 15},${50 + i * 10} ${100 + i * 15},${50 + i * 10} ${75 + i * 15},${100 + i * 10}`}
          fill="url(#grad1)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </svg>
  </div>
)
