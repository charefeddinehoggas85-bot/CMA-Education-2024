'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
var AccessibilityBadge = function () {
    return (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-200">
      <Image src="/images/handicap.webp" alt="Accessibilité Handicap" width={32} height={32} className="w-8 h-8"/>
      <div className="text-left">
        <p className="text-sm font-semibold text-gray-900">Accessibilité Handicap</p>
        <p className="text-xs text-gray-600">Formations accessibles à tous</p>
      </div>
    </motion.div>);
};
export default AccessibilityBadge;
