'use client';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Star } from 'lucide-react';
var TrustIndicators = function () {
    var indicators = [
        { icon: Shield, label: "Certifié RNCP", value: "100%" },
        { icon: Award, label: "Taux de réussite", value: "98%" },
        { icon: Users, label: "Étudiants satisfaits", value: "4.9/5" },
        { icon: Star, label: "Entreprises partenaires", value: "100+" }
    ];
    return (<motion.div className="flex flex-wrap justify-center gap-6 mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
      {indicators.map(function (item, index) { return (<motion.div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20" whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}>
          <item.icon className="w-4 h-4 text-primary-yellow"/>
          <span className="text-sm font-medium text-white">{item.label}</span>
          <span className="text-sm font-bold text-primary-yellow">{item.value}</span>
        </motion.div>); })}
    </motion.div>);
};
export default TrustIndicators;
