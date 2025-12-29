'use client';
import { memo } from 'react';
var OptimizedButton = memo(function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, icon = _a.icon, onClick = _a.onClick, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.className, className = _e === void 0 ? '' : _e;
    var sizeClasses = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-xl",
        xl: "px-10 py-5 text-xl rounded-2xl"
    };
    var variantClasses = {
        primary: "bg-primary-blue text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
        secondary: "bg-primary-yellow text-primary-blue hover:bg-yellow-400 shadow-lg hover:shadow-xl",
        gradient: "bg-gradient-to-r from-primary-blue to-purple-600 text-white shadow-lg hover:shadow-2xl"
    };
    var baseClasses = "relative font-semibold transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95";
    return (<button className={"".concat(baseClasses, " ").concat(sizeClasses[size], " ").concat(variantClasses[variant], " ").concat(className, " group")} onClick={onClick} disabled={disabled}>
      <span className="flex items-center justify-center space-x-2">
        <span>{children}</span>
        {icon && (<span className="transition-transform duration-200 group-hover:translate-x-1">
            {icon}
          </span>)}
      </span>
    </button>);
});
OptimizedButton.displayName = 'OptimizedButton';
export default OptimizedButton;
