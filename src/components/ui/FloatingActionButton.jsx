'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
var FloatingActionButton = function (_a) {
    var actions = _a.actions, _b = _a.mainIcon, mainIcon = _b === void 0 ? <Plus className="w-6 h-6"/> : _b, _c = _a.position, position = _c === void 0 ? 'bottom-right' : _c, _d = _a.size, size = _d === void 0 ? 'md' : _d, _e = _a.variant, variant = _e === void 0 ? 'gradient' : _e;
    var _f = useState(false), isOpen = _f[0], setIsOpen = _f[1];
    var positionClasses = {
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
        'top-right': 'top-6 right-6',
        'top-left': 'top-6 left-6'
    };
    var sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20'
    };
    var variantClasses = {
        default: 'bg-primary-blue text-white shadow-lg',
        gradient: 'bg-gradient-to-r from-primary-blue to-purple-600 text-white shadow-lg shadow-blue-500/25',
        glass: 'bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg'
    };
    var getActionPosition = function (index) {
        var isBottom = position.includes('bottom');
        var isRight = position.includes('right');
        var distance = 80;
        var baseY = isBottom ? -distance * (index + 1) : distance * (index + 1);
        return {
            x: 0,
            y: baseY
        };
    };
    return (<div className={"fixed ".concat(positionClasses[position], " z-50")}>
      {/* Actions secondaires */}
      <AnimatePresence>
        {isOpen && actions.map(function (action, index) { return (<motion.div key={index} initial={__assign({ opacity: 0, scale: 0 }, getActionPosition(index))} animate={{ opacity: 1, scale: 1, x: 0, y: getActionPosition(index).y }} exit={{ opacity: 0, scale: 0, x: 0, y: 0 }} transition={{
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
            }} className="absolute" style={{
                bottom: position.includes('bottom') ? "".concat((index + 1) * 70, "px") : 'auto',
                top: position.includes('top') ? "".concat((index + 1) * 70, "px") : 'auto',
                right: position.includes('right') ? '0' : 'auto',
                left: position.includes('left') ? '0' : 'auto'
            }}>
            <motion.button className={"\n                ".concat(sizeClasses.sm, " \n                ").concat(variantClasses[variant], "\n                rounded-full flex items-center justify-center\n                hover:shadow-xl transition-all duration-300\n                group relative overflow-hidden\n              ")} onClick={action.onClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
              
              <span className="relative z-10">
                {action.icon}
              </span>
              
              {/* Tooltip */}
              <motion.div initial={{ opacity: 0, x: position.includes('right') ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} className={"\n                  absolute ".concat(position.includes('right') ? 'right-full mr-3' : 'left-full ml-3', "\n                  bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap\n                  opacity-0 group-hover:opacity-100 transition-opacity duration-200\n                  pointer-events-none\n                ")}>
                {action.label}
                <div className={"\n                  absolute top-1/2 transform -translate-y-1/2\n                  ".concat(position.includes('right') ? 'left-full' : 'right-full', "\n                  w-0 h-0 border-4\n                  ").concat(position.includes('right')
                ? 'border-l-gray-900 border-r-transparent border-t-transparent border-b-transparent'
                : 'border-r-gray-900 border-l-transparent border-t-transparent border-b-transparent', "\n                ")}/>
              </motion.div>
            </motion.button>
          </motion.div>); })}
      </AnimatePresence>

      {/* Bouton principal */}
      <motion.button className={"\n          ".concat(sizeClasses[size], " \n          ").concat(variantClasses[variant], "\n          rounded-full flex items-center justify-center\n          hover:shadow-2xl transition-all duration-300\n          relative overflow-hidden group\n        ")} onClick={function () { return setIsOpen(!isOpen); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
        
        {/* Effet de pulsation */}
        <motion.div className="absolute inset-0 rounded-full bg-white/20" animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
        }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }}/>
        
        <span className="relative z-10">
          <AnimatePresence mode="wait">
            {isOpen ? (<motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6"/>
              </motion.div>) : (<motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {mainIcon}
              </motion.div>)}
          </AnimatePresence>
        </span>
      </motion.button>

      {/* Overlay pour fermer */}
      <AnimatePresence>
        {isOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 -z-10" onClick={function () { return setIsOpen(false); }}/>)}
      </AnimatePresence>
    </div>);
};
export default FloatingActionButton;
