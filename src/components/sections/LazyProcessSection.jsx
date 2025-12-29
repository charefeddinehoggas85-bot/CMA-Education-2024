'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
var ProcessSection = dynamic(function () { return import('./ProcessSection'); }, {
    loading: function () { return (<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-center">
        <div className="w-16 h-16 bg-primary-blue/20 rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement...</p>
      </div>
    </div>); },
    ssr: false
});
var LazyProcessSection = function () {
    return (<Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-primary-blue/20 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du processus...</p>
        </div>
      </div>}>
      <ProcessSection />
    </Suspense>);
};
export default LazyProcessSection;
