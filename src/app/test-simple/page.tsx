'use client'

import { useState, useEffect } from 'react'

export default function TestSimplePage() {
  const [data, setData] = useState<string>('Chargement...')

  useEffect(() => {
    console.log('🚀 Test simple - useEffect déclenché')
    
    async function testFetch() {
      try {
        console.log('📡 Test fetch vers Strapi...')
        const response = await fetch('http://localhost:1337/api/formations?populate=*')
        console.log('✅ Réponse:', response.ok, response.status)
        
        if (response.ok) {
          const result = await response.json()
          console.log('📊 Données:', result.data?.length || 0, 'formations')
          setData(`✅ Succès: ${result.data?.length || 0} formations trouvées`)
        } else {
          setData(`❌ Erreur: ${response.status}`)
        }
      } catch (error) {
        console.error('❌ Erreur fetch:', error)
        setData(`❌ Erreur: ${error instanceof Error ? error.message : 'Inconnue'}`)
      }
    }
    
    testFetch()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Test Simple</h1>
        <div className="mb-4">
          <strong>Status:</strong> {data}
        </div>
        <div className="text-sm text-gray-600">
          <p>Ce test vérifie:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Le rendu React côté client</li>
            <li>Les appels fetch vers Strapi</li>
            <li>La mise à jour du state</li>
          </ul>
        </div>
      </div>
    </div>
  )
}