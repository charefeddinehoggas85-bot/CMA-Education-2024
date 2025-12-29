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
var AnimatedIcon = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'float' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, _d = _a.color, color = _d === void 0 ? 'text-primary-blue' : _d, _e = _a.background, background = _e === void 0 ? false : _e, _f = _a.backgroundVariant, backgroundVariant = _f === void 0 ? 'circle' : _f, _g = _a.className, className = _g === void 0 ? '' : _g, onClick = _a.onClick;
    var sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12'
    };
    var backgroundSizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20'
    };
    var backgroundClasses = {
        circle: 'rounded-full',
        square: 'rounded-lg',
        hexagon: 'rounded-xl transform rotate-45',
        gradient: 'rounded-full bg-gradient-to-br from-primary-blue to-purple-600'
    };
    var animations = {
        bounce: {
            y: [0, -10, 0],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        },
        rotate: {
            rotate: [0, 360],
            transition: { duration: 3, repeat: Infinity, ease: "linear" }
        },
        pulse: {
            scale: [1, 1.2, 1],
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        },
        float: {
            y: [0, -8, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        },
        glow: {
            boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0)",
                "0 0 20px 10px rgba(59, 130, 246, 0.3)",
                "0 0 0 0 rgba(59, 130, 246, 0)"
            ],
            transition: { duration: 2, repeat: Infinity }
        },
        morph: {
            borderRadius: ["50%", "25%", "50%"],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        },
        shake: {
            x: [0, -2, 2, -2, 2, 0],
            transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
        }
    };
    var IconWrapper = function (_a) {
        var iconChildren = _a.children;
        if (background) {
            return (<motion.div className={"\n            ".concat(backgroundSizes[size], " \n            ").concat(backgroundVariant === 'gradient' ? backgroundClasses.gradient : 'bg-white shadow-lg', " \n            ").concat(backgroundClasses[backgroundVariant], "\n            flex items-center justify-center\n            ").concat(onClick ? 'cursor-pointer hover:shadow-xl' : '', "\n            ").concat(className, "\n          ")} animate={animations[variant]} whileHover={onClick ? { scale: 1.1 } : {}} whileTap={onClick ? { scale: 0.95 } : {}} onClick={onClick}>
          <div className={"".concat(sizeClasses[size], " ").concat(color, " flex items-center justify-center")}>
            {iconChildren}
          </div>
        </motion.div>);
        }
        return (<motion.div className={"\n          ".concat(sizeClasses[size], " \n          ").concat(color, " \n          flex items-center justify-center\n          ").concat(onClick ? 'cursor-pointer' : '', "\n          ").concat(className, "\n        ")} animate={animations[variant]} whileHover={onClick ? { scale: 1.1 } : {}} whileTap={onClick ? { scale: 0.95 } : {}} onClick={onClick}>
        {iconChildren}
      </motion.div>);
    };
    return <IconWrapper>{children}</IconWrapper>;
};
// Composant d'icône avec effet de particules
export var ParticleIcon = function (_a) {
    var children = _a.children, _b = _a.particleCount, particleCount = _b === void 0 ? 8 : _b, _c = _a.className, className = _c === void 0 ? '' : _c, onClick = _a.onClick;
    return (<motion.div className={"relative inline-block ".concat(onClick ? 'cursor-pointer' : '', " ").concat(className)} whileHover="hover" onClick={onClick}>
      {/* Icône principale */}
      <motion.div variants={{
            hover: { scale: 1.1, rotate: 5 }
        }} className="relative z-10">
        {children}
      </motion.div>
      
      {/* Particules */}
      {__spreadArray([], Array(particleCount), true).map(function (_, i) { return (<motion.div key={i} className="absolute w-1 h-1 bg-primary-yellow rounded-full" style={{
                left: '50%',
                top: '50%',
            }} variants={{
                hover: {
                    x: Math.cos((i / particleCount) * Math.PI * 2) * 30,
                    y: Math.sin((i / particleCount) * Math.PI * 2) * 30,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                }
            }} transition={{ duration: 0.6, delay: i * 0.1 }}/>); })}
    </motion.div>);
};
// Composant d'icône avec effet de morphing
export var MorphIcon = function (_a) {
    var icon1 = _a.icon1, icon2 = _a.icon2, _b = _a.className, className = _b === void 0 ? '' : _b, onClick = _a.onClick;
    return (<motion.div className={"relative inline-block ".concat(onClick ? 'cursor-pointer' : '', " ").concat(className)} whileHover="hover" onClick={onClick}>
      <motion.div variants={{
            hover: { opacity: 0, scale: 0.8, rotate: 180 }
        }} transition={{ duration: 0.3 }} className="absolute inset-0">
        {icon1}
      </motion.div>
      
      <motion.div variants={{
            hover: { opacity: 1, scale: 1, rotate: 0 }
        }} initial={{ opacity: 0, scale: 0.8, rotate: -180 }} transition={{ duration: 0.3 }}>
        {icon2}
      </motion.div>
    </motion.div>);
};
export default AnimatedIcon;
