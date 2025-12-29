'use client';
import { useState, useEffect } from 'react';
export default function TestHydrationPage() {
    var _a = useState(false), mounted = _a[0], setMounted = _a[1];
    var _b = useState(0), count = _b[0], setCount = _b[1];
    useEffect(function () {
        console.log('🚀 useEffect déclenché - Hydratation réussie!');
        setMounted(true);
    }, []);
    var handleClick = function () {
        setCount(count + 1);
        console.log('🖱️ Click détecté, count:', count + 1);
    };
    return (<div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Test d'Hydratation React</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded">
            <strong>État du composant:</strong>
            <div>Monté: {mounted ? '✅ Oui' : '❌ Non'}</div>
            <div>Count: {count}</div>
          </div>
          
          <button onClick={handleClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Cliquer pour tester l'interactivité
          </button>
          
          <div className="text-sm text-gray-600">
            <p>Si ce bouton fonctionne, l'hydratation React est OK</p>
            <p>Vérifiez la console pour les logs</p>
          </div>
        </div>
        
        {/* Indicateur visuel d'hydratation */}
        <div className={"mt-4 p-2 rounded ".concat(mounted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')}>
          {mounted ? '🎉 Hydratation réussie!' : '⏳ En attente d\'hydratation...'}
        </div>
      </div>
    </div>);
}
