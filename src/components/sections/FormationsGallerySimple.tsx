'use client'

import { useState, useEffect } from 'react'

const FormationsGallerySimple = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    console.log('🔄 FormationsGallerySimple: Démarrage du chargement...')
    
    async function loadData() {
      try {
        // Simuler un chargement simple
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('✅ FormationsGallerySimple: Données chargées')
        setData({ message: 'Galerie chargée avec succès!' })
        setLoading(false)
      } catch (error) {
        console.error('❌ FormationsGallerySimple: Erreur', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  console.log('🎯 FormationsGallerySimple: Rendu avec loading =', loading)

  if (loading) {
    return (
      <div className="py-12 bg-yellow-100 border-2 border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">
            🔄 FormationsGallerySimple - CHARGEMENT
          </h3>
          <div className="animate-pulse">
            <div className="h-8 bg-yellow-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-yellow-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-green-100 border-2 border-green-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          ✅ FormationsGallerySimple - CHARGÉ
        </h3>
        <p className="text-green-700">
          {data?.message || 'Données chargées'}
        </p>
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-600">
            Si vous voyez ce message, le problème n'est pas dans la logique de base de React.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FormationsGallerySimple
