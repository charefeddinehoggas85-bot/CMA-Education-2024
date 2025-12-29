'use client';
import { useState, useEffect } from 'react';
var SimpleFormationsGallery = function () {
    var _a = useState(false), mounted = _a[0], setMounted = _a[1];
    useEffect(function () {
        console.log('🎯 SimpleFormationsGallery: Composant monté');
        setMounted(true);
    }, []);
    console.log('🎨 SimpleFormationsGallery: Rendu - mounted:', mounted);
    return (<section className="py-12 relative bg-yellow-100 border-4 border-red-500">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-red-600 mb-4">
            🎯 TEST: Galerie des Formations Simplifiée
          </h3>
          <p className="text-gray-800 mb-8">
            Si vous voyez cette section, le composant se rend correctement.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-200 p-6 rounded-lg">
              <h4 className="font-bold text-blue-800">Alternance</h4>
              <p className="text-blue-600">8 formations disponibles</p>
            </div>
            <div className="bg-green-200 p-6 rounded-lg">
              <h4 className="font-bold text-green-800">Reconversion</h4>
              <p className="text-green-600">3 formations disponibles</p>
            </div>
            <div className="bg-purple-200 p-6 rounded-lg">
              <h4 className="font-bold text-purple-800">VAE</h4>
              <p className="text-purple-600">2 formules disponibles</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              État: {mounted ? '✅ Monté' : '⏳ En cours de montage'}
            </p>
          </div>
        </div>
      </div>
    </section>);
};
export default SimpleFormationsGallery;
