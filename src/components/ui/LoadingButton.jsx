'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
var LoadingButton = function (_a) {
    var children = _a.children, onClick = _a.onClick, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, icon = _a.icon, _d = _a.loadingText, loadingText = _d === void 0 ? 'Chargement...' : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.className, className = _f === void 0 ? '' : _f;
    var _g = useState(false), isLoading = _g[0], setIsLoading = _g[1];
    var handleClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(onClick && !isLoading && !disabled)) return [3 /*break*/, 4];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, onClick()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var sizeClasses = {
        sm: 'px-4 py-2 text-sm rounded-lg',
        md: 'px-6 py-3 text-base rounded-xl',
        lg: 'px-8 py-4 text-lg rounded-xl'
    };
    var variantClasses = {
        primary: 'bg-primary-blue text-white hover:bg-blue-700',
        secondary: 'bg-primary-yellow text-primary-blue hover:bg-yellow-400',
        outline: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white',
        gradient: 'bg-gradient-to-r from-primary-blue to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
    };
    var isDisabled = disabled || isLoading;
    return (<motion.button className={"\n        relative overflow-hidden font-semibold transition-all duration-300\n        ".concat(sizeClasses[size], " ").concat(variantClasses[variant], " ").concat(className, "\n        focus:outline-none focus:ring-4 focus:ring-opacity-50\n        disabled:opacity-50 disabled:cursor-not-allowed\n        shadow-lg hover:shadow-xl\n      ")} onClick={handleClick} disabled={isDisabled} whileHover={!isDisabled ? { scale: 1.02 } : {}} whileTap={!isDisabled ? { scale: 0.98 } : {}}>
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-current opacity-20"/>)}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <AnimatePresence mode="wait">
          {isLoading ? (<motion.div key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center space-x-2">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Loader2 className="w-4 h-4"/>
              </motion.div>
              <span>{loadingText}</span>
            </motion.div>) : (<motion.div key="content" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center space-x-2">
              {icon && (<motion.span animate={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  {icon}
                </motion.span>)}
              <span>{children}</span>
            </motion.div>)}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <AnimatePresence>
        {isLoading && (<motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 2, ease: 'easeInOut' }} className="absolute bottom-0 left-0 h-1 bg-white/30 origin-left" style={{ width: '100%' }}/>)}
      </AnimatePresence>

      {/* Shimmer effect */}
      {!isLoading && (<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>)}
    </motion.button>);
};
export default LoadingButton;
