'use client';
import { useEffect } from 'react';
var ServiceWorkerRegistration = function () {
    useEffect(function () {
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
            navigator.serviceWorker
                .register('/sw.js')
                .then(function (registration) {
                console.log('SW registered: ', registration);
            })
                .catch(function (registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
        }
    }, []);
    return null;
};
export default ServiceWorkerRegistration;
