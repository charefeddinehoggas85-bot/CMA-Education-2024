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
import { useState, useRef } from 'react';
var RippleButton = function (_a) {
    var children = _a.children, onClick = _a.onClick, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, _d = _a.rippleColor, rippleColor = _d === void 0 ? 'rgba(255, 255, 255, 0.6)' : _d, _e = _a.className, className = _e === void 0 ? '' : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f;
    var _g = useState([]), ripples = _g[0], setRipples = _g[1];
    var buttonRef = useRef(null);
    var sizeClasses = {
        sm: 'px-4 py-2 text-sm rounded-lg',
        md: 'px-6 py-3 text-base rounded-xl',
        lg: 'px-8 py-4 text-lg rounded-xl'
    };
    var variantClasses = {
        primary: 'bg-primary-blue text-white hover:bg-blue-700',
        secondary: 'bg-primary-yellow text-primary-blue hover:bg-yellow-400',
        outline: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white',
        glass: 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
    };
    var createRipple = function (e) {
        if (!buttonRef.current)
            return;
        var button = buttonRef.current;
        var rect = button.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var newRipple = {
            id: Date.now(),
            x: x,
            y: y
        };
        setRipples(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newRipple], false); });
        // Supprimer le ripple après l'animation
        setTimeout(function () {
            setRipples(function (prev) { return prev.filter(function (ripple) { return ripple.id !== newRipple.id; }); });
        }, 600);
    };
    var handleClick = function (e) {
        if (!disabled) {
            createRipple(e);
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        }
    };
    return (<motion.button ref={buttonRef} className={"\n        relative overflow-hidden font-semibold transition-all duration-300\n        ".concat(sizeClasses[size], " ").concat(variantClasses[variant], " ").concat(className, "\n        focus:outline-none focus:ring-4 focus:ring-opacity-50\n        disabled:opacity-50 disabled:cursor-not-allowed\n        shadow-lg hover:shadow-xl\n      ")} onClick={handleClick} disabled={disabled} whileHover={!disabled ? { scale: 1.02 } : {}} whileTap={!disabled ? { scale: 0.98 } : {}}>
      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Ripple effects */}
      {ripples.map(function (ripple) { return (<motion.span key={ripple.id} className="absolute rounded-full pointer-events-none" style={{
                left: ripple.x,
                top: ripple.y,
                backgroundColor: rippleColor,
                transform: 'translate(-50%, -50%)'
            }} initial={{ width: 0, height: 0, opacity: 1 }} animate={{
                width: 300,
                height: 300,
                opacity: 0
            }} transition={{
                duration: 0.6,
                ease: 'easeOut'
            }}/>); })}

      {/* Gradient overlay on hover */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0" whileHover={{ opacity: 1, x: ['-100%', '100%'] }} transition={{ duration: 0.6 }}/>
    </motion.button>);
};
export default RippleButton;
