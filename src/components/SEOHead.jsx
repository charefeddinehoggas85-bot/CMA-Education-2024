'use client';
import { useEffect } from 'react';
export default function SEOHead(_a) {
    var title = _a.title, description = _a.description, _b = _a.keywords, keywords = _b === void 0 ? [] : _b, canonical = _a.canonical, _c = _a.noindex, noindex = _c === void 0 ? false : _c;
    useEffect(function () {
        // Google Analytics 4
        if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
            var script1 = document.createElement('script');
            script1.async = true;
            script1.src = "https://www.googletagmanager.com/gtag/js?id=".concat(process.env.NEXT_PUBLIC_GA_ID);
            document.head.appendChild(script1);
            var script2 = document.createElement('script');
            script2.innerHTML = "\n        window.dataLayer = window.dataLayer || [];\n        function gtag(){dataLayer.push(arguments);}\n        gtag('js', new Date());\n        gtag('config', '".concat(process.env.NEXT_PUBLIC_GA_ID, "', {\n          page_title: '").concat(title || document.title, "',\n          page_location: window.location.href\n        });\n      ");
            document.head.appendChild(script2);
        }
        // Hotjar tracking
        if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_HOTJAR_ID) {
            var script = document.createElement('script');
            script.innerHTML = "\n        (function(h,o,t,j,a,r){\n          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n          h._hjSettings={hjid:".concat(process.env.NEXT_PUBLIC_HOTJAR_ID, ",hjsv:6};\n          a=o.getElementsByTagName('head')[0];\n          r=o.createElement('script');r.async=1;\n          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n          a.appendChild(r);\n        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');\n      ");
            document.head.appendChild(script);
        }
    }, [title]);
    return null;
}
// Hook pour tracking des événements
export var trackEvent = function (eventName, parameters) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
    }
};
