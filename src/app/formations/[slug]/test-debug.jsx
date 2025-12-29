'use client';
import { useParams } from 'next/navigation';
export default function TestDebugPage() {
    var params = useParams();
    var slug = params.slug;
    return (<div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-600 text-white p-4 rounded-lg mb-8">
          <h1 className="text-2xl font-bold">🔍 TEST DEBUG FORMATION</h1>
          <div>Slug reçu: {slug}</div>
          <div>Composant chargé: ✅</div>
          <div>React fonctionne: ✅</div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Test de base</h2>
          <p>Si vous voyez ce message, le composant React fonctionne.</p>
          <p>Slug: <strong>{slug}</strong></p>
          
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h3 className="font-bold">Prochaines étapes:</h3>
            <ul className="list-disc list-inside mt-2">
              <li>Vérifier pourquoi le composant principal ne se charge pas</li>
              <li>Identifier les erreurs JavaScript</li>
              <li>Corriger les imports ou la logique</li>
            </ul>
          </div>
        </div>
      </div>
    </div>);
}
