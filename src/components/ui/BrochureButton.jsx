'use client';
import { useState } from 'react';
import { Download } from 'lucide-react';
import BrochureModal from './BrochureModal';
var BrochureButton = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, _d = _a.className, className = _d === void 0 ? '' : _d, children = _a.children;
    var _e = useState(false), isModalOpen = _e[0], setIsModalOpen = _e[1];
    var variants = {
        primary: 'bg-gradient-to-r from-primary-blue to-purple-600 text-white hover:shadow-lg',
        secondary: 'bg-orange-500 text-white hover:bg-orange-600',
        outline: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white'
    };
    var sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };
    return (<>
      <button onClick={function () { return setIsModalOpen(true); }} className={"\n          ".concat(variants[variant], "\n          ").concat(sizes[size], "\n          ").concat(className, "\n          rounded-xl font-semibold transition-all duration-200\n          flex items-center space-x-2\n        ")}>
        <Download className="w-5 h-5"/>
        <span>{children || 'Télécharger la brochure'}</span>
      </button>

      <BrochureModal isOpen={isModalOpen} onClose={function () { return setIsModalOpen(false); }}/>
    </>);
};
export default BrochureButton;
