'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, Briefcase } from 'lucide-react'

const ValueProposition = () => {
  const values = [
    {
      icon: Clock,
      title: "Formation accélérée",
      subtitle: "18 mois pour devenir expert"
    },
    {
      icon: MapPin,
      title: "100% terrain",
      subtitle: "Chantiers réels dès le 1er jour"
    },
    {
      icon: Briefcase,
      title: "Emploi garanti",
      subtitle: "98% d'insertion professionnelle"
    }
  ]

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {values.map((value, index) => (
        <motion.div
          key={index}
          className="text-center group"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-yellow to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <value.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{value.title}</h3>
          <p className="text-sm text-gray-300">{value.subtitle}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ValueProposition