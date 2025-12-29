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
var ModernButton = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, icon = _a.icon, _d = _a.iconPosition, iconPosition = _d === void 0 ? 'right' : _d, onClick = _a.onClick, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.className, className = _f === void 0 ? '' : _f, _g = _a.animate, animate = _g === void 0 ? true : _g;
    var baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";
    var sizeClasses = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-xl",
        xl: "px-10 py-5 text-xl rounded-2xl"
    };
    var variantClasses = {
        primary: "bg-primary-blue text-white hover:bg-blue-700 focus:ring-blue-300 shadow-lg hover:shadow-xl",
        secondary: "bg-primary-yellow text-primary-blue hover:bg-yellow-400 focus:ring-yellow-300 shadow-lg hover:shadow-xl",
        outline: "border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white focus:ring-blue-300",
        ghost: "text-primary-blue hover:bg-blue-50 focus:ring-blue-300",
        gradient: "bg-gradient-to-r from-primary-blue via-purple-600 to-primary-blue bg-size-200 bg-pos-0 hover:bg-pos-100 text-white shadow-lg hover:shadow-2xl",
        neon: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:shadow-2xl border border-cyan-400/30"
    };
    var buttonClasses = "".concat(baseClasses, " ").concat(sizeClasses[size], " ").concat(variantClasses[variant], " ").concat(className);
    var ButtonContent = function () { return (<>
      {/* Effet de brillance animé */}
      {animate && (<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>)}
      
      {/* Contenu du bouton */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {icon && iconPosition === 'left' && (<motion.span animate={animate ? { rotate: [0, 10, 0] } : {}} transition={{ duration: 0.3 }} className="flex items-center">
            {icon}
          </motion.span>)}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (<motion.span animate={animate ? { x: [0, 5, 0] } : {}} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }} className="flex items-center">
            {icon}
          </motion.span>)}
      </span>

      {/* Effet de particules pour le variant neon */}
      {variant === 'neon' && animate && (<div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
          {__spreadArray([], Array(6), true).map(function (_, i) { return (<motion.div key={i} className="absolute w-1 h-1 bg-cyan-300 rounded-full" style={{
                    left: "".concat(20 + i * 15, "%"),
                    top: "".concat(30 + (i % 2) * 40, "%")
                }} animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                }} transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                }}/>); })}
        </div>)}
    </>); };
    if (animate) {
        return (<motion.button className={"".concat(buttonClasses, " group")} onClick={onClick} disabled={disabled} whileHover={{ scale: disabled ? 1 : 1.05 }} whileTap={{ scale: disabled ? 1 : 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <ButtonContent />
      </motion.button>);
    }
    return (<button className={"".concat(buttonClasses, " group")} onClick={onClick} disabled={disabled}>
      <ButtonContent />
    </button>);
};
export default ModernButton;
