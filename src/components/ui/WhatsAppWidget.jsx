'use client';
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
var WhatsAppWidget = function () {
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+33123456789";
    var handleWhatsAppClick = function () {
        var message = "Bonjour, je souhaite obtenir des informations sur les formations Construction Management Academy BTP.";
        var url = "https://wa.me/".concat(phoneNumber.replace('+', ''), "?text=").concat(encodeURIComponent(message));
        window.open(url, '_blank');
    };
    return (<>
      {/* Widget flottant */}
      <motion.div className="fixed bottom-6 right-6 z-50" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }}>
        <AnimatePresence>
          {isOpen && (<motion.div initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.8 }} className="mb-4 bg-white rounded-2xl shadow-2xl p-4 w-80 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Support Construction Management Academy</h3>
                    <p className="text-sm text-green-500">En ligne</p>
                  </div>
                </div>
                <button onClick={function () { return setIsOpen(false); }} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5"/>
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                Besoin d'aide ? Contactez-nous sur WhatsApp pour toutes vos questions sur nos formations BTP !
              </p>
              
              <button onClick={handleWhatsAppClick} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <MessageCircle className="w-5 h-5"/>
                Démarrer la conversation
              </button>
            </motion.div>)}
        </AnimatePresence>

        <motion.button onClick={function () { return setIsOpen(!isOpen); }} className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {isOpen ? <X className="w-6 h-6"/> : <MessageCircle className="w-6 h-6"/>}
        </motion.button>
      </motion.div>
    </>);
};
export default WhatsAppWidget;
