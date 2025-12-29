'use client';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
var AnimatedStat = function (_a) {
    var number = _a.number, label = _a.label, _b = _a.suffix, suffix = _b === void 0 ? '' : _b, icon = _a.icon, _c = _a.color, color = _c === void 0 ? 'primary-blue' : _c, _d = _a.delay, delay = _d === void 0 ? 0 : _d;
    var _e = useState(0), count = _e[0], setCount = _e[1];
    var ref = useRef(null);
    var isInView = useInView(ref, { once: true });
    var targetNumber = parseInt(number.replace(/\D/g, ''));
    useEffect(function () {
        if (isInView) {
            var timer_1 = setTimeout(function () {
                var start = 0;
                var increment = targetNumber / 50;
                var counter = setInterval(function () {
                    start += increment;
                    if (start >= targetNumber) {
                        setCount(targetNumber);
                        clearInterval(counter);
                    }
                    else {
                        setCount(Math.floor(start));
                    }
                }, 30);
            }, delay * 1000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [isInView, targetNumber, delay]);
    return (<motion.div ref={ref} className="relative group" initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: delay }}>
      {/* Background avec glassmorphisme */}
      <div className="absolute inset-0 glass-card rounded-2xl group-hover:bg-white/40 transition-all duration-300"/>
      
      {/* Forme géométrique animée */}
      <motion.div className={"absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-".concat(color, "/20 to-").concat(color, "/40 rounded-full blur-xl")} animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
        }} transition={{ duration: 4, repeat: Infinity }}/>
      
      <div className="relative p-8 text-center">
        {/* Icône */}
        {icon && (<motion.div className="mb-4 flex justify-center" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className={"w-12 h-12 bg-gradient-to-br from-".concat(color, " to-").concat(color, "/80 rounded-xl flex items-center justify-center shadow-lg")}>
              {icon}
            </div>
          </motion.div>)}
        
        {/* Nombre animé */}
        <motion.div className={"text-4xl md:text-5xl font-montserrat font-bold text-".concat(color, " mb-2")} animate={{ scale: isInView ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.5, delay: delay + 0.5 }}>
          {count}{suffix}
        </motion.div>
        
        {/* Label */}
        <motion.div className="text-gray-600 font-medium text-sm uppercase tracking-wide" initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay + 0.3 }}>
          {label}
        </motion.div>
        
        {/* Barre de progression */}
        <motion.div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden" initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: delay + 0.8 }}>
          <motion.div className={"h-full bg-gradient-to-r from-".concat(color, " to-").concat(color, "/60 rounded-full")} initial={{ x: '-100%' }} animate={isInView ? { x: '0%' } : {}} transition={{ duration: 1.5, delay: delay + 1 }}/>
        </motion.div>
      </div>
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {__spreadArray([], Array(3), true).map(function (_, i) { return (<motion.div key={i} className={"absolute w-1 h-1 bg-".concat(color, " rounded-full")} style={{
                left: "".concat(20 + i * 30, "%"),
                top: "".concat(30 + i * 20, "%"),
            }} animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
            }} transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5 + delay
            }}/>); })}
      </div>
    </motion.div>);
};
export default AnimatedStat;
