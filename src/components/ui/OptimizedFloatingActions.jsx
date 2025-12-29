'use client';
import { useState, memo } from 'react';
import { Phone, Mail, MessageCircle, Calendar, Download, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BrochureModal from './BrochureModal';
var OptimizedFloatingActions = memo(function () {
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = useState(false), isBrochureModalOpen = _b[0], setIsBrochureModalOpen = _b[1];
    var router = useRouter();
    var actions = [
        {
            icon: <Phone className="w-4 h-4"/>,
            label: "Appeler",
            onClick: function () { return window.open('tel:0189706052', '_self'); },
            color: "bg-green-500 hover:bg-green-600"
        },
        {
            icon: <Mail className="w-4 h-4"/>,
            label: "Email",
            onClick: function () { return window.open('mailto:contact.academy@construction-management-academy.fr', '_self'); },
            color: "bg-blue-500 hover:bg-blue-600"
        },
        {
            icon: <Calendar className="w-4 h-4"/>,
            label: "RDV",
            onClick: function () { return router.push('/contact'); },
            color: "bg-purple-500 hover:bg-purple-600"
        },
        {
            icon: <Download className="w-4 h-4"/>,
            label: "Brochure",
            onClick: function () { return setIsBrochureModalOpen(true); },
            color: "bg-orange-500 hover:bg-orange-600"
        }
    ];
    return (<>
      <BrochureModal isOpen={isBrochureModalOpen} onClose={function () { return setIsBrochureModalOpen(false); }}/>
      
      <div className="fixed bottom-6 right-6 z-50">
      {/* Actions secondaires */}
      <div className={"flex flex-col space-y-3 mb-3 transition-all duration-300 ".concat(isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none')}>
        {actions.map(function (action, index) { return (<button key={index} onClick={action.onClick} className={"".concat(action.color, " text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 flex items-center space-x-2 group")} style={{ transitionDelay: isOpen ? "".concat(index * 50, "ms") : '0ms' }}>
            {action.icon}
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {action.label}
            </span>
          </button>); })}
      </div>

      {/* Bouton principal */}
      <button onClick={function () { return setIsOpen(!isOpen); }} className="bg-gradient-to-r from-primary-blue to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
        <div className={"transition-transform duration-200 ".concat(isOpen ? 'rotate-45' : 'rotate-0')}>
          {isOpen ? <X className="w-6 h-6"/> : <MessageCircle className="w-6 h-6"/>}
        </div>
      </button>
    </div>
    </>);
});
OptimizedFloatingActions.displayName = 'OptimizedFloatingActions';
export default OptimizedFloatingActions;
