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
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
// Positions fixes pour éviter les problèmes d'hydratation
var PARTICLE_POSITIONS = [
    { left: 10, top: 20 }, { left: 25, top: 45 }, { left: 40, top: 15 },
    { left: 55, top: 70 }, { left: 70, top: 35 }, { left: 85, top: 60 },
    { left: 15, top: 80 }, { left: 30, top: 55 }, { left: 45, top: 90 },
    { left: 60, top: 25 }, { left: 75, top: 85 }, { left: 90, top: 40 },
    { left: 5, top: 50 }, { left: 20, top: 75 }, { left: 35, top: 30 },
    { left: 50, top: 95 }, { left: 65, top: 10 }, { left: 80, top: 65 },
    { left: 95, top: 45 }, { left: 12, top: 88 }
];
var ModernBackground = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'construction' : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    var _d = useState(false), mounted = _d[0], setMounted = _d[1];
    useEffect(function () {
        setMounted(true);
    }, []);
    var variants = {
        construction: {
            primary: '#0D4BD3',
            secondary: '#FADD82',
            accent: '#FF6B35'
        },
        digital: {
            primary: '#6366F1',
            secondary: '#06B6D4',
            accent: '#8B5CF6'
        },
        sustainable: {
            primary: '#059669',
            secondary: '#84CC16',
            accent: '#F59E0B'
        },
        innovation: {
            primary: '#DC2626',
            secondary: '#F97316',
            accent: '#EAB308'
        }
    };
    var colors = variants[variant];
    // Ne pas rendre les particules animées côté serveur
    if (!mounted) {
        return (<div className={"absolute inset-0 overflow-hidden ".concat(className)}>
        <div className="absolute inset-0 opacity-90" style={{
                background: "\n              radial-gradient(circle at 20% 80%, ".concat(colors.primary, "22 0%, transparent 50%),\n              radial-gradient(circle at 80% 20%, ").concat(colors.secondary, "22 0%, transparent 50%),\n              radial-gradient(circle at 40% 40%, ").concat(colors.accent, "15 0%, transparent 50%)\n            ")
            }}/>
      </div>);
    }
    return (<div className={"absolute inset-0 overflow-hidden ".concat(className)}>
      {/* Mesh gradient background */}
      <div className="absolute inset-0 opacity-90" style={{
            background: "\n            radial-gradient(circle at 20% 80%, ".concat(colors.primary, "22 0%, transparent 50%),\n            radial-gradient(circle at 80% 20%, ").concat(colors.secondary, "22 0%, transparent 50%),\n            radial-gradient(circle at 40% 40%, ").concat(colors.accent, "15 0%, transparent 50%)\n          ")
        }}/>

      {/* Animated geometric shapes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id={"grad-".concat(variant)} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.1"/>
            <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.05"/>
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0.1"/>
          </linearGradient>
        </defs>

        {/* Construction beams */}
        {variant === 'construction' && (<>
            <motion.rect x="100" y="200" width="800" height="4" fill={colors.primary} opacity="0.2" animate={{ scaleX: [0.8, 1.2, 0.8] }} transition={{ duration: 4, repeat: Infinity }}/>
            <motion.rect x="200" y="100" width="4" height="600" fill={colors.secondary} opacity="0.2" animate={{ scaleY: [0.8, 1.2, 0.8] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}/>
          </>)}

        {/* Digital circuit patterns */}
        {variant === 'digital' && (<>
            {__spreadArray([], Array(8), true).map(function (_, i) { return (<motion.circle key={i} cx={150 + i * 100} cy={200 + (i % 2) * 300} r="3" fill={colors.primary} opacity="0.4" animate={{
                    scale: [1, 2, 1],
                    opacity: [0.4, 0.8, 0.4]
                }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                }}/>); })}
          </>)}

        {/* Hexagonal pattern */}
        {__spreadArray([], Array(12), true).map(function (_, i) {
            var x = 200 + (i % 4) * 200;
            var y = 150 + Math.floor(i / 4) * 200;
            var points = "".concat(x, ",").concat(y, " ").concat(x + 30, ",").concat(y + 20, " ").concat(x + 30, ",").concat(y + 60, " ").concat(x, ",").concat(y + 80, " ").concat(x - 30, ",").concat(y + 60, " ").concat(x - 30, ",").concat(y + 20);
            return (<motion.polygon key={i} points={points} fill="none" stroke={colors.secondary} strokeWidth="1" opacity="0.3" animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                }} transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    ease: "linear"
                }}/>);
        })}
      </svg>

      {/* Floating particles with fixed positions */}
      <div className="absolute inset-0">
        {PARTICLE_POSITIONS.map(function (pos, i) { return (<motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{
                backgroundColor: colors.accent,
                left: "".concat(pos.left, "%"),
                top: "".concat(pos.top, "%"),
            }} animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
            }} transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: (i % 5) * 0.4
            }}/>); })}
      </div>
    </div>);
};
export default ModernBackground;
